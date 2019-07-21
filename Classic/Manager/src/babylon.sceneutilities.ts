/// <reference path="babylon.d.ts" />
/// <reference path="babylon.scenecomponents.ts" />
/// <reference path="babylon.scenemanager.ts" />

module BABYLON {
    export class Utilities {
        private static UpVector:BABYLON.Vector3 = BABYLON.Vector3.Up();
        private static ZeroVector:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        private static TempMatrix:BABYLON.Matrix = BABYLON.Matrix.Zero();
        private static TempVector2:BABYLON.Vector2 = BABYLON.Vector2.Zero();
        private static TempVector3:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        private static PrintElement: HTMLElement = null;
        /** TODO: angle */
		public static Angle(from:BABYLON.Vector3, to:BABYLON.Vector3):number {
			return Math.acos(BABYLON.Scalar.Clamp(BABYLON.Vector3.Dot(from.normalize(), to.normalize()), -1, 1)) * 57.29578;
        }
        /** TODO: clamp angle */
        public static ClampAngle(angle:number, min:number, max:number):number {
            let result:number = angle;
            do {
                if (result < -360) {
                    result += 360;
                }
                if (result > 360) {
                    result -= 360;
                }
            } while (result < -360 || result > 360)
            return BABYLON.Scalar.Clamp(result, min, max);
        }
        /** Returns a new radion converted from degree */
		public static Deg2Rad(degree:number):number {
			return degree * BABYLON.Statics.Deg2Rad;
        }
        /** Returns a new degree converted from radion */
		public static Rad2Deg(radion:number):number {
			return radion * BABYLON.Statics.Rad2Deg;
        }
        /** Returns a new Quaternion set from the passed Euler float angles (x, y, z). */
        public static Euler(eulerX:number, eulerY:number, eulerZ:number) : BABYLON.Quaternion {
            return BABYLON.Quaternion.RotationYawPitchRoll(eulerY, eulerX, eulerZ);
        }
        /** Returns a new Quaternion set from the passed Euler float angles (x, y, z). */
        public static EulerToRef(eulerX:number, eulerY:number, eulerZ:number, result:BABYLON.Quaternion):void  {
            BABYLON.Quaternion.RotationYawPitchRollToRef(eulerY, eulerX, eulerZ, result);
        }
        /** Returns a new Matrix as a rotation matrix from the Euler angles (x, y, z). */
        public static Matrix(eulerX:number, eulerY:number, eulerZ:number) : BABYLON.Matrix {
            return BABYLON.Matrix.RotationYawPitchRoll(eulerY, eulerX, eulerZ);
        }
        /** Returns a new Matrix as a rotation matrix from the Euler angles (x, y, z). */
        public static MatrixToRef(eulerX:number, eulerY:number, eulerZ:number, result:BABYLON.Matrix): void {
            BABYLON.Matrix.RotationYawPitchRollToRef(eulerY, eulerX, eulerZ, result);
        }
        /** Multplies a quaternion by a vector (rotates vector) */
        public static RotateVector(vec: BABYLON.Vector3, quat: BABYLON.Quaternion): BABYLON.Vector3 {
            let tx:number = 2 * (quat.y * vec.z - quat.z * vec.y);
            let ty:number = 2 * (quat.z * vec.x - quat.x * vec.z);
            let tz:number = 2 * (quat.x * vec.y - quat.y * vec.x);
            return new BABYLON.Vector3(vec.x + quat.w * tx + (quat.y * tz - quat.z * ty), vec.y + quat.w * ty + (quat.z * tx - quat.x * tz), vec.z + quat.w * tz + (quat.x * ty - quat.y * tx));
        }
        /** Multplies a quaternion by a vector (rotates vector) */
        public static RotateVectorToRef(vec: BABYLON.Vector3, quat: BABYLON.Quaternion, result: BABYLON.Vector3): void {
            let tx:number = 2 * (quat.y * vec.z - quat.z * vec.y);
            let ty:number = 2 * (quat.z * vec.x - quat.x * vec.z);
            let tz:number = 2 * (quat.x * vec.y - quat.y * vec.x);
            result.x = vec.x + quat.w * tx + (quat.y * tz - quat.z * ty);
            result.y = vec.y + quat.w * ty + (quat.z * tx - quat.x * tz);
            result.z = vec.z + quat.w * tz + (quat.x * ty - quat.y * tx);
        }
        /** Returns a new Quaternion set from the passed vector position. */
        public static LookRotation(position:BABYLON.Vector3):BABYLON.Quaternion {
            let result:BABYLON.Quaternion = BABYLON.Quaternion.Zero();
            BABYLON.Utilities.LookRotationToRef(position, result);
            return result;
        }
        /** Returns a new Quaternion set from the passed vector position. */
        public static LookRotationToRef(position:BABYLON.Vector3, result:BABYLON.Quaternion):void {
            BABYLON.Utilities.TempMatrix.reset();
            BABYLON.Matrix.LookAtLHToRef(BABYLON.Utilities.ZeroVector, position, BABYLON.Utilities.UpVector, BABYLON.Utilities.TempMatrix)
            BABYLON.Utilities.TempMatrix.invert()
            BABYLON.Quaternion.FromRotationMatrixToRef(BABYLON.Utilities.TempMatrix, result);
        }
        /** Resets the physics parent and positioning */
        public static ResetPhysicsPosition(position:BABYLON.Vector3, parent:BABYLON.Node):void {
            let check:any = parent;
            if (check.position) {
                position.addInPlace(check.position);
            }
            if (check.parent != null) {
                BABYLON.Utilities.ResetPhysicsPosition(position, check.parent);
            }
        }

