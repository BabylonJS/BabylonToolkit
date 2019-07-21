/// <reference path="winrt.d.ts" />
/// <reference path="babylon.d.ts" />
/// <reference path="babylon.scenecomponents.ts" />
/// <reference path="babylon.sceneutilities.ts" />
/// <reference path="babylon.scenenavagent.ts" />
/// <reference path="babylon.sceneplugins.ts" />
/// <reference path="babylon.scenestates.ts" />

module BABYLON {
    export class SceneManager {
        /** Get the current scene manager version information. */
        public static GetVersion(): string { return "4.0.3"; }
        /** Get the current instance of the registered scene manager. */
        public static GetInstance(): BABYLON.SceneManager { return (BABYLON.SceneManager.me) ? BABYLON.SceneManager.me : null; }
        /** Get instance of the stats control. */
        public static GetStatistics():Stats { return (BABYLON.SceneManager.showRenderStats === true && BABYLON.SceneManager.renderStatsInstance != null) ? BABYLON.SceneManager.renderStatsInstance : null; }

        // ********************************** //
        // * Babylon Scene Manager Helpers  * //
        // ********************************** //

        /** Create a new scene and registers a manager instance */        
        public static CreateScene(engine:BABYLON.Engine):BABYLON.Scene {
            let scene:BABYLON.Scene = new BABYLON.Scene(engine);
            BABYLON.Utilities.RegisterSceneManager(scene);
            return scene;
        }
        /** Load and parse a new scene and registers a manager instance */        
        public static LoadScene(rootUrl: string, sceneFilename: any, engine: Engine, onSuccess?: Nullable<(scene: Scene) => void>, onProgress?: Nullable<(event: SceneLoaderProgressEvent) => void>, onError?: Nullable<(scene: Scene, message: string, exception?: any) => void>, pluginExtension?: Nullable<string>): Nullable<ISceneLoaderPlugin | ISceneLoaderPluginAsync> {
            return BABYLON.SceneManager.AppendScene(rootUrl, sceneFilename, BABYLON.SceneManager.CreateScene(engine), onSuccess, onProgress, onError, pluginExtension);
        }
        /** Append and parse scene objects from a filename url */        
        public static AppendScene(rootUrl: string, sceneFilename?: any, scene?: Nullable<Scene>, onSuccess?: Nullable<(scene: Scene) => void>, onProgress?: Nullable<(event: SceneLoaderProgressEvent) => void>, onError?: Nullable<(scene: Scene, message: string, exception?: any) => void>, pluginExtension?: Nullable<string>):Nullable<ISceneLoaderPlugin | ISceneLoaderPluginAsync> {
            let scenex: any = <any>scene;
            if (scenex.manager == null) BABYLON.Utilities.RegisterSceneManager(scene);
            if (scenex.manager != null) scenex.manager._url = rootUrl;
            let onSuccessWrapper:(scene:BABYLON.Scene)=>void = (sx:BABYLON.Scene)=> {
                BABYLON.Utilities.ParseSceneMetadata(sx);
                BABYLON.Utilities.ExecuteSceneReady(sx);
                if (onSuccess != null) onSuccess(sx);
            };
            return BABYLON.SceneLoader.Append(rootUrl, sceneFilename, scene, onSuccessWrapper, onProgress, onError, pluginExtension);
        }
        /** Import and parse meshes from a filename url */        
        public static ImportMeshes(meshNames: any, rootUrl: string, sceneFilename?: any, scene?: Nullable<Scene>, onSuccess?: Nullable<(meshes: AbstractMesh[], particleSystems: ParticleSystem[], skeletons: Skeleton[], animationGroups: AnimationGroup[]) => void>, onProgress?: Nullable<(event: SceneLoaderProgressEvent) => void>, onError?: Nullable<(scene: Scene, message: string, exception?: any) => void>, pluginExtension?: Nullable<string>): Nullable<ISceneLoaderPlugin | ISceneLoaderPluginAsync> {
            let scenex: any = <any>scene;
            if (scenex.manager == null) BABYLON.Utilities.RegisterSceneManager(scene);
            let onSuccessWrapper:(meshes: AbstractMesh[], particleSystems: ParticleSystem[], skeletons: Skeleton[], animationGroups: AnimationGroup[])=>void = (mx: AbstractMesh[], px: ParticleSystem[], sx: Skeleton[], ax: AnimationGroup[])=> {
                BABYLON.Utilities.ParseImportMetadata(mx, scene);
                if (onSuccess != null) onSuccess(mx, px, sx, ax);
            };
            return BABYLON.SceneLoader.ImportMesh(meshNames, rootUrl, sceneFilename, scene, onSuccessWrapper, onProgress, onError, pluginExtension);
        }
        /** Attaches a managed entity component to the scene. */
        public static AttachComponent(comp: BABYLON.SceneComponent, klass:string, tick: boolean = true, propertyBag: any = {}):void {
            BABYLON.Utilities.RegisterSceneComponent(comp, klass, tick, propertyBag);
        }

        // ********************************** //
        // * Babylon Scene Manager Handers  * //
        // ********************************** //

        /** Registers a function handler to be executed when window is loaded. */
        public static OnWindowLoad(func: () => any): void {
            if (func != null) (<any>window).ontoolkitload = func;
        }
        /** Registers a function handler to be executed when device is ready. */
        public static OnDeviceReady(func: () => any): void {
            if (func != null) (<any>window).ontoolkitdevice = func;
        }
        /** Registers a function handler to be executed when scene is ready. */
        public static ExecuteWhenReady(func: (scene: BABYLON.Scene, manager: BABYLON.SceneManager) => void): void {
            if (func != null) BABYLON.SceneManager.readies.push(func);
        }

        // ********************************** //
        // *  Babylon Scene Manager Agents  * //
        // ********************************** //

