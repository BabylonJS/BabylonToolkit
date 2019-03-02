declare class Navigation {
    // Babylon Navigation Mesh Tool
    // https://github.com/wanadev/babylon-navigation-mesh
    buildNodes(mesh: BABYLON.AbstractMesh): any;
    setZoneData(zone: string, data: any): void;
    getGroup(zone: string, position: BABYLON.Vector3): number;
    getRandomNode(zone: string, group: number, nearPosition: BABYLON.Vector3, nearRange: number): BABYLON.Vector3;
    projectOnNavmesh(position: BABYLON.Vector3, zone: string, group: number): BABYLON.Vector3;
    findPath(startPosition: BABYLON.Vector3, targetPosition: BABYLON.Vector3, zone: string, group: number): BABYLON.Vector3[];
    getVectorFrom(vertices: number[], index: number, _vector: BABYLON.Vector3): BABYLON.Vector3;
}
module BABYLON {
    export enum System
    {
        Deg2Rad = 0.0174532924,
        Rad2Deg = 57.29578,
    }
    export enum Handedness
    {
        Default = -1,
        Right = 0,
        Left = 1
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
    export enum CollisionFlags { 
        CF_STATIC_OBJECT = 1, 
        CF_KINEMATIC_OBJECT = 2, 
        CF_NO_CONTACT_RESPONSE = 4, 
        CF_CUSTOM_MATERIAL_CALLBACK = 8, 
        CF_CHARACTER_OBJECT = 16, 
        CF_DISABLE_VISUALIZE_OBJECT = 32, 
        CF_DISABLE_SPU_COLLISION_PROCESSING = 64, 
        CF_HAS_CONTACT_STIFFNESS_DAMPING = 128, 
        CF_HAS_CUSTOM_DEBUG_RENDERING_COLOR = 256, 
        CF_HAS_FRICTION_ANCHOR = 512, 
        CF_HAS_COLLISION_SOUND_TRIGGER = 1024 
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
    export interface UserInputPress {
        index: number;
        action: () => void;
    }
    
