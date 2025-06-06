# RaycastVehicle

Unity-style wheeled vehicle system for realistic vehicle physics simulation with wheel colliders and suspension.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

RaycastVehicle provides a comprehensive vehicle physics system similar to Unity's WheelCollider system. It uses raycast-based wheel simulation for realistic vehicle dynamics including suspension, steering, braking, and engine forces.

## Instance Properties

### Vehicle Configuration
- **`lockedWheelIndexes`** `number[]` - Array of wheel indexes that are locked

## Vehicle Control Methods

### Wheel Management

#### `getNumWheels()`
Gets the total number of wheels on the vehicle.

**Returns:** `number`

#### `getWheelInfo(wheel)`
Gets wheel information for the specified wheel.

**Parameters:**
- `wheel` `number` - Wheel index

**Returns:** `TOOLKIT.HavokWheelInfo`

#### `getWheelTransform(wheel)`
Gets the transform node for the specified wheel.

**Parameters:**
- `wheel` `number` - Wheel index

**Returns:** `BABYLON.TransformNode`

#### `updateWheelTransform(wheel)`
Updates the transform for the specified wheel.

**Parameters:**
- `wheel` `number` - Wheel index

### Vehicle Physics

#### `setEngineForce(power, wheel)`
Sets the engine force for the specified wheel.

**Parameters:**
- `power` `number` - Engine power
- `wheel` `number` - Wheel index

#### `setBrakingForce(brake, wheel)`
Sets the braking force for the specified wheel.

**Parameters:**
- `brake` `number` - Brake force
- `wheel` `number` - Wheel index

### Speed Information

#### `getRawCurrentSpeedKph()`
Gets the raw current speed in kilometers per hour.

**Returns:** `number`

#### `getRawCurrentSpeedMph()`
Gets the raw current speed in miles per hour.

**Returns:** `number`

#### `getAbsCurrentSpeedKph()`
Gets the absolute current speed in kilometers per hour.

**Returns:** `number`

#### `getAbsCurrentSpeedMph()`
Gets the absolute current speed in miles per hour.

**Returns:** `number`

### Wheel Identification

#### `getWheelIndexByID(id)`
Gets the internal wheel index by ID string.

**Parameters:**
- `id` `string` - Wheel ID

**Returns:** `number`

#### `getWheelIndexByName(name)`
Gets the internal wheel index by name string.

**Parameters:**
- `name` `string` - Wheel name

**Returns:** `number`

#### `getWheelColliderInfo(wheel)`
Gets the internal wheel collider information.

**Parameters:**
- `wheel` `number` - Wheel index

**Returns:** `number`

### Steering Control

#### `getVisualSteeringAngle(wheel)`
Gets the visual steering angle for the specified wheel.

**Parameters:**
- `wheel` `number` - Wheel index

**Returns:** `number`

#### `setVisualSteeringAngle(angle, wheel)`
Sets the visual steering angle for the specified wheel.

**Parameters:**
- `angle` `number` - Steering angle
- `wheel` `number` - Wheel index

#### `getPhysicsSteeringAngle(wheel)`
Gets the physics steering angle for the specified wheel.

**Parameters:**
- `wheel` `number` - Wheel index

**Returns:** `number`

#### `setPhysicsSteeringAngle(angle, wheel)`
Sets the physics steering angle for the specified wheel.

**Parameters:**
- `angle` `number` - Steering angle
- `wheel` `number` - Wheel index

### Advanced Physics

#### `getStabilizingForce()`
Gets vehicle stable force using physics vehicle object.

**Returns:** `number`

#### `setStabilizingForce(force)`
Sets vehicle stable force using physics vehicle object.

**Parameters:**
- `force` `number` - Stabilizing force

#### `getSmoothFlyingImpulse()`
Gets vehicle smooth flying impulse force using physics vehicle object.

**Returns:** `number`

#### `setSmoothFlyingImpulse(impulse)`
Sets vehicle smooth flying impulse using physics vehicle object.

