/// <reference path="babylon.d.ts" />
/// <reference path="babylon.scenecomponents.ts" />
/// <reference path="babylon.scenemanager.ts" />

module BABYLON {
    export class AnimationState extends BABYLON.SceneComponent {
        ///////////////////////////////////////////////////////////
        // public debug:any = null;
        ///////////////////////////////////////////////////////////
        private static EXIT:string = "[EXIT]";
        private static TIMER:number = 3.0;
        private _fps:number = 30;
        private _legacy:boolean = false;
        private _targets:any[] = null;
        private _machine:any = null;
        private _skeletal:boolean = false;
        private _executed:boolean = false;
        private _autoplay:boolean = true;
        private _checkers:BABYLON.TransitionCheck = new BABYLON.TransitionCheck();
        private _boneAnim:BABYLON.Animation = null;
        private _boneWeight:number = 0;
        private _boneMatrix:BABYLON.Matrix = BABYLON.Matrix.Zero();
        private _sampleMatrix:BABYLON.Matrix = BABYLON.Matrix.Zero();
        private _inputPosition:BABYLON.Vector2 = BABYLON.Vector2.Zero();
        private _childPosition:BABYLON.Vector2 = BABYLON.Vector2.Zero();
        private _onAnimationFrameHandler:()=>void = null;
        private _onAnimationEventHandlers:any = null;
        private _onAnimationBehaveHandlers:any = null;
        public enabled:boolean = false;
        public speedRatio:number = 1.0;
        public autoTicking:boolean = true;
        public enableTransitions:boolean = true;
        public directBlendSpeed:number = 1.0;
        public get fps():number { return this._fps; }
        public get legacy():boolean { return this._legacy; }
        public get skeletal():boolean { return this._skeletal; }
        public get executing():boolean { return this._executed; }
        public constructor(owner: BABYLON.Entity, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            super(owner, scene, tick, propertyBag);
            this._targets = null;
            this._machine = null;
            this._legacy = false;
            this._executed = false;
            this._autoplay = true;
            this._onAnimationFrameHandler = null;
            this._onAnimationEventHandlers = {};
            this._onAnimationBehaveHandlers = {};
            this.directBlendSpeed = 1;
            this.speedRatio = 1;
            // ..
            // Get Machine State Properties
            // ..
            this._fps = this.getProperty("timelineStep", 30);
            this._skeletal = (this.getProperty<number>("controlType", 0) === 2);
            this.enabled = this.getProperty("enableStateMachine", false);
            this.enableTransitions = this.getProperty("enableTransitions", true);
            // ..
            // Setup Animation State Machine
            // ..
            if (this.entity.metadata != null) {
                this.entity.metadata.state = {};
                this.entity.metadata.state.data = {};
                this.entity.metadata.state.clips = {};
                this.entity.metadata.state.floats = {};
                this.entity.metadata.state.booleans = {};
                this.entity.metadata.state.triggers = {};
                this.entity.metadata.state.parameters = {};
                if (this.entity.metadata.properties != null && this.entity.metadata.properties.stateMachineInfo != null) {
                    this._machine = this.entity.metadata.properties.stateMachineInfo;
                    this._legacy = this._machine.legacy;
                    if (this._legacy === true) {
                        this._autoplay = this._machine.auto;
                    }
                    if (this._machine.speed != null) {
                        this.speedRatio = this._machine.speed;
                    }
                    if (this._machine.parameters != null && this._machine.parameters.length > 0) {
                        let plist:any[] = this._machine.parameters;
                        plist.forEach((parameter) => {
                            let name:string = parameter.name;
                            let type:BABYLON.AnimatorParameterType = parameter.type;
                            let curve:boolean = parameter.curve;
                            let defaultFloat:number = parameter.defaultFloat;
                            let defaultBool:boolean = parameter.defaultBool;
                            let defaultInt:number = parameter.defaultInt;
                            this.entity.metadata.state.parameters[name] = type;
                            if (type === BABYLON.AnimatorParameterType.Bool) {
                                this.setBool(name, defaultBool);
                            } else if (type === BABYLON.AnimatorParameterType.Float) {
                                this.setFloat(name, defaultFloat);
                            } else if (type === BABYLON.AnimatorParameterType.Int) {
                                this.setInteger(name, defaultInt);
                            } else if (type === BABYLON.AnimatorParameterType.Trigger) {
                                this.resetTrigger(name);
                            }
                        });
                    }
                } else {
                    BABYLON.Tools.Warn("Babylon.js cannot locate owner animation state machine info metadata for: " + this.entity.name);
                }
            }
            // ..
            // Setup Animation State Timelines
            // ..
            if (this._machine.layers != null && this._machine.layers.length > 0) {
                // Sort In Ascending Order
                this._machine.layers.sort((left, right): number => {
                    if (left.index < right.index) return -1;
                    if (left.index > right.index) return 1;
                    return 0;
                });
                this._machine.layers.forEach((layer:BABYLON.IAnimationLayer) => {
                    layer.animationNormalize = BABYLON.AnimationState.TIMER;
                    layer.animationReference = BABYLON.AnimationState.TIMER * this._fps;
                    layer.animationBlendMatrix = BABYLON.Matrix.Zero();
                });
            }
            // ..
            // Setup Animation State Targets
            // ..
            let transformIndexs:number[] = null;
            this._targets = this.manager.getAnimationTargets(this.entity);
            if (this._skeletal === true) {
                let skeletons:BABYLON.Skeleton[] = this.getTargetSkeletons();
                if (skeletons != null && skeletons.length > 0) {
                    skeletons.forEach((skeleton:BABYLON.Skeleton) => {
                        let target:any = skeleton;
                        if (target.metadata == null) target.metadata = {};
                        target.metadata.resetBlending = false;
                        if (skeleton.bones != null && skeleton.bones.length > 0) {
                            let boneIndex:number = 0;
                            skeleton.bones.forEach((bone:BABYLON.Bone) => {
                                if (bone.metadata == null) bone.metadata = {};
                                bone.metadata.index = boneIndex;
                                bone.metadata.blendingFactor = 0;
                                bone.metadata.originalBlendValue = null;
                                if (bone.metadata.transformPath != null && bone.metadata.transformPath !== "") {
                                    if (this._machine.layers != null && this._machine.layers.length > 0) {
                                        this._machine.layers.forEach((layer:BABYLON.IAnimationLayer) => {
                                            if (layer.avatarMask != null && layer.avatarMask.transformPaths != null && layer.avatarMask.transformPaths.length > 0) {
                                                if (this.checkBoneTransformPath(layer, bone.metadata.transformPath)) {
                                                    if (layer.avatarMask.transformIndexs == null) layer.avatarMask.transformIndexs = [];
                                                    layer.avatarMask.transformIndexs.push(boneIndex); 
                                                }
                                            }
                                        });
                                    }
                                }
                                boneIndex++;
                            });
                        }
                    });
                }
            }
        }
        protected start(): void { this.startStateMachine(); }
        protected update(): void { if (this.autoTicking === true) this.updateStateMachine(); }
        protected destroy(): void {
            this._targets = null;
            this._machine = null;
            this._checkers = null;
            this._boneAnim = null;
            this._boneWeight = 0;
            this._boneMatrix = null;
            this._inputPosition = null;
            this._childPosition = null;
            this._onAnimationFrameHandler = null;
            this._onAnimationEventHandlers = null;
            this._onAnimationBehaveHandlers = null;
            if (this.entity.metadata != null && this.entity.metadata.state != null) {
                this.entity.metadata.state = null;
            }
        }
        
