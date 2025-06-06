# SceneManager

The main Babylon Toolkit scene management class that provides comprehensive utilities for scene initialization, asset management, and framework coordination.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

SceneManager is the central hub of the Babylon Toolkit, providing static methods and properties for managing scenes, assets, physics, input, and the overall framework lifecycle. It serves as the primary interface for initializing and coordinating all toolkit functionality.

## Static Properties

### Version Information
- **`Version`** `string` - Gets the toolkit framework version number (8.9.1 - R1)
- **`Copyright`** `string` - Gets the toolkit framework copyright notice

### Global Configuration
- **`GlobalOptions`** `any` - Set global system options
- **`WindowState`** `any` - Set global window state
- **`ServerEndPoint`** `string` - Default network game server endpoint (without slash suffix)

### Framework Flags
- **`EnableDebugMode`** `boolean` - Set the allow debug mode flag
- **`EnableUserInput`** `boolean` - Set the allow user input flag
- **`RenderLoopReady`** `boolean` - Enable the main page render loop
- **`PauseRenderLoop`** `boolean` - Pauses the main page render loop
- **`LostRenderContext`** `boolean` - The webgl render context has been lost flag
- **`AutoUpdateProgress`** `boolean` - Set the preload auto update progress flag

### Physics Configuration
- **`PhysicsCapsuleShape`** `number` - Set the capsule collider shape type
- **`DefaultConvexHullMargin`** `number` - Set the default convex hull shape margin size
- **`DefaultHeightFieldMargin`** `number` - Set the default height field shape margin size

### Rendering Settings
- **`SupportSRGBBuffers`** `boolean` - Set the support srgb buffers flag
- **`AmbientLightIntensity`** `number` - Set the ambient light intensity factor
- **`PointLightIntensity`** `number` - Set the point light intensity factor
- **`SpotLightIntensity`** `number` - Set the spot light intensity factor
- **`DirectionalLightIntensity`** `number` - Set the directional light intensity factor
- **`TerrainColorCorrection`** `number` - Set the terrain shader color correction value

### Animation Settings
- **`AnimationStartMode`** `number` - The animation start mode. Defaults to NONE
- **`AnimationTargetFps`** `number` - When loading glTF animations, target them to this FPS. Defaults to 60

### Camera Controls
- **`AllowCameraMovement`** `boolean` - Set the allow camera movement flag
- **`AllowCameraRotation`** `boolean` - Set the allow camera rotation flag
- **`VirtualJoystickEnabled`** `boolean` - Set the virtual joystick enabled flag

### Script System
- **`ParseScriptComponents`** `boolean` - Set the parse script component flag
- **`AutoLoadScriptBundles`** `boolean` - Set the auto load script bundles flag

### Time Management
- **`GameTimeMilliseconds`** `number` - Gets the total game time in milliseconds

### Observables
- **`OnPreRenderLoopObservable`** `BABYLON.Observable<void>` - Register handler triggered before the main scene render loop
- **`OnPostRenderLoopObservable`** `BABYLON.Observable<void>` - Register handler triggered after the main scene render loop
- **`OnSceneReadyObservable`** `BABYLON.Observable<string>` - Register handler triggered when the scene is ready
- **`OnEngineResizeObservable`** `BABYLON.Observable<BABYLON.AbstractEngine>` - Register handler triggered when the engine has been resized
- **`OnLoadCompleteObservable`** `BABYLON.Observable<BABYLON.AbstractEngine>` - Register handler triggered when the scene has been loaded
- **`OnRebuildContextObservable`** `BABYLON.Observable<BABYLON.AbstractEngine>` - Register handler triggered when the webgl context needs to be rebuilt

### Event Handling
- **`OnAssetManagerProgress`** `(event: ProgressEvent) => void` - Register asset manager progress event
- **`EventBus`** `TOOLKIT.GlobalMessageBus` - Default global event message bus

### Utility Functions
- **`WaitForSeconds`** `(seconds: number) => Promise<void>` - Returns a Promise that resolves after the specified time

## Static Methods

### Initialization

#### `InitializePlayground(engine, options?)`
Initialize the babylon toolkit playground environment.

**Parameters:**
- `engine` `BABYLON.Engine | BABYLON.WebGPUEngine | BABYLON.AbstractEngine` - The engine instance
- `options?` `TOOLKIT.IPlaygroundOptions` - The playground options

**Returns:** `Promise<void>` - A waitable promise

#### `InitializeRuntime(engine, options?)`
Initialize the babylon toolkit runtime environment.

**Parameters:**
- `engine` `BABYLON.Engine | BABYLON.WebGPUEngine | BABYLON.AbstractEngine` - The engine instance
- `options?` `TOOLKIT.IPlaygroundOptions` - The runtime options

**Returns:** `Promise<void>` - A waitable promise

### Asset Management

