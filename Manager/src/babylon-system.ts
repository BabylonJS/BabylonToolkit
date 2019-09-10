module BABYLON {
    /**
     * Babylon system class
     * @class System - All rights reserved (c) 2019 Mackey Kinard
     */
    export enum System
    {
        Deg2Rad = 0.0174532924,
        Rad2Deg = 57.29578,
        Kph2Mph = 0.621371,
        Mph2Kph = 1.60934,
        Mps2Kph = 3.6,
        Meter2Inch = 39.3701,
        Inch2Meter = 0.0254,
        Gravity = 9.81,
        Gravity3G = (9.8 * 3),
        SkidFactor = 0.25,
        WalkingVelocity = (1.1 * 4), // 4 km/h -> 1.1 m/s
        TerminalVelocity = 55,
        GammaCorrection = 2.2
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
        Xbox360 = 1,
        DualShock = 2,
        PoseController = 3
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
        AppliedForces = 1
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
	export enum CollisionFilters {
        DefaultFilter = 1,
        StaticFilter = 2,
        KinematicFilter = 4,
        DebrisFilter = 8,
        SensorTrigger = 16,
        CharacterFilter = 32,
        GroundFilter = 64,
        AllFilter = -1
    }
	export enum CollisionState {
        ACTIVE_TAG = 1,
        ISLAND_SLEEPING = 2,
        WANTS_DEACTIVATION = 3,
        DISABLE_DEACTIVATION = 4,
        DISABLE_SIMULATION = 5
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
    export interface IUnityTransform {
        type:string;
        id:string;
        tag:string;
        name:string;
        layer:number;
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
    
    export interface UserInputPress {
        index: number;
        action: () => void;
    }
    
    export type UserInputAction = (index: number) => void;

    export class UserInputOptions {
        public static JoystickRightHandleColor:string = "yellow";
        public static JoystickLeftSensibility:number = 1;
        public static JoystickRightSensibility:number = 1;
        public static JoystickDeadStickValue:number = 0.1;
        public static GamepadDeadStickValue:number = 0.25;
        public static GamepadLStickXInverted:boolean = false;
        public static GamepadLStickYInverted:boolean = false;
        public static GamepadRStickXInverted:boolean = false;
        public static GamepadRStickYInverted:boolean = true;
        public static GamepadLStickSensibility:number = 1;
        public static GamepadRStickSensibility:number = 1;
        public static PointerAngularSensibility:number = 0.5;
        public static PointerWheelDeadZone:number = 0.1;
    }
    
    /**
     * Babylon utility class
     * @class Utilities - All rights reserved (c) 2019 Mackey Kinard
     */
    export class Utilities {
        private static UpVector:BABYLON.Vector3 = BABYLON.Vector3.Up();
        private static AuxVector:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        private static ZeroVector:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        private static TempMatrix:BABYLON.Matrix = BABYLON.Matrix.Zero();
        private static TempVector2:BABYLON.Vector2 = BABYLON.Vector2.Zero();
        private static TempVector3:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        private static PrintElement: HTMLElement = null;

        // ********************************* //
        // * Public Advanced Lerp Support  * //
        // ********************************* //

        /** TODO */
        /** TODO */
		public static LerpLog(a:number, b:number, t:number):number {
            const clampedT:number = Math.min(Math.max(t, 0), 1);
            const logT:number = Math.sin(clampedT * Math.PI * 0.5);
            return a + (b - a) * logT;
        }
        /** TODO */
		public static LerpExp(a:number, b:number, t:number):number {
            const clampedT:number = Math.min(Math.max(t, 0), 1);
            const expT:number = 1 - Math.cos(clampedT * Math.PI * 0.5);
            return a + (b - a) * expT;
        }
		public static LerpClamp(a:number, b:number, t:number):number {
            const clampedT:number = Math.min(Math.max(t, 0), 1);
            return a + (b - a) * clampedT;
        }
        /** TODO */
		public static LerpUnclamp(a:number, b:number, t:number):number {
            return a + (b - a) * t;
        }

        // ********************************** //
        // * Public Utility Helper Support  * //
        // ********************************** //

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
        /** Gradually changes a number towards a desired goal over time. (Note Only Uses currentVelocityResult.x as output variable ) */
        public static SmoothDamp(current:number, target:number, smoothTime:number, maxSpeed:number, deltaTime:number, currentVelocityResult:BABYLON.Vector2):number
        {
            if (!currentVelocityResult) return 0;
            // Based on Game Programming Gems 4 Chapter 1.10
            let change:number = current - target;
            const maxSmoothTime = Math.max(0.0001, smoothTime);
            const omega:number = 2 / maxSmoothTime;
            const x:number = omega * deltaTime;
            const exp:number = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
            const originalTo:number = target;
            // Clamp maximum speed
            const maxChange:number = maxSpeed * maxSmoothTime;
            change = BABYLON.Scalar.Clamp(change, -maxChange, maxChange);
            const newTarget = current - change;
            const temp:number = (currentVelocityResult.x + omega * change) * deltaTime;
            currentVelocityResult.x = (currentVelocityResult.x - omega * temp) * exp;
            // Prevent overshooting
            let output:number = newTarget + (change + temp) * exp;
            if (originalTo - current > 0.0 == output > originalTo) {
                output = originalTo;
                currentVelocityResult.x = (output - originalTo) / deltaTime;
            }
            return output;
        }
        /** Gradually changes an angle given in degrees towards a desired goal angle over time. */
        public static SmoothDampAngle(current:number, target:number, smoothTime:number, maxSpeed:number, deltaTime:number, currentVelocityResult:BABYLON.Vector2):number
        {
            const newTarget = current + BABYLON.Scalar.DeltaAngle(current, target);
            return BABYLON.Utilities.SmoothDamp(current, newTarget, smoothTime, maxSpeed, deltaTime, currentVelocityResult);
        }
        /** Returns a new Matrix as a rotation matrix from the Euler angles in degrees (x, y, z). */
        public static ToMatrix(eulerX:number, eulerY:number, eulerZ:number) : BABYLON.Matrix {
            ///return BABYLON.Matrix.RotationYawPitchRoll(eulerY * BABYLON.System.Deg2Rad, eulerX * BABYLON.System.Deg2Rad, eulerZ * BABYLON.System.Deg2Rad);
            return BABYLON.Matrix.RotationYawPitchRoll(eulerY * BABYLON.System.Deg2Rad, eulerX * BABYLON.System.Deg2Rad, eulerZ * BABYLON.System.Deg2Rad);
        }
        /** Sets a Matrix result as a rotation matrix from the Euler angles in degrees (x, y, z). */
        public static ToMatrixToRef(eulerX:number, eulerY:number, eulerZ:number, result:BABYLON.Matrix): void {
            BABYLON.Matrix.RotationYawPitchRollToRef(eulerY * BABYLON.System.Deg2Rad, eulerX * BABYLON.System.Deg2Rad, eulerZ * BABYLON.System.Deg2Rad, result);
        }
        /** Returns a new Vector Euler in degress set from the passed qauternion. */
        public static ToEuler(quaternion:BABYLON.Quaternion):BABYLON.Vector3 {
            const result:BABYLON.Vector3 = quaternion.toEulerAngles();
            result.x = result.x * BABYLON.System.Rad2Deg;
            result.y = result.y * BABYLON.System.Rad2Deg;
            result.z = result.z * BABYLON.System.Rad2Deg;;
            return result;
        }
        /** Sets a Vector Euler result in degress set from the passed qauternion. */
        public static ToEulerToRef(quaternion:BABYLON.Quaternion, result:BABYLON.Vector3):void {
            quaternion.toEulerAnglesToRef(result);
            result.x = result.x * BABYLON.System.Rad2Deg;
            result.y = result.y * BABYLON.System.Rad2Deg;
            result.z = result.z * BABYLON.System.Rad2Deg;;
        }
        /** Returns a new Quaternion set from the passed Euler float angles in degrees (x, y, z). */
        public static FromEuler(eulerX:number, eulerY:number, eulerZ:number) : BABYLON.Quaternion {
            //return BABYLON.Quaternion.RotationYawPitchRoll(eulerY * BABYLON.System.Deg2Rad, eulerX * BABYLON.System.Deg2Rad, eulerZ * BABYLON.System.Deg2Rad);
            return BABYLON.Quaternion.FromEulerAngles(eulerX * BABYLON.System.Deg2Rad, eulerY * BABYLON.System.Deg2Rad, eulerZ * BABYLON.System.Deg2Rad);
        }
        /** Sets a Quaternion result set from the passed Euler float angles in degrees (x, y, z). */
        public static FromEulerToRef(eulerX:number, eulerY:number, eulerZ:number, result:BABYLON.Quaternion):void  {
            //BABYLON.Quaternion.RotationYawPitchRollToRef(eulerY * BABYLON.System.Deg2Rad, eulerX * BABYLON.System.Deg2Rad, eulerZ * BABYLON.System.Deg2Rad, result);
            BABYLON.Quaternion.FromEulerAnglesToRef(eulerX * BABYLON.System.Deg2Rad, eulerY * BABYLON.System.Deg2Rad, eulerZ * BABYLON.System.Deg2Rad, result);
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
        public static LookRotation(position:BABYLON.Vector3, up:BABYLON.Vector3):BABYLON.Quaternion {
            let result:BABYLON.Quaternion = BABYLON.Quaternion.Zero();
            BABYLON.Utilities.LookRotationToRef(position, up, result);
            return result;
        }
        /** Returns a new Quaternion set from the passed vector position. */
        public static LookRotationToRef(position:BABYLON.Vector3, up:BABYLON.Vector3, result:BABYLON.Quaternion):void {
            BABYLON.Utilities.TempMatrix.reset();
            BABYLON.Matrix.LookAtLHToRef(BABYLON.Utilities.ZeroVector, position, (up != null) ? up : BABYLON.Utilities.UpVector, BABYLON.Utilities.TempMatrix)
            BABYLON.Utilities.TempMatrix.invert()
            BABYLON.Quaternion.FromRotationMatrixToRef(BABYLON.Utilities.TempMatrix, result);
        }
        /** Returns a new vector3 degrees converted from radions */
        public static Vector3Rad2Deg(vector:BABYLON.Vector3, ):BABYLON.Vector3 {
            const result:BABYLON.Vector3 = BABYLON.Vector3.Zero();
            BABYLON.Utilities.Vector3Rad2DegToRef(vector, result);
            return result;
        }
        /** Sets a vector3 result degrees converted from radions */
        public static Vector3Rad2DegToRef(vector:BABYLON.Vector3, result:BABYLON.Vector3) {
            result.x = vector.x * BABYLON.System.Rad2Deg;
            result.y = vector.y * BABYLON.System.Rad2Deg;
            result.z = vector.z * BABYLON.System.Rad2Deg;;
        }
        /** Multiply the quaternion by a vector */
        public static MultiplyQuaternionByVector(quaternion:BABYLON.Quaternion, vector:BABYLON.Vector3): BABYLON.Vector3 {
            const result:BABYLON.Vector3 = new BABYLON.Vector3(0,0,0);
            BABYLON.Utilities.MultiplyQuaternionByVectorToRef(quaternion, vector, result);
            return result;
        }
        /** Multiply the quaternion by a vector to result */
        public static MultiplyQuaternionByVectorToRef(quaternion:BABYLON.Quaternion, vector:BABYLON.Vector3, result:BABYLON.Vector3) : void {
            // Vector
            const x:number = vector.x;
            const y:number = vector.y;
            const z:number = vector.z;
            // Quaternion
            const qx:number = quaternion.x;
            const qy:number = quaternion.y;
            const qz:number = quaternion.z;
            const qw:number = quaternion.w;
            // Quaternion * Vector
            const ix:number =  qw * x + qy * z - qz * y;
            const iy:number =  qw * y + qz * x - qx * z;
            const iz:number =  qw * z + qx * y - qy * x;
            const iw:number = -qx * x - qy * y - qz * z;
            // Final Quaternion * Vector = Result
            result.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            result.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            result.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        }
        /** Validate and switch Euler rotation to Quaternion rotation. */
        public static ValidateTransformQuaternion(transform:BABYLON.TransformNode):void {
            if (transform.rotationQuaternion == null && transform.rotation != null) {
                transform.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(transform.rotation.x, transform.rotation.y, transform.rotation.z);
            }
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

        // ********************************** //
        // * Public General Helper Support  * //
        // ********************************** //
    
        public static HasOwnProperty(object:any, property:string):boolean {
            return (object != null && property != null && property !== "" && property in object);
        }

        public static GetFilenameFromUrl(url:string): string {
            return url.substring(url.lastIndexOf('/') + 1);
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

        // ************************************* //
        // * Public Convex Hull Shape Support  * //
        // ************************************* //

        private static TmpHullMatrix = null;
        private static TmpAmmoVectorA: any = null;
        private static TmpAmmoVectorB: any = null;
        private static TmpAmmoVectorC: any = null;
        public static AddHullVerts(btConvexHullShape: any, topLevelObject: BABYLON.IPhysicsEnabledObject, object: BABYLON.IPhysicsEnabledObject):number {
            if (BABYLON.Utilities.TmpHullMatrix == null) BABYLON.Utilities.TmpHullMatrix = new BABYLON.Matrix();
            if (BABYLON.Utilities.TmpAmmoVectorA == null) BABYLON.Utilities.TmpAmmoVectorA = new Ammo.btVector3(0, 0, 0);
            if (BABYLON.Utilities.TmpAmmoVectorB == null) BABYLON.Utilities.TmpAmmoVectorB = new Ammo.btVector3(0, 0, 0);
            if (BABYLON.Utilities.TmpAmmoVectorC == null) BABYLON.Utilities.TmpAmmoVectorC = new Ammo.btVector3(0, 0, 0);
            var triangleCount = 0;
            if (object && object.getIndices && object.getWorldMatrix && object.getChildMeshes) {
                var indices = object.getIndices();
                if (!indices) {
                    indices = [];
                }
                var vertexPositions = object.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                if (!vertexPositions) {
                    vertexPositions = [];
                }
                object.computeWorldMatrix(false);
                var faceCount = indices.length / 3;
                for (var i = 0; i < faceCount; i++) {
                    var triPoints = [];
                    for (var point = 0; point < 3; point++) {
                        var v = new BABYLON.Vector3(vertexPositions[(indices[(i * 3) + point] * 3) + 0], vertexPositions[(indices[(i * 3) + point] * 3) + 1], vertexPositions[(indices[(i * 3) + point] * 3) + 2]);

                        // Adjust for initial scaling
                        BABYLON.Matrix.ScalingToRef(object.scaling.x, object.scaling.y, object.scaling.z, BABYLON.Utilities.TmpHullMatrix);
                        v = BABYLON.Vector3.TransformCoordinates(v, BABYLON.Utilities.TmpHullMatrix);

                        var vec: any;
                        if (point == 0) {
                            vec = BABYLON.Utilities.TmpAmmoVectorA;
                        } else if (point == 1) {
                            vec = BABYLON.Utilities.TmpAmmoVectorB;
                        } else {
                            vec = BABYLON.Utilities.TmpAmmoVectorC;
                        }
                        vec.setValue(v.x, v.y, v.z);

                        triPoints.push(vec);
                    }
                    btConvexHullShape.addPoint(triPoints[0], true);
                    btConvexHullShape.addPoint(triPoints[1], true);
                    btConvexHullShape.addPoint(triPoints[2], true);
                    triangleCount++;
                }

                object.getChildMeshes().forEach((m) => {
                    triangleCount += BABYLON.Utilities.AddHullVerts(btConvexHullShape, topLevelObject, m);
                });
            }
            return triangleCount;
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
        /** TODO */
        public static IsNullOrEmpty(source:string):boolean {
            return (source == null || source === "");
        }
        /** TODO */
        public static SafeStringPush(array:string[], value:string):void {
            if (array.indexOf(value) === -1) {
                array.push(value);
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////
        // Canvas Tools Parsing Helper Functions
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        /** TODO */
        public static ParseTexture(source:any, scene:BABYLON.Scene, noMipmap?: boolean, invertY?: boolean, samplingMode?: number, onLoad?: Nullable<() => void>, onError?: Nullable<(message?: string, exception?: any) => void>, buffer?: Nullable<string | ArrayBuffer | ArrayBufferView | HTMLImageElement | Blob>, deleteBuffer?: boolean, format?: number):BABYLON.Texture {
            let result:BABYLON.Texture = null;
            if (source != null && source.filename != null && source.filename !== "") {
                const root:string = BABYLON.SceneManager.GetRootUrl(scene);
                const url:string = source.filename;
                result = new BABYLON.Texture((root + url), scene, noMipmap, invertY, samplingMode, onLoad, onError, buffer, deleteBuffer, format);
            }
            return result;
        }

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
                const alpha:number = (source.a != null) ? source.a : 1;
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
        
        /** Transforms position from local space to world space. (Using TransformCoordinates) */
        public  static TransformPoint(owner: BABYLON.TransformNode | BABYLON.Camera, position:BABYLON.Vector3, compute:boolean = false):BABYLON.Vector3 {
            if (compute === true) owner.computeWorldMatrix();
            return BABYLON.Vector3.TransformCoordinates(position, owner.getWorldMatrix());
        }
        /** Inverse transforms position from world space to local space. (Using TransformCoordinates) */
        public  static InverseTransformPoint(owner: BABYLON.TransformNode | BABYLON.Camera, position:BABYLON.Vector3, compute:boolean = false):BABYLON.Vector3 {
            if (compute === true) owner.computeWorldMatrix();
            BABYLON.Utilities.TempMatrix.reset();
            owner.getWorldMatrix().invertToRef(BABYLON.Utilities.TempMatrix);
            return BABYLON.Vector3.TransformCoordinates(position, BABYLON.Utilities.TempMatrix);
        }
        /** Transforms position from local space to world space. (Using TransformCoordinates) */
        public static TransformPointToRef(owner: BABYLON.TransformNode | BABYLON.Camera, position:BABYLON.Vector3, result:BABYLON.Vector3, compute:boolean = false):void {
            if (compute === true) owner.computeWorldMatrix();
            return BABYLON.Vector3.TransformCoordinatesToRef(position, owner.getWorldMatrix(), result);
        }
        /** Inverse transforms position from world space to local space. (Using TransformCoordinates) */
        public static InverseTransformPointToRef(owner: BABYLON.TransformNode | BABYLON.Camera, position:BABYLON.Vector3, result:BABYLON.Vector3, compute:boolean = false):void {
            if (compute === true) owner.computeWorldMatrix();
            BABYLON.Utilities.TempMatrix.reset();
            owner.getWorldMatrix().invertToRef(BABYLON.Utilities.TempMatrix);
            return BABYLON.Vector3.TransformCoordinatesToRef(position, BABYLON.Utilities.TempMatrix, result);
        }
        /** Transforms direction from local space to world space. (Using TransformNormal) */
        public static TransformDirection(owner: BABYLON.TransformNode | BABYLON.Camera, direction:BABYLON.Vector3, compute:boolean = false):BABYLON.Vector3 {
            if (compute === true) owner.computeWorldMatrix();
            return BABYLON.Vector3.TransformNormal(direction, owner.getWorldMatrix());
        }
        /** Inverse transforms direction from world space to local space. (Using TransformNormal) */
        public static InverseTransformDirection(owner: BABYLON.TransformNode | BABYLON.Camera, direction:BABYLON.Vector3, compute:boolean = false):BABYLON.Vector3 {
            if (compute === true) owner.computeWorldMatrix();
            BABYLON.Utilities.TempMatrix.reset();
            owner.getWorldMatrix().invertToRef(BABYLON.Utilities.TempMatrix);
            return BABYLON.Vector3.TransformNormal(direction, BABYLON.Utilities.TempMatrix);
        }
        /** Transforms direction from local space to world space. (Using TransformNormal) */
        public static TransformDirectionToRef(owner: BABYLON.TransformNode | BABYLON.Camera, direction:BABYLON.Vector3, result:BABYLON.Vector3, compute:boolean = false):void {
            if (compute === true) owner.computeWorldMatrix();
            return BABYLON.Vector3.TransformNormalToRef(direction, owner.getWorldMatrix(), result);
        }
        /** Inverse transforms direction from world space to local space. (Using TransformNormal) */
        public static InverseTransformDirectionToRef(owner: BABYLON.TransformNode | BABYLON.Camera, direction:BABYLON.Vector3, result:BABYLON.Vector3, compute:boolean = false):void {
            if (compute === true) owner.computeWorldMatrix();
            BABYLON.Utilities.TempMatrix.reset();
            owner.getWorldMatrix().invertToRef(BABYLON.Utilities.TempMatrix);
            return BABYLON.Vector3.TransformNormalToRef(direction, BABYLON.Utilities.TempMatrix, result);
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
        public static GetDirectionVector(owner: BABYLON.TransformNode | BABYLON.Camera, vector:BABYLON.Vector3):BABYLON.Vector3 {
            return owner.getDirection(vector);
        }
        /** Gets any direction vector of the owner in world space. */
        public static GetDirectionVectorToRef(owner: BABYLON.TransformNode | BABYLON.Camera, vector:BABYLON.Vector3, result:BABYLON.Vector3):void {
            owner.getDirectionToRef(vector, result);
        }
        /** Gets the blue axis of the owner in world space. */
        public static GetForwardVector(owner: BABYLON.TransformNode | BABYLON.Camera):BABYLON.Vector3 {
            return owner.getDirection(BABYLON.Vector3.Forward());
        }
        /** Gets the blue axis of the owner in world space. */
        public static GetForwardVectorToRef(owner: BABYLON.TransformNode | BABYLON.Camera, result:BABYLON.Vector3):void {
            owner.getDirectionToRef(BABYLON.Vector3.Forward(), result);
        }
        /** Gets the red axis of the owner in world space. */
        public static GetRightVector(owner: BABYLON.TransformNode | BABYLON.Camera):BABYLON.Vector3 {
            return owner.getDirection(BABYLON.Vector3.Right());
        }
        /** Gets the red axis of the owner in world space. */
        public static GetRightVectorToRef(owner: BABYLON.TransformNode | BABYLON.Camera, result:BABYLON.Vector3):void {
            owner.getDirectionToRef(BABYLON.Vector3.Right(), result);
        }
        /** Gets the green axis of the owner in world space. */
        public static GetUpVector(owner: BABYLON.TransformNode | BABYLON.Camera):BABYLON.Vector3 {
            return owner.getDirection(BABYLON.Vector3.Up());
        }
        /** Gets the green axis of the owner in world space. */
        public static GetUpVectorToRef(owner: BABYLON.TransformNode | BABYLON.Camera, result:BABYLON.Vector3):void {
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
        /** Initialize default shader material properties */
        public static InitializeShaderMaterial(material:BABYLON.ShaderMaterial, binding:boolean = true):void {
            const shaderMaterial:any = material;
            const shaderProgram:string = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getShaderName") ? shaderMaterial.getShaderName() : "glsl";
            const alphaBlending:boolean = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getAlphaBlending") ? shaderMaterial.getAlphaBlending() : false;
            const alphaTesting:boolean = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getAlphaTesting") ? shaderMaterial.getAlphaTesting() : false;
            let defaultDefines:string[] = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getDefaultDefines") ? shaderMaterial.getDefaultDefines() : null;
            let defaultAttributes:string[] = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getDefaultAttributes") ? shaderMaterial.getDefaultAttributes() : null;
            let defaultUniforms:string[] = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getDefaultUniforms") ? shaderMaterial.getDefaultUniforms() : null;
            if (defaultDefines == null || defaultDefines.length <= 0) {
                defaultDefines = ["#define DIFFUSECOLOR", "#define DIFFUSETEXTURE"];
            }
            if (defaultAttributes == null || defaultAttributes.length <= 0) {
                defaultAttributes = ["position", "normal", "uv", "uv2", "color"];
            }
            if (defaultUniforms == null || defaultUniforms.length <= 0) {
                defaultUniforms = ["world", "worldView", "worldViewProjection", "view", "projection", "viewProjection", "diffuseColor", "diffuseTexture", "diffuseTextureInfos", "diffuseTextureMatrix"];
            }
            const shaderProgramInfo:any = { vertex: shaderProgram, fragment: shaderProgram };
            const shaderOptionsInfo:BABYLON.IShaderMaterialOptions = {
                needAlphaBlending: alphaBlending,
                needAlphaTesting: alphaTesting,
                attributes: defaultAttributes,
                uniforms: defaultUniforms,
                defines: defaultDefines,
                samplers: [],
                uniformBuffers: []
            };
            shaderMaterial._shaderPath = shaderProgramInfo;
            shaderMaterial._options = shaderOptionsInfo;
            if (binding === true) {
                shaderMaterial.fn_afterBind = shaderMaterial._afterBind;
                shaderMaterial._afterBind = (mesh:BABYLON.Mesh) => { 
                    const scene:BABYLON.Scene = material.getScene();
                    if (scene.texturesEnabled) {
                        for (let name in shaderMaterial._textures) {
                            const texture:BABYLON.Texture = shaderMaterial._textures[name];
                            if (texture != null) {
                                shaderMaterial._effect.setFloat2(name + "Infos", texture.coordinatesIndex, texture.level);
                                shaderMaterial._effect.setMatrix(name + "Matrix", texture.getTextureMatrix());
                            }
                        }
                    }
                    if (shaderMaterial.fn_afterBind) try { shaderMaterial.fn_afterBind(mesh); }catch(e){};
                };
            }
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
                skeleton.animationPropertiesOverride.enableBlending = (blendingSpeed > 0);
                skeleton.animationPropertiesOverride.blendingSpeed = blendingSpeed;
            }
        }
        /** TODO */
        public static SetSkeletonProperties(skeleton:BABYLON.Skeleton, loopBehavior:number, blendingSpeed:number) {
            if (skeleton != null) {
                if (skeleton.animationPropertiesOverride == null) skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
                skeleton.animationPropertiesOverride.loopMode = loopBehavior;
                skeleton.animationPropertiesOverride.enableBlending = (blendingSpeed > 0);
                skeleton.animationPropertiesOverride.blendingSpeed = blendingSpeed;
            }
        }
        /** Computes the transition duration blending speed */
        public static ComputeBlendingSpeed(rate:number, duration:number):number {
            return 1 / (rate * duration);
        }

        public static CalculateCameraDistance(farClipPlane:number, lodPercent:number, clipPlaneScale:number = 1):number
        {
            const bias:number = 1; // Ignore Lod Bias For Distances - (QualitySettings.lodBias > 0f) ? QualitySettings.lodBias : 1f;
            return Math.round(((farClipPlane * clipPlaneScale) * lodPercent) * bias);
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
                    if (anyImpostor.tmpCollisionObjects != null) {
                        delete anyImpostor.tmpCollisionObjects;
                    }
                    if (entity.physicsImpostor.physicsBody != null) {
                        if (entity.physicsImpostor.physicsBody.entity != null) {
                            delete entity.physicsImpostor.physicsBody.entity;
                        }
                        if (entity.physicsImpostor.physicsBody.triangleMapInfo != null) {
                            delete entity.physicsImpostor.physicsBody.triangleMapInfo;
                        }
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
                if ((<any>entity).textWriter != null) {
                    if ((<any>entity).textWriter.dispose) {
                        //console.warn("===> Disposing Text Writer: " + (<any>entity).textWriter.name);
                        (<any>entity).textWriter.dispose();
                    }
                    delete (<any>entity).textWriter;
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

        public static CreateGuid(suffix:string = null):string
        {
            let result:string = BABYLON.Tools.RandomId();   
            if (!BABYLON.Utilities.IsNullOrEmpty(result)) {
                result += ("_" + suffix);
            }
            return result;
        }

        public static ValidateTransformGuid(node:TransformNode):void
        {
            if (node != null && node.metadata != null && node.metadata.unity != null && node.metadata.unity.guid != null && node.metadata.unity.guid !== "") {
                const guid:string = node.metadata.unity.guid;
                if (node.id !== guid) {
                    node.id = guid;
                }
                delete node.metadata.unity.guid;
            }
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
                    const new_visibilty:number = source.unity.visibility != null ? source.unity.visibility : 1;
                    const new_billboard:number = source.unity.billboard != null ? source.unity.billboard : 0;
                    const new_tags:string = source.unity.tags != null ? source.unity.tags : "Untagged Layer0";
                    const new_skin:string = source.unity.skin != null ? source.unity.skin : false;
                    const new_bone:number = source.unity.bone != null ? source.unity.bone : null;
                    const new_group:string = source.unity.group != null ? source.unity.group : "Untagged";
                    const new_layer:number = source.unity.layer != null ? source.unity.layer : 0;
                    const new_layername:string = source.unity.layername != null ? source.unity.layername : "Default";
                    //const new_lods:string = source.unity.lods != null ? source.unity.lods : null;
                    //const new_coverages:string = source.unity.coverages != null ? source.unity.coverages : null;
                    //const new_distances:string = source.unity.distances != null ? source.unity.distances : null;
                    let new_physics:any = null;
                    let new_renderer:any = null;
                    let new_collision:any = null;
                    let new_properties:any = null;
                    if (source.unity.physics) {
                        new_physics = {};
                        BABYLON.Utilities.DeepCopyProperties(source.unity.physics, new_physics);
                    }
                    if (source.unity.renderer) {
                        new_renderer = {};
                        BABYLON.Utilities.DeepCopyProperties(source.unity.renderer, new_renderer);
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
                    new_unity.parsed = false;
                    new_unity.prefab = false;
                    ////////////////////////////////////////
                    new_unity.lods = null;
                    new_unity.coverages = null;
                    new_unity.distances = null;
                    new_unity.handlers = null;
                    //new_unity.body = new_body;
                    //new_unity.lods = new_lods;
                    //new_unity.coverages = new_coverages;
                    //new_unity.distances = new_distances;
                    ////////////////////////////////////////
                    new_unity.visible = new_visible;
                    new_unity.visibility = new_visibilty;
                    new_unity.billboard = new_billboard;
                    new_unity.tags = new_tags;
                    new_unity.skin = new_skin;
                    new_unity.bone = new_bone;
                    new_unity.group = new_group;
                    new_unity.layer = new_layer;
                    new_unity.layername = new_layername;
                    new_unity.renderer = new_renderer;
                    new_unity.physics = new_physics;
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
        /** TODO */
        public static ValidateTransformMetadata(transform:BABYLON.TransformNode): void {
            if (transform.metadata == null) transform.metadata = {};
            if (transform.metadata.unity == null) transform.metadata.unity = {};
            const metadata:any = transform.metadata.unity;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "parsed")) transform.metadata.unity.parsed = false;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "prefab")) transform.metadata.unity.prefab = false;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "visible")) transform.metadata.unity.visible = true;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "visibility")) transform.metadata.unity.visibility = 1;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "billboard")) transform.metadata.unity.billboard = 0;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "tags")) transform.metadata.unity.tags = "Untagged Layer0";
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "skin")) transform.metadata.unity.skin = false;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "bone")) transform.metadata.unity.bone = null;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "group")) transform.metadata.unity.group = "Untagged";
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "layer")) transform.metadata.unity.layer = 0;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "layername")) transform.metadata.unity.layername = "Default";
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "lods")) transform.metadata.unity.lods = null;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "coverages")) transform.metadata.unity.coverages = null;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "distances")) transform.metadata.unity.distances = null;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "handlers")) transform.metadata.unity.handlers = null;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "physics")) transform.metadata.unity.physics = null;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "renderer")) transform.metadata.unity.renderer = null;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "collision")) transform.metadata.unity.collision = null;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "properties")) transform.metadata.unity.properties = null;
            if (!BABYLON.Utilities.HasOwnProperty(metadata, "components")) transform.metadata.unity.components = null;
        }
    }
}

