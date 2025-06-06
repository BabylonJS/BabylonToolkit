# HavokRaycastVehicle

Havok-based vehicle physics system for realistic vehicle simulation with advanced wheel dynamics and suspension.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

HavokRaycastVehicle provides low-level vehicle physics simulation using the Havok Physics Engine. It handles wheel dynamics, suspension forces, friction calculations, and vehicle stability for realistic vehicle behavior.

## Instance Properties

### Vehicle Components
- **`chassisBody`** `BABYLON.PhysicsBody` - Main vehicle chassis physics body
- **`wheelInfos`** `TOOLKIT.HavokWheelInfo[]` - Array of wheel information objects
- **`sliding`** `boolean` - Whether the vehicle is currently sliding
- **`world`** `BABYLON.PhysicsEngine` - Physics engine reference

### Vehicle Configuration
- **`indexRightAxis`** `number` - Right axis index for vehicle orientation
- **`indexForwardAxis`** `number` - Forward axis index for vehicle orientation
- **`indexUpAxis`** `number` - Up axis index for vehicle orientation
- **`minimumWheelContacts`** `number` - Minimum wheel contacts required
- **`smoothFlyingImpulse`** `number` - Smooth flying impulse force
- **`stabilizingForce`** `number` - Vehicle stabilizing force
- **`maxImpulseForce`** `number` - Maximum impulse force
- **`currentVehicleSpeedKmHour`** `number` - Current vehicle speed in km/h

## Vehicle Management Methods

### Initialization

#### `constructor(options)`
Creates a new Havok raycast vehicle.

**Parameters:**
- `options` `any` - Vehicle configuration options

#### `addToWorld(world)`
Adds the vehicle to the physics world.

**Parameters:**
- `world` `BABYLON.PhysicsEngine` - Physics engine

#### `removeFromWorld(world)`
Removes the vehicle from the physics world.

**Parameters:**
- `world` `any` - Physics engine

### Wheel Management

#### `addWheel(options)`
Adds a wheel to the vehicle.

**Parameters:**
- `options` `any` - Wheel configuration options

**Returns:** `number` - Wheel index

#### `getNumWheels()`
Gets the total number of wheels.

**Returns:** `number`

#### `getWheelInfo(wheelIndex)`
Gets wheel information for the specified wheel.

**Parameters:**
- `wheelIndex` `number` - Wheel index

**Returns:** `TOOLKIT.HavokWheelInfo`

### Vehicle Control

#### `getSteeringValue(wheelIndex)`
Gets the steering value for the specified wheel.

**Parameters:**
- `wheelIndex` `number` - Wheel index

**Returns:** `number`

#### `setSteeringValue(value, wheelIndex)`
Sets the steering value for the specified wheel.

**Parameters:**
- `value` `number` - Steering value
- `wheelIndex` `number` - Wheel index

#### `applyEngineForce(value, wheelIndex)`
Applies engine force to the specified wheel.

**Parameters:**
- `value` `number` - Engine force
- `wheelIndex` `number` - Wheel index

#### `setBrake(brake, wheelIndex)`
Sets brake force for the specified wheel.

**Parameters:**
- `brake` `number` - Brake force
- `wheelIndex` `number` - Wheel index

### Vehicle Physics

#### `updateVehicle(timeStep)`
Updates the vehicle physics simulation.

**Parameters:**
- `timeStep` `number` - Time step for physics update

#### `updateSuspension(deltaTime)`
Updates suspension forces for all wheels.

**Parameters:**
- `deltaTime` `number` - Time delta

#### `updateFriction(timeStep)`
Updates friction calculations for all wheels.

**Parameters:**
- `timeStep` `number` - Time step

#### `getCurrentSpeedKmHour()`
Gets the current vehicle speed in kilometers per hour.

**Returns:** `number`

### Wheel Transform Management

#### `updateWheelTransform(wheelIndex)`
Updates the transform for the specified wheel.

**Parameters:**
- `wheelIndex` `number` - Wheel index

#### `updateWheelTransformWorld(wheel)`
Updates the world transform for the specified wheel.

**Parameters:**
- `wheel` `TOOLKIT.HavokWheelInfo` - Wheel information

#### `getWheelTransformWorld(wheelIndex)`
Gets the world transform for the specified wheel.

**Parameters:**
- `wheelIndex` `number` - Wheel index

**Returns:** `BABYLON.TransformNode`

### Utility Methods

#### `getVehicleAxisWorld(axisIndex, result)`
Gets the vehicle axis in world coordinates.

**Parameters:**
- `axisIndex` `number` - Axis index
- `result` `BABYLON.Vector3` - Result vector

**Returns:** `BABYLON.Vector3`

#### `castRay2(wheel)`
Performs raycast for wheel collision detection.