        /** Is oculus browser platform agent. */
        public static IsOculusBrowser(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/OculusBrowser/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is samsung browser platform agent. */
        public static IsSamsungBrowser(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/SamsungBrowser/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is windows phone platform agent. */
        public static IsWindowsPhone(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/Windows Phone/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is blackberry web platform agent. */
        public static IsBlackBerry(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/BlackBerry/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is opera web platform agent. */
        public static IsOperaMini(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/Opera Mini/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is android web platform agent. */
        public static IsAndroid(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/Android/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is web os platform agent. */
        public static IsWebOS(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/webOS/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is ios web platform agent. */
        public static IsIOS(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is iphone web platform agent. */
        public static IsIPHONE(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/iPhone/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is ipad web platform agent. */
        public static IsIPAD(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/iPad/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is ipod web platform agent. */
        public static IsIPOD(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/iPod/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is internet explorer 11 platform agent. */
        public static IsIE11():boolean {
            return (navigator.msMaxTouchPoints !== void 0);
        }
        /** Is mobile web platform agent. */
        public static IsMobile(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                let n = navigator.userAgent;
                if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone|iPad|iPod/i) || n.match(/BlackBerry/i) || n.match(/Opera Mini/i) || n.match(/Windows Phone/i)) {
                    result = true;
                }
            }
            return result;
        }

        // *********************************** //
        // * Babylon Scene Manager Utilities * //
        // *********************************** //

        /** Are cordova platform services available. */
        public static IsCordova(): boolean {
            return ((<any>window).cordova != null);
        }
        /** Are unversial windows platform services available. */
        public static IsWindows(): boolean {
            return (typeof Windows !== "undefined" && typeof Windows.UI !== "undefined" && typeof Windows.System !== "undefined" && typeof Windows.Foundation !== "undefined");
        }
        /** Are playstation platform services available. */
        public static IsPlaystation(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/Playstation/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Are xbox one platform services available. */
        public static IsXboxOne(): boolean {
            let result: boolean = false;
            if (BABYLON.SceneManager.IsWindows() && typeof Windows.System.Profile !== "undefined" && typeof Windows.System.Profile.AnalyticsInfo !== "undefined" && typeof Windows.System.Profile.AnalyticsInfo.versionInfo !== "undefined" && typeof Windows.System.Profile.AnalyticsInfo.versionInfo.deviceFamily !== "undefined") {
                let n:string = Windows.System.Profile.AnalyticsInfo.versionInfo.deviceFamily;
                if (n.match(/Xbox/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Are xbox live platform services available. */
        public static IsXboxLive(): boolean {
            return (BABYLON.SceneManager.IsWindows() && typeof Microsoft !== "undefined" && typeof Microsoft.Xbox !== "undefined" && typeof Microsoft.Xbox.Services !== "undefined");
        }
        /** Are web assembly platform services available. */
        public static IsWebAssembly(): boolean {
            ///return (typeof WebAssembly !== "undefined");
            return (<any>window).WebAssembly != null;
            
        }
        /** Are stereo side side camera services available. */
        public static IsStereoCameras():boolean { 
            return BABYLON.SceneManager.stereoCameras;
        }
        /** Are local multi player view services available. */
        public static IsMultiPlayerView():boolean { 
            return BABYLON.SceneManager.multiPlayerView;
        }
        /** Get the current local multi player count */
        public static GetMultiPlayerCount():number { 
            return BABYLON.SceneManager.multiPlayerCount;
        }
        /** Are firelight audio platform services available */
        public static IsFirelightEnabled(): boolean {
            return ((<any>window).FMODModule != null);
        }
        /** Get firelight studio platform api library mode. */
        public static GetFirelightAudioMode(): number {
            return ((<any>window).firelightAudio != null) ? (<any>window).firelightAudio : 0;
        }
        /** Creates a generic native javascript promise. */
        public static CreateGenericPromise(handler: (resolve, reject) => void): any {
            return ((<any>window).createGenericPromise) ? (<any>window).createGenericPromise(handler) : null;
        }
        /** Resolve a generic native javascript promise object. */
        public static ResolveGenericPromise(resolveObject:any): any {
            return ((<any>window).resolveGenericPromise) ? (<any>window).resolveGenericPromise(resolveObject) : null;
        }
        /**  Gets the names query string from page url. */
        public static GetQueryStringParam(name: string, url: string): string {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        /** Platform alert message dialog. */
        public static AlertMessage(text: string, title: string = "Babylon.js"): any {
            let result = null;
            if (BABYLON.SceneManager.IsWindows()) {
                result = new Windows.UI.Popups.MessageDialog(text, title).showAsync();
            } else {
                window.alert(text);
            }
            return result;
        }

        // ********************************** //
        // * Babylon WebGL Helper Functions * //
        // ********************************** //

        /** Gets the current engine WebGL version string info. */
        public static GetWebGLVersionString(): string {
            let result = "WebGL - Unknown";
            if (BABYLON.SceneManager.engine != null) {
                let engine:BABYLON.Engine = BABYLON.SceneManager.engine;
                if (engine != null) {
                    let glinfo = engine.getGlInfo();
                    if (glinfo != null) {
                        result = (glinfo.version + " - " + glinfo.renderer);
                    }
                }
            }
            return result;
        }
        /** Gets the current engine WebGL version number info. */
        public static GetWebGLVersionNumber(): number {
            let result = 0;
            if (BABYLON.SceneManager.engine != null) {
                let engine:BABYLON.Engine = BABYLON.SceneManager.engine;
                if (engine != null) {
                    result = engine.webGLVersion
                }
            }
            return result;
        }

        // ********************************** //
        // * Babylon WebVR Helper Functions * //
        // ********************************** //

        /** Get the WebVR experience helper left controller */
        public static GetWebVRLeftController():BABYLON.WebVRController {
            return (BABYLON.SceneManager.me) ? BABYLON.SceneManager.me._leftControllerStick : null;
        }
        /** Get the WebVR experience helper right controller */
        public static GetWebVRRightController():BABYLON.WebVRController {
            return (BABYLON.SceneManager.me) ? BABYLON.SceneManager.me._rightControllerStick : null;
        }
        /** Get the WebVR experience helper left controller prefab mesh */
        public static GetWebVRLeftControllerPrefab():BABYLON.AbstractMesh {
            return (BABYLON.SceneManager.me) ? BABYLON.SceneManager.me._leftControllerPrefab : null;
        }
        /** Get the WebVR experience helper right controller prefab mesh */
        public static GetWebVRRightControllerPrefab():BABYLON.AbstractMesh {
            return (BABYLON.SceneManager.me) ? BABYLON.SceneManager.me._rightControllerPrefab : null;
        }
        /** Shows the WebVR experience helper default controllers */
        public static ShowWebVRDefaultControllers(displayGaze:Nullable<boolean> = null, displayLaser:Nullable<boolean> = null):void {
            if (BABYLON.SceneManager.me) {
                if (BABYLON.SceneManager.me._leftControllerStick != null) {
                    BABYLON.SceneManager.me._leftControllerStick.mesh.setEnabled(false);
                    BABYLON.SceneManager.me._leftControllerStick.attachToMesh(BABYLON.SceneManager.me._leftControllerStick.defaultModel);
                    BABYLON.SceneManager.me._leftControllerStick.mesh.setEnabled(true);
                    BABYLON.SceneManager.me._defaultControllers = true;
                }
                if (BABYLON.SceneManager.me._rightControllerStick != null) {
                    BABYLON.SceneManager.me._rightControllerStick.mesh.setEnabled(false);
                    BABYLON.SceneManager.me._rightControllerStick.attachToMesh(BABYLON.SceneManager.me._rightControllerStick.defaultModel);
                    BABYLON.SceneManager.me._rightControllerStick.mesh.setEnabled(true);
                    BABYLON.SceneManager.me._defaultControllers = true;
                }
                if (BABYLON.SceneManager.me.webvr != null) {
                    if (displayGaze != null) BABYLON.SceneManager.me.webvr.displayGaze = displayGaze;
                    if (displayLaser != null) BABYLON.SceneManager.me.webvr.displayLaserPointer = displayLaser;
                }
            }
        }
        /** Shows the WebVR experience helper custom controllers */
        public static ShowWebVRCustomControllers(displayGaze:Nullable<boolean> = null, displayLaser:Nullable<boolean> = null):void {
            if (BABYLON.SceneManager.me) {
                if (BABYLON.SceneManager.me._leftControllerStick != null) {
                    BABYLON.SceneManager.me._leftControllerStick.mesh.setEnabled(false);
                    BABYLON.SceneManager.me._leftControllerStick.attachToMesh(BABYLON.SceneManager.me._leftControllerPrefab);
                    BABYLON.SceneManager.me._leftControllerStick.mesh.setEnabled(true);
                    BABYLON.SceneManager.me._defaultControllers = false;
                }
                if (BABYLON.SceneManager.me._rightControllerStick != null) {
                    BABYLON.SceneManager.me._rightControllerStick.mesh.setEnabled(false);
                    BABYLON.SceneManager.me._rightControllerStick.attachToMesh(BABYLON.SceneManager.me._rightControllerPrefab);
                    BABYLON.SceneManager.me._rightControllerStick.mesh.setEnabled(true);
                    BABYLON.SceneManager.me._defaultControllers = false;
                }
                if (BABYLON.SceneManager.me.webvr != null) {
                    if (displayGaze != null) BABYLON.SceneManager.me.webvr.displayGaze = displayGaze;
                    if (displayLaser != null) BABYLON.SceneManager.me.webvr.displayLaserPointer = displayLaser;
                }
            }
        }
        /* KEEP AS REFERENCE FOR NOW
        public static UpdateWebVRControllers():void {
            // Left and right hand position/rotation
            if(vrHelper.webVRCamera.leftController){
                leftHand.position = vrHelper.webVRCamera.leftController.devicePosition.clone()
                leftHand.rotationQuaternion = vrHelper.webVRCamera.leftController.deviceRotationQuaternion.clone()
            }
            if(vrHelper.webVRCamera.rightController){
                rightHand.position = vrHelper.webVRCamera.rightController.devicePosition.clone()
                rightHand.rotationQuaternion = vrHelper.webVRCamera.rightController.deviceRotationQuaternion.clone()
            }
            // Head position/rotation
            head.position = vrHelper.webVRCamera.devicePosition.clone()
            head.rotationQuaternion = vrHelper.webVRCamera.deviceRotationQuaternion.clone()
        }
        */

        // *********************************** //
        // * Babylon Scene Manager Component * //
        // *********************************** //
        public static get StaticIndex():number { return 30; };
        public static get PrefabIndex():number { return 31; };
        // ..
        public static GamepadManager:BABYLON.GamepadManager = null;
        public static GamepadConnected:(pad: BABYLON.Gamepad, state:BABYLON.EventState) => void = null;
        public static GamepadDisconnected:(pad: BABYLON.Gamepad, state:BABYLON.EventState) => void = null;
        // ..
        private static TempMatrix:BABYLON.Matrix = BABYLON.Matrix.Zero();
        private static TempVector2:BABYLON.Vector2 = BABYLON.Vector2.Zero();
        private static TempVector3:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        // ..
        private static AuxMatrix:BABYLON.Matrix = BABYLON.Matrix.Zero();
        private static AuxVector2:BABYLON.Vector2 = BABYLON.Vector2.Zero();
        private static AuxVector3:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        // ..
        private _url:string = "/";
        private _time:number = 0;
        private _timing:boolean = false;
        private _filename:string = null;
        private _input:boolean = false;
        private _scene:BABYLON.Scene = null;
        private _vrhelper:BABYLON.VRExperienceHelper;
        private _navmesh:BABYLON.AbstractMesh = null;
        private _navigation:Navigation = null;
        private _loadQueueIndex:number = 0;
        private _loadQueueCount:number = 0;
        private _loadQueueScenes:string[] = null;
        private _localReadyState:any = null;
        private _localSceneReady:boolean = false;
        private _sunlightDirection:BABYLON.Vector3 = null;
        private _sunlightIdentifier: string = null;
        private _environmentTextureName:string = null;
        // ..
        private _playerOneCamera:BABYLON.Camera = null;
        private _playerTwoCamera:BABYLON.Camera = null;
        private _playerThreeCamera:BABYLON.Camera = null;
        private _playerFourCamera:BABYLON.Camera = null;
        //
        private _defaultControllers:boolean = true;
        private _leftControllerStick:BABYLON.WebVRController = null;
        private _rightControllerStick:BABYLON.WebVRController = null;
        private _leftControllerPrefab:BABYLON.AbstractMesh = null;
        private _rightControllerPrefab:BABYLON.AbstractMesh = null;
        // ..
        private static me: BABYLON.SceneManager = null;
        private static min: number = Number.MIN_VALUE;
        private static max: number = (Number.MAX_VALUE - 100);
        private static keymap: any = {};
        private static prefabs: any = null;
        private static wheel: number = 0;
        private static clientx: number = 0;
        private static clienty: number = 0;
        private static mousex: number = 0;
        private static mousey: number = 0;
        private static vertical: number = 0;
        private static horizontal: number = 0;
        private static mousex2: number = 0;
        private static mousey2: number = 0;
        private static vertical2: number = 0;
        private static horizontal2: number = 0;
        private static mousex3: number = 0;
        private static mousey3: number = 0;
        private static vertical3: number = 0;
        private static horizontal3: number = 0;
        private static mousex4: number = 0;
        private static mousey4: number = 0;
        private static vertical4: number = 0;
        private static horizontal4: number = 0;
        private static x_wheel: number = 0;
        private static x_mousex: number = 0;
        private static x_mousey: number = 0;
        private static x_vertical: number = 0;
        private static x_horizontal: number = 0;
        private static k_mousex: number = 0;
        private static k_mousey: number = 0;
        private static k_vertical: number = 0;
        private static k_horizontal: number = 0;
        private static j_mousex: number = 0;
        private static j_mousey: number = 0;
        private static j_vertical: number = 0;
        private static j_horizontal: number = 0;
        private static g_mousex1: number = 0;
        private static g_mousey1: number = 0;
        private static g_vertical1: number = 0;
        private static g_horizontal1: number = 0;
        private static g_mousex2: number = 0;
        private static g_mousey2: number = 0;
        private static g_vertical2: number = 0;
        private static g_horizontal2: number = 0;
        private static g_mousex3: number = 0;
        private static g_mousey3: number = 0;
        private static g_vertical3: number = 0;
        private static g_horizontal3: number = 0;
        private static g_mousex4: number = 0;
        private static g_mousey4: number = 0;
        private static g_vertical4: number = 0;
        private static g_horizontal4: number = 0;
        private static engine: BABYLON.Engine = null;
        private static orphans: BABYLON.AbstractMesh = null;
        private static multiPlayerView:boolean = false;
        private static multiPlayerCount:number = 1;
        private static stereoCameras:boolean = true;
        private static mouseButtonPress: BABYLON.UserInputPress[] = [];
        private static mouseButtonDown: BABYLON.UserInputAction[] = [];
        private static mouseButtonUp: BABYLON.UserInputAction[] = [];
        private static keyButtonPress: BABYLON.UserInputPress[] = [];
        private static keyButtonDown: BABYLON.UserInputAction[] = [];
        private static keyButtonUp: BABYLON.UserInputAction[] = [];
        private static leftJoystick: BABYLON.VirtualJoystick = null;
        private static rightJoystick: BABYLON.VirtualJoystick = null;
        private static virtualJoystick:boolean = false;
        private static showRenderStats:boolean = false;
        private static sceneRenderStats:number = 0;
        private static renderStatsInstance:Stats = null;
        private static showPhysicsImposter:boolean = false;
        private static showDebugSockets:boolean = false;
        private static colliderVisibility:number = 0.25;
        private static socketColliderSize:number = 0.125;
        private static staticVertexLimit:boolean = false;
        private static debugLayerVisible:boolean = false;
        private static previousPosition: { x: number, y: number } = null;
        private static preventDefault: boolean = false;
        private static rightHanded: boolean = true;
        private static pointerLocked:boolean = false;
        private static enableLocking:boolean = false;
        private static physicsViewer:BABYLON.Debug.PhysicsViewer = null;
        private static gamepad1: BABYLON.Gamepad = null;
        private static gamepad1Type: BABYLON.GamepadType = BABYLON.GamepadType.None;
        private static gamepad1ButtonPress: BABYLON.UserInputPress[] = [];
        private static gamepad1ButtonDown: BABYLON.UserInputAction[] = [];
        private static gamepad1ButtonUp: BABYLON.UserInputAction[] = [];
        private static gamepad1DpadPress: BABYLON.UserInputPress[] = [];
        private static gamepad1DpadDown: BABYLON.UserInputAction[] = [];
        private static gamepad1DpadUp: BABYLON.UserInputAction[] = [];
        private static gamepad1LeftTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad1RightTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad2: BABYLON.Gamepad = null;
        private static gamepad2Type: BABYLON.GamepadType = BABYLON.GamepadType.None;
        private static gamepad2ButtonPress: BABYLON.UserInputPress[] = [];
        private static gamepad2ButtonDown: BABYLON.UserInputAction[] = [];
        private static gamepad2ButtonUp: BABYLON.UserInputAction[] = [];
        private static gamepad2DpadPress: BABYLON.UserInputPress[] = [];
        private static gamepad2DpadDown: BABYLON.UserInputAction[] = [];
        private static gamepad2DpadUp: BABYLON.UserInputAction[] = [];
        private static gamepad2LeftTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad2RightTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad3: BABYLON.Gamepad = null;
        private static gamepad3Type: BABYLON.GamepadType = BABYLON.GamepadType.None;
        private static gamepad3ButtonPress: BABYLON.UserInputPress[] = [];
        private static gamepad3ButtonDown: BABYLON.UserInputAction[] = [];
        private static gamepad3ButtonUp: BABYLON.UserInputAction[] = [];
        private static gamepad3DpadPress: BABYLON.UserInputPress[] = [];
        private static gamepad3DpadDown: BABYLON.UserInputAction[] = [];
        private static gamepad3DpadUp: BABYLON.UserInputAction[] = [];
        private static gamepad3LeftTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad3RightTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad4: BABYLON.Gamepad = null;
        private static gamepad4Type: BABYLON.GamepadType = BABYLON.GamepadType.None;
        private static gamepad4ButtonPress: BABYLON.UserInputPress[] = [];
        private static gamepad4ButtonDown: BABYLON.UserInputAction[] = [];
        private static gamepad4ButtonUp: BABYLON.UserInputAction[] = [];
        private static gamepad4DpadPress: BABYLON.UserInputPress[] = [];
        private static gamepad4DpadDown: BABYLON.UserInputAction[] = [];
        private static gamepad4DpadUp: BABYLON.UserInputAction[] = [];
        private static gamepad4LeftTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad4RightTrigger: BABYLON.UserInputAction[] = [];
        private static loader: (root: string, name: string) => void = null;
        public set webvr(helper:BABYLON.VRExperienceHelper) { this._vrhelper = helper; }
        public get webvr():BABYLON.VRExperienceHelper { return this._vrhelper; }
        public get time():number { return this._time; }
        public get deltaTime(): number { return (BABYLON.SceneManager.engine != null) ? BABYLON.SceneManager.engine.getDeltaTime() / 1000.0 : 0; }
        public getScene(): BABYLON.Scene { return this._scene; }
        private static readies: Function[] = []; // Note: Only ExecuteWhenReady Resets Ready Handlers
        public constructor(scene: BABYLON.Scene) {
            if (scene == null) throw new Error("Null host scene obejct specified.");
            this._url = "/";
            this._time = 0;
            this._timing = true;
            this._filename = null;
            this._scene = scene;
            this._input = false;
            this._onready = [];
            this._vrhelper = null;
            this._navmesh = null;
            this._navigation = null;
            this._loadQueueIndex = 0;
            this._loadQueueCount = 0;
            this._loadQueueScenes = null;
            this._localSceneReady = false;
            this._localReadyState = { state: "localReadyState" };
            this._sunlightDirection = BABYLON.Vector3.Zero();
            this._sunlightIdentifier = null;
            this._playerOneCamera = null;
            this._playerTwoCamera = null;
            this._playerThreeCamera = null;
            this._playerFourCamera = null;
            this._defaultControllers = true;
            this._leftControllerStick = null;
            this._rightControllerStick = null;
            this._leftControllerPrefab = null;
            this._rightControllerPrefab = null;
            this._environmentTextureName = null;
    
            // Reset scene manager engine instance
            BABYLON.SceneManager.me = this;
            BABYLON.SceneManager.engine = this._scene.getEngine();
            BABYLON.SceneManager.prefabs = {};
            BABYLON.SceneManager.orphans = null;
            BABYLON.SceneManager.physicsViewer = null;
            BABYLON.SceneManager.enableLocking = false;
            BABYLON.SceneManager.pointerLocked = false;
            BABYLON.SceneManager.stereoCameras = true;
            BABYLON.SceneManager.multiPlayerView = false;
            BABYLON.SceneManager.multiPlayerCount = 1;
            BABYLON.SceneManager.rightHanded = this._scene.useRightHandedSystem;
            BABYLON.SceneManager.showRenderStats = false;
            BABYLON.SceneManager.sceneRenderStats = 0;
            BABYLON.SceneManager.staticVertexLimit = false;
            BABYLON.SceneManager.showDebugSockets = false;
            BABYLON.SceneManager.showPhysicsImposter = false;
            BABYLON.SceneManager.colliderVisibility = 0.25;
            BABYLON.SceneManager.socketColliderSize = 0.125;

            // Reset local ready state
            this.addLoadingState(this._localReadyState);

            // Validate WegGL version information
            if (BABYLON.SceneManager.engine.webGLVersion < 2) {
                BABYLON.Tools.Warn("Babylon.js performance monitor detected webgl version 1.");
            }

            // Register pointer lock change events
            document.addEventListener("pointerlockchange", this.pointerLockHandler);
            document.addEventListener("mspointerlockchange", this.pointerLockHandler);
            document.addEventListener("mozpointerlockchange", this.pointerLockHandler);
            document.addEventListener("webkitpointerlockchange", this.pointerLockHandler);

            // Register scene render loop handlers
            this._scene.registerBeforeRender(this._beforeRender);
            this._scene.registerAfterRender(this._afterRender);

            // Register scene manager dispose handler
            this._scene.onDispose = () => { this.dispose(); };
        }
        private _beforeRender():void {
            if (BABYLON.SceneManager.showRenderStats === true && BABYLON.SceneManager.renderStatsInstance != null) {
                BABYLON.SceneManager.renderStatsInstance.begin();
            }
        }
        private _afterRender():void {
            if (BABYLON.SceneManager.showRenderStats === true && BABYLON.SceneManager.renderStatsInstance != null) {
                BABYLON.SceneManager.renderStatsInstance.end();
            }
            let instance: BABYLON.SceneManager = BABYLON.SceneManager.me;
            if (instance != null) {
                if (instance._timing) {
                    instance._time += instance.deltaTime;
                    if (instance._time >= BABYLON.SceneManager.max) instance._time = 0;
                }
                if (instance._input) {
                    BABYLON.SceneManager.updateUserInput();
                }
            }
        }
        private _parseSceneMetadata():void {
            if (this._scene.metadata != null && this._scene.metadata.properties != null) {
                if (this._scene.metadata.properties.sceneFilename && this._scene.metadata.properties.sceneFilename != null) {
                    this._filename = this._scene.metadata.properties.sceneFilename;
                }
                if (this._scene.metadata.properties.sunlightIndentifier && this._scene.metadata.properties.sunlightIndentifier != null) {
                    this._sunlightIdentifier = this._scene.metadata.properties.sunlightIndentifier;
                }
                if (this._scene.metadata.properties.sunlightDirection && this._scene.metadata.properties.sunlightDirection != null) {
                    let sunlight:number[] = this._scene.metadata.properties.sunlightDirection;
                    if (sunlight != null && sunlight.length >= 3) {
                        this._sunlightDirection = new BABYLON.Vector3(sunlight[0], sunlight[1], sunlight[2]);
                    }
                }
                if (this._scene.metadata.properties.environmentTextureName && this._scene.metadata.properties.environmentTextureName != null) {
                    this._environmentTextureName = this._scene.metadata.properties.environmentTextureName;
                }
                if (this._scene.metadata.properties.colliderVisibility && this._scene.metadata.properties.colliderVisibility != null) {
                    BABYLON.SceneManager.colliderVisibility = this._scene.metadata.properties.colliderVisibility;
                }
                if (this._scene.metadata.properties.socketColliderSize && this._scene.metadata.properties.socketColliderSize != null) {
                    BABYLON.SceneManager.socketColliderSize = this._scene.metadata.properties.socketColliderSize;
                }
                if (this._scene.metadata.properties.sceneRenderStats && this._scene.metadata.properties.sceneRenderStats != null) {
                    BABYLON.SceneManager.sceneRenderStats = this._scene.metadata.properties.sceneRenderStats;
                }
                if (this._scene.metadata.properties.hasOwnProperty("showRenderStats")) {
                    BABYLON.SceneManager.showRenderStats = this._scene.metadata.properties.showRenderStats;
                }
                if (this._scene.metadata.properties.hasOwnProperty("showDebugSockets")) {
                    BABYLON.SceneManager.showDebugSockets = this._scene.metadata.properties.showDebugSockets;
                }
                if (this._scene.metadata.properties.hasOwnProperty("showPhysicsImposter")) {
                    BABYLON.SceneManager.showPhysicsImposter = this._scene.metadata.properties.showPhysicsImposter;
                }
                if (this._scene.metadata.properties.hasOwnProperty("staticVertexLimit")) {
                    BABYLON.SceneManager.staticVertexLimit = this._scene.metadata.properties.staticVertexLimit;
                }
                // Setup Scene Physics Engine
                let physicsEngine: string = (this._scene.metadata.properties.physicsEngine) ? this._scene.metadata.properties.physicsEngine : "cannon";
                let enablePhysics: boolean = (this._scene.metadata.properties.enablePhysics) ? this._scene.metadata.properties.enablePhysics : false;
                if (enablePhysics === true) {
                    let physicsPlugin: BABYLON.IPhysicsEnginePlugin = new BABYLON.CannonJSPlugin(false, 10);
                    this._scene.enablePhysics(this._scene.gravity, physicsPlugin);
                }
            }
            // ..
            // Parse, create and store component instances
            // ..
            let ticklist: BABYLON.IScriptComponent[] = [];
            BABYLON.SceneManager.parseSceneCameras(this._scene.cameras, this._scene, ticklist);
            BABYLON.SceneManager.parseSceneLights(this._scene.lights, this._scene, ticklist);
            BABYLON.SceneManager.parseSceneMeshes(this._scene.meshes, this._scene, ticklist);
            // Register scene component ticklist
            if (ticklist.length > 0) {
                // Sort In Ascending Order
                ticklist.sort((left, right): number => {
                    if (left.order < right.order) return -1;
                    if (left.order > right.order) return 1;
                    return 0;
                });
                ticklist.forEach((scriptComponent) => {
                    scriptComponent.instance.register();
                });
            }
            // ..
            // Validate scene render stats options
            // ..
            if (!BABYLON.SceneManager.IsIE11()) {
                if (typeof Stats !== "undefined" && BABYLON.SceneManager.showRenderStats === true) {
                    if (BABYLON.SceneManager.renderStatsInstance == null) {
                        BABYLON.SceneManager.renderStatsInstance = new Stats();
                        BABYLON.SceneManager.renderStatsInstance.showPanel(BABYLON.SceneManager.sceneRenderStats); // 0: fps, 1: ms
                        document.body.appendChild(BABYLON.SceneManager.renderStatsInstance.dom);
                    }
                }
            }
        }

        /* Dispose scene manager and all resources. */
        public dispose(): void {
            this._scene.unregisterBeforeRender(this._beforeRender);
            this._scene.unregisterAfterRender(this._afterRender);
            document.removeEventListener("pointerlockchange", this.pointerLockHandler);
            document.removeEventListener("mspointerlockchange", this.pointerLockHandler);
            document.removeEventListener("mozpointerlockchange", this.pointerLockHandler);
            document.removeEventListener("webkitpointerlockchange", this.pointerLockHandler);
            BABYLON.SceneManager.me = null;
            BABYLON.SceneManager.engine = null;
            BABYLON.SceneManager.prefabs = null;
            BABYLON.SceneManager.orphans = null;
            BABYLON.SceneManager.stereoCameras = true;
            BABYLON.SceneManager.rightHanded = true;
            if (BABYLON.SceneManager.orphans != null) {
                BABYLON.SceneManager.orphans.dispose();
                BABYLON.SceneManager.orphans = null;
            }
            if (BABYLON.SceneManager.physicsViewer != null) {
                BABYLON.SceneManager.physicsViewer.dispose();
                BABYLON.SceneManager.physicsViewer = null;
            }
            this.disableUserInput();
            this._time = 0;
            this._navmesh = null;
            this._timing = false;
            this._onready = null;
            this._navigation = null;
            this._defaultControllers = true;
            this._leftControllerStick = null;
            this._rightControllerStick = null;
            this._playerOneCamera = null;
            if (this._playerTwoCamera != null) {
                this._playerTwoCamera.dispose();
                this._playerTwoCamera = null;
            }
            if (this._playerThreeCamera != null) {
                this._playerThreeCamera.dispose();
                this._playerThreeCamera = null;
            }
            if (this._playerFourCamera != null) {
                this._playerFourCamera.dispose();
                this._playerFourCamera = null;
            }
            if (this._leftControllerPrefab != null) {
                this._leftControllerPrefab.dispose();
                this._leftControllerPrefab = null;
            }
            if (this._rightControllerPrefab != null) {
                this._rightControllerPrefab.dispose();
                this._rightControllerPrefab = null;
            }
            if (this._vrhelper != null) {
                this._vrhelper.dispose();
                this._vrhelper = null;
            }
            let scenex: any = (<any>this._scene);
            if (scenex.manager) scenex.manager = null;
            scenex = null;
            this._scene = null;
        }
        /** Opens a platform alert message dialog */
        public alert(text: string, title: string = "Babylon.js"): any {
            return BABYLON.SceneManager.AlertMessage(text, title);
        }
        /** Execute a function once during render loop. */
        public once(func:()=>void):void {
            if (func != null) {
                let ran:boolean = false;
                let one:()=>void = null;
                one = ()=> {
                    this._scene.unregisterBeforeRender(one);
                    one = null;
                    if (ran === false) {
                        ran = true;
                        func();
                    }
                };
                this._scene.registerBeforeRender(one);
            }
        }
        /** Delays a function call using window.requestTimeeout. Returns a handle object */
        public delay(func:()=>void, timeout:number):any {
            let handle:any = null;
            handle = (<any>window).requestTimeout(()=>{
                if (handle != null) {
                    this.cancelDelay(handle);
                }
                if (func != null) {
                    func();
                }
            }, timeout);
            return handle;
        }
        /** Calls window.clearRequestTimeout with handle to cancel pending timeout call */
        public cancelDelay(handle:any):void {
            (<any>window).clearRequestTimeout(handle);
        }
        /** Repeats a function call using window.requestInterval. Retuns a handle object */
        public repeat(func:()=>void, interval:number):any {
            return (<any>window).requestInterval(func, interval);
        }
        /** Calls window.clearRequestInterval with handle to clear pending interval calls. */
        public cancelRepeat(handle:any):void {
            (<any>window).clearRequestInterval(handle);
        }
        /** Enables time managment in scene. */
        public enableTime():void {
            this._time = 0;
            this._timing = true;
        }
        /** Disables time managment in scene. */
        public disableTime():void {
            this._time = 0;
            this._timing = false;
        }
        /** Safely destroys a scene object. */
        public safeDestroy(owner: BABYLON.Entity, delay:number = 5, disable:boolean = false):void {
            if (disable === true) owner.setEnabled(false);
            if (delay > 0.0) { 
                this.delay(()=>{ 
                    BABYLON.SceneManager.DestroyComponents(owner);
                    BABYLON.SceneManager.DisposeOwner(owner);
                }, delay);
            } else { 
                BABYLON.SceneManager.DestroyComponents(owner);
                BABYLON.SceneManager.DisposeOwner(owner);
            }
        }
        /** Gets the main camera for a player */
        public getMainCamera(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One):BABYLON.Camera {
            let result:BABYLON.Camera = null;
            switch (player) {
                case BABYLON.PlayerNumber.One:
                    result = this._playerOneCamera;
                    break;
                case BABYLON.PlayerNumber.Two:
                    result = this._playerTwoCamera;
                    break;
                case BABYLON.PlayerNumber.Three:
                    result = this._playerThreeCamera;
                    break;
                case BABYLON.PlayerNumber.Four:
                    result = this._playerFourCamera;
                    break;
            }
            return result;
        }
        /** Get the scene formatted name. */
        public getSceneName(): string {
            return (this._filename != null && this._filename !== "") ? this._filename : "Unknown.babylon";
        }
        /** Gets the formatted scene path. */
        public getScenePath(): string {
            return this._url;
        }
        /** Gets the scene sunlight */
        public getSunlight():BABYLON.Light {
            return (this._sunlightIdentifier != null && this._sunlightIdentifier !== "") ? this._scene.getLightByID(this._sunlightIdentifier) : null;
        }        
        /** Gets the scene sunlight direction */
        public getSunlightDirection():BABYLON.Vector3 {
            return this._sunlightDirection;
        }      
        /** Gets the scene environment texture name. */
        public getEnvironmentTextureName(): string {
            return this._environmentTextureName;
        }
        /** Adds a pending scene loading state. */
        public addLoadingState(state: any): void {
            this._scene._addPendingData(state);
        }
        /** Removes a pending scene loading state. */
        public removeLoadingState(state: any): void {
            this._scene._removePendingData(state);
        }

        // ************************************* //
        // * Scene Execute Local Ready Support * //
        // ************************************* //

        private _onready:Function[] = [];
        private onready(func:()=>void):void {
            if (func != null) {
                if (this._localSceneReady === true) {
                    func();
                } else {
                    this._onready.push(func);
                }
            }
        }

        // ************************************ //
        // * Scene Execute When Ready Support * //
        // ************************************ //

        private _executeWhenReady():void {
            if (this._scene.metadata != null && this._scene.metadata.imports != null) {
                this._loadQueueIndex = 0;
                this._loadQueueScenes = this._scene.metadata.imports;
                if (this._loadQueueScenes.length > 0) {
                    this._loadQueueCount = this._loadQueueScenes.length
                    this._loadQueueImports();
                } else {
                    this._executeLocalReady();
                }
            } else {
                this._executeLocalReady();
            }
        }
        private _executeLocalReady():void {
            if (BABYLON.SceneManager.readies != null && BABYLON.SceneManager.readies.length > 0) {
                BABYLON.SceneManager.readies.forEach((handler) => { handler(this._scene, this); });
            }
            BABYLON.SceneManager.readies = [];
            if (this._onready != null && this._onready.length > 0) {
                this._onready.forEach((ready) => { ready(); });
                this._onready = null;
            }
            this._localSceneReady = true;
            if (this._scene.metadata != null && this._scene.metadata.properties != null) {
                if (this._scene.metadata.properties.enableUserInput === true) {
                    let userInput:any = this._scene.metadata.properties.userInput;
                    let joystick:number = userInput.joystickInputValue;
                    if (joystick !== 0 && this._scene.metadata.properties.virtualJoystickAttached === true) {
                        joystick = 0;
                        BABYLON.Tools.Warn("Virtual joystick camera attached, disabled manual joystick input.");
                    }
                    this.enableUserInput( { 
                        preventDefault: this._scene.metadata.properties.preventDefault,
                        useCapture: this._scene.metadata.properties.useCapture,
                        enableVirtualJoystick: (joystick === 1 || (joystick === 2 && BABYLON.SceneManager.IsMobile())),
                        disableRightStick: userInput.disableRightStick
                    });
                    let colorText:string = userInput.joystickRightColorText;
                    if (colorText != null && colorText !== "") BABYLON.UserInputOptions.JoystickRightHandleColor = colorText;
                    BABYLON.UserInputOptions.JoystickLeftSensibility = userInput.joystickLeftLevel;
                    BABYLON.UserInputOptions.JoystickRightSensibility = userInput.joystickRightLevel;
                    BABYLON.UserInputOptions.JoystickDeadStickValue = userInput.joystickDeadStick;
                    BABYLON.UserInputOptions.GamepadDeadStickValue = userInput.padDeadStick;
                    BABYLON.UserInputOptions.GamepadLStickXInverted = userInput.padLStickXInvert;
                    BABYLON.UserInputOptions.GamepadLStickYInverted = userInput.padLStickYInvert;
                    BABYLON.UserInputOptions.GamepadRStickXInverted = userInput.padRStickXInvert;
                    BABYLON.UserInputOptions.GamepadRStickYInverted = userInput.padRStickYInvert;
                    BABYLON.UserInputOptions.GamepadLStickSensibility = userInput.padLStickLevel;
                    BABYLON.UserInputOptions.GamepadRStickSensibility = userInput.padRStickLevel;
                    BABYLON.UserInputOptions.PointerAngularSensibility = userInput.mouseAngularLevel;
                    BABYLON.UserInputOptions.PointerWheelDeadZone = userInput.wheelDeadZone;
                }
                if (this._scene.metadata.properties.pointerLock === true) {
                    this.attachPointerLock();
                    this.enablePointerLock();
                }
            }
            if (this._localReadyState != null) {
                this.removeLoadingState(this._localReadyState);
                this._localReadyState = null;
            }
        }
        private _loadQueueImports() {
            let ctr:number = this._loadQueueIndex + 1;
            if (ctr > this._loadQueueCount) {
                this._loadQueueIndex = 0;
                this._loadQueueCount = 0;
                this._loadQueueScenes = null;
                this._executeLocalReady();
            } else {
                let sceneName:string = this._loadQueueScenes[this._loadQueueIndex];
                BABYLON.Tools.Log("Babylon.js importing scene meshes from: " + sceneName);
                this._loadQueueIndex++;
                (<any>navigator).project.importMeshes(sceneName, ()=>{
                    this._loadQueueImports();
                }, null, (scene:BABYLON.Scene, message:string, exception:any)=>{
                    BABYLON.Tools.Warn(message);
                    this._loadQueueImports();
                });
            }
        }

        // ******************************** //
        // *  Scene Debug Helper Support  * //
        // ******************************** //

        /** Popup debug layer in window. */
        public popupDebug(tab:number = 0): void {
            if (this._scene.debugLayer) {
                this._scene.debugLayer.hide();
                this._scene.debugLayer.show({ enablePopup: true, globalRoot: null });
            }            
        }
        /** Toggle debug layer on and off. */
        public toggleDebug(popups:boolean = false, tab:number = 0, parent:HTMLElement = null): void {
            if (this._scene.debugLayer) {
                if (BABYLON.SceneManager.debugLayerVisible === true) {
                    BABYLON.SceneManager.debugLayerVisible = false;                
                    if (BABYLON.SceneManager.renderStatsInstance != null && BABYLON.SceneManager.renderStatsInstance.dom != null) {
                        let statsElement:HTMLElement = BABYLON.SceneManager.renderStatsInstance.dom as HTMLElement;
                        statsElement.style.visibility = "visible";
                    }
                    this._scene.debugLayer.hide();
                } else {
                    BABYLON.SceneManager.debugLayerVisible = true;
                    if (BABYLON.SceneManager.renderStatsInstance != null && BABYLON.SceneManager.renderStatsInstance.dom != null) {
                        let statsElement:HTMLElement = BABYLON.SceneManager.renderStatsInstance.dom as HTMLElement;
                        statsElement.style.visibility = "hidden";
                    }
                    this._scene.debugLayer.show({ enablePopup: popups, globalRoot: parent });
                }
            }            
        }

        // ************************************ //
        // * Scene Local Multi Player Support * //
        // ************************************ //

        /** Sets the multi player camera view layout */
        public setMultiPlayerViewLayout(totalNumPlayers:number):boolean {
            let result:boolean = false;
            let players:number = BABYLON.Scalar.Clamp(totalNumPlayers, 1, 4);
            if (BABYLON.SceneManager.IsMultiPlayerView()) {
                let cameras:BABYLON.Camera[] = [];
                if (this._playerOneCamera != null && this._playerTwoCamera != null && this._playerThreeCamera != null && this._playerFourCamera != null) {
                    if (players === 1) {
                        this._playerOneCamera.viewport = new BABYLON.Viewport(0, 0, 1, 1);
                        this._playerTwoCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        this._playerTwoCamera.setEnabled(false);
                        this._playerThreeCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        this._playerThreeCamera.setEnabled(false);
                        this._playerFourCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        this._playerFourCamera.setEnabled(false);
                        cameras.push(this._playerOneCamera);
                    } else if (players === 2) {
                        if (BABYLON.SceneManager.stereoCameras === true) {
                            this._playerOneCamera.viewport = new BABYLON.Viewport(0, 0, 0.5, 1);
                            this._playerTwoCamera.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 1);
                        } else {
                            this._playerOneCamera.viewport = new BABYLON.Viewport(0, 0.5, 1, 0.5);
                            this._playerTwoCamera.viewport = new BABYLON.Viewport(0, 0, 1, 0.5);
                        }
                        this._playerTwoCamera.setEnabled(true);
                        this._playerThreeCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        this._playerThreeCamera.setEnabled(false);
                        this._playerFourCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        this._playerFourCamera.setEnabled(false);
                        cameras.push(this._playerOneCamera);
                        cameras.push(this._playerTwoCamera);
                    } else if (players === 3) {
                        this._playerOneCamera.viewport = new BABYLON.Viewport(0, 0, 0.5, 1);
                        this._playerTwoCamera.viewport = new BABYLON.Viewport(0.5, 0.5, 0.5, 0.5);
                        this._playerTwoCamera.setEnabled(true);
                        this._playerThreeCamera.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 0.5);
                        this._playerThreeCamera.setEnabled(true);
                        this._playerFourCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                        this._playerFourCamera.setEnabled(false);
                        cameras.push(this._playerOneCamera);
                        cameras.push(this._playerTwoCamera);
                        cameras.push(this._playerThreeCamera);
                    } else if (players === 4) {
                        this._playerOneCamera.viewport = new BABYLON.Viewport(0, 0.5, 0.5, 0.5);
                        this._playerTwoCamera.viewport = new BABYLON.Viewport(0, 0, 0.5, 0.5);
                        this._playerTwoCamera.setEnabled(true);
                        this._playerThreeCamera.viewport = new BABYLON.Viewport(0.5, 0.5, 0.5, 0.5);
                        this._playerThreeCamera.setEnabled(true);
                        this._playerFourCamera.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 0.5);
                        this._playerFourCamera.setEnabled(true);
                        cameras.push(this._playerOneCamera);
                        cameras.push(this._playerTwoCamera);
                        cameras.push(this._playerThreeCamera);
                        cameras.push(this._playerFourCamera);
                    }
                } else {
                    BABYLON.Tools.Warn("Babylon.js camera rig failed to initialize multi player cameras");
                }
                if (cameras.length > 0) {
                    BABYLON.SceneManager.multiPlayerCount = players;
                    this._scene.activeCameras = cameras;
                    result = true;
                } else {
                    BABYLON.Tools.Warn("Babylon.js camera rig failed to initialize multi player views");
                }
            } else {
                BABYLON.Tools.Warn("Babylon.js camera rig multi player view option not enabled");
            }
            return result;
        }
        
        // *********************************** //
        // *  Scene Ray Cast Helper Support  * //
        // *********************************** //

        public rayCast(ray:BABYLON.Ray, predicate?: (mesh: BABYLON.Mesh) => boolean, fastCheck?: boolean):BABYLON.PickingInfo {
            return this._scene.pickWithRay(ray, predicate, fastCheck);
        }
        public multiRayCast(ray:BABYLON.Ray, predicate?: (mesh: BABYLON.Mesh) => boolean):BABYLON.PickingInfo[] {
            return this._scene.multiPickWithRay(ray, predicate);
        }

        // *********************************** //
        // *  Scene Material Helper Support  * //
        // *********************************** //

        /** Gets the instanced material from scene. If does not exists, execute a optional defaultinstance handler. */
        public getMaterialInstance<T>(name:string, defaultInstance:(newName:String)=>BABYLON.Material = null): T {
            let result:any = this._scene.getMaterialByName(name);
            if (result == null && defaultInstance != null) {
                result = defaultInstance(name);
            }
            return (result != null) ? result as T : null;
        }

        // ********************************** //
        // *   Scene Prefab Clone Support   * //
        // ********************************** //

        /** Checks the scene has the specified prefab mesh. */
        public hasPrefabMesh(prefabName:string): boolean {
            let realPrefab:string = "Prefab." + prefabName;
            return (BABYLON.SceneManager.prefabs[realPrefab] != null);
        }
        /** Gets ths the specified prefab mesh from scene. */
        public getPrefabMesh(prefabName:string): BABYLON.Mesh {
            let result:BABYLON.Mesh = null;
            let realPrefab:string = "Prefab." + prefabName;
            if (this.hasPrefabMesh(prefabName)) {
                result = BABYLON.SceneManager.prefabs[realPrefab] as BABYLON.Mesh;
            }
            return result;
        }
        /** Instantiates the specfied prefab object into scene. */
        public instantiatePrefab(prefabName:string, cloneName: string, newPosition:BABYLON.Vector3 = null, newRotation:BABYLON.Vector3 = null, newScaling:BABYLON.Vector3 = null, newParent: Node = null): BABYLON.Mesh {
            let result:BABYLON.Mesh = null;
            if (this._scene != null) {
                let realPrefab:string = "Prefab." + prefabName;
                if (this.hasPrefabMesh(prefabName)) {
                    let prefab:BABYLON.Mesh = this.getPrefabMesh(prefabName);
                    if (prefab != null) {
                        result = prefab.clone(cloneName, newParent, false, false);
                        if (result != null) {
                            result.name = BABYLON.Utilities.ReplaceAll(result.name, "Prefab.", "");
                            if (result.parent !== newParent) result.parent = newParent;
                            if (newPosition != null) result.position = newPosition;
                            if (newRotation != null) result.rotation = newRotation;
                            if (newScaling != null) result.scaling = newScaling;
                            // Recurse all prefab clones
                            let clones:BABYLON.Mesh[] = null;
                            let childs:BABYLON.AbstractMesh[] = result.getChildMeshes(false);
                            if (childs != null) clones = childs as BABYLON.Mesh[]
                            if (clones == null) clones = [result];
                            else clones.unshift(result);
                            // Parse cloned mesh sources
                            let sharedSkeletonMap:any = {};
                            clones.forEach((clone) => {
                                clone.name = BABYLON.Utilities.ReplaceAll(clone.name, "Prefab.", "");
                                clone.setEnabled(true);
                                // ..
                                // Light Shadow Generator Render List (TODO: Support Specific Meshes Or Layers Or Tags)
                                // ..
                                if (clone.metadata != null && clone.metadata.shadowCastingMode != null && clone.metadata.shadowCastingMode !== 0) {
                                    this._scene.lights.forEach((light:BABYLON.Light) => {
                                        let shadowGenerator:BABYLON.IShadowGenerator = light.getShadowGenerator();
                                        if (shadowGenerator != null) {
                                            shadowGenerator.getShadowMap().renderList.push(clone);
                                        }
                                    });
                                }
                                if (clone.source != null) {
                                    // Clone source skeleton
                                    let aclone:any = clone;
                                    if (clone.skeleton == null && clone.source.skeleton != null) {
                                        let skeletonName:string = clone.source.skeleton.name + ".Skeleton";
                                        let skeletonIdentity:string = skeletonName + "." + clone.source.skeleton.id;
                                        clone.skeleton = clone.source.skeleton.clone(skeletonName, skeletonIdentity);
                                        sharedSkeletonMap[clone.source.id] = clone.id;
                                        // Clone bone metadata
                                        if (clone.skeleton != null && clone.skeleton.bones != null && clone.source.skeleton.bones != null) {
                                            if (clone.skeleton.bones.length === clone.source.skeleton.bones.length) {
                                                let boneCount:number = clone.skeleton.bones.length;
                                                for (let boneIndex = 0; boneIndex < boneCount; boneIndex++) {
                                                    if (clone.skeleton.bones[boneIndex].metadata == null && clone.source.skeleton.bones[boneIndex].metadata != null) {
                                                        clone.skeleton.bones[boneIndex].metadata = clone.source.skeleton.bones[boneIndex].metadata;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    BABYLON.Tools.Warn("Babylon.js encountered a null clone source for: " + clone.name);
                                }
                            });
                            // Check all child mesh sources
                            let checked:BABYLON.AbstractMesh[] = [];
                            clones.forEach((check) => {
                                // Reset Sharded Skeletons
                                if (check.metadata != null && check.metadata.properties != null && check.metadata.properties.sharedSkeletonId && check.metadata.properties.sharedSkeletonId !== "") {
                                    check.metadata.properties.sharedSkeletonId = sharedSkeletonMap[check.metadata.properties.sharedSkeletonId];
                                }
                                // Create Tree Instances
                                if (check.metadata != null && check.metadata.tagName && check.metadata.tagName != null && check.metadata.tagName === "[INSTANCE]") {
                                    // Instanced Mesh
                                    if (check.metadata.properties && check.metadata.properties != null && check.metadata.properties.prefabSource && check.metadata.properties.prefabSource != null && check.metadata.properties.prefabSource !== "") {
                                        let prefabSource:string = check.metadata.properties.prefabSource;
                                        let prefabOffset:boolean = check.metadata.properties.prefabOffset;
                                        let prefabPosition:number[] = check.metadata.properties.prefabPosition;
                                        let prefabSourceMesh:BABYLON.AbstractMesh = this._scene.getMeshByID(prefabSource);
                                        if (prefabSourceMesh != null) {
                                            let prefabInstanceName:string = check.name;
                                            let prefabInstanceMesh:InstancedMesh = (<BABYLON.Mesh>prefabSourceMesh).createInstance(prefabInstanceName);
                                            if (prefabInstanceMesh != null) {
                                                prefabInstanceMesh.parent = check.parent;
                                                if (prefabSourceMesh.metadata != null) {
                                                    prefabInstanceMesh.metadata = BABYLON.SceneManager.CloneMetadata(prefabSourceMesh.metadata);
                                                }
                                                if (prefabOffset === true && prefabPosition != null && prefabPosition.length >= 3) {
                                                    prefabInstanceMesh.position = new BABYLON.Vector3(prefabPosition[0], prefabPosition[1], prefabPosition[2]);
                                                }
                                                checked.push(prefabInstanceMesh);
                                                this.safeDestroy(check);
                                            } else {
                                                BABYLON.Tools.Warn("===> Failed to create instance: " + prefabInstanceName);
                                            }
                                        } else {
                                            BABYLON.Tools.Warn("===> Failed to locate prefab source: " + prefabSource);
                                        }
                                    } else {
                                        BABYLON.Tools.Warn("===> Failed to parse prefab metadata: " + check.name);
                                    }
                                } else {
                                    // Non Instanced mesh
                                    checked.push(check);
                                }
                            });
                            sharedSkeletonMap = null;
                            if (checked != null && checked.length > 0) {
                                BABYLON.Utilities.ParseImportMetadata(checked, this._scene);
                            }
                        } else {
                            BABYLON.Tools.Warn("Failed to create prefab of: " + realPrefab);
                        }
                    } else {
                        BABYLON.Tools.Warn("Failed to lookup prefab map: " + realPrefab);
                    }
                } else {
                    BABYLON.Tools.Warn("Unable to locate prefab master: " + realPrefab);
                }
            }
            return result;
        }
        
        // *********************************** //
        // *  Scene Tween Animation Support  * //
        // *********************************** //

        /** Tweens (animates) the target property using BABYLON.Animations. */
        public tween(node: BABYLON.Node, targetProperty: string, from: any, to: any, frames:number, fps: number = 30, easing: BABYLON.EasingFunction = null, speedRatio:number = 1.0, callback:()=>void = null, loopMode: number = BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, enableBlending:boolean = false): BABYLON.Animatable {
            let label:string = "Tween_" + this.time.toString();
            return BABYLON.Animation.CreateAndStartAnimation(label, node, targetProperty, fps, frames, from, to, loopMode, easing, callback);
        }
        /** Tweens (animates) the target property with keys using BABYLON.Animations. */
        public tweenKeys(target:any, targetProperty:string, keys: Array<{frame: number; value: any; }>, frames:number, fps: number = 30, easing:BABYLON.EasingFunction = null, speedRatio:number = 1.0, callback:() => void = null, dataType:number = BABYLON.Animation.ANIMATIONTYPE_VECTOR3, loopMode: number = BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, enableBlending:boolean = false): BABYLON.Animatable {
            let rate:number = (fps != null && fps > 0) ? fps : 30;
            let label:string = "Tween_" + this.time.toString();
            let animation = new BABYLON.Animation(label, targetProperty, rate, dataType, loopMode, enableBlending); 
            if (easing != null) animation.setEasingFunction(easing);
            animation.setKeys(keys); 
            return this._scene.beginDirectAnimation(target, [animation], 0, frames, (loopMode == BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE), speedRatio, callback);
        }
        /** Tweens (animates) the target property with a float value using BABYLON.Animations. */
        public tweenFloat(target:any, targetProperty:string, start:number, end:number, frames:number, fps: number = 30, easing:BABYLON.EasingFunction = null, speedRatio:number = 1.0, callback:() => void = null, loopMode: number = BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, enableBlending:boolean = false): BABYLON.Animatable {
            let rate:number = (fps != null && fps > 0) ? fps : 30;
            let keys = [{ frame: 0, value: start }, { frame: frames, value: end }]; 
            let label:string = "Tween_" + this.time.toString();
            let dataType = Animation.ANIMATIONTYPE_FLOAT; 
            let animation = new BABYLON.Animation(label, targetProperty, rate, dataType, loopMode, enableBlending); 
            if (easing != null) animation.setEasingFunction(easing);
            animation.setKeys(keys); 
            return this._scene.beginDirectAnimation(target, [animation], 0, frames, (loopMode == BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE), speedRatio, callback);
        }
        
        // *********************************** //
        // *  Scene Animation State Support  * //
        // *********************************** //
        
        /** Plays the specified animation clip by name on the owner target objects. */
        public playAnimationClip(motion:string, owner: BABYLON.Entity, blending:number = 0.0, playback:number = 1.0, decendants:boolean = true, animations: Animation[] = null, onAnimationEnd:()=>void = null): BABYLON.Animatable[] {
            let result:BABYLON.Animatable[] = null;
            let starting:number = -1;
            let stopping:number = -1;
            let behavior:number = 0;
            let looping:boolean = false;
            let attached:boolean = false;
            let phandler:()=>void = null;
            let animation:BABYLON.IAnimationClip = this.findSceneAnimationClip(motion, owner);
            if (animation != null) {
                attached = true;
                phandler = onAnimationEnd;
                if (starting === -1) {
                    starting = animation.start;
                    stopping = animation.stop;
                    behavior = animation.behavior;
                    looping = animation.behavior < 2;
                }
            }
            if (decendants) {
                let children:BABYLON.AbstractMesh[] = owner.getChildMeshes(false);
                if (children != null && children.length > 0) {
                    for (let i:number = 0; i < children.length; i++) {
                        let child:BABYLON.AbstractMesh = children[i];
                        let chandler:()=>void = null;
                        let canimation:BABYLON.IAnimationClip = this.findSceneAnimationClip(motion, child);
                        if (canimation != null) {
                            if (attached === false) {
                                attached = true;
                                chandler = onAnimationEnd;
                            }
                            if (starting === -1) {
                                starting = canimation.start;
                                stopping = canimation.stop;
                                behavior = canimation.behavior;
                                looping = canimation.behavior < 2;
                            }
                            if (starting >= 0 && stopping >= 0) {
                                this.setAnimationProperties(child, behavior, blending);
                                let canim:BABYLON.Animatable = null;
                                if (animations != null) {
                                    this._scene.beginDirectAnimation(child, animations, starting, stopping, looping, playback, chandler);
                                } else {
                                    this._scene.beginAnimation(child, starting, stopping, looping, playback, chandler);
                                }
                                if (canim != null) {
                                    if (result == null) result = [];
                                    result.push(canim);
                                }
                            }
                        }
                    }
                }
            }
            // Note: Always Play Owner Animations At Found Ranges
            if (starting >= 0 && stopping >= 0) {
                this.setAnimationProperties(owner, behavior, blending);
                let panim:BABYLON.Animatable = null;
                if (animations != null) {
                    this._scene.beginDirectAnimation(owner, animations, starting, stopping, looping, playback, phandler);
                } else {
                    this._scene.beginAnimation(owner, starting, stopping, looping, playback, phandler);
                }
                if (panim != null) {
                    if (result == null) result = [];
                    result.push(panim);
                }
            }
            return result;
        }
        /** Gets all the animation clips for the owner target object. */
        public getAnimationClips(owner: BABYLON.Entity, decendants:boolean = true, directDecendantsOnly:boolean = false): BABYLON.IAnimationClip[] {
            let result:BABYLON.IAnimationClip[] = this.findSceneAnimationClips(owner);
            if (result == null && decendants === true) {
                let children:BABYLON.AbstractMesh[] = owner.getChildMeshes(directDecendantsOnly);
                if (children != null && children.length > 0) {
                    for (let i:number = 0; i < children.length; i++) {
                        let child:BABYLON.AbstractMesh = children[i];
                        result = this.findSceneAnimationClips(child);
                        if (result != null) break;
                    }
                }
            }
            return result;
        }
        /** Gets all the animation targets with clips for the specified owner. */
        public getAnimationTargets(owner: BABYLON.Entity, decendants:boolean = true, directDecendantsOnly:boolean = false): any[] {
            let result:any[] = null;
            if (owner.metadata != null && owner.metadata.animationClips != null && owner.metadata.animationClips.length > 0) {
                if (result == null) result = [];
                result.push(owner);
            }
            if (decendants === true) {
                let children:BABYLON.AbstractMesh[] = owner.getChildMeshes(directDecendantsOnly);
                if (children != null && children.length > 0) {
                    for (let i:number = 0; i < children.length; i++) {
                        let child:BABYLON.AbstractMesh = children[i];
                        if (child != null && child.metadata != null && child.metadata.animationClips != null && child.metadata.animationClips.length > 0) {
                            if (result == null) result = [];
                            result.push(child);
                        }
                    }
                }
            }
            return result;
        }
        /** Sets the specified animation transition properties */
        public setAnimationProperties(owner:BABYLON.IAnimatable, behavior:number, blending:number):void {
            if (owner != null) {
                if (owner.animations != null && owner.animations.length > 0) {
                    BABYLON.SceneManager.SetAnimationLooping(owner, behavior);
                }
                if (owner instanceof BABYLON.AbstractMesh) {
                    let mesh:BABYLON.AbstractMesh = owner;
                    if (mesh.skeleton != null) {
                        BABYLON.SceneManager.SetSkeletonProperties(mesh.skeleton, behavior, blending);
                    }
                }
            }
        }

        // ********************************** //
        // *  Scene Physics Helper Support  * //
        // ********************************** //

        /** Applies force to owner using physics imposter. */
        public applyForce(owner:BABYLON.AbstractMesh, force:BABYLON.Vector3, contact:BABYLON.Vector3) : void {
            if (owner != null) {
                if (owner.physicsImpostor != null && owner.physicsImpostor.physicsBody != null) {
                    if (force != null) owner.physicsImpostor.applyForce(force, contact);
                }
            }
        }
        /** Applies impulse to owner using physics imposter. */
        public applyImpulse(owner:BABYLON.AbstractMesh, impusle:BABYLON.Vector3, contact:BABYLON.Vector3) : void {
            if (owner != null) {
                if (owner.physicsImpostor != null && owner.physicsImpostor.physicsBody != null) {
                    if (impusle != null) owner.physicsImpostor.applyImpulse(impusle, contact);
                }
            }
        }
        /** Applies friction to owner using physics imposter. */
        public applyFriction(owner:BABYLON.AbstractMesh, friction:number):void {
            if (owner != null) {
                if (owner.physicsImpostor != null && owner.physicsImpostor.physicsBody != null && owner.physicsImpostor.physicsBody.material != null) {
                    if (owner.physicsImpostor.physicsBody.material.friction !== friction) {
                        owner.physicsImpostor.physicsBody.material.friction = friction;
                    }
                }
            }
        }
        /** Gets mass of owner using physics imposter. */
        public getMass(owner:BABYLON.AbstractMesh):number {
            let result:number = -1;
            if (owner != null) {
                if (owner.physicsImpostor != null) {
                    result = owner.physicsImpostor.mass;
                }
            }
            return result;
        }
        /** Sets mass to owner using physics imposter. */
        public setMass(owner:BABYLON.AbstractMesh, mass:number):void {
            if (owner != null) {
                if (owner.physicsImpostor != null) {
                    owner.physicsImpostor.mass = mass;
                    //owner.physicsImpostor.setMass(mass);
                }
            }
        }
        /** Gets restitution of owner using physics imposter. */
        public getRestitution(owner:BABYLON.AbstractMesh):number {
            let result:number = -1;
            if (owner != null) {
                if (owner.physicsImpostor != null) {
                    result = owner.physicsImpostor.restitution;
                }
            }
            return result;
        }
        /** Sets restitution to owner using physics imposter. */
        public setRestitution(owner:BABYLON.AbstractMesh, restitution:number):void {
            if (owner != null) {
                if (owner.physicsImpostor != null) {
                    owner.physicsImpostor.restitution = restitution;
                }
            }
        }
        /** Gets owner friction level using physics imposter. */
        public getFrictionLevel(owner:BABYLON.AbstractMesh):number {
            let result:number = 0;
            if (owner != null) {
                if (owner.physicsImpostor != null && owner.physicsImpostor.physicsBody != null && owner.physicsImpostor.physicsBody.material != null) {
                    result = owner.physicsImpostor.physicsBody.material.friction;
                }
            }
            return result;
        }
        /** Gets owner linear velocity using physics imposter. */
        public getLinearVelocity(owner:BABYLON.AbstractMesh):BABYLON.Vector3 {
            let result:BABYLON.Vector3 = null;
            if (owner != null) {
                if (owner.physicsImpostor != null && owner.physicsImpostor.physicsBody != null) {
                    result = owner.physicsImpostor.getLinearVelocity();
                }
            }
            return result;
        }
        /** Sets owner linear velocity using physics imposter. */
        public setLinearVelocity(owner:BABYLON.AbstractMesh, velocity:BABYLON.Vector3):void {
            if (owner != null) {
                if (owner.physicsImpostor != null && owner.physicsImpostor.physicsBody != null) {
                    if (velocity != null) owner.physicsImpostor.setLinearVelocity(velocity);
                }
            }
        }
        /** Gets owner angular velocity using physics imposter. */
        public getAngularVelocity(owner:BABYLON.AbstractMesh):BABYLON.Vector3 {
            let result:BABYLON.Vector3 = null;
            if (owner != null) {
                if (owner.physicsImpostor != null && owner.physicsImpostor.physicsBody != null) {
                    result = owner.physicsImpostor.getAngularVelocity();
                }
            }
            return result;
        }
        /** Sets owner angular velocity using physics imposter. */
        public setAngularVelocity(owner:BABYLON.AbstractMesh, velocity:BABYLON.Vector3):void {
            if (owner != null) {
                if (owner.physicsImpostor != null && owner.physicsImpostor.physicsBody != null) {
                    if (velocity != null) owner.physicsImpostor.setAngularVelocity(velocity);
                }
            }
        }
        /** Shows the owner physics imposter for debugging. */
        public showDebugImposter(owner:BABYLON.AbstractMesh) : void {
            if (owner != null) {
                if (owner.physicsImpostor != null && owner.physicsImpostor.physicsBody != null) {
                    if (BABYLON.SceneManager.physicsViewer == null) {
                        BABYLON.SceneManager.physicsViewer = new BABYLON.Debug.PhysicsViewer(this._scene);
                    }
                    if (BABYLON.SceneManager.physicsViewer != null) {
                        BABYLON.SceneManager.physicsViewer.showImpostor(owner.physicsImpostor);
                    }
                }
            }
        }
        /** Hides the owner physics imposter for debugging. */
        public hideDebugImposter(owner:BABYLON.AbstractMesh) : void {
            if (owner != null) {
                if (owner.physicsImpostor != null && owner.physicsImpostor.physicsBody != null) {
                    if (BABYLON.SceneManager.physicsViewer != null) {
                        BABYLON.SceneManager.physicsViewer.hideImpostor(owner.physicsImpostor);
                    }
                }
            }
        }
        /** Checks collision contact of the owner using physics imposter. */
        public checkCollisionContact(owner:BABYLON.AbstractMesh, collider:BABYLON.AbstractMesh, contact:BABYLON.CollisionContact, threashold:number = 0.5):boolean {
            let result:boolean = false;
            if (owner != null) {
                if (owner.physicsImpostor != null && owner.physicsImpostor.physicsBody != null) {
                    // TODO: Valid Grounding Contact
                    result = true;
                }
            }
            return result;
        }
        
        // *********************************** //
        // *  Scene Movement Helper Support  * //
        // *********************************** //
        
        /** Moves owner using collisions. */
        public moveWithCollisions(owner:BABYLON.AbstractMesh, velocity:BABYLON.Vector3) : void {
            if (owner != null) {
                if (velocity != null) owner.moveWithCollisions(velocity);
            }
        }
        /** Moves owner using positions. */
        public moveWithTranslation(owner:BABYLON.AbstractMesh, velocity:BABYLON.Vector3) : void {
            if (owner != null) {
                if (velocity != null) owner.position.addInPlace(velocity);
            }
        }
        /** Turns owner using rotations. */
        public turnWithRotation(owner:BABYLON.AbstractMesh, rotation:number = 0.0) : void {
            if (owner != null) {
                if (rotation != 0.0) owner.rotate(BABYLON.Axis.Y, rotation * BABYLON.Statics.Deg2Rad);
            }
        }
        
        // ************************************ //
        // *   Scene Component Find Helpers   * //
        // ************************************ //
        
        /** Finds a scene component in the scene with the specfied klass name. */
        public findSceneComponent<T extends BABYLON.SceneComponent>(klass: string, owner: BABYLON.Entity): T {
            let result: any = null;
            if (owner == null) throw new Error("Null owner scene obejct specified.");
            if (owner.metadata != null && owner.metadata.api) {
                let metadata: BABYLON.IObjectMetadata = owner.metadata as BABYLON.IObjectMetadata;
                if (metadata.components != null && metadata.components.length > 0) {
                    for (let ii: number = 0; ii < metadata.components.length; ii++) {
                        let ownerscript: BABYLON.IScriptComponent = metadata.components[ii];
                        if (ownerscript.instance != null && ownerscript.klass === klass) {
                            result = ownerscript.instance;
                            break;
                        }
                    }
                }
            }
            return (result != null) ? result as T : null;
        }
        /** Finds all scene components in the scene with the specfied klass name. */
        public findSceneComponents<T extends BABYLON.SceneComponent>(klass: string, owner: BABYLON.Entity): T[] {
            let result: any[] = null;
            if (owner == null) throw new Error("Null owner scene obejct specified.");
            if (owner.metadata != null && owner.metadata.api) {
                let metadata: BABYLON.IObjectMetadata = owner.metadata as BABYLON.IObjectMetadata;
                if (metadata.components != null && metadata.components.length > 0) {
                    for (let ii: number = 0; ii < metadata.components.length; ii++) {
                        let ownerscript: BABYLON.IScriptComponent = metadata.components[ii];
                        if (ownerscript.instance != null && ownerscript.klass === klass) {
                            result.push(ownerscript.instance);
                        }
                    }
                }
            }
            return (result != null) ? result as T[] : null;
        }
        /** Finds the owner object metedata in the scene. */
        public findSceneMetadata(owner: BABYLON.Entity): BABYLON.ObjectMetadata {
            let result: BABYLON.ObjectMetadata = null;
            if (owner.metadata != null && owner.metadata.api) {
                let metadata: BABYLON.IObjectMetadata = owner.metadata as BABYLON.IObjectMetadata;
                result = new BABYLON.ObjectMetadata(metadata);
            }
            return result;
        }
        /** Finds the specfied child mesh of owner in the scene. */
        public findSceneChildMesh(name:string, owner:BABYLON.AbstractMesh, searchType:BABYLON.SearchType = BABYLON.SearchType.StartsWith, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null):BABYLON.AbstractMesh {
            let result:BABYLON.AbstractMesh = null;
            let search:BABYLON.SearchType = (searchType != null) ? searchType : BABYLON.SearchType.StartsWith;
            let children:BABYLON.AbstractMesh[] = owner.getChildMeshes(directDecendantsOnly, predicate);
            return BABYLON.SceneManager.FindMesh(name, children, searchType);            
        }
        /** Finds the specfied collision mesh of owner in the scene. */
        public findSceneCollisionMesh(owner:BABYLON.AbstractMesh, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null):BABYLON.AbstractMesh {
            let result:BABYLON.AbstractMesh = null;
            let children:BABYLON.AbstractMesh[] = owner.getChildMeshes(directDecendantsOnly, predicate);
            if (children != null && children.length > 0) {
                for (let i:number = 0; i < children.length; i++) {
                    let child:BABYLON.AbstractMesh = children[i];
                    if (child.name === "Collider" || child.name.indexOf("_Collider") >= 0 || child.name.indexOf(":Collider") >= 0) {
                        result = child;
                        break;
                    }
                }
            }
            if (result == null) result = owner;
            return result;            
        }
        /** Finds specfied skeleton in the scene. */
        public findSceneSkeleton(skeletonId:string):BABYLON.Skeleton {
            let skeleton:BABYLON.Skeleton = null;
            let count:number = (this._scene.skeletons != null) ? this._scene.skeletons.length : 0;
            if (count > 0) {
                let index:number = 0;
                for (index=0; index< count; index++) {
                    let check:any = this._scene.skeletons[index];
                    let ident:string = ("" + check.id);
                    if (ident === skeletonId) {
                        skeleton = check;
                        break;
                    }
                }
            }
            return skeleton;
        }
        /** Finds the specfied socket mesh of owner in the scene. */
        public findSceneSocketMesh(name:string, owner:BABYLON.AbstractMesh, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null):BABYLON.Mesh {
            let result:BABYLON.Mesh = BABYLON.SceneManager.LocateOwnerSocketMesh(name, owner);
            if (result == null) {
                let children:BABYLON.AbstractMesh[] = owner.getChildMeshes(directDecendantsOnly, predicate);
                if (children != null && children.length > 0) {
                    for (let i:number = 0; i < children.length; i++) {
                        let child:BABYLON.AbstractMesh = children[i];
                        result = BABYLON.SceneManager.LocateOwnerSocketMesh(name, child);
                        if (result != null) break;
                    }
                }
            }
            return result;            
        }
        /** Finds all the socket meshes of owner in the scene. */
        public findSceneSocketMeshes(owner:BABYLON.AbstractMesh, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null):BABYLON.Mesh[] {
            let result:BABYLON.Mesh[] = BABYLON.SceneManager.LocateOwnerSocketMeshes(owner);
            if (result == null) {
                let children:BABYLON.AbstractMesh[] = owner.getChildMeshes(directDecendantsOnly, predicate);
                if (children != null && children.length > 0) {
                    for (let i:number = 0; i < children.length; i++) {
                        let child:BABYLON.AbstractMesh = children[i];
                        result = BABYLON.SceneManager.LocateOwnerSocketMeshes(child);
                        if (result != null) break;
                    }
                }
            }
            return result;            
        }
        /** Finds the specfied animation clip of owner in the scene. */
        public findSceneAnimationClip(clip:string, owner: BABYLON.Entity): BABYLON.IAnimationClip {
            let result:BABYLON.IAnimationClip = null;
            if (owner != null && owner.metadata != null && owner.metadata.api) {
                let metadata: BABYLON.IObjectMetadata = owner.metadata as BABYLON.IObjectMetadata;
                if (metadata.animationClips != null && metadata.animationClips.length > 0) {
                    if (clip != null && clip !== "") {
                        let ii:number = 0;
                        for(ii = 0; ii < metadata.animationClips.length; ii++) {
                            if (metadata.animationClips[ii].name === clip) {
                                result = metadata.animationClips[ii];
                                break;
                            }
                        }
                    } else {
                        result = metadata.animationClips[0];
                    }
                }
            }
            return result;
        }
        /** Finds any animation clips of owner in the scene. */
        public findSceneAnimationClips(owner: BABYLON.Entity): BABYLON.IAnimationClip[] {
            let result:BABYLON.IAnimationClip[] = null;
            if (owner != null && owner.metadata != null && owner.metadata.api) {
                let metadata: BABYLON.IObjectMetadata = owner.metadata as BABYLON.IObjectMetadata;
                if (metadata.animationClips != null && metadata.animationClips.length > 0) {
                    result = metadata.animationClips as BABYLON.IAnimationClip[];
                }
            }
            return result;
        }
        /** Finds the specfied particle system of owner in the scene. */
        public findSceneParticleSystem(name:string, owner: BABYLON.AbstractMesh | BABYLON.Vector3): BABYLON.IParticleSystem {
            let result:BABYLON.IParticleSystem = null;
            if (owner == null) throw new Error("Null owner scene obejct specified.");
            if (this._scene.particleSystems != null && this._scene.particleSystems.length > 0) {
                let psystems:number = this._scene.particleSystems.length;
                for (let ii:number = 0; ii < psystems; ii++) {
                    let psystem:BABYLON.IParticleSystem = this._scene.particleSystems[ii];
                    if (psystem.emitter === owner && psystem.name === name) {
                        result = psystem;
                        break;
                    }
                }
            }
            return result;
        }
        /** Finds all the particle systems of owner in the scene. */
        public findSceneParticleSystems(owner: BABYLON.AbstractMesh | BABYLON.Vector3): BABYLON.IParticleSystem[] {
            let result:BABYLON.IParticleSystem[] = [];
            if (owner == null) throw new Error("Null owner scene obejct specified.");
            if (this._scene.particleSystems != null && this._scene.particleSystems.length > 0) {
                this._scene.particleSystems.forEach((psystem) => {
                    if (psystem.emitter === owner) {
                        result.push(psystem);
                    }
                });
            }
            return result;
        }
        /** Finds the specfied lens flare system of owner in the scene. */
        public findSceneLensFlareSystem(name:string, owner: BABYLON.Entity): BABYLON.LensFlareSystem {
            let result:BABYLON.LensFlareSystem = null;
            if (owner == null) throw new Error("Null owner scene obejct specified.");
            if (this._scene.lensFlareSystems != null && this._scene.lensFlareSystems.length > 0) {
                let fsystems:number = this._scene.lensFlareSystems.length;
                for (let ii:number = 0; ii < fsystems; ii++) {
                    let fsystem:BABYLON.LensFlareSystem = this._scene.lensFlareSystems[ii];
                    if (fsystem.getEmitter() === owner && fsystem.name === name) {
                        result = fsystem;
                        break;
                    }
                }
            }
            return result;
        }
        /** Finds all the lens flare systems of owner in the scene. */
        public findSceneLensFlareSystems(owner: BABYLON.Entity): BABYLON.LensFlareSystem[] {
            let result:BABYLON.LensFlareSystem[] = [];
            if (owner == null) throw new Error("Null owner scene obejct specified.");
            if (this._scene.lensFlareSystems != null && this._scene.lensFlareSystems.length > 0) {
                this._scene.lensFlareSystems.forEach((fsystem) => {
                    if (fsystem.getEmitter() === owner) {
                        result.push(fsystem);
                    }
                });
            }
            return result;
        }

        // ********************************* //
        // *   Scene Pointer Lock Support   * //
        // ********************************* //

        public enablePointerLock():void {
            BABYLON.SceneManager.enableLocking = true;
        }
        public disablePointerLock():void {
            BABYLON.SceneManager.enableLocking = false;
        }
        private pointerLockHandler():void {
            let ple = (<any>document).pointerLockElement || (<any>document).msPointerLockElement || (<any>document).mozPointerLockElement || (<any>document).webkitPointerLockElement || null;
            if (ple) BABYLON.SceneManager.pointerLocked = true;
            else BABYLON.SceneManager.pointerLocked = false;
        }
        private attachPointerLock():void {
            this._scene.onPointerObservable.add((evt) => {
                if (BABYLON.SceneManager.enableLocking === true && BABYLON.SceneManager.pointerLocked === false) {
                    let canvas:HTMLCanvasElement = BABYLON.SceneManager.engine.getRenderingCanvas();
                    if (canvas != null) {
                        if (canvas.requestPointerLock != null) {
                            canvas.requestPointerLock();
                        } else if (canvas.msRequestPointerLock != null) {
                            canvas.msRequestPointerLock();
                        } else if (canvas.mozRequestPointerLock != null) {
                            canvas.mozRequestPointerLock();
                        } else if (canvas.webkitRequestPointerLock != null) {
                            canvas.webkitRequestPointerLock();
                        }
                    }
                }
            }, BABYLON.PointerEventTypes.POINTERDOWN)            
        }

        // ********************************* //
        // *   Scene Input State Support   * //
        // ********************************* //

        /** Reset all user input state in the scene. */
        public resetUserInput(): void {
            BABYLON.SceneManager.keymap = {};
            BABYLON.SceneManager.wheel = 0;
            BABYLON.SceneManager.clientx = 0;
            BABYLON.SceneManager.clienty = 0;
            BABYLON.SceneManager.mousex = 0;
            BABYLON.SceneManager.mousey = 0;
            BABYLON.SceneManager.vertical = 0;
            BABYLON.SceneManager.horizontal = 0;
            BABYLON.SceneManager.mousex2 = 0;
            BABYLON.SceneManager.mousey2 = 0;
            BABYLON.SceneManager.vertical2 = 0;
            BABYLON.SceneManager.horizontal2 = 0;
            BABYLON.SceneManager.mousex3 = 0;
            BABYLON.SceneManager.mousey3 = 0;
            BABYLON.SceneManager.vertical3 = 0;
            BABYLON.SceneManager.horizontal3 = 0;
            BABYLON.SceneManager.mousex4 = 0;
            BABYLON.SceneManager.mousey4 = 0;
            BABYLON.SceneManager.vertical4 = 0;
            BABYLON.SceneManager.horizontal4 = 0;
            BABYLON.SceneManager.x_wheel = 0;
            BABYLON.SceneManager.x_mousex = 0;
            BABYLON.SceneManager.x_mousey = 0;
            BABYLON.SceneManager.x_vertical = 0;
            BABYLON.SceneManager.x_horizontal = 0;
            BABYLON.SceneManager.k_mousex = 0;
            BABYLON.SceneManager.k_mousey = 0;
            BABYLON.SceneManager.k_vertical = 0;
            BABYLON.SceneManager.k_horizontal = 0;
            BABYLON.SceneManager.j_mousex = 0;
            BABYLON.SceneManager.j_mousey = 0;
            BABYLON.SceneManager.j_vertical = 0;
            BABYLON.SceneManager.j_horizontal = 0;
            BABYLON.SceneManager.g_mousex1 = 0;
            BABYLON.SceneManager.g_mousey1 = 0;
            BABYLON.SceneManager.g_vertical1 = 0;
            BABYLON.SceneManager.g_horizontal1 = 0;
            BABYLON.SceneManager.g_mousex2 = 0;
            BABYLON.SceneManager.g_mousey2 = 0;
            BABYLON.SceneManager.g_vertical2 = 0;
            BABYLON.SceneManager.g_horizontal2 = 0;
            BABYLON.SceneManager.g_mousex3 = 0;
            BABYLON.SceneManager.g_mousey3 = 0;
            BABYLON.SceneManager.g_vertical3 = 0;
            BABYLON.SceneManager.g_horizontal3 = 0;
            BABYLON.SceneManager.g_mousex4 = 0;
            BABYLON.SceneManager.g_mousey4 = 0;
            BABYLON.SceneManager.g_vertical4 = 0;
            BABYLON.SceneManager.g_horizontal4 = 0;
            BABYLON.SceneManager.enableLocking = false;
            BABYLON.SceneManager.pointerLocked = false;
            BABYLON.SceneManager.preventDefault = false;
            BABYLON.SceneManager.mouseButtonUp = [];
            BABYLON.SceneManager.mouseButtonDown = [];
            BABYLON.SceneManager.mouseButtonPress = [];
            BABYLON.SceneManager.keyButtonUp = [];
            BABYLON.SceneManager.keyButtonDown = [];
            BABYLON.SceneManager.keyButtonPress = [];
            BABYLON.SceneManager.gamepad1ButtonUp = [];
            BABYLON.SceneManager.gamepad1ButtonDown = [];
            BABYLON.SceneManager.gamepad1ButtonPress = [];
            BABYLON.SceneManager.gamepad1DpadUp = [];
            BABYLON.SceneManager.gamepad1DpadDown = [];
            BABYLON.SceneManager.gamepad1DpadPress = [];
            BABYLON.SceneManager.gamepad1LeftTrigger = [];
            BABYLON.SceneManager.gamepad1RightTrigger = [];
            BABYLON.SceneManager.gamepad2ButtonUp = [];
            BABYLON.SceneManager.gamepad2ButtonDown = [];
            BABYLON.SceneManager.gamepad2ButtonPress = [];
            BABYLON.SceneManager.gamepad2DpadUp = [];
            BABYLON.SceneManager.gamepad2DpadDown = [];
            BABYLON.SceneManager.gamepad2DpadPress = [];
            BABYLON.SceneManager.gamepad2LeftTrigger = [];
            BABYLON.SceneManager.gamepad2RightTrigger = [];
            BABYLON.SceneManager.gamepad3ButtonUp = [];
            BABYLON.SceneManager.gamepad3ButtonDown = [];
            BABYLON.SceneManager.gamepad3ButtonPress = [];
            BABYLON.SceneManager.gamepad3DpadUp = [];
            BABYLON.SceneManager.gamepad3DpadDown = [];
            BABYLON.SceneManager.gamepad3DpadPress = [];
            BABYLON.SceneManager.gamepad3LeftTrigger = [];
            BABYLON.SceneManager.gamepad3RightTrigger = [];
            BABYLON.SceneManager.gamepad4ButtonUp = [];
            BABYLON.SceneManager.gamepad4ButtonDown = [];
            BABYLON.SceneManager.gamepad4ButtonPress = [];
            BABYLON.SceneManager.gamepad4DpadUp = [];
            BABYLON.SceneManager.gamepad4DpadDown = [];
            BABYLON.SceneManager.gamepad4DpadPress = [];
            BABYLON.SceneManager.gamepad4LeftTrigger = [];
            BABYLON.SceneManager.gamepad4RightTrigger = [];
        }
        /** Enables user input state in the scene. */
        public enableUserInput(options: { preventDefault?: boolean, useCapture?: boolean, enableVirtualJoystick?: boolean, disableRightStick?:boolean } = null): void {
            let preventDefault: boolean = (options != null && options.preventDefault) ? options.preventDefault : false;
            let useCapture: boolean = (options != null && options.useCapture) ? options.useCapture : false;
            let enableVirtualJoystick: boolean = (options != null && options.enableVirtualJoystick) ? options.enableVirtualJoystick : false;
            let disableRightJoystick: boolean = (options != null && options.disableRightStick) ? options.disableRightStick : false;

            if (!this._input) {
                this.resetUserInput();
                // Document element event listeners
                document.documentElement.tabIndex = 1;
                document.documentElement.addEventListener("keyup", BABYLON.SceneManager.inputKeyUpHandler, useCapture);
                document.documentElement.addEventListener("keydown", BABYLON.SceneManager.inputKeyDownHandler, useCapture);
                document.documentElement.addEventListener("pointerup", BABYLON.SceneManager.inputPointerUpHandler, useCapture);
                document.documentElement.addEventListener("pointerdown", BABYLON.SceneManager.inputPointerDownHandler, useCapture);
                document.documentElement.addEventListener("pointermove", BABYLON.SceneManager.inputPointerMoveHandler, useCapture);
                document.documentElement.addEventListener("onwheel" in document ? "wheel" : "mousewheel", BABYLON.SceneManager.inputPointerWheelHandler, useCapture);
                BABYLON.SceneManager.preventDefault = preventDefault;
                // Note: Only Enable Gamepad Manager Once
                if (BABYLON.SceneManager.GamepadManager == null) {
                    BABYLON.SceneManager.GamepadManager = new BABYLON.GamepadManager(); // Note: Do Not Use Scene.GameManager Instance
                    BABYLON.SceneManager.GamepadManager.onGamepadConnectedObservable.add(BABYLON.SceneManager.inputManagerGamepadConnected)
                    BABYLON.SceneManager.GamepadManager.onGamepadDisconnectedObservable.add(BABYLON.SceneManager.inputManagerGamepadDisconnected)
                }
                // Note: Only Enable Virtual Joysticks Once
                if (BABYLON.SceneManager.virtualJoystick === false) {
                    BABYLON.SceneManager.virtualJoystick = enableVirtualJoystick;
                    if (BABYLON.SceneManager.virtualJoystick === true) {
                        if (BABYLON.SceneManager.leftJoystick == null) {
                            BABYLON.SceneManager.leftJoystick = new BABYLON.VirtualJoystick(true);
                            BABYLON.SceneManager.leftJoystick.setJoystickSensibility(BABYLON.UserInputOptions.JoystickLeftSensibility * 5);
                        }
                        if (disableRightJoystick === false && BABYLON.SceneManager.rightJoystick == null) {
                            BABYLON.SceneManager.rightJoystick = new BABYLON.VirtualJoystick(false);
                            BABYLON.SceneManager.rightJoystick.reverseUpDown = true;
                            BABYLON.SceneManager.rightJoystick.setJoystickSensibility(BABYLON.UserInputOptions.JoystickRightSensibility * 5);
                            BABYLON.SceneManager.rightJoystick.setJoystickColor(BABYLON.UserInputOptions.JoystickRightHandleColor);
                        }
                    }
                }

                this._input = true;
                document.documentElement.focus();
            }
        }
        /** Disables user input state in the scene. */
        public disableUserInput(useCapture: boolean = false): void {
            if (this._input) {
                document.documentElement.removeEventListener("keyup", BABYLON.SceneManager.inputKeyUpHandler, useCapture);
                document.documentElement.removeEventListener("keydown", BABYLON.SceneManager.inputKeyDownHandler, useCapture);
                document.documentElement.removeEventListener("pointerup", BABYLON.SceneManager.inputPointerUpHandler, useCapture);
                document.documentElement.removeEventListener("pointerdown", BABYLON.SceneManager.inputPointerDownHandler, useCapture);
                document.documentElement.removeEventListener("pointermove", BABYLON.SceneManager.inputPointerMoveHandler, useCapture);
                document.documentElement.removeEventListener("onwheel" in document ? "wheel" : "mousewheel", BABYLON.SceneManager.inputPointerWheelHandler, useCapture);
                BABYLON.SceneManager.preventDefault = false;
                this.resetUserInput();
                this._input = false;
            }
        }
        /** Get user input state from the scene. */
        public getUserInput(input: BABYLON.UserInputAxis, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): number {
            let result: number = 0;
            if (this._input) {
                switch (input) {
                    case BABYLON.UserInputAxis.Vertical:
                    case BABYLON.UserInputAxis.Horizontal:
                        if (player === BABYLON.PlayerNumber.Four) {
                            result = (input === BABYLON.UserInputAxis.Horizontal) ? BABYLON.SceneManager.horizontal4 : BABYLON.SceneManager.vertical4;
                        } else if (player === BABYLON.PlayerNumber.Three) {
                            result = (input === BABYLON.UserInputAxis.Horizontal) ? BABYLON.SceneManager.horizontal3 : BABYLON.SceneManager.vertical3;
                        } else if (player === BABYLON.PlayerNumber.Two) {
                            result = (input === BABYLON.UserInputAxis.Horizontal) ? BABYLON.SceneManager.horizontal2 : BABYLON.SceneManager.vertical2;
                        } else {
                            result = (input === BABYLON.UserInputAxis.Horizontal) ? BABYLON.SceneManager.horizontal : BABYLON.SceneManager.vertical;
                        }
                        break;
                    case BABYLON.UserInputAxis.MouseX:
                    case BABYLON.UserInputAxis.MouseY:
                        if (player === BABYLON.PlayerNumber.Four) {
                            result = (input === BABYLON.UserInputAxis.MouseX) ? BABYLON.SceneManager.mousex4 : BABYLON.SceneManager.mousey4;
                        } else if (player === BABYLON.PlayerNumber.Three) {
                            result = (input === BABYLON.UserInputAxis.MouseX) ? BABYLON.SceneManager.mousex3 : BABYLON.SceneManager.mousey3;
                        } else if (player === BABYLON.PlayerNumber.Two) {
                            result = (input === BABYLON.UserInputAxis.MouseX) ? BABYLON.SceneManager.mousex2 : BABYLON.SceneManager.mousey2;
                        } else {
                            result = (input === BABYLON.UserInputAxis.MouseX) ? BABYLON.SceneManager.mousex : BABYLON.SceneManager.mousey;
                        }
                        break;
                    case BABYLON.UserInputAxis.ClientX:
                    case BABYLON.UserInputAxis.ClientY:
                        if (player === BABYLON.PlayerNumber.One) {
                            result = (input === BABYLON.UserInputAxis.ClientX) ? BABYLON.SceneManager.clientx : BABYLON.SceneManager.clienty;
                        }
                        break;
                    case BABYLON.UserInputAxis.Wheel:
                        if (player === BABYLON.PlayerNumber.One) {
                            result = BABYLON.SceneManager.wheel;
                        }
                        break;
                }
            }
            return result;
        }
        
        // ********************************* //
        // *  Scene Keycode State Support  * //
        // ********************************* //

        public onKeyboardUp(callback: (keycode: number) => void): void {
            if (this._input) BABYLON.SceneManager.keyButtonUp.push(callback);
        }
        public onKeyboardDown(callback: (keycode: number) => void): void {
            if (this._input) BABYLON.SceneManager.keyButtonDown.push(callback);
        }
        public onKeyboardPress(keycode: number, callback: () => void): void {
            if (this._input) BABYLON.SceneManager.keyButtonPress.push({ index: keycode, action: callback });
        }
        public getKeyboardInput(keycode: number): boolean {
            let result: boolean = false;
            if (this._input) {
                let key: string = "k:" + keycode.toString();
                if (BABYLON.SceneManager.keymap[key] != null) {
                    result = BABYLON.SceneManager.keymap[key];
                }
            }
            return result;
        }

        // ********************************* //
        // *   Scene Mouse State Support   * //
        // ********************************* //

        public onPointerUp(callback: (button: number) => void): void {
            if (this._input) BABYLON.SceneManager.mouseButtonUp.push(callback);
        }
        public onPointerDown(callback: (button: number) => void): void {
            if (this._input) BABYLON.SceneManager.mouseButtonDown.push(callback);
        }
        public onPointerPress(button: number, callback: () => void): void {
            if (this._input) BABYLON.SceneManager.mouseButtonPress.push({ index: button, action: callback });
        }
        public getPointerInput(button: number): boolean {
            let result: boolean = false;
            if (this._input) {
                let key: string = "p:" + button.toString();
                if (BABYLON.SceneManager.keymap[key] != null) {
                    result = BABYLON.SceneManager.keymap[key];
                }
            }
            return result;
        }

        // ********************************** //
        // *  Scene Joystick State Support  * //
        // ********************************** //

        public getLeftJoystick(): BABYLON.VirtualJoystick {
            return (this._input) ? BABYLON.SceneManager.leftJoystick : null;
        }
        public getRightJoystick(): BABYLON.VirtualJoystick {
            return (this._input) ? BABYLON.SceneManager.rightJoystick : null;
        }
        public getJoystickPress(button:number): boolean {
            let result: boolean = false;
            if (this._input) {
                if (button === BABYLON.JoystickButton.Left && BABYLON.SceneManager.leftJoystick != null && BABYLON.SceneManager.leftJoystick.pressed === true) {
                    result = true;
                } else if (button === BABYLON.JoystickButton.Right && BABYLON.SceneManager.rightJoystick != null && BABYLON.SceneManager.rightJoystick.pressed === true) {
                    result = true;
                }
            }
            return result;
        }
        public disposeVirtualJoysticks(): void {
            if (this._input) {
                if (BABYLON.SceneManager.leftJoystick != null) {
                    BABYLON.SceneManager.leftJoystick.releaseCanvas();
                    BABYLON.SceneManager.leftJoystick = null;
                }
                if (BABYLON.SceneManager.rightJoystick != null) {
                    BABYLON.SceneManager.rightJoystick.releaseCanvas();
                    BABYLON.SceneManager.rightJoystick = null;
                }
                BABYLON.SceneManager.virtualJoystick = false;
            }
        }
        
        // ********************************* //
        // *  Scene Gamepad State Support  * //
        // ********************************* //

        public onGamepadButtonUp(callback: (button: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (this._input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1ButtonUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2ButtonUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3ButtonUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4ButtonUp.push(callback);
                        break;
                }
            }
        }
        public onGamepadButtonDown(callback: (button: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (this._input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1ButtonDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2ButtonDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3ButtonDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4ButtonDown.push(callback);
                        break;
                }
            }
        }
        public onGamepadButtonPress(button: number, callback: () => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (this._input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1ButtonPress.push({ index: button, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2ButtonPress.push({ index: button, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3ButtonPress.push({ index: button, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4ButtonPress.push({ index: button, action: callback });
                        break;
                }
            }
        }
        public getGamepadButtonInput(button: number, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): boolean {
            let result: boolean = false;
            if (this._input) {
                let key: string = null;
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        key = "b1:" + button.toString();
                        break;
                    case BABYLON.PlayerNumber.Two:
                        key = "b2:" + button.toString();
                        break;
                    case BABYLON.PlayerNumber.Three:
                        key = "b3:" + button.toString();
                        break;
                    case BABYLON.PlayerNumber.Four:
                        key = "b4:" + button.toString();
                        break;
                }
                if (key != null && BABYLON.SceneManager.keymap[key] != null) {
                    result = BABYLON.SceneManager.keymap[key];
                }
            }
            return result;
        }
        public onGamepadDirectionUp(callback: (direction: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (this._input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1DpadUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2DpadUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3DpadUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4DpadUp.push(callback);
                        break;
                }
            }
        }
        public onGamepadDirectionDown(callback: (direction: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (this._input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1DpadDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2DpadDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3DpadDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4DpadDown.push(callback);
                        break;
                }
            }
        }
        public onGamepadDirectionPress(direction: number, callback: () => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (this._input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1DpadPress.push({ index: direction, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2DpadPress.push({ index: direction, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3DpadPress.push({ index: direction, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4DpadPress.push({ index: direction, action: callback });
                        break;
                }
            }
        }
        public getGamepadDirectionInput(direction: number, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): boolean {
            let result: boolean = false;
            if (this._input) {
                let key: string = null;
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        key = "d1:" + direction.toString();
                        break;
                    case BABYLON.PlayerNumber.Two:
                        key = "d2:" + direction.toString();
                        break;
                    case BABYLON.PlayerNumber.Three:
                        key = "d3:" + direction.toString();
                        break;
                    case BABYLON.PlayerNumber.Four:
                        key = "d4:" + direction.toString();
                        break;
                }
                if (key != null && BABYLON.SceneManager.keymap[key] != null) {
                    result = BABYLON.SceneManager.keymap[key];
                }
            }
            return result;
        }
        public onGamepadTriggerLeft(callback: (value: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (this._input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1LeftTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2LeftTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3LeftTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4LeftTrigger.push(callback);
                        break;
                }
            }
        }
        public onGamepadTriggerRight(callback: (value: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (this._input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1RightTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2RightTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3RightTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4RightTrigger.push(callback);
                        break;
                }
            }
        }
        public getGamepadTriggerInput(trigger: number, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): number {
            let result: number = 0;
            if (this._input) {
                let key: string = null;
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        key = "t1:" + trigger.toString();
                        break;
                    case BABYLON.PlayerNumber.Two:
                        key = "t2:" + trigger.toString();
                        break;
                    case BABYLON.PlayerNumber.Three:
                        key = "t3:" + trigger.toString();
                        break;
                    case BABYLON.PlayerNumber.Four:
                        key = "t4:" + trigger.toString();
                        break;
                }
                if (key != null && BABYLON.SceneManager.keymap[key] != null) {
                    result = BABYLON.SceneManager.keymap[key];
                }
            }
            return result;
        }
        public getGamepad(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): BABYLON.Gamepad {
            let pad:BABYLON.Gamepad = null;
            if (this._input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        pad = BABYLON.SceneManager.gamepad1;
                        break;
                    case BABYLON.PlayerNumber.Two:
                        pad = BABYLON.SceneManager.gamepad2;
                        break;
                    case BABYLON.PlayerNumber.Three:
                        pad = BABYLON.SceneManager.gamepad3;
                        break;
                    case BABYLON.PlayerNumber.Four:
                        pad = BABYLON.SceneManager.gamepad4;
                        break;
                }
            }
            return pad;
        }
        public getGamepadType(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): BABYLON.GamepadType {
            let type:BABYLON.GamepadType = BABYLON.GamepadType.None;
            if (this._input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        type = BABYLON.SceneManager.gamepad1Type;
                        break;
                    case BABYLON.PlayerNumber.Two:
                        type = BABYLON.SceneManager.gamepad2Type;
                        break;
                    case BABYLON.PlayerNumber.Three:
                        type = BABYLON.SceneManager.gamepad3Type;
                        break;
                    case BABYLON.PlayerNumber.Four:
                        type = BABYLON.SceneManager.gamepad4Type;
                        break;
                }
            }
            return type;
        }

        // ************************************ //
        // *   Update Camera Helper Support   * //
        // ************************************ //

        public updateCameraInput(camera:BABYLON.FreeCamera, movementSpeed: number, rotationSpeed: number, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (camera != null) {
                let horizontal: number = this.getUserInput(BABYLON.UserInputAxis.Horizontal, player);
                let vertical: number = this.getUserInput(BABYLON.UserInputAxis.Vertical, player);
                let mousex: number = this.getUserInput(BABYLON.UserInputAxis.MouseX, player);
                let mousey: number = this.getUserInput(BABYLON.UserInputAxis.MouseY, player);
                this.updateCameraPosition(camera, horizontal, vertical, movementSpeed);
                this.updateCameraRotation(camera, mousex, mousey, rotationSpeed);
            }
        }
        public updateCameraPosition(camera:BABYLON.FreeCamera, horizontal: number, vertical: number, speed: number): void {
            if (camera != null) {
                let cameraLocal:number = (camera._computeLocalCameraSpeed() * speed);
                // Camera Transform Translation
                BABYLON.SceneManager.TempMatrix.reset();
                BABYLON.Matrix.RotationYawPitchRollToRef(camera.rotation.y, camera.rotation.x, 0, BABYLON.SceneManager.TempMatrix);
                // Camera Transform Position Delta
                BABYLON.SceneManager.AuxVector3.copyFromFloats(0, 0, 0);
                BABYLON.SceneManager.TempVector3.copyFromFloats((horizontal * cameraLocal), 0, (vertical * cameraLocal));
                BABYLON.Vector3.TransformCoordinatesToRef(BABYLON.SceneManager.TempVector3, BABYLON.SceneManager.TempMatrix, BABYLON.SceneManager.AuxVector3);
                camera.cameraDirection.addInPlace(BABYLON.SceneManager.AuxVector3);
            }
        }
        public updateCameraRotation(camera:BABYLON.FreeCamera, mousex: number, mousey: number, speed: number): void {
            if (camera != null) {
                BABYLON.SceneManager.TempVector2.copyFromFloats(mousey * speed, mousex * speed);
                camera.cameraRotation.addInPlace(BABYLON.SceneManager.TempVector2);
            }
        }
        
        // *********************************** //
        // *  Scene Navigation Tool Support  * //
        // *********************************** //

        /** Gets the native babylon mesh navigation tool */
        public getNavigationTool(): Navigation {
            // Babylon Navigation Mesh Tool
            // https://github.com/wanadev/babylon-navigation-mesh
            if (this._navigation == null) {
                this._navigation = new Navigation();
            }
            return this._navigation;
        }
        /** Gets the current navigation zone */
        public getNavigationZone(): string {
            return "scene";
        }
        /** Finds a navigation path and returns a array of navigation positions */
        public findNavigationPath(origin: BABYLON.Vector3, destination: BABYLON.Vector3): BABYLON.Vector3[] {
            if (this._navigation == null || this._navmesh == null || origin == null || destination == null) return null;
            let zone: string = this.getNavigationZone();
            let group: number = this._navigation.getGroup(zone, origin);
            return this._navigation.findPath(origin, destination, zone, group);
        }

        // *********************************** //
        // *  Scene Navigation Mesh Support  * //
        // *********************************** //

        /** Gets true if the scene has a navigation mesh */
        public hasNavigationMesh(): boolean {
            return (this._navmesh != null);
        }
        /** Returns the current scene's navigation mesh */
        public getNavigationMesh(): BABYLON.AbstractMesh {
            return this._navmesh;
        }
        /** Builds the current scene's navigation nodes */
        public buildNavigationMesh(mesh:BABYLON.AbstractMesh):any {
            if (mesh != null) {
                console.log("Building navigation mesh...");
                this._navmesh = mesh;
                let navigation: Navigation = this.getNavigationTool();
                let zoneNodes: any = navigation.buildNodes(this._navmesh);
                if (zoneNodes != null) {
                    navigation.setZoneData(this.getNavigationZone(), zoneNodes);
                } else {
                    BABYLON.Tools.Warn("Babylon.js failed to set scene navigation zone");
                }
            }
        }
        /** Returns a picked navigation point */
        public getNavigationPoint(position:BABYLON.Vector3, raise:number = 2.0, length:number = Number.MAX_VALUE): BABYLON.Vector3 {
            if (this._navmesh == null || position == null) return null;
            // ..
            // let pos = new BABYLON.Vector3(position.x, (position.y + raise), position.z);
            // ..
            let ray = new BABYLON.Ray(position, new BABYLON.Vector3(0.0, -1.0, 0.0), length);
            let info = this._scene.pickWithRay(ray, (mesh) => { return (mesh === this._navmesh); });
            return (info.hit && info.pickedPoint) ? info.pickedPoint : null;
        }
        /** Moves the specified navigation again along a path of positions */
        public moveNavigationAgent(agent: BABYLON.AbstractMesh, path: BABYLON.Vector3[], speed?: number, loop?: boolean, callback?: () => void): void {
            if (path && path.length > 0) {
                let length = 0;
                let direction = [{
                    frame: 0,
                    value: agent.position
                }];
                for (let i = 0; i < path.length; i++) {
                    length += BABYLON.Vector3.Distance(direction[i].value, path[i]);
                    direction.push({
                        frame: length,
                        value: path[i]
                    });
                }
                let move: BABYLON.Animation = new BABYLON.Animation("Move", "position", 3, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
                move.setKeys(direction);
                agent.animations.push(move);
                this._scene.beginAnimation(agent, 0, length, loop, speed, callback);
            }
        }
        /** Returns an array of navigation agents */
        public getNavigationAgents(): BABYLON.Mesh[] {
            return this._scene.getMeshesByTags("[NAVAGENT]");
        }
        /** Returns the specfied navigation agent info */
        public getNavigationAgentInfo(agent: BABYLON.AbstractMesh): BABYLON.NavigationAgent {
            return new BABYLON.NavigationAgent(agent);
        }
        /** Returns the current scene's navigation area table */
        public getNavigationAreaTable(): BABYLON.INavigationArea[] {
            return (this._navmesh.metadata != null && this._navmesh.metadata.properties != null && this._navmesh.metadata.properties.table != null) ? this._navmesh.metadata.properties.table : [];
        }
        /** Returns the current scene's navigation area indexes */
        public getNavigationAreaIndexes(): number[] {
            return (this._navmesh.metadata != null && this._navmesh.metadata.properties != null && this._navmesh.metadata.properties.areas != null) ? this._navmesh.metadata.properties.areas : [];
        }
        /** Returns the current scene's navigation area names */
        public getNavigationAreaName(index: number): string {
            let result:string = "";
            if (this._navmesh.metadata != null && this._navmesh.metadata.properties != null && this._navmesh.metadata.properties.table != null) {
                let areaTable: BABYLON.INavigationArea[] = this._navmesh.metadata.properties.table;
                if (areaTable != null) {
                    for (let ii: number = 0; ii < areaTable.length; ii++) {
                        if (areaTable[ii].index === index) {
                            result = areaTable[ii].area;
                            break;
                        }
                    }
                }
            }
            return result;
        }
        /** Returns the current scene's navigation area cost */
        public getNavigationAreaCost(index: number): number {
            let result:number = -1;
            if (this._navmesh.metadata != null && this._navmesh.metadata.properties != null) {
                let areaTable: INavigationArea[] = this._navmesh.metadata.properties.table;
                if (areaTable != null) {
                    for (let ii: number = 0; ii < areaTable.length; ii++) {
                        if (areaTable[ii].index === index) {
                            result = areaTable[ii].cost;
                            break;
                        }
                    }
                }
            }
            return result;
        }

        // ********************************** //
        // *  Private Input Helper Support  * //
        // ********************************** //

        private static inputKeyDownHandler(e: KeyboardEvent): any {
            let key:string = "k:" + e.keyCode.toString();
            let pressed: boolean = false;
            if (BABYLON.SceneManager.keymap[key] != null) {
                pressed = BABYLON.SceneManager.keymap[key];
            }
            BABYLON.SceneManager.keymap[key] = true;
            switch (e.keyCode) {
                case 39: // Right
                case 68: // D-Key
                    BABYLON.SceneManager.k_horizontal = 1;
                    break;
                case 37: // Left
                case 65: // A-Key
                    BABYLON.SceneManager.k_horizontal = -1;
                    break;
                case 38: // Forward
                case 87: // W-Key
                    BABYLON.SceneManager.k_vertical = 1;
                    break;
                case 40: // Back
                case 83: // S-Key
                    BABYLON.SceneManager.k_vertical = -1;
                    break;
            }
            if (BABYLON.SceneManager.keyButtonDown != null && BABYLON.SceneManager.keyButtonDown.length > 0) {
                BABYLON.SceneManager.keyButtonDown.forEach((callback) => {
                    callback(e.keyCode);
                });
            }
            if (!pressed) {
                if (BABYLON.SceneManager.keyButtonPress != null && BABYLON.SceneManager.keyButtonPress.length > 0) {
                    BABYLON.SceneManager.keyButtonPress.forEach((press) => {
                        if (press.index === e.keyCode) {
                            press.action();
                        }
                    });
                }
            }
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }
        private static inputKeyUpHandler(e: KeyboardEvent): any {
            let key:string = "k:" + e.keyCode.toString();
            BABYLON.SceneManager.keymap[key] = false;
            switch (e.keyCode) {
                case 39: // Right
                case 37: // Left
                case 68: // D-Key
                case 65: // A-Key
                    BABYLON.SceneManager.k_horizontal = 0;
                    break;
                case 38: // Forward
                case 40: // Back
                case 87: // W-Key
                case 83: // S-Key
                    BABYLON.SceneManager.k_vertical = 0;
                    break;
            }
            if (BABYLON.SceneManager.keyButtonUp != null && BABYLON.SceneManager.keyButtonUp.length > 0) {
                BABYLON.SceneManager.keyButtonUp.forEach((callback) => {
                    callback(e.keyCode);
                });
            }
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }

        private static inputPointerWheelHandler(e:any): any {
            //let e = window.event || e; // old IE support
            //let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            let delta = e.deltaY ? -e.deltaY : e.wheelDelta / 40;
            BABYLON.SceneManager.x_wheel = Math.abs(delta) > BABYLON.UserInputOptions.PointerWheelDeadZone ? 0 + delta : 0;            
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }
        private static inputPointerDownHandler(e: PointerEvent): any {
            if (e.button === 0) {
                BABYLON.SceneManager.previousPosition = {
                    x: e.clientX,
                    y: e.clientY
                };
            }
            let key:string = "p:" + e.button.toString();
            let pressed: boolean = false;
            if (BABYLON.SceneManager.keymap[key] != null) {
                pressed = BABYLON.SceneManager.keymap[key];
            }
            BABYLON.SceneManager.keymap[key] = true;
            if (BABYLON.SceneManager.mouseButtonDown != null && BABYLON.SceneManager.mouseButtonDown.length > 0) {
                BABYLON.SceneManager.mouseButtonDown.forEach((callback) => {
                    callback(e.button);
                });
            }
            if (!pressed) {
                if (BABYLON.SceneManager.mouseButtonPress != null && BABYLON.SceneManager.mouseButtonPress.length > 0) {
                    BABYLON.SceneManager.mouseButtonPress.forEach((press) => {
                        if (press.index === e.button) {
                            press.action();
                        }
                    });
                }
            }
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }
        private static inputPointerUpHandler(e: PointerEvent): any {
            if (e.button === 0 && BABYLON.SceneManager.previousPosition != null) {
                BABYLON.SceneManager.previousPosition = null;
                BABYLON.SceneManager.k_mousex = 0;
                BABYLON.SceneManager.k_mousey = 0;
            }
            let key:string = "p:" + e.button.toString();
            BABYLON.SceneManager.keymap[key] = false;
            if (BABYLON.SceneManager.mouseButtonUp != null && BABYLON.SceneManager.mouseButtonUp.length > 0) {
                BABYLON.SceneManager.mouseButtonUp.forEach((callback) => {
                    callback(e.button);
                });
            }
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }
        private static inputPointerMoveHandler(e: PointerEvent): any {
            // Mouse Pointer Rotation When No Virtual Joystick Enabled
            if (BABYLON.SceneManager.virtualJoystick === false) {
                if (BABYLON.SceneManager.previousPosition != null) {
                    BABYLON.SceneManager.clientx = e.clientX;
                    BABYLON.SceneManager.clienty = e.clientY;
                    let offsetX = e.clientX - BABYLON.SceneManager.previousPosition.x;
                    let offsetY = e.clientY - BABYLON.SceneManager.previousPosition.y;
                    BABYLON.SceneManager.previousPosition = {
                        x: e.clientX,
                        y: e.clientY
                    };
                    let mousex:number = offsetX * (BABYLON.UserInputOptions.PointerAngularSensibility / 10);
                    let mousey:number = offsetY * (BABYLON.UserInputOptions.PointerAngularSensibility / 10);
                    if (mousex != 0) {
                        BABYLON.SceneManager.k_mousex = mousex;
                    }
                    if (mousey != 0) {
                        if (BABYLON.SceneManager.rightHanded) {
                            BABYLON.SceneManager.k_mousey = -mousey;
                        } else {
                            BABYLON.SceneManager.k_mousey = mousey;
                        }
                    }
                }
            }
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }

        private static inputVirtualJoysticks(): void {
            if (BABYLON.SceneManager.leftJoystick != null) {
                // Update left virtual joystick values
                let LSDelta:BABYLON.Vector3 = BABYLON.SceneManager.leftJoystick.deltaPosition;
                if (!BABYLON.SceneManager.leftJoystick.pressed) {
                    LSDelta = LSDelta.scale(0.9);
                }
                let normalizedLX:number = LSDelta.x;
                let normalizedLY:number = LSDelta.y;
                LSDelta.x = Math.abs(normalizedLX) > BABYLON.UserInputOptions.JoystickDeadStickValue ? 0 + normalizedLX : 0;
                LSDelta.y = Math.abs(normalizedLY) > BABYLON.UserInputOptions.JoystickDeadStickValue ? 0 + normalizedLY : 0;
                BABYLON.SceneManager.j_horizontal = LSDelta.x;
                BABYLON.SceneManager.j_vertical = LSDelta.y;
            }
            if (BABYLON.SceneManager.rightJoystick != null) {
                // Update right virtual joystick values
                let RSDelta:BABYLON.Vector3 = BABYLON.SceneManager.rightJoystick.deltaPosition;
                if (!BABYLON.SceneManager.rightJoystick.pressed) {
                    RSDelta = RSDelta.scale(0.9);
                }
                let normalizedRX:number = RSDelta.x;
                let normalizedRY:number = RSDelta.y;
                RSDelta.x = Math.abs(normalizedRX) > BABYLON.UserInputOptions.JoystickDeadStickValue ? 0 + normalizedRX : 0;
                RSDelta.y = Math.abs(normalizedRY) > BABYLON.UserInputOptions.JoystickDeadStickValue ? 0 + normalizedRY : 0;
                BABYLON.SceneManager.j_mousex = RSDelta.x;
                BABYLON.SceneManager.j_mousey = RSDelta.y;
            }
        }
        
        private static inputOneButtonDownHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let key:string = "b1:" + button.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad1ButtonDown != null && BABYLON.SceneManager.gamepad1ButtonDown.length > 0) {
                    BABYLON.SceneManager.gamepad1ButtonDown.forEach((callback) => {
                        callback(button);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad1ButtonPress != null && BABYLON.SceneManager.gamepad1ButtonPress.length > 0) {
                        BABYLON.SceneManager.gamepad1ButtonPress.forEach((press) => {
                            if (press.index === button) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputOneButtonUpHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let key:string = "b1:" + button.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad1ButtonUp != null && BABYLON.SceneManager.gamepad1ButtonUp.length > 0) {
                    BABYLON.SceneManager.gamepad1ButtonUp.forEach((callback) => {
                        callback(button);
                    });
                }
            }
        }
        private static inputOneXboxDPadDownHandler(dPadPressed: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let key:string = "d1:" + dPadPressed.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad1DpadDown != null && BABYLON.SceneManager.gamepad1DpadDown.length > 0) {
                    BABYLON.SceneManager.gamepad1DpadDown.forEach((callback) => {
                        callback(dPadPressed);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad1DpadPress != null && BABYLON.SceneManager.gamepad1DpadPress.length > 0) {
                        BABYLON.SceneManager.gamepad1DpadPress.forEach((press) => {
                            if (press.index === dPadPressed) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputOneXboxDPadUpHandler(dPadReleased: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let key:string = "d1:" + dPadReleased.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad1DpadUp != null && BABYLON.SceneManager.gamepad1DpadUp.length > 0) {
                    BABYLON.SceneManager.gamepad1DpadUp.forEach((callback) => {
                        callback(dPadReleased);
                    });
                }
            }
        }
        private static inputOneXboxLeftTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                BABYLON.SceneManager.keymap["t1:0"] = value;
                if (BABYLON.SceneManager.gamepad1LeftTrigger != null && BABYLON.SceneManager.gamepad1LeftTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad1LeftTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputOneXboxRightTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                BABYLON.SceneManager.keymap["t1:1"] = value;
                if (BABYLON.SceneManager.gamepad1RightTrigger != null && BABYLON.SceneManager.gamepad1RightTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad1RightTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputOneLeftStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let LSValues:BABYLON.StickValues = values;
                let normalizedLX:number = LSValues.x * BABYLON.UserInputOptions.GamepadLStickSensibility;
                let normalizedLY:number = LSValues.y * BABYLON.UserInputOptions.GamepadLStickSensibility;
                LSValues.x = Math.abs(normalizedLX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLX : 0;
                LSValues.y = Math.abs(normalizedLY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLY : 0;
                BABYLON.SceneManager.g_horizontal1 = (BABYLON.UserInputOptions.GamepadLStickXInverted) ? -LSValues.x : LSValues.x;
                BABYLON.SceneManager.g_vertical1 = (BABYLON.UserInputOptions.GamepadLStickYInverted) ? LSValues.y : -LSValues.y;
            }
        }
        private static inputOneRightStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let RSValues:BABYLON.StickValues = values;
                let normalizedRX:number = RSValues.x * BABYLON.UserInputOptions.GamepadRStickSensibility;
                let normalizedRY:number = RSValues.y * BABYLON.UserInputOptions.GamepadRStickSensibility;
                RSValues.x = Math.abs(normalizedRX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRX : 0;
                RSValues.y = Math.abs(normalizedRY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRY : 0;
                BABYLON.SceneManager.g_mousex1 = (BABYLON.UserInputOptions.GamepadRStickXInverted) ? -RSValues.x : RSValues.x;
                BABYLON.SceneManager.g_mousey1 = (BABYLON.UserInputOptions.GamepadRStickYInverted) ? -RSValues.y : RSValues.y;
            }
        }

        private static inputTwoButtonDownHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let key:string = "b2:" + button.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad2ButtonDown != null && BABYLON.SceneManager.gamepad2ButtonDown.length > 0) {
                    BABYLON.SceneManager.gamepad2ButtonDown.forEach((callback) => {
                        callback(button);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad2ButtonPress != null && BABYLON.SceneManager.gamepad2ButtonPress.length > 0) {
                        BABYLON.SceneManager.gamepad2ButtonPress.forEach((press) => {
                            if (press.index === button) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputTwoButtonUpHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let key:string = "b2:" + button.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad2ButtonUp != null && BABYLON.SceneManager.gamepad2ButtonUp.length > 0) {
                    BABYLON.SceneManager.gamepad2ButtonUp.forEach((callback) => {
                        callback(button);
                    });
                }
            }
        }
        private static inputTwoXboxDPadDownHandler(dPadPressed: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let key:string = "d2:" + dPadPressed.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad2DpadDown != null && BABYLON.SceneManager.gamepad2DpadDown.length > 0) {
                    BABYLON.SceneManager.gamepad2DpadDown.forEach((callback) => {
                        callback(dPadPressed);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad2DpadPress != null && BABYLON.SceneManager.gamepad2DpadPress.length > 0) {
                        BABYLON.SceneManager.gamepad2DpadPress.forEach((press) => {
                            if (press.index === dPadPressed) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputTwoXboxDPadUpHandler(dPadReleased: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let key:string = "d2:" + dPadReleased.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad2DpadUp != null && BABYLON.SceneManager.gamepad2DpadUp.length > 0) {
                    BABYLON.SceneManager.gamepad2DpadUp.forEach((callback) => {
                        callback(dPadReleased);
                    });
                }
            }
        }
        private static inputTwoXboxLeftTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                BABYLON.SceneManager.keymap["t2:0"] = value;
                if (BABYLON.SceneManager.gamepad2LeftTrigger != null && BABYLON.SceneManager.gamepad2LeftTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad2LeftTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputTwoXboxRightTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                BABYLON.SceneManager.keymap["t2:1"] = value;
                if (BABYLON.SceneManager.gamepad2RightTrigger != null && BABYLON.SceneManager.gamepad2RightTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad2RightTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputTwoLeftStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let LSValues:BABYLON.StickValues = values;
                let normalizedLX:number = LSValues.x * BABYLON.UserInputOptions.GamepadLStickSensibility;
                let normalizedLY:number = LSValues.y * BABYLON.UserInputOptions.GamepadLStickSensibility;
                LSValues.x = Math.abs(normalizedLX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLX : 0;
                LSValues.y = Math.abs(normalizedLY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLY : 0;
                BABYLON.SceneManager.g_horizontal2 = (BABYLON.UserInputOptions.GamepadLStickXInverted) ? -LSValues.x : LSValues.x;
                BABYLON.SceneManager.g_vertical2 = (BABYLON.UserInputOptions.GamepadLStickYInverted) ? LSValues.y : -LSValues.y;
            }
        }
        private static inputTwoRightStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let RSValues:BABYLON.StickValues = values;
                let normalizedRX:number = RSValues.x * BABYLON.UserInputOptions.GamepadRStickSensibility;
                let normalizedRY:number = RSValues.y * BABYLON.UserInputOptions.GamepadRStickSensibility;
                RSValues.x = Math.abs(normalizedRX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRX : 0;
                RSValues.y = Math.abs(normalizedRY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRY : 0;
                BABYLON.SceneManager.g_mousex2 = (BABYLON.UserInputOptions.GamepadRStickXInverted) ? -RSValues.x : RSValues.x;
                BABYLON.SceneManager.g_mousey2 = (BABYLON.UserInputOptions.GamepadRStickYInverted) ? -RSValues.y : RSValues.y;
            }
        }

        private static inputThreeButtonDownHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let key:string = "b3:" + button.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad3ButtonDown != null && BABYLON.SceneManager.gamepad3ButtonDown.length > 0) {
                    BABYLON.SceneManager.gamepad3ButtonDown.forEach((callback) => {
                        callback(button);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad3ButtonPress != null && BABYLON.SceneManager.gamepad3ButtonPress.length > 0) {
                        BABYLON.SceneManager.gamepad3ButtonPress.forEach((press) => {
                            if (press.index === button) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputThreeButtonUpHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let key:string = "b3:" + button.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad3ButtonUp != null && BABYLON.SceneManager.gamepad3ButtonUp.length > 0) {
                    BABYLON.SceneManager.gamepad3ButtonUp.forEach((callback) => {
                        callback(button);
                    });
                }
            }
        }
        private static inputThreeXboxDPadDownHandler(dPadPressed: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let key:string = "d3:" + dPadPressed.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad3DpadDown != null && BABYLON.SceneManager.gamepad3DpadDown.length > 0) {
                    BABYLON.SceneManager.gamepad3DpadDown.forEach((callback) => {
                        callback(dPadPressed);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad3DpadPress != null && BABYLON.SceneManager.gamepad3DpadPress.length > 0) {
                        BABYLON.SceneManager.gamepad3DpadPress.forEach((press) => {
                            if (press.index === dPadPressed) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputThreeXboxDPadUpHandler(dPadReleased: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let key:string = "d3:" + dPadReleased.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad3DpadUp != null && BABYLON.SceneManager.gamepad3DpadUp.length > 0) {
                    BABYLON.SceneManager.gamepad3DpadUp.forEach((callback) => {
                        callback(dPadReleased);
                    });
                }
            }
        }
        private static inputThreeXboxLeftTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                BABYLON.SceneManager.keymap["t3:0"] = value;
                if (BABYLON.SceneManager.gamepad3LeftTrigger != null && BABYLON.SceneManager.gamepad3LeftTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad3LeftTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputThreeXboxRightTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                BABYLON.SceneManager.keymap["t3:1"] = value;
                if (BABYLON.SceneManager.gamepad3RightTrigger != null && BABYLON.SceneManager.gamepad3RightTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad3RightTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputThreeLeftStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let LSValues:BABYLON.StickValues = values;
                let normalizedLX:number = LSValues.x * BABYLON.UserInputOptions.GamepadLStickSensibility;
                let normalizedLY:number = LSValues.y * BABYLON.UserInputOptions.GamepadLStickSensibility;
                LSValues.x = Math.abs(normalizedLX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLX : 0;
                LSValues.y = Math.abs(normalizedLY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLY : 0;
                BABYLON.SceneManager.g_horizontal3 = (BABYLON.UserInputOptions.GamepadLStickXInverted) ? -LSValues.x : LSValues.x;
                BABYLON.SceneManager.g_vertical3 = (BABYLON.UserInputOptions.GamepadLStickYInverted) ? LSValues.y : -LSValues.y;
            }
        }
        private static inputThreeRightStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let RSValues:BABYLON.StickValues = values;
                let normalizedRX:number = RSValues.x * BABYLON.UserInputOptions.GamepadRStickSensibility;
                let normalizedRY:number = RSValues.y * BABYLON.UserInputOptions.GamepadRStickSensibility;
                RSValues.x = Math.abs(normalizedRX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRX : 0;
                RSValues.y = Math.abs(normalizedRY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRY : 0;
                BABYLON.SceneManager.g_mousex3 = (BABYLON.UserInputOptions.GamepadRStickXInverted) ? -RSValues.x : RSValues.x;
                BABYLON.SceneManager.g_mousey3 = (BABYLON.UserInputOptions.GamepadRStickYInverted) ? -RSValues.y : RSValues.y;
            }
        }

        private static inputFourButtonDownHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let key:string = "b4:" + button.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad4ButtonDown != null && BABYLON.SceneManager.gamepad4ButtonDown.length > 0) {
                    BABYLON.SceneManager.gamepad4ButtonDown.forEach((callback) => {
                        callback(button);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad4ButtonPress != null && BABYLON.SceneManager.gamepad4ButtonPress.length > 0) {
                        BABYLON.SceneManager.gamepad4ButtonPress.forEach((press) => {
                            if (press.index === button) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputFourButtonUpHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let key:string = "b4:" + button.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad4ButtonUp != null && BABYLON.SceneManager.gamepad4ButtonUp.length > 0) {
                    BABYLON.SceneManager.gamepad4ButtonUp.forEach((callback) => {
                        callback(button);
                    });
                }
            }
        }
        private static inputFourXboxDPadDownHandler(dPadPressed: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let key:string = "d4:" + dPadPressed.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad4DpadDown != null && BABYLON.SceneManager.gamepad4DpadDown.length > 0) {
                    BABYLON.SceneManager.gamepad4DpadDown.forEach((callback) => {
                        callback(dPadPressed);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad4DpadPress != null && BABYLON.SceneManager.gamepad4DpadPress.length > 0) {
                        BABYLON.SceneManager.gamepad4DpadPress.forEach((press) => {
                            if (press.index === dPadPressed) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputFourXboxDPadUpHandler(dPadReleased: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let key:string = "d4:" + dPadReleased.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad4DpadUp != null && BABYLON.SceneManager.gamepad4DpadUp.length > 0) {
                    BABYLON.SceneManager.gamepad4DpadUp.forEach((callback) => {
                        callback(dPadReleased);
                    });
                }
            }
        }
        private static inputFourXboxLeftTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                BABYLON.SceneManager.keymap["t4:0"] = value;
                if (BABYLON.SceneManager.gamepad4LeftTrigger != null && BABYLON.SceneManager.gamepad4LeftTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad4LeftTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputFourXboxRightTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                BABYLON.SceneManager.keymap["t4:1"] = value;
                if (BABYLON.SceneManager.gamepad4RightTrigger != null && BABYLON.SceneManager.gamepad4RightTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad4RightTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputFourLeftStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let LSValues:BABYLON.StickValues = values;
                let normalizedLX:number = LSValues.x * BABYLON.UserInputOptions.GamepadLStickSensibility;
                let normalizedLY:number = LSValues.y * BABYLON.UserInputOptions.GamepadLStickSensibility;
                LSValues.x = Math.abs(normalizedLX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLX : 0;
                LSValues.y = Math.abs(normalizedLY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLY : 0;
                BABYLON.SceneManager.g_horizontal4 = (BABYLON.UserInputOptions.GamepadLStickXInverted) ? -LSValues.x : LSValues.x;
                BABYLON.SceneManager.g_vertical4 = (BABYLON.UserInputOptions.GamepadLStickYInverted) ? LSValues.y : -LSValues.y;
            }
        }
        private static inputFourRightStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let RSValues:BABYLON.StickValues = values;
                let normalizedRX:number = RSValues.x * BABYLON.UserInputOptions.GamepadRStickSensibility;
                let normalizedRY:number = RSValues.y * BABYLON.UserInputOptions.GamepadRStickSensibility;
                RSValues.x = Math.abs(normalizedRX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRX : 0;
                RSValues.y = Math.abs(normalizedRY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRY : 0;
                BABYLON.SceneManager.g_mousex4 = (BABYLON.UserInputOptions.GamepadRStickXInverted) ? -RSValues.x : RSValues.x;
                BABYLON.SceneManager.g_mousey4 = (BABYLON.UserInputOptions.GamepadRStickYInverted) ? -RSValues.y : RSValues.y;
            }
        }

        private static inputManagerGamepadConnected(pad: BABYLON.Gamepad, state:BABYLON.EventState) {
            if (BABYLON.SceneManager.gamepad1 == null && pad.index === 0) {
                BABYLON.SceneManager.gamepad1 = pad;
                BABYLON.Tools.Log("Gamepad One Connected: " + BABYLON.SceneManager.gamepad1.id);
                if ((<string>BABYLON.SceneManager.gamepad1.id).search("Xbox 360") !== -1 || (<string>BABYLON.SceneManager.gamepad1.id).search("Xbox One") !== -1 || (<string>BABYLON.SceneManager.gamepad1.id).search("xinput") !== -1) {
                    BABYLON.SceneManager.gamepad1Type = BABYLON.GamepadType.Xbox360;
                    let xbox360Pad1: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad1 as BABYLON.Xbox360Pad;
                    xbox360Pad1.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
                    xbox360Pad1.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
                    xbox360Pad1.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
                    xbox360Pad1.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
                    xbox360Pad1.ondpadup(BABYLON.SceneManager.inputOneXboxDPadUpHandler);
                    xbox360Pad1.ondpaddown(BABYLON.SceneManager.inputOneXboxDPadDownHandler);
                    xbox360Pad1.onlefttriggerchanged(BABYLON.SceneManager.inputOneXboxLeftTriggerHandler);
                    xbox360Pad1.onrighttriggerchanged(BABYLON.SceneManager.inputOneXboxRightTriggerHandler);
                } else {
                    BABYLON.SceneManager.gamepad1Type = BABYLON.GamepadType.Generic;
                    let genericPad1: BABYLON.GenericPad = BABYLON.SceneManager.gamepad1 as BABYLON.GenericPad;
                    genericPad1.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
                    genericPad1.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
                    genericPad1.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
                    genericPad1.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
                }
            }
            if (BABYLON.SceneManager.gamepad2 == null && pad.index === 1) {
                BABYLON.SceneManager.gamepad2 = pad;
                BABYLON.Tools.Log("Gamepad Two Connected: " + BABYLON.SceneManager.gamepad2.id);
                if ((<string>BABYLON.SceneManager.gamepad2.id).search("Xbox 360") !== -1 || (<string>BABYLON.SceneManager.gamepad2.id).search("Xbox One") !== -1 || (<string>BABYLON.SceneManager.gamepad2.id).search("xinput") !== -1) {
                    BABYLON.SceneManager.gamepad2Type = BABYLON.GamepadType.Xbox360;
                    let xbox360Pad2: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad2 as BABYLON.Xbox360Pad;
                    xbox360Pad2.onbuttonup(BABYLON.SceneManager.inputTwoButtonUpHandler);
                    xbox360Pad2.onbuttondown(BABYLON.SceneManager.inputTwoButtonDownHandler);
                    xbox360Pad2.onleftstickchanged(BABYLON.SceneManager.inputTwoLeftStickHandler);
                    xbox360Pad2.onrightstickchanged(BABYLON.SceneManager.inputTwoRightStickHandler);
                    xbox360Pad2.ondpadup(BABYLON.SceneManager.inputTwoXboxDPadUpHandler);
                    xbox360Pad2.ondpaddown(BABYLON.SceneManager.inputTwoXboxDPadDownHandler);
                    xbox360Pad2.onlefttriggerchanged(BABYLON.SceneManager.inputTwoXboxLeftTriggerHandler);
                    xbox360Pad2.onrighttriggerchanged(BABYLON.SceneManager.inputTwoXboxRightTriggerHandler);
                } else {
                    BABYLON.SceneManager.gamepad2Type = BABYLON.GamepadType.Generic;
                    let genericPad2: BABYLON.GenericPad = BABYLON.SceneManager.gamepad2 as BABYLON.GenericPad;
                    genericPad2.onbuttonup(BABYLON.SceneManager.inputTwoButtonUpHandler);
                    genericPad2.onbuttondown(BABYLON.SceneManager.inputTwoButtonDownHandler);
                    genericPad2.onleftstickchanged(BABYLON.SceneManager.inputTwoLeftStickHandler);
                    genericPad2.onrightstickchanged(BABYLON.SceneManager.inputTwoRightStickHandler);
                }
            }
            if (BABYLON.SceneManager.gamepad3 == null && pad.index === 2) {
                BABYLON.SceneManager.gamepad3 = pad;
                BABYLON.Tools.Log("Gamepad Three Connected: " + BABYLON.SceneManager.gamepad3.id);
                if ((<string>BABYLON.SceneManager.gamepad3.id).search("Xbox 360") !== -1 || (<string>BABYLON.SceneManager.gamepad3.id).search("Xbox One") !== -1 || (<string>BABYLON.SceneManager.gamepad3.id).search("xinput") !== -1) {
                    BABYLON.SceneManager.gamepad3Type = BABYLON.GamepadType.Xbox360;
                    let xbox360Pad3: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad3 as BABYLON.Xbox360Pad;
                    xbox360Pad3.onbuttonup(BABYLON.SceneManager.inputThreeButtonUpHandler);
                    xbox360Pad3.onbuttondown(BABYLON.SceneManager.inputThreeButtonDownHandler);
                    xbox360Pad3.onleftstickchanged(BABYLON.SceneManager.inputThreeLeftStickHandler);
                    xbox360Pad3.onrightstickchanged(BABYLON.SceneManager.inputThreeRightStickHandler);
                    xbox360Pad3.ondpadup(BABYLON.SceneManager.inputThreeXboxDPadUpHandler);
                    xbox360Pad3.ondpaddown(BABYLON.SceneManager.inputThreeXboxDPadDownHandler);
                    xbox360Pad3.onlefttriggerchanged(BABYLON.SceneManager.inputThreeXboxLeftTriggerHandler);
                    xbox360Pad3.onrighttriggerchanged(BABYLON.SceneManager.inputThreeXboxRightTriggerHandler);
                } else {
                    BABYLON.SceneManager.gamepad3Type = BABYLON.GamepadType.Generic;
                    let genericPad3: BABYLON.GenericPad = BABYLON.SceneManager.gamepad3 as BABYLON.GenericPad;
                    genericPad3.onbuttonup(BABYLON.SceneManager.inputThreeButtonUpHandler);
                    genericPad3.onbuttondown(BABYLON.SceneManager.inputThreeButtonDownHandler);
                    genericPad3.onleftstickchanged(BABYLON.SceneManager.inputThreeLeftStickHandler);
                    genericPad3.onrightstickchanged(BABYLON.SceneManager.inputThreeRightStickHandler);
                }
            }
            if (BABYLON.SceneManager.gamepad4 == null && pad.index === 3) {
                BABYLON.SceneManager.gamepad4 = pad;
                BABYLON.Tools.Log("Gamepad Four Connected: " + BABYLON.SceneManager.gamepad4.id);
                if ((<string>BABYLON.SceneManager.gamepad4.id).search("Xbox 360") !== -1 || (<string>BABYLON.SceneManager.gamepad4.id).search("Xbox One") !== -1 || (<string>BABYLON.SceneManager.gamepad4.id).search("xinput") !== -1) {
                    BABYLON.SceneManager.gamepad4Type = BABYLON.GamepadType.Xbox360;
                    let xbox360Pad4: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad4 as BABYLON.Xbox360Pad;
                    xbox360Pad4.onbuttonup(BABYLON.SceneManager.inputFourButtonUpHandler);
                    xbox360Pad4.onbuttondown(BABYLON.SceneManager.inputFourButtonDownHandler);
                    xbox360Pad4.onleftstickchanged(BABYLON.SceneManager.inputFourLeftStickHandler);
                    xbox360Pad4.onrightstickchanged(BABYLON.SceneManager.inputFourRightStickHandler);
                    xbox360Pad4.ondpadup(BABYLON.SceneManager.inputFourXboxDPadUpHandler);
                    xbox360Pad4.ondpaddown(BABYLON.SceneManager.inputFourXboxDPadDownHandler);
                    xbox360Pad4.onlefttriggerchanged(BABYLON.SceneManager.inputFourXboxLeftTriggerHandler);
                    xbox360Pad4.onrighttriggerchanged(BABYLON.SceneManager.inputFourXboxRightTriggerHandler);
                } else {
                    BABYLON.SceneManager.gamepad4Type = BABYLON.GamepadType.Generic;
                    let genericPad4: BABYLON.GenericPad = BABYLON.SceneManager.gamepad4 as BABYLON.GenericPad;
                    genericPad4.onbuttonup(BABYLON.SceneManager.inputFourButtonUpHandler);
                    genericPad4.onbuttondown(BABYLON.SceneManager.inputFourButtonDownHandler);
                    genericPad4.onleftstickchanged(BABYLON.SceneManager.inputFourLeftStickHandler);
                    genericPad4.onrightstickchanged(BABYLON.SceneManager.inputFourRightStickHandler);
                }
            }
            if (BABYLON.SceneManager.GamepadConnected != null) {
                BABYLON.SceneManager.GamepadConnected(pad, state);
            }
        }
        private static inputManagerGamepadDisconnected(pad: BABYLON.Gamepad, state:BABYLON.EventState) {
            if (BABYLON.SceneManager.GamepadDisconnected != null) {
                BABYLON.SceneManager.GamepadDisconnected(pad, state);
            }
        }
        
        private static inputManagerLeftControllerMainButton(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerLeftControllerPadState(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerLeftControllerPadValues(controller: BABYLON.StickValues, state:BABYLON.EventState) {
        }
        private static inputManagerLeftControllerAuxButton(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerLeftControllerTriggered(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }

        private static inputManagerRightControllerMainButton(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerRightControllerPadState(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerRightControllerPadValues(controller: BABYLON.StickValues, state:BABYLON.EventState) {
        }
        private static inputManagerRightControllerAuxButton(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerRightControllerTriggered(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }

        private static inputManagerControllerConnected(controller: BABYLON.WebVRController, state:BABYLON.EventState) {
            /*
            let xbox360Pad1: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad1 as BABYLON.Xbox360Pad;
            xbox360Pad1.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
            xbox360Pad1.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
            xbox360Pad1.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
            xbox360Pad1.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
            xbox360Pad1.ondpadup(BABYLON.SceneManager.inputOneXboxDPadUpHandler);
            xbox360Pad1.ondpaddown(BABYLON.SceneManager.inputOneXboxDPadDownHandler);
            xbox360Pad1.onlefttriggerchanged(BABYLON.SceneManager.inputOneXboxLeftTriggerHandler);
            xbox360Pad1.onrighttriggerchanged(BABYLON.SceneManager.inputOneXboxRightTriggerHandler);
            */
        }

        // ************************************** //
        // *  Private User Input State Support  * //
        // ************************************** //

        private static updateUserInput(): void {
            BABYLON.SceneManager.inputVirtualJoysticks();
            // Reset global user input state  buffers
            BABYLON.SceneManager.x_horizontal = 0;
            BABYLON.SceneManager.x_vertical = 0;
            BABYLON.SceneManager.x_mousex = 0;
            BABYLON.SceneManager.x_mousey = 0;
            // Update user input state by order of precedence
            if (BABYLON.SceneManager.j_horizontal !== 0) {
                BABYLON.SceneManager.x_horizontal = BABYLON.SceneManager.j_horizontal;
            } else if (BABYLON.SceneManager.k_horizontal !== 0) {
                BABYLON.SceneManager.x_horizontal = BABYLON.SceneManager.k_horizontal;
            } else if (BABYLON.SceneManager.g_horizontal1 !== 0) {
                BABYLON.SceneManager.x_horizontal = BABYLON.SceneManager.g_horizontal1;
            }
            if (BABYLON.SceneManager.j_vertical !== 0) {
                BABYLON.SceneManager.x_vertical = BABYLON.SceneManager.j_vertical;
            } else if (BABYLON.SceneManager.k_vertical !== 0) {
                BABYLON.SceneManager.x_vertical = BABYLON.SceneManager.k_vertical;
            } else if (BABYLON.SceneManager.g_vertical1 !== 0) {
                BABYLON.SceneManager.x_vertical = BABYLON.SceneManager.g_vertical1;
            }
            if (BABYLON.SceneManager.j_mousex !== 0) {
                BABYLON.SceneManager.x_mousex = BABYLON.SceneManager.j_mousex;
            } else if (BABYLON.SceneManager.k_mousex !== 0) {
                BABYLON.SceneManager.x_mousex = BABYLON.SceneManager.k_mousex;
            } else if (BABYLON.SceneManager.g_mousex1 !== 0) {
                BABYLON.SceneManager.x_mousex = BABYLON.SceneManager.g_mousex1;
            }
            if (BABYLON.SceneManager.j_mousey !== 0) {
                BABYLON.SceneManager.x_mousey = BABYLON.SceneManager.j_mousey;
            } else if (BABYLON.SceneManager.k_mousey !== 0) {
                BABYLON.SceneManager.x_mousey = BABYLON.SceneManager.k_mousey;
            } else if (BABYLON.SceneManager.g_mousey1 !== 0) {
                BABYLON.SceneManager.x_mousey = BABYLON.SceneManager.g_mousey1;
            }
            // Update global user input state buffers
            BABYLON.SceneManager.horizontal = BABYLON.SceneManager.x_horizontal;
            BABYLON.SceneManager.vertical = BABYLON.SceneManager.x_vertical;
            BABYLON.SceneManager.mousex = BABYLON.SceneManager.x_mousex;
            BABYLON.SceneManager.mousey = BABYLON.SceneManager.x_mousey;
            BABYLON.SceneManager.wheel = BABYLON.SceneManager.x_wheel;
            // Update gamepad two user input 
            BABYLON.SceneManager.horizontal2 = BABYLON.SceneManager.g_horizontal2;
            BABYLON.SceneManager.vertical2 = BABYLON.SceneManager.g_vertical2;
            BABYLON.SceneManager.mousex2 = BABYLON.SceneManager.g_mousex2;
            BABYLON.SceneManager.mousey2 = BABYLON.SceneManager.g_mousey2;
            // Update gamepad three user input 
            BABYLON.SceneManager.horizontal3 = BABYLON.SceneManager.g_horizontal3;
            BABYLON.SceneManager.vertical3 = BABYLON.SceneManager.g_vertical3;
            BABYLON.SceneManager.mousex3 = BABYLON.SceneManager.g_mousex3;
            BABYLON.SceneManager.mousey3 = BABYLON.SceneManager.g_mousey3;
            // Update gamepad four user input 
            BABYLON.SceneManager.horizontal4 = BABYLON.SceneManager.g_horizontal4;
            BABYLON.SceneManager.vertical4 = BABYLON.SceneManager.g_vertical4;
            BABYLON.SceneManager.mousex4 = BABYLON.SceneManager.g_mousex4;
            BABYLON.SceneManager.mousey4 = BABYLON.SceneManager.g_mousey4;
            // Reset mouse wheel user input buffer
            BABYLON.SceneManager.x_mousey = 0;
        }

        // *********************************** //
        // *  Private Scene Parsing Support  * //
        // *********************************** //

        private static parseSceneCameras(cameras: BABYLON.Camera[], scene: BABYLON.Scene, ticklist: BABYLON.IScriptComponent[]): void {
            if (cameras != null && cameras.length > 0) {
                cameras.forEach((camera) => {
                    if (camera.metadata != null && camera.metadata.api && camera.metadata.parsed === false) {
                        camera.metadata.parsed = true;
                        // Setup metadata cloning
                        camera.metadata.clone = () => { return BABYLON.SceneManager.CloneMetadata(camera.metadata); };
                        // Camera rigging options
                        BABYLON.SceneManager.setupCameraRigOptions(camera, scene);
                        // Camera component scripts
                        let metadata: BABYLON.IObjectMetadata = camera.metadata as BABYLON.IObjectMetadata;
                        if (metadata.components != null && metadata.components.length > 0) {
                            metadata.components.forEach((camerascript) => {
                                if (camerascript.klass != null && camerascript.klass !== "" && camerascript.klass !== "BABYLON.SceneComponent" && camerascript.klass !== "BABYLON.OrthoController") {
                                    let CameraComponentClass = BABYLON.Utilities.InstantiateClass(camerascript.klass);
                                    if (CameraComponentClass != null) {
                                        camerascript.instance = new CameraComponentClass(camera, scene, camerascript.update, camerascript.properties);
                                        if (camerascript.instance != null) {
                                            if (ticklist != null) ticklist.push(camerascript);
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
        private static parseSceneLights(lights: BABYLON.Light[], scene: BABYLON.Scene, ticklist: BABYLON.IScriptComponent[]): void {
            if (lights != null && lights.length > 0) {
                lights.forEach((light) => {
                    if (light.metadata != null && light.metadata.api && light.metadata.parsed === false) {
                        light.metadata.parsed = true;
                        // Setup metadata cloning
                        light.metadata.clone = () => { return BABYLON.SceneManager.CloneMetadata(light.metadata); };
                        // Light component scripts
                        let metadata: BABYLON.IObjectMetadata = light.metadata as BABYLON.IObjectMetadata;
                        if (metadata.components != null && metadata.components.length > 0) {
                            metadata.components.forEach((lightscript) => {
                                if (lightscript.klass != null && lightscript.klass !== "" && lightscript.klass !== "BABYLON.SceneComponent" && lightscript.klass !== "BABYLON.OrthoController") {
                                    let LightComponentClass = BABYLON.Utilities.InstantiateClass(lightscript.klass);
                                    if (LightComponentClass != null) {
                                        lightscript.instance = new LightComponentClass(light, scene, lightscript.update, lightscript.properties);
                                        if (lightscript.instance != null) {
                                            if (ticklist != null) ticklist.push(lightscript);
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
        private static parseSceneMeshes(meshes: BABYLON.AbstractMesh[], scene: BABYLON.Scene, ticklist: BABYLON.IScriptComponent[]): void {
            if (meshes != null && meshes.length > 0) {
                meshes.forEach((mesh) => {
                    if (mesh.metadata != null && mesh.metadata.api && mesh.metadata.parsed === false) {
                        mesh.metadata.parsed = true;
                        // Setup metadata cloning
                        mesh.metadata.clone = () => { return BABYLON.SceneManager.CloneMetadata(mesh.metadata); };
                        // Setup shared skeleton
                        BABYLON.SceneManager.setupSharedSkeleton(mesh, scene);
                        // Setup prefab masters
                        if (mesh.metadata.prefab === true) {
                            mesh.setEnabled(false);
                            BABYLON.SceneManager.prefabs[mesh.name] = mesh;
                        } else {
                            // Level of detail setup
                            BABYLON.SceneManager.setupLodGroups(mesh, scene, false);
                            // Mesh navigation setup
                            if (mesh.name === "SceneNavigationMesh" && scene.metadata.properties.hasNavigationMesh != null && scene.metadata.properties.hasNavigationMesh === true) {
                                if (BABYLON.SceneManager.GetInstance().hasNavigationMesh() === false) {
                                    BABYLON.SceneManager.GetInstance().buildNavigationMesh(mesh);
                                } else {
                                    BABYLON.Tools.Warn("Scene navigation mesh already exists. Ignoring navigation zone building for mesh: " + mesh.name);
                                }
                            }
                            // Mesh component scripts
                            let metadata: BABYLON.IObjectMetadata = mesh.metadata as BABYLON.IObjectMetadata;
                            if (metadata.components != null && metadata.components.length > 0) {
                                metadata.components.forEach((meshscript) => {
                                    if (meshscript.klass != null && meshscript.klass !== "" && meshscript.klass !== "BABYLON.SceneComponent" && meshscript.klass !== "BABYLON.OrthoController") {
                                        let MeshComponentClass = BABYLON.Utilities.InstantiateClass(meshscript.klass);
                                        if (MeshComponentClass != null) {
                                            meshscript.instance = new MeshComponentClass(mesh, scene, meshscript.update, meshscript.properties);
                                            if (meshscript.instance != null) {
                                                if (ticklist != null) ticklist.push(meshscript);
                                            }
                                        }
                                    }
                                });
                            }
                            // Setup socket meshes
                            BABYLON.SceneManager.setupSocketMeshes(mesh, scene);
                            // Setup detail meshes
                            if (mesh.metadata != null && mesh.metadata.properties && mesh.metadata.properties != null) {
                                if (mesh.metadata.properties.defaultEllipsoid && mesh.metadata.properties.defaultEllipsoid != null && mesh.metadata.properties.defaultEllipsoid.length >= 3) {
                                    let defaultEllipsoid:number[] = mesh.metadata.properties.defaultEllipsoid;
                                    mesh.ellipsoid = new BABYLON.Vector3(defaultEllipsoid[0], defaultEllipsoid[1], defaultEllipsoid[2]);
                                }
                                if (mesh.metadata.properties.ellipsoidOffset && mesh.metadata.properties.ellipsoidOffset != null && mesh.metadata.properties.ellipsoidOffset.length >= 3) {
                                    let ellipsoidOffset:number[] = mesh.metadata.properties.ellipsoidOffset;
                                    mesh.ellipsoidOffset = new BABYLON.Vector3(ellipsoidOffset[0], ellipsoidOffset[1], ellipsoidOffset[2]);
                                }
                                if (mesh.metadata.properties.hasOwnProperty("freezeWorldMatrix") && mesh.metadata.properties.freezeWorldMatrix === true) {
                                    mesh.freezeWorldMatrix();
                                }
                                if (mesh.metadata.properties.hasOwnProperty("convertToUnIndexed") && mesh.metadata.properties.convertToUnIndexed === true) {
                                    (<BABYLON.Mesh>mesh).convertToUnIndexedMesh();
                                }
                                if (mesh.metadata.properties.hasOwnProperty("convertToFlatShaded") && mesh.metadata.properties.convertToFlatShaded === true) {
                                    (<BABYLON.Mesh>mesh).convertToFlatShadedMesh();
                                }
                                if (mesh.metadata.properties.hasOwnProperty("pickableWithRay")) {
                                    mesh.isPickable = mesh.metadata.properties.pickableWithRay;
                                }
                            }
                            // Setup terrain meshes
                            let isTerrainMesh:boolean = BABYLON.SceneManager.setupTerrainMeshes(mesh, scene);
                            // Setup physics imposters
                            if (isTerrainMesh === false && mesh.metadata.properties != null && mesh.metadata.properties.physicsTag != null) {
                                let physicsTag: string = mesh.metadata.properties.physicsTag;
                                let physicsMass: number = mesh.metadata.properties.physicsMass;
                                let physicsDetach: boolean = mesh.metadata.properties.physicsDetach;
                                let physicsFriction: number = mesh.metadata.properties.physicsFriction;
                                let physicsRestitution: number = mesh.metadata.properties.physicsRestitution;
                                let physicsImpostor: number = mesh.metadata.properties.physicsImpostor;
                                let physicsRotation: number = mesh.metadata.properties.physicsRotation;
                                let physicsCollisions: boolean = mesh.metadata.properties.physicsCollisions;
                                let physicsCollisionGroup: number = mesh.metadata.properties.physicsCollisionGroup;
                                let physicsCollisionMask: number = mesh.metadata.properties.physicsCollisionMask;
                                let physicsEnginePlugin: number = mesh.metadata.properties.physicsEnginePlugin;
                                // Detach physics parent
                                if (physicsDetach === true && mesh.parent != null) {
                                    BABYLON.Utilities.ResetPhysicsPosition(mesh.position, mesh.parent);
                                    mesh.parent = null;
                                }
                                mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, physicsImpostor, { mass:physicsMass, friction:physicsFriction, restitution:physicsRestitution }, scene);
                                BABYLON.SceneManager.setupPhysicsImpostor(mesh, physicsEnginePlugin, physicsFriction, physicsCollisions, physicsRotation, physicsCollisionGroup, physicsCollisionMask);
                            }
                        }
                    }
                });
                BABYLON.SceneManager.postParseSceneMeshes(meshes, scene);
            }
        }
        private static postParseSceneMeshes(meshes: BABYLON.AbstractMesh[], scene: BABYLON.Scene):void {
            if (meshes != null && meshes.length > 0) {
                let statics:any = {};
                meshes.forEach((mesh) => {
                    if (mesh.metadata != null && mesh.metadata.api) {
                        if (BABYLON.SceneManager.staticVertexLimit === false) {
                            // Parse Static Vertex Limit Meshes
                            if (mesh.metadata.layerIndex === BABYLON.SceneManager.StaticIndex) {
                                if (mesh.name.indexOf("_StaticMesh_") >= 0) {
                                    mesh.metadata.layerIndex = -99;
                                    let key:string = mesh.material.id;
                                    let list:BABYLON.Mesh[] = null;
                                    if (statics.hasOwnProperty(key)) {
                                        list = statics[key];
                                    } else {
                                        list = [];
                                        statics[key] = list;
                                    }
                                    list.push(mesh as BABYLON.Mesh);
                                }
                            }
                        }
                    }
                });
                // Merge Static Vertex Limit Meshes
                if (BABYLON.SceneManager.staticVertexLimit === false) {
                    for (let key in statics) {
                        if (statics.hasOwnProperty(key)) {
                            let list:BABYLON.Mesh[] = statics[key];
                            if (list != null && list.length > 1) {
                                let staticParent:BABYLON.Node = list[0].parent;
                                let staticMesh:BABYLON.Mesh = BABYLON.Mesh.MergeMeshes(list, true, true);
                                if (staticMesh != null) staticMesh.parent = staticParent;
                            }
                        }
                    }
                }
            }
        }
        private static setupLodGroups(mesh:BABYLON.AbstractMesh, scene: BABYLON.Scene, prefab:boolean):void {
            if (mesh != null && mesh.metadata != null && mesh.metadata.properties && mesh.metadata.properties != null && mesh.metadata.properties.lodGroupInfo && mesh.metadata.properties.lodGroupInfo != null) {
                let lodIndex:number = 0;
                let lodGroup:any = mesh.metadata.properties.lodGroupInfo;
                let lodDetails:any[] = lodGroup.lodDetails;
                let startCulling:number = lodGroup.startCulling;
                //let lodCount:number = lodGroup.lodCount;
                //let fadeMode:string = lodGroup.fadeMode;
                //let crossFading:boolean = lodGroup.crossFading;
                //let nearClipingPlane:number = lodGroup.nearClipingPlane;
                //let farClipingPlane:number = lodGroup.farClipingPlane;
                let searchMeshes:BABYLON.AbstractMesh[] = mesh.getChildMeshes(false);
                if (searchMeshes == null) {
                    searchMeshes = [mesh];
                } else {
                    searchMeshes.unshift(mesh);
                }
                if (lodDetails != null && lodDetails.length > 0) {
                    let masterLevel:BABYLON.Mesh = null;
                    lodDetails.forEach((detail) => {
                        //let startingPercent:number = detail.startingPercent;
                        //let endingPercent:number = detail.endingPercent;
                        //let rendererCount:number = detail.rendererCount;
                        //let lodDistance:number = detail.lodDistance;
                        let lodRenderers:any[] = detail.lodRenderers;
                        let startRange:number = detail.startRange;
                        if (lodRenderers != null && lodRenderers.length > 0) {
                            let renderer:any = lodRenderers[0];
                            let name:string = renderer.name;
                            let check:AbstractMesh = BABYLON.SceneManager.FindMesh(name, searchMeshes, BABYLON.SearchType.IndexOf);
                            if (check != null) {
                                // Parse all lod detail group levels
                                if (masterLevel == null) {
                                    //LOD0 - Master Level
                                    masterLevel = check as BABYLON.Mesh;
                                    masterLevel.setEnabled(false);
                                }
                                if (check != masterLevel) {
                                    // LOD++ Additional Levels
                                    check.parent = masterLevel;
                                    masterLevel.addLODLevel(startRange, check as BABYLON.Mesh);
                                }
                            } else {
                                BABYLON.Tools.Warn("Babylon.js cannot locate lod renderer: '" + name + "' for: " + mesh.name + " at group index: " + lodIndex.toString());
                            }
                        } else {
                            BABYLON.Tools.Warn("Babylon.js no level of detail renderers found for: " + mesh.name + " at group index: " + lodIndex.toString());
                        }
                        lodIndex++;
                    });
                    // Master lod detail complete
                    if (masterLevel != null) {
                        if (startCulling > 0.0) masterLevel.addLODLevel(startCulling, null);
                        masterLevel.setEnabled(true);
                    }
                }
                // Clear lod group info
                mesh.metadata.properties.lodGroupInfo = null;                
            }
        }        
        private static setupTerrainMeshes(mesh:BABYLON.AbstractMesh, scene: BABYLON.Scene):boolean {
            let result:boolean = false;
            if (mesh != null && mesh.metadata != null && mesh.metadata.properties && mesh.metadata.properties != null && mesh.metadata.properties.terrain === true) {
                result = true;
                let index:number = 0;
                // ..
                //let position:number[] = (mesh.metadata.properties.position) ? mesh.metadata.properties.position : [0.0, 0.0, 0.0];
                //let rotation:number[] = (mesh.metadata.properties.rotation) ? mesh.metadata.properties.rotation : [0.0, 0.0, 0.0];
                //let scaling:number[] = (mesh.metadata.properties.scaling) ? mesh.metadata.properties.scaling : [1.0, 1.0, 1.0];
                //
                let segments:number = (mesh.metadata.properties.segments) ? mesh.metadata.properties.segments : 1;
                let colliders:number = (mesh.metadata.properties.colliders) ? mesh.metadata.properties.colliders : 1;
                // ..
                let physics:boolean = (mesh.metadata.properties.physicsTag != null);
                let physicsTag: string = (mesh.metadata.properties.physicsTag) ? mesh.metadata.properties.physicsTag : "";
                let physicsMass: number = (mesh.metadata.properties.physicsMass) ? mesh.metadata.properties.physicsMass : 0;
                let physicsDetach: boolean = (mesh.metadata.properties.physicsDetach) ? mesh.metadata.properties.physicsDetach : false;
                let physicsFriction: number = (mesh.metadata.properties.physicsFriction) ? mesh.metadata.properties.physicsFriction : 0;
                let physicsRestitution: number = (mesh.metadata.properties.physicsRestitution) ? mesh.metadata.properties.physicsRestitution : 0;
                let physicsImpostor: number = (mesh.metadata.properties.physicsImpostor) ? mesh.metadata.properties.physicsImpostor : 0;
                let physicsRotation: number = (mesh.metadata.properties.physicsRotation) ? mesh.metadata.properties.physicsRotation : 0;
                let physicsCollisions: boolean = (mesh.metadata.properties.physicsCollisions) ? mesh.metadata.properties.physicsCollisions : false;
                let physicsCollisionGroup: number = (mesh.metadata.properties.physicsCollisionGroup) ? mesh.metadata.properties.physicsCollisionGroup : 0;
                let physicsCollisionMask: number = (mesh.metadata.properties.physicsCollisionMask) ? mesh.metadata.properties.physicsCollisionMask : 0;
                let physicsEnginePlugin: number = (mesh.metadata.properties.physicsEnginePlugin) ? mesh.metadata.properties.physicsEnginePlugin : 0;
                let terrainLodGroupInfo: any = (mesh.metadata.properties.terrainLodGroupInfo) ? mesh.metadata.properties.terrainLodGroupInfo : null;
                let terrainCollision:boolean = (mesh.metadata.properties.terrainCollision) ? mesh.metadata.properties.terrainCollision : false;
                // ..
                //let terrainWidth:number = (mesh.metadata.properties.width) ? mesh.metadata.properties.width : 1;
                //let terrainLength:number = (mesh.metadata.properties.length) ? mesh.metadata.properties.length : 1;
                //let terrainHeight:number = (mesh.metadata.properties.height) ? mesh.metadata.properties.height : 1;
                //let terrainResolution:number = (mesh.metadata.properties.resolution) ? mesh.metadata.properties.resolution: 1;
                // ..
                let lodDetails:any[] = (terrainLodGroupInfo != null) ? terrainLodGroupInfo.lodDetails : null;
                let lodSettings:ISimplificationSettings[] = null
                // Validate default lod group level
                if (lodDetails != null && lodDetails.length > 0) {
                    index = 0;
                    for (index = 0; index < lodDetails.length; index++) {
                        const detail:any = lodDetails[index];
                        let percent:number = detail.startingPercent;
                        if (percent < 1) {
                            let distance:number = detail.startRange;
                            if (lodSettings == null) lodSettings = [];
                            lodSettings.push(new BABYLON.SimplificationSettings(percent, distance, true));
                        }
                    }
                }
                // ..
                // Process ground meshes
                // ..
                let children = mesh.getChildMeshes(true);
                if (children != null && children.length > 0) {
                    children.forEach((child) => {
                        let ground:BABYLON.Mesh = child as BABYLON.Mesh;
                        let collider:boolean = (ground.name.indexOf(".Collider.") >= 0);
                        if (collider === false && lodSettings != null) {
                            ground.simplify(lodSettings, true, BABYLON.SimplificationType.QUADRATIC);
                        }
                        // ..
                        //console.log("===> Parsed terrain ground mesh " + ground.name + " with " + ground.getTotalVertices().toString() + " vertices");
                        // ..
                        ground.checkCollisions = terrainCollision;
                        if (colliders > 1) {
                            // Validate Collision Meshes - ???                     
                            if (collider === true) {
                                if (physics === true) {
                                    ground.parent = null;
                                    // Detach physics parent
                                    if (physicsDetach === true && ground.parent != null) {
                                        BABYLON.Utilities.ResetPhysicsPosition(ground.position, ground.parent);
                                        ground.parent = null;
                                    }
                                    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, physicsImpostor, { mass:physicsMass, friction:physicsFriction, restitution:physicsRestitution }, scene);
                                    BABYLON.SceneManager.setupPhysicsImpostor(ground, physicsEnginePlugin, physicsFriction, physicsCollisions, physicsRotation, physicsCollisionGroup, physicsCollisionMask);
                                }
                            }
                        } else {
                            if (physics === true) {
                                ground.parent = null;
                                // Detach physics parent
                                if (physicsDetach === true && ground.parent != null) {
                                    BABYLON.Utilities.ResetPhysicsPosition(ground.position, ground.parent);
                                    ground.parent = null;
                                }
                                ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, physicsImpostor, { mass:physicsMass, friction:physicsFriction, restitution:physicsRestitution }, scene);
                                BABYLON.SceneManager.setupPhysicsImpostor(ground, physicsEnginePlugin, physicsFriction, physicsCollisions, physicsRotation, physicsCollisionGroup, physicsCollisionMask);
                            }
                        }
                    });
                }
                // ..
                // Proccess tree meshes
                // ..
                index = 0;
                if (mesh.metadata.properties.treeInstances && mesh.metadata.properties.treeInstances != null && mesh.metadata.properties.treeInstances.length > 0) {
                    let trees:any[] = mesh.metadata.properties.treeInstances;
                    trees.forEach((tree) => {
                        index++;
                        let tree_prefab:string = tree.prefab;
                        // ..
                        // let tree_color:number[] = tree.color;
                        // let tree_lightmapColor:number[] = tree.lightmapColor;
                        // ..
                        let tree_heightScale:number = tree.heightScale;
                        let tree_position:number[] = tree.position;
                        let tree_rotation:number = tree.rotation;
                        let tree_widthScale:number = tree.widthScale;
                        let tree_label:string = (tree_prefab + "_" + index.toString());
                        // ..
                        // Instantiate tree prefab
                        // ..
                        let prefab_parent:BABYLON.Node = mesh;
                        let prefab_position:Vector3 = new BABYLON.Vector3(tree_position[0], tree_position[1], tree_position[2]);
                        let prefab_rotation:Vector3 = new BABYLON.Vector3(0.0, tree_rotation, 0.0);
                        let prefab_scaling:BABYLON.Vector3 = new BABYLON.Vector3(tree_widthScale, tree_heightScale, tree_widthScale);
                        BABYLON.SceneManager.GetInstance().onready(()=>{
                            BABYLON.SceneManager.GetInstance().instantiatePrefab(tree_prefab, tree_label, prefab_position, prefab_rotation, prefab_scaling, prefab_parent);
                        });
                    });
                }
                // ..
                // Proccess detail meshes
                // ..
                index = 0;
                if (mesh.metadata.properties.detailPrototypes && mesh.metadata.properties.detailPrototypes != null && mesh.metadata.properties.detailPrototypes.length > 0) {
                    let details:any[] = mesh.metadata.properties.detailPrototypes;
                    details.forEach((detail) => {
                        // TODO: Place terrain grass and detail prototypes
                    });
                }
            }
            return result;
        }        
        private static setupSocketMeshes(mesh:BABYLON.AbstractMesh, scene: BABYLON.Scene):void {
            if (mesh != null && mesh.metadata.socketList != null && mesh.metadata.socketList.length > 0) {
                if (mesh.skeleton != null && mesh.skeleton.bones != null && mesh.skeleton.bones.length > 0) {
                    let sockets:BABYLON.ISocketData[] = mesh.metadata.socketList;
                    sockets.forEach((socket) => {
                        if (mesh.skeleton.bones.length >= (socket.boneIndex + 1)) {
                            let bone:BABYLON.Bone = mesh.skeleton.bones[socket.boneIndex];
                            let bname:string = socket.boneName + ".Socket.";
                            if (mesh.parent != null) bname += (mesh.parent.name + ".");
                            bname += (mesh.name + "." + BABYLON.Tools.RandomId());
                            if (BABYLON.SceneManager.showDebugSockets === true) {
                                socket.socketMesh = BABYLON.Mesh.CreateBox(bname, BABYLON.SceneManager.socketColliderSize, scene);
                                socket.socketMesh.visibility = BABYLON.SceneManager.colliderVisibility;
                            } else {
                                socket.socketMesh = new BABYLON.Mesh(bname, scene);
                            }
                            socket.socketMesh.position = new BABYLON.Vector3(socket.positionX, socket.positionY, socket.positionZ);
                            socket.socketMesh.rotation = new BABYLON.Vector3(socket.rotationX, socket.rotationY, socket.rotationZ);
                            socket.socketMesh.checkCollisions = false;
                            socket.socketMesh.attachToBone(bone, mesh);
                        }
                    });
                }
            }
        }
        private static setupSharedSkeleton(mesh:BABYLON.AbstractMesh, scene: BABYLON.Scene):void {
            if (mesh != null && mesh.metadata != null && mesh.metadata.properties && mesh.metadata.properties != null && mesh.metadata.properties.sharedSkeletonId && mesh.metadata.properties.sharedSkeletonId !== "") {
                let sharedSkeletonId:string = mesh.metadata.properties.sharedSkeletonId;
                let source:BABYLON.AbstractMesh = scene.getMeshByID(sharedSkeletonId);
                if (source != null && source.skeleton != null) {
                    mesh.metadata.animationClips = null;
                    mesh.skeleton = source.skeleton;
                } else {
                    BABYLON.Tools.Warn("Failed to locate source skeleton: " + sharedSkeletonId);
                }
            }
        }
        private static setupPhysicsImpostor(physicsMesh:BABYLON.AbstractMesh, plugin:number, friction:number, collisions:boolean, rotation:number, collisionFilterGroup:number = 1, collisionFilterMask:number = 1):void {
            if (physicsMesh != null && physicsMesh.physicsImpostor != null) {
                physicsMesh.physicsImpostor.executeNativeFunction((word:any, body:any) => {
                    if (body) {
                        if (plugin === 0) {
                            // Cannon Physics Engine Plugin
                            body.linearDamping = friction;
                            body.angularDamping = friction;
                            body.collisionResponse = collisions;
                            body.collisionFilterGroup = collisionFilterGroup;
                            body.collisionFilterMask = collisionFilterMask;
                            body.angularVelocity.x = 0;
                            body.angularVelocity.y = 0;
                            body.angularVelocity.z = 0;
                            body.velocity.x = 0;
                            body.velocity.y = 0;
                            body.velocity.z = 0;
                            if (rotation === 1) {
                                body.fixedRotation = true;
                                body.updateMassProperties();
                            }
                        }
                    } else {
                        BABYLON.Tools.Warn("[Physics Native Function]: Null imposter body encountered for physcis mesh " + physicsMesh.name + ". Check physics mesh has no parent transform.");
                    }
                });
                if (BABYLON.SceneManager.showPhysicsImposter === true) {
                    BABYLON.SceneManager.GetInstance().showDebugImposter(physicsMesh);
                }
            }
        }
        private static setupCameraRigOptions(camera:BABYLON.Camera, scene:BABYLON.Scene):void {
            if (camera != null && camera.metadata != null && camera.metadata.properties != null) {
                // Set Main Camera
                if (camera.metadata.properties.mainCamera && BABYLON.SceneManager.GetInstance()._playerOneCamera == null) {
                    camera.viewport = new BABYLON.Viewport(0, 0, 1, 1);
                    BABYLON.SceneManager.GetInstance()._playerOneCamera = camera;
                    if (camera.metadata.properties.hasOwnProperty("stereoscopicSideBySide")) {
                        BABYLON.SceneManager.stereoCameras = camera.metadata.properties.stereoscopicSideBySide;
                    }
                }

                let followTarget:string = camera.metadata.properties.followTarget;
                let followRadius:number = camera.metadata.properties.followRadius;
                let followHeightOffset:number = camera.metadata.properties.followHeightOffset;
                let followRotationOffset:number = camera.metadata.properties.followRotationOffset;
                let followCameraAcceleration:number = camera.metadata.properties.followCameraAcceleration;
                let followMaxCameraSpeed:number = camera.metadata.properties.followMaxCameraSpeed;

                let arcFollowTarget:string = camera.metadata.properties.followTarget;
                let arcRotateAlpha:number = camera.metadata.properties.arcRotateAlpha;
                let arcRotateBeta:number = camera.metadata.properties.arcRotateBeta;
                let arcRotateRadius:number = camera.metadata.properties.arcRotateRadius;
                let arcRotateTarget:number[] = camera.metadata.properties.arcRotateTarget;
                let arcRotateLowerRadiusLimit:number = camera.metadata.properties.arcRotateLowerRadiusLimit;
                let arcRotateUpperRadiusLimit:number = camera.metadata.properties.arcRotateUpperRadiusLimit;
                let arcRotateCollisionRadius:number[] = camera.metadata.properties.arcRotateCollisionRadius;
                let arcRotateWheelDeltaPercentage:number = camera.metadata.properties.arcRotateWheelDeltaPercentage;

                let webvrEnableHelper:boolean = camera.metadata.properties.webvrUniversalCamera;
                let webvrDisplayGazeIcon:boolean = camera.metadata.properties.webvrDisplayGazeIcon;
                let webvrEnableInteractions:boolean = camera.metadata.properties.webvrEnableInteractions;
                let webvrEnableTeleportation:boolean = camera.metadata.properties.webvrEnableTeleportation;
                let webvrDeviceOrientationCamera:boolean = camera.metadata.properties.webvrDeviceOrientationCamera;
                let webvrFallbackFreeCamera:boolean = camera.metadata.properties.webvrFallbackFreeCamera;
                let webvrControllerPrefabs:boolean = camera.metadata.properties.webvrControllerPrefabs;
                let webvrInitialController:number = camera.metadata.properties.webvrInitialController;
                let webvrLeftControllerPrefab:string = camera.metadata.properties.webvrLeftControllerPrefab;
                let webvrRightControllerPrefab:string = camera.metadata.properties.webvrRightControllerPrefab;
                let webvrDisplayLaserBeam:boolean = camera.metadata.properties.webvrDisplayLaserBeam;
                let webvrUseCustomButton:boolean = camera.metadata.properties.webvrUseCustomButton;
                let webvrButtonElementID:string = camera.metadata.properties.webvrButtonElementID;
                let webvrRayCastLength:number = camera.metadata.properties.webvrRayCastLength;
                let webvrDefaultHeight:number = camera.metadata.properties.webvrDefaultHeight;
                let webvrPositionScale:number = camera.metadata.properties.webvrPositionScale;
                let webvrFloorMeshesTags:string = camera.metadata.properties.webvrFloorMeshesTags;
                let webvrFloorMeshes:BABYLON.Mesh[] = null;

                // Parse Camera Metadata Options
                if (camera.metadata.properties.cameraType) {
                    let cameraType:string = camera.metadata.properties.cameraType;
                    if (cameraType === "UniversalCamera") {
                        if (camera.metadata.properties.mainCamera && camera.metadata.properties.localMultiPlayerViewCamera) {
                            let mainCamera:BABYLON.Camera = camera;
                            let mainCameraName = mainCamera.name;
                            // ..
                            let playerTwoName:string = mainCameraName + ".2";
                            let playerTwoCamera:BABYLON.Camera = mainCamera.clone(playerTwoName);
                            playerTwoCamera.name = playerTwoName;
                            playerTwoCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                            playerTwoCamera.setEnabled(false);
                            BABYLON.SceneManager.GetInstance()._playerTwoCamera = playerTwoCamera;
                            //
                            let playerThreeName:string = mainCameraName + ".3";
                            let playerThreeCamera:BABYLON.Camera = mainCamera.clone(playerThreeName);
                            playerThreeCamera.name = playerThreeName;
                            playerThreeCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                            playerThreeCamera.setEnabled(false);                            
                            BABYLON.SceneManager.GetInstance()._playerThreeCamera = playerThreeCamera;
                            // ..
                            let playerFourName:string = mainCameraName + ".4";
                            let playerFourCamera:BABYLON.Camera = mainCamera.clone(playerFourName);
                            playerFourCamera.name = playerFourName;
                            playerFourCamera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
                            playerFourCamera.setEnabled(false);
                            BABYLON.SceneManager.GetInstance()._playerFourCamera = playerFourCamera;
                            // ..
                            mainCamera.name = mainCameraName + ".1";
                            BABYLON.SceneManager.multiPlayerView = true;                                
                        }
                    } else if (cameraType === "FollowCamera") {
                        let followCamera:BABYLON.FollowCamera = camera as BABYLON.FollowCamera;
                        if (followTarget != null && followTarget !== "") {
                            let targetMesh:BABYLON.AbstractMesh = scene.getMeshByID(followTarget);
                            if (targetMesh != null) {
                                followCamera.position = targetMesh.position.clone();
                                followCamera.lockedTarget = targetMesh;
                            }
                        }
                        // Follow Camera Options
                        followCamera.radius = followRadius;
                        followCamera.heightOffset = followHeightOffset;
                        followCamera.rotationOffset = followRotationOffset;
                        followCamera.cameraAcceleration = followCameraAcceleration;
                        followCamera.maxCameraSpeed = followMaxCameraSpeed;
                    } else if (cameraType === "ArcFollowCamera") {
                        let arcFollowCamera:BABYLON.ArcFollowCamera = camera as BABYLON.ArcFollowCamera;
                        if (arcFollowTarget != null && arcFollowTarget !== "") {
                            let arcTargetMesh:BABYLON.AbstractMesh = scene.getMeshByID(arcFollowTarget);
                            if (arcTargetMesh != null) {
                                arcFollowCamera.position = arcTargetMesh.position.clone();
                                arcFollowCamera.lockedTarget = arcTargetMesh;
                            }
                        }
                        // Arc Follow Camera Options
                        arcFollowCamera.alpha = arcRotateAlpha;
                        arcFollowCamera.beta = arcRotateBeta;
                        arcFollowCamera.radius = arcRotateRadius;
                        //arcFollowCamera.radius = followRadius;
                    } else if (cameraType === "ArcRotateCamera") {
                        let arcRotateCamera:BABYLON.ArcRotateCamera = camera as BABYLON.ArcRotateCamera;
                        // Arc Rotate Camera Options
                        arcRotateCamera.alpha = arcRotateAlpha;
                        arcRotateCamera.beta = arcRotateBeta;
                        arcRotateCamera.radius = arcRotateRadius;
                        arcRotateCamera.target = BABYLON.Vector3.FromArray(arcRotateTarget);
                        arcRotateCamera.lowerRadiusLimit = arcRotateLowerRadiusLimit;
                        arcRotateCamera.upperRadiusLimit = arcRotateUpperRadiusLimit;
                        arcRotateCamera.collisionRadius = BABYLON.Vector3.FromArray(arcRotateCollisionRadius);
                        arcRotateCamera.wheelDeltaPercentage = arcRotateWheelDeltaPercentage;
                    }
                }
                // Check Orthographic Camera Mode
                if (camera.mode === BABYLON.Camera.ORTHOGRAPHIC_CAMERA) {
                    let size:number = camera.metadata.properties.orthographicSize || 5;
                    let klass:string = "BABYLON.OrthoController";
                    let resize:boolean = (scene.metadata != null && scene.metadata.properties != null && scene.metadata.properties.hasOwnProperty("resizeCameras")) ? scene.metadata.properties.resizeCameras : true;
                    let metadata: BABYLON.IObjectMetadata = camera.metadata as BABYLON.IObjectMetadata;
                    if (metadata.components == null) {
                        metadata.components = [];
                    }
                    let OrthoComponentClass = BABYLON.Utilities.InstantiateClass(klass);
                    if (OrthoComponentClass != null) {
                        let bag:any = { orthoSize: size, resizeCameras: resize };
                        let ortho:BABYLON.SceneComponent = new OrthoComponentClass(camera, scene, false, bag);
                        if (ortho != null) {
                            let compscript: BABYLON.IScriptComponent = {
                                order: 1000,
                                name: "EditorScriptComponent",
                                klass: klass,
                                update: false,
                                properties: bag,
                                instance: ortho,
                                tag: {}
                            };
                            metadata.components.push(compscript);
                            ortho.register();
                        }
                    }
                }
                // Check Virtual Reality Helper Mode
                if (camera.metadata.properties.mainCamera && webvrEnableHelper === true) {
                    BABYLON.SceneManager.GetInstance().onready(() => {
                        let customButtonFlag:boolean = false;
                        let customButtonElement:HTMLButtonElement = null;
                        if (webvrUseCustomButton === true && webvrButtonElementID != null && webvrButtonElementID !== "") {
                            let buttonElement = document.getElementById(webvrButtonElementID);
                            if (buttonElement != null) {
                                customButtonFlag = true;
                                customButtonElement = buttonElement as HTMLButtonElement;
                            } else {
                                BABYLON.Tools.Warn("Babylon.js failed to locate webvr button element id: " + webvrButtonElementID);
                            }
                        }
                        //let webvrHelperOptions:BABYLON.VRExperienceHelperOptions = null;
                        let webvrHelperOptions:{} = null;
                        if (webvrFloorMeshesTags == null || webvrFloorMeshesTags === "") webvrFloorMeshesTags = "Navigation";
                        if (webvrEnableTeleportation === true) webvrFloorMeshes = scene.getMeshesByTags(webvrFloorMeshesTags);
                        if (webvrEnableTeleportation === true && webvrFloorMeshes != null && webvrFloorMeshes.length > 0) {
                            webvrHelperOptions = { 
                                createDeviceOrientationCamera: webvrDeviceOrientationCamera,
                                createFallbackVRDeviceOrientationFreeCamera: webvrFallbackFreeCamera,
                                laserToggle: webvrDisplayLaserBeam,
                                useCustomVRButton: customButtonFlag,
                                customVRButton: customButtonElement,
                                rayLength: webvrRayCastLength,
                                defaultHeight: webvrDefaultHeight,
                                positionScale: webvrPositionScale,
                                floorMeshes: webvrFloorMeshes
                            }
                        } else {
                            webvrHelperOptions = { 
                                createDeviceOrientationCamera: webvrDeviceOrientationCamera,
                                createFallbackVRDeviceOrientationFreeCamera: webvrFallbackFreeCamera,
                                laserToggle: webvrDisplayLaserBeam,
                                useCustomVRButton: customButtonFlag,
                                customVRButton: customButtonElement,
                                rayLength: webvrRayCastLength,
                                defaultHeight: webvrDefaultHeight,
                                positionScale: webvrPositionScale
                            }
                        }
                        // ..
                        if (webvrControllerPrefabs === true) {
                            BABYLON.SceneManager.me._leftControllerPrefab = BABYLON.SceneManager.me.instantiatePrefab(webvrLeftControllerPrefab, webvrLeftControllerPrefab);
                            if (BABYLON.SceneManager.me._leftControllerPrefab != null) BABYLON.SceneManager.me._leftControllerPrefab.setEnabled(false);
                            BABYLON.SceneManager.me._rightControllerPrefab = BABYLON.SceneManager.me.instantiatePrefab(webvrRightControllerPrefab, webvrRightControllerPrefab);
                            if (BABYLON.SceneManager.me._rightControllerPrefab != null) BABYLON.SceneManager.me._rightControllerPrefab.setEnabled(false);
                            // ..
                            if (BABYLON.SceneManager.me._leftControllerPrefab == null && BABYLON.SceneManager.me._rightControllerPrefab != null) {
                                BABYLON.SceneManager.me._leftControllerPrefab = BABYLON.SceneManager.me.instantiatePrefab(webvrRightControllerPrefab, webvrLeftControllerPrefab);
                                if (BABYLON.SceneManager.me._leftControllerPrefab != null) BABYLON.SceneManager.me._leftControllerPrefab.setEnabled(false);
                            } else if (BABYLON.SceneManager.me._rightControllerPrefab == null && BABYLON.SceneManager.me._leftControllerPrefab != null) {
                                BABYLON.SceneManager.me._rightControllerPrefab = BABYLON.SceneManager.me.instantiatePrefab(webvrLeftControllerPrefab, webvrRightControllerPrefab);
                                if (BABYLON.SceneManager.me._rightControllerPrefab != null) BABYLON.SceneManager.me._rightControllerPrefab.setEnabled(false);
                            }
                        }
                        // ..
                        BABYLON.SceneManager.me._defaultControllers = true;
                        let vrhelper:BABYLON.VRExperienceHelper = scene.createDefaultVRExperience(webvrHelperOptions);
                        if (vrhelper != null) {
                            vrhelper.displayGaze = webvrDisplayGazeIcon;
                            if (webvrEnableInteractions === true) vrhelper.enableInteractions();
                            vrhelper.onControllerMeshLoadedObservable.add((controller:BABYLON.WebVRController, state:BABYLON.EventState) => {
                                if (controller.hand === "left") {
                                    BABYLON.SceneManager.me._leftControllerStick = controller;
                                    // ..
                                    BABYLON.SceneManager.me._leftControllerStick.onMainButtonStateChangedObservable.add(BABYLON.SceneManager.inputManagerLeftControllerMainButton);
                                    BABYLON.SceneManager.me._leftControllerStick.onPadStateChangedObservable.add(BABYLON.SceneManager.inputManagerLeftControllerPadState);
                                    BABYLON.SceneManager.me._leftControllerStick.onPadValuesChangedObservable.add(BABYLON.SceneManager.inputManagerLeftControllerPadValues);
                                    BABYLON.SceneManager.me._leftControllerStick.onSecondaryButtonStateChangedObservable.add(BABYLON.SceneManager.inputManagerLeftControllerAuxButton);
                                    BABYLON.SceneManager.me._leftControllerStick.onTriggerStateChangedObservable.add(BABYLON.SceneManager.inputManagerLeftControllerTriggered);
                                    // ..
                                    if (webvrControllerPrefabs === true && webvrInitialController === 0) {
                                        if (BABYLON.SceneManager.me._leftControllerPrefab != null) {
                                            BABYLON.SceneManager.me._leftControllerStick.mesh.setEnabled(false);
                                            BABYLON.SceneManager.me._leftControllerStick.attachToMesh(BABYLON.SceneManager.me._leftControllerPrefab);
                                            BABYLON.SceneManager.me._leftControllerStick.mesh.setEnabled(true);
                                            BABYLON.SceneManager.me._defaultControllers = false;
                                        } else {
                                            BABYLON.Tools.Warn("Babylon.js failed to instantiate left controller prefab. Using default controller.");
                                        }
                                    }
                                } else if (controller.hand === "right") {
                                    BABYLON.SceneManager.me._rightControllerStick = controller;
                                    // ..
                                    BABYLON.SceneManager.me._rightControllerStick.onMainButtonStateChangedObservable.add(BABYLON.SceneManager.inputManagerRightControllerMainButton);
                                    BABYLON.SceneManager.me._rightControllerStick.onPadStateChangedObservable.add(BABYLON.SceneManager.inputManagerRightControllerPadState);
                                    BABYLON.SceneManager.me._rightControllerStick.onPadValuesChangedObservable.add(BABYLON.SceneManager.inputManagerRightControllerPadValues);
                                    BABYLON.SceneManager.me._rightControllerStick.onSecondaryButtonStateChangedObservable.add(BABYLON.SceneManager.inputManagerRightControllerAuxButton);
                                    BABYLON.SceneManager.me._rightControllerStick.onTriggerStateChangedObservable.add(BABYLON.SceneManager.inputManagerRightControllerTriggered);
                                    // ..
                                    if (webvrControllerPrefabs === true && webvrInitialController === 0) {
                                        if (BABYLON.SceneManager.me._rightControllerPrefab != null) {
                                            BABYLON.SceneManager.me._rightControllerStick.mesh.setEnabled(false);
                                            BABYLON.SceneManager.me._rightControllerStick.attachToMesh(BABYLON.SceneManager.me._rightControllerPrefab);
                                            BABYLON.SceneManager.me._rightControllerStick.mesh.setEnabled(true);
                                            BABYLON.SceneManager.me._defaultControllers = false;
                                        } else {
                                            BABYLON.Tools.Warn("Babylon.js failed to instantiate left controller prefab. Using default controller.");
                                        }
                                    }
                                }
                            });
                        }
                        BABYLON.SceneManager.GetInstance()._vrhelper = vrhelper;                        
                    });
                }
            }
        }

        // ********************************** //
        // *  Public Scene Locate Support   * //
        // ********************************** //
        
        public static LocateOwnerSocketMesh(name:string, owner: BABYLON.AbstractMesh, searchType:BABYLON.SearchType = BABYLON.SearchType.StartsWith):BABYLON.Mesh {
            let result:BABYLON.Mesh = null;
            if (owner != null && owner.metadata && owner.metadata != null && owner.metadata.socketList && owner.metadata.socketList != null && owner.metadata.socketList.length > 0) {
                let sockets:BABYLON.ISocketData[] = owner.metadata.socketList;
                let search:BABYLON.SearchType = (searchType != null) ? searchType : BABYLON.SearchType.StartsWith;
                let index:number = 0;
                for(index = 0; index < sockets.length; index++) {
                    let socket:BABYLON.ISocketData = sockets[index];
                    if (search === BABYLON.SearchType.StartsWith) {
                        if (BABYLON.Utilities.StartsWith(socket.boneName, name)) {
                            result = socket.socketMesh;
                            break;
                        }
                    } else if (search === BABYLON.SearchType.EndsWith) {
                        if (BABYLON.Utilities.EndsWith(socket.boneName, name)) {
                            result = socket.socketMesh;
                            break;
                        }
                    } else if (search === BABYLON.SearchType.IndexOf) {
                        if (socket.boneName.indexOf(name) >= 0) {
                            result = socket.socketMesh;
                            break;
                        }
                    } else {
                        if (socket.boneName === name) {
                            result = socket.socketMesh;
                            break;
                        }
                    }
                }
            }
            return result;
        }
        public static LocateOwnerSocketMeshes(owner: BABYLON.AbstractMesh):BABYLON.Mesh[] {
            let result:BABYLON.Mesh[] = null;
            if (owner != null && owner.metadata && owner.metadata != null && owner.metadata.socketList && owner.metadata.socketList != null && owner.metadata.socketList.length > 0) {
                result = [];
                let sockets:BABYLON.ISocketData[] = owner.metadata.socketList;
                sockets.forEach((socket) => {
                    result.push(socket.socketMesh);                    
                });
            }
            return result;
        }
        public static LocateOwnerAnimationTrack(index:number, owner: BABYLON.Entity, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null):BABYLON.Animation {
            let result:BABYLON.Animation = null;
            if (owner != null && owner instanceof BABYLON.AbstractMesh) {
                let mesh:BABYLON.AbstractMesh = owner as BABYLON.AbstractMesh;
                if (mesh.skeleton != null && mesh.skeleton.bones != null && mesh.skeleton.bones.length > 0 && mesh.skeleton.bones[0]) {
                    let bone:BABYLON.Bone = mesh.skeleton.bones[0];
                    if (bone.animations != null && bone.animations.length > index && bone.animations[index] != null) {
                        result = bone.animations[index];
                    }
                }
            }
            if (result == null && owner.animations != null && owner.animations.length > index && owner.animations[index] != null) {
                result = owner.animations[index];
            }
            if (result == null && owner instanceof BABYLON.AbstractMesh) {
                let children:BABYLON.AbstractMesh[] = owner.getChildMeshes(directDecendantsOnly, predicate);
                if (children != null && children.length > 0) {
                    for (let i:number = 0; i < children.length; i++) {
                        let child:BABYLON.AbstractMesh = children[i];
                        if (child.skeleton != null && child.skeleton.bones != null && child.skeleton.bones.length > 0 && child.skeleton.bones[0]) {
                            let cbone:BABYLON.Bone = child.skeleton.bones[0];
                            if (cbone.animations != null && cbone.animations.length > index && cbone.animations[index] != null) {
                                result = cbone.animations[index];
                                break;
                            }
                        }
                        if (result == null && child.animations != null && child.animations.length > 0 && child.animations.length > index && child.animations[index] != null) {
                            result = child.animations[index];
                            break;
                        }
                    }
                }
            }
            return result;            
        }
        
        // *********************************** //
        // *   Public Scene Tools Support    * //
        // *********************************** //

        public static DestroyComponents(owner: BABYLON.Entity, destroyMetadata: boolean = true): void {
            if (owner != null && owner.metadata != null && owner.metadata.api) {
                let metadata: BABYLON.IObjectMetadata = owner.metadata as BABYLON.IObjectMetadata;
                if (metadata.components != null && metadata.components.length > 0) {
                    metadata.components.forEach((ownerscript) => {
                        if (ownerscript.instance != null) {
                            BABYLON.SceneComponent.DestroyInstance(ownerscript.instance);
                            ownerscript.instance = null;
                        }
                    });
                }
                if (metadata.socketList != null && metadata.socketList.length > 0) {
                    metadata.socketList.forEach((socketdata) => {
                        if (socketdata.socketMesh != null) {
                            socketdata.socketMesh.dispose();
                            socketdata.socketMesh = null;
                        }
                    });
                }
                if (destroyMetadata) {
                    if (owner.metadata.components != null) {
                        owner.metadata.components = null;
                    }
                    if (owner.metadata.properties != null) {
                        owner.metadata.properties = null;
                    }
                    if (owner.metadata.socketList != null) {
                        owner.metadata.socketList = null;
                    }
                    if (owner.metadata.animationClips != null) {
                        owner.metadata.animationClips = null;
                    }
                    if (owner.metadata.animationEvents != null) {
                        owner.metadata.animationEvents = null;
                    }
                    if (owner.metadata.collisionEvent != null) {
                        owner.metadata.collisionEvent = null;
                    }
                    owner.metadata = null;
                }
            }
        }
        
        public static DisposeOwner(owner: BABYLON.Entity)
        {
            let nx:string = owner.name
            if (owner instanceof BABYLON.AbstractMesh) {
                let mesh:BABYLON.AbstractMesh = owner as BABYLON.AbstractMesh;
                if (mesh.physicsImpostor != null) {
                    mesh.physicsImpostor.dispose();
                    mesh.physicsImpostor = null;
                }
            }
            owner.dispose();
        }

        // *********************************** //
        // *   Public Blend Tools Support    * //
        // *********************************** //

        public static SetAnimationLooping(owner:BABYLON.IAnimatable, loopBehavior:number): void {
            if (owner != null && owner.animations != null && owner.animations.length > 0) {
                let animations = owner.animations;
                for (let index = 0; index < animations.length; index++) {
                    animations[index].loopMode = loopBehavior;
                }
            }
        }
        
        public static SetSkeletonLooping(skeleton:BABYLON.Skeleton, loopBehavior:number) {
            if (skeleton != null) {
                if (skeleton.animationPropertiesOverride == null) skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
                skeleton.animationPropertiesOverride.loopMode = loopBehavior;
            }
        }
    
        public static SetSkeletonBlending(skeleton:BABYLON.Skeleton, blendingSpeed:number) {
            if (skeleton != null) {
                if (skeleton.animationPropertiesOverride == null) skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
                skeleton.animationPropertiesOverride.enableBlending = (blendingSpeed > 0.0);
                skeleton.animationPropertiesOverride.blendingSpeed = blendingSpeed;
            }
        }

        public static SetSkeletonProperties(skeleton:BABYLON.Skeleton, loopBehavior:number, blendingSpeed:number) {
            if (skeleton != null) {
                if (skeleton.animationPropertiesOverride == null) skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
                skeleton.animationPropertiesOverride.loopMode = loopBehavior;
                skeleton.animationPropertiesOverride.enableBlending = (blendingSpeed > 0.0);
                skeleton.animationPropertiesOverride.blendingSpeed = blendingSpeed;
            }
        }

        // *********************************** //
        // *   Public Helper Tools Support   * //
        // *********************************** //

        public static FindMesh(name:string, meshes:BABYLON.AbstractMesh[], searchType:BABYLON.SearchType = BABYLON.SearchType.StartsWith):BABYLON.AbstractMesh {
            let result:BABYLON.AbstractMesh = null;
            let search:BABYLON.SearchType = (searchType != null) ? searchType : BABYLON.SearchType.StartsWith;
            if (meshes != null && meshes.length > 0) {
                for (let i:number = 0; i < meshes.length; i++) {
                    let mesh:BABYLON.AbstractMesh = meshes[i];
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

        public static CloneValue(source:any, destinationObject:any): any {
            if (!source)
                return null;

            if (source instanceof BABYLON.Mesh) {
                return null;
            }

            if (source instanceof BABYLON.SubMesh) {
                return source.clone(destinationObject);
            } else if (source.clone) {
                return source.clone();
            }
            return source;
        }

        public static CloneMetadata(source:BABYLON.IObjectMetadata): BABYLON.IObjectMetadata {
            let result:BABYLON.IObjectMetadata = null;
            if (source != null) {
                let new_properties:any = {};
                BABYLON.SceneManager.DeepCopyProperties(source.properties, new_properties);
                
                let new_navagent:any = {};
                BABYLON.SceneManager.DeepCopyProperties(source.navAgent, new_navagent);

                let new_meshlink:any = {};
                BABYLON.SceneManager.DeepCopyProperties(source.meshLink, new_meshlink);

                let new_meshobstacle:any = {};
                BABYLON.SceneManager.DeepCopyProperties(source.meshObstacle, new_meshobstacle);
                
                let new_socketlist:any[] = [];
                if (source.socketList != null && source.socketList.length > 0) {
                    source.socketList.forEach((socket) => {
                        let new_socket_properties:any = {};
                        BABYLON.SceneManager.DeepCopyProperties(socket, new_socket_properties);
                        new_socketlist.push(new_socket_properties);
                    });
                }
               
                let new_animationClips:any[] = [];
                if (source.animationClips != null && source.animationClips.length > 0) {
                    source.animationClips.forEach((clip) => {
                        let new_clip_properties:any = {};
                        BABYLON.SceneManager.DeepCopyProperties(clip, new_clip_properties);
                        new_animationClips.push(new_clip_properties);
                    });
                }

                let new_animationevents:any[] = [];
                if (source.animationEvents != null && source.animationEvents.length > 0) {
                    source.animationEvents.forEach((evt) => {
                        let new_event_properties:any = {};
                        BABYLON.SceneManager.DeepCopyProperties(evt, new_event_properties);
                        new_animationevents.push(new_event_properties);
                    });
                }

                let new_components:BABYLON.IScriptComponent[] = [];
                if (source.components != null && source.components.length > 0) {
                    source.components.forEach((comp) => {
                        let new_comp_properties:any = {};
                        BABYLON.SceneManager.DeepCopyProperties(comp.properties, new_comp_properties);
                        new_components.push({ name: comp.name, klass: comp.klass, order:comp.order, tag: comp.tag, update: comp.update, properties: new_comp_properties, instance: null });
                    });
                }

                result = {
                    api: true,
                    type: source.type,
                    parsed: false,
                    prefab: false,
                    state: {},
                    objectName: source.objectName,
                    objectId: BABYLON.Tools.RandomId(),
                    tagName: source.tagName,
                    layerIndex: (source.prefab === false) ? source.layerIndex : 0,
                    layerName: (source.prefab === false) ? source.layerName : "Default",
                    areaIndex: source.areaIndex,
                    shadowCastingMode: source.shadowCastingMode,
                    navAgent: new_navagent,
                    meshLink: new_meshlink,
                    meshObstacle: new_meshobstacle,
                    socketList: new_socketlist,
                    animationClips: new_animationClips,
                    animationEvents: new_animationClips,
                    collisionEvent: null,
                    components: new_components,
                    properties: new_properties
                };
            }
            return result;
        }

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
                                    let clonedValue = BABYLON.SceneManager.CloneValue(sourceValue[index], destination);
                                    if (destination[prop].indexOf(clonedValue) === -1) { // Test if auto inject was not done
                                        destination[prop].push(clonedValue);
                                    }
                                }
                            } else {
                                destination[prop] = sourceValue.slice(0);
                            }
                        }
                    } else {
                        destination[prop] = BABYLON.SceneManager.CloneValue(sourceValue, destination);
                    }
                } else {
                    destination[prop] = sourceValue;
                }
            }
        }

        // ************************************* //
        // * Babylon Windows Runtime Functions * //
        // ************************************* //
        
        /** Set the Windows Runtime preferred launch windowing mode. */
        public static SetWindowsLaunchMode(mode:Windows.UI.ViewManagement.ApplicationViewWindowingMode): void {
            if (BABYLON.SceneManager.IsWindows() && typeof Windows.UI.ViewManagement !== "undefined" &&typeof Windows.UI.ViewManagement.ApplicationView !== "undefined") {
                Windows.UI.ViewManagement.ApplicationView.preferredLaunchWindowingMode = Windows.UI.ViewManagement.ApplicationViewWindowingMode.fullScreen
            }
        }

        /** Quit the Windows Runtime host application. */
        public static QuitWindowsApplication(): void {
            if (BABYLON.SceneManager.IsWindows()) {
                window.close();
            }
        }

        // ************************************* //
        // *  Babylon Web Assembly Functions   * //
        // ************************************* //
        
        /** Are web assembly platform services available and user enabled. */
        public static IsWebAssemblyPluginEnabled(): boolean {
            return ((<any>window).isWebAssemblyPluginEnabled) ? (<any>window).isWebAssemblyPluginEnabled() : false;
        }
        /** Loads and instantiates a web assembly module */
        public static LoadWebAssemblyModule(url:string, importObject:any):Promise<any> {
            return fetch(url).then(response => response.arrayBuffer()).then(bytes => (<any>window).WebAssembly.instantiate(bytes, importObject)).then(results => results.instance);
        }

        // *************************************** //
        // * Babylon Xbox Live Sign In Functions * //
        // *************************************** //

        /** Are xbox live platform services available and user enabled. */
        public static IsXboxLivePluginEnabled(): boolean {
            return ((<any>window).isXboxLivePluginEnabled) ? (<any>window).isXboxLivePluginEnabled() : false;
        }
        /** Is xbox live user signed in if platform services enabled. */
        public static IsXboxLiveUserSignedIn(systemUser: Windows.System.User = null, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): boolean {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                let user: Microsoft.Xbox.Services.System.XboxLiveUser = (systemUser != null) ? BABYLON.SceneManager.GetXboxLiveSystemUser(systemUser, player) : BABYLON.SceneManager.GetXboxLiveUser(player);
                return (user != null && user.isSignedIn == true);
            } else {
                return false;
            }
        }
        /** Validated sign in xbox live user if platform services available. */
        public static XboxLiveUserSignIn(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): void {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                BABYLON.SceneManager.XboxLiveUserSilentSignIn(player, (first: Microsoft.Xbox.Services.System.SignInResult) => {
                    if (first.status === Microsoft.Xbox.Services.System.SignInStatus.userInteractionRequired) {
                        BABYLON.SceneManager.XboxLiveUserDialogSignIn(player, (second: Microsoft.Xbox.Services.System.SignInResult) => {
                            if (oncomplete) oncomplete(second);
                        }, onerror, onprogress);
                    } else {
                        if (oncomplete) oncomplete(first);
                    }
                }, onerror, onprogress);
            }
        }
        /** Silent sign in xbox live user if platform services available. */
        public static XboxLiveUserSilentSignIn(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void> {
            return (BABYLON.SceneManager.IsXboxLivePluginEnabled()) ? BABYLON.SceneManager.GetXboxLiveUser(player).signInSilentlyAsync(null).then(oncomplete, onerror, onprogress) : null;
        }
        /** Dialog sign in xbox live user if platform services available. */
        public static XboxLiveUserDialogSignIn(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void> {
            return (BABYLON.SceneManager.IsXboxLivePluginEnabled()) ? BABYLON.SceneManager.GetXboxLiveUser(player).signInAsync(null).then(oncomplete, onerror, onprogress) : null;
        }
        /** Loads a xbox live user profile if platform services available. */
        public static LoadXboxLiveUserProfile(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One, oncomplete?: (result: Microsoft.Xbox.Services.Social.XboxUserProfile) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void> {
            return (BABYLON.SceneManager.IsXboxLivePluginEnabled()) ? BABYLON.SceneManager.GetXboxLiveUserContext(player).profileService.getUserProfileAsync(BABYLON.SceneManager.GetXboxLiveUser(player).xboxUserId).then(oncomplete, onerror, onprogress) : null;
        }
        
        // ************************************** //
        // * Babylon Xbox Live Player Functions * //
        // ************************************** //
       
        /** Get xbox live user if platform services available. */
        public static GetXboxLiveUser(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): Microsoft.Xbox.Services.System.XboxLiveUser {
            let user: Microsoft.Xbox.Services.System.XboxLiveUser = null;
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                switch (player) {
                    case BABYLON.PlayerNumber.One:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveUserOne();
                        break;
                    case BABYLON.PlayerNumber.Two:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveUserTwo();
                        break;
                    case BABYLON.PlayerNumber.Three:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveUserThree();
                        break;
                    case BABYLON.PlayerNumber.Four:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveUserFour();
                        break;
               }
            }
            return user;
        }
        /** Get xbox live user if platform services available. */
        public static GetXboxLiveSystemUser(systemUser: Windows.System.User, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): Microsoft.Xbox.Services.System.XboxLiveUser {
            let user: Microsoft.Xbox.Services.System.XboxLiveUser = null;
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                switch (player) {
                    case BABYLON.PlayerNumber.One:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveSystemUserOne(systemUser);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveSystemUserTwo(systemUser);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveSystemUserThree(systemUser);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveSystemUserFour(systemUser);
                        break;
               }
            }
            return user;
        }
        /** Get xbox live user context if platform services available. */
        public static GetXboxLiveUserContext(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): Microsoft.Xbox.Services.XboxLiveContext {
            let context: Microsoft.Xbox.Services.XboxLiveContext = null;
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                switch (player) {
                    case BABYLON.PlayerNumber.One:
                        context = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveContextOne();
                        break;
                    case BABYLON.PlayerNumber.Two:
                        context = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveContextTwo();
                        break;
                    case BABYLON.PlayerNumber.Three:
                        context = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveContextThree();
                        break;
                    case BABYLON.PlayerNumber.Four:
                        context = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveContextFour();
                        break;
               }
            }
            return context;
        }
        /** Resets xbox live user context if platform services available. */
        public static ResetXboxLiveUserContext(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                    switch (player) {
                        case BABYLON.PlayerNumber.One:
                            (<any>window).BabylonToolkit.XboxLive.Plugin.resetXboxLiveUserContextOne()
                            break;
                        case BABYLON.PlayerNumber.Two:
                            (<any>window).BabylonToolkit.XboxLive.Plugin.resetXboxLiveUserContextTwo()
                            break;
                        case BABYLON.PlayerNumber.Three:
                            (<any>window).BabylonToolkit.XboxLive.Plugin.resetXboxLiveUserContextThree()
                            break;
                        case BABYLON.PlayerNumber.Four:
                            (<any>window).BabylonToolkit.XboxLive.Plugin.resetXboxLiveUserContextFour()
                            break;
                   }
                }
            }
        }

        // *************************************** //
        // * Babylon Xbox Live Context Functions * //
        // *************************************** //

        /** Get xbox live context property if platform services available. */
        public static GetXboxLiveContextProperty(name:any): any {
            return (BABYLON.SceneManager.IsXboxLivePluginEnabled()) ? (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveContextProperty(name) : null;
        }
        /** Get xbox live context property if platform services available. */
        public static SetXboxLiveContextProperty(name: any, property: any): void {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                (<any>window).BabylonToolkit.XboxLive.Plugin.setXboxLiveContextProperty(name, property);
            }
        }
        /** Resets xbox live property context bag if platform services available. */
        public static ResetXboxLivePropertyContexts(): void {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                (<any>window).BabylonToolkit.XboxLive.Plugin.resetXboxLivePropertyContexts()
            }
        }

        // **************************************** //
        // * Babylon Xbox Live Sign Out Functions * //
        // **************************************** //
        
        /** Sets the Xbox User Sign Out Complete Handler */
        public static SetXboxLiveSignOutHandler(handler: (result: Microsoft.Xbox.Services.System.SignOutCompletedEventArgs) => void = null): void {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                (<any>window).BabylonToolkit.XboxLive.Plugin.onusersignout = handler;
            }
        }
    }
}