#### `LoadRuntimeAssets(assetsManager, requiredFilenames, readyHandler, maxTimeout?, debugMode?)`
Sets the on scene ready handler then starts the assets manager loadAsync function.

**Parameters:**
- `assetsManager` `BABYLON.AssetsManager` - The assets manager instance
- `requiredFilenames` `string[]` - The list of required scene filenames to check ready state
- `readyHandler` `() => void` - The function called when all scene files are ready
- `maxTimeout?` `number` - The timeout value to wait for all required scene files to fully load. Default 60 seconds
- `debugMode?` `boolean` - The flag to enable on scene ready debug messages. Default false

**Returns:** `Promise<void>` - A waitable promise

#### `LoadAssetContainer(rootUrl, sceneFilename?, scene?, onSuccess?, onProgress?, onError?, pluginExtension?, name?)`
Load a scene into a cached asset container.

**Parameters:**
- `rootUrl` `string` - Root url for the scene and resources
- `sceneFilename?` `string` - Name of the scene file
- `scene?` `BABYLON.Scene` - Scene instance to append to
- `onSuccess?` `(container: BABYLON.AssetContainer) => void` - Success callback
- `onProgress?` `(event: BABYLON.ISceneLoaderProgressEvent) => void` - Progress callback
- `onError?` `(scene: BABYLON.Scene, message: string, exception?: any) => void` - Error callback
- `pluginExtension?` `BABYLON.Nullable<string>` - Plugin extension
- `name?` `string` - Filename if data is binary

#### `LoadAssetContainerAsync(rootUrl, sceneFilename?, scene?, onProgress?, pluginExtension?, name?)`
Load a scene into a cached asset container asynchronously.

**Parameters:**
- `rootUrl` `string` - Root url for the scene and resources
- `sceneFilename?` `string` - Name of the scene file
- `scene?` `BABYLON.Nullable<BABYLON.Scene>` - Scene instance to append to
- `onProgress?` `BABYLON.Nullable<(event: BABYLON.ISceneLoaderProgressEvent) => void>` - Progress callback
- `pluginExtension?` `BABYLON.Nullable<string>` - Plugin extension
- `name?` `string` - Filename if data is binary

**Returns:** `Promise<BABYLON.AssetContainer>` - The loaded asset container

### Scene Object Access

#### `GetMesh(scene, name)`
Gets the specified mesh by name from scene.

**Parameters:**
- `scene` `BABYLON.Scene` - The scene instance
- `name` `string` - The mesh name

**Returns:** `BABYLON.Mesh` - The mesh object

#### `GetMeshByID(scene, id)`
Gets the specified mesh by id from scene.

**Parameters:**
- `scene` `BABYLON.Scene` - The scene instance
- `id` `string` - The mesh id

**Returns:** `BABYLON.Mesh` - The mesh object

#### `GetAbstractMesh(scene, name)`
Gets the specified abstract mesh by name from scene.

**Parameters:**
- `scene` `BABYLON.Scene` - The scene instance
- `name` `string` - The mesh name

**Returns:** `BABYLON.AbstractMesh` - The abstract mesh object

#### `GetTransformNode(scene, name)`
Gets the specified transform node by name from scene.

**Parameters:**
- `scene` `BABYLON.Scene` - The scene instance
- `name` `string` - The transform node name

**Returns:** `BABYLON.TransformNode` - The transform node object

### Component Management

#### `GetComponent(transform, klass, recursive?)`
Get a script component on the transform with the specified class name.

**Parameters:**
- `transform` `BABYLON.TransformNode` - The transform node
- `klass` `string` - The component class name (full namespace, e.g., "TOOLKIT.RigidbodyPhysics")
- `recursive?` `boolean` - Search recursively in children

**Returns:** `TOOLKIT.ScriptComponent` - The component instance

#### `GetComponents(transform, recursive?)`
Gets all script components on the transform.

**Parameters:**
- `transform` `BABYLON.TransformNode` - The transform node
- `recursive?` `boolean` - Search recursively in children

**Returns:** `TOOLKIT.ScriptComponent[]` - Array of component instances

#### `AttachScriptComponent(instance, alias, validate?)`
Attach a script component instance to the scene manager life cycle.

**Parameters:**
- `instance` `TOOLKIT.ScriptComponent` - An instance of a TOOLKIT.ScriptComponent class
- `alias` `string` - The full class name alias. Example: PROJECT.MyCustomComponent
- `validate?` `boolean` - Validate the instance class on next frame. Default true

### Time and Animation

#### `GetTime()`
Get the current time in seconds.

**Returns:** `number` - Current time in seconds

#### `GetDeltaTime(scene, applyAnimationRatio?)`
Get the current delta time in seconds.

**Parameters:**
- `scene` `BABYLON.Scene` - The scene instance
- `applyAnimationRatio?` `boolean` - Apply animation ratio

**Returns:** `number` - Delta time in seconds