        // *********************************** //
        // * Public Print To Screen Support  * //
        // *********************************** //

        public static PrintToScreen(text:string, color:string = "white") {
            BABYLON.Utilities.PrintElement = document.getElementById("print");
            if (BABYLON.Utilities.PrintElement == null) {
                let printer = document.createElement("div");
                printer.id = "print";
                printer.style.position = "absolute";
                printer.style.left = "6px";
                printer.style.bottom = "3px";
                printer.style.fontSize = "12px";
                printer.style.zIndex = "10000";
                printer.style.color = "#0c0";
                document.body.appendChild(printer);
                BABYLON.Utilities.PrintElement = printer;
            }
            if (BABYLON.Utilities.PrintElement != null && BABYLON.Utilities.PrintElement.innerHTML !== text) {
                if (BABYLON.Utilities.PrintElement.style.color !== color) BABYLON.Utilities.PrintElement.style.color = color;
                BABYLON.Utilities.PrintElement.innerHTML = text;
            }
        }
        
        // *********************************** //
        // *  Scene Transform Tools Support  * //
        // *********************************** //
        
        /** Transforms position from local space to world space. */
        public  static TransformPosition(owner: BABYLON.AbstractMesh | BABYLON.Camera, position:BABYLON.Vector3):BABYLON.Vector3 {
            return BABYLON.Vector3.TransformCoordinates(position, owner.getWorldMatrix());
        }
        /** Transforms position from local space to world space. */
        public static TransformPositionToRef(owner: BABYLON.AbstractMesh | BABYLON.Camera, position:BABYLON.Vector3, result:BABYLON.Vector3):void {
            return BABYLON.Vector3.TransformCoordinatesToRef(position, owner.getWorldMatrix(), result);
        }
        /** Transforms direction from local space to world space. */
        public static TransformDirection(owner: BABYLON.AbstractMesh | BABYLON.Camera, direction:BABYLON.Vector3):BABYLON.Vector3 {
            return BABYLON.Vector3.TransformNormal(direction, owner.getWorldMatrix());
        }
        /** Transforms direction from local space to world space. */
        public static TransformDirectionToRef(owner: BABYLON.AbstractMesh | BABYLON.Camera, direction:BABYLON.Vector3, result:BABYLON.Vector3):void {
            return BABYLON.Vector3.TransformNormalToRef(direction, owner.getWorldMatrix(), result);
        }
        /** Recomputes the meshes bounding center pivot point */
        public static RecomputePivotPoint(owner:BABYLON.AbstractMesh):void {
            var boundingCenter = owner.getBoundingInfo().boundingSphere.center;
            owner.setPivotMatrix(BABYLON.Matrix.Translation(-boundingCenter.x, -boundingCenter.y, -boundingCenter.z));
        }      
          
