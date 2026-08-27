/** UMD Type References */
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    var Navigation: typeof globalThis.Navigation;
    /**
    * Babylon toolkit scene manager class
    * @class SceneManager - All rights reserved (c) 2024 Mackey Kinard
    */
    class SceneManager {
        /** Gets the toolkit framework version string (9.22.2 - R1) */
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
        /**
         * Set the terrain shader color correction value - the exponent the terrain shader applies to the
         * detail (layers) atlas via `pow(color.rgb, gamma)` in sampleTextureAtlas2D. A value of 1.0 disables it.
         *
         * This MUST stay 1.0 while the atlas is loaded as an sRGB texture. Babylon's glTF loader derives the
         * color space from the texture info - `useSRGBBuffer = !textureInfo.nonColorData` - and our detail
         * atlas is color, so the GPU already performs the sRGB -> linear decode when sampling. The old 2.2
         * did that conversion by hand back when the atlas arrived as a plain linear buffer; leaving it on now
         * applies gamma a SECOND time (0.5 -> 0.218), which is what made terrain render far too dark while
         * ordinary meshes looked correct. Hardware decode is also the better of the two, because filtering
         * and mipmapping then happen in linear space.
         */
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
        /**
         * Custom sampler names that carry DATA, not color, and must be loaded into a LINEAR buffer.
         *
         * Babylon's glTF loader decides the color space from the texture info: internally it calls
         * `_createTextureAsync(..., useSRGBBuffer: !textureInfo.nonColorData)`. Every standard glTF slot
         * (normalTexture, occlusionTexture, metallicRoughnessTexture, ...) sets `nonColorData = true` on
         * itself before loading, which is why stock materials are correct. Textures referenced from our
         * CVTOOLS `customTextures` extras have no such marking, so they all defaulted to an sRGB hardware
         * buffer - the GPU then applies an sRGB->linear decode to values that were never color.
         *
         * For the terrain that is destructive: a normal atlas texel of 0.5 decodes to 0.214, so every
         * terrain fragment gets a normal tilted ~39 degrees off, and the splat weights are gamma-crushed
         * on top of it. The result is terrain that renders far too dark while ordinary meshes look right.
         * The details/layers atlas IS color and must stay sRGB, so only mark the true data maps.
         */
        private static readonly NonColorDataSamplers;
        /** True when a custom sampler holds linear data and must not be loaded as an sRGB color texture. */
        static IsNonColorDataSampler(samplerName: string): boolean;
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
    /** `LapCounter.cs:67`. Unity's tag on the timing line. Not corrected, not tidied (D-8). */
    const KART_FINISH_LINE_TAG: string;
    /**
     * `LapCounter.cs:115-123` — `stopDriftRot()`'s nominal length: 120 iterations x 0.01 s.
     *
     * **NOMINAL, because Unity's realised length is frame-rate dependent and this port's is not.**
     * `WaitForSeconds(0.01f)` cannot resume inside a frame, so at 60 fps the coroutine takes ~2 s and
     * at 144 fps ~0.83 s. This is the same shape as `RotatePlayerJumpPanel`'s 0.6 s (D-10.1), and it
     * is resolved the same way: take the nominal figure and make the approach rate-independent.
     */
    const KART_STOP_DRIFT_ROT_SECONDS: number;
    /**
     * `LapCounter.cs:121` — `Quaternion.Lerp(..., 8f * Time.deltaTime)`. Per second.
     *
     * Exported for the record and for tests; the unwind itself is applied by the KART, which is the
     * component that composes the model child's rotation, and which uses its own `modelYawRate` — the
     * same 8 from the same family of Unity lines (`Player.cs:1626`). Two constants that happen to
     * agree are not one constant, so this one is kept, cited, and pinned equal to that one by a test.
     */
    const KART_STOP_DRIFT_ROT_RATE: number;
    /**
     * How far above a checkpoint's own point a recovery puts the kart, units.
     *
     * **A PORT INVENTION, declared as one.** Unity's checkpoints are authored transforms and its
     * respawn positions come from `OutOfBounds.cs`'s own list, so there is no source line for this.
     * It exists because a checkpoint's point sits ON the racing surface and a kart placed exactly
     * there starts the frame interpenetrating the deck. Three units matches the track's own grid
     * clearance for a 1.643-unit chassis sphere.
     */
    const KART_CHECKPOINT_RESPAWN_LIFT: number;
    /**
     * One checkpoint, duck-typed.
     *
     * `node` is the only required field, and it is what the trigger is matched against — Unity
     * compares `other.transform == checkpoints.GetChild(currentCheckpointVal)`, i.e. by IDENTITY and
     * not by tag, so this does too. `position` and `heading` are optional and describe where a
     * recovery should put the kart; without them the node's own world transform is used, which is
     * Unity's shape (a checkpoint there is an empty authored where the kart should reappear).
     *
     * The distinction matters for this port's own track, whose checkpoint triggers are 90 units tall
     * and sunk 4 units so a clipped chassis still crosses them — their node position is 41 units above
     * the road and is emphatically not a place to put a kart.
     */
    interface IKartCheckpoint {
        node: BABYLON.TransformNode;
        position?: {
            x: number;
            y: number;
            z: number;
        };
        /**
         * Where a recovery should put the kart, when that is not simply `position`.
         *
         * **OPTIONAL, AND IT EXISTS BECAUSE A CHECKPOINT'S OWN POINT CAN BE UNDERGROUND.** A track
         * that places checkpoints along a PLAN centreline — the arc-length line answering "where does
         * the racing line run", not "how high is the road here" — puts that point several units under
         * the deck anywhere the road is banked. Measured on this project's own circuit: three of its
         * eight checkpoints, by 1.60, 2.65 and 1.96 units.
         *
         * Respawning there is not a cosmetic glitch. The kart is placed inside the corner mesh, falls
         * through it, trips the out-of-bounds volume, and is respawned to the same bad point — a loop
         * with no input that breaks it.
         *
         * This component cannot detect that on its own: it has no height sampler and no business
         * owning one. So the track supplies the surface answer here and this prefers it. Absent, the
         * behaviour is exactly what it was — `position` plus the lift.
         */
        respawnPosition?: {
            x: number;
            y: number;
            z: number;
        };
        /** Heading about world up, radians. */
        heading?: number;
    }
    /**
     * `LapCounter.cs` (146 lines). The lap rule, the checkpoint ring, the position key and the finish.
     *
     * **REGISTERED UNDER ONE NAME AND ONE ONLY** — `PROJECT.KartLapCounter`, at the bottom of this
     * file. No `PROJECT.LapCounter` alias: the Unity project exports this component under this name
     * and this casing, so both ends agree and there is nothing to bridge. A test asserts the NEGATIVE
     * as well, so a stray alias cannot creep back in.
     *
     * **SERIALIZED FIELD SPELLINGS ARE A SEPARATE AXIS AND STAY UNITY'S** — `LAPCOUNT`,
     * `currentCheckpointVal`, `totalCheckpointVal`, `checkpointsVisited`, `distanceToNextCheckpoint`,
     * `Position`, `endPosition`. The property bag arrives keyed by FIELD name, and D-8 records three
     * shipped instances of a field read under the port's own spelling being silently dropped.
     *
     * @class KartLapCounter
     */
    class KartLapCounter extends TOOLKIT.ScriptComponent {
        /** `LapCounter.cs:8` — **starts at 1, not 0.** The lap you are ON, not the laps completed. */
        LAPCOUNT: number;
        /** `LapCounter.cs:13`. Which checkpoint is next. Wraps to 0 at the count (`:40-43`). */
        currentCheckpointVal: number;
        /** `LapCounter.cs:15`. Checkpoints passed across the whole race. The position sort's key. */
        totalCheckpointVal: number;
        /** `LapCounter.cs:11`. One flag per checkpoint, cleared on every counted lap. */
        checkpointsVisited: boolean[];
        /** `LapCounter.cs:17`. The position sort's TIE-BREAK key. See `calculateDist`. */
        distanceToNextCheckpoint: number;
        /** `LapCounter.cs:18`. One-based rank, written by the race manager's sort. */
        Position: number;
        /** `LapCounter.cs:20`. Latched at the finish. Non-zero is also the "already finished" test. */
        endPosition: number;
        /**
         * `LapCounter.cs:48`/`:54` — Unity's `gameObject.tag == "Player"`.
         *
         * Only the player's lap counter ends the race; an AI's counts its own laps and does not touch
         * `RACE_COMPLETED`. There is no opponent system here (NG-1), so this defaults `true` and the
         * single racer is the player. Carried rather than assumed so the field is already right when
         * opponents land.
         */
        isPlayer: boolean;
        /** The checkpoint ring, in lap order. Index 0 is the first checkpoint after the line. */
        protected checkpoints: IKartCheckpoint[];
        /** The kart on this same transform, duck-typed, resolved once in `start()`. */
        protected kart: any;
        /** The race manager, duck-typed. Set by the game mode; never imported. */
        race: any;
        /**
         * Reads the authored property bag, under Unity's spellings (D-8).
         *
         * `LAPCOUNT` is the one a track or a prefab actually authors. The rest are read because a
         * Unity export writes whatever the Inspector showed, and a declared-but-unread field is a
         * field whose authored value is silently dropped — which is the failure mode D-8 exists for.
         */
        protected awake(): void;
        /**
         * Resolves the kart and subscribes to the trigger observables.
         *
         * **THE SAME PLUMBING THE CONTROLLER USES, DELIBERATELY.** `enableCollisionEvents()` plus
         * `onTriggerEnterObservable` is exactly how `StandardKartController.attachCollisionEvents`
         * wires itself, so both components see the same events from the same body in the same
         * post-step window. Two different subscription mechanisms on one rigidbody would be two
         * different delivery orders, which is the sort of thing that makes a lap count depend on
         * component attach order.
         *
         * **AND THE KART'S OWN HANDLER IGNORES BOTH OF OUR TAGS, WHICH WAS CHECKED RATHER THAN
         * ASSUMED.** `onVolumeEnter`'s dispatch has arms for `Water`, `OutOfBounds`, `AntiGravity`,
         * `AntiGravityFalse`, `JumpPanel`, `GliderPanelFly`, `Boost`, `CancelDownForce`,
         * `ColliderInAir` and `TrickCollider` — and none for `NextLapCollider` or `Checkpoint`. So the
         * two timing tags fall through it untouched and cannot disturb the kart's own state.
         */
        protected start(): void;
        /**
         * Finds the kart controller on this transform without importing it.
         *
         * Duck-typed on two members no other component on a kart root carries together, which is the
         * same test `KartOutOfBounds.resolveKart` uses and for the same reason: an import here would be
         * circular in the UMD build.
         */
        protected resolveKart(): any;
        /**
         * Hands over the ordered checkpoint ring and sizes the visited array (`LapCounter.cs:28-32`).
         *
         * Unity sizes it from `checkpoints.childCount` in `Start()`; here the mode hands the list over,
         * because the track builds them and there is no parent-transform convention to lean on.
         * Re-callable: it resets the cursor and the visited array, which is what makes a track swap or
         * a test's second race start from a clean ring rather than from the previous one's cursor.
         */
        setCheckpoints(checkpoints: IKartCheckpoint[]): void;
        /** The checkpoint ring, in lap order. A copy — a caller cannot reorder the race. */
        getCheckpoints(): IKartCheckpoint[];
        /** `LapCounter.cs:102-113`. Whether every checkpoint on this lap has been visited. */
        checkAllPoints(): boolean;
        /**
         * `LapCounter.cs:65-100`. The whole lap rule, transcribed.
         *
         * Order matters and is Unity's: the finish line is tested FIRST and by tag, and everything
         * else is tested by IDENTITY against the checkpoint the cursor is on. A trigger that is
         * neither does nothing at all, which is what lets a boost pad and a checkpoint sit on the same
         * stretch of road without interfering.
         */
        protected onTimingTrigger(other: BABYLON.TransformNode): void;
        /**
         * Tells the kart where a recovery should put it.
         *
         * **`setRespawnPoint` ALONE, AND NEVER `clearTransientState()` (D-12).** The kart's own
         * docblock says "a race manager calls this from its checkpoint logic", and the split is
         * load-bearing: a checkpoint inside an anti-gravity section has to hand the kart back **still
         * in anti-gravity**, or the recovery drops it off the wall it was recovered onto. SPEC.md is
         * explicit that "a later tidy-up that merges the two would pass every test in the suite and
         * break the race case" — so this calls the race contract and nothing else.
         */
        protected applyRespawnPoint(checkpoint: IKartCheckpoint): void;
        /** A checkpoint's own point, or its node's world position when it does not carry one. */
        protected checkpointPosition(checkpoint: IKartCheckpoint): BABYLON.Vector3;
        /**
         * Where a recovery goes — `respawnPosition` when the track supplied one, else `position`.
         *
         * **A SEPARATE ACCESSOR RATHER THAN A CHANGE TO `checkpointPosition`, AND THE SPLIT IS
         * LOAD-BEARING.** That method feeds two callers: this one, and `calculateDist`, which
         * measures how far the kart is along the lap and is the key the position sort runs on.
         * Folding the surface height into it would move every distance figure in the race — quietly,
         * because the sort would still work and only the numbers would differ. The two questions are
         * "where is this checkpoint on the plan" and "where is it safe to put a kart", and only the
         * second one wants the deck.
         *
         * See `IKartCheckpoint.respawnPosition` for what happens when the plan point is used for
         * a recovery on a banked corner.
         */
        protected checkpointRespawnPosition(checkpoint: IKartCheckpoint): BABYLON.Vector3;
        /**
         * A checkpoint's facing, as a quaternion about world up.
         *
         * Built from the authored heading when there is one. Falling back to the node's own rotation
         * reads `rotationQuaternion` **directly** rather than deriving a facing from `getWorldMatrix()`
         * — Conventions:539-596, and this is the destructive category: the result is written back as an
         * orientation, so a value cached from the last render would be put back as the truth.
         */
        protected checkpointRotation(checkpoint: IKartCheckpoint): BABYLON.Quaternion;
        /**
         * `LapCounter.cs:37-63` — Unity's `Update()`.
         *
         * **SELF-TICKING, unlike `KartRaceManager`, and the asymmetry is deliberate.** The race
         * manager is driven by the game mode because its countdown has to be started at a moment the
         * mode chooses and because `chargeLaunch` must run before it in the frame (the mode owns that
         * ordering). This component has no such ordering constraint — Unity runs it from `Update()`
         * like any other MonoBehaviour — so it runs from its own `update()` and the mode must NOT tick
         * it as well. `tick(dt)` is public purely so a test can drive it without a render loop.
         */
        protected update(): void;
        /**
         * One frame of the lap counter.
         *
         * @param dt Seconds since the last call.
         */
        tick(dt: number): void;
        /**
         * `LapCounter.cs:54-60`. The finish.
         *
         * Four things happen once and only once, and `endPosition == 0` is the latch that makes it
         * once: set `RACE_COMPLETED`, record the finishing position, stop the drift, and unwind the
         * model child's rotation.
         *
         * `endPosition` doubling as the latch is Unity's, and it works because `Position` is
         * one-based — a racer who has finished has a non-zero `endPosition` by construction. It is
         * transcribed rather than replaced with a boolean because the field is serialized and a Unity
         * export authors it.
         */
        protected checkForFinish(): void;
        /** Whether the post-finish unwind is still running. Answered by the kart, which owns it. */
        isStopDriftRotRunning(): boolean;
        /**
         * `LapCounter.cs:125-145`. The position sort's tie-break key.
         *
         * Projects the kart-to-next-checkpoint vector onto the segment direction between the PREVIOUS
         * checkpoint and the next one, and takes the magnitude. Unity's `Vector3.Project(a, b)` is
         * `b * (a·b / b·b)`, so the magnitude is `|a·b| / |b|`.
         *
         * **IT IS A PROJECTION AND NOT A DISTANCE, WHICH IS THE POINT.** Unity's own commented-out
         * line at `:143` is the naive `Vector3.Distance`, and it was replaced for a reason: on a
         * curved track two racers equidistant from the same checkpoint as the crow flies can be a long
         * way apart ALONG THE TRACK, and the sort would rank them arbitrarily. Projecting onto the
         * segment measures progress down the road, which is what a race position means.
         *
         * Ported now even though the field is one racer long today, because the alternative — write it
         * when opponents land — means re-deriving four lines against a system that already has bugs of
         * its own, which is exactly how transcription errors get in.
         *
         * **ONE DEVIATION, NAMED HERE BECAUSE IT IS INVISIBLE OTHERWISE.** `LapCounter.cs:131`, `:135`
         * and `:138` all read `checkpoints.GetChild(i).position` — the checkpoint NODE's world
         * position. This reads `checkpointPosition()`, which prefers the checkpoint's AUTHORED point
         * and falls back to the node only when there is none. On a Unity track the two are the same
         * thing, because a checkpoint there is an empty authored where you want it. On THIS track they
         * are 41 units apart vertically: the trigger boxes are 90 units tall and sunk 4, so their node
         * origin floats well above the road.
         *
         * **AND ON THIS TRACK IT CHANGES THIS METHOD'S ANSWER BY NOTHING, WHICH IS WORTH SAYING RATHER
         * THAN OVERSTATING.** An earlier version of this note claimed using the node would "tilt every
         * segment direction". It would not: every trigger sits at the same `y`, so the 41 units are a
         * CONSTANT offset on both endpoints and cancel exactly out of `next - previous`. The segment
         * direction is bit-identical either way here. The preference is real but it earns its keep
         * elsewhere — at `applyRespawnPoint`, which would otherwise drop the kart from 41 units up —
         * and on any track that spaces its checkpoints at different heights, where the offset stops
         * being constant and the cancellation stops holding. Pinned by a test that builds a ring where
         * the two answers genuinely differ, precisely because this track cannot show the difference.
         */
        protected calculateDist(): void;
        /**
         * Puts the counter back to the start of a race.
         *
         * Not a port of anything — Unity reloads the scene. It exists because this port's state is on
         * an instance rather than in a fresh scene, and because a test that could not rewind would
         * need a new component per assertion.
         */
        resetLaps(): void;
    }
}
declare namespace PROJECT {
    /**
     * `OutOfBounds.cs`. The three recovery flags Unity keeps beside `Player` rather than inside it.
     * @class KartOutOfBounds
     */
    class KartOutOfBounds extends TOOLKIT.ScriptComponent {
        /** `OutOfBounds.cs:8`. The kart is in water and is being fished out. */
        FellInWater: boolean;
        /** `OutOfBounds.cs:9`. The kart is off the track and is being put back. */
        outOfBounds: boolean;
        /**
         * `OutOfBounds.cs:10` — Unity's own comment on this line is `//for camera`.
         *
         * **THE ONE FLAG WITH A READER OUTSIDE THE RECOVERY CODE.** `Camerafollow.cs:44` skips its
         * ENTIRE update while this is true, which is what stops the view whipping across the level
         * while a respawn is in flight. `StandardKartCamera` already honours it through the kart
         * target interface; this field is how a Unity-authored prefab's value gets there.
         */
        PlayerBeingMoved: boolean;
        /** The kart on this same transform, resolved once. Null on a node that carries no controller. */
        private kart;
        protected awake(): void;
        /**
         * Pushes the authored values ONTO the kart, once, then never again.
         *
         * `start` and not `awake`: component awake order is not guaranteed, and writing into a kart
         * that has not read its own properties yet would be overwritten moments later.
         */
        protected start(): void;
        /**
         * Mirrors the kart's live state back onto this component every frame.
         *
         * **ONE DIRECTION ONLY, and deliberately.** The kart is the owner: it runs the respawn timer
         * and it is what actually sets and clears these. Writing them back the other way each frame
         * would let a stale value here fight the state machine there, and the bug that produces — a
         * respawn that will not finish — is exactly the kind that is hard to attribute.
         */
        protected update(): void;
        /** The `StandardKartController` on this transform, found by duck typing rather than by import. */
        private findKart;
    }
}
declare namespace PROJECT {
    /**
     * `3,2,1UI.controller` -> state `3,2,1,Go` -> `m_Speed: 0.33`.
     *
     * Every wall-clock figure in this file is a clip time divided by this. Kept as its own named
     * constant rather than folded into the six results so that the derivation is visible and so that
     * a test can mutate it and watch every beat move — which is what proves the reading rather than
     * merely restating it.
     */
    const COUNTDOWN_CLIP_SPEED: number;
    /**
     * What a countdown beat IS, so the dispatcher can be a table rather than five `if`s.
     *
     * A plain `enum`, not a `const enum`: `tsconfig.app.json` sets `isolatedModules: true`, under
     * which esbuild cannot inline a `const enum` across module boundaries — and this one is exported.
     * It also matches `EKartBoostSource` and `EKartDriftState` next door, and a plain enum survives
     * the UMD promotion as an object the runtime can name a member of.
     */
    enum EKartCountdownEvent {
        /** `UtilityFunctions.countDownNoise()` — one of the three "3, 2, 1" beeps. */
        Beep = 0,
        /** `UtilityFunctions.goSound()`. */
        Go = 1,
        /** `UtilityFunctions.raceStarted()` — the green light. */
        Start = 2
    }
    /** One scheduled beat: what fires, and the wall-clock second it fires at. */
    interface IKartCountdownBeat {
        kind: EKartCountdownEvent;
        /** Seconds after `startCountdown()`. Clip time / `COUNTDOWN_CLIP_SPEED`. */
        at: number;
    }
    /**
     * The five beats, in order, in wall-clock seconds.
     *
     * **DERIVED HERE RATHER THAN WRITTEN OUT**, so that mutating `COUNTDOWN_CLIP_SPEED` moves every
     * one of them together. A table of six pre-divided literals would let the speed and the beats
     * disagree, which is the failure mode that made this reading worth checking twice.
     */
    const KART_COUNTDOWN_BEATS: IKartCountdownBeat[];
    /** `3,2,1,Go.anim`'s `m_StopTime` in wall clock. Nothing fires here; it is when the UI clears. */
    const KART_COUNTDOWN_LENGTH: number;
    /** `RACE_MANAGER.cs:102` — `if (sortTime > 0.1f)`. The position sort's period, seconds. */
    const KART_POSITION_SORT_INTERVAL: number;
    /**
     * `RACE_MANAGER.cs`. The race lifecycle: two flags, two clocks, the countdown and the sort.
     *
     * **REGISTERED UNDER ONE NAME AND ONE ONLY** — `PROJECT.KartRaceManager`, at the bottom of this
     * file. There is deliberately no `PROJECT.RACE_MANAGER` alias, and adding one would be a
     * regression rather than a convenience. glTF rehydration keys on the exported MonoBehaviour name,
     * so a Unity prefab carrying `RACE_MANAGER` would fail to resolve against a port name — and that
     * is answered by **owning the other end**: the Unity project exports this component under this
     * name and this casing, so both ends agree and there is nothing to bridge. Dual registration only
     * papers over a mismatch. A test asserts the NEGATIVE as well, so a stray alias cannot creep back.
     *
     * **SERIALIZED FIELD SPELLINGS ARE A SEPARATE AXIS AND STAY UNITY'S** — `RACE_STARTED`,
     * `RACE_COMPLETED`, `countDownTime`, `RaceTime`, `MAXLAPS`, capitals and all. The property bag
     * arrives from `extras.metadata.components` keyed by FIELD name, and D-8 records three shipped
     * instances of a field read under the port's own spelling being silently dropped: the default
     * stands and nothing looks broken. A class alias is a lookup key; a field name is a payload key.
     *
     * **THESE ARE INSTANCE FIELDS WHERE UNITY'S ARE `static`.** `RACE_MANAGER.RACE_STARTED` and
     * `RACE_COMPLETED` are statics (`:34-35`), which is how a MonoBehaviour on another GameObject
     * reads them without a reference. Statics on a port that a test suite stands up dozens of times in
     * one process are a different thing entirely — one leaked `true` would make every later scene
     * start mid-race, and the failure would look like a flaky test rather than a shared global. So
     * they are per-instance and the mode pushes them onto the kart and the camera, exactly as
     * `KartOutOfBounds` mirrors its three flags one way (D-10.3).
     *
     * @class KartRaceManager
     */
    class KartRaceManager extends TOOLKIT.ScriptComponent {
        /** `RACE_MANAGER.cs:34` — the green light. Set by the countdown; read by the kart and camera. */
        RACE_STARTED: boolean;
        /** `RACE_MANAGER.cs:35` — the finish. Set by the LAP COUNTER (`LapCounter.cs:56`), not here. */
        RACE_COMPLETED: boolean;
        /**
         * `RACE_MANAGER.cs:64`. Seconds since the countdown was triggered.
         *
         * **IT NEVER STOPS, AND THAT IS TRANSCRIBED RATHER THAN OVERLOOKED.** `:88-91` accumulates
         * while `startCountDownInternalTimer` is set, and `:190` sets that flag `true` and **nothing
         * anywhere sets it back to `false`** — so in Unity this clock runs for the whole race, not
         * just for the countdown. Nobody notices because its only reader is `ComputerDriver.cs:174`,
         * which is itself gated on `!RACE_STARTED`.
         *
         * It is kept faithful because it is free to keep and a "fix" would be an invention. Anything
         * that wants "is the countdown on screen" should ask `isCountdownRunning()`, which is a real
         * answer, rather than comparing this against a length.
         */
        countDownTime: number;
        /**
         * `RACE_MANAGER.cs:25`. Elapsed race time, seconds.
         *
         * Accumulates **only** while `RACE_STARTED && !RACE_COMPLETED` (`:93-95`), which is what makes
         * it the finishing time rather than a session clock: it does not run during the countdown and
         * it stops dead on the line.
         */
        RaceTime: number;
        /** `RACE_MANAGER.cs:70` — `public int MAXLAPS = 3;`. */
        MAXLAPS: number;
        /**
         * `RACE_MANAGER.cs:28`. Every racer's lap counter, duck-typed.
         *
         * Duck-typed rather than imported: `KartLapCounter` is a sibling in the same UMD
         * namespace and importing it here would be circular. All this file reads is
         * `totalCheckpointVal`, `distanceToNextCheckpoint` and `Position`.
         */
        lapCounters: any[];
        /** `RACE_MANAGER.cs:29`. The last sort's result, first place first. */
        sortedRacers: any[];
        /**
         * Fired on each of the three beeps (`UtilityFunctions.countDownNoise()`), zero-based.
         *
         * A settable callback rather than an event bus, for the same reason everything else here is
         * duck-typed: a promotable component may not import the app's bus, and a race mode that wants
         * to post a HUD message can assign one line. `null` means nobody is listening, which is the
         * bench's case and every unit test's.
         */
        onCountdownBeep: ((index: number) => void) | null;
        /** Fired at the GO sound (`UtilityFunctions.goSound()`), 0.0505052 s before the green light. */
        onGoSound: (() => void) | null;
        /** Fired when `RACE_STARTED` goes true (`UtilityFunctions.raceStarted()`). */
        onRaceStart: (() => void) | null;
        /** `RACE_MANAGER.cs:65`. Set by `startCountdown()`; never cleared, exactly as Unity's is. */
        private countDownClockRunning;
        /** How many of `KART_COUNTDOWN_BEATS` have fired. The cursor that makes each one one-shot. */
        private countdownBeat;
        /** `RACE_MANAGER.cs:32`. Seconds since the last position sort. */
        private sortTime;
        /**
         * Reads the authored property bag.
         *
         * Every key is Unity's own spelling (D-8). `MAXLAPS` is the one a track or a race mode
         * actually authors; the rest are here because a Unity export writes whatever the Inspector
         * showed, and a field this component declares but does not read is a field whose authored
         * value is silently dropped.
         */
        protected awake(): void;
        /**
         * Starts the countdown clock — the equivalent of Unity's `Timer` animator trigger.
         *
         * `RACE_MANAGER.cs:189` fires that trigger and sets `startCountDownInternalTimer` on the same
         * line, so the clip and the clock start together and every figure in this file's header is
         * measured from HERE. The five seconds of pre-roll above it are not ported — see the header.
         */
        startCountdown(): void;
        /** Whether the countdown clip would still be on screen. Not the same as "the clock is running". */
        isCountdownRunning(): boolean;
        /** How many of the five beats have fired. 0 before the first beep, 5 after the green light. */
        getCountdownBeat(): number;
        /**
         * How many beeps have sounded — 0, 1, 2 or 3. What a HUD paints as "3", "2", "1".
         *
         * Derived from the cursor rather than counted separately, because two counters for one fact
         * is two things that can disagree.
         */
        getBeepCount(): number;
        /**
         * One frame of the race clock. Called by the game mode; nothing here runs off `update()`.
         *
         * **DRIVEN RATHER THAN SELF-TICKING, AND THAT IS THE TESTABILITY DECISION.** A component that
         * read its own `getDeltaSeconds()` could only be tested by standing up a scene and rendering,
         * which would put a `NullEngine` and a render loop between a test and five arithmetic
         * thresholds. Handed a `dt`, the whole countdown is testable with no harness at all — which is
         * what lets the rate sweep run 30, 60 and 144 Hz in milliseconds instead of minutes.
         *
         * @param dt Seconds since the last call.
         */
        tick(dt: number): void;
        /**
         * Fires every beat the clock has now passed, in order, at most once each.
         *
         * A `while` rather than an `if` so a long frame that steps over two beats still fires both in
         * order. At the rates this game runs at that cannot happen — the beats are 1.01 s apart and
         * the closest pair is the GO sound and the green light at 0.0505052 s, which is three frames
         * at 60 Hz — but a tab that was backgrounded mid-countdown hands back one enormous delta, and
         * a countdown that silently skipped "2" would be a very hard bug to see.
         */
        private fireCountdownBeats;
        /**
         * Turns one beat into its effect.
         *
         * `noFallthroughCasesInSwitch` is the one strict flag this project has on, and a fallthrough
         * in a race state machine is precisely what it is on for — every arm ends in a `break`.
         */
        private dispatchBeat;
        /**
         * `RACE_MANAGER.cs:193-215`. Ranks the field and writes each racer's `Position`.
         *
         * Sorted by `totalCheckpointVal` DESCENDING — whoever has passed the most checkpoints is
         * ahead — tie-broken by `distanceToNextCheckpoint` ASCENDING, so between two racers on the
         * same checkpoint the one closer to the next one leads. `Position` is one-based.
         *
         * **WITH ONE RACER THIS IS A ONE-ELEMENT SORT THAT ALWAYS YIELDS 1st, AND IT IS PORTED ANYWAY.**
         * The alternative — hardcode "1st" and write the sort when opponents land — is how
         * transcription errors get in: the comparator is four lines and re-deriving it later against a
         * system that already has bugs of its own is strictly worse. The HUD contract says plainly
         * that the value is constant until an opponent system exists (NG-1), rather than implying a
         * race is being run.
         *
         * One divergence with no observable consequence, recorded because it is the kind of thing that
         * gets "found" later: `List<T>.Sort` in C# is UNSTABLE and `Array.prototype.sort` in JS has
         * been stable since ES2019. Two racers identical on both keys therefore keep insertion order
         * here and take an arbitrary one in Unity. Identical on both keys means the same checkpoint
         * and the same distance to the next, to a float — so it is a tie the game has no way to break
         * meaningfully in either engine.
         */
        calculateRacerPosition(): void;
        /** The last sort's ranking, first place first. A copy, so a caller cannot reorder the field. */
        getSortedRacers(): any[];
        /**
         * Puts the manager back to its pre-countdown state.
         *
         * Not a port of anything — Unity reloads the scene. It exists because this port's clocks are
         * instance fields rather than statics, so "start again" has to mean something concrete, and
         * because a test that could not rewind would have to build a new component per assertion.
         */
        resetRace(): void;
    }
}
declare namespace PROJECT {
    /**
     * Base for every volume component: reads its own declared properties in `awake()`, nothing else.
     *
     * Subclasses list their fields and call `readProperties` with the names. That is a deliberate
     * eleven-fold saving over writing `this.x = this.getProperty("x", this.x)` a hundred times, and it
     * cannot drift out of step with the field list the way the repeated form does.
     */
    abstract class KartVolume extends TOOLKIT.ScriptComponent {
        /** Copies each named property off the component's serialized properties, keeping the default. */
        protected readProperties(names: string[]): void;
    }
    /**
     * `AntiGravity`. Turns the kart's anti-gravity mode ON and keeps it on (`Player.cs:1280-1287`).
     * @class KartAntiGravityVolume
     *
     * The flag is a LATCH: leaving this volume does not clear it, only a `KartAntiGravityExitVolume`
     * does. That is what lets a barrel be entered through a thin trigger at its mouth and then hold
     * the kart to wall and ceiling for the whole section.
     */
    export class KartAntiGravityVolume extends KartVolume {
        /**
         * Whether the camera child takes the two angles below at all.
         *
         * Read by the KART, not by the camera (`StandardKartController.enterAntiGravityVolume`): with
         * it off the kart simply reports a zero payload, so a volume that declines the lean and a
         * volume with no lean to give are the same thing downstream.
         */
        rotateCam: boolean;
        /** Extra PITCH for the camera child while inside, degrees (`Camerafollow.cs:101-111`). */
        rotAmountX: number;
        /**
         * Extra ROLL for the camera child while inside, degrees.
         *
         * Leave at 0 for a symmetric tube. A non-zero value rolls the VIEW independently of the kart,
         * which is right for a corkscrew and wrong for anything else.
         */
        rotAmountZ: number;
        /** Whether an item may be fired inside this section. Carried for the item system; unused here. */
        canUseBullet: boolean;
        protected awake(): void;
    }
    /**
     * `AntiGravityFalse`. Clears anti-gravity and realigns the kart to the world frame (`1288-1299`).
     * @class KartAntiGravityExitVolume
     *
     * The per-axis booleans are the interesting part. A track usually wants to fix the PITCH and the
     * ROLL — the kart may be leaving upside down — while leaving the YAW alone, because forcing a
     * heading takes the corner away from the driver. So `rotateY` is normally `false`.
     *
     * The enabled axes approach `newRotation` at **1/s for X** and **3/s for Y and Z** (the kart's
     * `antiGravityExitRateX` / `antiGravityExitRateYZ`). Pitch is deliberately the slow one: it carries
     * most of the error coming off a barrel, and snapping it is what reads as the camera being yanked.
     */
    export class KartAntiGravityExitVolume extends KartVolume {
        /** Steer the kart's PITCH toward `newRotation.x`. */
        rotateX: boolean;
        /** Steer the kart's YAW toward `newRotation.y`. Normally `false` — see the class note. */
        rotateY: boolean;
        /** Steer the kart's ROLL toward `newRotation.z`. */
        rotateZ: boolean;
        /** The world attitude to realign to, Euler degrees. Only the enabled axes are read. */
        newRotation: BABYLON.Vector3;
        protected awake(): void;
    }
    /**
     * `GliderPanelFly`. Opens the glider on trigger **EXIT**, not entry (`Player.cs:1109-1214`).
     * @class KartGliderVolume
     *
     * The exit trigger is not an accident of the port: the volume sits over the launch ramp and the
     * glider is meant to open as the kart LEAVES it, at the lip, not while it is still on the boards.
     */
    export class KartGliderVolume extends KartVolume {
        /** The rig's ROLL while gliding, degrees (`Camerafollow.cs:84`). */
        glideAngle: number;
        /** Pitch trim while gliding, degrees. Every pitch target is stated relative to this. */
        glideAngleX: number;
        protected awake(): void;
    }
    /**
     * `GliderPanel`. A surface a gliding kart may still realign to, and a 2 s boost on the way out.
     * @class KartGliderPanel
     *
     * No payload. It is a TAG with a component, and it earns its place twice: after 3 s of gliding the
     * kart realigns to `GliderPanel` surfaces and nothing else (`Player.cs:2044-2050`), and leaving one
     * grants a 2 s boost plus a decaying upward impulse (`1077`, `1095-1104`).
     */
    export class KartGliderPanel extends KartVolume {
    }
    /**
     * `JumpPanel`. Launches the kart on a long arc and grants a 2 s boost (`Player.cs:954-980`).
     * @class KartJumpPanel
     *
     * **BOTH DEFAULTS LOOK WRONG AND ARE RIGHT.** `upforce` is NEGATIVE because it is applied along the
     * kart's local DOWN (`AddRelativeForce(down * upForce, ...)`), so a negative down-force is an
     * upward push. And it decays: `upforce` lerps toward `downforce` at 2.5/s during the flight, which
     * is the arc. Do not "fix" either sign.
     */
    export class KartJumpPanel extends KartVolume {
        /** Launch force along local DOWN. Negative, so it pushes UP. `JumpPanel.cs`. */
        upforce: number;
        /** What `upforce` decays toward at 2.5/s during the flight. Positive: it pulls the arc down. */
        downforce: number;
        protected awake(): void;
    }
    /**
     * `JumpPanelRotate`. Forces a yaw/roll on the kart over 0.6 s while it is in a jump-panel flight.
     * @class KartJumpPanelRotate
     *
     * **THIS ONE DRIVES THE KART FROM THE VOLUME SIDE, and it is the only one that does.** `Player.cs`
     * never reads it — the Unity component runs the rotation itself against whatever entered it
     * (Analysis §E). Ported as a payload the kart consumes, because the alternative is a track
     * component that reaches into the kart's transform, which is the one thing FR-0's split exists to
     * prevent. The numbers and the 0.6 s are unchanged; only who applies them moved.
     */
    export class KartJumpPanelRotate extends KartVolume {
        /** Yaw to force during the flight, degrees. */
        rotateY: number;
        /** Roll to force during the flight, degrees. */
        rotateZ: number;
        protected awake(): void;
    }
    /**
     * `TrickCollider`. Arms the air trick. Without touching one, the trick input does nothing (`229`).
     * @class KartTrickVolume
     *
     * No payload. It exists so a track author can say WHERE a trick is allowed — off this ramp, not off
     * that kerb — rather than the kart deciding from its own state alone.
     */
    export class KartTrickVolume extends KartVolume {
    }
    /**
     * `AirForce`. A steady push applied while the kart is inside (`Player.cs`'s `colliderInAir` path).
     * @class KartAirForceVolume
     *
     * The wind tunnels and the finish-line funnels. The three `isFor*` flags are a gate on WHEN it
     * applies, and they are not mutually exclusive — `isONLYforRaceEnd` is the strict one, and its
     * shouted spelling is Unity's (see the file header on why it is not tidied).
     */
    export class KartAirForceVolume extends KartVolume {
        /** Force magnitude. `colliderInAir.cs`. */
        force: number;
        /** Apply along the VOLUME's local axes rather than the world's. */
        relativeForce: boolean;
        /** Only apply while the kart is airborne. */
        isForAir: boolean;
        /** Also apply during the race-end sequence. */
        isForRaceEnd: boolean;
        /** Apply ONLY during the race-end sequence. Unity's spelling; not a typo to fix. */
        isONLYforRaceEnd: boolean;
        protected awake(): void;
    }
    /**
     * `Boost`. A boost pad: contact grants `duration` seconds of boost (`Player.cs:507`).
     * @class KartBoostPad
     *
     * Like every other boost source in the game it does exactly one thing — write `Boost_time`. There
     * is no separate "pad boost"; the tiers, the jump panels and this all feed the same number.
     */
    export class KartBoostPad extends KartVolume {
        /** Seconds of boost granted on contact. */
        duration: number;
        protected awake(): void;
    }
    /**
     * `CancelDownForce`. Suppresses the kart's manual downforce and damps its fall (`982`/`1273-1278`).
     * @class KartCancelDownForce
     *
     * No payload. Two effects, and it needs both to read as anything: without the 0.98-per-step
     * vertical damping it merely stops pulling the kart down, which on its own is nearly invisible.
     * Together they float it.
     */
    export class KartCancelDownForce extends KartVolume {
    }
    /**
     * `Dirt`. The off-track surface: caps the kart at `maxSpeed` and clears `grounded` (`502-503`).
     * @class KartDirtSurface
     *
     * **THE CAP IS INDIRECT AND THAT IS THE MECHANIC.** Unity writes `max_speed = 30` once, on contact,
     * and never writes it back — what actually keeps the kart slow is `grounded = false`, which drops
     * it into the airborne branch of the pace table. Reading this as "a 30 u/s speed limit" and
     * implementing it as one produces dirt that slows you and still lets you steer, which is not what
     * dirt does.
     */
    export class KartDirtSurface extends KartVolume {
        /** The cap written on contact, u/s. `Player.cs:502`. */
        maxSpeed: number;
        protected awake(): void;
    }
    export {};
}
declare namespace PROJECT {
    /**
     * Which family a slot belongs to. One switch mutes a whole family.
     *
     * Groups exist so an integrator replacing, say, the entire item layer does not have to name
     * eleven slots to silence ours first.
     */
    type KartAudioGroup = 
    /** The engine and idle loops. */
    "engine"
    /** The drift steering loop and the charge tone. */
     | "drift"
    /** The payout voice rota. */
     | "boost"
    /** The hop blip. */
     | "hop"
    /** The jump-trick and glider-trick voices. */
     | "trick"
    /** The glider's start, flutter and close. */
     | "glider"
    /** Landings, the chassis thud and the ramp launch. */
     | "impact"
    /** The countdown rev and the start dash. */
     | "start"
    /** Coins, item hits, bullet bill, star power, the hurt lines. */
     | "item"
    /** The finish and the lap stingers the RACE owns. */
     | "race"
    /** Anti-gravity: hover zone, hover charge, finish hover. */
     | "hover"
    /** Results-screen stingers. */
     | "results";
    /**
     * One entry in the default roster.
     *
     * `unity` is provenance rather than behaviour and is carried so a future reader can check a
     * figure against the scene without re-deriving the `fileID` walk.
     */
    interface IKartVoiceSlot {
        /** Stable id. The key for every override, every trigger and every getter. */
        id: string;
        /** Where it comes from — the array, the index and the clip file. Provenance only. */
        unity: string;
        /** Which family mutes it. */
        group: KartAudioGroup;
        /** Default child-node name an `AudioSource` is looked up under (tier 2). */
        sourceName: string;
        /** The scene's own `m_Volume` for this clip. Scales the master. */
        volume: number;
        /** The scene's own `Loop` flag. A loop is never aged — see `IKartAudioVoice.advance`. */
        looping: boolean;
        /** Synth waveform. A placeholder choice. */
        waveform: string;
        /** Synth frequency, Hz. A placeholder choice. */
        frequency: number;
        /** Synth peak gain. A placeholder choice. */
        gain: number;
        /** Synth attack, seconds. Also half the one-shot's retirement clock. */
        attack: number;
        /** Synth release, seconds. Also half the one-shot's retirement clock. */
        release: number;
    }
    /**
     * **THE DEFAULT SOUND SET FOR THE KART SYSTEM.** Forty-nine voices, none of them stubs.
     *
     * Ordered by Unity array so the table can be diffed against the scene. Ids are names rather than
     * indices deliberately: Unity's own indices are undocumented, and one of them
     * (`effectSounds[26]`, `Player.cs:1687`) is out of range in the shipped scene, which is not a
     * numbering worth inheriting.
     */
    const KART_VOICE_SLOTS: IKartVoiceSlot[];
    /**
     * The rota slots — arrays in Unity, so they are generated rather than written out.
     *
     * Each entry becomes `<prefix>0`, `<prefix>1`, ... at build time. **THE COUNTS ARE UNITY'S OWN
     * ARRAY LENGTHS**, read from the scene: six payout voices (not three, which is what this port
     * shipped first and which made the rota wrap twice as often as Unity's), three trick voices,
     * three star, three bullet, three hurt.
     */
    interface IKartVoiceRota {
        /** Id prefix. Slot ids are `prefix + index`. */
        prefix: string;
        /** How many. Unity's array length. */
        count: number;
        unity: string;
        group: KartAudioGroup;
        sourceName: string;
        volume: number;
        waveform: string;
        /** Base frequency; each voice is offset by `spread` per index so a rota sounds varied. */
        frequency: number;
        spread: number;
        gain: number;
        attack: number;
        release: number;
    }
    /** The five rotas. See `IKartVoiceRota` for why the counts are not a taste choice. */
    const KART_VOICE_ROTAS: IKartVoiceRota[];
    /**
     * Expands the rotas into flat slots and concatenates them with the fixed table.
     *
     * A function rather than a second constant so the two halves cannot fall out of step, and so a
     * changed rota count is one number rather than N table rows.
     */
    function buildKartVoiceSlots(counts?: any): IKartVoiceSlot[];
    /**
     * One playable voice.
     *
     * FOUR METHODS AND NO MORE, deliberately: it is the intersection of what `TOOLKIT.AudioSource`
     * offers and what a Web Audio oscillator can honestly implement. Anything richer would push the
     * synth into pretending.
     */
    interface IKartAudioVoice {
        /** Start from the beginning. Calling it while already playing is a restart. */
        play(): void;
        /** Start after a delay, seconds — Unity's `PlayDelayed`. */
        playDelayed(delaySeconds: number): void;
        /** Stop and reset the playhead. */
        stop(): void;
        /** Whether it is currently sounding (or scheduled to). */
        isPlaying(): boolean;
        /** Multiply the base pitch. `1` is unmodified. */
        setPitch(value: number): void;
        /** `[0..1]`. */
        setVolume(value: number): void;
        /**
         * Ages the voice by one frame, so a one-shot can stop reporting itself as playing.
         *
         * **THIS EXISTS BECAUSE `isPlaying()` WAS A ONE-WAY LATCH, AND THAT WAS A REAL DEFECT.**
         * `KartSynthVoice.playDelayed` set `playing = true` and nothing ever set it back except an
         * explicit `stop()` — so a one-shot reported itself as sounding forever, in the browser as
         * well as headlessly (the browser path schedules `oscillator.stop(...)` on the audio clock but
         * never touches the flag).
         *
         * What that broke is `Check_if_playing()` (`PlayerSounds.cs:154-162`), which refuses a new
         * payout while ANY payout voice is sounding. With a latched flag it refused **every** payout
         * after the first, for the rest of the session: one boost voice per race, then silence. The
         * existing rota test hid it in plain sight by calling `stop()` between grants and describing
         * that as "the only thing that reopens the gate" — which was accurate about the code and is
         * the reason the gap survived; nothing in the game calls it.
         *
         * A LOOP IS NEVER AGED. Unity's looping `AudioSource`s report `isPlaying` until stopped, and
         * the drift charge tone's whole retrigger mechanic is built on that, so `advance` must not
         * touch them. `KartSynthVoice` gives a loop an infinite remaining time rather than special-
         * casing it at the call site.
         *
         * `KartClipVoice` implements this as a NO-OP on purpose: a real `TOOLKIT.AudioSource` tracks
         * its own playhead and answers `isPlaying` correctly without help. The method is on the
         * interface rather than on the synth alone so the component can age every voice without
         * asking which kind it is.
         */
        advance(dt: number): void;
        /** Release anything held. */
        dispose(): void;
        /** How many times `play`/`playDelayed` has been called. Telemetry, and the tests' oracle. */
        getPlayCount(): number;
        /** The delay the last start was scheduled with, seconds. */
        getLastDelay(): number;
    }
    /**
     * The synthesised voice — P-7's default.
     *
     * A single oscillator through a gain node with a short attack, which is all the retrigger needs.
     * Everything is guarded on the context existing, so the whole class is a silent call-recorder in
     * a headless process and that is a supported mode rather than a stub.
     */
    class KartSynthVoice implements IKartAudioVoice {
        /** Shared across every voice — browsers cap how many contexts a page may hold. */
        private static SharedContext;
        /** `true` once the context has been attempted and refused, so it is not retried every frame. */
        private static ContextUnavailable;
        /** Seconds of audible life left in the current start. `Infinity` while looping. */
        private remaining;
        private readonly waveform;
        private readonly frequency;
        private readonly baseGain;
        private readonly looping;
        private readonly attack;
        private readonly release;
        private oscillator;
        private gainNode;
        private playing;
        private pitch;
        private volume;
        private playCount;
        private lastDelay;
        /**
         * @param waveform  oscillator type — `"sine"`, `"square"`, `"sawtooth"`, `"triangle"`
         * @param frequency base frequency, Hz
         * @param gain      base gain, `[0..1]`
         * @param looping   `true` for the loops (steering, charge, engine); `false` for one-shots
         * @param attack    attack time, seconds. **This is what makes a retrigger audible.**
         * @param release   release time, seconds. Also the one-shot's whole duration.
         */
        constructor(waveform: string, frequency: number, gain: number, looping: boolean, attack?: number, release?: number);
        /**
         * The context, created on first demand.
         *
         * Lazy for the reason in the header: a context built before a user gesture is created
         * `suspended` and never recovers on its own, which presents as "audio is broken" rather than
         * as "the browser said no".
         */
        private static GetContext;
        /** Drops the shared context. Called by tests and by a full scene teardown. */
        static ResetContext(): void;
        play(): void;
        playDelayed(delaySeconds: number): void;
        stop(): void;
        isPlaying(): boolean;
        /**
         * Ages this start by `dt`, clearing `playing` when the one-shot has run out.
         *
         * See the interface's docblock for why this exists. The duration is `attack + release` plus
         * whatever delay the start was scheduled with — the same figures `startNodes` hands the gain
         * ramp, so the flag goes false at the moment the envelope reaches zero rather than at some
         * separately-maintained guess.
         *
         * `dt <= 0` is a no-op: a paused frame must not retire a voice, and a negative delta (which a
         * clock stepping backwards can produce) must never lengthen one.
         */
        advance(dt: number): void;
        setPitch(value: number): void;
        setVolume(value: number): void;
        dispose(): void;
        getPlayCount(): number;
        getLastDelay(): number;
        /** Builds and schedules the oscillator. A no-op without a context, which is the headless case. */
        private startNodes;
        /** Tears the nodes down. Safe to call when nothing is running. */
        private stopNodes;
    }
    /**
     * A voice backed by a real `TOOLKIT.AudioSource` — the path a kart with clips takes.
     *
     * Duck-typed to `any` for the same reason `StandardKartCamera` duck-types its camera: the source
     * is whatever the scene handed over, and this file must not depend on which build of the toolkit
     * declared it.
     */
    class KartClipVoice implements IKartAudioVoice {
        private readonly source;
        private readonly duration;
        private remaining;
        private playing;
        private playCount;
        private lastDelay;
        /**
         * @param source   a `TOOLKIT.AudioSource`
         * @param duration how long one start sounds for, seconds. See `isPlaying` for why we need it.
         */
        constructor(source: any, duration?: number);
        play(): void;
        /**
         * `AudioSource.play(time)` takes the delay in seconds — Unity's `PlayDelayed` exactly.
         *
         * The toolkit signature is `play(time?, offset?, length?): Promise<boolean>`; `time` becomes
         * `waitTime` on the underlying `StaticSound`. The returned promise is deliberately not
         * awaited — `play()` already queues through `onReadyObservable` when the clip has not
         * decoded, so a start before load is safe and awaiting it here would make every trigger in
         * the state machine async.
         */
        playDelayed(delaySeconds: number): void;
        stop(): void;
        /**
         * **DOES NOT ASK THE `AudioSource`, AND THAT IS A DELIBERATE DIVERGENCE FROM THE OBVIOUS.**
         *
         * `TOOLKIT.AudioSource.isPlaying()` returns `_isAudioPlaying`, an internal boolean that is
         * written in exactly five places — the constructor, the two `play` paths, `pause` and `stop`
         * (`scenemanager.js:19332`, `:19422`, `:19433`, `:19443`, `:19458`). **It is never cleared
         * when a clip ends naturally.** So it is the same one-way latch this file's own synth voice
         * had, and delegating to it would put the bug back for exactly the karts that are properly
         * rigged with real clips: `Check_if_playing()` would refuse every payout after the first.
         *
         * This is an upstream defect worth reporting rather than only working around. Until it is
         * fixed, a locally-tracked flag aged by `advance` is strictly more correct than the engine's
         * own answer, and the local `stop()` above keeps the two in step in the direction that does
         * work.
         */
        isPlaying(): boolean;
        /**
         * Retires a one-shot after its duration, exactly as the synth voice does.
         *
         * The duration comes from the slot, and from `IUnityAudioClip.length` when the voice was
         * built from a serialized clip — which is the only tier that knows its sound's real length,
         * and so the only one where this is exact rather than an estimate from the synth envelope.
         * A voice constructed with no duration at all ages never, which preserves the old behaviour
         * for anything hand-built by a test.
         */
        advance(dt: number): void;
        setPitch(value: number): void;
        setVolume(value: number): void;
        dispose(): void;
        getPlayCount(): number;
        getLastDelay(): number;
    }
    /**
     * A voice backed by a NAMED one-shot in the scene's `SoundManager` — override tier 4.
     *
     * This is the shape `StandardCarController.burnoutLaunchChirpSound` uses
     * (`project.js:3614-3627`): a serialized STRING rather than a component reference, played
     * through `SceneManager.PlayOneShot`. It exists because it is the only tier that needs no node,
     * no child GameObject and no clip descriptor — an integrator with an existing sound bank names
     * the sound and is done.
     *
     * **WHAT IT CANNOT DO, STATED PLAINLY RATHER THAN FAKED.** The sound manager's surface is
     * fire-and-forget: there is no per-instance handle, so `setPitch` and `setVolume` have nowhere to
     * go and `stop()` cannot reach the one-shot it started. A LOOPING slot therefore must not use
     * this tier — the resolver's table has no looping slot that would reach it in practice, and the
     * limitation is recorded here rather than hidden behind a method that silently does nothing.
     *
     * `isPlaying()` is tracked locally and aged by `advance`, exactly as the other two voices are, so
     * `Check_if_playing()` behaves the same whichever tier won.
     */
    class KartManagedVoice implements IKartAudioVoice {
        private readonly soundName;
        private readonly duration;
        private playing;
        private remaining;
        private playCount;
        private lastDelay;
        constructor(soundName: string, duration?: number);
        play(): void;
        playDelayed(delaySeconds: number): void;
        /** Cannot reach the one-shot it started — see the class docblock. Clears the local flag only. */
        stop(): void;
        isPlaying(): boolean;
        /** No per-instance handle exists to pitch. Recorded as a limitation of this tier. */
        setPitch(_value: number): void;
        /** No per-instance handle exists to scale. Recorded as a limitation of this tier. */
        setVolume(_value: number): void;
        advance(dt: number): void;
        dispose(): void;
        getPlayCount(): number;
        getLastDelay(): number;
        /** The bank entry this voice names. */
        getSoundName(): string;
    }
    /**
     * The kart surface this component uses. Duck-typed, as everywhere else in this layer.
     *
     * Every non-optional member already exists on `StandardKartController`.
     */
    interface IKartAudioTarget {
        /** `EKartDriftState` as a number: 0 none, 1 hop, 2 drift, 3 paying out. */
        getDriftState(): number;
        /** `Drift_time`, seconds. */
        getDriftTime(): number;
        /**
         * The kart's three charge boundaries, seconds — ascending.
         *
         * **OPTIONAL, AND THE FALLBACK IS UNITY'S OWN 1.5/4/7.** The charge tone's retrigger is the
         * player's only EAR-level warning that a payout tier armed — it is the audio half of the
         * spark colour change — so it has to fire at the same times the payout pays. Those times are
         * tunable on the controller, and a component holding its own copy would stutter at 4.000 s
         * while the release paid tier 2 at 1.800. A stand-in that cannot report them keeps the
         * source's constants, which is what every existing test in the suite relies on.
         */
        getDriftTierTimes?(): number[];
        /** `-1` left, `+1` right, `0` none. The steering loop starts only once this is non-zero. */
        getDriftDirection(): number;
        /** `currentspeed` (`PlayerSounds.cs:54`). The engine and idle bands read this, NOT the real speed. */
        getCurrentSpeed(): number;
        /** `Boost` — drives the pitch ramp. */
        isBoosting(): boolean;
        /** `Boost_time` — seconds of boost left. */
        getBoostTime(): number;
        /**
         * Monotonic count of boost sources fired. A CHANGE means "a source fired this frame".
         *
         * OPTIONAL, with the rise-in-`Boost_time` heuristic as the fallback for a hand-written
         * stand-in. See `tickBoostAudio` for why the heuristic is not good enough on a real kart.
         */
        getBoostGrantCount?(): number;
        /** Which source last fired — `EKartBoostSource` as a number. Optional, as above. */
        getLastBoostSource?(): number;
        /** `GLIDER_FLY` — the engine block is skipped entirely, which freezes the pitch (`67`/`133`). */
        isGliding(): boolean;
        /** `JUMP_PANEL` (`Player.cs:961`) — the ramp launch, and its landing. */
        isJumpPanelling?(): boolean;
        /** `trickTime >= 0` (`Player.cs:2725`) — a trick is being performed. THE "Yeppie" edge. */
        isTricking?(): boolean;
        /** `trickBoostPending` (`Player.cs:543`) — a performed trick is still waiting to land. */
        isTrickPending?(): boolean;
        /** `onGround`. Its RISING edge is every landing sound in this file. */
        isGrounded?(): boolean;
        /** Seconds the current glide has run (`Player.cs:1210`'s wait, as a clock). */
        getGlidingTime?(): number;
        /** `glideTrick` (`Player.cs:1165`) — the glider trick, which has its own voice. */
        isGliderTrick?(): boolean;
        /** `beforeStartAccelTime` (`Player.cs:399`) — throttle held into the countdown. */
        getLaunchCharge?(): number;
        /** `RACE_MANAGER.RACE_COMPLETED` (`Player.cs:1193`) — silences the glider trick voice. */
        isRaceCompleted?(): boolean;
    }
    /**
     * Babylon standard kart audio — the sound half of `PROJECT.StandardKartController`.
     * @class StandardKartAudio
     */
    class StandardKartAudio extends TOOLKIT.ScriptComponent {
        /** The kart, duck-typed. Resolved off this transform in `start()` when not set. */
        kart: IKartAudioTarget;
        /** Master switch. `false` stops every voice and runs no state machine. */
        audioEnabled: boolean;
        /**
         * The integrator's escape hatch, named to match `StandardCarController.playVehicleSounds`.
         *
         * **EVERY AUDIO WRITE IN THIS FILE IS BEHIND IT.** An integrator who wants to drive their own
         * voices off this component's public getters sets it false and gets a kart that computes all
         * of its audio state — engine band, pitch, drift tier, boost source, every edge — and plays
         * none of it. That is the seam `StandardCarController` documents by example, and it is a
         * different thing from `audioEnabled`, which is a runtime mute.
         */
        playKartSounds: boolean;
        /** The drift steering loop and the charge tone (`effectSounds[0]`/`[1]`). */
        driftAudioEnabled: boolean;
        /** The engine and idle loops (`PlayerSounds.kart_sounds`). */
        engineAudioEnabled: boolean;
        /** The payout voice (`Mario_Boost_Sounds`). */
        boostAudioEnabled: boolean;
        /** The hop blip (`effectSounds[6]`). Separate from `driftAudioEnabled` — see `tickHopAudio`. */
        hopAudioEnabled: boolean;
        /** The trick voice and the glider trick voice (`MarioJumpTrickSounds`, `Mario_Glider`). */
        trickAudioEnabled: boolean;
        /** The glider start, flutter and close (`effectSounds[2]`/`[3]`/`[5]`). */
        gliderAudioEnabled: boolean;
        /** Landings and the ramp launch (`effectSounds[4]`/`[7]`/`[8]`). */
        impactAudioEnabled: boolean;
        /** The countdown rev loop and the start dash (`effectSounds[11]`/`[13]`). */
        startAudioEnabled: boolean;
        /** Scales every voice's volume. The bench mute. */
        masterVolume: number;
        /**
         * How many payout voices round-robin (`PlayerSounds.Mario_Boost_Sounds`).
         *
         * Unity's `Check_if_playing()` refuses a new one while ANY is still sounding, and `sound_count`
         * advances through the array so consecutive payouts do not repeat the same line.
         *
         * **SIX, WHICH IS UNITY'S OWN ARRAY LENGTH — AND IT USED TO BE THREE.** The earlier figure
         * was reasoned rather than read: "three is enough for the rotation to read as varied without
         * a real voice pack". That is a fine argument about a synth and the wrong default for a
         * system a Unity developer rigs, because it made the rota wrap after three payouts where the
         * source wraps after six, so the fourth boost of a race repeated the first line. Read out of
         * `Mario Circuit.unity` — `BOOSTSOUND1-6.wav`. Still settable, for a kart with fewer lines.
         */
        boostVoiceCount: number;
        /**
         * Step the charge tone's pitch per tier. **Placeholder-only — see the header's constraint 3.**
         *
         * Unity restarts one identical clip and does not transpose. This is forced to `false` for any
         * voice bound to a real `TOOLKIT.AudioSource`, so a kart with clips gets Unity's behaviour
         * exactly and only the synth gets the legibility aid.
         */
        tierTonePitchStep: boolean;
        /**
         * How many trick voices round-robin (`PlayerSounds.MarioJumpTrickSounds`).
         *
         * **THREE IS UNITY'S OWN ARRAY LENGTH, NOT A TASTE CHOICE**, and the rota that walks it has a
         * quirk this port keeps — see `tickTrickAudio`.
         */
        trickVoiceCount: number;
        /** `PlayerSounds.effectSounds[0]` — the drift steering loop. */
        driftSteerSourceName: string;
        /** `PlayerSounds.effectSounds[1]` — the charge tone. THE mechanic in this file. */
        driftChargeSourceName: string;
        /** `PlayerSounds.kartSound`. */
        engineSourceName: string;
        /** `PlayerSounds.kartIdle`. */
        idleSourceName: string;
        /** `PlayerSounds.Mario_Boost_Sounds`, suffixed `0..n`. */
        boostSourceNamePrefix: string;
        /** `effectSounds[6]` — `hop.wav`. */
        hopSourceName: string;
        /** `effectSounds[4]` — `SE_KT_LAND_SKID_1.wav`. */
        landSkidSourceName: string;
        /** `effectSounds[7]` — `ChassisCrash.wav`. */
        chassisSourceName: string;
        /** `effectSounds[8]` — `JumpBoard.wav`. */
        jumpPanelSourceName: string;
        /** `effectSounds[2]` — `SE_KT_GLIDER_START.wav`. */
        gliderStartSourceName: string;
        /** `effectSounds[3]` — `SE_KT_GLIDER_FLUTTER_LOW.wav`. */
        gliderFlutterSourceName: string;
        /** `effectSounds[5]` — `SE_KT_GLIDER_CLOSE.wav`. */
        gliderCloseSourceName: string;
        /** `effectSounds[11]` — `AccelBeforeStart.q.32.wav`. */
        startRevSourceName: string;
        /** `effectSounds[13]` — `SE_KT_START_DASH.wav`. */
        startDashSourceName: string;
        /** `PlayerSounds.Mario_Glider` — the glider trick voice. */
        gliderVoiceSourceName: string;
        /** `PlayerSounds.MarioJumpTrickSounds`, suffixed `0..n`. */
        trickVoiceNamePrefix: string;
        /** `effectSounds[0]`. */
        protected driftSteerVoice: IKartAudioVoice;
        /** `effectSounds[1]`. */
        protected driftChargeVoice: IKartAudioVoice;
        /** `kartSound`. */
        protected engineVoice: IKartAudioVoice;
        /** `kartIdle`. */
        protected idleVoice: IKartAudioVoice;
        /** `Mario_Boost_Sounds`. */
        protected boostVoices: IKartAudioVoice[];
        /** `effectSounds[6]` — the hop. */
        protected hopVoice: IKartAudioVoice;
        /** `effectSounds[4]` — the landing skid. */
        protected landSkidVoice: IKartAudioVoice;
        /** `effectSounds[7]` — the chassis thud. */
        protected chassisVoice: IKartAudioVoice;
        /** `effectSounds[8]` — the ramp launch. */
        protected jumpPanelVoice: IKartAudioVoice;
        /** `effectSounds[2]` — the glider opening. */
        protected gliderStartVoice: IKartAudioVoice;
        /** `effectSounds[3]` — the glide flutter loop. */
        protected gliderFlutterVoice: IKartAudioVoice;
        /** `effectSounds[5]` — the glider closing. */
        protected gliderCloseVoice: IKartAudioVoice;
        /** `effectSounds[11]` — the countdown rev loop. */
        protected startRevVoice: IKartAudioVoice;
        /** `effectSounds[13]` — the start dash. */
        protected startDashVoice: IKartAudioVoice;
        /** `Mario_Glider` — the glider trick voice. */
        protected gliderTrickVoice: IKartAudioVoice;
        /** `MarioJumpTrickSounds` — the "Yeppie" rota. */
        protected trickVoices: IKartAudioVoice[];
        /**
         * Every voice, by slot id. **THE ONE PLACE A VOICE EXISTS**; the named fields above are
         * aliases into this map, kept because the state machine reads them on a hot path and because
         * they are the surface the tests already pin.
         */
        protected voices: Map<string, IKartAudioVoice>;
        /** The resolved slot table, so a lookup can recover a slot's volume and group. */
        protected slots: Map<string, IKartVoiceSlot>;
        /** Slot ids explicitly muted through `setVoiceEnabled`. */
        protected mutedVoices: Set<string>;
        /** Groups explicitly muted through `setGroupEnabled`. */
        protected mutedGroups: Set<string>;
        /**
         * **TIER 2** — `{ [slotId]: nodeName }`. Renames the child node an `AudioSource` is looked
         * up under, for a rig whose GameObjects are not named the way this table expects.
         */
        voiceSourceNames: any;
        /**
         * **TIER 3** — `{ [slotId]: IUnityAudioClip }`. A Unity `AudioClip` field, which arrives as
         * `{ type: "UnityEngine.AudioClip", name, filename, length, ... }`. Turned into a runtime
         * `AudioSource` from `filename`, relative to `SceneManager.GetRootUrl(scene)`.
         */
        voiceClips: any;
        /**
         * **TIER 4** — `{ [slotId]: soundName }`. A one-shot in the scene's `SoundManager`, played
         * through `SceneManager.PlayOneShot`. Same shape as
         * `StandardCarController.burnoutLaunchChirpSound`.
         */
        voiceSoundNames: any;
        /**
         * **TIER 6, orthogonal** — `{ [slotId]: Partial<IKartVoiceSlot> }`. Retunes a slot's DEFAULT
         * without supplying any asset, for an integrator who wants a different synth rather than a
         * recording. Merged over the table entry before the voice is built.
         */
        voiceTunings: any;
        /** `{ [slotId]: number }`. Replaces a slot's scene volume. `0` silences without muting. */
        voiceVolumes: any;
        /** `PlayerSounds.sound_count`, one per rota prefix. See `playRota`. */
        protected rotaCursors: any;
        /** `PlayerSounds.sound_count` (`PlayerSounds.cs:23`) — the round-robin cursor. */
        protected soundCount: number;
        /** Last frame's `Boost_time`, for the payout edge. */
        protected lastBoostTime: number;
        /** Last frame's `getBoostGrantCount()`. A CHANGE is a grant — see `tickBoostAudio`. */
        protected lastBoostGrantCount: number;
        /** Which tier the charge tone last retriggered for: 0 none, 2 at four seconds, 3 at seven. */
        protected lastChargeTier: number;
        /** `kartSound.time` — the band playhead (`PlayerSounds.cs:77`). Frequency, for a synth voice. */
        protected engineTime: number;
        /** `kartSound.pitch` (`PlayerSounds.cs:122`). */
        protected enginePitch: number;
        /** How many times the charge tone has been retriggered. Telemetry, and the tests' oracle. */
        protected chargeRetriggerCount: number;
        /** Last frame's `getDriftState()`. The hop fires on the edge out of `None`. */
        protected lastDriftState: number;
        /** Last frame's `isJumpPanelling()`. */
        protected lastJumpPanel: boolean;
        /** Last frame's `isTricking()`. */
        protected lastTricking: boolean;
        /** Last frame's `isGrounded()`. Seeded `true` — see above. */
        protected lastGrounded: boolean;
        /** Last frame's `isGliding()`. */
        protected lastGliding: boolean;
        /** Last frame's `isGliderTrick()`. */
        protected lastGliderTrick: boolean;
        /** `PlayerSounds.MarioJumpTrickSounds`' rota cursor — Unity's `trickAnimCounter`. */
        protected trickAnimCounter: number;
        /** How many hops have sounded. Telemetry, and the tests' oracle. */
        protected hopCount: number;
        /** How many trick voices have sounded. */
        protected trickVoiceCountFired: number;
        /** How many landings have sounded. */
        protected landCount: number;
        /**
         * ESM-ONLY — DELETE WHEN PORTING BACK. Step 2 of the promotion recipe removes this member.
         */
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        /** Reads the Inspector property bag. */
        protected awakeAudioState(): void;
        /** Resolves the kart and builds every voice. */
        protected initAudioState(): void;
        /**
         * Seeds every `last*` from the kart's CURRENT state, so frame one has no spurious edges.
         *
         * See the ledger's own comment for why this is not optional. Each read is guarded because
         * the whole event half of `IKartAudioTarget` is optional — an absent signal leaves its seed
         * at the initialiser, which is the same thing its `tick*` will read next frame, so the edge
         * is still absent rather than spurious.
         */
        protected seedEdgeLedger(): void;
        /** Stops and releases every voice. */
        protected destroyAudioState(): void;
        /**
         * Merges `voiceTunings[id]` and `voiceVolumes[id]` over a table entry — override tier 6.
         *
         * Returns a COPY, never the table row: `KART_VOICE_SLOTS` is a module-level constant shared
         * by every instance in the scene, and an integrator retuning one kart must not retune the
         * others. Two karts with different engine notes is a supported configuration.
         */
        /**
         * How long one start of this slot sounds for — `0` meaning "never retires".
         *
         * **A LOOPING SLOT MUST RETURN 0, AND GETTING THAT WRONG IS NOT SUBTLE.** The first version
         * of the registry handed every clip voice `attack + release`, loops included, so the drift
         * charge tone — a loop whose entire mechanic is `if (!isPlaying) Play()` every frame
         * (`Player.cs:1752`) — retired after 0.07 s and was restarted on the very next frame.
         * Measured on the existing ledger test: **86 restarts across an 8-second drift instead of 7**,
         * which is precisely the "continuous buzz" this file's own header warns the retrigger must
         * never become. The test caught it; the code had the warning and did it anyway.
         */
        static SlotDuration(slot: IKartVoiceSlot): number;
        protected tuneSlot(slot: IKartVoiceSlot): IKartVoiceSlot;
        /**
         * Builds one slot's voice, walking the override tiers highest-first.
         *
         * **THE ORDER IS THE CONTRACT** and it runs most-specific to least: an explicit voice beats a
         * rigged `AudioSource`, which beats a serialized clip, which beats a sound-manager name, which
         * beats the synthesiser. The synth is unreachable only when something better was supplied,
         * which is what makes "press play and hear a kart" true with no assets at all.
         *
         * Tier 1 is not here — `setVoice` writes the map directly and is checked before this runs, so
         * a voice an integrator supplied is never rebuilt by a re-init.
         */
        protected resolveSlot(slot: IKartVoiceSlot): IKartAudioVoice;
        /**
         * Tier 3's constructor — a runtime `TOOLKIT.AudioSource` from an `IUnityAudioClip`.
         *
         * The `AudioSource` needs no clip at construction: it reads `file` out of its own property
         * bag in `awakeAudioSource()` and resolves it against `SceneManager.GetRootUrl(scene)`. It
         * is attached with `validate: true` so it registers, so its `awake` actually runs, and so it
         * becomes findable later through `FindScriptComponent` like any other.
         *
         * `playonawake` is forced FALSE regardless of anything: every voice in this component is
         * started by the state machine, and a clip that plays itself on load would fire the hop the
         * moment the scene finished loading.
         *
         * Wrapped in a try/catch because this runs inside `start()`. A malformed clip descriptor
         * from a bad export must degrade to the synth — which is audible and correct — rather than
         * throw into the scene's load path and take the whole kart with it.
         */
        protected buildClipSource(slot: IKartVoiceSlot, clip: any): IKartAudioVoice;
        /**
         * Loads a tier-3 clip into its `AudioSource`, one frame later, with the rejection owned.
         *
         * **DEFERRED TO THE FIRST RENDER ON PURPOSE.** `setAudioDataSource` reads `_loop`, `_volume`,
         * `_pitch` and `_spatialblend` off the instance to build its `IStaticSoundOptions`
         * (`scenemanager.js:19696`), and those are populated by `awakeAudioSource()` from the property
         * bag — which has not run yet at the moment this component's `start()` builds the voice.
         * Loading immediately would create the sound with the constructor's defaults instead of the
         * slot's loop flag and volume. The `AudioSource` registers its own before-render callback at
         * attach time, ahead of this one, so by the time this fires its `awake` has been through the
         * bag.
         *
         * The `.catch` is the point of the whole detour: a filename that does not resolve leaves the
         * voice bound to a silent source and logs nothing, which is a far better failure than an
         * unhandled rejection out of the scene's render loop. The voice still exists, still counts
         * its plays and still gates correctly — it simply makes no sound, exactly like a rigged
         * `AudioSource` whose clip is missing.
         */
        protected loadClipSource(source: any, filename: string): void;
        /**
         * Re-points the hot-path aliases at whatever the map currently holds.
         *
         * Called after the initial build and again after any `setVoice`, so the two surfaces can
         * never disagree. A named field that still pointed at a replaced voice would make an
         * override look like it had been ignored — and only for the sounds on the hot path, which is
         * the worst possible subset to get wrong.
         */
        protected bindVoiceAliases(): void;
        /** Every voice of one rota, in index order, stopping at the first gap. */
        protected collectRota(prefix: string): IKartAudioVoice[];
        /** Depth-first search for a descendant by exact name. */
        protected findChildNode(name: string): BABYLON.TransformNode;
        /**
         * Runs a callback over every voice in the registry.
         *
         * ITERATES THE MAP RATHER THAN THE ALIASES, which is what makes ageing and muting reach the
         * thirty-odd slots that have no named field — the coin, the hurt lines, the results
         * stingers. The hand-written list this replaced covered fifteen, and every voice added after
         * it would have been silently exempt from `audioEnabled` and from one-shot retirement.
         */
        protected forEachVoice(callback: (voice: IKartAudioVoice) => void): void;
        /** One frame. Reads the kart; writes nothing but voices. */
        protected updateAudioState(): void;
        /**
         * `Player.cs:1658` — `effectSounds[6]`, `hop.wav`.
         *
         * **THE EDGE IS DRIFT ENTRY, NOT THE HOP ANIMATION**, and the difference is a real one on the
         * Arcade car. Unity plays this at `:1658`, four lines after the `GetKeyDown(V)` at `:1649`
         * and in the same block — before and independent of `SetTrigger("Drift")`. So the blip sounds
         * whenever a drift STARTS, including on a profile whose `hopEnabled` is false and which never
         * leaves the ground. Keying it to the hop instead would make `hopEnabled = false` silent, and
         * FR-5 requires that flag to touch nothing but the hop's own arc.
         *
         * Hence the edge out of `None` rather than the edge into `Hop`: those are the same frame on
         * the Kart profile and different frames on anything that skips the hop.
         *
         * It has its own enable flag rather than living under `driftAudioEnabled`, because that flag
         * means "the two `drift_control` loops" — a one-shot at entry is not one of them, and folding
         * it in would make the bench's drift-audio toggle silence a sound it does not name.
         */
        protected tickHopAudio(): void;
        /**
         * `Player.cs:962` — `effectSounds[8]`, `JumpBoard.wav`. The ramp launch.
         *
         * `:962` sits in `OnTriggerEnter` for tag `JumpPanel`, guarded by `!JUMP_PANEL` so a ramp
         * cannot re-fire while a flight is already running. The port's `isJumpPanelling()` IS that
         * flag, so its rising edge carries the guard for free.
         *
         * `:1079` plays the same clip on the glider panel's `OnTriggerExit`, which the port grants as
         * `EKartBoostSource.GliderExit`. That one is NOT fired here — it is a boost source, and
         * `tickBoostAudio` already speaks for it through the payout rota (`SourceSpeaks`, `1091`).
         * Firing it in both places is how a sound ends up doubled.
         */
        protected tickJumpPanelAudio(): void;
        /**
         * `Player.cs:2573`/`2582`/`2591` — `MarioJumpTrickSounds`. **THE "Yeppie".**
         *
         * `trickJump()` is a coroutine started when the trick is performed, and the port's edge is
         * `isTricking()` going true — `Player.cs:2725`'s `trickTime = 0` in this port, which is the
         * same instant.
         *
         * **THE ROTA IS SCRAMBLED IN UNITY AND THE SCRAMBLE IS TRANSCRIBED.** `trickAnimCounter`
         * counts 0, 1, 2, 0, 1, 2 — but the three branches do not read it in order:
         *
         *     counter == 0  ->  SetTrigger("JumpTrick1")    MarioJumpTrickSounds[0]     :2573
         *     counter == 2  ->  SetTrigger("GliderTrick")   MarioJumpTrickSounds[1]     :2582
         *     counter == 1  ->  SetTrigger("JumpTrick2")    MarioJumpTrickSounds[2]     :2591
         *
         * so the voices actually sound in the order 0, 2, 1, 0, 2, 1. Whether that is intentional is
         * unknowable from the source and does not matter: it is what a player hears, three tricks in
         * a row are the same three lines in the same order every time, and "regularising" it to
         * 0, 1, 2 would be a change of the thing rather than a tidy-up of the code. `VoiceForCounter`
         * below is that table as a pure function so a test can pin the order without a kart.
         *
         * The `Check_if_playing()` gate is Unity's (`:2572`) and it is NOT self-referential: the
         * method tests `Mario_Boost_Sounds`, never `MarioJumpTrickSounds` (`PlayerSounds.cs:156-159`).
         * So a trick voice is suppressed by a payout voice but NOT by another trick voice, and this
         * port keeps that asymmetry rather than "fixing" it into a general mutex.
         */
        protected tickTrickAudio(): void;
        /**
         * `Player.cs:2568-2592`'s counter-to-voice table, as a pure function.
         *
         * See `tickTrickAudio` for why it is 0, 2, 1 rather than 0, 1, 2. `modulo` keeps a
         * `trickVoiceCount` other than three from indexing off the end — Unity has no such case, so
         * the wrap is the port's, and it is a guard rather than a behaviour.
         */
        static VoiceForCounter(counter: number, length: number): number;
        /**
         * `Player.cs:530-556` — every landing sound, and there are three distinct landings.
         *
         * All three hang off ONE edge, `onGround` going true, and differ only in what else was true
         * at the moment of contact:
         *
         *     ending a ramp flight    `532`  `[7]` ChassisCrash + `533` `[4]` LandSkid + `534` `[5]`
         *     landing a trick         `545`  `[4]` LandSkid     + `546` `[7]` ChassisCrash
         *     landing from a glide    `554`  `[4]` LandSkid     + `555` `[5]` GliderClose
         *
         * **`534` PLAYS THE GLIDER-CLOSE CLIP ON A LANDING WITH NO GLIDER IN IT.** That is not a
         * misreading — `effectSounds[5]` resolves to `SE_KT_GLIDER_CLOSE.wav`, and `:534` fires it
         * inside the `if (JUMP_PANEL)` block. It is almost certainly an authoring slip in the Unity
         * project, and it is transcribed anyway, because this port's job is to sound like that
         * project and a slip a player has heard a thousand times is part of how the game sounds.
         * Recorded here so the next reader finds a decision rather than a bug.
         *
         * **WHY `lastJumpPanel || current` RATHER THAN `current` ALONE**, and it is P-15's rule about
         * observation points: `endJumpPanel()` and `landTrick()` are driven from the collision
         * observables, which fire inside the PHYSICS step — so by the time this `update()` runs on the
         * landing frame, both flags may already be cleared. The previous frame's sample is the one
         * taken while the kart was still in the air, and a ballistic flight always spans at least one
         * rendered frame, so the disjunction is exact rather than defensive.
         */
        protected tickImpactAudio(): void;
        /**
         * `Player.cs:1127`/`1169`/`1195`/`1211` and `:565` — the glider's four sounds.
         *
         *     `1127`  `[2]` SE_KT_GLIDER_START   entering a glide
         *     `1169`  `[2]` again                a glider TRICK, which re-fires the same clip
         *     `1195`  Mario_Glider               the glider trick VOICE, gated three ways
         *     `1211`  `[3]` SE_KT_GLIDER_FLUTTER one second in, and re-tested (see the constant)
         *     `565`   `[3]`.Stop()               leaving the glide
         *
         * The flutter is the only LOOP among the event voices, and it is driven as a level rather
         * than an edge for exactly the reason `GLIDER_FLUTTER_DELAY`'s docblock gives: Unity's
         * `WaitForSeconds(1f)` followed by a re-test of `GLIDER_FLY` is a "still gliding a second
         * later?" question, and asking it every frame answers it identically without a timer that
         * could outlive its glide.
         *
         * The trick voice's third gate is `!RACE_MANAGER.RACE_COMPLETED` (`:1193`) — a driver who has
         * already crossed the line does not whoop. That flag only became readable here when the race
         * lifecycle landed; before it, this sound could not have been ported faithfully at all.
         */
        protected tickGliderAudio(): void;
        /**
         * `Player.cs:399-401`, `:409`, `:269` and `:275` — the two start-line sounds.
         *
         *     `401`  `[11]` AccelBeforeStart   a LOOP, while the throttle is held into the countdown
         *     `409`  `[11]`.Stop()             the frame the throttle is released
         *     `269`  `[11]`.Stop()             the green light, unconditionally
         *     `275`  `[13]` SE_KT_START_DASH   the green light, only if the window was hit
         *
         * **THE PORT NEEDS NO SEPARATE `269`**, and that is worth stating rather than leaving as an
         * apparent omission: `releaseLaunch()` zeroes `beforeStartAccelTime`, so the charge this
         * method reads goes to 0 on exactly that frame and the loop stops through the `409` branch.
         * One stop, in one place, firing at both of Unity's moments.
         *
         * The dash is NOT fired here. It is `EKartBoostSource.RocketStart`, so `tickBoostAudio` sees
         * it as a grant — and this method plays `[13]` alongside the payout voice `:278` plays, which
         * is Unity's own pairing at `:275`-`:278`.
         */
        protected tickStartAudio(): void;
        /**
         * `Player.cs:1678-1706`, `1752`, `1755-1758`, `1772`, `1776-1779`, `1792`, `1808-1813`.
         *
         * TWO SOUNDS AND THEY START AT DIFFERENT TIMES, which is not obvious from the source and is
         * the entire structure of the drift's audio:
         *
         *   `effectSounds[0]`  the STEERING loop. Starts the frame a direction latches — so, at drift
         *                      entry — with a 0.25 s delay, and runs unchanged for the whole drift.
         *                      It says "you are sideways".
         *   `effectSounds[1]`  the CHARGE tone. Starts at 1.5 s, and RETRIGGERS at 4.0 and 7.0.
         *                      It says "a payout is armed, and it just got bigger".
         *
         * Both stop on release (`1812-1813`). The steering loop's delay is Unity's and is worth
         * keeping: it lets the hop land before the slide is announced.
         */
        protected tickDriftAudio(): void;
        /**
         * `Player.cs:1828-1832` and `PlayerSounds.cs:154-163` — the payout voice.
         *
         * `Check_if_playing()` returns false while ANY boost voice is still sounding, so a chained
         * payout does not stack two lines on top of each other; `sound_count` then advances so
         * consecutive payouts do not repeat. Both are ported, because a boost chain is exactly where
         * a naive one-shot turns into a mess.
         *
         * **WHICH SOURCES SPEAK IS NOT THE SAME SET AS WHICH SOURCES BURST**, and that is why this
         * cannot be inferred from `Boost_time`. Of Unity's seven grants, five play a voice and five
         * fire a burst — but they are different fives. The BOOST PAD speaks (`514`) and does not
         * burst; the GLIDER TRICK bursts (`1188`) and is silent; the TRICK LANDING does neither, and
         * plays `effectSounds[4]`/`[7]` instead (`545-546`). A rise in one float cannot distinguish
         * them, so the kart reports the source and the policy lives in `SourceSpeaks` below.
         */
        protected tickBoostAudio(): void;
        /**
         * Whether a boost source plays a `Mario_Boost_Sounds` line.
         *
         * FIVE OF THE SEVEN DO, and they are NOT the same five that burst — compare
         * `StandardKartEffects.SourceBursts`:
         *
         *   speaks, no burst    `BoostPad`      `514` voice, no `BoostBurstPS` anywhere near `507`
         *   bursts, no voice    `GliderTrick`   `1188` burst, and `1178` grants in silence
         *   neither             `TrickLanding`  `541` floors the clock; `545`/`546` play
         *                                       `effectSounds[4]`/`[7]`, which are not this rota
         *
         * `RocketStart` is a half-exception worth naming: `278` plays `Mario_Boost_Sounds[3]` — a
         * FIXED index, not `sound_count` — so it does not advance the rotation in Unity. The port
         * rotates it like the others, which is a one-line divergence in which voice you hear at the
         * start line and is recorded here rather than silently reproduced or silently dropped.
         */
        static SourceSpeaks(source: number): boolean;
        /** `PlayerSounds.cs:154-163`. False while any payout voice is still sounding. */
        protected checkIfPlaying(): boolean;
        /**
         * `PlayerSounds.cs:52-136` — the engine, the idle, and the crossover between them.
         *
         * UNITY'S ENGINE IS A GEARBOX MADE OUT OF A PLAYHEAD. There is one looping clip, and the band
         * table lerps `kartSound.time` to 1, 2, 3, 4, 5, 6 or 7 seconds depending on speed — so the
         * "gear" is which second of the clip you are sitting in. A synth voice cannot scrub a clip, so
         * the same band number drives FREQUENCY instead, which is a substitution and is labelled one.
         * A bound `TOOLKIT.AudioSource` gets the pitch, not the scrub, for the same reason — the
         * toolkit's surface has `setPitch` and no seek.
         *
         * A UNITY QUIRK, TRANSCRIBED — AND IT HAPPENS TWICE, WHICH IS THE PART THAT WAS MISSED.
         *
         * The ENGINE is started at `currentspeed >= 5` (`67`) and then unconditionally stopped again
         * at `currentspeed < 10` (`134-136`). The 5-to-10 band therefore never sounds, despite having its
         * own approach rate.
         *
         * The IDLE does the same thing for the same reason, and an earlier version of this port
         * dropped it. `kartIdle.Stop()` sits inside EVERY band body, including the 5-to-10 one at
         * `78` — while `54` restarts the idle on the very next frame, because `currentspeed < 10` is
         * still true. So through 5-to-10 the idle is stopped and replayed every single frame: a
         * near-silent machine-gun stutter, not a steady idle. Porting the engine's copy of the quirk
         * while quietly fixing the idle's would have been a divergence dressed as a transcription,
         * which is exactly the failure mode this file's citations exist to prevent.
         *
         * Note the boundary: the bands start at `> 5`, not `>= 5`, so at EXACTLY speed 5 no band body
         * runs and the idle is not stopped at all.
         */
        protected tickEngineAudio(dt: number): void;
        /**
         * `PlayerSounds.cs:75-116` — the band table, verbatim.
         *
         * One second of clip per ten units of speed. The bands are inclusive-low and exclusive-high
         * except the first two, which Unity writes as `> 5 && <= 10` and `> 10 && <= 20` — so 10 and
         * 20 belong to the band BELOW them while 30, 40, 50 and 60 belong to the band above. That
         * asymmetry is Unity's and is transcribed rather than regularised.
         *
         * **`current` is not a convenience parameter.** Unity's table is a chain of `if`s writing
         * `kartSound.time`, so when NO band matches — below 5, and above 70 — the playhead simply is
         * not written and holds whatever it had. A pure `speed -> band` function cannot express that,
         * and an earlier version of this one papered over it by returning `7` above the table and `1`
         * below it. The `7` was harmless; the `1` was not, because it pulled `engineTime` DOWN toward
         * band 1 at speeds under 5 where Unity holds. Taking the current value makes both ends of the
         * table say the same, correct thing: no band, no change.
         *
         * @param speed   `currentspeed`
         * @param current the live `kartSound.time`, returned unchanged when no band matches
         */
        static EngineBandTime(speed: number, current: number): number;
        /** `effectSounds[0]`. */
        getDriftSteerVoice(): IKartAudioVoice;
        /** `effectSounds[1]` — the one that matters. */
        getDriftChargeVoice(): IKartAudioVoice;
        /** `kartSound`. */
        getEngineVoice(): IKartAudioVoice;
        /** `kartIdle`. */
        getIdleVoice(): IKartAudioVoice;
        /** `Mario_Boost_Sounds`. */
        getBoostVoices(): IKartAudioVoice[];
        /** How many times the charge tone has stepped a tier since this component started. */
        getChargeRetriggerCount(): number;
        /** `PlayerSounds.sound_count`. */
        getSoundCount(): number;
        /** `kartSound.time` — which band the engine is sitting in. */
        getEngineTime(): number;
        /** `kartSound.pitch`. */
        getEnginePitch(): number;
        /** `effectSounds[6]` — the hop. */
        getHopVoice(): IKartAudioVoice;
        /** `effectSounds[4]` — the landing skid. */
        getLandSkidVoice(): IKartAudioVoice;
        /** `effectSounds[7]` — the chassis thud. */
        getChassisVoice(): IKartAudioVoice;
        /** `effectSounds[8]` — the ramp launch. */
        getJumpPanelVoice(): IKartAudioVoice;
        /** `effectSounds[2]` — the glider opening. */
        getGliderStartVoice(): IKartAudioVoice;
        /** `effectSounds[3]` — the glide flutter loop. */
        getGliderFlutterVoice(): IKartAudioVoice;
        /** `effectSounds[5]` — the glider closing. */
        getGliderCloseVoice(): IKartAudioVoice;
        /** `effectSounds[11]` — the countdown rev loop. */
        getStartRevVoice(): IKartAudioVoice;
        /** `effectSounds[13]` — the start dash. */
        getStartDashVoice(): IKartAudioVoice;
        /** `Mario_Glider` — the glider trick voice. */
        getGliderTrickVoice(): IKartAudioVoice;
        /** `MarioJumpTrickSounds` — the "Yeppie" rota. */
        getTrickVoices(): IKartAudioVoice[];
        /** Unity's `trickAnimCounter`. See `VoiceForCounter` for why it is not the voice index. */
        getTrickAnimCounter(): number;
        /** How many hops have sounded since this component started. */
        getHopCount(): number;
        /** How many trick voices — jump and glider together — have sounded. */
        getTrickVoiceFiredCount(): number;
        /** How many landings have sounded. */
        getLandCount(): number;
        /** Every slot id in the roster, in table order. What this kart system can say. */
        getVoiceIds(): string[];
        /** One voice by slot id, or `null` if the id is not in the roster. */
        getVoice(id: string): IKartAudioVoice;
        /** One slot's resolved table entry — its Unity provenance, group, volume and tuning. */
        getVoiceSlot(id: string): IKartVoiceSlot;
        /**
         * **OVERRIDE TIER 1** — replaces one voice outright.
         *
         * Disposes whatever was there, which is the behaviour that keeps a replaced synth from
         * holding an oscillator open for the rest of the session. Pass `null` to drop a voice
         * entirely and make that slot permanently silent — a legitimate way to remove one sound
         * without muting its whole group.
         *
         * Re-binds the hot-path aliases, so a replaced engine or hop takes effect on the next frame
         * rather than on the next re-init.
         */
        setVoice(id: string, voice: IKartAudioVoice): void;
        /**
         * Binds one slot to an existing `TOOLKIT.AudioSource` — override tier 2, from code.
         *
         * The same thing rigging a named child GameObject does, for an integrator who already holds
         * the component and would rather not depend on a node name.
         *
         * @param duration how long the clip sounds for, seconds. Supply it whenever you know it:
         *                 `isPlaying()` cannot be read back off the engine (see `KartClipVoice`), so
         *                 a voice with no duration never retires and will hold `Check_if_playing()`
         *                 shut if it is one of the payout or trick voices.
         */
        setVoiceSource(id: string, source: any, duration?: number): void;
        /** Mutes or unmutes one slot. Distinct from `setVoice(id, null)`, which is permanent. */
        setVoiceEnabled(id: string, enabled: boolean): void;
        /** Whether one slot is currently allowed to sound. */
        isVoiceEnabled(id: string): boolean;
        /**
         * Mutes or unmutes a whole family.
         *
         * The reason groups exist: an integrator replacing the entire item layer silences ours with
         * one call rather than naming eleven slots, and cannot miss one.
         */
        setGroupEnabled(group: KartAudioGroup, enabled: boolean): void;
        /** Whether a family is currently allowed to sound. */
        isGroupEnabled(group: KartAudioGroup): boolean;
        /**
         * Fires one slot by id. The single entry point every sound in this file goes through.
         *
         * Honours, in order: the master gate, the runtime mute, the slot mute, the group mute. A
         * `false` from any of them is silence rather than an error, because a trigger called from
         * game code during a mute is an ordinary thing rather than a mistake.
         *
         * @param volumeScale multiplies the slot volume and the master, for a caller that wants this
         *                    one hit quieter — a distant collision, a chained pickup.
         * @returns whether it actually sounded, so a caller can tell a mute from a bad id
         */
        playVoice(id: string, volumeScale?: number): boolean;
        /** Stops one slot by id. Safe for an id that is not in the roster. */
        stopVoice(id: string): void;
        /** Whether one slot is currently sounding. */
        isVoicePlaying(id: string): boolean;
        /**
         * Fires the next voice of a rota, advancing its cursor — `PlayerSounds.sound_count`'s shape.
         *
         * Used by the star, bullet and hurt rotas, and available to an integrator adding their own.
         * The cursor is per-prefix so two rotas cannot walk each other.
         */
        playRota(prefix: string, volumeScale?: number): boolean;
        /** `effectSounds[9]`, `Player.cs:994`. Call it when your item system collects a coin. */
        playCoin(volumeScale?: number): boolean;
        /** `effectSounds[10]`, `Player.cs:616`. A kart-to-kart or kart-to-wall bump. */
        playBump(volumeScale?: number): boolean;
        /** `effectSounds[18]`. Struck by an item. */
        playItemHit(volumeScale?: number): boolean;
        /** `effectSounds[19]`, `Player.cs:750`. Struck by a track obstacle. */
        playObstacleHit(volumeScale?: number): boolean;
        /** `hurtSounds[0..2]`, `PlayerSounds.cs:165`. The driver's pain rota. */
        playHurt(volumeScale?: number): boolean;
        /** `MarioStarSounds[0..2]`. Star power, as a rota. */
        playStar(volumeScale?: number): boolean;
        /** `BulletSounds[0..2]` — `0` fly, `1` on, `2` off. Indexed rather than rotated: they are phases. */
        playBullet(phase: number, volumeScale?: number): boolean;
        /** `effectSounds[23]`. Entering an anti-gravity zone. */
        playHoverEnter(volumeScale?: number): boolean;
        /** `effectSounds[25]`, `Player.cs:628`. The anti-gravity spin. */
        playHoverCharge(volumeScale?: number): boolean;
        /** `effectSounds[24]`. Leaving an anti-gravity zone. */
        playHoverFinish(volumeScale?: number): boolean;
        /** `effectSounds[14]`, `RACE_MANAGER.cs:219`. The chequered flag. */
        playFinish(volumeScale?: number): boolean;
        /**
         * A results stinger by placing. `RACE_MANAGER.cs:235-275`.
         *
         * The mapping is Unity's: first place plays the voice AND the fanfare, a podium finish plays
         * the runner-up sting, anything else plays the losing pair. An integrator with their own
         * results screen mutes the `"results"` group and ignores this entirely.
         */
        playResults(position: number): void;
        /**
         * The alternate-surface drift loop — `effectSounds[26]`, `Player.cs:1687`.
         *
         * Unity layers this under the ordinary drift loop on a rainbow-road track. It is a level
         * rather than a one-shot, so it takes a boolean instead of firing.
         *
         * **UNITY'S OWN COPY OF THIS IS BROKEN IN TWO WAYS AND NEITHER IS REPRODUCED.** `:1687`
         * indexes `effectSounds[26]` when the shipped scene's array ends at `[25]`, which would throw
         * if the branch were ever reached on Mario Circuit; and `:1816` stops `effectSounds[25]` —
         * `SE_KT_HOVER_CHARGE` — while commenting it as "drift on rainbow road", so on a track where
         * the branch DOES run the loop is never stopped and the hover charge is cut instead. Ours
         * starts and stops the slot it names.
         */
        setSurfaceDrift(active: boolean): void;
    }
}
declare namespace PROJECT {
    /**
     * The kart surface this camera actually uses.
     *
     * DUCK-TYPED ON PURPOSE. `StandardKartCamera` must not import `StandardKartController` — FR-0
     * requires each to be one self-contained module, and the UMD promotion combines them into the
     * same namespace where a cross-import would be circular. Declaring the five methods it needs as an
     * interface documents the contract without creating the dependency, and lets a race manager, an
     * AI-driven opponent or a test drive the camera with a stand-in.
     */
    interface IKartCameraTarget {
        /** `Camerafollow.cs:44`. The camera skips its ENTIRE update while this is true. */
        isPlayerBeingMoved(): boolean;
        /** Anti-gravity is active — the camera rides the kart's own up. */
        isAntiGravity(): boolean;
        /**
         * The active anti-gravity volume's `rotAmountX`, degrees, or 0 when there is none (T18).
         *
         * OPTIONAL ON PURPOSE. A stand-in target in a test, or a race manager driving this rig with
         * something that is not a kart, should not have to implement a volume payload it has no
         * concept of — so the camera falls back to its OWN `rotAmountX` when the method is absent.
         */
        getAntiGravityRotAmountX?(): number;
        /** The active anti-gravity volume's `rotAmountZ`, degrees. Optional, as above. */
        getAntiGravityRotAmountZ?(): number;
        /**
         * The active anti-gravity volume asked the camera to rotate — Unity's `rotateCamAntiGravity`
         * (`Camerafollow.cs:21`, set at `Player.cs:1043`, cleared at `:1056`).
         *
         * NARROWER THAN `isAntiGravity()`. A volume authored `rotateCam: false` is anti-gravity and is
         * NOT camera-rotate, and Unity frames it exactly like flat ground. Optional, like the two
         * getters above; absent, the camera falls back to its own settable `rotateCamAntiGravity`.
         */
        isAntiGravityCamRotate?(): boolean;
        /** The glider is open. */
        isGliding(): boolean;
        /**
         * The active glider volume's `glideAngleX`, degrees — the rig's PITCH trim while gliding.
         *
         * **T49. Unity relays this from the volume to the camera explicitly**, at
         * `Player.cs:1114-1115`: entering a `GliderPanelFly` trigger writes `Cam.glideAngleZ` and
         * `Cam.glideAngleX` from the `GetGlideAngle` component on the volume, alongside the kart's own
         * copies. This port read the payload into the CONTROLLER and stopped there, so
         * `Camerafollow.cs:84`'s target was permanently `Euler(0, yaw, 0)` and a volume authoring a
         * trim was framed level because the number never arrived.
         *
         * OPTIONAL, exactly as `getAntiGravityRotAmountX` is and for the same reason: a stand-in
         * target, or a race manager driving this rig with something that is not a kart, should not
         * have to model a volume payload. **The fallback is this component's own `glideAngleX`**,
         * which is a behaviour CHOICE and not a no-op: a target without the getter keeps reading the
         * settable field that defaults to 0, so for every such caller the bridge is exactly additive.
         * (Contrast `isAntiGravityCamRotate`, whose fallback is deliberately NOT additive; the
         * difference is that a missing lean flag has no sensible neutral, and a missing trim does.)
         *
         * **IT IS NOT ADDITIVE FOR A REAL KART, AND SAYING SO IS THE POINT OF THE FIX.** A live
         * `StandardKartController` answers both getters, so a volume's trim now ARRIVES where it
         * previously did not — including the bench's own `kartLabGliderFly`, which authors
         * `{ glideAngleX: 4, glideAngle: 0 }`. Its roll half resolves to 0 either way and every
         * existing roll measurement is untouched; its 4-degree PITCH trim genuinely moves the rig,
         * from level to 4 degrees nose-down over a glide. Nothing in the suite measured that, which is
         * why no figure moved when the bridge landed; `tests/KartCamera.test.ts` section 16.3 pins it
         * in both halves so the change is recorded rather than merely unobserved.
         */
        getGlideAngleX?(): number;
        /** The active glider volume's `glideAngle` — the rig's ROLL trim while gliding. As above. */
        getGlideAngleZ?(): number;
        /** A boost of any kind is running — the camera dollies back. */
        isBoosting(): boolean;
        /** On a jump-panel flight — the camera deliberately lags at 0.4/s. */
        isJumpPanelling(): boolean;
        /**
         * `Player.cs:233`/`:543`. A trick has been performed this flight and its landing still owes
         * the 0.9 s boost floor — Unity's `trickBoostPending`.
         *
         * OPTIONAL, for the same reason `getAntiGravityRotAmountX` is: a stand-in target in a test, or
         * a race manager driving this rig with something that is not a kart, should not have to model
         * tricks. Absent, the camera behaves exactly as it did before T33.
         *
         * **THE NAME IS THE CONTROLLER'S, NOT UNITY'S.** `StandardKartController` already exposes this
         * as `isTrickPending()`, so matching that name is what lets T33 land with zero changes to a
         * 5100-line file. Unity's field name is recorded here instead of borrowed.
         */
        isTrickPending?(): boolean;
    }
    /**
     * Babylon standard kart camera — the chase rig for `PROJECT.StandardKartController`.
     * @class StandardKartCamera
     *
     * A direct port of `3DMarioKart/Assets/Scripts/Camerafollow.cs`. Two nodes, and the split matters:
     *
     *   RIG    this component's own transform. Its POSITION tracks the kart and its ROTATION slerps
     *          onto the kart's at 3/s. This is where the lean lives.
     *   CHILD  one node under it, carrying the extra pitch/roll a volume asks for and the dolly the
     *          boost pulls. The camera itself is placed at the child's world transform.
     *
     * Splitting them is what lets the boost dolly back along the rig's own nose while the rig is still
     * catching up with the kart's roll, without the two fighting.
     */
    class StandardKartCamera extends TOOLKIT.ScriptComponent {
        /** The kart's chassis root: the node this rig follows. */
        player: BABYLON.TransformNode;
        /** Scene-graph name of the chassis root, for a glTF-loaded kart that cannot pass a reference. */
        playerNodeName: string;
        /**
         * The kart controller, duck-typed (see `IKartCameraTarget`).
         *
         * Optional. With no kart the camera is a plain 3/s chase rig — which is still the correct
         * behaviour for every state the kart cannot report.
         */
        kart: IKartCameraTarget;
        /**
         * The Babylon camera to drive, duck-typed to `{ position, rotation?, rotationQuaternion? }`.
         *
         * The VIEWER owns camera creation in this framework, so this component never makes one — it
         * writes a transform onto whatever it is handed. That also means it works with a `FreeCamera`,
         * a `UniversalCamera` or a bare `TransformNode` without caring which.
         */
        camera: any;
        /**
         * The race manager, duck-typed. `null` on the bench and in every test that has no race.
         *
         * Read for two booleans and nothing else: `RACE_STARTED` and `RACE_COMPLETED`.
         */
        race: any;
        /**
         * Fallback for `RACE_STARTED` when no race is attached. **Defaults `true`** — see the block
         * above. Public and settable so a scene or a test can drive the branch without a race manager.
         */
        raceStarted: boolean;
        /**
         * Fallback for `RACE_COMPLETED` when no race is attached. Defaults `false`, which is both
         * Unity's initialiser and the additive choice — every existing camera trace is unchanged.
         */
        raceCompleted: boolean;
        /**
         * `Camerafollow.cs:150` — the field of view to adopt once the race is completed, DEGREES.
         *
         * **GUARDED ON `> 1`, AND THAT GUARD IS THE WHOLE POINT OF THE FIELD.** `:149` is
         * `if(raceEndFOV > 1)`, so **0 means "leave the FOV alone"** and not "set the FOV to zero".
         * Read from the scene YAML per D-9/P-10 rather than from the script, because
         * `Camerafollow.cs:14` declares it bare: **65 on Mario Circuit and Water Park, 0 on the other
         * three shipped tracks**. Three of five tracks therefore ship the do-nothing value.
         *
         * **THIS PORT'S TRACK HAS NO UNITY COUNTERPART, SO 65 HERE IS A PORT INVENTION** — declared as
         * one, chosen as the value the two tracks that DO use the branch ship, rather than measured.
         *
         * Babylon's `Camera.fov` is RADIANS and Unity's `fieldOfView` is DEGREES; the conversion is at
         * the write, and the field keeps Unity's units so a glTF-authored value arrives meaning what
         * it meant in the Inspector.
         */
        raceEndFOV: number;
        /**
         * Rate the rig's rotation slerps onto the kart's, per second (`Camerafollow.cs:74`).
         *
         * **3/s, and it is a requirement — but read the header for WHAT it is a requirement for.**
         *
         * It is not the roll. The visible roll on a banked corner is the rig adopting the surface's
         * bank (`getHorizonTilt()`, about 18 degrees on the bench sweeper) and it is unchanged from
         * 1/s to 240/s. What this number buys is **LAG**: how far the view trails the heading through
         * a corner — 18.6 degrees of yaw at 3/s against 7.2 at 7.5/s and 0.02 at 240/s. A camera
         * welded to the kart's nose reads as rigid and makes a drift unreadable, which is the actual
         * cost of "tidying" this to 7.5.
         */
        followRate: number;
        /**
         * Rate of the SEPARATE jump-panel slerp, per second (`Camerafollow.cs:97`).
         *
         * =========================================================================================
         * A TERM, NOT A SUBSTITUTE. THE DIVERGENCE THAT USED TO LIVE HERE IS CLOSED (T43).
         * =========================================================================================
         *
         * Two earlier readings of this number were wrong, and the history is kept because each was
         * believed. The first called 0.4/s "deliberately, extravagantly laggy … the one place in the
         * file where the lag is the point". The second (T33) found that `:95-98` is not the else-branch
         * of `:72` but a **separate, unconditional `if`** running after the whole rotation block —
         * so Unity applies the `:74` follow at 3/s and then this one at 0.4/s toward the same target,
         * composing to exactly **3.4/s** — and recorded the divergence without repairing it, because
         * T33's acceptance required a purely additive change.
         *
         * **T43 repaired it.** `updateRigRotation` now issues the second slerp as its own statement, so
         * on an ordinary jump panel the rig converges at 3 + 0.4 = 3.4/s and Unity's panel camera is
         * what it always was in the source: slightly FASTER than its normal follow, not eight and a
         * half times slower. The number here is unchanged and is still `:97`'s own; what changed is
         * that it is added rather than swapped in.
         *
         * Because it is a separate slerp and not a rate, it composes to a single 3.4/s ONLY where the
         * first slerp aims at the same place. While gliding or levelling out for a trick it is a second
         * pull toward the kart's own attitude, which is exactly what the source does.
         */
        jumpPanelRate: number;
        /**
         * Rate while gliding, per second (`Camerafollow.cs:84`).
         *
         * 1/s, slower again than the normal 3/s, because a glider's heading changes slowly and a
         * camera that tracked it tightly would make the pitch input feel like nothing is happening.
         */
        glideRate: number;
        /**
         * Rate the rig levels out while a trick boost is pending, per second (`Camerafollow.cs:88`).
         *
         * **3/s, and it is its own property rather than a reuse of `followRate` on purpose.** Both are
         * a bare literal `3` in the source — `:74` for the normal follow and `:88` for the level-out —
         * and two literals that happen to agree are not one value. Folding them together would mean a
         * later tune of the chase lag silently moved the trick camera with it, which is exactly the
         * class of coupling the header's rate banner exists to prevent.
         */
        trickLevelRate: number;
        /** Rate the child node's own rotation approaches its target, per second (`Camerafollow.cs:101-115`). */
        childRate: number;
        /** Rate the child dollies between `orig_pos` and `boost_pos`, per second (`Camerafollow.cs:121-133`). */
        boostDollyRate: number;
        /**
         * `Camerafollow.cs:138` — the child's return to `orig_pos` once the race is completed, per second.
         *
         * **A NAMED FIELD OF ITS OWN, NOT A REUSE OF `childRate`, WHICH ALSO HAPPENS TO BE 3.** This
         * file's header is explicit that two literals which happen to agree are not one value, and
         * these two are a worked example: `childRate` (`:105`) drives the child's ROTATION, this one
         * (`:138`) drives its POSITION, they sit in different statements in the source, and Unity is
         * free to change either without the other. Folding them together would make a later divergence
         * in the donor unrepresentable here.
         *
         * It is also **not** `boostDollyRate`, which is 4 and drives the ordinary positional return at
         * `:129`. So the child has two positional return rates, 4 during the race and 3 after it, and
         * the difference is a deliberate slowing of the shot as the race ends.
         */
        raceEndReturnRate: number;
        /** `Camerafollow.offset` — how far up the kart's own up axis the rig sits. Unity: 1.8. */
        heightOffset: number;
        /** `Camerafollow.orig_pos` — the child's resting local pose. Unity: (0, 0.7, -6.75). */
        orig_pos: BABYLON.Vector3;
        /** `Camerafollow.boost_pos` — the child's boosting local pose. Unity: (0, 1, -8). */
        boost_pos: BABYLON.Vector3;
        /** Default child pitch, degrees — Unity's `(2, y, 0)` (`Camerafollow.cs:109`). */
        defaultChildPitch: number;
        /**
         * The child's local **y** inside a camera-rotating anti-gravity volume (`Camerafollow.cs:124`
         * and `:133`). Unity: **0.4**.
         *
         * =========================================================================================
         * THE VALUE IS MEASURED FROM THE SCENES, NOT FROM THE SCRIPT. THIS IS THE `offset` LESSON.
         * =========================================================================================
         *
         * `Camerafollow.cs:13` declares `public float antiGravityPosY;` with NO initialiser — it is
         * Inspector-serialized, so reading the .cs file tells you nothing and inventing a number here
         * is exactly how this port previously came to ship guesses for `offset` and `orig_pos`. Read
         * from `Assets/Scenes/*.unity` -> MonoBehaviour guid `3c037e6c29b4e8b4c9046696c6f28719`, it is
         * **0.4** in Mario Circuit, Rainbow Road, Toad Harbor and Water Park, and 0 in MooMooMeadows —
         * the one track with no rotating anti-gravity section for it to apply to. 0.4 is the shipped
         * value; MooMooMeadows' 0 is an unset field, not a second opinion.
         *
         * **IT IS LOWER THAN BOTH RESTING POSES, AND THAT IS THE POINT.** `orig_pos.y` is 0.7 and
         * `boost_pos.y` is 1.0, so entering a leaning barrel drops the camera roughly 0.3 units toward
         * the deck and keeps it there whether or not a boost is running. Riding closer to the surface
         * is what makes the wall the kart is driving on fill the frame — which is the whole visual
         * argument for anti-gravity, and it is missing from a rig that only rides the kart's up.
         *
         * Only the **y** is replaced. `x` and `z` still come from whichever pose is in play, so the
         * boost dolly still pulls back the full 1.25 units inside a barrel.
         */
        antiGravityPosY: number;
        /**
         * Seconds the camera keeps riding the kart's own up after anti-gravity ends.
         *
         * **The 3 s tail is what stops the camera snapping on exit.** Leaving a barrel flips the
         * reference frame from the kart's up back to the world's, and doing that on the frame the
         * volume ends would rotate the whole view instantly. The tail lets the rig's own 3/s slerp
         * carry the change instead.
         */
        antiGravityTailSeconds: number;
        /** Anti-gravity volume's `rotAmountX`, degrees. The extra pitch it asks the camera child for. */
        rotAmountX: number;
        /** Anti-gravity volume's `rotAmountZ`, degrees. */
        rotAmountZ: number;
        /**
         * Fallback for `rotateCamAntiGravity` when the target does not carry the getter, and the value
         * a scene can hand-set.
         *
         * **DEFAULTS TRUE, WHICH IS NOT UNITY'S INITIALISER, AND THE DIFFERENCE IS DELIBERATE.**
         * `Camerafollow.cs:21` declares it `false`, and — correcting an earlier version of this comment
         * — that initialiser is **load-bearing in shipped scenes**, not a first-frame artifact. The
         * claim that Unity writes the field "on every volume entry and exit" is wrong: `Player.cs:1043`
         * sits inside `if (rotateCam)`, so a `rotateCam: false` volume never writes it at all. A kart
         * that reaches a plain anti-gravity stretch before any leaning one runs on the `false`
         * initialiser — and Toad Harbor ships exactly that content.
         *
         * **So this default is NOT a port of that field**, and it is not a no-op either way: true
         * preserves the pitch/roll channel for duck-typed targets, and also hands them an
         * `antiGravityPosY` dolly they never had before T34. That cost is real and it is measured —
         * section 13 of `KartCamera.test.ts` pins it as the only quantity on which the live camera
         * diverges from the pre-T33 reference model.
         *
         * It is the answer for a target that **cannot answer** — a stand-in in a test, or a race
         * manager driving this rig with something that is not a kart — and it is chosen so that such a
         * target keeps the channel it could previously see: the child's PITCH and ROLL, taken from
         * whatever `rotAmountX`/`rotAmountZ` it supplies.
         *
         * Defaulting FALSE was tried first and broke four existing tests whose targets report
         * anti-gravity and non-zero `rotAmountX`/`rotAmountZ` and have no opinion about cam-rotate.
         * They were right to break: silently dropping the lean for every duck-typed target that had not
         * heard of T34 is a behaviour change smuggled in under a feature.
         *
         * **NEITHER DEFAULT IS A NO-OP, AND SAYING OTHERWISE WOULD BE THE MISLEADING PART.** True keeps
         * the pitch/roll channel and hands those same targets the `antiGravityPosY` dolly they did not
         * have before; false keeps the dolly and drops the lean. The trade was made toward the channel
         * a caller had actually authored a value for — a target supplying `rotAmountX` has asked for a
         * lean — and the cost is recorded and measured rather than hidden: `KartCamera.test.ts` section
         * 13 pins the pre-change reference model diverging on the dolly's y, and only on the dolly's y,
         * for exactly the frames such a target reports anti-gravity.
         *
         * A real `StandardKartController` implements `isAntiGravityCamRotate()`, so its answer wins and
         * this value is never consulted on the live path. With no kart at all `antiGravity` is false
         * too, so a lean cannot happen regardless of what this says.
         */
        rotateCamAntiGravity: boolean;
        /** Glider volume's `glideAngleX` — the rig's pitch while gliding, degrees (`Camerafollow.cs:84`). */
        glideAngleX: number;
        /** Glider volume's `glideAngle` — the rig's roll while gliding, degrees. */
        glideAngleZ: number;
        /** The child node. Built in `start()` if the rig does not already carry one. */
        protected child: BABYLON.TransformNode;
        /** Seconds left on the anti-gravity tail. */
        protected antiGravityTail: number;
        /** Reused rotation target, so a frame allocates nothing. */
        private readonly targetRotation;
        /** Reused child rotation target. */
        private readonly childTarget;
        /** Reused rig position scratch. */
        private readonly rigPosition;
        /** Reused child position target. */
        private readonly childPosition;
        protected awake(): void;
        protected start(): void;
        /**
         * `Camerafollow.cs:44` runs in **`LateUpdate`**, and that placement is load-bearing rather
         * than incidental: the camera must read the chassis orientation the kart settled on THIS
         * frame. Reading it from `update()` would show the previous frame's, adding a frame of lag on
         * top of the 3/s the design already asks for and making the lean read as latency.
         */
        protected late(): void;
        protected destroy(): void;
        /** Reads the serialized property bag. Nothing that touches the scene belongs here. */
        protected awakeCameraState(): void;
        /** Resolves the player and the child node, building the latter if the rig did not ship one. */
        protected initCameraState(): void;
        /**
         * `Camerafollow.cs:44-133` — the whole camera, in the source's own order.
         *
         * Position first, then the rig's rotation, then the child's rotation, then the child's dolly.
         * The order matters only in that the camera is written from the child's world transform at the
         * end, so everything upstream of that has to be settled first.
         */
        protected lateCameraState(): void;
        /**
         * `Camerafollow.cs:146-153`. On completion: reset the rig's scale, and adopt `raceEndFOV`.
         *
         * Two unrelated things Unity does in one block, and both are transcribed rather than tidied.
         *
         * **THE SCALE RESET LOOKS LIKE A NO-OP AND IS KEPT ANYWAY.** Nothing in this port ever scales
         * the rig, so `(1,1,1)` is what it already is. In Unity something evidently does — a scale
         * reset that was never scaled is not a line anyone writes — and whatever that is has not been
         * found in the source. Transcribing a line whose purpose is unknown is cheaper than deciding
         * it is unnecessary and being wrong; it costs one assignment on the frames after the finish.
         *
         * **THE FOV IS GUARDED ON `raceEndFOV > 1`, AND THE GUARD IS THE FEATURE.** `:149` is
         * `if(raceEndFOV > 1)`, so **0 means "leave the FOV alone"** — which is what three of Unity's
         * five shipped tracks author. A port that read the field and wrote it unconditionally would set
         * the field of view to zero on those tracks and black the screen.
         *
         * Written in RADIANS. Babylon's `Camera.fov` is radians; Unity's `fieldOfView` is degrees; the
         * field carries Unity's units so a glTF-authored value means what the Inspector showed. Guarded
         * on the property existing, because `camera` is duck-typed `any` and may be a bare
         * `TransformNode` with no `fov` at all.
         */
        protected applyRaceEndFraming(raceCompleted: boolean): void;
        /** Releases the references. Nothing here owns an observer or a timer. */
        protected destroyCameraState(): void;
        /**
         * `Camerafollow.cs:48-70`. Where the rig sits: on the kart, offset along an up axis.
         *
         * WHICH up is the entire content of this method. Under anti-gravity — or within
         * `antiGravityTailSeconds` of it, or while gliding — it is the KART's up, so the rig stays
         * outboard of a kart running along the inside of a barrel. Otherwise it is the world's, so the
         * rig sits directly above the kart on ordinary ground however the chassis is banked.
         *
         * **THIS BRANCH IS ABOUT POSITION ONLY, and it does not affect the tilt.** The only thing
         * written here is `transform.position`; the rig's ORIENTATION is `updateRigRotation`'s, and it
         * slerps onto the full chassis quaternion — roll included — in every state. So the camera
         * does roll with the chassis on an ordinary banked corner, and that is exactly where the
         * visible tilt comes from (measured: `getHorizonTilt()` = 18.4 degrees on the bench's
         * 18-degree sweeper, with anti-gravity nowhere in sight). An earlier version of this comment
         * claimed the opposite; the file's own `getHorizonTilt()` disproves it in one line.
         *
         * **THE GLIDE ASYMMETRY IS UNITY'S OWN, AND T49 CHECKED RATHER THAN TIDIED IT.** While gliding
         * this method DOES ride the kart's rolled `up`, and `updateRigRotation` does NOT — it goes to
         * the volume's trim instead. That looks like an inconsistency and it is a transcription:
         * `Camerafollow.cs:49` gates the position branch on `antiGravity || antiGravityTimeAgo < 3 ||
         * GLIDER_FLY` and takes `player.up`, while `:84` targets
         * `Euler(glideAngleX, player.eulerAngles.y, glideAngleZ)` — the trim, with no term from the
         * kart's roll at all. So the rig is carried around the kart's roll while being held level in
         * it, which is exactly why a glide reads as the kart banking IN FRAME where a banked corner
         * reads as the horizon tipping. It is not obviously wrong, it is not this port's invention,
         * and it is deliberately left alone.
         */
        protected updateRigPosition(antiGravity: boolean, gliding: boolean, raceCompleted: boolean): void;
        /** The kart's yaw, radians — the one component every rotation target here keeps. */
        protected playerYaw(): number;
        /**
         * Whether a trick boost is pending on the target (`Camerafollow.cs`'s `trickBoostPending`).
         *
         * False for any target that does not carry the optional getter, which is what makes T33 a
         * purely additive change: with no trick signal every branch below reduces to what it was.
         */
        protected isTrickPending(): boolean;
        /**
         * `Camerafollow.cs:72-98`. The rig's rotation, and the four rates it runs at.
         *
         * Normally it slerps onto the kart's own orientation at **3/s** — see the file header. While
         * gliding it goes instead to the glider's own attitude (`glideAngleX` pitch, the kart's yaw,
         * `glideAngle` roll) at 1/s, so the camera flies the glider rather than the kart. On a jump
         * panel it drops to 0.4/s and simply falls behind.
         *
         * **AND WHILE A TRICK BOOST IS PENDING IT LEVELS OUT.** `:72` gates the normal follow off with
         * `!trickBoostPending`, and `:86-89` sends the rig to `Euler(0, playerYaw, 0)` instead — the
         * kart's heading with **pitch and roll zeroed**. The kart is tumbling through a trick; the
         * camera holds the horizon flat and lets it tumble in frame. Without this a trick reads as the
         * whole world rolling over, which is both unreadable and, on a bare red box, nauseating.
         *
         * THE ANTI-GRAVITY CASE IS A FREEZE, NOT A FALLBACK. `:86` carries `&& !antiGravity`, and `:72`
         * is already false, so with a trick pending AND anti-gravity active **neither branch assigns a
         * rotation at all** and the rig simply holds last frame's. That is transcribed rather than
         * tidied into "fall back to the normal follow": the source's behaviour is a hold, and inventing
         * a slerp here would put motion on screen that Unity does not have.
         *
         * Precisely: the hold is what `:72` and `:86` do, and it is now a FLAG rather than an early
         * `return`. In the one sub-state where a trick, anti-gravity and a jump panel are all live at
         * once, Unity's unconditional `:95` still slerps at 0.4/s — a `return` here swallowed it, and
         * that was the last corner of the jump-panel modelling gap. T43 closed it: the hold suppresses
         * only the rotation block's own write, and `:95`'s statement runs after it either way. With no
         * panel the freeze is absolute exactly as before.
         *
         * ---------------------------------------------------------------------------------------------
         * THE JUMP-PANEL DIVERGENCE FOUND WHILE WRITING THIS — NOW CLOSED (T43).
         *
         * Unity's jump-panel slerp at `:95-98` is a **separate, unconditional `if`** that runs AFTER the
         * block below — not the else-branch this port used to model it as. So on a jump panel Unity
         * applies BOTH the `:74` follow at 3/s and the `:97` one at 0.4/s toward the same target,
         * composing to exactly 3.4/s; the port replaced 3 with 0.4 instead, roughly eight and a half
         * times slower and in the opposite direction from the source.
         *
         * T33 recorded it rather than repairing it, because that task's acceptance required a purely
         * additive change and this moves every driven jump-panel trajectory. T43 is the task that took
         * those measurements and made the change. See `jumpPanelRate` and the block at the end of this
         * method.
         * ---------------------------------------------------------------------------------------------
         */
        protected updateRigRotation(dt: number, gliding: boolean, jumpPanel: boolean, trickPending: boolean, antiGravity: boolean, raceStarted: boolean): void;
        /** The kart's own orientation, from whichever of the two rotation channels the node is using. */
        protected copyPlayerRotationTo(out: BABYLON.Quaternion): void;
        /**
         * The pitch the current anti-gravity volume asks the child for, degrees.
         *
         * The kart's answer wins when it has one, because the kart is the thing that knows which
         * volume it is standing in; this component's own `rotAmountX` is the fallback for a target
         * that does not carry the getter, and for a scene that wants to set the lean by hand.
         */
        protected volumeRotAmountX(): number;
        /**
         * `RACE_MANAGER.RACE_STARTED`, or the fallback when no race is attached.
         *
         * The same optional-getter shape as `volumeRotAmountX` and for the same reason: the race
         * manager is the thing that knows, so its answer wins where it has one, and this component's
         * own `raceStarted` is the fallback — both for a scene with no race and for a test that wants
         * to drive the branch by hand.
         *
         * **THE FALLBACK IS `true` AND THAT IS A BEHAVIOUR CHOICE.** See the block beside `race`.
         * `typeof`-guarded on the field rather than on a method, because a race manager exposes these
         * as public FIELDS (Unity's are statics), so there is no getter to probe for.
         */
        protected isRaceStarted(): boolean;
        /** `RACE_MANAGER.RACE_COMPLETED`, or the fallback. As above; the fallback is `false`. */
        protected isRaceCompleted(): boolean;
        /** The roll the current anti-gravity volume asks the child for, degrees. As above. */
        protected volumeRotAmountZ(): number;
        /**
         * The PITCH trim the current glider volume asks the rig for, degrees (T49).
         *
         * The same shape as `volumeRotAmountX` and for the same reason: the kart is the thing that
         * knows which volume it is inside, so its answer wins where it has one, and this component's
         * own `glideAngleX` is the fallback — both for a target that does not carry the getter and for
         * a scene that wants to set the trim by hand.
         *
         * **Unity has this bridge and this port did not**, which is the whole of T49:
         * `Player.cs:1114-1115` writes `Cam.glideAngleX` / `Cam.glideAngleZ` on entering a
         * `GliderPanelFly` volume. It is not a hypothetical payload either — read from the scene YAML
         * per D-9, **Mario Circuit ships twelve `GetGlideAngle` volumes stepping `glideAngle` from
         * -50 to 0 in fives**, and Rainbow Road and Water Park ship `glideAngleX` of -35, -20 and -10.
         * Every one of those was being dropped.
         */
        protected volumeGlideAngleX(): number;
        /** The ROLL trim the current glider volume asks the rig for, degrees. As above. */
        protected volumeGlideAngleZ(): number;
        /**
         * Whether the current anti-gravity volume asked the camera to rotate (`rotateCamAntiGravity`).
         *
         * The kart's answer wins where it has one, because the kart knows which volume it is inside;
         * the component's own flag is the fallback and the hand-set value.
         */
        protected isAntiGravityCamRotate(): boolean;
        /**
         * `Camerafollow.cs:101-115`. The child's own rotation, at 3/s.
         *
         * Inside a **camera-rotating** anti-gravity volume it takes the VOLUME's `rotAmountX`/
         * `rotAmountZ` — which is how a track author rolls the view through a corkscrew without
         * touching the kart. Otherwise it settles on Unity's `(2, y, 0)`: two degrees of downward
         * pitch, so the kart sits slightly below centre and the road ahead gets the rest of the frame.
         *
         * =========================================================================================
         * T34 FIXED A LIVE DEFECT HERE. THE CONDITION IS TWO FLAGS, NOT ONE.
         * =========================================================================================
         *
         * This used to branch on `antiGravity` alone. Unity branches on `antiGravity` at `:101` and
         * then on `rotateCamAntiGravity` at `:103` — and `:107`'s inner `else` and `:112`'s outer
         * `else` are the SAME pose, `Euler(2, y, 0)`. So the source's rule is "volume amounts only when
         * BOTH are set; the ordinary two-degree pitch in every other case".
         *
         * Branching on one flag meant an anti-gravity volume authored `rotateCam: false` got
         * `Euler(0, y, 0)` — because the controller zeroed the amounts — where Unity gives it
         * `Euler(2, y, 0)`. Two degrees of pitch, silently dropped, on exactly the volumes a track
         * author marked as not wanting a camera lean. `Player.cs:1054-1055` reasserting `(2, 0)` on
         * exit is the same rule stated a second way.
         */
        protected updateChildRotation(dt: number, leaning: boolean): void;
        /**
         * One dolly step toward a local pose, at an already-computed blend factor.
         *
         * `leaning` swaps the target's **y** for `antiGravityPosY` and leaves x and z alone —
         * `Camerafollow.cs:124` and `:133` build `new Vector3(pose.x, antiGravityPosY, pose.z)` at
         * both call sites, so the substitution belongs here rather than at either branch.
         */
        protected lerpChildTo(target: BABYLON.Vector3, k: number, leaning: boolean): void;
        /**
         * `Camerafollow.cs:118-135`. The boost dolly: the child slides back to `boost_pos` at 4/s.
         *
         * A single unit of travel, and it is entirely responsible for a boost reading as speed rather
         * than as a bigger number in the HUD. It runs on the CHILD, along the rig's own nose, so a
         * boost taken mid-corner pulls back along where the kart is pointing rather than along the
         * world.
         *
         * =========================================================================================
         * TWO `if`S, NOT AN `if`/`else`, AND THAT IS THE WHOLE REASON THIS METHOD IS SHAPED LIKE THIS.
         * =========================================================================================
         *
         * `:118` pulls back when `(Boost || trickBoostPending)`. `:127` returns when `(!Boost &&
         * !isBullet)`. They are independent statements, so with a trick pending and no boost yet
         * granted — which is the entire airborne half of every trick — **both run in the same frame**:
         * the child lerps toward `boost_pos`, and then lerps from that result back toward `orig_pos`.
         *
         * The composition is not a no-op and it is not the full dolly. Its fixed point is
         *
         *     p = [(1 - k) * boost_pos + orig_pos] / (2 - k),    k = 1 - exp(-boostDollyRate * dt)
         *
         * which at any sane frame time is essentially the **midpoint of the two poses** (z = -7.35 at
         * 60 Hz against -7.33 at 30, so the frame-rate sensitivity is 0.02 units and beneath notice).
         * A trick therefore pulls the camera back HALF a dolly while the kart is in the air, and the
         * landing's 0.9 s boost completes it — which is why the trick reads as a wind-up followed by a
         * release rather than as a single shove.
         *
         * Written as two sequential lerps because that is what the source does. Collapsing it to
         * "target the midpoint" would be arithmetically close and would quietly lose the reason.
         *
         * `isBullet` at `:127` is always false in this port (P-9: no item system), so the condition
         * reduces to `!Boost`. Named here rather than left as a phantom term in a comment.
         */
        protected updateChildPosition(dt: number, boosting: boolean, trickPending: boolean, leaning: boolean, raceCompleted: boolean): void;
        /**
         * Copies the child's world transform onto the camera.
         *
         * The camera is duck-typed because the viewer, not this component, owns camera creation in
         * this framework. `rotationQuaternion` is preferred where the camera has one — writing Euler
         * angles onto a camera that is already quaternion-driven silently does nothing.
         */
        protected writeCamera(): void;
        /** The child node the camera is placed at. */
        getChild(): BABYLON.TransformNode;
        /** Seconds left on the anti-gravity tail — non-zero for 3 s after a barrel. */
        getAntiGravityTail(): number;
        /**
         * The local y the child dolly actually settles on right now.
         *
         * =========================================================================================
         * IT TAKES `trickPending` BECAUSE THE FIRST VERSION DID NOT, AND WAS THEREFORE WRONG.
         * =========================================================================================
         *
         * With a trick pending and no boost, `updateChildPosition` runs BOTH lerps (see its banner) and
         * the child settles on the composite fixed point `[(1-k)*boost_pos.y + orig_pos.y] / (2-k)` —
         * 0.845 at 60 Hz — not on `orig_pos.y`. The original signature omitted the flag and confidently
         * answered 0.7 for a child sitting at 0.845.
         *
         * That is not a cosmetic slip. This method's own docblock invoked SPEC.md's convention that **an
         * effect which reports itself running is not an effect that works**, and then broke it in the
         * same breath: a readout that answers a different question from the code it reports on is
         * exactly how the presentation layer's three invisible emitter bugs survived a green suite.
         *
         * `dt` only matters for that composite — the fixed point drifts 0.02 units between 30 and 60 Hz
         * — so it defaults to a 60 Hz frame and is a parameter rather than a hidden assumption.
         */
        getChildTargetY(boosting: boolean, trickPending?: boolean, dt?: number, raceCompleted?: boolean): number;
        /**
         * Whether the camera is currently framing a leaning anti-gravity volume.
         *
         * **THE SINGLE DEFINITION OF THAT STATE.** `lateCameraState` and `getChildTargetY` both call
         * this rather than re-deriving `antiGravity && camRotate` — an earlier T34 draft wrote the
         * condition out three times, and a readout that can drift out of step with the code it reports
         * on is exactly the failure shape SPEC.md records for the presentation layer's three invisible
         * emitter bugs: the component said it was working and it was not.
         */
        isLeaning(): boolean;
        /** Whether the rig is currently riding the kart's own up rather than the world's. */
        isUsingLocalUp(): boolean;
        /**
         * The angle between the rig's up and the kart's up, degrees — **a diagnostic, not the lean**.
         *
         * Read the header before drawing a conclusion from this number. It is exactly zero on flat
         * ground at any rate, and it grows with BOTH the surface bank and the camera's yaw lag —
         * `cos(lean) = cos^2(bank) + sin^2(bank) * cos(dYaw)`. It is therefore a good single-number
         * check that the rig is lagging the chassis the way it should, and a bad proxy for what the
         * player sees: with the chassis roll frozen it still reproduces 95 percent of its own range,
         * so it is measuring yaw lag on a tilted axis rather than any roll gap.
         *
         * For the tilt on screen, use `getHorizonTilt()`.
         */
        getLeanAngle(): number;
        /**
         * How far the horizon is rolled in frame, degrees — **the tilt a player actually sees**.
         *
         * The angle between the camera child's up and world up. On a banked corner this is
         * essentially the bank angle: the rig adopts the chassis's roll, so the world tips instead of
         * the kart, and the red box sits upright in frame while the horizon leans. Measured on the
         * bench's 18-degree sweeper it reads about 17.5 degrees at every camera rate from 1/s upward
         * — which is the honest answer to "does the acceptance's visible roll exist" (it does, and it
         * is large) and to "is it the 7.5/3 rate gap that produces it" (it is not).
         */
        getHorizonTilt(): number;
    }
}
declare namespace PROJECT {
    /**
     * Unity's fixed timestep, seconds (`ProjectSettings/TimeManager.asset` → `Fixed Timestep: 0.02`).
     *
     * **This is a unit conversion constant and never the live physics step.** It appears wherever
     * FINDING 1 applies — turning a Unity `AddForce(x * dt, Acceleration)` into a real acceleration
     * of `x * UNITY_FIXED_STEP` u/s², and turning a dt-less `Lerp(a, b, k)` into a rate of
     * `k / UNITY_FIXED_STEP` per second. Reading the live step here instead would make the port
     * drift with frame rate in exactly the way FINDING 1 exists to prevent.
     */
    const UNITY_FIXED_STEP: number;
    /**
     * Unity's `Mathf.Lerp(current, target, k * Time.deltaTime)`, ported frame-rate independently.
     *
     * Unity's form is a first-order approach whose per-step fraction happens to be `k · dt`. Ported
     * literally it is frame-rate dependent — at 144 Hz the kart accelerates measurably faster than at
     * 50 Hz. The closed form `target + (current - target)·e^(-k·dt)` is the SAME CURVE at 50 Hz and
     * the same curve everywhere else, which is what FINDING 1's "must be frame-rate independent"
     * actually requires.
     *
     * Exported because it, and everything built on it, is the part of this component that can be
     * tested without a scene.
     */
    function approachRate(current: number, target: number, ratePerSecond: number, dt: number): number;
    /**
     * Unity's dt-LESS `Mathf.Lerp(current, target, k)` — the second idiom in FINDING 1's table.
     *
     * A constant fraction per fixed step is a rate of `k / 0.02` per second, and 0.02 is Unity's
     * timestep as a literal, never the live one.
     */
    function approachPerStep(current: number, target: number, fractionPerStep: number, dt: number): number;
    /**
     * Unity's per-fixed-step multiply `v *= f`, ported frame-rate independently.
     *
     * Applied once per step at 50 Hz, so at any other rate the exponent is `dt / 0.02`. Used by the
     * `CancelDownForce` volume's 0.98 (`1273-1278`) and by the glider's vertical damping
     * (`1349-1356`, 0.75 / 0.45) — **but by the glider only on the frames where the vertical
     * PERSISTED**.
     *
     * THAT CAVEAT IS THE WHOLE SUBTLETY OF THIS FUNCTION. Raising a per-step multiplier to `dt/0.02`
     * is correct for a value that compounds across steps and wrong for one that is REBUILT each step:
     * as `dt` shrinks the exponent goes to zero, the multiplier goes to 1, and the damping vanishes
     * entirely. A rebuilt quantity takes the FLAT factor instead — the same number Unity applies at
     * its own 50 Hz. Both readings coincide at `dt = 0.02`, which is why the wrong one survived until
     * the glider was driven at 144 Hz. See `move()`'s branch and `addLocalVerticalPush`'s note.
     */
    function dampPerStep(value: number, factorPerStep: number, dt: number): number;
    /**
     * The drift's outward slide, units/second (`Player.cs:1567`/`1584`).
     *
     * `AddForce(∓transform.right · 50000 · dt, Acceleration)` is 1000 u/s² through FINDING 1, and a
     * horizontal force on an assigned velocity is a per-step velocity offset rather than an
     * acceleration (see `addStepVelocity`) — so `50000 · 0.02 · 0.02` = **20 u/s**, which is the
     * number FR-4's 14° of slip is `atan(20 / 80)` of.
     *
     * Exported because it is the one figure in the drift a reader will want to check by hand.
     */
    const DRIFT_LATERAL_SLIP: number;
    /** `Player.cs:1441`. Rate `upForce` approaches `downForce` at during a jump-panel flight, per second. */
    const JUMP_PANEL_DECAY_RATE: number;
    /**
     * `Player.cs:1444`. Forward thrust during a jump-panel flight, as a Unity force figure.
     *
     * `60000` here becomes **1200 u/s²** through FINDING 1 (`60000 × 0.02`), which is the same thing as
     * Δv = 24 u/s per 50 Hz step. Analysis §E.3 records both readings and that they are one number; a
     * port that "corrects" either has changed how far a panel throws the kart.
     */
    const JUMP_PANEL_THRUST: number;
    /**
     * How long a `RotatePlayerJumpPanel` volume keeps turning the kart, seconds.
     *
     * `RotatePlayerJumpPanel.cs` runs `for (i = 0; i < 60; i++) { ...; yield WaitForSeconds(0.01f); }`
     * — sixty steps of a nominal 0.01 s, so 0.6 s is what the source literally writes.
     *
     * **Unity's REALISED duration is frame-rate dependent and this port does not reproduce that.**
     * `WaitForSeconds(0.01f)` cannot resume sooner than the next frame, so the loop actually takes
     * ~2.0 s at 30 fps, ~1.0 s at 60 and ~0.83 s at 144. Reproducing that would mean reproducing a
     * frame-rate bug, which D-6 exists to say this port does not do: the nominal figure is taken and
     * the approach below is made rate-independent.
     */
    const JUMP_PANEL_ROTATE_SECONDS: number;
    /**
     * Rate the kart is turned towards the volume's attitude, per second.
     *
     * `RotatePlayerJumpPanel.cs` — `Quaternion.Lerp(rotation, target, 1 * Time.deltaTime)`. A dt-scaled
     * lerp is an exponential approach, so this is a rate and not a fraction, and it is deliberately
     * slow: over the 0.6 s window it closes `1 - e^-0.6` = **45 %** of the way to the target. The
     * volume nudges the kart's heading, it does not snap it.
     */
    const JUMP_PANEL_ROTATE_RATE: number;
    /** `Player.cs:229`. Minimum `REALCURRENTSPEED` a trick needs — the ACTUAL nose-local speed. */
    const TRICK_MIN_SPEED: number;
    /** How long the trick's upward push lasts, seconds. */
    const TRICK_SECONDS: number;
    /** The push's Unity force figure at the start of the curve. */
    const TRICK_FORCE_START: number;
    /** How much the push drops every `TRICK_DECAY_STEP`. */
    const TRICK_FORCE_DECAY: number;
    /** The interval the decay is quoted over, seconds — Unity spends it as a coroutine wait. */
    const TRICK_DECAY_STEP: number;
    /**
     * The floor the push decays to and then holds.
     *
     * Reached at `(6500 − 300) / 300 × 0.01` = 0.207 s, so the last third of the trick is a gentle
     * sustain rather than the force running negative and hauling the kart back down.
     */
    const TRICK_FORCE_FLOOR: number;
    /** `Player.cs:539-541`. Seconds of boost a landed trick FLOORS `Boost_time` at. Never assigns. */
    const TRICK_LANDING_BOOST: number;
    /** `Player.cs:1109-1214`. Above this `REALCURRENTSPEED` a glider deploy plays the trick variant. */
    const GLIDER_TRICK_SPEED: number;
    /** The trick variant's pause before the canopy opens, seconds. */
    const GLIDER_TRICK_OPEN_DELAY: number;
    /** The trick variant's pause after the canopy opens, before the payout. */
    const GLIDER_TRICK_PAYOUT_DELAY: number;
    /** `Player.cs:1178`. The trick variant's payout, seconds of boost. */
    const GLIDER_TRICK_BOOST: number;
    /**
     * `Player.cs:2144`. `rotate_strength` while gliding — pinned at three fifths of the ground figure.
     *
     * Reached from INSIDE `Move()` (`1437`), which is why this port writes it in `move()` and not in
     * `tickGlider()`; see the T48 note at that write for the whole argument. Unity's guard is a
     * zero-length raycast that never hits, so the pin is unconditional while the canopy is open.
     */
    const GLIDER_ROTATE_STRENGTH: number;
    /**
     * Rate the drift model settles back to square while coasting, per second (`Player.cs:1399`).
     *
     * Unity writes `Quaternion.Lerp(current, Euler(0,0,0), 0.4f)` once per frame, which is a flat
     * per-FRAME factor and therefore frame-rate dependent — D-6's rule. **30.6495 is not a chosen
     * figure**: it is the `r` for which `1 - exp(-r/60) = 0.4`, so the settle reproduces Unity's own
     * 60 Hz curve exactly and stays identical at 30 and 144 where Unity's would not.
     */
    const COAST_MODEL_SETTLE_RATE: number;
    /** `Player.cs:1374` — the source's accelerate rate, per second. Also its rate while boosting. */
    const UNITY_ACCEL_RATE: number;
    /**
     * Rate `currentspeed` approaches the cap **while a boost is running**, per second.
     *
     * **THE DIVERGENCE.** Unity uses `UNITY_ACCEL_RATE` here as everywhere else; 1.5 is a threefold
     * increase and it is what turns the payout into a shove. It applies ONLY while `Boost` is true,
     * so the kart's ordinary acceleration — the number the whole feel of the vehicle rests on — is
     * untouched and the divergence cannot leak anywhere else.
     *
     * **1.5 AND NOT 3.0, AND THE REASON IS THE WHOLE POINT OF THE MECHANIC.** 3.0 was tried first
     * and measured, and it is too much: every tier saturates the 120 cap inside its own window, so
     * the three payouts peak at 115.9, 119.6 and 120.0 and a seven-second drift buys nothing a
     * one-second drift did not. That deletes the thing a mini-turbo IS — hold it longer, get more.
     *
     * At 1.5 the tiers separate cleanly, because each one's window covers a different fraction of
     * the gap — `1 - exp(-1.5 t)` for t = 0.75, 1.5, 2.5 is 68 %, 89 % and 98 %:
     *
     *     tier 1   0.75 s   ~107 peak   (+28 over the release speed)
     *     tier 2   1.50 s   ~116 peak   (+37)
     *     tier 3   2.50 s   ~119 peak   (+40)
     *
     * All three are far past the 90 cruise cap, so all three are unmistakable, and each is visibly
     * bigger than the last. Set `boostAccelRate = UNITY_ACCEL_RATE` to restore the source exactly.
     */
    const KART_BOOST_ACCEL_RATE: number;
    /** `Player.cs:1732`/`1755`/`1776` — the source's charge boundaries, seconds. */
    const KART_DRIFT_TIERS_UNITY: number[];
    /**
     * Charge boundaries for the three payout tiers, seconds — the RECOMMENDED tuning.
     *
     * **THE SECOND DIVERGENCE**, and the one that decides whether a player ever SEES tier 2 or 3.
     * Unity's 4 and 7 second thresholds cannot be met in a corner; 1.8 and 3.0 can. Tier 1 drops to
     * 0.8 s so a short flick still pays something, which is much closer to how the mechanic reads in
     * the game this is modelled on.
     *
     * **EVERY TIER CUE READS THESE, NOT ITS OWN COPY.** The spark colour change and the charge
     * tone's retrigger are the player's only warning that a tier armed, and they live in two other
     * components that each carried their own 1.5/4/7. Changing the payout alone would have desynced
     * them — sparks saying "tier 1" while the release paid tier 2 — so both now read this array off
     * the kart through their duck-typed interfaces and fall back to `KART_DRIFT_TIERS_UNITY` only
     * when the target cannot report it.
     */
    const KART_DRIFT_TIERS_TUNED: number[];
    /** Pitch target magnitude either side of the volume's trim, degrees (`1157-1176`). */
    const GLIDER_PITCH_RANGE: number;
    /** How far nose-up the ATTITUDE may actually get, degrees. Tighter than the target on purpose. */
    const GLIDER_PITCH_CLAMP: number;
    /** Rate the glider's pitch approaches its target, per second. */
    const GLIDER_PITCH_RATE: number;
    /** Extra downforce while diving, u/s². */
    const GLIDER_DIVE_FORCE: number;
    /** Lift while climbing, u/s² — and only for the first `GLIDER_LIFT_SECONDS`. */
    const GLIDER_LIFT_FORCE: number;
    /** How long the climb's lift lasts after the canopy opens, seconds. */
    const GLIDER_LIFT_SECONDS: number;
    /** Roll magnitude at full stick, degrees, added to the volume's `glideAngle` (`1180-1190`). */
    const GLIDER_ROLL_RANGE: number;
    /** Rate the glider's roll approaches its target, per second. */
    const GLIDER_ROLL_RATE: number;
    /** Rate the steer input is smoothed at before it becomes a roll target, per second. */
    const GLIDER_ROLL_SMOOTH_RATE: number;
    /**
     * `Player.cs:550-574`. Minimum seconds the glider must be open before contact can close it.
     *
     * A launch clears the lip with the kart still within a unit or two of the boards, so without this
     * the first graze folds the canopy before the player has left the ramp.
     */
    const GLIDER_CLOSE_CONFIRM: number;
    /** `Player.cs:569-574`. How long the probe stays at 6 after a glider landing before dropping to 1. */
    const GLIDER_LANDING_SECONDS: number;
    /** `Player.cs:1077`. Seconds of boost for leaving a `GliderPanel`. */
    const GLIDER_PANEL_BOOST: number;
    /** `Player.cs:1095-1104`. How long the `GliderPanel` exit impulse decays over, seconds. */
    const GLIDER_IMPULSE_SECONDS: number;
    /** The exit impulse's Unity force at the start of the ramp. With mass 50 this is Δv = 8 u/s a step. */
    const GLIDER_IMPULSE_START: number;
    /** The exit impulse's force at the end of the ramp. Δv = 0.8 u/s a step. */
    const GLIDER_IMPULSE_END: number;
    /**
     * ARCADE. The shallowest descent angle a glide may be flown at, degrees, before the pitch tilts it.
     *
     * A FLOOR ON THE VOLUME'S `glideAngleX`, not a replacement for it: a volume that asks for a steeper
     * slope gets what it asked for, and one that asks for level flight — or says nothing, which is the
     * same thing and is the case the hover came from — gets this instead. 4 degrees because that is
     * what both shipped glider volumes already author, so the default arcade glide IS the slope those
     * tracks were tuned around.
     */
    const GLIDER_ARCADE_SLOPE_MIN: number;
    /**
     * ARCADE. The hard floor on the descent angle, degrees. **THE INVARIANT, NOT A TUNING VALUE.**
     *
     * The glide slope is the kart's own ATTITUDE, and a nose-up attitude is 20 degrees the wrong side
     * of level — so this floor is what the climb control actually delivers, and it is the single line
     * that makes "a glider always comes down" true. 2 degrees is half the 4 the shipped volumes
     * author, so holding the nose up halves the descent rather than stopping it, which is the trade
     * Mario Kart offers.
     *
     * Separate from `GLIDER_ARCADE_SLOPE_MIN` because they answer different questions: the MIN is the
     * slope a shallow VOLUME is promoted to, this is the slope a nose-up PLAYER cannot get past.
     */
    const GLIDER_ARCADE_SLOPE_FLOOR: number;
    /**
     * ARCADE. Fraction of `sin(angle) · speed` the glide actually descends at.
     *
     * **NOT A FUDGE — IT IS THE SOURCE'S OWN NUMBER.** `move()`'s glider damp holds a nose-down
     * vertical at `× 0.75` of the value the attitude rebuilds each step, so three quarters of
     * `sin(angle) · speed` is precisely what the Unity model settles at on a trimmed volume. Carrying
     * it here is what makes the arcade model's neutral descent equal to the source's rather than 1.33
     * times it, and a track authored against one fly the same under the other.
     */
    const GLIDER_ARCADE_SLOPE_SCALE: number;
    /**
     * ARCADE. Rate the vertical approaches its slope's descent, per second.
     *
     * **THIS IS THE SOURCE'S OWN DAMP, CONVERTED — NOT A NUMBER CHOSEN TO MAKE A TRACK WORK.**
     * `move()`'s glider damp multiplies the vertical by 0.75 every 0.02 s, which by D-6 is a decay
     * rate of `-ln(0.75) / 0.02` = 14.384/s, and that is how fast the Unity canopy arrests a fall:
     * measured, 52.67 u/s down to 6.23 in 0.15 s. Using the same figure here means the two models
     * ARREST identically and differ only in what they arrest TO — the source to whatever its nose
     * happens to be pointing at, this to a floored glide slope.
     *
     * IT WAS A FITTED NUMBER FIRST, AND THE FITTING IS WHAT FOUND THE DERIVATION. 3/s was picked to
     * "preserve the launch arc" and dropped the race kart 30 units into its own gap; 12/s was then
     * picked by eye to match the measured arrest and still missed the apron. Asking WHY the source
     * arrests as fast as it does — rather than what number happens to match it — gave 14.384, which
     * lands the kart on the deck and is the only one of the three with a reason behind it.
     *
     * It also sets how much of the scene's -2 gravity leaks past the approach, which is `g / rate` =
     * 0.139 u/s on top of every target, and how much authority an updraught has over the slope. Both
     * are measured in `tests/KartGliderArcade.test.ts`.
     */
    const GLIDER_ARCADE_SINK_RATE: number;
    /** `Player.cs:1932-1971`. Front wheel and steering-wheel swing at full lock, degrees. */
    const WHEEL_STEER_ANGLE: number;
    /** Rate the steer visual approaches its target, per second. */
    const WHEEL_STEER_RATE: number;
    /**
     * Seconds anti-gravity is held after the last contact with an `AntiGravity`-tagged surface.
     *
     * THE PORT'S OWN NUMBER — Unity has no equivalent, because Unity's flag is latched by triggers and
     * never needs to survive a gap. Surface-driven anti-gravity does: a kart crossing a seam, cresting
     * a rib or taking one frame of air inside a tube would otherwise drop the mode and fall off a wall
     * it is still touching.
     *
     * Sized against the bench's measured worst case rather than guessed. The ground probe's longest
     * continuous miss while on the barrel wall is **0.567 s** under full lock — the harshest input
     * available — so a tail shorter than that would drop a kart that is legitimately mid-traverse.
     * 0.75 clears it with room and is still short enough that driving off the end of an anti-gravity
     * surface reads as immediate.
     */
    const ANTIGRAVITY_SURFACE_TAIL: number;
    /** Rate it is centred and held at under anti-gravity, per second (`1965`). */
    const WHEEL_STEER_FREEZE_RATE: number;
    /**
     * `Player.cs:1986-1993`. Speed below which the wheel spin follows `REALCURRENTSPEED`.
     *
     * Above it the spin follows `currentspeed / 4` instead. The switch is what stops a kart that has
     * been shunted sideways from spinning its wheels as though it were driving.
     */
    const WHEEL_SPIN_SPEED_SWITCH: number;
    /** `Player.cs:2659-2665`. Rate the anti-gravity wheel pose is approached at, per second. */
    const WHEEL_ANTIGRAVITY_RATE: number;
    /** How far the wheels swing about `z` under anti-gravity, degrees. */
    const WHEEL_ANTIGRAVITY_ANGLE: number;
    /** How far out the wheels translate under anti-gravity, as a multiple of their rest offset. */
    const WHEEL_ANTIGRAVITY_SPREAD: number;
    /**
     * Which way each wheel swings under anti-gravity, front-left, front-right, rear-left, rear-right.
     *
     * `Player.cs:2659-2665` targets `(0,0,90)`, `(0,180,-90)`, `(0,0,-90)`, `(0,180,90)`. Reduced to
     * each wheel's own rest frame — which cancels the right-hand pair's 180 exactly — that is
     * **+90, -90, -90, +90**: the swing alternates by DIAGONAL, not by side.
     */
    const WHEEL_POSE_SIGN: number[];
    /** The axle a wheel rolls about, in its own frame. */
    const WHEEL_SPIN_AXIS: BABYLON.Vector3;
    /** The axis a front wheel steers about. */
    const WHEEL_STEER_AXIS: BABYLON.Vector3;
    /** The axis the anti-gravity pose swings about. */
    const WHEEL_POSE_AXIS: BABYLON.Vector3;
    /**
     * `Player.cs:2659`. What the driver's arms scale to under anti-gravity, in node order.
     *
     * Two numbers for two arms, applied in the order a rig supplies its arm nodes. A rig with no
     * driver — the bench's red box — supplies none and nothing here runs.
     */
    const ARM_ANTIGRAVITY_SCALE: number[];
    /**
     * The animator trigger a rigged kart declares to take the wheels over from the procedural channel.
     *
     * **PORT-INTRODUCED.** Unity has no wheel trigger: there, the wheels are moved by
     * `movingCarParts()` in code and never by a clip, so there was no name to copy. It is deliberately
     * NOT `AntiGravity` — that string is already the chassis-lift trigger (T14) and reusing it made an
     * animator that lifted the body silently stop the wheels.
     */
    const WHEEL_ANIMATOR_TRIGGER: string;
    /** Radians per degree. Every ported Unity angle is authored in degrees; the maths runs in radians. */
    const DEG_TO_RAD: number;
    /**
     * How close an axis must get before an `AntiGravityExitRotate` payload retires, radians.
     *
     * A tenth of a degree. The approach is exponential and therefore never actually arrives, so
     * something has to call it done — and if nothing does, the payload keeps writing the kart's
     * orientation for the rest of the session and silently fights every later alignment.
     */
    const EXIT_ROTATE_EPSILON: number;
    /**
     * Wraps a radian angle into (-pi, pi].
     *
     * THE POINT IS THE SHORT WAY ROUND. A kart at 179 degrees approaching -179 must turn two degrees,
     * not 358. Interpolating raw angle differences is the single most common way an otherwise correct
     * rotation port produces a kart that spins the wrong way once per lap, and it is the same trap
     * `StandardKartCamera`'s header records for `Utilities.SmoothDampAngle`.
     */
    function wrapAngle(radians: number): number;
    /** One first-order step of an ANGLE toward a target, the short way round. `fraction` is 0-1. */
    function approachAngle(current: number, target: number, fraction: number): number;
    /** One key of a parsed Unity animation curve: a time, in seconds, and the value at it. */
    interface IKartKeyframe {
        /** Seconds from the start of the clip. */
        time: number;
        /** The value at that time. */
        value: number;
    }
    /**
     * Samples a keyframe track, linearly, clamped at both ends.
     *
     * Unity's curves are Hermite with per-key tangents and this is straight-line interpolation. That
     * is a deliberate simplification and the reason it is acceptable is the scale: the largest of
     * these curves is a **0.62-unit** hop on a kart that is 3.2 units long and travelling at 90, and
     * the difference between a Hermite and a linear reading of five keys over a third of a second is
     * a few millimetres for a few frames. What matters — the peak VALUE and the TIME it lands, which
     * are what FR-11's acceptance names — is a keyframe in both readings and therefore exact in both.
     *
     * Exported because the tracks are the whole of FR-11 and a test should read them the same way the
     * component does.
     */
    function sampleTrack(track: IKartKeyframe[], time: number): number;
    /**
     * `KartDriftHop.anim` — the drift hop, on the model child's local `y`.
     *
     * **NOT A JUMP.** The chassis does not leave the ground and no impulse is applied anywhere
     * (FINDING 0, and the drift machine's own header). This curve is the entire hop: the kart's body
     * lifts 0.62 units off its own suspension, lands at 0.217 s, squashes 0.06 below rest at 0.300 s
     * and settles at 0.333 s. Played only when `hopEnabled` — which is the ONLY thing that switch
     * touches (FR-5).
     */
    const KART_HOP_TRACK: IKartKeyframe[];
    /**
     * `KartBodyShake.anim` — the settle after the hop lands, on the model child's local `y`.
     *
     * The six measured values run from 0.217 s (the hop's touchdown, so the shake starts exactly as
     * the body arrives) to 0.55 s, evenly spaced.
     *
     * **ONE KEY IS ADDED AND IT IS NOT IN THE CLIP**: the final `0 @ 0.6 s`. The measured clip ends at
     * -0.02, because in Unity it is blended out by the animator rather than run to rest. A procedural
     * one-shot has no animator to blend it, so ending at -0.02 would leave the body permanently two
     * centimetres low. The settle is added, and is called out here rather than hidden, because it is
     * the one value in this file that was not measured.
     */
    const KART_SHAKE_TRACK: IKartKeyframe[];
    /** `EnterAntiGravity.anim` — the body rising as the wheels turn out, on the model child's local `y`. */
    const KART_ANTIGRAVITY_TRACK: IKartKeyframe[];
    /** `ChassisIdle.anim` — the body settling onto its springs when the kart comes to rest. */
    const KART_IDLE_TRACK: IKartKeyframe[];
    /**
     * `UnderwaterDriftLeft/Right.anim` (`Player.cs:1569`/`1586`) — the exaggerated underwater drift.
     *
     * Unlike every other clip here this one is HELD rather than played out: it reaches its pose over
     * 0.5 s and stays there for as long as the kart is drifting underwater, and unwinds when either
     * condition drops. Roll, outward offset and lift, in that order.
     *
     * **A LIMIT OF THE PORT AS IT STANDS, and it is the flag's fault rather than this pose's.**
     * "Submerged" is read off `FellInWater`, which `OutOfBounds.cs` sets on entering a `Water` volume
     * and clears on the NEXT `Ground`/`Dirt` contact — so today it is really "falling into water and
     * about to be respawned", not "driving through the shallows". A kart drifting on a submerged
     * surface therefore clears the flag every step it touches the ground and never reaches the 0.5 s
     * blend. Nothing here is wrong; the underwater section of a track that would exercise it does not
     * exist on the bench, and when one lands (T19's volume set) the gate wants its own `submerged`
     * flag rather than the recovery one.
     */
    const KART_UNDERWATER_ROLL_DEGREES: number;
    /** The underwater drift's outward body offset, units. Outward is the same direction the drift slides. */
    const KART_UNDERWATER_OFFSET: number;
    /** The underwater drift's body lift, units. */
    const KART_UNDERWATER_LIFT: number;
    /** Seconds the underwater drift pose takes to reach, and to unwind. */
    const KART_UNDERWATER_BLEND: number;
    /**
     * Every animator trigger Unity's kart declares, verbatim.
     *
     * Carried as names rather than as an enum so a kart rigged in Unity needs no mapping table: the
     * exported `TOOLKIT.AnimationState` sees the same strings its Mecanim controller was authored
     * with. Four of them have events in the port today — `Drift` and `Shake` on drift entry,
     * `AntiGravity` on the edge into a barrel, `StartBoostTilt` when a boost is granted. The other
     * six belong to systems that land later (`Glide1`/`Glide2` with the glider, the four hit triggers
     * with the item system, which is out of scope for this port) and are declared here so the
     * contract is complete and a rigged kart's controller can be wired against it now.
     */
    const KART_ANIMATOR_TRIGGERS: string[];
    /** Everything `selectMaxSpeed` needs, and nothing else — so it can be tested as a table. */
    interface IKartSpeedCapState {
        /** `Player.cs:28`. The sticky collision flag. */
        grounded: boolean;
        /** A boost of any kind is running. */
        boost: boolean;
        /** Star power-up. */
        star: boolean;
        /** Top speed on the ground. */
        desiredMaxSpeed: number;
        /** Top speed while boosting. */
        boostSpeed: number;
    }
    /**
     * The speed cap for a state (`Player.cs:1403-1432`).
     *
     * Unity writes five SEQUENTIAL `if`s, not an if/else chain, so the last one that matches wins and
     * the star case — written last — beats everything. Ported as the same precedence rather than as
     * the same five statements, because a reader can check a precedence order and cannot check five
     * statements whose meaning is their order.
     *
     * The drift cap (`desiredMaxSpeed - 10`, `1562`/`1580`) and the `Dirt` cap (30, `502`) are NOT
     * here: Unity applies them later in the step, from `Steer()` and from the collision handler, and
     * folding them in would change which one wins.
     */
    function selectMaxSpeed(state: IKartSpeedCapState): number;
    /**
     * The vertical clamp on the assigned velocity (`Player.cs:1332-1339`).
     *
     * `velocity = forward · currentspeed`, and **if the nose's `y` is HIGHER than the body's, the
     * body's is kept**. That one asymmetric line is what stops a kart pointing up a ramp from
     * levitating: the heading may take speed away from the vertical but it may never add any. Under
     * anti-gravity the test is skipped entirely and the nose value is taken whole, which is the third
     * of FR-7's three conditionals.
     *
     * A **jump-panel flight** skips it for the same reason and by a separate flag (`1439-1448`). The
     * panel's whole mechanism is a heading that points up and a force that pushes along it, and a
     * clamp that refuses to let the heading add vertical speed would delete the first half. Two flags
     * rather than one "skip" argument, because they are separate mechanics that happen to need the
     * same line switched off — and a track may legitimately put a jump panel inside a barrel.
     *
     * @param noseY   `y` of `forward · currentspeed`.
     * @param bodyY   `y` of the body's current velocity.
     */
    function clampAssignedVerticalVelocity(noseY: number, bodyY: number, antiGravity: boolean, jumpPanel?: boolean): number;
    /** Everything `selectSpeedRotateRate` needs. Kept flat so the table can be tested as a table. */
    interface IKartSteerState {
        /** `Player.cs:18`. Nose-local `z` of the ACTUAL velocity — the band table reads THIS. */
        realCurrentSpeed: number;
        /** In a drift (either hand). */
        drifting: boolean;
        /** Throttle held. Only the reverse band cares. */
        throttleHeld: boolean;
    }
    /**
     * `speed_rotate_rate` — Unity's steering band table (`Player.cs:1596-1613`).
     *
     * **It is a LOCAL, re-initialised to 0 on every call** (`1596`: `float speed_rotate_rate = 0;`).
     * That was worth checking, because if it were a persistent field it would retain the previous
     * band's value while decelerating through the dead band and the dead band would not be a dead
     * band at all. It is local, so `0 ≤ v ≤ 3` genuinely produces no turn whatsoever — a kart at
     * walking pace cannot be steered, and that is deliberate.
     *
     * Written as sequential `if`s in Unity, so later matches win; the order below preserves that.
     */
    function selectSpeedRotateRate(state: IKartSteerState): number;
    /**
     * Yaw applied per SECOND, degrees (`Player.cs:1620`).
     *
     * Unity writes `transform.Rotate(0, rotate_strength · direction · speed_rotate_rate · 0.025, 0)`
     * once per fixed step, and 0.025 degrees per 0.02 s step is **1.25 degrees per second per unit**.
     * Expressed as a rate here so it can be integrated at any frame rate.
     *
     * With `rotate_strength = 25` this reproduces the spec's measured table exactly:
     * 54.7 grip ≥40 · 40.6 grip 10-40 · 15.6 grip 3-10 · 78.8 drift-into · 18.8 drift-against,
     * plus 75.0 in reverse (`rotate_strength = 120`) and 32.8 gliding (`rotate_strength = 15`).
     */
    function computeYawRate(rotateStrength: number, direction: number, speedRotateRate: number): number;
    /**
     * The drift state machine's four states (`Player.cs:1639-1890`).
     *
     * `Hop` is PURELY VISUAL — the kart does not leave the ground and no impulse is applied — so the
     * machine may pass straight through it into `Drift` on the very next frame the hold condition
     * holds. It exists as a state only so the hop animation has something to key off.
     */
    /**
     * Which of Unity's seven boost sources last wrote `Boost_time`.
     *
     * WHY THE SOURCE IS RECORDED AT ALL, since the simulation does not care: **the presentation layer
     * cannot infer it, and it needs it.** Every source funnels through `grantBoost`/`floorBoost` and
     * writes one number, so from outside they are indistinguishable — but Unity fires a DIFFERENT
     * subset of effects at each one, and the subsets do not line up:
     *
     *   source          Boost_time           BoostBurstPS      Mario_Boost_Sounds
     *   rocket start    `274`  = 1           `281`  yes        `278`  yes (a fixed index, not the rota)
     *   boost pad       `507`  = 2           --     NO         `514`  yes
     *   trick landing   `541`  floor 0.9     --     NO         --     NO  (`544` groundLandParticles)
     *   jump panel      `960`  = 2           `967`  yes        `974`  yes
     *   glider exit     `1077` = 2           `1084` yes        `1091` yes
     *   glider trick    `1178` = 0.5         `1188` yes        --     NO  (`1184` trickParticles)
     *   drift payout    `1827`/`1842`/`1856` `1835`/`1850`/`1864` yes   `1830`/`1845`/`1859` yes
     *
     * The port's first attempt inferred a grant from `Boost_time` RISING, which is wrong in both
     * directions: it burst on the boost pad, where Unity does not, and it MISSED a grant whenever a
     * shorter one replaced a longer one — a 0.75 s tier-1 payout landing on a running 2 s panel boost
     * is a FALL, not a rise, and `grantBoost` is an assignment precisely because Unity's is.
     *
     * So the kart says what happened instead of the effects guessing. This enum plus
     * `getBoostGrantCount()` is the whole signal; the POLICY — which sources burst, which speak —
     * stays in the presentation components, where the table above belongs.
     */
    enum EKartBoostSource {
        /** No boost has been granted yet. */
        None = 0,
        /** `Player.cs:274`. The 1-2 s pre-race throttle hold. */
        RocketStart = 1,
        /** `Player.cs:507`. A `Boost` pad on the track. Grants, but does NOT burst. */
        BoostPad = 2,
        /** `Player.cs:541`. The trick landing, and the only FLOOR. Neither bursts nor speaks. */
        TrickLanding = 3,
        /** `Player.cs:960`. */
        JumpPanel = 4,
        /** `Player.cs:1077`. Leaving a `GliderPanel`. */
        GliderExit = 5,
        /** `Player.cs:1178`. The mid-glide trick. Bursts, but is silent. */
        GliderTrick = 6,
        /** `Player.cs:1827`/`1842`/`1856`. The drift payout, by tier. */
        DriftPayout = 7
    }
    enum EKartDriftState {
        /** Not drifting. */
        None = 0,
        /** Drift entered this frame; the visual hop is playing. */
        Hop = 1,
        /** Drifting and charging `Drift_time`. */
        Drift = 2,
        /** Released; the tier payout is running as a boost. */
        Boost = 3
    }
    /**
     * The five FR-5 vehicle profile switches, as a property set.
     *
     * The complete list of what a profile is allowed to change. Anything else about how the kart
     * drives — the pace table, the yaw table, the drift machine, the tier boundaries, the boost
     * economy, the lean — is identical in every profile, which is what makes a profile a *capability*
     * set rather than a handling tune.
     */
    interface IKartVehicleProfile {
        /** Play the `KartDriftHop` lift on drift entry. `false` makes the drift a handbrake turn. */
        hopEnabled: boolean;
        /** React to glider volumes. `false` ignores them and the kart flies gaps ballistically. */
        gliderEnabled: boolean;
        /** React to anti-gravity volumes. */
        antiGravityEnabled: boolean;
        /** Allow the air trick and its landing boost. */
        tricksEnabled: boolean;
        /** React to jump-panel volumes. */
        jumpPanelsEnabled: boolean;
    }
    /** The named presets `StandardKartController.VEHICLE_PROFILES` can be selected by. */
    type KartVehicleProfileName = "kart" | "arcadeCar";
    /**
     * Babylon standard kart controller — Mario Kart style karting on a sphere.
     * @class StandardKartController
     *
     * A direct port of `3DMarioKart/Assets/Scripts/Player.cs` (2764 lines). Every constant below
     * cites the line it came from and the value measured there; a constant without a citation is a
     * constant nobody can check, and this component is nothing but constants.
     *
     * WHAT IT OWNS: the kart's speed scalar, its heading, its orientation on the ground normal, the
     * drift state machine, the boost economy, and the procedural motion of ONE model child.
     *
     * WHAT IT DELEGATES: the physics body and the raycasts to `TOOLKIT.RigidbodyPhysics`; the camera
     * to `PROJECT.StandardKartCamera`; the track's behaviour to the `PROJECT.Kart*` volume
     * components; real animation, where a rigged kart ships clips, to `TOOLKIT.AnimationState`.
     */
    class StandardKartController extends TOOLKIT.ScriptComponent {
        /**
         * Havok collision-filter membership bit given to the chassis sphere: **bit 2**.
         *
         * Havok has no layer names, so Unity's layer indices are ported as raw bits — and bit 2 is
         * Unity's `Ignore Raycast` layer, which is precisely the bit that `mask: 298803` leaves
         * clear. Putting the chassis there means the ground probe excludes the kart for exactly the
         * reason Unity's does: the mask says so. No special case, no `ignoreBody` argument.
         *
         * Measured on the bench, Havok already declines to report a hit for a ray whose origin lies
         * inside a convex shape — `raycastPos` sits at local y = -0.38, well inside the 1.64-unit
         * sphere, and an unfiltered probe from there returns the pad, not the kart. So the mask is a
         * GUARD rather than the thing that makes the probe work today; it starts mattering the
         * moment a second kart is in the scene.
         */
        static readonly CHASSIS_MEMBERSHIP_MASK: number;
        /**
         * The ground probe's `collideWith` mask — Unity's `mask: 298803`, bit for bit.
         *
         * Derived from `rayIncludeLayers` in `awakeKartState` rather than written as the literal, so
         * that changing the readable list changes the mask and the two can never disagree.
         */
        protected rayCollideMask: number;
        /**
         * Top speed on the ground, units/second (`Player.cs:13`, serialized per track).
         *
         * Unity ships 75 as the class default and overrides it per track — 85 on Toad Harbor. This
         * port declares 90, the figure the spec's derived tables and the bench rings are built
         * around. Per-track handling is a PROPERTY, never a literal (D-3, Analysis §E.8).
         */
        desiredMaxSpeed: number;
        /**
         * Top speed while any boost is running, units/second (`Player.cs:11`, serialized per track).
         *
         * Unity ships 90 as the class default; the tracks override it to 110 (MooMoo Meadows) and
         * 115 (Toad Harbor). 120 here, again as a property (D-3).
         */
        boost_speed: number;
        /**
         * Rate `currentspeed` approaches the cap while a boost runs, per second.
         *
         * **DEFAULTS TO THE SOURCE.** Assign `KART_BOOST_ACCEL_RATE` for the recommended feel —
         * `MarioKartRaceMode` does exactly that. See that constant for the measurements.
         */
        boostAccelRate: number;
        /**
         * Charge boundaries for the three payout tiers, seconds — ascending.
         *
         * **DEFAULTS TO THE SOURCE.** Assign `KART_DRIFT_TIERS_TUNED` for the recommended feel. The
         * array is COPIED on assignment from the property bag so two karts cannot share one.
         */
        driftTierTimes: number[];
        /**
         * The steering authority a settled drift ramps up to (`Player.cs:22`, serialized).
         *
         * **A SERIALIZED FIELD, never a literal** (Analysis §E.8). `Player.cs:22` declares it with no
         * initializer, so its value comes entirely from the Inspector — and it is 25 on all five
         * shipped tracks, which is why hardcoding 25 looks correct and is not. The drift ramp at
         * `1674` (`Lerp(rotate_strength, desired_rotate_strength, 3·dt)`) and the accel reset at
         * `1376` both read the field. The one genuine literal `rotate_strength = 25` lives at `2154`
         * and belongs to a different branch entirely — and T48 established that it is also **dead
         * code**: it is the `else` of a `Physics.Raycast(..., 0, mask)` at `2142` whose max distance
         * is zero and which therefore never hits, so the glider's `2144` pin always wins.
         *
         * Yaw per second is `rotate_strength · direction · speed_rotate_rate · 1.25` degrees, so this
         * number scales the whole steering model.
         */
        desired_rotate_strength: number;
        /** Sphere collider radius, units. Read off the `Player` GameObject: `m_Radius: 1.6427898`. */
        sphereRadius: number;
        /** Sphere collider centre in the chassis's local frame: `m_Center: {0, 0.40988, -0.39423}`. */
        sphereCenter: BABYLON.Vector3;
        /** Rigidbody mass, kilograms. `m_Mass: 50`, with `m_Drag: 0` and `m_AngularDrag: 2000`. */
        chassisMass: number;
        /**
         * Contact friction on the chassis sphere. **Ships at 0, which is a deliberate divergence.**
         *
         * Unity's sphere carries `m_Material: {fileID: 0}` — no physic material — and
         * `DynamicsManager.asset` sets `m_DefaultMaterial: {fileID: 0}` too, so PhysX falls back to
         * its BUILT-IN default of 0.6 dynamic / 0.6 static friction and 0 bounciness. It is
         * therefore not literally true that the Unity kart slides on a frictionless ball, and this
         * port does not pretend otherwise.
         *
         * It ships at 0 anyway, for two reasons. First, every gameplay figure the spec derives — the
         * pace curve, the yaw table, the drift radii — comes from the assigned-velocity model
         * (FINDING 0), in which friction can only ever subtract from what was decreed, between the
         * assignment and the read-back. Second, Havok's friction solver and PhysX's are not
         * interchangeable, so transcribing "0.6" would import a number whose meaning does not carry.
         *
         * Set it to 0.6 to run the Unity contact model and compare; it is a property precisely so
         * that comparison stays one line away.
         */
        chassisFriction: number;
        /**
         * Name of the ONE model child every FR-11 motion channel writes.
         *
         * A property rather than a literal because it is the seam T26 swaps: the bench rig builds a
         * node called `KartModel` by hand, and a Unity-exported kart arrives with whatever its
         * artist named the chassis mesh. Nothing else about the component changes between the two.
         */
        modelNodeName: string;
        /**
         * Scene-graph names of the wheel nodes, front-left, front-right, rear-left, rear-right (T26).
         *
         * **THE AUTHORING CONTRACT FOR WHEELS.** `setWheelNodes` is a code path and a Unity-exported
         * kart has no code — its property bag is all it can say. Without these names a loaded kart's
         * wheels were resolved by nothing at all and simply never moved, which is the sort of gap that
         * reads as "the wheels are broken" rather than as "the contract has a hole in it".
         *
         * Resolved under the kart's OWN root, not globally: a scene with a track, an opponent and a
         * red-box fallback all present has more than one node called `WheelFL`.
         */
        wheelNodeNames: string[];
        /** Scene-graph name of the steering wheel, or empty for none. */
        steeringWheelNodeName: string;
        /** Scene-graph names of the driver's arm nodes, in the order `ARM_ANTIGRAVITY_SCALE` applies. */
        armNodeNames: string[];
        /**
         * Local offset of the ground probe origin (`Player.cs:25`, the `raycastPos` child).
         *
         * Measured on the prefab at `(-0.01, -0.38, +0.27)` — just below and slightly ahead of the
         * chassis origin, so the ray leaves from under the nose rather than from the sphere centre.
         */
        raycastOffset: BABYLON.Vector3;
        /**
         * Length of the ground probe, units (`Player.cs:168`, set per state at 247-259 and 569-574).
         *
         * State-dependent at runtime and only ever three cases: **3** while gliding, **2**
         * otherwise, and **6 for 0.6 s then 1** after a glider landing. The 247-259 branch reads as
         * a state table but both of its arms assign 2, so it is a no-op (Analysis §E.6). This field
         * is the "otherwise" value and the runtime writes over it.
         */
        groundRayDist: number;
        /**
         * Rate at which the chassis slerps its orientation onto the ground normal, per second
         * (`Player.cs:2037`).
         *
         * **7.5 is a requirement, not a tuning value**, together with the camera's 3/s and the model
         * child's 8/s. What the three of them set is how far the VIEW LAGS the heading through a
         * corner, not the roll — the visible roll is the camera adopting the track's banking and is
         * rate-independent above about 1/s. See `StandardKartCamera.ts`'s header for the measurements
         * that establish that, including the control which reproduces the effect with the chassis
         * roll frozen. (This comment used to say the gap "IS the visible chassis lean" and that
         * closing it removes the lean entirely; T15 measured both claims and neither holds.)
         *
         * This rate is separately load-bearing for a much more basic reason: it is the ONLY thing
         * that orients the kart at all (FINDING 0). The `if(antiGravity)` alignment at `1 · dt` on
         * line 2034 is dead code — it sits inside the `if(!antiGravity)` block and can never run
         * (Analysis §E.5), so 7.5/s is the only alignment rate in the game, anti-gravity included
         * (2062-2064 uses it too).
         */
        groundAlignRate: number;
        /** Rate at which the model child's drift yaw approaches its target, per second (`1561`/`1579`/`1626`). */
        modelYawRate: number;
        /** Model child yaw while drifting, degrees. `+20` drifting right, `−20` drifting left (`1558-1592`). */
        driftYawAngle: number;
        /**
         * Delay between drift entry and the outward lateral force starting, seconds (**P-1**).
         *
         * 0.283 s — the `is_drifting` animation event at t = 0.28333 s on `KartDriftHop.anim`,
         * handled in `UtilityFunctions.cs:109`. Shipped as a timer rather than an animation event so
         * that `hopEnabled = false` changes nothing but the hop's visual lift (FR-5). Set to 0 to
         * make the drift bite the instant it is entered.
         */
        driftLatchDelay: number;
        /**
         * Minimum steer magnitude, 0-1, that will latch a drift direction on entry (**D-4**).
         *
         * Unity's `1625` has no zero case, so a neutral hop latches "left" by falling through. This
         * port requires a HELD steer input above this threshold instead. 0.15 sits above a resting
         * gamepad stick and below any deliberate input.
         */
        driftLatchThreshold: number;
        /**
         * Name of the preset to apply in `awake()`, or `null` to use the individual switches as they
         * stand.
         *
         * The Unity-authoring entry point: a prefab exported with `vehicleProfile: "arcadeCar"` gets
         * the whole property set without listing five booleans. Applied BEFORE the individual switch
         * properties are read, so an explicit `hopEnabled` on the same prefab still wins — a preset
         * is a starting point, not a lock.
         */
        vehicleProfile: KartVehicleProfileName | null;
        /** Play the `KartDriftHop` lift on drift entry. `false` turns the drift into a handbrake turn. */
        hopEnabled: boolean;
        /** React to glider volumes. `false` ignores them entirely and the kart flies gaps ballistically. */
        gliderEnabled: boolean;
        /**
         * Fly the ARCADE glider — Mario Kart's rules — rather than the Unity project's. **Default on.**
         *
         * NOT A CAPABILITY SWITCH AND DELIBERATELY NOT PART OF `IKartVehicleProfile`. The profile is a
         * list of what a vehicle CAN do (`gliderEnabled` belongs there and is the switch that decides
         * whether this kart has a glider at all); this is which physics the glider it has obeys. A
         * profile stays a capability set, as its own docblock promises.
         *
         * `true` — the vertical approaches a pitch-chosen sink rate and the kart always comes down.
         * `false` — the source's damp-and-lift model, which can be flown level indefinitely.
         *
         * See the ARCADE GLIDER block above the constants for the whole argument.
         */
        enableGliderPhysics: boolean;
        /**
         * ARCADE. Shallowest descent angle a glide may be flown at, degrees.
         *
         * The volume's own `glideAngleX` wins when it is STEEPER than this; this is the floor a level
         * or unstated trim is promoted to. Ignored when `enableGliderPhysics` is false.
         */
        gliderSlopeMin: number;
        /**
         * ARCADE. Hard floor on the descent angle, degrees — what the nose-up control delivers.
         *
         * Raising it makes a held climb come down faster; dropping it to 0 restores the hover and
         * defeats the point of the flag.
         */
        gliderSlopeFloor: number;
        /** ARCADE. Rate the vertical approaches its slope's descent, per second. */
        gliderSinkRate: number;
        /** React to anti-gravity volumes. */
        antiGravityEnabled: boolean;
        /** Allow the air trick and its landing boost. */
        tricksEnabled: boolean;
        /** React to jump-panel volumes. */
        jumpPanelsEnabled: boolean;
        /**
         * Extra roll added to the model child while cornering, degrees (**D-5**).
         *
         * **Ships at 0 and should stay there.** There is no roll term in the Unity project — no clip
         * fires on land — and the port needs none: the visible roll is the CAMERA adopting the
         * track's banking, so the horizon tips by the bank angle while the kart sits upright in
         * frame. Measured on the bench's 18-degree sweeper: horizon 18.4 degrees, kart 0.4 degrees
         * off vertical in frame.
         *
         * If the tilt reads as too weak, work this checklist before touching this number:
         *   1. **Is the surface actually banked?** On flat ground the mechanism produces exactly
         *      zero roll — asserted at `< 1e-9` — so a flat bench cannot show any.
         *   2. **Is the camera slerping to the chassis's FULL orientation, roll included?** A rig
         *      that tracked only the kart's yaw would leave the horizon level and delete the effect
         *      entirely. This is the one that actually breaks it.
         *   3. **Is the chassis alignment running at all?** It is the only thing that rolls the kart
         *      onto the banking in the first place (FINDING 0).
         *
         * Raising this number hides whichever of those three is broken, and makes the kart lean on
         * flat ground, which is wrong in a way that is hard to un-see.
         *
         * *(The second item used to read "has the camera rate been tidied from 3/s toward 7.5/s" —
         * T15 measured that and it costs about 60 percent of a diagnostic that is not the on-screen
         * tilt, while leaving the visible roll essentially unchanged. It is the wrong thing to
         * check first.)*
         */
        bodyLeanAngle: number;
        /**
         * Rate the exit payload realigns the kart's PITCH at, per second (`Player.cs:1289`).
         *
         * Deliberately 2.5x slower than the other two axes. Coming off a barrel the pitch is the axis
         * carrying most of the error — the kart can be pointing at the sky — and snapping it back is
         * what reads as the camera being yanked. Yaw and roll are usually close to right already, so
         * they are allowed to settle quickly while the pitch takes its time.
         */
        antiGravityExitRateX: number;
        /** Rate the exit payload realigns YAW and ROLL at, per second (`Player.cs:1293`/`1297`). */
        antiGravityExitRateYZ: number;
        /**
         * Any non-zero steer input turns the kart, not just the literal arrow keys (`Player.cs:1619`).
         *
         * Unity gates the turn on `Input.GetKey(LeftArrow) || Input.GetKey(RightArrow)` while reading
         * the magnitude from the axis, so an analogue stick moves the axis but never opens the gate.
         */
        correctArrowKeyGate: boolean;
        /**
         * Neutral steer yields `direction = 0` (`Player.cs:1625`).
         *
         * Unity's if/else has no zero case, so releasing the stick leaves `direction` at its last
         * value and the kart keeps turning.
         */
        correctNeutralSteer: boolean;
        /** Tier 1 spark colour, blue. Arms with the first payout band. */
        sparkTier1Color: string;
        /** Tier 2 spark colour, orange. Arms at `Drift_time` 4.0 s (`Player.cs:1755`). */
        sparkTier2Color: string;
        /** Tier 3 spark colour, magenta. Arms at `Drift_time` 7.0 s (`Player.cs:1776`). */
        sparkTier3Color: string;
        /**
         * The layers the ground probe is allowed to hit, as an explicit INCLUDE list.
         *
         * Unity ships the probe with `LayerMask mask` serialized to **298803**, whose set bits are
         * 0, 1, 4, 5, 8, 9, 10, 11, 15 and 18. Read against `ProjectSettings/TagManager.asset` those
         * are exactly the ten names below. Shipping the list rather than the integer is deliberate:
         * a bare 298803 is unreadable, unreviewable, and silently wrong the moment a track is
         * authored with a different layer order.
         *
         * What it EXCLUDES matters as much as what it includes — `Path`, `Checkpoints`,
         * `PanelsAndTriggers`, `Opponent` and every item layer are absent, which is why the kart
         * never mistakes a trigger volume or another kart for ground.
         */
        rayIncludeLayers: string[];
        /**
         * The project's layer table, in index order, from `ProjectSettings/TagManager.asset`.
         *
         * Havok filters on raw bits, so this is what turns `rayIncludeLayers` back into a number.
         * The empty strings are Unity's reserved-but-unnamed slots at 3, 6 and 7 and must stay: they
         * are what keeps every index after them correct.
         */
        static readonly UNITY_LAYERS: string[];
        /** **Kart** — everything on. The Mario Kart profile, and the component's own defaults. */
        static readonly KART_PROFILE: Readonly<IKartVehicleProfile>;
        /**
         * **Arcade car** — a full-size car that still drifts like a kart.
         *
         * `hopEnabled: false` turns the drift into a handbrake turn purely by not playing an
         * animation: the latch, `rotate_strength = 5`, the one-third-second ramp, the 20 degree model
         * yaw, the outward lateral push (still at `driftLatchDelay`, **P-1**), the tiers and the
         * boost payout are all untouched. `gliderEnabled` and `tricksEnabled` go off because a car
         * has no glider and does not somersault.
         *
         * **Anti-gravity and jump panels stay ON.** A Crazy Taxi style track may still want a ramp
         * and a wall-ride, and neither mechanism assumes a kart.
         */
        static readonly ARCADE_CAR_PROFILE: Readonly<IKartVehicleProfile>;
        /** The named presets, by name. Lets a bench or a race manager select one from a string. */
        static readonly VEHICLE_PROFILES: Readonly<Record<KartVehicleProfileName, Readonly<IKartVehicleProfile>>>;
        /**
         * Which trigger-volume tags each profile switch is allowed to suppress.
         *
         * This table IS the "exactly its own mechanism and nothing else" rule, written down once and
         * consulted by `onVolumeEnter`/`onVolumeExit`, rather than five scattered `if` statements that
         * can each drift. A tag absent from every list is never gated by a profile — `Ground`,
         * `Dirt`, `Water`, `OutOfBounds`, `Boost` and `CancelDownForce` are surface and recovery
         * behaviour, not vehicle capability, and a car ignores none of them.
         */
        private static readonly PROFILE_GATED_TAGS;
        /** `Player.cs:16`. The decreed scalar speed, before it becomes a velocity. */
        protected currentspeed: number;
        /** `Player.cs:18`. Nose-local `z` of the ACTUAL body velocity — every gameplay threshold reads this. */
        protected REALCURRENTSPEED: number;
        /** `Player.cs:23`. Current steering authority; ramps 5 → `desired_rotate_strength` on drift entry. */
        protected rotate_strength: number;
        /** `Player.cs:37`. Charge accumulated in the current drift, seconds. */
        protected Drift_time: number;
        /** `Player.cs:39`. Remaining boost, seconds. Every boost source simply writes this. */
        protected Boost_time: number;
        /** Which way the current drift is latched: `-1` left, `+1` right, `0` none (`Player.cs:31`). */
        protected drift_direction: number;
        /** `Player.cs:33`. Drifting right. */
        protected drift_right: boolean;
        /** `Player.cs:34`. Drifting left. */
        protected drift_left: boolean;
        /**
         * The `drifting` sub-flag that gates the outward lateral force (**P-1**).
         *
         * **Never assigned anywhere in `Player.cs`.** It is set by an animation event named
         * `is_drifting` at t = 0.28333 s on `KartDriftHop.anim`, handled in
         * `UtilityFunctions.cs:109`. Since the 20 u/s push at `1567`/`1584` is gated on it, that
         * delay is load-bearing feel and not a detail — a drift does not bite the instant it is
         * entered, it bites a third of a second later, and that gap is what the hop animation is
         * covering.
         *
         * Here it is a TIMER (`driftLatchTimer` against `driftLatchDelay`) rather than an animation
         * event, so that `hopEnabled = false` changes nothing but the hop's visual lift and FR-5's
         * "identical trace" acceptance can hold. This is the one place the port deliberately re-homes
         * a mechanism instead of transcribing it.
         */
        protected drifting: boolean;
        /**
         * `Player.cs:30`. The steering term, and it carries MAGNITUDE, not just a sign.
         *
         * ±1.0 gripping, **±2.1** with the stick into a drift, **±0.5** countering one. That
         * asymmetry — a 4.2× ratio — is the whole controllability story of the drift, and it is why
         * `direction` is a float here and not an enum.
         */
        protected direction: number;
        /** The drift state machine's current state. */
        protected driftState: EKartDriftState;
        /** `Player.cs:28`. A COLLISION flag, not the raycast — set on `Ground`/`AntiGravity` contact. */
        protected grounded: boolean;
        /** `Player.cs:170`. Anti-gravity is active. */
        protected antiGravity: boolean;
        /** Entry volumes the kart is currently inside. Non-empty re-asserts the flag every step. */
        protected antiGravityVolumes: BABYLON.TransformNode[];
        /** The active volume's `rotAmountX`, degrees — read by the camera, never applied to the kart. */
        protected antiGravityRotAmountX: number;
        /** The active volume's `rotAmountZ`, degrees. */
        protected antiGravityRotAmountZ: number;
        /**
         * The active volume asked the camera to rotate — Unity's `Camerafollow.rotateCamAntiGravity`.
         *
         * **A SECOND, NARROWER SIGNAL THAN `antiGravity`, AND THE DIFFERENCE IS REAL.** `antiGravity`
         * means the kart is inverted. This means the kart is inside a volume whose
         * `CameraRotateAntigravity.rotateCam` is set (`Player.cs:1038`/`:1043`, cleared at `:1056`).
         * A track can author an anti-gravity stretch that does NOT want the camera leaned, and Unity
         * gives that stretch the ordinary flat-ground framing.
         *
         * Read by `StandardKartCamera` through the duck-typed target interface, never applied to the
         * kart. Like `antiGravityRotAmountX`, this is pure telemetry: it changes the VIEW.
         */
        protected antiGravityRotateCam: boolean;
        /** An `AntiGravityExitRotate` payload is running (`Player.cs:1288-1298`). */
        protected exitRotateActive: boolean;
        /** Which Euler axes the exit payload steers. Unity's `rotateX`/`rotateY`/`rotateZ` booleans. */
        protected exitRotateX: boolean;
        protected exitRotateY: boolean;
        protected exitRotateZ: boolean;
        /** The exit payload's `newRotation`, Euler degrees. Only the enabled axes are read. */
        protected exitRotateTarget: BABYLON.Vector3;
        /** Scratch for the exit realignment, so a per-frame slerp allocates nothing. */
        private exitEuler;
        private exitQuaternion;
        /** Scratch for the jump-panel forced rotation, so a per-frame compose allocates nothing. */
        private jumpRotation;
        /** Scratch for the glider's live yaw read, so a per-frame decompose allocates nothing. */
        private gliderEuler;
        /** `Player.cs` `GLIDER_FLY`. The glider is open. */
        protected GLIDER_FLY: boolean;
        /** Latest accepted ground normal, world space. Identity-up until the first probe lands. */
        protected groundNormal: BABYLON.Vector3;
        /** Yaw applied this frame, degrees/second. Reported to the bench HUD. */
        protected yawRate: number;
        /** Angle between the velocity and the nose, degrees. The drift's outward slip. */
        protected slipAngle: number;
        /** Throttle, -1 (reverse) to +1 (accelerate). */
        protected inputThrottle: number;
        /** Steering, -1 (left) to +1 (right). */
        protected inputSteering: number;
        /** Drift button held. */
        protected inputDrifting: boolean;
        /** Trick button pressed this frame. */
        protected inputTrick: boolean;
        /** Seconds into the trick's upward push, or `-1` when no trick is running. */
        protected trickTime: number;
        /** A `TrickCollider` has been touched, so a trick is allowed. Cleared on landing. */
        protected trickArmed: boolean;
        /** A trick was performed this flight and its landing still owes the 0.9 s boost floor. */
        protected trickPerformed: boolean;
        /** Edge-detect for the trick button: a trick fires on the PRESS, not on the hold. */
        protected trickPressed: boolean;
        /** Set each step by `move()`: does a vertical push survive into the next step? See its note there. */
        protected verticalAccumulates: boolean;
        /**
         * Glider pitch: `+1` nose up, `-1` nose down, 0 neutral. Unity's `UpArrow` / `DownArrow`.
         *
         * A CHANNEL OF ITS OWN, and deliberately not folded into the throttle. In `Player.cs` the
         * arrows are independent of `Space`/`S`: `2115-2126` pitch the glider with them while
         * `1349-1356` picks the vertical damping from the same channel. Reading reverse as "dive"
         * would make holding `S` mid-glide fall faster, which is not a control the game has.
         *
         * CORRECTED AT T22: this used to say the 0.45 damp goes with `DownArrow`, i.e. with the DIVE.
         * It goes with the CLIMB — `× 0.45` keeps forty-five per cent of the vertical and `× 0.75`
         * keeps seventy-five, so 0.45 is the harder damp, and it is the climb that has to be paid for.
         * See the branch in `move()`.
         */
        protected inputPitch: number;
        /** The chassis body, cached in `initKartState`. Null until then, and null in a headless test. */
        protected chassisBody: BABYLON.PhysicsBody;
        /** The `raycastPos` child the ground probe fires from. Falls back to the chassis origin. */
        protected raycastNode: BABYLON.TransformNode;
        /** `Player.cs:1439`. On a jump-panel flight — suppresses ground alignment entirely. */
        protected JUMP_PANEL: boolean;
        /**
         * The live launch force, lerping from the panel's `upforce` toward its `downforce` at 2.5/s.
         *
         * **NEGATIVE IS UP.** It is applied along the kart's LOCAL DOWN (`AddRelativeForce(down *
         * upForce * dt, Acceleration)`), so the panel's -250000 default is an upward shove and the
         * +200000 it decays toward is a downward pull. Neither sign is a mistake to fix.
         *
         * By FINDING 1 the effective acceleration is `-upForce * 0.02` u/s2 along local UP: 5000 u/s2
         * at launch, crossing zero at about 0.36 s and settling at 4000 u/s2 downward. Those look
         * enormous next to the 100 u/s2 of ordinary gravity, and they are — but the velocity is
         * REASSIGNED every step (FINDING 0), so a step's force contributes `a * dt` and is then thrown
         * away rather than accumulating. The kart leaves at about 100 u/s vertically, not at 700.
         */
        protected upForce: number;
        /** What `upForce` decays toward, from the panel's `downforce`. Positive: it pulls the arc down. */
        protected downForce: number;
        /** Seconds left on a `RotatePlayerJumpPanel` volume's forced rotation. */
        protected jumpPanelRotateTime: number;
        /**
         * The ABSOLUTE attitude the volume is turning the kart towards.
         *
         * **This used to be a pair of RATES, and that was the port's largest behavioural divergence.**
         * `RotatePlayerJumpPanel.cs` lerps the kart towards
         * `Quaternion.Euler(volume.eulerAngles.x, rotateY, rotateZ)` — a fixed WORLD attitude. The port
         * read `rotateY` as "degrees of yaw to add", so a volume authored `rotateY: 90` aimed the kart
         * at world-yaw 90 in Unity and merely added 90 to its current heading here. The two agree only
         * when the kart happens to enter at yaw 0, which on a real track is never.
         */
        protected jumpPanelRotateTarget: BABYLON.Quaternion;
        /** `Player.cs` `glidingTime`. Seconds since the glider opened; the 3 s mark changes the probe. */
        protected glidingTime: number;
        /** The volume's `glideAngleX` — pitch trim; every pitch target is stated relative to it. */
        protected glideAngleX: number;
        /** The volume's `glideAngle` — the roll the glider settles on with the stick centred. */
        protected glideAngleZ: number;
        /** Seconds until the canopy opens on the trick variant, or `-1`. */
        protected gliderOpenDelay: number;
        /** This deploy is the trick variant (entered above `GLIDER_TRICK_SPEED`). */
        protected gliderTrick: boolean;
        /** Seconds until the trick variant's 0.5 s boost, or `-1`. Armed when the canopy opens. */
        protected gliderTrickPayout: number;
        /** The glider's current pitch, degrees. Nose-down positive, as Unity has it. */
        protected gliderPitch: number;
        /**
         * ARCADE. The glide SLOPE the kart is descending on, degrees. Nose-down positive.
         *
         * A SECOND ANGLE, AND IT IS NOT A DUPLICATE OF `gliderPitch`. The two share a target and a
         * rate but not a floor: the attitude may point level or up, because that is what the player
         * asked for and what the model on screen must show, while the slope may not, because a glider
         * that stops descending is the defect this whole flag exists to remove. Reading the ATTITUDE
         * and flooring it — which is what this field replaced — floors it during the 1.5/s ramp-in
         * too, and on a 19:1 glide the unit of height that costs is 19 units of range. It put the
         * bench's slow crossing 17 units short of an apron it had been clearing.
         *
         * So the floor goes on the TARGET and this eases toward it at the attitude's own rate, from
         * the same 0 the attitude starts at. Where the floor does not bind the two angles are equal to
         * the last decimal and the arcade descent IS the source's; where it binds they part company,
         * which is exactly and only the held nose-up case.
         */
        protected gliderSlope: number;
        /**
         * The scene's vertical gravity, u/s². Read once at `awake`, defaulted to Unity's own -2.
         *
         * ONLY THE ARCADE GLIDER USES IT, and only to cancel the leak an approach lets gravity make
         * through it — see `gliderVerticalFor`. Every other vertical term in this component either
         * accumulates gravity deliberately or is assigned over the top of it, so none of them needs to
         * know the figure and none of them reads this.
         *
         * DEFAULTED RATHER THAN REQUIRED. -2 is `ProjectSettings/DynamicsManager.asset` in the Unity
         * project every constant in this file came from, so a scene that has not started its physics
         * engine when this component wakes gets the number the rest of the port already assumes rather
         * than a zero that would quietly reinstate the leak.
         */
        protected sceneGravityY: number;
        /** The glider's current roll, degrees. */
        protected gliderRoll: number;
        /** The smoothed steer input the roll target is built from — the first of the two lags. */
        protected gliderRollVelocity: number;
        /** Seconds left on a `GliderPanel` exit impulse, or 0. */
        protected gliderImpulseTime: number;
        /** Did the ground probe land this step? The honest airborne test — see `grounded`'s note. */
        protected probeGrounded: boolean;
        /** Did the separate length-1 drift-entry probe land? `Player.cs:1645`. */
        protected driftEntryGrounded: boolean;
        /** Distance from `raycastPos` to the accepted ground hit, units. `-1` when the probe missed. */
        protected groundDistance: number;
        /** The live value of the state-dependent probe length. `groundRayDist` is only its default. */
        protected activeGroundRayDist: number;
        /** Seconds left on the glider-landing probe override (`6` for 0.6 s, then `1`). */
        protected gliderLandingTimer: number;
        /** Set once a glider landing has run, so the probe stays at 1 rather than reverting to 2. */
        protected gliderLanded: boolean;
        /** `Player.cs:14`. The live speed cap, rewritten several times per step by Unity's order. */
        protected max_speed: number;
        /** `Player.cs:8`. A boost of any kind is running. */
        protected Boost: boolean;
        /** Star power-up. Out of scope for this port; kept because five speed-cap branches read it. */
        protected StarPowerUp: boolean;
        /** `Player.cs:982`, `1273-1278`. Inside a `CancelDownForce` volume. */
        protected cancelAddforceDown: boolean;
        /** The `AirForce` volume the kart is currently inside, or `null`. */
        protected airForceVolume: BABYLON.TransformNode;
        /** Scratch for the air force direction, so a per-frame push allocates nothing. */
        private airForceDirection;
        /** The wheels this component poses, front-left, front-right, rear-left, rear-right. */
        protected wheelNodes: BABYLON.TransformNode[];
        /** Their rest positions, captured once so the anti-gravity spread cannot compound. */
        protected wheelRestPositions: BABYLON.Vector3[];
        /** Their rest ROTATIONS, captured once so the pose composes onto them instead of erasing them. */
        protected wheelRestRotations: BABYLON.Quaternion[];
        /**
         * `Player.cs:184` — `public Vector3[] antiGravityTirePositions = new Vector3[4]`.
         *
         * **THE ART DECISION THE PORT USED TO SYNTHESISE.** Unity does not compute where an
         * anti-gravity wheel goes; the table says, per model, and the four entries in Mario Circuit are
         * `(-0.58, -0.06, 0.715138)`, `(-0.651, 0.075, -0.37)`, `(0.58, -0.065, 0.72)`,
         * `(0.65, 0.07, -0.37)`. This port scaled each wheel's own rest offset by
         * `WHEEL_ANTIGRAVITY_SPREAD` instead — the same motion for any rig, at the cost of only ever
         * moving a wheel SIDEWAYS and of the distance following track width rather than the artist.
         * Note the real table moves wheels in y and z as well, which a sideways scale cannot express.
         *
         * Empty means "no table authored", and the synthesised spread stands — which is what the bench's
         * red box and every rig without this array will use. Populated, it wins.
         */
        protected antiGravityTirePositions: BABYLON.Vector3[];
        /**
         * `antiGravityTirePositions` re-ordered into THIS component's wheel order, or empty.
         *
         * **MATCHED BY GEOMETRY, NOT BY INDEX, AND THAT IS DELIBERATE.** This component orders wheels
         * front-left, front-right, rear-left, rear-right; Unity's array is ordered by whatever its
         * `tires` Transform array happened to be, and in Mario Circuit that is front-left, REAR-left,
         * front-right, rear-right — indices 1 and 2 swapped relative to ours. Trusting the index would
         * put the rear-left target on the front-right wheel on that track, and would break differently
         * on the next one. Signs of x and z are unambiguous and survive any authoring order.
         */
        protected antiGravityTireTargets: BABYLON.Vector3[];
        /**
         * `Player.cs:176` — `public Color antiGravityTireColor`. Mario Circuit: `#469CFA`.
         *
         * Read and exposed, not yet applied: nothing in this port tints a wheel material today. It is
         * carried so that an exported kart's authored value is not silently dropped on the floor, and
         * so the VFX work has it waiting rather than having to go back to the scene files for it.
         */
        antiGravityTireColor: string;
        /** The steering wheel's rest rotation, for the same reason. */
        protected steeringWheelRest: BABYLON.Quaternion;
        /** The driver's arms, which scale under anti-gravity. Empty on any rig without a driver. */
        protected armNodes: BABYLON.TransformNode[];
        /** Their rest scales, captured once. */
        protected armRestScales: BABYLON.Vector3[];
        /** The steering wheel, or `null`. */
        protected steeringWheelNode: BABYLON.TransformNode;
        /** Current front-wheel steer angle, degrees. */
        protected wheelSteer: number;
        /** Accumulated wheel roll, radians. */
        protected wheelSpin: number;
        /** How far into the anti-gravity wheel pose, 0 to 1. */
        protected wheelAntiGravity: number;
        /** Scratch for the wheel pose composition, so a per-frame write allocates nothing. */
        private wheelSpinRotation;
        private wheelSteerRotation;
        private wheelPoseRotation;
        private wheelCompose;
        /** `Player.cs:1503`/`1513`. Spun out by a banana or a shell. */
        protected spunOut: boolean;
        /**
         * On a `Dirt` surface (`Player.cs:502`). **Telemetry only** — the cap it implies is produced
         * by `grounded = false`, not by this flag. See the note in `move()`.
         */
        protected onDirt: boolean;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected step(): void;
        protected fixed(): void;
        protected destroy(): void;
        /** Reads the serialized property bag. Nothing that touches the scene belongs here. */
        protected awakeKartState(): void;
        /**
         * Configures the chassis to Unity's exact rigidbody spec (FINDING 0).
         *
         * Runs in `start()`, one frame after `awake()`, so a `TOOLKIT.RigidbodyPhysics` sitting at
         * execution order -1 has already had its own `awake()` and `transform.physicsBody` is there
         * to configure. On a bench rig there is no exported collider metadata at all, so the body is
         * built here from the measured numbers — which is also what makes the component asset-
         * agnostic (T26): a Unity-exported kart arrives with the body already built and this method
         * only tightens it.
         */
        protected initKartState(): void;
        /**
         * Wires `grounded` — which is a COLLISION flag and not the raycast (`Player.cs:487-504`).
         *
         * ---------------------------------------------------------------------------------------
         * A NINTH CORRECTION, FOUND WHILE PORTING THIS: `grounded` IS STICKY IN UNITY.
         *
         * It is assigned in exactly three places — `491` true on `Ground`/`AntiGravity`, `503` false
         * on `Dirt`, `508` true on `Boost` — all inside `OnCollisionStay`. **There is no
         * `OnCollisionExit` and nothing clears it when the kart leaves the ground.** The same is true
         * of `ComputerDriver.cs:1002-1012`, so it is the game's model rather than an oversight in one
         * file. Consequences, and they are not small:
         *
         *   * The "airborne" speed cap of 30 at `1403` is really the ON-DIRT cap. In the air,
         *     `grounded` is still true and the grounded cap applies.
         *   * A drift is NOT ended by leaving the ground, because the hold test at `1672` reads this
         *     same sticky flag.
         *
         * Ported bug-for-bug, because the numbers the spec measured were measured against this
         * behaviour and "fixing" it would silently change every one of them. `probeGrounded` — the
         * raycast — is the honest airborne test and is what the bench HUD and `isAirborne()` read.
         * ---------------------------------------------------------------------------------------
         */
        private attachCollisionEvents;
        /**
         * Entering a tagged trigger volume. The `PROJECT.Kart*` components arrive here in T19.
         *
         * The profile gate runs FIRST and unconditionally, so every mechanism added by a later phase
         * inherits FR-5 by construction rather than by remembering to ask. A gated-off volume is not
         * merely ignored on the way in — it never reaches any handler, so it cannot leave a flag set.
         */
        protected onVolumeEnter(other: BABYLON.TransformNode): void;
        /** Leaving a tagged trigger volume. Gated by the same profile table as the way in. */
        protected onVolumeExit(other: BABYLON.TransformNode): void;
        /**
         * Is this volume tag's mechanism enabled by the current profile? (FR-5)
         *
         * Everything not named in `PROFILE_GATED_TAGS` is enabled — a profile suppresses vehicle
         * CAPABILITIES, never surface or recovery behaviour, so `Ground`, `Dirt`, `Water`,
         * `OutOfBounds`, `Boost` and `CancelDownForce` are always live. Public because the bench and
         * the tests assert the gate directly rather than inferring it from a trajectory.
         */
        isVolumeEnabled(tag: string): boolean;
        /**
         * Writes one of the two named profiles, or an explicit property set, onto the LIVE component.
         *
         * Only the five switches are touched — never a speed, a rate or a state — so calling this
         * mid-run changes what the kart is CAPABLE of and nothing about what it is currently doing.
         * That is what lets the bench A/B a profile on a run already in progress, and what lets FR-5's
         * "identical trace" acceptance be a real assertion instead of two separate runs compared by
         * eye. A partial property set leaves the unnamed switches alone.
         */
        applyVehicleProfile(profile: KartVehicleProfileName | Partial<IKartVehicleProfile>): void;
        /** The five switches as they stand right now. A fresh object, so a caller cannot alias the kart. */
        getVehicleProfile(): IKartVehicleProfile;
        /**
         * The name of the preset the switches currently match, or `null` for a custom set.
         *
         * `null` is a real and expected answer: the bench toggles are free to produce a combination
         * neither preset names, and reporting the nearest preset instead would be a lie the HUD then
         * draws as a selected radio button.
         */
        getVehicleProfileName(): KartVehicleProfileName | null;
        /**
         * `Player.cs:1280-1287`. An `AntiGravity` volume turns the flag on and keeps it on.
         *
         * The camera payload rides along: `rotAmountX`/`rotAmountZ` are the VOLUME's, not the kart's,
         * and they are read straight back out by `StandardKartCamera` through the duck-typed target
         * interface. The kart itself never applies them to anything — they tilt the VIEW, which is how
         * a track author leans the camera into a barrel without touching how the kart drives.
         */
        protected enterAntiGravityVolume(volume: BABYLON.TransformNode): void;
        /**
         * `Player.cs:1288-1299`. An `AntiGravityFalse` volume clears the flag and arms the realignment.
         *
         * **The realignment is the difference between an exit and a crash.** Clearing the flag alone
         * hands a kart that may be pointing at the ceiling back to a ground probe that now rejects any
         * normal below 0.5, so nothing realigns it and it falls in whatever attitude it had. The
         * payload's job is to steer it back to a stated world orientation over the second or so the
         * exit ramp lasts — per axis, because a track usually wants to fix the pitch and the roll while
         * leaving the kart's yaw alone so the driver keeps the heading they chose.
         */
        protected exitAntiGravity(volume: BABYLON.TransformNode): void;
        /**
         * Per step: re-assert the flag while inside an entry volume, then run any exit realignment.
         *
         * Runs AFTER `alignToGroundNormal` in `stepKartState`, and that order is deliberate. The two
         * write the same quaternion, and on the way out of a barrel the ground probe is usually
         * rejecting its hit anyway — the flag is off, so the `normal.y > 0.5` filter is back and the
         * wall's normal is sideways — but where they do overlap, on the exit ramp itself, the payload
         * must be the one that wins. It is the thing that knows where the kart is supposed to end up.
         */
        protected tickAntiGravity(dt: number): void;
        /**
         * `Player.cs:1288-1298`. Approaches the enabled Euler axes toward the payload's target.
         *
         * PER AXIS, AND AT TWO DIFFERENT RATES — 1/s for pitch, 3/s for yaw and roll. Unity writes
         * three separate `Quaternion.Lerp` calls against three separate single-axis targets; composing
         * them as one Euler triple with a per-axis rate is the same motion and does not cost three
         * quaternion products a step.
         *
         * The angles are wrapped into (-pi, pi] before the approach so a kart at 179 degrees heading
         * for -179 turns two degrees the short way rather than 358 the long way. That is the same
         * degree-space trap `StandardKartCamera`'s header records for `Utilities.SmoothDampAngle`,
         * surfacing in a second place: it applies to anything that interpolates an angle.
         */
        protected applyAntiGravityExitRotation(dt: number): void;
        /** The value of `field` on the first script component of `volume` that carries one. */
        private readVolumeField;
        /**
         * Does this volume carry a `RotatePlayerJumpPanel` payload?
         *
         * **Duck-typed on the FIELD TYPES, and that is load-bearing rather than lazy.** Two different
         * Unity components spell fields `rotateY` / `rotateZ`:
         *
         *   * `RotatePlayerJumpPanel` — `public float rotateY; public float rotateZ;`
         *   * `AntiGravityExitRotate` — `public bool rotateX; rotateY; rotateZ;`
         *
         * A name-only test would fire the jump-panel rotation on every anti-gravity EXIT volume, which
         * is a corkscrew the track never asked for at the exact moment the kart is being realigned.
         * Requiring `number` separates them with no tag and no class reference — which keeps this
         * component free of any dependency on the volume classes, per FR-0's split.
         */
        private hasJumpPanelRotatePayload;
        /**
         * Reads a serialized `Vector3[]` — Unity writes them as plain `{x, y, z}` objects.
         *
         * Returns an empty array for anything missing or malformed rather than throwing or padding,
         * because "no table authored" is the normal case for every rig that is not the Unity kart and
         * the caller treats empty as "use the synthesised pose".
         */
        private readVectorArray;
        /**
         * Puts `antiGravityTirePositions` into this component's wheel order, by GEOMETRY.
         *
         * Each authored position is claimed by the wheel whose REST offset shares its sign in x (left
         * or right) and z (front or rear). That is order-independent, which the index is not: Mario
         * Circuit authors front-left, rear-left, front-right, rear-right while this component orders
         * front-left, front-right, rear-left, rear-right, so a straight index copy puts the rear-left
         * target on the front-right wheel.
         *
         * Anything ambiguous — a wheel with no rest, two candidates, none — abandons the whole table
         * and leaves the synthesised spread in charge. A HALF-applied table is the one outcome worse
         * than not applying it, because three wheels would swing to art positions and the fourth would
         * scale sideways, and nothing would look obviously broken enough to investigate.
         */
        private buildAntiGravityTireTargets;
        /**
         * Reads a colour that Unity serialized, under Unity's OWN field name, falling back to this
         * port's Babylon-side name and finally to a hardcoded default.
         *
         * **A Unity `Color` exports as `{r, g, b, a}` with each channel a float in 0..1**, while this
         * component stores spark colours as CSS hex strings so they can go straight into a particle
         * material or a HUD swatch. So this is a converter, not an alias: `{r: 0, g: 0.8235294, b: 1}`
         * has to become `#00D2FF`, which is exactly the value it is (0.8235294 * 255 = 210 = 0xD2).
         *
         * Both spellings are accepted because a track exported from Unity carries `drift1` while this
         * repo's own bench and tests author `sparkTier1Color`. Unity's name is tried FIRST — on a real
         * export it is the authored value and the Babylon name will not be present at all.
         */
        private readUnityColor;
        /** A numeric payload field, or `fallback` if the volume does not carry one. */
        private readVolumeNumber;
        /** A boolean payload field, or `fallback`. */
        private readVolumeFlag;
        /** A `Vector3` payload field, or `null`. Accepts a plain `{x,y,z}` so bench metadata works. */
        private readVolumeVector;
        /**
         * `Player.cs:954-980`. A `JumpPanel` volume launches the kart and grants a 2 s boost.
         *
         * The boost is granted here rather than on landing, which matters: the kart is already at
         * `boost_speed` when it leaves the panel, so the arc is long. Granting it on touchdown would
         * make the panel a jump that happens to end in a boost, which is a different mechanic.
         */
        protected enterJumpPanel(volume: BABYLON.TransformNode): void;
        /**
         * `JumpPanelRotate`. Forces a yaw and a roll on the kart over 0.6 s of the flight.
         *
         * **THE ONLY VOLUME THAT DRIVES THE KART RATHER THAN INFORMING IT**, and only because Unity's
         * component does the rotating itself against whatever entered it — `Player.cs` never reads it
         * (Analysis §E). Ported as a payload the kart consumes, because the alternative is a track
         * component reaching into the kart's transform, which is the thing FR-0's split exists to
         * prevent. The angles and the 0.6 s are unchanged; only who applies them moved.
         *
         * **CORRECTED AGAINST THE SOURCE.** This used to store RATES, on the reasoning that "the source
         * spreads a fixed angle over a fixed time rather than approaching an attitude". Reading
         * `RotatePlayerJumpPanel.cs` shows the opposite: it approaches an attitude, and the attitude is
         * absolute. The old reading also implied a kart being yawed by its own steering "must end up
         * with both" — but Unity ASSIGNS `other.transform.rotation`, so for these 0.6 s the volume wins
         * and the steering does not accumulate on top. See `jumpPanelRotateTarget`.
         */
        protected enterJumpPanelRotate(volume: BABYLON.TransformNode): void;
        /**
         * `Player.cs:1439-1448`. One step of a jump-panel flight.
         *
         * Runs from inside `move()`, AFTER the velocity assignment, for the reason every force in this
         * component runs after it: the assignment would otherwise throw the whole thing away
         * (FINDING 0). Three things happen, and the order between them does not matter because they
         * land in the same accumulator:
         *
         *   1. `upForce` approaches `downForce` at 2.5/s. This IS the arc — there is no separate apex
         *      test and no "falling" state, just one number crossing zero at about 0.36 s.
         *   2. That force is applied along local DOWN, so its negative launch value pushes UP.
         *   3. A forward thrust of **1200 u/s2** (`1444`: `60000 x 0.02`, i.e. Delta-v = 24 u/s per
         *      50 Hz step — §E.3 says both readings are the same number, so do not "correct" either).
         *      It is what turns a launch into a long arc rather than a pop.
         */
        protected tickJumpPanel(dt: number): void;
        /**
         * A per-step VELOCITY offset in the kart's OWN frame, u/s.
         *
         * `addStepVelocity` in local coordinates, and it exists for the jump panel: a panel pushes along
         * the kart's local down and its local nose, and both of those have to be rotated into the world
         * before they can be added to the assigned velocity. Splitting it out rather than inlining the
         * transform keeps the one place that decides "acceleration or step velocity?" readable at both
         * call sites.
         */
        protected addLocalStepVelocity(x: number, y: number, z: number): void;
        /**
         * A vertical push along the kart's own up, in u/s², delivered the way THIS FRAME requires.
         *
         * =========================================================================================
         * THE PLACE THIS DECISION IS MADE FOR ANY NEW VERTICAL FORCE. READ IT BEFORE ADDING ONE.
         * =========================================================================================
         *
         * IT IS NOT THE ONLY PLACE, AND SAYING SO WOULD BE THE SAME KIND OF OVER-CLAIM THIS NOTE
         * EXISTS TO WARN ABOUT. Two vertical pushes deliberately do NOT route through here:
         *   * `move()`'s manual downforce and the `FellInWater` sink — they take the same two deliveries
         *     as everything else, but they are written out at their own call sites rather than routed
         *     through here, because only they need the flat half applied AFTER the assignment (a step
         *     velocity added where the downforce sits is overwritten three lines later). See `move()`.
         *   * anti-gravity's two terms — `verticalAccumulates` is structurally false there, so routing
         *     them would emit exactly what they already emit.
         * A non-force case, the glider's damping MULTIPLIER, asks the same question in `move()`.
         *
         * =========================================================================================
         * TEN INSTANCES, AND T27 CLOSED THE LAST OF THEM. This block used to end "it is not fixed here
         * because the fix is COORDINATED, not local" — that was true when it was written and is no
         * longer. What made the coordinated fix safe was finding the SECOND half of the rule
         * (`canRunGrounded`, above): the plan feared branching gravity would trade a known small error
         * for an unknown large one, and it would have — a ramp apex spread of 1.26 % became 6.28 % on
         * the bare flag — but the grounded guard removes all of it. The residual price across the whole
         * port is three ballistic arcs moving under 5.3 % at 144 Hz alone; nothing at 30, 50 or 60 Hz
         * moved anywhere in 844 tests, and no outcome flipped.
         * =========================================================================================
         *
         * This port produced the same defect **ten times**, in ten different features, and every
         * instance was one line choosing the wrong one of these two deliveries:
         *
         *   1. the jump panel's launch and thrust (T20) — 21.9 units of height at 30 Hz, 6.0 at 144
         *   2. anti-gravity's manual downforce (T18, found at T20) — 4.8x harder pull at 30 Hz
         *   3. the drift's planting downforce inside a barrel (T12, found at T21) — 4.8x again
         *   4. the trick's pop (T21) — 3.87x higher at 144 Hz than at 30
         *   5. the `GliderPanel` exit impulse (T22) — 2.9x the altitude at 144 Hz
         *   6. the glider's dive force (T22)
         *   7. the glider's vertical damping (T22, and see `move()` — a scale, not a force, but the
         *      same mistake: a per-step multiplier applied to a quantity that is rebuilt each frame)
         *   8. `applyAirForce`'s HORIZONTAL (T23) — branched on this flag, which is a question about the
         *      vertical only, so a funnel pushed 10.0 / 5.0 / 2.08 u/s per step at 30/60/144
         *   9. the `CancelDownForce` damp (T23) — the same multiplier mistake as 7
         *  10. `move()`'s own manual downforce and the `FellInWater` sink (T23, closed at T27) — inside
         *      a `ColliderInAir` updraught the non-accumulating case is the STEADY state, not a
         *      transient, so a kart held up by one climbed 2.10x as far in two seconds at 144 Hz as at
         *      30. Now 1.03x.
         *
         * THE RULE, and it is not "is it vertical?". `move()` ASSIGNS the velocity every step, so a
         * force is a genuine ACCELERATION only if the component it pushes on SURVIVES that assignment —
         * which for the vertical means only when the clamp returned the BODY's `y`. `verticalAccumulates`
         * is that question, asked per frame at the line that decides it. When the answer is yes the push
         * integrates and `a` is an acceleration; when it is no the push is thrown away and re-made every
         * step, and what the kart actually feels is a constant velocity of `a · 0.02` — Unity's own
         * 50 Hz figure, and the same at every rate.
         *
         * WHY IT KEPT SURVIVING REVIEW: at Unity's 50 Hz step the two deliveries are the same
         * arithmetic. `a · dt` and `a · 0.02` are the same number, so neither a test at 50 Hz nor a
         * reader checking against the donor can tell them apart, and a wrong answer still looks like a
         * working feature. **A one-rate test of a per-step quantity cannot distinguish a velocity from
         * an acceleration, ever.** Sweep 30/60/144.
         *
         * @param accel Upward acceleration in u/s², already through FINDING 1's first conversion.
         */
        protected addLocalVerticalPush(accel: number, canRunGrounded?: boolean): void;
        /**
         * One step of a `JumpPanelRotate` volume's forced rotation, if one is running.
         *
         * Applied to the chassis quaternion directly rather than through the steering, because it is
         * not steering — the kart is in the air, the driver has no authority, and the track is putting
         * the kart where the next section needs it to be pointing. Runs only while airborne on a
         * panel: landing ends the flight and the rotation with it.
         */
        protected tickJumpPanelRotate(dt: number): void;
        /** Ends a jump-panel flight. `Player.cs:494`/`529` — contact with `Ground` or `Dirt`. */
        protected endJumpPanel(): void;
        /**
         * `Player.cs:229`. Starts a trick if all three gates pass, otherwise does nothing at all.
         *
         * Returns whether one started, because "the trick did nothing" is a thing the bench and the
         * tests need to be able to assert positively rather than infer from an unchanged trajectory.
         */
        protected tryTrick(): boolean;
        /**
         * One step of the trick's upward push.
         *
         * **6500 decaying by 300 every 0.01 s, floored at 300, for 0.3 s.** Unity spends that as a
         * coroutine of thirty 0.01 s waits; here it is a timer read at whatever rate the browser runs,
         * which is the same curve sampled differently. The floor is what makes the last third of the
         * trick a gentle hold rather than the force going negative and hauling the kart down.
         *
         * HOW IT IS DELIVERED DEPENDS ON THE FRAME, not on the mode — see the branch in the body and
         * `verticalAccumulates`. This doc used to say "a STEP VELOCITY, not an acceleration, because the
         * clamp never lets the heading ADD vertical speed, so an upward force cannot accumulate in ANY
         * state". That is true of the HEADING and false of the PUSH: a step velocity is added AFTER the
         * clamp, so it lands in the body, and the clamp then preserves the body's `y` on every frame
         * where the nose is pitched above it — which is every frame of a ramp jump. The claim was wrong,
         * and the code that followed from it made a trick 3.87x higher at 144 Hz than at 30 Hz.
         */
        protected tickTrick(dt: number): void;
        /**
         * `Player.cs:539-541`. Landing after a trick floors the boost at 0.9 s.
         *
         * **A FLOOR, NEVER AN ASSIGNMENT** (§E.4). Landing a trick in the middle of a 2.5 s drift
         * payout must not cut it to 0.9, which is what an assignment would do and what would make
         * tricking mid-boost a punishment. `floorBoost` owns that distinction; this method owns only
         * when it is called.
         */
        protected landTrick(): void;
        /**
         * `Player.cs:1109-1214`. Leaving a `GliderPanelFly` volume deploys the glider.
         *
         * **ABOVE SPEED 60 IT PLAYS THE TRICK VARIANT** — 0.45 s of nothing, then the glider opens, then
         * 0.35 s more, then a 0.5 s boost (`1178`). Below 60 it just opens. That threshold is the only
         * reason to arrive at a glide ramp fast, and the 0.5 s is small enough that it is a flourish
         * rather than a shortcut.
         *
         * Entering a glider section also ENDS A DRIFT (`1132-1153`), and the source resets the drift
         * fields inline rather than calling `stopDrift()` — so no tier is paid. Ported through
         * `stopDrift(false)`, which is the same thing said once.
         */
        protected enterGliderSection(volume: BABYLON.TransformNode): void;
        /** Opens the glider and starts its clock. Split out because two paths reach it. */
        protected openGlider(): void;
        /**
         * One step of the glider, run from `stepKartState` while it is open or opening.
         *
         * The two trick timers are ticked even when the glider is not yet open, which is the entire
         * point of the 0.45 s stage: the kart is in the air, unpowered and unguided, and then the canopy
         * snaps out. Running them from the same place as the flight keeps the sequence in one method
         * instead of scattered across three flags.
         */
        protected tickGlider(dt: number): void;
        /**
         * The glider's pitch and roll, and the lift and dive forces that go with them.
         *
         * PITCH (`1157-1176`), all relative to the volume's `glideAngleX` trim, approached at **1.5/s**:
         *
         *   dive     target `+25 + trim`, plus **40 u/s²** of extra downforce — the nose-down input is
         *            the only way to lose height deliberately, and the force is what makes it decisive
         *            rather than a slow sag.
         *   climb    target `−25 + trim`, but the attitude is CLAMPED at `−20 + trim`, plus **30 u/s²**
         *            of lift while `glidingTime < 6`. The clamp and the six-second budget together
         *            bound how far a glider may CLIMB — the nose stops going up before the target does,
         *            and the lift expires.
         *   neutral  target `0 + trim`.
         *
         * **THIS PARAGRAPH USED TO CLAIM THOSE TWO ARE "WHY A GLIDER CANNOT BE FLOWN UPWARD FOREVER",
         * AND THEY ARE NOT.** They end the climb; they do not begin a descent, and in the source model
         * nothing else does either — past six seconds a nose-up kart sinks at 0.055 u/s and flies level
         * indefinitely. The claim was true of the six seconds it was looking at and false of the minute
         * after, which is the kind of error a docblock can hold for a long time: it describes a real
         * mechanism accurately and then draws a conclusion the mechanism does not support. The whole
         * chain is in the ARCADE GLIDER block above the constants, and `enableGliderPhysics` is the
         * answer to it.
         *
         * ROLL (`1180-1190`): `glideAngleZ + 40 · smoothed(−steer)`, the smoothing a `SmoothDamp` at
         * 5/s and the attitude then approached at 3/s. Two lags in series on the same input, which is
         * what gives a glider its heavy, banking feel instead of a kart's instant response. **The
         * negation is Unity's**: a right stick banks the glider right, and right roll about the nose is
         * negative in a left-handed +Z-forward frame (FINDING 1b — no conversion, the sign is the
         * source's).
         */
        /**
         * ARCADE. The descent the current slope and airspeed ask for, u/s, as a POSITIVE magnitude.
         *
         * `0.75 · sin(angle) · speed`, the glide-ratio form — see the ARCADE GLIDER block above the
         * constants for why it is a slope rather than three flat sink rates, and what breaks when it
         * is not.
         *
         * The angle is `gliderSlope`, which `applyGliderAttitude` maintains beside the attitude and
         * which already carries all of it — the volume's trim, the player's input, the 20 degree climb
         * clamp, the `gliderSlopeMin` promotion, the `gliderSlopeFloor` floor and the 1.5/s ease-in.
         * All this method does is turn an angle and an airspeed into a descent.
         *
         * ONE FRAME OF LAG, AND IT IS THE RIGHT FRAME (P-15). `move()` runs before `tickGlider`, so
         * the slope read here is the one the kart was flying when the step began rather than the one
         * it will be flying when the step ends. That is the same slot the SOURCE reads its own attitude
         * from — `move()`'s assignment uses `transform.forward`, which is last step's matrix — so
         * taking the fresher value would put the arcade model a frame AHEAD of the model it is meant
         * to agree with.
         *
         * Positive by convention so the tuning fields read as slopes and sinks rather than as negative
         * numbers in an inspector; `move()` negates once, at the use.
         */
        protected gliderSinkTarget(): number;
        /**
         * ARCADE. The vertical velocity to fly this step, given the body's current one.
         *
         * `approachRate` toward the slope's descent — plus ONE correction, which is the subject of this
         * docblock because it is the only part that is not obvious.
         *
         * **GRAVITY LEAKS THROUGH AN APPROACH, AND THE SOURCE'S ASSIGNMENT DOES NOT LEAK.** The solver
         * applies the scene's gravity between steps, so the value read back has already been pulled
         * down by `g · dt` before the approach sees it, and the fixed point of
         * `v = T + (v + g·dt - T)·k` is not `T` but `T + g·dt·k/(1-k)`, which tends to `T + g/rate`.
         * The SOURCE has no such term: its steady state is `min(nose, body) × 0.75` with the nose
         * shallower, so the assignment takes the nose whole and whatever gravity did to the body that
         * step is discarded. The two models therefore disagree by a constant `g/rate` — 0.139 u/s at
         * this rate and this scene's -2 — for as long as the glide lasts.
         *
         * THAT SOUNDS NEGLIGIBLE AND IS NOT, because a glide multiplies altitude into range. At 19:1
         * the 1.1 units it costs over an eight-second crossing is **21 units of range**, and the
         * bench's slow line clears its apron by less than that. It was the last thing between the
         * arcade model and the shipped benches, and it is an artefact of writing the model as an
         * approach rather than a property of the model — so it is cancelled here rather than tuned
         * around, and `KartGliderArcade.test.ts` sweeps 30/60/144 Hz to prove the cancellation holds
         * at every rate rather than at the one it was derived on.
         */
        protected gliderVerticalFor(bodyY: number, dt: number): number;
        protected applyGliderAttitude(dt: number): void;
        /**
         * `Player.cs:550-574`. Closes the glider on a ground contact — but not straight away.
         *
         * **THE 1 s `glider_close_confirm` GUARD IS THE WHOLE POINT.** A glide launch clears the lip with
         * the kart still within a couple of units of the boards, and without the guard the very first
         * graze folds the canopy before the player has left the ramp. The guard is a minimum time OPEN,
         * not a delay on the close: once a second has passed, contact closes it on the frame it happens.
         *
         * The landing then holds the ground probe at **6** for 0.6 s before dropping it to **1**
         * (`569-574`) — a deliberately long reach so a kart that lands nose-high still finds the ground.
         * That machinery is `updateGroundRayDistance`'s and predates this task; all that happens here is
         * arming its timer.
         */
        protected closeGlider(): void;
        /**
         * **T39.** Folds the canopy with no regard for the 1 s minimum-open guard.
         *
         * The guard in `closeGlider` is a GAMEPLAY rule — it stops a graze on the take-off ramp folding
         * the canopy before the player has left it — and it belongs on the contact path only. A caller
         * asking for a known starting state is not a contact, and honouring the guard there would mean
         * `clearTransientState()` silently did nothing to a kart that deployed a quarter of a second ago.
         * Everything else is `closeGlider`'s own teardown, including arming the landing reach, because
         * a kart put back on the ground still wants the probe that lets it find it.
         */
        protected closeGliderImmediate(): void;
        /**
         * `Player.cs:1077`/`1095-1104`. Leaving a `GliderPanel` pays 2 s of boost and a decaying shove.
         *
         * The shove is a **`ForceMode.Impulse`**, which is the only one in the port: with mass 50 and the
         * source's `force * dt`, each step is `Δv = force · 0.02 / 50` — so the ramp from 20000 to 2000
         * is **8 u/s down to 0.8 u/s** per step over 0.6 s. It is what lifts a kart back onto the next
         * panel rather than letting it sink between them, and it is why a glider corridor made of panels
         * flies as one continuous line instead of a series of dips.
         */
        protected exitGliderPanel(): void;
        /** One step of the `GliderPanel` exit impulse, if one is running. */
        protected tickGliderImpulse(dt: number): void;
        /**
         * `Player.cs:507`. A `Boost` pad grants its `duration` seconds.
         *
         * Through the same `grantBoost` every other source uses, so the pad has no special boost of its
         * own. Note that `grantBoost` ASSIGNS: a 2 s pad taken during a 2.5 s tier-3 payout leaves 2 s,
         * i.e. it SHORTENS it. That is Unity's behaviour and every other source shares it; `floorBoost`
         * is the one that takes whichever is longer, and only the trick landing uses it (§E.4).
         */
        protected onBoostPad(volume: BABYLON.TransformNode): void;
        /**
         * `Player.cs:982`/`1273-1278`. A `CancelDownForce` volume floats the kart.
         *
         * TWO EFFECTS AND IT NEEDS BOTH. Suppressing the manual downforce alone merely stops pulling the
         * kart down, which against a 90 u/s cruise is nearly invisible; the 0.98-per-step vertical damp
         * alone would slow a fall the downforce is still driving. Together they hold it up. Both live in
         * `move()` already and read this one flag, which is set on entry and cleared on exit — genuine
         * overlap semantics, because unlike anti-gravity there is nothing here to latch.
         */
        protected setCancelDownForce(active: boolean): void;
        /**
         * `colliderInAir.cs`. A steady push while the kart is inside — the wind tunnels and finish funnels.
         *
         * The payload's three `isFor*` flags are a gate on WHEN, and they are not mutually exclusive:
         * `isForAir` restricts it to an airborne kart, `isForRaceEnd` also allows it during the race-end
         * sequence, and `isONLYforRaceEnd` restricts it to that sequence alone. The race-end sequence is
         * out of scope for this port, so the two race-end flags are read and honoured — a volume marked
         * `isONLYforRaceEnd` correctly does nothing here — rather than being dropped as unreachable.
         *
         * The direction is the VOLUME's own local FORWARD (+Z) when `relativeForce`, and world UP
         * otherwise — which is how one component serves both a funnel that pushes along a corridor and
         * an updraught that pushes along the world.
         */
        protected applyAirForce(dt: number): void;
        /**
         * `Player.cs:1932-1993`. One step of the wheels, the steering wheel and the anti-gravity pose.
         *
         * Runs from `updateKartState` — Unity's `Update`, not `FixedUpdate` — because it is presentation
         * and should run at the display rate rather than the physics rate. That is also why it takes no
         * part in the frame-rate arguments the rest of this file is full of: nothing here integrates.
         */
        protected updateWheels(dt: number): void;
        /**
         * Writes the three channels onto the wheel nodes. The ONLY place this component touches them.
         *
         * The wheels are ordered front-left, front-right, rear-left, rear-right, and only the front pair
         * steers. Their anti-gravity swing alternates by **DIAGONAL** — see `WHEEL_POSE_SIGN`, where the
         * derivation from `2659-2665`'s four target Eulers is written out. This paragraph used to say
         * "by side", which is what the code did and what the code was wrong about.
         */
        protected applyWheelPose(): void;
        /**
         * Hands the component the nodes it should drive, and records their REST TRANSFORM.
         *
         * Called by the bench rig and, on a real asset, by whatever resolves the exported hierarchy
         * (T26).
         *
         * **BOTH HALVES OF THE REST ARE CAPTURED, AND FOR THE SAME REASON.** The spread writes
         * `position` and the pose writes `rotationQuaternion`, both absolutely, every frame — so a
         * position read live would compound against itself, and a rotation not captured would be
         * ERASED. The first version captured only the position, and that was a real hole: T25's own
         * deviation is that the component carries the +/-25 and leaves Unity's 180-degree wheel rest to
         * the MODEL, which is only honest if the model's rest actually survives. It did not. A wheel
         * node arriving with `Ry(180)` — exactly the rest `2659-2665`'s `(0,180,+/-90)` targets encode —
         * was identity by the end of frame one.
         *
         * The bench never noticed because it put its axis correction on a CHILD mesh, where this method
         * cannot reach it. A Unity-exported kart puts it on the wheel transform itself, which is the
         * case T26 has to work for.
         */
        setWheelNodes(wheels: BABYLON.TransformNode[], steeringWheel?: BABYLON.TransformNode): void;
        /**
         * Hands the component the driver's arm nodes, which scale under anti-gravity (`Player.cs:2659`).
         *
         * Optional, and absent on any rig without a driver — the bench's red box has none. Kept separate
         * from `setWheelNodes` because a kart can have wheels and no arms but never the reverse.
         */
        setArmNodes(arms: BABYLON.TransformNode[]): void;
        /**
         * Finds a node by name ANYWHERE under this kart, at any depth — but never outside it.
         *
         * **`getChildNode` DEFAULTS TO DIRECT CHILDREN ONLY, AND THAT DEFAULT SHIPPED THIS BROKEN.**
         * `SceneManager.FindChildTransformNode`'s `directDecendantsOnly` is `true` unless told
         * otherwise, so a kart shaped `TestKart > KartModel > WheelFL` — which is how this project's own
         * bench rig is built, and it explains why ("a wheel that stayed level while the body hopped and
         * leaned would read as detached"), so a Unity kart is almost certainly rigged the same —
         * resolved **zero** wheels, no steering wheel and zero arms, silently. The bench escaped only
         * because it hands its nodes over in code. The toolkit's own `StandardVehicleController` passes
         * `false` here for exactly this reason.
         *
         * Still ROOT-SCOPED, which is the other half of the contract: a scene holding a track, an
         * opponent and the red-box fallback has more than one node called `WheelFL`, and each kart must
         * get its own.
         */
        protected findRigNode(name: string): BABYLON.TransformNode;
        /** One contact against one tagged surface. Split out so enter and stay share it exactly. */
        protected onSurfaceContact(other: BABYLON.TransformNode): void;
        /**
         * Builds the chassis body from the measured Unity spec if nothing has built one already.
         *
         * A Unity-exported kart carries its collider in `extras.metadata.components` and the toolkit
         * builds the body during parsing, so this is a no-op there. A bench rig has no such metadata,
         * so the same metadata shape is written by hand and handed to the same toolkit entry point —
         * `RigidbodyPhysics.SetupPhysicsComponent` — rather than assembling a `PhysicsBody` directly.
         * Going through the toolkit is what guarantees the two paths produce the same body.
         */
        private ensureChassisBody;
        /** Per-frame input sampling and visual channels. */
        protected updateKartState(): void;
        /** Reusable probe result. Allocating one of these per step would allocate 60 a second. */
        private readonly rayResult;
        /**
         * Whether the ground probe's RAW hit this step was an `AntiGravity`-tagged surface.
         *
         * Written once per step in `probeGround`, read once per step in `tickAntiGravity`. Raw, not
         * accepted: see the note in `probeGround` for why deriving it from the accepted hit would be
         * circular.
         */
        protected overAntiGravitySurface: boolean;
        /**
         * Whether the ground probe's RAW hit this step was a surface that is NOT anti-gravity.
         *
         * The positive evidence that the kart has driven off an anti-gravity mesh onto ordinary road.
         * Distinct from `!overAntiGravitySurface`, which is also true in mid-air and must not end the
         * mode — see the note in `tickAntiGravity`.
         */
        protected overOrdinarySurface: boolean;
        /**
         * Drive anti-gravity from the SURFACE under the probe rather than only from entry/exit triggers.
         *
         * **On by default, because Mario Kart's anti-gravity is a property of the road.** The mode comes
         * on the moment the kart is over an `AntiGravity`-tagged mesh and ends when it is demonstrably
         * on ordinary road, which is what a driver expects and what a trigger model cannot deliver
         * without hand-placed boxes in exactly the right places.
         *
         * **THIS DEFAULT USED TO BE `false`, AND THE REASON WAS NOT WHAT THIS NOTE SAID IT WAS.** It
         * recorded a measured cost — the bench barrel's roll reaching 129.2 degrees against the trigger
         * model's 144, and a probe ceiling normal of -0.666 rather than past -0.7 — and attributed it to
         * the tube sitting 0.06 above ordinary ground, so that a probe which should read the tube reads
         * the pad and ends the mode mid-roll. **That attribution was measured and is false:** driven at
         * 30 Hz the probe read the anti-gravity surface on 123 frames and ordinary ground on 1, and the
         * flag never dropped once.
         *
         * The real cause was where each model turned the flag ON. The bench's barrel opened with a
         * taper, so its entry trigger had been deferred 140 units into the tube to a station where the
         * profile had closed; the surface path had no such deferral. The two models were not driving
         * the same manoeuvre — one started its helix 140 units later than the other, with less tube
         * ahead of it. T48 deleted the taper (the Unity project has no such concept and authors
         * anti-gravity sections as constant-profile pipes), the threshold went back on the mouth where
         * Unity's `AntiGravityEnter` sits, and the difference went with it: `tests/KartAntiGravity.test
         * .ts`'s whole T38 regression block — roll, riding band, probe continuity, frame-rate spread —
         * passes unchanged with this flag either way.
         *
         * What still differs, and legitimately, is which thing CLEARS the flag: under the surface model
         * leaving the mesh does, so the exit-volume contract from `Player.cs:1280-1299` is characterised
         * with this set to `false`. That is a different question from how a kart traverses a tube.
         */
        surfaceAntiGravity: boolean;
        /**
         * Whether the anti-gravity currently in effect was set by the SURFACE rather than by a volume.
         *
         * The surface may only clear what the surface set. Without this the road took the mode away
         * from karts that a volume, a respawn or an authored property had put into it.
         */
        protected antiGravityFromSurface: boolean;
        /** Seconds of anti-gravity remaining since the last anti-gravity surface contact. */
        protected antiGravitySurfaceTail: number;
        /** Reusable result for the separate length-1 drift-entry probe. */
        private readonly driftRayResult;
        /** Reusable ray endpoint. */
        private readonly rayEnd;
        /** Reusable world-space down vector (`-transform.up`), unit length. */
        private readonly rayDirection;
        /** Reusable scaled ray vector. `Vector3.scale` allocates; `scaleToRef` into this does not. */
        private readonly rayExtent;
        /** Reusable alignment quaternion. */
        private readonly alignRotation;
        /** Reusable alignment target. */
        private readonly alignTarget;
        /** The probe query, built once in `awakeKartState` from the layer include-list. */
        private rayQuery;
        /** Accelerations gathered during this step, world space, u/s². Unity's PhysX force buffer. */
        private readonly pendingAcceleration;
        /** The velocity this step decreed, before the pending accelerations are added. */
        private readonly assignedVelocity;
        /** Scratch for reading the body's current velocity without allocating. */
        private readonly bodyVelocity;
        /** Scratch for converting a local acceleration into world space. */
        private readonly localAccel;
        /** Reused argument for `selectMaxSpeed`. A fresh literal per step is still 60 objects a second. */
        private readonly speedCapState;
        /** `rb.AddForce(v, ForceMode.Acceleration)` — world space, u/s². */
        protected addWorldAcceleration(x: number, y: number, z: number): void;
        /** `rb.AddRelativeForce(v, ForceMode.Acceleration)` — the kart's local frame, u/s². */
        protected addLocalAcceleration(x: number, y: number, z: number): void;
        /**
         * A per-step VELOCITY offset, world space, u/s — and the one place FINDING 1's conversion is
         * not the whole story.
         *
         * ---------------------------------------------------------------------------------------
         * WHY A FORCE IN THE HORIZONTAL PLANE IS NOT AN ACCELERATION HERE, AND WHY THE VERTICAL ONES
         * STILL ARE.
         *
         * `Move()` ASSIGNS the velocity every step (FINDING 0), so what a force does to the kart
         * depends entirely on whether the component it pushes on survives that assignment:
         *
         *   * VERTICAL. The assignment's clamp keeps the BODY's `y` whenever the nose's is higher
         *     (`1332-1339`), so a downward force is not erased — it accumulates step over step, the
         *     kart falls faster and faster, and it is a genuine acceleration. Gravity and the drift
         *     downforce go through `addWorldAcceleration` / `addLocalAcceleration` for exactly that
         *     reason.
         *
         *     **THE TWO CLAMP-SKIPPING STATES ARE THE EXCEPTIONS, AND BOTH USED TO BE LISTED HERE AS
         *     EXAMPLES.** A jump-panel flight (`1439-1448`) and anti-gravity (`1335`) each switch that
         *     clamp OFF, so the assignment takes the nose's vertical whole, the body's accumulated
         *     motion is discarded every step, and a force routed through `addLocalAcceleration`
         *     delivers `a · dt` and no more. Measured: the panel threw the kart 21.9 units up at 30 Hz,
         *     12.3 at 60 and 6.0 at 144, and the anti-gravity downforce read a flat −112 · dt, pinning
         *     a kart to a barrel 4.8× harder at 30 Hz than at 144. Both now go through
         *     `addLocalStepVelocity`.
         *
         *     The lesson generalises, and it is the one to carry into every later phase: the question
         *     is never "is it vertical?", it is **"does this component survive the assignment IN THIS
         *     STATE?"** The anti-gravity case was missed for two whole tasks because every test ran at
         *     60 Hz, where a wrong answer still looks like a working barrel.
         *   * HORIZONTAL. `x` and `z` are overwritten WHOLE every step. A lateral force therefore
         *     never accumulates: each step it contributes `a · dt` and each step that contribution is
         *     thrown away and re-made. What the player feels is not an acceleration at all — it is a
         *     constant sideways velocity of `a · dt` riding on top of the heading.
         *
         * At Unity's 50 Hz the drift's 1000 u/s² lateral force therefore reads as a steady **20 u/s**
         * of outward slide, which is where FR-4's 14° figure comes from (`atan(20/80)`). Ported as a
         * literal acceleration into `pendingAcceleration`, the same line would give 16.7 u/s at 60 Hz
         * and 6.9 u/s at 144 Hz — the drift's whole character would change with the monitor. So the
         * conversion for a horizontal force is `x · 0.02 · 0.02` u/s of velocity, not `x · 0.02` of
         * acceleration, and it is added HERE, to the assigned velocity, where it belongs.
         *
         * ONE CONSEQUENCE, AND IT IS UNITY'S TOO. "Horizontal" above means "in the kart's own plane",
         * not "in the world's". On banked surfaces `transform.right` tilts with the bank, so the
         * drift's 20 u/s push carries a world-VERTICAL component — about 6 u/s at the bench sweeper's
         * 18° — and because this runs AFTER `clampAssignedVerticalVelocity`, that component is not
         * clamped. A drift on the banking is therefore partly lofted by its own lateral force and
         * climbs the bank. That is exactly what Unity does: `AddForce` lands after the velocity
         * assignment there as well, and the force is a full 3-vector along `transform.right` in both.
         * Clamping it here would be a change to the game, not a fix.
         * ---------------------------------------------------------------------------------------
         */
        protected addStepVelocity(x: number, y: number, z: number): void;
        /**
         * `Player.cs:1317-1432` — everything that decides how fast the kart is going.
         *
         * Read alongside the source: the statement order below is the statement order there, because
         * several of these assignments overwrite each other and the order is the specification.
         */
        private move;
        /**
         * `Player.cs:1393-1400`. Coasting clears the drift DIRECTION — and nothing else.
         *
         * =========================================================================================
         * THIS USED TO CALL `stopDrift(false)`, AND THAT DESTROYED THE MINI-TURBO.
         * =========================================================================================
         *
         * The coast branch runs on EVERY step the throttle is off, and `stopDrift(false)` takes the
         * `1799` path: it zeroes `Drift_time`, clears `drifting`, resets `driftLatchTimer` and puts
         * `driftState` back to `None`. So lifting off for a single frame did not merely neutralise
         * the drift, it **deleted the charge**.
         *
         * What that costs is the whole mechanic, because lifting off is exactly what a player does
         * entering a corner. Measured on the bench before the fix: a drift held for three seconds
         * with the throttle released never accumulated a single frame of charge — `Drift_time` read
         * **0.00 at 69, 61, 53 and 47 u/s**, all comfortably above the 40 the hold requires — so the
         * release paid nothing and there was no burst. The player's report was "coming out of a drift
         * does not give a speed burst", and this was why.
         *
         * **UNITY'S LINES ARE FOUR ASSIGNMENTS AND A LERP, AND NONE OF THEM TOUCHES THE CHARGE:**
         *
         *     if (!Input.GetKey(KeyCode.Space)) {
         *         currentspeed = Mathf.Lerp(currentspeed, 0, 0.01f);
         *         drift_right = false;  drift_left = false;  drift_direction = 0;
         *         transform.GetChild(0).localRotation = Lerp(..., Quaternion.Euler(0,0,0), 0.4f);
         *     }
         *
         * `Drift_time` keeps accumulating, because the hold test at `1672` has **no throttle term** —
         * it is `GetKey(V) && grounded && currentspeed > 40 && GetAxis("Horizontal") != 0` and no
         * more. So in Unity you can lift off mid-drift, keep charging, and still collect the payout.
         * The earlier docblock's argument for routing through `stopDrift` was about keeping
         * `drift_left`/`drift_right` consistent with `drift_direction` — a real concern, and one this
         * version answers by clearing all three together rather than by ending the drift.
         *
         * **THE DIRECTION IS NOT RESTORED AFTERWARDS, AND THAT IS FAITHFUL RATHER THAN AN OVERSIGHT.**
         * `drift_direction` is written only at entry (`1659-1666`); the held branch never re-derives
         * it. So a coast mid-drift permanently neutralises the outward push and the spark side for
         * that drift while the charge keeps building — quirky, and exactly what the source does.
         *
         * @param dt the step, for the model settle below
         */
        protected endDriftOnCoast(dt: number): void;
        /** Reused local yaw axis. */
        private readonly yawAxis;
        /** Reused yaw quaternion. */
        private readonly yawRotation;
        /** Reused argument for `selectSpeedRotateRate`. */
        private readonly steerState;
        /**
         * `Player.cs:1548-1638` — `Steer()`, in Unity's own statement order.
         *
         * It runs AFTER `Move()` has already written the velocity, which is what lets the drift's
         * outward push at `1567`/`1584` survive the assignment (T12).
         */
        protected steer(dt: number): void;
        /**
         * `Player.cs:1561`/`1579`. The model child's ±20° drift yaw, approached at 8/s.
         *
         * Split from the lateral force rather than folded in with it, because Unity interleaves them
         * around the `max_speed` write and the call order is the specification.
         *
         * **8/s is the third of FINDING 3's three rates**, against the chassis's 7.5 and the camera's
         * 3. It is the fastest of the three, which is why the model reaches its drift pose while the
         * chassis is still rolling onto the surface and the camera is still catching up — and that
         * lag between the three is the visible lean (D-5). Do not tidy it.
         *
         * @param hand `+1` drifting right (yaw `+20°`), `-1` drifting left (yaw `-20°`).
         */
        protected applyDriftModelYaw(hand: number, dt: number): void;
        /**
         * `Player.cs:1567`/`1584` — the outward lateral push, and the thing that makes a drift a drift.
         *
         * Unity writes `rb.AddForce(∓transform.right · 50000 · Time.deltaTime, ForceMode.Acceleration)`.
         * Through FINDING 1 that is 1000 u/s², and through the horizontal-force argument in
         * `addStepVelocity` it lands as a steady **20 u/s** of outward slide. At the drift's own
         * 80 u/s cap the kart therefore travels `atan(20 / 80)` = **14°** wide of where it is
         * pointing — real slip, not a rotated model.
         *
         * IT ONLY SURVIVES BECAUSE OF THE CALL ORDER. `Steer()` runs AFTER `Move()` has assigned the
         * velocity (`Player.cs:294-295`), so this lands on top of the assignment rather than under
         * it. Reordering the two would delete the drift entirely while every constant stayed correct.
         *
         * **The sign pairing is §E.2's, not the source's branch labels** — those are swapped in the
         * spec's citation list. Drifting RIGHT pushes along `-transform.right`; drifting LEFT pushes
         * along `+transform.right`. Both push OUTWARD, away from the corner being turned into, which
         * is the only reading under which the kart slides wide instead of tucking in.
         *
         * @param hand `+1` drifting right (pushes along `-transform.right`), `-1` drifting left.
         */
        protected applyDriftLateralForce(hand: number): void;
        /**
         * `Player.cs:2251` — the drift downforce: **200 u/s² along the kart's own local down**.
         *
         * `AddForce(-transform.up · 10000 · dt, Acceleration)` = 10000 × 0.02, so twice the manual
         * gravity of `move()` and a hundred times the engine's own -2. Vertical, therefore a genuine
         * acceleration (see `addStepVelocity`).
         *
         * This is what keeps a drift PLANTED. A kart carrying 20 u/s of outward slide over the crest
         * of a banked corner leaves the surface without it, and a kart in the air is a kart whose
         * ground probe misses and whose alignment stops — so the loss compounds. Gated off while
         * gliding, where the glider owns the vertical entirely.
         *
         * Called from the step between `steer()` and the alignment, which is where `2251` sits
         * relative to `Steer()` at `295` and `GroundNormalRotation()` at `302`.
         */
        protected applyDriftDownforce(): void;
        /** `Player.cs:1626`. Model yaw returns to 0 at 8/s when not drifting. */
        protected releaseDriftModelYaw(dt: number): void;
        /** Seconds left in the post-finish model unwind, or 0. See `raceStopDriftRot`. */
        protected raceStopDriftRotTimer: number;
        /**
         * `LapCounter.cs:115-123` — `stopDriftRot()`, the post-finish unwind of the model child.
         *
         * Unity runs it as a coroutine on the LAP COUNTER: 120 iterations of `WaitForSeconds(0.01f)`
         * lerping `transform.GetChild(0).localRotation` toward identity at `8f * Time.deltaTime`.
         *
         * **IT LIVES HERE, ON THE CONTROLLER, AND THE FIRST ATTEMPT PUT IT ON THE LAP COUNTER AND WAS
         * DEAD CODE.** That is worth the paragraph, because the failure was invisible to a green test.
         * In Unity the model child's `localRotation` is a genuine accumulator — `Player.cs:1561`,
         * `:1579` and `:1626` all read-modify-write it — so an outside component lerping the same
         * field composes with them. **This port does not have that accumulator.** It keeps a scalar
         * `driftYaw` and rebuilds the quaternion from scratch every frame in `updateModelMotion`
         * (`copyFrom(this.modelRotation)`), which runs unconditionally from `updateKartState`. So a
         * write to `modelNode.rotationQuaternion` from any other component survives exactly zero
         * frames: measured, an externally-applied 40 degrees read back as 0 after ONE rendered frame,
         * against a decay that predicted 35.007. The mechanism was tested — and only ever tested with
         * the render loop taken out of the picture, which is the one arrangement that hides it.
         *
         * The rule it produced: **a channel is unwound by the component that composes it, or not at
         * all.** So this decays `driftYaw` itself, and `updateModelMotion` composes the result.
         *
         * **WHY IT IS NOT MERELY REDUNDANT WITH `releaseDriftModelYaw`, WHICH IT LOOKS LIKE.** That
         * method decays the same field at the same 8/s — but it is called from `steer()`, and in UNITY
         * `Steer()` does not run after the finish at all: `Player.cs:264` gates the locomotion on
         * `!RACE_COMPLETED` and `:419-423` hands the kart to the AI path system instead. That is
         * precisely WHY Unity needs a separate coroutine. This port deliberately keeps the player
         * driving after the line (FR-6.6, no AI path system), so `steer()` DOES keep running and the
         * yaw would unwind anyway — today, by coincidence of that divergence, and not by design.
         * Depending on it would be depending on one unported branch to cover for another. This runs in
         * the frame phase regardless of what the fixed phase did, which is where Unity reaches it from.
         *
         * **SO IN THE SHIPPED CONFIGURATION THE TWO COMPOSE AND THE REALISED RATE IS 16/s, NOT 8/s.**
         * They are simultaneous, not alternatives, and an earlier version of this note framed them as
         * alternatives. Both decay `driftYaw` every frame at 8/s, and two exponentials multiply:
         * measured on the bench with the race finished, `RACE_STARTED` true gives an implied
         * 16.000000000000 per second against 8.000000000000 with the locomotion gate shut. Unity
         * realises 8, because `Steer()` stops at the finish.
         *
         * Recorded rather than corrected, for two reasons. The visible difference is nil — from 20
         * degrees over the 1.2 s window, 8/s leaves **0.0013546** degrees and 16/s leaves
         * **9.1744e-8**, and both are identity to any eye or any camera. (An earlier version of this
         * line said 16/s leaves `0.0000023`. That is `20 · e^-16` — the ONE-SECOND figure — presented
         * as the 1.2-second one, wrong by a factor of 25. Corrected rather than quietly dropped,
         * because a docblock is the donor for the next person who writes this up, and this one had
         * already been copied into SPEC.md once before it was checked.) And it is rate-independent
         * either way, because
         * both terms are exponential in wall-clock time, so the doubling does not reintroduce the D-6
         * problem. **The consequence to know is the counter-intuitive one:** if the locomotion gate
         * ever regains Unity's `!RACE_COMPLETED`, this unwind does not become redundant — it becomes
         * the ONLY one, and the realised rate HALVES to Unity's own 8/s rather than staying put.
         *
         * Rate-independent through `approachRate`, the file's own D-6 decay helper — `driftYaw`
         * PERSISTS between steps (nothing rebuilds the scalar; only the quaternion is rebuilt from
         * it), so it is a decay and takes the exponential form rather than a flat per-step factor.
         *
         * @param seconds How long to keep unwinding. The caller supplies Unity's nominal `120 x 0.01`.
         */
        raceStopDriftRot(seconds: number): void;
        /** Whether the post-finish unwind is still running. */
        isRaceStopDriftRotRunning(): boolean;
        /**
         * One frame of the post-finish unwind. Runs in the FRAME phase, beside the other model channels.
         *
         * Deliberately independent of `steer()` — see `raceStopDriftRot` for why leaning on that call
         * would be leaning on one unported Unity branch to cover for another.
         */
        protected tickRaceStopDriftRot(dt: number): void;
        /**
         * `Player.cs:272`. Throttle held before the start, seconds — the rocket-start charge.
         *
         * Owned by a race manager through `chargeLaunch`/`releaseLaunch` rather than read from a
         * countdown here, because the component has no idea when a race starts and should not.
         */
        protected beforeStartAccelTime: number;
        /**
         * `Player.cs:326-343` — the countdown, and the shove on the way out.
         *
         * Runs LAST in the step (`stepKartState`), which is not cosmetic: `Steer()` writes an
         * unconditional `max_speed = desiredMaxSpeed` at `1627` whenever the kart is not drifting, so
         * a boost whose cap was applied any earlier would be overwritten every single step and would
         * do nothing at all.
         */
        protected tickBoost(dt: number): void;
        /**
         * Every boost source in the game, in one line (`960`, `1077`, `507`, `1178`, `274`, `1824-1866`).
         *
         * An ASSIGNMENT, exactly as Unity writes it — a new source replaces whatever was running
         * rather than adding to it.
         *
         * @param seconds How long the boost runs.
         */
        /** Monotonic count of boost sources fired. Telemetry only — nothing in the sim reads it. */
        protected boostGrantCount: number;
        /** Which source last fired. Telemetry only. */
        protected lastBoostSource: EKartBoostSource;
        /** Records that a source fired. The presentation layer's entire view of the boost economy. */
        protected recordBoostGrant(source: EKartBoostSource): void;
        grantBoost(seconds: number, source?: EKartBoostSource): void;
        /**
         * `Player.cs:539-541` — the trick landing, and the one source that is a FLOOR.
         *
         * `if (Boost_time < 0.9f) Boost_time = 0.9f;`. Written as a floor so that landing a trick in
         * the middle of a 2.5 s drift payout cannot cut it to 0.9 — which an assignment would, and
         * which would make tricking mid-boost a punishment.
         *
         * @param seconds The minimum the boost must be running for.
         */
        floorBoost(seconds: number, source?: EKartBoostSource): void;
        /**
         * `Player.cs:1824-1866`. The drift payout, by tier.
         *
         * 0.75 / 1.5 / 2.5 seconds at charge boundaries of 1.5 / 4 / 7 s — so the first tier costs
         * 1.5 s of charge and returns half of it, the second costs 4 and returns 1.5, and only the
         * third pays back a meaningful fraction of what it cost. The curve is deliberately bad value
         * at the top: the reason to hold a drift to 7 s is the 2.5 s of `boost_speed`, not the ratio.
         *
         * @param tier 1, 2 or 3. Tier 0 never reaches here — `stopDrift` does not pay it.
         */
        protected payDriftBoost(tier: number): void;
        /**
         * `Player.cs:272-274`, `403` — the rocket start's charge.
         *
         * Call once per frame while the pre-race countdown is running. The window is **1 to 2 seconds
         * of held throttle**: under a second is too eager, over two is a burnout, and both grant
         * nothing. Releasing the throttle resets the clock (`403`), so there is no way to bank the
         * charge and no way to hold it safely — which is the whole tension of the start line.
         *
         * @param dt Seconds since the last call.
         */
        chargeLaunch(dt: number): void;
        /**
         * `Player.cs:272-278`. The green light. Grants 1 s of boost if the charge landed in the window.
         *
         * **THE COMPARISON IS INCLUSIVE HERE AND STRICT IN UNITY, AND THAT IS A DIVERGENCE THAT WAS
         * BEING DESCRIBED AS FIDELITY.** `Player.cs:272` is
         * `if(beforeStartAccelTime > 1 && beforeStartAccelTime < 2)` — **strict at both ends**. This
         * line is `>= 1 && <= 2`. Until this was read against the source, `tests/KartBoost.test.ts`
         * asserted in prose that `>= 1 && <= 2` was "the comparison the source actually writes", which
         * is exactly D-8's signature: the port checked against its own description of the donor rather
         * than against the donor.
         *
         * **The behaviour is left as it is, deliberately, and the reason is in that same test.**
         * Frame-driven accumulation cannot land on either boundary: 60 frames of `1/60` sum to
         * 0.9999999999999999, one ulp under 1, and 60 frames of `1/30` sum to 2.0000000000000027, a
         * few ulps over 2. So both endpoints are unreachable by the only route a player has, and the
         * two comparisons agree on every charge anyone can actually produce. Changing it would move a
         * shipped, pinned edge to buy agreement on a pair of values no accumulator can hit.
         *
         * What it costs is that a SYNTHETIC charge — one `chargeLaunch(1)` call, which is how the edge
         * is probed — is granted here and refused in Unity. Recorded rather than hidden, because the
         * one thing that must not happen again is the port's own convenience being written down as the
         * source's behaviour.
         *
         * @returns Whether the rocket start was granted, so a race manager can play the effect.
         */
        releaseLaunch(): boolean;
        /** Last frame's drift button, so entry can fire on the PRESS rather than on the hold. */
        protected previousDrifting: boolean;
        /**
         * **T37.** A press that could not be spent yet, still waiting for `canEnterDrift()`.
         *
         * `Player.cs:1639-1830` is TWO INDEPENDENT BLOCKS and this port had collapsed them into one:
         *
         *   * `1649` — `GetKeyDown(V) && !GLIDER_FLY && !JUMP_PANEL && onGround`. The hop. It does not
         *     look at the steering at all.
         *   * `1672` — `GetKey(V) && grounded && currentspeed > 40 && Horizontal != 0 && ...`. The
         *     drift. `GetKey`, not `GetKeyDown`: re-evaluated EVERY frame the button is held, so it
         *     starts the moment the steering arrives, however long after the press that is.
         *
         * Collapsing them made the press the only moment the machine would ever look, and D-4's steer
         * requirement — which is right, and stays — was attached to that single moment. The cost was
         * the canonical gesture: **press drift, then steer into the apex, and nothing ever happened.**
         * Measured on the running bench at 65 u/s, drift held 2.5 s: steering 250 ms after the press
         * gave `Drift_time 0.000`, and 700 ms after gave `Drift_time 0.000`. Steering strictly BEFORE
         * the button drifted normally, by a margin as small as one 17 ms frame.
         *
         * **AND WHAT IT IS NOT, because the first draft of this docblock got it wrong and the test file
         * added in the same change said so.** It claimed the SAME-frame case was broken too, and
         * therefore that `drive(1, -1, true)` — the docblock below calls that the kart's only input
         * surface — meant no AI, race manager or replay could ever start a drift. **That is false.**
         * With steering and the button genuinely arriving together, `pressed` and `canEnterDrift()`
         * are both true on that one frame and the OLD code entered fine; the same-frame tests below
         * are green against the pre-fix implementation and are regression guards, not evidence. A
         * bench row labelled "same frame" did measure `0.000`, but two synchronous DOM dispatches are
         * not a proof of same-frame DELIVERY, and the headless path is the decisive measurement here.
         * The real cost is the one thing measured cleanly at both ends: a press that arrives BEFORE
         * its steer — every human corner, and any caller that presses drift while still straightening.
         *
         * **No expiry, and none should be invented.** Unity's latch is literally "the button is still
         * down", and `canEnterDrift()` already refuses while gliding, on a jump panel, spun out or off
         * the ground. The latch is CONSUMED on entry, which is what keeps
         * `tests/KartDriftMachine.test.ts:390` honest — a press whose entry aborts on `canHoldDrift`
         * must not re-fire on each of the next 839 frames.
         *
         * **TWO DIVERGENCES STAY, DELIBERATELY, AND ARE RECORDED RATHER THAN TAKEN ON:**
         *
         *   1. Unity slams `rotate_strength = 5` on the PRESS (`1667`, inside the hop block); this
         *      port does it inside `enterDrift()`, so a deferred entry defers the slam with it. A
         *      neutral press therefore keeps full steering authority for the frames where Unity would
         *      have cut it to a fifth.
         *   2. Because `1672` is re-evaluated every frame, Unity RESUMES a drift whose hold conditions
         *      failed while the button is still down. This port does not — the latch was consumed at
         *      the first entry — which is the behaviour `KartDriftMachine.test.ts:760` pins.
         *
         * And the direction is now better than either side. Unity's `1625` is
         * `direction = Horizontal > 0 ? 1 : -1` with no zero case, so its neutral press latches
         * `drift_direction = -1` and the kart drifts LEFT whichever way the player then turns — D-4's
         * bug exactly. The port refused the wrong direction by refusing the drift. This takes the
         * direction from the steering that actually arrived.
         */
        protected driftPressLatched: boolean;
        /**
         * Seconds since the current drift was entered.
         *
         * Its only consumer is T12's `drifting` latch (**P-1**): the outward lateral force starts
         * `driftLatchDelay` = 0.283 s after entry, which in Unity is an animation event on
         * `KartDriftHop.anim` and here is this timer. Counted from the ENTRY, not from the moment the
         * machine reaches `Drift`, because the animation event is on the hop.
         */
        protected driftLatchTimer: number;
        /**
         * `Player.cs:238`, `1639-1890` — `Drift()`, run from `Update` and not from `FixedUpdate`.
         *
         * That placement is Unity's and is kept: the entry is a BUTTON EDGE, and sampling an edge on
         * the physics step would drop presses whenever the frame rate ran ahead of the solver.
         */
        protected drift(dt: number): void;
        /**
         * `Player.cs:1649` — may a drift be ENTERED this frame?
         *
         * The ground test is the SEPARATE length-1 probe (§E.7), not the alignment ray: a kart may be
         * within `groundRayDist` = 2 of the deck and still be too far off it to start a drift.
         *
         * The steer requirement is **D-4**: Unity's `1625` has no zero case, so a neutral hop falls
         * through to "left" and latches a drift the player never asked for. Requiring a held steer
         * above `driftLatchThreshold` removes that without changing anything about a drift the player
         * did ask for.
         */
        protected canEnterDrift(): boolean;
        /**
         * `Player.cs:1672` — may the drift be HELD this frame?
         *
         * `currentspeed` and not `REALCURRENTSPEED`: the 40 here is Unity's, and it reads the decreed
         * speed. Using the measured one would make a kart sliding wide at the drift's own 14° of slip
         * (T12) fail the test it currently passes, and would lose the charge on the very corners the
         * mechanic exists for.
         */
        protected canHoldDrift(): boolean;
        /**
         * `Player.cs:1649-1667`. Enters the drift.
         *
         * No impulse, no vertical anything: the four assignments below plus the visual triggers ARE
         * the entry.
         */
        protected enterDrift(): void;
        /**
         * Ends the drift.
         *
         * @param payout `true` only for the button-up branch at `1808`. Everything else is `1799`,
         *               which zeroes the charge and pays nothing.
         */
        protected stopDrift(payout: boolean): void;
        /**
         * Drift-entry visual triggers — the hop, the shake, and the `Drift` animator trigger.
         *
         * The hop is gated on `hopEnabled`; the shake is NOT (FR-5: `hopEnabled = false` removes the
         * lift and leaves everything else exactly as it was).
         */
        protected onDriftEntry(): void;
        /**
         * Drift-exit visual triggers.
         *
         * Nothing one-shot fires here: the model yaw unwinds through `releaseDriftModelYaw`, which
         * `steer()` already calls every step the kart is not drifting.
         */
        protected onDriftExit(): void;
        /**
         * The node every channel in this section writes. Resolved in `start()`, `null` on a rig
         * without one — in which case the whole section is inert rather than throwing.
         */
        protected modelNode: BABYLON.TransformNode;
        /**
         * The model child's authored local offset, captured once in `start()`.
         *
         * Every channel here is an offset FROM the rest pose, not an absolute position. On the bench
         * rig that distinction is invisible — `KartModel` sits at the origin — but a Unity-exported
         * kart may well have its chassis mesh authored a little forward or a little down, and writing
         * `position.set(...)` absolutely would snap it to the parent origin on the very first frame
         * (T26).
         */
        private readonly modelRestPosition;
        /**
         * `TOOLKIT.AnimationState` on the kart, if a rigged asset supplied one.
         *
         * The seam between the procedural curves and real clips (T26). Not a fallback in the usual
         * sense: it is checked PER TRIGGER, so a kart whose animator has a drift clip but no shake
         * gets the real drift and the procedural shake.
         */
        protected animator: any;
        /**
         * Whether a real `Drift` clip owns the model's drift POSE, not just its entry event.
         *
         * The hop and the shake are one-shots and stand down by simply not being started
         * (`fireTrigger` returning true is enough). The ±20° drift yaw is not a one-shot — it is
         * composed onto the model every single frame — so it needs its own gate, or a rigged kart
         * whose drift clip already yaws the body would get the yaw twice.
         *
         * Read live rather than cached at `start()`, because an animator can arrive late: a kart
         * assembled from a loaded glTF may not have its `AnimationState` attached until the container
         * is instantiated, and a cached `false` would leave the procedural yaw fighting the clip for
         * the rest of the session.
         */
        protected animatorOwnsDriftPose(): boolean;
        /**
         * Does a `TOOLKIT.AnimationState` own the wheel nodes? (T26)
         *
         * The wheel equivalent of `animatorOwnsDriftPose`, and it exists for the same reason: T25's
         * `applyWheelPose` rewrites `position` and `rotationQuaternion` every frame, **including at pose
         * zero**, so on a rigged kart shipping real wheel clips the two would fight for the same nodes
         * every frame and the animator would lose half of them.
         *
         * **THE TRIGGER NAME IS PORT-INTRODUCED, AND IT HAD TO BE.** The first version asked about
         * `"AntiGravity"`, which is already the CHASSIS-LIFT trigger this component fires on the model
         * child (T14, `EnterAntiGravity.anim`). That collision broke it both ways: a Unity animator
         * declaring `AntiGravity` for the body lift lost all wheel motion — steer, spin, swing and arm
         * scale — even with no wheel clips at all; and a kart with real wheel clips but no `AntiGravity`
         * parameter had its wheels driven twice, which is the exact fight this gate exists to prevent.
         *
         * Unity's animator declares no wheel trigger of its own, because in Unity the wheels are moved
         * by `movingCarParts()` in code and never by a clip. So `KartWheels` is a name this port adds,
         * and an animator that wants the wheels announces itself with it.
         */
        protected animatorOwnsWheels(): boolean;
        /** Current model yaw, degrees. `+20` drifting right, `-20` left, 0 otherwise (`1561`/`1579`/`1626`). */
        protected driftYaw: number;
        /** Playhead for `KART_HOP_TRACK`, seconds. Negative when the channel is idle. */
        protected hopTime: number;
        /** Playhead for `KART_SHAKE_TRACK`. */
        protected shakeTime: number;
        /** Playhead for `KART_ANTIGRAVITY_TRACK`. */
        protected antiGravityLiftTime: number;
        /** Playhead for `KART_IDLE_TRACK`. */
        protected idleTime: number;
        /** How far into the held underwater drift pose the body is, 0 to 1. */
        protected underwaterBlend: number;
        /** Which way the underwater pose leans: the drift hand at the moment it armed. */
        protected underwaterHand: number;
        /** Was the kart at rest last frame? The idle settle fires on the edge, not on the state. */
        protected wasAtRest: boolean;
        /** Was anti-gravity on last frame? Same reason. */
        protected wasAntiGravity: boolean;
        /** Reused model rotation, so composing three channels a frame allocates nothing. */
        private readonly modelRotation;
        /**
         * Hands a Unity trigger name to `TOOLKIT.AnimationState`, if there is one.
         *
         * The full set is the one Unity's animator declares — `Drift`, `Shake`, `AntiGravity`,
         * `StartBoostTilt`, `HitLeft`, `HitRight`, `BananaHit`, `ShellHit`, `Glide1`, `Glide2` — and
         * the names are carried verbatim so a kart rigged in Unity needs no mapping table.
         *
         * @returns `true` if an animator took it, in which case the procedural channel for that
         *          trigger stands down and the clip owns the motion.
         */
        protected fireTrigger(name: string): boolean;
        /**
         * Advances every procedural channel and composes them onto the model child.
         *
         * Runs from `update()` — these are frame-rate visuals with no bearing on the solver, and
         * running them on the physics step would make them stutter on a machine whose frame rate and
         * step rate differ.
         */
        protected updateModelMotion(dt: number): void;
        /**
         * Advances the one-shot playheads and fires the ones that are edge-triggered.
         *
         * Split from the composition so that a rig with no model child still runs its triggers — the
         * animator seam has to work whether or not the procedural channels have anywhere to write.
         */
        private tickModelTriggers;
        /** Current model yaw, degrees — `+20` drifting right, `-20` left, 0 otherwise. */
        getDriftYaw(): number;
        /** The model child's local `y` this frame, units. The sum of every one-shot curve plus the pose. */
        getModelLift(): number;
        /** The node every FR-11 channel writes, or `null` on a rig without one. */
        getModelNode(): BABYLON.TransformNode;
        /** `OutOfBounds.cs:8`. In a `Water` volume; drives the extra local downforce while sinking. */
        protected FellInWater: boolean;
        /** `OutOfBounds.cs:10`. In an `OutOfBounds` volume. */
        protected outOfBounds: boolean;
        /** `OutOfBounds.cs:13`. **The camera skips its whole update while this is set.** */
        PlayerBeingMoved: boolean;
        /**
         * `RACE_MANAGER.cs:34` — the green light. Written one way by the race manager.
         *
         * While `false` the kart runs `GroundNormalRotation()` and nothing else: the probe still
         * fires, the chassis still settles onto the contact normal, the launch charge still accrues
         * through `chargeLaunch`, and `move()`/`steer()`/`drift()` do not run. **Defaults to `true`**
         * — see the block comment above.
         */
        RACE_STARTED: boolean;
        /**
         * `RACE_MANAGER.cs:35` — the finish. Written one way by the race manager.
         *
         * Gates the DRIFT only (`Player.cs:237`), never the locomotion. See the block comment above
         * for why the locomotion half of Unity's gate is deliberately not transcribed (FR-6.6).
         */
        RACE_COMPLETED: boolean;
        /**
         * `Player.cs:2409`, called from `LapCounter.cs:58` when the race is won.
         *
         * **A PUBLIC ENTRY POINT, AND IT IS NOT `stopDrift(false)`.** The protected `stopDrift`
         * early-returns on `EKartDriftState.Boost` — deliberately, so `endDriftOnCoast` cannot erase a
         * payout the instant the player lifts off the throttle — so a bare `stopDrift(false)` is a
         * **no-op for the whole 0.75-2.5 s payout window**, which is exactly the window a kart is in
         * when it crosses the line on a charged final corner. Widening the modifier alone would have
         * shipped a race-end drift stop that silently did nothing on the most likely crossing.
         *
         * **AND IT IS NOT `clearTransientState()` EITHER (D-12).** That method's docblock says it is
         * "a separate method precisely so the race path cannot drift into it", and the difference bites
         * here: it calls `grantBoost(0)`, which would delete the payout the player just earned. Unity's
         * `stopDrift()` clears the drift machine and never touches `Boost_time` (`2409-2440`), so this
         * does the same: it clears the machine unconditionally and leaves the boost economy alone.
         *
         * **WHAT THAT ADDS UP TO IS A DIVERGENCE, NOT FIDELITY, AND AN EARLIER VERSION OF THIS
         * DOCBLOCK CLAIMED THE OPPOSITE.** It said a boost surviving the line is "what Unity does".
         * It is not. `stopDrift()` alone does not kill the boost, but Unity never relies on it to:
         * `Player.cs:419-429` — the whole `RACE_COMPLETED` branch — sets `Boost_time = 0`, `Boost =
         * false` and stops the boost emitters **every frame** after the line, while `steerOnPath()`
         * and `moveOnPath()` drive the kart home. So in Unity a payout does NOT survive the finish;
         * it is killed by the branch that also takes the car away from the player.
         *
         * That whole branch is unported, because the port has no AI path system (FR-6.6), and the boost
         * kill goes with it deliberately rather than by omission: the player is still DRIVING after the
         * line here, and confiscating a boost they earned on the final corner from a kart they are
         * still steering would be a worse answer than either of Unity's. Recorded as a divergence so
         * that whoever lands the AI path system finds a decision here and not an oversight — if the
         * kart ever stops being the player's at the line, `Boost_time = 0` comes back with it.
         *
         * The press latch goes too: the player is very likely still holding the button as they cross,
         * and D-11's latch has no expiry by design, so leaving it set would re-enter a drift on the
         * next frame the gate allowed one.
         */
        raceStopDrift(): void;
        /** Seconds until the next stage of the recovery. */
        private respawnTimer;
        /** 0 idle, 1 waiting to teleport (water only), 2 waiting to restore dynamics. */
        private respawnStage;
        /** Where the recovery puts the kart. Supplied by a checkpoint, or by the bench. */
        private readonly respawnPosition;
        /** The rotation the recovery restores. Unity teleports position AND rotation. */
        private readonly respawnRotation;
        /**
         * Starts a recovery to a checkpoint (`OutOfBounds.cs:47-48`, `146-147`).
         *
         * Checkpoint TRACKING is out of scope for this port — a race manager owns that — so this is
         * the seam: hand it a place and the kart takes itself there.
         *
         * @param immediate `true` for the `OutOfBounds` path (teleport now), `false` for `Water`
         *                  (sink for 0.5 s first).
         */
        respawnTo(position: BABYLON.Vector3, rotation: BABYLON.Quaternion, immediate?: boolean): void;
        /** Whether a recovery is running. */
        isRespawning(): boolean;
        /**
         * Seconds the ground probe may find nothing before the kart rights itself. **0 disables it.**
         *
         * Zero by default ON PURPOSE. Nothing in `Player.cs` does this, so a kart left at the default
         * is a numerically exact port and every trajectory this project has measured is unchanged;
         * turning it on is a deliberate act by whoever owns the scene. Same shape as `hopEnabled` —
         * a capability expressed as a property rather than as a fork of the component.
         */
        stuckRecoveryDelay: number;
        /** How far above its own position the recovery lifts the kart before setting it down. */
        stuckRecoveryLift: number;
        /** Seconds the probe has been missing while no state legitimately explains it. */
        protected stuckTimer: number;
        /** Reusable target for the recovery, so a stuck kart does not allocate every step. */
        private readonly stuckRecoveryPosition;
        /** Reusable rotation for the recovery. */
        private readonly stuckRecoveryRotation;
        /**
         * Whether the kart is in a state that legitimately has no ground under it.
         *
         * **ANTI-GRAVITY IS DELIBERATELY NOT ON THIS LIST, and that took a wrong first attempt to see.**
         * It looks like the most obvious member — a kart on a barrel wall is the picture of "upside
         * down on purpose" — and putting it here disabled the safety net in precisely the failure it
         * was written for. Anti-gravity is a LATCH that only an `AntiGravityFalse` volume clears, so a
         * kart that has fallen out of a barrel without crossing one still carries the flag; excusing
         * the flag means excusing exactly the kart that is stuck. Driven on the bench with it excused,
         * a kart thrown clear of the tube sailed to y = 190 with the probe reading `miss`, the flag
         * still set, and the recovery sitting on its hands.
         *
         * It costs nothing to leave it out, because a kart genuinely ON a barrel is not groundless: the
         * probe lands every single step of a roll — T38 measured a full traverse at 30, 60 and 240 Hz
         * and found **zero** probe misses. Two seconds of continuous nothing while flagged anti-gravity
         * does not describe a kart on a wall; it describes a kart that is no longer on anything.
         *
         * The other three stay because each is SELF-LIMITING — a trick, a panel flight and a glide all
         * end on their own — whereas anti-gravity ends only when a volume says so, which is the whole
         * difference.
         */
        protected hasGroundlessExcuse(): boolean;
        /** Advances the stuck timer and rights the kart when it expires. Inert while the delay is 0. */
        protected tickStuckRecovery(dt: number): void;
        /**
         * Rights the kart IN PLACE, keeping the heading it had.
         *
         * Through `respawnTo`, which already teleports safely — kinematic, velocities zeroed, the
         * camera gated by `PlayerBeingMoved`, dynamics restored half a second later — so this adds no
         * new teleport path and inherits every test that one has. In place rather than to a checkpoint
         * because a kart that got stuck may have done nothing wrong, and yanking it across the level
         * for a small mistake is a worse experience than setting it back on its wheels.
         *
         * The heading is taken from the kart's own forward, FLATTENED — and this is DEFENSIVE, not
         * corrective, which an adversarial pass had to establish because the first version of this
         * paragraph claimed otherwise. It said reading the yaw straight off an inverted quaternion is
         * "off by 180 degrees as often as not". Measured across the same six inverted attitudes —
         * roll 180 and 170, pitch 180 and 170, pitch 120 with roll 150, pitch 100 with roll 20 — but
         * swept across 361 headings at T44, the two decompositions agree to within 2.33e-6 degrees,
         * not the 5e-7 this used to claim. Equivalent on everything reachable here either way.
         *
         * The flattening stays anyway, because it is well defined for ANY attitude by construction and
         * because "the direction the nose points along the ground" is the property actually wanted.
         * T44: `transform.forward` is CACHED, so fired on a MOVING kart this keeps the heading from
         * BEFORE that step's steer — bounded at one step (2.625 deg at 30 Hz) only because the write
         * is ONE-SHOT. Make it repeat every frame and it is T41. See `KartTransformReads.test.ts`.
         */
        protected recoverFromStuck(): void;
        /** Hook for a bench, a HUD or a race manager. Does nothing here. */
        protected onStuckRecovery(): void;
        /** Seconds the probe has been missing with no state to explain it. */
        getStuckTime(): number;
        /**
         * **T39.** Clears the state a VOLUME would normally have cleared, for a caller that has to
         * produce a known starting point without one.
         *
         * `respawnTo` deliberately does NOT do this and must not start: it is a port of
         * `OutOfBounds.cs`, which clears `FellInWater`, `outOfBounds` and the velocity and touches no
         * mode flag — and in a race that is correct, because a checkpoint inside an anti-gravity
         * section has to hand the kart back still in anti-gravity. This is the other caller: a bench
         * reset, a track editor, a test fixture. It is a separate method precisely so the race path
         * cannot drift into it.
         *
         * **The DRIFT MACHINE is in here, and it was not until an adversarial pass drove it.** Pressing
         * the bench's reset on a charged drift used to leave `driftState = Drift` and `Drift_time` at
         * 2.983 s straight through the teleport, and then **pay the boost out at the spawn point** —
         * `getBoostGrantCount()` 0 to 1, source `DriftPayout`. A method whose contract is "a known
         * state" cannot leave a boost in flight. It ends through `stopDrift(false)`, the
         * conditions-failed branch, so the charge is discarded and NOTHING is paid: a reset is not a
         * corner the player finished.
         *
         * **`previousDrifting` is set to the CURRENT input rather than to false**, and the difference is
         * the whole point. Zeroing it manufactures a rising edge on the very next frame for a player
         * who simply never let go of the button, which re-latches the press this method just cleared —
         * measured, the kart re-entered its drift on the same frame either way, so clearing the latch
         * did precisely nothing. Copying the live input instead means a held button stays held: no
         * edge, no latch, and the player has to actually press again. `driftPressLatched` is cleared
         * for the same reason it exists (T37) — a press that had not found its steer yet must not
         * survive into a fresh run.
         */
        clearTransientState(): void;
        /** Whether the camera should hold still (`Camerafollow.cs:44`). */
        isPlayerBeingMoved(): boolean;
        /** The teleport itself: kinematic, velocity zeroed, position AND rotation written. */
        private performRespawnTeleport;
        /**
         * Advances the recovery timers. Called from `updateKartState`, which is Unity's `Update`.
         *
         * The `FellInWater` downforce that `OutOfBounds.cs:22-26` also runs in `Update` is NOT here —
         * it lives in `move()`. Unity can add a force from `Update` because `AddForce` buffers until
         * the next physics step; this port's accumulator is zeroed at the START of each step, so
         * anything added outside a step is silently discarded before it can be committed. Adding it
         * inside the step is the same thing PhysX ends up doing, and it is the only place it works.
         */
        private tickRespawn;
        /** `OutOfBounds.cs:30`/`105`. Entering a recovery volume. Called from the trigger handler. */
        protected onRecoveryVolume(tag: string): void;
        /**
         * Sets the place a recovery returns to. A race manager calls this from its checkpoint logic;
         * the bench calls it once with `KartLabGround`'s fixed spawn.
         */
        setRespawnPoint(position: BABYLON.Vector3, rotation: BABYLON.Quaternion): void;
        /**
         * The single point at which this component writes the body's velocity.
         *
         * One write per step, at the end, of `assignedVelocity + pendingAcceleration · dt` — the
         * exact composition PhysX performs when it drains Unity's force buffer after `FixedUpdate`.
         * Keeping it to one place is what makes the assigned-velocity model (FINDING 0) checkable:
         * if the kart is moving in a way no line above decreed, it is not this component doing it.
         */
        private commitVelocity;
        /**
         * Ports Unity's state table for the probe length (`Player.cs:247-259`, `569-574`).
         *
         * The 247-259 branch READS as a state table and is not one — the `JUMP_PANEL || antiGravity`
         * arm and the `else` arm both assign **2** (Analysis §E.6). So there are only ever three real
         * cases, and they are the three below.
         */
        private updateGroundRayDistance;
        /**
         * One ray per step, from `raycastPos` along `-transform.up` (`Player.cs:2028-2031`).
         *
         * The acceptance test is `normal.y > 0.5f || antiGravity` (`2031`) — a 60 degree limit on how
         * steep a surface may be and still count as ground, lifted entirely under anti-gravity, which
         * is one of the three conditionals FR-7 turns out to be.
         */
        private probeGround;
        /**
         * The SEPARATE, shorter drift-entry probe (`Player.cs:1642-1645`).
         *
         * Length **1**, not `groundRayDist` (Analysis §E.7) — a genuinely different ray, and porting
         * it as the same one would let a drift be entered from further off the ground than Unity
         * allows. Same filter, same normal test.
         */
        private probeDriftEntryGround;
        /**
         * Slerps the chassis onto the contact normal at **7.5 per second** (`Player.cs:2037`).
         *
         * THREE THINGS ABOUT THIS ONE LINE:
         *
         * 1. **7.5 is the only alignment rate in the game.** The `if(antiGravity)` branch at 2034
         *    that aligns at `1 · dt` sits inside an `if(!antiGravity)` block and can never execute
         *    (Analysis §E.5); the real anti-gravity path at 2062-2064 also uses 7.5. Anyone porting
         *    from a line-anchored read will find the 1 and ship a kart that will not follow a ramp.
         * 2. **It is the ONLY thing that orients the kart.** The body cannot rotate itself (FINDING
         *    0), so commenting this call out leaves the kart flat on a ramp — which is the A/B that
         *    proves the mechanism, and the reason the file says so out loud.
         * 3. **The rate gap it opens is the view's LAG, not the lean.** 7.5 here against the camera's 3
         *    and the model child's 8. All three are a requirement rather than tuning values — but this
         *    line used to claim the gap IS the visible chassis lean, and T15 measured that and it is
         *    false. The roll is the camera adopting the track's banking and is rate-independent above
         *    about 1/s; equalising the rates shortens the lag and leaves the tilt. See D-5.
         *
         * Unity writes `Quaternion.Lerp(current, FromToRotation(up, normal) * current, 7.5f * dt)`.
         * Two deliberate differences: the `t` is `1 - exp(-7.5·dt)` rather than `7.5·dt`, which is
         * the same curve at 50 Hz and the same curve at every other rate; and the interpolation is a
         * true slerp rather than Unity's normalised lerp, which for a per-frame `t` around 0.12
         * differ by well under a tenth of a degree.
         */
        private alignToGroundNormal;
        /** Before the physics step: the ground probe, the pace table, the heading and the velocity. */
        protected stepKartState(): void;
        /** After the physics step: reads back what the solver actually did. */
        protected fixedKartState(): void;
        /** Releases observers and timers. */
        protected destroyKartState(): void;
        /**
         * The kart's ONLY input surface.
         *
         * Everything that can drive this kart — the bench HUD, a race manager, an AI, a replay, a
         * unit test — calls this and nothing else. The component deliberately does not read
         * `InputController` itself: a component that samples the keyboard cannot be driven by an
         * opponent AI, and a component that cannot be driven by an AI cannot ship in a race.
         *
         * @param throttle  -1 (reverse) to +1 (accelerate).
         * @param steering  -1 (left) to +1 (right). Magnitude is meaningful, not just the sign.
         * @param drifting  Drift button held.
         * @param trick     Trick button pressed this frame.
         * @param pitch     Glider pitch, +1 nose up / -1 nose down. Independent of the throttle.
         */
        drive(throttle: number, steering: number, drifting: boolean, trick?: boolean, pitch?: number): void;
        /** The decreed scalar speed, units/second (`Player.cs:16`). */
        getCurrentSpeed(): number;
        /** Nose-local `z` of the ACTUAL body velocity, units/second (`Player.cs:1319`). */
        getRealCurrentSpeed(): number;
        /** The drift state machine's current state. */
        getDriftState(): EKartDriftState;
        /** Charge accumulated in the current drift, seconds. */
        getDriftTime(): number;
        /** Payout tier the current charge has reached: 0 none, 1 at 1.5 s, 2 at 4 s, 3 at 7 s. */
        getDriftTier(): number;
        /**
         * The three charge boundaries this kart is using, seconds.
         *
         * **THE SINGLE SOURCE OF TRUTH FOR EVERY TIER CUE.** `StandardKartEffects` recolours the
         * sparks at these times and `StandardKartAudio` retriggers the charge tone at them; both read
         * this rather than carrying their own copy, because the sparks and the tone are the player's
         * only warning that a tier armed and a cue that fires at a different time than the payout is
         * worse than no cue at all. Returns a copy so a consumer cannot retune the kart by writing
         * through it.
         */
        getDriftTierTimes(): number[];
        /** Current steering authority (`Player.cs:23`). */
        getRotateStrength(): number;
        /** Seconds of boost left (`Player.cs:39`). Every boost source in the game writes this one number. */
        getBoostTime(): number;
        /** Whether a boost of any kind is running (`Player.cs:8`), and therefore whether the cap is `boost_speed`. */
        isBoosting(): boolean;
        /** The live speed cap, units/second (`Player.cs:14`). */
        getMaxSpeed(): number;
        /** Seconds of throttle held before the start (`Player.cs:272`). The rocket-start window is 1-2 s. */
        getLaunchCharge(): number;
        /**
         * The spark colour the current charge has armed, or `null` below the first tier.
         *
         * Particles are out of scope for this port, but the colours are not cosmetic: they are the
         * player's ONLY cue that a tier has armed, so a HUD or a particle system needs to be able to
         * ask. The 4.0 s and 7.0 s arming points (`1755`, `1776`) coincide with the second and third
         * payout boundaries; the first spark arms with the first payout band at 1.5 s.
         */
        getSparkColor(): string | null;
        /** Yaw applied this frame, degrees/second. */
        getYawRate(): number;
        /** Angle between the velocity and the nose, degrees. */
        getSlipAngle(): number;
        /** Latest accepted ground normal, world space. */
        getGroundNormal(): BABYLON.Vector3;
        /**
         * The COLLISION flag (`Player.cs:28`), not the raycast — **and it is sticky**, see
         * `attachCollisionEvents`. Every Unity gameplay branch reads this one; use `isAirborne()` if
         * what you want is "is the kart actually off the ground".
         */
        isGrounded(): boolean;
        /** Whether the ground PROBE missed this step. The honest airborne test. */
        isAirborne(): boolean;
        /** Whether the ground probe landed this step. */
        isProbeGrounded(): boolean;
        /** Distance from `raycastPos` to the accepted ground hit, units. `-1` when the probe missed. */
        getGroundDistance(): number;
        /** The live, state-dependent probe length, units. */
        getGroundRayDistance(): number;
        /** In any drift state other than `None` — which includes the post-release payout. */
        isDrifting(): boolean;
        /**
         * Which way the current drift is latched: `-1` left, `+1` right, `0` none (`Player.cs:31`).
         *
         * Distinct from the steering INPUT, and deliberately so: a drift latched right stays latched
         * right while the player counter-steers left, which is the whole of FR-4's 4.2x radius range.
         */
        getDriftDirection(): number;
        /** Seconds since the current drift was entered. The `drifting` latch reads this (**P-1**). */
        getDriftLatchTime(): number;
        /**
         * Whether the drift's 20 u/s outward push is live — the `drifting` sub-flag (**P-1**).
         *
         * Distinct from `isDrifting()`, and the distinction is the feel: a drift is entered
         * immediately and BITES `driftLatchDelay` = 0.283 s later. Between the two the kart is in a
         * drift that is not yet sliding.
         */
        isDriftLatched(): boolean;
        /** The glider is open. */
        isGliding(): boolean;
        /** Seconds since the canopy opened. The 3 s and 6 s marks both change how the glider flies. */
        getGlidingTime(): number;
        /** The trick variant is running — entered above `GLIDER_TRICK_SPEED`. */
        isGliderTrick(): boolean;
        /** Seconds until the canopy opens on the trick variant, or `-1`. */
        getGliderOpenDelay(): number;
        /** The glider's pitch, degrees. Nose-DOWN is positive, as Unity has it. */
        getGliderPitch(): number;
        /** The glider's roll, degrees. */
        getGliderRoll(): number;
        /** Flying the ARCADE glider rather than the Unity project's. */
        isArcadeGlider(): boolean;
        /**
         * ARCADE. The glide SLOPE the kart is descending on, degrees. 0 when the source model is on.
         *
         * Separate from `getGliderPitch()` on purpose — see `gliderSlope`. The attitude is what the
         * kart looks like; this is what it is doing, and the two differ exactly when the floor binds.
         */
        getGliderSlope(): number;
        /**
         * ARCADE. The sink rate the pitch input is currently asking for, u/s, positive downward.
         *
         * Reports the TARGET, not the kart's actual descent, which is the approach's business and
         * which an updraught or a panel impulse may legitimately have far away from this figure.
         * Returns 0 when the source model is selected, where no such target exists.
         */
        getGliderSinkTarget(): number;
        /**
         * The volume's pitch trim and roll, as the glider is flying them.
         *
         * The PAIR form, kept for callers that want both at once. The camera reaches them one axis at
         * a time through `getGlideAngleX()` / `getGlideAngleZ()` below, because that is the shape
         * `IKartCameraTarget` uses for every duck-typed volume payload — see the note there.
         */
        getGlideAngles(): {
            x: number;
            z: number;
        };
        /**
         * The active glider volume's `glideAngleX` — the camera rig's PITCH trim while gliding.
         *
         * **`IKartCameraTarget.getGlideAngleX`, and T49's whole fix is that this exists.** Unity
         * relays the payload to the camera itself at `Player.cs:1114-1115` — entering a
         * `GliderPanelFly` trigger writes `Cam.glideAngleX` and `Cam.glideAngleZ` from the volume's
         * `GetGlideAngle` component, right beside the kart's own copies at `1111-1112`. This port
         * read the payload into the two protected fields above and had no route onward, so
         * `Camerafollow.cs:84`'s target was permanently `Euler(0, yaw, 0)` and a volume authoring a
         * trim was framed level because the number never arrived. It is the same D-8/D-9 family
         * defect as `Camerafollow.offset`: nothing looked broken, because the default stands.
         */
        getGlideAngleX(): number;
        /** The active glider volume's `glideAngle` — the rig's ROLL trim while gliding. As above. */
        getGlideAngleZ(): number;
        /** Seconds left on a `GliderPanel` exit impulse, or 0. */
        getGliderImpulseTime(): number;
        /** Anti-gravity is active. */
        isAntiGravity(): boolean;
        /**
         * The active anti-gravity volume's `rotAmountX`, degrees — **for the CAMERA, not the kart**.
         *
         * A track author leans the view into a barrel with these two numbers; the kart's own handling
         * is untouched by them. Exposed here rather than pushed at the camera because the dependency
         * only runs one way (FR-0): `StandardKartCamera` duck-types the kart, and the kart knows
         * nothing about any camera.
         */
        getAntiGravityRotAmountX(): number;
        /** The active anti-gravity volume's `rotAmountZ`, degrees. For the camera. */
        getAntiGravityRotAmountZ(): number;
        /**
         * The active anti-gravity volume asked the camera to rotate (`Player.cs:1043`). For the camera.
         *
         * Narrower than `isAntiGravity()` — see `antiGravityRotateCam`. False outside anti-gravity,
         * false inside a volume authored `rotateCam: false`, and false again after the exit volume.
         */
        isAntiGravityCamRotate(): boolean;
        /** An `AntiGravityExitRotate` payload is still steering the kart back to the world frame. */
        isAntiGravityExiting(): boolean;
        /** How many anti-gravity entry volumes the kart is inside. Telemetry for the bench readout. */
        getAntiGravityVolumeCount(): number;
        /**
         * `Player.cs:1439`. On a jump-panel flight.
         *
         * Public because the camera reads it: a launched kart's rig drops to 0.4/s and deliberately
         * falls behind (`Camerafollow.cs:97`). It is also what suppresses ground alignment for the
         * whole flight.
         */
        isJumpPanelling(): boolean;
        /**
         * The live launch force during a jump-panel flight. NEGATIVE IS UP — see `upForce`.
         *
         * Exposed because it is the only readable thing that distinguishes the two halves of a flight:
         * the arc has no apex event, just this number crossing zero.
         */
        getJumpPanelForce(): number;
        /** Seconds left on a `JumpPanelRotate` volume's forced rotation, or 0. */
        getJumpPanelRotateTime(): number;
        /** A trick's upward push is running. */
        isTricking(): boolean;
        /** Seconds into the trick push, or `-1`. */
        getTrickTime(): number;
        /** A `TrickCollider` has been touched, so a trick is allowed until the next landing. */
        isTrickArmed(): boolean;
        /** A trick was performed this flight and its landing still owes the 0.9 s boost floor. */
        isTrickPending(): boolean;
        /** Front-wheel steer angle, degrees. Presentation only — see `updateWheels`. */
        getWheelSteer(): number;
        /** Accumulated wheel roll, radians. */
        getWheelSpin(): number;
        /** How far into the anti-gravity wheel pose, 0 to 1. */
        getWheelAntiGravity(): number;
        /**
         * On a `Dirt` surface (`Player.cs:502`).
         *
         * Exposed because dirt is the one surface that produces its cap INDIRECTLY — by clearing
         * `grounded` rather than by writing a speed — so without this a bench readout shows
         * `grounded` going dark with no labelled cause and the state has to be inferred. See the
         * note on `onDirt` for why the flag itself is telemetry and not the mechanism.
         */
        isOnDirt(): boolean;
        /**
         * How many times a boost source has fired since this component started.
         *
         * MONOTONIC, AND THE ONLY HONEST WAY TO SEE A GRANT FROM OUTSIDE. See `EKartBoostSource` for
         * the full argument; the short version is that `Boost_time` is an assignment, so a shorter
         * grant landing on a longer running boost lowers it, and any "did it rise?" detector both
         * misses that and invents grants that Unity does not fire effects for.
         *
         * Read it with `getLastBoostSource()`: a change in this number means "a source fired THIS
         * frame", and the source says which one.
         */
        getBoostGrantCount(): number;
        /** Which source last wrote `Boost_time`. Meaningful only alongside `getBoostGrantCount()`. */
        getLastBoostSource(): EKartBoostSource;
        /**
         * `IN_WATER` (`OutOfBounds.cs:8`, read at `Player.cs:1710`).
         *
         * Exposed for the presentation layer, which is the only thing that reads it: the drift-entry
         * dust is suppressed underwater. The flag's real limitation is documented on
         * `KART_UNDERWATER_ROLL_DEGREES` — today it means "fell in and is about to be respawned"
         * rather than "driving through the shallows" — and that limitation is inherited by anything
         * gating on this, so read that note before treating a `false` here as "dry".
         */
        isFellInWater(): boolean;
        /**
         * `RACE_MANAGER.RACE_COMPLETED`, as a method.
         *
         * The field is already public and the race mode writes it every frame, so this adds no state
         * — it exists so the presentation layer can read the flag through a DUCK-TYPED interface
         * instead of reaching for a field by name. `StandardKartAudio.IKartAudioTarget` declares it
         * `isRaceCompleted?()` and uses it for one thing: `Player.cs:1193` refuses the glider trick
         * voice once the race is over.
         */
        isRaceCompleted(): boolean;
    }
}
declare namespace PROJECT {
    /**
     * The kart surface this component actually uses.
     *
     * DUCK-TYPED ON PURPOSE, exactly as `StandardKartCamera`'s `IKartCameraTarget` is: FR-0 requires
     * each of these be one self-contained module, and the UMD promotion combines them into the same
     * namespace where a cross-import would be circular. Declaring the surface as an interface
     * documents the contract without creating the dependency — and lets a test drive the whole
     * presentation layer from a plain object, which is most of why the state machine below is
     * testable at all.
     *
     * Every non-optional member already exists on `StandardKartController`.
     */
    interface IKartEffectsTarget {
        /** `EKartDriftState` as a number: 0 none, 1 hop, 2 drift, 3 paying out. */
        getDriftState(): number;
        /** `Drift_time` — the charge, seconds. Every tier boundary reads this and only this. */
        getDriftTime(): number;
        /**
         * The kart's three charge boundaries, seconds — ascending.
         *
         * **OPTIONAL, AND THE FALLBACK IS UNITY'S OWN 1.5/4/7.** The spark recolour is the player's
         * only visual warning that a payout tier armed, so it MUST fire at the same times the payout
         * pays. Those times are tunable on the controller, and a component carrying its own copy
         * would recolour at 1.5 s while the release paid at 0.8 — a cue that lies. A stand-in target
         * that cannot report them keeps the source's constants, which is the honest default.
         */
        getDriftTierTimes?(): number[];
        /** The `drifting` sub-flag: true only after P-1's 0.283 s latch (`Player.cs:1710` gates on it). */
        isDriftLatched(): boolean;
        /** `-1` drifting left, `+1` drifting right, `0` none (`Player.cs:1678`/`1694`). */
        getDriftDirection(): number;
        /** `Boost_time` — seconds of boost left. */
        getBoostTime(): number;
        /**
         * Monotonic count of boost sources fired. A CHANGE means "a source fired this frame".
         *
         * OPTIONAL, and the fallback when it is absent is deliberately the WORSE behaviour rather than
         * no behaviour: a stand-in target in a test can drive the burst with `getBoostTime()` alone,
         * and gets the rise heuristic that the real kart no longer needs. See `tickBoostEffects`.
         */
        getBoostGrantCount?(): number;
        /** Which source last fired — `EKartBoostSource` as a number. Optional, as above. */
        getLastBoostSource?(): number;
        /** Whether a boost is running (`Player.cs:1913`). Drives the exhaust flames as a level. */
        isBoosting(): boolean;
        /** Anti-gravity is active — stands in for the animator's `SpinLeft`/`SpinRight` (see below). */
        isAntiGravity(): boolean;
        /** A trick is in the air (`Player.cs:1184`). */
        isTricking(): boolean;
        /** Grounded. Its rising edge is the landing puff. */
        isGrounded(): boolean;
        /** Spark colour for tier 1, `#RRGGBB`. Optional — the component carries Unity's own default. */
        sparkTier1Color?: string;
        /** Spark colour for tier 2, `#RRGGBB`. */
        sparkTier2Color?: string;
        /** Spark colour for tier 3, `#RRGGBB`. */
        sparkTier3Color?: string;
        /**
         * `IN_WATER` (`Player.cs:1710`) — suppresses the drift dust.
         *
         * OPTIONAL. A stand-in target in a test, or a race manager driving this with something that is
         * not a kart, should not have to model a water volume it has no concept of.
         */
        isFellInWater?(): boolean;
    }
    /**
     * One named emitter group — Unity's `DriftPS`, `BoostBurstPS` and friends, each a node whose
     * CHILDREN are the actual particle systems.
     *
     * The group is the unit the port plays and stops, because that is the unit `Player.cs` plays and
     * stops: every call site loops the children and calls `Play()` or `Stop()` on all of them.
     */
    interface IKartEmitterGroup {
        /** Unity's node name — the thing `resolveGroup` looks for on an exported kart. */
        name: string;
        /** The node the systems hang from, or `null` when neither found nor built. */
        mount: BABYLON.TransformNode | null;
        /** The toolkit particle components this group drives. Empty is legal and means "no render". */
        systems: TOOLKIT.ShurikenParticles[];
        /** Whether the PORT has asked this group to run. The state machine's own truth. */
        playing: boolean;
        /** True when this group was built here rather than found on an exported kart. */
        placeholder: boolean;
        /** Unity's `moveWithTransform` for this group: 0 Local, 1 World. See `applySimulationSpace`. */
        simulationSpace: number;
        /**
         * Whether `isLocal` has been pushed onto this group's systems yet.
         *
         * IT CANNOT BE DONE AT REGISTRATION, which is the whole reason this flag exists. A
         * `ShurikenParticles` built here has not run its own `awake()` when `registerGroup` returns —
         * `SceneManager.AttachScriptComponent` only enrols it in the lifecycle — so
         * `getParticleSystem()` is still null and a write there silently does nothing. The first
         * version of this did exactly that and reported success while changing not one system.
         */
        simulationSpaceApplied: boolean;
    }
    /**
     * Babylon standard kart effects — the particle driver for `PROJECT.StandardKartController`.
     * @class StandardKartEffects
     *
     * THE ONE THING TO UNDERSTAND ABOUT THE DRIFT'S FEEDBACK, because it is not what it looks like:
     * the dust and the sparks **deliberately do not overlap**. The dust runs for the first second
     * only (`1710`) and the sparks arm at 1.5 s (`1732`), so there is a half-second of nothing in
     * between. The dust is the *entry* tell — "you are in a drift" — and the sparks are the *charge*
     * tell — "a payout is armed, and this colour is which one". Merging them, or starting the sparks
     * at entry because it looks better, destroys the only channel that tells a player when to
     * release. That is the whole mechanic, and it is why every boundary below is transcribed rather
     * than tuned.
     */
    class StandardKartEffects extends TOOLKIT.ScriptComponent {
        /**
         * The kart, duck-typed (see `IKartEffectsTarget`).
         *
         * Left null, `initEffectsState` resolves `PROJECT.StandardKartController` off this component's
         * own transform — which is where an exported kart puts it.
         */
        kart: IKartEffectsTarget;
        /** The node placeholder emitters hang from. Defaults to the kart's model child, then the root. */
        mountNode: BABYLON.TransformNode;
        /** Scene-graph name of the model child, for a glTF-loaded kart that cannot pass a reference. */
        modelNodeName: string;
        /** Master switch. `false` stops every group and runs no state machine. */
        effectsEnabled: boolean;
        /** The tiered drift sparks (`Player.cs:1732-1793`). */
        sparksEnabled: boolean;
        /** The drift-entry dust (`Player.cs:1709-1729`). */
        driftDustEnabled: boolean;
        /** The one-shot burst on any boost grant (`Player.cs:1835`/`1850`/`1864`). */
        boostBurstEnabled: boolean;
        /** The exhaust flames while a boost runs (`Player.cs:1910-1931`). */
        boostFlamesEnabled: boolean;
        /** The anti-gravity spin trails (`Player.cs:1526-1546`). */
        antiGravSpinEnabled: boolean;
        /** The trick particles (`Player.cs:1184`). */
        trickParticlesEnabled: boolean;
        /** The landing puff (`Player.cs:173`, `groundLandParticles`). */
        groundLandEnabled: boolean;
        /**
         * Build placeholder emitters when a group's node is absent or carries no particle systems.
         *
         * `true` on the bench, which is the whole reason a red box can show a tier change today.
         * Set `false` and the state machine still runs in full and drives nothing — which is both the
         * headless test configuration and the correct behaviour on a kart whose art is not loaded yet.
         */
        createPlaceholderEmitters: boolean;
        /** `Player.cs:206` — the drift spark root; child 0 is the RIGHT wheel, child 1 the LEFT. */
        driftPSNodeName: string;
        /** `Player.cs:206`. */
        rightWheelDriftNodeName: string;
        /** `Player.cs:207`. */
        leftWheelDriftNodeName: string;
        /** `Player.cs:1714`. */
        driftDustLeftNodeName: string;
        /** `Player.cs:1719`. */
        driftDustRightNodeName: string;
        /** `Player.cs:281`. */
        boostBurstNodeName: string;
        /** `Player.cs:45`. */
        boostPSNodeName: string;
        /** `Player.cs:177`. */
        antiGravSpinNodeName: string;
        /** `Player.cs:1184`. */
        trickParticlesNodeName: string;
        /** `Player.cs:173`. */
        groundLandNodeName: string;
        /** Tier 1 spark colour. Unity `drift1`. */
        sparkTier1Color: string;
        /** Tier 2 spark colour. Unity `drift2`. */
        sparkTier2Color: string;
        /** Tier 3 spark colour. Unity `drift3`. */
        sparkTier3Color: string;
        /** Every group, by Unity name, so the HUD and the tests can enumerate rather than guess. */
        protected readonly groups: Map<string, IKartEmitterGroup>;
        /** The colour currently written onto the spark systems, or `null` when they are stopped. */
        protected activeSparkColor: string;
        /** Last frame's `Boost_time`. Only the fallback detector reads it. */
        protected lastBoostTime: number;
        /** Last frame's `getBoostGrantCount()`. A CHANGE is a grant — see `tickBoostEffects`. */
        protected lastBoostGrantCount: number;
        /** How many bursts have fired. Telemetry, and the cleanest thing for a test to count. */
        protected boostBurstCount: number;
        /** `particleSystemAntigravSpinTimer` (`Player.cs:178`). */
        protected antiGravSpinTimer: number;
        /** Whether the spin trail is armed — the stand-in for being in `SpinLeft`/`SpinRight`. */
        protected antiGravSpinArmed: boolean;
        /** Last frame's anti-gravity flag, for the rising edge that arms the spin. */
        protected lastAntiGravity: boolean;
        /** Last frame's trick flag, for the one-shot edge. */
        protected lastTricking: boolean;
        /** Last frame's grounded flag, for the landing puff's edge. */
        protected lastGrounded: boolean;
        /** Scratch, so the recolour allocates nothing per frame. */
        private readonly scratchColor;
        /**
         * ESM-ONLY — DELETE WHEN PORTING BACK.
         *
         * The runtime build constructs components from metadata and has no per-class constructor;
         * step 2 of the promotion recipe deletes this whole member.
         */
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        /** Reads the Inspector property bag. Every knob above is settable from exported metadata. */
        protected awakeEffectsState(): void;
        /** Resolves the kart, the mount, and every emitter group. */
        protected initEffectsState(): void;
        /** Placeholder emitters are this component's; found ones belong to the asset and are left alone. */
        protected destroyEffectsState(): void;
        /** One frame of the presentation layer. Reads the kart; writes nothing but emitters. */
        protected updateEffectsState(): void;
        /**
         * `Player.cs:1709-1793` and `1872-1888` — the dust, the sparks, and the tier recolour.
         *
         * TWO UNITY QUIRKS ARE TRANSCRIBED HERE RATHER THAN TIDIED, and both are load-bearing:
         *
         *   1. **`Play()` is called ONLY in the tier-1 branch** (`1745-1748`). Tiers 2 and 3 recolour a
         *      system that is already running and never start one. In Unity a charge always passes
         *      through [1.5, 4) on its way up, so this is invisible — but it means the sparks are
         *      genuinely "started once at 1.5 s and recoloured twice", not "restarted per tier", and
         *      a driver that restarted them would visibly stutter the emission at each boundary.
         *   2. **The first spark tier is 1.5 s while the first PAYOUT tier is also 1.5 s, yet the
         *      colour does not change until 4.0.** The port keeps that: `getDriftTier()` and the spark
         *      colour agree at every boundary, and neither is "corrected" to the other.
         *
         * ONE DELIBERATE DIVERGENCE, called out rather than buried. Unity's stop branch is
         * `if (!Input.GetKey(V))` — the BUTTON, not the state — so losing the charge below speed 40
         * (`1799`) zeroes `Drift_time` while leaving the sparks emitting at their last colour until
         * the player lets go. This port stops them when the drift STATE ends, because
         * `StandardKartController.stopDrift(false)` genuinely leaves the drift on charge loss and
         * sparks advertising a payout that no longer exists would be a lie to the player. The
         * simulation is unaffected either way; this is a presentation choice and it is recorded here
         * so it is not mistaken for a transcription error.
         */
        protected tickDriftEffects(): void;
        /**
         * `Player.cs:1910-1931` (flames) and the burst call sites.
         *
         * THE BURST IS SIGNALLED, NOT INFERRED — AND THE FIRST VERSION OF THIS METHOD GOT THAT WRONG.
         *
         * It detected a grant as a RISE in `Boost_time`, reasoning that all seven sources write that
         * one number. They do, but the reasoning does not survive the table in `EKartBoostSource`,
         * because Unity fires a DIFFERENT subset of effects at each source and the subsets do not
         * line up:
         *
         *   - The BOOST PAD (`507`) grants and does NOT burst. The rise heuristic burst there anyway.
         *   - `grantBoost` is an ASSIGNMENT, faithfully mirroring Unity, so a 0.75 s tier-1 payout
         *     landing on a running 2 s panel boost LOWERS `Boost_time`. That is a real grant that
         *     Unity bursts for, and the heuristic saw a fall and did nothing.
         *   - The TRICK LANDING (`541`) is a floor that may raise nothing at all, and Unity does not
         *     burst there — so even a perfect "did the clock change" detector would still be wrong.
         *
         * A single number cannot carry which of seven things wrote it. So the kart now reports the
         * source, and the POLICY lives here as a set, where the `Player.cs` line behind every
         * membership decision sits beside it.
         *
         * The rise heuristic survives only as the fallback for a target that does not implement the
         * signal — a hand-written stand-in in a test. A degraded burst is more useful there than none,
         * and it is labelled so that nobody mistakes it for the mechanism.
         */
        protected tickBoostEffects(): void;
        /**
         * `Player.cs:1526-1546` — the anti-gravity spin trails.
         *
         * TWO THINGS ABOUT THE ORIGINAL, both preserved:
         *
         *   1. **The 0.95 / 1.01 pair is not arbitrary.** Unity's own comment says why: "this timer
         *      thing is limited to 0.95 seconds because when the animation returns to original state,
         *      the trail gets weird". The trail is cut just before the spin clip settles. Round either
         *      number and the artifact it exists to hide comes back.
         *   2. **`A || B && C` in C# is `A || (B && C)`.** So `SpinLeft` alone plays the trail
         *      regardless of the timer, and only `SpinRight` is timer-gated. That is almost certainly
         *      a typo in the original and it is transcribed anyway — but it cannot be reproduced here
         *      without the animator, so this port applies the timer to BOTH and says so.
         *
         * THE STAND-IN, and its limit. Unity reads `GetCurrentAnimatorStateInfo(2).IsName("SpinLeft")`
         * on the model's animator. There is no rigged kart yet and no `TOOLKIT.AnimationState` to ask,
         * so the trail is armed on the RISING EDGE of anti-gravity instead — which is when those clips
         * fire — and runs on the same timer. When a rigged kart ships real `SpinLeft`/`SpinRight`
         * states, this read moves to the animator and the timer stays exactly as it is.
         */
        protected tickAntiGravSpin(dt: number): void;
        /** The trick puff (`1184`) and the landing puff, both pure edges. */
        protected tickOneShots(): void;
        /** Asks a group to run. Idempotent — Unity guards every `Play()` with an `isPlaying` check. */
        protected playGroup(name: string): void;
        /** Stops a group. Idempotent for the same reason. */
        protected stopGroup(name: string): void;
        /**
         * Restarts a group from zero — the one-shot bursts.
         *
         * Unity calls a bare `Play()` on a NON-looping system, which restarts it. Here the group may
         * already be marked playing from a previous burst that has not finished, so the stop is
         * explicit rather than relying on the emitter's own retrigger semantics.
         */
        protected restartGroup(name: string): void;
        /** Stops everything. The master switch, and `destroy`. */
        protected stopAllGroups(): void;
        /** Writes one colour onto every spark system in both wheel groups (`1742-1743`). */
        protected applySparkColor(hex: string): void;
        /**
         * Sets a group's start colour through the toolkit component's own particle system.
         *
         * `ShurikenParticles.configureMainModule` writes `color1` and `color2` from
         * `main.startColor.color` for a `mode: 0` gradient, so writing both here is the same
         * assignment the export performs — not a bypass of the component.
         */
        protected writeGroupColor(name: string, hex: string): void;
        /** Where placeholders hang: the model child if there is one, else this component's transform. */
        protected resolveMountNode(): BABYLON.TransformNode;
        /**
         * Applies Unity's simulation space to a group's systems, because the toolkit does not.
         *
         * **THIS IS THE SINGLE BIGGEST VISUAL FIX IN THE FILE, and it was invisible until the bench
         * was driven at speed.**
         *
         * Unity's `moveWithTransform: 0` is LOCAL simulation space: a particle, once born, keeps
         * moving with the emitter. It is why Mario Kart's drift sparks sit glued to the wheels instead
         * of smearing into a trail — and it is measured, not assumed. **Every** system in
         * `WheelParticles.prefab` (12) and `ParticlesBoostBurst.prefab` (6) carries it.
         *
         * `ShurikenParticles.configureMainModule` reads `main.simulationSpace`, but only to decide
         * what the EMITTER is:
         *
         *     if (main.simulationSpace === 1) ps.emitter = mesh.getAbsolutePosition().clone();
         *     else                            ps.emitter = mesh;
         *
         * That makes the SPAWN POINT follow the kart. It never touches `ParticleSystem.isLocal`, which
         * is Babylon's actual local-space simulation flag — the string does not appear anywhere in the
         * component. So an authored "Local" system spawns at the right place and then simulates in
         * world space, i.e. it behaves exactly like Unity's WORLD setting.
         *
         * At a standstill the difference is invisible. At 95 u/s with a 0.18 s lifetime the exhaust is
         * left seventeen units behind the kart — behind and below a chase camera that sits nine units
         * back — so the boost flames were reported alive, were genuinely being simulated, and could
         * not be seen at all. That is how this was found, and it is why "the component says it is
         * running" is not evidence that an effect works.
         *
         * COMPOSITION, NOT REPLACEMENT. This sets one documented Babylon property on the system the
         * toolkit itself hands out through `getParticleSystem()` — the same accessor and the same kind
         * of write as the tier recolour onto `color1`/`color2`. Nothing is reimplemented. **Delete
         * this the moment `ShurikenParticles` maps `isLocal` itself**, and it is worth reporting
         * upstream, because an exported kart hits the identical gap.
         */
        protected applySimulationSpace(group: IKartEmitterGroup): boolean;
        /**
         * Runs the deferred emitter fix-ups on any group whose systems have finished initialising.
         *
         * Two of them, both for the same reason — a `ShurikenParticles` is not configured until its
         * own `awake()` runs, so neither can be done at registration.
         */
        protected ensureSimulationSpace(): void;
        /**
         * Undoes the toolkit's world-space application of Unity's SCREEN-space size clamp.
         *
         * THIS EXISTS FOR THE EXPORT PATH, and the placeholders' `RENDERER_MAX_PARTICLE_SIZE` is
         * explicitly NOT enough to cover it. `configureRendererModule` ends with:
         *
         *     const maxSize = renderer.maxParticleSize ?? 0.5;
         *     if (ps.maxSize > maxSize) ps.maxSize = maxSize;
         *
         * The placeholders here dodge it by authoring the field. **A Unity export cannot**: Unity
         * serializes `m_MaxParticleSize` on every renderer, and its value is `0.5` on all twelve
         * systems in `WheelParticles.prefab` and all six in `ParticlesBoostBurst.prefab` — because in
         * Unity that field is a fraction of VIEWPORT HEIGHT, for which 0.5 is a perfectly ordinary
         * setting. Applied as a world-space clamp it truncates the maximum alone, leaving
         * `minSize > maxSize` on any emitter authored above half a unit.
         *
         * So the exported kart this port exists to run walks straight back into the bug the constant
         * was added to escape, and it would look identical: emitters reporting alive, sizes reporting
         * plausible, and the range quietly inverted.
         *
         * THE REPAIR IS DELIBERATELY THE NARROWEST ONE THAT IS DEFENSIBLE. It fires only when the
         * range is actually inverted, and it restores the maximum to the minimum — which is where
         * `configureMainModule` had both of them for a `mode: 0` start size before the clamp ran. It
         * does not touch a genuine random range (`min < max`), and it does not second-guess an author
         * who set a real world-space clamp, because such an author would not have produced an
         * inversion in the first place.
         *
         * Delete this, and `applySimulationSpace`, when the toolkit stops converting a screen-space
         * field into a world-space one. Both are worth the upstream report.
         */
        protected repairInvertedSizeRange(group: IKartEmitterGroup): void;
        /**
         * The Unity simulation space a group's systems were authored with.
         *
         * For a group this component BUILT, it is the recipe's own value. For a group FOUND on an
         * exported kart the authored bag lives in the toolkit component's private
         * `m_systemProperties`, which is read here defensively rather than not at all: an exported
         * Local system hits the same gap, and silently leaving it in world space would reintroduce
         * exactly the bug documented above on the very kart this port exists to run.
         */
        protected resolveSimulationSpace(group: IKartEmitterGroup, kind: string): number;
        /** Depth-first search for a descendant by exact name. */
        protected findChildNode(name: string): BABYLON.TransformNode;
        /**
         * Builds the whole group table.
         *
         * The five spark systems per wheel, the two dust systems per side and the two flames are
         * Unity's own counts (`1735` loops five, `1714` plays two children, `1915` loops two).
         */
        protected buildGroups(): void;
        /**
         * Resolves one group: prefer the export's emitters, fall back to placeholders.
         *
         * @param key      the driver's own name for the group
         * @param nodeName Unity's node name to look for
         * @param parent   the node it sits under on an exported kart, when it is nested
         * @param count    how many systems Unity's own loops expect
         * @param offset   local mount offset for the placeholder, units
         * @param kind     which placeholder recipe to build
         */
        protected registerGroup(key: string, nodeName: string, parent: BABYLON.TransformNode, count: number, offset: BABYLON.Vector3, kind: string): void;
        /** Direct or nested child of a given node, by exact name. */
        protected findNamedChildOf(parent: BABYLON.TransformNode, name: string): BABYLON.TransformNode;
        /** Every `TOOLKIT.ShurikenParticles` hanging off a node, in scene-graph order. */
        protected collectParticleComponents(node: BABYLON.TransformNode): TOOLKIT.ShurikenParticles[];
        /** A placeholder mount at a local offset on the model child. */
        protected createMountNode(name: string, offset: BABYLON.Vector3): BABYLON.TransformNode;
        /**
         * Builds `count` `TOOLKIT.ShurikenParticles` under a mount.
         *
         * ATTACHED WITH `_registerComponentAlias: false` and NOT pushed onto the node's component
         * metadata, unlike the kart's own components in `KartLabRig`. That is deliberate: these are
         * scaffolding, and writing metadata records for them would make a placeholder emitter
         * indistinguishable from an exported one the next time `collectParticleComponents` runs.
         */
        protected createPlaceholderSystems(mount: BABYLON.TransformNode, nodeName: string, count: number, kind: string): TOOLKIT.ShurikenParticles[];
        /**
         * A Unity `MinMaxCurve` in constant mode, with ALL THREE scalars agreeing.
         *
         * **THIS IS DEFENCE IN DEPTH, NOT THE FIX FOR THE INVERTED SIZE RANGE — and an earlier version
         * of this comment claimed otherwise, which is worth correcting in place rather than quietly.**
         *
         * The wrong story was: the merge leaves `constantMax: 1.0` from the defaults, so the maximum
         * came from a leftover. It does leave it, but nothing reads it here.
         * `ShurikenParticles.convertMinMaxCurve` consults `constantMin`/`constantMax` only in curve
         * modes 2 and 3; mode 0 — every curve in every recipe below — returns `{min, max, value}` all
         * from `constant`, and `configureMainModule`'s `case 0` sets `minSize` AND `maxSize` from that
         * one value. Both ends left here at 0.75. The entire inversion was the renderer clamp knocking
         * the maximum alone down to 0.5, which is what `RENDERER_MAX_PARTICLE_SIZE` addresses.
         *
         * So why keep this? Because it authors what a real Unity export authors — Unity serializes all
         * three scalars for every curve — and because the moment any recipe here moves to a mode-2 or
         * mode-3 curve, `constantMin`/`constantMax` become live and a bag carrying only `constant`
         * would silently pick up `0.0` and `1.0`. It is cheap insurance against a future edit, and it
         * is labelled as insurance rather than as a cure.
         */
        protected static Curve(value: number): any;
        /** One placeholder system's Unity-shaped properties. */
        protected static PlaceholderProperties(kind: string, index: number): any;
        /**
         * A drift spark.
         *
         * `simulationSpace: 0` is LOCAL, and it is measured (`moveWithTransform: 0` on every system in
         * `WheelParticles.prefab`). It is also the surprising choice — local-space sparks stay pinned
         * at the wheel instead of trailing behind an 80 u/s kart — so it is called out here to stop it
         * being "fixed" to world on the reasonable-sounding grounds that a trail looks better.
         */
        protected static SparkProperties(index: number): any;
        /** The drift-entry dust. Slower, larger, dimmer than a spark, and it fades. */
        protected static DustProperties(): any;
        /** The one-shot payout burst. Non-looping, so a bare `play()` is a complete gesture. */
        protected static BurstProperties(): any;
        /** The exhaust flames. A LEVEL — looping, and on for exactly the boost's duration. */
        protected static FlameProperties(): any;
        /** The anti-gravity spin trail. Long-lived and world-space so the spin actually draws an arc. */
        protected static SpinProperties(): any;
        /** Whether the port has this group running. The state machine's truth, not the emitter's. */
        isGroupPlaying(name: string): boolean;
        /** How many particle systems back a group. `0` means the channel is running and drawing nothing. */
        getGroupSystemCount(name: string): number;
        /** Whether a group's emitters were built here rather than found on an exported kart. */
        isGroupPlaceholder(name: string): boolean;
        /** Every group name, for a HUD that enumerates rather than hardcodes. */
        getGroupNames(): string[];
        /** The colour currently on the spark systems, or `null` when they are stopped. */
        getActiveSparkColor(): string;
        /** How many payout bursts have fired since the component started. */
        getBoostBurstCount(): number;
        /** `particleSystemAntigravSpinTimer` (`Player.cs:178`). */
        getAntiGravSpinTimer(): number;
        /**
         * Whether a boost source fires `BoostBurstPS`.
         *
         * FIVE OF THE SEVEN DO. The two that do not are the ones a "every grant bursts" reading gets
         * wrong, and each is a deliberate omission in the source rather than an oversight:
         *
         *   `BoostPad`      `507` grants and plays a VOICE (`514`) with no burst at all.
         *   `TrickLanding`  `541` floors the clock and plays `groundLandParticles` (`544`) instead —
         *                   the puff belongs to the landing, not to the boost it happens to grant.
         *
         * `None` does not burst either: an untagged grant is a source that forgot to name itself, and
         * silently bursting for it would hide the omission.
         */
        static SourceBursts(source: number): boolean;
        /** Hex `#RRGGBB` or `#RRGGBBAA` into a `Color4`, in place. Unknown input reads as opaque white. */
        static HexToColor4(hex: string, result: BABYLON.Color4): BABYLON.Color4;
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
