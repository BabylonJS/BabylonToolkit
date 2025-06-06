# RigidbodyPhysics

Full rigidbody physics component using the native Havok Physics Engine. Provides comprehensive physics simulation including collision detection, forces, and vehicle physics.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Extends**: `TOOLKIT.ScriptComponent`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

RigidbodyPhysics is a comprehensive physics component that integrates with the Havok Physics Engine to provide realistic physics simulation. It supports rigidbody dynamics, collision detection, raycast operations, and vehicle physics through the Babylon.js physics system.

## Static Properties

### Physics Configuration
- **`PHYSICS_STEP_TIME`** `number` - Physics simulation step time
- **`PhysicsShapeCache`** `any` - Cache for physics shapes to improve performance
- **`NewPhysicsShapeCount`** `number` - Count of newly created physics shapes
- **`CachedPhysicsShapeCount`** `number` - Count of cached physics shapes
- **`DebugPhysicsViewer`** `any` - Debug physics visualization viewer

### Event Handlers
- **`OnSetupPhysicsPlugin`** `(scene: BABYLON.Scene) => void` - Callback triggered when physics plugin is set up

## Instance Properties

### Physics State
- **`isKinematic()`** `boolean` - Checks if rigidbody is kinematic
- **`hasWheelColliders()`** `boolean` - Checks if rigidbody has wheel collider metadata for vehicle control
- **`getRaycastVehicle()`** `any` - Get the raycast vehicle component

## Static Methods

### Physics Engine Setup

#### `ConfigurePhysicsEngine(scene, deltaWorldStep?, subTimeStep?, maxWorldSweep?, ccdEnabled?, ccdPenetration?, gravityLevel?)`
Configure the physics engine with advanced settings.

**Parameters:**
- `scene` `BABYLON.Scene` - The scene instance
- `deltaWorldStep?` `boolean` - Use delta world stepping
- `subTimeStep?` `number` - Sub-timestep value
- `maxWorldSweep?` `number` - Maximum world sweep distance
- `ccdEnabled?` `boolean` - Enable continuous collision detection
- `ccdPenetration?` `number` - CCD penetration threshold
- `gravityLevel?` `BABYLON.Vector3` - Gravity vector

**Returns:** `Promise<void>` - Configuration completion promise

#### `SetupPhysicsComponent(scene, entity)`
Set up physics component for a transform node.

**Parameters:**
- `scene` `BABYLON.Scene` - The scene instance
- `entity` `BABYLON.TransformNode` - The transform node to add physics to

### Havok Integration

#### `GetHavokInstance()`
Get the current Havok instance from the global stack.

**Returns:** `any` - The Havok physics instance

#### `GetHavokPlugin()`
Get the current Havok plugin from the global stack.

**Returns:** `BABYLON.HavokPlugin` - The Havok physics plugin

### Raycast Operations

#### `Raycast(origin, direction, length, query?)`
Performs a raycast from a given start point in the given direction and length.

**Parameters:**
- `origin` `BABYLON.Vector3` - The start point of the raycast
- `direction` `BABYLON.Vector3` - The direction of the raycast
- `length` `number` - The length of the raycast
- `query?` `BABYLON.IRaycastQuery` - The raycast query options

**Returns:** `BABYLON.PhysicsRaycastResult` - Reused raycast result

#### `RaycastToRef(from, to, result, query?)`
Performs a raycast from a given start point to a given end point and stores the result.

**Parameters:**
- `from` `BABYLON.Vector3` - The start point of the raycast
- `to` `BABYLON.Vector3` - The end point of the raycast
- `result` `BABYLON.PhysicsRaycastResult` - The result object to store the raycast data
- `query?` `BABYLON.IRaycastQuery` - The raycast query options

### Shape Casting

#### `Shapecast(query)`
Performs a shapecast with a specific orientation from start to end position.

**Parameters:**
- `query` `TOOLKIT.IPhysicsShapeCastQuery` - The shapecast query to perform

**Returns:** `TOOLKIT.IPhysicsShapeCastResult` - Reused shapecast result

#### `ShapecastToRef(query, localShapeResult, worldShapeResult)`
Given a shape in a specific orientation, cast it from start to end position and return the first hit.

**Parameters:**
- `query` `TOOLKIT.IPhysicsShapeCastQuery` - The shapecast query to perform
- `localShapeResult` `BABYLON.ShapeCastResult` - Contact point on input shape, in input shape space
- `worldShapeResult` `BABYLON.ShapeCastResult` - Contact point on hit shape, in world space

### Physics Configuration

#### `SetMaxVelocities(maxLinVel, maxAngVel)`
Set the maximum physics velocities.

**Parameters:**
- `maxLinVel` `number` - Maximum linear velocity
- `maxAngVel` `number` - Maximum angular velocity

#### `GetPhysicsHeapSize()`
Get the current physics heap size.

**Returns:** `number` - Physics heap size in bytes

### Metadata Creation

#### `CreatePhysicsMetadata(mass, drag?, angularDrag?, centerMass?)`
Create physics metadata for a rigidbody.

**Parameters:**
- `mass` `number` - Object mass
- `drag?` `number` - Linear drag coefficient
- `angularDrag?` `number` - Angular drag coefficient
- `centerMass?` `BABYLON.Vector3` - Center of mass offset

**Returns:** `any` - Physics metadata object

#### `CreateCollisionMetadata(type, trigger?, convexmesh?, restitution?, dynamicfriction?, staticfriction?)`
Create collision metadata for physics shapes.

**Parameters:**
- `type` `string` - Collision shape type
- `trigger?` `boolean` - Is trigger volume
- `convexmesh?` `boolean` - Use convex mesh
- `restitution?` `number` - Bounce factor
- `dynamicfriction?` `number` - Dynamic friction coefficient
- `staticfriction?` `number` - Static friction coefficient