        /* Animation Controller Play State Function */
        
        public play(state:string, transitionDuration:number = 0, animationLayer:number = 0):void {
            if (this.enabled === true && this._machine.layers != null && this._machine.layers.length > animationLayer) {
                this.setCurrentAnimationState(this._machine.layers[animationLayer], state, BABYLON.Utilities.ComputeBlendingSpeed(this._fps, transitionDuration));
            }
        }

        /* Animation Controller State Helper Functions */
        
        public getBool(name:string):boolean {
            let result:boolean = false;
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.booleans != null && this.entity.metadata.state.booleans[name] != null) {
                result = this.entity.metadata.state.booleans[name];
            }
            return result;
        }
        public setBool(name:string, value:boolean):void {
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.booleans != null) {
                this.entity.metadata.state.booleans[name] = value;
            }
        }
        public getFloat(name:string):number {
            let result:number = 0.0;
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.floats != null && this.entity.metadata.state.floats[name] != null) {
                result = this.entity.metadata.state.floats[name];
            }
            return result;
        }
        public setFloat(name:string, value:number):void {
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.floats != null) {
                this.entity.metadata.state.floats[name] = value;
            }
        }
        public getInteger(name:string):number {
            let result:number = 0.0;
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.floats != null && this.entity.metadata.state.floats[name] != null) {
                result = this.entity.metadata.state.floats[name];
            }
            return result;
        }
        public setInteger(name:string, value:number):void {
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.floats != null) {
                this.entity.metadata.state.floats[name] = value;
            }
        }
        public getTrigger(name:string):boolean {
            let result:boolean = false;
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.triggers != null && this.entity.metadata.state.triggers[name] != null) {
                result = this.entity.metadata.state.triggers[name];
            }
            return result;
        }
        public setTrigger(name:string):void {
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.triggers != null) {
                this.entity.metadata.state.triggers[name] = true;
            }
        }
        public resetTrigger(name:string):void {
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.triggers != null) {
                this.entity.metadata.state.triggers[name] = false;
            }
        }
        public tickStateMachine() :void {
            if (this.autoTicking === false) {
                this.updateStateMachine();
            } else {
                BABYLON.Tools.Warn("Manual tick request ignored. Auto ticking is enabled for animator: " + this.entity.name);
            }
        }
        public getCurrentState(layer:number):BABYLON.MachineState {
            return (this._machine.layers != null && this._machine.layers.length > layer) ? this._machine.layers[layer].animationStateMachine : null;
        }
        public getTargetSkeletons():BABYLON.Skeleton[] {
            let result:BABYLON.Skeleton[] = null;
            if (this._skeletal === true && this._targets != null && this._targets.length > 0) {
                this._targets.forEach((target) => {
                    if (target instanceof BABYLON.AbstractMesh) {
                        let mesh:BABYLON.AbstractMesh = target;
                        if (mesh.skeleton != null) {
                            if (result == null) result = [];
                            result.push(mesh.skeleton);
                        }
                    }
                });
            }
            return result;
        }
        public onAnimationBehaviour(name:string, handler:(state:string, event:string)=>void):void {
            if (name != null && name !== "") {
                this._onAnimationBehaveHandlers[name.toLowerCase()] = handler;
            }
        }
        public onAnimationTrackEvent(name:string, handler:(evt:BABYLON.IAnimationEvent)=>void):void {
            if (name != null && name !== "") {
                this._onAnimationEventHandlers[name.toLowerCase()] = handler;
            }
        }
        public onAnimationFrameUpdate(handler:()=>void):void {
            this._onAnimationFrameHandler = handler;
        }

        /* Animation Controller Private Worker Functions */
        
        private getMachineState(name:string):BABYLON.MachineState {
            let result:BABYLON.MachineState = null;
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.data != null && this.entity.metadata.state.data[name] != null) {
                result = this.entity.metadata.state.data[name];
            }
            return result;
        }
        private setMachineState(name:string, value:BABYLON.MachineState):void {
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.data != null) {
                this.entity.metadata.state.data[name] = value;
            }
        }
        private getAnimationClip(name:string):BABYLON.IAnimationClip {
            let result:BABYLON.IAnimationClip = null;
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.clips != null && this.entity.metadata.state.clips[name] != null) {
                result = this.entity.metadata.state.clips[name];
            }
            return result;
        }
        private setAnimationClip(name:string, value:BABYLON.IAnimationClip):void {
            if (this.entity.metadata != null && this.entity.metadata.state != null && this.entity.metadata.state.clips != null) {
                this.entity.metadata.state.clips[name] = value;
            }
        }
        private getDenormalizedFrame(clip:BABYLON.IAnimationClip, frame:number):number {
            if (clip == null) return 0;
            return clip.start + (clip.stop - clip.start) * frame;
        }
        private getAnimationFrames(clip:BABYLON.IAnimationClip):number {
            if (clip == null) return 0;
            return (clip.stop - clip.start) + 1;
        }
        private setTreeBranches(tree:BABYLON.IBlendTree):void {
            if (tree != null && tree.children != null && tree.children.length > 0) {
                tree.children.forEach((child) => {
                    if (child.type === BABYLON.MotionType.Tree) {
                        this.setTreeBranches(child.subtree);
                    } else if (child.type === BABYLON.MotionType.Clip) {
                        if (child.motion != null && child.motion !== "") {
                            child.track = this.getAnimationClip(child.motion);
                        }
                    }
                });
            }
        }
        private blendBoneMatrix(matrix:BABYLON.Matrix, weight:number = 1.0):void {
            if (matrix != null && weight > 0 && this._boneMatrix != null) {
                let blendWeight:number = BABYLON.Scalar.Clamp(weight, 0.0, 1.0);
                if (this._boneWeight === 0) {
                    this._boneMatrix.copyFrom(matrix);
                } else {
                    BABYLON.Utilities.FastMatrixSlerp(this._boneMatrix, matrix, blendWeight, this._boneMatrix);
                }
                this._boneWeight += blendWeight;
            }
        }
        private updateBoneMatrix(bone:BABYLON.Bone, enableBlending:boolean = false, blendingSpeed:number = 0.0):void {
            if (this._boneMatrix != null && bone != null) {
                if (enableBlending === true && blendingSpeed > 0.0) {
                    if (bone.metadata != null) {
                        if (bone.metadata.blendingFactor <= 1.0) {
                            if (bone.metadata.originalBlendValue == null) {
                                bone.metadata.originalBlendValue = bone._matrix.clone();
                            }
                        }
                        if (bone.metadata.blendingFactor <= 1.0 && bone.metadata.originalBlendValue != null) {
                            BABYLON.Utilities.FastMatrixSlerp(bone.metadata.originalBlendValue, this._boneMatrix, bone.metadata.blendingFactor, this._boneMatrix);
                            bone.metadata.blendingFactor += blendingSpeed;
                        }
                    }
                }
                bone._matrix.copyFrom(this._boneMatrix);
                bone.markAsDirty();
            }
        }

        /* Animation Controller State Machine Functions */
        
        private startStateMachine():void {
            // Map Animation Clips
            let clips:BABYLON.IAnimationClip[] = this.manager.getAnimationClips(this.entity);
            if (clips != null && clips.length > 0) {
                clips.forEach((clip) => {
                    if (clip != null && clip.name != null) {
                        this.setAnimationClip(clip.name, clip);
                    }
                });
            }
            // Map State Machine Tracks
            if (this._machine != null && this._machine.states != null && this._machine.states.length > 0) {
                this._machine.states.forEach((state:BABYLON.MachineState) => {
                    if (state != null && state.name != null ) {
                        this.setTreeBranches(state.blendtree);
                        this.setMachineState(state.name, state);
                    }
                });
            }
            // Start Animmation State Machine
            if (this._executed === false) {
                this._executed = true;
                if (this.enabled === true && this._autoplay === true) {
                    if (this._legacy === true) {
                        this.manager.playAnimationClip(null, this.entity);
                    } else {
                        if (this._machine.layers != null && this._machine.layers.length > 0) {
                            if (this._skeletal == true) {
                                this._machine.layers.forEach((layer:BABYLON.IAnimationLayer) => {
                                    this.setCurrentAnimationState(layer, layer.entry, 0);
                                });
                            } else {
                                this.setCurrentAnimationState(this._machine.layers[0], this._machine.layers[0].entry, 0);
                            }
                        }
                    }
                }
            }
            // Dump State Machine Debug Information
            // console.log("*** Dump State Machine: " + this.entity.name);
            // console.log(this);
        }
        private updateStateMachine():void {
            if (this.enabled === true) {
                this.updateAnimationCurves();
                let step:number = this.manager.deltaTime; // scene.getAnimationRatio() - ???;
                if (this._machine.layers != null && this._machine.layers.length > 0) {
                    if (this._skeletal == true) {
                        this._machine.layers.forEach((layer:BABYLON.IAnimationLayer) => {
                            if (layer != null) {
                                this.processStateMachine(layer, step);
                            }
                        });
                    } else {
                        if (this._machine.layers[0] != null) {
                            this.processStateMachine(this._machine.layers[0], step);
                        }
                    }
                }
                this.updateAnimationTargets();
                // ..
                // Dispatch Final Frame Update Event
                // ..
                if (this._onAnimationFrameHandler != null) {
                    this._onAnimationFrameHandler();
                }
            }
        }
        private updateAnimationCurves():void {
            // TODO: Update Custom Animation Curves
        }
        private updateAnimationTargets() :void {
            if (this._skeletal === true && this._targets != null && this._targets.length > 0) {
                this._targets.forEach((target) => {
                    if (target != null && target instanceof BABYLON.AbstractMesh) {
                        let avatar:BABYLON.AbstractMesh = target;
                        if (avatar != null && avatar.skeleton != null && avatar.skeleton.bones != null && avatar.skeleton.bones.length > 0) {
                            let resetSkeleton:any = avatar.skeleton;
                            let resetBlending:boolean = (resetSkeleton.metadata != null && resetSkeleton.metadata.resetBlending);
                            avatar.skeleton.bones.forEach((bone:BABYLON.Bone) => {
                                this._boneAnim = null;
                                this._boneWeight = 0;
                                this._boneMatrix.reset();
                                if (resetBlending === true) {
                                    if (bone.metadata == null) bone.metadata = {};
                                    bone.metadata.blendingFactor = 0;
                                    bone.metadata.originalBlendValue = null;
                                }
                                if (bone.animations != null && bone.animations.length > 0) {
                                    for (let index = 0; index < bone.animations.length; index++) {
                                        const element = bone.animations[index];
                                        // ..
                                        // TODO: Replace string comparison for performance
                                        // ..
                                        if (element.name.substr(0, 9) === "skeleton:" && element.dataType === Animation.ANIMATIONTYPE_MATRIX) {
                                            this._boneAnim = element;
                                            break;
                                        }
                                    }
                                    if (this._boneAnim != null) {
                                        let blendingSpeed:number = avatar.skeleton.animationPropertiesOverride ? avatar.skeleton.animationPropertiesOverride.blendingSpeed : this._boneAnim.blendingSpeed;
                                        if (this._machine.layers != null && this._machine.layers.length > 0) {
                                            this._machine.layers.forEach((layer:BABYLON.IAnimationLayer) => {
                                                if (layer.animationStateMachine != null) {
                                                    layer.animationBlendWeight = 0;
                                                    layer.animationBlendMatrix.reset();
                                                    if (layer.index === 0 || layer.defaultWeight > 0) {
                                                        if (layer.index === 0 || layer.avatarMask == null || layer.avatarMask.transformIndexs == null || this.filterBoneTransformIndex(layer, bone)) {
                                                            if (layer.animationStateMachine.type === BABYLON.MotionType.Tree || (layer.animationStateMachine.type === BABYLON.MotionType.Clip && layer.animationBlendFrame >= 0 && (layer.animationBlendFirst || layer.animationBlendLoop < 2))) {
                                                                if (layer.animationBlendBuffer != null && layer.animationBlendBuffer.length > 0) {
                                                                    layer.animationBlendBuffer.forEach((blender) => {
                                                                        if (blender.track != null) {
                                                                            this._sampleMatrix.reset();
                                                                            BABYLON.Utilities.SampleAnimationMatrix(this._boneAnim, blender.frame, BABYLON.Scalar.Clamp(blender.track.behavior, 0, 1), this._sampleMatrix);
                                                                            if (blender.mirror === true) {
                                                                                // ..
                                                                                // TODO: this._sampleMatrix.multiplyToRef(BABYLON.Matrix.Scaling(1,-1,-1), this._sampleMatrix);
                                                                                // ..
                                                                            }
                                                                            this.blendAnimationMatrix(layer, this._sampleMatrix, blender.weight);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (layer.animationBlendWeight > 0) {
                                                        if (layer.animationBlendSpeed > blendingSpeed) blendingSpeed = layer.animationBlendSpeed;
                                                        this.blendBoneMatrix(layer.animationBlendMatrix, ((layer.index === 0) ? 1.0 : layer.defaultWeight));
                                                    }
                                                }
                                            });
                                        }
                                        if (this._boneWeight > 0) { 
                                            this.updateBoneMatrix(bone, (blendingSpeed > 0.0), blendingSpeed);
                                        }
                                    }
                                }
                            });
                            if (resetSkeleton.metadata == null) resetSkeleton.metadata = {};
                            resetSkeleton.metadata.resetBlending = false;
                        }
                    }
                });
            }
        }
        
        /* Animation Controller Machine Layers Functions */

        private processStateMachine(layer:BABYLON.IAnimationLayer, step:number):void {
            layer.animationTime += (step * ((layer.animationRatio * this.speedRatio) * BABYLON.Statics.SpeedCompensator));
            if (layer.animationTime > layer.animationNormalize) layer.animationTime = 0;
            layer.animationFrame = BABYLON.Scalar.Normalize(layer.animationTime, 0, layer.animationNormalize);
            // .. 
            layer.animationBlendLoop = -1;
            layer.animationBlendFrame = -1;
            layer.animationBlendFirst = false;
            layer.animationBlendBuffer = null;
            // ..
            this._checkers.result = null;
            this._checkers.offest = 0;
            this._checkers.blending = 0;
            this._checkers.triggered = [];
            // Check Animation State Transitions
            if (layer.animationStateMachine != null) {
                // Check Local Transition Conditions
                this.checkStateTransitions(layer, layer.animationStateMachine.transitions, layer.animationStateMachine.time, layer.animationStateMachine.length, layer.animationStateMachine.rate);
                // Check Any State Transition Conditions
                if (this._checkers.result == null && this._machine.transitions != null) {
                    this.checkStateTransitions(layer, this._machine.transitions, layer.animationStateMachine.time, layer.animationStateMachine.length, layer.animationStateMachine.rate);
                }
            }
            // Reset Transition Condition Triggers
            if (this._checkers.triggered != null && this._checkers.triggered.length > 0) {
                this._checkers.triggered.forEach((trigger) => { this.resetTrigger(trigger); });
                this._checkers.triggered = null;
            }
            // Set Current Machine State Result
            if (this._checkers.result != null) {
                if (this._checkers.offest > 0) {
                    this.manager.delay(()=>{ this.setCurrentAnimationState(layer, this._checkers.result, this._checkers.blending); }, this._checkers.offest * 1000);
                } else {
                    this.setCurrentAnimationState(layer, this._checkers.result, this._checkers.blending);
                }
            }
            // Parse Skeletal Animation Systems
            this.parseSkeletalAnimationTrackLayer(layer);
            // Parse Animation State System Events
            this.parseAnimationStateMachineEvents(layer);
            
        }
        private parseAnimationStateMachineEvents(layer:BABYLON.IAnimationLayer):void {

            // TODO: Dispatch State Behaviour Events For Layer


            // TODO: Dispatch Animation Track Events For Layer

            /*
            // Setup Animation Events
            if (metadata.animationEvents != null && metadata.animationEvents.length > 0 && metadata.components != null && metadata.components.length > 0) {
                let track:BABYLON.Animation = BABYLON.SceneManager.LocateOwnerAnimationTrack(0, owner, false);
                if (track != null) {
                    metadata.animationEvents.forEach((evt) => {
                        if (evt.functionName != null && evt.functionName !== "") {
                            let functionName:string = evt.functionName.toLowerCase();
                            track.addEvent(new BABYLON.AnimationEvent(evt.frame, ()=>{
                                let ownerinstance:any = (<any>machine);
                                if (ownerinstance._handlers != null && ownerinstance._handlers[functionName]) {
                                    let handler:(evt:BABYLON.IAnimationEvent)=>void = ownerinstance._handlers[functionName];
                                    if (handler) handler(evt);
                                }
                            }));
                        }
                    });
                }
            }
            */
        }
        private setCurrentAnimationState(layer:BABYLON.IAnimationLayer, name:string, blending:number):void {
            if (name == null || name === "" || name === BABYLON.AnimationState.EXIT) return;
            if (layer.animationStateMachine != null && layer.animationStateMachine.name === name) return;
            let state:BABYLON.MachineState = this.getMachineState(name);
            // ..
            // Setup Current Layer Animation State
            // ..
            if (state != null && state.layerIndex === layer.index) {
                state.time = 0;
                state.played = 0;
                state.interrupted = false;
                // ..
                // TODO: Support Multiple Entry Transitions
                // ..
                layer.animationTime = 0;
                layer.animationFrame = 0;
                layer.animationRatio = 1;
                layer.animationAnimatables = null;
                layer.animationBlendLoop = -1;
                layer.animationBlendFrame = -1;
                layer.animationBlendFirst = false;
                layer.animationBlendSpeed = blending;
                layer.animationBlendWeight = 0;
                layer.animationBlendBuffer = null;
                layer.animationStateMachine = state;
                layer.animationStateMachine.time = this.manager.time;
                layer.animationAnimatables = this.setupBaseAnimationState(layer, blending, layer.animationStateMachine.speed);
            }
        }
        private setupBaseAnimationState(layer:BABYLON.IAnimationLayer, blending:number = 0.0, playback:number = 1.0): BABYLON.Animatable[] {
            let result:BABYLON.Animatable[] = null;
            // ..
            // Setup Base Layer Animation Track Only
            // ..
            if (layer.index === 0 && this._targets != null && this._targets.length > 0) {
                this._targets.forEach((target) => {
                    if (target != null) {
                        if (this._skeletal === true) {
                            // Play Skeletal Animation System
                            if (target.skeleton != null) {
                                if (target.skeleton.metadata == null) target.skeleton.metadata = {};
                                target.skeleton.metadata.resetBlending = true;
                            }
                            this.scene.stopAnimation(target);
                            this.manager.setAnimationProperties(target, 1, blending);
                        } else {
                            // Play Standard Transform Animations
                            this.scene.stopAnimation(target);
                            let motion:BABYLON.IAnimationClip = (layer.animationStateMachine && layer.animationStateMachine.blendtree != null && layer.animationStateMachine.blendtree.children != null && layer.animationStateMachine.blendtree.children.length > 0) ? layer.animationStateMachine.blendtree.children[0].track : null;
                            if (motion != null) {
                                this.manager.setAnimationProperties(target, motion.behavior, blending);
                                let animatable:BABYLON.Animatable = this.scene.beginAnimation(target, motion.start, motion.stop, (motion.behavior < 2), playback);
                                if (animatable != null) {
                                    if (result == null) result = [];
                                    result.push(animatable);
                                }
                            }
                        }
                    }
                });
            }
            return result;
        }
        private checkStateTransitions(layer:BABYLON.IAnimationLayer, transitions:BABYLON.ITransition[], time:number, length:number, rate:number):any {
            if (this.enableTransitions === true && transitions != null && transitions.length > 0) {
                let i:number = 0; let ii:number = 0; let solo:number = -1;
                // ..
                // Check Has Solo Transitions
                // ..
                for(i = 0; i < transitions.length; i++ ) {
                    if (transitions[i].solo === true && transitions[i].mute === false) {
                        solo = i;
                        break;
                    }
                }
                // Check State Machine Transitions
                for(i = 0; i < transitions.length; i++ ) {
                    let transition:BABYLON.ITransition = transitions[i];
                    if (transition.layerIndex !== layer.index) continue;
                    if (transition.mute === true) continue;
                    if (solo >= 0 && solo !== i) continue;
                    let transitionOk:boolean = false;
                    // Check Has Transition Exit Time
                    let exitTimeSecs:number = BABYLON.Scalar.Denormalize(transition.exitTime, 0, length);
                    let exitTimeExpired:boolean = ((this.manager.time - time) >= exitTimeSecs);
                    if (transition.hasExitTime === true && transition.intSource == BABYLON.InterruptionSource.None && exitTimeExpired === false) continue;
                    // Check All Transition Conditions
                    if (transition.conditions != null && transition.conditions.length > 0) {
                        let passed:number = 0; let checks:number = transition.conditions.length;
                        transition.conditions.forEach((condition) => {
                            if (this.entity.metadata.state.parameters[condition.parameter] != null) {
                                let ptype:BABYLON.AnimatorParameterType = this.entity.metadata.state.parameters[condition.parameter];
                                if (ptype == BABYLON.AnimatorParameterType.Float || ptype == BABYLON.AnimatorParameterType.Int) {
                                    let numValue:number = parseFloat(this.getFloat(condition.parameter).toFixed(2));
                                    if (condition.mode === BABYLON.ConditionMode.Greater && numValue > condition.threshold) {
                                        passed++;
                                    } else if (condition.mode === BABYLON.ConditionMode.Less && numValue < condition.threshold) {
                                        passed++;
                                    } else if (condition.mode === BABYLON.ConditionMode.Equals && numValue === condition.threshold) {
                                        passed++;
                                    } else if (condition.mode === BABYLON.ConditionMode.NotEqual && numValue !== condition.threshold) {
                                        passed++;
                                    }
                                } else if (ptype == BABYLON.AnimatorParameterType.Bool) {
                                    let boolValue:boolean = this.getBool(condition.parameter);
                                    if (condition.mode === BABYLON.ConditionMode.If && boolValue === true) {
                                        passed++;
                                    } else if (condition.mode === BABYLON.ConditionMode.IfNot && boolValue === false) {
                                        passed++;
                                    }
                                } else if (ptype == BABYLON.AnimatorParameterType.Trigger) {
                                    let triggerValue:boolean = this.getTrigger(condition.parameter);
                                    if (triggerValue === true) {
                                        passed++;
                                        if (this._checkers.triggered.indexOf(condition.parameter) < 0) {
                                            this._checkers.triggered.push(condition.parameter);
                                        }
                                    }
                                }
                            }
                        });
                        if (transition.hasExitTime === true) {
                            // ..
                            // TODO: CHECK TRANSITION INTERUPTION SOURCE STATUS
                            // ..
                            // Validate Transition Has Exit Time And All Conditions Passed
                            transitionOk = (exitTimeExpired === true && passed === checks);
                        } else {
                            // Validate All Transition Conditions Passed
                            transitionOk = (passed === checks);
                        }
                    } else {
                        // Validate Transition Has Expired Exit Time Only
                        transitionOk = (transition.hasExitTime === true && exitTimeExpired === true);
                    }
                    // Validate Current Transition Destination Change
                    if (transitionOk === true) {
                        let destState:string = (transition.isExit === false) ? transition.destination : BABYLON.AnimationState.EXIT;
                        let offsetSecs:number = BABYLON.Scalar.Denormalize(transition.offset, 0, length);
                        let durationSecs:number = BABYLON.Scalar.Denormalize(transition.duration, 0, length);
                        let blendingSpeed:number = BABYLON.Utilities.ComputeBlendingSpeed(rate, durationSecs); 
                        this._checkers.result = destState;
                        this._checkers.offest = offsetSecs;
                        this._checkers.blending = blendingSpeed;
                        break;
                    }
                }
            }
        }
        private computeSpeedRatio(layer:BABYLON.IAnimationLayer, start:BABYLON.IAnimationClip, end:BABYLON.IAnimationClip = null, delta:number = 1.0, playback:number = 1.0) :number {
            let result:number = 1.0;
            if (start != null && end != null) {
                let startRatio:number = (layer.animationReference / this.getAnimationFrames(start));
                let endRatio:number = (layer.animationReference / this.getAnimationFrames(end));
                result = BABYLON.Scalar.Lerp(startRatio, endRatio, delta);
            } else if (start != null && end == null) {
                result = (layer.animationReference / this.getAnimationFrames(start));
            } else if (end != null && start == null) {
                result = (layer.animationReference / this.getAnimationFrames(end));
            }
            return result * playback;
        }
        private blendAnimationMatrix(layer:BABYLON.IAnimationLayer, matrix:BABYLON.Matrix, weight:number = 1.0):void {
            if (matrix != null && weight > 0 && layer.animationBlendMatrix != null) {
                let blendWeight:number = BABYLON.Scalar.Clamp(weight, 0.0, 1.0);
                if (layer.animationBlendWeight === 0) {
                    layer.animationBlendMatrix.copyFrom(matrix);
                } else {
                    BABYLON.Utilities.FastMatrixSlerp(layer.animationBlendMatrix, matrix, blendWeight, layer.animationBlendMatrix);
                }
                layer.animationBlendWeight += blendWeight;
            }
        }
        private checkBoneTransformPath(layer:BABYLON.IAnimationLayer, transformPath:string):boolean {
            let result:boolean = false;
            if (layer.avatarMask != null && layer.avatarMask.transformPaths != null && layer.avatarMask.transformPaths.length > 0) {
                if (layer.avatarMask.transformPaths.indexOf(transformPath) >= 0) {
                    result = true;
                }
            }
            return result;
        }
        private filterBoneTransformIndex(layer:BABYLON.IAnimationLayer, bone:BABYLON.Bone):boolean {
            let result:boolean = false;
            if (layer.avatarMask != null && layer.avatarMask.transformIndexs != null && layer.avatarMask.transformIndexs.length > 0) {
                if (bone.metadata != null && bone.metadata.index != null && layer.avatarMask.transformIndexs.indexOf(bone.metadata.index) >= 0) {
                    result = true;
                }
            }
            return result;
        }
        private sortBlendingBuffer(layer:BABYLON.IAnimationLayer):void {
            if (layer.animationBlendBuffer != null && layer.animationBlendBuffer.length > 0) {
                // Sort In Descending Order
                layer.animationBlendBuffer.sort((left, right): number => {
                    if (left.weight < right.weight) return 1;
                    if (left.weight > right.weight) return -1;
                    return 0;
                });
            }
        }

        /* Animation Controller Reset Tree Functions */
        
        private resetTreeBranches(layer:BABYLON.IAnimationLayer, tree:BABYLON.IBlendTree):void {
            tree.directBlendMaster = null;
            tree.simpleThresholdEqual = null;
            tree.simpleThresholdLower = null;
            tree.simpleThresholdUpper = null;
            tree.simpleThresholdDelta = 1.0;
            tree.valueParameterX = parseFloat(this.getFloat(tree.blendParameterX).toFixed(2));
            tree.valueParameterY = parseFloat(this.getFloat(tree.blendParameterY).toFixed(2));
            if (tree.children != null && tree.children.length > 0) {
                tree.children.forEach((child) => {
                    child.input = -1;
                    child.frame = -1;
                    child.weight = -1;
                    child.indexs = (layer.avatarMask != null && layer.avatarMask.transformIndexs != null && layer.avatarMask.transformIndexs.length > 0) ? layer.avatarMask.transformIndexs : null;
                    this.resetInputDistanceWeight(tree, child);
                    if (child.type === BABYLON.MotionType.Tree) {
                        this.resetTreeBranches(layer, child.subtree);
                    }
                });
                this.resetInputDistanceThreasholds(tree);
            }
        }
        private resetInputDistanceWeight(parent:BABYLON.IBlendTree, child:BABYLON.IBlendTreeChild):void {
            this._childPosition.x = child.positionX;
            this._childPosition.y = child.positionY;
            this._inputPosition.x = parent.valueParameterX;
            this._inputPosition.y = parent.valueParameterY;
            switch(parent.blendType) {
                case BABYLON.BlendTreeType.Simple1D: {
                    if (parent.simpleThresholdEqual == null) {
                        if (parent.valueParameterX === child.threshold) {
                            parent.simpleThresholdEqual = child;
                            parent.simpleThresholdLower = null;
                            parent.simpleThresholdUpper = null;
                        } else if (parent.valueParameterX > child.threshold) {
                            // Get Closest Lower Threshold
                            if (parent.simpleThresholdLower == null) {
                                parent.simpleThresholdLower = child;
                            } else {
                                if (child.threshold > parent.simpleThresholdLower.threshold) {
                                    parent.simpleThresholdLower = child;
                                }
                            }
                        } else if (parent.valueParameterX < child.threshold) {
                            // Get Closest Upper Threshold
                            if (parent.simpleThresholdUpper == null) {
                                parent.simpleThresholdUpper = child;
                            } else {
                                if (child.threshold < parent.simpleThresholdUpper.threshold) {
                                    parent.simpleThresholdUpper = child;
                                }
                            }
                        }
                    }
                    break;
                }
                case BABYLON.BlendTreeType.SimpleDirectional2D:
                    child.input = this.computeSimpleDirectionalWeight(parent, this._inputPosition, this._childPosition);
                    break;
                case BABYLON.BlendTreeType.FreeformDirectional2D:
                    child.input = this.computeFreeformDirectionalWeight(parent, this._inputPosition, this._childPosition);
                    break;
                case BABYLON.BlendTreeType.FreeformCartesian2D: {
                    child.input = this.computeFreeformCartesianWeight(parent, this._inputPosition, this._childPosition);
                    break;
                }
            }
        }
        private resetInputDistanceThreasholds(parent:BABYLON.IBlendTree):void {
            if (parent.blendType === BABYLON.BlendTreeType.Simple1D) {
                if (parent.simpleThresholdEqual == null) {
                    if (parent.simpleThresholdLower != null && parent.simpleThresholdUpper == null) {
                        parent.simpleThresholdEqual = parent.simpleThresholdLower;
                        parent.simpleThresholdLower = null;
                        parent.simpleThresholdUpper = null;
                    } else if (parent.simpleThresholdUpper != null && parent.simpleThresholdLower == null) {
                        parent.simpleThresholdEqual = parent.simpleThresholdUpper;
                        parent.simpleThresholdLower = null;
                        parent.simpleThresholdUpper = null;
                    }
                }
                if (parent.simpleThresholdLower != null && parent.simpleThresholdUpper != null) {
                    parent.simpleThresholdDelta = parseFloat(BABYLON.Scalar.Normalize(parent.valueParameterX, parent.simpleThresholdLower.threshold, parent.simpleThresholdUpper.threshold).toFixed(2));
                } else {
                    parent.simpleThresholdDelta = 1.0;
                }
            }
        }

        /* Animation Controller Parse Blend Tree Functions */
        
        private parseTreeBranches(layer:BABYLON.IAnimationLayer, tree:BABYLON.IBlendTree, frame:number):void {
            if (tree != null && tree.children != null && tree.children.length > 0) {
                tree.children.forEach((child) => {
                    switch(tree.blendType) {
                        case BABYLON.BlendTreeType.Clip:
                            this.parseClipTreeItem(layer, tree, child, frame);
                            break;
                        case BABYLON.BlendTreeType.Direct:
                            this.parseDirectTreeItem(layer, tree, child, frame);
                            break;
                        case BABYLON.BlendTreeType.Simple1D:
                            this.parseSimpleTreeItem(layer, tree, child, frame);
                            break;
                        case BABYLON.BlendTreeType.SimpleDirectional2D:
                            this.parseSimpleDirectionalTreeItem(layer, tree, child, frame);
                            break;
                        case BABYLON.BlendTreeType.FreeformDirectional2D:
                            this.parseFreeformDirectionalTreeItem(layer, tree, child, frame);
                            break;
                        case BABYLON.BlendTreeType.FreeformCartesian2D:
                            this.parseFreeformCartesianTreeItem(layer, tree, child, frame);
                            break;
                    }
                    if (child.weight > 0) {
                        if (layer.animationBlendBuffer == null) layer.animationBlendBuffer = [];
                        layer.animationBlendBuffer.push(child);
                    }
                });
            }
        }
        private parseClipTreeItem(layer:BABYLON.IAnimationLayer, parent:BABYLON.IBlendTree, child:BABYLON.IBlendTreeChild, frame:number):void {
            if (child != null && parent != null) {
                if (child.track != null && layer.animationStateMachine != null) {
                    layer.animationBlendLoop = child.track.behavior;
                    layer.animationBlendFirst = (layer.animationStateMachine.played !== -1 && layer.animationStateMachine.played <= child.track.frames);
                    if (layer.animationBlendFirst === false && layer.animationStateMachine.played !== -1) layer.animationStateMachine.played = -1;
                    layer.animationBlendFrame = this.getDenormalizedFrame(child.track, layer.animationFrame);
                    child.frame = layer.animationBlendFrame;
                    child.weight = 1.0;
                }
            }
        }        
        private parseDirectTreeItem(layer:BABYLON.IAnimationLayer, parent:BABYLON.IBlendTree, child:BABYLON.IBlendTreeChild, frame:number):void {
            if (child != null && parent != null) {
                if (child.type === BABYLON.MotionType.Tree) {
                    this.parseTreeBranches(layer, child.subtree, frame);
                } else if (child.type === BABYLON.MotionType.Clip) {
                    if (child.track != null && layer.animationStateMachine != null) {
                        child.frame = this.getDenormalizedFrame(child.track, frame);
                        child.weight = this.getFloat(child.directBlendParameter);
                        if (parent.directBlendMaster == null || child.weight > parent.directBlendMaster.weight) {
                            parent.directBlendMaster = child;
                        }
                    }
                }
            }
        }
        private parseSimpleTreeItem(layer:BABYLON.IAnimationLayer, parent:BABYLON.IBlendTree, child:BABYLON.IBlendTreeChild, frame:number):void {
            if (child != null && parent != null) {
                if (parent.simpleThresholdEqual != null && child.threshold === parent.simpleThresholdEqual.threshold) {
                    if (child.type === BABYLON.MotionType.Tree) {
                        this.parseTreeBranches(layer, child.subtree, frame);
                    } else if (child.type === BABYLON.MotionType.Clip) {
                        if (child.track != null && layer.animationStateMachine != null) {
                            child.frame = this.getDenormalizedFrame(child.track, frame);
                            child.weight = 1.0; // Note: Using Simple Weight Trigger
                        }
                    }
                } else if (parent.simpleThresholdLower != null && parent.simpleThresholdUpper != null && child.threshold >= parent.simpleThresholdLower.threshold && child.threshold <= parent.simpleThresholdUpper.threshold) {
                    if (child.type === BABYLON.MotionType.Tree) {
                        this.parseTreeBranches(layer, child.subtree, frame);
                    } else if (child.type === BABYLON.MotionType.Clip) {
                        if (child.track != null && layer.animationStateMachine != null) {
                            child.frame = this.getDenormalizedFrame(child.track, frame);
                            child.weight = 1.0; // Note: Using Simple Weight Trigger
                        }
                    }
                }
            }
        }
        private parseSimpleDirectionalTreeItem(layer:BABYLON.IAnimationLayer, parent:BABYLON.IBlendTree, child:BABYLON.IBlendTreeChild, frame:number):void {
            if (child != null && parent != null) {
                if (child.type === BABYLON.MotionType.Tree) {
                    this.parseTreeBranches(layer, child.subtree, frame);
                } else if (child.type === BABYLON.MotionType.Clip) {
                    if (child.track != null && layer.animationStateMachine != null) {
                        child.frame = this.getDenormalizedFrame(child.track, frame);
                        child.weight = 0; // TODO: Use child.input weight if applicable to simple directional
                    }
                }
            }
        }
        private parseFreeformDirectionalTreeItem(layer:BABYLON.IAnimationLayer, parent:BABYLON.IBlendTree, child:BABYLON.IBlendTreeChild, frame:number):void {
            if (child != null && parent != null) {
                if (child.type === BABYLON.MotionType.Tree) {
                    this.parseTreeBranches(layer, child.subtree, frame);
                } else if (child.type === BABYLON.MotionType.Clip) {
                    if (child.track != null && layer.animationStateMachine != null) {
                        child.frame = this.getDenormalizedFrame(child.track, frame);
                        child.weight = 0; // TODO: Use child.input weight if applicable to freeform directional
                    }
                }
            }
        }
        private parseFreeformCartesianTreeItem(layer:BABYLON.IAnimationLayer, parent:BABYLON.IBlendTree, child:BABYLON.IBlendTreeChild, frame:number):void {
            if (child != null && parent != null) {
                if (child.type === BABYLON.MotionType.Tree) {
                    this.parseTreeBranches(layer, child.subtree, frame);
                } else if (child.type === BABYLON.MotionType.Clip) {
                    if (child.track != null && layer.animationStateMachine != null) {
                        child.frame = this.getDenormalizedFrame(child.track, frame);
                        child.weight = 0; // TODO: Use child.input weight if applicable to freeform cartesian
                    }
                }
            }
        }
        private parseSkeletalAnimationTrackLayer(layer:BABYLON.IAnimationLayer) :void {
            if (this._skeletal === true) {
                if (layer.animationStateMachine != null && layer.animationStateMachine.blendtree != null) {
                    if (layer.animationStateMachine.type === BABYLON.MotionType.Clip && layer.animationStateMachine.played !== -1) layer.animationStateMachine.played += (this.manager.deltaTime * this._fps);
                    this.resetTreeBranches(layer, layer.animationStateMachine.blendtree);
                    this.parseTreeBranches(layer, layer.animationStateMachine.blendtree, layer.animationFrame);
                    if (layer.animationBlendBuffer != null && layer.animationBlendBuffer.length > 0) {
                        if (layer.animationStateMachine.type === BABYLON.MotionType.Clip) {
                            // Set Single Clip Speed Ratio
                            layer.animationRatio = this.computeSpeedRatio(layer, layer.animationBlendBuffer[0].track, null, 1.0, layer.animationStateMachine.speed);
                        } else if (layer.animationStateMachine.type === BABYLON.MotionType.Tree) {
                            // Parse Blend Tree Speed Ratio
                            switch(layer.animationStateMachine.blendtree.blendType) {
                                case BABYLON.BlendTreeType.Direct:
                                    this.sortBlendingBuffer(layer);
                                    if (layer.animationStateMachine.blendtree.directBlendMaster != null) {
                                        layer.animationRatio = this.computeSpeedRatio(layer, layer.animationStateMachine.blendtree.directBlendMaster.track, null, 1.0, layer.animationStateMachine.blendtree.directBlendMaster.timescale) * this.directBlendSpeed;
                                    }
                                    break;
                                case BABYLON.BlendTreeType.Simple1D:
                                    // Do Not Sort Blend Buffer
                                    if (layer.animationBlendBuffer.length === 1) {
                                        layer.animationRatio = this.computeSpeedRatio(layer, layer.animationBlendBuffer[0].track, null, 1.0, layer.animationBlendBuffer[0].timescale);
                                    } else {
                                        layer.animationBlendBuffer[0].weight = 1.0;
                                        layer.animationBlendBuffer[1].weight = layer.animationStateMachine.blendtree.simpleThresholdDelta; // TODO: Handle Nested Delta Weight (Fix Jumpiness In Nested Clips)
                                        layer.animationRatio = this.computeSpeedRatio(layer, layer.animationBlendBuffer[0].track, layer.animationBlendBuffer[1].track, layer.animationStateMachine.blendtree.simpleThresholdDelta, layer.animationBlendBuffer[1].timescale);
                                    }
                                    break;
                                case BABYLON.BlendTreeType.SimpleDirectional2D:
                                    this.sortBlendingBuffer(layer);
                                    // TODO: Update layer.animationRatio
                                    break;
                                case BABYLON.BlendTreeType.FreeformDirectional2D:
                                    this.sortBlendingBuffer(layer);
                                    // TODO: Update layer.animationRatio
                                    break;
                                case BABYLON.BlendTreeType.FreeformCartesian2D:
                                    this.sortBlendingBuffer(layer);
                                    // TODO: Update layer.animationRatio
                                    break;
                            }
                        }
                    }
                }
            }
        }

        /* Animation Controller Compute Blend Child Weights Functions */
        
        private computeSimpleDirectionalWeight(parentTree:BABYLON.IBlendTree, inputPosition:BABYLON.Vector2, childPosition:BABYLON.Vector2):number {
            let weight:number = 0;
            let inputDistance:number = inputPosition.subtract(childPosition).lengthSquared();
            // let inputAngle:number = BABYLON.Vector2.Angle(inputPosition, childPosition);
            // cosinus similarity from -1f to -1f shifted to 0 to 1f( same angle cosinus similarity=0f and max opposite direction -1f)
            // 1/d1+1/d2+1/d3...
            // ..
            // let inputAngle:number = (BABYLON.Scalar.Clamp(BABYLON.Vector2.Dot(inputPosition.normalize(), childPosition.normalize()), -1, 1)-1) * (-0.5);
            // ..
            // TODO: Calculate Weight based on input distance and angle - ???            
            // ..
            return weight;
        }
        private computeFreeformDirectionalWeight(parentTree:BABYLON.IBlendTree, inputPosition:BABYLON.Vector2, childPosition:BABYLON.Vector2):number {
            let weight:number = 0;
            let inputDistance:number = inputPosition.subtract(childPosition).lengthSquared();
            // let inputAngle:number = BABYLON.Vector2.Angle(inputPosition, childPosition);
            // cosinus similarity from -1f to -1f shifted to 0 to 1f( same angle cosinus similarity=0f and max opposite direction -1f)
            // 1/d1+1/d2+1/d3...
            // ..
            // let inputAngle:number = (BABYLON.Scalar.Clamp(BABYLON.Vector2.Dot(inputPosition.normalize(), childPosition.normalize()), -1, 1)-1) * (-0.5);
            // ..
            // TODO: Calculate Weight based on input distance and angle - ???            
            // ..
            return weight;
        }
        private computeFreeformCartesianWeight(parentTree:BABYLON.IBlendTree, inputPosition:BABYLON.Vector2, childPosition:BABYLON.Vector2):number {
            let weight:number = 0;
            let inputDistance:number = inputPosition.subtract(childPosition).lengthSquared();
            // let inputAngle:number = BABYLON.Vector2.Angle(inputPosition, childPosition);
            // cosinus similarity from -1f to -1f shifted to 0 to 1f( same angle cosinus similarity=0f and max opposite direction -1f)
            // 1/d1+1/d2+1/d3...
            // ..
            // let inputAngle:number = (BABYLON.Scalar.Clamp(BABYLON.Vector2.Dot(inputPosition.normalize(), childPosition.normalize()), -1, 1)-1) * (-0.5);
            // ..
            // TODO: Calculate Weight based on input distance and angle - ???            
            // ..
            return weight;
        }
    }
}
