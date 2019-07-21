/// <reference path="babylon.d.ts" />
/// <reference path="babylon.scenemanager.ts" />

module BABYLON {
    export type Entity = BABYLON.AbstractMesh | BABYLON.Camera | BABYLON.Light;
    export abstract class SceneComponent {
        public register: () => void = null;

        protected tick: boolean = false;
        protected start(): void { }
        protected update(): void { }
        protected after(): void { }
        protected destroy(): void { }

        /** TODO: Optimize render loop with instances */
        private _before: () => void = null;
        private _after: () => void = null;

        private _engine: BABYLON.Engine = null;
        private _scene: BABYLON.Scene = null;
        private _properties: any = null;
        private _manager: BABYLON.SceneManager = null;
        private _entity:BABYLON.Entity = null;
        public get entity(): BABYLON.Entity { return this._entity; };
        public constructor(owner: BABYLON.Entity, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            if (owner == null) throw new Error("Null owner scene object specified.");
            if (scene == null) throw new Error("Null host scene object specified.");
            this.tick = tick;
            this._entity = owner;
            this._manager = null;
            this._properties = propertyBag;
            this._engine = scene.getEngine();
            this._scene = scene;

            /** TODO: Optimize the scene.register before and after to us ()=>{} */
            /** Then remome the internal instance wrappers thruout the component */
            const me: BABYLON.SceneComponent = this;
            me.register = () => { me.registerInstance(me); };
            me._before = () => { me.updateInstance(me); };
            me._after = () => { me.afterInstance(me); };
        }
        public get scene(): BABYLON.Scene { 
            return this._scene;
        }
        public get engine(): BABYLON.Engine { 
            return this._engine;
        }