**Returns:** `any` - Collision metadata object

#### `CreatePhysicsProperties(mass, drag?, angularDrag?, useGravity?, isKinematic?)`
Create physics properties for rigidbody configuration.

**Parameters:**
- `mass` `number` - Object mass
- `drag?` `number` - Linear drag coefficient
- `angularDrag?` `number` - Angular drag coefficient
- `useGravity?` `boolean` - Apply gravity
- `isKinematic?` `boolean` - Is kinematic rigidbody

**Returns:** `any` - Physics properties object

## Lifecycle Methods

### `awake()`
Called when the component is first created. Initializes the rigidbody physics state.

**Protected method** - Override in derived classes

### `update()`
Called every frame during the update loop. Updates rigidbody physics state.

**Protected method** - Override in derived classes

### `late()`
Called every frame during the late update loop. Performs late physics updates.

**Protected method** - Override in derived classes

### `destroy()`
Called when the component is being destroyed. Cleans up physics resources.

**Protected method** - Override in derived classes

## Usage Examples

### Basic Physics Setup
```typescript
// Configure physics engine for the scene
await TOOLKIT.RigidbodyPhysics.ConfigurePhysicsEngine(scene, true, 60, 10, true, 0.01);

// Add physics to a transform
TOOLKIT.RigidbodyPhysics.SetupPhysicsComponent(scene, boxTransform);

// Create a rigidbody component
const physics = new TOOLKIT.RigidbodyPhysics(boxTransform, scene, {
    mass: 10,
    drag: 0.1,
    angularDrag: 0.05
});
```

### Raycast Operations
```typescript
// Perform a raycast
const origin = new BABYLON.Vector3(0, 10, 0);
const direction = new BABYLON.Vector3(0, -1, 0);
const result = TOOLKIT.RigidbodyPhysics.Raycast(origin, direction, 20);

if (result.hasHit) {
    console.log("Hit object:", result.body);
    console.log("Hit point:", result.hitPointWorld);
    console.log("Hit normal:", result.hitNormalWorld);
}
```

### Shape Casting
```typescript
// Create a shape cast query
const query: TOOLKIT.IPhysicsShapeCastQuery = {
    shape: sphereShape,
    rotation: BABYLON.Quaternion.Identity(),
    startPosition: new BABYLON.Vector3(0, 10, 0),
    endPosition: new BABYLON.Vector3(0, 0, 0)
};

// Perform shape cast
const result = TOOLKIT.RigidbodyPhysics.Shapecast(query);
if (result.local.hasHit) {
    console.log("Shape hit something!");
}
```

### Vehicle Physics
```typescript
// Check if transform has wheel colliders
if (physics.hasWheelColliders()) {
    // Get the raycast vehicle component
    const vehicle = physics.getRaycastVehicle();
    
    // Configure vehicle properties
    vehicle.setEngineForce(1000, 0); // Apply engine force to wheel 0
    vehicle.setBrakingForce(500, 1);  // Apply braking to wheel 1
}
```

### Custom Physics Properties
```typescript
// Create physics metadata
const physicsData = TOOLKIT.RigidbodyPhysics.CreatePhysicsMetadata(
    15.0,  // mass
    0.2,   // drag
    0.1,   // angular drag
    new BABYLON.Vector3(0, -0.5, 0) // center of mass offset
);

// Create collision metadata
const collisionData = TOOLKIT.RigidbodyPhysics.CreateCollisionMetadata(
    "box",    // shape type
    false,    // not a trigger
    false,    // not convex mesh
    0.6,      // restitution (bounciness)
    0.8,      // dynamic friction
    0.9       // static friction
);
```

### Kinematic Rigidbodies
```typescript
// Create kinematic rigidbody properties
const kinematicProps = TOOLKIT.RigidbodyPhysics.CreatePhysicsProperties(
    0,      // mass (0 for kinematic)
    0,      // no drag
    0,      // no angular drag
    false,  // no gravity
    true    // is kinematic
);

// Check if rigidbody is kinematic
if (physics.isKinematic()) {
    // Handle kinematic-specific logic
    console.log("This is a kinematic rigidbody");
}
```

## Physics Shape Caching

The RigidbodyPhysics system includes automatic shape caching to improve performance:

```typescript
// Check cache statistics
console.log("New shapes created:", TOOLKIT.RigidbodyPhysics.NewPhysicsShapeCount);
console.log("Cached shapes reused:", TOOLKIT.RigidbodyPhysics.CachedPhysicsShapeCount);

// Monitor physics heap usage
const heapSize = TOOLKIT.RigidbodyPhysics.GetPhysicsHeapSize();
console.log("Physics heap size:", heapSize, "bytes");
```

## Related Classes
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
- [RaycastVehicle](RaycastVehicle.md) - Vehicle physics implementation
- [CharacterController](CharacterController.md) - Character physics controller
- [NavigationAgent](../navigation/NavigationAgent.md) - Navigation with physics
- [SceneManager](../core/SceneManager.md) - Scene management utilities

## Interfaces

### IPhysicsShapeCastQuery
```typescript
interface IPhysicsShapeCastQuery {
    shape: BABYLON.PhysicsShape;        // The shape to query with
    rotation: BABYLON.Quaternion;       // The rotation of the shape
    startPosition: BABYLON.Vector3;     // The start position of the query
    endPosition: BABYLON.Vector3;       // The end position of the query
}
```

### IPhysicsShapeCastResult
```typescript
interface IPhysicsShapeCastResult {
    local: BABYLON.ShapeCastResult;     // Contact point on input shape
    world: BABYLON.ShapeCastResult;     // Contact point on hit shape
}
```