**Parameters:**
- `wheel` `TOOLKIT.HavokWheelInfo` - Wheel information

**Returns:** `number`

## Usage Examples

### Basic Vehicle Creation
```typescript
const vehicleOptions = {
    chassisBody: chassisPhysicsBody,
    indexRightAxis: 0,
    indexUpAxis: 1,
    indexForwardAxis: 2
};

const havokVehicle = new TOOLKIT.HavokRaycastVehicle(vehicleOptions);
havokVehicle.addToWorld(scene.getPhysicsEngine());
```

### Adding Wheels
```typescript
const wheelOptions = {
    chassisConnectionPointLocal: new BABYLON.Vector3(-1, -0.5, 1.5),
    directionLocal: new BABYLON.Vector3(0, -1, 0),
    axleLocal: new BABYLON.Vector3(-1, 0, 0),
    suspensionRestLength: 0.3,
    radius: 0.4,
    isFrontWheel: true,
    suspensionStiffness: 20,
    dampingCompression: 4.4,
    dampingRelaxation: 2.3,
    frictionSlip: 1000,
    rollInfluence: 0.1
};

const frontLeftWheel = havokVehicle.addWheel(wheelOptions);

wheelOptions.chassisConnectionPointLocal.x = 1;
const frontRightWheel = havokVehicle.addWheel(wheelOptions);

wheelOptions.chassisConnectionPointLocal.z = -1.5;
wheelOptions.isFrontWheel = false;
const rearRightWheel = havokVehicle.addWheel(wheelOptions);

wheelOptions.chassisConnectionPointLocal.x = -1;
const rearLeftWheel = havokVehicle.addWheel(wheelOptions);
```

### Vehicle Control
```typescript
const maxEngineForce = 1500;
const maxBrakeForce = 100;
const maxSteeringAngle = 0.3;

let engineForce = 0;
let brakeForce = 0;
let steeringAngle = 0;

if (TOOLKIT.InputController.GetKey("w")) {
    engineForce = maxEngineForce;
} else if (TOOLKIT.InputController.GetKey("s")) {
    engineForce = -maxEngineForce;
}

if (TOOLKIT.InputController.GetKey("space")) {
    brakeForce = maxBrakeForce;
}

if (TOOLKIT.InputController.GetKey("a")) {
    steeringAngle = -maxSteeringAngle;
} else if (TOOLKIT.InputController.GetKey("d")) {
    steeringAngle = maxSteeringAngle;
}

havokVehicle.applyEngineForce(engineForce, 2);
havokVehicle.applyEngineForce(engineForce, 3);

havokVehicle.setBrake(brakeForce, 0);
havokVehicle.setBrake(brakeForce, 1);
havokVehicle.setBrake(brakeForce, 2);
havokVehicle.setBrake(brakeForce, 3);

havokVehicle.setSteeringValue(steeringAngle, 0);
havokVehicle.setSteeringValue(steeringAngle, 1);
```

### Physics Update Loop
```typescript
scene.registerBeforeRender(() => {
    const deltaTime = scene.getEngine().getDeltaTime() / 1000.0;
    
    havokVehicle.updateVehicle(deltaTime);
    
    for (let i = 0; i < havokVehicle.getNumWheels(); i++) {
        havokVehicle.updateWheelTransform(i);
        
        const wheelTransform = havokVehicle.getWheelTransformWorld(i);
        const wheelMesh = scene.getMeshByName(`Wheel_${i}`);
        if (wheelMesh && wheelTransform) {
            wheelMesh.position.copyFrom(wheelTransform.position);
            wheelMesh.rotationQuaternion = wheelTransform.rotationQuaternion?.clone();
        }
    }
    
    const speed = havokVehicle.getCurrentSpeedKmHour();
    console.log(`Vehicle Speed: ${speed.toFixed(1)} km/h`);
});
```

### Advanced Configuration
```typescript
havokVehicle.stabilizingForce = 30;
havokVehicle.smoothFlyingImpulse = 100;
havokVehicle.maxImpulseForce = 10000;
havokVehicle.minimumWheelContacts = 2;

for (let i = 0; i < havokVehicle.getNumWheels(); i++) {
    const wheelInfo = havokVehicle.getWheelInfo(i);
    wheelInfo.suspensionStiffness = 25;
    wheelInfo.dampingCompression = 5.0;
    wheelInfo.dampingRelaxation = 3.0;
    wheelInfo.frictionSlip = 1200;
}
```

## Related Classes
- [HavokWheelInfo](HavokWheelInfo.md) - Wheel configuration and state
- [HavokVehicleUtilities](HavokVehicleUtilities.md) - Vehicle physics utilities
- [RaycastVehicle](RaycastVehicle.md) - High-level vehicle controller
- [RigidbodyPhysics](RigidbodyPhysics.md) - Physics system integration