#### `StartTweenAnimation(scene, name, targetObject, targetProperty, startValue, endValue, defaultSpeedRatio?, defaultFrameRate?, defaultLoopMode?, defaultEasingFunction?, onAnimationComplete?)`
Starts a targeted float animation for tweening.

**Parameters:**
- `scene` `BABYLON.Scene` - The scene instance
- `name` `string` - Animation name
- `targetObject` `any` - Target object
- `targetProperty` `string` - Target property name
- `startValue` `number` - Start value
- `endValue` `number` - End value
- `defaultSpeedRatio?` `number` - Speed ratio
- `defaultFrameRate?` `number` - Frame rate
- `defaultLoopMode?` `number` - Loop mode
- `defaultEasingFunction?` `BABYLON.EasingFunction` - Easing function
- `onAnimationComplete?` `() => void` - Completion callback

**Returns:** `BABYLON.Animatable` - The animation instance

### Prefab System

#### `InstantiatePrefabFromScene(scene, prefabName, newName, newParent?, newPosition?, newRotation?, newScaling?, cloneAnimations?)`
Instantiate the specified prefab asset hierarchy from the specified scene.

**Parameters:**
- `scene` `BABYLON.Scene` - The scene instance
- `prefabName` `string` - The prefab name
- `newName` `string` - The new instance name
- `newParent?` `BABYLON.Nullable<BABYLON.TransformNode>` - New parent transform
- `newPosition?` `BABYLON.Nullable<BABYLON.Vector3>` - New position
- `newRotation?` `BABYLON.Nullable<BABYLON.Quaternion>` - New rotation
- `newScaling?` `BABYLON.Nullable<BABYLON.Vector3>` - New scaling
- `cloneAnimations?` `boolean` - Clone animations

**Returns:** `BABYLON.TransformNode` - The instantiated prefab root

### Loading Screen

#### `ShowLoadingScreen(engine, hideLoadingUIWithEngine?, defaultLoadingUIMarginTop?)`
Shows the default loading screen panel.

**Parameters:**
- `engine` `BABYLON.Engine | BABYLON.WebGPUEngine | BABYLON.AbstractEngine` - The engine instance
- `hideLoadingUIWithEngine?` `boolean` - Hide loading screen with engine.hideLoadingUI. Default true
- `defaultLoadingUIMarginTop?` `string` - Top margin of loading text. Default 150px

#### `HideLoadingScreen(engine)`
Hides the default loading screen panel.

**Parameters:**
- `engine` `BABYLON.Engine | BABYLON.WebGPUEngine | BABYLON.AbstractEngine` - The engine instance

### Utility Methods

#### `SafeDestroy(transform, delay?, disable?)`
Safely destroy transform node.

**Parameters:**
- `transform` `BABYLON.TransformNode` - The transform to destroy
- `delay?` `number` - Delay before destruction
- `disable?` `boolean` - Disable before destruction

#### `RunOnce(scene, func, timeout?)`
Run a function on the next render loop.

**Parameters:**
- `scene` `BABYLON.Scene` - The scene instance
- `func` `() => void` - Function to execute
- `timeout?` `number` - Optional timeout

#### `RegisterClickAction(scene, mesh, func)`
Registers an on pick trigger click action.

**Parameters:**
- `scene` `BABYLON.Scene` - The scene instance
- `mesh` `BABYLON.AbstractMesh` - The mesh to register click on
- `func` `() => void` - Function to execute on click

**Returns:** `BABYLON.IAction` - The registered action

## Examples

### Basic Initialization
```typescript
// Initialize the toolkit runtime
const engine = new BABYLON.Engine(canvas, true);
await TOOLKIT.SceneManager.InitializeRuntime(engine);

// Set up event handlers
TOOLKIT.SceneManager.OnSceneReadyObservable.add((sceneName) => {
    console.log(`Scene ${sceneName} is ready`);
});
```

### Asset Loading
```typescript
// Load an asset container
const container = await TOOLKIT.SceneManager.LoadAssetContainerAsync(
    "./assets/",
    "scene.babylon",
    scene
);

// Get objects from the scene
const player = TOOLKIT.SceneManager.GetTransformNode(scene, "Player");
const weapon = TOOLKIT.SceneManager.GetMesh(scene, "Sword");
```

### Component Management
```typescript
// Get a component from a transform
const controller = TOOLKIT.SceneManager.GetComponent(
    playerTransform,
    "TOOLKIT.MyController"
);

// Get all components
const allComponents = TOOLKIT.SceneManager.GetComponents(playerTransform);
```

## Related Classes
- [ScriptComponent](ScriptComponent.md) - Base class for all script components
- [Utilities](Utilities.md) - Additional utility functions
- [PreloadAssetsManager](../assets/PreloadAssetsManager.md) - Asset preloading utilities
- [GlobalMessageBus](../messaging/GlobalMessageBus.md) - Event messaging system
