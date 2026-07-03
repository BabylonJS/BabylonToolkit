/** UMD Type References */
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    var Navigation: typeof globalThis.Navigation;
    /**
    * Babylon toolkit scene manager class
    * @class SceneManager - All rights reserved (c) 2024 Mackey Kinard
    */
    class SceneManager {
        /** Gets the toolkit framework version string (9.15.1 - R1) */
        static get Version(): string;
        /** Gets the toolkit framework copyright notice */
        static get Copyright(): string;
        /** Set global system options */
        static GlobalOptions: any;
        /** Set global window state */
        static WindowState: any;
        /** Default network game server endpoint (without slash suffix) */
        static ServerEndPoint: string;
        /** Set the allow debug mode flag */
        static EnableDebugMode: boolean;
        /** Set the allow user input flag */
        static EnableUserInput: boolean;
        /** Enable the main page render loop */
        static RenderLoopReady: boolean;
        /** Pauses the main page render loop */
        static PauseRenderLoop: boolean;
        /** Defines whether the toolkit scene simulation is currently playing (true) or paused for editing (false). Defaults to true so shipped runtimes are unaffected. The editor sets this false for a static edit mode and true to enter live play mode. Use SetScenePlaying() to also freeze/resume the physics world. */
        static ScenePlaying: boolean;
        /** Cached physics engine time step used to resume the simulation after a pause. */
        private static PhysicsTimeStep;
        /** The webgl render context has been lost flag */
        static LostRenderContext: boolean;
        /** Set the preload auto update progress flag */
        static AutoUpdateProgress: boolean;
        /** Set the capsule collider shape type */
        static PhysicsCapsuleShape: number;
        /** The animation start mode. Defaults to NONE. */
        static AnimationStartMode: number;
        /** When loading glTF animations, which are defined in seconds, target them to this FPS. Defaults to 60 for new behavior. Set to 1 for old behavior */
        static AnimationTargetFps: number;
        /** Set the default convex hull shape margin size */
        static DefaultConvexHullMargin: number;
        /** Set the default height field shape margin size */
        static DefaultHeightFieldMargin: number;
        /** Set the ambient light intensity factor */
        static AmbientLightIntensity: number;
        /** Set the point light intensity factor */
        static PointLightIntensity: number;
        /** Set the spot light intensity factor */
        static SpotLightIntensity: number;
        /** Set the directional light intensity factor */
        static DirectionalLightIntensity: number;
        /** Set the exp fog density scale factor */
        static FogExpDensityScale: number;
        /** Set the exp2 fog density scale factor */
        static FogExp2DensityScale: number;
        /** Set the linear fog density scale factor */
        static FogLinearDensityScale: number;
        /** Set the terrain shader color correction value */
        static TerrainColorCorrection: number;
        /** Set the allow camera movement flag */
        static AllowCameraMovement: boolean;
        /** Set the allow camera rotation flag */
        static AllowCameraRotation: boolean;
        /** Set the virtual joystick enabled flag */
        static VirtualJoystickEnabled: boolean;
        /** Gets the total game time in milliseconds */
        static GameTimeMilliseconds: number;
        /** Set the parse script component flag */
        static ParseScriptComponents: boolean;
        /** Set the auto load script bundles flag */
        static AutoLoadScriptBundles: boolean;
        /** Set the ES6 strip namespace prefix flag */
        static AutoStripNamespacePrefix: boolean;
        /** Set the universal module definition flag */
        static UniversalModuleDefinition: boolean;
        /** Returns a Promise that resolves after the specfied time */
        static WaitForSeconds: (seconds: number) => Promise<void>;
        /** Register handler that is triggered before the main scene render loop (engine.html) */
        static OnPreRenderLoopObservable: BABYLON.Observable<void>;
        /** Register handler that is triggered before the main scene render loop (engine.html) */
        static OnPostRenderLoopObservable: BABYLON.Observable<void>;
        /** Register handler that is triggered when the scene is ready (engine.html) */
        static OnSceneReadyObservable: BABYLON.Observable<string>;
        /** Register handler that is triggered when then engine has been resized (engine.html) */
        static OnEngineResizeObservable: BABYLON.Observable<BABYLON.AbstractEngine>;
        /** Register handler that is triggered when the scene has been loaded (engine.html) */
        static OnLoadCompleteObservable: BABYLON.Observable<BABYLON.AbstractEngine>;
        /** Register handler that is triggered when then webgl context need to be rebuilt (engine.html) */
        static OnRebuildContextObservable: BABYLON.Observable<BABYLON.AbstractEngine>;
        /** Register asset manager progress event (engine.html) */
        static OnAssetManagerProgress: (event: ProgressEvent) => void;
        /** All layer mask value */
        static readonly AllLayerMask: number;
        /** Default layer mask value */
        static readonly DefaultLayerMask: number;
        /** Hidden layer mask value (Unity Layer 28 - Value: 268435456) */
        static readonly HiddenLayerMask: number;
        private static _HideLoadingScreen;
        static CVTOOLS_NAME: string;
        static CVTOOLS_MESH: string;
        static CVTOOLS_HAND: string;
        static CVTOOLS_NAME_REGISTERED: boolean;
        static CVTOOLS_MESH_REGISTERED: boolean;
        static CVTOOLS_HAND_REGISTERED: boolean;
        static GetEngine(scene: BABYLON.Scene): BABYLON.Engine | BABYLON.WebGPUEngine;
        static GetClass(name: string): any;
        static RegisterClass(name: string, klass: any): void;
        /** Gets the auxiliary data string from the scene metadata */
        static GetAuxiliaryData(scene: BABYLON.Scene): string;
        /** Sets the auxiliary data string in the scene metadata */
        static SetAuxiliaryData(scene: BABYLON.Scene, data: string): void;
        private static _EventBus;
        /** Default global event message bus
         * @example
         * // Handle myevent message
         * TOOLKIT.SceneManager.EventBus.OnMessage("myevent", (data:string) => {
         *    console.log("My Event Data: " + data);
         * });
         *
         * // Post myevent message
         * TOOLKIT.SceneManager.EventBus.PostMessage("myevent", "Hello World!");
        */
        static get EventBus(): TOOLKIT.GlobalMessageBus;
        /** Gets the babylon toolkit playground default project script bundle cdn address
         * @address https://cdn.jsdelivr.net/gh/BabylonJS/BabylonToolkit@master/Runtime/
         */
        static get PlaygroundCdn(): string;
        /** Gets the babylon toolkit  playground repo address
         * Contains interactive exported demo asset files
         * @address https://www.babylontoolkit.com/playground/
         */
        static get PlaygroundRepo(): string;
        /**
         * Initialize the babylon toolkit playground environment (KEYWORD)
         * @param engine The engine instance.
         * @param options The runtime options.
         * @returns a waitable promise.
         */
        static InitializePlayground(engine: BABYLON.Engine | BABYLON.WebGPUEngine | BABYLON.AbstractEngine, options?: TOOLKIT.IRuntimeOptions, scene?: BABYLON.Scene, inputOptions?: {
            contextMenu?: boolean;
            pointerLock?: boolean;
            preventDefault?: boolean;
            useCapture?: boolean;
        }): Promise<void>;
        /**
         * Initialize the babylon toolkit runtime environment (REQUIRED)
         * @param engine The engine instance.
         * @param options The runtime options.
         * @returns a waitable promise.
         */
        static InitializeRuntime(engine: BABYLON.Engine | BABYLON.WebGPUEngine | BABYLON.AbstractEngine, options?: TOOLKIT.IRuntimeOptions, scene?: BABYLON.Scene, inputOptions?: {
            contextMenu?: boolean;
            pointerLock?: boolean;
            preventDefault?: boolean;
            useCapture?: boolean;
        }): Promise<void>;
        /**
         * Initialize the babylon toolkit physics engine
         * @param scene The scene instance.
         * @param gravity The gravity vector for the physics engine. If null, defaults to (0, -9.81, 0).
         * @param autoDelete If true, the physics engine will be automatically deleted from the global scope when the scene is disposed. Default is true.
         * @param useDeltaForWorldStep If true, the physics plugin will use the delta time between frames for world stepping. Default is false, which uses a fixed time step.
         * @param hpInjection Optional Havok physics injection object to pass to the Havok plugin constructor. This can be used to inject a custom Havok instance or configuration.
         * @param pluginParameters Optional Havok plugin parameters object to pass to the Havok plugin constructor. This can be used to configure the Havok plugin with specific settings.
         * @returns a waitable promise.
         */
        static InitializePhysicsEngine(scene: BABYLON.Scene, gravity?: BABYLON.Vector3, autoDelete?: boolean, useDeltaForWorldStep?: boolean, hpInjection?: any, pluginParameters?: BABYLON.HavokPluginParameters): Promise<void>;
        /**
         * Initialize the scene loader plugin
         */
        static InitializeSceneLoaderPlugin(): void;
        /**
         * Sets the on scene ready handler then starts the assets manager loadAsync function
         * @param assetsManager The list of required scene filenames to check ready state.
         * @param requiredFilenames The list of required scene filenames to check ready state.
         * @param readyHandler The function that will be called when all scene files are ready.
         * @param maxTimeout The timeout value to wait for all required scene files to fully load. Default 60 seconds.
         * @param debugMode The flag to enable on scene ready debug messages. Default false.
         */
        static LoadRuntimeAssets(assetsManager: BABYLON.AssetsManager, requiredFilenames: string[], readyHandler: () => void, maxTimeout?: number, debugMode?: boolean): Promise<void>;
        /**
         * Shows the default loading screen panel
         * @param engine The engine instance.
         * @param hideLoadingUIWithEngine hide the loading screen with engine.hideLoadingUI. When set to false, you must manually hide the loading screen using TOOLKIT.SceneManager.HideLoadingScreen when the scene is ready. Default true.
         * @param defaultLoadingUIMarginTop The top margin of the loading text. Default 150px.
         */
        static ShowLoadingScreen(engine: BABYLON.Engine | BABYLON.WebGPUEngine | BABYLON.AbstractEngine, hideLoadingUIWithEngine?: boolean, defaultLoadingUIMarginTop?: string): void;
        /**
         * Hides the default loading screen panel
         * @param engine The engine instance.
         */
        static HideLoadingScreen(engine: BABYLON.Engine | BABYLON.WebGPUEngine | BABYLON.AbstractEngine, fade?: boolean): void;
        /** Force the engine loading screen to be hidden (Triple Check Loading Screen Hidden) */
        static ForceHideLoadingScreen(): void;
        private static DoForceHideLoadingScreen;
        /** Focus the scene rendering canvas
         * @param scene The scene instance.
         */
        static FocusRenderCanvas(scene: BABYLON.Scene): void;
        /** Show the splash screen */
        static ShowSplashScreen(): void;
        /** Hide the splash screen with optional delay and fade effect */
        static HideSplashScreen(scene?: BABYLON.Scene, delayMs?: number): void;
        /** Update the status text on the splash screen (Direct Access Hack) */
        static UpdateSplashScreenStatus(text: string): void;
        private static SceneLoaderFileNames;
        private static SceneLoaderPropertyBag;
        private static SceneLoaderHandledFlag;
        /**
         * Sets the handler that executes when all required scene files are ready
         * @param filenames The list of required scene filenames to check ready state.
         * @param handler The function that will be called when all scene files are ready
         * @param timeout The timeout value to wait for all required scene files to fully load. Default 60 seconds.
         */
        static SetOnSceneReadyHandler(filenames: string[], handler: () => void, timeout?: number, debug?: boolean): void;
        private static SceneParsingEnabled;
        /** Enable scene loader parsing plugin */
        static EnableSceneParsing(enabled: boolean): void;
        /** Is scene loader parsing plugin enabled */
        static IsSceneParsingEnabled(): boolean;
        /** Has the specfied scene already been preloaded */
        static HasSceneBeenPreLoaded(scene: BABYLON.Scene): boolean;
        /** Get the scene default skybox mesh */
        static GetDefaultSkybox(scene: BABYLON.Scene): BABYLON.AbstractMesh;
        /** Get the scene default intenisty factor */
        static GetIntensityFactor(): number;
        /** Get the system render quality local storage setting. */
        static GetRenderQuality(): TOOLKIT.RenderQuality;
        /** Set the system render quality local storage setting. */
        static SetRenderQuality(quality: TOOLKIT.RenderQuality): void;
        /** Gets the current engine version string info. */
        static GetEngineVersionString(scene: BABYLON.Scene): string;
        /** Get the scene image based lighting spherical polynomial */
        static GetImageBasedLighting(scene: BABYLON.Scene): BABYLON.SphericalPolynomial;
        /** Store data object of function on the local window state. */
        static SetWindowState(name: string, data: any): void;
        /** Retrieve data object or function from the local window state. */
        static GetWindowState<T>(name: string): T;
        /** Are scene manager debugging services available. */
        static IsDebugMode(): boolean;
        /** Send log data directly to the console. */
        static ConsoleLog(...data: any[]): void;
        /** Send info data directly to the console. */
        static ConsoleInfo(...data: any[]): void;
        /** Send warning data directly to the console. */
        static ConsoleWarn(...data: any[]): void;
        /** Send error data directly to the console. */
        static ConsoleError(...data: any[]): void;
        /** Logs a message to the console using the babylon logging system. */
        static LogMessage(message: string): void;
        /** Logs a warning to the console using babylon logging system. */
        static LogWarning(warning: string): void;
        /** Logs a error to the console using babylon logging system. */
        static LogError(error: string): void;
        /** Get the current time in seconds */
        static GetTime(): number;
        /** Get the current time in milliseconds */
        static GetTimeMs(): number;
        /** Get the total game time in seconds */
        static GetGameTime(): number;
        /** Get the total game time in milliseconds */
        static GetGameTimeMs(): number;
        /** Get the current delta time in seconds */
        static GetDeltaTime(scene: BABYLON.Scene, applyAnimationRatio?: boolean): number;
        /** Get the current delta time in seconds */
        static GetDeltaSeconds(scene: BABYLON.Scene, applyAnimationRatio?: boolean): number;
        /** Get the current delta time in milliseconds */
        static GetDeltaMilliseconds(scene: BABYLON.Scene, applyAnimationRatio?: boolean): number;
        /** Get system time in milleseconds */
        static GetTimeMilliseconds(): number;
        /** Get the delta time animation ratio for 60 fps */
        static GetAnimationRatio(scene: BABYLON.Scene): number;
        /**
         * Sets whether the toolkit scene simulation is playing (true) or paused for editing (false).
         * When paused: the script component life-cycle (awake/start/update/late/step/fixed) is halted and the
         * physics world simulation is frozen (time step set to 0). When resumed: the physics time step is
         * restored and the game time baseline is reset. Shipped runtimes default to playing so are unaffected.
         * @param playing defines whether the scene simulation should run.
         * @param scene defines the optional target scene (defaults to the last created scene).
         */
        static SetScenePlaying(playing: boolean, scene?: BABYLON.Scene): void;
        /** Run a function on the next render loop. */
        static RunOnce(scene: BABYLON.Scene, func: () => void, timeout?: number): void;
        /** Disposes entire scene and release all resources */
        static DisposeScene(scene: BABYLON.Scene, clearColor?: BABYLON.Color4): void;
        /** Safely destroy transform node */
        static SafeDestroy(transform: BABYLON.TransformNode, delay?: number, disable?: boolean): void;
        /** Get the root url the last scene properties was loaded from */
        static GetRootUrl(scene: BABYLON.Scene): string;
        /** Sets the root url the last scene properties was loaded from */
        static SetRootUrl(scene: BABYLON.Scene, url: string): void;
        /** Get the file name the last scene properties was loaded from */
        static GetSceneFile(scene: BABYLON.Scene): string;
        /** Sets the file name the last scene properties was loaded from */
        static SetSceneFile(scene: BABYLON.Scene, fileName: string): void;
        /** Add a shadow castor mesh to a shadow light. */
        static AddShadowCaster(light: BABYLON.ShadowLight, transform: BABYLON.TransformNode, children?: boolean): void;
        /** Add multiple shadow castor meshes to a shadow light. */
        static AddShadowCastersToLight(light: BABYLON.IShadowLight, transforms: BABYLON.TransformNode[], includeChildren?: boolean): void;
        /** Refresh the shadow cascades for a shadow light. */
        static RefreshShadowCascades(light: BABYLON.ShadowLight): void;
        /** Refresh all shadow cascades for all shadow lights in the scene. */
        static RefreshAllShadowCascades(scene: BABYLON.Scene): void;
        private static PhysicsViewersEnabled;
        static IsPhysicsViewerEnabled(): boolean;
        static TogglePhysicsViewer(scene: BABYLON.Scene): void;
        /** Get managed asset container. */
        static GetImportMeshes(scene: BABYLON.Scene, name: string): BABYLON.AbstractMesh[];
        /** Get managed asset container map. */
        static GetImportMeshesMap(scene: BABYLON.Scene): Map<string, BABYLON.AbstractMesh[]>;
        /** Clear all managed asset containers. */
        static ClearImportMeshes(scene: BABYLON.Scene): void;
        /** Set managed asset container. */
        static RegisterImportMeshes(scene: BABYLON.Scene, name: string, meshes: BABYLON.AbstractMesh[]): void;
        /**
         * Import cached meshes into a scene
         * @param meshNames an array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
         * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
         * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
         * @param scene the instance of BABYLON.Scene to append to
         * @param onSuccess a callback with a list of imported meshes, particleSystems, skeletons, and animationGroups when import succeeds
         * @param onProgress a callback with a progress event for each file being loaded
         * @param onError a callback with the scene, a message, and possibly an exception when import fails
         * @param pluginExtension the extension used to determine the plugin
         * @param name defines the name of the file, if the data is binary
         * @returns The loaded plugin
         */
        static LoadImportMeshes(meshNames: string | readonly string[] | null | undefined, rootUrl: string, sceneFilename?: string, scene?: BABYLON.Nullable<BABYLON.Scene>, onSuccess?: (container: BABYLON.AbstractMesh[]) => void, onProgress?: (event: BABYLON.ISceneLoaderProgressEvent) => void, onError?: (scene: BABYLON.Scene, message: string, exception?: any) => void, pluginExtension?: BABYLON.Nullable<string>, name?: string): BABYLON.Nullable<BABYLON.ISceneLoaderPlugin | BABYLON.ISceneLoaderPluginAsync>;
        /**
         * Import cached meshes into a scene
         * @param meshNames an array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
         * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
         * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
         * @param scene the instance of BABYLON.Scene to append to
         * @param onProgress a callback with a progress event for each file being loaded
         * @param pluginExtension the extension used to determine the plugin
         * @param name defines the name of the file
         * @returns The loaded list of imported meshes, particle systems, skeletons, and animation groups
         */
        static LoadImportMeshesAsync(meshNames: string | readonly string[] | null | undefined, rootUrl: string, sceneFilename?: string, scene?: BABYLON.Nullable<BABYLON.Scene>, onProgress?: (event: BABYLON.ISceneLoaderProgressEvent) => void, pluginExtension?: BABYLON.Nullable<string>, name?: string): Promise<BABYLON.AbstractMesh[]>;
        /** Get managed asset container. */
        static GetAssetContainer(scene: BABYLON.Scene, name: string): BABYLON.AssetContainer;
        /** Get managed asset container map. */
        static GetAssetContainerMap(scene: BABYLON.Scene): Map<string, BABYLON.AssetContainer>;
        /** Clear all managed asset containers. */
        static ClearAssetContainers(scene: BABYLON.Scene): void;
        /** Set managed asset container. */
        static RegisterAssetContainer(scene: BABYLON.Scene, name: string, container: BABYLON.AssetContainer): void;
        /**
         * Load a scene into a cached asset container
         * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
         * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
         * @param scene is the instance of BABYLON.Scene to append to (default: last created scene)
         * @param onSuccess a callback with the scene when import succeeds
         * @param onProgress a callback with a progress event for each file being loaded
         * @param onError a callback with the scene, a message, and possibly an exception when import fails
         * @param pluginExtension the extension used to determine the plugin
         * @param name defines the filename, if the data is binary
         * @returns The loaded plugin
         */
        static LoadAssetContainer(rootUrl: string, sceneFilename?: string, scene?: BABYLON.Scene, onSuccess?: (container: BABYLON.AssetContainer) => void, onProgress?: (event: BABYLON.ISceneLoaderProgressEvent) => void, onError?: (scene: BABYLON.Scene, message: string, exception?: any) => void, pluginExtension?: BABYLON.Nullable<string>, name?: string): void;
        /**
         * Load a scene into a cached asset container
         * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
         * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene (default: empty string)
         * @param scene is the instance of Scene to append to
         * @param onProgress a callback with a progress event for each file being loaded
         * @param pluginExtension the extension used to determine the plugin
         * @param name defines the filename, if the data is binary
         * @returns The loaded asset container
         */
        static LoadAssetContainerAsync(rootUrl: string, sceneFilename?: string, scene?: BABYLON.Nullable<BABYLON.Scene>, onProgress?: BABYLON.Nullable<(event: BABYLON.ISceneLoaderProgressEvent) => void>, pluginExtension?: BABYLON.Nullable<string>, name?: string): Promise<BABYLON.AssetContainer>;
        /** Gets the specified mesh by name from scene. */
        static GetMesh(scene: BABYLON.Scene, name: string): BABYLON.Mesh;
        /** Gets the specified mesh by id from scene. */
        static GetMeshByID(scene: BABYLON.Scene, id: string): BABYLON.Mesh;
        /** Gets the specified abstract mesh by name from scene. */
        static GetAbstractMesh(scene: BABYLON.Scene, name: string): BABYLON.AbstractMesh;
        /** Gets the specified abstract mesh by id from scene. */
        static GetAbstractMeshByID(scene: BABYLON.Scene, id: string): BABYLON.AbstractMesh;
        /** Gets the specified transform node by name from scene. */
        static GetTransformNode(scene: BABYLON.Scene, name: string): BABYLON.TransformNode;
        /** Gets the specified transform node by id from scene. */
        static GetTransformNodeByID(scene: BABYLON.Scene, id: string): BABYLON.TransformNode;
        /** Gets the transform node child detail mesh. */
        static GetTransformDetailMesh(transform: BABYLON.TransformNode): BABYLON.AbstractMesh;
        /** Gets the transform node skinned mesh. */
        static GetSkinnedMesh(transform: BABYLON.TransformNode): BABYLON.AbstractMesh;
        /** Gets the transform node primitive meshes. */
        static GetPrimitiveMeshes(transform: BABYLON.TransformNode): BABYLON.AbstractMesh[];
        /** Gets the specified transform node layer index value. */
        static GetTransformLayer(transform: BABYLON.TransformNode): number;
        /** Gets the specified transform node layer mask value. */
        static GetTransformLayerMask(transform: BABYLON.TransformNode): number;
        /** Gets the specified transform node layer name value. */
        static GetTransformLayerName(transform: BABYLON.TransformNode): string;
        /** Gets the specified transform node primary tag name. */
        static GetTransformTag(transform: BABYLON.TransformNode): string;
        /** Check if the transform has the specified query tag match */
        static HasTransformTags(transform: BABYLON.TransformNode, query: string): boolean;
        /** Checks if the scene sound manager is available. */
        static HasSoundManager(): boolean;
        static IsSoundEffectPlaying(name: string): boolean;
        static IsMusicTrackPlaying(name: string): boolean;
        /** Play a sound effect from the scene sound manager. */
        static PlayOneShot(name: string, time?: number, offset?: number, length?: number): Promise<boolean>;
        /** Play ambient music track from the scene sound manager. */
        static PlayMusicTrack(name: string, time?: number, offset?: number, length?: number): Promise<boolean>;
        /** Play ambient music track from the scene sound manager. */
        static PauseMusicTrack(name: string): boolean;
        /** Play ambient music track from the scene sound manager. */
        static MuteMusicTrack(name: string, time?: number): boolean;
        /** Unmute ambient music track from the scene sound manager. */
        static UnmuteMusicTrack(name: string, time?: number): boolean;
        /** Stop ambient music track from the scene sound manager. */
        static StopMusicTrack(name: string, time?: number): boolean;
        /** Stop all ambient music tracks from the scene sound manager. */
        static StopAllMusicTracks(): void;
        /** Pause all ambient music tracks from the scene sound manager. */
        static PauseAllMusicTracks(): void;
        /** Mute all ambient music tracks from the scene sound manager. */
        static MuteAllMusicTracks(time?: number): void;
        /** Unmute all ambient music tracks from the scene sound manager. */
        static UnmuteAllMusicTracks(time?: number): void;
        /** Are half or full texture floats supported */
        static TextureFloatSupported(scene: BABYLON.Scene): boolean;
        /** Registers an on pick trigger click action */
        static RegisterClickAction(scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh, func: () => void): BABYLON.IAction;
        /** Unregisters an on pick trigger click action */
        static UnregisterClickAction(mesh: BABYLON.AbstractMesh, action: BABYLON.IAction): boolean;
        /** Get first material with name. (Uses starts with text searching) */
        static GetMaterialWithName(scene: BABYLON.Scene, name: string): BABYLON.Material;
        /** Get all materials with name. (Uses starts with text searching) */
        static GetAllMaterialsWithName(scene: BABYLON.Scene, name: string): BABYLON.Material[];
        /** TODO: Support Animation Groups */
        /** TODO: Support Instance Or Clones */
        /** Instantiate the specified prefab asset hierarchy from the specified scene. (Cloned Hierarchy) */
        static InstantiatePrefabFromScene(scene: BABYLON.Scene, prefabName: string, newName: string, newParent?: BABYLON.Nullable<BABYLON.TransformNode>, newPosition?: BABYLON.Nullable<BABYLON.Vector3>, newRotation?: BABYLON.Nullable<BABYLON.Quaternion>, newScaling?: BABYLON.Nullable<BABYLON.Vector3>, cloneAnimations?: boolean): BABYLON.TransformNode;
        /** Instantiate the specified prefab asset hierarchy from an asset container. (Cloned Hierarchy) */
        static InstantiatePrefabFromContainer(container: BABYLON.AssetContainer, prefabName: string, newName: string, newParent?: BABYLON.Nullable<BABYLON.TransformNode>, newPosition?: BABYLON.Nullable<BABYLON.Vector3>, newRotation?: BABYLON.Nullable<BABYLON.Quaternion>, newScaling?: BABYLON.Nullable<BABYLON.Vector3>, cloneAnimations?: boolean, makeNewMaterials?: boolean): BABYLON.TransformNode;
        /** Instantiate all the raw models from an asset container. (Cloned Hierarchy) */
        static InstantiateModelsFromContainer(container: BABYLON.AssetContainer, nameFunction?: (sourceName: string) => string, createInstances?: boolean, cloneMaterials?: boolean, rebuildBoundingInfo?: boolean, filterPredicate?: any): BABYLON.TransformNode[];
        /** Instantiate the specified prefab asset hierarchy from an asset container. (Instanced Hierarchy) */
        static CreateInstancedModelsFromContainer(container: BABYLON.AssetContainer, newName?: string, newParent?: BABYLON.Nullable<BABYLON.TransformNode>, newPosition?: BABYLON.Nullable<BABYLON.Vector3>, newRotation?: BABYLON.Nullable<BABYLON.Quaternion>, newScaling?: BABYLON.Nullable<BABYLON.Vector3>, cloneAnimations?: boolean, makeNewMaterials?: boolean, rebuildBoundingInfo?: boolean): BABYLON.InstantiatedEntries;
        /** Clones the specified transform node asset into the scene. (Transform Node) */
        static CloneTransformNode(container: BABYLON.AssetContainer, nodeName: string, newName: string, newParent?: BABYLON.Nullable<BABYLON.TransformNode>, newPosition?: BABYLON.Nullable<BABYLON.Vector3>, newRotation?: BABYLON.Nullable<BABYLON.Quaternion>, newScaling?: BABYLON.Nullable<BABYLON.Vector3>): BABYLON.TransformNode;
        /** Clones the specified abstract mesh asset into the scene. (Abtract Mesh) */
        static CloneAbstractMesh(container: BABYLON.AssetContainer, nodeName: string, newName: string, newParent?: BABYLON.Nullable<BABYLON.TransformNode>, newPosition?: BABYLON.Nullable<BABYLON.Vector3>, newRotation?: BABYLON.Nullable<BABYLON.Quaternion>, newScaling?: BABYLON.Nullable<BABYLON.Vector3>): BABYLON.AbstractMesh;
        /** Creates an instance of the specified mesh asset into the scene. (Mesh Instance) */
        static CreateInstancedMesh(container: BABYLON.AssetContainer, meshName: string, newName: string, newParent?: BABYLON.Nullable<BABYLON.TransformNode>, newPosition?: BABYLON.Nullable<BABYLON.Vector3>, newRotation?: BABYLON.Nullable<BABYLON.Quaternion>, newScaling?: BABYLON.Nullable<BABYLON.Vector3>): BABYLON.InstancedMesh;
        /** Rebuild mesh bounding box information */
        static RebuildBoundingBoxInfo(transforms: BABYLON.TransformNode[]): void;
        /**
         * Attach a script component instance to the scene manager life cycle
         * @param instance an instance of a TOOLKIT.ScriptComponent class
         * @param alias the full class name alias. Example PROJECT.MyCustomComponent
         * @param validate validate the instance klass on next frame. Default true.
         */
        static AttachScriptComponent(instance: TOOLKIT.ScriptComponent, alias: string, validate?: boolean): void;
        /**
         * Destroy a script component instance
         * @param instance an instance of a TOOLKIT.ScriptComponent class
         */
        static DestroyScriptComponent(instance: TOOLKIT.ScriptComponent): void;
        /**
         * Destroy a Game Object
         * @param instance an instance of a TOOLKIT.ScriptComponent class
         */
        static DestroyGameObject(transform: BABYLON.TransformNode): void;
        /** Get a script component on the transform with the specfied class name. */
        static GetComponent<T extends TOOLKIT.ScriptComponent>(transform: BABYLON.TransformNode, klass: string, recursive?: boolean): T;
        /** Gets all script components on the transform. */
        static GetComponents<T extends TOOLKIT.ScriptComponent>(transform: BABYLON.TransformNode, recursive?: boolean): T[];
        /** Find game object in the scene hierarchy by path (Parent/Child/GrandChild). */
        static FindGameObject(scene: BABYLON.Scene, path: string): BABYLON.TransformNode;
        /** Internal helper for exact path searching (prevents infinite recursion) */
        private static FindGameObjectExactPath;
        /** Internal helper for recursive name searching */
        private static FindGameObjectRecursive;
        /** Debug utility to print scene hierarchy - useful for finding correct paths */
        static DebugSceneHierarchy(scene: BABYLON.Scene, maxDepth?: number): void;
        static LegacySearchForGameObject(scene: BABYLON.Scene, path: string): BABYLON.TransformNode;
        /** Find game object with tag */
        static FindGameObjectWithTag(scene: BABYLON.Scene, tag: string): BABYLON.TransformNode;
        /** Find all game objects with tag */
        static FindGameObjectsWithTag(scene: BABYLON.Scene, tag: string): BABYLON.TransformNode[];
        /** Finds all script components on the transform. */
        static FindScriptComponents<T extends TOOLKIT.ScriptComponent>(transform: BABYLON.TransformNode, recursive?: boolean): T[];
        /** Finds a script component on the transform with the specfied class name. */
        static FindScriptComponent<T extends TOOLKIT.ScriptComponent>(transform: BABYLON.TransformNode, alias: string, recursive?: boolean): T;
        /** Finds all script components on the transform with the specfied class name. */
        static FindAllScriptComponents<T extends TOOLKIT.ScriptComponent>(transform: BABYLON.TransformNode, alias: string, recursive?: boolean): T[];
        /** Finds the transform object metedata in the scene. */
        static FindSceneMetadata(transform: BABYLON.TransformNode): any;
        /** Finds the specfied camera rig in the scene. */
        static FindSceneCameraRig(transform: BABYLON.TransformNode): BABYLON.FreeCamera;
        /** Finds the specfied light rig in the scene. */
        static FindSceneLightRig(transform: BABYLON.TransformNode): BABYLON.Light;
        /** Finds the first transform with the specified script component. */
        static FindTransformWithScript(scene: BABYLON.Scene, klass: string): BABYLON.TransformNode;
        /** Finds all transforms with the specified script component. */
        static FindAllTransformsWithScript(scene: BABYLON.Scene, klass: string): BABYLON.TransformNode[];
        /** Finds the specfied child transform in the scene. */
        static FindChildTransformNode(parent: BABYLON.TransformNode, name: string, searchType?: TOOLKIT.SearchType, directDecendantsOnly?: boolean, predicate?: (node: BABYLON.Node) => boolean): BABYLON.TransformNode;
        /** Finds the first child transform with matching tags. */
        static FindChildTransformWithTags(parent: BABYLON.TransformNode, query: string, directDecendantsOnly?: boolean, predicate?: (node: BABYLON.Node) => boolean): BABYLON.TransformNode;
        /** Finds all child transforms with matching tags. */
        static FindAllChildTransformsWithTags(parent: BABYLON.TransformNode, query: string, directDecendantsOnly?: boolean, predicate?: (node: BABYLON.Node) => boolean): BABYLON.TransformNode[];
        /** Finds the first child transform with the specified script component. */
        static FindChildTransformWithScript(parent: BABYLON.TransformNode, klass: string, directDecendantsOnly?: boolean, predicate?: (node: BABYLON.Node) => boolean): BABYLON.TransformNode;
        /** Finds all child transforms with the specified script component. */
        static FindAllChildTransformsWithScript(parent: BABYLON.TransformNode, klass: string, directDecendantsOnly?: boolean, predicate?: (node: BABYLON.Node) => boolean): BABYLON.TransformNode[];
        /** Finds the first references to a components of type T on the same GameObject as the component specified, and any parent of the GameObject. */
        static FindComponentInParent<T extends TOOLKIT.ScriptComponent>(scene: BABYLON.Scene, transform: BABYLON.TransformNode, klass: string): T;
        /** Finds references to all components of type T on the same GameObject as the component specified, and any parent of the GameObject. */
        static FindComponentsInParent<T extends TOOLKIT.ScriptComponent>(scene: BABYLON.Scene, transform: BABYLON.TransformNode, klass: string): T[];
        /** Finds the first references to a components of type T on the same GameObject as the component specified, or any child of the GameObject. */
        static FindComponentInChildren<T extends TOOLKIT.ScriptComponent>(scene: BABYLON.Scene, transform: BABYLON.TransformNode, klass: string): T;
        /** Finds references to all components of type T on the same GameObject as the component specified, or any child of the GameObject. */
        static FindComponentsInChildren<T extends TOOLKIT.ScriptComponent>(scene: BABYLON.Scene, transform: BABYLON.TransformNode, klass: string): T[];
        /** Searches all nodes for the first instance of the specified script component. */
        static SearchForScriptComponentByName<T extends TOOLKIT.ScriptComponent>(scene: BABYLON.Scene, klass: string): T;
        /** Searches all nodes for all instances of the specified script component. */
        static SearchForAllScriptComponentsByName<T extends TOOLKIT.ScriptComponent>(scene: BABYLON.Scene, klass: string): T[];
        /** Moves entity using vector position with camera collisions. */
        static MoveWithCollisions(entity: BABYLON.AbstractMesh, velocity: BABYLON.Vector3): void;
        /** Moves entity using vector position using translations. */
        static MoveWithTranslation(entity: BABYLON.TransformNode, velocity: BABYLON.Vector3): void;
        /** Turns entity using quaternion rotations in radians. */
        static TurnWithRotation(entity: BABYLON.TransformNode, radians: number, space?: BABYLON.Space): void;
        static MAX_AGENT_COUNT: number;
        static MAX_AGENT_RADIUS: number;
        /** Register handler that is triggered when the navigation mesh is ready */
        static OnNavMeshReadyObservable: BABYLON.Observable<BABYLON.Mesh>;
        /** Fires right before the navigation mesh data is destroyed, so crowds/agents can release themselves. */
        static OnNavMeshDestroyObservable: BABYLON.Observable<BABYLON.Scene>;
        private static NavMeshPlugin;
        private static NavMeshSurface;
        private static NavMeshDebugger;
        private static NavMeshMaterial;
        private static CrowdInterface;
        /** Has recast navigation data. */
        static HasNavigationData(): boolean;
        /** Gets the recast navigation data. */
        static GetNavigationData(): any | null;
        /** Gets the recast navigation height mesh */
        static GetNavigationMesh(): BABYLON.Mesh | null;
        /** Gets the recast navigation debug mesh. */
        static GetNavigationDebug(): BABYLON.Mesh | null;
        /** Gets the recast navigation plugin instance. */
        static GetNavigationPlugin(): ADDONS.RecastNavigationJSPluginV2 | null;
        /** Gets the recast navigation crowd interface. */
        static GetCrowdInterface(scene: BABYLON.Scene): BABYLON.ICrowd;
        /** Loads the navigation mesh from binary url.
         * @param scene The Babylon.js scene
         * @param binaryUrl The navigation mesh binary url
         * @param heightMesh The height mesh used for navigation surface
         * @param createDebugMesh Whether to show a debug mesh
         */
        static LoadNavigationMeshDataAsync(scene: BABYLON.Scene, binaryUrl: string, heightMesh?: BABYLON.Mesh, createDebugMesh?: boolean): Promise<void>;
        /** Build the navigation mesh from binary data.
         * @param scene The Babylon.js scene
         * @param binaryData The navigation mesh binary data
         * @param heightMesh The height mesh used for navigation surface
         * @param createDebugMesh Whether to show a debug mesh
         */
        static BuildNavigationMeshDataAsync(scene: BABYLON.Scene, binaryData: Uint8Array, heightMesh?: BABYLON.Mesh, createDebugMesh?: boolean): Promise<void>;
        /** Build the navigation mesh from tile cache.
         * @param scene The Babylon.js scene
         * @param tileCacheData The navigation mesh tile cache data
         * @param tileCacheMeshProcess The navigation mesh tile cache mesh processor (optional - uses default if null)
         * @param heightMesh The height mesh used for navigation surface
         * @param createDebugMesh Whether to show a debug mesh
         */
        static BuildNavigationMeshTileCacheAsync(scene: BABYLON.Scene, tileCacheData: Uint8Array, tileCacheMeshProcess?: any, heightMesh?: BABYLON.Mesh, createDebugMesh?: boolean): Promise<void>;
        /** Create the navigation mesh from scene geometry.
         * @param scene The Babylon.js scene
         * @param properties The Unity navigation mesh bake properties
         * @param geometry The scene geometry to build the navigation mesh from
         * @param heightMesh The optional height mesh geometry
         * @param showDebugMesh Whether to show a debug mesh
         */
        static CreateNavigationMeshSceneDataAsync(scene: BABYLON.Scene, properties: TOOLKIT.IUnityNavigationOptions, geometry: BABYLON.Mesh[], heightMesh?: BABYLON.Mesh, createDebugMesh?: boolean): Promise<void>;
        static DestroyNavigationMeshData(scene?: BABYLON.Scene): void;
        /** Toggle full screen scene mode. */
        static ToggleFullscreenMode(scene: BABYLON.Scene, requestPointerLock?: boolean): void;
        /** Enter full screen scene mode. */
        static EnterFullscreenMode(scene: BABYLON.Scene, requestPointerLock?: boolean): void;
        /** Exit full screen scene mode. */
        static ExitFullscreenMode(scene: BABYLON.Scene): void;
        private static GotoFullscreenBrowser;
        private static RequestBrowserPointerLock;
        private static ExitFromFullscreenBrowser;
        /**
         * Creates an easing function from string name or returns existing BABYLON.EasingFunction
         */
        private static CreateEasingFunction;
        /**
         * Gets the current value of a property using dot notation
         */
        private static GetPropertyValue;
        /**
         * Sets a property value using dot notation
         */
        private static SetPropertyValue;
        /**
         * Determines if a target is a BABYLON.GUI control
         */
        private static IsGUIControl;
        /**
         * Determines if a property is a GUI positioning/sizing property that needs special handling
         */
        private static IsGUIPositionProperty;
        /**
         * Extracts numeric value from GUI property using proper InPixels getters
         * Handles both string ("100px", "50%") and numeric values with flags
         */
        private static ExtractGUINumericValue;
        /**
         * Creates a proxy object that makes GUI controls compatible with scene.beginAnimation
         *
         * This proxy is ESSENTIAL for GUI animations to work because:
         * 1. BabylonJS scene.beginAnimation requires numeric properties to interpolate
         * 2. GUI controls use string properties ("100px") and InPixels setters
         * 3. The proxy provides a numeric interface that converts to InPixels setters
         * 4. Without this, GUI position properties cannot be animated with scene.beginAnimation
         */
        private static CreateGUIAnimationProxy;
        /**
         * Determines the animation type based on the property value
         */
        private static GetAnimationType;
        /**
         * Creates tween animations for multiple properties
         */
        private static CreateTweenAnimations;
        /**
         * Tweens object properties to specified target values
         *
         * @param target - The object to animate
         * @param to - Object containing target property values (supports dot notation)
         * @param options - Animation options (duration, easing, callbacks, etc.)
         * @param scene - Optional BabylonJS scene (defaults to last created scene)
         * @returns ITweenResult containing animation references and completion promise
         *
         * @example
         * ```typescript
         * // Basic position animation
         * const tween = SceneManager.TweenTo(mesh,
         *   { "position.x": 10, "position.y": 5 },
         *   { duration: 2, ease: "quadOut" }
         * );
         *
         * // Wait for completion
         * await tween.finished;
         *
         * // Stop all animations if needed
         * tween.animations.forEach(anim => anim.stop());
         *
         * // Material fade out
         * SceneManager.TweenTo(material,
         *   { alpha: 0 },
         *   { duration: 1, ease: "sineOut", onComplete: () => console.log("Faded!") }
         * );
         * ```
         *
         * @remarks
         * This method is ideal for:
         *
         * **Simple Animations:**
         * - Moving objects to new positions
         * - Fading materials in/out
         * - Scaling transforms
         * - Rotating objects to target orientations
         *
         * **Property Support:**
         * - Supports dot notation: `"position.x"`, `"material.alpha"`, `"rotation.y"`
         * - Handles Vector2, Vector3, Color3, Quaternion, and numeric values
         * - Automatically detects property types and creates appropriate animations
         *
         * **Animation Control:**
         * - Returns array of all BABYLON.Animatable instances (one per animated property)
         * - Use `tween.animations.forEach(anim => anim.stop())` to stop all animations
         * - Each property gets its own animatable for precise control
         *
         * **Async Integration:**
         * - Returns both animation references and completion promise
         * - Use `await tween.finished` for sequential animations
         * - Chain with other async operations seamlessly
         *
         * @github
         * https://github.com/BabylonJS/BabylonToolkit/tree/master/Tweening
         */
        static TweenTo(target: any, to: any, options?: TOOLKIT.ITweenOptions, scene?: BABYLON.Scene): TOOLKIT.ITweenResult;
        /**
         * Async version of TweenTo that automatically awaits completion
         *
         * @param target - The object to animate
         * @param to - Object containing target property values (supports dot notation)
         * @param options - Animation options (duration, easing, callbacks, etc.)
         * @param scene - Optional BabylonJS scene (defaults to last created scene)
         * @returns Promise that resolves when the animation completes
         *
         * @example
         * ```typescript
         * // Sequential animations with clean async/await syntax
         * async function performSequence() {
         *   await SceneManager.TweenToAsync(mesh, { "position.x": 10 }, { duration: 1 });
         *   await SceneManager.TweenToAsync(mesh, { "position.y": 5 }, { duration: 0.5 });
         *   await SceneManager.TweenToAsync(material, { alpha: 0 }, { duration: 1 });
         *   console.log("Sequence complete!");
         * }
         *
         * // Parallel animations
         * await Promise.all([
         *   SceneManager.TweenToAsync(mesh, { "position.z": -4 }, { duration: 2 }),
         *   SceneManager.TweenToAsync(camera, { "position.y": 8 }, { duration: 1.5 })
         * ]);
         * ```
         *
         * @remarks
         * This is a convenience method that wraps {@link TweenTo} and automatically awaits
         * the `finished` Promise. It's especially useful for:
         *
         * **Sequential Workflows:**
         * - Chain animations without callback nesting
         * - Create complex sequences with clean async/await syntax
         * - Easy integration with other async operations
         *
         * **Simple Fire-and-Forget:**
         * - When you don't need the animation reference
         * - For straightforward property animations
         * - When timing is more important than control
         *
         * @github
         * https://github.com/BabylonJS/BabylonToolkit/tree/master/Tweening
         */
        static TweenToAsync(target: any, to: any, options?: TOOLKIT.ITweenOptions, scene?: BABYLON.Scene): Promise<void>;
        /**
         * Tweens object properties from specified start values to target values
         *
         * @param target - The object to animate
         * @param from - Object containing starting property values (supports dot notation)
         * @param to - Object containing target property values (supports dot notation)
         * @param options - Animation options (duration, easing, callbacks, etc.)
         * @param scene - Optional BabylonJS scene (defaults to last created scene)
         * @returns ITweenResult containing animation reference and completion promise
         *
         * @example
         * ```typescript
         * // Controlled entrance animation
         * const tween = SceneManager.TweenFromTo(mesh,
         *   { "position.y": -10, "material.alpha": 0 },  // Start below and transparent
         *   { "position.y": 0, "material.alpha": 1 },    // End at ground level and opaque
         *   { duration: 1.5, ease: "backOut" }
         * );
         *
         * // Camera movement with precise control
         * SceneManager.TweenFromTo(camera,
         *   { "position.x": -5, "position.z": -5 },
         *   { "position.x": 5, "position.z": 5 },
         *   {
         *     duration: 3,
         *     ease: "sineInOut",
         *     onComplete: () => console.log("Camera move complete!")
         *   }
         * );
         * ```
         *
         * @remarks
         * This method provides maximum control over animations by specifying both
         * start and end values. It's ideal for:
         *
         * **Predictable Animations:**
         * - Entrance/exit effects where you control exact start positions
         * - State transitions with known begin and end values
         * - Reset animations that override current object state
         *
         * **Complex Sequences:**
         * - Multi-property animations with synchronized timing
         * - Transitions that need to start from specific values
         * - Animations that should ignore current object state
         *
         * **Property Features:**
         * - Full dot notation support: `"transform.position.x"`, `"material.diffuseColor.r"`
         * - Automatic type detection for Vector2/3, Color3, Quaternions, and numbers
         * - Overwrites current property values with `from` values before animating
         *
         * @github
         * https://github.com/BabylonJS/BabylonToolkit/tree/master/Tweening
         */
        static TweenFromTo(target: any, from: any, to: any, options?: TOOLKIT.ITweenOptions, scene?: BABYLON.Scene): TOOLKIT.ITweenResult;
        /**
         * Async version of TweenFromTo that automatically awaits completion
         *
         * @param target - The object to animate
         * @param from - Object containing starting property values (supports dot notation)
         * @param to - Object containing target property values (supports dot notation)
         * @param options - Animation options (duration, easing, callbacks, etc.)
         * @param scene - Optional BabylonJS scene (defaults to last created scene)
         * @returns Promise that resolves when the animation completes
         *
         * @example
         * ```typescript
         * // Clean async entrance effect
         * async function showCharacter() {
         *   // Start invisible and below ground
         *   await SceneManager.TweenFromToAsync(character,
         *     { "position.y": -2, "material.alpha": 0 },
         *     { "position.y": 0, "material.alpha": 1 },
         *     { duration: 1, ease: "backOut" }
         *   );
         *
         *   // Then make them wave
         *   await SceneManager.TweenFromToAsync(character,
         *     { "rotation.z": 0 },
         *     { "rotation.z": 0.3 },
         *     { duration: 0.5, ease: "sineInOut", yoyo: true, yoyoCount: 2 }
         *   );
         *
         *   console.log("Character introduction complete!");
         * }
         *
         * // Camera shake effect
         * async function shakeCamera() {
         *   for (let i = 0; i < 5; i++) {
         *     await SceneManager.TweenFromToAsync(camera,
         *       { "position.x": camera.position.x - 0.1 },
         *       { "position.x": camera.position.x + 0.1 },
         *       { duration: 0.05, ease: "linear" }
         *     );
         *   }
         *
         *   console.log("Camera shake complete!");
         * }
         * ```
         *
         * @remarks
         * This is a convenience method that wraps {@link TweenFromTo} and automatically awaits
         * the `finished` Promise. It's especially useful for:
         *
         * **Predictable Animations:**
         * - Entrance/exit effects where you control exact start positions
         * - State transitions with known begin and end values
         * - Reset animations that override current object state
         *
         * **Sequential Workflows:**
         * - Chain animations with precise control over each step
         * - Create complex sequences without callback nesting
         * - Easy integration with other async operations
         *
         * @github
         * https://github.com/BabylonJS/BabylonToolkit/tree/master/Tweening
         */
        static TweenFromToAsync(target: any, from: any, to: any, options?: TOOLKIT.ITweenOptions, scene?: BABYLON.Scene): Promise<void>;
        /**
         * Executes multiple tween animations as a group with parallel or sequential timing
         *
         * @param tweenFunctions - Array of functions that return tween results when called
         * @param options - Group execution options (mode, stagger, callbacks)
         * @param scene - Optional BabylonJS scene (defaults to last created scene)
         * @returns Promise that resolves when all animations complete
         *
         * @example
         * ```typescript
         * // Parallel animations with stagger effect
         * await SceneManager.TweenGroupAsync([
         *   () => SceneManager.TweenTo(mesh1, { "position.z": -4 }, { duration: 0.8 }),
         *   () => SceneManager.TweenTo(mesh2, { "position.z": -4 }, { duration: 0.8 }),
         *   () => SceneManager.TweenTo(mesh3, { "position.z": -4 }, { duration: 0.8 })
         * ], { mode: "all", stagger: 150 });
         *
         * // Sequential entrance animations
         * await SceneManager.TweenGroupAsync([
         *   () => SceneManager.TweenFromTo(title,
         *     { "position.y": 50, "material.alpha": 0 },
         *     { "position.y": 0, "material.alpha": 1 },
         *     { duration: 1, ease: "backOut" }
         *   ),
         *   () => SceneManager.TweenFromTo(subtitle,
         *     { "position.y": -20, "material.alpha": 0 },
         *     { "position.y": -5, "material.alpha": 1 },
         *     { duration: 0.8, ease: "sineOut" }
         *   ),
         *   () => SceneManager.TweenTo(button,
         *     { "scaling.x": 1.2, "scaling.y": 1.2 },
         *     { duration: 0.3, ease: "elasticOut" }
         *   )
         * ], { mode: "sequence" });
         *
         * // Complex mixed parallel and sequential
         * await SceneManager.TweenGroupAsync([
         *   () => Promise.all([  // Parallel sub-group
         *     SceneManager.TweenToAsync(leftDoor, { "rotation.y": -Math.PI/2 }, { duration: 1 }),
         *     SceneManager.TweenToAsync(rightDoor, { "rotation.y": Math.PI/2 }, { duration: 1 })
         *   ]),
         *   () => SceneManager.TweenTo(light, { intensity: 2 }, { duration: 0.5 }),
         *   () => SceneManager.TweenTo(character, { "position.z": 0 }, { duration: 1.5 })
         * ], { mode: "sequence", onComplete: () => console.log("Grand entrance complete!") });
         * ```
         *
         * @remarks
         * This powerful method enables sophisticated animation choreography:
         *
         * **Execution Modes:**
         * - `"all"` (parallel): All animations start simultaneously
         * - `"sequence"`: Animations start after the previous one completes
         *
         * **Stagger Effect:**
         * - Only applies to `"all"` mode
         * - Delays each subsequent animation by the specified milliseconds
         * - Creates smooth cascading effects
         *
         * **Function-Based Approach:**
         * - Each tween is wrapped in a function for lazy evaluation
         * - Enables complex logic or conditional animations
         * - Supports mixing different tween types and async operations
         * - Functions can return any Promise, not just tween results
         *
         * **Advanced Patterns:**
         * - Nest groups within groups for complex choreography
         * - Mix TweenTo, TweenFromTo, and custom async operations
         * - Create reusable animation sequences
         * - Build dynamic animations based on runtime conditions
         *
         * @github
         * https://github.com/BabylonJS/BabylonToolkit/tree/master/Tweening
         */
        static TweenGroupAsync(tweenFunctions: (() => Promise<any> | TOOLKIT.ITweenResult)[], options?: TOOLKIT.IGroupTweenOptions, scene?: BABYLON.Scene): Promise<void>;
    }
    /**
     * Interface for tween options
     */
    interface ITweenOptions {
        /** Duration in seconds (default: 1) */
        duration?: number;
        /** Delay before starting the animation in seconds (default: 0) */
        delay?: number;
        /** Easing function name or BABYLON.EasingFunction instance */
        ease?: string | BABYLON.EasingFunction;
        /** Whether to automatically start the animation (default: true) */
        autoStart?: boolean;
        /** Whether to loop the animation (default: false) */
        loop?: boolean;
        /** Number of times to repeat the animation (default: 0) */
        repeat?: number;
        /** Whether to reverse the animation on repeat (yoyo effect) (default: false) */
        yoyo?: boolean;
        /** Number of yoyo cycles (default: 0) */
        yoyoCount?: number;
        /** Speed multiplier for the animation (default: 1) */
        speed?: number;
        /** Callback function called when animation starts */
        onStart?: () => void;
        /** Callback function called when animation completes */
        onComplete?: () => void;
        /** Callback function called when animation updates */
        onUpdate?: () => void;
        /** Callback function called when animation repeats */
        onRepeat?: () => void;
    }
    /**
     * Interface for group tween options
     */
    interface IGroupTweenOptions {
        /** Execution mode: "all" (parallel) or "sequence" (sequential) */
        mode?: "all" | "sequence";
        /** Stagger delay between animations in milliseconds (only for "all" mode) */
        stagger?: number;
        /** Callback function called when all animations complete */
        onComplete?: () => void;
    }
    /**
     * Interface for tween result containing the animations and promise
     */
    interface ITweenResult {
        /** Array of BABYLON animation instances (one per animated property) */
        animations: BABYLON.Animatable[];
        /** Promise that resolves when all animations complete */
        finished: Promise<void>;
    }
    /**
     * Interface for Unity navigation mesh generation options
     */
    interface IUnityNavigationOptions {
        cs: number;
        ch: number;
        tilesize: number;
        walkableradius: number;
        walkableheight: number;
        walkableclimb: number;
        walkableslopeangle: number;
        minregionarea: number;
        maxedgelen: number;
        mergeregionarea: number;
        maxsimplificationerror: number;
        maxvertsperpoly: number;
        detailsampledist: number;
        detailsamplemaxerror: number;
        buildheightmesh: boolean;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon toolkit script component class
     * @class ScriptComponent - All rights reserved (c) 2024 Mackey Kinard
     */
    abstract class ScriptComponent {
        private _update;
        private _late;
        private _step;
        private _fixed;
        private _after;
        private _ready;
        private _lateUpdate;
        private _properties;
        private _awoken;
        private _started;
        private _scene;
        private _delyed;
        private _transform;
        private _scriptReady;
        private _registeredClassname;
        private _registerComponentAlias;
        private _lateUpdateObserver;
        resetScriptComponent: () => void;
        /** Gets the script component ready state */
        isReady(): boolean;
        /** Gets the current scene object */
        get scene(): BABYLON.Scene;
        /** Gets the transform node entity */
        get transform(): BABYLON.TransformNode;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        /** Destroys the script component instance */
        dispose(): void;
        /** Gets the script component class name */
        getClassName(): string;
        /** Gets the script component property bag */
        getProperties(): any;
        /** Gets the script component property bag value */
        getProperty<T>(name: string, defaultValue?: T): T;
        /** Sets the script component property bag value */
        setProperty(name: string, propertyValue: any): void;
        /** Get the current time in seconds */
        getTime(): number;
        /** Get the current time in milliseconds */
        getTimeMs(): number;
        /** Get the total game time in seconds */
        getGameTime(): number;
        /** Get the total game time in milliseconds */
        getGameTimeMs(): number;
        /** Get the current delta time in seconds */
        getDeltaTime(): number;
        /** Get the current delta time in seconds */
        getDeltaSeconds(): number;
        /** Get the current delta time in milliseconds */
        getDeltaMilliseconds(): number;
        /** Get the delta time animation ratio for 60 fps */
        getAnimationRatio(): number;
        /** Is a safe transform skinned mesh entity */
        hasSkinnedMesh(): boolean;
        /** Gets the safe transform skinned mesh entity */
        getSkinnedMesh(): BABYLON.AbstractMesh;
        /** Gets the safe transform mesh entity (Fast Skinned Mesh Check) */
        getTransformMesh(): BABYLON.Mesh;
        /** Gets the safe transform abstract mesh entity (Fast Skinned Mesh Check) */
        getAbstractMesh(): BABYLON.AbstractMesh;
        /** Gets the safe transform instanced mesh entity */
        getInstancedMesh(): BABYLON.InstancedMesh;
        /** Gets the transform primitive meshes */
        getPrimitiveMeshes(): BABYLON.AbstractMesh[];
        /** Get the transform object metedata in the scene. */
        getMetadata(): any;
        /** Get a script component on the transform with the specfied class name. */
        getComponent<T extends TOOLKIT.ScriptComponent>(klass: string, recursive?: boolean): T;
        /** Get all script components on the transform with the specfied class name. */
        getComponents<T extends TOOLKIT.ScriptComponent>(klass: string, recursive?: boolean): T[];
        /** Gets the attached transform light rig */
        getLightRig(): BABYLON.Light;
        /** Gets the attached transform camera rig */
        getCameraRig(): BABYLON.FreeCamera;
        /** Gets a script component transform primary tag name. */
        getTransformTag(): string;
        /** Check if the transform has the specified query tag match */
        hasTransformTags(query: string): boolean;
        /** Get the specfied child transform in the scene. */
        getChildNode(name: string, searchType?: TOOLKIT.SearchType, directDecendantsOnly?: boolean, predicate?: (node: BABYLON.Node) => boolean): BABYLON.TransformNode;
        /** Get the first child transform with matching tags. */
        getChildWithTags(query: string, directDecendantsOnly?: boolean, predicate?: (node: BABYLON.Node) => boolean): BABYLON.TransformNode;
        /** Get all child transforms with matching tags. */
        getChildrenWithTags(query: string, directDecendantsOnly?: boolean, predicate?: (node: BABYLON.Node) => boolean): BABYLON.TransformNode[];
        /** Get the first child transform with the specified script component. */
        getChildWithScript(klass: string, directDecendantsOnly?: boolean, predicate?: (node: BABYLON.Node) => boolean): BABYLON.TransformNode;
        /** Get all child transforms with the specified script component. */
        getChildrenWithScript(klass: string, directDecendantsOnly?: boolean, predicate?: (node: BABYLON.Node) => boolean): BABYLON.TransformNode[];
        private _bodyCollisionObserver;
        private _bodyCollisionEndedObserver;
        private _worldTriggerEventObserver;
        /** Enable physics collision events on the body */
        enableCollisionEvents(): void;
        /** Disable physics collision events on the body */
        disableCollisionEvents(): void;
        /** Observable handler that is triggered when a collision contact has entered */
        onCollisionEnterObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Observable handler that is triggered when a collision contact is active */
        onCollisionStayObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Observable handler that is triggered when a collision contact has exited */
        onCollisionExitObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Observable handler that is triggered when a pass thru collision contact has entered */
        onTriggerEnterObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Observable handler that is triggered when a pass thru collision contact has exited */
        onTriggerExitObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Manually set the physics transform position */
        setTransformPosition(position: BABYLON.Vector3): void;
        /** Manually set the physics transform rotation */
        setTransformRotation(rotation: BABYLON.Quaternion): void;
        /** Registers an on pick trigger click action */
        registerOnClickAction(func: () => void): BABYLON.IAction;
        /** Unregisters an on pick tricgger click action */
        unregisterOnClickAction(action: BABYLON.IAction): boolean;
        private registerComponentInstance;
        private delayComponentInstance;
        private destroyComponentInstance;
        private setupStepComponentInstance;
        private removeStepComponentInstance;
        private setupFixedComponentInstance;
        private removeFixedComponentInstance;
        private static RegisterInstance;
        private static UpdateInstance;
        private static LateInstance;
        private static AfterInstance;
        private static StepInstance;
        private static FixedInstance;
        private static ReadyInstance;
        private static ResetInstance;
        private static DestroyInstance;
        private static ParseAutoProperties;
        private static UnpackObjectProperty;
    }
    /**
     * Babylon toolkit scene controller class (React Framework - Scene Viewer Main Entry Point)
     * @class SceneController - All rights reserved (c) 2024 Mackey Kinard
     */
    abstract class SceneController extends TOOLKIT.ScriptComponent {
        /** Automatically hide the splash screen after the scene is initialized. Default is true. */
        autoHideSplashScreen: boolean;
        /** Delay in milliseconds to trigger the createScene function on the script component. Note: This is required to ensure the scene is fully initialized before createScene is called. Default is 500 milliseconds. */
        postCreateSceneDelayMs: number;
        /** Prewarm the scene and optionally hide the splash screen after a delay. Note: This is required to trigger the createScene function on the script component. Default is 2500 milliseconds. */
        scenePrewarmDurationMs: number;
        /**
         * @param transform The transform node associated with this scene controller.
         * @param scene The Babylon.js scene instance.
         * @param properties Additional properties for the scene controller.
         * @param alias An optional alias for the scene controller.
         */
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected createSceneHandled: boolean;
        protected preCreateScene(data?: any): Promise<void>;
        protected postCreateScene(data?: any): Promise<void>;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon toolkit system class
     * @class System - All rights reserved (c) 2024 Mackey Kinard
     */
    enum System {
        Deg2Rad,
        Rad2Deg,
        Epsilon = 0.000001,
        SingleEpsilon = 1.401298e-45,
        EpsilonNormalSqrt = 1e-15,
        Kph2Mph = 0.621371,
        Mph2Kph = 1.60934,
        Mps2Kph = 3.6,
        Mps2Mph = 2.23694,
        Meter2Inch = 39.3701,
        Inch2Meter = 0.0254,
        Gravity = 9.81,
        Gravity3G = 29.400000000000002,
        SkidFactor = 0.25,
        MaxInteger = 2147483647,
        WalkingVelocity = 4.4,// 4 km/h -> 1.1 m/s
        TerminalVelocity = 55,
        SmoothDeltaFactor = 0.2,
        ToLinearSpace = 2.2,
        ToGammaSpace = 0.45454545454545453
    }
    enum Handedness {
        Default = -1,
        Right = 0,
        Left = 1
    }
    enum SearchType {
        ExactMatch = 0,
        StartsWith = 1,
        EndsWith = 2,
        IndexOf = 3
    }
    enum PlayerNumber {
        Auto = 0,
        One = 1,
        Two = 2,
        Three = 3,
        Four = 4
    }
    enum PlayerControl {
        FirstPerson = 0,
        ThirdPerson = 1
    }
    enum RenderQuality {
        High = 0,
        Medium = 1,
        Low = 2
    }
    enum GamepadType {
        None = -1,
        Generic = 0,
        Xbox360 = 1,
        DualShock = 2,
        PoseController = 3
    }
    enum Xbox360Trigger {
        Left = 0,
        Right = 1
    }
    enum MovementType {
        DirectVelocity = 0,
        AppliedForces = 1
    }
    enum CollisionContact {
        Top = 0,
        Left = 1,
        Right = 2,
        Bottom = 3
    }
    enum IntersectionPrecision {
        AABB = 0,
        OBB = 1
    }
    enum CollisionFilters {
        DefaultFilter = 1,
        StaticFilter = 2,
        KinematicFilter = 4,
        DebrisFilter = 8,
        SensorTrigger = 16,
        CharacterFilter = 32,
        AllFilter = -1
    }
    enum CollisionState {
        ACTIVE_TAG = 1,
        ISLAND_SLEEPING = 2,
        WANTS_DEACTIVATION = 3,
        DISABLE_DEACTIVATION = 4,
        DISABLE_SIMULATION = 5
    }
    enum CollisionFlags {
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
    enum UserInputPointer {
        Left = 0,
        Middle = 1,
        Right = 2
    }
    enum UserInputAxis {
        Horizontal = 0,
        Vertical = 1,
        ClientX = 2,
        ClientY = 3,
        MouseX = 4,
        MouseY = 5,
        Wheel = 6
    }
    enum UserInputKey {
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
    interface UserInputPress {
        index: number;
        action: () => void;
    }
    type UserInputAction = (index: number) => void;
    class UserInputOptions {
        static KeyboardSmoothing: boolean;
        static KeyboardMoveSensibility: number;
        static KeyboardArrowSensibility: number;
        static KeyboardMoveDeadZone: number;
        static GamepadDeadStickValue: number;
        static GamepadLStickXInverted: boolean;
        static GamepadLStickYInverted: boolean;
        static GamepadRStickXInverted: boolean;
        static GamepadRStickYInverted: boolean;
        static GamepadLStickSensibility: number;
        static GamepadRStickSensibility: number;
        static SupportedInputDevices: any[];
        static BabylonAngularSensibility: number;
        static DefaultAngularSensibility: number;
        static PointerWheelDeadZone: number;
        static PointerMouseDeadZone: number;
        static PointerMouseInverted: boolean;
        static UseCanvasElement: boolean;
        static UseArrowKeyRotation: boolean;
        static EnableBabylonRotation: boolean;
    }
    /**
     * Babylon toolkit runtime initialization options
     * @param enableUserInput enable user input. Default false.
     * @param hardwareScalingLevel set hardware scaling level. Set to 0 to skip. Default (1 / window.devicePixelRatio).
     * @param initSceneFileLoaders initialize scene file loaders. Default true.
     * @param loadAsyncRuntimeLibs load async runtime libraries. Default true.
     * @param loadProjectScriptBundle load a project script bundle. Default false.
     * @param projectScriptBundleUrl specified project script bundle. Default (default.playground.js).
     * @param showDefaultLoadingScreen show the default loading screen. Default false.
     * @param hideLoadingUIWithEngine hide the loading screen with engine.hideLoadingUI. When set to false, you must manually hide the loading screen using TOOLKIT.SceneManager.HideLoadingScreen when the scene is ready. Default true.
     * @param defaultLoadingUIMarginTop The top margin of the loading text. Default 150px.
     */
    interface IRuntimeOptions {
        enableUserInput?: boolean;
        hardwareScalingLevel?: number;
        initSceneFileLoaders?: boolean;
        loadAsyncRuntimeLibs?: boolean;
        loadProjectScriptBundle?: boolean;
        projectScriptBundleUrl?: string;
        showDefaultLoadingScreen?: boolean;
        hideLoadingUIWithEngine?: boolean;
        defaultLoadingUIMarginTop?: string;
    }
    /**
     * Asset Preloader Interface (https://doc.babylonjs.com/divingDeeper/importers/assetManager)
     */
    interface IAssetPreloader {
        addPreloaderTasks(assetsManager: TOOLKIT.PreloadAssetsManager): void;
    }
    /**
     * Window Message Interface
     */
    interface IWindowMessage {
        source: string;
        command: string;
        [key: string]: any;
    }
    /**
     * Unity Export Interfaces
     */
    interface IUnityTransform {
        type: string;
        id: string;
        tag: string;
        name: string;
        layer: number;
    }
    interface IUnityCurve {
        type: string;
        length: number;
        prewrapmode: string;
        postwrapmode: string;
        animation: any;
    }
    interface IUnityMaterial {
        type: string;
        id: string;
        name: string;
        shader: string;
        gltf: number;
    }
    interface IUnityTexture {
        type: string;
        name: string;
        width: number;
        height: number;
        filename: string;
        wrapmode: string;
        filtermode: string;
        anisolevel: number;
    }
    interface IUnityCubemap {
        type: string;
        name: string;
        info: any;
        width: number;
        height: number;
        filename: string;
        extension: string;
        wrapmode: string;
        filtermode: string;
        anisolevel: number;
        texelsizex: number;
        texelsizey: number;
        dimension: number;
        format: number;
        mipmapbias: number;
        mipmapcount: number;
    }
    interface IUnityAudioClip {
        type: string;
        name: string;
        filename: string;
        length: number;
        channels: number;
        frequency: number;
        samples: number;
    }
    interface IUnityVideoClip {
        type: string;
        name: string;
        filename: string;
        length: number;
        width: number;
        height: number;
        framerate: number;
        framecount: number;
        audiotracks: number;
    }
    interface IUnityFontAsset {
        type: string;
        filename: string;
        format: string;
    }
    interface IUnityTextAsset {
        type: string;
        filename: string;
        base64: string;
        json: boolean;
    }
    interface IUnityDefaultAsset {
        type: string;
        filename: string;
        base64: string;
        json: boolean;
    }
    interface IUnityVector2 {
        x: number;
        y: number;
    }
    interface IUnityVector3 {
        x: number;
        y: number;
        z: number;
    }
    interface IUnityVector4 {
        x: number;
        y: number;
        z: number;
        w: number;
    }
    interface IUnityColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    /**
     * Http Request Header
     * @class RequestHeader - All rights reserved (c) 2024 Mackey Kinard
     */
    class RequestHeader {
        name: string;
        value: string;
    }
    /**
     * Trigger Volume State
     * @class TriggerVolume - All rights reserved (c) 2024 Mackey Kinard
     */
    class TriggerVolume {
        mesh: BABYLON.AbstractMesh;
        state: number;
    }
    /**
     * Room Error Message
     * @class RoomErrorMessage - All rights reserved (c) 2024 Mackey Kinard
     */
    class RoomErrorMessage {
        code: number;
        message: string;
    }
    /**
     * Custom Loading Screen
     * @class CustomLoadingScreen - All rights reserved (c) 2024 Mackey Kinard
     */
    class CustomLoadingScreen implements BABYLON.ILoadingScreen {
        loadingDivId: string;
        loadingUIText: string;
        hideLoadingUIWithEngine: boolean;
        customInnerHtml: string;
        customInnerCss: string;
        loadingUIBackgroundColor: string;
        constructor(loadingDivId: string, loadingUIText: string, hideLoadingUIWithEngine?: boolean, customInnerHtml?: string, customInnerCss?: string);
        displayLoadingUI(): void;
        hideLoadingUI(): void;
        showLoadingDiv(show: boolean): void;
        getLoadingDiv(): HTMLDivElement;
        hasLoadingDiv(): boolean;
    }
    /**
     * Local Message Bus (Safe Local Instance Communication)
     * @class LocalMessageBus - All rights reserved (c) 2024 Mackey Kinard
     */
    class LocalMessageBus {
        /** Handle event bus message
         * @param message The message to handle
         * @param data The data to handle
         * @returns void
         */
        OnMessage<T>(messageName: string, handler: (data: T) => void): void;
        /** Post event bus message
         * @param message The message to post
         * @param data The data to post
         * @returns void
         */
        PostMessage(messageName: string, data?: any): void;
        /** Remove event bus message handler
         * @param message The message to remove
         * @param handler The handler to remove
         * @returns void
         */
        RemoveHandler(messageName: string, handler: (data: any) => void): void;
        /** Clear and reset all event bus message handlers
         * @returns void
         */
        ResetHandlers(): void;
        Dispose(): void;
        private ListenerDictionary;
    }
    /**
     * Global Message Bus (Safe Post Window Message Communication)
     * @class GlobalMessageBus - All rights reserved (c) 2024 Mackey Kinard
     */
    class GlobalMessageBus {
        constructor();
        /** Handle event bus message
         * @param message The message to handle
         * @param data The data to handle
         * @returns void
         */
        OnMessage<T>(message: string, handler: (data: T) => void): void;
        /** Post event bus message
         * @param message The message to post
         * @param data The data to post
         * @param target The target to post
         * @param transfer The transfer to post
         * @returns void
         */
        PostMessage(message: string, data?: any, target?: string, transfer?: Transferable[] | undefined): void;
        /** Remove event bus message handler
         * @param message The message to remove
         * @param handler The handler to remove
         * @returns void
         */
        RemoveHandler(message: string, handler: (data: any) => void): void;
        /** Clear and reset all event bus message handlers
         * @returns void
         */
        ResetHandlers(): void;
        /** Dispose the global message bus
         * @returns void
         */
        Dispose(): void;
        /** Handle window message event
         * @param event The message event to handle
         * @returns void
         */
        private HandleWindowMessage;
        /** Dispatch internal event bus message
         * @param message The message to dispatch
         * @param data The data to dispatch
         * @returns void
         */
        private OnDispatchMessage;
        private ListenerDictionary;
    }
    /**
     * Prefab Object Pool
     * @class PrefabObjectPool - All rights reserved (c) 2024 Mackey Kinard
     */
    class PrefabObjectPool {
        private prefabName;
        private allowGrowth;
        private assetContainer;
        private cloneAnimations;
        private makeNewMaterials;
        private availableInstances;
        getAvailableCount(): number;
        constructor(container: BABYLON.AssetContainer | BABYLON.Scene, prefabName: string, prefabCount?: number, allowGrowth?: boolean, makeNewMaterials?: boolean, cloneAnimations?: boolean);
        /** Populate the prefab object pool by the specified count */
        populatePool(count: number): void;
        /** Get a prefab instance from the object pool or create a new one if none available */
        getInstance(position?: BABYLON.Vector3, rotation?: BABYLON.Quaternion): BABYLON.TransformNode;
        /** Free the prefab instance and reset the available object pool state */
        freeInstance(instance: BABYLON.TransformNode): void;
        private appendNewInstance;
        private createNewInstance;
    }
    /**
     * Physics Raycast Classes
     * @class RaycastHitResult - All rights reserved (c) 2024 Mackey Kinard
     */
    class RaycastHitResult {
        private _hit;
        private _dest;
        private _origin;
        private _hitPoint;
        private _hitNormal;
        private _hitDistance;
        private _collisionObject;
        get hasHit(): boolean;
        get hitPoint(): BABYLON.Vector3;
        get hitNormal(): BABYLON.Vector3;
        get hitDistance(): number;
        get collisionObject(): any;
        get rayDestination(): BABYLON.Vector3;
        get rayOrigin(): BABYLON.Vector3;
        constructor();
        reset(origin: BABYLON.Vector3, destination: BABYLON.Vector3): void;
        update(hit: boolean, pointX: number, pointY: number, pointZ: number, normalX: number, normalY: number, normalZ: number, collisionObject?: any): void;
    }
    /**
     * Lines Mesh Render Classes
     * @class LinesMeshRenderer - All rights reserved (c) 2024 Mackey Kinard
     */
    class LinesMeshRenderer {
        private _numPoints;
        private _pointMesh;
        private _pointSize;
        private _pointType;
        private _linesName;
        private _linesMesh;
        private _babylonScene;
        get pointMesh(): BABYLON.Mesh;
        get linesMesh(): BABYLON.LinesMesh;
        constructor(name: string, scene: BABYLON.Scene, pointType?: number, pointSize?: number);
        dispose(doNotRecurse?: boolean): void;
        hidePoint(hide?: boolean): void;
        drawPoint(position: BABYLON.Vector3): void;
        drawLine(points: BABYLON.Vector3[], color?: BABYLON.Color3): void;
    }
    /**
     * Preload Assets Manager Classes (Note: No Progress Events For Textures)
     * @class PreloadAssetsManager - All rights reserved (c) 2024 Mackey Kinard
     */
    class PreloadAssetsManager extends BABYLON.AssetsManager {
        /**
         * Add a ContainerAssetTask to the list of active tasks
         * Note: Progress Tracking Supported
         * @param taskName defines the name of the new task
         * @param meshesNames defines the name of meshes to load
         * @param rootUrl defines the root url to use to locate files
         * @param sceneFilename defines the filename of the scene file
         * @returns a new ContainerAssetTask object
         */
        addContainerTask(taskName: string, meshesNames: any, rootUrl: string, sceneFilename: string): BABYLON.ContainerAssetTask;
        /**
         * Add a MeshAssetTask to the list of active tasks
         * Note: Progress Tracking Supported
         * @param taskName defines the name of the new task
         * @param meshesNames defines the name of meshes to load
         * @param rootUrl defines the root url to use to locate files
         * @param sceneFilename defines the filename of the scene file
         * @returns a new MeshAssetTask object
         */
        addMeshTask(taskName: string, meshesNames: any, rootUrl: string, sceneFilename: string): BABYLON.MeshAssetTask;
        /**
         * Add a TextFileAssetTask to the list of active tasks
         * Note: Progress Tracking Supported
         * @param taskName defines the name of the new task
         * @param url defines the url of the file to load
         * @returns a new TextFileAssetTask object
         */
        addTextFileTask(taskName: string, url: string): BABYLON.TextFileAssetTask;
        /**
         * Add a BinaryFileAssetTask to the list of active tasks
         * Note: Progress Tracking Supported
         * @param taskName defines the name of the new task
         * @param url defines the url of the file to load
         * @returns a new BinaryFileAssetTask object
         */
        addBinaryFileTask(taskName: string, url: string): BABYLON.BinaryFileAssetTask;
        /**
         * Add a ImageAssetTask to the list of active tasks
         * Note: Progress Tracking Supported
         * @param taskName defines the name of the new task
         * @param url defines the url of the file to load
         * @returns a new ImageAssetTask object
         */
        addImageTask(taskName: string, url: string): BABYLON.ImageAssetTask;
        /**
         * Handle Preloading Progress Events
         */
        private handlePreloadingProgress;
    }
    /**
     * Babylon network entity controller (Colyseus Universal Game Room)
     * @class EntityController - All rights reserved (c) 2024 Mackey Kinard
     */
    class EntityController {
        /** Validates a network entity on the transform node. */
        static HasNetworkEntity(transform: BABYLON.TransformNode): boolean;
        /** Gets the network entity id on the transform node. */
        static GetNetworkEntityId(transform: BABYLON.TransformNode): string;
        /** Gets the network entity type on the transform node. */
        static GetNetworkEntityType(transform: BABYLON.TransformNode): number;
        /** Gets the network entity owner session id on the transform node. */
        static GetNetworkEntitySessionId(transform: BABYLON.TransformNode): string;
        /** Queries the syncronized network entity attribute on the transform node. */
        static QueryNetworkAttribute(transform: BABYLON.TransformNode, key: string): string;
        /** Queries the buffered network entity attribute on the transform node. */
        static QueryBufferedAttribute(transform: BABYLON.TransformNode, index: number): number;
        /** Post the buffered network entity attribute on the transform node update batch. (Local Entities Only) */
        static PostBufferedAttribute(transform: BABYLON.TransformNode, index: number, value: number): void;
    }
    /**
     * Type utility describing a constructor function
     */
    type RecastClassCtor<T = any> = new (...args: any[]) => T;
    /**
     * Minimal set of typed helpers for Recast/Detour WASM module exported as bjsRECAST.
     * - Many types are left as `any` because the original Emscripten/wasm exports are complex.
     * - This interface documents all fields and callable methods discovered on `bjsRECAST`.
     */
    interface IRecastNavigationPlugin {
        isNull?: (v: any) => boolean;
        destroy?: (v: any) => void;
        allocCompactHeightfield?: () => any;
        allocContourSet?: () => any;
        allocHeightfield?: () => any;
        allocHeightfieldLayerSet?: () => any;
        allocPolyMesh?: () => any;
        allocPolyMeshDetail?: () => any;
        buildCompactHeightfield?: (buildContext: any, walkableHeight: number, walkableClimb: number, heightfield: any, compactHeightfield: any) => any;
        buildContours?: (buildContext: any, compactHeightfield: any, maxError: number, maxEdgeLen: number, contourSet: any, buildFlags?: number) => any;
        buildDistanceField?: (buildContext: any, compactHeightfield: any) => any;
        buildHeightfieldLayers?: (buildContext: any, compactHeightfield: any, borderSize: number, walkableHeight: number, heightfieldLayerSet: any) => any;
        buildLayerRegions?: (buildContext: any, compactHeightfield: any, borderSize: number, minRegionArea: number) => any;
        buildPolyMesh?: (buildContext: any, contourSet: any, nvp: number, polyMesh: any) => any;
        buildPolyMeshDetail?: (buildContext: any, mesh: any, compactHeightfield: any, sampleDist: number, sampleMaxError: number, polyMeshDetail: any) => any;
        buildRegions?: (buildContext: any, compactHeightfield: any, borderSize: number, minRegionArea: number, mergeRegionArea: number) => any;
        buildRegionsMonotone?: (buildContext: any, compactHeightfield: any, borderSize: number, minRegionArea: number, mergeRegionArea: number) => any;
        buildTileCacheLayer?: (comp: any, header: any, heights: any, areas: any, cons: any, tileCacheData: any) => any;
        buildTiledNavMeshRcConfig?: (options: {
            recastConfig: any;
            navMeshBounds: [number, number, number, number, number, number];
        }) => any;
        calcBounds?: (verts: number[], nv: number) => any;
        calcGridSize?: (bmin: number[], bmax: number[], cs: number) => any;
        clearUnwalkableTriangles?: (buildContext: any, walkableSlopeAngle: number, verts: number[], nv: number, tris: number[], nt: number, areas: any) => any;
        cloneRcConfig?: (rcConfig: any) => any;
        copyPolyMesh?: (buildContext: any, src: any, dest: any) => any;
        createDefaultTileCacheMeshProcess?: () => any;
        createHeightfield?: (buildContext: any, heightfield: any, width: number, height: number, bmin: number[], bmax: number[], cs: number, ch: number) => any;
        createNavMeshData?: (navMeshCreateParams: any) => any;
        createRcConfig?: (partialConfig: any) => any;
        crowdAgentParamsDefaults?: {
            [key: string]: any;
        };
        dtIlog2?: (v: number) => number;
        dtNextPow2?: (v: number) => number;
        erodeWalkableArea?: (buildContext: any, radius: number, compactHeightfield: any) => any;
        exportNavMesh?: (navMesh: any) => any;
        exportTileCache?: (navMesh: any, tileCache: any) => any;
        filterLedgeSpans?: (buildContext: any, walkableHeight: number, verts: number[], nv: number, tris: number[], nt: number, areas: any) => any;
        filterLowHangingWalkableObstacles?: (buildContext: any, walkableClimb: number, heightfield: any) => any;
        filterWalkableLowHeightSpans?: (buildContext: any, walkableHeight: number, heightfield: any) => any;
        floodFillPruneNavMesh?: (navMesh: any, startPolyRefs: any) => any;
        freeCompactHeightfield?: (compactHeightfield: any) => void;
        freeContourSet?: (contourSet: any) => void;
        freeHeightfield?: (heightfield: any) => void;
        freeHeightfieldLayerSet?: (heightfieldLayerSet: any) => void;
        freePolyMesh?: (polyMesh: any) => void;
        freePolyMeshDetail?: (polyMeshDetail: any) => void;
        generateSoloNavMesh?: (positions: number[], indices: number[], navMeshGeneratorConfig?: any, keepIntermediates?: boolean) => any;
        generateSoloNavMeshData?: (positions: number[], indices: number[], navMeshGeneratorConfig?: any, keepIntermediates?: boolean) => any;
        generateTileCache?: (positions: number[], indices: number[], navMeshGeneratorConfig?: any, keepIntermediates?: boolean) => any;
        generateTileNavMeshData?: (positions: number[], indices: number[], rcConfig: any, chunkyTriMesh: any, tile: number, options?: any, keepIntermediates?: boolean, buildContext?: any) => any;
        generateTiledNavMesh?: (positions: number[], indices: number[], navMeshGeneratorConfig?: any, keepIntermediates?: boolean) => any;
        getBoundingBox?: (positions: number[], indices: number[]) => any;
        getCon?: (compactSpan: any, dir: number) => any;
        getDirForOffset?: (x: number, y: number) => number;
        getDirOffsetX?: (dir: number) => number;
        getDirOffsetY?: (dir: number) => number;
        getHeightFieldSpanCount?: (buildContext: any, heightfield: any) => number;
        getHeightfieldLayerAreas?: (heightfieldLayer: any) => any;
        getHeightfieldLayerCons?: (heightfieldLayer: any) => any;
        getHeightfieldLayerHeights?: (heightfieldLayer: any) => any;
        getNavMeshPositionsAndIndices?: (navMesh: any, flags?: number) => any;
        getRandomSeed?: () => number;
        importNavMesh?: (data: any) => any;
        importTileCache?: (data: any, tileCacheMeshProcess?: any) => any;
        init?: (impl: any) => Promise<any> | any;
        markBoxArea?: (buildContext: any, bmin: number[], bmax: number[], areaId: number, compactHeightfield: any) => any;
        markConvexPolyArea?: (buildContext: any, verts: number[], nverts: number, hmin: number, hmax: number, areaId: number, compactHeightfield: any) => any;
        markCylinderArea?: (buildContext: any, pos: number[], radius: number, height: number, areaId: number, compactHeightfield: any) => any;
        markWalkableTriangles?: (buildContext: any, walkableSlopeAngle: number, verts: number[], nv: number, tris: number[], nt: number, areas: any) => any;
        medianFilterWalkableArea?: (buildContext: any, compactHeightfield: any) => any;
        mergePolyMeshDetails?: (buildContext: any, meshes: any[], out: any) => any;
        mergePolyMeshes?: (buildContext: any, meshes: any[], outPolyMesh: any) => any;
        mergePositionsAndIndices?: (meshes: any[]) => any;
        rasterizeTriangles?: (buildContext: any, verts: number[], nv: number, tris: number[], areas: any, nt: number, heightfield: any, flagMergeThreshold?: number) => any;
        recastConfigDefaults?: Record<string, any>;
        rgbToDuRgba?: (hexColor: string | number) => number;
        setCon?: (compactSpan: any, dir: number, i: number) => any;
        setRandomSeed?: (seed: number) => void;
        soloNavMeshGeneratorConfigDefaults?: Record<string, any>;
        statusDetail?: (status: number, detail: number) => number;
        statusFailed?: (status: number) => boolean;
        statusInProgress?: (status: number) => boolean;
        statusSucceed?: (status: number) => boolean;
        statusToReadableString?: (status: number) => string;
        tileCacheGeneratorConfigDefaults?: Record<string, any>;
        tiledNavMeshGeneratorConfigDefaults?: Record<string, any>;
    }
    /**
     * Babylon GUI Image Container
     * @class ImageContainer - All rights reserved (c) 2024 Mackey Kinard
     */
}
declare namespace TOOLKIT {
    /**
     * Babylon Toolkit Unity Editor - Loader Class
     * @class CVTOOLS_unity_metadata - All rights reserved (c) 2024 Mackey Kinard
     * [Specification](https://github.com/MackeyK24/glTF/tree/master/extensions/2.0/Vendor/CVTOOLS_unity_metadata)
     */
    enum MaterialAlphaMode {
        /**
         * The alpha value is ignored and the rendered output is fully opaque
         */
        OPAQUE = "OPAQUE",
        /**
         * The rendered output is either fully opaque or fully transparent depending on the alpha value and the specified alpha cutoff value
         */
        MASK = "MASK",
        /**
         * The alpha value is used to composite the source and destination areas. The rendered output is combined with the background using the normal painting operation (i.e. the Porter and Duff over operator)
         */
        BLEND = "BLEND"
    }
    class CubeTextureLoader {
        name: string;
        size: number;
        mapkey: string;
        material: BABYLON.Material;
        extension: string;
        prefiltered: boolean;
        boundingBoxSize: BABYLON.Vector3;
        boundingBoxPosition: BABYLON.Vector3;
        reflectionProbePower: number;
    }
    class CVTOOLS_unity_metadata implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /** The name of this extension. */
        readonly name: string;
        /** A tiny value used for diffuse IBL adjustments (default: 0.001) */
        static readonly IBL_TINY_VALUE: number;
        /** A factor used for specular IBL adjustments (default: 1.0) */
        static readonly IBL_SPEC_FACTOR: number;
        /** The scale factor used for reflection probe power (default: 1.0) */
        static readonly IBL_PROBE_FACTOR: number;
        /**
         * Suppresses the derived diffuse irradiance (spherical polynomial) on a local reflection probe so it
         * contributes specular only, matching Unity's specular-only reflection probe model. Babylon lazily
         * integrates a spherical polynomial from the cube faces the first time a PBR material reads it, so
         * nulling the value alone is not enough - we must also flag it as computed to stop regeneration.
         */
        static SuppressReflectionProbeDiffuse(texture: BABYLON.BaseTexture): void;
        /**
         * Applies the scene's global Unity ambient spherical-harmonics irradiance to a local reflection probe so the
         * probe contributes Unity-style specular reflections while its diffuse ambient comes from the SAME global SH
         * the rest of the scene uses - instead of being derived from (or suppressed on) the probe's own cube faces.
         * Babylon reads diffuse irradiance from the material's own reflectionTexture, so without this a probe-bearing
         * material would lose all baked IBL ambient. When no global SH is available we fall back to specular-only
         * (suppressed diffuse), preserving the previous Unity behavior.
         */
        static ApplyGlobalReflectionProbeDiffuse(texture: BABYLON.BaseTexture, scene: BABYLON.Scene, createPolynomialsFromFaces?: boolean): void;
        /** Tracks whether the global box-projection reflection shader fix has been installed (install-once). */
        private static _boxProjectionShaderPatched;
        /**
         * Installs a Unity-faithful per-pixel containment test into Babylon's shared `parallaxCorrectNormal`
         * box-projection helper (patches both the GLSL and WGSL copies of the `helperFunctions` shader include).
         *
         * Babylon applies box (local cubemap) projection to EVERY pixel of a material that has a reflection
         * bounding box, with no skybox fallback. Surfaces that sit OUTSIDE the probe box - e.g. a tall building
         * reflecting a ground-level racetrack probe - therefore hit the slab-intersection math in its invalid
         * regime (exit distance <= 0) and sample the dark box floor, turning glossy/metallic surfaces black.
         *
         * Unity instead evaluates probe contribution per-pixel: "When a pixel of an object is outside of any
         * reflection probe volume, Unity uses the skybox reflection." This injects exactly that rule - if the
         * shaded world position is outside the probe box on any axis, return the un-projected (infinite)
         * reflection vector so the pixel reflects the environment (the probe's sky hemisphere) instead of the
         * dark face. Pixels INSIDE the box are byte-for-byte unchanged, so ground reflections keep their
         * parallax correction.
         *
         * The patch is install-once, idempotent (sentinel guarded) and FAIL-SAFE: if a future Babylon release
         * renames or reformats the helper so the anchor is not found, it logs a warning and leaves the stock
         * shader untouched (reverting to Babylon's default behavior) rather than emitting a broken shader.
         * See README.md ("Box-Projected Reflection Shader Patch") for the full rationale.
         */
        /** Defines whether this extension is enabled. */
        enabled: boolean;
        private _webgpu;
        private _loader;
        private _babylonScene;
        private _metadataParser;
        private _loaderScene;
        private _assetsManager;
        private _parserList;
        private _masterList;
        private _detailList;
        private _shaderList;
        private _readyList;
        private _preloadList;
        private _animationGroups;
        private _materialMap;
        private _lightmapMap;
        private _reflectionMap;
        private _reflectionCache;
        private _assetContainer;
        private _activeMeshes;
        private _parseScene;
        private _leftHanded;
        private _disposeRoot;
        private _sceneParsed;
        private _preWarmTime;
        private _hideLoader;
        private _rootUrl;
        private _fileName;
        private _licenseName;
        private _licenseType;
        private _pendingReflectionTextures;
        private static ScriptBundleCache;
        /** @hidden */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @hidden */
        dispose(): void;
        /**
         * @hidden Async extension factory used by the glTF loader extension registry.
         *
         * The glTF loader awaits each registered extension factory inside _loadExtensionsAsync()
         * AFTER the glTF JSON has been parsed (loader._gltf is populated) but BEFORE _extensionsOnLoading()
         * and any scene/node/material loading runs. This is the only safe place to await the project
         * script bundle so that custom material classes (eg. vertex splat shaders) are registered on the
         * global scope before createMaterial() needs to instantiate them.
         *
         * IMPORTANT: We cannot await the bundle inside loadSceneAsync(). The loader's re-entrancy guard
         * (_applyExtensions -> _activeLoaderExtensionFunctions) is only held across the SYNCHRONOUS call
         * into this._loader.loadSceneAsync(). Awaiting before that call clears the guard, so the base loader
         * re-dispatches back into this extension -> infinite recursion / hang. The factory phase has no such
         * guard, so awaiting here is safe and deterministic.
         */
        static CreateExtensionAsync(loader: BABYLON.GLTF2.GLTFLoader): Promise<TOOLKIT.CVTOOLS_unity_metadata>;
        /**
         * Reads the project script bundle (script/project) from the parsed glTF scene metadata and loads it.
         * Safe to await: this runs during the extension factory phase, before any material is created.
         */
        preloadProjectScriptBundleAsync(): Promise<void>;
        /** @hidden */
        onLoading(): void;
        /** @hidden */
        onReady(): void;
        /** @hidden */
        onComplete(): void;
        getScriptBundleTag(): string;
        getScriptBundleUrl(): string;
        finishComplete(): void;
        /** @hidden */
        onValidate(): void;
        /** @hidden */
        onCleanup(): void;
        /** @hidden */
        setupLoader(): void;
        /** @hidden */
        startParsing(): void;
        private _processActiveMeshes;
        private _processUnityMeshes;
        private _processPreloadTimeout;
        /** @hidden */
        loadSceneAsync(context: string, scene: BABYLON.GLTF2.Loader.IScene): Promise<void> | null;
        private _loadSceneInternalAsync;
        private _loadSceneExAsync;
        /** @hidden */
        loadNodeAsync(context: string, node: BABYLON.GLTF2.Loader.INode, assign: (babylonMesh: BABYLON.TransformNode) => void): Promise<BABYLON.TransformNode> | null;
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: BABYLON.Material): BABYLON.Nullable<Promise<void>>;
        private _getCachedMaterialByIndex;
        private _getCachedLightmapByIndex;
        /** @hidden */
        createMaterial(context: string, material: BABYLON.GLTF2.IMaterial, babylonDrawMode: number): BABYLON.Nullable<BABYLON.Material>;
        /**
         * Loads a glTF animation.
         * @param context The context when loading the asset
         * @param animation The glTF animation property
         * @returns A promise that resolves with the loaded Babylon animation group when the load is complete
         */
        loadAnimationAsync(context: string, animation: BABYLON.GLTF2.Loader.IAnimation): Promise<BABYLON.AnimationGroup>;
        /**
         * @hidden Define this method to modify the default behavior when loading data for mesh primitives.
         * @param context The context when loading the asset
         * @param name The mesh name when loading the asset
         * @param node The glTF node when loading the asset
         * @param mesh The glTF mesh when loading the asset
         * @param primitive The glTF mesh primitive property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded mesh when the load is complete or null if not handled
         */
        _loadMeshPrimitiveAsync(context: string, name: string, node: BABYLON.GLTF2.INode, mesh: BABYLON.GLTF2.IMesh, primitive: any, assign: (babylonMesh: BABYLON.AbstractMesh) => void): Promise<BABYLON.AbstractMesh>;
        private _setupBabylonMesh;
        private _setupBabylonMultiMaterials;
        /**
         * Rebuilds Unity-style LOD switching from the per-node `lods`/`distances` metadata (this project does
         * not use MSFT_lod). Each `lods` entry is one LOD level and is either a single renderer name (a
         * `string`, `"*"` = the group root) or the names of every renderer in that level (a `string[]`); legacy
         * single-renderer metadata (all strings) parses unchanged. `distances[i]` is the far threshold of level
         * `i` and `distances[N-1]` doubles as the cull threshold.
         *
         * HYBRID strategy, decided per group after normalization:
         *  - Native fast path (every level resolves to exactly one mesh): `master.addLODLevel(distances[i-1], mesh)`
         *    for the detail levels plus a final `addLODLevel(cull, null)` band - identical perf/behavior to
         *    legacy content. Native LOD cannot be used on an InstancedMesh master, so unused detail instances
         *    are disposed as the legacy code did.
         *  - Custom switcher (any level has >1 mesh): a single `onBeforeRenderObservable` handler that toggles
         *    all meshes of a level together on band transitions, because native `addLODLevel` is strictly
         *    1 master -> 1 replacement and cannot express N renderers per level.
         */
        private _processLevelOfDetail;
        /**
         * Registers a single per-frame LOD switcher for a group that has at least one level with multiple
         * renderers (native `addLODLevel` cannot represent that structurally). Toggles every mesh of the active
         * level together, only on band transitions, and tears the observer down on scene/root dispose.
         */
        private _setupLevelOfDetailSwitcher;
        private _processShaderMaterials;
        private preProcessSceneProperties;
        private postProcessSceneProperties;
        private updateSkyboxEnvironment;
        private generateSphericalHarmonics;
        private lateProcessSceneProperties;
        private _preloadRawMaterialsAsync;
        private _parseMultiMaterialAsync;
        private _parseCommonConstantProperties;
        private _parseUniformAndSamplerProperties;
        private applyRepoWatermark;
    }
    /**
     * Babylon Toolkit Editor - Loader Class
     * @class CVTOOLS_babylon_mesh - All rights reserved (c) 2024 Mackey Kinard
     * [Specification](https://github.com/MackeyK24/glTF/tree/master/extensions/2.0/Vendor/CVTOOLS_unity_metadata)
     */
    class CVTOOLS_babylon_mesh implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /** The name of this extension. */
        readonly name: string;
        /** Defines whether this extension is enabled. */
        enabled: boolean;
        private _loader;
        /** @hidden */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @hidden */
        dispose(): void;
    }
    /**
     * Babylon Toolkit Editor - Loader Class
     * @class CVTOOLS_left_handed - All rights reserved (c) 2024 Mackey Kinard
     * [Specification](https://github.com/MackeyK24/glTF/tree/master/extensions/2.0/Vendor/CVTOOLS_unity_metadata)
     */
    class CVTOOLS_left_handed implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /** The name of this extension. */
        readonly name: string;
        /** Defines whether this extension is enabled. */
        enabled: boolean;
        private _loader;
        /** @hidden */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @hidden */
        dispose(): void;
    }
}
declare namespace TOOLKIT {
    /**
      * GLTF Custom Shader Material (BABYLON.PBRMaterial)
      * @class CustomShaderMaterial - All rights reserved (c) 2024 Mackey Kinard
      */
    class CustomShaderMaterial extends BABYLON.PBRMaterial {
        universalMaterial: boolean;
        private _defines;
        private _uniforms;
        private _samplers;
        private _attributes;
        private _textures;
        private _vectors4;
        private _vectors3;
        private _vectors2;
        private _floats;
        private _bools;
        private _ubos;
        /** Track WGSL samplers emitted for this material to avoid duplicate declarations (WGSL has no preprocessor) */
        private _wgslSamplers;
        /** Textures in this set skip per-draw-call matrix/infos upload — use for raw data samplers (VAT, LUTs). */
        private _noMatrixTextures;
        protected shader: string;
        protected plugin: BABYLON.MaterialPluginBase;
        private _unityLightingPlugin;
        /** Per-skin Texture2DArray switching — opt-in via enableSkinArray(). One shared mesh + an N-layer
         *  albedo array renders a different "skin" per layer, selected by tkSkinLayer. Unlike the atlas path
         *  there is NO UV remap: the surface UVs are used as-is and the layer index picks the slice, so every
         *  skin keeps full resolution with its OWN clean mip chain (no atlas cross-cell bleed). */
        private _skinArray;
        /** Per-skin NORMAL Texture2DArray switching — opt-in via enableSkinArrayNormal() once a tkNormalArray
         *  is assigned. The fragment overrides normalW at CUSTOM_FRAGMENT_BEFORE_LIGHTS by running Babylon's
         *  OWN perturbNormal() on its OWN interpolated vTBN with our slice texel substituted for the bump-
         *  sampler fetch — i.e. byte-for-byte the native tangent-space bump, no reinvented/derivative TBN
         *  (that derivative frame is what specular-speckled glossy metal). The normal array is built WITHOUT
         *  mips (box-downsampled normals de-normalize and grain on WebGPU) and kept linear. */
        private _skinArrayNormal;
        /** Per-skin METALLIC-ROUGHNESS Texture2DArray switching — opt-in via enableSkinArrayMetalRough() once a
         *  tkMetalRoughArray is assigned. Its hook (CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS) is INSIDE Babylon's
         *  reflectivityBlock where UVs/samplers aren't in scope, so the slice is sampled in main() (UPDATE_ALBEDO)
         *  into a module-global and READ at the hook: metallicRoughness.r=metallic (slice .B), .g=roughness
         *  (slice .G), matching the glTF MR layout. Built MIPPED + linear (roughness wants mip filtering). */
        private _skinArrayMetalRough;
        /** Per-skin EMISSIVE Texture2DArray switching — opt-in via enableSkinArrayEmissive() once a tkEmissiveArray
         *  is assigned. Overrides finalEmissive at CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION with
         *  toLinearSpace(slice) (slices are sRGB-authored, mipped). finalEmissive exists even with NO base emissive
         *  on the material, so this drives emissive-only swaps (e.g. brake lights on/off) with no albedo needed. */
        private _skinArrayEmissive;
        /** When true tkSkinLayer is a shared material uniform (one skin per mesh); otherwise a per-instance
         *  vertex attribute (per-instance skins on a hardware-instanced mesh). Independent of which channels are on. */
        private _skinLayerUniform;
        private _skinArraySwitchingPlugin;
        getPlugin(): BABYLON.MaterialPluginBase;
        getClassName(): string;
        constructor(name: string, scene: BABYLON.Scene);
        initMaterial(): void;
        /** Adds a custom attribute property */
        addAttribute(attributeName: string): void;
        /** Checks uniform values. Internal Use Only */
        checkUniform(uniformName: string, type: string, value?: any): void;
        /** Checks sampler values. Internal Use Only */
        checkSampler(samplerName: string, texture?: any): void;
        /** Splits the IBL lighting contributions */
        splitLighting(diffuseIbl: number, specularIbl: number): void;
        /**
         * Enable (or disable) per-skin Texture2DArray switching for this material (albedo channel).
         *
         * One shared mesh + an N-layer albedo array renders a different "skin" per layer. The surface UVs are
         * used as-is (NO atlas remap); a single layer index selects the slice:
         *
         *     surfaceAlbedo = texture(tkAlbedoArray, vec3(uv, tkSkinLayer))
         *
         * Each layer is a full-resolution slice with its OWN clean mip chain — no atlas cross-cell bleed.
         * Assign the array first with addTextureArrayUniform("tkAlbedoArray", array), then call this to gate
         * the shader. Disabled by default — a material that never opts in compiles to identical code (every
         * injected line is gated behind TOOLKIT_SKIN_ARRAY).
         *
         * Layer source:
         *  - Shared uniform (layerUniform = true): tkSkinLayer is one material uniform (setSkinLayer) — the
         *    only mode that works on a NON-instanced mesh (one skin per mesh).
         *  - Per-instance (layerUniform = false): tkSkinLayer is a per-instance vertex attribute — register
         *    mesh.registerInstancedBuffer("tkSkinLayer", 1) and set inst.instancedBuffers.tkSkinLayer = i.
         */
        enableSkinArray(layerUniform?: boolean): TOOLKIT.CustomShaderMaterial;
        /** Set the shared per-skin array layer (uniform mode — one skin for the whole mesh). No shader
         *  rebuild; just updates the uniform. For per-instance skins set inst.instancedBuffers.tkSkinLayer. */
        setSkinLayer(layer: number): TOOLKIT.CustomShaderMaterial;
        /**
         * Enable (or disable) per-skin NORMAL Texture2DArray switching for this material.
         *
         * Assign the array first with addTextureArrayUniform("tkNormalArray", array), then call this. The
         * fragment overrides normalW at CUSTOM_FRAGMENT_BEFORE_LIGHTS using Babylon's native tangent-space
         * bump EXACTLY — its own perturbNormal() on its own vTBN, only the sampled texel swapped for our
         * slice. It is therefore only active where the native tangent frame exists: BUMP && TANGENT && NORMAL
         * (i.e. the base material has a normal/bump map and the geometry has tangents — true for skinned
         * characters). Where that frame is absent the override compiles out and the native normal stands.
         * Fully INDEPENDENT of the other channels: the shared vSkinLayer/vSkinUV varyings are forwarded whenever
         * ANY skin channel is enabled, so normal can be used with NO albedo array (and vice-versa).
         */
        enableSkinArrayNormal(enabled?: boolean): TOOLKIT.CustomShaderMaterial;
        /**
         * Enable (or disable) per-skin METALLIC-ROUGHNESS Texture2DArray switching. Assign the array first with
         * addTextureArrayUniform("tkMetalRoughArray", array), then call this. The slice is sampled in main() and
         * applied at CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS as metallicRoughness.r=metallic (slice .B) and
         * .g=roughness (slice .G) — the glTF MR channel layout. Only active under METALLICWORKFLOW (PBR metallic).
         * Independent of every other channel (shared varyings forward whenever any channel is on).
         */
        enableSkinArrayMetalRough(enabled?: boolean): TOOLKIT.CustomShaderMaterial;
        /**
         * Enable (or disable) per-skin EMISSIVE Texture2DArray switching. Assign the array first with
         * addTextureArrayUniform("tkEmissiveArray", array), then call this. Overrides finalEmissive at
         * CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION with toLinearSpace(slice). Works with NO base emissive on
         * the material, so it can drive emissive-only swaps (e.g. brake lights on/off) standalone. Independent of
         * every other channel.
         */
        enableSkinArrayEmissive(enabled?: boolean): TOOLKIT.CustomShaderMaterial;
        /**
         * Set the per-skin layer DELIVERY mode independently of which channels are enabled: uniform = true drives
         * a single shared layer for the whole mesh (tkSkinLayerUni, set via setSkinLayer) — the only mode that
         * works on a non-instanced mesh; uniform = false reads a per-instance tkSkinLayer vertex attribute. Call
         * this once for the mesh (regardless of channel mix) so e.g. an emissive-only mesh still selects layers.
         */
        setSkinArrayLayerMode(uniform: boolean): TOOLKIT.CustomShaderMaterial;
        /** Register a Texture2DArray sampler (sampler2DArray / texture_2d_array) for skin switching. The
         *  declaration is emitted by SkinArraySwitchingPlugin (co-gated with its usage); here we only register
         *  the name for binding and store the texture for upload. Marked raw — arrays carry no UV transform. */
        addTextureArrayUniform(name: string, texture: BABYLON.BaseTexture): TOOLKIT.CustomShaderMaterial;
        /** True when per-skin ALBEDO Texture2DArray switching is enabled (see enableSkinArray). */
        get skinArray(): boolean;
        /** True when per-skin NORMAL Texture2DArray switching is enabled (see enableSkinArrayNormal). */
        get skinArrayNormal(): boolean;
        /** True when per-skin METALLIC-ROUGHNESS switching is enabled (see enableSkinArrayMetalRough). */
        get skinArrayMetalRough(): boolean;
        /** True when per-skin EMISSIVE switching is enabled (see enableSkinArrayEmissive). */
        get skinArrayEmissive(): boolean;
        /** True when ANY per-skin channel is enabled — the master gate for the shared layer/UV varyings + the
         *  per-instance tkSkinLayer attribute, so any single channel works without the others. */
        get skinArrayActive(): boolean;
        /** True when tkSkinLayer is a shared material uniform rather than a per-instance vertex attribute. */
        get skinLayerUniform(): boolean;
        /**
         * Clone this material, preserving the CustomShaderMaterial SUBCLASS and ALL toolkit state — the
         * custom uniforms / samplers / attributes, the IBL split, and the per-skin Texture2DArray switching
         * configuration. Each clone is independent: it can hold its own skin (layer index) without affecting
         * the source material, which makes per-mesh skin selection on NON-instanced meshes safe.
         *
         * BabylonJS PBRMaterial.clone() builds a plain PBRMaterial through its own factory, which would
         * drop the toolkit shader hooks and the skin-array API. Here we instead:
         *  1. construct the correct subclass via `this.constructor` so the two material plugins
         *     (UnityStyleLightingPlugin, SkinArraySwitchingPlugin) and the base UBO uniforms are recreated
         *     FRESH and bound to the clone — we deliberately do NOT plugin-clone the source's plugins;
         *  2. copy the standard PBR surface properties with SerializationHelper (shares texture refs);
         *  3. copy the toolkit-private collections + skin-array config (see copyCustomStateTo).
         *
         * NOTE: VertexAnimationMaterial carries extra VAT state and provides its own cloneForInstance();
         * prefer that for VAT materials.
         */
        clone(name: string, cloneTexturesOnlyOnce?: boolean, rootUrl?: string): TOOLKIT.CustomShaderMaterial;
        /** Copies all toolkit-private state (custom shader collections + skin-array config) onto a clone. */
        protected copyCustomStateTo(result: TOOLKIT.CustomShaderMaterial): void;
        /** Adds a texture uniform property */
        addTextureUniform(name: string, texture: BABYLON.Texture): TOOLKIT.CustomShaderMaterial;
        /** Sets the texture uniform value */
        setTextureValue(name: string, texture: BABYLON.Texture): TOOLKIT.CustomShaderMaterial;
        /**
         * Marks a texture sampler as a raw data texture — skips the per-draw-call texture matrix and
         * coordinate infos upload in updateCustomBindings(). Use for pure data samplers (VAT position/
         * normal textures, LUTs etc.) that do not use BabylonJS UV transforms. The texture is still
         * bound each draw call via setTexture(); only the 16-float matrix and 2-float infos writes
         * are suppressed, eliminating ~18 wasted UBO float-writes per texture per draw call.
         */
        markTextureAsRaw(name: string): void;
        /** Gets the texture uniform value */
        getTextureValue(name: string): BABYLON.Texture;
        /** Adds a vector4 uniform property */
        addVector4Uniform(name: string, value: BABYLON.Vector4): TOOLKIT.CustomShaderMaterial;
        /** Sets the vector4 uniform value */
        setVector4Value(name: string, value: BABYLON.Vector4): TOOLKIT.CustomShaderMaterial;
        /** Gets the vector4 uniform value */
        getVector4Value(name: string): BABYLON.Vector4;
        /** Adds a vector3 uniform property */
        addVector3Uniform(name: string, value: BABYLON.Vector3): TOOLKIT.CustomShaderMaterial;
        /** Sets the vector3 uniform value */
        setVector3Value(name: string, value: BABYLON.Vector3): TOOLKIT.CustomShaderMaterial;
        /** Gets the vector3 uniform value */
        getVector3Value(name: string): BABYLON.Vector3;
        /** Adds a vector2 uniform property */
        addVector2Uniform(name: string, value: BABYLON.Vector2): TOOLKIT.CustomShaderMaterial;
        /** Sets the vector2 uniform value */
        setVector2Value(name: string, value: BABYLON.Vector2): TOOLKIT.CustomShaderMaterial;
        /** Gets the vector2 uniform value */
        getVector2Value(name: string): BABYLON.Vector2;
        /** Adds a float uniform property */
        addFloatUniform(name: string, value: number): TOOLKIT.CustomShaderMaterial;
        /** Sets the float uniform value */
        setFloatValue(name: string, value: number): TOOLKIT.CustomShaderMaterial;
        /** Gets the float uniform value */
        getFloatValue(name: string): number;
        /** Adds a boolean uniform property */
        addBoolUniform(name: string, value: boolean): TOOLKIT.CustomShaderMaterial;
        /** Sets the boolean uniform value */
        setBoolValue(name: string, value: boolean): TOOLKIT.CustomShaderMaterial;
        /** Gets the boolean uniform value */
        getBoolValue(name: string): boolean;
        /** Gets the animatables */
        getAnimatables(): BABYLON.IAnimatable[];
        /** Gets the active textures */
        getActiveTextures(): BABYLON.BaseTexture[];
        /** Has the specified texture */
        hasTexture(texture: BABYLON.BaseTexture): boolean;
        /** Gets this custom material uniforms */
        getCustomUniforms(wgsl: boolean): any;
        /** Gets this custom material uniforms */
        getCustomSamplers(): string[];
        /** Gets this custom material attributes */
        getCustomAttributes(): string[];
        /** Gets this custom material vertex source */
        getCustomVertexCode(wgsl: boolean): string;
        /** Gets this custom material fragment source */
        getCustomFragmentCode(wgsl: boolean): string;
        /** Prepares the custom material defines */
        prepareCustomDefines(defines: BABYLON.MaterialDefines): void;
        /** Update custom material bindings */
        updateCustomBindings(effectOrUniformBuffer: BABYLON.UniformBuffer | BABYLON.Effect): void;
        /** Update custom material bindings */
        legacyUpdateCustomBindings(effect: BABYLON.UniformBuffer): void;
        /** Builds a custom uniform property */
        protected buildUniformProperty(uniformName: string, uniformType: string, uniformValue: any): void;
    }
    /**
      * GLTF Custom Shader Material Plugin (BABYLON.MaterialPluginBase)
      * @class CustomShaderMaterialPlugin - All rights reserved (c) 2024 Mackey Kinard
      */
    class CustomShaderMaterialPlugin extends BABYLON.MaterialPluginBase {
        private _isEnabled;
        getClassName(): string;
        /**
         * Creates a new material plugin
         * @param material parent material of the plugin
         * @param name name of the plugin
         * @param priority priority of the plugin
         * @param defines list of defines used by the plugin. The value of the property is the default value for this property
         * @param addToPluginList true to add the plugin to the list of plugins managed by the material plugin manager of the material (default: true)
         * @param enable true to enable the plugin (it is handy if the plugin does not handle properties to switch its current activation)
         * @param resolveIncludes Indicates that any #include directive in the plugin code must be replaced by the corresponding code (default: false)
         */
        constructor(material: BABYLON.Material, name: string, priority: number, defines?: {}, addToPluginList?: boolean, enable?: boolean, resolveIncludes?: boolean);
        getIsEnabled(): boolean;
        setIsEnabled(enabled: boolean): void;
        vertexDefinitions: string;
        fragmentDefinitions: string;
        /** Gets a reference to the custom shader material */
        getCustomShaderMaterial(): TOOLKIT.CustomShaderMaterial;
    }
    /**
      * Unity-Style IBL split plugin
      * - Lets you scale diffuse IBL and specular IBL independently, without duplicating environment / probe cubemaps.
      * - Works for both scene.environmentTexture fallback and per-material reflectionTexture.
      *
      * Key idea:
      *   We keep textures shared and adjust contributions in shader code:
      *     diffuseIbl *= tkIblDiffuseScale
      *     specularIbl *= tkIblSpecularScale
      */
    class UnityStyleLightingPlugin extends TOOLKIT.CustomShaderMaterialPlugin {
        constructor(material: TOOLKIT.CustomShaderMaterial, shaderName: string);
        isCompatible(shaderLanguage: BABYLON.ShaderLanguage): boolean;
        getClassName(): string;
        getCustomCode(shaderType: string, shaderLanguage: BABYLON.ShaderLanguage): any;
        /** Provide custom uniforms (UBO) declarations */
        getUniforms(shaderLanguage: BABYLON.ShaderLanguage): any;
        prepareDefines(defines: BABYLON.MaterialDefines, scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        bindForSubMesh(uniformBuffer: BABYLON.UniformBuffer, scene: BABYLON.Scene, engine: BABYLON.AbstractEngine, subMesh: BABYLON.SubMesh): void;
    }
    /**
      * Per-Skin Texture2DArray Switching Plugin (BABYLON.MaterialPluginBase)
      *
      * Opt-in base-material feature that selects a per-skin SLICE from a Texture2DArray albedo channel by a
      * single layer index — one shared mesh + an N-layer array presents a different "skin" per mesh or per
      * instance (e.g. ten jockeys, each a layer). Unlike the texture atlas there is NO UV remap: the surface
      * UVs are used as-is and the layer index picks the slice, so every skin gets a full-resolution slice with
      * its OWN clean mip chain (no cross-cell bleed).
      *
      *     surfaceAlbedo = texture(tkAlbedoArray, vec3(uv, layer))   // albedo only (this phase)
      *
      * The layer comes from a per-instance vertex attribute (tkSkinLayer) OR a shared material uniform
      * (tkSkinLayerUni, the only mode that works on a NON-instanced mesh — one skin per mesh). The layer
      * value is constant across every vertex of a draw (uniform, or a per-instance attribute), so the
      * interpolated varying is constant and floor(v + 0.5) recovers the exact integer with no flat qualifier.
      *
      * All injected lines are gated behind TOOLKIT_SKIN_ARRAY, so a material that never calls
      * enableSkinArray() compiles to identical code.
      * @class SkinArraySwitchingPlugin - All rights reserved (c) 2024 Mackey Kinard
      */
    class SkinArraySwitchingPlugin extends TOOLKIT.CustomShaderMaterialPlugin {
        constructor(material: TOOLKIT.CustomShaderMaterial);
        isCompatible(shaderLanguage: BABYLON.ShaderLanguage): boolean;
        getClassName(): string;
        /** Advertise the per-instance layer attribute to the vertex shader (skipped in shared-uniform mode).
         *  Gated on ANY channel being active so an emissive-only / normal-only mesh still gets the layer. */
        getAttributes(attributes: string[], scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        /** Register the array sampler(s) with the effect so setTexture() can bind them. The actual sampler
         *  DECLARATIONS are emitted by this plugin's CUSTOM_FRAGMENT_DEFINITIONS (co-gated with their usage). */
        getSamplers(samplers: string[]): void;
        prepareDefines(defines: BABYLON.MaterialDefines, scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        getCustomCode(shaderType: string, shaderLanguage: BABYLON.ShaderLanguage): any;
        private getGLSLVertexDefinitions;
        private getGLSLVertexMainEnd;
        private getGLSLFragmentDefinitions;
        private getGLSLAlbedoCode;
        private getGLSLNormalCode;
        private getGLSLMetalRoughSampleCode;
        private getGLSLMetalRoughApplyCode;
        private getGLSLEmissiveCode;
        private getWGSLVertexDefinitions;
        private getWGSLVertexMainEnd;
        private getWGSLFragmentDefinitions;
        private getWGSLAlbedoCode;
        private getWGSLNormalCode;
        private getWGSLMetalRoughSampleCode;
        private getWGSLMetalRoughApplyCode;
        private getWGSLEmissiveCode;
    }
    /**
     * Babylon custom uniform items (GLTF)
     */
    type CustomUniformProperty = {
        name: string;
        size: number;
        type: string;
        arraySize?: number;
    };
    /**
      * Babylon universal shader material pro class
      * @class UniversalShaderMaterial - All rights reserved (c) 2024 Mackey Kinard
      */
    class UniversalShaderMaterial extends TOOLKIT.CustomShaderMaterial {
        constructor(name: string, scene: BABYLON.Scene);
        getShaderName(): string;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon toolkit metadata parser class (Internal use only)
     * @class MetadataParser - All rights reserved (c) 2024 Mackey Kinard
     */
    class MetadataParser {
        private _physicList;
        private _shadowList;
        private _freezeList;
        private _scriptList;
        private _babylonScene;
        constructor(scene: BABYLON.Scene);
        /** Parse the scene component metadata. Note: Internal use only */
        parseSceneComponents(entity: BABYLON.TransformNode): void;
        /** Post process pending scene components. Note: Internal use only */
        postProcessSceneComponents(preloadList: Array<TOOLKIT.ScriptComponent>, readyList: Array<TOOLKIT.ScriptComponent>): void;
        private static DoParseSceneComponents;
        private static DoProcessPendingScripts;
        private static DoProcessPendingShadows;
        private static DoProcessPendingPhysics;
        private static DoProcessPendingFreezes;
        private static SetupCameraComponent;
        private static SetupLightComponent;
    }
}
declare namespace TOOLKIT {
    /**
     * Deterministic 2D Perlin noise (seeded).
     * Used to approximate Unity Terrain detail noise behavior (stable placement/rotation/scale).
     */
    class Perlin2D {
        private perm;
        constructor(seed: number);
        private fade;
        private lerp;
        private grad;
        /**
         * Returns Perlin noise in range approximately [-1, 1]
         */
        noise(x: number, y: number): number;
    }
    /** SimplexNoise - A fast javascript implementation of simplex noise by Jonas Wagner
    Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
    Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
    With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
    Better rank ordering method by Stefan Gustavson in 2012.
  
    Copyright (c) 2022 Jonas Wagner
  
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
  
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
  
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
    /**
     * A random() function, must return a number in the interval [0,1), just like Math.random().
     */
    type RandomFn = () => number;
    /**
     * Samples the noise field in two dimensions
     *
     * Coordinates should be finite, bigger than -2^31 and smaller than 2^31.
     * @param x
     * @param y
     * @returns a number in the interval [-1, 1]
     */
    type NoiseFunction2D = (x: number, y: number) => number;
    /**
     * Samples the noise field in three dimensions
     *
     * Coordinates should be finite, bigger than -2^31 and smaller than 2^31.
     * @param x
     * @param y
     * @param z
     * @returns a number in the interval [-1, 1]
     */
    type NoiseFunction3D = (x: number, y: number, z: number) => number;
    /**
     * Samples the noise field in four dimensions
     *
     * Coordinates should be finite, bigger than -2^31 and smaller than 2^31.
     * @param x
     * @param y
     * @param z
     * @param w
     * @returns a number in the interval [-1, 1]
     */
    type NoiseFunction4D = (x: number, y: number, z: number, w: number) => number;
    class SimplexNoise {
        private static readonly F2;
        private static readonly G2;
        private static readonly F3;
        private static readonly G3;
        private static readonly F4;
        private static readonly G4;
        private static readonly grad2;
        private static readonly grad3;
        private static readonly grad4;
        private static fastFloor;
        /**
         * Creates a 2D noise function
         * @param random the random function that will be used to build the permutation table
         * @returns {NoiseFunction2D}
         */
        static createNoise2D(random?: RandomFn): NoiseFunction2D;
        /**
         * Creates a 3D noise function
         * @param random the random function that will be used to build the permutation table
         * @returns {NoiseFunction3D}
         */
        static createNoise3D(random?: RandomFn): NoiseFunction3D;
        /**
         * Creates a 4D noise function
         * @param random the random function that will be used to build the permutation table
         * @returns {NoiseFunction4D}
         */
        static createNoise4D(random?: RandomFn): NoiseFunction4D;
        /**
         * Builds a random permutation table.
         * This is exported only for (internal) testing purposes.
         * Do not rely on this export.
         * @private
         */
        static buildPermutationTable(random: RandomFn): Uint8Array;
    }
}
declare namespace TOOLKIT {
    /**
      * GLTF Custom Shader Material (BABYLON.StandardMaterial)
      * @class StandardShaderMaterial - All rights reserved (c) 2024 Mackey Kinard
      */
    class StandardShaderMaterial extends BABYLON.StandardMaterial {
        universalMaterial: boolean;
        private _defines;
        private _uniforms;
        private _samplers;
        private _attributes;
        private _textures;
        private _vectors4;
        private _vectors3;
        private _vectors2;
        private _floats;
        private _bools;
        private _ubos;
        /** Track WGSL samplers emitted for this material to avoid duplicate declarations (WGSL has no preprocessor) */
        private _wgslSamplers;
        protected shader: string;
        protected plugin: BABYLON.MaterialPluginBase;
        getClassName(): string;
        constructor(name: string, scene: BABYLON.Scene);
        initMaterial(): void;
        /** Adds a custom attribute property */
        addAttribute(attributeName: string): void;
        /** Checks uniform values. Internal Use Only */
        checkUniform(uniformName: string, type: string, value?: any): void;
        /** Checks sampler values. Internal Use Only */
        checkSampler(samplerName: string, texture?: any): void;
        /** Adds a texture uniform property */
        addTextureUniform(name: string, texture: BABYLON.Texture): TOOLKIT.StandardShaderMaterial;
        /** Sets the texture uniform value */
        setTextureValue(name: string, texture: BABYLON.Texture): TOOLKIT.StandardShaderMaterial;
        /** Gets the texture uniform value */
        getTextureValue(name: string): BABYLON.Texture;
        /** Adds a vector4 uniform property */
        addVector4Uniform(name: string, value: BABYLON.Vector4): TOOLKIT.StandardShaderMaterial;
        /** Sets the vector4 uniform value */
        setVector4Value(name: string, value: BABYLON.Vector4): TOOLKIT.StandardShaderMaterial;
        /** Gets the vector4 uniform value */
        getVector4Value(name: string): BABYLON.Vector4;
        /** Adds a vector3 uniform property */
        addVector3Uniform(name: string, value: BABYLON.Vector3): TOOLKIT.StandardShaderMaterial;
        /** Sets the vector3 uniform value */
        setVector3Value(name: string, value: BABYLON.Vector3): TOOLKIT.StandardShaderMaterial;
        /** Gets the vector3 uniform value */
        getVector3Value(name: string): BABYLON.Vector3;
        /** Adds a vector2 uniform property */
        addVector2Uniform(name: string, value: BABYLON.Vector2): TOOLKIT.StandardShaderMaterial;
        /** Sets the vector2 uniform value */
        setVector2Value(name: string, value: BABYLON.Vector2): TOOLKIT.StandardShaderMaterial;
        /** Gets the vector2 uniform value */
        getVector2Value(name: string): BABYLON.Vector2;
        /** Adds a float uniform property */
        addFloatUniform(name: string, value: number): TOOLKIT.StandardShaderMaterial;
        /** Sets the float uniform value */
        setFloatValue(name: string, value: number): TOOLKIT.StandardShaderMaterial;
        /** Gets the float uniform value */
        getFloatValue(name: string): number;
        /** Adds a boolean uniform property */
        addBoolUniform(name: string, value: boolean): TOOLKIT.StandardShaderMaterial;
        /** Sets the boolean uniform value */
        setBoolValue(name: string, value: boolean): TOOLKIT.StandardShaderMaterial;
        /** Gets the boolean uniform value */
        getBoolValue(name: string): boolean;
        /** Gets the animatables */
        getAnimatables(): BABYLON.IAnimatable[];
        /** Gets the active textures */
        getActiveTextures(): BABYLON.BaseTexture[];
        /** Has the specified texture */
        hasTexture(texture: BABYLON.BaseTexture): boolean;
        /** Gets this custom material uniforms */
        getCustomUniforms(wgsl: boolean): any;
        /** Gets this custom material uniforms */
        getCustomSamplers(): string[];
        /** Gets this custom material attributes */
        getCustomAttributes(): string[];
        /** Gets this custom material vertex source */
        getCustomVertexCode(wgsl: boolean): string;
        /** Gets this custom material fragment source */
        getCustomFragmentCode(wgsl: boolean): string;
        /** Prepares the custom material defines */
        prepareCustomDefines(defines: BABYLON.MaterialDefines): void;
        /** Update custom material bindings */
        updateCustomBindings(effectOrUniformBuffer: BABYLON.UniformBuffer | BABYLON.Effect): void;
        /** Update custom material bindings */
        legacyUpdateCustomBindings(effect: BABYLON.UniformBuffer): void;
        /** Builds a custom uniform property */
        protected buildUniformProperty(uniformName: string, uniformType: string, uniformValue: any): void;
    }
    /**
      * GLTF Custom Shader Material Plugin (BABYLON.MaterialPluginBase)
      * @class StandardShaderMaterialPlugin - All rights reserved (c) 2024 Mackey Kinard
      */
    class StandardShaderMaterialPlugin extends BABYLON.MaterialPluginBase {
        private _isEnabled;
        getClassName(): string;
        /**
         * Creates a new material plugin
         * @param material parent material of the plugin
         * @param name name of the plugin
         * @param priority priority of the plugin
         * @param defines list of defines used by the plugin. The value of the property is the default value for this property
         * @param addToPluginList true to add the plugin to the list of plugins managed by the material plugin manager of the material (default: true)
         * @param enable true to enable the plugin (it is handy if the plugin does not handle properties to switch its current activation)
         * @param resolveIncludes Indicates that any #include directive in the plugin code must be replaced by the corresponding code (default: false)
         */
        constructor(material: BABYLON.Material, name: string, priority: number, defines?: {}, addToPluginList?: boolean, enable?: boolean, resolveIncludes?: boolean);
        getIsEnabled(): boolean;
        setIsEnabled(enabled: boolean): void;
        vertexDefinitions: string;
        fragmentDefinitions: string;
        /** Gets a reference to the custom shader material */
        getCustomShaderMaterial(): TOOLKIT.StandardShaderMaterial;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon Utility Classes
     * @class Utilities - All rights reserved (c) 2024 Mackey Kinard
     */
    class Utilities {
        private static UpVector;
        private static AuxVector;
        private static ZeroVector;
        private static TempMatrix;
        private static TempMatrix2;
        private static TempVector2;
        private static TempVector3;
        private static TempQuaternion;
        private static TempQuaternion2;
        private static TempQuaternion3;
        private static TempDirectionBuffer;
        private static LoadingState;
        /** Zero pad a number to string */
        static ZeroPad(num: number, places: number): string;
        /** Shoft array to left or right */
        static ShiftArray(arr: any[], reverse: boolean): any[];
        static OnPreloaderProgress: (remainingCount: number, totalCount: number, lastFinishedTask: BABYLON.AbstractAssetTask) => void;
        static OnPreloaderComplete: (tasks: BABYLON.AbstractAssetTask[]) => void;
        static GetLayerMask(layer: number): number;
        static IsLayerMasked(mask: number, layer: number): boolean;
        /** Get the current havok plugin from the global stack */
        static GetHavokPlugin(): BABYLON.HavokPlugin;
        static GetLoadingState(): number;
        /** Get full floating point random number */
        static GetRandomRange(min: number, max: number, last?: BABYLON.Nullable<number>, retries?: BABYLON.Nullable<number>): number;
        /** Get fixed floating point random number (2 Decimals) */
        static GetRandomFloat(min: number, max: number, last?: BABYLON.Nullable<number>, retries?: BABYLON.Nullable<number>): number;
        /** Get fixed integer random number (0 Decimals) */
        static GetRandomInteger(min: number, max: number, last?: BABYLON.Nullable<number>, retries?: BABYLON.Nullable<number>): number;
        static Approximately(a: number, b: number): boolean;
        static GetVertexDataFromMesh(mesh: BABYLON.Mesh): BABYLON.VertexData;
        /**
         * Calculates the destination point from origin, direction and length
         * @param origin - The start point of the raycast.
         * @param direction - The direction of the raycast.
         * @param length - The lenght of the raycast.
         * @returns a destination point
         */
        static CalculateDestinationPoint(origin: BABYLON.Vector3, direction: BABYLON.Vector3, length: number): BABYLON.Vector3;
        /**
         * Calculates the destination point from origin, direction and length
         * @param origin - The start point of the raycast.
         * @param direction - The direction of the raycast.
         * @param length - The lenght of the raycast.
         * @param result - The result destination point
         */
        static CalculateDestinationPointToRef(origin: BABYLON.Vector3, direction: BABYLON.Vector3, length: number, result: BABYLON.Vector3): void;
        static UpdateAbstractMeshMaterial(mesh: BABYLON.AbstractMesh, material: BABYLON.Material, materialIndex: number): void;
        /** Creates a rotation which rotates /angle/ degrees around /axis/ */
        /**
         * Returns a new Vector3 located for "amount" (float) on the Hermite interpolation spline defined by the vectors "value1", "tangent1", "value2", "tangent2"
         * @param value1 defines the first control point
         * @param tangent1 defines the first tangent vector
         * @param value2 defines the second control point
         * @param tangent2 defines the second tangent vector
         * @param amount defines the amount on the interpolation spline (between 0 and 1)
         * @returns the new Vector3
         */
        static HermiteVector3(value1: BABYLON.DeepImmutable<BABYLON.Vector3>, tangent1: BABYLON.DeepImmutable<BABYLON.Vector3>, value2: BABYLON.DeepImmutable<BABYLON.Vector3>, tangent2: BABYLON.DeepImmutable<BABYLON.Vector3>, amount: number): BABYLON.Vector3;
        /**
         * Returns a new Vector3 located for "amount" (float) on the Hermite interpolation spline defined by the vectors "value1", "tangent1", "value2", "tangent2"
         * @param value1 defines the first control point
         * @param tangent1 defines the first tangent vector
         * @param value2 defines the second control point
         * @param tangent2 defines the second tangent vector
         * @param amount defines the amount on the interpolation spline (between 0 and 1)
         * @returns the new Vector3
         */
        static HermiteVector3ToRef(value1: BABYLON.DeepImmutable<BABYLON.Vector3>, tangent1: BABYLON.DeepImmutable<BABYLON.Vector3>, value2: BABYLON.DeepImmutable<BABYLON.Vector3>, tangent2: BABYLON.DeepImmutable<BABYLON.Vector3>, amount: number, result: BABYLON.Vector3): void;
        static ExpSmoothing(dt: number, timeConstant: number): number;
        static LerpLog(a: number, b: number, t: number): number;
        static LerpExp(a: number, b: number, t: number): number;
        static LerpUnclamped(a: number, b: number, t: number): number;
        static LerpUnclampedColor3(a: BABYLON.Color3, b: BABYLON.Color3, t: number): BABYLON.Color3;
        static LerpUnclampedColor3ToRef(a: BABYLON.Color3, b: BABYLON.Color3, t: number, result: BABYLON.Color3): void;
        static LerpUnclampedColor4(a: BABYLON.Color4, b: BABYLON.Color4, t: number): BABYLON.Color4;
        static LerpUnclampedColor4ToRef(a: BABYLON.Color4, b: BABYLON.Color4, t: number, result: BABYLON.Color4): void;
        static LerpUnclampedVector2(a: BABYLON.Vector2, b: BABYLON.Vector2, t: number): BABYLON.Vector2;
        static LerpUnclampedVector2ToRef(a: BABYLON.Vector2, b: BABYLON.Vector2, t: number, result: BABYLON.Vector2): void;
        static LerpUnclampedVector3(a: BABYLON.Vector3, b: BABYLON.Vector3, t: number): BABYLON.Vector3;
        static LerpUnclampedVector3ToRef(a: BABYLON.Vector3, b: BABYLON.Vector3, t: number, result: BABYLON.Vector3): void;
        static LerpUnclampedVector4(a: BABYLON.Vector4, b: BABYLON.Vector4, t: number): BABYLON.Vector4;
        static LerpUnclampedVector4ToRef(a: BABYLON.Vector4, b: BABYLON.Vector4, t: number, result: BABYLON.Vector4): void;
        static IsEqualUsingDot(dot: number): boolean;
        static QuaternionAngle(a: BABYLON.Quaternion, b: BABYLON.Quaternion): number;
        static QuaternionLengthSquared(quat: BABYLON.Quaternion): number;
        static QuaternionRotateTowards(from: BABYLON.Quaternion, to: BABYLON.Quaternion, maxDegreesDelta: number): BABYLON.Quaternion;
        static QuaternionRotateTowardsToRef(from: BABYLON.Quaternion, to: BABYLON.Quaternion, maxDegreesDelta: number, result: BABYLON.Quaternion): void;
        static QuaternionSlerpUnclamped(from: BABYLON.Quaternion, to: BABYLON.Quaternion, t: number): BABYLON.Quaternion;
        static QuaternionSlerpUnclampedToRef(a: BABYLON.Quaternion, b: BABYLON.Quaternion, t: number, result: BABYLON.Quaternion): void;
        static MoveTowards(current: number, target: number, maxDelta: number): number;
        static MoveTowardsVector2(current: BABYLON.Vector2, target: BABYLON.Vector2, maxDistanceDelta: number): BABYLON.Vector2;
        static MoveTowardsVector2ToRef(current: BABYLON.Vector2, target: BABYLON.Vector2, maxDistanceDelta: number, result: BABYLON.Vector2): void;
        static MoveTowardsVector3(current: BABYLON.Vector3, target: BABYLON.Vector3, maxDistanceDelta: number): BABYLON.Vector3;
        static MoveTowardsVector3ToRef(current: BABYLON.Vector3, target: BABYLON.Vector3, maxDistanceDelta: number, result: BABYLON.Vector3): void;
        static MoveTowardsVector4(current: BABYLON.Vector4, target: BABYLON.Vector4, maxDistanceDelta: number): BABYLON.Vector4;
        static MoveTowardsVector4ToRef(current: BABYLON.Vector4, target: BABYLON.Vector4, maxDistanceDelta: number, result: BABYLON.Vector4): void;
        /**  Clamps a vector2 magnitude to a max length. */
        static ClampMagnitudeVector2(vector: BABYLON.Vector2, length: number): BABYLON.Vector2;
        /**  Clamps a vector2 magnitude to a max length. */
        static ClampMagnitudeVector2ToRef(vector: BABYLON.Vector2, length: number, result: BABYLON.Vector2): void;
        /**  Clamps a vector3 magnitude to a max length. */
        static ClampMagnitudeVector3(vector: BABYLON.Vector3, length: number): BABYLON.Vector3;
        /**  Clamps a vector3 magnitude to a max length. */
        static ClampMagnitudeVector3ToRef(vector: BABYLON.Vector3, length: number, result: BABYLON.Vector3): void;
        /** Returns the angle in degrees between the from and to vectors. */
        static GetAngle(from: BABYLON.Vector3, to: BABYLON.Vector3): number;
        /** Returns the angle in radians between the from and to vectors. */
        static GetAngleRadians(from: BABYLON.Vector3, to: BABYLON.Vector3): number;
        /** Default Unity style angle clamping */
        static ClampAngle(angle: number, min: number, max: number): number;
        /**
        * Expects angle in the range 0 to 360
        * Expects min and max in the range -180 to 180
        * Returns the clamped angle in the range 0 to 360
        */
        static ClampAngle180(angle: number, min: number, max: number): number;
        /**
        * Expects all angles in the range 0 to 360
        * Returns the clamped angle in the range 0 to 360
        */
        static ClampAngle360(angle: number, min: number, max: number): number;
        /** Gradually changes a number towards a desired goal over time. (Note: Uses currentVelocity.x as output variable) */
        static SmoothDamp(current: number, target: number, smoothTime: number, maxSpeed: number, deltaTime: number, currentVelocity: BABYLON.Vector2): number;
        /** Gradually changes an angle given in degrees towards a desired goal angle over time. (Note: Uses currentVelocity.x as output variable) */
        static SmoothDampAngle(current: number, target: number, smoothTime: number, maxSpeed: number, deltaTime: number, currentVelocity: BABYLON.Vector2): number;
        /** Gradually changes a vector towards a desired goal over time. (Note: Uses currentVelocity.xy as output variable) */
        static SmoothDampVector2(current: BABYLON.Vector2, target: BABYLON.Vector2, smoothTime: number, maxSpeed: number, deltaTime: number, currentVelocity: BABYLON.Vector2): BABYLON.Vector2;
        /** Gradually changes a vector result towards a desired goal over time. (Note: Uses currentVelocity.xy as output variable) */
        static SmoothDampVector2ToRef(current: BABYLON.Vector2, target: BABYLON.Vector2, smoothTime: number, maxSpeed: number, deltaTime: number, currentVelocity: BABYLON.Vector2, result: BABYLON.Vector2): void;
        /** Gradually changes a vector towards a desired goal over time. (Note: Uses currentVelocity.xyz as output variable) */
        static SmoothDampVector3(current: BABYLON.Vector3, target: BABYLON.Vector3, smoothTime: number, maxSpeed: number, deltaTime: number, currentVelocity: BABYLON.Vector3): BABYLON.Vector3;
        /** Gradually changes a vector result towards a desired goal over time. (Note: Uses currentVelocity.xyz as output variable) */
        static SmoothDampVector3ToRef(current: BABYLON.Vector3, target: BABYLON.Vector3, smoothTime: number, maxSpeed: number, deltaTime: number, currentVelocity: BABYLON.Vector3, result: BABYLON.Vector3): void;
        /** Returns a new Matrix as a rotation matrix from the Euler angles in degrees (x, y, z). */
        static ToMatrix(x: number, y: number, z: number): BABYLON.Matrix;
        /** Sets a Matrix result as a rotation matrix from the Euler angles in degrees (x, y, z). */
        static ToMatrixToRef(x: number, y: number, z: number, result: BABYLON.Matrix): void;
        /** Set the passed matrix "result" as the interpolated values for "gradient" (float) between the ones of the matrices "startValue" and "endValue". */
        static FastMatrixLerp(startValue: BABYLON.Matrix, endValue: BABYLON.Matrix, gradient: number, result: BABYLON.Matrix): void;
        /** Set the passed matrix "result" as the spherical interpolated values for "gradient" (float) between the ones of the matrices "startValue" and "endValue". */
        static FastMatrixSlerp(startValue: BABYLON.Matrix, endValue: BABYLON.Matrix, gradient: number, result: BABYLON.Matrix): void;
        /** Returns a new Vector Euler in degress set from the passed qauternion. */
        static ToEuler(quaternion: BABYLON.Quaternion): BABYLON.Vector3;
        /** Sets a Vector Euler result in degress set from the passed qauternion. */
        static ToEulerToRef(quaternion: BABYLON.Quaternion, result: BABYLON.Vector3): void;
        /** Returns a new Quaternion set from the passed Euler float angles in degrees (x, y, z). */
        static FromEuler(x: number, y: number, z: number): BABYLON.Quaternion;
        /** Sets a Quaternion result set from the passed Euler float angles in degrees (x, y, z). */
        static FromEulerToRef(x: number, y: number, z: number, result: BABYLON.Quaternion): void;
        /** Computes the difference in quaternion values */
        static QuaternionDiff(a: BABYLON.Quaternion, b: BABYLON.Quaternion): BABYLON.Quaternion;
        /** Computes the difference in quaternion values to a result value */
        static QuaternionDiffToRef(a: BABYLON.Quaternion, b: BABYLON.Quaternion, result: BABYLON.Quaternion): void;
        /** Subtracts one quaternion from another to a result value */
        static QuaternionSubtractToRef(source: BABYLON.Quaternion, other: BABYLON.Quaternion, result: BABYLON.Quaternion): void;
        /** Multplies a quaternion by a vector (rotates vector) */
        static RotateVector(vec: BABYLON.Vector3, quat: BABYLON.Quaternion): BABYLON.Vector3;
        /** Multplies a quaternion by a vector (rotates vector) */
        static RotateVectorToRef(vec: BABYLON.Vector3, quat: BABYLON.Quaternion, result: BABYLON.Vector3): void;
        /** Returns a new Quaternion set from the passed vector direction. */
        static LookRotation(direction: BABYLON.Vector3): BABYLON.Quaternion;
        /** Returns a new Quaternion set from the passed vector direction. */
        static LookRotationToRef(direction: BABYLON.Vector3, result: BABYLON.Quaternion): void;
        /** Returns a new vector3 degrees converted from radions */
        static Vector3Rad2Deg(vector: BABYLON.Vector3): BABYLON.Vector3;
        /** Sets a vector3 result degrees converted from radions */
        static Vector3Rad2DegToRef(vector: BABYLON.Vector3, result: BABYLON.Vector3): void;
        /** Multiply the quaternion by a vector */
        static MultiplyQuaternionByVector(rotation: BABYLON.Quaternion, point: BABYLON.Vector3): BABYLON.Vector3;
        /** Multiply the quaternion by a vector to result */
        static MultiplyQuaternionByVectorToRef(rotation: BABYLON.Quaternion, point: BABYLON.Vector3, result: BABYLON.Vector3): void;
        /** Validate and switch Quaternion rotation to Euler rotation. */
        static ValidateTransformRotation(transform: BABYLON.TransformNode): void;
        /** Validate and switch Euler rotation to Quaternion rotation. */
        static ValidateTransformQuaternion(transform: BABYLON.TransformNode): void;
        /** Get the smoothed keyboard input value. */
        static GetKeyboardInputValue(scene: BABYLON.Scene, currentValue: number, targetValue: number): number;
        /** Generate a randome number. */
        static GenerateRandonNumber(min: number, max: number, decimals?: number): number;
        /** Projects a vector onto another vector */
        static ProjectVector(vector: BABYLON.Vector3, onnormal: BABYLON.Vector3): BABYLON.Vector3;
        /** Projects a vector onto another vector and sets result */
        static ProjectVectorToRef(vector: BABYLON.Vector3, onnormal: BABYLON.Vector3, result: BABYLON.Vector3): void;
        /** Projects a vector onto a plane defined by a normal orthogonal to the plane */
        static ProjectVectorOnPlane(vector: BABYLON.Vector3, planenormal: BABYLON.Vector3): BABYLON.Vector3;
        /** Projects a vector onto a plane defined by a normal orthogonal to the plane and sets result */
        static ProjectVectorOnPlaneToRef(vector: BABYLON.Vector3, planenormal: BABYLON.Vector3, result: BABYLON.Vector3): void;
        /** Checks if two vectors v1 and v2 are equal within a precision of p */
        static AreVectorsEqual(v1: BABYLON.Vector3, v2: BABYLON.Vector3, p: number): boolean;
        /** Returns the slope (in degrees) of a vector in the vertical plane */
        static GetVerticalSlopeAngle(v: BABYLON.Vector3, max?: number): number;
        /** TODO */
        static DownloadEnvironment(cubemap: BABYLON.CubeTexture, success?: () => void, failure?: () => void): void;
        static HasOwnProperty(object: any, property: string): boolean;
        static FindMeshCollider(scene: BABYLON.Scene, object: BABYLON.IPhysicsEnabledObject): BABYLON.IPhysicsEnabledObject;
        static ColliderInstances(): boolean;
        static ReparentColliders(): boolean;
        static UseTriangleNormals(): boolean;
        static UseConvexTriangles(): boolean;
        static DefaultRenderGroup(): number;
        static ShowDebugColliders(): boolean;
        static ColliderVisibility(): number;
        static ColliderRenderGroup(): number;
        static CollisionWireframe(): boolean;
        static GetColliderMaterial(scene: BABYLON.Scene): BABYLON.Material;
        static CalculateCombinedFriction(friction0: number, friction1: number): number;
        static CalculateCombinedRestitution(restitution0: number, restitution1: number): number;
        private static LoaderItemsMarkedForDisposal;
        static AddLoaderItemMarkedForDisposal(node: BABYLON.TransformNode): void;
        static ResetLoaderItemsMarkedForDisposal(): void;
        static RemoveLoaderItemsMarkedForDisposal(): void;
        /** TODO */
        static GetDirectTargetAngle(transform: BABYLON.TransformNode, worldSpaceTarget: BABYLON.Vector3): number;
        /** TODO */
        static GetSmoothTargetAngle(transform: BABYLON.TransformNode, worldSpaceTarget: BABYLON.Vector3): number;
        /** TODO */
        static CalculatCatmullRom(p0: BABYLON.Vector3, p1: BABYLON.Vector3, p2: BABYLON.Vector3, p3: BABYLON.Vector3, i: number): BABYLON.Vector3;
        /** TODO */
        static CalculatCatmullRomToRef(p0: BABYLON.Vector3, p1: BABYLON.Vector3, p2: BABYLON.Vector3, p3: BABYLON.Vector3, i: number, result: BABYLON.Vector3): void;
        /** TODO */
        static MakeProper(name: string): string;
        /** TODO */
        static StartsWith(source: string, word: string): boolean;
        /** TODO */
        static EndsWith(source: string, word: string): boolean;
        /** TODO */
        static ReplaceAll(source: string, word: string, replace: string): string;
        /** TODO */
        static IsNullOrEmpty(source: string): boolean;
        /** TODO */
        static SafeStringPush(array: string[], value: string): void;
        /** TODO */
        static ParseColor3(source: TOOLKIT.IUnityColor, defaultValue?: BABYLON.Color3, toLinearSpace?: boolean): BABYLON.Color3;
        /** TODO */
        static ParseColor4(source: TOOLKIT.IUnityColor, defaultValue?: BABYLON.Color4, toLinearSpace?: boolean): BABYLON.Color4;
        /** TODO */
        static ParseVector2(source: TOOLKIT.IUnityVector2, defaultValue?: BABYLON.Vector2): BABYLON.Vector2;
        /** TODO */
        static ParseVector3(source: TOOLKIT.IUnityVector3, defaultValue?: BABYLON.Vector3): BABYLON.Vector3;
        /** TODO */
        static ParseVector4(source: TOOLKIT.IUnityVector4, defaultValue?: BABYLON.Vector4): BABYLON.Vector4;
        /** TODO */
        static ParseSound(source: TOOLKIT.IUnityAudioClip, scene: BABYLON.Scene, name: string, callback?: BABYLON.Nullable<() => void>, options?: BABYLON.IStaticSoundOptions): Promise<BABYLON.StaticSound>;
        /** TODO */
        static ParseTexture(source: TOOLKIT.IUnityTexture, scene: BABYLON.Scene, noMipmap?: boolean, invertY?: boolean, samplingMode?: number, onLoad?: BABYLON.Nullable<() => void>, onError?: BABYLON.Nullable<(message?: string, exception?: any) => void>, buffer?: BABYLON.Nullable<any>, deleteBuffer?: boolean, format?: number): BABYLON.Texture;
        static ParseCubemap(source: TOOLKIT.IUnityCubemap, scene: BABYLON.Scene): BABYLON.CubeTexture;
        /** TODO */
        static ParseTextAsset(source: TOOLKIT.IUnityTextAsset, defaultValue?: string): string;
        /** TODO */
        static ParseJsonAsset<T>(source: TOOLKIT.IUnityTextAsset, defaultValue?: string, reviver?: (this: any, key: string, value: any) => any): T;
        /** TODO */
        static ParseTransformByID(source: TOOLKIT.IUnityTransform, scene: BABYLON.Scene, defaultValue?: BABYLON.TransformNode): BABYLON.TransformNode;
        static ParseTransformByName(source: TOOLKIT.IUnityTransform, scene: BABYLON.Scene, defaultValue?: BABYLON.TransformNode): BABYLON.TransformNode;
        /** TODO */
        static ParseChildTransform(parent: BABYLON.TransformNode, source: TOOLKIT.IUnityTransform, defaultValue?: BABYLON.TransformNode): BABYLON.TransformNode;
        /** Sets the transform node abosulte position */
        static SetAbsolutePosition(transform: BABYLON.TransformNode, position: BABYLON.Vector3): void;
        /** Gets the transform node abosulte position */
        static GetAbsolutePosition(transform: BABYLON.TransformNode, offsetPosition?: BABYLON.Vector3, computeMatrix?: boolean): BABYLON.Vector3;
        /** Gets the transform node abosulte position */
        static GetAbsolutePositionToRef(transform: BABYLON.TransformNode, result: BABYLON.Vector3, offsetPosition?: BABYLON.Vector3, computeMatrix?: boolean): void;
        /** Sets the transform node abosulte Rotation */
        static SetAbsoluteRotation(transform: BABYLON.TransformNode, rotation: BABYLON.Quaternion): void;
        /** Gets the transform node abosulte rotation */
        static GetAbsoluteRotation(transform: BABYLON.TransformNode): BABYLON.Quaternion;
        /** Gets the transform node abosulte rotation */
        static GetAbsoluteRotationToRef(transform: BABYLON.TransformNode, result: BABYLON.Quaternion): void;
        /** Transforms position from local space to world space. (Using TransformCoordinates) */
        static TransformPoint(owner: BABYLON.TransformNode | BABYLON.Camera, position: BABYLON.Vector3, computeMatrix?: boolean): BABYLON.Vector3;
        /** Inverse transforms position from world space to local space. (Using TransformCoordinates) */
        static InverseTransformPoint(owner: BABYLON.TransformNode | BABYLON.Camera, position: BABYLON.Vector3, computeMatrix?: boolean): BABYLON.Vector3;
        /** Transforms position from local space to world space. (Using TransformCoordinates) */
        static TransformPointToRef(owner: BABYLON.TransformNode | BABYLON.Camera, position: BABYLON.Vector3, result: BABYLON.Vector3, computeMatrix?: boolean): void;
        /** Inverse transforms position from world space to local space. (Using TransformCoordinates) */
        static InverseTransformPointToRef(owner: BABYLON.TransformNode | BABYLON.Camera, position: BABYLON.Vector3, result: BABYLON.Vector3, computeMatrix?: boolean): void;
        /** Transforms direction from local space to world space. (Using TransformNormal) */
        static TransformDirection(owner: BABYLON.TransformNode | BABYLON.Camera, direction: BABYLON.Vector3, computeMatrix?: boolean): BABYLON.Vector3;
        /** Inverse transforms direction from world space to local space. (Using TransformNormal) */
        static InverseTransformDirection(owner: BABYLON.TransformNode | BABYLON.Camera, direction: BABYLON.Vector3, computeMatrix?: boolean): BABYLON.Vector3;
        /** Transforms direction from local space to world space. (Using TransformNormal) */
        static TransformDirectionToRef(owner: BABYLON.TransformNode | BABYLON.Camera, direction: BABYLON.Vector3, result: BABYLON.Vector3, computeMatrix?: boolean): void;
        /** Inverse transforms direction from world space to local space. (Using TransformNormal) */
        static InverseTransformDirectionToRef(owner: BABYLON.TransformNode | BABYLON.Camera, direction: BABYLON.Vector3, result: BABYLON.Vector3, computeMatrix?: boolean): void;
        /** Recomputes the meshes bounding center pivot point */
        static RecomputeCenterPivotPoint(owner: BABYLON.AbstractMesh): void;
        /** Gets any direction vector of the owner in world space. */
        static GetDirectionVector(owner: BABYLON.TransformNode | BABYLON.Camera, vector: BABYLON.Vector3): BABYLON.Vector3;
        /** Gets any direction vector of the owner in world space. */
        static GetDirectionVectorToRef(owner: BABYLON.TransformNode | BABYLON.Camera, vector: BABYLON.Vector3, result: BABYLON.Vector3): void;
        /** Gets the blue axis of the owner in world space. */
        static GetForwardVector(owner: BABYLON.TransformNode | BABYLON.Camera): BABYLON.Vector3;
        /** Gets the blue axis of the owner in world space. */
        static GetForwardVectorToRef(owner: BABYLON.TransformNode | BABYLON.Camera, result: BABYLON.Vector3): void;
        /** Gets the red axis of the owner in world space. */
        static GetRightVector(owner: BABYLON.TransformNode | BABYLON.Camera): BABYLON.Vector3;
        /** Gets the red axis of the owner in world space. */
        static GetRightVectorToRef(owner: BABYLON.TransformNode | BABYLON.Camera, result: BABYLON.Vector3): void;
        /** Gets the green axis of the owner in world space. */
        static GetUpVector(owner: BABYLON.TransformNode | BABYLON.Camera): BABYLON.Vector3;
        /** Gets the green axis of the owner in world space. */
        static GetUpVectorToRef(owner: BABYLON.TransformNode | BABYLON.Camera, result: BABYLON.Vector3): void;
        /** Blend float buffer values */
        static BlendFloatValue(source: number, value: number, weight: number): number;
        /** Blend vector2 buffer values */
        static BlendVector2Value(source: BABYLON.Vector2, value: BABYLON.Vector2, weight: number): void;
        /** Blend vector3 buffer values */
        static BlendVector3Value(source: BABYLON.Vector3, value: BABYLON.Vector3, weight: number): void;
        /** Blend quaternion buffer values */
        static BlendQuaternionValue(source: BABYLON.Quaternion, value: BABYLON.Quaternion, weight: number): void;
        /** Set animation target property */
        static SetAnimationTargetProperty(animation: BABYLON.Animation, property: string): void;
        /** Gets the float "result" as the sampled key frame value for the specfied animation track. */
        static SampleAnimationFloat(animation: BABYLON.Animation, time: number, loopMode?: number, gltfAnimation?: boolean): number;
        /** Set the passed vector2 "result" as the sampled key frame value for the specfied animation track. */
        static SampleAnimationVector2(animation: BABYLON.Animation, time: number, loopMode?: number, gltfAnimation?: boolean): BABYLON.Vector2;
        /** Set the passed vector3 "result" as the sampled key frame value for the specfied animation track. */
        static SampleAnimationVector3(animation: BABYLON.Animation, time: number, loopMode?: number, gltfAnimation?: boolean): BABYLON.Vector3;
        /** Set the passed quaternion "result" as the sampled key frame value for the specfied animation track. */
        static SampleAnimationQuaternion(animation: BABYLON.Animation, time: number, loopMode?: number, gltfAnimation?: boolean): BABYLON.Quaternion;
        /** Set the passed matrix "result" as the sampled key frame value for the specfied animation track. */
        static SampleAnimationMatrix(animation: BABYLON.Animation, time: number, loopMode?: number, gltfAnimation?: boolean): BABYLON.Matrix;
        /** Gets the last key frame index value. */
        static GetLastKeyFrameIndex(animation: BABYLON.Animation): number;
        /** Private internal frame interpolation helper */
        private static InterpolateAnimation;
        /** Update loop blend root motion metadata settings */
        static UpdateLoopBlendPositionSettings(animationTrack: BABYLON.AnimationGroup, loopBlendPositionY: boolean, loopBlendPositionXZ: boolean): void;
        static TakeScreenSnapshot(scene: BABYLON.Scene, engine: BABYLON.AbstractEngine, size?: {
            width?: number;
            height?: number;
            precision?: number;
        }, bitmapOptions?: ImageBitmapOptions, onComplete?: (bmd: ImageBitmap | null) => void): void;
        static DownloadImageBitmap(bmp: ImageBitmap | null, filename?: string, type?: "image/png" | "image/jpeg", quality?: number): HTMLCanvasElement | OffscreenCanvas;
        /** Initialize default shader material properties */
        static MarkLinear(t?: BABYLON.BaseTexture | null): void;
        static MarkGamma(t?: BABYLON.BaseTexture | null): void;
        /** Transforms position from world space into screen space. */
        static WorldToScreenPoint(scene: BABYLON.Scene, position: BABYLON.Vector3, camera?: BABYLON.Camera): BABYLON.Vector3;
        /** Transforms a point from screen space into world space. */
        static ScreenToWorldPoint(scene: BABYLON.Scene, position: BABYLON.Vector3): BABYLON.Vector3;
        /** Loads a file as text (IFileRequest) */
        static LoadTextFile(url: string, onSuccess: (data: string | ArrayBuffer) => void, onProgress?: (data: any) => void, onError?: (request?: BABYLON.WebRequest, exception?: any) => void): BABYLON.IFileRequest;
        /** Load a text based file */
        static LoadTextFileAsync(url: string): Promise<string>;
        /** Get data from server (XmlHttpRequest) */
        static GetHttpRequest(url: string, headers?: TOOLKIT.RequestHeader[], onSuccess?: (xhr: XMLHttpRequest) => void, onFailure?: (reason: any) => void, onProgress?: (evt: ProgressEvent) => void, useArrayBuffer?: boolean, overrideMimeType?: string): XMLHttpRequest;
        /** Get data from server asynchronously */
        static GetHttpRequestAsync(url: string, headers?: TOOLKIT.RequestHeader[], onProgress?: (evt: ProgressEvent) => void, useArrayBuffer?: boolean, overrideMimeType?: string): Promise<XMLHttpRequest>;
        /** Post data to server (XmlHttpRequest) */
        static PostHttpRequest(url: string, data: any, headers?: TOOLKIT.RequestHeader[], contentType?: string, onSuccess?: (xhr: XMLHttpRequest) => void, onFailure?: (reason: any) => void, onProgress?: (evt: ProgressEvent) => void, useArrayBuffer?: boolean, overrideMimeType?: string): XMLHttpRequest;
        /** Post data to server asynchronously */
        static PostHttpRequestAsync(url: string, data: any, headers?: TOOLKIT.RequestHeader[], contentType?: string, onProgress?: (evt: ProgressEvent) => void, useArrayBuffer?: boolean, overrideMimeType?: string): Promise<XMLHttpRequest>;
        /** TODO */
        static RemapValueToRange(value: number, a1: number, a2: number, b1: number, b2: number): number;
        static CloneSkeletonPrefab(scene: BABYLON.Scene, skeleton: BABYLON.Skeleton, name: string, id?: string, root?: BABYLON.TransformNode): BABYLON.Skeleton;
        /** Get all loaded scene transform nodes. */
        static GetSceneTransforms(scene: BABYLON.Scene): BABYLON.TransformNode[];
        /** Parse scene component metadata. */
        static PostParseSceneComponents(scene: BABYLON.Scene, transforms: BABYLON.TransformNode[], preloadList: Array<TOOLKIT.ScriptComponent>, readyList: Array<TOOLKIT.ScriptComponent>): TOOLKIT.MetadataParser;
        /**
         * Creates a default reflection texture with neutral properties to mimic Unity's reflection settings
         * @param scene The Babylon scene
         * @returns A cube texture configured for minimal reflection
         */
        static GetDefaultReflectionTexture(scene: BABYLON.Scene): BABYLON.CubeTexture;
        /**
         * Creates a neutral reflection texture with customizable properties to mimic Unity's reflection settings
         * @param scene The Babylon scene
         * @param grayValue Gray value (0-255) for the reflection color
         * @param level Reflection intensity level (0-1)
         * @returns A cube texture configured for minimal reflection
         */
        static GetNeutralReflectionTexture(scene: BABYLON.Scene, grayValue?: number, level?: number): BABYLON.CubeTexture;
        /**
         * Gets the specified asset container mesh.
         * @param container defines the asset container
         * @param meshName defines the mesh name to get
         * @returns the mesh from the container
         */
        static GetAssetContainerMesh(container: BABYLON.AssetContainer, meshName: string): BABYLON.Mesh;
        /**
         * Gets the specified asset container transform node.
         * @param container defines the asset container
         * @param nodeName defines the transform node name to get
         * @returns the transform node from the container
         */
        static GetAssetContainerNode(container: BABYLON.AssetContainer, nodeName: string): BABYLON.TransformNode;
        /**
         * Clones the specified asset container item.
         * Associcated skeletons and animation groups will all be cloned. (Internal Use Only)
         * @param container defines the asset container
         * @param assetName defines the asset item name to clone
         * @param nameFunction defines an optional function used to get new names for clones
         * @param makeNewMaterials defines an optional boolean that defines if materials must be cloned as well (false by default)
         * @param cloneAnimations defines an option to clone any animation groups (true by default)
         * @param disableInstance defines an option to disable the cloned instance (false by default)
         * @returns the transform node that was duplicated
         */
        static CloneAssetContainerItem(container: BABYLON.AssetContainer, assetName: string, nameFunction?: (sourceName: string) => string, newParent?: BABYLON.Nullable<BABYLON.TransformNode>, makeNewMaterials?: boolean, cloneAnimations?: boolean): BABYLON.TransformNode;
        static AssignAnimationGroupsToInstance(root: BABYLON.TransformNode, groups: BABYLON.AnimationGroup[]): void;
        static AssignAnimationGroupsToNode(transform: BABYLON.TransformNode, groups: BABYLON.AnimationGroup[]): void;
        static UnitySlopeAngleToCosine(unitySlopeAngleDegrees: number): number;
        static InstantiateHierarchy(node: BABYLON.TransformNode, newParent?: BABYLON.Nullable<BABYLON.TransformNode>, onNewNodeCreated?: (source: BABYLON.TransformNode, clone: BABYLON.TransformNode) => void): BABYLON.Nullable<BABYLON.TransformNode>;
        static InstantiateNodeHierarchy(node: BABYLON.TransformNode, newParent?: BABYLON.Nullable<BABYLON.TransformNode>, onNewNodeCreated?: (source: BABYLON.TransformNode, clone: BABYLON.TransformNode) => void): BABYLON.Nullable<BABYLON.TransformNode>;
        static InstantiateMeshHierarchy(mesh: BABYLON.Mesh, newParent: BABYLON.Nullable<BABYLON.TransformNode>, createInstance: boolean, onNewNodeCreated?: (source: BABYLON.TransformNode, clone: BABYLON.TransformNode) => void): BABYLON.Nullable<BABYLON.TransformNode>;
        static PrepareSkeletonForRendering(skeleton: BABYLON.Skeleton, dontCheckFrameId?: boolean): void;
        static RetargetAnimationGroupSkeleton(animationGroup: BABYLON.AnimationGroup, targetSkeleton: BABYLON.Skeleton, targetArmatureNode?: BABYLON.TransformNode): void;
        static RetargetAnimationGroupBlendShapes(animationGroup: BABYLON.AnimationGroup, targetMesh: BABYLON.Mesh): void;
        static LinkSkeletonMeshes(master: BABYLON.Skeleton, slave: BABYLON.Skeleton): void;
        static FindBoneByName(skeleton: BABYLON.Skeleton, name: string): BABYLON.Bone;
        static SwitchHandednessVector3(input: BABYLON.Vector3): BABYLON.Vector3;
        static SwitchHandednessVector4(input: BABYLON.Vector4): BABYLON.Vector4;
        static SwitchHandednessQuaternion(input: BABYLON.Quaternion): BABYLON.Quaternion;
        /** Computes the transition duration blending speed */
        static ComputeBlendingSpeed(rate: number, duration: number, dampen?: boolean): number;
        static CalculateCameraDistance(farClipPlane: number, lodPercent: number, clipPlaneScale?: number): number;
        static EvalSphericalPolynomialRGB(poly: BABYLON.SphericalPolynomial, n: BABYLON.Vector3): BABYLON.Color3;
        static BestFitScale(unityRGB: number[], babRGB: number[]): number;
        /**
         * Computes a best-fit scale and RMSE between a Babylon SphericalPolynomial and
         * Unity's ground-truth evaluation samples (6 directions -> 18 floats RGB).
         * Returns scale (multiply Babylon evals by this to best-match Unity), RMSE,
         * per-channel RMSE and a per-direction breakdown.
         */
        static ComputeSHEval6Fit(sp: BABYLON.SphericalPolynomial, unityEval6: number[]): {
            scale: number;
            rmse: number;
            perChannelRMSE: number[];
            perDir: Array<any>;
        };
        /** TODO */
        /** TODO */
        static InstantiateClass(className: string, silentFail?: boolean): any;
        /** TODO */
        static GetSimpleClassName(obj: any): string;
        /** TODO */
        static DisposeEntity(entity: BABYLON.AbstractMesh): void;
        /** TODO */
        static SearchTransformNodes(name: string, nodes: BABYLON.Node[], searchType?: TOOLKIT.SearchType): BABYLON.Node;
        /** TODO */
        static SearchTransformNodeForTags(query: string, nodes: BABYLON.Node[]): BABYLON.Node;
        /** TODO */
        static SearchAllTransformNodesForTags(query: string, nodes: BABYLON.Node[]): BABYLON.Node[];
        /** TODO */
        static SearchTransformNodeForScript(alias: string, nodes: BABYLON.Node[]): BABYLON.Node;
        /** TODO */
        static SearchAllTransformNodesForScript(alias: string, nodes: BABYLON.Node[]): BABYLON.Node[];
        /** TODO */
        static CreateGuid(suffix?: string): string;
        /** TODO */
        static ValidateTransformGuid(node: BABYLON.TransformNode): void;
        /** TODO */
        static RegisterInstancedMeshBuffers(mesh: BABYLON.Mesh): void;
        /** TODO */
        static CloneValue(source: any, destinationObject: any): any;
        /** TODO */
        static CloneEntityMetadata(source: any): any;
        /** TODO */
        static FastJsonCopy(val: any): any;
        /** TODO */
        static DeepCopyProperties(source: any, destination: any, doNotCopyList?: string[], mustCopyList?: string[]): void;
        /** TODO */
        static ValidateTransformMetadata(transform: BABYLON.TransformNode): void;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
      * Babylon universal terrain material pro class
      * @class UniversalTerrainMaterial - All rights reserved (c) 2024 Mackey Kinard
      */
    class UniversalTerrainMaterial extends TOOLKIT.CustomShaderMaterial {
        protected terrainInfo: any;
        constructor(name: string, scene: BABYLON.Scene);
        awake(): void;
        update(): void;
        getShaderName(): string;
        getTerrainInfo(): any;
    }
    /**
     * Custom Shader Material Plugin (BABYLON.MaterialPluginBase)
     * @class UniversalTerrainMaterialPlugin
     */
    class UniversalTerrainMaterialPlugin extends TOOLKIT.CustomShaderMaterialPlugin {
        private colorName;
        private splatmapSampler;
        private detailsSampler;
        private normalsSampler;
        private GLSL_CustomFragment;
        private GLSL_CustomVertex;
        private GLSL_VertexMainEnd;
        private GLSL_FragmentUpdateColor;
        private WGSL_CustomFragment;
        private WGSL_CustomVertex;
        private WGSL_VertexMainEnd;
        private WGSL_FragmentUpdateColor;
        constructor(customMaterial: TOOLKIT.CustomShaderMaterial, shaderName: string);
        isCompatible(shaderLanguage: BABYLON.ShaderLanguage): boolean;
        getClassName(): string;
        /** This is used to create custom shader code
         *
         *  WGSL - To sample a texture in a shader, you need to use the `textureSample` function.
         *  let customColor: vec4<f32> = textureSample(testTexture, testTextureSampler, fragmentInputs.vAlbedoUV);
         *
         *  GLSL - To sample a texture in a shader, you need to use the `texture2D` function.
         *  vec4 customColor = texture2D(testTexture, vAlbedoUV);
         *
         */
        getCustomCode(shaderType: string, shaderLanguage: BABYLON.ShaderLanguage): any;
        /** This gets the uniforms used in the shader code */
        getUniforms(shaderLanguage: BABYLON.ShaderLanguage): any;
        /** This gets the samplers used in the shader code */
        getSamplers(samplers: string[]): void;
        /** This get the attributes used in the shader code */
        getAttributes(attributes: string[], scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        /** This prepares the shader defines */
        prepareDefines(defines: BABYLON.MaterialDefines, scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        /** This is used to update the uniforms bound to a mesh */
        bindForSubMesh(uniformBuffer: BABYLON.UniformBuffer, scene: BABYLON.Scene, engine: BABYLON.AbstractEngine, subMesh: BABYLON.SubMesh): void;
        private WGSL_FormatTerrainVertexDefintions;
        private WGSL_FormatTerrainVertexMainEnd;
        private WGSL_FormatTerrainFragmentDefintions;
        private WGSL_FormatTerrainFragmentUpdateColor;
        private GLSL_FormatTerrainVertexDefintions;
        private GLSL_FormatTerrainVertexMainEnd;
        private GLSL_FormatTerrainFragmentDefintions;
        private GLSL_FormatTerrainFragmentUpdateColor;
    }
}
declare namespace TOOLKIT {
    /**
     * Grass Standard Shader Material (BABYLON.StandardMaterial)
     * Implements Unity-exact TerrainWaveGrass algorithm for rolling wave effect
     * No billboard grass faces camera and waves with rolling bands effect
     * @class GrassStandardMaterial
     */
    class GrassStandardMaterial extends TOOLKIT.StandardShaderMaterial {
        private _windTimeAccum;
        private _lastUpdateFrame;
        constructor(name: string, scene: BABYLON.Scene);
        awake(): void;
        update(): void;
        getShaderName(): string;
        getMaxDistance(): number;
        setMaxDistance(distance: number): void;
        getFadeStart(): number;
        setFadeStart(distance: number): void;
        getWaveSpeed(): number;
        setWaveSpeed(speed: number): void;
        getWaveSize(): number;
        setWaveSize(size: number): void;
        getWindAmount(): number;
        setWindAmount(amount: number): void;
        getWindTint(): BABYLON.Vector4;
        setWindTint(tint: BABYLON.Vector4): void;
        getShadowIntensity(): number;
        setShadowIntensity(intensity: number): void;
    }
    /**
     * Grass Standard Shader Material Plugin (BABYLON.MaterialPluginBase)
     * Implements Unity TerrainEngine.cginc TerrainWaveGrass algorithm exactly
     * @class GrassStandardMaterialPlugin
     */
    class GrassStandardMaterialPlugin extends TOOLKIT.StandardShaderMaterialPlugin {
        constructor(customMaterial: TOOLKIT.StandardShaderMaterial, shaderName: string);
        isCompatible(shaderLanguage: BABYLON.ShaderLanguage): boolean;
        getCustomCode(shaderType: string, shaderLanguage: BABYLON.ShaderLanguage): any;
        private getWGSLVertexMainEnd;
        private getWGSLVaryingDefinitions;
        private getWGSLVertexWorldPos;
        private getGLSLVertexDefinitions;
        private getGLSLVertexMainEnd;
        private getGLSLVertexWorldPos;
        private getWGSLFragmentCode;
        private getGLSLFragmentCode;
        private getGLSLFragmentDefinitions;
        getUniforms(shaderLanguage: BABYLON.ShaderLanguage): any;
        getSamplers(samplers: string[]): void;
        getAttributes(attributes: string[], scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        prepareDefines(defines: BABYLON.MaterialDefines, scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        bindForSubMesh(uniformBuffer: BABYLON.UniformBuffer, scene: BABYLON.Scene, engine: BABYLON.AbstractEngine, subMesh: BABYLON.SubMesh): void;
    }
}
declare namespace TOOLKIT {
    /**
     * Grass Billboard Shader Material (BABYLON.StandardMaterial)
     * Implements Unity-exact TerrainWaveGrass algorithm for rolling wave effect
     * No billboard grass faces camera and waves with rolling bands effect
     * @class GrassBillboardMaterial
     */
    class GrassBillboardMaterial extends TOOLKIT.StandardShaderMaterial {
        private _windTimeAccum;
        private _lastUpdateFrame;
        constructor(name: string, scene: BABYLON.Scene);
        awake(): void;
        update(): void;
        getShaderName(): string;
        getMaxDistance(): number;
        setMaxDistance(distance: number): void;
        getFadeStart(): number;
        setFadeStart(distance: number): void;
        getWaveSpeed(): number;
        setWaveSpeed(speed: number): void;
        getWaveSize(): number;
        setWaveSize(size: number): void;
        getWindAmount(): number;
        setWindAmount(amount: number): void;
        getWindTint(): BABYLON.Vector4;
        setWindTint(tint: BABYLON.Vector4): void;
        getShadowIntensity(): number;
        setShadowIntensity(intensity: number): void;
        getSphericalBillboardEnabled(): boolean;
        setSphericalBillboardEnabled(enabled: boolean): void;
    }
    /**
     * Grass Billboard Shader Material Plugin (BABYLON.MaterialPluginBase)
     * Implements Unity TerrainEngine.cginc TerrainWaveGrass algorithm exactly
     * @class GrassBillboardMaterialPlugin
     */
    class GrassBillboardMaterialPlugin extends TOOLKIT.StandardShaderMaterialPlugin {
        constructor(customMaterial: TOOLKIT.StandardShaderMaterial, shaderName: string);
        isCompatible(shaderLanguage: BABYLON.ShaderLanguage): boolean;
        getCustomCode(shaderType: string, shaderLanguage: BABYLON.ShaderLanguage): any;
        private getWGSLVertexMainEnd;
        private getWGSLVaryingDefinitions;
        private getWGSLVertexWorldPos;
        private getGLSLVertexDefinitions;
        private getGLSLVertexMainEnd;
        private getGLSLVertexWorldPos;
        private getWGSLFragmentCode;
        private getGLSLFragmentCode;
        private getGLSLFragmentDefinitions;
        getUniforms(shaderLanguage: BABYLON.ShaderLanguage): any;
        getSamplers(samplers: string[]): void;
        getAttributes(attributes: string[], scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        prepareDefines(defines: BABYLON.MaterialDefines, scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        bindForSubMesh(uniformBuffer: BABYLON.UniformBuffer, scene: BABYLON.Scene, engine: BABYLON.AbstractEngine, subMesh: BABYLON.SubMesh): void;
    }
}
declare namespace TOOLKIT {
    /**
     * Tree Branch Shader Material (BABYLON.PBRMaterial)
     * @class TreeBranchMaterial
     */
    class TreeBranchMaterial extends TOOLKIT.CustomShaderMaterial {
        private _windTimeAccum;
        constructor(name: string, scene: BABYLON.Scene);
        awake(): void;
        update(): void;
        getShaderName(): string;
        setWindDirection(x: number, y: number, z: number): void;
        getWindDirection(): BABYLON.Vector4;
    }
    class TreeBranchMaterialPlugin extends TOOLKIT.CustomShaderMaterialPlugin {
        constructor(customMaterial: TOOLKIT.CustomShaderMaterial, shaderName: string);
        isCompatible(shaderLanguage: BABYLON.ShaderLanguage): boolean;
        getCustomCode(shaderType: string, shaderLanguage: BABYLON.ShaderLanguage): any;
        getUniforms(shaderLanguage: BABYLON.ShaderLanguage): any;
        getSamplers(samplers: string[]): void;
        getAttributes(attributes: string[], scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        prepareDefines(defines: BABYLON.MaterialDefines, scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        bindForSubMesh(uniformBuffer: BABYLON.UniformBuffer, scene: BABYLON.Scene, engine: BABYLON.AbstractEngine, subMesh: BABYLON.SubMesh): void;
        /**
         * Attempt to locate a serialized Unity WindZone payload for this terrain.
         * The exporter may store WindZones outside of terrain.properties (e.g. terrain.windzones[]),
         * so we probe a few likely metadata locations (properties, node.metadata, node.metadata.toolkit, etc).
         *
         * For now we return the "best" zone (prefer Directional and higher windMain).
         */
        static ExtractWindZoneOverride(properties: any, terrainTransform: BABYLON.TransformNode, builderInstance?: any): any | null;
    }
}
declare namespace TOOLKIT {
    /**
     * VAT Shader Material (BABYLON.PBRMaterial-based).
     * One instance per primitive/material slot on the combined mesh. All instances
     * targeting the same Animator/VAT controller share a single VertexAnimationController.
     * @class VertexAnimationMaterial
     */
    class VertexAnimationMaterial extends TOOLKIT.CustomShaderMaterial {
        controller: VertexAnimationController;
        /** VAT per-skin Texture2DArray switching state — opt-in via enableVatSkinArray(). The shared albedo
         *  array (tkAlbedoArray) is sampled at the layer decoded from the cell index packed in g_vatAnim1.w. */
        private _vatSkinArray;
        /** VAT per-skin NORMAL Texture2DArray switching — opt-in via enableVatSkinArrayNormal() once a
         *  tkNormalArray is assigned. Overrides normalW with Babylon's native perturbNormal()/vTBN (only the
         *  texel swapped for our slice), at the layer decoded from g_vatAnim1.w. Built unmipped + linear. */
        private _vatSkinArrayNormal;
        /** VAT per-skin METALLIC-ROUGHNESS switching — opt-in via enableVatSkinArrayMetalRough() once a
         *  tkMetalRoughArray is assigned. metallic=slice.B, roughness=slice.G; mipped + linear. */
        private _vatSkinArrayMetalRough;
        /** VAT per-skin EMISSIVE switching — opt-in via enableVatSkinArrayEmissive() once a tkEmissiveArray is
         *  assigned. Overrides finalEmissive with toLinearSpace(slice); works with no base emissive. */
        private _vatSkinArrayEmissive;
        constructor(name: string, scene: BABYLON.Scene);
        awake(): void;
        update(): void;
        getShaderName(): string;
        getController(): TOOLKIT.VertexAnimationController;
        /**
         * Create a fresh VertexAnimationMaterial for a shared-geometry instance so it gets
         * its own plugin and independent animation state. PBR surface properties (albedo,
         * metallic, roughness, textures, etc.) are copied from the source material.
         * The VAT uniforms and controller link start at their defaults — setupAnimations()
         * wires them up as normal. shadowDepthWrapper is intentionally NOT copied;
         * setupAnimations() creates a new one for the clone.
         */
        cloneForInstance(instanceName: string): TOOLKIT.VertexAnimationMaterial;
        /**
         * Enable per-skin Texture2DArray "skin" switching on this VAT material WITHOUT adding any vertex
         * buffer. VAT instances are already at the vertex-buffer ceiling (instanced world matrix +
         * g_vatAnim0 + g_vatAnim1), so the skin LAYER index is PACKED into g_vatAnim1.w alongside the
         * loop-blend flag, decoded in-shader and used to sample the shared albedo Texture2DArray:
         *
         *     layer        = floor(g_vatAnim1.w * 0.5)        // 0,1,2,... selects the array slice
         *     surfaceAlbedo = texture(tkAlbedoArray, vec3(uv, layer))
         *
         * Surface UVs are used as-is (NO atlas remap) — each layer is a full-resolution slice with its own
         * clean mip chain. Assign the array first with addTextureArrayUniform("tkAlbedoArray", array), then
         * call this. Set the per-instance layer with VertexAnimationController.SetAtlasCellIndex(mesh, index).
         *
         * Albedo only for now (normal/MR/AO/emissive fold in later).
         */
        enableVatSkinArray(): TOOLKIT.VertexAnimationMaterial;
        /** Disable VAT skin-array switching (g_vatAnim1.w reverts to the loop-blend flag only). */
        disableVatSkinArray(): void;
        /**
         * Enable per-skin NORMAL Texture2DArray switching on this VAT material. Assign the array first with
         * addTextureArrayUniform("tkNormalArray", array), then call this. The fragment overrides normalW with
         * Babylon's native tangent-space bump EXACTLY (its own perturbNormal()/vTBN, our slice texel swapped
         * in), at the layer decoded from g_vatAnim1.w. Only active where the native tangent frame exists
         * (BUMP && TANGENT && NORMAL — i.e. the VAT material carries a bumpTexture and the geometry has
         * tangents); elsewhere it compiles out and the native VAT normal stands. Normal array is unmipped.
         */
        enableVatSkinArrayNormal(): TOOLKIT.VertexAnimationMaterial;
        /** Disable VAT per-skin NORMAL array switching (normalW reverts to the native VAT normal). */
        disableVatSkinArrayNormal(): void;
        /** Enable VAT per-skin METALLIC-ROUGHNESS switching (metallic=slice.B, roughness=slice.G), decoded at
         *  the layer packed in g_vatAnim1.w. Assign tkMetalRoughArray first. Only active under METALLICWORKFLOW. */
        enableVatSkinArrayMetalRough(): TOOLKIT.VertexAnimationMaterial;
        /** Disable VAT per-skin METALLIC-ROUGHNESS switching. */
        disableVatSkinArrayMetalRough(): void;
        /** Enable VAT per-skin EMISSIVE switching (finalEmissive = toLinearSpace(slice)) at the packed layer.
         *  Assign tkEmissiveArray first. Works with no base emissive on the material. */
        enableVatSkinArrayEmissive(): TOOLKIT.VertexAnimationMaterial;
        /** Disable VAT per-skin EMISSIVE switching. */
        disableVatSkinArrayEmissive(): void;
        /** True when VAT per-skin Texture2DArray switching is enabled (see enableVatSkinArray). */
        get vatSkinArray(): boolean;
        /** True when VAT per-skin NORMAL Texture2DArray switching is enabled (see enableVatSkinArrayNormal). */
        get vatSkinArrayNormal(): boolean;
        /** True when VAT per-skin METALLIC-ROUGHNESS switching is enabled. */
        get vatSkinArrayMetalRough(): boolean;
        /** True when VAT per-skin EMISSIVE switching is enabled. */
        get vatSkinArrayEmissive(): boolean;
        /** True when ANY VAT per-skin channel is enabled — master gate for the shared vVatSkin varyings + the
         *  packed cell-index decode, so any single channel works without the others. */
        get vatSkinArrayActive(): boolean;
    }
    /**
     * Static renderer reference emitted on Animator metadata for each VAT target.
     */
    interface IVertexAnimationRendererReference {
        name?: string;
        vertexrenderer?: string;
        vertexindex?: number;
        vertexcontroller?: string;
        vertextransform: string;
        vertexguid: string;
        vertexpath?: string;
        vertexmesh?: string;
        vertexsubmeshes?: number;
    }
    /**
     * Per-renderer VAT bake entry for a single clip.
     * Serialized by CVTools.OnExportNode into each Animator clip's settings metadata.
     */
    interface IVertexAnimationSettings extends IVertexAnimationRendererReference {
        name: string;
        vertex: string;
        vertexnormal: string;
        vertextextureformat: "png" | "exr";
        vertexpacking: "separate" | "none";
        vertexframes: number;
        vertexfps: number;
        vertexwidth: number;
        vertexheight: number;
        vertexcount: number;
        vertexrowsperframe: number;
        vertexposmin: [number, number, number];
        vertexposmax: [number, number, number];
        vertexmethod: "soft";
        vertexlooptime: boolean;
        vertexloopblend: boolean;
        vertexcombined?: boolean;
        vertexfromrow?: number;
        vertextorow?: number;
    }
    /**
     * Internal renderer entry held by a clip in VertexAnimationController.
     */
    interface IVertexAnimationRendererClip {
        guid: string;
        settings: TOOLKIT.IVertexAnimationSettings;
        positionTexture: BABYLON.Texture | null;
        normalTexture: BABYLON.Texture | null;
        posMinV3: BABYLON.Vector3;
        posMaxV3: BABYLON.Vector3;
        fromRow: number;
    }
    /**
     * Internal clip entry held by VertexAnimationController.
     */
    interface IVertexAnimationClip {
        name: string;
        renderers: {
            [guid: string]: IVertexAnimationRendererClip;
        };
        firstRendererGuid: string;
        duration: number;
        loop: boolean;
        loopBlend: boolean;
    }
    /**
     * Shared playback clock for Vertex Animation Texture (VAT) materials.
     *
     * One controller per Animator/VAT controller identity (keyed by vertexcontroller).
     * All materials across every baked skinned mesh renderer on that rig share this
     * controller so body, head, armor, and any submeshes all advance in lockstep.
     *
     * Lifecycle:
     *   - GetOrCreate(controllerGuid, scene) from the AnimationState machine
     *   - loadAnimations(settings[]) to preload VAT textures
     *   - play(clipName, blendDuration) to start
     *   - Materials register themselves during their plugin.setupAnimations()
     *
     * @class VertexAnimationController
     */
    class VertexAnimationController {
        private static _registry;
        /**
         * Global VAT texture cache.
         *
         * The controller registry is keyed by Animator/VAT controller guid, which means
         * multiple character instances using the same EXR/PNG VAT assets can still create
         * duplicate BABYLON.Texture objects. This cache is keyed by scene + resolved URL +
         * the exact VAT sampler/upload contract, so all controllers in the same scene share
         * the heavy VAT GPU textures and release them by reference count.
         */
        private static _globalTextureCache;
        /** Look up an existing controller by controller guid. Returns null if none. */
        static Find(guid: string): TOOLKIT.VertexAnimationController;
        /**
         * Look up or create a controller for a given controller guid.
         * @param lazyLoadTextures When true, VAT textures are NOT allocated at loadAnimations() time.
         *   They are deferred to the first play() call for each clip. Set this from the Animator
         *   metadata field written by the C# exporter (e.g. getProperty("lazyloadtextures", false)).
         *   Once the controller is created as lazy it stays lazy for its lifetime.
         */
        static GetOrCreate(guid: string, scene: BABYLON.Scene, rootUrl?: string, lazyLoadTextures?: boolean): TOOLKIT.VertexAnimationController;
        /** Collect unique renderer targets from the flat VAT settings array emitted by C#. */
        static CollectRendererTargets(settings: TOOLKIT.IVertexAnimationSettings[]): TOOLKIT.IVertexAnimationRendererReference[];
        /** Set a per-mesh skin layer index for VAT per-skin Texture2DArray switching. Stored on the mesh as
         *  `atlasCellIndex` and packed into g_vatAnim1.w during _tick (alongside the loop-blend flag), so
         *  each InstancedMesh under one VAT controller can display a different array layer with no extra
         *  vertex buffer. Requires enableVatSkinArray() on the material. Unset / out-of-range values are
         *  treated as 0 (the first array layer). */
        static SetAtlasCellIndex(mesh: BABYLON.AbstractMesh, cellIndex: number): void;
        /** Read a per-mesh atlas cell index. Returns 0 when the mesh has no value set. */
        static GetAtlasCellIndex(mesh: BABYLON.AbstractMesh): number;
        /** Dispose every controller (optionally only those tied to a given scene). */
        static DisposeAll(scene?: BABYLON.Scene): void;
        readonly guid: string;
        readonly scene: BABYLON.Scene;
        rootUrl: string;
        private _plugins;
        private _clips;
        private _currentClip;
        private _previousClip;
        private _time;
        private _previousTime;
        private _speed;
        private _loop;
        private _loopBlend;
        private _manualLoopOverride;
        private _playing;
        private _blendDuration;
        private _blendElapsed;
        private _blendWeight;
        private _mode;
        private _normalMode;
        private _lazyLoad;
        private _tickObserver;
        private _disposeObserver;
        private _lastFrameId;
        /** Local controller view into the global VAT texture cache. Keyed by resolved/full URL. */
        private _textureCache;
        /** Tracks which global texture keys this controller acquired so dispose() can release once. */
        private _textureCacheKeys;
        /** Maps renderer GUID → the specific Mesh/InstancedMesh node for THIS animator instance. */
        private _instanceMeshes;
        /** Register the specific scene mesh node that this controller drives.
         *  Called once per renderer GUID during AnimationState setup.
         *  The mesh may be a source Mesh or an InstancedMesh — both support instancedBuffers. */
        setInstanceMesh(rendererGuid: string, mesh: BABYLON.AbstractMesh): void;
        private constructor();
        dispose(): void;
        get currentClip(): IVertexAnimationClip;
        get previousClip(): IVertexAnimationClip;
        get currentTime(): number;
        get previousTime(): number;
        get blendWeight(): number;
        get isPlaying(): boolean;
        get normalMode(): "separate" | "none";
        get loopBlend(): boolean;
        get mode(): "auto" | "drive";
        get speed(): number;
        get loopOverride(): boolean | null;
        getClip(name: string): IVertexAnimationClip | null;
        setSpeed(speed: number): void;
        setLoop(loop: boolean): void;
        setCurrentTime(time: number): void;
        getCurrentTime(): number;
        addPlugin(plugin: VertexAnimationMaterialPlugin): void;
        removePlugin(plugin: VertexAnimationMaterialPlugin): void;
        /**
         * Load (or refresh) VAT clips. Existing clips are kept — only new ones
         * allocate textures. Normal mode is captured from the first renderer clip;
         * all renderers on one controller are expected to share the same packing.
         */
        loadAnimations(settings: TOOLKIT.IVertexAnimationSettings[]): void;
        /**
         * Start playback of a named clip. If blendDuration > 0 and a different clip
         * is currently playing, crossfade from the current clip to the new one. (Default 0.1)
         */
        play(clipName: string, blendDuration?: number): boolean;
        pause(): void;
        resume(): void;
        stop(): void;
        /**
         * Drive-mode entry point. Replaces the (clip, time, blendWeight) triple in one call so
         * an external owner (typically AnimationState's blend-tree evaluator) can push the top-2
         * weighted children of a tree — or the dominant clips of a state transition's source +
         * destination — without having to fight the controller's auto crossfade. Two clip slots
         * are exposed because that's what the GPU pipeline already carries (g_vatAnim0 + g_vatAnim1).
         *
         * After this call _tick() will only push values to the GPU; it will not advance _time
         * or decay _blendWeight. play() switches the controller back to auto.
         *
         * @param primaryName       Clip whose state goes into g_vatAnim0 (the "current" slot).
         * @param primaryTimeSec    Sampling time for the primary, in seconds within the clip.
         * @param secondaryName     Clip for g_vatAnim1 (the "previous" slot). null = no second clip.
         * @param secondaryTimeSec  Sampling time for the secondary, in seconds within the clip.
         * @param blendWeight       0..1, the lerp weight written into g_vatAnim0.w. The shader
         *                          mixes secondary→primary by this value, so 1 = only primary,
         *                          0 = only secondary.
         */
        driveBlend(primaryName: string, primaryTimeSec: number, secondaryName: string | null, secondaryTimeSec: number, blendWeight: number): boolean;
        getCurrentRendererClip(rendererGuid: string): IVertexAnimationRendererClip;
        getPreviousRendererClip(rendererGuid: string): IVertexAnimationRendererClip;
        /** Runs once per scene frame. Advances time + blend weight, then syncs all registered material plugins. */
        private _tick;
        private _getOrCreateVATBuffer;
        private _isRendererPositionReady;
        private _areBlendTargetsReady;
        /**
         * For lazy-loaded controllers: allocates GPU textures for every renderer entry in the
         * given clip that does not yet have one. No-op when not in lazy mode (all textures were
         * allocated at loadAnimations() time) or when called with a null clip.
         *
         * Textures begin uploading to the GPU asynchronously; the existing `|| fallback` guards
         * in syncFromController() show the 1×1 placeholder for the one or two frames it takes
         * for the texture to become ready — no special handling required in the shader.
         */
        private _wrapTime;
        private _ensureClipTexturesLoaded;
        private _getOrAcquireTexture;
        private static _acquireVATTexture;
        private static _releaseVATTexture;
        private static _makeVATTextureCacheKey;
        private static _createVATTexture;
        private _resolveUrl;
        private _getRendererClip;
    }
    /**
     * VAT Material Plugin — injects the VAT sampling code into the vertex stage
     * and wires the material to its shared VertexAnimationController.
     * @class VertexAnimationMaterialPlugin
     */
    class VertexAnimationMaterialPlugin extends TOOLKIT.CustomShaderMaterialPlugin {
        /** Flat VAT settings array — direct C# exporter output (animatorProps["vertexrenderers"]) */
        vertexAnimations: TOOLKIT.IVertexAnimationSettings[];
        /** Shared clock for this Animator/VAT controller identity */
        controller: TOOLKIT.VertexAnimationController;
        /** Unique VAT renderer targets referenced by the supplied settings */
        private _rendererTargets;
        /** Resolved renderer guid for the mesh currently using this material instance */
        private _targetRendererGuid;
        /** 1×1 fallback texture — keeps WebGPU bind groups valid before a clip is assigned */
        private _placeholderTexture;
        private _cc_posTex;
        private _cc_normTex;
        private _cc_prevPosTex;
        private _cc_prevNormTex;
        private _cc_texW;
        private _cc_texH;
        private _cc_rowsPF;
        private _cc_vCount;
        private _cc_posMin;
        private _cc_posMax;
        private _cc_prevTexW;
        private _cc_prevTexH;
        private _cc_prevRowsPF;
        private _cc_prevPosMin;
        private _cc_prevPosMax;
        private static readonly _zeroV3;
        private static readonly _oneV3;
        constructor(customMaterial: TOOLKIT.CustomShaderMaterial, shaderName: string);
        dispose(): void;
        isCompatible(shaderLanguage: BABYLON.ShaderLanguage): boolean;
        getCustomCode(shaderType: string, shaderLanguage: BABYLON.ShaderLanguage): any;
        getUniforms(shaderLanguage: BABYLON.ShaderLanguage): any;
        getSamplers(samplers: string[]): void;
        getAttributes(attributes: string[], scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        prepareDefines(defines: BABYLON.MaterialDefines, scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        bindForSubMesh(uniformBuffer: BABYLON.UniformBuffer, scene: BABYLON.Scene, engine: BABYLON.AbstractEngine, subMesh: BABYLON.SubMesh): void;
        /**
         * Wire this material to a VertexAnimationController for the given settings.
         * Called from the AnimationState machine at scene-load time.
         * NOTE: The shared controller plays, pauses and stops the clips.
         * @param lazyLoadTextures Pass the value read from Animator metadata
         *   (e.g. getProperty("lazyloadtextures", false)). When true, VAT textures
         *   are deferred to the first play() call for each clip instead of being
         *   loaded all at startup.
         */
        /**
         * Wire this material to a VertexAnimationController for the given settings.
         * Called from the AnimationState machine at scene-load time.
         * @param settings  Direct value of animatorProps["vertexrenderers"] — flat IVertexAnimationSettings[].
         * @param controllerId  Direct value of animatorProps["vertexcontroller"] — the shared Animator GUID.
         * @param rootUrl  Base URL for resolving relative texture paths.
         * @param lazyLoadTextures  Direct value of animatorProps["lazyloadtextures"].
         */
        setupAnimations(settings: TOOLKIT.IVertexAnimationSettings[], controllerId: string, rootUrl?: string, lazyLoadTextures?: boolean): TOOLKIT.VertexAnimationController;
        private _captureRendererTarget;
        private _resolveRendererTarget;
        private _matchRendererByGuid;
        private _matchRendererByPath;
        private _matchRendererByName;
        private _readMetadataString;
        private _buildNodePath;
        private _pathEndsWith;
        /**
         * Populate the plugin-local VAT state cache from the controller.
         * Called once per frame from VertexAnimationController._tick() for every registered plugin.
         * bindForSubMesh() reads from this cache directly — no hash-map dict lookups, no full
         * uniform iteration, no UBO flush triggered here.
         */
        syncFromController(material: TOOLKIT.VertexAnimationMaterial, controller?: TOOLKIT.VertexAnimationController): void;
        /**
         * Bind VAT uniforms directly to a shadow-depth Effect.
         * Called by the shadow generator observer instead of mat.updateCustomBindings(effect),
         * which would iterate all material dicts and push stale values before the VAT plugin
         * overwrites them — wasted work in the shadow render path.
         */
        bindVATToEffect(effect: BABYLON.Effect): void;
        /**
         * Push the VAT state cache directly onto a UniformBuffer (main render) or Effect (shadow).
         * This is the hot path replacement for updateCustomBindings() — O(1) field reads instead of
         * O(n) hash-map iteration, zero texture matrix writes, zero UBO flush.
         */
        private _pushVATUniforms;
        private getGLSLVertexDefinitions;
        private getGLSLVertexPositionCode;
        private getGLSLVertexNormalCode;
        private getWGSLVertexDefinitions;
        private getWGSLVertexPositionCode;
        private getWGSLVertexNormalCode;
        private getGLSLSkinLayerVaryingCode;
        private getGLSLSkinFragmentDefs;
        private getGLSLSkinAlbedoCode;
        private getGLSLSkinNormalCode;
        private getGLSLSkinMetalRoughSampleCode;
        private getGLSLSkinMetalRoughApplyCode;
        private getGLSLSkinEmissiveCode;
        private getWGSLSkinLayerVaryingCode;
        private getWGSLSkinFragmentDefs;
        private getWGSLSkinAlbedoCode;
        private getWGSLSkinNormalCode;
        private getWGSLSkinMetalRoughSampleCode;
        private getWGSLSkinMetalRoughApplyCode;
        private getWGSLSkinEmissiveCode;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class CheckpointManager
    */
    class CheckpointManager extends TOOLKIT.ScriptComponent {
        private checkPointList;
        private checkPointCount;
        private checkPointIndex;
        private nextCheckPoint;
        private startRaceTime;
        private totalRaceTime;
        private lapNumber;
        private lapTimer;
        private lapTimes;
        private playerID;
        private playerName;
        private raceOver;
        register(id: number, name: string): void;
        getLapTimes(): number[];
        getLapNumber(): number;
        getCheckPoint(): number;
        getPlayerName(): string;
        getPlayerID(): number;
        getRaceTime(): number;
        getRaceOver(): boolean;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected start(): void;
        private nextCheckPointName;
        protected update(): void;
        protected late(): void;
        startRaceTimer(): void;
    }
}
declare namespace PROJECT {
    interface ITrackNode {
        radius: number;
        position: TOOLKIT.IUnityVector3;
        rotation: TOOLKIT.IUnityVector4;
        localPosition: BABYLON.Vector3;
        localRotation: BABYLON.Quaternion;
        localDistance: number;
    }
    interface IControlPoint {
        speed: number;
        tvalue: number;
        position: TOOLKIT.IUnityVector3;
    }
    class RoutePoint {
        position: BABYLON.Vector3;
        direction: BABYLON.Vector3;
    }
    class PlayerRaceStats {
        id: number;
        name: string;
        position: number;
    }
    /**
    * Babylon Script Component
    * @class BT_RaceTrackManager
    */
    class RaceTrackManager extends TOOLKIT.ScriptComponent {
        static TrackLength: number;
        static TotalLapCount: number;
        static WinnerTransform: BABYLON.TransformNode;
        private static CheckPointTag;
        private static CheckPointList;
        private static LeaderBoardList;
        private static PlayerVehicleList;
        private trackNodes;
        private raceLineData_1;
        private raceLineData_2;
        private raceLineData_3;
        private raceLineData_4;
        private raceLineData_5;
        private raceLineColor_1;
        private raceLineColor_2;
        private raceLineColor_3;
        private raceLineColor_4;
        private raceLineColor_5;
        private debugMeshLines_1;
        private debugMeshLines_2;
        private debugMeshLines_3;
        private debugMeshLines_4;
        private debugMeshLines_5;
        private p0n;
        private p1n;
        private p2n;
        private p3n;
        private i;
        private static _EventBus;
        static get EventBus(): TOOLKIT.LocalMessageBus;
        drawDebugLines: boolean;
        getTrackNodes(): PROJECT.ITrackNode[];
        getControlPoints(line: number): PROJECT.IControlPoint[];
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected after(): void;
        protected destroy(): void;
        getRoutePoint(distance: number): PROJECT.RoutePoint;
        getRoutePointToRef(distance: number, result: PROJECT.RoutePoint): void;
        getRoutePosition(distance: number): BABYLON.Vector3;
        getRoutePositionToRef(distance: number, result: BABYLON.Vector3): void;
        /** Gets the checkpoint tag identifier */
        static GetCheckpointTag(): string;
        /** Get the checkpoint position list */
        static GetCheckpointList(): BABYLON.AbstractMesh[];
        /** Get the total number of checkpoints */
        static GetCheckpointCount(): number;
        /** Calculates the fraction distance to next checkpoint */
        private static GetCheckpointDistance;
        /** Register vehicle with track manager */
        static RegisterVehicle(vehicle: BABYLON.TransformNode): void;
        /** Gets the registered player vehicles */
        static GetPlayerVehicles(): BABYLON.TransformNode[];
        /** Register player with track manager */
        static RegisterPlayer(id: number, name: string): void;
        /** Update player leaderboard information */
        static UpdateLeaderboard(id: number, lap: number, checkpoint: number, position: BABYLON.Vector3): void;
        /** Get player leaderboard position */
        static GetLeaderboardPosition(id: number): number;
        /** Get leaderboard position list */
        static GetLeaderboardPositionList(): PROJECT.PlayerRaceStats[];
        /** Sort leaderboard position list */
        private static SortLeaderboardPositionList;
    }
}
declare namespace PROJECT {
    /**
     * Babylon remote vehicle controller class (Colyseus Universal Game Room)
    * @class RemoteCarController
    */
    class RemoteCarController extends TOOLKIT.ScriptComponent {
        private static ShowSensorLines;
        centerOfMass: number;
        burnoutWheelPitch: number;
        linkTrackManager: boolean;
        playVehicleSounds: boolean;
        smokeTexture: BABYLON.Texture;
        skidThreashold: number;
        smokeIntensity: number;
        wheelDrawVelocity: number;
        smokeOpacity: number;
        smokeDonuts: number;
        private steeringWheelHub;
        private steeringWheelAxis;
        private maxSteeringAngle;
        private maxSteeringSpeed;
        private _animator;
        private _engineAudioSource;
        private _skidAudioSource;
        private brakeLightsMesh;
        private brakeLightsTrans;
        private reverseLightsMesh;
        private reverseLightsTrans;
        private frontLeftWheelTrans;
        private frontRightWheelTrans;
        private backLeftWheelTrans;
        private backRightWheelTrans;
        private frontLeftWheelMesh;
        private frontRightWheelMesh;
        private backLeftWheelMesh;
        private backRightWheelMesh;
        private frontLeftWheelEmitter;
        private frontRightWheelEmitter;
        private backLeftWheelEmitter;
        private backRightWheelEmitter;
        private frontLeftWheelParticle;
        private frontRightWheelParticle;
        private backLeftWheelParticle;
        private backRightWheelParticle;
        private frontLeftContact;
        private frontRightContact;
        private rearLeftContact;
        private rearRightContact;
        private frontLeftContactTag;
        private frontRightContactTag;
        private rearLeftContactTag;
        private rearRightContactTag;
        private frontLeftContactPoint;
        private frontRightContactPoint;
        private rearLeftContactPoint;
        private rearRightContactPoint;
        private frontLeftContactNormal;
        private frontRightContactNormal;
        private rearLeftContactNormal;
        private rearRightContactNormal;
        private startRaycastPosition;
        private endRaycastPosition;
        private smokeIntensityFactor;
        private downDirection;
        private downDistance;
        private lastPitch;
        private lastBrake;
        private lastReverse;
        private lastBurnout;
        private lastSteering;
        private lastSKID_FL;
        private lastSKID_FR;
        private lastSKID_RL;
        private lastSKID_RR;
        private lastSPIN_FL;
        private lastSPIN_FR;
        private lastSPIN_RL;
        private lastSPIN_RR;
        private PITCH_FL;
        private PITCH_FR;
        private PITCH_RL;
        private PITCH_RR;
        private WHEEL_SKID_PITCH;
        getFrontLeftWheelContact(): boolean;
        getFrontRightWheelContact(): boolean;
        getRearLeftWheelContact(): boolean;
        getRearRightWheelContact(): boolean;
        getFrontLeftWheelContactTag(): string;
        getFrontRightWheelContactTag(): string;
        getRearLeftWheelContactTag(): string;
        getRearRightWheelContactTag(): string;
        getFrontLeftWheelContactPoint(): BABYLON.Vector3;
        getFrontRightWheelContactPoint(): BABYLON.Vector3;
        getRearLeftWheelContactPoint(): BABYLON.Vector3;
        getRearRightWheelContactPoint(): BABYLON.Vector3;
        getFrontLeftWheelContactNormal(): BABYLON.Vector3;
        getFrontRightWheelContactNormal(): BABYLON.Vector3;
        getRearLeftWheelContactNormal(): BABYLON.Vector3;
        getRearRightWheelContactNormal(): BABYLON.Vector3;
        protected m_frontLeftWheelSkid: number;
        protected m_frontRightWheelSkid: number;
        protected m_backLeftWheelSkid: number;
        protected m_backRightWheelSkid: number;
        protected m_velocityOffset: BABYLON.Vector3;
        protected m_linearVelocity: BABYLON.Vector3;
        protected m_lastPosition: BABYLON.Vector3;
        protected m_positionCenter: BABYLON.Vector3;
        protected m_scaledVelocity: number;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        protected updateVehicleProperties(): void;
        private createSmokeParticleSystem;
    }
}
declare namespace PROJECT {
    /**
     * Babylon Script Component
     * @class SideCameraController
     */
    class SideCameraController extends TOOLKIT.ScriptComponent {
        private _camera;
        private _adt;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        protected late(): void;
        protected step(): void;
        protected fixed(): void;
        protected after(): void;
        protected reset(): void;
        protected destroy(): void;
        private enableWindowView;
    }
}
declare namespace PROJECT {
    /**
     * Babylon skidmark section class (Havok Physics Engine)
     * @class SkidMarkSection
     */
    class SkidMarkSection {
        Pos: BABYLON.Vector3;
        Normal: BABYLON.Vector3;
        Tangent: BABYLON.Vector4;
        Posl: BABYLON.Vector3;
        Posr: BABYLON.Vector3;
        Intensity: number;
        LastIndex: number;
    }
    /**
     * Babylon Script Component
     * @class SkidMarkManager
     */
    class SkidMarkManager extends TOOLKIT.ScriptComponent {
        private static MAX_MARKS;
        private static GROUND_OFFSET;
        private static GPU_TRIANGLES;
        private static MARK_COLOR;
        private static MARK_WIDTH;
        private static TEX_INTENSITY;
        private static MIN_DISTANCE;
        private static MIN_SQR_DISTANCE;
        private static TEXTURE_MARKS;
        private static SkidBufferPositions;
        private static SkidBufferNormals;
        private static SkidBufferTangents;
        private static SkidBufferColors;
        private static SkidBufferUvs;
        private static SkidBufferIndices;
        private static SkidMarkSections;
        private static SkidMarkIndex;
        private static SkidMarkMesh;
        private static SkidMarkUpdated;
        private static TempVector3_POS;
        private static TempVector3_DIR;
        private static TempVector3_XDIR;
        private static TempVector3_SDIR;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected start(): void;
        protected update(): void;
        static AddSkidMarkSegment(pos: BABYLON.Vector3, normal: BABYLON.Vector3, intensity: number, lastIndex: number): BABYLON.Nullable<number>;
        private static CreateSkidMarkManager;
        private static AddSkidMarkVertexData;
        private static UpdateSkidMarkManager;
    }
}
declare namespace PROJECT {
    /**
     * Babylon standard rigidbody vehicle controller class (Native Bullet Physics 2.82)
     * @class StandardCarController
     */
    class StandardCarController extends TOOLKIT.ScriptComponent {
        static DEFAULT_SKID_FACTOR: number;
        static DEFAULT_PITCH_FACTOR: number;
        static DEFAULT_SPEED_FACTOR: number;
        static DEFAULT_DONUT_FACTOR: number;
        static DEFAULT_BRAKE_DEADZONE: number;
        static SimplexNoise2D: TOOLKIT.NoiseFunction2D;
        MIN_RPM: number;
        MAX_RPM: number;
        private _animator;
        private _rigidbody;
        private _engineAudioSource;
        private _skidAudioSource;
        private _nosAudioSource;
        private _positionLocked;
        private _prevHandBrakeRequested;
        private _donutEngineScale;
        private _donutEntryBlend;
        private _donutEntrySpeedMps;
        private steeringWheelHub;
        private steeringWheelAxis;
        private maxSteeringAngle;
        private maxSteeringSpeed;
        private gearIndex;
        private shiftingTime;
        private shiftingSide;
        private shiftingBrake;
        private engineForce;
        private footBraking;
        private handBraking;
        private linearDamping;
        private angularDamping;
        private forwardSpeed;
        private absoluteSpeed;
        private americanSpeed;
        private gradientSpeed;
        private smoothedGradientSpeed;
        private smoothedSteeringSpeed;
        private frontWheelPower;
        private backWheelPower;
        private wheelBrakingForce;
        private enginePitchLevel;
        private smokeIntensityFactor;
        private handBrakingHoldTimer;
        private raycastVehicle;
        private brakeLightsMesh;
        private brakeLightsTrans;
        private reverseLightsMesh;
        private reverseLightsTrans;
        private frontLeftWheelTrans;
        private frontRightWheelTrans;
        private backLeftWheelTrans;
        private backRightWheelTrans;
        private frontLeftWheelMesh;
        private frontRightWheelMesh;
        private backLeftWheelMesh;
        private backRightWheelMesh;
        private frontLeftWheelEmitter;
        private frontRightWheelEmitter;
        private backLeftWheelEmitter;
        private backRightWheelEmitter;
        private frontLeftWheelParticle;
        private frontRightWheelParticle;
        private backLeftWheelParticle;
        private backRightWheelParticle;
        private frontLeftWheelCollider;
        private frontRightWheelCollider;
        private backLeftWheelCollider;
        private backRightWheelCollider;
        private engineTorqueCurve;
        private physicsSteerAngleL;
        private physicsSteerAngleR;
        private visualSteerAngleL;
        private visualSteerAngleR;
        private visualSteerBoostL;
        private visualSteerBoostR;
        private idleNoiseDelta;
        private driveNoiseDelta;
        private boostSpeedTimer;
        private burnoutMeter;
        private donutMeter;
        private wheelRadius;
        private engineRPM;
        private pitchRPM;
        private shiftRPM;
        private wheelRPM;
        private transmissionInputRPM;
        private actualEngineRPM;
        private targetEngineRPM;
        private throttleRPM;
        private engineLoad;
        private gearShiftCooldown;
        private isShifting;
        private shiftDirection;
        private clutchEngagement;
        private engineBraking;
        private shiftHysteresis;
        private SKID_FL;
        private SKID_FR;
        private SKID_RL;
        private SKID_RR;
        private PITCH_FL;
        private PITCH_FR;
        private PITCH_RL;
        private PITCH_RR;
        private FRONT_LEFT;
        private FRONT_RIGHT;
        private BACK_LEFT;
        private BACK_RIGHT;
        private WHEEL_SKID_PITCH;
        private POWER_BOOST_PITCH;
        private SPIN_FL_Rotation;
        private SPIN_FR_Rotation;
        private SPIN_RL_Rotation;
        private SPIN_RR_Rotation;
        isBraking(): boolean;
        isBoosting(): boolean;
        private allowRollingReverseBurnout;
        getFootBraking(): boolean;
        getHandBraking(): boolean;
        getLinearVelocity(): BABYLON.Vector3;
        getCurrentForward(): number;
        getCurrentTurning(): number;
        getCurrentSkidding(): boolean;
        getBurnoutButton(): boolean;
        getDonutButton(): boolean;
        getReverseThrottle(): boolean;
        getEnginePitchLevel(): number;
        getCurrentBurnout(): boolean;
        getFrontLeftSkid(): number;
        getFrontRightSkid(): number;
        getBackLeftSkid(): number;
        getBackRightSkid(): number;
        getWheelSkidPitch(): number;
        getRigidbodyPhysics(): TOOLKIT.RigidbodyPhysics;
        getRaycastVehicle(): TOOLKIT.RaycastVehicle;
        getGradientSpeed(): number;
        getForwardSpeed(): number;
        getAbsoluteSpeed(): number;
        getAmericanSpeed(): number;
        getTopEngineSpeed(): number;
        getNormalizedSpeed(): number;
        getMaxReversePower(): number;
        getCurrentGearIndex(): number;
        getCurrentEngineRPM(): number;
        getCurrentEngineForce(): number;
        getCurrentEnginePitch(): number;
        getGearShiftRatioCount(): number;
        getSmokeTextureMask(): BABYLON.Texture;
        getBrakeLightsMesh(): BABYLON.TransformNode;
        getReverseLightsMesh(): BABYLON.TransformNode;
        getFrontLeftWheelNode(): BABYLON.TransformNode;
        getFrontRightWheelNode(): BABYLON.TransformNode;
        getBackLeftWheelNode(): BABYLON.TransformNode;
        getBackRightWheelNode(): BABYLON.TransformNode;
        getWheelBurnoutEnabled(): boolean;
        getWheelDonutsEnabled(): boolean;
        getCurrentDonutSpinTime(): number;
        isStartPositionLocked(): boolean;
        /**
         * Snap the car to its current transform position and lock it there.
         * Engine revs, burnout state machine, and wheel spin visuals continue to run.
         * Call this when placing the car on the grid before the countdown starts.
         */
        lockStartPosition(): void;
        /**
         * Release the position lock. If the car had a stationary burnout actively built up,
         * the burnout launch kick fires immediately for an explosive start.
         * Call this on GO / when the countdown finishes.
         */
        unlockStartPosition(): void;
        getSmokeIntensityFactor(): number;
        getWheelVelocityOffset(): BABYLON.Vector3;
        smokeTexture: BABYLON.Texture;
        skidThreashold: number;
        wheelDrawVelocity: number;
        smokeIntensity: number;
        smokeOpacity: number;
        smokeDonuts: number;
        burnoutTurnFactor: number;
        maxSteerBoost: number;
        overSteerSpeed: number;
        overSteerTimeout: number;
        topEngineSpeed: number;
        topBoosterSpeed: number;
        powerChangeRate: number;
        powerCoefficient: number;
        boosterCoefficient: number;
        gravitationalForce: number;
        driftSpeedDampener: number;
        lowGearCoefficient: number;
        lowGearDampener: number;
        stationaryBoost: number;
        lowSpeedSteering: number;
        highSpeedSteering: number;
        steeringInputCurve: number;
        maximumYawRateLow: number;
        maximumYawRateHigh: number;
        debugBurnout: boolean;
        debugBurnoutEveryNFrames: number;
        debugSteering: boolean;
        debugSteeringEveryNFrames: number;
        private _debugSteeringCounter;
        debugDonut: boolean;
        debugDonutEveryNFrames: number;
        private _donutLogCounter;
        donutTurningRadius: number;
        donutPowerBlend: number;
        donutSpeedScaling: number;
        donutRotationBoost: number;
        donutAngularDamping: number;
        donutFrontFriction: number;
        donutRearFriction: number;
        donutFrontWheelPull: number;
        donutYawDegPerSec: number;
        donutYawResponse: number;
        donutSlipAngle: number;
        donutEntryTime: number;
        donutVelocityPinEnabled: boolean;
        donutVelocityPinResponse: number;
        roadConnectAccel: number;
        smoothFlyingImpulse: number;
        stableDownImpulse: number;
        constImpulseForce: number;
        transmissionRatio: number;
        differentialRatio: number;
        burnoutFirstGearMultiplier: number;
        maxBoosterTime: number;
        minBoosterSpeed: number;
        maxFrontBraking: number;
        maxReversePower: number;
        minBrakingForce: number;
        maxBrakingForce: number;
        handBrakingForce: number;
        handBrakingTimer: number;
        defaultBrakingWindow: number;
        counterSteerLockoutWindowPercent: number;
        counterSteerLockoutDeadzone: number;
        linearBrakingForce: number;
        angularBrakingForce: number;
        frontSkidFriction: number;
        rearSkidFriction: number;
        burnoutTimeDelay: number;
        burnoutWheelPitch: number;
        stationaryBurnoutSkidPitch: number;
        burnoutPeelAwaySkidPitch: number;
        burnoutPeelAwayPitchRampTime: number;
        burnoutLaunchChirpSound: string;
        burnoutCoefficient: number;
        burnoutTriggerMark: number;
        stationaryBurnoutPrimeSpeedMph: number;
        stationaryBurnoutPrimeHoldTime: number;
        stationaryBurnoutPrimeReleaseSpeedMph: number;
        stationaryBurnoutRevMinRpmOffset: number;
        stationaryBurnoutRevMaxFactor: number;
        stationaryBurnoutRevLerpSpeed: number;
        burnoutLaunchRpmCarryTime: number;
        burnoutLaunchRpmCarryFloorFactor: number;
        normalLaunchTractionRamp: number;
        normalLaunchTractionMin: number;
        burnoutLaunchKickDuration: number;
        burnoutLaunchKickMultiplier: number;
        burnoutLaunchFrictionRestore: number;
        debugLaunch: boolean;
        debugLaunchEveryNFrames: number;
        debugFrictionRestore: boolean;
        debugFrictionRestoreEveryNFrames: number;
        debugFrictionSnapDelta: number;
        skidSlideEnabled: boolean;
        skidSlideMinAngle: number;
        skidSlideMaxAngle: number;
        skidSlideMinSpeed: number;
        skidRecoverDuration: number;
        skidRecoverCurve: number;
        debugSkidSlide: boolean;
        debugSkidSlideEveryNFrames: number;
        skidReleaseBrakeFadeTime: number;
        skidReleaseSnapRatio: number;
        skidStopFrictionResetSpeed: number;
        skidLaunchFrictionResetSpeed: number;
        burnoutStopFrictionResetSpeed: number;
        burnoutLaunchFrictionResetSpeed: number;
        burnoutExitArcadeFadeTime: number;
        burnoutExitFrictionRampTime: number;
        burnoutExitArcadeReleaseTime: number;
        enableAutoBurnouts: boolean;
        grassPenaltyMask: number;
        curbPenaltyMask: number;
        minPenaltySpeed: number;
        linearWheelDrag: number;
        frictionWheelSlip: number;
        showSensorLines: boolean;
        powerBooster: boolean;
        linkTrackManager: boolean;
        playVehicleSounds: boolean;
        postNetworkAttributes: boolean;
        wheelDriveType: number;
        gearBoxMultiplier: number;
        currentPitchScale: number;
        gearBoxPitchScale: number;
        gearBoxShiftDelay: number;
        gearBoxShiftRatios: number[];
        gearBoxShiftUpRanges: number[];
        gearBoxShiftDownRanges: number[];
        throttleBrakingForce: number;
        throttleEngineSpeed: number;
        frictionLerpSpeed: number;
        burnoutLerpSpeed: number;
        skidTurningAssist: number;
        skidSteeringKick: number;
        skidSteeringAngle: number;
        skidReleaseWindow: number;
        skidReleaseLinger: number;
        ackermanWheelBase: number;
        ackermanRearTrack: number;
        ackermanTurnRadius: number;
        ackermanMaxRadius: number;
        ackermanTurnFactor: number;
        radiusBrakingForce: number;
        steeringSlewTau: number;
        minSteeringSlew: number;
        readBurnoutMeter(): number;
        resetBurnoutMeter(): void;
        readDonutMeter(): number;
        resetDonutMeter(): void;
        getBoosterTime(): number;
        setBoosterTime(time: number): void;
        resetBoosterTime(): void;
        roadSurfaceFactor: number;
        movementTilting: boolean;
        surfaceDetection: boolean;
        idleShakeRate: number;
        idleShakeNoise: number;
        maxForwardAngle: number;
        maxLateralAngle: number;
        lerpForwardFactor: number;
        lerpLateralFactor: number;
        shiftForwardExtra: number;
        shiftLateralExtra: number;
        forwardPitchFactor: number;
        lateralRollFactor: number;
        forwardRecoverRate: number;
        lateralRecoverRate: number;
        lowSpeedScale: number;
        highSpeedScale: number;
        lowForwardNoise: number;
        highForwardNoise: number;
        lowLateralNoise: number;
        highLateralNoise: number;
        speedThreashold: number;
        boosterTransform: BABYLON.TransformNode;
        chassisTransform: BABYLON.TransformNode;
        tiltChassisEulers: BABYLON.Vector3;
        protected m_physicsWorld: any;
        protected m_frontLeftWheel: TOOLKIT.btWheelInfo;
        protected m_frontRightWheel: TOOLKIT.btWheelInfo;
        protected m_backLeftWheel: TOOLKIT.btWheelInfo;
        protected m_backRightWheel: TOOLKIT.btWheelInfo;
        protected m_frontLeftWheelSkid: number;
        protected m_frontRightWheelSkid: number;
        protected m_backLeftWheelSkid: number;
        protected m_backRightWheelSkid: number;
        protected m_angularDampener: BABYLON.Vector3;
        protected m_velocityOffset: BABYLON.Vector3;
        protected m_linearVelocity: BABYLON.Vector3;
        protected m_lastPosition: BABYLON.Vector3;
        protected m_scaledVelocity: number;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        protected awakeVehicleState(): void;
        protected initVehicleState(): void;
        protected updateVehicleState(): void;
        protected destroyVehicleState(): void;
        private donutButton;
        private burnoutButton;
        private burnoutTimer;
        private burnoutElapsed;
        private restoreTimer;
        private restoreTimerDuration;
        private cooldownTimer;
        private wheelDonuts;
        private wheelBurnout;
        private _prevBurnoutButton;
        private _burnoutLatchedDriveSign;
        private _stationaryBurnoutPrimed;
        private _stationaryBurnoutPrimeTimer;
        private _prevStationaryBurnoutWanted;
        private _burnoutLaunchKickTimer;
        private _burnoutLaunchHoldRpm;
        private _burnoutLaunchRpmCarryTimer;
        private _burnoutLaunchRpmCarryDuration;
        private _burnoutPeelAwayPitchRampTimer;
        private _burnoutPeelAwayPitchRampDuration;
        private _stationaryLaunchSnapActive;
        private _burnoutLowGearClimbActive;
        private _burnoutLowGearClimbStationary;
        private _burnoutLowGearClimbDriveSign;
        private _burnoutStartedFromStationary;
        private _launchLogCounter;
        private _handBrakeEntrySteerSign;
        private _skidReleaseBrakeTimer;
        private _skidFrictionRestorePending;
        private _skidRecoverActive;
        private _skidRecoverElapsed;
        private _skidRecoverFrontStart;
        private _skidRecoverRearStart;
        private _skidSlideLogCounter;
        private _burnoutExitArcadeFadeTimer;
        private _burnoutExitFrictionRampTimer;
        private _burnoutExitArcadeReleaseTimer;
        private _burnoutResidualFrictionRestorePending;
        private _prevWheelBurnoutState;
        private _lockedPosition;
        private _lockedRotationQuaternion;
        private wheelSkidding;
        private donutSpinTime;
        private currentForward;
        private currentTurning;
        private rampedTurning;
        private currentBoosting;
        private currentSkidding;
        private currentDrivePower;
        private targetDrivePower;
        private animatorSteerAngle;
        /** Drives the raycast vehicle with the specfied movement properties. */
        drive(throttle: number, steering: number, braking: boolean, burnout: boolean, booster?: number, autopilot?: boolean, nos?: boolean, donut?: boolean): void;
        private processAckermanSteering;
        private syncVehicleState;
        private currentPitch;
        private currentRoll;
        private previousSpeed;
        private syncVehicleTilting;
        private updateGearShifting;
        private shouldUpshift;
        private shouldDownshift;
        private initiateGearShift;
        private armBurnoutLowGearClimb;
        private resetBurnoutLowGearClimb;
        private isBurnoutLowGearClimbActive;
        private updateBurnoutLowGearClimbState;
        private armBurnoutLaunchAudio;
        private isStationaryBurnoutSkidAudioActive;
        private isBurnoutPeelAwaySkidAudioActive;
        private getWheelSkidAudioPitchScale;
        private getBurnoutLaunchRpmCarryFloor;
        private updateClutchEngagement;
        private getIdleRPM;
        private writeTransformMetadata;
        private getVehicleEngineTorque;
        private createSmokeParticleSystem;
        private updateCurrentSkidInfo;
        private computeSlideSkid;
        private logSkidSlide;
        private updateCurrentContactMask;
        private hasPenaltyContactMask;
        private updateCurrentBrakeDamping;
        private updateCurrentRotationDelta;
        private updateCurrentRotationBoost;
        private clearWheelRotationBoost;
        private hasBurnoutResidualState;
        private resetBurnoutFrictionForStopOrLaunch;
        private resetSkidFrictionForStopOrLaunch;
        private restoreWheelFrictionToDefault;
        private isWheelFrictionAtDefault;
        private updateSkidFrictionRecovery;
        private updateCurrentFrictionSlip;
        private armBurnoutExitSmoothing;
        private clearBurnoutExitSmoothing;
        private frontLeftContact;
        private frontRightContact;
        private rearLeftContact;
        private rearRightContact;
        private frontLeftContactTag;
        private frontRightContactTag;
        private rearLeftContactTag;
        private rearRightContactTag;
        private frontLeftContactMask;
        private frontRightContactMask;
        private rearLeftContactMask;
        private rearRightContactMask;
        private frontLeftContactPoint;
        private frontRightContactPoint;
        private rearLeftContactPoint;
        private rearRightContactPoint;
        private frontLeftContactNormal;
        private frontRightContactNormal;
        private rearLeftContactNormal;
        private rearRightContactNormal;
        private frontLeftFrictionLerping;
        private frontRightFrictionLerping;
        private rearLeftFrictionLerping;
        private rearRightFrictionLerping;
        private frontLeftFrictionPenalty;
        private frontRightFrictionPenalty;
        private rearLeftFrictionPenalty;
        private rearRightFrictionPenalty;
        private startRaycastPosition;
        private endRaycastPosition;
        private downDirection;
        private downDistance;
        getFrontLeftWheelContact(): boolean;
        getFrontRightWheelContact(): boolean;
        getRearLeftWheelContact(): boolean;
        getRearRightWheelContact(): boolean;
        getFrontLeftWheelContactTag(): string;
        getFrontRightWheelContactTag(): string;
        getRearLeftWheelContactTag(): string;
        getRearRightWheelContactTag(): string;
        getFrontLeftWheelContactPoint(): BABYLON.Vector3;
        getFrontRightWheelContactPoint(): BABYLON.Vector3;
        getRearLeftWheelContactPoint(): BABYLON.Vector3;
        getRearRightWheelContactPoint(): BABYLON.Vector3;
        getFrontLeftWheelContactNormal(): BABYLON.Vector3;
        getFrontRightWheelContactNormal(): BABYLON.Vector3;
        getRearLeftWheelContactNormal(): BABYLON.Vector3;
        getRearRightWheelContactNormal(): BABYLON.Vector3;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class VehicleCameraManager
    */
    class VehicleCameraManager extends TOOLKIT.ScriptComponent {
        enableCamera: boolean;
        followTarget: boolean;
        followHeight: number;
        pitchingAngle: number;
        rotationDamping: number;
        minimumDistance: number;
        maximumDistance: number;
        buttonCamera: number;
        keyboardCamera: number;
        tickRemoteEntities: boolean;
        fastMotionBlur: boolean;
        lowSpeedBlurring: number;
        highSpeedBlurring: number;
        motionBlurSamples: number;
        isObjectBasedBlur: boolean;
        fastCameraShake: boolean;
        lowSpeedShaking: number;
        highSpeedShaking: number;
        autoAttachCamera: boolean;
        private firstPerson;
        private cameraPivot;
        private targetEulers;
        private cameraRotation;
        private cameraPivotOffset;
        private motionBlurAttached;
        protected m_freeCamera: BABYLON.FreeCamera;
        protected m_motionBlur: BABYLON.MotionBlurPostProcess;
        protected m_cameraTransform: BABYLON.TransformNode;
        protected m_inputController: PROJECT.VehicleInputController;
        protected m_standardController: PROJECT.StandardCarController;
        protected m_firstPersonOffset: BABYLON.Vector3;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected late(): void;
        protected destroy(): void;
        protected awakeCameraManager(): void;
        protected initCameraManager(): void;
        protected lateUpdateCameraManager(): void;
        protected destroyCameraManager(): void;
        attachPlayerCamera(player: TOOLKIT.PlayerNumber): void;
        togglePlayerCamera(): void;
        firstPersonCamera(): void;
        thirdPersonCamera(): void;
    }
}
declare namespace PROJECT {
    /**
     * Babylon Script Component
     * @class VehicleInputController
     */
    interface ISteeringWheelDevice {
        deviceName: string;
        forwardButton: number;
        backwardButton: number;
        leftHandBrake: number;
        rightHandBrake: number;
        leftBurnoutBoost: number;
        rightBurnoutBoost: number;
        leftDonutBoost: number;
        rightDonutBoost: number;
    }
    class VehicleInputController extends TOOLKIT.ScriptComponent {
        private playerDeltaX;
        private playerDeltaY;
        private playerMouseX;
        private playerMouseY;
        private ackermanRadius;
        private autoturnRadius;
        private recoveryRadius;
        private waypointPosition;
        private waypointCount;
        private waypointIndex;
        private noMovementTime;
        private reverseFixMode;
        private recoveryFixMode;
        private nextTargetSpeed;
        private prevTargetSpeed;
        private vehicleResetCheck;
        private randomSkillFactor;
        private showChaseRabbit;
        private showSensorLines;
        private steeringWheelMode;
        private rabbitTrackerLine;
        private rabbitTrackerColor;
        private greenTrackingColor;
        private redTrackingColor;
        private localTargetPosition;
        private avoidPositionOffset;
        private avoidanceLerp;
        private avoidanceTimer;
        private avoidanceValue;
        private _avoidanceSteerSmoothed;
        private _debugAvoidanceCounter;
        private _frontThreatHit;
        private _frontThreatDistance;
        private _frontThreatSensor;
        private _frontThreatTag;
        private randomTurning;
        private randomBoosting;
        private randomDistance;
        private lastCheckpoint;
        private mainCenterSensorLine;
        private mainRightSensorLine;
        private mainLeftSensorLine;
        private angleRightSensorLine;
        private angleLeftSensorLine;
        private sideRightSensorLine;
        private sideLeftSensorLine;
        private backRightSensorLine;
        private backLeftSensorLine;
        private sidewaysOffsetVector;
        private backBumperEdgeVector;
        private sensorStartPos;
        private sensorPointPos;
        private sensorAnglePos;
        private rsideStartPos;
        private rsidePointPos;
        private lsideStartPos;
        private lsidePointPos;
        private tempScaleVector;
        private rbackStartPos;
        private rbackPointPos;
        private lbackStartPos;
        private lbackPointPos;
        private trackVehiclePosition;
        private trackRabbitPosition;
        getPlayerDeltaX(): number;
        getPlayerDeltaY(): number;
        getPlayerMouseX(): number;
        getPlayerMouseY(): number;
        getWaypointIndex(): number;
        getChaseRabbitMesh(): BABYLON.Mesh;
        resetChaseRabbitMesh(): void;
        getChasePointMesh(): BABYLON.Mesh;
        resetChasePointMesh(): void;
        enableInput: boolean;
        resetTiming: number;
        playerNumber: TOOLKIT.PlayerNumber;
        pedelForward: number;
        triggerForward: number;
        keyboardForawrd: number;
        auxKeyboardForawrd: number;
        pedalBackward: number;
        triggerBackwards: number;
        keyboardBackwards: number;
        auxKeyboardBackwards: number;
        pedalBooster: number;
        keyboardBooster: number;
        leftButtonBooster: number;
        rightButtonBooster: number;
        buttonHandbrake: number;
        keyboardHandbrake: number;
        leftWheelHandbrake: number;
        rightWheelHandbrake: number;
        keyboardBurnout: number;
        buttonBurnout: number;
        leftWheelBurnout: number;
        rightWheelBurnout: number;
        keyboardDonut: number;
        buttonDonut: number;
        leftWheelDonut: number;
        rightWheelDonut: number;
        raceLineNode: number;
        minLookAhead: number;
        maxLookAhead: number;
        driverSkillLevel: number;
        chaseRabbitSpeed: number;
        throttleSensitivity: number;
        steeringSensitivity: number;
        brakingSensitivity: number;
        brakingTurnAngle: number;
        brakingSpeedLimit: number;
        skiddingSpeedLimit: number;
        linearDampenForce: number;
        driveSpeedMultiplier: number;
        driveLineDistance: number;
        resetMovingTimeout: number;
        reverseThrottleTime: number;
        maxRaceTrackSpeed: number;
        trackManagerIdentity: string;
        vehicleTag: string;
        obstacleTag: string;
        sensorLength: number;
        spacerWidths: number;
        angleFactors: number;
        initialOffsetX: number;
        initialOffsetY: number;
        initialOffsetZ: number;
        sidewaysLength: number;
        sidewaysOffset: number;
        backBumperEdge: number;
        powerBoosting: number;
        wonderDistance: number;
        avoidanceFactor: number;
        avoidanceSpeed: number;
        avoidanceTimeout: number;
        avoidanceDistance: number;
        avoidanceSteeringGain: number;
        avoidanceSteeringGainHigh: number;
        avoidanceSteerSmoothing: number;
        avoidanceSteerDeadband: number;
        frontSlowdownGain: number;
        frontSlowdownMinThrottle: number;
        frontBrakeProximity: number;
        frontBrakeForce: number;
        frontHardBrakeProximity: number;
        frontHardBrakeStrength: number;
        avoidanceProximityBoost: number;
        avoidanceSteerCarryover: number;
        debugAvoidance: boolean;
        debugAvoidanceEveryNFrames: number;
        private reversingFlag;
        private reversingTime;
        private reversingWait;
        private reversingFor;
        protected m_chasePointMesh: BABYLON.Mesh;
        protected m_chaseRabbitMesh: BABYLON.Mesh;
        protected m_circuitInterfaces: PROJECT.ITrackNode[];
        protected m_circuitRaceLine_1: PROJECT.IControlPoint[];
        protected m_circuitRaceLine_2: PROJECT.IControlPoint[];
        protected m_circuitRaceLine_3: PROJECT.IControlPoint[];
        protected m_circuitRaceLine_4: PROJECT.IControlPoint[];
        protected m_circuitRaceLine_5: PROJECT.IControlPoint[];
        protected m_rigidbodyPhysics: TOOLKIT.RigidbodyPhysics;
        protected m_checkpointManager: PROJECT.CheckpointManager;
        protected m_standardCarController: PROJECT.StandardCarController;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        protected awakeVehicleController(): void;
        protected initVehicleController(): void;
        protected updateVehicleController(): void;
        protected updateManualInputDrive(): void;
        private autoDriveRaycastResult;
        protected updateAutoPilotDrive(): void;
        protected getDriverSkillFactor(): number;
        protected getCurrentTrackNode(index: number): PROJECT.ITrackNode;
        protected getCurrentControlPoint(lane: number, index: number): PROJECT.IControlPoint;
        protected getRandomNumber(min: number, max: number): number;
        protected generateRandonNumber(min: number, max: number, decimals?: number): number;
        protected destroyVehicleController(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class VehicleNetworkLabel
    */
    class VehicleNetworkLabel extends TOOLKIT.ScriptComponent {
        label: BABYLON.GUI.TextBlock;
        rect: BABYLON.GUI.Rectangle;
        autoCreate: boolean;
        offsetX: number;
        offsetY: number;
        labelColor: BABYLON.Color3;
        borderColor: BABYLON.Color3;
        backgroundColor: BABYLON.Color3;
        labelCreated: boolean;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected update(): void;
        createLabel(name: string): void;
        protected destroy(): void;
        private static AdvDynamicTexture;
        /** Get the default fullscreen user interface advanced dynamic texture */
        static GetFullscreenUI(scene: BABYLON.Scene, sampling?: number): BABYLON.GUI.AdvancedDynamicTexture;
    }
}
declare namespace PROJECT {
    /**
     * Double Sided Shader Material (BABYLON.PBRMaterial)
     * Disables backface culling so both sides of geometry are rendered.
     * Ported from Unity "Custom/DoubleSided".
     * @class DoubleSided
     */
    class DoubleSided extends TOOLKIT.CustomShaderMaterial {
        constructor(name: string, scene: BABYLON.Scene);
        awake(): void;
        update(): void;
        getShaderName(): string;
    }
}
declare namespace PROJECT {
    /**
     * Vertex Color Splat Shader Material (BABYLON.PBRMaterial)
     * Blends albedo (Splat1) with a second texture (Splat3) using vertex color blue channel.
     * Ported from Unity "Custom/Vertex Color Splat Surf Shader".
     * @class Splat
     */
    class VertexSplat extends TOOLKIT.CustomShaderMaterial {
        constructor(name: string, scene: BABYLON.Scene);
        awake(): void;
        update(): void;
        getShaderName(): string;
        getCustomVertexCode(wgsl: boolean): string;
    }
    /**
     * Vertex Color Splat Shader Plugin (BABYLON.MaterialPluginBase)
     * @class VertexSplatPlugin
     */
    class VertexSplatPlugin extends TOOLKIT.CustomShaderMaterialPlugin {
        constructor(customMaterial: TOOLKIT.CustomShaderMaterial, shaderName: string);
        isCompatible(shaderLanguage: BABYLON.ShaderLanguage): boolean;
        getCustomCode(shaderType: string, shaderLanguage: BABYLON.ShaderLanguage): any;
        /** This gets the uniforms used in the shader code */
        getUniforms(shaderLanguage: BABYLON.ShaderLanguage): any;
        /** This gets the samplers used in the shader code */
        getSamplers(samplers: string[]): void;
        /** This get the attributes used in the shader code */
        getAttributes(attributes: string[], scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        /** This prepares the shader defines */
        prepareDefines(defines: BABYLON.MaterialDefines, scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void;
        /** This is used to update the uniforms bound to a mesh */
        bindForSubMesh(uniformBuffer: BABYLON.UniformBuffer, scene: BABYLON.Scene, engine: BABYLON.AbstractEngine, subMesh: BABYLON.SubMesh): void;
    }
}
declare namespace PROJECT {
    /**
     * Babylon toolkit default camera system class
     * @class DefaultCameraSystem - All rights reserved (c) 2020 Mackey Kinard
     * https://doc.babylonjs.com/divingDeeper/postProcesses/defaultRenderingPipeline
     */
    class DefaultCameraSystem extends TOOLKIT.ScriptComponent {
        protected static PlayerOneCamera: BABYLON.FreeCamera;
        protected static PlayerTwoCamera: BABYLON.FreeCamera;
        protected static PlayerThreeCamera: BABYLON.FreeCamera;
        protected static PlayerFourCamera: BABYLON.FreeCamera;
        protected static XRExperienceHelper: BABYLON.WebXRDefaultExperience;
        private static multiPlayerView;
        private static multiPlayerCount;
        private static multiPlayerCameras;
        private static stereoCameras;
        private static startupMode;
        private static cameraReady;
        private static cameraInstance;
        private static renderingPipeline;
        private static screenSpacePipeline;
        static GetRenderingPipeline(): BABYLON.DefaultRenderingPipeline;
        static GetScreenSpacePipeline(): BABYLON.SSAORenderingPipeline;
        static IsCameraSystemReady(): boolean;
        /** Register handler that is triggered when the webxr experience helper has been created */
        static OnXRExperienceHelperObservable: BABYLON.Observable<BABYLON.WebXRDefaultExperience>;
        /** Default Follow Speed */
        static FOLLOW_SPEED: number;
        private mainCamera;
        private cameraType;
        private cameraInertia;
        private cameraController;
        private immersiveOptions;
        private arcRotateConfig;
        private multiPlayerSetup;
        private fullScreenToggle;
        private setPointerLock;
        private setCameraTarget;
        private setSpatialAudio;
        private editorPostProcessing;
        protected m_cameraRig: BABYLON.TargetCamera;
        isMainCamera(): boolean;
        getCameraType(): number;
        getTargetTransform(): BABYLON.TransformNode;
        setTargetTransform(target: BABYLON.TransformNode): void;
        enableSpatialAudio(value: boolean): void;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        protected awakeCameraSystemState(): void;
        protected startCameraSystemState(): Promise<void>;
        protected updateCameraSystemState(): void;
        protected cleanCameraSystemState(): void;
        protected destroyCameraSystemState(): void;
        /*********************************************/
        /** Follow Target Camera Controller Helpers  */
        /*********************************************/
        targetCameraOffset: BABYLON.Vector3;
        getCameraPivotPosition(): BABYLON.Vector3;
        getCameraPivotRotation(): BABYLON.Quaternion;
        getCameraBoomNode(): BABYLON.TransformNode;
        getCameraTransform(): BABYLON.TransformNode;
        private cameraNode;
        private cameraPivot;
        private cameraDistance;
        private cameraPivotOffset;
        private cameraBoomPosition;
        private dollyDirection;
        private rotationEulers;
        private scaledCamDirection;
        private scaledMaxDirection;
        private parentNodePosition;
        private maximumCameraPos;
        private cameraRaycastShape;
        private targetRotationVector;
        private resetCameraRotation;
        private updateCameraController;
        getBoomArmMaxDistance(): number;
        setBoomArmMaxDistance(distance: number): void;
        setSmoothBoomArmLength(length: number, speed: number, updateMaxDistance?: boolean): void;
        private smoothBoomArmLength;
        private smoothBoomArmSpeed;
        private updateSmoothBoomArmLength;
        static EnableTracking(value: boolean): void;
        static IsTrackingEnabled(): boolean;
        static SetAutoUpdate(value: boolean): void;
        static IsAutoUpdateEnabled(): boolean;
        static GetFollowTarget(): BABYLON.TransformNode;
        static SetFollowTarget(target: BABYLON.TransformNode): void;
        static ResetFollowTarget(): void;
        static UpdateFollowTarget(): void;
        /** Get the WebXR default experience helper */
        static GetWebXR(): BABYLON.WebXRDefaultExperience;
        /** Is universal camera system in WebXR mode */
        static IsInWebXR(): boolean;
        /** Setup navigation mesh for WebXR */
        private static SetupNavigationWebXR;
        /** Get main camera rig for the scene */
        static GetMainCamera(scene: BABYLON.Scene, detach?: boolean): BABYLON.FreeCamera;
        /** Get universal camera rig for desired player */
        static GetPlayerCamera(scene: BABYLON.Scene, player?: TOOLKIT.PlayerNumber, detach?: boolean): BABYLON.FreeCamera;
        /** Get camera transform node for desired player */
        static GetCameraTransform(scene: BABYLON.Scene, player?: TOOLKIT.PlayerNumber): BABYLON.TransformNode;
        /** Are stereo side side camera services available. */
        static IsStereoCameras(): boolean;
        /** Are local multi player view services available. */
        static IsMultiPlayerView(): boolean;
        /** Get the current local multi player count */
        static GetMultiPlayerCount(): number;
        /** Activates current local multi player cameras. */
        static ActivateMultiPlayerCameras(scene: BABYLON.Scene): boolean;
        /** Disposes current local multiplayer cameras */
        static DisposeMultiPlayerCameras(): void;
        /** Sets the multi player camera view layout */
        static SetMultiPlayerViewLayout(scene: BABYLON.Scene, totalNumPlayers: number): boolean;
    }
    /*********************************************/
    /** Camera Editor Properties Support Classes */
    /*********************************************/
    interface IEditorArcRtotate {
        alpha: number;
        beta: number;
        radius: number;
        target: TOOLKIT.IUnityVector3;
    }
    interface IEditorPostProcessing {
        usePostProcessing: boolean;
        highDynamicRange: boolean;
        screenAntiAliasing: PROJECT.IEditorAntiAliasing;
        focalDepthOfField: PROJECT.IEditorDepthOfField;
        chromaticAberration: PROJECT.IEditorChromaticAberration;
        glowLayerProperties: PROJECT.IEditorGlowLayer;
        grainEffectProperties: PROJECT.IEditorGrainEffect;
        sharpEffectProperties: PROJECT.IEditorSharpenEffect;
        bloomEffectProperties: PROJECT.IEditorBloomProcessing;
        imageProcessingConfig: PROJECT.IEditorImageProcessing;
        screenSpaceRendering: PROJECT.IEditorScreenSpace;
    }
    interface IEditorScreenSpace {
        SSAO: boolean;
        SSAORatio: number;
        combineRatio: number;
        totalStrength: number;
        radius: number;
        area: number;
        fallOff: number;
        baseValue: number;
    }
    interface IEditorAntiAliasing {
        msaaSamples: number;
        fxaaEnabled: boolean;
        fxaaScaling: boolean;
        fxaaSamples: number;
    }
    interface IEditorDepthOfField {
        depthOfField: boolean;
        blurLevel: number;
        focalStop: number;
        focalLength: number;
        focusDistance: number;
        maxLensSize: number;
    }
    interface IEditorChromaticAberration {
        aberrationEnabled: boolean;
        aberrationAmount: number;
        adaptScaleViewport: boolean;
        alphaMode: number;
        alwaysForcePOT: boolean;
        pixelPerfectMode: boolean;
        fullscreenViewport: boolean;
    }
    interface IEditorGlowLayer {
        glowEnabled: boolean;
        glowIntensity: number;
        blurKernelSize: number;
    }
    interface IEditorGrainEffect {
        grainEnabled: boolean;
        grainAnimated: boolean;
        grainIntensity: number;
        adaptScaleViewport: boolean;
    }
    interface IEditorSharpenEffect {
        sharpenEnabled: boolean;
        sharpEdgeAmount: number;
        sharpColorAmount: number;
        adaptScaleViewport: boolean;
    }
    interface IEditorBloomProcessing {
        bloomEnabled: boolean;
        bloomKernel: number;
        bloomScale: number;
        bloomWeight: number;
        bloomThreshold: number;
    }
    interface IEditorColorCurves {
        curvesEnabled: boolean;
        globalDen: number;
        globalExp: number;
        globalHue: number;
        globalSat: number;
        highlightsDen: number;
        highlightsExp: number;
        highlightsHue: number;
        highlightsSat: number;
        midtonesDen: number;
        midtonesExp: number;
        midtonesHue: number;
        midtonesSat: number;
        shadowsDen: number;
        shadowsExp: number;
        shadowsHue: number;
        shadowsSat: number;
    }
    interface IEditorImageProcessing {
        imageProcessing: boolean;
        imageContrast: number;
        imageExposure: number;
        toneMapping: boolean;
        toneMapType: number;
        vignetteEnabled: boolean;
        vignetteBlendMode: number;
        vignetteCameraFov: number;
        vignetteStretch: number;
        vignetteCentreX: number;
        vignetteCentreY: number;
        vignetteWeight: number;
        vignetteColor: TOOLKIT.IUnityColor;
        useColorGrading: boolean;
        setGradingTexture: any;
        imagingColorCurves: PROJECT.IEditorColorCurves;
    }
}
declare namespace PROJECT {
    /**
     * Babylon Script Component
     * @class DebugInformation
     */
    class DebugInformation extends TOOLKIT.ScriptComponent {
        static GetVersion(): string;
        private keys;
        private show;
        private popup;
        private views;
        private xbox;
        private color;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected destroy(): void;
        protected openFullscreen(elem: any): void;
        protected closeFullscreen(): void;
        /**
         * Ask the browser to promote the current element to fullscreen rendering mode
         * @param element defines the DOM element to promote
         */
        static _RequestFullscreen(element: HTMLElement): void;
        /**
         * Asks the browser to exit fullscreen mode
         */
        static _ExitFullscreen(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class AssetExporter
    */
    class AssetExporter extends TOOLKIT.ScriptComponent {
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected fixed(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected ready(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class AssetPreloader
    */
    class AssetPreloader extends TOOLKIT.ScriptComponent implements TOOLKIT.IAssetPreloader {
        private parentMeshes;
        private importMeshes;
        private assetContainers;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected destroy(): void;
        /** Add asset preloader tasks (https://doc.babylonjs.com/divingDeeper/importers/assetManager) */
        addPreloaderTasks(assetsManager: TOOLKIT.PreloadAssetsManager): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class NodeMaterialInstance
    */
    class NodeMaterialInstance extends TOOLKIT.ScriptComponent {
        private nodeMaterialData;
        private setCustomRootUrl;
        getMaterialInstance(): BABYLON.NodeMaterial;
        protected m_nodeMaterial: BABYLON.NodeMaterial;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class NodeMaterialParticle
    */
    class NodeMaterialParticle extends TOOLKIT.ScriptComponent {
        private nodeMaterialEditor;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected setupNodeMaterial(materialInstance: BABYLON.NodeMaterial): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected fixed(): void;
        protected ready(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class NodeMaterialProcess
    */
    class NodeMaterialProcess extends TOOLKIT.ScriptComponent {
        private nodeMaterialEditor;
        private numberOfSamples;
        private samplingMode;
        private textureType;
        private textureFormat;
        private sizeRatio;
        private resuable;
        getPostProcess(): BABYLON.PostProcess;
        protected m_postProcess: BABYLON.PostProcess;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected start(): void;
        protected setupNodeMaterial(materialInstance: BABYLON.NodeMaterial): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class NodeMaterialTexture
    */
    class NodeMaterialTexture extends TOOLKIT.ScriptComponent {
        private nodeMaterialEditor;
        private textureSize;
        getProceduralTexture(): BABYLON.ProceduralTexture;
        protected m_proceduralTexture: BABYLON.ProceduralTexture;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected start(): void;
        protected setupNodeMaterial(materialInstance: BABYLON.NodeMaterial): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class MobileInputController
    */
    class MobileInputController extends TOOLKIT.ScriptComponent {
        static get Instance(): PROJECT.MobileInputController;
        private static StaticInstance;
        private styleSheet;
        private controlType;
        private parentElement;
        private maxReadyTimeout;
        private maxMoveDistance;
        private maxMoveDeadzone;
        private uiParentElement;
        private leftBaseElement;
        private rightBaseElement;
        private buttonBaseElement;
        private leftStickStyle;
        private rightStickStyle;
        private leftStickFactor;
        private rightStickFactor;
        private invertLeftStickY;
        private centerLeftJoystick;
        private enableLeftJoystick;
        private invertRightStickY;
        private centerRightJoystick;
        private enableRightJoystick;
        private enableMouseAxes;
        private enableVirtualButtons;
        private virtualButtonControls;
        protected m_leftStick: TOOLKIT.TouchJoystickHandler;
        protected m_rightStick: TOOLKIT.TouchJoystickHandler;
        protected m_mobileDevice: boolean;
        getLeftStick(): TOOLKIT.TouchJoystickHandler;
        getRightStick(): TOOLKIT.TouchJoystickHandler;
        getLeftStickEnabled(): boolean;
        getRightStickEnabled(): boolean;
        getLeftStickElement(): HTMLDivElement;
        getRightStickElement(): HTMLDivElement;
        showLeftStickElement(show: boolean): void;
        showRightStickElement(show: boolean): void;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        protected destroy(): void;
        protected loadStyleSheet(): void;
        protected loadHtmlMarkup(): void;
        protected createHtmlElements(): void;
    }
    /**
     * Manage the joystick inputs to control a free camera.
     * @see https://doc.babylonjs.com/how_to/customizing_camera_inputs
     */
    class FreeCameraTouchJoystickInput implements BABYLON.ICameraInput<BABYLON.FreeCamera> {
        /**
         * Define the camera the input is attached to.
         */
        camera: BABYLON.FreeCamera;
        /**
         * Define the joystick controlling the input
         */
        controller: BABYLON.Nullable<PROJECT.MobileInputController>;
        /**
         * Defines the joystick rotation sensiblity.
         * This is the threshold from when rotation starts to be accounted for to prevent jittering.
         */
        joystickAngularSensibility: number;
        /**
         * Defines the joystick move sensiblity.
         * This is the threshold from when moving starts to be accounted for for to prevent jittering.
         */
        joystickMoveSensibility: number;
        /**
         * Defines the minimum value at which any analog stick input is ignored.
         * Note: This value should only be a value between 0 and 1.
         */
        deadzoneDelta: number;
        private _yAxisScale;
        /**
         * Gets or sets a boolean indicating that Yaxis (for right stick) should be inverted
         */
        get invertYAxis(): boolean;
        set invertYAxis(value: boolean);
        private LSValues;
        private RSValues;
        private _cameraTransform;
        private _deltaTransform;
        private _vector3;
        private _vector2;
        private _attached;
        /**
         * Attach the input controls to a specific dom element to get the input from.
         */
        attachControl(): void;
        /**
         * Detach the current controls from the specified dom element.
         */
        detachControl(): void;
        /**
         * Update the current camera state depending on the inputs that have been used this frame.
         * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
         */
        checkInputs(): void;
        /**
         * Gets the class name of the current input.
         * @returns the class name
         */
        getClassName(): string;
        /**
         * Get the friendly name associated with the input class.
         * @returns the input friendly name
         */
        getSimpleName(): string;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class MobileOccludeMaterial
    */
    class MobileOccludeMaterial extends TOOLKIT.ScriptComponent {
        private applyToMaterial;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class MobileShadowMaterial
    */
    class MobileShadowMaterial extends TOOLKIT.ScriptComponent {
        private createNewMaterial;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class BallSocketJoint
    */
    class BallSocketJoint extends TOOLKIT.ScriptComponent {
        bodyA: BABYLON.TransformNode;
        bodyB: BABYLON.TransformNode;
        pivotA: BABYLON.Vector3;
        pivotB: BABYLON.Vector3;
        axisA: BABYLON.Vector3;
        axisB: BABYLON.Vector3;
        constraint: BABYLON.BallAndSocketConstraint;
        collisionsEnabled: boolean;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class DistanceJoint
    */
    class DistanceJoint extends TOOLKIT.ScriptComponent {
        bodyA: BABYLON.TransformNode;
        bodyB: BABYLON.TransformNode;
        maxDistance: number;
        constraint: BABYLON.DistanceConstraint;
        collisionsEnabled: boolean;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class FixedHingeJoint
    */
    class FixedHingeJoint extends TOOLKIT.ScriptComponent {
        bodyA: BABYLON.TransformNode;
        bodyB: BABYLON.TransformNode;
        pivotA: BABYLON.Vector3;
        pivotB: BABYLON.Vector3;
        constraint: BABYLON.HingeConstraint;
        collisionsEnabled: boolean;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class LockedJoint
    */
    class LockedJoint extends TOOLKIT.ScriptComponent {
        bodyA: BABYLON.TransformNode;
        bodyB: BABYLON.TransformNode;
        pivotA: BABYLON.Vector3;
        pivotB: BABYLON.Vector3;
        axisA: BABYLON.Vector3;
        axisB: BABYLON.Vector3;
        constraint: BABYLON.LockConstraint;
        collisionsEnabled: boolean;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class PrismaticJoint
    */
    class PrismaticJoint extends TOOLKIT.ScriptComponent {
        bodyA: BABYLON.TransformNode;
        bodyB: BABYLON.TransformNode;
        pivotA: BABYLON.Vector3;
        pivotB: BABYLON.Vector3;
        axisA: BABYLON.Vector3;
        axisB: BABYLON.Vector3;
        constraint: BABYLON.PrismaticConstraint;
        collisionsEnabled: boolean;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class SixdofJoint
    */
    class SixdofJoint extends TOOLKIT.ScriptComponent {
        bodyA: BABYLON.TransformNode;
        bodyB: BABYLON.TransformNode;
        pivotA: BABYLON.Vector3;
        pivotB: BABYLON.Vector3;
        perpAxisA: BABYLON.Vector3;
        perpAxisB: BABYLON.Vector3;
        axisLimits: BABYLON.Physics6DoFLimit[];
        constraint: BABYLON.Physics6DoFConstraint;
        collisionsEnabled: boolean;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class SliderJoint
    */
    class SliderJoint extends TOOLKIT.ScriptComponent {
        bodyA: BABYLON.TransformNode;
        bodyB: BABYLON.TransformNode;
        pivotA: BABYLON.Vector3;
        pivotB: BABYLON.Vector3;
        axisA: BABYLON.Vector3;
        axisB: BABYLON.Vector3;
        constraint: BABYLON.SliderConstraint;
        collisionsEnabled: boolean;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class RemotePlayerController
    */
    class RemotePlayerController extends TOOLKIT.ScriptComponent {
        updateStateParams: boolean;
        smoothMotionTime: number;
        smoothInputVectors: boolean;
        private animationState;
        private animationStateParams;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected update(): void;
        protected destroy(): void;
        private attachAnimationController;
        private validateAnimationStateParams;
    }
}
declare namespace PROJECT {
    /**
     * Babylon toolkit standard player controller class
     * @class StandardPlayerController - All rights reserved (c) 2020 Mackey Kinard
    */
    class StandardPlayerController extends TOOLKIT.ScriptComponent {
        static MIN_VERTICAL_VELOCITY: number;
        static MIN_GROUND_DISTANCE: number;
        static MIN_MOVE_EPSILON: number;
        static MIN_TIMER_OFFSET: number;
        static MIN_SLOPE_LIMIT: number;
        static PLAYER_HEIGHT: string;
        enableInput: boolean;
        attachCamera: boolean;
        rotateCamera: boolean;
        mouseWheel: boolean;
        toggleView: boolean;
        freeLooking: boolean;
        requireSprintButton: boolean;
        gravitationalForce: number;
        minFallVelocity: number;
        verticalStepSpeed: number;
        minStepUpHeight: number;
        rigidBodyMass: number;
        airbornTimeout: number;
        maxAngle: number;
        speedFactor: number;
        rootMotion: boolean;
        moveSpeed: number;
        walkSpeed: number;
        lookSpeed: number;
        jumpSpeed: number;
        jumpDelay: number;
        eyesHeight: number;
        pivotHeight: number;
        maxDistance: number;
        scrollSpeed: number;
        topLookLimit: number;
        downLookLimit: number;
        lowTurnSpeed: number;
        highTurnSpeed: number;
        smoothDampTime: number;
        smoothInputVectors: boolean;
        smoothAcceleration: boolean;
        accelerationSpeed: number;
        decelerationSpeed: number;
        avatarSkinTag: string;
        climbVolumeTag: string;
        vaultVolumeTag: string;
        maxHeightRanges: any;
        useClimbSystem: boolean;
        distanceFactor: number;
        cameraSmoothing: number;
        cameraCollisions: boolean;
        inputMagnitude: number;
        landingEpsilon: number;
        minimumDistance: number;
        movementAllowed: boolean;
        playerInputX: number;
        playerInputZ: number;
        playerMouseX: number;
        playerMouseY: number;
        runKeyRequired: boolean;
        buttonRun: number;
        keyboardRun: number;
        buttonJump: number;
        keyboardJump: number;
        buttonCamera: number;
        keyboardCamera: number;
        postNetworkAttributes: boolean;
        playerNumber: TOOLKIT.PlayerNumber;
        boomPosition: BABYLON.Vector3;
        airbornVelocity: BABYLON.Vector3;
        movementVelocity: BABYLON.Vector3;
        targetCameraOffset: BABYLON.Vector3;
        isAnimationEnabled(): boolean;
        isRunButtonPressed(): boolean;
        isJumpButtonPressed(): boolean;
        getPlayerJumped(): boolean;
        getPlayerJumping(): boolean;
        getPlayerFalling(): boolean;
        getPlayerSliding(): boolean;
        getPlayerGrounded(): boolean;
        getFallTriggered(): boolean;
        getMovementSpeed(): number;
        getCameraBoomNode(): BABYLON.TransformNode;
        getCameraTransform(): BABYLON.TransformNode;
        getAnimationState(): TOOLKIT.AnimationState;
        getVerticalVelocity(): number;
        getCharacterController(): TOOLKIT.CharacterController;
        getPlayerLookRotation(): BABYLON.Vector3;
        getPlayerMoveDirection(): PROJECT.PlayerMoveDirection;
        getInputMovementVector(): BABYLON.Vector3;
        getInputMagnitudeValue(): number;
        getCameraPivotPosition(): BABYLON.Vector3;
        getCameraPivotRotation(): BABYLON.Quaternion;
        rayClimbOffset: number;
        rayClimbLength: number;
        getClimbContact(): boolean;
        getClimbContactNode(): BABYLON.TransformNode;
        getClimbContactPoint(): BABYLON.Vector3;
        getClimbContactAngle(): number;
        getClimbContactNormal(): BABYLON.Vector3;
        getClimbContactDistance(): number;
        canClimbObstaclePredicate: (action: number) => boolean;
        rayHeightOffset: number;
        rayHeightLength: number;
        getHeightContact(): boolean;
        getHeightContactNode(): BABYLON.TransformNode;
        getHeightContactPoint(): BABYLON.Vector3;
        getHeightContactAngle(): number;
        getHeightContactNormal(): BABYLON.Vector3;
        getHeightContactDistance(): number;
        private abstractMesh;
        private cameraDistance;
        private forwardCamera;
        private avatarRadius;
        private groundingObject;
        private groundingCallback;
        private dollyDirection;
        private cameraEulers;
        private rotationEulers;
        private cameraPivotOffset;
        private cameraForwardVector;
        private cameraRightVector;
        private desiredForwardVector;
        private desiredRightVector;
        private lastRotationQuaternion;
        private scaledCamDirection;
        private scaledMaxDirection;
        private parentNodePosition;
        private maximumCameraPos;
        private tempWorldPosition;
        private cameraRaycastShape;
        private defaultRaycastGroup;
        private defaultRaycastMask;
        private cameraRaycastMask;
        private avatarSkins;
        private cameraNode;
        private cameraPivot;
        private navigationAgent;
        private characterController;
        private verticalVelocity;
        private smoothMotionSpeed;
        private movementSpeed;
        private isRunPressed;
        private isJumpPressed;
        private isCharacterSliding;
        private isCharacterFalling;
        private isCharacterGrounded;
        private isCharacterFallTriggered;
        private isCharacterJumpFrame;
        private isCharacterJumping;
        private isCharacterLanding;
        private isCharacterRising;
        private isCharacterNavigating;
        private navigationAngularSpeed;
        private updateStateParams;
        private animationStateParams;
        private sphereCollisionShape;
        private hasGroundedContact;
        private showDebugColliders;
        private colliderVisibility;
        private colliderRenderGroup;
        private groundCheckDistance;
        private deltaTime;
        private minJumpTimer;
        private delayJumpTimer;
        private playerControl;
        private canPlayerJump;
        private animationState;
        private lastJumpVelocity;
        private inputMovementVector;
        private playerLookRotation;
        private playerRotationVector;
        private playerMovementVelocity;
        private playerRotationQuaternion;
        private playerMoveDirection;
        private forwardDirection;
        private downDirection;
        private climbContact;
        private climbContactNode;
        private climbContactAngle;
        private climbContactPoint;
        private climbContactNormal;
        private climbContactDistance;
        private climbSensorLine;
        private offsetClimbRaycastPosition;
        private startClimbRaycastPosition;
        private endClimbRaycastPosition;
        private heightContact;
        private heightContactNode;
        private heightContactAngle;
        private heightContactPoint;
        private heightContactNormal;
        private heightContactDistance;
        private heightSensorLine;
        private offsetHeightRaycastPosition;
        private startHeightRaycastPosition;
        private endHeightRaycastPosition;
        protected m_velocityOffset: BABYLON.Vector3;
        protected m_actualVelocity: BABYLON.Vector3;
        protected m_linearVelocity: BABYLON.Vector3;
        protected m_lastPosition: BABYLON.Vector3;
        protected m_positionCenter: BABYLON.Vector3;
        protected m_scaledVelocity: number;
        protected playerDrawVelocity: number;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected after(): void;
        protected update(): void;
        protected destroy(): void;
        /** Register handler that is triggered before the controller has been updated */
        onPreUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered before the controller movement has been applied */
        onBeforeMoveObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered after the controller has been updated */
        onPostUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered after player input has been updated */
        onPlayerInputObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered when player position should be updated */
        onPlayerPositionObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered after performing action has been updated */
        onUpdateActionObservable: BABYLON.Observable<BABYLON.TransformNode>;
        private _deltaMotionPosition;
        getDeltaMotionPosition(): BABYLON.Vector3;
        private _deltaMotionRotation;
        getDeltaMotionRotation(): BABYLON.Quaternion;
        private isPerformingAction;
        private isRootMotionAction;
        private isActionInterruptable;
        private afterActionHandler;
        private performActionTimer;
        private performActionNumber;
        private playerRotationSpeed;
        private rotatePlayerTowards;
        private matchStartTime;
        private matchTargetTime;
        private matchTargetOffset;
        private matchTargetHeight;
        private lockTargetHeight;
        private lastStartHeight;
        private lastTargetHeight;
        private lastTargetNormal;
        private lastTargetRotation;
        private lastDeltaPosition;
        private lastDeltaRotation;
        getIsPerformingAction(): boolean;
        getIsRootMotionAction(): boolean;
        getIsActionInterruptable(): boolean;
        playActionAnimation(action: number, interruptableAction?: boolean, enableRootMotion?: boolean, afterActionComplete?: () => void): void;
        resetActionAnimationState(): void;
        private updateAnimationActionState;
        /** Set the player world position */
        setWorldPosition(x: number, y: number, z: number): void;
        /** TODO */
        setPlayerControl(mode: PROJECT.PlayerInputControl): void;
        /** TODO */
        togglePlayerControl(): void;
        private showAvatarSkins;
        /** TODO */
        attachPlayerCamera(player: TOOLKIT.PlayerNumber): void;
        private ikLeftFootTarget;
        private ikLeftPoleTarget;
        private ikRightFootTarget;
        private ikRightPoleTarget;
        private abstractSkinMesh;
        private rootBoneTransform;
        private leftFootTransform;
        private leftFootPoleOffset;
        private leftFootMaxAngle;
        private rightFootTransform;
        private rightFootPoleOffset;
        private rightFootMaxAngle;
        private ikLeftController;
        private ikRightController;
        onAnimatorIK: () => void;
        getPlayerMesh(): BABYLON.AbstractMesh;
        getRootHipBone(): BABYLON.Bone;
        getLeftFootBone(): BABYLON.Bone;
        getRightFootBone(): BABYLON.Bone;
        getLeftFootTarget(): BABYLON.Mesh;
        getRightFootTarget(): BABYLON.Mesh;
        getLeftFootPoleTarget(): BABYLON.Mesh;
        getRightFootPoleTarget(): BABYLON.Mesh;
        getRootBoneTransform(): BABYLON.TransformNode;
        getLeftFootTransform(): BABYLON.TransformNode;
        getRightFootTransform(): BABYLON.TransformNode;
        getLeftFootController(): BABYLON.BoneIKController;
        getRightFootController(): BABYLON.BoneIKController;
        isGroundedFootIKActive(): boolean;
        setupBoneControllers(): void;
        private attachAnimationController;
        private updateAnimatorTargetMeshes;
        /** TODO */
        enableCharacterController(state: boolean): void;
        /** TODO */
        resetPlayerRotation(): void;
        /** TODO */
        resetPlayerJumpingState(): void;
        private awakePlayerController;
        private startPlayerController;
        private updatePlayerPosition;
        private updatePlayerController;
        private afterPlayerController;
        private updateCharacterController;
        private updateCameraController;
        getBoomArmMaxDistance(): number;
        setBoomArmMaxDistance(distance: number): void;
        setSmoothBoomArmLength(length: number, speed: number, updateMaxDistance?: boolean): void;
        private smoothBoomArmLength;
        private smoothBoomArmSpeed;
        private updateSmoothBoomArmLength;
        private castPhysicsClimbingVolumeRay;
        private castPhysicsHeightCheckVolumeRay;
        private getCheckedVerticalVelocity;
        private destroyPlayerController;
        private validateAnimationStateParams;
    }
    /**
    * Babylon Interface Definition
    * @interface AnimationStateParams
    */
    interface AnimationStateParams {
        moveDirection: string;
        inputMagnitude: string;
        horizontalInput: string;
        verticalInput: string;
        mouseXInput: string;
        mouseYInput: string;
        heightInput: string;
        speedInput: string;
        jumpFrame: string;
        jumpState: string;
        actionState: string;
        fallingState: string;
        slidingState: string;
        groundedState: string;
    }
    /**
    * Babylon Enum Definition
    * @interface PlayerInputControl
    */
    enum PlayerInputControl {
        FirstPersonStrafing = 0,
        ThirdPersonStrafing = 1
    }
    /**
    * Babylon Enum Definition
    * @interface PlayerMoveDirection
    */
    enum PlayerMoveDirection {
        Stationary = 0,
        Forward = 1,
        ForwardLeft = 2,
        ForwardRight = 3,
        Backward = 4,
        BackwardLeft = 5,
        BackwardRight = 6,
        StrafingLeft = 7,
        StrafingRight = 8
    }
    /**
    * Babylon Enum Definition
    * @interface ActionAnimationType
    */
    enum ActionAnimationType {
        Neutral = 0,
        StepUp = 1,
        JumpUp = 2,
        ClimbUp = 3,
        VaultOver = 4
    }
}
declare namespace PROJECT {
    /**
     * Babylon toolkit third person player controller class
     * @class ThirdPersonPlayerController - All rights reserved (c) 2020 Mackey Kinard
    */
    class ThirdPersonPlayerController extends TOOLKIT.ScriptComponent {
        static MIN_VERTICAL_VELOCITY: number;
        static MIN_GROUND_DISTANCE: number;
        static MIN_MOVE_EPSILON: number;
        static MIN_TIMER_OFFSET: number;
        static MIN_SLOPE_LIMIT: number;
        static PLAYER_HEIGHT: string;
        enableInput: boolean;
        attachCamera: boolean;
        mouseWheel: boolean;
        requireSprintButton: boolean;
        gravitationalForce: number;
        minFallVelocity: number;
        verticalStepSpeed: number;
        minStepUpHeight: number;
        rigidBodyMass: number;
        airbornTimeout: number;
        maxAngle: number;
        speedFactor: number;
        rootMotion: boolean;
        moveSpeed: number;
        walkSpeed: number;
        jumpSpeed: number;
        jumpDelay: number;
        lowTurnSpeed: number;
        highTurnSpeed: number;
        smoothDampTime: number;
        smoothInputVectors: boolean;
        smoothAcceleration: boolean;
        accelerationSpeed: number;
        decelerationSpeed: number;
        climbVolumeTag: string;
        vaultVolumeTag: string;
        maxHeightRanges: any;
        useClimbSystem: boolean;
        distanceFactor: number;
        inputMagnitude: number;
        landingEpsilon: number;
        minimumDistance: number;
        movementAllowed: boolean;
        playerInputX: number;
        playerInputZ: number;
        playerMouseX: number;
        playerMouseY: number;
        runKeyRequired: boolean;
        buttonRun: number;
        keyboardRun: number;
        buttonJump: number;
        keyboardJump: number;
        buttonCamera: number;
        keyboardCamera: number;
        postNetworkAttributes: boolean;
        playerNumber: TOOLKIT.PlayerNumber;
        airbornVelocity: BABYLON.Vector3;
        movementVelocity: BABYLON.Vector3;
        isAnimationEnabled(): boolean;
        isRunButtonPressed(): boolean;
        isJumpButtonPressed(): boolean;
        getPlayerJumped(): boolean;
        getPlayerJumping(): boolean;
        getPlayerFalling(): boolean;
        getPlayerSliding(): boolean;
        getPlayerGrounded(): boolean;
        getFallTriggered(): boolean;
        getMovementSpeed(): number;
        getAnimationState(): TOOLKIT.AnimationState;
        getVerticalVelocity(): number;
        getCharacterController(): TOOLKIT.CharacterController;
        getPlayerLookRotation(): BABYLON.Vector3;
        getPlayerMoveDirection(): PROJECT.PlayerMoveDirection;
        getInputMovementVector(): BABYLON.Vector3;
        getInputMagnitudeValue(): number;
        rayClimbOffset: number;
        rayClimbLength: number;
        getClimbContact(): boolean;
        getClimbContactNode(): BABYLON.TransformNode;
        getClimbContactPoint(): BABYLON.Vector3;
        getClimbContactAngle(): number;
        getClimbContactNormal(): BABYLON.Vector3;
        getClimbContactDistance(): number;
        canClimbObstaclePredicate: (action: number) => boolean;
        rayHeightOffset: number;
        rayHeightLength: number;
        getHeightContact(): boolean;
        getHeightContactNode(): BABYLON.TransformNode;
        getHeightContactPoint(): BABYLON.Vector3;
        getHeightContactAngle(): number;
        getHeightContactNormal(): BABYLON.Vector3;
        getHeightContactDistance(): number;
        private freeCamera;
        private cameraForwardVector;
        private cameraRightVector;
        private desiredForwardVector;
        private desiredRightVector;
        private lastRotationQuaternion;
        private avatarSkins;
        private avatarRadius;
        private navigationAgent;
        private characterController;
        private verticalVelocity;
        private smoothMotionSpeed;
        private movementSpeed;
        private isRunPressed;
        private isJumpPressed;
        private isCharacterSliding;
        private isCharacterFalling;
        private isCharacterGrounded;
        private isCharacterFallTriggered;
        private isCharacterJumpFrame;
        private isCharacterJumping;
        private isCharacterRising;
        private isCharacterLanding;
        private isCharacterNavigating;
        private navigationAngularSpeed;
        private updateStateParams;
        private animationStateParams;
        private sphereCollisionShape;
        private hasGroundedContact;
        private showDebugColliders;
        private colliderVisibility;
        private colliderRenderGroup;
        private groundCheckDistance;
        private deltaTime;
        private delayJumpTimer;
        private canPlayerJump;
        private animationState;
        private lastJumpVelocity;
        private inputMovementVector;
        private playerLookRotation;
        private playerMovementVelocity;
        private playerRotationQuaternion;
        private playerMoveDirection;
        private forwardDirection;
        private downDirection;
        private climbContact;
        private climbContactNode;
        private climbContactAngle;
        private climbContactPoint;
        private climbContactNormal;
        private climbContactDistance;
        private climbSensorLine;
        private offsetClimbRaycastPosition;
        private startClimbRaycastPosition;
        private endClimbRaycastPosition;
        private heightContact;
        private heightContactNode;
        private heightContactAngle;
        private heightContactPoint;
        private heightContactNormal;
        private heightContactDistance;
        private heightSensorLine;
        private offsetHeightRaycastPosition;
        private startHeightRaycastPosition;
        private endHeightRaycastPosition;
        protected m_velocityOffset: BABYLON.Vector3;
        protected m_actualVelocity: BABYLON.Vector3;
        protected m_linearVelocity: BABYLON.Vector3;
        protected m_lastPosition: BABYLON.Vector3;
        protected m_positionCenter: BABYLON.Vector3;
        protected m_scaledVelocity: number;
        protected playerDrawVelocity: number;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected after(): void;
        protected update(): void;
        protected destroy(): void;
        /** Character controller position
         * @deprecated Moved to default camera controller
         * @see PROJECT.DefaultCameraSystem
         */
        boomPosition: BABYLON.Vector3;
        /** Register handler that is triggered before the controller has been updated */
        onPreUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered before the controller movement has been applied */
        onBeforeMoveObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered after the controller has been updated */
        onPostUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered after player input has been updated */
        onPlayerInputObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered when player position should be updated */
        onPlayerPositionObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered after performing action has been updated */
        onUpdateActionObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered after animation state has been updated */
        onAnimationStateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        private _deltaMotionPosition;
        getDeltaMotionPosition(): BABYLON.Vector3;
        private _deltaMotionRotation;
        getDeltaMotionRotation(): BABYLON.Quaternion;
        private isPerformingAction;
        private isRootMotionAction;
        private isActionInterruptable;
        private afterActionHandler;
        private performActionTimer;
        private performActionNumber;
        private playerRotationSpeed;
        private rotatePlayerTowards;
        private matchStartTime;
        private matchTargetTime;
        private matchTargetOffset;
        private matchTargetHeight;
        private lockTargetHeight;
        private lastStartHeight;
        private lastTargetHeight;
        private lastTargetNormal;
        private lastTargetRotation;
        private lastDeltaPosition;
        private lastDeltaRotation;
        getIsPerformingAction(): boolean;
        getIsRootMotionAction(): boolean;
        getIsActionInterruptable(): boolean;
        playActionAnimation(action: number, interruptableAction?: boolean, enableRootMotion?: boolean, afterActionComplete?: () => void): void;
        resetActionAnimationState(): void;
        private updateAnimationActionState;
        /** Set the player world position */
        setWorldPosition(x: number, y: number, z: number): void;
        private ikLeftFootTarget;
        private ikLeftPoleTarget;
        private ikRightFootTarget;
        private ikRightPoleTarget;
        private abstractSkinMesh;
        private rootBoneTransform;
        private leftFootTransform;
        private leftFootPoleOffset;
        private leftFootMaxAngle;
        private rightFootTransform;
        private rightFootPoleOffset;
        private rightFootMaxAngle;
        private ikLeftController;
        private ikRightController;
        onAnimatorIK: () => void;
        getPlayerMesh(): BABYLON.AbstractMesh;
        getRootHipBone(): BABYLON.Bone;
        getLeftFootBone(): BABYLON.Bone;
        getRightFootBone(): BABYLON.Bone;
        getLeftFootTarget(): BABYLON.Mesh;
        getRightFootTarget(): BABYLON.Mesh;
        getLeftFootPoleTarget(): BABYLON.Mesh;
        getRightFootPoleTarget(): BABYLON.Mesh;
        getRootBoneTransform(): BABYLON.TransformNode;
        getLeftFootTransform(): BABYLON.TransformNode;
        getRightFootTransform(): BABYLON.TransformNode;
        getLeftFootController(): BABYLON.BoneIKController;
        getRightFootController(): BABYLON.BoneIKController;
        isGroundedFootIKActive(): boolean;
        setupBoneControllers(): void;
        private attachAnimationController;
        private updateAnimatorTargetMeshes;
        /** TODO */
        enableCharacterController(state: boolean): void;
        /** TODO */
        resetPlayerJumpingState(): void;
        private awakePlayerController;
        private startPlayerController;
        private updatePlayerPosition;
        private updatePlayerController;
        private afterPlayerController;
        private updateCharacterController;
        private castPhysicsClimbingVolumeRay;
        private castPhysicsHeightCheckVolumeRay;
        private getCheckedVerticalVelocity;
        private destroyPlayerController;
        private validateAnimationStateParams;
    }
    /**
    * Babylon Enum Definition
    * @interface ThirdPersonControl
    */
    enum ThirdPersonControl {
        ThirdPersonTurning = 0,
        ThirdPersonForward = 1
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class FxParticleSystem
    */
    class FxParticleSystem extends TOOLKIT.ScriptComponent {
        getParticleEmitter(): BABYLON.AbstractMesh;
        getParticleSystem(): BABYLON.ParticleSystem | BABYLON.GPUParticleSystem;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected m_particleEmitter: BABYLON.AbstractMesh;
        protected m_particleSystem: BABYLON.ParticleSystem | BABYLON.GPUParticleSystem;
        protected awake(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
     * Babylon water material system pro class (Babylon Water Material)
     * @class SkyMaterialSystem - All rights reserved (c) 2020 Mackey Kinard
     */
    class SkyMaterialSystem extends TOOLKIT.ScriptComponent {
        private skyfog;
        private skysize;
        private probesize;
        private reflections;
        private reflectlevel;
        private skytintcolor;
        getSkyboxMesh(): BABYLON.AbstractMesh;
        getSkyMaterial(): BABYLON.SkyMaterial;
        getReflectionProbe(): BABYLON.ReflectionProbe;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected destroy(): void;
        protected m_skyboxMesh: BABYLON.Mesh;
        protected m_skyMaterial: BABYLON.SkyMaterial;
        protected m_reflectProbe: BABYLON.ReflectionProbe;
        protected awakeSkyboxMaterial(): void;
        protected destroySkyboxMaterial(): void;
        /** Set Skybox Mesh tint color. (Box Mesh Vertex Colors) */
        setSkyboxTintColor(color: BABYLON.Color3): void;
    }
}
declare namespace PROJECT {
    /**
     * Babylon water system (Colyseus Universal Game Room)
     * @class WaterMaterialSystem - All rights reserved (c) 2020 Mackey Kinard
     */
    class WaterMaterialSystem extends TOOLKIT.ScriptComponent {
        private waterTag;
        private targetSize;
        private renderSize;
        private depthFactor;
        private reflectSkybox;
        private subDivisions;
        private heightOffset;
        private windDirection;
        private windForce;
        private waveSpeed;
        private waveLength;
        private waveHeight;
        private bumpHeight;
        private bumpSuperimpose;
        private bumpAffectsReflection;
        private waterColor;
        private colorBlendFactor;
        private waterColor2;
        private colorBlendFactor2;
        private disableClipPlane;
        private fresnelSeparate;
        getWaterGeometry(): BABYLON.AbstractMesh;
        getWaterMaterial(): BABYLON.WaterMaterial;
        protected m_waterGeometry: BABYLON.AbstractMesh;
        protected m_waterMaterial: BABYLON.WaterMaterial;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class SnapshotManager
    */
    class SnapshotManager extends TOOLKIT.ScriptComponent {
        /** Is Snapshot Rendering Currently Enabled */
        static IsSnapshotRenderingEnabled(): boolean;
        /**
         * Enable snapshot rendering
         * Use this method instead of engine.snapshotRendering=true, to make sure everything is ready before enabling snapshot rendering.
         * Note that this method is ref-counted and works in pair with disableSnapshotRendering(): you should call enableSnapshotRendering() as many times as you call disableSnapshotRendering().
         */
        static EnableSnapshotRendering(): void;
        /**
         * Disable snapshot rendering
         * Note that this method is ref-counted and works in pair with disableSnapshotRendering(): you should call enableSnapshotRendering() as many times as you call disableSnapshotRendering().
         */
        static DisableSnapshotRendering(): void;
        /**
         * Reset the snapshot helper and the list of meshes to render snapshots for.
         * @param scene The scene to reset the snapshot helper for.
         */
        static ResetSnapshotHelper(scene: BABYLON.Scene): void;
        /**
         * Get the snapshot helper.
         * @returns The snapshot helper.
         */
        static GetSnapshotHelper(): BABYLON.SnapshotRenderingHelper;
        private static _HelperEnabled;
        private static _SnapshotHelper;
        private autoStart;
        private autoUpdate;
        private delayTimeout;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        protected destroy(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class SnapshotRenderer
    */
    class SnapshotRenderer extends TOOLKIT.ScriptComponent {
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected start(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class DefaultMuteButton
    */
    class DefaultMuteButton extends TOOLKIT.ScriptComponent {
        private static audioSystemInitialized;
        static IsAudioSystemInitialized(): boolean;
        private buttonIdentifier;
        private buttonClassname;
        private buttonContainer;
        private buttonElement;
        private muteIconElement;
        private mutedIconElement;
        private muteButtonState;
        private mutedIconUrl;
        private muteIconUrl;
        private toggleEffects;
        private autoPlayList;
        private audioSources;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected createMuteButton(): void;
        protected handleButtonClick(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class SceneSoundSystem
    */
    class SceneSoundSystem extends TOOLKIT.ScriptComponent {
        private static _MUSIC;
        static get MUSIC(): PROJECT.SoundManager;
        private static _SFX;
        static get SFX(): PROJECT.SoundManager;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected start(): void;
    }
}
declare namespace PROJECT {
    /**
    * Babylon Script Component
    * @class SoundManager
    */
    class SoundManager extends TOOLKIT.ScriptComponent {
        private groupName;
        private cachedVolume;
        private volumeProperty;
        getGroupName(): string;
        protected m_soundMap: Map<string, TOOLKIT.AudioSource>;
        protected m_soundList: TOOLKIT.AudioSource[];
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        /**
         * Is the sound track currently playing
         * @param name The name of the sound track to check is playing
         */
        isPlaying(name: string): boolean;
        /**
         * Is the sound track currently paused
         * @param name The name of the sound track to check is paused
         */
        isPaused(name: string): boolean;
        /**
         * Play the sound track by name
         * @param name The name of the sound track to play
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         * @param offset (optional) Start the sound at a specific time in seconds
         * @param length (optional) Sound duration (in seconds)
         */
        playTrack(name: string, time?: number, offset?: number, length?: number): Promise<boolean>;
        /**
         * Pause the sound track by name
         * @param name The name of the sound track to play
         */
        pauseTrack(name: string): boolean;
        /**
         * Pause the sound for all tracks in the group
         */
        pauseAllTracks(): void;
        /**
         * Stop the sound track by name
         * @param name The name of the sound track to play
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        stopTrack(name: string, time?: number): boolean;
        /**
         * Stop the sound for all tracks in the group
         * @param time (optional) Stop the sound after X seconds. Stop immediately (0) by default.
         */
        stopAllTracks(time?: number): void;
        /**
         * Mute the sound track by name
         * @param name The name of the sound track to play
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        muteTrack(name: string, time?: number): boolean;
        /**
         * Unmute the sound track by name
         * @param name The name of the sound track to play
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        unmuteTrack(name: string, time?: number): boolean;
        /**
         * Mutes the volume for all sound tracks in the group
         * @param time Define time for gradual change to new volume
         */
        muteAllTracks(time?: number): void;
        /**
         * Unmutes the volume for all sound tracks in the group
         * @param time Define time for gradual change to new volume
         */
        unmuteAllTracks(time?: number): void;
        /**
         * Sets the volume for all sound tracks in the group
         * @param volume Define the new volume of the sound
         * @param time Define time for gradual change to new volume
         */
        setGroupVolume(volume: number, time?: number): void;
        /**
         * Get a sound source by name
         * @param name The name of the sound track to play
         */
        getAudioSource(name: string): TOOLKIT.AudioSource;
    }
}
declare namespace TOOLKIT {
    /**
     * Babylon windows platform pro class
     * @class WindowsPlatform - All rights reserved (c) 2020 Mackey Kinard
     */
    class WindowsPlatform {
        /** Is xbox live user signed in if platform services enabled. (WinRT) */
        static IsXboxLiveUserSignedIn(systemUser?: Windows.System.User, player?: TOOLKIT.PlayerNumber): boolean;
        /** Validated sign in xbox live user if platform services available. (WinRT) */
        static XboxLiveUserSignIn(player?: TOOLKIT.PlayerNumber, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): void;
        /** Silent sign in xbox live user if platform services available. (WinRT) */
        static XboxLiveUserSilentSignIn(player?: TOOLKIT.PlayerNumber, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void>;
        /** Dialog sign in xbox live user if platform services available. (WinRT) */
        static XboxLiveUserDialogSignIn(player?: TOOLKIT.PlayerNumber, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void>;
        /** Loads a xbox live user profile if platform services available. (WinRT) */
        static LoadXboxLiveUserProfile(player?: TOOLKIT.PlayerNumber, oncomplete?: (result: Microsoft.Xbox.Services.Social.XboxUserProfile) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void>;
        /** Get xbox live user if platform services available. (WinRT) */
        static GetXboxLiveUser(player?: TOOLKIT.PlayerNumber): Microsoft.Xbox.Services.System.XboxLiveUser;
        /** Get xbox live user if platform services available. (WinRT) */
        static GetXboxLiveSystemUser(systemUser: Windows.System.User, player?: TOOLKIT.PlayerNumber): Microsoft.Xbox.Services.System.XboxLiveUser;
        /** Get xbox live user context if platform services available. (WinRT) */
        static GetXboxLiveUserContext(player?: TOOLKIT.PlayerNumber): Microsoft.Xbox.Services.XboxLiveContext;
        /** Resets xbox live user context if platform services available. (WinRT) */
        static ResetXboxLiveUserContext(player?: TOOLKIT.PlayerNumber): void;
        /** Get xbox live context property if platform services available. (WinRT) */
        static GetXboxLiveContextProperty(name: any): any;
        /** Get xbox live context property if platform services available. (WinRT) */
        static SetXboxLiveContextProperty(name: any, property: any): void;
        /** Resets xbox live property context bag if platform services available. (WinRT) */
        static ResetXboxLivePropertyContexts(): void;
        /** Sets the Xbox User Sign Out Complete Handler (WinRT) */
        static SetXboxLiveSignOutHandler(handler?: (result: Microsoft.Xbox.Services.System.SignOutCompletedEventArgs) => void): void;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    interface KeymapState {
        result: boolean | number;
        pressTime: number;
        releaseTime: number;
    }
    enum DragDirection {
        None = 0,
        Up = 1,
        Down = 2,
        Right = 3,
        Left = 4
    }
    enum PinchZoomState {
        None = 0,
        ZoomIn = 1,
        ZoomOut = 2
    }
    enum MouseButtonMode {
        Pan = 0,
        Look = 1,
        Move = 2
    }
    enum TouchMouseButton {
        Any = -1,
        Left = 0,
        Right = 1
    }
    class InputController {
        static MOUSE_DAMPENER: number;
        static TAP_THRESHOLD_MS: number;
        /** Global gamepad manager */
        static GamepadManager: BABYLON.GamepadManager;
        /** Global gamepad connect event handler */
        static GamepadConnected: (pad: BABYLON.Gamepad, state: BABYLON.EventState) => void;
        /** Global gamepad disconnect event handler */
        static GamepadDisconnected: (pad: BABYLON.Gamepad, state: BABYLON.EventState) => void;
        /** Get the value of all mouse buttons down. */
        static GetMouseButtonsDown(): number;
        /** Get the value of the left button down. */
        static GetLeftButtonDown(): boolean;
        /** Get the value of the left button down. */
        static GetMiddleButtonDown(): boolean;
        /** Get the value of the left button down. */
        static GetRightButtonDown(): boolean;
        /** Get the target of mouse button down event. */
        static GetMouseDownTarget(): any;
        /** Get the target of mouse button drag event. */
        static GetMouseDragTarget(): any;
        /** Get the value of the pinch zoom state. */
        static GetPinchZoomState(): TOOLKIT.PinchZoomState;
        /** Are mobile input controls allowed */
        static AllowMobileControls: boolean;
        /** Are mobile input controls currently active */
        static MobileControlsActive: boolean;
        /** Is mobile pinch zoom tracking enabled */
        static EnablePinchZoomTracking: boolean;
        /** Enable user input state in the scene. */
        static EnableUserInput(engine: BABYLON.AbstractEngine, scene: BABYLON.Scene, options?: {
            contextMenu?: boolean;
            pointerLock?: boolean;
            preventDefault?: boolean;
            useCapture?: boolean;
        }): void;
        /** Configure user input state in the scene. */
        static ConfigureUserInput(engine: BABYLON.AbstractEngine, scene: BABYLON.Scene, options?: {
            contextMenu?: boolean;
            pointerLock?: boolean;
            preventDefault?: boolean;
            useCapture?: boolean;
        }): void;
        static SetLeftJoystickBuffer(leftStickX: number, leftStickY: number, invertY?: boolean): void;
        static SetRightJoystickBuffer(rightStickX: number, rightStickY: number, invertY?: boolean): void;
        /** Disables user input state in the scene. */
        static DisableUserInput(scene: BABYLON.Scene, useCapture?: boolean): void;
        /** Locks user pointer state in the scene. */
        static LockMousePointer(scene: BABYLON.Scene, lock: boolean): void;
        private static LastMousePosition;
        private static PointerLockedFlag;
        static IsPointerLocked(): boolean;
        private static LockMousePointerObserver;
        static IsPointerLockHandled(): boolean;
        /** Get user input state from the scene. */
        static GetUserInput(input: TOOLKIT.UserInputAxis, player?: TOOLKIT.PlayerNumber): number;
        /** Set a keyboard up event handler. */
        static OnKeyboardUp(callback: (keycode: number) => void): void;
        /** Set a keyboard down event handler. */
        static OnKeyboardDown(callback: (keycode: number) => void): void;
        /** Set a keyboard press event handler. */
        static OnKeyboardPress(keycode: number, callback: () => void): void;
        /** Get the specified keyboard input by keycode. */
        static GetKeyboardInput(keycode: number): boolean;
        /** Is the specified keyboard button held down. */
        static IsKeyboardButtonHeld(keycode: number): boolean;
        /** Was the specified keyboard button tapped. */
        static WasKeyboardButtonTapped(keycode: number, reset?: boolean): boolean;
        /** Reset the specified keyboard button tapped state. */
        static ResetKeyboardButtonTapped(keycode: number): void;
        /** Set a pointer up event handler. */
        static OnPointerUp(callback: (button: number) => void): void;
        /** Set a pointer down event handler. */
        static OnPointerDown(callback: (button: number) => void): void;
        /** Set a pointer press event handler. */
        static OnPointerPress(button: number, callback: () => void): void;
        /** Get the specified pointer input by button. */
        static GetPointerInput(button: number): boolean;
        /** Is the specified pointer button held down. */
        static IsPointerButtonHeld(button: number): boolean;
        /** Was the specified pointer button tapped. */
        static WasPointerButtonTapped(number: number, reset?: boolean): boolean;
        /** Reset the specified pointer button tapped state. */
        static ResetPointerButtonTapped(button: number): void;
        /** Gets the specified pointer drag direction. */
        static GetPointerDragDirection(mousex: number, mousey: number, buttondown: boolean): TOOLKIT.DragDirection;
        /** Resets ths pinch zoom event tracking. */
        static ResetPinchZoomTracking(): void;
        /**
         * Standard mode returns the current mouse position in pixels using top-left origin coordinates.
         * Bottom up mode returns the current mouse position in pixels using Unity-style coordinates where (0,0) is the bottom-left of the rendering canvas.
         * Z is always returned as 0 to match Unity's Input.mousePosition Vector3.
         */
        static GetMousePosition(scene: BABYLON.Scene, bottomUp?: boolean): BABYLON.Vector3;
        /** Is the mouse wheel scrollng this frame. */
        static IsWheelScrolling(): boolean;
        /** Set on gamepad button up event handler. */
        static OnGamepadButtonUp(callback: (button: number) => void, player?: TOOLKIT.PlayerNumber): void;
        /** Set on gamepad button down event handler. */
        static OnGamepadButtonDown(callback: (button: number) => void, player?: TOOLKIT.PlayerNumber): void;
        /** Set on gamepad button press event handler. */
        static OnGamepadButtonPress(button: number, callback: () => void, player?: TOOLKIT.PlayerNumber): void;
        /** Get the specified gamepad input by button. */
        static GetGamepadButtonInput(button: number, player?: TOOLKIT.PlayerNumber): boolean;
        /** Is the specified gamepad button held. */
        static IsGamepadButtonHeld(button: number, player?: TOOLKIT.PlayerNumber): boolean;
        /** Is the specified gamepad button tapped. */
        static IsGamepadButtonTapped(button: number, player?: TOOLKIT.PlayerNumber): boolean;
        /** Reset the specified gamepad button tapped state. */
        static ResetGamepadButtonTapped(button: number, player?: TOOLKIT.PlayerNumber): void;
        /** Set on gamepad direction pad up event handler. */
        static OnGamepadDirectionUp(callback: (direction: number) => void, player?: TOOLKIT.PlayerNumber): void;
        /** Set on gamepad direction pad down event handler. */
        static OnGamepadDirectionDown(callback: (direction: number) => void, player?: TOOLKIT.PlayerNumber): void;
        /** Set on gamepad direction pad press event handler. */
        static OnGamepadDirectionPress(direction: number, callback: () => void, player?: TOOLKIT.PlayerNumber): void;
        /** Get the specified gamepad direction input by number. */
        static GetGamepadDirectionInput(direction: number, player?: TOOLKIT.PlayerNumber): boolean;
        /** Is the specified gamepad direction input held. */
        static IsGamepadDirectionHeld(direction: number, player?: TOOLKIT.PlayerNumber): boolean;
        /** Is the specified gamepad direction input tapped. */
        static IsGamepadDirectionTapped(direction: number, player?: TOOLKIT.PlayerNumber): boolean;
        /** Reset the specified gamepad direction tapped state. */
        static ResetGamepadDirectionTapped(direction: number, player?: TOOLKIT.PlayerNumber): void;
        /** Set on gamepad trigger left event handler. */
        static OnGamepadTriggerLeft(callback: (value: number) => void, player?: TOOLKIT.PlayerNumber): void;
        /** Set on gamepad trigger right event handler. */
        static OnGamepadTriggerRight(callback: (value: number) => void, player?: TOOLKIT.PlayerNumber): void;
        /** Get the specified gamepad trigger input by number. */
        static GetGamepadTriggerInput(trigger: number, player?: TOOLKIT.PlayerNumber): number;
        /** Is the specified gamepad trigger input held. */
        static IsGamepadTriggerHeld(trigger: number, player?: TOOLKIT.PlayerNumber): boolean;
        /** Is the specified gamepad trigger input tapped. */
        static IsGamepadTriggerTapped(trigger: number, player?: TOOLKIT.PlayerNumber): boolean;
        /** Reset the specified gamepad trigger tapped state. */
        static ResetGamepadTriggerTapped(trigger: number, player?: TOOLKIT.PlayerNumber): void;
        /** Get the specified gamepad type. */
        static GetGamepadType(player?: TOOLKIT.PlayerNumber): TOOLKIT.GamepadType;
        /** Get the specified gamepad. */
        static GetGamepad(player?: TOOLKIT.PlayerNumber): BABYLON.Gamepad;
        /** Process the specified input key down request */
        static InputKeyDownHandler(keyCode: number, event?: MouseEvent | TouchEvent | PointerEvent | KeyboardEvent): any;
        /** Process the specified input key down request */
        static InputKeyUpHandler(keyCode: number, event?: MouseEvent | TouchEvent | PointerEvent | KeyboardEvent): any;
        private static _registeredUpdateScenes;
        private static input;
        private static keymap;
        private static scroll;
        private static wheel;
        private static mousex;
        private static mousey;
        private static vertical;
        private static horizontal;
        private static mousex2;
        private static mousey2;
        private static vertical2;
        private static horizontal2;
        private static mousex3;
        private static mousey3;
        private static vertical3;
        private static horizontal3;
        private static mousex4;
        private static mousey4;
        private static vertical4;
        private static horizontal4;
        private static a_mousex;
        private static x_scroll;
        private static x_wheel;
        private static x_mousex;
        private static x_mousey;
        private static x_vertical;
        private static x_horizontal;
        private static k_mousex;
        private static k_mousey;
        private static k_vertical;
        private static k_horizontal;
        private static j_mousex;
        private static j_mousey;
        private static j_vertical;
        private static j_horizontal;
        private static g_mousex1;
        private static g_mousey1;
        private static g_vertical1;
        private static g_horizontal1;
        private static g_mousex2;
        private static g_mousey2;
        private static g_vertical2;
        private static g_horizontal2;
        private static g_mousex3;
        private static g_mousey3;
        private static g_vertical3;
        private static g_horizontal3;
        private static g_mousex4;
        private static g_mousey4;
        private static g_vertical4;
        private static g_horizontal4;
        private static dragDirection;
        private static pinchZoomState;
        private static pinchZoomEvents;
        private static pinchZoomDistance;
        private static mouseDownTarget;
        private static mouseDragTarget;
        private static leftButtonDown;
        private static middleButtonDown;
        private static rightButtonDown;
        private static mouseButtonsDown;
        private static mouseButtonPress;
        private static mouseButtonDown;
        private static mouseButtonUp;
        private static keyButtonPress;
        private static keyButtonDown;
        private static keyButtonUp;
        private static previousPosition;
        private static preventDefault;
        private static lastClientX;
        private static lastClientY;
        private static virtualClientX;
        private static virtualClientY;
        private static rightHanded;
        private static gamepad1;
        private static gamepad1Type;
        private static gamepad1ButtonPress;
        private static gamepad1ButtonDown;
        private static gamepad1ButtonUp;
        private static gamepad1DpadPress;
        private static gamepad1DpadDown;
        private static gamepad1DpadUp;
        private static gamepad1LeftTrigger;
        private static gamepad1RightTrigger;
        private static gamepad2;
        private static gamepad2Type;
        private static gamepad2ButtonPress;
        private static gamepad2ButtonDown;
        private static gamepad2ButtonUp;
        private static gamepad2DpadPress;
        private static gamepad2DpadDown;
        private static gamepad2DpadUp;
        private static gamepad2LeftTrigger;
        private static gamepad2RightTrigger;
        private static gamepad3;
        private static gamepad3Type;
        private static gamepad3ButtonPress;
        private static gamepad3ButtonDown;
        private static gamepad3ButtonUp;
        private static gamepad3DpadPress;
        private static gamepad3DpadDown;
        private static gamepad3DpadUp;
        private static gamepad3LeftTrigger;
        private static gamepad3RightTrigger;
        private static gamepad4;
        private static gamepad4Type;
        private static gamepad4ButtonPress;
        private static gamepad4ButtonDown;
        private static gamepad4ButtonUp;
        private static gamepad4DpadPress;
        private static gamepad4DpadDown;
        private static gamepad4DpadUp;
        private static gamepad4LeftTrigger;
        private static gamepad4RightTrigger;
        private static tickKeyboardInput;
        private static updateUserInput;
        private static resetUserInput;
        private static resetKeyMapHandler;
        private static getPinchZoomDistance;
        private static cachePinchZoomPointer;
        private static removePinchZoomPointer;
        private static processPinchZoomTracking;
        private static inputKeyDownHandler;
        private static inputKeyUpHandler;
        private static inputPointerWheelHandler;
        private static inputPointerDownHandler;
        private static inputPointerUpHandler;
        private static inputPointerMoveHandler;
        private static inputOneButtonDownHandler;
        private static inputOneButtonUpHandler;
        private static inputOneXboxDPadDownHandler;
        private static inputOneShockDPadDownHandler;
        private static inputOneXboxDPadUpHandler;
        private static inputOneShockDPadUpHandler;
        private static inputOneXboxLeftTriggerHandler;
        private static inputOneXboxRightTriggerHandler;
        private static inputOneLeftStickHandler;
        private static inputOneRightStickHandler;
        private static inputTwoButtonDownHandler;
        private static inputTwoButtonUpHandler;
        private static inputTwoXboxDPadDownHandler;
        private static inputTwoShockDPadDownHandler;
        private static inputTwoXboxDPadUpHandler;
        private static inputTwoShockDPadUpHandler;
        private static inputTwoXboxLeftTriggerHandler;
        private static inputTwoXboxRightTriggerHandler;
        private static inputTwoLeftStickHandler;
        private static inputTwoRightStickHandler;
        private static inputThreeButtonDownHandler;
        private static inputThreeButtonUpHandler;
        private static inputThreeXboxDPadDownHandler;
        private static inputThreeShockDPadDownHandler;
        private static inputThreeXboxDPadUpHandler;
        private static inputThreeShockDPadUpHandler;
        private static inputThreeXboxLeftTriggerHandler;
        private static inputThreeXboxRightTriggerHandler;
        private static inputThreeLeftStickHandler;
        private static inputThreeRightStickHandler;
        private static inputFourButtonDownHandler;
        private static inputFourButtonUpHandler;
        private static inputFourXboxDPadDownHandler;
        private static inputFourShockDPadDownHandler;
        private static inputFourXboxDPadUpHandler;
        private static inputFourShockDPadUpHandler;
        private static inputFourXboxLeftTriggerHandler;
        private static inputFourXboxRightTriggerHandler;
        private static inputFourLeftStickHandler;
        private static inputFourRightStickHandler;
        private static inputManagerGamepadConnected;
        private static inputManagerGamepadDisconnected;
    }
    /**
     * Virtual Touch Joystick Class - Based On: https://www.cssscript.com/touch-joystick-controller/
     * With Non-Fixed Joystick Support And Mouse Button Press/Release Events
     * @class TouchJoystickHandler - All rights reserved (c) 2020 Mackey Kinard
     */
    class TouchJoystickHandler {
        private isFixed;
        private touchId;
        private pointerId;
        private dragStart;
        private mouseButton;
        private maxDistance;
        private deadZone;
        private xvalue;
        private yvalue;
        private stick;
        private base;
        private active;
        enabled: boolean;
        updateElements: boolean;
        preventDefault: boolean;
        stopPropagation: boolean;
        baseElementOpacity: string;
        stickElementOpacity: string;
        onHandleDown: (event: any) => void;
        onHandleMove: (event: any) => void;
        onHandleUp: (event: any) => void;
        constructor(stickid: string, maxdistance: number, deadzone: number, fixed?: boolean, button?: TOOLKIT.TouchMouseButton, baseid?: string);
        dispose(): void;
        isActive(): boolean;
        getValueX(): number;
        getValueY(): number;
        getMouseButton(): TOOLKIT.TouchMouseButton;
        getBaseElement(): HTMLElement;
        getStickElement(): HTMLElement;
        isFixedJoystick(): boolean;
        protected handleDown(event: any): void;
        protected handleMove(event: any): void;
        protected handleUp(event: any): void;
        protected showBaseElement(event: any): void;
        hideBaseElement(): void;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    class WindowManager {
        /** Are unversial windows platform services available. */
        static IsWindows(): boolean;
        /** Are mobile cordova platform services available. */
        static IsCordova(): boolean;
        /** Are web assembly platform services available. */
        static IsWebAssembly(): boolean;
        /** Is oculus browser platform agent. */
        static IsOculusBrowser(): boolean;
        /** Is samsung browser platform agent. */
        static IsSamsungBrowser(): boolean;
        /** Is windows phone platform agent. */
        static IsWindowsPhone(): boolean;
        /** Is blackberry web platform agent. */
        static IsBlackBerry(): boolean;
        /** Is opera web platform agent. */
        static IsOperaMini(): boolean;
        /** Is android web platform agent. */
        static IsAndroid(): boolean;
        /** Is web os platform agent. */
        static IsWebOS(): boolean;
        /** Is ios web platform agent. */
        static IsIOS(): boolean;
        /** Is iphone web platform agent. */
        static IsIPHONE(): boolean;
        /** Is ipad web platform agent. */
        static IsIPAD(): boolean;
        /** Is ipod web platform agent. */
        static IsIPOD(): boolean;
        /** Is internet explorer 11 platform agent. */
        static IsIE11(): boolean;
        /** Basic mobile check (UA-CH, input modality, and UA fallback). */
        static IsMobile(): boolean;
        /** Sync high-end estimate using capability scoring. */
        static IsHighEndMobile(): boolean;
        /**
         * Optional: async refinement with a tiny CPU micro-benchmark.
         * Use this if you want a more confident answer (runs ~10–30ms on modern phones).
         */
        static IsHighEndMobileAsync(): Promise<boolean>;
        /** Is non mobile web platform agent. */
        static IsDesktop(): boolean;
        /** Are playstation services available. */
        static IsPlaystation(): boolean;
        /** Are xbox console services available. */
        static IsXboxConsole(): boolean;
        /** Are xbox live platform services available. */
        static IsXboxLive(): boolean;
        /** Is content running in a frame window */
        static IsFrameWindow(): boolean;
        /** Is content running in a portrait window */
        static IsPortraitWindow(): boolean;
        /** Is content running in a landscape window */
        static IsLandscapeWindow(): boolean;
        /** Is content running in a standalone progressive window */
        static IsStandaloneWindow(): boolean;
        /** Is content running in a fullscreen progressive window */
        static IsFullscreenWindow(): boolean;
        /** Is content running in a standalone or fullscreen progressive window */
        static IsProgressiveWindow(): boolean;
        /** Get the browser application display mode */
        static GetDisplayMode(): string;
        /** Get the current window orientation */
        static GetOrientation(): string;
        /**
         * Sets the window location to navigate to a new url.
         * @param url The URL to navigate.
         * @param replace Whether to replace the current history entry instead of pushing a new one.
         * @example GameManager.SetLocation("/play?scene=samplescene.gltf&mode=FreeCameraMode", { replace: true });
         */
        static SetLocation(url: string, replace?: boolean): void;
        /** Open alert message dialog. */
        static AlertMessage(text: string, title?: string): any;
        /**  Gets the names query string from page url. */
        static GetQueryStringParam(name: string, url: string): string;
        /** Post a safe message to the top browser window */
        static PostWindowMessage(msg: TOOLKIT.IWindowMessage, targetOrigin?: string, localWindow?: boolean): void;
        /** Shows the default page scene loader. */
        static ShowSceneLoader(): void;
        /** Hides the default page scene loader. */
        static HideSceneLoader(): void;
        /** Update the default page scene loader full status. */
        static UpdateLoaderStatus(status: string, details: string, state: number): void;
        /** Update the default page scene loader details only. */
        static UpdateLoaderDetails(details: string, state: number): void;
        /** Update the default page scene loader progress only. */
        static UpdateLoaderProgress(progress: string, state: number): void;
        /** Show the default page error message. */
        static ShowPageErrorMessage(message: string, title?: string, timeout?: number): void;
        /** Delays a function call using browser window timeout. Returns a handle object (Milliseconds) */
        static SetTimeout(timeout: number, func: () => void): number;
        /** Clears browser window timeout delay with handle to cancel pending timeout call */
        static ClearTimeout(handle: number): void;
        /** Repeats a function call using browser window interval. Retuns a handle object (Milliseconds) */
        static SetInterval(interval: number, func: () => void): number;
        /** Clears browser window interval with handle to clear pending interval call. */
        static ClearInterval(handle: number): void;
        /** The atob() function decodes a string of data which has been encoded using Base64 encoding. */
        static Atob(data: string): string;
        /** The btoa() method creates a Base64-encoded ASCII string from a binary string */
        static Btoa(data: string): string;
        /** Popup debug layer in window. */
        static PopupDebug(scene: BABYLON.Scene): void;
        /** Toggle debug layer on and off. */
        static ToggleDebug(scene: BABYLON.Scene, embed?: boolean, parent?: HTMLElement): void;
        private static debugLayerVisible;
        /** Get an item from window local storage. */
        static GetLocalStorageItem(key: string): string;
        /** Set an item to window local storage. */
        static SetLocalStorageItem(key: string, value: string): void;
        /** Get an item from window session storage. */
        static GetSessionStorageItem(key: string): string;
        /** Set an item to window session storage. */
        static SetSessionStorageItem(key: string, value: string): void;
        static GetFilenameFromUrl(url: string): string;
        static GetUrlParameter(key: string): string;
        /** Get the system virtual reality local storage setting. */
        static GetVirtualRealityEnabled(): boolean;
        /** Set the system virtual reality local storage setting. */
        static SetVirtualRealityEnabled(enabled: boolean): void;
        /** Set the Windows Runtime preferred launch windowing mode. (Example: Windows.UI.ViewManagement.ApplicationViewWindowingMode.fullScreen = 1) */
        static SetWindowsLaunchMode(mode?: number): void;
        /** Gets the default window hardware scaling level (1 / window.devicePixelRatio) */
        static GetHardwareScalingLevel(): number;
        /** Quit the Windows Runtime host application. */
        static QuitWindowsApplication(): void;
        static PrintToScreen(text: string, color?: string, duration?: number): void;
        private static PrintElement;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon toolkit animation state pro class (Unity Style Mechanim Animation System)
     * @class AnimationState - All rights reserved (c) 2024 Mackey Kinard
     */
    class AnimationState extends TOOLKIT.ScriptComponent {
        static FPS: number;
        static EXIT: string;
        static TIME: number;
        private _looptime;
        private _loopblend;
        private _frametime;
        private _layercount;
        private _updatemode;
        private _hasrootmotion;
        private _animationplaying;
        private _initialtargetblending;
        private _hastransformhierarchy;
        private _leftfeetbottomheight;
        private _rightfeetbottomheight;
        private _runtimecontroller;
        private _executed;
        private _awakened;
        private _initialized;
        private _checkers;
        private _source;
        private _machine;
        private _animationmode;
        private _animationrig;
        private _deltaPosition;
        private _deltaRotation;
        private _angularVelocity;
        private _rootMotionSpeed;
        private _lastMotionSpeed;
        private _loopMotionSpeed;
        private _lastRotateSpeed;
        private _loopRotateSpeed;
        private _lastMotionRotation;
        private _lastMotionPosition;
        private _positionWeight;
        private _rootBoneWeight;
        private _rotationWeight;
        private _rootQuatWeight;
        private _rootBoneTransform;
        private _positionHolder;
        private _rootBoneHolder;
        private _rotationHolder;
        private _rootQuatHolder;
        private _rootMotionMatrix;
        private _rootMotionScaling;
        private _rootMotionRotation;
        private _rootMotionPosition;
        private _dirtyMotionMatrix;
        private _dirtyBlenderMatrix;
        private _targetPosition;
        private _targetRotation;
        private _targetScaling;
        private _updateMatrix;
        private _blenderMatrix;
        private _blendWeights;
        private _emptyScaling;
        private _emptyPosition;
        private _emptyRotation;
        private _ikFrameEanbled;
        private _data;
        private _anims;
        private _clips;
        private _numbers;
        private _booleans;
        private _triggers;
        private _parameters;
        private _smoothTargets;
        delayStart: number;
        speedRatio: number;
        delayUpdateUntilReady: boolean;
        enableAnimations: boolean;
        applyRootMotion: boolean;
        awakened(): boolean;
        initialized(): boolean;
        hasRootMotion(): boolean;
        isFirstFrame(): boolean;
        isLastFrame(): boolean;
        ikFrameEnabled(): boolean;
        getAnimationTime(): number;
        getFrameLoopTime(): boolean;
        getFrameLoopBlend(): boolean;
        getAnimationPlaying(): boolean;
        getRuntimeController(): string;
        getRootBoneTransform(): BABYLON.TransformNode;
        getDeltaRootMotionAngle(): number;
        getDeltaRootMotionSpeed(): number;
        getDeltaRootMotionPosition(): BABYLON.Vector3;
        getDeltaRootMotionRotation(): BABYLON.Quaternion;
        getFixedRootMotionPosition(): BABYLON.Vector3;
        getFixedRootMotionRotation(): BABYLON.Quaternion;
        getVertexAnimationController(): TOOLKIT.VertexAnimationController;
        isVertexAnimationModeEnabled(): boolean;
        /**
         * Returns the VertexAnimationMaterial for the first (or only) VAT renderer on this
         * animator instance. Each animator gets its own isolated material clone, so changes made
         * here (e.g. albedoTexture, albedoColor) affect only this instance.
         * Returns null if VAT mode is not active or the mesh has no VertexAnimationMaterial.
         * For multi-submesh rigs (MultiMaterial) pass rendererIndex to select a specific slot.
         * ```
         *   // Get the UA5 animator window state
         *   const ua5 = SM.GetWindowState("UA5");
         *
         *   // Swap the albedo texture on that instance only
         *   const mat = ua5.getVertexAnimationMaterial();
         *   mat.albedoTexture = new BABYLON.Texture("textures/jockey_5.png", scene);
         *
         *   // For a multi-submesh rig (body + gear separate materials in a MultiMaterial):
         *   const bodyMat  = ua5.getVertexAnimationMaterial(0, 0);  // renderer 0, submesh 0
         *   const gearMat  = ua5.getVertexAnimationMaterial(0, 1);  // renderer 0, submesh 1
         *
         *   bodyMat.albedoTexture = new BABYLON.Texture("textures/jockey5_body.png", scene);
         *   gearMat.albedoTexture = new BABYLON.Texture("textures/jockey5_gear.png", scene);
         *
         * ```
         */
        getVertexAnimationMaterial(rendererIndex?: number, subMeshIndex?: number): TOOLKIT.VertexAnimationMaterial;
        /** Register handler that is triggered when the animation state machine has been awakened */
        onAnimationAwakeObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered when the animation state machine has been initialized */
        onAnimationInitObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered when the animation ik setup has been triggered */
        onAnimationIKObservable: BABYLON.Observable<number>;
        /** Register handler that is triggered when the animation end has been triggered */
        onAnimationEndObservable: BABYLON.Observable<number>;
        /** Register handler that is triggered when the animation loop has been triggered */
        onAnimationLoopObservable: BABYLON.Observable<number>;
        /** Register handler that is triggered when the animation event has been triggered */
        onAnimationEventObservable: BABYLON.Observable<IAnimatorEvent>;
        /** Register handler that is triggered when the animation frame has been updated */
        onAnimationUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered when the animation state is going to transition */
        onAnimationTransitionObservable: BABYLON.Observable<BABYLON.TransformNode>;
        protected m_zeroVector: BABYLON.Vector3;
        protected m_defaultGroup: BABYLON.AnimationGroup;
        protected m_animationTargets: BABYLON.TargetedAnimation[];
        protected m_rotationIdentity: BABYLON.Quaternion;
        protected m_timelineScrubbing: boolean;
        protected m_vertexAnimationMode: boolean;
        protected m_vertexAnimationRenderers: BABYLON.Mesh[];
        protected m_vertexAnimationController: TOOLKIT.VertexAnimationController;
        protected m_vertexAnimationDefaultClip: string;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected update(): void;
        protected destroy(): void;
        playDefault(transitionDuration?: number, animationLayer?: number, frameRate?: number): boolean;
        playAnimation(state: string, transitionDuration?: number, animationLayer?: number, frameRate?: number): boolean;
        stopAnimation(animationLayer?: number): boolean;
        killAnimations(): boolean;
        setTimelineScrubbing(isScrubbing: boolean): void;
        getIsTimelineScrubbing(): boolean;
        setAnimationTime(seconds: number): boolean;
        setAnimationSpeed(speed: number): boolean;
        setAnimationLoop(loop: boolean): boolean;
        hasBool(name: string): boolean;
        getBool(name: string): boolean;
        setBool(name: string, value: boolean): void;
        hasFloat(name: string): boolean;
        getFloat(name: string): number;
        setFloat(name: string, value: number): void;
        hasInteger(name: string): boolean;
        getInteger(name: string): number;
        setInteger(name: string, value: number): void;
        hasTrigger(name: string): boolean;
        getTrigger(name: string): boolean;
        setTrigger(name: string): void;
        resetTrigger(name: string): void;
        /**
         * Smoothly damps a float parameter toward a target. Set-and-forget: a single call
         * stores the (target, dampTime) and the AnimationState update loop drives the spring
         * one step per frame until it converges. Calling this every frame is fine too —
         * subsequent calls just refresh the target / dampTime without resetting velocity.
         *
         * Internally backed by TOOLKIT.Utilities.SmoothDamp (Game Programming Gems 4 §1.10 —
         * the same critically-damped spring Unity's Mathf.SmoothDamp uses). Velocity is held
         * across frames in _smoothTargets so the spring carries momentum the way Unity does;
         * a frame-rate-dependent Lerp cannot produce that feel.
         *
         * @param name        Animator float parameter name.
         * @param targetValue Value to ease toward.
         * @param dampTime    Approximate seconds it takes to reach the target (Unity semantics).
         *                    0 or negative collapses to an instant snap.
         * @param _deltaTime  Accepted for Unity API parity (Animator.SetFloat takes deltaTime),
         *                    but ignored — the update loop uses scene delta each tick.
         */
        setSmoothFloat(name: string, targetValue: number, dampTime?: number, _deltaTime?: number): void;
        /**
         * Smoothly damps an integer parameter toward a target. The underlying _numbers map
         * stores arbitrary floats either way (setInteger/getInteger don't actually round), so
         * this is just an alias for setSmoothFloat — same spring, same convergence behavior.
         */
        setSmoothInteger(name: string, targetValue: number, dampTime?: number, _deltaTime?: number): void;
        /** Drives every active smooth-damp spring one step. Called once per frame from update(). */
        private updateSmoothParameters;
        private getMachineState;
        private setMachineState;
        getCurrentState(layer: number): TOOLKIT.MachineState;
        getDefaultClips(): any[];
        getDefaultSource(): string;
        setLayerWeight(layer: number, weight: number): void;
        private sourceAnimationGroups;
        fixAnimationGroup(group: BABYLON.AnimationGroup): string;
        getAnimationGroup(name: string): BABYLON.AnimationGroup;
        getAnimationGroups(): BABYLON.AnimationGroup[];
        setAnimationGroups(groups: BABYLON.AnimationGroup[]): void;
        private updateAnimationGroups;
        private setupSourceAnimationGroups;
        private awakeStateMachine;
        private updateStateMachine;
        private destroyStateMachine;
        private updateAnimationState;
        private updateVertexAnimationLayer;
        private updateAnimationTargets;
        private updateBlendableTargets;
        private finalizeAnimationTargets;
        private checkStateMachine;
        private checkStateTransitions;
        private playCurrentAnimationState;
        private stopCurrentAnimationState;
        private checkAvatarTransformPath;
        private filterTargetAvatarMask;
        private sortWeightedBlendingList;
        private computeWeightedFrameRatio;
        private getFirstMotion;
        private getLastMotion;
        private setupTreeBranches;
        private parseTreeBranches;
        private parse1DSimpleTreeBranches;
        private parse2DSimpleDirectionalTreeBranches;
        private parse2DFreeformDirectionalTreeBranches;
        private parse2DFreeformCartesianTreeBranches;
    }
    class BlendTreeValue {
        source: TOOLKIT.IBlendTreeChild;
        motion: string;
        posX: number;
        posY: number;
        weight: number;
        constructor(config: {
            source: TOOLKIT.IBlendTreeChild;
            motion: string;
            posX?: number;
            posY?: number;
            weight?: number;
        });
    }
    class BlendTreeUtils {
        static ClampValue(num: number, min: number, max: number): number;
        static GetSignedAngle(a: BABYLON.Vector2, b: BABYLON.Vector2): number;
        static GetLinearInterpolation(x0: number, y0: number, x1: number, y1: number, x: number): number;
        static GetRightNeighbourIndex(inputX: number, blendTreeArray: TOOLKIT.BlendTreeValue[]): number;
    }
    class BlendTreeSystem {
        static Calculate1DSimpleBlendTree(inputX: number, blendTreeArray: TOOLKIT.BlendTreeValue[]): void;
        static Calculate2DFreeformDirectional(inputX: number, inputY: number, blendTreeArray: TOOLKIT.BlendTreeValue[]): void;
        static Calculate2DFreeformCartesian(inputX: number, inputY: number, blendTreeArray: TOOLKIT.BlendTreeValue[]): void;
        private static TempVector2_IP;
        private static TempVector2_POSI;
        private static TempVector2_POSJ;
        private static TempVector2_POSIP;
        private static TempVector2_POSIJ;
    }
    class MachineState {
        hash: number;
        name: string;
        tag: string;
        time: number;
        type: TOOLKIT.MotionType;
        rate: number;
        length: number;
        layer: string;
        layerIndex: number;
        played: number;
        machine: string;
        motionid: number;
        interrupted: boolean;
        apparentSpeed: number;
        averageAngularSpeed: number;
        averageDuration: number;
        averageSpeed: number[];
        cycleOffset: number;
        cycleOffsetParameter: string;
        cycleOffsetParameterActive: boolean;
        iKOnFeet: boolean;
        mirror: boolean;
        mirrorParameter: string;
        mirrorParameterActive: boolean;
        speed: number;
        speedParameter: string;
        speedParameterActive: boolean;
        blendtree: TOOLKIT.IBlendTree;
        transitions: TOOLKIT.ITransition[];
        behaviours: TOOLKIT.IBehaviour[];
        events: TOOLKIT.IAnimatorEvent[];
        ccurves: TOOLKIT.IUnityCurve[];
        tcurves: BABYLON.Animation[];
        constructor();
    }
    class TransitionCheck {
        result: string;
        offest: number;
        blending: number;
        duration: number;
        triggered: string[];
    }
    class AnimationMixer {
        influenceBuffer: number;
        positionBuffer: BABYLON.Vector3;
        rotationBuffer: BABYLON.Quaternion;
        scalingBuffer: BABYLON.Vector3;
        originalMatrix: BABYLON.Matrix;
        blendingFactor: number;
        blendingSpeed: number;
        rootPosition: BABYLON.Vector3;
        rootRotation: BABYLON.Quaternion;
    }
    class BlendingWeights {
        primary: TOOLKIT.IBlendTreeChild;
        secondary: TOOLKIT.IBlendTreeChild;
    }
    enum MotionType {
        Clip = 0,
        Tree = 1
    }
    enum ConditionMode {
        If = 1,
        IfNot = 2,
        Greater = 3,
        Less = 4,
        Equals = 6,
        NotEqual = 7
    }
    enum InterruptionSource {
        None = 0,
        Source = 1,
        Destination = 2,
        SourceThenDestination = 3,
        DestinationThenSource = 4
    }
    enum BlendTreeType {
        Simple1D = 0,
        SimpleDirectional2D = 1,
        FreeformDirectional2D = 2,
        FreeformCartesian2D = 3,
        Direct = 4,
        Clip = 5
    }
    enum BlendTreePosition {
        Lower = 0,
        Upper = 1
    }
    enum AnimatorParameterType {
        Float = 1,
        Int = 3,
        Bool = 4,
        Trigger = 9
    }
    interface IAnimatorEvent {
        id: number;
        clip: string;
        time: number;
        function: string;
        intParameter: number;
        floatParameter: number;
        stringParameter: string;
        objectIdParameter: string;
        objectNameParameter: string;
    }
    interface IAvatarMask {
        hash: number;
        maskName: string;
        maskType: string;
        transformCount: number;
        transformPaths: string[];
    }
    interface IAnimationLayer {
        owner: string;
        hash: number;
        name: string;
        index: number;
        entry: string;
        machine: string;
        iKPass: boolean;
        avatarMask: TOOLKIT.IAvatarMask;
        blendingMode: number;
        defaultWeight: number;
        syncedLayerIndex: number;
        syncedLayerAffectsTiming: boolean;
        animationTime: number;
        animationNormal: number;
        animationMaskMap: Map<string, number>;
        animationFirstRun: boolean;
        animationEndFrame: boolean;
        animationLoopFrame: boolean;
        animationLoopCount: number;
        animationLoopEvents: any;
        animationStateMachine: TOOLKIT.MachineState;
        vatTransitionActive?: boolean;
        vatTransitionElapsed?: number;
        vatTransitionDuration?: number;
        vatSourceClipName?: string;
        vatSourceTimeSec?: number;
    }
    interface IAnimationCurve {
        length: number;
        preWrapMode: string;
        postWrapMode: string;
        keyframes: TOOLKIT.IAnimationKeyframe[];
    }
    interface IAnimationKeyframe {
        time: number;
        value: number;
        inTangent: number;
        outTangent: number;
        tangentMode: number;
    }
    interface IBehaviour {
        hash: number;
        name: string;
        layerIndex: number;
        properties: any;
    }
    interface ITransition {
        hash: number;
        anyState: boolean;
        layerIndex: number;
        machineLayer: string;
        machineName: string;
        canTransitionToSelf: boolean;
        destination: string;
        duration: number;
        exitTime: number;
        hasExitTime: boolean;
        fixedDuration: boolean;
        intSource: TOOLKIT.InterruptionSource;
        isExit: boolean;
        mute: boolean;
        name: string;
        offset: number;
        orderedInt: boolean;
        solo: boolean;
        conditions: TOOLKIT.ICondition[];
    }
    interface ICondition {
        hash: number;
        mode: TOOLKIT.ConditionMode;
        parameter: string;
        threshold: number;
    }
    interface IBlendTree {
        hash: number;
        name: string;
        state: string;
        children: TOOLKIT.IBlendTreeChild[];
        layerIndex: number;
        apparentSpeed: number;
        averageAngularSpeed: number;
        averageDuration: number;
        averageSpeed: number[];
        blendParameterX: string;
        blendParameterY: string;
        blendType: TOOLKIT.BlendTreeType;
        isAnimatorMotion: boolean;
        isHumanMotion: boolean;
        isLooping: boolean;
        minThreshold: number;
        maxThreshold: number;
        useAutomaticThresholds: boolean;
        valueParameterX: number;
        valueParameterY: number;
    }
    interface IBlendTreeChild {
        hash: number;
        layerIndex: number;
        cycleOffset: number;
        directBlendParameter: string;
        apparentSpeed: number;
        averageAngularSpeed: number;
        averageDuration: number;
        averageSpeed: number[];
        mirror: boolean;
        type: TOOLKIT.MotionType;
        motion: string;
        positionX: number;
        positionY: number;
        threshold: number;
        timescale: number;
        subtree: TOOLKIT.IBlendTree;
        weight: number;
        ratio: number;
        track: BABYLON.AnimationGroup;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon toolkit audio source manager standard class
     * @class AudioSource - All rights reserved (c) 2024 Mackey Kinard
     */
    class AudioSource extends TOOLKIT.ScriptComponent implements TOOLKIT.IAssetPreloader {
        /** The default volume for the audio source if volume is at max level */
        static MAX_VOLUME: number;
        static DEFAULT_LEVEL: number;
        static DEFAULT_ROLLOFF: number;
        private static AUDIO_ENGINE_V2;
        private static AUDIO_ENGINE_V2_OPTIONS;
        private _audio;
        private _name;
        private _loop;
        private _mute;
        private _pitch;
        private _volume;
        private _preload;
        private _playonawake;
        private _spatialblend;
        private _preloaderUrl;
        private _lastmutedvolume;
        private _priority;
        private _panstereo;
        private _mindistance;
        private _maxdistance;
        private _reverbzonemix;
        private _bypasseffects;
        private _bypassreverbzones;
        private _bypasslistenereffects;
        private _initializedReadyInstance;
        private _isAudioPlaying;
        private _isAudioPaused;
        private _isAudioSpatial;
        getSoundClip(): BABYLON.StaticSound | BABYLON.Sound;
        /** Register handler that is triggered when the audio clip is ready */
        onReadyObservable: BABYLON.Observable<BABYLON.StaticSound | BABYLON.Sound>;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected after(): void;
        protected destroy(): void;
        protected awakeAudioSource(): Promise<void>;
        protected startAudioSource(): void;
        protected updateAudioSource(): Promise<void>;
        protected destroyAudioSource(): void;
        /**
         * Is legacy audio engine enabled
         */
        isLegacy(): boolean;
        /**
         * Gets the ready status for track
         */
        isReady(): boolean;
        /**
         * Gets the playing status for track
         */
        isPlaying(): boolean;
        /**
         * Gets the paused status for track
         */
        isPaused(): boolean;
        /**
         * Play the sound track
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         * @param offset (optional) Start the sound at a specific time in seconds
         * @param length (optional) Sound duration (in seconds)
         */
        play(time?: number, offset?: number, length?: number): Promise<boolean>;
        private internalPlay;
        /**
         * Pause the sound track
         */
        pause(): boolean;
        /**
         * Stop the sound track
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        stop(time?: number): boolean;
        /**
         * Mute the sound track
         * @param time (optional) Mute the sound after X seconds. Start immediately (0) by default.
         */
        mute(time?: number): boolean;
        /**
         * Unmute the sound track
         * @param time (optional) Unmute the sound after X seconds. Start immediately (0) by default.
         */
        unmute(time?: number): boolean;
        /**
         * Gets the sound track pitch value
         */
        getPitch(): number;
        /**
         * Sets the sound track pitch value
         * @param rate the audio playback rate
         */
        setPitch(value: number): void;
        /**
         * Gets the volume of the track
         */
        getVolume(): number;
        /**
         * Sets the volume of the track
         * @param volume Define the new volume of the sound
         * @param time Define time for gradual change to new volume
         */
        setVolume(volume: number, time?: number): boolean;
        /**
         * Sets the volume of the track
         * @param location Define the new location of the sound
         */
        setPosition(location: BABYLON.Vector3): void;
        /**
         * Gets the sound track playback speed
         */
        getPlaybackSpeed(): number;
        /**
         * Sets the sound track playback speed
         * @param rate the audio playback rate
         */
        setPlaybackSpeed(rate: number): void;
        /**
         * Sets the sound rolloff mode (linear, inverse, exponential)
         * @param mode the rolloff mode
         */
        setRolloffMode(mode: string): void;
        /**
         * Sets the sound track min distance level
         * @param distance the min distance level
         */
        setMinDistance(distance: number): void;
        /**
         * Sets the sound track max distance level
         * @param distance the mmax distance level
         */
        setMaxDistance(distance: number): void;
        /**
         * Sets the sound track spatial blend level
         * @param blend the spatial blend level
         */
        setSpatialBlend(blend: number): void;
        /**
         * Gets the spatial sound option of the track
         */
        hasSpatialSound(): boolean;
        /**
         * Gets the spatial sound option of the track (BABYLON.StaticSound)
         */
        getSpatialSound(): BABYLON.AbstractSpatialAudio;
        /**
         * Attaches the spatial sound to the transform node (BABYLON.StaticSound)
         * @param transform Define the transform node to attach the spatial sound to
         */
        attachToSpatialNode(transform: BABYLON.TransformNode): void;
        /**
         * Gets the current time of the track
         */
        getCurrentTrackTime(): number;
        /**
         * Set audio data source (BABYLON.StaticSound)
         */
        setAudioDataSource(source: string | ArrayBuffer): Promise<void>;
        /**
         * Set legacy audio data source (BABYLON.Sound)
         */
        setLegacyDataSource(source: string | ArrayBuffer | MediaStream): void;
        /**
         * Add audio preloader asset tasks (https://doc.babylonjs.com/divingDeeper/importers/assetManager)
         */
        addPreloaderTasks(assetsManager: TOOLKIT.PreloadAssetsManager): void;
        /** Is Legacy Audio Engine Enabled */
        static IsLegacyEngine(): boolean;
        /** Gets The Current Audo Engine Options */
        static GetAudioOptions(): BABYLON.IWebAudioEngineOptions;
        /** Sets The Current Audo Engine Options */
        static SetAudioOptions(options: BABYLON.IWebAudioEngineOptions): void;
        /** Gets The Current Audo Engine V2 */
        static GetAudioEngine(): Promise<BABYLON.AudioEngineV2>;
        /** Unlocks The Legacy Audio Engine */
        static UnlockLegacyAudio(): void;
        /** Unlocks The Current Audio Engine */
        static UnlockAudioEngine(): Promise<void>;
        /** Attach Audio Spatial Camera */
        static AttachSpatialCamera(node: BABYLON.Node): Promise<void>;
        /** Detaches Current Audio Spatial Camera */
        static DetachSpatialCamera(): Promise<void>;
        /** Create Audio Engine Version 2 Buffered Sound Instance */
        static CreateSoundBuffer(source: ArrayBuffer | AudioBuffer | BABYLON.StaticSoundBuffer | string | string[], options?: Partial<BABYLON.IStaticSoundBufferOptions>): Promise<BABYLON.StaticSoundBuffer>;
        /** Create Audio Engine Version 2 Static Sound Instance */
        static CreateStaticSound(name: string, source: ArrayBuffer | AudioBuffer | BABYLON.StaticSoundBuffer | string | string[], options: Partial<BABYLON.IStaticSoundOptions>): Promise<BABYLON.StaticSound>;
        /** Create Audio Engine Version 2 Streaming Sound Instance */
        static CreateStreamingSound(name: string, source: HTMLMediaElement | string | string[], options?: Partial<BABYLON.IStreamingSoundOptions>): Promise<BABYLON.StreamingSound>;
    }
}
declare namespace TOOLKIT {
    class ChannelMixerPlugin {
        /**
         * Creates a post-process that applies channel mixing.
         * Unity channel mixer: each output channel (R,G,B) is a weighted sum of input channels (R,G,B).
         */
        static CreatePostProcess(scene: BABYLON.Scene, camera: BABYLON.Camera, options?: {
            red?: number[];
            green?: number[];
            blue?: number[];
        }): BABYLON.PostProcess;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon toolkit default character controller pro class (Unity Style Physics Based Character Controller System)
     * @class CharacterController - All rights reserved (c) 2020 Mackey Kinard
     */
    class CharacterController extends TOOLKIT.ScriptComponent {
        static TERMINAL_VELOCITY: number;
        static DEFAULT_CHARACTER_MASS: number;
        private _avatarRadius;
        private _avatarHeight;
        private _centerOffset;
        private _slopeLimit;
        private _skinWidth;
        private _stepHeight;
        private _minMoveDistance;
        private _verticalVelocity;
        private _currentSlopeAngle;
        private _collisionEvents;
        private _targetRotation;
        private _targetVelocity;
        private _currentVelocity;
        private _inputVelocity;
        private _stepUpVelocity;
        private _gravityFactor;
        private _minJumpTimer;
        private _isGrounded;
        private _groundContacts;
        private _groundContactInfo;
        private _groundedEnterTimer;
        private _groundedExitTimer;
        private _raycastResult;
        private _rayOrigin;
        private _rayTarget;
        private _previousGroundHeight;
        private _stepDetectionDistance;
        protected m_moveDeltaX: number;
        protected m_moveDeltaY: number;
        protected m_moveDeltaZ: number;
        protected m_havokplugin: any;
        getAvatarRadius(): number;
        getAvatarHeight(): number;
        getCenterOffset(): BABYLON.Vector3;
        getSkinWidth(): number;
        getStepHeight(): number;
        getGravityFactor(): number;
        setGravityFactor(factor: number): void;
        getInputVelocity(): BABYLON.Vector3;
        setInputVelocity(velocity: BABYLON.Vector3): void;
        getStepUpVelocity(): number;
        getCurrentSlopeAngle(): number;
        getVerticalVelocity(): number;
        getMinMoveDistance(): number;
        setMinMoveDistance(distance: number): void;
        getGroundContactInfo(): TOOLKIT.IGroundContactInfo | null;
        getMinJumpTimer(): number;
        getSlopeLimit(): number;
        setSlopeLimit(slopeRadians: number): void;
        isGrounded(): boolean;
        canJump(): boolean;
        /** Register handler that is triggered when the character position has been updated */
        onUpdatePositionObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered when the character velocity will be updated */
        onUpdateVelocityObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Enable character update features */
        enableUpdate: boolean;
        /** Enable character gravity features */
        enableGravity: boolean;
        /** Enable character step offset features */
        enableStepOffset: boolean;
        /** Use multiple raycasts for accurate ground detection on complex geometry (stairs, slopes) */
        useMultiRaycast: boolean;
        /** Number of rays to cast when useMultiRaycast is true (default: 5) */
        multiRaycastCount: number;
        /** Maximum ground check distance below character (default: 0.25) */
        groundCheckDistance: number;
        /** Step velocity factor for climbing (default: 0.5) */
        stepUpVelocityFactor: number;
        /** Default jumping timer (default: 0.5) */
        defaultJumpingTimer: number;
        /** Only apply gravity when the character is not grounded */
        onlyApplyGravityWhenNotGrounded: boolean;
        /** Default grounding velocity clamp (default: -2.0) */
        downwardVelocityClamp: number;
        /** Contact hysteresis time - how long to keep a contact valid after last physics event (default: 0.15 seconds) */
        contactHysteresisTime: number;
        /** Seconds of sustained contact required before grounded becomes true (default: 0.03 seconds) */
        groundedEnterTime: number;
        /** Seconds to keep grounded true after last valid contact (default: 0.1 seconds) */
        groundedExitTime: number;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected update(): void;
        protected fixed(): void;
        /** Teleport the character position and rotation to the specfied values. */
        set(px: number, py: number, pz: number, rx?: number, ry?: number, rz?: number, rw?: number): void;
        /** Translates the character with the specfied linear velocity. */
        move(velocity: BABYLON.Vector3, aux?: boolean): void;
        /** Jumps the chacracter with the specified speed. */
        jump(speed: number): void;
        /** Turns the chacracter to the specified angular velocity. */
        turn(angle: number): void;
        /** Rotates the chacracter to the specified rotation. */
        rotate(x: number, y: number, z: number, w: number): void;
        /** Sets the character controller rigidbody mass property
         * @param mass The new mass value (must be greater than zero)
         */
        setRigidBodyMass(mass: number): void;
        /** Set the character controller rigidbody collision type
         * @param collision true = solid, false = trigger
         */
        setCollisionState(collision: boolean): void;
        /**
         * Set collision filter masks for the character controller at runtime.
         * @param membershipMask bitmask for which group(s) this shape belongs to
         * @param collideMask bitmask for which groups this shape should collide with
         */
        setCollisionFilters(membershipMask: number, collideMask: number): void;
        /** Store contact and reset its hysteresis timer */
        private registerGroundContact;
        /** Age all cached ground contacts and remove the ones that expired */
        private updateGroundContactAges;
        /** Check if collision contact is at the feet (bottom hemisphere of capsule) */
        private isContactAtFeet;
        /** Check if a surface normal represents valid ground (not wall/ceiling) */
        private isValidGroundNormal;
        /** Option B: Single raycast down from character center */
        private performSingleRayGroundCheck;
        /** Option C: Multiple raycasts in circular pattern for accuracy on complex geometry */
        private performMultiRayGroundCheck;
        /** Perform raycast(s) downward to detect ground and get accurate surface normal */
        private performGroundRaycast;
        /** Detect if character is approaching a step and calculate step-up velocity */
        private detectAndHandleStepOffset;
        /** Update the character controller grounded state */
        private updateGroundedState;
        /** Create character controller physics body */
        private createPhysicsBodyAndShape;
        /** Create character controller physics shape */
        private createPhysicsShapeCapsule;
    }
    /**
     * Ground contact raycast information interface
     */
    interface IGroundContactInfo {
        hasGround: boolean;
        groundNormal: BABYLON.Vector3;
        groundHeight: number;
        groundBody: BABYLON.PhysicsBody | null;
    }
    /**
     * Babylon toolkit simple character controller pro class (Simple Non Physics Based Character Controller System)
     * @class SimpleCharacterController - All rights reserved (c) 2020 Mackey Kinard
     */
    class SimpleCharacterController extends TOOLKIT.ScriptComponent {
        private _eulerAngles;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected start(): void;
        /** Sets the character position and rotation to the specfied values. Aux is not used. */
        set(px: number, py: number, pz: number, rx?: number, ry?: number, rz?: number, rw?: number, aux?: boolean): void;
        /** Translates the character with the specfied velocity. Aux is not used. */
        move(velocity: BABYLON.Vector3, aux?: boolean): void;
        /** Jumps the chacracter with the specified speed. */
        jump(speed: number): void;
        /** Turns the chacracter to the specified angle. */
        turn(angle: number): void;
        /** Rotates the chacracter to the specified quaternion. */
        rotate(x: number, y: number, z: number, w: number): void;
    }
    /**
     * Babylon toolkit nav mesh character controller pro class (Nav Mesh Based Character Controller System)
     * @class RecastCharacterController - All rights reserved (c) 2020 Mackey Kinard
     */
    class RecastCharacterController extends TOOLKIT.ScriptComponent {
        private _eulerAngles;
        private _teleportVector;
        private _navigationAgent;
        getNavigationAgent(): TOOLKIT.NavigationAgent;
        setNavigationAgent(agent: TOOLKIT.NavigationAgent): void;
        setDestinationPoint(destination: BABYLON.Vector3, closetPoint?: boolean): void;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected start(): void;
        /** Sets the character position and rotation to the specfied values. Aux is closest point option. */
        set(px: number, py: number, pz: number, rx?: number, ry?: number, rz?: number, rw?: number, aux?: boolean): void;
        /** Translates the character with the specfied velocity. Aux is closest point option. */
        move(velocity: BABYLON.Vector3, aux?: boolean): void;
        /** Jumps the chacracter with the specified speed. */
        jump(speed: number): void;
        /** Turns the chacracter to the specified angle. */
        turn(angle: number): void;
        /** Rotates the chacracter to the specified quaternion. */
        rotate(x: number, y: number, z: number, w: number): void;
    }
    /**
     * Babylon toolkit universal character controller pro class (Universal Character Controller System)
     */
    type UniversalCharacterController = TOOLKIT.CharacterController | TOOLKIT.SimpleCharacterController | TOOLKIT.RecastCharacterController;
}
declare namespace TOOLKIT {
    class ColorFilterPlugin {
        /**
         * Creates a post-process that applies a color filter (multiplies the final color).
         */
        static CreatePostProcess(scene: BABYLON.Scene, camera: BABYLON.Camera, options?: {
            color?: number[] | BABYLON.Color3 | BABYLON.Color4;
        }): BABYLON.PostProcess;
    }
}
declare namespace TOOLKIT {
    class ColoredBloomPlugin {
        /**
         * Creates a colored bloom chain:
         * - Prefilter PostProcess: extracts bright parts above threshold and tints with bloomColor
         * - Blur Passes: two BlurPostProcess passes (horz + vert)
         * - Composite PostProcess: additive blend back onto the final image
         */
        static CreateColoredBloom(scene: BABYLON.Scene, camera: BABYLON.Camera, options?: {
            threshold?: number;
            color?: number[] | BABYLON.Color3 | BABYLON.Color4;
            weight?: number;
            kernel?: number;
            ratio?: number;
            passes?: number;
            saturation?: number;
            downsampleRatio?: number;
        }): any;
    }
}
/**
 * btRaycastVehicle.ts - Complete port of Bullet Physics btRaycastVehicle
 * for BabylonJS with Havok Physics Plugin.
 *
 * Original: Copyright (c) 2005 Erwin Coumans http://continuousphysics.com/Bullet/
 * Extensions: Mackey Kinard (multi-raycast, flying stabilization, track stabilization)
 *
 * Usage:
 *   const tuning = new TOOLKIT.btVehicleTuning();
 *   const raycaster = new TOOLKIT.btDefaultVehicleRaycaster(query);
 *   const vehicle = new TOOLKIT.btRaycastVehicle(tuning, chassisBody, raycaster);
 *   vehicle.addWheel(connPoint, wheelDir, wheelAxle, restLen, radius, tuning, isFront);
 *   // Each physics step:
 *   vehicle.updateVehicle(deltaTime);
 *   // Visual transforms:
 *   wheelMesh.position.copyFrom(vehicle.getWheelInfo(i).worldTransformPosition);
 *   wheelMesh.rotationQuaternion.copyFrom(vehicle.getWheelInfo(i).worldTransformRotation);
 */
declare namespace TOOLKIT {
    class btVehicleTuning {
        suspensionStiffness: number;
        suspensionCompression: number;
        suspensionDamping: number;
        maxSuspensionTravelCm: number;
        frictionSlip: number;
        maxSuspensionForce: number;
    }
    class btVehicleRaycasterResult {
        hitPointInWorld: BABYLON.Vector3;
        hitNormalInWorld: BABYLON.Vector3;
        distFraction: number;
        hitBody: any;
        filterCollideMask: number;
        filterMembershipMask: number;
    }
    interface IbtVehicleRaycaster {
        castRay(from: BABYLON.Vector3, to: BABYLON.Vector3, result: btVehicleRaycasterResult): any;
    }
    class btDefaultVehicleRaycaster implements IbtVehicleRaycaster {
        private _raycastResult;
        private _query;
        constructor(query?: BABYLON.IRaycastQuery);
        castRay(from: BABYLON.Vector3, to: BABYLON.Vector3, result: btVehicleRaycasterResult): any;
    }
    class btWheelRaycastInfo {
        contactNormalWS: BABYLON.Vector3;
        contactPointWS: BABYLON.Vector3;
        suspensionLength: number;
        hardPointWS: BABYLON.Vector3;
        wheelDirectionWS: BABYLON.Vector3;
        wheelAxleWS: BABYLON.Vector3;
        isInContact: boolean;
        groundObject: any;
    }
    class btWheelInfo {
        raycastInfo: btWheelRaycastInfo;
        worldTransformPosition: BABYLON.Vector3;
        worldTransformRotation: BABYLON.Quaternion;
        chassisConnectionPointCS: BABYLON.Vector3;
        wheelDirectionCS: BABYLON.Vector3;
        wheelAxleCS: BABYLON.Vector3;
        suspensionRestLength: number;
        maxSuspensionTravelCm: number;
        wheelRadius: number;
        suspensionStiffness: number;
        dampingCompression: number;
        dampingRelaxation: number;
        frictionSlip: number;
        maxSuspensionForce: number;
        isFrontWheel: boolean;
        steering: number;
        rotation: number;
        deltaRotation: number;
        rollInfluence: number;
        engineForce: number;
        brake: number;
        clippedInvContactDotSuspension: number;
        suspensionRelativeVelocity: number;
        suspensionForce: number;
        skidInfo: number;
        clientInfo: any;
        steeringAngle: number;
        rotationBoost: number;
        defaultFriction: number;
        invertWheelDirection: boolean;
        maxVisualTravelRange: number;
        contactCollideMask: number;
        contactMembershipMask: number;
        _prevContactNormalWS: BABYLON.Vector3;
        _prevSuspensionLength: number;
        _prevSuspensionForce: number;
        _hasPrevSuspState: boolean;
        _rayHistoryLengths: number[];
        _rayHistoryNormalsX: number[];
        _rayHistoryNormalsY: number[];
        _rayHistoryNormalsZ: number[];
        _rayHistoryIndex: number;
        _rayHistoryCount: number;
        _smoothedSuspensionLength: number;
        _smoothedContactNormal: BABYLON.Vector3;
        _smoothedContactNormalValid: boolean;
        _contactLossFrames: number;
        transform: BABYLON.TransformNode;
        spinner: BABYLON.TransformNode;
        constructor(ci: {
            chassisConnectionCS: BABYLON.Vector3;
            wheelDirectionCS: BABYLON.Vector3;
            wheelAxleCS: BABYLON.Vector3;
            suspensionRestLength: number;
            maxSuspensionTravelCm: number;
            wheelRadius: number;
            suspensionStiffness: number;
            dampingCompression: number;
            dampingRelaxation: number;
            frictionSlip: number;
            maxSuspensionForce: number;
            isFrontWheel: boolean;
        });
        getSuspensionRestLength(): number;
    }
    class btRaycastVehicle {
        /** Everything - Hex: 0xFFFFFFFF  - Decimal: 4294967295 */
        static FILTER_GROUP_ALL_COLLIDERS: number;
        /** Car Colliders - Unity Layer: 20 - Hex: 0x00100000 - Decimal: 1048576 */
        static FILTER_GROUP_VEHICLE_COLLIDERS: number;
        /** Wall Colliders - Unity Layer: 21 - Hex: 0x00200000  - Decimal: 2097152 */
        static FILTER_GROUP_BRIDGE_COLLIDERS: number;
        /** Road Colliders - Unity Layer: 22 - Hex: 0x00400000  - Decimal: 4194304 */
        static FILTER_GROUP_ROAD_COLLIDERS: number;
        /** Grass Colliders - Unity Layer: 23 - Hex: 0x00800000  - Decimal: 8388608 */
        static FILTER_GROUP_GRASS_COLLIDERS: number;
        /** Curb Colliders - Unity Layer: 24 - Hex: 0x01000000  - Decimal: 16777216 */
        static FILTER_GROUP_CURB_COLLIDERS: number;
        /** Fence Colliders - Unity Layer: 25 - Hex: 0x02000000  - Decimal: 33554432 */
        static FILTER_GROUP_FENCE_COLLIDERS: number;
        /** All Vehicle Colliders (Vehicle, Bridge, Road, Grass, Curb, Fence) */
        static FILTER_GROUP_ALL_VEHICLE_COLLIDERS: number;
        static VEHICLE_MESH_TAG: string;
        static BRIDGE_MESH_TAG: string;
        static ROAD_MESH_TAG: string;
        static GRASS_MESH_TAG: string;
        static CURB_MESH_TAG: string;
        static FENCE_MESH_TAG: string;
        private _chassisBody;
        private _vehicleRaycaster;
        private _wheelInfo;
        private _indexRightAxis;
        private _indexUpAxis;
        private _indexForwardAxis;
        private _currentVehicleSpeedKmHour;
        enableMultiRaycast: boolean;
        minimumWheelContacts: number;
        trackConnectionAccel: number;
        smoothFlyingImpulse: number;
        arcadeSteeringAssist: number;
        smoothedGradientSpeed: number;
        maximumYawRateLow: number;
        maximumYawRateHigh: number;
        angularDamping: BABYLON.Vector3;
        wheelSkidFadeInSpeed: number;
        wheelSkidFadeOutSpeed: number;
        minContactDotSuspension: number;
        suspensionForceSmoothing: number;
        suspensionDampingOverdrive: number;
        raycastSmoothingEnabled: boolean;
        raycastHistoryBufferSize: number;
        raycastLengthCompressionAlpha: number;
        raycastLengthRelaxationAlpha: number;
        raycastNormalSmoothingAlpha: number;
        raycastOutlierRejectionEnabled: boolean;
        raycastOutlierThresholdMeters: number;
        raycastMaxLengthChangePerSecond: number;
        raycastContactLossGraceFrames: number;
        raycastDebugLogEnabled: boolean;
        raycastDebugLogIntervalFrames: number;
        raycastDebugLogSpikeThresholdMeters: number;
        raycastDebugLogWheelMask: number;
        private _raycastDebugFrameCounter;
        private _raycastMedianScratch;
        sideToSideStabilityEnabled: boolean;
        sideToSideStabilityStartKmh: number;
        sideToSideStabilityFullKmh: number;
        stabilizationDebug: boolean;
        stabilizationDebugInterval: number;
        downforceCoefficient: number;
        constantDownforce: number;
        stabilizationNormalSmoothing: number;
        airborneGroundNormalHoldTime: number;
        groundedAutoLevelEnabled: boolean;
        groundedAutoLevelStrength: number;
        groundedAutoLevelDeadzoneDeg: number;
        groundedAutoLevelSettleDeg: number;
        groundedAutoLevelSettleScale: number;
        groundedAutoLevelHysteresisDeg: number;
        groundedAutoLevelStartKmh: number;
        groundedAutoLevelFullKmh: number;
        groundedAutoLevelMaxRate: number;
        groundedAutoLevelPartialContactBoost: number;
        groundedAutoLevelSlideScale: number;
        groundedAutoLevelTrackNormalMinDot: number;
        airborneTrackConnectionStartKmh: number;
        airborneTrackConnectionFullKmh: number;
        airborneTrackConnectionMaxAccel: number;
        airborneRiseDamping: number;
        airborneMaxRiseSpeed: number;
        private _groundedAutoLevelWasActive;
        private _stabilizationGroundNormal;
        private _stabilizationHasGroundNormal;
        private _stabilizationAirborneTime;
        isArcadeBurnoutModeActive: boolean;
        isArcadeDonutModeActive: boolean;
        isArcadeFootBrakeActive: boolean;
        isArcadeHandBrakeActive: boolean;
        isArcadeWheelSkidActive: boolean;
        isArcadeYawAssistActive: boolean;
        burnoutFrictionFloor: number;
        frictionRestoreSpeed: number;
        arcadeBurnoutWheelSpinGain: number;
        arcadeDonutWheelSpinGain: number;
        arcadeBurnoutDirectionChangeSpeedKmh: number;
        arcadeBurnoutDirectionChangeGripScale: number;
        arcadeWheelSpinBuildSpeed: number;
        arcadeWheelSpinRecoverySpeed: number;
        arcadeWheelSpinAirDamping: number;
        arcadeWheelSpinMaxAngularVelocity: number;
        arcadeStationaryBurnoutWheelSpinGain: number;
        arcadeStationaryBurnoutMinAngularVelocity: number;
        arcadeHandbrakeYawCapMultiplier: number;
        arcadeBurnoutYawCapMultiplier: number;
        arcadeDonutYawCapMultiplier: number;
        arcadeSkidFadeInSpeed: number;
        arcadeSkidFadeOutSpeed: number;
        wheelAtRestSpeedThresholdKmh: number;
        arcadeHandbrakeAssistEnabled: boolean;
        currentSteeringInput: number;
        arcadeDonutDirectYawEnabled: boolean;
        arcadeDonutDirectYawDegPerSec: number;
        arcadeDonutDirectYawDurationMs: number;
        arcadeDonutDirectYawFadeMs: number;
        private _arcadeDonutHoldElapsedSec;
        private _arcadeDonutDirectionSign;
        private _forwardWS;
        private _axle;
        private _forwardImpulse;
        private _sideImpulse;
        private _arcadeSkidInfo;
        private _arcadePreviousWheelSpin;
        sideFrictionStiffness: number;
        arcadeSideSlipSaturationEnabled: boolean;
        arcadeSideSlipPeakDeg: number;
        arcadeSideSlipFalloffDeg: number;
        arcadeSideSlipFalloffFactor: number;
        arcadeSideSlipMinSpeedMps: number;
        private _chassisMass;
        private _chassisInvMass;
        private _chassisTransform;
        private _rayResults;
        private _sv1;
        private _sv2;
        private _sv3;
        private _sv4;
        private _sv5;
        private _sv6;
        private _sv7;
        private _sv8;
        private _sv9;
        private _sv10;
        private _sq1;
        private _sq2;
        private _sm1;
        private _sm2;
        private _sm3;
        private _sm4;
        private _vapLinVel;
        private _vapAngVel;
        private _vapRelPos;
        private _vapCenter;
        private _vapCross;
        private _rsbVel1;
        private _crfVel1;
        private _basisCols;
        private _stb1;
        private _stb2;
        private _stb3;
        private _stb4;
        private _stb5;
        constructor(tuning: btVehicleTuning, chassisBody: BABYLON.PhysicsBody, raycaster: IbtVehicleRaycaster);
        addWheel(connectionPointCS: BABYLON.Vector3, wheelDirectionCS: BABYLON.Vector3, wheelAxleCS: BABYLON.Vector3, suspensionRestLength: number, wheelRadius: number, tuning: btVehicleTuning, isFrontWheel: boolean): btWheelInfo;
        getNumWheels(): number;
        getWheelInfo(index: number): btWheelInfo;
        setSteeringValue(steering: number, wheelIndex: number): void;
        getSteeringValue(wheelIndex: number): number;
        applyEngineForce(force: number, wheelIndex: number): void;
        setBrake(brake: number, wheelIndex: number): void;
        getCurrentSpeedKmHour(): number;
        getRigidBody(): BABYLON.PhysicsBody;
        getRightAxis(): number;
        getUpAxis(): number;
        getForwardAxis(): number;
        setCoordinateSystem(rightIndex: number, upIndex: number, forwardIndex: number): void;
        getForwardVector(): BABYLON.Vector3;
        getForwardVectorToRef(result: BABYLON.Vector3): void;
        cacheMassProperties(): void;
        setIsArcadeBurnoutActive(active: boolean): void;
        getIsArcadeBurnoutActive(): boolean;
        setIsArcadeDonutActive(active: boolean): void;
        getIsArcadeDonutActive(): boolean;
        setIsArcadeFootBrakeActive(active: boolean): void;
        getIsArcadeFootBrakeActive(): boolean;
        setIsArcadeHandBrakeActive(active: boolean): void;
        getIsArcadeHandBrakeActive(): boolean;
        setIsArcadeWheelSkidActive(active: boolean): void;
        getIsArcadeWheelSkidActive(): boolean;
        private setWheelContactFilters;
        resetSuspension(): void;
        getChassisWorldTransform(): BABYLON.Matrix;
        private updateWheelTransformsWS;
        updateWheelTransform(wheelIndex: number, interpolatedTransform?: boolean): void;
        private rayCast;
        private smoothRaycastHit;
        private getGravityUpToRef;
        private computeStabilizationUpVector;
        private applyFlyingStabilization;
        private applyGroundedAutoLevel;
        private applyTrackConnectionAndDownforce;
        updateVehicle(step: number): void;
        private updateSuspension;
        private getSteeringAuthorityInput;
        private getSteeringMagnitude;
        private applyEasyDonutYawAssist;
        private applyHandbrakeYawAssist;
        private resolveWheelSpinDirection;
        private updateArcadeWheelRotationBoost;
        private getWheelAngularVelocity;
        private getArcadeBurnoutDirectionChangeFactor;
        private updateArcadeSkidInfo;
        private updateFriction;
        private velocityAtWorldPoint;
        private resolveSingleBilateral;
        private calcRollingFriction;
        private clampChassisYawRate;
        getNaturalWheelSlip(wheelIndex: number): boolean;
        getSignedFrontSteeringAngleRad(): number;
        getApproxWheelbaseMeters(): number;
        dispose(): void;
    }
}
declare namespace TOOLKIT {
    class LUTBlendPlugin {
        /**
         * Creates a post-process that applies cross-faded LUTs to the rendered image.
         * Assumes LUTs are exported as 2D textures arranged as NxN tiles.
         */
        static CreatePostProcess(scene: BABYLON.Scene, camera: BABYLON.Camera, options?: {
            lutA?: string | BABYLON.Texture;
            lutB?: string | BABYLON.Texture;
            mix?: number;
        }): BABYLON.PostProcess;
        /**
         * Returns WGSL shader code for LUT blend (for WebGPU). Uses texture_2d sampling with vec2 coords.
         */
        getWGSLShaderCode(): string;
    }
}
declare namespace TOOLKIT {
    /**
     * Unity-Style Lens Distortion Plugin
     * Implements barrel/pincushion distortion for post-processing
     */
    class LensDistortionPlugin {
        private _distortionIntensity;
        private _distortionIntensityX;
        private _distortionIntensityY;
        private _distortionCenterX;
        private _distortionCenterY;
        private _distortionScale;
        private _isEnabled;
        /**
         * Gets the distortion intensity
         */
        get distortionIntensity(): number;
        /**
         * Sets the distortion intensity
         */
        set distortionIntensity(value: number);
        /**
         * Gets the horizontal distortion intensity
         */
        get distortionIntensityX(): number;
        /**
         * Sets the horizontal distortion intensity
         */
        set distortionIntensityX(value: number);
        /**
         * Gets the vertical distortion intensity
         */
        get distortionIntensityY(): number;
        /**
         * Sets the vertical distortion intensity
         */
        set distortionIntensityY(value: number);
        /**
         * Gets the horizontal center of distortion (0-1)
         */
        get distortionCenterX(): number;
        /**
         * Sets the horizontal center of distortion (0-1)
         */
        set distortionCenterX(value: number);
        /**
         * Gets the vertical center of distortion (0-1)
         */
        get distortionCenterY(): number;
        /**
         * Sets the vertical center of distortion (0-1)
         */
        set distortionCenterY(value: number);
        /**
         * Gets the distortion scale factor
         */
        get distortionScale(): number;
        /**
         * Sets the distortion scale factor
         */
        set distortionScale(value: number);
        /**
         * Gets whether the effect is enabled
         */
        get isEnabled(): boolean;
        /**
         * Updates the enabled state based on distortion values
         */
        private _updateEnabledState;
        /**
         * Creates a new LensDistortionPlugin
         * @param options Plugin options (optional)
         */
        constructor(options?: {
            distortionIntensity?: number;
            distortionIntensityX?: number;
            distortionIntensityY?: number;
            distortionCenterX?: number;
            distortionCenterY?: number;
            distortionScale?: number;
        });
        /**
         * Gets the uniforms for the shader
         */
        getUniforms(): {
            [key: string]: {
                type: string;
                value: any;
            };
        };
        /**
         * Gets the GLSL fragment shader code for the distortion effect
         */
        getFragmentShaderCode(): string;
        /**
         * Gets the WGSL shader code for the distortion effect
         */
        getWGSLShaderCode(): string;
        /**
         * Creates a post-process version of the lens distortion effect
         * @param scene The scene to create the post-process in
         * @param camera The camera to attach the post-process to
         * @param options Post-process options
         * @returns The created post-process
         */
        static CreatePostProcess(scene: any, camera: any, options?: {
            distortionIntensity?: number;
            distortionIntensityX?: number;
            distortionIntensityY?: number;
            distortionCenterX?: number;
            distortionCenterY?: number;
            distortionScale?: number;
        }): any;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon toolkit navigation agent pro class (Unity Style Navigation Agent System)
     * @class NavigationAgent - All rights reserved (c) 2024 Mackey Kinard
     */
    class NavigationAgent extends TOOLKIT.ScriptComponent {
        static TARGET_ANGLE_FACTOR: number;
        static ANGULAR_SPEED_RATIO: number;
        static BRAKING_CUSHION_FACTOR: number;
        static GLOBAL_CROWD_INSTANCE: boolean;
        private crowd;
        private type;
        private baseOffset;
        private avoidRadius;
        private avoidHeight;
        private acceleration;
        private areaMask;
        private autoRepath;
        private autoBraking;
        private autoTraverseOffMeshLink;
        private avoidancePriority;
        private obstacleAvoidanceType;
        private distanceToTarget;
        private teleporting;
        private moveDirection;
        private resetPosition;
        private lastPosition;
        private distancePosition;
        private currentPosition;
        private currentRotation;
        private currentVelocity;
        private currentWaypoint;
        private m_navStatus;
        private m_stuckCounter;
        private m_reachObserver;
        private m_navMeshDestroyObserver;
        speed: number;
        reachRadius: number;
        heightOffset: number;
        angularSpeed: number;
        updatePosition: boolean;
        updateRotation: boolean;
        distanceEpsilon: number;
        velocityEpsilon: number;
        offMeshVelocity: number;
        stoppingDistance: number;
        minLookAtDistance: number;
        enableLookAtDistance: boolean;
        stuckFrameThreshold: number;
        updateFlags: number;
        isReady(): boolean;
        isNavigating(): boolean;
        isTeleporting(): boolean;
        isOnOffMeshLink(): boolean;
        getAgentType(): number;
        getAgentState(): number;
        getAgentIndex(): number;
        getAgentOffset(): number;
        getTargetDistance(): number;
        getCurrentPosition(): BABYLON.Vector3;
        getCurrentRotation(): BABYLON.Quaternion;
        getCurrentVelocity(): BABYLON.Vector3;
        getAgentParameters(): BABYLON.IAgentParameters;
        setAgentParameters(parameters: BABYLON.IAgentParameters): void;
        /** Gets the current navigation move status */
        getNavStatus(): TOOLKIT.NavMoveStatus;
        /** Returns true if the agent is currently stuck and unable to reach its destination */
        isStuck(): boolean;
        /** Register handler that is triggered when the agent is ready for navigation */
        onReadyObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered before the navigation update */
        onPreUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered after the navigation update */
        onPostUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered when the navigation is complete */
        onNavCompleteObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered when the agent becomes stuck */
        onNavStuckObservable: BABYLON.Observable<BABYLON.TransformNode>;
        protected m_agentState: number;
        protected m_agentIndex: number;
        protected m_agentReady: boolean;
        protected m_agentGhost: BABYLON.TransformNode;
        protected m_agentParams: BABYLON.IAgentParameters;
        protected m_agentMovement: BABYLON.Vector3;
        protected m_agentDirection: BABYLON.Vector3;
        protected m_agentQuaternion: BABYLON.Quaternion;
        protected m_agentDestination: BABYLON.Vector3;
        protected m_debugDestinationSphere: BABYLON.Mesh;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected update(): void;
        protected destroy(): void;
        private awakeNavigationAgent;
        private updateNavigationAgent;
        private getLookAtStopDistance;
        private updateAgentParameters;
        private applyAgentUpdateFlags;
        private destroyNavigationAgent;
        /** Move agent relative to current position. */
        move(offset: BABYLON.Vector3, closetPoint?: boolean): void;
        /** Teleport agent to destination point. */
        teleport(destination: BABYLON.Vector3, closetPoint?: boolean, initialRotation?: BABYLON.Quaternion): void;
        /** Sets agent current destination point. */
        setDestination(destination: BABYLON.Vector3, closetPoint?: boolean, initialRotation?: BABYLON.Quaternion): void;
        /** Sets agent current acceleration speed. */
        setAcceleration(speed: number): void;
        /** Sets agent current movement speed. */
        setMovementSpeed(speed: number): void;
        /** Sets agent current separation weight (How aggressive the agent manager should be at avoiding collisions with this agent). */
        setSeparationWeight(weight: number): void;
        /** Sets agent current path optimization range (The path visibility optimization range, larger values allow shortcuts). */
        setOptimizationRange(range: number): void;
        /** Sets agent current collision query range (Defines how close a collision element must be before it is considered for steering behaviors). */
        setCollisionQueryRange(range: number): void;
        /** Sets the Detour crowd update flags bitmask (ANTICIPATE_TURNS=1, OBSTACLE_AVOIDANCE=2,
         *  SEPARATION=4, OPTIMIZE_VIS=8, OPTIMIZE_TOPO=16). Use 0 for a single agent to avoid doorway crawl/stall. */
        setUpdateFlags(flags: number): void;
        /** Sets agent current radius. */
        setAgentRadius(radius: number): void;
        /** Sets agent current height. */
        setAgentHeight(height: number): void;
        /** Gets agent current world space velocity. */
        getAgentVelocity(): BABYLON.Vector3;
        /** Gets agent current world space velocity. */
        getAgentVelocityToRef(result: BABYLON.Vector3): void;
        /** Gets agent current world space position. */
        getAgentPosition(): BABYLON.Vector3;
        /** Gets agent current world space position. */
        getAgentPositionToRef(result: BABYLON.Vector3): void;
        /** Gets agent current waypoint position. */
        getAgentWaypoint(): BABYLON.Vector3;
        /** Gets agent current waypoint position. */
        getAgentWaypointToRef(result: BABYLON.Vector3): void;
        /** Cancel current waypoint path navigation. */
        cancelNavigation(): void;
        /**
         * Releases this agent's crowd binding so it can be safely rebuilt against a freshly baked
         * navigation mesh. A Recast crowd (dtCrowd) holds a raw pointer to the dtNavMesh it was created
         * against and is ticked every frame by the plugin's render observer; if the navMesh is freed
         * while the crowd is alive, the next crowd update reads freed WASM memory ("memory access out
         * of bounds"). Call this BEFORE destroying/rebuilding the navmesh — SceneManager.DestroyNavigationMeshData()
         * broadcasts OnNavMeshDestroyObservable to invoke it automatically. After release,
         * updateNavigationAgent() lazily recreates the crowd and re-adds the agent once new navigation
         * data is available.
         */
        releaseNavigationCrowd(): void;
        /** Gets debug destination mesh. */
        getDebugDestinationMesh(): BABYLON.Mesh;
        /** Shows or hides the debug destination mesh. */
        showDebugDestination(show: boolean): void;
    }
    /**
     *  Recast Detour Crowd Agent States
     */
    enum CrowdAgentState {
        DT_CROWDAGENT_STATE_INVALID = 0,///< The agent is not in a valid state.
        DT_CROWDAGENT_STATE_WALKING = 1,///< The agent is traversing a normal navigation mesh polygon.
        DT_CROWDAGENT_STATE_OFFMESH = 2
    }
    /**
     * Navigation agent move status — reliable states trackable via the Recast V2 API.
     * - Idle:      No destination set.
     * - Moving:    Navigating toward destination; crowd system is steering the agent.
     * - Reached:   Destination reached (driven by crowd.onReachTargetObservable + distance fallback).
     * - Stuck:     Velocity near-zero for stuckFrameThreshold consecutive frames while navigating.
     * - Cancelled: cancelNavigation() was explicitly called while Moving.
     */
    enum NavMoveStatus {
        Idle = "idle",
        Moving = "moving",
        Reached = "reached",
        Stuck = "stuck",
        Cancelled = "cancelled"
    }
}
declare namespace TOOLKIT {
    /**
     * Babylon Script Component
     * @class PostProcessor
     */
    class PostProcessor extends TOOLKIT.ScriptComponent {
        private static GlobalInstance;
        static get Instance(): PostProcessor;
        private highDynamicRange;
        private neutralToneMapping;
        private toneMappingMode;
        private defaultContrast;
        private defaultExposure;
        private defaultLookupTable;
        private colorGradingSettings;
        private bloomSettings;
        private vignetteSettings;
        private sharpenSettings;
        private grainSettings;
        private chromaticAberrationSettings;
        private depthOfFieldSettings;
        private motionBlurSettings;
        private lensDistortionSettings;
        private autoExposureSettings;
        private colorFilterPP;
        private coloredBloomPP;
        private motionBlurPP;
        private roundedVignettePP;
        private lensDistortionPP;
        private defaultRenderPipeline;
        private screenSpaceAOPipeline;
        private screenSpaceRPipeline;
        GetDefaultRenderPipeline(): BABYLON.DefaultRenderingPipeline;
        GetSSAORRenderPipeline(): BABYLON.SSAORenderingPipeline;
        GetSSRRenderPipeline(): BABYLON.SSRRenderingPipeline;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected ready(): void;
        protected parseColorGradingSettings(settings: any): any;
        protected applyColorGradingSettings(): void;
        protected mapToneMapper(tonemapperParam: any): {
            enabled: boolean;
            type: number | null;
        };
        protected parseBloomSettings(settings: any): any;
        protected applyBloomSettings(): void;
        protected parseSharpenSettings(settings: any): any;
        protected applySharpenSettings(): void;
        protected parseGrainSettings(settings: any): any;
        protected applyGrainSettings(): void;
        protected parseVignetteSettings(settings: any): any;
        protected applyVignetteSettings(): void;
        protected parseDepthOfFieldSettings(settings: any): any;
        protected applyDepthOfFieldSettings(): void;
        protected parseMotionBlurSettings(settings: any): any;
        protected applyMotionBlurSettings(): void;
        protected parseAutoExposure(settings: any): any;
        protected applyAutoExposureSettings(): void;
        protected parseLensDistortionSettings(settings: any): any;
        protected applyLensDistortionSettings(): void;
        protected parseChromaticAberrationSettings(settings: any): any;
        protected applyChromaticAberrationSettings(): void;
        protected parseAmbientOcclusionSettings(settings: any): any;
        protected parseScreenSpaceReflectionsSettings(settings: any): any;
        static unwrapParam(param: any): any;
        static extractParam(param: any): {
            value: any;
            overrideState: boolean | null;
        };
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon raycast vehicle controller pro class (Native Bullet Physics 2.82)
     * @class RaycastVehicle - All rights reserved (c) 2020 Mackey Kinard
     */
    class RaycastVehicle {
        private static TempVector;
        private static AutoSuspensionForceReserve;
        private _centerMass;
        private _chassisMesh;
        private _tempVectorPos;
        lockedWheelIndexes: number[];
        getCenterMassOffset(): BABYLON.Vector3;
        getInternalVehicle(): TOOLKIT.btRaycastVehicle;
        getUpAxis(): number;
        getRightAxis(): number;
        getForwardAxis(): number;
        getForwardVector(): BABYLON.Vector3;
        getNumWheels(): number;
        getWheelInfo(wheel: number): TOOLKIT.btWheelInfo;
        resetSuspension(): void;
        setEngineForce(power: number, wheel: number): void;
        setBrakingForce(brake: number, wheel: number): void;
        updateWheelTransform(wheel: number, interpolate: boolean): void;
        getWheelTransformPosition(wheel: number): BABYLON.Vector3;
        getWheelTransformRotation(wheel: number): BABYLON.Quaternion;
        getRawCurrentSpeedKph(): number;
        getRawCurrentSpeedMph(): number;
        getAbsCurrentSpeedKph(): number;
        getAbsCurrentSpeedMph(): number;
        getVehicleTuningSystem(): TOOLKIT.btVehicleTuning;
        getChassisWorldTransform(): BABYLON.Matrix;
        protected m_scene: BABYLON.Scene;
        protected m_vehicle: TOOLKIT.btRaycastVehicle;
        protected m_vehicleTuning: TOOLKIT.btVehicleTuning;
        protected m_vehicleRaycaster: TOOLKIT.btDefaultVehicleRaycaster;
        protected m_vehicleColliders: any[];
        protected m_tempPosition: BABYLON.Vector3;
        protected m_wheelDirectionCS0: BABYLON.Vector3;
        protected m_wheelAxleCS: BABYLON.Vector3;
        constructor(scene: BABYLON.Scene, entity: BABYLON.AbstractMesh, center: BABYLON.Vector3);
        dispose(): void;
        /** Gets the rigidbody raycast vehicle controller for the entity. Note: Wheel collider metadata informaion is required for raycast vehicle control. */
        static GetInstance(scene: BABYLON.Scene, rigidbody: TOOLKIT.RigidbodyPhysics): TOOLKIT.RaycastVehicle;
        tickVehicleController(step: number): void;
        /** Gets vehicle enable multi raycast flag using physics vehicle object. (Advanced Use Only) */
        getEnableMultiRaycast(): boolean;
        /** Sets vehicle enable multi raycast flag using physics vehicle object. (Advanced Use Only) */
        setEnableMultiRaycast(flag: boolean): void;
        /** Gets vehicle smoothed gradient speed using physics vehicle object. (Advanced Use Only) */
        getSmoothedGradientSpeed(): number;
        /** Sets vehicle smoothed gradient speed using physics vehicle object. (Advanced Use Only) */
        setSmoothedGradientSpeed(impulse: number): void;
        /** Gets vehicle maximum yaw rate at low speed using physics vehicle object. (Advanced Use Only) */
        getMaximumYawRateLow(): number;
        /** Sets vehicle maximum yaw rate at low speed using physics vehicle object. (Advanced Use Only) */
        setMaximumYawRateLow(impulse: number): void;
        /** Gets vehicle maximum yaw rate at high speed using physics vehicle object. (Advanced Use Only) */
        getMaximumYawRateHigh(): number;
        /** Sets vehicle maximum yaw rate at high speed using physics vehicle object. (Advanced Use Only) */
        setMaximumYawRateHigh(impulse: number): void;
        /** Gets vehicle angular damping using physics vehicle object. (Advanced Use Only) */
        getAngularDampingControl(): BABYLON.Vector3;
        /** Sets vehicle angular damping using physics vehicle object. (Advanced Use Only) */
        setAngularDampingControl(damping: BABYLON.Vector3): void;
        /** Gets vehicle smooth flying impulse force using physics vehicle object. (Advanced Use Only) */
        getSmoothFlyingImpulse(): number;
        /** Sets vehicle smooth flying impulse using physics vehicle object. (Advanced Use Only) */
        setSmoothFlyingImpulse(impulse: number): void;
        /** Enables or disables grounded auto leveling after wall/curb hits. (Advanced Use Only) */
        setGroundedAutoLevelEnabled(flag: boolean): void;
        /** Sets grounded auto-leveling correction strength. (Advanced Use Only) */
        setGroundedAutoLevelStrength(strength: number): void;
        /** Sets grounded auto-leveling deadzone angle in degrees. (Advanced Use Only) */
        setGroundedAutoLevelDeadzone(degrees: number): void;
        /** Sets the low-angle settle band for grounded auto-leveling in degrees. (Advanced Use Only) */
        setGroundedAutoLevelSettleDeg(degrees: number): void;
        /** Sets the strength scale used inside the grounded auto-level settle band. (Advanced Use Only) */
        setGroundedAutoLevelSettleScale(scale: number): void;
        /** Sets the hysteresis band around the grounded auto-level settle cutoff in degrees. (Advanced Use Only) */
        setGroundedAutoLevelHysteresis(degrees: number): void;
        /** Sets speed range where grounded auto-leveling ramps to full strength. (Advanced Use Only) */
        setGroundedAutoLevelSpeedRange(startKmh: number, fullKmh: number): void;
        /** Sets max grounded auto-leveling correction rate in rad/s. (Advanced Use Only) */
        setGroundedAutoLevelMaxRate(rate: number): void;
        /** Gets vehicle track connection accel force using physics vehicle object. (Advanced Use Only) */
        getTrackConnectionAccel(): number;
        /** Sets vehicle track connection accel force using physics vehicle object. (Advanced Use Only) */
        setTrackConnectionAccel(force: number): void;
        /** Sets max extra downward accel used while fully airborne at high speed. (Advanced Use Only) */
        setAirborneTrackConnectionMaxAccel(accel: number): void;
        /** Sets speed range where airborne pull-down ramps from base to max accel. (Advanced Use Only) */
        setAirborneTrackConnectionSpeedRange(startKmh: number, fullKmh: number): void;
        /** Sets airborne upward velocity damping rate. (Advanced Use Only) */
        setAirborneRiseDamping(rate: number): void;
        /** Sets hard cap on upward speed while fully airborne. 0 disables the cap. (Advanced Use Only) */
        setAirborneMaxRiseSpeed(speed: number): void;
        /** Gets vehicle min wheel contact count using physics vehicle object. (Advanced Use Only) */
        getMinimumWheelContacts(): number;
        /** Sets vehicle min wheel contact count using physics vehicle object. (Advanced Use Only) */
        setMinimumWheelContacts(contacts: number): void;
        /** Gets vehicle aerodynamic downforce coefficient N/(m/s)^2. (Advanced Use Only) */
        getDownforceCoefficient(): number;
        /** Sets vehicle aerodynamic downforce coefficient N/(m/s)^2. (Advanced Use Only) */
        setDownforceCoefficient(value: number): void;
        /** Gets vehicle constant downforce as a fraction of vehicle weight. (Advanced Use Only) */
        getConstantDownforce(): number;
        /** Sets vehicle constant downforce as a fraction of vehicle weight. (Advanced Use Only) */
        setConstantDownforce(value: number): void;
        /** Gets the internal wheel index by id string. */
        getWheelIndexByID(id: string): number;
        /** Gets the internal wheel index by name string. */
        getWheelIndexByName(name: string): number;
        /** Gets the internal wheel collider information. */
        getWheelColliderInfo(wheel: number): number;
        /** Sets the internal wheel hub transform mesh by index. Used to rotate and bounce wheels. */
        setWheelTransformMesh(wheel: number, transform: BABYLON.TransformNode): void;
        protected ensureNodeRotationQuaternion(node: BABYLON.TransformNode): BABYLON.Quaternion;
        protected normalizeWheelRotation(angle: number): number;
        protected syncWheelSpinnerRotation(wheelinfo: any): void;
        protected rebaseWheelSpinnerRotation(wheelinfo: any): void;
        /** Gets the wheel skid fade-in speed. Higher values = faster release transition (~3.0 = ~0.35s). (Advanced Use Only) */
        getWheelSkidFadeInSpeed(): number;
        /** Sets the wheel skid fade-in speed. Controls how quickly skid effect ramps up during handbrake slides. (Advanced Use Only) */
        setWheelSkidFadeInSpeed(value: number): void;
        /** Gets the wheel skid fade-out speed. Higher values = faster release transition (~3.0 = ~0.35s). (Advanced Use Only) */
        getWheelSkidFadeOutSpeed(): number;
        /** Sets the wheel skid fade-out speed. Controls how quickly skid effect ramps up during handbrake slides. (Advanced Use Only) */
        setWheelSkidFadeOutSpeed(value: number): void;
        /** Gets the arcade yaw assist active state. (Advanced Use Only) */
        isArcadeYawAssistActive(): boolean;
        /** Gets the arcade steering assist strength. (Advanced Use Only) */
        getArcadeSteeringAssist(): number;
        /** Sets the arcade steering yaw assist strength. Higher values kick the rear end around more aggressively during skids. (Advanced Use Only) */
        setArcadeSteeringAssist(value: number): void;
        /** Gets the arcade donut direct yaw enabled state. (Advanced Use Only) */
        getArcadeDonutDirectYawEnabled(): boolean;
        /** Sets the arcade donut direct yaw enabled state. (Advanced Use Only) */
        setArcadeDonutDirectYawEnabled(value: boolean): void;
        /** Gets the arcade donut direct yaw degrees per second. (Advanced Use Only) */
        getArcadeDonutDirectYawDegPerSec(): number;
        /** Sets the arcade donut direct yaw degrees per second. Higher values kick the rear end around more aggressively during skids. (Advanced Use Only) */
        setArcadeDonutDirectYawDegPerSec(value: number): void;
        /** Gets the arcade handbrake yaw cap multiplier. (Advanced Use Only) */
        getArcadeHandbrakeYawCapMultiplier(): number;
        /** Sets the arcade handbrake yaw cap multiplier. Higher values kick the rear end around more aggressively during skids. (Advanced Use Only) */
        setArcadeHandbrakeYawCapMultiplier(value: number): void;
        /** Gets the arcade burnout yaw cap multiplier. (Advanced Use Only) */
        getArcadeBurnoutYawCapMultiplier(): number;
        /** Sets the arcade burnout yaw cap multiplier. Higher values kick the rear end around more aggressively during skids. (Advanced Use Only) */
        setArcadeBurnoutYawCapMultiplier(value: number): void;
        /** Gets the arcade donut yaw cap multiplier. (Advanced Use Only) */
        getArcadeDonutYawCapMultiplier(): number;
        /** Sets the arcade donut yaw cap multiplier. Higher values kick the rear end around more aggressively during skids. (Advanced Use Only) */
        setArcadeDonutYawCapMultiplier(value: number): void;
        getArcadeBurnoutActive(): boolean;
        setArcadeBurnoutActive(active: boolean): void;
        getArcadeDonutActive(): boolean;
        setArcadeDonutActive(active: boolean): void;
        getArcadeFootBrakeActive(): boolean;
        setArcadeFootBrakeActive(active: boolean): void;
        getArcadeHandBrakeActive(): boolean;
        setArcadeHandBrakeActive(active: boolean): void;
        /** Sets vehicle arcade burnout direction change speed using physics vehicle object. (Advanced Use Only) */
        setArcadeBurnoutDirectionChangeSpeed(mph: number): void;
        /** Gets an approximate wheelbase length in meters for the vehicle. Used for some advanced handling calculations. */
        getApproxWheelbaseMeters(): number;
        /** Gets the signed front wheel steering angle in radians. Used for some advanced handling calculations. */
        getSignedFrontSteeringAngleRad(): number;
        getVisualSteeringAngle(wheel: number): number;
        setVisualSteeringAngle(angle: number, wheel: number): void;
        getPhysicsSteeringAngle(wheel: number): number;
        setPhysicsSteeringAngle(angle: number, wheel: number): void;
        protected setupWheelInformation(): void;
        private applyAutoSuspensionForce;
        private getWheelForwardPosition;
        /** Returns true when the wheel is slipping from normal tire saturation only, excluding arcade handbrake/burnout/donut states and the protected post-handbrake release window. */
        getNaturalWheelSlip(wheelIndex: number): boolean;
        /** Gets the chassis-center linear speed threshold (km/h) below which the
         *  visual wheel rotation update is suppressed (when no arcade mode is
         *  active). 0 disables the suppression entirely.
         *  Use this if you see residual wheel spin after a handbrake/burnout/donut
         *  combo brings the car to a stop — chassis yaw can keep bleeding off and
         *  drive `groundAngularVelocity` for a fraction of a second otherwise. */
        getWheelAtRestSpeedThresholdKmh(): number;
        /** Sets the chassis-center linear speed threshold (km/h) below which the
         *  visual wheel rotation update is suppressed (when no arcade mode is
         *  active). 0 disables the suppression. */
        setWheelAtRestSpeedThresholdKmh(value: number): void;
        /** Updates the wheel hub transforms to match the current wheel state. Call this after any physics step that may have changed the wheel state, or after changing wheel properties. */
        updateWheelInformation(): void;
        protected lockedWheelInformation(wheel: number): boolean;
        protected deleteWheelInformation(): void;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon full rigidbody physics standard class (Native Havok Physics Engine)
     * @class RigidbodyPhysics - All rights reserved (c) 2024 Mackey Kinard
     */
    class RigidbodyPhysics extends TOOLKIT.ScriptComponent {
        static PHYSICS_STEP_TIME: number;
        private static RaycastResult;
        private static LocalShapeResult;
        private static WorldShapeResult;
        private static RaycastDestination;
        private _isKinematic;
        private _centerOfMass;
        protected m_raycastVehicle: TOOLKIT.RaycastVehicle;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected update(): void;
        protected fixed(): void;
        protected destroy(): void;
        protected awakeRigidbodyState(): void;
        protected updateRigidbodyState(): void;
        protected fixedRigidbodyState(): void;
        protected destroyRigidbodyState(): void;
        /** Checks if rigidbody is kinematic. */
        isKinematic(): boolean;
        /** Checks if rigidbody has wheel collider metadata for the entity. Note: Wheel collider metadata informaion is required for vehicle control. */
        hasWheelColliders(): boolean;
        /** Get the raycast vehicle component */
        getRaycastVehicle(): any;
        /** Get the current havok instance from the global stack */
        static GetHavokInstance(): any;
        /**
         * Performs a raycast from a given start point in the given direction and length and stores the result in a reusable PhysicsRaycastResult object.
         * @param origin - The start point of the raycast.
         * @param direction - The direction of the raycast.
         * @param length - The lenght of the raycast.
         * @param query - The raycast query options. @see IRaycastQuery
         * @returns a reused raycast result @see PhysicsRaycastResult
         */
        static Raycast(origin: BABYLON.Vector3, direction: BABYLON.Vector3, length: number, query?: BABYLON.IRaycastQuery): BABYLON.PhysicsRaycastResult;
        /**
         * Performs a shapecast with a specific orientation, cast it from the start to end position specified by the query given and stores the result in a reusable ShapeCastResult objects.
         * @param query the query to perform. @see TOOLKIT.IPhysicsShapeCastQuery
         * @returns a reused shapecast result @see TOOLKIT.IPhysicsShapeCastResult
         */
        static Shapecast(query: TOOLKIT.IPhysicsShapeCastQuery): TOOLKIT.IPhysicsShapeCastResult;
        /**
         * Performs a raycast from a given start point to a given end point and stores the result in a given PhysicsRaycastResult object.
         *
         * @param from - The start point of the raycast.
         * @param to - The end point of the raycast.
         * @param result - The PhysicsRaycastResult object to store the result of the raycast.
         * @param query - The raycast query options. See [[IRaycastQuery]] for more information.
         *
         * Performs a raycast. It takes in two points, from and to, and a PhysicsRaycastResult object to store the result of the raycast.
         * It then performs the raycast and stores the hit data in the PhysicsRaycastResult object.
         */
        static RaycastToRef(from: BABYLON.Vector3, to: BABYLON.Vector3, result: BABYLON.PhysicsRaycastResult, query?: BABYLON.IRaycastQuery): void;
        /**
         * Given a shape in a specific orientation, cast it from the start to end position specified by the query, and return the first hit.
         * @param query the query to perform. @see TOOLKIT.IPhysicsShapeCastQuery
         * @param localShapeResult contact point on input shape, in input shape space
         * @param worldShapeResult contact point on hit shape, in world space
         */
        static ShapecastToRef(query: TOOLKIT.IPhysicsShapeCastQuery, localShapeResult: BABYLON.ShapeCastResult, worldShapeResult: BABYLON.ShapeCastResult): void;
        /** Set the maximum physics velocites */
        static SetMaxVelocities(maxLinVel: number, maxAngVel: number): void;
        static PhysicsShapeCache: any;
        static NewPhysicsShapeCount: number;
        static CachedPhysicsShapeCount: number;
        static DebugPhysicsViewer: any;
        static OnSetupPhysicsPlugin: (scene: BABYLON.Scene) => void;
        static ConfigurePhysicsEngine(scene: BABYLON.Scene, fixedTimeStep?: boolean, subTimeStep?: number, maxWorldSweep?: number, ccdEnabled?: boolean, ccdPenetration?: number, gravityLevel?: BABYLON.Vector3): Promise<void>;
        static SetupPhysicsComponent(scene: BABYLON.Scene, entity: BABYLON.TransformNode): void;
        protected static GetPhysicsMaterialCombine(unity: number): number;
        protected static GetCachedPhysicsMeshShape(scene: BABYLON.Scene, entity: BABYLON.TransformNode, meshkey: string, staticfriction: number, dynamicfriction: number, restitution: number, fcombine: number, rcombine: number, layer: number, filter: number): BABYLON.PhysicsShapeMesh;
        protected static GetCachedPhysicsConvexHullShape(scene: BABYLON.Scene, entity: BABYLON.TransformNode, meshkey: string, staticfriction: number, dynamicfriction: number, restitution: number, fcombine: number, rcombine: number, layer: number, filter: number): BABYLON.PhysicsShapeConvexHull;
        protected static GetCachedPhysicsBoxShape(scene: BABYLON.Scene, trigger: boolean, staticfriction: number, dynamicfriction: number, restitution: number, fcombine: number, rcombine: number, layer: number, filter: number): BABYLON.PhysicsShapeBox;
        protected static GetCachedPhysicsSphereShape(scene: BABYLON.Scene, trigger: boolean, staticfriction: number, dynamicfriction: number, restitution: number, fcombine: number, rcombine: number, layer: number, filter: number): BABYLON.PhysicsShapeSphere;
        protected static GetCachedPhysicsCapsuleShape(scene: BABYLON.Scene, trigger: boolean, staticfriction: number, dynamicfriction: number, restitution: number, fcombine: number, rcombine: number, layer: number, filter: number): BABYLON.PhysicsShapeCapsule;
        protected static GetCachedPhysicsCylinderShape(scene: BABYLON.Scene, trigger: boolean, staticfriction: number, dynamicfriction: number, restitution: number, fcombine: number, rcombine: number, layer: number, filter: number): BABYLON.PhysicsShapeCylinder;
        protected static CreateStandardPhysicsShapeAndBody(scene: BABYLON.Scene, entity: BABYLON.TransformNode, metadata: any, impostortype: number, istrigger: boolean, istruestatic: boolean, motiontype: BABYLON.PhysicsMotionType, mass: number, staticfriction: number, dynamicfriction: number, restitution: number, fcombine: number, rcombine: number, terraindata: any, com: any, persist: boolean, layer: number, filter: number): void;
        protected static CreateCompoundPhysicsShapeAndBody(scene: BABYLON.Scene, root: BABYLON.TransformNode, entity: BABYLON.TransformNode, element: any, impostortype: number, staticfriction: number, dynamicfriction: number, restitution: number, fcombine: number, rcombine: number, sitems: TOOLKIT.PhyscisContainerData[], item: TOOLKIT.PhyscisContainerData, center: any, complex: boolean, trigger: boolean, persist: boolean, layer: number, filter: number): void;
        protected static CreateHeightFieldTerrainShapeFromMesh(terrainMesh: BABYLON.Mesh, scaleX: number, scaleZ: number): any;
        static GetPhysicsHeapSize(): number;
        static ConfigRigidbodyPhysics(scene: BABYLON.Scene, entity: BABYLON.TransformNode, child: boolean, trigger: boolean, physics: any, mass: number, com: BABYLON.Vector3): void;
        static CreatePhysicsMetadata(mass: number, drag?: number, angularDrag?: number, centerMass?: BABYLON.Vector3): any;
        static CreateCollisionMetadata(type: string, trigger?: boolean, convexmesh?: boolean, restitution?: number, dynamicfriction?: number, staticfriction?: number): any;
        static CreatePhysicsProperties(mass: number, drag?: number, angularDrag?: number, useGravity?: boolean, isKinematic?: boolean): any;
        /**
         * Utility to add a child shape to the specified container,
         * automatically computing the relative transform between
         * the container shape and the child instance.
         *
         * @param containerShape The specified physics shape container
         * @param parentTransform The transform node associated with the shape
         * @param newChild The new PhysicsShape to add
         * @param childTransform The transform node associated with the child shape
         */
        protected static AddChildShapeFromParent(containerShape: BABYLON.PhysicsShape, parentTransform: BABYLON.TransformNode, newChild: BABYLON.PhysicsShape, childTransform: BABYLON.TransformNode): void;
        /**
         * No-Imposter type
         */
        static NoImpostor: number;
        /**
         * Sphere-Imposter type
         */
        static SphereImpostor: number;
        /**
         * Box-Imposter type
         */
        static BoxImpostor: number;
        /**
         * Plane-Imposter type
         */
        static PlaneImpostor: number;
        /**
         * Mesh-imposter type (Only available to objects with vertices data)
         */
        static MeshImpostor: number;
        /**
         * Capsule-Impostor type (Ammo.js plugin only)
         */
        static CapsuleImpostor: number;
        /**
         * Cylinder-Imposter type
         */
        static CylinderImpostor: number;
        /**
         * Particle-Imposter type
         */
        static ParticleImpostor: number;
        /**
         * Heightmap-Imposter type
         */
        static HeightmapImpostor: number;
        /**
         * ConvexHull-Impostor type (Ammo.js plugin only)
         */
        static ConvexHullImpostor: number;
        /**
         * Custom-Imposter type (Ammo.js plugin only)
         */
        static CustomImpostor: number;
        /**
         * Rope-Imposter type
         */
        static RopeImpostor: number;
        /**
         * Cloth-Imposter type
         */
        static ClothImpostor: number;
        /**
         * Softbody-Imposter type
         */
        static SoftbodyImpostor: number;
        private static _factorAngVel;
        private static _factorLinVel;
        private static _factorLocalVel;
        private static _dampingAngVel;
        private static _dampingLinVel;
        private static _dampingLocalVel;
        private static _tempMatrix;
        /**
         * Exact equivalent of Bullet Physics btRigidBody::setDamping(linearDamping, angularDamping).
         *
         * In Bullet, damping is applied per-step as: velocity *= pow(1 - damping, timeStep)
         * This creates an exponential decay that smoothly reduces velocity over time.
         *
         * Babylon.js/Havok PhysicsBody already has setLinearDamping() and setAngularDamping()
         * which provide the same functionality. This utility wraps them in a single call
         * matching Bullet's API for easy porting.
         *
         * @param body - The Babylon.js PhysicsBody to apply damping to
         * @param linearDamping - Linear velocity damping (0.0 = no damping, 1.0 = full damping).
         *                       Typical values: 0.0-0.1 for vehicles, 0.3-0.5 for floating objects
         * @param angularDamping - Angular velocity damping (0.0 = no damping, 1.0 = full damping).
         *                        Typical values: 0.05-0.3 for normal objects, 0.5-0.9 for vehicles
         *                        that should resist unwanted rotation.
         *                        Higher values prevent the car from rotating freely — only
         *                        Ackerman steering forces and direct physics contacts will turn it.
         */
        static SetDamping: (body: BABYLON.PhysicsBody, linearDamping: number, angularDamping: number) => void;
        /**
         * Get the current linear and angular damping values from a PhysicsBody.
         * Equivalent to Bullet's btRigidBody::getLinearDamping() / getAngularDamping().
         *
         * @param body - The Babylon.js PhysicsBody to query
         * @returns Object with linearDamping and angularDamping values
         */
        static GetDamping: (body: BABYLON.PhysicsBody) => {
            linearDamping: number;
            angularDamping: number;
        };
        /**
         * Apply Bullet-style per-step damping manually. Use this when you need frame-rate-independent
         * damping that exactly matches Bullet's btRigidBody::applyDamping(timeStep).
         *
         * Bullet formula: velocity *= pow(1 - damping, timeStep)
         *
         * This is useful for per-axis damping control that Havok's built-in setAngularDamping
         * doesn't provide (Havok applies uniform damping to all axes).
         *
         * @param body - The PhysicsBody to damp
         * @param linearDamping - Linear damping coefficient (0.0-1.0)
         * @param angularDamping - Angular damping coefficient (0.0-1.0)
         * @param timeStep - Physics time step (typically 1/60)
         */
        static ApplyDamping: (body: BABYLON.PhysicsBody, linearDamping: number, angularDamping: number, timeStep: number) => void;
        /**
         * Apply Bullet-style per-step damping with per-axis control for angular velocity.
         * This allows damping pitch and roll differently from yaw — essential for vehicles
         * where you want to prevent unwanted pitch/roll wobble but preserve yaw for steering.
         *
         * @param body - The PhysicsBody to damp
         * @param angularDampingX - Pitch damping (local X axis). Higher = less pitch wobble.
         * @param angularDampingY - Yaw damping (local Y axis). Higher = less free yaw rotation.
         * @param angularDampingZ - Roll damping (local Z axis). Higher = less roll wobble.
         * @param timeStep - Physics time step (typically 1/60)
         */
        static ApplyPerAxisAngularDamping: (body: BABYLON.PhysicsBody, angularDampingX: number, angularDampingY: number, angularDampingZ: number, timeStep: number) => void;
        /**
         * Exact equivalent of Bullet Physics btRigidBody::setAngularFactor(btVector3).
         *
         * In Bullet, this is applied every integration step in btRigidBody::integrateVelocities():
         *   m_angularVelocity += m_invInertiaTensorWorld * m_totalTorque * step;
         *   m_angularVelocity *= m_angularFactor;  // <-- THIS is what setAngularFactor controls
         *
         * Each component is a per-axis multiplier applied DIRECTLY to angular velocity every step:
         *   0.0 = completely locked (NO rotation allowed on this axis)
         *   0.5 = half the angular velocity survives each step (strong resistance)
         *   1.0 = fully free (normal physics behavior)
         *
         * KEY DIFFERENCE FROM setAngularDamping / SetDamping:
         *   - SetDamping uses exponential decay: velocity *= pow(1-damping, dt). Gradual slowdown, never fully stops.
         *   - SetAngularFactor is a DIRECT multiplier: velocity *= factor. A factor of 0.0 = instant zero velocity.
         *
         * KEY DIFFERENCE FROM setting inertia to 0 (the current workaround):
         *   - Inertia=0 makes the body infinitely resistant to NEW torques on that axis,
         *     but doesn't clamp EXISTING angular velocity from prior frames or impulses.
         *   - SetAngularFactor zeroes out angular velocity every step regardless of source.
         *     Even if an impulse or collision adds angular velocity, it's removed next step.
         *
         * WORKS IN LOCAL CHASSIS SPACE (body-relative axes):
         *   X = pitch (nose up/down)
         *   Y = yaw (steering/turning left/right)
         *   Z = roll (lean left/right)
         *
         * Common vehicle configurations:
         *   SetAngularFactor(body, 1, 1, 1)     - Fully free (default, no constraint)
         *   SetAngularFactor(body, 0, 1, 0)     - Only yaw allowed (prevents pitch & roll)
         *   SetAngularFactor(body, 0.3, 1, 0.3) - Mostly locked pitch/roll, free yaw (arcade racing)
         *   SetAngularFactor(body, 0, 0, 0)     - Completely locked (no rotation at all)
         *   SetAngularFactor(body, 1, 0, 1)     - Free pitch/roll, locked yaw (unusual but possible)
         *
         * @param body - The Babylon.js PhysicsBody to constrain
         * @param factorX - Pitch axis multiplier (0.0 = locked, 1.0 = free)
         * @param factorY - Yaw axis multiplier (0.0 = locked, 1.0 = free)
         * @param factorZ - Roll axis multiplier (0.0 = locked, 1.0 = free)
         */
        static SetAngularFactor: (body: BABYLON.PhysicsBody, factorX: number, factorY: number, factorZ: number) => void;
        /**
         * Exact equivalent of Bullet Physics btRigidBody::setLinearFactor(btVector3).
         *
         * In Bullet, this is applied every integration step in btRigidBody::integrateVelocities():
         *   m_linearVelocity += m_totalForce * (m_inverseMass * step);
         *   m_linearVelocity *= m_linearFactor;  // <-- THIS is what setLinearFactor controls
         *
         * Each component is a per-axis multiplier applied DIRECTLY to linear velocity every step:
         *   0.0 = completely locked (NO movement allowed on this axis)
         *   0.5 = half the linear velocity survives each step (strong resistance)
         *   1.0 = fully free (normal physics behavior)
         *
         * WORKS IN WORLD SPACE (matching Bullet's behavior):
         *   X = world left/right
         *   Y = world up/down
         *   Z = world forward/back
         *
         * Common configurations:
         *   SetLinearFactor(body, 1, 1, 1)   - Fully free (default)
         *   SetLinearFactor(body, 1, 0, 1)   - Locked vertical (2D game on XZ plane)
         *   SetLinearFactor(body, 1, 1, 0)   - Locked depth (2D game on XY plane)
         *   SetLinearFactor(body, 0, 0, 0)   - Completely locked (no translation)
         *
         * NOTE: Unlike SetAngularFactor which works in body-local space, SetLinearFactor
         * works in WORLD space, matching Bullet's implementation where linear factor is
         * applied to the world-space linear velocity directly.
         *
         * @param body - The Babylon.js PhysicsBody to constrain
         * @param factorX - World X axis multiplier (0.0 = locked, 1.0 = free)
         * @param factorY - World Y axis multiplier (0.0 = locked, 1.0 = free)
         * @param factorZ - World Z axis multiplier (0.0 = locked, 1.0 = free)
         */
        static SetLinearFactor: (body: BABYLON.PhysicsBody, factorX: number, factorY: number, factorZ: number) => void;
        /**
         * Combined SetAngularFactor + SetLinearFactor in a single call.
         * Matches calling both btRigidBody::setAngularFactor() and btRigidBody::setLinearFactor()
         * in the same integration step.
         *
         * IMPORTANT: Must be called every physics step (e.g., in updateVehicle) to maintain
         * the constraint, just like Bullet applies factors every integrateVelocities() call.
         *
         * @param body - The Babylon.js PhysicsBody to constrain
         * @param linearFactor - World-space linear velocity factors (x, y, z)
         * @param angularFactor - Local-space angular velocity factors (x=pitch, y=yaw, z=roll)
         */
        static SetFactors: (body: BABYLON.PhysicsBody, linearFactor: BABYLON.Vector3, angularFactor: BABYLON.Vector3) => void;
    }
    class PhyscisContainerData {
        shape: BABYLON.PhysicsShape;
        translation: BABYLON.Vector3;
        rotation: BABYLON.Quaternion;
        scale: BABYLON.Vector3;
    }
    interface IPhysicsShapeCastResult {
        local: BABYLON.ShapeCastResult;
        world: BABYLON.ShapeCastResult;
    }
    interface IPhysicsShapeCastQuery {
        /**
         * The shape to query with
         */
        shape: BABYLON.PhysicsShape;
        /**
         * The rotation of the shape
         */
        rotation: BABYLON.Quaternion;
        /**
         * The start position of the query
         */
        startPosition: BABYLON.Vector3;
        /**
         * The end position of the query
         */
        endPosition: BABYLON.Vector3;
        /**
         * Should trigger collisions be considered in the query?
         */
        shouldHitTriggers: boolean;
        /**
         * Ignores the body passed if it is in the query
         */
        ignoreBody?: BABYLON.PhysicsBody;
    }
}
declare namespace TOOLKIT {
    class RoundedVignettePlugin {
        static CreatePostProcess(scene: BABYLON.Scene, camera: BABYLON.Camera, options?: {
            color?: number[] | BABYLON.Color3 | BABYLON.Color4;
            center?: number[];
            intensity?: number;
            smoothness?: number;
            rounded?: boolean;
            blendMode?: string | number;
        }): BABYLON.PostProcess;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon shuriken particle system pro class (Unity Style Shuriken Particle System)
     *
     * GLTF-STYLE MINIMAL SERIALIZATION:
     *
     * This class implements a GLTF-style approach to particle system data serialization.
     * The Unity C# exporter (UnityParticleSystemExporter.cs) handles minimal serialization
     * at export time, only including properties that differ from defaults in GLTF extras.
     * This dramatically reduces file sizes for typical particle systems.
     *
     * UNITY C# EXPORTER INTEGRATION:
     *
     * The Unity exporter now handles minimal serialization automatically:
     *
     * // In Unity C# - automatic minimal serialization
     * var minimalData = UnityParticleSystemExporter.ExportParticleSystem(particleSystem);
     * gltfExtras.particleSystem = minimalData; // Already minimized!
     *
     * // Analysis of size savings
     * UnityParticleSystemExporter.AnalyzeSerializationSavings(particleSystem);
     *
     * RUNTIME USAGE:
     *
     * The runtime automatically merges user properties with defaults, so you always
     * get a complete particle system configuration regardless of how minimal the
     * serialized data is. No additional work needed!
     *
     * SIZE REDUCTION BENEFITS:
     * • 70-90% smaller GLTF files for typical particle systems
     * • Only changed properties stored in GLTF extras
     * • Runtime merges with defaults seamlessly
     * • Follows GLTF 2.0 specification patterns
     *
     * ENHANCED UNITY SUPPORT (2025):
     * Added comprehensive support for Unity Main Module properties:
     * • customSimulationSpace - Custom transform coordinate space
     * • emitterVelocity - Tracks emitter movement for velocity inheritance
     * • gravitySource - 2D vs 3D physics gravity modes
     * • useUnscaledTime - Unscaled time for consistent behavior
     *
     * @class ShurikenParticles - All rights reserved (c) 2024 Mackey Kinard
     */
    class ShurikenParticles extends TOOLKIT.ScriptComponent {
        private static DefaultParticleTexture;
        private static readonly DEFAULT_PARTICLE_PROPERTIES;
        private m_particleSystem;
        private m_emitterMesh;
        private m_systemProperties;
        private m_isInitialized;
        private m_playOnAwake;
        private m_autoStart;
        private m_systemTime;
        private m_isLooping;
        private m_duration;
        private m_emissionTimer;
        private m_burstTimers;
        private m_prewarm;
        private m_startDelay;
        private m_simulationSpeed;
        private m_scalingMode;
        private m_emitterVelocityMode;
        private m_customSimulationSpace;
        private m_emitterVelocity;
        private m_gravitySource;
        private m_useUnscaledTime;
        private m_reportedDeltaTime;
        private m_isSystemRunning;
        private m_cullingMode;
        private m_isVisible;
        private m_pausedTime;
        private m_lastVisibilityCheck;
        private static readonly UNITY_TO_BABYLON_SIZE_RATIO;
        private static readonly UNITY_TO_BABYLON_GRAVITY_RATIO;
        private static readonly UNITY_TO_BABYLON_EMIT_RATE_RATIO;
        private static readonly UNITY_TO_BABYLON_EMIT_POWER_RATIO;
        private static readonly UNITY_TO_BABYLON_CONE_SCALE_RATIO;
        private static readonly UNITY_TO_BABYLON_LIFETIME_RATIO;
        private static readonly UNITY_TO_BABYLON_DEATH_FADE_ALPHA;
        static EMITTER_POSITION_OFFSET: BABYLON.Vector3;
        static EMITTER_ROTATION_OFFSET: BABYLON.Vector3;
        private m_animationCurves;
        private m_gradients;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        /** Get the underlying Babylon particle system */
        getParticleSystem(): BABYLON.ParticleSystem | BABYLON.GPUParticleSystem;
        /** Get the emitter mesh */
        getEmitterMesh(): BABYLON.AbstractMesh;
        /** Start the particle system */
        private internalPlay;
        /** Start the particle system */
        play(): void;
        /** Stop the particle system */
        stop(): void;
        /** Pause the particle system */
        pause(): void;
        /** Reset the particle system */
        reset(): void;
        /** Check if the system is playing */
        isPlaying(): boolean;
        /** Get current particle count */
        getParticleCount(): number;
        /** Get custom simulation space transform ID */
        getCustomSimulationSpace(): number;
        /** Get emitter velocity vector */
        getEmitterVelocity(): BABYLON.Vector3;
        /** Get gravity source mode (0=3D Physics, 1=2D Physics) */
        getGravitySource(): number;
        /** Get whether unscaled time is used */
        getUseUnscaledTime(): boolean;
        /** Get Unity's reported simulation delta time (read-only timing information) */
        getCustomDeltaTime(): number;
        /** Get Unity's reported simulation delta time (read-only timing information) */
        getReportedDeltaTime(): number;
        /**
         * Get the effective delta time that would be used for particle simulation this frame
         * This applies all Unity timing configurations: custom deltaTime, useUnscaledTime, and simulationSpeed
         */
        getEffectiveDeltaTime(): number;
        /**
         * Calculate Unity start delay value based on curve mode and multiplier
         * Unity startDelay supports only TWO modes:
         * - Mode 0 (Constant): Use curve.constant directly
         * - Mode 2 (TwoConstants): Use curve.constantMin/constantMax directly
         *
         * IMPORTANT: Note: Unity's startDelayMultiplier is NOT USED For startDelay mode 0 = constant or mode 2 = two constants
         * - Do NOT multiply by startDelayMultiplier ever!
         */
        private calculateStartDelay;
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        /**
         * Determine if particle system should simulate this frame based on culling mode
         */
        private shouldSimulateThisFrame;
        protected late(): void;
        protected step(): void;
        protected fixed(): void;
        protected after(): void;
        protected destroy(): void;
        /**
         * Merges user properties with defaults to create complete particle system configuration.
         * Only non-default values need to be serialized in GLTF extras.
         * @param userProperties Properties from GLTF export (only changed values)
         * @returns Complete particle system properties with defaults filled in
         */
        private static mergeWithDefaults;
        /**
         * Deep merge two objects, with source overriding target values
         * @param target Default values object
         * @param source User-provided values object
         * @returns Merged object
         */
        private static deepMerge;
        /**
         * Gets a property value with fallback to default
         * @param path Property path (e.g., "main.startLifetime.constant")
         * @param userProps User properties
         * @returns Property value or default
         */
        private static getPropertyWithDefault;
        /**
         * Utility for Unity C# exporters: Compare particle system properties against defaults
         * to determine which properties need to be serialized in GLTF extras.
         * @param fullProperties Complete particle system properties
         * @returns Object containing only properties that differ from defaults
         */
        static getMinimalSerializationData(fullProperties: any): any;
        /**
         * Recursively extracts differences between two objects
         * @param source Full properties object
         * @param defaults Default values object
         * @returns Object containing only differing properties
         */
        private static extractDifferences;
        /**
         * Deep array equality comparison
         * @param arr1 First array
         * @param arr2 Second array
         * @returns True if arrays are deeply equal
         */
        private static arraysEqual;
        /**
         * Gets the default particle system properties (for reference by Unity exporters)
         * @returns Complete default properties object
         */
        static getDefaultProperties(): TOOLKIT.IParticleSystemProperties;
        private initializeParticleSystem;
        private shouldUseGPUParticles;
        private createEmitterMesh;
        private createDefaultParticleTexture;
        private createCPUParticleSystem;
        private createGPUParticleSystem;
        private configureMainModule;
        private configureEmissionModule;
        private configureShapeModule;
        private configureRendererModule;
        private implementStretchRendering;
        private implementConstrainedBillboarding;
        private implementMeshRendering;
        private implementParticleSorting;
        private implementParticleAlignment;
        private implementParticleFlipping;
        private implementParticlePivot;
        private implementParticleRoll;
        private implementVelocityScaling;
        private implementNormalDirection;
        private implementFreeformStretching;
        private implementMaskInteraction;
        private implementStretchRotation;
        private implementShadowBias;
        private implementMultiMeshRendering;
        private implementCustomVertexStreams;
        private implementTrailMaterial;
        private implementMaterialConfiguration;
        private implementShadowConfiguration;
        private implementProbeConfiguration;
        private implementGPUInstancing;
        private implementSortingLayer;
        private configureVelocityOverLifetimeModule;
        private configureLimitVelocityOverLifetimeModule;
        private configureColorOverLifetimeModule;
        private configureSizeOverLifetimeModule;
        private configureRotationOverLifetimeModule;
        private configureTextureSheetAnimationModule;
        private ensureBasicConfiguration;
        private convertMinMaxCurve;
        private convertMinMaxGradient;
        private convertColor;
        private colorsEqual;
        /**
         * Convert Unity gradient to BabylonJS color gradients
         * @param gradient Unity gradient data
         * @param particleSystem BabylonJS particle system to add gradients to
         * @returns True if gradient was successfully applied
         */
        private applyUnityGradientToBabylon;
        private convertVector3;
        private evaluateCurveAtTime;
        private setupBursts;
        private resetBurstTimers;
        private updateSystem;
        private updateEmission;
        private updateAnimationProperties;
        private updateBursts;
        private triggerBurst;
        private configureEmissionShape;
        private setupVelocityOverLifetime;
        private setupLimitVelocity;
        private createColorGradient;
        private setupSpriteAnimation;
        private createBoxShapeEmitter;
        private createSphereShapeEmitter;
        private createConeShapeEmitter;
        private configureNoiseModule;
        private configureCollisionModule;
        private configureTrailsModule;
        private configureSubEmittersModule;
        /**
         * Apply emitter velocity inheritance to newly spawned particles
         * Unity: When emitter moves, particles can inherit velocity from the movement
         */
        private updateEmitterVelocityInheritance;
        /**
         * Handle custom simulation space coordinate transformation
         * Unity: Particles can be simulated relative to a custom transform's coordinate space
         */
        private updateCustomSimulationSpace;
        /**
         * Handle ring buffer mode particle lifetime looping
         * Unity: Particles can loop their lifetime instead of dying when exceeding maxLifetime
         */
        private updateRingBufferMode;
        /**
         * Handle Unity stop action when particle system completes
         * Unity: Defines what happens when system stops and all particles die
         */
        private handleStopAction;
        /**
         * Set up visibility checking for camera frustum culling
         * Monitors whether particle system is visible to determine simulation behavior
         */
        private setupCullingVisibilityCheck;
        /**
         * Check if particle system emitter is visible to any active camera
         */
        private isEmitterVisible;
        /**
         * Handle visibility state changes for different culling modes
         */
        private handleVisibilityChange;
        private disposeParticleSystem;
    }
    interface IParticleSystemMinMaxCurve {
        mode: number;
        constant: number;
        constantMin: number;
        constantMax: number;
        multiplier: number;
        curve?: IParticleSystemAnimationCurve;
        curveMin?: IParticleSystemAnimationCurve;
        curveMax?: IParticleSystemAnimationCurve;
    }
    interface IParticleSystemMinMaxGradient {
        mode: number;
        color: IParticleSystemColor;
        colorMin: IParticleSystemColor;
        colorMax: IParticleSystemColor;
        gradient?: IParticleSystemGradient;
        gradientMin?: IParticleSystemGradient;
        gradientMax?: IParticleSystemGradient;
    }
    interface IParticleSystemAnimationCurve {
        length: number;
        preWrapMode: number;
        postWrapMode: number;
        keys: IParticleSystemKeyframe[];
    }
    interface IParticleSystemKeyframe {
        time: number;
        value: number;
        inTangent: number;
        outTangent: number;
        inWeight: number;
        outWeight: number;
        weightedMode: number;
    }
    interface IParticleSystemGradient {
        mode: number;
        colorKeys: IParticleSystemColorKey[];
        alphaKeys: IParticleSystemAlphaKey[];
    }
    interface IParticleSystemColorKey {
        color: IParticleSystemColor;
        time: number;
    }
    interface IParticleSystemAlphaKey {
        alpha: number;
        time: number;
    }
    interface IParticleSystemColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    interface IParticleSystemVector2 {
        x: number;
        y: number;
    }
    interface IParticleSystemVector3 {
        x: number;
        y: number;
        z: number;
    }
    interface IParticleSystemTransform {
        name: string;
        instanceId: number;
        position: IParticleSystemVector3;
        rotation: IParticleSystemVector3;
        scale: IParticleSystemVector3;
    }
    interface IParticleSystemBurst {
        time: number;
        count: IParticleSystemMinMaxCurve;
        cycleCount: number;
        repeatInterval: number;
        probability: number;
    }
    interface IParticleSystemMainModule {
        duration: number;
        loop: boolean;
        prewarm: boolean;
        startDelay: IParticleSystemMinMaxCurve;
        startDelayMultiplier: number;
        startLifetime: IParticleSystemMinMaxCurve;
        startLifetimeMultiplier: number;
        startSpeed: IParticleSystemMinMaxCurve;
        startSpeedMultiplier: number;
        startSize3D: boolean;
        startSize: IParticleSystemMinMaxCurve;
        startSizeMultiplier: number;
        startSizeX: IParticleSystemMinMaxCurve;
        startSizeXMultiplier: number;
        startSizeY: IParticleSystemMinMaxCurve;
        startSizeYMultiplier: number;
        startSizeZ: IParticleSystemMinMaxCurve;
        startSizeZMultiplier: number;
        startRotation3D: boolean;
        startRotation: IParticleSystemMinMaxCurve;
        startRotationMultiplier: number;
        startRotationX: IParticleSystemMinMaxCurve;
        startRotationXMultiplier: number;
        startRotationY: IParticleSystemMinMaxCurve;
        startRotationYMultiplier: number;
        startRotationZ: IParticleSystemMinMaxCurve;
        startRotationZMultiplier: number;
        flipRotation: number;
        startColor: IParticleSystemMinMaxGradient;
        gravityModifier: IParticleSystemMinMaxCurve;
        gravityModifierMultiplier: number;
        simulationSpace: number;
        simulationSpeed: number;
        deltaTime: number;
        scalingMode: number;
        playOnAwake: boolean;
        emitterVelocityMode: number;
        maxParticles: number;
        stopAction: number;
        cullingMode: number;
        ringBufferMode: number;
        ringBufferLoopRange: IParticleSystemVector2;
        customSimulationSpace?: number;
        emitterVelocity?: IParticleSystemVector3;
        gravitySource?: number;
        useUnscaledTime?: boolean;
    }
    interface IParticleSystemEmissionModule {
        enabled: boolean;
        rateOverTime: IParticleSystemMinMaxCurve;
        rateOverTimeMultiplier: number;
        rateOverDistance: IParticleSystemMinMaxCurve;
        rateOverDistanceMultiplier: number;
        burstCount: number;
        bursts: IParticleSystemBurst[];
    }
    interface IParticleSystemShapeModule {
        enabled: boolean;
        shapeType: number;
        angle: number;
        radius: number;
        radiusMode: number;
        radiusSpread: number;
        radiusSpeed: IParticleSystemMinMaxCurve;
        radiusSpeedMultiplier: number;
        donutRadius: number;
        position: IParticleSystemVector3;
        rotation: IParticleSystemVector3;
        scale: IParticleSystemVector3;
        alignToDirection: boolean;
        randomDirectionAmount: number;
        sphericalDirectionAmount: number;
        randomPositionAmount: number;
        biasOnTriangles: boolean;
        useMeshMaterialIndex: boolean;
        meshMaterialIndex: number;
        useMeshColors: boolean;
        normalOffset: number;
        meshSpawnMode: number;
        meshSpawnSpread: number;
        meshSpawnSpeed: IParticleSystemMinMaxCurve;
        meshSpawnSpeedMultiplier: number;
        arc: number;
        arcMode: number;
        arcSpread: number;
        arcSpeed: IParticleSystemMinMaxCurve;
        arcSpeedMultiplier: number;
        length: number;
        boxThickness: IParticleSystemVector3;
    }
    interface IParticleSystemRendererModule {
        enabled: boolean;
        materials: any[];
        renderMode: number;
        cameraVelocityScale: number;
        velocityScale: number;
        lengthScale: number;
        normalDirection: number;
        sortMode: number;
        sortingFudge: number;
        minParticleSize: number;
        maxParticleSize: number;
        alignment: number;
        flip: IParticleSystemVector2;
        allowRoll: boolean;
        pivot: IParticleSystemVector3;
        shadowCastingMode: number;
        receiveShadows: boolean;
        motionVectorGenerationMode: number;
        lightProbeUsage: number;
        reflectionProbeUsage: number;
        enableGPUInstancing: boolean;
        mesh?: any;
        sortingLayerID: number;
        sortingOrder: number;
        freeformStretching?: boolean;
        maskInteraction?: number;
        meshCount?: number;
        meshDistribution?: number;
        rotateWithStretchDirection?: boolean;
        shadowBias?: number;
        supportsMeshInstancing?: boolean;
        activeVertexStreamsCount?: number;
        activeTrailVertexStreamsCount?: number;
        meshes?: any[];
        trailMaterial?: any;
    }
    interface IParticleSystemVelocityOverLifetimeModule {
        enabled: boolean;
        space: number;
        x: IParticleSystemMinMaxCurve;
        y: IParticleSystemMinMaxCurve;
        z: IParticleSystemMinMaxCurve;
        xMultiplier: number;
        yMultiplier: number;
        zMultiplier: number;
        orbitalX: IParticleSystemMinMaxCurve;
        orbitalY: IParticleSystemMinMaxCurve;
        orbitalZ: IParticleSystemMinMaxCurve;
        orbitalXMultiplier: number;
        orbitalYMultiplier: number;
        orbitalZMultiplier: number;
        orbitalOffsetX: IParticleSystemMinMaxCurve;
        orbitalOffsetY: IParticleSystemMinMaxCurve;
        orbitalOffsetZ: IParticleSystemMinMaxCurve;
        orbitalOffsetXMultiplier: number;
        orbitalOffsetYMultiplier: number;
        orbitalOffsetZMultiplier: number;
        radial: IParticleSystemMinMaxCurve;
        radialMultiplier: number;
        speedModifier: IParticleSystemMinMaxCurve;
        speedModifierMultiplier: number;
    }
    interface IParticleSystemLimitVelocityOverLifetimeModule {
        enabled: boolean;
        limitX: IParticleSystemMinMaxCurve;
        limitY: IParticleSystemMinMaxCurve;
        limitZ: IParticleSystemMinMaxCurve;
        limitXMultiplier: number;
        limitYMultiplier: number;
        limitZMultiplier: number;
        limit: IParticleSystemMinMaxCurve;
        limitMultiplier: number;
        dampen: number;
        separateAxes: boolean;
        space: number;
        drag: IParticleSystemMinMaxCurve;
        dragMultiplier: number;
        multiplyDragByParticleSize: boolean;
        multiplyDragByParticleVelocity: boolean;
    }
    interface IParticleSystemColorOverLifetimeModule {
        enabled: boolean;
        color: IParticleSystemMinMaxGradient;
    }
    interface IParticleSystemSizeOverLifetimeModule {
        enabled: boolean;
        size: IParticleSystemMinMaxCurve;
        sizeMultiplier: number;
        x: IParticleSystemMinMaxCurve;
        xMultiplier: number;
        y: IParticleSystemMinMaxCurve;
        yMultiplier: number;
        z: IParticleSystemMinMaxCurve;
        zMultiplier: number;
        separateAxes: boolean;
    }
    interface IParticleSystemRotationOverLifetimeModule {
        enabled: boolean;
        x: IParticleSystemMinMaxCurve;
        xMultiplier: number;
        y: IParticleSystemMinMaxCurve;
        yMultiplier: number;
        z: IParticleSystemMinMaxCurve;
        zMultiplier: number;
        separateAxes: boolean;
    }
    interface IParticleSystemTextureSheetAnimationModule {
        enabled: boolean;
        mode: number;
        timeMode: number;
        fps: number;
        numTilesX: number;
        numTilesY: number;
        animation: number;
        useRandomRow: boolean;
        frameOverTime: IParticleSystemMinMaxCurve;
        frameOverTimeMultiplier: number;
        startFrame: IParticleSystemMinMaxCurve;
        startFrameMultiplier: number;
        cycleCount: number;
        rowIndex: number;
        rowMode: number;
        uvChannelMask: number;
        flipU: number;
        flipV: number;
        speedRange: IParticleSystemVector2;
    }
    interface IParticleSystemProperties {
        isPlaying: boolean;
        isPaused: boolean;
        isStopped: boolean;
        isEmitting: boolean;
        particleCount: number;
        time: number;
        randomSeed: number;
        useAutoRandomSeed: boolean;
        name: string;
        instanceId: number;
        enabled: boolean;
        transformPosition: IParticleSystemVector3;
        transformRotation: IParticleSystemVector3;
        transformScale: IParticleSystemVector3;
        materialName?: string;
        materialId?: number;
        mainTextureName?: string;
        mainTextureId?: number;
        main: IParticleSystemMainModule;
        emission: IParticleSystemEmissionModule;
        shape: IParticleSystemShapeModule;
        renderer: IParticleSystemRendererModule;
        velocityOverLifetime: IParticleSystemVelocityOverLifetimeModule;
        limitVelocityOverLifetime: IParticleSystemLimitVelocityOverLifetimeModule;
        colorOverLifetime: IParticleSystemColorOverLifetimeModule;
        sizeOverLifetime: IParticleSystemSizeOverLifetimeModule;
        rotationOverLifetime: IParticleSystemRotationOverLifetimeModule;
        textureSheetAnimation: IParticleSystemTextureSheetAnimationModule;
        inheritVelocity?: any;
        forceOverLifetime?: any;
        colorBySpeed?: any;
        sizeBySpeed?: any;
        rotationBySpeed?: any;
        externalForces?: any;
        noise?: any;
        collision?: any;
        triggers?: any;
        subEmitters?: any;
        lights?: any;
        trails?: any;
        customData?: any;
    }
}
declare namespace TOOLKIT {
    /**
     * Builds and caches BABYLON.RawTexture2DArray channels for the per-skin Texture2DArray switching
     * system (see CustomShaderMaterial.enableSkinArray / SkinArraySwitchingPlugin).
     *
     * Each PBR channel (albedo, normal, metallic-roughness, occlusion, emissive) becomes one array of N
     * same-size layers — one layer per skin. The layers are loaded from N separate image URLs and stacked
     * into a single GPU array texture with mipmaps + trilinear + anisotropic filtering, so every skin gets
     * a full-resolution slice with its own clean mip chain (no atlas cross-cell bleed). The array is shared
     * by every mesh/instance that uses the same skin set — the pixel data exists once, and each draw merely
     * selects a layer index.
     *
     * Color space: bytes are stored raw (RGBA8). sRGB channels (albedo, emissive) are linearized in the
     * shader (toLinearSpace), so this builder is channel-agnostic — pass the URLs and it stacks them.
     *
     * @class SkinTextureArray
     */
    class SkinTextureArray {
        /** Cache keyed by the joined URL list. The PROMISE is cached (not just the result) so concurrent
         *  Build() calls for the same skin set (e.g. one per mesh) all await ONE build and share ONE GPU
         *  array — no duplicate VRAM, no duplicate CPU mip work. Failed builds evict so a retry can happen. */
        private static _cache;
        /**
         * Build (or fetch from cache) a Texture2DArray from N image URLs. All layers are resampled to the
         * FIRST image's dimensions (arrays require uniform layer size). Returns a Promise that resolves to
         * the array texture (or null when no URLs are supplied / loading fails). Shared across all callers
         * with the same URL list.
         */
        static Build(scene: BABYLON.Scene, urls: string[], options?: {
            samplingMode?: number;
            aniso?: number;
            invertY?: boolean;
            mipmaps?: boolean;
        }): Promise<BABYLON.RawTexture2DArray>;
        /** Upload a CPU-generated mip chain to every layer (works around the broken WebGPU array auto-mip-gen).
         *  Each level is a box-downsample of the previous, uploaded via engine.updateRawTexture2DArray(.., mipLevel). */
        private static _uploadMipChain;
        /** Box-average (2x2) downsample every layer of a stacked RGBA8 buffer to (dw x dh). Edge-clamped. */
        private static _downsampleLayers;
        /** GPU cap on Texture2DArray layers: WebGPU device limit `maxTextureArrayLayers`, else WebGL2
         *  `MAX_ARRAY_TEXTURE_LAYERS`. Falls back to the spec-guaranteed floor (256) when it can't be read. */
        private static _maxArrayLayers;
        /** Load every URL as an HTMLImageElement (cross-origin enabled for canvas readback). */
        private static _loadImages;
        /** Dispose and drop every cached array (e.g. on scene teardown). Cached entries are promises, so we
         *  resolve each before disposing (handles arrays still finishing their async build). */
        static Clear(): void;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * MeshNormalProxy — JavaScript-side equivalent of Bullet's btSmoothTriangleMesh for BabylonJS/Havok.
     *
     * THE PROBLEM:
     * Havok physics (via BabylonJS) returns raw physics collision normals from raycasts/shapecasts.
     * On triangle mesh shapes built from rough or low-poly meshes, these normals are computed per-triangle
     * by the physics engine and have no knowledge of the artist's smooth vertex normals. This causes
     * the same "edge seam" problem that btSmoothTriangleMesh was designed to fix in Bullet Physics:
     *   - Visible jerks/snaps as wheels cross triangle boundaries
     *   - Random angular impulses when hitting shared triangle edges
     *   - Car flipping on terrain that looks smooth but has harsh underlying triangles
     *
     * THE AMMO.JS SOLUTION (btSmoothTriangleMesh):
     * In the original Bullet-based implementation, the collision system stored per-vertex normals
     * directly in the mesh collider data (addTriangleNormals), and the SphereTriangleDetector
     * used the triangle INDEX from the physics hit to look up and barycentric-interpolate those
     * stored vertex normals. This replaced the raw Havok collision normal with a smooth,
     * vertex-weighted normal that matched the visual mesh — eliminating seam artifacts entirely.
     *
     * THE HAVOK SOLUTION (MeshNormalProxy):
     * Since Havok does NOT expose triangle indices from raycasts/shapecasts and does NOT allow
     * setting vertex normals on the collision shape, we replicate btSmoothTriangleMesh entirely
     * in JavaScript as a post-process step:
     *
     *   1. BUILD: Extract vertex positions + vertex normals from the BABYLON.Mesh before physics runs.
     *             Build a 2D XZ spatial hash for fast O(1) average lookup of nearby triangles.
     *
     *   2. QUERY: After Havok returns a raycast/shapecast hit point (world space), transform it to
     *             the mesh's local space, search the spatial hash for candidate triangles, find the
     *             closest triangle that contains the projection of the hit point, compute barycentric
     *             coordinates, and interpolate the three vertex normals.
     *
     *   3. OVERRIDE: Replace the raw Havok normal with this smooth interpolated normal BEFORE the
     *                temporal smoothing step in HavokRaycastVehicle. This replicates exactly what
     *                btSmoothTriangleMesh::interpolateMeshNormal() did inside Bullet.
     *
     * RESULT: Smooth, seam-free driving on any mesh surface — identical to the AmmoJS implementation.
     *
     * USAGE:
     *   // 1. Get the mesh and its associated physics body:
     *   var trackMesh = scene.getMeshByName("TrackCollider");
     *
     *   // 2. Build proxy from mesh geometry (call once after mesh loads):
     *   var proxy = new TOOLKIT.MeshNormalProxy();
     *   proxy.buildFromMesh(trackMesh, 2.0); // cellSize=2.0m is good for most racing tracks
     *
     *   // 3. Register with the vehicle (physicsBody auto-detected from mesh):
     *   myHavokVehicle.registerSmoothMeshNormal(trackMesh, trackMesh.physicsBody, proxy);
     *
     *   // 4. The vehicle will automatically use smooth normals for all wheel contacts on that body.
     *
     * NOTE: For non-uniformly scaled meshes, call proxy.setUseNormalTransposeInverse(true) for
     *       correct normal shearing correction. Not needed for uniformly scaled or unscaled meshes.
     *
     * @class MeshNormalProxy - All rights reserved (c) 2024 Mackey Kinard
     */
    class MeshNormalProxy {
        /** Blend factor between smooth proxy normal (0.0) and raw Havok normal (1.0).
         *  Default 0.0 = full proxy (matches btSmoothTriangleMesh behavior).
         *  Use 0.05-0.15 to retain a tiny bit of physics behavior for dynamic surfaces. */
        blendWithPhysicsNormal: number;
        /** Max distance (in local space) from hit point to nearest triangle centroid before
         *  falling back to raw physics normal. Prevents proxy from affecting unrelated surfaces. */
        maxLookupDistance: number;
        /** Number of spatial hash cells to search in radius (1 = 3x3, 2 = 5x5).
         *  Increase to 2 for meshes with large triangles (terrain, coarse geometry). */
        searchRadius: number;
        /** Enable triangle plane projection test for more accurate lookup.
         *  When true, only accepts triangles where the hit point projects inside the triangle.
         *  Slightly more expensive but eliminates rare cross-seam misattributions. */
        useProjectionTest: boolean;
        private _v0x;
        private _v0y;
        private _v0z;
        private _v1x;
        private _v1y;
        private _v1z;
        private _v2x;
        private _v2y;
        private _v2z;
        private _n0x;
        private _n0y;
        private _n0z;
        private _n1x;
        private _n1y;
        private _n1z;
        private _n2x;
        private _n2y;
        private _n2z;
        private _fnx;
        private _fny;
        private _fnz;
        private _cx;
        private _cy;
        private _cz;
        private _triangleCount;
        private _cellTriangles;
        private _htKeys;
        private _htStarts;
        private _htCounts;
        private _cellSize;
        private _hashOriginX;
        private _hashOriginZ;
        private _sourceMesh;
        private _worldMatrix;
        private _invWorldMatrix;
        private _matrixDirty;
        private _scratchV0;
        private _scratchLocal;
        private _candidatesBuf;
        private _uniqueBuf;
        private _seenSet;
        /** Number of triangles in the proxy */
        get triangleCount(): number;
        /** Cell size of the spatial hash in local-space units */
        get cellSize(): number;
        /** The mesh this proxy was built from */
        get sourceMesh(): BABYLON.AbstractMesh;
        /**
         * Builds the smooth normal proxy from a BabylonJS mesh.
         * Extracts vertex positions and normals from the mesh geometry and constructs a 2D XZ
         * spatial hash for fast per-frame querying during vehicle wheel contact processing.
         *
         * IMPORTANT: Call this AFTER the mesh's geometry is fully loaded and BEFORE physics
         * simulation starts. For runtime-loaded meshes, call after the mesh's ImportMesh promise resolves.
         *
         * @param mesh      The BabylonJS mesh to extract geometry from. Must have vertex normals.
         * @param cellSize  Spatial hash cell size in mesh local units (default 2.0).
         *                  Rule of thumb: ~70% of the average triangle edge length.
         *                  Use 0.5-1.0 for detailed urban meshes, 2.0-5.0 for terrain/large tracks.
         * @returns true if successful, false if geometry data was unavailable.
         */
        buildFromMesh(mesh: BABYLON.AbstractMesh, cellSize?: number): boolean;
        /**
         * Marks the cached world/inverse matrices as dirty for re-computation.
         * Call this once per frame for kinematic (moving) meshes.
         * For static meshes (racing tracks, terrain) this is NEVER needed — the matrix is computed once.
         */
        invalidateTransform(): void;
        /**
         * Returns the smooth interpolated normal at the given world-space hit point.
         * Equivalent to btSmoothTriangleMesh::interpolateMeshNormal() from the AmmoJS implementation.
         *
         * Algorithm:
         *   1. Transform world hit point → local mesh space (using cached inverse world matrix)
         *   2. XZ spatial hash lookup for candidate triangles near the local hit point
         *   3. Find the best triangle: projection of hit point inside triangle + minimum plane distance
         *   4. Compute barycentric coordinates (Cramer's rule, equivalent to btSmoothTriangleMesh::barycentricCoordinates)
         *   5. Linear interpolation of vertex normals with barycentric weights
         *   6. Transform interpolated normal → world space via world matrix basis
         *   7. Normalize and write to resultNormal
         *
         * @param worldHitPoint   Hit point in world space (from Havok raycast/shapecast result)
         * @param resultNormal    Output: receives the smooth interpolated normal in world space
         * @param rawHavokNormal  Optional: raw Havok normal for blend fallback (used when blendWithPhysicsNormal > 0)
         * @returns true if a valid smooth normal was written to resultNormal; false = use raw Havok normal
         */
        getNormalAtPointToRef(worldHitPoint: BABYLON.Vector3, resultNormal: BABYLON.Vector3, rawHavokNormal?: BABYLON.Vector3): boolean;
        /**
         * Disposes the proxy and frees all allocated memory.
         * Call this when the mesh is removed from the scene or the vehicle is destroyed.
         */
        dispose(): void;
        /**
         * Encodes a 2D grid coordinate pair into a single integer Map key.
         * Avoids string concatenation ("hx|hz") which was the primary source of GC pressure
         * during buildFromMesh and getNormalAtPointToRef.
         * Supports grid coordinates in ±32767 — for cellSize=2m that covers ±65534m per axis.
         */
        private _makeHashKey;
        /**
         * Binary search for a cell key in the sorted _htKeys Uint32Array.
         * Returns the index into _htKeys/_htStarts/_htCounts if found; -1 if not found.
         * O(log N) where N = occupied cells — typically 10–17 comparisons per query.
         */
        private _bsearchCell;
        /**
         * Computes barycentric coordinates of projected point (px,py,pz) in triangle at index t.
         * Uses Cramer's rule (same algorithm as btSmoothTriangleMesh::barycentricCoordinates).
         * Returns [u, v, w] where point ≈ u*v0 + v*v1 + w*v2.
         * NOTE: Uses Y coordinate instead of dropping it — works correctly for ramps and all orientations.
         */
        private _barycentricScratch;
        private _computeBarycentricInline;
    }
    /**
     * SmoothMeshNormalSystem — Registry and manager for MeshNormalProxy instances.
     *
     * Maps PhysicsBody → MeshNormalProxy so HavokRaycastVehicle can quickly look up
     * whether the surface a wheel just hit has a smooth normal proxy registered.
     *
     * This is analogous to adding a body to a "smooth mesh" list in a btDiscreteDynamicsWorld.
     *
     * USAGE:
     *   // Central singleton (create once in game setup):
     *   TOOLKIT.SmoothMeshNormalSystem.instance.register(body, proxy);
     *
     *   // In vehicle: auto-used via HavokRaycastVehicle.registerSmoothMeshNormal()
     */
    class SmoothMeshNormalSystem {
        private static _instance;
        /** Global singleton instance */
        static get instance(): SmoothMeshNormalSystem;
        private _registry;
        /**
         * Registers a MeshNormalProxy for a physics body.
         * @param body  Physics body of the mesh collider
         * @param proxy Pre-built MeshNormalProxy (call proxy.buildFromMesh() first)
         */
        register(body: BABYLON.PhysicsBody, proxy: MeshNormalProxy): void;
        /**
         * Unregisters and optionally disposes the proxy for a physics body.
         * @param body          Physics body to unregister
         * @param disposeProxy  If true, calls proxy.dispose() after unregistering
         */
        unregister(body: BABYLON.PhysicsBody, disposeProxy?: boolean): void;
        /**
         * Looks up the smooth normal proxy for a given physics body.
         * Returns null if no proxy is registered for this body.
         */
        lookup(body: BABYLON.PhysicsBody): MeshNormalProxy;
        /** Returns true if a proxy is registered for the given body */
        has(body: BABYLON.PhysicsBody): boolean;
        /** Number of registered proxies */
        get count(): number;
        /**
         * Disposes all registered proxies and clears the registry.
         */
        disposeAll(): void;
        /**
         * Convenience method: builds a MeshNormalProxy from a mesh, registers it for the
         * mesh's physics body, and returns the proxy. All-in-one setup call.
         *
         * @param mesh      Mesh collider with geometry
         * @param body      Physics body associated with the mesh (must be set up before calling)
         * @param cellSize  Spatial hash cell size (default 2.0m)
         * @param blendWithPhysics  Blend factor 0.0=full proxy, 1.0=full Havok (default 0.0)
         * @returns The built proxy, or null on failure
         */
        static buildAndRegister(mesh: BABYLON.AbstractMesh, body: BABYLON.PhysicsBody, cellSize?: number, blendWithPhysics?: number): MeshNormalProxy;
    }
}
declare namespace TOOLKIT {
    /**
     * Detail Layer Instance Data
     */
    interface IDetailLayerData {
        layerindex?: number;
        densitymap?: number[];
        densitywidth?: number;
        densityheight?: number;
        minwidth?: number;
        maxwidth?: number;
        minheight?: number;
        maxheight?: number;
        noisespread?: number;
        bendfactor?: number;
        healthycolor?: number[];
        drycolor?: number[];
        colorvariationmap?: number[];
        rendermode?: string;
        useprototypemesh?: boolean;
        useinstancing?: boolean;
        prototypemeshnodeid?: string;
        prototypemeshname?: string;
        prototypetexturefile?: string;
        prototypetexture?: any;
        isvalid?: boolean;
        maxdistance?: number;
        noiseseed?: number;
        positionjitter?: number;
        positionsjitter?: number;
        aligntoground?: number;
        holeedgepadding?: number;
        prototypelocalscale?: number[];
        detailinstancepatches?: Array<{
            patchX: number;
            patchY: number;
            bounds: number[];
            transforms: number[];
        }>;
        densityparam?: number;
        usedensityscaling?: boolean;
        density?: number;
        targetcoverage?: number;
        detailscattermode?: string;
    }
    /**
     * Terrain Properties Interface
     */
    interface ITerrainProperties {
        name?: string;
        terrainsize?: number[];
        basemapdistance?: number;
        treebillboarddistance?: number;
        treecrossfadelength?: number;
        treedistance?: number;
        treeinstancecount?: number;
        detailwidth?: number;
        detailheight?: number;
        detailpatchcount?: number;
        detailresolution?: number;
        detailresolutionperpatch?: number;
        detailbillboardingmode?: number;
        detailgrassshadowlevel?: number;
        detailgrassreceiveshadows?: boolean;
        detailobjectdensity?: number;
        detailobjectdistance?: number;
        wavinggrassamount?: number;
        wavinggrassspeed?: number;
        wavinggrasssize?: number;
        wavinggrasstint?: number[];
        detaillayers?: TOOLKIT.IDetailLayerData[];
        detailscattermode?: string;
    }
    /**
     * Color Correction Modes
     */
    enum ColorCorrectionMode {
        None = 0,
        ToGamma = 1,
        ToLinear = 2
    }
    /**
     * Babylon Script Component
     * @class TerrainBuilder
     */
    class TerrainBuilder extends TOOLKIT.ScriptComponent {
        private detailLayerContainers;
        private detailMeshSources;
        static grassHeightScale: number;
        static grassRandomFlip: boolean;
        static grassCastShadows: boolean;
        static grassReceiveFog: boolean;
        static grassColorCorrectionMode: TOOLKIT.ColorCorrectionMode;
        static detailChunkMode: number;
        static detailChunkTargetInstances: number;
        static detailChunkWorldSize: number;
        static detailChunkMaxChunksPerAxis: number;
        static detailChunkMaxTotalChunks: number;
        static meshDetailChunkMode: number;
        static meshDetailChunkTargetInstances: number;
        static meshDetailChunkWorldSize: number;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected destroy(): void;
        /**
         * Dispose all detail layer instances
         */
        private disposeDetailLayers;
        /**
         * Build detail prototypes for the terrain
         * This recreates Unity's terrain grass and detail system in Babylon.js
         */
        static BuildDetailPrototypes(properties: TOOLKIT.ITerrainProperties, terrainTransform: BABYLON.TransformNode, scene: BABYLON.Scene, builderInstance?: TOOLKIT.TerrainBuilder): void;
        /**
         * Build mesh-based detail layer (3D mesh grass/rocks/etc)
         */
        private static BuildMeshDetailLayer;
        /**
         * Build grass-based detail layer
         */
        private static BuildGrassDetailLayer;
        /**
         * Generate mesh detail instances from Unity's authoritative ComputeDetailInstanceTransforms export.
         * This is used ONLY for mesh detail prototypes (rocks/props/etc) and is intended to match Unity 100%.
         */
        private static GenerateMeshInstancesFromUnityPatches;
        /**
         * Grass optimization:
         * Generate grass thin-instance buffers directly from the density map without allocating
         * per-instance Vector3/Color4 objects.
         *
         * IMPORTANT: This preserves grass color/behavior by reusing the exact same placement,
         * height sampling, scale, and color math as GenerateInstancesFromDensityMap.
         */
        private static CreateGrassThinInstancesFromDensityMap;
        /**
         * Create thin instances for maximum performance
         *
         * IMPORTANT (Unity-style optimization):
         * Babylon thin instances are frustum-culled using the *host mesh* bounding info.
         * If you put an entire terrain's grass into one host mesh, it becomes "all-or-nothing".
         *
         * This implementation automatically *chunks* instances into a 2D grid (XZ) and creates
         * one thin-instanced host mesh per chunk. Each chunk gets its own bounding box, so
         * off-screen chunks are skipped by frustum culling (Unity terrain detail patch behavior).
         *
         * Drop-in compatibility:
         * - The function signature is unchanged.
         * - It returns the first created chunk mesh (or the only mesh if one chunk).
         * - All chunk meshes are parented under the provided `parent` so disposal still works.
         */
        private static CreateDetailThinInstancesFromDensityMap;
        /**
         * Create prototype mesh for grass
         */
        private static CreateGrassPrototype;
        /**
         * Create a single quad billboard (Unity GrassBillboard mode)
         */
        private static CreateSingleQuadBillboard;
        /**
         * Create crossed quads (Unity "Grass" mode, non-billboard).
         * Two vertical quads intersecting at the center (one in X/Y, one in Z/Y).
         */
        private static CreateCrossQuadGrass;
        /**
         * Apply upward-pointing normals to a mesh
         */
        private static ApplyUpNormals;
        /**
         * Deterministic hash-based RNG for stable grass placement
         */
        private static HashToUnitFloat;
        /**
         * Normalize rotation angle to [0..2PI)
         */
        private static NormalizeRotation;
        /**
         * Apply color correction based on mode
         */
        private static DoColorCorrection;
        /**
         * Convert an sRGB color value [0..1] to linear space using a gamma of ~2.2.
         */
        private static GammaToLinear;
        /**
         * Convert a linear color value [0..1] to sRGB space using a gamma of ~2.2.
         */
        private static LinearToGamma;
    }
}
declare namespace TOOLKIT {
    /**
     * Babylon Script Component — Texture Atlas Skin (Texture2DArray "skin slices")
     *
     * Mesh-first skin controller: ensures THIS component's owner mesh renders at a chosen skin index.
     * The mesh's type decides the delivery mechanism; every skinned submesh of the mesh uses the SAME
     * index (one index per mesh, changeable at runtime via setSkinIndex). Backed by a per-skin
     * Texture2DArray ("skin slices"): the surface UVs are sampled as-is and the layer index picks the
     * slice (full-res per-skin slices, each with its own clean mip chain — no atlas cross-cell bleed and
     * no UV remap).
     *
     * Authored properties (auto-filled from the Unity editor):
     *  Every channel below is OPTIONAL and INDEPENDENT — supply only the ones you want to swap. The shared
     *  layer index works for whichever channel(s) are present, so e.g. emissive-only (brake lights on/off)
     *  needs no albedo. Absent channels fall through to the material's native map.
     *  - albedoSlices  — per-skin albedo (sRGB, mipped) → tkAlbedoArray, overrides surfaceAlbedo.
     *  - normalSlices  — per-skin tangent-space normals (linear, UNMIPPED) → tkNormalArray, fed through
     *        Babylon's native perturbNormal()/vTBN so it matches the engine's bump EXACTLY. Only applied where
     *        the mesh has a tangent frame (BUMP+TANGENT). Unmipped because box-downsampled normals grain.
     *  - metallicSlices — per-skin metallic-roughness (glTF B=metallic, G=roughness; linear, mipped) →
     *        tkMetalRoughArray, overrides metallicRoughness under METALLICWORKFLOW.
     *  - emissiveSlices — per-skin emissive (sRGB, mipped) → tkEmissiveArray, overrides finalEmissive (works
     *        with no base emissive — e.g. brake lights).
     *  - occlusionSlices — reserved for a later phase (parsed but NOT yet stacked; AO has no exact PBR hook).
     *  - textureData   — optional skin manifest (JSON): { count, skins:[ { index, name } ], albedoLayers:[] }.
     *        Synthesized from the slice count when absent.
     *  - defaultIndex  — the skin index this mesh starts at (applied to all skinned parts).
     *  - skinnedParts  — the submesh materials (Unity Material[]) to skin-switch on this mesh.
     *
     * Mesh-type routing:
     *  - Regular BABYLON.Mesh      → CLONE each part material (private to this mesh, preserves the
     *                                CustomShaderMaterial subclass + skin-array API) and drive a shared
     *                                layer uniform. Clones the MultiMaterial too so the swap stays local.
     *  - BABYLON.InstancedMesh     → shared material configured once; per-instance tkSkinLayer buffer.
     *  - VAT (VertexAnimationMaterial) → shared material configured once (enableVatSkinArray); the layer is
     *                                decoded in-shader from the cell index packed into g_vatAnim1.w, so each
     *                                VAT instance under one controller can show a different slice.
     *
     * @class TextureAtlasSkin
     */
    class TextureAtlasSkin extends TOOLKIT.ScriptComponent {
        private abtractMesh;
        private textureData;
        private defaultIndex;
        private skinnedParts;
        private albedoSlices;
        private normalSlices;
        private metallicSlices;
        private occlusionSlices;
        private emissiveSlices;
        /** Guard so wiring runs once. */
        private _applied;
        /** Parsed (or synthesized) manifest. */
        private _manifest;
        /** The mesh's current skin index (all skinned parts share it). */
        private _currentIndex;
        /** Configured skin targets, with the delivery mechanism resolved per material. */
        private _targets;
        /** Per-mesh cloned MultiMaterial (regular-mesh path) so submaterial swaps stay local to this mesh. */
        private _clonedMultiMaterial;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        /** Configure every skinned part for the skin array and apply defaultIndex. Idempotent (runs once). */
        applySkins(): void;
        /**
         * Switch every skinned part of THIS mesh to skin `index` (scoped to this mesh only).
         * Out-of-range indices are CLAMPED to [0, skinCount-1] with a warning. Returns the index applied.
         */
        setSkinIndex(index: number): number;
        /** Clamp an index to [0, skinCount-1], warning (with the label) when it was out of range. */
        private clampIndex;
        /** Number of skins: skins[] length, else manifest count, else the largest channel's slice count. */
        skinCount(): number;
        /** Largest per-skin slice count across every supplied channel (albedo/normal/MR/occlusion/emissive) —
         *  so the skin count is correct even when albedo is absent (e.g. an emissive-only material). */
        private maxChannelSliceCount;
        /** The mesh's current skin index. */
        getSkinIndex(): number;
        /** Build the albedo Texture2DArray (and, when normalSlices are present, an unmipped/linear normal
         *  Texture2DArray) from the slice images, assign them to the material, then enable per-skin array
         *  switching for the mesh type. Async (images load after start()): the layer index is applied again
         *  once the arrays are ready.
         *   - regular   → shared layer uniform (setSkinLayer)
         *   - instanced → per-instance tkSkinLayer attribute buffer
         *   - vat       → layer decoded in-shader from the cell index packed in g_vatAnim1.w (enableVatSkinArray) */
        private configureMaterial;
        /** Resolve the albedo channel slice URLs. PREFERS the exported slice TEXTURE references (albedoSlices)
         *  — auto-parsed and resolved against the scene root — falling back to manifest.albedoLayers filenames. */
        private albedoChannelUrls;
        /** Resolve the normal channel slice URLs (one per skin, same order as albedo). PREFERS the exported
         *  slice TEXTURE references (normalSlices), falling back to manifest.normalLayers filenames. Returns
         *  null when no normal slices were authored (normal switching then stays off and the native normal
         *  stands). */
        private normalChannelUrls;
        /** Resolve the metallic-roughness channel slice URLs (glTF layout: B=metallic, G=roughness; one per
         *  skin, same order as albedo). PREFERS exported slice references (metallicSlices), else manifest
         *  metalRoughLayers. Null when no MR slices were authored (MR switching stays off). */
        private metalRoughChannelUrls;
        /** Resolve the emissive channel slice URLs (one per skin, same order as albedo). PREFERS exported slice
         *  references (emissiveSlices), else manifest emissiveLayers. Null when no emissive slices were authored
         *  (emissive switching stays off). Drives emissive-only swaps such as brake lights on/off. */
        private emissiveChannelUrls;
        /** Resolve each exported slice to a URL. The slices are IUnityTexture references (a filename relative
         *  to the scene root — NOT auto-loaded into a BABYLON.Texture, so no duplicate GPU upload):
         *  url = GetRootUrl(scene) + filename. Also tolerates an already-loaded BABYLON.Texture (.url). */
        private sliceUrls;
        /** Resolve a manifest layer filename to a loadable URL (absolute passes through; else scene root). */
        private resolveLayerUrl;
        /** Apply the current index to every target via its mesh-type-specific path (this mesh only). */
        private applyIndexToTargets;
        /** Select the per-skin array layer for one target:
         *   - vat       → the per-mesh cell index packed into g_vatAnim1.w by the VAT controller
         *   - instanced → a per-instance tkSkinLayer attribute buffer
         *   - regular   → a shared material uniform on the (cloned) regular-mesh material
         *  Safe to call before the array finishes loading — the value persists and takes effect once the
         *  shader is gated on. */
        private applyLayerToMaterial;
        /** True when this mesh must use the per-instance buffer: it is an InstancedMesh, OR a source Mesh
         *  that has hardware instances (instances share sourceMesh.material, so a private clone + uniform
         *  layer is impossible — every instance would read the same shared value). */
        private isInstancedSetup;
        /** Register the per-instance tkSkinLayer buffer (one float) on the source mesh if not already present. */
        private ensureSkinLayerBuffer;
        /** Collect the host mesh's material slots: each MultiMaterial sub-material, or the single material. */
        private getMeshSlots;
        /** Match a resolved part material (by identity, then by name) to one of the mesh's slots. */
        private matchSlot;
        /** Resolve a skinnedParts entry to a live material (already-a-material, wrapped, by name). */
        private resolvePartMaterial;
        /** Extract a material name from a skinnedParts entry (string, live material, or serialized ref). */
        private partName;
        /** Clone a regular mesh's part material (and its MultiMaterial) so this mesh's skin is private. */
        private cloneForRegular;
        /** textureData may arrive as a JSON string or an object. Returns null when there is no skins[] list. */
        private parseManifest;
        private toInt;
        private isConfigured;
        private markConfigured;
        /** Human-readable label for a delivery mechanism (used in setup logging). */
        private describeKind;
    }
}
declare namespace TOOLKIT {
    /**
     * Babylon Toolkit User Interface Controls
     */
    class UnitySlider extends BABYLON.GUI.Slider {
    }
    /**
     * Babylon Toolkit User Interface Controls
     */
    class UnityScrollBar extends BABYLON.GUI.ScrollBar {
        private _direction;
        get direction(): string;
        set direction(value: string);
        protected _getThumbPosition(): number;
        serialize(serializationObject: any): void;
        _parseFromContent(serializationObject: any, host: BABYLON.GUI.AdvancedDynamicTexture): void;
    }
    /**
     * Babylon Toolkit User Interface Controls
     */
    class UnityDropdownMenu extends BABYLON.GUI.Container {
        private _button;
        private _popup;
        private _options;
        private _selectedIndex;
        constructor(name?: string);
        get selectedIndex(): number;
        set selectedIndex(v: number);
        set options(opts: Array<{
            text: string;
            imageSource?: string;
        }>);
        private _updateSelectedText;
        private _rebuildOptions;
        serialize(): any;
        static Parse(parsedData: any, adt: BABYLON.GUI.AdvancedDynamicTexture, urlRewriter?: (url: string) => string): UnityDropdownMenu;
    }
}
declare namespace TOOLKIT {
    /**
     * Babylon Toolkit User Interface Component
     */
    class UserInterface extends TOOLKIT.ScriptComponent {
        private static readonly PHYSICAL_SIZE_SLICE_FACTOR;
        private static readonly PHYSICAL_SIZE_POINT_FACTOR;
        private static readonly CHARACTER_WORD_SPACE_FACTOR;
        static OnParseNodeObject: BABYLON.Observable<any>;
        static OnInterfaceLoaded: BABYLON.Observable<string>;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected start(): Promise<void>;
        protected parseNodeObject(rootNode: any, hostPrefix: string): void;
        private processNodeSources;
        /**
         * Extract font families used in GUI data
         */
        private extractRequiredFonts;
        /**
         * Load fonts in priority order: Unity exports → Google Fonts → System fallback
         */
        private loadRequiredFonts;
        /**
         * Load font manifest from exported Unity data
         */
        private loadFontManifest;
        /**
         * Load a single font with priority: Unity export → Google Fonts → System
         */
        private loadSingleFont;
        /**
         * Load font exported from Unity (optimized TTF format)
         */
        private loadUnityFont;
        /**
         * Load font from Google Fonts
         */
        private loadGoogleFont;
        /**
         * Check if font is available in Google Fonts
         */
        private isGoogleFont;
        /**
         * Check if font is available as system font
         */
        private isSystemFontAvailable;
        private static CreateInternalUserInterface;
        private static LoadForegroundInterfaceData;
        private static LoadBackgroundInterfaceData;
        private static ParseUserInterfaceObject;
        private static FixUserInterfacePrototypes;
        private static ProcessControlEvents;
        /**
         * Process Unity UI Legacy Events (UnityEvent-based system)
         * Handles Button.onClick, Toggle.onValueChanged, Slider.onValueChanged, etc.
         */
        private static processUnityUIEvents;
        /**
         * Process UI Toolkit Events (Action delegate-based system)
         * Handles Button.clicked, Toggle.value, Slider.value, etc.
         */
        private static processUIToolkitEvents;
        /**
         * Check if event data is from Unity UI (UnityEvent-based)
         */
        private static isUnityUIEvent;
        /**
         * Wire Unity UI Button onClick events
         */
        private static wireUnityUIButtonEvents;
        /**
         * Wire Unity UI Toggle onValueChanged events
         */
        private static wireUnityUIToggleEvents;
        /**
         * Wire Unity UI Slider onValueChanged events
         */
        private static wireUnityUISliderEvents;
        /**
         * Wire Unity UI Dropdown onValueChanged events
         */
        private static wireUnityUIDropdownEvents;
        /**
         * Wire Unity UI ScrollRect onValueChanged events
         */
        private static wireUnityUIScrollRectEvents;
        /**
         * Wire Unity UI InputField comprehensive events
         */
        private static wireUnityUIInputFieldEvents;
        /**
         * Wire UI Toolkit Button clicked events
         */
        private static wireUIToolkitButtonEvents;
        /**
         * Wire UI Toolkit Toggle events
         */
        private static wireUIToolkitToggleEvents;
        /**
         * Wire UI Toolkit Slider events
         */
        private static wireUIToolkitSliderEvents;
        /**
         * Wire UI Toolkit Dropdown events
         */
        private static wireUIToolkitDropdownEvents;
        /**
         * Execute Unity UI event with target object resolution and method invocation
         */
        private static executeUnityUIEvent;
        /**
         * Execute UI Toolkit event with runtime callback registration
         */
        private static executeUIToolkitEvent;
        /**
         * Find target object in the hierarchy path, instance ID, or component type
         */
        private static findTargetObject;
        /**
         * Extract and convert event parameters to appropriate types
         */
        private static extractParameters;
        /**
         * Resolve object reference by type name (AudioClip, Texture2D, etc.)
         */
        private static resolveObjectReference;
        /**
         * Execute UI Toolkit callback (runtime-registered callbacks)
         */
        private static executeUIToolkitCallback;
        private static ProcessHdrColors;
        private static emulateUnityHDR;
        private static applyUnityHDRToneMapping;
        private static applyHdrEffects;
        private static applyGlowEffects;
        private static applyLightingEffects;
        private static applyAdvancedLightingEffects;
        private static parseRgbaColor;
        private static ApplyHdrVisualEnhancements;
        private static ProcessPreserveAspectRatio;
        private static applyPreserveAspectRatio;
        private static ProcessTextSpacingProperties;
        private static applyCharacterSpacing;
        private static applyWordSpacing;
        static IsForegroundReady(scene: BABYLON.Scene): boolean;
        static SetForegroundTexture(scene: BABYLON.Scene, adt: BABYLON.GUI.AdvancedDynamicTexture): void;
        static GetForegroundTexture(scene: BABYLON.Scene, createOptions?: any): BABYLON.GUI.AdvancedDynamicTexture;
        static IsBackgroundReady(scene: BABYLON.Scene): boolean;
        static SetBackgroundTexture(scene: BABYLON.Scene, adt: BABYLON.GUI.AdvancedDynamicTexture): void;
        static GetBackgroundTexture(scene: BABYLON.Scene, createOptions?: any): BABYLON.GUI.AdvancedDynamicTexture;
        static GetCanvasElement(name: string, scene?: BABYLON.Scene): BABYLON.GUI.Control;
        static ShowCanvasElement(element: BABYLON.GUI.Control, fadeDuration?: number, fadeSpeedRatio?: number): Promise<void>;
        static HideCanvasElement(element: BABYLON.GUI.Control, fadeDuration?: number, fadeSpeedRatio?: number): Promise<void>;
        static AttachClickHandler(element: BABYLON.GUI.Control, func: (eventData?: BABYLON.GUI.Vector2WithInfo, eventState?: BABYLON.EventState) => any): BABYLON.Observer<BABYLON.GUI.Vector2WithInfo> | null;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon web video player standard class (Unity Style Shuriken Particle System)
     * @class WebVideoPlayer - All rights reserved (c) 2024 Mackey Kinard
     */
    class WebVideoPlayer extends TOOLKIT.ScriptComponent implements TOOLKIT.IAssetPreloader {
        private videoLoop;
        private videoMuted;
        private videoAlpha;
        private videoFaded;
        private videoPoster;
        private videoInvert;
        private videoSample;
        private videoVolume;
        private videoMipmaps;
        private videoPlayback;
        private videoPlayOnAwake;
        private videoPreloaderUrl;
        private videoBlobUrl;
        private videoPreload;
        private _initializedReadyInstance;
        getVideoMaterial(): BABYLON.StandardMaterial;
        getVideoTexture(): BABYLON.VideoTexture;
        getVideoElement(): HTMLVideoElement;
        getVideoScreen(): BABYLON.AbstractMesh;
        getVideoBlobUrl(): string;
        /** Register handler that is triggered when the video clip is ready */
        onReadyObservable: BABYLON.Observable<BABYLON.VideoTexture>;
        protected m_abstractMesh: BABYLON.AbstractMesh;
        protected m_videoTexture: BABYLON.VideoTexture;
        protected m_videoMaterial: BABYLON.StandardMaterial;
        protected m_diffuseIntensity: number;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected destroy(): void;
        protected awakeWebVideoPlayer(): void;
        protected destroyWebVideoPlayer(): void;
        /**
         * Gets the video ready status
         */
        isReady(): boolean;
        /**
         * Gets the video playing status
         */
        isPlaying(): boolean;
        /**
         * Gets the video paused status
         */
        isPaused(): boolean;
        /**
         * Play the video track
         */
        play(): Promise<boolean>;
        private internalPlay;
        private checkedPlay;
        private checkedRePlay;
        /**
         * Pause the video track
         */
        pause(): boolean;
        /**
         * Mute the video track
         */
        mute(): boolean;
        /**
         * Unmute the video track
         */
        unmute(): boolean;
        /**
         * Gets the video volume
         */
        getVolume(): number;
        /**
         * Sets the video volume
         * @param volume Define the new volume of the sound
         */
        setVolume(volume: number): boolean;
        /** Set video data source */
        setDataSource(source: string | string[] | HTMLVideoElement): void;
        /** Revokes the current video blob url and releases resouces */
        revokeVideoBlobUrl(): void;
        /** Add video preloader asset tasks (https://doc.babylonjs.com/divingDeeper/importers/assetManager) */
        addPreloaderTasks(assetsManager: TOOLKIT.PreloadAssetsManager): void;
    }
}
export as namespace PROJECT;
declare var SM: typeof TOOLKIT.SceneManager;
declare var WM: typeof TOOLKIT.WindowManager;
declare var UI: typeof TOOLKIT.UserInterface;
declare var IC: typeof TOOLKIT.InputController;

export as namespace TOOLKIT;
