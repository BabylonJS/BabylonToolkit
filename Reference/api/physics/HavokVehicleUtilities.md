# HavokVehicleUtilities

Static utility class providing low-level vehicle physics calculations and helper functions for Havok-based vehicle simulation.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

HavokVehicleUtilities contains static methods and properties for performing complex vehicle physics calculations including friction, impulse forces, rolling resistance, and body dynamics. These utilities support the Havok vehicle physics system.

## Static Properties

### Vector Utilities
- **`directions`** `BABYLON.Vector3[]` - Direction vectors for calculations
- **`calcRollingFriction_vel1`** `BABYLON.Vector3` - Rolling friction velocity 1
- **`calcRollingFriction_vel2`** `BABYLON.Vector3` - Rolling friction velocity 2
- **`calcRollingFriction_vel`** `BABYLON.Vector3` - Rolling friction velocity result
- **`updateFriction_surfNormalWS_scaled_proj`** `BABYLON.Vector3` - Surface normal projection
- **`updateFriction_axle`** `BABYLON.Vector3[]` - Friction axle vectors
- **`updateFriction_forwardWS`** `BABYLON.Vector3[]` - Forward world space vectors

### Temporary Calculation Vectors
- **`castRay_rayvector`** `BABYLON.Vector3` - Ray vector for casting
- **`castRay_target`** `BABYLON.Vector3` - Ray target position
- **`torque`** `BABYLON.Vector3` - Torque calculation vector
- **`tmpVec1`** `BABYLON.Vector3` - Temporary vector 1
- **`tmpVec2`** `BABYLON.Vector3` - Temporary vector 2
- **`tmpVec3`** `BABYLON.Vector3` - Temporary vector 3
- **`tmpVec4`** `BABYLON.Vector3` - Temporary vector 4
- **`tmpVec5`** `BABYLON.Vector3` - Temporary vector 5
- **`tmpVec6`** `BABYLON.Vector3` - Temporary vector 6
- **`tmpVel2`** `BABYLON.Vector3` - Temporary velocity vector
- **`tmpMat1`** `BABYLON.Matrix` - Temporary matrix

### Physics Constants
- **`sideFrictionStiffness2`** `number` - Side friction stiffness value

### Impulse Calculation Vectors
- **`computeImpulseDenominator_r0`** `BABYLON.Vector3` - Impulse denominator r0
- **`computeImpulseDenominator_c0`** `BABYLON.Vector3` - Impulse denominator c0
- **`computeImpulseDenominator_vec`** `BABYLON.Vector3` - Impulse denominator vector
- **`computeImpulseDenominator_m`** `BABYLON.Vector3` - Impulse denominator m
- **`bodyPositionVec`** `BABYLON.Vector3` - Body position vector
- **`bodyInertiaVec`** `BABYLON.Vector3` - Body inertia vector

### Bilateral Constraint Vectors
- **`resolveSingleBilateral_vel1`** `BABYLON.Vector3` - Bilateral velocity 1
- **`resolveSingleBilateral_vel2`** `BABYLON.Vector3` - Bilateral velocity 2
- **`resolveSingleBilateral_vel`** `BABYLON.Vector3` - Bilateral velocity result
- **`chassis_velocity_at_contactPoint`** `BABYLON.Vector3` - Chassis velocity at contact
- **`relpos`** `BABYLON.Vector3` - Relative position vector

## Static Physics Methods

### Body Property Access

#### `velocityAt(body, pos, res)`
Calculates velocity at a specific position on a physics body.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body
- `pos` `any` - Position
- `res` `any` - Result vector

**Returns:** `any`

#### `bodyPosition(body, res)`
Gets the position of a physics body.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body
- `res` `any` - Result vector

**Returns:** `any`

#### `bodyLinearVelocity(body, res)`
Gets the linear velocity of a physics body.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body
- `res` `any` - Result vector

**Returns:** `any`

#### `bodyAngularVelocity(body, res)`
Gets the angular velocity of a physics body.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body
- `res` `any` - Result vector

**Returns:** `any`

#### `bodyTransform(body, res)`
Gets the transform of a physics body.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body
- `res` `any` - Result transform

**Returns:** `any`

#### `bodyOrientation(body, res)`
Gets the orientation of a physics body.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body
- `res` `any` - Result orientation

**Returns:** `any`

#### `bodyMass(body)`
Gets the mass of a physics body.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body

**Returns:** `number`

#### `bodyInvMass(body)`
Gets the inverse mass of a physics body.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body

**Returns:** `number`

#### `bodyInertiaWorld(body, res)`
Gets the world inertia of a physics body.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body
- `res` `any` - Result inertia

**Returns:** `any`

### Force Application

#### `addImpulseAt(body, impulse, point)`
Adds an impulse force at a specific point on a physics body.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body
- `impulse` `any` - Impulse vector
- `point` `any` - Application point

#### `addForceAt(body, force, point)`
Adds a force at a specific point on a physics body.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body
- `force` `any` - Force vector
- `point` `any` - Application point

### Physics Calculations

#### `calcRollingFriction(body0, body1, frictionPosWorld, frictionDirectionWorld, maxImpulse)`
Calculates rolling friction between two physics bodies.

**Parameters:**
- `body0` `BABYLON.PhysicsBody` - First physics body
- `body1` `BABYLON.PhysicsBody` - Second physics body
- `frictionPosWorld` `any` - Friction position in world space
- `frictionDirectionWorld` `any` - Friction direction in world space
- `maxImpulse` `any` - Maximum impulse