        /* Scene Component Helper Member Functions */
        public get manager(): BABYLON.SceneManager {
            if (this._manager == null) {
                this._manager = BABYLON.SceneManager.GetInstance();
            }
            return this._manager;
        }
        public setProperty(name: string, propertyValue: any): void {
            if (this._properties != null) {
                this._properties[name] = propertyValue;
            }
        }
        public getProperty<T>(name: string, defaultValue: T = null): T {
            let result: any = null
            if (this._properties != null) {
                result = this._properties[name];
            }
            if (result == null) result = defaultValue;
            return (result != null) ? result as T : null;
        }
        public getClassname():string {
            let funcNameRegex = /function (.{1,})\(/;
            let results = (funcNameRegex).exec((<any> this).constructor.toString());
            return (results && results.length > 1) ? results[1] : "";
        }        
        public getMetadata(): BABYLON.ObjectMetadata {
            return this.manager.findSceneMetadata(this._entity);
        }
        public getComponent<T extends BABYLON.SceneComponent>(klass: string): T {
            let result:any = this.manager.findSceneComponent<T>(klass, this._entity);
            return (result != null) ? result as T : null;
        }
        public getComponents<T extends BABYLON.SceneComponent>(klass: string): T[] {
            let result:any = this.manager.findSceneComponents<T>(klass, this._entity);
            return (result != null) ? result as T[] : null;
        }
        public getLensFlareSystem(flareName:string): BABYLON.LensFlareSystem {
            return this.manager.findSceneLensFlareSystem(flareName, this._entity);
        }
        public getLensFlareSystems(): BABYLON.LensFlareSystem[] {
            return this.manager.findSceneLensFlareSystems(this._entity);
        }

        ////////////////////////////////////////////////////////////////////////////////////
        // Component Instance Render Looping
        ////////////////////////////////////////////////////////////////////////////////////

        /** TODO: Optimize render loop with instances */

        private registerInstance(me: any): void {
            if (me.ready) {
                me.manager.onready(()=>{ me.ready(); });
            }
            me.scene.registerBeforeRender(me._before);
            me.scene.registerAfterRender(me._after);
        }
        private updateInstance(me: any): void {
            if (me != null && me.entity != null) {
                if (!me._started) {
                    me.start();
                    me._started = true;
                } else if (me._before != null && me._started && me.tick) {
                    me.update();
                    if (me.updateIntersectionList) {
                        me.updateIntersectionList();
                    }
                }
            }
        }
        private afterInstance(me: any): void {
            if (me != null && me.entity != null) {
                if (me._after != null && me._started && me.tick) {
                    me.after();
                }
            }
        }
        //
        // Public Static Destroy Instance Helper
        //
        public static DestroyInstance(me: any) {
            //console.log("===> Destroying Instance: " + me.entity.name);
            me.tick = false;
            me.scene.unregisterBeforeRender(me._before);
            me.scene.unregisterAfterRender(me._after);
            try{ me.destroy(); }catch(e){};
            if (me.disposeSceneComponent) {
                me.disposeSceneComponent();
            }
            if (me._prefab != null) {
                me._prefab.dispose();
                me._prefab = null;
            }
            me.entity = null;
            me._started = false;
            me._before = null;
            me._after = null;
            me._properties = null;
            me._engine = null;
            me._scene = null;
            me._manager = null;
            me.register = null;
            me.dispose = null;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////
    // Managed Scene Component Sub Classes
    ////////////////////////////////////////////////////////////////////////////////////

    export abstract class CameraComponent extends BABYLON.SceneComponent {
        private _camera: BABYLON.Camera = null;
        private _orthoSize:number = 0;
        private _orthoUpdate:boolean = false;
        public constructor(owner: BABYLON.Camera, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            super(owner, scene, tick, propertyBag);
            this._camera = owner;
        }
        public get camera():BABYLON.Camera {
            return this._camera;
        }
        private setupOrthographicCamera(size:number, updateOnResize:boolean):void {
            let result:boolean = false;
            if (this.camera != null && this._camera.mode === BABYLON.Camera.ORTHOGRAPHIC_CAMERA) {
                this._orthoSize = size;
                this.updateOrthographicSize();
                if (this._orthoUpdate === false) {
                    this._orthoUpdate = updateOnResize;
                    if (this._orthoUpdate === true) {
                        window.addEventListener("resize", this.updateOrthographicSize);
                    }
                }
            }
        }
        private updateOrthographicSize():void {
            if (this.camera != null && this._orthoSize !== 0) {
                let client:ClientRect = this.scene.getEngine().getRenderingCanvasClientRect();
                let aspect:number = client.width / client.height;
                let vertical:number = this._orthoSize;
                let horizontal:number = vertical * aspect;
                this._camera.orthoTop = vertical;
                this._camera.orthoBottom = -vertical;
                this._camera.orthoLeft = -horizontal;
                this._camera.orthoRight = horizontal;
            }
        }
        private disposeSceneComponent():void {
            if (this._orthoUpdate === true) {
                window.removeEventListener("resize", this.updateOrthographicSize);
                this._orthoUpdate = false;
                this._orthoSize = 0;
            }
            this._camera = null;
        }        
    }

    export abstract class LightComponent extends BABYLON.SceneComponent {
        private _light: BABYLON.Light = null;
        public constructor(owner: BABYLON.Light, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            super(owner, scene, tick, propertyBag);
            this._light = owner;
        }
        public get light():BABYLON.Light {
            return this._light;
        }
        private disposeSceneComponent():void {
            this._light = null;
        }        
    }

    export abstract class MeshComponent extends BABYLON.SceneComponent {
        private _mesh:BABYLON.AbstractMesh = null;
        public constructor(owner: BABYLON.AbstractMesh, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            super(owner, scene, tick, propertyBag);
            this._mesh = owner;
        }
        public get mesh():BABYLON.AbstractMesh {
            return this._mesh;
        }
        public getChildMesh(name:string, searchType:BABYLON.SearchType = BABYLON.SearchType.ExactMatch, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null):BABYLON.AbstractMesh {
            return this.manager.findSceneChildMesh(name, this._mesh, searchType, directDecendantsOnly, predicate);            
        }
        public getCollisionMesh(directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null):BABYLON.AbstractMesh {
            return this.manager.findSceneCollisionMesh(this._mesh, directDecendantsOnly, predicate);            
        }
        public getSocketMesh(name:string, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null):BABYLON.Mesh {
            return this.manager.findSceneSocketMesh(name, this._mesh, directDecendantsOnly, predicate);
        }
        public getSocketMeshes(directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null):BABYLON.Mesh[] {
            return this.manager.findSceneSocketMeshes(this._mesh, directDecendantsOnly, predicate);
        }
        public getParticleSystem(particleName:string): BABYLON.IParticleSystem {
            return this.manager.findSceneParticleSystem(particleName, this._mesh);
        }
        public getParticleSystems(): BABYLON.IParticleSystem[] {
            return this.manager.findSceneParticleSystems(this._mesh);
        }

        /***********************************/
        /*  Physics Collision Event System */
        /***********************************/

        public get onCollisionEvent():(collider:BABYLON.AbstractMesh, tag:string) => void {
            let result:(collider:BABYLON.AbstractMesh, tag:string) => void = null;
            if (this._mesh.metadata != null && this._mesh.metadata.api && this._mesh.metadata.collisionEvent != null) {
                result = this._mesh.metadata.collisionEvent;
            }
            return result;
        }
        public set onCollisionEvent(handler:(collider:BABYLON.AbstractMesh, tag:string) => void) {
            if (this._mesh.metadata != null && this._mesh.metadata.api) {
                this._mesh.metadata.collisionEvent = handler;
            }
            if (this._mesh.physicsImpostor != null) {
                let anyImpostor:any = (<any>this._mesh.physicsImpostor);
                anyImpostor.onCollideEvent = (handler != null) ? this.updatePhysicsCollisionEvent : null;
            }
        }
        private updatePhysicsCollisionEvent(collider: BABYLON.PhysicsImpostor, collidedAgainst:BABYLON.PhysicsImpostor) : void {
            if (collider.object != null && collidedAgainst.object != null) {
                let colliderAny:any = collider.object;
                if (colliderAny != null && colliderAny.metadata != null && colliderAny.metadata.collisionEvent != null) {
                    let collidedAgainstAny:any = collidedAgainst.object;
                    if (collidedAgainstAny != null) {
                        let collidedAgainstTag:string = "Untagged";
                        if (collidedAgainstAny.metadata != null && collidedAgainstAny.metadata.tagName != null && collidedAgainstAny.metadata.tagName !== "") {
                            collidedAgainstTag = collidedAgainstAny.metadata.tagName;
                        }
                        colliderAny.metadata.collisionEvent(collidedAgainstAny, collidedAgainstTag);
                    }
                }
            }
        }

        /*************************************/
        /*  Scene Component Disposal System  */
        /*************************************/
        
        private disposeSceneComponent():void {
            if (this._mesh != null) {
                if (this._mesh.skeleton != null && this._mesh.skeleton.bones != null && this._mesh.skeleton.bones.length > 0) {
                    this._mesh.skeleton.bones.forEach((bone) => {
                        if (bone != null && bone.metadata != null) {
                            bone.metadata = null;
                        }
                    });
                }
                if (this._mesh.physicsImpostor != null) {
                    let anyImpostor:any = (<any>this._mesh.physicsImpostor);
                    if (anyImpostor.onCollideEvent != null) {
                        anyImpostor.onCollideEvent = null;
                    }
                }
                if (this._mesh.metadata != null && this._mesh.metadata.api) {
                    this._mesh.metadata.collisionEvent = null;
                }
            }
            this._mesh = null;
        }
    }

    export class OrthoController extends BABYLON.CameraComponent {
        protected start() :void {
            let me:any = this;
            if (me.setupOrthographicCamera) {
                let size:number = this.getProperty("orthoSize", 5);
                let update:boolean = this.getProperty("resizeCameras", true);
                me.setupOrthographicCamera(size, update);
            }
        }
    }

    export class MeshRotator {
        private _entity:BABYLON.AbstractMesh = null;
        public slerpIdentity:BABYLON.Quaternion = null;
        public constructor(owner: BABYLON.AbstractMesh) {
            this._entity = owner;
            this.slerpIdentity = BABYLON.Quaternion.Identity();
        }
        /** Rotates the mesh using rotation quaternions */
        public rotate(x: number, y: number, z: number, order:BABYLON.RotateOrder = BABYLON.RotateOrder.ZXY):BABYLON.TransformNode {
            let result:BABYLON.TransformNode = null;
            if (this._entity != null) {
                // Note: Z-X-Y is default Unity Rotation Order
                if (this._entity.rotationQuaternion == null) this._entity.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(this._entity.rotation.y, this._entity.rotation.x, this._entity.rotation.z);
                if (order === BABYLON.RotateOrder.XYZ) {
                    result = this._entity.addRotation(x, 0, 0).addRotation(0, y, 0).addRotation(0, 0, z);
                } else if (order === BABYLON.RotateOrder.XZY) {
                    result = this._entity.addRotation(x, 0, 0).addRotation(0, 0, z).addRotation(0, y, 0);
                } else if (order === BABYLON.RotateOrder.ZXY) {
                    result = this._entity.addRotation(0, 0, z).addRotation(x, 0, 0).addRotation(0, y, 0);
                } else if (order === BABYLON.RotateOrder.ZYX) {
                    result = this._entity.addRotation(0, 0, z).addRotation(0, y, 0).addRotation(x, 0, 0);
                } else if (order === BABYLON.RotateOrder.YZX) {
                    result = this._entity.addRotation(0, y, 0).addRotation(0, 0, z).addRotation(x, 0, 0);
                } else {
                    result = this._entity.addRotation(x, y, z); // Note: Default Babylon Y-X-Z Rotate Order
                }
            }
            return result;
        }
        /** Rotates the mesh so the forward vector points at a target position using rotation quaternions. (Options: Y-Yall, X-Pitch, Z-Roll) */
        public lookAtPosition(position:BABYLON.Vector3, slerp:number = 0.0, yawCor?: number, pitchCor?: number, rollCor?: number, space?: BABYLON.Space):BABYLON.TransformNode {
            let result:BABYLON.TransformNode = null;
            if (this._entity != null) {
                if (this._entity.rotationQuaternion == null) this._entity.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(this._entity.rotation.y, this._entity.rotation.x, this._entity.rotation.z);
                if (this.slerpIdentity != null && slerp > 0.0) this.slerpIdentity.copyFrom(this._entity.rotationQuaternion);
                result = this._entity.lookAt(position, yawCor, pitchCor, rollCor, space);
                if (this.slerpIdentity != null && slerp > 0.0) BABYLON.Quaternion.SlerpToRef(this.slerpIdentity, this._entity.rotationQuaternion, slerp, this._entity.rotationQuaternion)
            }
            return result;
        }
        public dispose():void {
            this._entity = null;
            this.slerpIdentity = null;
        }
    }

    export class ObjectMetadata {
        private _metadata: IObjectMetadata = null;
        public constructor(data: IObjectMetadata) {
            this._metadata = data;
        }
        public get type(): string {
            return this._metadata.type;
        }
        public get prefab(): boolean {
            return this._metadata.prefab;
        }
        public get state(): any {
            return this._metadata.state;
        }
        public get objectId(): string {
            return this._metadata.objectId;
        }
        public get objectName(): string {
            return this._metadata.objectName;
        }
        public get tagName(): string {
            return this._metadata.tagName;
        }
        public get layerIndex(): number {
            return this._metadata.layerIndex;
        }
        public get layerName(): string {
            return this._metadata.layerName;
        }
        public get areaIndex(): number {
            return this._metadata.areaIndex;
        }
        public get navAgent(): BABYLON.INavigationAgent {
            return this._metadata.navAgent;
        }
        public get meshLink(): BABYLON.INavigationLink {
            return this._metadata.meshLink;
        }
        public get meshObstacle(): BABYLON.INavigationObstacle {
            return this._metadata.meshObstacle;
        }
        public get shadowCastingMode(): number {
            return this._metadata.shadowCastingMode;
        }
        public get socketList(): BABYLON.ISocketData[] {
            return this._metadata.socketList;
        }
        public setProperty(name: string, propertyValue: any): void {
            if (this._metadata.properties != null) {
                this._metadata.properties[name] = propertyValue;
            }
        }
        public getProperty<T>(name: string, defaultValue: T = null): T {
            let result: any = null
            if (this._metadata.properties != null) {
                result = this._metadata.properties[name];
            }
            if (result == null) result = defaultValue;
            return (result != null) ? result as T : null;
        }
    }

    export class MachineState
    {
        public hash:number;
        public name:string;
        public tag:string;
        public time:number;
        public type:BABYLON.MotionType;
        public rate:number;
        public length:number;
        public layer:string;
        public layerIndex:number;
        public played:number;
        public machine:string;
        public interrupted:boolean;
        public apparentSpeed:number;
        public averageAngularSpeed:number;
        public averageDuration:number;
        public averageSpeed:number[];
        public cycleOffset:number;
        public cycleOffsetParameter:string;
        public cycleOffsetParameterActive:boolean;
        public iKOnFeet:boolean;
        public mirror:boolean;
        public mirrorParameter:string;
        public irrorParameterActive:boolean;
        public speed:number;
        public speedParameter:string;
        public speedParameterActive:boolean;
        public blendtree:BABYLON.IBlendTree;
        public transitions:BABYLON.ITransition[];
        public behaviours:BABYLON.IBehaviour[];
        public animations:BABYLON.Animatable[];
        public constructor() {}
    }

    export class TransitionCheck {
        public result:string;
        public offest:number;
        public blending:number;
        public triggered:string[];
    }
    
    export enum Statics
    {
        NoScale = 1.0,
        Deg2Rad = 0.0174532924,
        Rad2Deg = 57.29578,
        DiagonalSpeed = 0.7071,
        MinimumTimeout = 0.25,
        SpeedCompensator = 1.05
    }
    
    export enum RotateOrder
    {
        YXZ = 0,
        YZX = 1,
        XYZ = 2,
        XZY = 3,
        ZXY = 4,
        ZYX = 5
    }

    export enum MotionType
    {
        Clip = 0,
        Tree = 1
    }
    
    export enum AnimatorParameterType
    {
        Float = 1,
        Int = 3,
        Bool = 4,
        Trigger = 9
    }
    
    export enum SearchType {
        ExactMatch = 0,
        StartsWith = 1,
        EndsWith = 2,
        IndexOf = 3
    }

    export enum PlayerNumber {
        One = 1,
        Two = 2,
        Three = 3,
        Four = 4 
    }
    
    export enum GamepadType {
        None = -1,
        Generic = 0,
        Xbox360 = 1
    }
    
    export enum JoystickButton {
        Left = 0,
        Right = 1
    }

    export enum Xbox360Trigger {
        Left = 0,
        Right = 1
    }

    export enum UserInputPointer {
        Left = 0,
        Middle = 1,
        Right = 2
    }

    export enum UserInputAxis {
        Horizontal = 0,
        Vertical = 1,
        ClientX = 2,
        ClientY = 3,
        MouseX = 4,
        MouseY = 5,
        Wheel = 6
    }

    export enum UserInputKey {
        BackSpace = 8,
        Tab = 9,
        Enter = 13,
        Shift = 16,
        Ctrl = 17,
        Alt = 18,
        Pause = 19,
        Break = 19,
        CapsLock = 20,
        Escape = 27,
        SpaceBar = 32,
        PageUp = 33,
        PageDown = 34,
        End = 35,
        Home = 36,
        LeftArrow = 37,
        UpArrow = 38,
        RightArrow = 39,
        DownArrow = 40,
        Insert = 45,
        Delete = 46,
        Num0 = 48,
        Num1 = 49,
        Num2 = 50,
        Num3 = 51,
        Num4 = 52,
        Num5 = 53,
        Num6 = 54,
        Num7 = 55,
        Num8 = 56,
        Num9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        LeftWindowKey = 91,
        RightWindowKey = 92,
        SelectKey = 93,
        Numpad0 = 96,
        Numpad1 = 97,
        Numpad2 = 98,
        Numpad3 = 99,
        Numpad4 = 100,
        Numpad5 = 101,
        Numpad6 = 102,
        Numpad7 = 103,
        Numpad8 = 104,
        Numpad9 = 105,
        Multiply = 106,
        Add = 107,
        Subtract = 109,
        DecimalPoint = 110,
        Divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        NumLock = 144,
        ScrollLock = 145,
        SemiColon = 186,
        EqualSign = 187,
        Comma = 188,
        Dash = 189,
        Period = 190,
        ForwardSlash = 191,
        GraveAccent = 192,
        OpenBracket = 219,
        BackSlash = 220,
        CloseBraket = 221,
        SingleQuote = 222
    }

    export enum MovementType
    {
        DirectVelocity = 0,
        AppliedForces = 1,
        CheckCollision = 2
    }
    
    export enum CollisionContact
    {
        Top = 0,
        Left = 1,
        Right = 2,
        Bottom = 3
    }

    export enum IntersectionPrecision
    {
        AABB = 0,
        OBB = 1
    }
    
    export enum ConditionMode
    {
        If = 1,
        IfNot = 2,
        Greater = 3,
        Less = 4,
        Equals = 6,
        NotEqual = 7
    }
    
    export enum InterruptionSource
    {
        None = 0,
        Source = 1,
        Destination = 2,
        SourceThenDestination = 3,
        DestinationThenSource = 4
    }
    
    export enum BlendTreeType
    {
        Simple1D = 0,
        SimpleDirectional2D = 1,
        FreeformDirectional2D = 2,
        FreeformCartesian2D = 3,
        Direct = 4,
        Clip = 5
    }
    
    export enum BlendTreePosition {
        Lower = 0,
        Upper = 1,
    }
    
    export type UserInputAction = (index: number) => void;

    export interface UserInputPress {
        index: number;
        action: () => void;
    }

    export interface IObjectMetadata {
        api: boolean;
        type: string;
        parsed:boolean;
        prefab:boolean;
        state:any;
        objectName: string;
        objectId: string;
        tagName: string;
        layerIndex: number;
        layerName: string;
        areaIndex: number;
        navAgent: BABYLON.INavigationAgent;
        meshLink: BABYLON.INavigationLink;
        meshObstacle: BABYLON.INavigationObstacle;
        shadowCastingMode:number;
        socketList:BABYLON.ISocketData[];
        animationClips: BABYLON.IAnimationClip[];
        animationEvents:BABYLON.IAnimationEvent[];
        collisionEvent:any;
        components: BABYLON.IScriptComponent[];
        properties: any;
    }

    export interface IScriptComponent {
        order: number;
        name: string;
        klass: string;
        update: boolean;
        properties: any;
        instance: BABYLON.SceneComponent;
        tag: any;
    }
    
    export interface IBehaviour {
        hash:number;
        name:string;
        layerIndex:number;
        properties:any;
    }

    export interface ITransition {
        hash:number;
        anyState:boolean;
        layerIndex:number;
        machineLayer:string;        
        machineName:string;        
        canTransitionToSelf:boolean;
        destination:string;
        duration:number;
        exitTime:number;
        hasExitTime:boolean;
        fixedDuration:number;
        intSource:BABYLON.InterruptionSource;
        isExit:boolean
        mute:boolean;
        name:string;
        offset:number;
        orderedInt:boolean;
        solo:boolean;
        conditions:BABYLON.ICondition[];
    }

    export interface ICondition {
        hash:number;
        mode:BABYLON.ConditionMode;
        parameter:string;
        threshold:number;
    }

    export interface IBlendTree {
        hash:number;
        name:string;
        state:string;
        children:BABYLON.IBlendTreeChild[];
        layerIndex:number;
        apparentSpeed:number;
        averageAngularSpeed:number;
        averageDuration:number;
        averageSpeed:number[];
        blendParameterX:string;
        blendParameterY:string
        blendType:BABYLON.BlendTreeType;
        isAnimatorMotion:boolean;
        isHumanMotion:boolean;
        isLooping:boolean;
        minThreshold:number;
        maxThreshold:number;
        useAutomaticThresholds:boolean;
        directBlendMaster:BABYLON.IBlendTreeChild;
        simpleThresholdEqual:BABYLON.IBlendTreeChild;
        simpleThresholdLower:BABYLON.IBlendTreeChild;
        simpleThresholdUpper:BABYLON.IBlendTreeChild;
        simpleThresholdDelta:number;
        valueParameterX:number;
        valueParameterY:number;
    }

    export interface IBlendTreeChild {
        hash:number;
        layerIndex:number;
        cycleOffset:number;
        directBlendParameter:string;
        apparentSpeed:number;
        averageAngularSpeed:number;
        averageDuration:number;
        averageSpeed:number[];
        mirror:boolean
        type:BABYLON.MotionType;
        motion:string;
        positionX:number;
        positionY:number;
        threshold:number;
        timescale:number;
        subtree: BABYLON.IBlendTree;
        indexs:number[];
        weight:number;
        frame:number;
        input:number;
        track:BABYLON.IAnimationClip;
    }
    
    export interface INavigationArea {
        index: number;
        area: string;
        cost: number;
    }

    export interface INavigationAgent {
        name: string;
        radius: number;
        height: number;
        speed: number;
        acceleration: number;
        angularSpeed: number;
        areaMask: number;
        autoBraking: boolean;
        autoTraverseOffMeshLink: boolean;
        avoidancePriority: number;
        baseOffset: number;
        obstacleAvoidanceType: string;
        stoppingDistance: number;
    }

    export interface INavigationLink {
        name: string;
        activated: boolean;
        area: number;
        autoUpdatePositions: boolean;
        biDirectional: boolean;
        costOverride: number;
        occupied: boolean;
        start: any;
        end: any;
    }

    export interface INavigationObstacle {
        name: string;
        carving: boolean;
        carveOnlyStationary: boolean;
        carvingMoveThreshold: number;
        carvingTimeToStationary: number;
        shap: string;
        radius: number;
        center: number[];
        size: number[];
    }

    export interface IObjectTransform {
        position: BABYLON.Vector3;
        rotation: BABYLON.Vector3;
        scale: BABYLON.Vector3;
    }

    export interface IIntersectionState {
        mesh: BABYLON.AbstractMesh;
        intersecting: boolean;
    }

    export interface ISocketData {
        boneIndex: number;
        boneName: string;
        socketMesh:BABYLON.Mesh;
        positionX:number;
        positionY:number;
        positionZ:number;
        rotationX:number;
        rotationY:number;
        rotationZ:number;
    }

    export interface IAvatarMask {
        hash:number;
        maskName:string;
        transformCount:number;
        transformPaths:string[];
        transformIndexs:number[];
    }
    
    export interface IAnimationClip {
        type: string;
        wrap: number;
        name: string;
        start: number;
        stop: number;
        rate:number;
        frames:number;
        weight:number;
        behavior:number;
        apparentSpeed:number;
        averageSpeed:number[];
        averageDuration:number;
        averageAngularSpeed:number;
        customCurveKeyNames:string[];        
    }

    export interface IAnimationEvent {
        clip:string;
        frame: number;
        functionName: string;
        intParameter: number;
        floatParameter: number;
        stringParameter: string;
        objectIdParameter: string;
    }    

    export interface IAnimationLayer {
        hash:number;
        name:string;
        index:number;
        entry:string;
        machine:string;
        iKPass:boolean
        avatarMask:BABYLON.IAvatarMask;
        blendingMode:number;
        defaultWeight:number;
        syncedLayerIndex:number;
        syncedLayerAffectsTiming:boolean
        animationTime:number;
        animationFrame:number;
        animationRatio:number;
        animationNormalize:number;
        animationReference:number;
        animationAnimatables:BABYLON.Animatable[];
        animationBlendLoop:number;
        animationBlendFrame:number;
        animationBlendFirst:boolean;
        animationBlendSpeed:number;
        animationBlendWeight:number;
        animationBlendMatrix:BABYLON.Matrix;        
        animationBlendBuffer:BABYLON.IBlendTreeChild[];        
        animationStateMachine:BABYLON.MachineState;
    }
    
    export interface IAnimationCurve {
        length:number;
        preWrapMode:string;
        postWrapMode:string;
        keyframes:BABYLON.IAnimationKeyframe[];
    }

    export interface IAnimationKeyframe {
        time:number;
        value:number;
        inTangent:number;
        outTangent:number;
        tangentMode:number;
    }

    export class UserInputOptions {
        public static JoystickRightHandleColor:string = "yellow";
        public static JoystickLeftSensibility:number = 1.0;
        public static JoystickRightSensibility:number = 1.0;
        public static JoystickDeadStickValue:number = 0.1;
        public static GamepadDeadStickValue:number = 0.25;
        public static GamepadLStickXInverted:boolean = false;
        public static GamepadLStickYInverted:boolean = false;
        public static GamepadRStickXInverted:boolean = false;
        public static GamepadRStickYInverted:boolean = false;
        public static GamepadLStickSensibility:number = 1.0;
        public static GamepadRStickSensibility:number = 1.0;
        public static PointerAngularSensibility:number = 1.0;
        public static PointerWheelDeadZone:number = 0.1;
    }
}