        // ************************************ //
        // *  Scene Direction Helper Support  * //
        // ************************************ //

        /** Gets any direction vector of the owner in world space. */
        public static GetDirectionVector(owner: BABYLON.AbstractMesh | BABYLON.Camera, vector:BABYLON.Vector3):BABYLON.Vector3 {
            return owner.getDirection(vector);
        }
        /** Gets any direction vector of the owner in world space. */
        public static GetDirectionVectorToRef(owner: BABYLON.AbstractMesh | BABYLON.Camera, vector:BABYLON.Vector3, result:BABYLON.Vector3):void {
            owner.getDirectionToRef(vector, result);
        }
        /** Gets the blue axis of the owner in world space. */
        public static GetForwardVector(owner: BABYLON.AbstractMesh | BABYLON.Camera):BABYLON.Vector3 {
            return owner.getDirection(BABYLON.Vector3.Forward());
        }
        /** Gets the blue axis of the owner in world space. */
        public static GetForwardVectorToRef(owner: BABYLON.AbstractMesh | BABYLON.Camera, result:BABYLON.Vector3):void {
            owner.getDirectionToRef(BABYLON.Vector3.Forward(), result);
        }
        /** Gets the red axis of the owner in world space. */
        public static GetRightVector(owner: BABYLON.AbstractMesh | BABYLON.Camera):BABYLON.Vector3 {
            return owner.getDirection(BABYLON.Vector3.Right());
        }
        /** Gets the red axis of the owner in world space. */
        public static GetRightVectorToRef(owner: BABYLON.AbstractMesh | BABYLON.Camera, result:BABYLON.Vector3):void {
            owner.getDirectionToRef(BABYLON.Vector3.Right(), result);
        }
        /** Gets the green axis of the owner in world space. */
        public static GetUpVector(owner: BABYLON.AbstractMesh | BABYLON.Camera):BABYLON.Vector3 {
            return owner.getDirection(BABYLON.Vector3.Up());
        }
        /** Gets the green axis of the owner in world space. */
        public static GetUpVectorToRef(owner: BABYLON.AbstractMesh | BABYLON.Camera, result:BABYLON.Vector3):void {
            owner.getDirectionToRef(BABYLON.Vector3.Up(), result);
        }
        
        // *********************************** //
        // *   Public Parse Tools Support    * //
        // *********************************** //

        public static ParseColor3(source:any, defaultValue:BABYLON.Color3 = null):BABYLON.Color3 {
            let result:BABYLON.Color3 = null
            if (source != null && source.r != null && source.g != null&& source.b != null) {
                result = new BABYLON.Color3(source.r, source.g, source.b);
            } else {
                result = defaultValue;
            }
            return result;
        }

        public static ParseColor4(source:any, defaultValue:BABYLON.Color4 = null):BABYLON.Color4 {
            let result:BABYLON.Color4 = null
            if (source != null && source.r != null && source.g != null && source.b != null && source.a != null) {
                result = new BABYLON.Color4(source.r, source.g, source.b, source.a);
            } else {
                result = defaultValue;
            }
            return result;
        }
        
        public static ParseVector2(source:any, defaultValue:BABYLON.Vector2 = null):BABYLON.Vector2 {
            let result:BABYLON.Vector2 = null
            if (source != null && source.x != null && source.y != null) {
                result = new BABYLON.Vector2(source.x, source.y);
            } else {
                result = defaultValue;
            }
            return result;
        }

        public static ParseVector3(source:any, defaultValue:BABYLON.Vector3 = null):BABYLON.Vector3 {
            let result:BABYLON.Vector3 = null
            if (source != null && source.x != null && source.y != null && source.z != null) {
                result = new BABYLON.Vector3(source.x, source.y, source.z);
            } else  {
                result = defaultValue;
            }
            return result;
        }

        public static ParseVector4(source:any, defaultValue:BABYLON.Vector4 = null):BABYLON.Vector4 {
            let result:BABYLON.Vector4 = null
            if (source != null && source.x != null && source.y != null && source.z != null && source.w != null) {
                result = new BABYLON.Vector4(source.x, source.y, source.z, source.w);
            } else {
                result = defaultValue;
            }
            return result;
        }
        