/**
 * RequestAnimationFrame() Original Shim By: Paul Irish (Internal use only)
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @class TimerPlugin - All rights reserved (c) 2019 Mackey Kinard
 */
var TimerPlugin:any = window;
TimerPlugin.requestAnimFrame = (function() {
	return  TimerPlugin.requestAnimationFrame || 
			TimerPlugin.webkitRequestAnimationFrame || 
			TimerPlugin.mozRequestAnimationFrame || 
			TimerPlugin.oRequestAnimationFrame || 
			TimerPlugin.msRequestAnimationFrame || function(callback, element){ window.setTimeout(callback, 1000 / 60); };
})();
/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
TimerPlugin.requestInterval = function(fn, delay) {
	if( !TimerPlugin.requestAnimationFrame && 
		!TimerPlugin.webkitRequestAnimationFrame && 
		!(TimerPlugin.mozRequestAnimationFrame && TimerPlugin.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
        !TimerPlugin.oRequestAnimationFrame &&
        !TimerPlugin.msRequestAnimationFrame)
			return window.setInterval(fn, delay);
			
    let start = TimerPlugin.getTimeMilliseconds();
	let	handle:any = new Object();
	function loop() {
		let current = TimerPlugin.getTimeMilliseconds(), delta = current - start;
		if(delta >= delay) {
			fn.call();
			start = TimerPlugin.getTimeMilliseconds();
		}
		handle.value = TimerPlugin.requestAnimFrame(loop);
    };
    // ..
	handle.value = TimerPlugin.requestAnimFrame(loop);
	return handle;
};
/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
TimerPlugin.clearRequestInterval = function(handle) {
    TimerPlugin.cancelAnimationFrame ? TimerPlugin.cancelAnimationFrame(handle.value) :
    TimerPlugin.webkitCancelAnimationFrame ? TimerPlugin.webkitCancelAnimationFrame(handle.value) :
    TimerPlugin.webkitCancelRequestAnimationFrame ? TimerPlugin.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    TimerPlugin.mozCancelRequestAnimationFrame ? TimerPlugin.mozCancelRequestAnimationFrame(handle.value) :
    TimerPlugin.oCancelRequestAnimationFrame	? TimerPlugin.oCancelRequestAnimationFrame(handle.value) :
    TimerPlugin.msCancelRequestAnimationFrame ? TimerPlugin.msCancelRequestAnimationFrame(handle.value) :
    window.clearInterval(handle);
    handle = null;
};
/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
TimerPlugin.requestTimeout = function(fn, delay) {
	if( !TimerPlugin.requestAnimationFrame      	&& 
		!TimerPlugin.webkitRequestAnimationFrame && 
		!(TimerPlugin.mozRequestAnimationFrame && TimerPlugin.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		!TimerPlugin.oRequestAnimationFrame      && 
		!TimerPlugin.msRequestAnimationFrame)
			return window.setTimeout(fn, delay);
			
	let start = TimerPlugin.getTimeMilliseconds();
    let	handle:any = new Object();
	function loop(){
		let current = TimerPlugin.getTimeMilliseconds(), delta = current - start;
		delta >= delay ? fn.call() : handle.value = TimerPlugin.requestAnimFrame(loop);
    };
    // ..
	handle.value = TimerPlugin.requestAnimFrame(loop);
	return handle;
};
/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
TimerPlugin.clearRequestTimeout = function(handle) {
    TimerPlugin.cancelAnimationFrame ? TimerPlugin.cancelAnimationFrame(handle.value) :
    TimerPlugin.webkitCancelAnimationFrame ? TimerPlugin.webkitCancelAnimationFrame(handle.value) :
    TimerPlugin.webkitCancelRequestAnimationFrame ? TimerPlugin.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    TimerPlugin.mozCancelRequestAnimationFrame ? TimerPlugin.mozCancelRequestAnimationFrame(handle.value) :
    TimerPlugin.oCancelRequestAnimationFrame	? TimerPlugin.oCancelRequestAnimationFrame(handle.value) :
    TimerPlugin.msCancelRequestAnimationFrame ? TimerPlugin.msCancelRequestAnimationFrame(handle.value) :
    window.clearTimeout(handle);
    handle = null;
};
/**
 * Return the game time in total milliseconds
 */
TimerPlugin.getTimeMilliseconds = function () {
    if (BABYLON.PrecisionDate != null && BABYLON.PrecisionDate.Now != null)
    {
        return BABYLON.PrecisionDate.Now;
    }
    else
    {
        return (performance || Date).now();
    }
};
/**
 *  Sets the system game start time
 */
TimerPlugin.gameStartTime = TimerPlugin.getTimeMilliseconds();