    export type UserInputAction = (index: number) => void;

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
    /**
     * Babylon utility class
     * @class Utilities
     */
    export class Utilities {
        private static UpVector:BABYLON.Vector3 = BABYLON.Vector3.Up();
        private static ZeroVector:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        private static TempMatrix:BABYLON.Matrix = BABYLON.Matrix.Zero();
        private static TempVector2:BABYLON.Vector2 = BABYLON.Vector2.Zero();
        private static TempVector3:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        private static PrintElement: HTMLElement = null;
		public static Angle(from:BABYLON.Vector3, to:BABYLON.Vector3):number {
			return Math.acos(BABYLON.Scalar.Clamp(BABYLON.Vector3.Dot(from.normalize(), to.normalize()), -1, 1)) * 57.29578;
        }
        /** TODO */
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
			return degree * BABYLON.System.Deg2Rad;
        }
        /** Returns a new degree converted from radion */
		public static Rad2Deg(radion:number):number {
			return radion * BABYLON.System.Rad2Deg;
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
            const tx:number = 2 * (quat.y * vec.z - quat.z * vec.y);
            const ty:number = 2 * (quat.z * vec.x - quat.x * vec.z);
            const tz:number = 2 * (quat.x * vec.y - quat.y * vec.x);
            return new BABYLON.Vector3(vec.x + quat.w * tx + (quat.y * tz - quat.z * ty), vec.y + quat.w * ty + (quat.z * tx - quat.x * tz), vec.z + quat.w * tz + (quat.x * ty - quat.y * tx));
        }
        /** Multplies a quaternion by a vector (rotates vector) */
        public static RotateVectorToRef(vec: BABYLON.Vector3, quat: BABYLON.Quaternion, result: BABYLON.Vector3): void {
            const tx:number = 2 * (quat.y * vec.z - quat.z * vec.y);
            const ty:number = 2 * (quat.z * vec.x - quat.x * vec.z);
            const tz:number = 2 * (quat.x * vec.y - quat.y * vec.x);
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

        // ************************************ //
        // * Public Download Cubemap Support  * //
        // ************************************ //

        /** TODO */
        public static DownloadEnvironment(cubemap:BABYLON.CubeTexture, success:()=>void = null, failure:()=>void = null):void {
            BABYLON.EnvironmentTextureTools.CreateEnvTextureAsync(cubemap).then((buffer: ArrayBuffer) => {
                const name:string = (cubemap.name) || "Environment";
                const blob = new Blob([buffer], { type: "octet/stream" });
                BABYLON.Tools.Download(blob, name + ".env");
                if (success != null) success();
            }).catch((error: any) => {
                console.error(error);
                if (failure != null) failure();
            });
        }

        // *********************************** //
        // * Public Print To Screen Support  * //
        // *********************************** //

        /** TODO */
        public static PrintToScreen(text:string, color:string = "white") {
            BABYLON.Utilities.PrintElement = document.getElementById("print");
            if (BABYLON.Utilities.PrintElement == null) {
                const printer = document.createElement("div");
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

        // ************************************ //
        // * Public String Tools Support * //
        // ************************************ //

        /** TODO */
        public static StartsWith(source:string, word:string):boolean {
            return source.lastIndexOf(word, 0) === 0;
        }
        /** TODO */
        public static EndsWith(source:string, word:string):boolean {
            return source.indexOf(word, source.length - word.length) !== -1;
        }
        /** TODO */
        public static ReplaceAll(source:string, word:string, replace:string):string {
            return source.replace(new RegExp(word, 'g'), replace);            
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////
        // Canvas Tools Parsing Helper Functions
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        /** TODO */
        public static ParseColor3(source:any, defaultValue:BABYLON.Color3 = null):BABYLON.Color3 {
            let result:BABYLON.Color3 = null
            if (source != null && source.r != null && source.g != null&& source.b != null) {
                result = new BABYLON.Color3(source.r, source.g, source.b);
            } else {
                result = defaultValue;
            }
            return result;
        }
        /** TODO */
        public static ParseColor4(source:any, defaultValue:BABYLON.Color4 = null):BABYLON.Color4 {
            let result:BABYLON.Color4 = null
            if (source != null && source.r != null && source.g != null && source.b != null) {
                const alpha:number = (source.a != null) ? source.a : 1.0;
                result = new BABYLON.Color4(source.r, source.g, source.b, source.a);
            } else {
                result = defaultValue;
            }
            return result;
        }
        /** TODO */
        public static ParseVector2(source:any, defaultValue:BABYLON.Vector2 = null):BABYLON.Vector2 {
            let result:BABYLON.Vector2 = null
            if (source != null && source.x != null && source.y != null) {
                result = new BABYLON.Vector2(source.x, source.y);
            } else {
                result = defaultValue;
            }
            return result;
        }
        /** TODO */
        public static ParseVector3(source:any, defaultValue:BABYLON.Vector3 = null):BABYLON.Vector3 {
            let result:BABYLON.Vector3 = null
            if (source != null && source.x != null && source.y != null && source.z != null) {
                result = new BABYLON.Vector3(source.x, source.y, source.z);
            } else  {
                result = defaultValue;
            }
            return result;
        }
        /** TODO */
        public static ParseVector4(source:any, defaultValue:BABYLON.Vector4 = null):BABYLON.Vector4 {
            let result:BABYLON.Vector4 = null
            if (source != null && source.x != null && source.y != null && source.z != null && source.w != null) {
                result = new BABYLON.Vector4(source.x, source.y, source.z, source.w);
            } else {
                result = defaultValue;
            }
            return result;
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

        // ************************************ //
        // *  Scene Animation Sampling Tools  * //
        // ************************************ //
        
        /** Set the passed matrix "result" as the sampled key frame value for the specfied animation track. */
        public static SampleAnimationMatrix(animation:BABYLON.Animation, frame: number, loopMode:number, result:BABYLON.Matrix): void {
            if (animation != null && animation.dataType === BABYLON.Animation.ANIMATIONTYPE_MATRIX) {
                const keys:BABYLON.IAnimationKey[] = animation.getKeys();
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
                const keys:BABYLON.IAnimationKey[] = animation.getKeys();
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
            const keys:BABYLON.IAnimationKey[] = animation.getKeys();
            let startKeyIndex = Math.max(0, Math.min(keys.length - 1, Math.floor(keys.length * (currentFrame - keys[0].frame) / (keys[keys.length - 1].frame - keys[0].frame)) - 1));
            if (keys[startKeyIndex].frame >= currentFrame) {
                while (startKeyIndex - 1 >= 0 && keys[startKeyIndex].frame >= currentFrame) {
                    startKeyIndex--;
                }
            }
            for (let key = startKeyIndex; key < keys.length; key++) {
                const endKey = keys[key + 1];
                if (endKey.frame >= currentFrame) {
                    const startKey = keys[key];
                    const startValue = startKey.value;
                    if (startKey.interpolation === AnimationKeyInterpolation.STEP) {
                        result.copyFrom(startValue);
                        return;
                    }
                    const endValue = endKey.value;
                    const useTangent = startKey.outTangent !== undefined && endKey.inTangent !== undefined;
                    const frameDelta = endKey.frame - startKey.frame;
                    // Gradient : percent of currentFrame between the frame inf and the frame sup
                    let gradient = (currentFrame - startKey.frame) / frameDelta;
                    // Check for easingFunction and correction of gradient
                    const easingFunction = animation.getEasingFunction();
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
            const keys:BABYLON.IAnimationKey[] = animation.getKeys();
            let startKeyIndex = Math.max(0, Math.min(keys.length - 1, Math.floor(keys.length * (currentFrame - keys[0].frame) / (keys[keys.length - 1].frame - keys[0].frame)) - 1));
            if (keys[startKeyIndex].frame >= currentFrame) {
                while (startKeyIndex - 1 >= 0 && keys[startKeyIndex].frame >= currentFrame) {
                    startKeyIndex--;
                }
            }
            for (let key = startKeyIndex; key < keys.length; key++) {
                const endKey = keys[key + 1];
                if (endKey.frame >= currentFrame) {
                    const startKey = keys[key];
                    const startValue = startKey.value;
                    if (startKey.interpolation === AnimationKeyInterpolation.STEP) {
                        return startValue;
                    }
                    const endValue = endKey.value;
                    const useTangent = startKey.outTangent !== undefined && endKey.inTangent !== undefined;
                    const frameDelta = endKey.frame - startKey.frame;
                    // Gradient : percent of currentFrame between the frame inf and the frame sup
                    let gradient = (currentFrame - startKey.frame) / frameDelta;
                    // Check for easingFunction and correction of gradient
                    const easingFunction = animation.getEasingFunction();
                    if (easingFunction != null) {
                        gradient = easingFunction.ease(gradient);
                    }
                    // Switch anmimation float type
                    const floatValue = useTangent ? animation.floatInterpolateFunctionWithTangents(startValue, startKey.outTangent * frameDelta, endValue, endKey.inTangent * frameDelta, gradient) : animation.floatInterpolateFunction(startValue, endValue, gradient);
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
        /** Formats a string version of a physics imposter type */
        public static FormatPhysicsImposterType(type:number):string {
            let result:string = "Unknownr";
            switch (type) {
                case BABYLON.PhysicsImpostor.NoImpostor:
                    result = "No";
                    break;
                case BABYLON.PhysicsImpostor.SphereImpostor:
                    result = "Sphere";
                    break;
                case BABYLON.PhysicsImpostor.BoxImpostor:
                    result = "Box";
                    break;
                case BABYLON.PhysicsImpostor.PlaneImpostor:
                    result = "Plane";
                    break;
                case BABYLON.PhysicsImpostor.MeshImpostor:
                    result = "Mesh";
                    break;
                case BABYLON.PhysicsImpostor.CylinderImpostor:
                    result = "Cylinder";
                    break;
                case BABYLON.PhysicsImpostor.ParticleImpostor:
                    result = "Particle";
                    break;
                case BABYLON.PhysicsImpostor.HeightmapImpostor:
                    result = "Heightmap";
                    break;
                case BABYLON.PhysicsImpostor.ConvexHullImpostor:
                    result = "ConvexHull";
                    break;
            }
            return result;
        }

        // *********************************** //
        // *   Public Animation Blend Tools  * //
        // *********************************** //

        /** TODO */
        public static SetAnimationLooping(owner:BABYLON.IAnimatable, loopBehavior:number): void {
            if (owner != null && owner.animations != null && owner.animations.length > 0) {
                const animations = owner.animations;
                for (let index = 0; index < animations.length; index++) {
                    animations[index].loopMode = loopBehavior;
                }
            }
        }
        /** TODO */
        public static SetSkeletonLooping(skeleton:BABYLON.Skeleton, loopBehavior:number) {
            if (skeleton != null) {
                if (skeleton.animationPropertiesOverride == null) skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
                skeleton.animationPropertiesOverride.loopMode = loopBehavior;
            }
        }
        /** TODO */
        public static SetSkeletonBlending(skeleton:BABYLON.Skeleton, blendingSpeed:number) {
            if (skeleton != null) {
                if (skeleton.animationPropertiesOverride == null) skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
                skeleton.animationPropertiesOverride.enableBlending = (blendingSpeed > 0.0);
                skeleton.animationPropertiesOverride.blendingSpeed = blendingSpeed;
            }
        }
        /** TODO */
        public static SetSkeletonProperties(skeleton:BABYLON.Skeleton, loopBehavior:number, blendingSpeed:number) {
            if (skeleton != null) {
                if (skeleton.animationPropertiesOverride == null) skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
                skeleton.animationPropertiesOverride.loopMode = loopBehavior;
                skeleton.animationPropertiesOverride.enableBlending = (blendingSpeed > 0.0);
                skeleton.animationPropertiesOverride.blendingSpeed = blendingSpeed;
            }
        }
        /** Computes the transition duration blending speed */
        public static ComputeBlendingSpeed(rate:number, duration:number):number {
            return 1 / (rate * duration);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////
        // Canvas Tools Instance Helper Functions
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        /** TODO */
        public static InstantiateClass(className: string): any {
            const arr = className.split(".");
            let fn: any = (window || this);
            for (var i = 0, len = arr.length; i < len; i++) {
                fn = fn[arr[i]];
            }
            return (typeof fn === "function") ? fn : null;
        }
        /** TODO */
        public static DisposeEntity(entity: BABYLON.AbstractMesh) {
            if (entity != null) {
                //console.warn("===> Disposing Entity: " + entity.name);
                if (entity.metadata != null && entity.metadata.unity) {
                    const metadata: any = entity.metadata.unity;
                    if (metadata.components != null && metadata.components.length > 0) {
                        //console.warn("===> Disposing Script Components For: " + entity.name);
                        metadata.components.forEach((ownerscript) => {
                            if (ownerscript.instance != null) {
                                BABYLON.SceneManager.DestroyScriptComponent(ownerscript.instance);
                                ownerscript.instance = null;
                            }
                        });
                    }
                    delete entity.metadata.unity;
                    if (entity.metadata.clone != null) {
                        delete entity.metadata.clone;
                    }
                }
                if (entity.physicsImpostor != null) {
                    //console.warn("===> Disposing Physics Impostor For: " + entity.name);
                    const anyImpostor: any = (<any>entity.physicsImpostor);
                    if (anyImpostor.onCollideEvent != null) {
                        anyImpostor.onCollideEvent = null;
                    }
                    entity.physicsImpostor.dispose();
                    entity.physicsImpostor = null;
                }
                if (entity.skeleton != null && entity.skeleton.bones != null && entity.skeleton.bones.length > 0) {
                    //console.warn("===> Disposing Skeleton Bones For: " + entity.name);
                    entity.skeleton.bones.forEach((bone) => {
                        if (bone != null && bone.metadata != null) {
                            bone.metadata = null;
                        }
                    });
                }
                if ((<any>entity).cameraRig != null) {
                    if ((<any>entity).cameraRig.dispose) {
                        //console.warn("===> Disposing Camera Rig: " + (<any>entity).cameraRig.name);
                        (<any>entity).cameraRig.dispose();
                    }
                    delete (<any>entity).cameraRig;
                }
                if ((<any>entity).lightRig != null) {
                    if ((<any>entity).lightRig.dispose) {
                        //console.warn("===> Disposing Light Rig: " + (<any>entity).lightRig.name);
                        (<any>entity).lightRig.dispose();
                    }
                    delete (<any>entity).lightRig;
                }
                if ((<any>entity).flareRig != null) {
                    if ((<any>entity).flareRig.dispose) {
                        //console.warn("===> Disposing Flare Rig: " + (<any>entity).flareRig.name);
                        (<any>entity).flareRig.dispose();
                    }
                    delete (<any>entity).flareRig;
                }
            }
        }
        /** TODO */
        public static FindMesh(name:string, meshes:BABYLON.AbstractMesh[], searchType:BABYLON.SearchType = BABYLON.SearchType.StartsWith):BABYLON.AbstractMesh {
            let result:BABYLON.AbstractMesh = null;
            const search:BABYLON.SearchType = (searchType != null) ? searchType : BABYLON.SearchType.StartsWith;
            if (meshes != null && meshes.length > 0) {
                for (let i:number = 0; i < meshes.length; i++) {
                    const mesh:BABYLON.AbstractMesh = meshes[i];
                    if (search === BABYLON.SearchType.StartsWith) {
                        if (BABYLON.Utilities.StartsWith(mesh.name, name)) {
                            result = mesh;
                            break;
                        }
                    } else if (search === BABYLON.SearchType.EndsWith) {
                        if (BABYLON.Utilities.EndsWith(mesh.name, name)) {
                            result = mesh;
                            break;
                        }
                    } else if (search === BABYLON.SearchType.IndexOf) {
                        if (mesh.name.indexOf(name) >= 0) {
                            result = mesh;
                            break;
                        }
                    } else {
                        if (mesh.name === name) {
                            result = mesh;
                            break;
                        }
                    }
                }
            }
            return result;            
        }
        /** TODO */
        public static CloneValue(source:any, destinationObject:any): any {
            if (!source) return null;
            if (source instanceof BABYLON.Mesh) return null;
            if (source instanceof BABYLON.SubMesh) {
                return source.clone(destinationObject);
            } else if (source.clone) {
                return source.clone();
            }
            return source;
        }
        /** TODO */
        public static CloneMetadata(source:any): any {
            let result:any = null;
            if (source != null) {
                let new_unity:any = null;
                if (source.unity != null) {
                    const new_visible:boolean = source.unity.visible != null ? source.unity.visible : true;
                    const new_visibilty:number = source.unity.visibility != null ? source.unity.visibility : 1.0;
                    const new_tags:string = source.unity.tags != null ? source.unity.tags : "Untagged";
                    const new_bone:string = source.unity.bone != null ? source.unity.bone : null;
                    const new_group:string = source.unity.group != null ? source.unity.group : "Untagged";
                    const new_layer:number = source.unity.layer != null ? source.unity.layer : 0;
                    const new_layername:string = source.unity.layername != null ? source.unity.layername : "Default";
                    let new_renderer:any = null;
                    let new_rigidbody:any = null;
                    let new_collision:any = null;
                    let new_properties:any = null;
                    if (source.unity.renderer) {
                        new_renderer = {};
                        BABYLON.Utilities.DeepCopyProperties(source.unity.renderer, new_renderer);
                    }
                    if (source.unity.rigidbody) {
                        new_rigidbody = {};
                        BABYLON.Utilities.DeepCopyProperties(source.unity.rigidbody, new_rigidbody);
                    }
                    if (source.unity.collision) {
                        new_collision = {};
                        BABYLON.Utilities.DeepCopyProperties(source.unity.collision, new_collision);
                    }
                    if (source.unity.properties) {
                        new_properties = {};
                        BABYLON.Utilities.DeepCopyProperties(source.unity.properties, new_properties);
                    }
                    let new_components:any[] = null;
                    if (source.unity.components != null && source.unity.components.length > 0) {
                        new_components = [];
                        source.unity.components.forEach((comp) => {
                            if (comp != null) {
                                let new_comp:any = {};
                                let is_script:boolean = (comp.alias != null && comp.alias === "script");
                                BABYLON.Utilities.DeepCopyProperties(comp, new_comp, ["instance"]);
                                if (is_script === true) new_comp.instance = null;
                                new_components.push(new_comp);
                            }
                        });
                    }
                    new_unity = {};
                    new_unity.prefab = false;
                    new_unity.visible = new_visible;
                    new_unity.visibility = new_visibilty;
                    new_unity.tags = new_tags;
                    new_unity.bone = new_bone;
                    new_unity.group = new_group;
                    new_unity.layer = new_layer;
                    new_unity.layername = new_layername;
                    new_unity.renderer = new_renderer;
                    new_unity.rigidbody = new_rigidbody;
                    new_unity.collision = new_collision;
                    new_unity.properties = new_properties;
                    new_unity.components = new_components;
                }
                if (new_unity != null) result = { unity: new_unity };
            }
            return result;
        }
        /** TODO */
        public static DeepCopyProperties(source:any, destination:any, doNotCopyList?: string[], mustCopyList?: string[]): void {
            for (let prop in source) {
                if (prop[0] === "_" && (!mustCopyList || mustCopyList.indexOf(prop) === -1)) {
                    continue;
                }
                if (doNotCopyList && doNotCopyList.indexOf(prop) !== -1) {
                    continue;
                }
                let sourceValue = source[prop];
                let typeOfSourceValue = typeof sourceValue;
                if (typeOfSourceValue === "function") {
                    continue;
                }
                if (typeOfSourceValue === "object") {
                    if (sourceValue instanceof Array) {
                        destination[prop] = [];
                        if (sourceValue.length > 0) {
                            if (typeof sourceValue[0] == "object") {
                                for (let index = 0; index < sourceValue.length; index++) {
                                    let clonedValue = BABYLON.Utilities.CloneValue(sourceValue[index], destination);
                                    if (destination[prop].indexOf(clonedValue) === -1) { // Test if auto inject was not done
                                        destination[prop].push(clonedValue);
                                    }
                                }
                            } else {
                                destination[prop] = sourceValue.slice(0);
                            }
                        }
                    } else {
                        destination[prop] = BABYLON.Utilities.CloneValue(sourceValue, destination);
                    }
                } else {
                    destination[prop] = sourceValue;
                }
            }
        }
    }
}