        public static ParseTransform(source:any, defaultValue:any = null):any {
            return null; // TODO: Support Transform Serialization
        }
        
        // ************************************ //
        // * Public String Tools Support * //
        // ************************************ //

        public static StartsWith(source:string, word:string):boolean {
            return source.lastIndexOf(word, 0) === 0;
        }

        public static EndsWith(source:string, word:string):boolean {
            return source.indexOf(word, source.length - word.length) !== -1;
        }
        
        public static ReplaceAll(source:string, word:string, replace:string):string {
            return source.replace(new RegExp(word, 'g'), replace);            
        }
        
        // ************************************ //
        // *  Scene Animation Sampling Tools  * //
        // ************************************ //
        
        /** Set the passed matrix "result" as the sampled key frame value for the specfied animation track. */
        public static SampleAnimationMatrix(animation:BABYLON.Animation, frame: number, loopMode:number, result:BABYLON.Matrix): void {
            if (animation != null && animation.dataType === BABYLON.Animation.ANIMATIONTYPE_MATRIX) {
                let keys:BABYLON.IAnimationKey[] = animation.getKeys();
                if (frame < keys[0].frame) {
                    frame = keys[0].frame;
                } else if (frame > keys[keys.length - 1].frame) {
                    frame = keys[keys.length - 1].frame;
                }
                BABYLON.Utilities.FastMatrixInterpolate(animation, frame, loopMode, result);
            }
        }
        /** Gets the float "result" as the sampled key frame value for the specfied animation track. */
        public static SampleAnimationFloat(animation:BABYLON.Animation, frame: number, repeatCount: number, loopMode:number, offsetValue:any = null, highLimitValue: any = null): number {
            let result:number = 0;
            if (animation != null && animation.dataType === BABYLON.Animation.ANIMATIONTYPE_FLOAT) {
                let keys:BABYLON.IAnimationKey[] = animation.getKeys();
                if (frame < keys[0].frame) {
                    frame = keys[0].frame;
                } else if (frame > keys[keys.length - 1].frame) {
                    frame = keys[keys.length - 1].frame;
                }
                result = BABYLON.Utilities.FastFloatInterpolate(animation, frame, repeatCount, loopMode, offsetValue, highLimitValue);
            }
            return result;
        }
        /** Set the passed matrix "result" as the interpolated values for "gradient" (float) between the ones of the matrices "startValue" and "endValue". */
        public static FastMatrixLerp(startValue:BABYLON.Matrix, endValue:BABYLON.Matrix, gradient:number, result:BABYLON.Matrix): void {
            BABYLON.Matrix.LerpToRef(startValue, endValue, gradient, result);
        }
        /** Set the passed matrix "result" as the spherical interpolated values for "gradient" (float) between the ones of the matrices "startValue" and "endValue". */
        public static FastMatrixSlerp(startValue:BABYLON.Matrix, endValue:BABYLON.Matrix, gradient:number, result:BABYLON.Matrix): void {
            BABYLON.Matrix.DecomposeLerpToRef(startValue, endValue, gradient, result);
        }
        /** Set the passed matrix "result" as the interpolated values for animation key frame sampling. */
        public static FastMatrixInterpolate(animation:BABYLON.Animation, currentFrame: number, loopMode:number, result:BABYLON.Matrix):void {
            let keys:BABYLON.IAnimationKey[] = animation.getKeys();
            let startKeyIndex = Math.max(0, Math.min(keys.length - 1, Math.floor(keys.length * (currentFrame - keys[0].frame) / (keys[keys.length - 1].frame - keys[0].frame)) - 1));
            if (keys[startKeyIndex].frame >= currentFrame) {
                while (startKeyIndex - 1 >= 0 && keys[startKeyIndex].frame >= currentFrame) {
                    startKeyIndex--;
                }
            }
            for (let key = startKeyIndex; key < keys.length; key++) {
                let endKey = keys[key + 1];
                if (endKey.frame >= currentFrame) {
                    let startKey = keys[key];
                    let startValue = startKey.value;
                    if (startKey.interpolation === AnimationKeyInterpolation.STEP) {
                        result.copyFrom(startValue);
                        return;
                    }
                    let endValue = endKey.value;
                    let useTangent = startKey.outTangent !== undefined && endKey.inTangent !== undefined;
                    let frameDelta = endKey.frame - startKey.frame;
                    // Gradient : percent of currentFrame between the frame inf and the frame sup
                    let gradient = (currentFrame - startKey.frame) / frameDelta;
                    // Check for easingFunction and correction of gradient
                    let easingFunction = animation.getEasingFunction();
                    if (easingFunction != null) {
                        gradient = easingFunction.ease(gradient);
                    }
                    // Switch anmimation matrix type
                    switch (loopMode) {
                        case Animation.ANIMATIONLOOPMODE_CYCLE:
                        case Animation.ANIMATIONLOOPMODE_CONSTANT:
                            BABYLON.Utilities.FastMatrixSlerp(startValue, endValue, gradient, result);
                            return;
                        case Animation.ANIMATIONLOOPMODE_RELATIVE:
                            result.copyFrom(startValue);
                            return;
                    }
                    break;
                }
            }
            result.copyFrom(keys[keys.length - 1].value);
        }
        /** Returns float result as the interpolated values for animation key frame sampling. */
        public static FastFloatInterpolate(animation:BABYLON.Animation, currentFrame: number, repeatCount: number, loopMode:number, offsetValue:any = null, highLimitValue: any = null):number {
            if (loopMode === Animation.ANIMATIONLOOPMODE_CONSTANT && repeatCount > 0) {
                return highLimitValue.clone ? highLimitValue.clone() : highLimitValue;
            }
            let keys:BABYLON.IAnimationKey[] = animation.getKeys();
            let startKeyIndex = Math.max(0, Math.min(keys.length - 1, Math.floor(keys.length * (currentFrame - keys[0].frame) / (keys[keys.length - 1].frame - keys[0].frame)) - 1));
            if (keys[startKeyIndex].frame >= currentFrame) {
                while (startKeyIndex - 1 >= 0 && keys[startKeyIndex].frame >= currentFrame) {
                    startKeyIndex--;
                }
            }
            for (let key = startKeyIndex; key < keys.length; key++) {
                let endKey = keys[key + 1];
                if (endKey.frame >= currentFrame) {
                    let startKey = keys[key];
                    let startValue = startKey.value;
                    if (startKey.interpolation === AnimationKeyInterpolation.STEP) {
                        return startValue;
                    }
                    let endValue = endKey.value;
                    let useTangent = startKey.outTangent !== undefined && endKey.inTangent !== undefined;
                    let frameDelta = endKey.frame - startKey.frame;
                    // Gradient : percent of currentFrame between the frame inf and the frame sup
                    let gradient = (currentFrame - startKey.frame) / frameDelta;
                    // Check for easingFunction and correction of gradient
                    let easingFunction = animation.getEasingFunction();
                    if (easingFunction != null) {
                        gradient = easingFunction.ease(gradient);
                    }
                    // Switch anmimation float type
                    let floatValue = useTangent ? animation.floatInterpolateFunctionWithTangents(startValue, startKey.outTangent * frameDelta, endValue, endKey.inTangent * frameDelta, gradient) : animation.floatInterpolateFunction(startValue, endValue, gradient);
                    switch (loopMode) {
                        case Animation.ANIMATIONLOOPMODE_CYCLE:
                        case Animation.ANIMATIONLOOPMODE_CONSTANT:
                            return floatValue;
                        case Animation.ANIMATIONLOOPMODE_RELATIVE:
                            return offsetValue * repeatCount + floatValue;
                    }
                    break;
                }
            }
            return keys[keys.length - 1].value;
        }