**Parameters:**
- `impulse` `number` - Flying impulse force

### Vehicle Lifecycle

#### `constructor(scene, entity, center)`
Creates a new raycast vehicle.

**Parameters:**
- `scene` `BABYLON.Scene` - Scene reference
- `entity` `BABYLON.TransformNode` - Vehicle entity
- `center` `BABYLON.Vector3` - Center of mass

#### `dispose()`
Disposes the vehicle and releases resources.

#### `tickVehicleController(step)`
Updates the vehicle controller physics simulation.

**Parameters:**
- `step` `number` - Time step

#### `updateWheelInformation()`
Updates wheel information for all wheels.

## Usage Examples

### Basic Vehicle Setup
```typescript
const vehicleEntity = scene.getTransformNodeByName("Vehicle");
const centerOfMass = new BABYLON.Vector3(0, -0.5, 0);

const raycastVehicle = new TOOLKIT.RaycastVehicle(scene, vehicleEntity, centerOfMass);
```

### Vehicle Input Control
```typescript
const maxEngineForce = 1500;
const maxBrakeForce = 100;
const maxSteeringAngle = 0.5;

let engineForce = 0;
let brakeForce = 0;
let steeringAngle = 0;

if (TOOLKIT.InputController.GetKeyboardInput(87)) { // W key
    engineForce = maxEngineForce;
}
if (TOOLKIT.InputController.GetKeyboardInput(83)) { // S key
    engineForce = -maxEngineForce;
}
if (TOOLKIT.InputController.GetKeyboardInput(32)) { // Space key
    brakeForce = maxBrakeForce;
}

if (TOOLKIT.InputController.GetKeyboardInput(65)) { // A key
    steeringAngle = -maxSteeringAngle;
}
if (TOOLKIT.InputController.GetKeyboardInput(68)) { // D key
    steeringAngle = maxSteeringAngle;
}

raycastVehicle.setEngineForce(engineForce, 0);
raycastVehicle.setEngineForce(engineForce, 1);

raycastVehicle.setBrakingForce(brakeForce, 0);
raycastVehicle.setBrakingForce(brakeForce, 1);
raycastVehicle.setBrakingForce(brakeForce, 2);
raycastVehicle.setBrakingForce(brakeForce, 3);

raycastVehicle.setPhysicsSteeringAngle(steeringAngle, 0);
raycastVehicle.setPhysicsSteeringAngle(steeringAngle, 1);
```

### Vehicle Information Display
```typescript
const speedKph = raycastVehicle.getAbsCurrentSpeedKph();
const speedMph = raycastVehicle.getAbsCurrentSpeedMph();

console.log(`Speed: ${speedKph.toFixed(1)} km/h (${speedMph.toFixed(1)} mph)`);

for (let i = 0; i < raycastVehicle.getNumWheels(); i++) {
    const wheelInfo = raycastVehicle.getWheelInfo(i);
    console.log(`Wheel ${i}: Contact=${wheelInfo.isInContact}, Slip=${wheelInfo.slipInfo}`);
}
```

### Advanced Vehicle Configuration
```typescript
raycastVehicle.setStabilizingForce(30);
raycastVehicle.setSmoothFlyingImpulse(100);

const frontLeftIndex = raycastVehicle.getWheelIndexByName("FrontLeft");
const frontRightIndex = raycastVehicle.getWheelIndexByName("FrontRight");

raycastVehicle.setVisualSteeringAngle(steeringAngle, frontLeftIndex);
raycastVehicle.setVisualSteeringAngle(steeringAngle, frontRightIndex);
```

## Related Classes
- [HavokRaycastVehicle](HavokRaycastVehicle.md) - Havok-based vehicle physics
- [HavokWheelInfo](HavokWheelInfo.md) - Wheel configuration and state
- [HavokVehicleUtilities](HavokVehicleUtilities.md) - Vehicle physics utilities
- [RigidbodyPhysics](RigidbodyPhysics.md) - Physics system integration
