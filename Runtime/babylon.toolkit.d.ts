/** UMD Type References */
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
    * Babylon toolkit scene manager class
    * @class SceneManager - All rights reserved (c) 2024 Mackey Kinard
    */
    class SceneManager {
        /** Gets the toolkit framework version number */
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
        /** The webgl render context has been lost flag */
        static LostRenderContext: boolean;
        /** Set the preload auto update progress flag */
        static AutoUpdateProgress: boolean;
        /** Set the capsule collider shape type */
        static PhysicsCapsuleShape: number;
        /** Set the support srgb buffers flag */
        static SupportSRGBBuffers: boolean;
        /** The animation start mode. Defaults to NONE. */
        static AnimationStartMode: number;
        /** When loading glTF animations, which are defined in seconds, target them to this FPS. Defaults to 30 for for new behavior. Set to 1 for old behavior */
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
        private static _HideLoadingScreen;
        static CVTOOLS_NAME: string;
        static CVTOOLS_MESH: string;
        static CVTOOLS_HAND: string;
        static GetEngine(scene: BABYLON.Scene): BABYLON.Engine | BABYLON.WebGPUEngine;
        private static _EventBus;
        /** Default global event message bus
         * @example
         * ```typescript
         * // Handle myevent message
         * TOOLKIT.SceneManager.EventBus.OnMessage("myevent", (data:string) => {
         *    console.log("My Event Data: " + data);
         * });
         *
         * // Post myevent message
         * TOOLKIT.SceneManager.EventBus.PostMessage("myevent", "Hello World!");
         * ```
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
         * Initialize the babylon toolkit playground environment
         * @param engine The engine instance.
         * @param options The playground options.
         * @returns a waitable promise.
         */
        static InitializePlayground(engine: BABYLON.Engine | BABYLON.WebGPUEngine | BABYLON.AbstractEngine, options?: TOOLKIT.IPlaygroundOptions): Promise<void>;
        /**
         * Initialize the babylon toolkit runtime environment
         * @param engine The engine instance.
         * @param options The playground options.
         * @returns a waitable promise.
         */
        static InitializeRuntime(engine: BABYLON.Engine | BABYLON.WebGPUEngine | BABYLON.AbstractEngine, options?: TOOLKIT.IPlaygroundOptions): Promise<void>;
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
        static HideLoadingScreen(engine: BABYLON.Engine | BABYLON.WebGPUEngine | BABYLON.AbstractEngine): void;
        /** Force the engine loading screen to be hidden (Triple Check Loading Screen Hidden) */
        static ForceHideLoadingScreen(): void;
        private static DoForceHideLoadingScreen;
        /** Focus the scene rendering canvas
         * @param scene The scene instance.
         */
        static FocusRenderCanvas(scene: BABYLON.Scene): void;
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
        static RegisterLoaderPlugins(): void;
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
        /** Gets all the created engine instances */
        static GetEngineInstances(): BABYLON.AbstractEngine[];
        /** Get the last create engine instance */
        static GetLastCreatedEngine(): BABYLON.AbstractEngine;
        /** Get the last created scene instance */
        static GetLastCreatedScene(): BABYLON.Scene;
        /** Add a shadow castor mesh to a shadow light. */
        static AddShadowCaster(light: BABYLON.ShadowLight, transform: BABYLON.TransformNode, children?: boolean): void;
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
        /** Are half or full texture floats supported */
        static TextureFloatSupported(scene: BABYLON.Scene): boolean;
        /** Registers an on pick trigger click action */
        static RegisterClickAction(scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh, func: () => void): BABYLON.IAction;
        /** Unregisters an on pick trigger click action */
        static UnregisterClickAction(mesh: BABYLON.AbstractMesh, action: BABYLON.IAction): boolean;
        /** Starts a targeted float animation for tweening.  */
        static StartTweenAnimation(scene: BABYLON.Scene, name: string, targetObject: any, targetProperty: string, startValue: number, endValue: number, defaultSpeedRatio?: number, defaultFrameRate?: number, defaultLoopMode?: number, defaultEasingFunction?: BABYLON.EasingFunction, onAnimationComplete?: () => void): BABYLON.Animatable;
        /** DEPRECATED: Starts a native javascript tween animation (https://createjs.com/docs/tweenjs/modules/TweenJS.html) */
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
        /** Find game object in the scene hierarchy by path (Parent/Child/GrandChild). */
        static FindGameObject(scene: BABYLON.Scene, path: string): BABYLON.TransformNode;
        /** Find game object with tag */
        static FindGameObjectWithTag(scene: BABYLON.Scene, tag: string): BABYLON.TransformNode;
        /** Find all game objects with tag */
        static FindGameObjectsWithTag(scene: BABYLON.Scene, tag: string): BABYLON.TransformNode[];
        /** Finds all script components on the transform. */
        static FindScriptComponents<T extends TOOLKIT.ScriptComponent>(transform: BABYLON.TransformNode, recursive?: boolean): T[];
        /** Finds a script component on the transform with the specfied class name. */
        static FindScriptComponent<T extends TOOLKIT.ScriptComponent>(transform: BABYLON.TransformNode, klass: string, recursive?: boolean): T;
        /** Finds all script components on the transform with the specfied class name. */
        static FindAllScriptComponents<T extends TOOLKIT.ScriptComponent>(transform: BABYLON.TransformNode, klass: string, recursive?: boolean): T[];
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
        private static NavigationMesh;
        private static CrowdInterface;
        private static PluginInstance;
        /** Register handler that is triggered when the navigation mesh is ready */
        static OnNavMeshReadyObservable: BABYLON.Observable<BABYLON.Mesh>;
        /** Get recast total memory heap size */
        static GetRecastHeapSize(): number;
        /** Gets the recast navigation plugin tools. (Singleton Instance) */
        static GetNavigationTools(): TOOLKIT.RecastJSPluginExtension;
        /** Gets the recast navigation crowd interface. (Singleton Instance) */
        static GetCrowdInterface(scene: BABYLON.Scene): BABYLON.ICrowd;
        /** Has the recast baked navigation data. (Navigation Helper) */
        static HasNavigationData(): boolean;
        /** Gets the current recast navigation mesh. (Navigation Helper) */
        static GetNavigationMesh(): BABYLON.Mesh;
        /** Bake the recast navigation mesh from geometry. (Navigation Helper) */
        static BakeNavigationMesh(scene: BABYLON.Scene, meshes: BABYLON.Mesh[], properties: BABYLON.INavMeshParameters, debug?: boolean, color?: BABYLON.Color3, collisionMesh?: boolean, debugMeshOffset?: number): number;
        /** Load the recast navigation mesh binary data. (Navigation Helper) */
        static LoadNavigationMesh(scene: BABYLON.Scene, data: Uint8Array, debug?: boolean, color?: BABYLON.Color3, timeSteps?: number, collisionMesh?: boolean, debugMeshOffset?: number): number;
        /** Save the recast navigation mesh binary data. (Navigation Helper) */
        static SaveNavigationMesh(): Uint8Array;
        /** Computes a recast navigation path. (Navigation Helper) */
        static ComputeNavigationPath(start: BABYLON.Vector3, end: BABYLON.Vector3, closetPoint?: boolean): BABYLON.Vector3[];
        /** Animate movement along a navigation path. (Navigation Helper) */
        static MoveAlongNavigationPath(scene: BABYLON.Scene, agent: BABYLON.TransformNode, path: BABYLON.Vector3[], speed?: number, easing?: BABYLON.EasingFunction, callback?: () => void): BABYLON.Animation;
        /** Creates a cylinder obstacle and add it to the navigation. (Navigation Helper) */
        static AddNavigationCylinderObstacle(position: BABYLON.Vector3, radius: number, height: number): BABYLON.IObstacle;
        /** Creates an oriented box obstacle and add it to the navigation. (Navigation Helper) */
        static AddNavigationBoxObstacle(position: BABYLON.Vector3, extent: BABYLON.Vector3, angle: number): BABYLON.IObstacle;
        /** Removes an obstacle created by addCylinderObstacle or addBoxObstacle. (Navigation Helper) */
        static RemoveNavigationObstacle(obstacle: BABYLON.IObstacle): void;
        /** Toggle full screen scene mode. */
        static ToggleFullscreenMode(scene: BABYLON.Scene, requestPointerLock?: boolean): void;
        /** Enter full screen scene mode. */
        static EnterFullscreenMode(scene: BABYLON.Scene, requestPointerLock?: boolean): void;
        /** Exit full screen scene mode. */
        static ExitFullscreenMode(scene: BABYLON.Scene): void;
        private static GotoFullscreenBrowser;
        private static RequestBrowserPointerLock;
        private static ExitFromFullscreenBrowser;
    }
}
declare namespace TOOLKIT {
    /**
    * Babylon toolkit recast navigation extension class
    * @class SceneManager - All rights reserved (c) 2024 Mackey Kinard
    */
    class RecastJSPluginExtension implements BABYLON.INavigationEnginePlugin {
        /**
         * Reference to the Recast library
         */
        bjsRECAST: any;
        /**
         * plugin name
         */
        name: string;
        /**
         * The active navmesh. RecastJS plugin extended to support multiple navmeshes.
         */
        navMesh: any;
        navMeshes: any[];
        private _maximumSubStepCount;
        private _timeStep;
        private _timeFactor;
        private _tempVec1;
        private _tempVec2;
        private _worker;
        /**
         * Initializes the recastJS plugin
         * @param recastInjection can be used to inject your own recast reference
         */
        constructor(recastInjection?: any);
        /**
         * Set worker URL to be used when generating a new navmesh
         * @param workerURL url string
         * @returns boolean indicating if worker is created
         */
        setWorkerURL(workerURL: string | URL): boolean;
        /**
         * Set the time step of the navigation tick update.
         * Default is 1/60.
         * A value of 0 will disable fixed time update
         * @param newTimeStep the new timestep to apply to this world.
         */
        setTimeStep(newTimeStep?: number): void;
        /**
         * Get the time step of the navigation tick update.
         * @returns the current time step
         */
        getTimeStep(): number;
        /**
         * If delta time in navigation tick update is greater than the time step
         * a number of sub iterations are done. If more iterations are need to reach deltatime
         * they will be discarded.
         * A value of 0 will set to no maximum and update will use as many substeps as needed
         * @param newStepCount the maximum number of iterations
         */
        setMaximumSubStepCount(newStepCount?: number): void;
        /**
         * Get the maximum number of iterations per navigation tick update
         * @returns the maximum number of iterations
         */
        getMaximumSubStepCount(): number;
        /**
         * Time factor applied when updating crowd agents (default 1). A value of 0 will pause crowd updates.
         * @param value the time factor applied at update
         */
        set timeFactor(value: number);
        /**
         * Get the time factor used for crowd agent update
         * @returns the time factor
         */
        get timeFactor(): number;
        /**
         * Sets the active navigation mesh
         * @param index of the navigation mesh to make active
         * @returns navigation mesh was set as active
         */
        setActiveNavMesh(index: number): boolean;
        /**
         * Get the active navigation mesh
         * @returns active navigation mesh
         */
        getActiveNavMesh(): any;
        /**
         * Get a navigation mesh by index
         * @returns indexed navigation mesh
         */
        getIndexedNavMesh(index: number): any;
        /**
         * Get the total number of navigation meshes
         * @returns number of navigation meshes
         */
        getNavMeshCount(): number;
        /**
         * Get the navigation mesh array
         * @returns navigation mesh array
         */
        getNavMeshArray(): any[];
        /**
         * Create and activate a new navigation mesh
         * @param meshes array of all the geometry used to compute the navigation mesh
         * @param parameters bunch of parameters used to filter geometry
         * @param completion callback when data is available from the worker. Not used without a worker
         * @returns navigation mesh index
         */
        createNavMesh(meshes: Array<BABYLON.Mesh>, parameters: BABYLON.INavMeshParameters, completion?: (navmeshData: Uint8Array) => void): number;
        /**
         * Create a navigation mesh debug mesh
         * @param scene is where the mesh will be added
         * @returns debug display mesh
         */
        createDebugNavMesh(scene: BABYLON.Scene): BABYLON.Mesh;
        /**
         * Get a navigation mesh constrained position, closest to the parameter position
         * @param position world position
         * @returns the closest point to position constrained by the navigation mesh
         */
        getClosestPoint(position: BABYLON.Vector3): BABYLON.Vector3;
        /**
         * Get a navigation mesh constrained position, closest to the parameter position
         * @param position world position
         * @param result output the closest point to position constrained by the navigation mesh
         */
        getClosestPointToRef(position: BABYLON.Vector3, result: BABYLON.Vector3): void;
        /**
         * Get a navigation mesh constrained position, within a particular radius
         * @param position world position
         * @param maxRadius the maximum distance to the constrained world position
         * @returns the closest point to position constrained by the navigation mesh
         */
        getRandomPointAround(position: BABYLON.Vector3, maxRadius: number): BABYLON.Vector3;
        /**
         * Get a navigation mesh constrained position, within a particular radius
         * @param position world position
         * @param maxRadius the maximum distance to the constrained world position
         * @param result output the closest point to position constrained by the navigation mesh
         */
        getRandomPointAroundToRef(position: BABYLON.Vector3, maxRadius: number, result: BABYLON.Vector3): void;
        /**
         * Compute the final position from a segment made of destination-position
         * @param position world position
         * @param destination world position
         * @returns the resulting point along the navmesh
         */
        moveAlong(position: BABYLON.Vector3, destination: BABYLON.Vector3): BABYLON.Vector3;
        /**
         * Compute the final position from a segment made of destination-position
         * @param position world position
         * @param destination world position
         * @param result output the resulting point along the navmesh
         */
        moveAlongToRef(position: BABYLON.Vector3, destination: BABYLON.Vector3, result: BABYLON.Vector3): void;
        private _convertNavPathPoints;
        /**
         * Compute a navigation path from start to end. Returns an empty array if no path can be computed
         * Path is straight.
         * @param start world position
         * @param end world position
         * @returns array containing world position composing the path
         */
        computePath(start: BABYLON.Vector3, end: BABYLON.Vector3): BABYLON.Vector3[];
        /**
         * Compute a navigation path from start to end. Returns an empty array if no path can be computed.
         * Path follows navigation mesh geometry.
         * @param start world position
         * @param end world position
         * @returns array containing world position composing the path
         */
        computePathSmooth(start: BABYLON.Vector3, end: BABYLON.Vector3): BABYLON.Vector3[];
        /**
         * Create a new Crowd so you can add agents
         * @param maxAgents the maximum agent count in the crowd
         * @param maxAgentRadius the maximum radius an agent can have
         * @param scene to attach the crowd to
         * @returns the crowd you can add agents to
         */
        createCrowd(maxAgents: number, maxAgentRadius: number, scene: BABYLON.Scene): BABYLON.ICrowd;
        /**
         * Set the Bounding box extent for doing spatial queries (getClosestPoint, getRandomPointAround, ...)
         * The queries will try to find a solution within those bounds
         * default is (1,1,1)
         * @param extent x,y,z value that define the extent around the queries point of reference
         */
        setDefaultQueryExtent(extent: BABYLON.Vector3): void;
        /**
         * Get the Bounding box extent specified by setDefaultQueryExtent
         * @returns the box extent values
         */
        getDefaultQueryExtent(): BABYLON.Vector3;
        /**
         * Build and activate a new navigation mesh from a previously saved state using getNavmeshData
         * @param data the Uint8Array returned by getNavmeshData
         * @returns navigation mesh index
         */
        buildFromNavmeshData(data: Uint8Array): number;
        /**
         * returns the navmesh data that can be used later. The navmesh must be built before retrieving the data
         * @returns data the Uint8Array that can be saved and reused
         */
        getNavmeshData(): Uint8Array;
        /**
         * Get the Bounding box extent result specified by setDefaultQueryExtent
         * @param result output the box extent values
         */
        getDefaultQueryExtentToRef(result: BABYLON.Vector3): void;
        /**
         * Disposes
         */
        dispose(): void;
        /**
         * Creates a cylinder obstacle and add it to the navigation
         * @param position world position
         * @param radius cylinder radius
         * @param height cylinder height
         * @returns the obstacle freshly created
         */
        addCylinderObstacle(position: BABYLON.Vector3, radius: number, height: number): BABYLON.IObstacle;
        /**
         * Creates an oriented box obstacle and add it to the navigation
         * @param position world position
         * @param extent box size
         * @param angle angle in radians of the box orientation on Y axis
         * @returns the obstacle freshly created
         */
        addBoxObstacle(position: BABYLON.Vector3, extent: BABYLON.Vector3, angle: number): BABYLON.IObstacle;
        /**
         * Removes an obstacle created by addCylinderObstacle or addBoxObstacle
         * @param obstacle obstacle to remove from the navigation
         */
        removeObstacle(obstacle: BABYLON.IObstacle): void;
        /**
         * If this plugin is supported
         * @returns true if plugin is supported
         */
        isSupported(): boolean;
        /**
         * Returns the seed used for randomized functions like `getRandomPointAround`
         * @returns seed number
         */
        getRandomSeed(): number;
        /**
         * Set the seed used for randomized functions like `getRandomPointAround`
         * @param seed number used as seed for random functions
         */
        setRandomSeed(seed: number): void;
    }
    /**
     * Recast detour crowd implementation (Mutiple Navigation Meshes)
     */
    class RecastJSCrowdExtension implements BABYLON.ICrowd {
        /**
         * Recast/detour plugin
         */
        bjsRECASTPlugin: TOOLKIT.RecastJSPluginExtension;
        /**
         * Link to the detour crowd
         */
        recastCrowd: any;
        /**
         * One transform per agent
         */
        transforms: BABYLON.TransformNode[];
        /**
         * All agents created
         */
        agents: number[];
        /**
         * agents reach radius
         */
        reachRadii: number[];
        /**
         * true when a destination is active for an agent and notifier hasn't been notified of reach
         */
        private _agentDestinationArmed;
        /**
         * agent current target
         */
        private _agentDestination;
        /**
         * Link to the scene is kept to unregister the crowd from the scene
         */
        private _scene;
        /**
         * Observer for crowd updates
         */
        private _onBeforeAnimationsObserver;
        /**
         * Fires each time an agent is in reach radius of its destination
         */
        onReachTargetObservable: BABYLON.Observable<{
            agentIndex: number;
            destination: BABYLON.Vector3;
        }>;
        /**
         * Constructor
         * @param plugin recastJS plugin
         * @param maxAgents the maximum agent count in the crowd
         * @param maxAgentRadius the maximum radius an agent can have
         * @param scene to attach the crowd to
         * @returns the crowd you can add agents to
         */
        constructor(plugin: TOOLKIT.RecastJSPluginExtension, maxAgents: number, maxAgentRadius: number, scene: BABYLON.Scene);
        /**
         * Add a new agent to the crowd with the specified parameter a corresponding transformNode.
         * You can attach anything to that node. The node position is updated in the scene update tick.
         * @param pos world position that will be constrained by the navigation mesh
         * @param parameters agent parameters
         * @param transform hooked to the agent that will be update by the scene
         * @returns agent index
         */
        addAgent(pos: BABYLON.Vector3, parameters: BABYLON.IAgentParameters, transform: BABYLON.TransformNode): number;
        /**
         * Returns the agent position in world space
         * @param index agent index returned by addAgent
         * @returns world space position
         */
        getAgentPosition(index: number): BABYLON.Vector3;
        /**
         * Returns the agent position result in world space
         * @param index agent index returned by addAgent
         * @param result output world space position
         */
        getAgentPositionToRef(index: number, result: BABYLON.Vector3): void;
        /**
         * Returns the agent velocity in world space
         * @param index agent index returned by addAgent
         * @returns world space velocity
         */
        getAgentVelocity(index: number): BABYLON.Vector3;
        /**
         * Returns the agent velocity result in world space
         * @param index agent index returned by addAgent
         * @param result output world space velocity
         */
        getAgentVelocityToRef(index: number, result: BABYLON.Vector3): void;
        /**
         * Returns the agent next target point on the path
         * @param index agent index returned by addAgent
         * @returns world space position
         */
        getAgentNextTargetPath(index: number): BABYLON.Vector3;
        /**
         * Returns the agent next target point on the path
         * @param index agent index returned by addAgent
         * @param result output world space position
         */
        getAgentNextTargetPathToRef(index: number, result: BABYLON.Vector3): void;
        /**
         * Gets the agent state
         * @param index agent index returned by addAgent
         * @returns agent state
         */
        getAgentState(index: number): number;
        /**
         * returns true if the agent in over an off mesh link connection
         * @param index agent index returned by addAgent
         * @returns true if over an off mesh link connection
         */
        overOffmeshConnection(index: number): boolean;
        /**
         * Asks a particular agent to go to a destination. That destination is constrained by the navigation mesh
         * @param index agent index returned by addAgent
         * @param destination targeted world position
         */
        agentGoto(index: number, destination: BABYLON.Vector3): void;
        /**
         * Teleport the agent to a new position
         * @param index agent index returned by addAgent
         * @param destination targeted world position
         */
        agentTeleport(index: number, destination: BABYLON.Vector3): void;
        /**
         * Update agent parameters
         * @param index agent index returned by addAgent
         * @param parameters agent parameters
         */
        updateAgentParameters(index: number, parameters: BABYLON.IAgentParameters): void;
        /**
         * remove a particular agent previously created
         * @param index agent index returned by addAgent
         */
        removeAgent(index: number): void;
        /**
         * get the list of all agents attached to this crowd
         * @returns list of agent indices
         */
        getAgents(): number[];
        /**
         * Tick update done by the Scene. Agent position/velocity/acceleration is updated by this function
         * @param deltaTime in seconds
         */
        update(deltaTime: number): void;
        /**
         * Set the Bounding box extent for doing spatial queries (getClosestPoint, getRandomPointAround, ...)
         * The queries will try to find a solution within those bounds
         * default is (1,1,1)
         * @param extent x,y,z value that define the extent around the queries point of reference
         */
        setDefaultQueryExtent(extent: BABYLON.Vector3): void;
        /**
         * Get the Bounding box extent specified by setDefaultQueryExtent
         * @returns the box extent values
         */
        getDefaultQueryExtent(): BABYLON.Vector3;
        /**
         * Get the Bounding box extent result specified by setDefaultQueryExtent
         * @param result output the box extent values
         */
        getDefaultQueryExtentToRef(result: BABYLON.Vector3): void;
        /**
         * Get the next corner points composing the path (max 4 points)
         * @param index agent index returned by addAgent
         * @returns array containing world position composing the path
         */
        getCorners(index: number): BABYLON.Vector3[];
        /**
         * Release all resources
         */
        dispose(): void;
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
        private _lateUpdateObserver;
        resetScriptComponent: () => void;
        /** Gets the script component ready state */
        isReady(): boolean;
        /** Gets the current scene object */
        get scene(): BABYLON.Scene;
        /** Gets the transform node entity */
        get transform(): BABYLON.TransformNode;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, scriptComponentAlias?: string);
        /** Gets the script component class name */
        getClassName(): string;
        /** Sets the script component property bag value */
        protected setProperty(name: string, propertyValue: any): void;
        /** Gets the script component property bag value */
        protected getProperty<T>(name: string, defaultValue?: T): T;
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
        /** Gets the safe transform mesh entity */
        getTransformMesh(): BABYLON.Mesh;
        /** Gets the safe transform abstract mesh entity */
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
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon toolkit universal shader defines pro class
     * @class UniversalShaderDefines - All rights reserved (c) 2024 Mackey Kinard
     */
    class UniversalShaderDefines {
        private _defines;
        constructor();
        getDefines(): any;
        defineBoolean(name: string): void;
        defineNumeric(name: string, value: number): void;
        static ShaderIndexer: number;
    }
    /**
     * Babylon universal albedo chunks pro class
     * @class UniversalAlbedoChunks - All rights reserved (c) 2024 Mackey Kinard
     */
    class UniversalAlbedoChunks {
        constructor();
        Vertex_Begin: string;
        Vertex_Definitions: string;
        Vertex_MainBegin: string;
        Vertex_Before_PositionUpdated: string;
        Vertex_Before_NormalUpdated: string;
        Vertex_After_WorldPosComputed: string;
        Vertex_MainEnd: string;
        Fragment_Begin: string;
        Fragment_Definitions: string;
        Fragment_MainBegin: string;
        Fragment_Custom_Albedo: string;
        Fragment_Custom_Alpha: string;
        Fragment_Before_Lights: string;
        Fragment_Before_Fog: string;
        Fragment_Before_FragColor: string;
        Fragment_MetallicRoughness: string;
        Fragment_MicroSurface: string;
    }
    /**
     * Babylon universal albedo material pro class
     * @class UniversalAlbedoMaterial - All rights reserved (c) 2024 Mackey Kinard
     */
    class UniversalAlbedoMaterial extends BABYLON.PBRMaterial {
        protected universalMaterial: boolean;
        protected locals: TOOLKIT.UniversalShaderDefines;
        protected terrainInfo: any;
        private _defines;
        private _uniforms;
        private _samplers;
        private _attributes;
        private _textures;
        private _vectors4;
        private _floats;
        private _enableTime;
        private _timeInitialized;
        private _createdShaderName;
        protected enableShaderChunks: boolean;
        protected materialShaderChunks: TOOLKIT.UniversalAlbedoChunks;
        protected updateShaderChunks(): void;
        constructor(name: string, scene: BABYLON.Scene, enableTime?: boolean);
        getShaderName(): string;
        getShaderChunk(): string;
        getShaderDefines(): BABYLON.PBRMaterialDefines;
        getCustomAttributes(): string[];
        get enableTime(): boolean;
        set enableTime(state: boolean);
        private updateGlobalTime;
        getTexture(name: string): BABYLON.Texture;
        getVector4(name: string): BABYLON.Vector4;
        getFloat(name: string): number;
        setTexture(name: string, texture: BABYLON.Texture, initialize?: boolean): TOOLKIT.UniversalAlbedoMaterial;
        setVector4(name: string, value: BABYLON.Vector4, initialize?: boolean): TOOLKIT.UniversalAlbedoMaterial;
        setFloat(name: string, value: number, initialize?: boolean): TOOLKIT.UniversalAlbedoMaterial;
        addAttribute(attributeName: string): void;
        checkUniform(uniformName: string): void;
        checkSampler(samplerName: string): void;
        getAnimatables(): BABYLON.IAnimatable[];
        getActiveTextures(): BABYLON.BaseTexture[];
        hasTexture(texture: BABYLON.BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;
        clone(cloneName: string): TOOLKIT.UniversalAlbedoMaterial;
        serialize(): any;
        static Parse(source: any, scene: BABYLON.Scene, rootUrl: string): TOOLKIT.UniversalAlbedoMaterial;
        protected customShaderChunkResolve(): void;
        private _buildCustomShader;
        private _createShaderChunks;
        private dumpEffect;
        private _attachAfterBind;
    }
    /**
     * Babylon universal shader material pro class
     * @class UniversalShaderMaterial
     */
    class UniversalShaderMaterial extends BABYLON.ShaderMaterial {
        private _enableTime;
        constructor(name: string, scene?: BABYLON.Scene, options?: Partial<BABYLON.IShaderMaterialOptions>);
        get enableTime(): boolean;
        set enableTime(state: boolean);
        private updateGlobalTime;
    }
    /**
     * Babylon universal node material pro class
     * @class UniversalNodeMaterial
     */
    class UniversalNodeMaterial extends BABYLON.NodeMaterial {
        private _textures;
        private _vectors4;
        private _floats;
        private _enableTime;
        private _timeInitialized;
        protected compile(): void;
        constructor(name: string, scene?: BABYLON.Scene, options?: Partial<BABYLON.INodeMaterialOptions>);
        get enableTime(): boolean;
        set enableTime(state: boolean);
        private updateGlobalTime;
        getTexture(name: string): BABYLON.Texture;
        getVector4(name: string): BABYLON.Vector4;
        getFloat(name: string): number;
        setTexture(name: string, texture: BABYLON.Texture, initialize?: boolean): TOOLKIT.UniversalNodeMaterial;
        setVector4(name: string, value: BABYLON.Vector4, initialize?: boolean): TOOLKIT.UniversalNodeMaterial;
        setFloat(name: string, value: number, initialize?: boolean): TOOLKIT.UniversalNodeMaterial;
        dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;
        clone(cloneName: string): TOOLKIT.UniversalNodeMaterial;
        serialize(): any;
        static Parse(source: any, scene: BABYLON.Scene, rootUrl: string): TOOLKIT.UniversalNodeMaterial;
    }
    /**
     * Babylon universal terrain material pro class
     * @class UniversalTerrainMaterial
     */
    class UniversalTerrainMaterial extends TOOLKIT.UniversalAlbedoMaterial {
        constructor(name: string, scene: BABYLON.Scene);
        getShaderName(): string;
        getShaderChunk(): string;
        protected updateShaderChunks(): void;
        private formatTerrainVertexDefintions;
        private formatTerrainVertexMainEnd;
        private formatTerrainFragmentDefintions;
        private formatTerrainFragmentUpdateColor;
    }
}
declare namespace TOOLKIT.Simplex {
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
     * Creates a 2D noise function
     * @param random the random function that will be used to build the permutation table
     * @returns {NoiseFunction2D}
     */
    function createNoise2D(random?: RandomFn): NoiseFunction2D;
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
     * Creates a 3D noise function
     * @param random the random function that will be used to build the permutation table
     * @returns {NoiseFunction3D}
     */
    function createNoise3D(random?: RandomFn): NoiseFunction3D;
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
    /**
     * Creates a 4D noise function
     * @param random the random function that will be used to build the permutation table
     * @returns {NoiseFunction4D}
     */
    function createNoise4D(random?: RandomFn): NoiseFunction4D;
    /**
     * Builds a random permutation table.
     * This is exported only for (internal) testing purposes.
     * Do not rely on this export.
     * @private
     */
    function buildPermutationTable(random: RandomFn): Uint8Array;
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
     * Babylon toolkit playground initialization options
     * @param loadProjectScriptBundle load a project script bundle. Default true.
     * @param projectScriptBundleUrl specified project script bundle. Default bundle.
     * @param showDefaultLoadingScreen show the default loading screen. Default false.
     * @param hideLoadingUIWithEngine hide the loading screen with engine.hideLoadingUI. When set to false, you must manually hide the loading screen using TOOLKIT.SceneManager.HideLoadingScreen when the scene is ready. Default true.
     * @param defaultLoadingUIMarginTop The top margin of the loading text. Default 150px.
     */
    interface IPlaygroundOptions {
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
        /** Creates a targeted float animation for tweening.  */
        static CreateTweenAnimation(name: string, targetProperty: string, startValue: number, endValue: number, frameRate?: number, loopMode?: number): BABYLON.Animation;
        /** Gets the last key frame index value. */
        static GetLastKeyFrameIndex(animation: BABYLON.Animation): number;
        /** Private internal frame interpolation helper */
        private static InterpolateAnimation;
        /** Update loop blend root motion metadata settings */
        static UpdateLoopBlendPositionSettings(animationTrack: BABYLON.AnimationGroup, loopBlendPositionY: boolean, loopBlendPositionXZ: boolean): void;
        /** Initialize default shader material properties */
        static InitializeShaderMaterial(material: BABYLON.ShaderMaterial, binding?: boolean, clipPlanes?: BABYLON.Nullable<boolean>): void;
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
        /** TODO */
        static InstantiateClass(className: string): any;
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
        static SearchTransformNodeForScript(klass: string, nodes: BABYLON.Node[]): BABYLON.Node;
        /** TODO */
        static SearchAllTransformNodesForScript(klass: string, nodes: BABYLON.Node[]): BABYLON.Node[];
        /** TODO */
        static CreateGuid(suffix?: string): string;
        /** TODO */
        static ValidateTransformGuid(node: BABYLON.TransformNode): void;
        /** TODO */
        static AddShadowCastersToLight(light: BABYLON.IShadowLight, transforms: BABYLON.TransformNode[], includeChildren?: boolean): void;
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
declare namespace TOOLKIT {
    /**
     * Babylon Toolkit Unity Editor - Loader Class
     * @class CVTOOLS_unity_metadata - All rights reserved (c) 2024 Mackey Kinard
     * [Specification](https://github.com/MackeyK24/glTF/tree/master/extensions/2.0/Vendor/CVTOOLS_unity_metadata)
     */
    const enum MaterialAlphaMode {
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
        mapkey: string;
        material: BABYLON.Material;
        extension: string;
        prefiltered: boolean;
        boundingBoxSize: BABYLON.Vector3;
        boundingBoxPosition: BABYLON.Vector3;
    }
    class CVTOOLS_unity_metadata implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /** The name of this extension. */
        readonly name: string;
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
        private static ScriptBundleCache;
        /** @hidden */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @hidden */
        dispose(): void;
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
        /** @hidden */
        loadSceneAsync(context: string, scene: BABYLON.GLTF2.Loader.IScene): BABYLON.Nullable<Promise<void>>;
        private loadSceneExAsync;
        private _processActiveMeshes;
        private _processUnityMeshes;
        private _processPreloadTimeout;
        /** @hidden */
        loadNodeAsync(context: string, node: BABYLON.GLTF2.Loader.INode, assign: (babylonMesh: BABYLON.TransformNode) => void): BABYLON.Nullable<Promise<BABYLON.TransformNode>>;
        /** @hidden */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.IMaterial, babylonMaterial: BABYLON.Material): BABYLON.Nullable<Promise<void>>;
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
         * Loads a glTF animation.
         * @param context The context when loading the asset
         * @param animation The glTF animation property
         * @returns A promise that resolves with the loaded Babylon animation group when the load is complete
         */
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
        private _setupBabylonMaterials;
        private _processLevelOfDetail;
        private _processShaderMaterials;
        private preProcessSceneProperties;
        private postProcessSceneProperties;
        private _preloadRawMaterialsAsync;
        private _parseMultiMaterialAsync;
        private _parseNodeMaterialPropertiesAsync;
        private _parseShaderMaterialPropertiesAsync;
        private _parseDiffuseMaterialPropertiesAsync;
        private _parseCommonConstantProperties;
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
        /** Is mobile web platform agent. */
        static IsMobile(): boolean;
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
        /** Open alert message dialog. */
        static AlertMessage(text: string, title?: string): any;
        /**  Gets the names query string from page url. */
        static GetQueryStringParam(name: string, url: string): string;
        /** Post a safe message to the top browser window */
        static PostWindowMessage(msg: TOOLKIT.IWindowMessage, targetOrigin?: string, localWindow?: boolean): void;
        /** Loads a new level scene file into the scene viewer (engine.html) */
        static LoadLevel(sceneFile: string, queryString?: string): boolean;
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
        /** Quit the Windows Runtime host application. */
        static QuitWindowsApplication(): void;
        static PrintToScreen(text: string, color?: string): void;
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
        static SPEED: number;
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
        speedRatio: number;
        delayUpdateUntilReady: boolean;
        enableAnimation: boolean;
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
        protected awake(): void;
        protected update(): void;
        protected destroy(): void;
        playDefaultAnimation(transitionDuration?: number, animationLayer?: number, frameRate?: number): boolean;
        playAnimation(state: string, transitionDuration?: number, animationLayer?: number, frameRate?: number): boolean;
        stopAnimation(animationLayer?: number): boolean;
        killAnimations(): boolean;
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
         * Set Smooth Float
         * @param name name of the float
         * @param targetValue the target value
         * @param lerpSpeed the lerp speed factor (0.0 - 1.0)
         */
        setSmoothFloat(name: string, targetValue: number, lerpSpeed: number): void;
        /**
         * Set Smooth Interger
         * @param name the name of the integer
         * @param targetValue the target value
         * @param lerpSpeed the lerp speed factor (0.0 - 1.0)
         */
        setSmoothInteger(name: string, targetValue: number, lerpSpeed: number): void;
        private getMachineState;
        private setMachineState;
        getCurrentState(layer: number): TOOLKIT.MachineState;
        getDefaultClips(): any[];
        getDefaultSource(): string;
        fixAnimationGroup(group: BABYLON.AnimationGroup): string;
        getAnimationGroup(name: string): BABYLON.AnimationGroup;
        getAnimationGroups(): BABYLON.AnimationGroup[];
        setAnimationGroups(groups: BABYLON.AnimationGroup[]): void;
        private updateAnimationGroups;
        private awakeStateMachine;
        private sourceAnimationGroups;
        private updateStateMachine;
        private setupSourceAnimationGroups;
        private destroyStateMachine;
        private updateAnimationState;
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
        private _rolloffmode;
        private _reverbzonemix;
        private _bypasseffects;
        private _bypassreverbzones;
        private _bypasslistenereffects;
        private _initializedReadyInstance;
        private _isAudioPlaying;
        private _isAudioPaused;
        getSoundClip(): BABYLON.StaticSound;
        /** Register handler that is triggered when the audio clip is ready */
        onReadyObservable: BABYLON.Observable<BABYLON.StaticSound>;
        protected awake(): void;
        protected start(): void;
        protected destroy(): void;
        protected awakeAudioSource(): Promise<void>;
        protected startAudioSource(): void;
        protected destroyAudioSource(): void;
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
         * Gets the sound track playback speed
         */
        getPlaybackSpeed(): number;
        /**
         * Sets the sound track playback speed
         * @param rate the audio playback rate
         */
        setPlaybackSpeed(rate: number): void;
        /**
         * Gets the current time of the track
         */
        getCurrentTrackTime(): number;
        /**
         * Gets the spatial sound option of the track
         */
        getSpatialSound(): BABYLON.AbstractSpatialAudio;
        /**
         * Sets the spatial sound option of the track
         * @param value Define the value of the spatial sound
         */
        setSpatialSound(value: BABYLON.AbstractSpatialAudio): void;
        /** Set audio data source */
        setDataSource(source: string | ArrayBuffer): Promise<void>;
        /** Add audio preloader asset tasks (https://doc.babylonjs.com/divingDeeper/importers/assetManager) */
        addPreloaderTasks(assetsManager: TOOLKIT.PreloadAssetsManager): void;
        /** Gets The Current Audo Engine Options */
        static GetAudioOptions(): BABYLON.IWebAudioEngineOptions;
        /** Sets The Current Audo Engine Options */
        static SetAudioOptions(options: BABYLON.IWebAudioEngineOptions): void;
        /** Gets The Current Audo Engine V2 */
        static GetAudioEngine(): Promise<BABYLON.AudioEngineV2>;
        /** Unlocks The Current Audio Engine */
        static UnlockAudioEngine(): Promise<void>;
        /** Create Audio Engine Version 2 Buffered Sound Instance */
        static CreateSoundBuffer(source: ArrayBuffer | AudioBuffer | BABYLON.StaticSoundBuffer | string | string[], options?: Partial<BABYLON.IStaticSoundBufferOptions>): Promise<BABYLON.StaticSoundBuffer>;
        /** Create Audio Engine Version 2 Static Sound Instance */
        static CreateStaticSound(name: string, source: ArrayBuffer | AudioBuffer | BABYLON.StaticSoundBuffer | string | string[], options: Partial<BABYLON.IStaticSoundOptions>): Promise<BABYLON.StaticSound>;
        /** Create Audio Engine Version 2 Streaming Sound Instance */
        static CreateStreamingSound(name: string, source: HTMLMediaElement | string | string[], options?: Partial<BABYLON.IStreamingSoundOptions>): Promise<BABYLON.StreamingSound>;
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
        static SLOPE_GRAVITY_FORCE: number;
        static UPHILL_GRAVITY_FORCE: number;
        static STATIC_GRAVITY_FORCE: number;
        static DEFAULT_GRAVITY_FORCE: number;
        static DEFAULT_JUMPING_TIMER: number;
        static DEFAULT_SLIDING_TIMER: number;
        static DEFAULT_CHARACTER_MASS: number;
        static MIN_GROUND_CHECK_DISTANCE: number;
        static MIN_GROUND_CHECK_SKINWIDTH: number;
        static MIN_GROUND_CHECK_SLOPEANGLE: number;
        private _avatarRadius;
        private _avatarHeight;
        private _centerOffset;
        private _slopeLimit;
        private _skinWidth;
        private _stepHeight;
        private _minMoveDistance;
        private _slopeSlideSpeed;
        private _slopeAngleRadians;
        private _slopeAngleDegrees;
        private _slopeMoveDirection;
        private _verticalVelocity;
        private _verticalStepSpeed;
        private _minimumStepHeight;
        private _collisionEvents;
        private _currentVelocity;
        private _inputVelocity;
        private _angluarVelocity;
        private _eulerAngles;
        private _gravityFactor;
        private _minJumpTimer;
        private _maxSlopeTimer;
        private _isSliding;
        private _isGrounded;
        private _isSteppingUp;
        private _hitColor;
        private _noHitColor;
        private _groundRay;
        private _groundRayHelper;
        private _groundHitPointMesh;
        private _stepCheckOriginMesh;
        private _stepCheckHitPointMesh;
        private _stepCheckDestinationMesh;
        private _stepCheckRayHelper;
        private _stepCheckRay;
        private _groundRaycastShape;
        private _groundCollisionNode;
        private _groundRaycastOffset;
        private _groundRaycastOrigin;
        private _groundRaycastDirection;
        private _groundRaycastDestination;
        private _localGroundShapecastResult;
        private _worldGroundShapecastResult;
        private _stepCheckRaycastOrigin;
        private _stepCheckRaycastDestination;
        private _stepCheckRaycastHitPoint;
        private _stepCheckRaycastResult;
        protected m_moveDeltaX: number;
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
        getVerticalVelocity(): number;
        getSlopeAngleRadians(): number;
        getSlopeAngleDegrees(): number;
        getGroundCollisionNode(): BABYLON.TransformNode;
        getVerticalStepSpeed(): number;
        setVerticalStepSpeed(speed: number): void;
        getMinimumStepHeight(): number;
        setMinimumStepHeight(height: number): void;
        getMinMoveDistance(): number;
        setMinMoveDistance(distance: number): void;
        getSlopeSlideSpeed(): number;
        setSlopeSlideSpeed(speed: number): void;
        getSlopeLimit(): number;
        setSlopeLimit(slopeRadians: number): void;
        isSteppingUp(): boolean;
        isGrounded(): boolean;
        isSliding(): boolean;
        canSlide(): boolean;
        canJump(): boolean;
        /** Register handler that is triggered when the character position has been updated */
        onUpdatePositionObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered when the character velocity will be updated */
        onUpdateVelocityObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Current vertical velocity offset */
        verticalVelocityOffset: number;
        /** Enable character step offset feature */
        enableStepOffset: boolean;
        /** Enable character gravity feature */
        enableGravity: boolean;
        /** Extra downward force applied */
        downwardForce: number;
        /** Minimum raycast length */
        raycastLength: number;
        /** Sets the character controller to debug mode (show ray lines) */
        showRaycasts: boolean;
        protected awake(): void;
        protected update(): void;
        protected fixed(): void;
        /** Sets the character position and rotation to the specfied values. */
        set(px: number, py: number, pz: number, rx?: number, ry?: number, rz?: number, rw?: number): void;
        /** Translates the character with the specfied velocity. Aux is not used. */
        move(velocity: BABYLON.Vector3, aux?: boolean): void;
        /** Jumps the chacracter with the specified speed. */
        jump(speed: number): void;
        /** Turns the chacracter to the specified angle. */
        turn(angle: number): void;
        /** Rotates the chacracter to the specified rotation. */
        rotate(x: number, y: number, z: number, w: number): void;
        /** Translate the chacracter to the specified position. */
        translate(x: number, y: number, z: number): void;
        /** Sets the character controller rigidbody mass property */
        setRigidBodyMass(mass: number): void;
        /** Set the character controller rigidbody collision type */
        setCollisionState(collision: boolean): void;
        /** Update the character controller grounded state */
        private updateGroundedState;
        /** Handle character controller slopes and steps */
        private updateSlopesAndSlides;
        /** Create character controller physics body */
        private createPhysicsBodyAndShape;
        /** Create character controller physics shape */
        private createPhysicsShapeCapsule;
        /** Create character controller physics shape */
        private createPhysicsShapeCylinder;
    }
    /**
     * Babylon toolkit simple character controller pro class (Simple Non Physics Based Character Controller System)
     * @class SimpleCharacterController - All rights reserved (c) 2020 Mackey Kinard
     */
    class SimpleCharacterController extends TOOLKIT.ScriptComponent {
        private _eulerAngles;
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
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * https://forum.babylonjs.com/t/havok-raycastvehicle/40314
     * https://forum.babylonjs.com/u/raggar
     * @script HavokRaycastVehicle
     */
    class HavokRaycastVehicle {
        chassisBody: BABYLON.PhysicsBody;
        wheelInfos: TOOLKIT.HavokWheelInfo[];
        sliding: boolean;
        world: BABYLON.PhysicsEngine;
        indexRightAxis: number;
        indexForwardAxis: number;
        indexUpAxis: number;
        minimumWheelContacts: number;
        smoothFlyingImpulse: number;
        stabilizingForce: number;
        maxImpulseForce: number;
        currentVehicleSpeedKmHour: number;
        constructor(options: any);
        addWheel(options: any): number;
        getNumWheels(): number;
        getWheelInfo(wheelIndex: number): TOOLKIT.HavokWheelInfo;
        getSteeringValue(wheelIndex: number): number;
        setSteeringValue(value: number, wheelIndex: number): void;
        applyEngineForce(value: number, wheelIndex: number): void;
        setBrake(brake: number, wheelIndex: number): void;
        addToWorld(world: BABYLON.PhysicsEngine): void;
        getVehicleAxisWorld(axisIndex: number, result: BABYLON.Vector3): BABYLON.Vector3;
        getCurrentSpeedKmHour(): number;
        updateVehicle(timeStep: number): void;
        updateSuspension(deltaTime: number): void;
        removeFromWorld(world: any): void;
        castRay2(wheel: TOOLKIT.HavokWheelInfo): number;
        castRay(wheel: TOOLKIT.HavokWheelInfo): number;
        updateWheelTransformWorld(wheel: TOOLKIT.HavokWheelInfo): void;
        updateWheelTransform(wheelIndex: number): void;
        getWheelTransformWorld(wheelIndex: number): BABYLON.TransformNode;
        updateFriction(timeStep: number): void;
    }
    /**
     * Babylon JavaScript File
     * @script HavokWheelInfo
     */
    class HavokWheelInfo {
        maxSuspensionTravel: number;
        customSlidingRotationalSpeed: number;
        useCustomSlidingRotationalSpeed: number;
        sliding: boolean;
        chassisConnectionPointLocal: BABYLON.Vector3;
        chassisConnectionPointWorld: BABYLON.Vector3;
        directionLocal: BABYLON.Vector3;
        directionWorld: BABYLON.Vector3;
        axleLocal: BABYLON.Vector3;
        axleWorld: BABYLON.Vector3;
        suspensionRestLength: number;
        suspensionMaxLength: number;
        radius: number;
        suspensionStiffness: number;
        dampingCompression: number;
        dampingRelaxation: number;
        frictionSlip: number;
        steering: number;
        rotation: number;
        deltaRotation: number;
        rollInfluence: number;
        maxSuspensionForce: number;
        engineForce: number;
        brake: number;
        isFrontWheel: boolean;
        clippedInvContactDotSuspension: number;
        suspensionRelativeVelocity: number;
        suspensionForce: number;
        skidInfo: number;
        slipInfo: number;
        suspensionLength: number;
        sideImpulse: number;
        forwardImpulse: number;
        raycastResult: BABYLON.PhysicsRaycastResult;
        worldTransform: BABYLON.TransformNode;
        visualTravelRange: number;
        invertDirection: boolean;
        isInContact: boolean;
        hub: BABYLON.TransformNode;
        spinner: BABYLON.TransformNode;
        defaultFriction: number;
        steeringAngle: number;
        rotationBoost: number;
        locked: boolean;
        constructor(options: any);
        updateWheel(chassis: any): void;
    }
    /**
     * Babylon JavaScript File
     * @script HavokVehicleUtilities
     */
    class HavokVehicleUtilities {
        static directions: BABYLON.Vector3[];
        static calcRollingFriction_vel1: BABYLON.Vector3;
        static calcRollingFriction_vel2: BABYLON.Vector3;
        static calcRollingFriction_vel: BABYLON.Vector3;
        static updateFriction_surfNormalWS_scaled_proj: BABYLON.Vector3;
        static updateFriction_axle: BABYLON.Vector3[];
        static updateFriction_forwardWS: BABYLON.Vector3[];
        static sideFrictionStiffness2: number;
        static castRay_rayvector: BABYLON.Vector3;
        static castRay_target: BABYLON.Vector3;
        static torque: BABYLON.Vector3;
        static tmpVec1: BABYLON.Vector3;
        static tmpVec2: BABYLON.Vector3;
        static tmpVec3: BABYLON.Vector3;
        static tmpVec4: BABYLON.Vector3;
        static tmpVec5: BABYLON.Vector3;
        static tmpVec6: BABYLON.Vector3;
        static tmpVel2: BABYLON.Vector3;
        static tmpMat1: BABYLON.Matrix;
        static velocityAt: (body: BABYLON.PhysicsBody, pos: any, res: any) => any;
        static bodyPosition: (body: BABYLON.PhysicsBody, res: any) => any;
        static bodyLinearVelocity: (body: BABYLON.PhysicsBody, res: any) => any;
        static bodyAngularVelocity: (body: BABYLON.PhysicsBody, res: any) => any;
        static bodyTransform: (body: BABYLON.PhysicsBody, res: any) => any;
        static addImpulseAt: (body: BABYLON.PhysicsBody, impulse: any, point: any) => void;
        static addForceAt: (body: BABYLON.PhysicsBody, force: any, point: any) => void;
        static bodyOrientation: (body: BABYLON.PhysicsBody, res: any) => any;
        static bodyMass: (body: BABYLON.PhysicsBody) => number;
        static bodyInvMass: (body: BABYLON.PhysicsBody) => number;
        static bodyInertiaWorld: (body: BABYLON.PhysicsBody, res: any) => any;
        static calcRollingFriction(body0: BABYLON.PhysicsBody, body1: BABYLON.PhysicsBody, frictionPosWorld: any, frictionDirectionWorld: any, maxImpulse: any): number;
        static computeImpulseDenominator_r0: BABYLON.Vector3;
        static computeImpulseDenominator_c0: BABYLON.Vector3;
        static computeImpulseDenominator_vec: BABYLON.Vector3;
        static computeImpulseDenominator_m: BABYLON.Vector3;
        static bodyPositionVec: BABYLON.Vector3;
        static bodyInertiaVec: BABYLON.Vector3;
        static computeImpulseDenominator(body: BABYLON.PhysicsBody, pos: any, normal: any): number;
        static resolveSingleBilateral_vel1: BABYLON.Vector3;
        static resolveSingleBilateral_vel2: BABYLON.Vector3;
        static resolveSingleBilateral_vel: BABYLON.Vector3;
        static resolveSingleBilateral(body1: BABYLON.PhysicsBody, pos1: any, body2: BABYLON.PhysicsBody, pos2: any, normal: any): number;
        static chassis_velocity_at_contactPoint: BABYLON.Vector3;
        static relpos: BABYLON.Vector3;
        static Utilsdefaults: (options: any, defaults: any) => any;
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
        static GLOBAL_CROWD_INSTANCE: boolean;
        private crowd;
        private type;
        private speed;
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
        heightOffset: number;
        angularSpeed: number;
        updatePosition: boolean;
        updateRotation: boolean;
        distanceEpsilon: number;
        velocityEpsilon: number;
        offMeshVelocity: number;
        stoppingDistance: number;
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
        /** Register handler that is triggered when the agent is ready for navigation */
        onReadyObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered before the navigation update */
        onPreUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered after the navigation update */
        onPostUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered when the navigation is complete */
        onNavCompleteObservable: BABYLON.Observable<BABYLON.TransformNode>;
        protected m_agentState: number;
        protected m_agentIndex: number;
        protected m_agentReady: boolean;
        protected m_agentGhost: BABYLON.TransformNode;
        protected m_agentParams: BABYLON.IAgentParameters;
        protected m_agentMovement: BABYLON.Vector3;
        protected m_agentDirection: BABYLON.Vector3;
        protected m_agentQuaternion: BABYLON.Quaternion;
        protected m_agentDestination: BABYLON.Vector3;
        protected awake(): void;
        protected update(): void;
        protected destroy(): void;
        private awakeNavigationAgent;
        private updateNavigationAgent;
        private updateAgentParameters;
        private destroyNavigationAgent;
        /** Move agent relative to current position. */
        move(offset: BABYLON.Vector3, closetPoint?: boolean): void;
        /** Teleport agent to destination point. */
        teleport(destination: BABYLON.Vector3, closetPoint?: boolean): void;
        /** Sets agent current destination point. */
        setDestination(destination: BABYLON.Vector3, closetPoint?: boolean): void;
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
    }
    /**
     *  Recast Detour Crowd Agent States
     */
    enum CrowdAgentState {
        DT_CROWDAGENT_STATE_INVALID = 0,///< The agent is not in a valid state.
        DT_CROWDAGENT_STATE_WALKING = 1,///< The agent is traversing a normal navigation mesh polygon.
        DT_CROWDAGENT_STATE_OFFMESH = 2
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon toolkit raycast vehicle pro class (Unity Style Wheeled Vehicle System)
     * @class RaycastVehicle - All rights reserved (c) 2024 Mackey Kinard
     */
    class RaycastVehicle {
        private _centerMass;
        private _chassisMesh;
        private _tempVectorPos;
        lockedWheelIndexes: number[];
        getNumWheels(): number;
        getWheelInfo(wheel: number): TOOLKIT.HavokWheelInfo;
        setEngineForce(power: number, wheel: number): void;
        setBrakingForce(brake: number, wheel: number): void;
        getWheelTransform(wheel: number): BABYLON.TransformNode;
        updateWheelTransform(wheel: number): void;
        getRawCurrentSpeedKph(): number;
        getRawCurrentSpeedMph(): number;
        getAbsCurrentSpeedKph(): number;
        getAbsCurrentSpeedMph(): number;
        protected m_vehicleColliders: any[];
        protected m_vehicle: TOOLKIT.HavokRaycastVehicle;
        protected m_scene: BABYLON.Scene;
        constructor(scene: BABYLON.Scene, entity: BABYLON.TransformNode, center: BABYLON.Vector3);
        dispose(): void;
        /** Gets the internal wheel index by id string. */
        getWheelIndexByID(id: string): number;
        /** Gets the internal wheel index by name string. */
        getWheelIndexByName(name: string): number;
        /** Gets the internal wheel collider information. */
        getWheelColliderInfo(wheel: number): number;
        getVisualSteeringAngle(wheel: number): number;
        setVisualSteeringAngle(angle: number, wheel: number): void;
        getPhysicsSteeringAngle(wheel: number): number;
        setPhysicsSteeringAngle(angle: number, wheel: number): void;
        /** Gets vehicle stable force using physics vehicle object. (Advanved Use Only) */
        getStabilizingForce(): number;
        /** Sets vehicle stable force using physics vehicle object. (Advanved Use Only) */
        setStabilizingForce(force: number): void;
        /** Gets vehicle smooth flying impulse force using physics vehicle object. (Advanved Use Only) */
        getSmoothFlyingImpulse(): number;
        /** Sets vehicle smooth flying impulse using physics vehicle object. (Advanved Use Only) */
        setSmoothFlyingImpulse(impulse: number): void;
        protected setupWheelInformation(): void;
        tickVehicleController(step: number): void;
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
        protected m_raycastVehicle: any;
        protected awake(): void;
        protected update(): void;
        protected late(): void;
        protected destroy(): void;
        protected awakeRigidbodyState(): void;
        protected updateRigidbodyState(): void;
        protected lateRigidbodyState(): void;
        protected destroyRigidbodyState(): void;
        /** Checks if rigidbody is kinematic. */
        isKinematic(): boolean;
        /** Checks if rigidbody has wheel collider metadata for the entity. Note: Wheel collider metadata informaion is required for vehicle control. */
        hasWheelColliders(): boolean;
        /** Get the raycast vehicle component */
        getRaycastVehicle(): any;
        /** Get the current havok instance from the global stack */
        static GetHavokInstance(): any;
        /** Get the current havok plugin from the global stack */
        static GetHavokPlugin(): BABYLON.HavokPlugin;
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
        static ConfigurePhysicsEngine(scene: BABYLON.Scene, deltaWorldStep?: boolean, subTimeStep?: number, maxWorldSweep?: number, ccdEnabled?: boolean, ccdPenetration?: number, gravityLevel?: BABYLON.Vector3): Promise<void>;
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
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon shuriken particle system pro class (Unity Style Shuriken Particle System)
     * @class ShurikenParticles - All rights reserved (c) 2024 Mackey Kinard
     */
    class ShurikenParticles extends TOOLKIT.ScriptComponent {
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        protected late(): void;
        protected step(): void;
        protected fixed(): void;
        protected after(): void;
        protected destroy(): void;
    }
}
/** Babylon Toolkit Namespace */
declare namespace TOOLKIT {
    /**
     * Babylon terrain generator pro class (Unity Terrain Builder System)
     * @class TerrainGenerator - All rights reserved (c) 2024 Mackey Kinard
    */
    class TerrainGenerator extends TOOLKIT.ScriptComponent {
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        protected late(): void;
        protected step(): void;
        protected fixed(): void;
        protected after(): void;
        protected destroy(): void;
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