        // ********************************** //
        // * Public Blending Speed Support  * //
        // ********************************** //

        /** Computes the transition duration blending speed */
        public static ComputeBlendingSpeed(rate:number, duration:number):number {
            return 1 / (rate * duration);
        }

        // ************************************ //
        // * Public Scene Component Register  * //
        // ************************************ //

        /** Registers A scene component on the scene */
        public static RegisterSceneComponent(comp: BABYLON.SceneComponent, klass:string, enableUpdate: boolean = true, propertyBag: any = {}):void {
            let owner: BABYLON.Entity = (<any>comp).entity;
            if (owner == null) throw new Error("Null owner scene object attached");
            if (owner.metadata == null || !owner.metadata.api) {
                let metadata: BABYLON.IObjectMetadata = {
                    api: true,
                    type: "Babylon",
                    parsed: false,
                    prefab: false,
                    state: {},
                    objectName: "Scene Component",
                    objectId: "0",
                    tagName: "Untagged",
                    layerIndex: 0,
                    layerName: "Default",
                    areaIndex: -1,
                    navAgent: null,
                    meshLink: null,
                    meshObstacle: null,
                    shadowCastingMode: 0,
                    socketList: [],
                    animationClips: [],
                    animationEvents: [],
                    collisionEvent: null,
                    components: [],
                    properties: {}
                };
                owner.metadata = metadata;
            }
            if (owner.metadata != null && owner.metadata.api) {
                let metadata: BABYLON.IObjectMetadata = owner.metadata as BABYLON.IObjectMetadata;
                if (metadata.components == null) {
                    metadata.components = [];
                }
                if (metadata.components != null) {
                    let compscript: BABYLON.IScriptComponent = {
                        order: 1000,
                        name: "EditorScriptComponent",
                        klass: klass,
                        update: enableUpdate,
                        properties: propertyBag,
                        instance: comp,
                        tag: {}
                    };
                    metadata.components.push(compscript);
                    comp.register();
                    // ..
                    // Fire Component Ready
                    // ..
                    if ((<any>comp).ready != null) {
                        (<any>comp).ready();
                    } else {
                        BABYLON.Tools.Error("No component ready function detected.");
                    }
                } else {
                    BABYLON.Tools.Error("Failed to parse metadata components");
                }
            } else {
                BABYLON.Tools.Error("Null owner object metadata");
            }
        }

