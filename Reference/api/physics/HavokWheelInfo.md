# HavokWheelInfo

Vehicle wheel configuration and state information for Havok-based vehicle physics simulation.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

HavokWheelInfo contains all the configuration parameters and runtime state information for individual vehicle wheels in the Havok physics system. It manages suspension properties, friction settings, steering angles, and contact information.

## Instance Properties

### Suspension Configuration
- **`suspensionRestLength`** `number` - Rest length of suspension
- **`suspensionMaxLength`** `number` - Maximum suspension extension
- **`maxSuspensionTravel`** `number` - Maximum suspension travel distance
- **`suspensionStiffness`** `number` - Suspension spring stiffness
- **`dampingCompression`** `number` - Damping during compression
- **`dampingRelaxation`** `number` - Damping during relaxation
- **`maxSuspensionForce`** `number` - Maximum suspension force

### Wheel Physical Properties
- **`radius`** `number` - Wheel radius
- **`frictionSlip`** `number` - Friction slip coefficient
- **`rollInfluence`** `number` - Roll influence factor
- **`defaultFriction`** `number` - Default friction value

### Wheel Positioning
- **`chassisConnectionPointLocal`** `BABYLON.Vector3` - Local connection point to chassis
- **`chassisConnectionPointWorld`** `BABYLON.Vector3` - World connection point to chassis
- **`directionLocal`** `BABYLON.Vector3` - Local suspension direction
- **`directionWorld`** `BABYLON.Vector3` - World suspension direction
- **`axleLocal`** `BABYLON.Vector3` - Local axle direction
- **`axleWorld`** `BABYLON.Vector3` - World axle direction

### Wheel Control
- **`steering`** `number` - Current steering angle
- **`steeringAngle`** `number` - Steering angle value
- **`rotation`** `number` - Wheel rotation
- **`deltaRotation`** `number` - Change in rotation
- **`engineForce`** `number` - Applied engine force
- **`brake`** `number` - Applied brake force
- **`isFrontWheel`** `boolean` - Whether this is a front wheel
- **`locked`** `boolean` - Whether the wheel is locked

### Runtime State
- **`sliding`** `boolean` - Whether the wheel is sliding
- **`isInContact`** `boolean` - Whether wheel is in contact with ground
- **`suspensionLength`** `number` - Current suspension length
- **`suspensionRelativeVelocity`** `number` - Suspension velocity
- **`suspensionForce`** `number` - Current suspension force
- **`skidInfo`** `number` - Skid information
- **`slipInfo`** `number` - Slip information

### Contact Information
- **`clippedInvContactDotSuspension`** `number` - Clipped inverse contact dot suspension
- **`sideImpulse`** `number` - Side impulse force
- **`forwardImpulse`** `number` - Forward impulse force
- **`raycastResult`** `BABYLON.PhysicsRaycastResult` - Raycast collision result

### Visual Properties
- **`worldTransform`** `BABYLON.TransformNode` - World transform for visual representation
- **`hub`** `BABYLON.TransformNode` - Wheel hub transform
- **`spinner`** `BABYLON.TransformNode` - Wheel spinner transform
- **`visualTravelRange`** `number` - Visual travel range
- **`invertDirection`** `boolean` - Whether to invert direction
- **`rotationBoost`** `number` - Rotation boost factor

### Advanced Properties
- **`customSlidingRotationalSpeed`** `number` - Custom sliding rotational speed
- **`useCustomSlidingRotationalSpeed`** `number` - Whether to use custom sliding speed

## Wheel Management Methods

#### `constructor(options)`
Creates a new wheel information object.

**Parameters:**
- `options` `any` - Wheel configuration options

#### `updateWheel(chassis)`
Updates the wheel state based on chassis information.

**Parameters:**
- `chassis` `any` - Chassis reference

## Usage Examples

### Basic Wheel Configuration
```typescript
const wheelOptions = {
    chassisConnectionPointLocal: new BABYLON.Vector3(-1.2, -0.4, 1.6),
    directionLocal: new BABYLON.Vector3(0, -1, 0),
    axleLocal: new BABYLON.Vector3(-1, 0, 0),
    suspensionRestLength: 0.3,
    radius: 0.35,
    isFrontWheel: true,
    suspensionStiffness: 20,
    dampingCompression: 4.4,
    dampingRelaxation: 2.3,
    frictionSlip: 1000,
    rollInfluence: 0.1,
    maxSuspensionTravel: 0.5,
    maxSuspensionForce: 6000
};

const wheelInfo = new TOOLKIT.HavokWheelInfo(wheelOptions);
```

### Suspension Tuning
```typescript
wheelInfo.suspensionStiffness = 25;
wheelInfo.dampingCompression = 5.0;
wheelInfo.dampingRelaxation = 3.0;
wheelInfo.maxSuspensionTravel = 0.4;
wheelInfo.maxSuspensionForce = 8000;
```

### Friction Configuration
```typescript
wheelInfo.frictionSlip = 1200;
wheelInfo.defaultFriction = 0.8;
wheelInfo.rollInfluence = 0.15;
```

### Wheel State Monitoring
```typescript
function monitorWheelState(wheelInfo: TOOLKIT.HavokWheelInfo, wheelIndex: number) {
    console.log(`Wheel ${wheelIndex}:`);
    console.log(`  In Contact: ${wheelInfo.isInContact}`);
    console.log(`  Sliding: ${wheelInfo.sliding}`);
    console.log(`  Suspension Length: ${wheelInfo.suspensionLength.toFixed(3)}`);
    console.log(`  Suspension Force: ${wheelInfo.suspensionForce.toFixed(1)}`);
    console.log(`  Skid Info: ${wheelInfo.skidInfo.toFixed(3)}`);
    console.log(`  Slip Info: ${wheelInfo.slipInfo.toFixed(3)}`);
    console.log(`  Engine Force: ${wheelInfo.engineForce.toFixed(1)}`);
    console.log(`  Brake Force: ${wheelInfo.brake.toFixed(1)}`);
}
```

### Visual Wheel Updates
```typescript
function updateWheelVisuals(wheelInfo: TOOLKIT.HavokWheelInfo, wheelMesh: BABYLON.Mesh) {
    if (wheelInfo.worldTransform) {
        wheelMesh.position.copyFrom(wheelInfo.worldTransform.position);
        wheelMesh.rotationQuaternion = wheelInfo.worldTransform.rotationQuaternion?.clone();
    }
    
    wheelMesh.rotation.z += wheelInfo.deltaRotation;
    
    if (wheelInfo.hub) {
        wheelInfo.hub.rotation.y = wheelInfo.steeringAngle;
    }
}
```

## Related Classes
- [HavokRaycastVehicle](HavokRaycastVehicle.md) - Havok-based vehicle physics
- [HavokVehicleUtilities](HavokVehicleUtilities.md) - Vehicle physics utilities
- [RaycastVehicle](RaycastVehicle.md) - High-level vehicle controller
- [RigidbodyPhysics](RigidbodyPhysics.md) - Physics system integration