**Returns:** `number`

#### `computeImpulseDenominator(body, pos, normal)`
Computes the impulse denominator for collision response.

**Parameters:**
- `body` `BABYLON.PhysicsBody` - Physics body
- `pos` `any` - Position
- `normal` `any` - Normal vector

**Returns:** `number`

#### `resolveSingleBilateral(body1, pos1, body2, pos2, normal)`
Resolves a single bilateral constraint between two bodies.

**Parameters:**
- `body1` `BABYLON.PhysicsBody` - First physics body
- `pos1` `any` - Position on first body
- `body2` `BABYLON.PhysicsBody` - Second physics body
- `pos2` `any` - Position on second body
- `normal` `any` - Constraint normal

**Returns:** `number`

### Utility Functions

#### `Utilsdefaults(options, defaults)`
Applies default values to options object.

**Parameters:**
- `options` `any` - Options object
- `defaults` `any` - Default values

**Returns:** `any`

## Usage Examples

### Basic Physics Body Information
```typescript
const chassisBody = vehicle.chassisBody;
const position = new BABYLON.Vector3();
const velocity = new BABYLON.Vector3();
const angularVel = new BABYLON.Vector3();

TOOLKIT.HavokVehicleUtilities.bodyPosition(chassisBody, position);
TOOLKIT.HavokVehicleUtilities.bodyLinearVelocity(chassisBody, velocity);
TOOLKIT.HavokVehicleUtilities.bodyAngularVelocity(chassisBody, angularVel);

const mass = TOOLKIT.HavokVehicleUtilities.bodyMass(chassisBody);
const invMass = TOOLKIT.HavokVehicleUtilities.bodyInvMass(chassisBody);

console.log(`Vehicle mass: ${mass}kg, inverse mass: ${invMass}`);
console.log(`Position: ${position.toString()}`);
console.log(`Velocity: ${velocity.toString()}`);
```

### Force Application
```typescript
const downForce = new BABYLON.Vector3(0, -1000, 0);
const rearAxlePoint = new BABYLON.Vector3(0, -0.5, -1.5);

TOOLKIT.HavokVehicleUtilities.addForceAt(chassisBody, downForce, rearAxlePoint);

const brakeImpulse = new BABYLON.Vector3(0, 0, -500);
const frontAxlePoint = new BABYLON.Vector3(0, -0.5, 1.5);

TOOLKIT.HavokVehicleUtilities.addImpulseAt(chassisBody, brakeImpulse, frontAxlePoint);
```

### Rolling Friction Calculation
```typescript
const wheelBody = wheelInfo.chassisBody;
const groundBody = groundPhysicsBody;
const contactPoint = wheelInfo.raycastResult.hitPointWorld;
const frictionDirection = new BABYLON.Vector3(1, 0, 0);
const maxFrictionImpulse = 1000;

const rollingFriction = TOOLKIT.HavokVehicleUtilities.calcRollingFriction(
    wheelBody,
    groundBody,
    contactPoint,
    frictionDirection,
    maxFrictionImpulse
);

console.log(`Rolling friction: ${rollingFriction}`);
```

### Impulse Denominator Calculation
```typescript
const contactNormal = new BABYLON.Vector3(0, 1, 0);
const contactPosition = wheelInfo.chassisConnectionPointWorld;

const impulseDenominator = TOOLKIT.HavokVehicleUtilities.computeImpulseDenominator(
    chassisBody,
    contactPosition,
    contactNormal
);

console.log(`Impulse denominator: ${impulseDenominator}`);
```

### Bilateral Constraint Resolution
```typescript
const body1 = vehicle.chassisBody;
const body2 = groundPhysicsBody;
const pos1 = wheelInfo.chassisConnectionPointWorld;
const pos2 = wheelInfo.raycastResult.hitPointWorld;
const constraintNormal = new BABYLON.Vector3(0, 1, 0);

const bilateralForce = TOOLKIT.HavokVehicleUtilities.resolveSingleBilateral(
    body1, pos1,
    body2, pos2,
    constraintNormal
);

console.log(`Bilateral constraint force: ${bilateralForce}`);
```

### Velocity at Contact Point
```typescript
const contactPoint = wheelInfo.raycastResult.hitPointWorld;
const velocityAtContact = new BABYLON.Vector3();

TOOLKIT.HavokVehicleUtilities.velocityAt(chassisBody, contactPoint, velocityAtContact);

console.log(`Velocity at contact: ${velocityAtContact.toString()}`);
```

### Default Options Utility
```typescript
const wheelDefaults = {
    suspensionStiffness: 20,
    dampingCompression: 4.4,
    dampingRelaxation: 2.3,
    frictionSlip: 1000,
    rollInfluence: 0.1
};

const userWheelOptions = {
    suspensionStiffness: 25,
    frictionSlip: 1200
};

const finalOptions = TOOLKIT.HavokVehicleUtilities.Utilsdefaults(userWheelOptions, wheelDefaults);

console.log("Final wheel options:", finalOptions);
```

## Related Classes
- [HavokRaycastVehicle](HavokRaycastVehicle.md) - Havok-based vehicle physics
- [HavokWheelInfo](HavokWheelInfo.md) - Wheel configuration and state
- [RaycastVehicle](RaycastVehicle.md) - High-level vehicle controller
- [RigidbodyPhysics](RigidbodyPhysics.md) - Physics system integration