        // ********************************** //
        // * Public Scene Manager Register  * //
        // ********************************** //

        /** Registers new manager instance on the scene object */
        public static RegisterSceneManager(scene: BABYLON.Scene) : BABYLON.SceneManager {
            let scenex: any = <any>scene;
            if (scenex.manager != null) {
                scenex.manager.dispose();
                scenex.manager = null;
            }                
            scenex.manager = new BABYLON.SceneManager(scene);
            return scenex.manager;
        }
        /** Parses the registered scene manager object metadata */
        public static ParseSceneMetadata(scene: BABYLON.Scene) : void {
            let scenex: any = <any>scene;
            if (scenex.manager != null) {
                scenex.manager._parseSceneMetadata();
            } else {
                BABYLON.Tools.Warn("Babylon.js no scene manager instance detected. Failed to parse scene metadata.");
            }
        }
        /** Parses the registered scene manager import metadata */
        public static ParseImportMetadata(meshes: BABYLON.AbstractMesh[], scene: BABYLON.Scene): void {
            let scenex: any = <any>scene;
            if (scenex.manager != null) {
                let manager: BABYLON.SceneManager = scenex.manager as BABYLON.SceneManager;
                let ticklist: BABYLON.IScriptComponent[] = [];
                (<any>BABYLON.SceneManager).parseSceneMeshes(meshes, scene, ticklist);
                if (ticklist.length > 0) {
                    ticklist.sort((left, right): number => {
                        if (left.order < right.order) return -1;
                        if (left.order > right.order) return 1;
                        return 0;
                    });
                    ticklist.forEach((scriptComponent) => {
                        scriptComponent.instance.register();
                    });
                }
            } else {
                BABYLON.Tools.Warn("Babylon.js no scene manager instance detected. Failed to parse scene metadata.");
            }
        }
        /** Fire the manager instance internal scene ready function */
        public static ExecuteSceneReady(scene: BABYLON.Scene) : void {
            let scenex: any = <any>scene;
            if (scenex.manager != null) {
                scenex.manager._executeWhenReady();
            } else {
                BABYLON.Tools.Warn("Babylon.js no scene manager instance detected. Failed to execute scene ready.");
            }
        }
        public static InstantiateClass(className: string): any {
            const arr = className.split(".");
            let fn: any = (window || this);
            for (var i = 0, len = arr.length; i < len; i++) {
                fn = fn[arr[i]];
            }
            return (typeof fn === "function") ? fn : null;
        }
    }
}