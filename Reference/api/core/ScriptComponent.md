# ScriptComponent

Abstract base class for all script components in the Babylon Toolkit. Provides the foundation for creating interactive behaviors that can be attached to transform nodes.

**Namespace**: `TOOLKIT`  
**Type**: `abstract class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

ScriptComponent is the base class for all interactive components in the Babylon Toolkit. It provides lifecycle methods (awake, start, update, late, after, step, destroy) and integrates with the scene management system for automatic component handling.

## Constructor

### `constructor(transform, scene, properties?, alias?)`
Creates a new script component instance.

**Parameters:**
- `transform` `BABYLON.TransformNode` - The transform node this component is attached to
- `scene` `BABYLON.Scene` - The scene instance
- `properties?` `any` - Optional property bag for component configuration
- `alias?` `string` - Optional class alias for component identification

## Properties

### Instance Properties
- **`transform`** `BABYLON.TransformNode` - Gets the transform node this component is attached to
- **`scene`** `BABYLON.Scene` - Gets the scene instance
- **`manager`** `TOOLKIT.SceneManager` - Gets the scene manager instance

### Configuration
- **`enableUpdate`** `boolean` - Enable or disable the update loop for this component
- **`enableLateUpdate`** `boolean` - Enable or disable the late update loop for this component
- **`enableAfterUpdate`** `boolean` - Enable or disable the after update loop for this component
- **`enableFixedUpdate`** `boolean` - Enable or disable the fixed update loop for this component

## Methods

### Lifecycle Methods

#### `awake()`
Called when the component is first created, before start(). Override this method to initialize the component.

**Protected method** - Override in derived classes

#### `start()`
Called on the first frame after the component is created. Override this method for initialization that depends on other components.

**Protected method** - Override in derived classes

#### `update()`
Called every frame during the update loop. Override this method for frame-by-frame logic.

**Protected method** - Override in derived classes

#### `late()`
Called every frame during the late update loop, after all update() calls. Override this method for logic that needs to run after all updates.

**Protected method** - Override in derived classes

#### `after()`
Called every frame during the after update loop, after all late() calls. Override this method for final frame processing.

**Protected method** - Override in derived classes

#### `step()`
Called during fixed timestep updates for physics-related logic. Override this method for physics calculations.

**Protected method** - Override in derived classes

#### `destroy()`
Called when the component is being destroyed. Override this method to clean up resources.

**Protected method** - Override in derived classes

### Public Methods

#### `dispose()`
Destroys the script component instance and cleans up resources.

#### `getClassName()`
Gets the script component class name.

**Returns:** `string` - The class name



### Static Utility Methods

#### `RegisterInstance(instance, alias, validate?)`
Register a script component instance with the scene manager.

**Parameters:**
- `instance` `TOOLKIT.ScriptComponent` - The component instance
- `alias` `string` - The class alias
- `validate?` `boolean` - Validate the instance. Default true

#### `FindInstance(transform, klass)`
Find a script component instance on a transform.

**Parameters:**
- `transform` `BABYLON.TransformNode` - The transform to search
- `klass` `string` - The component class name

**Returns:** `TOOLKIT.ScriptComponent` - The component instance or null

## Usage Patterns

### Basic Component Implementation
```typescript
class PlayerController extends TOOLKIT.ScriptComponent {
    public speed: number = 5.0;
    public health: number = 100;

    protected awake(): void {
        // Initialize component
    }

    protected start(): void {
        // Setup that depends on other components
        const physics = TOOLKIT.SceneManager.GetComponent(
            this.transform, 
            "TOOLKIT.RigidbodyPhysics"
        );
    }

    protected update(): void {
        // Frame-by-frame logic
        this.handleInput();
        this.updateMovement();
    }

    protected late(): void {
        // Logic that runs after all updates
        this.updateCamera();
    }

    protected destroy(): void {
        // Cleanup resources
        this.cleanup();
    }

    private handleInput(): void {
        // Input handling logic
    }

    private updateMovement(): void {
        // Movement logic
    }
}
```

### Component Registration
```typescript
// Create and register a component
const controller = new PlayerController(playerTransform, scene, {
    speed: 10.0,
    maxHealth: 150
});

TOOLKIT.SceneManager.AttachScriptComponent(controller, "PlayerController");
```

### Component Access
```typescript
// Get a component from a transform
const controller = TOOLKIT.SceneManager.GetComponent(
    playerTransform,
    "TOOLKIT.PlayerController"
);

// Check if component exists
if (controller) {
    controller.speed = 15.0;
}
```

### Property Management
```typescript
class ConfigurableComponent extends TOOLKIT.ScriptComponent {
    public speed: number = 1.0;
    public color: string = "red";
    public enabled: boolean = true;
    public lastUpdate: number = 0;
    
    protected awake(): void {
        // Initialize properties
        this.lastUpdate = Date.now();
    }

    protected update(): void {
        if (this.enabled) {
            // Component logic
        }
    }
}
```

## Lifecycle Order

The component lifecycle methods are called in the following order each frame:

1. **awake()** - Called once when component is created
2. **start()** - Called once on first frame after creation
3. **update()** - Called every frame (if enableUpdate is true)
4. **late()** - Called every frame after all updates (if enableLateUpdate is true)
5. **after()** - Called every frame after all late updates (if enableAfterUpdate is true)
6. **step()** - Called during fixed timestep (if enableFixedUpdate is true)
7. **destroy()** - Called when component is destroyed

## Best Practices

1. **Use awake() for initialization** that doesn't depend on other components
2. **Use start() for initialization** that requires other components to be ready
3. **Use update() for frame-dependent logic** like input handling and movement
4. **Use late() for logic** that needs to run after all other updates
5. **Always call dispose()** when manually destroying components
6. **Use public properties** for configurable component parameters
7. **Cache component references** in start() rather than getting them every frame

## Related Classes
- [SceneManager](SceneManager.md) - Main scene management class
- [RigidbodyPhysics](../physics/RigidbodyPhysics.md) - Physics component example
- [NavigationAgent](../navigation/NavigationAgent.md) - Navigation component example
- [AudioSource](../audio/AudioSource.md) - Audio component example
