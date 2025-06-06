# CharacterController

Unity-style physics-based character controller system for realistic character movement with collision detection, slope handling, and step climbing.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Extends**: `TOOLKIT.ScriptComponent`  
**Copyright**: All rights reserved (c) 2020 Mackey Kinard

## Overview

CharacterController provides a comprehensive physics-based character movement system similar to Unity's CharacterController. It handles collision detection, slope sliding, step climbing, gravity, and grounded state detection using the Havok Physics Engine.

## Static Properties

### Physics Constants
- **`TERMINAL_VELOCITY`** `number` - Maximum falling velocity
- **`SLOPE_GRAVITY_FORCE`** `number` - Gravity force applied on slopes
- **`UPHILL_GRAVITY_FORCE`** `number` - Gravity force when moving uphill
- **`STATIC_GRAVITY_FORCE`** `number` - Gravity force when stationary
- **`DEFAULT_GRAVITY_FORCE`** `number` - Standard gravity force value
- **`DEFAULT_JUMPING_TIMER`** `number` - Default jump cooldown time
- **`DEFAULT_SLIDING_TIMER`** `number` - Default slide duration
- **`DEFAULT_CHARACTER_MASS`** `number` - Default character mass
- **`MIN_GROUND_CHECK_DISTANCE`** `number` - Minimum ground detection distance
- **`MIN_GROUND_CHECK_SKINWIDTH`** `number` - Minimum skin width for ground detection
- **`MIN_GROUND_CHECK_SLOPEANGLE`** `number` - Minimum slope angle for ground detection

## Instance Properties

### Character Configuration
- **`avatarRadius`** `number` - Character capsule radius
- **`avatarHeight`** `number` - Character capsule height
- **`centerOffset`** `BABYLON.Vector3` - Center offset from transform
- **`skinWidth`** `number` - Collision skin width
- **`stepHeight`** `number` - Maximum step height for climbing
- **`gravityFactor`** `number` - Gravity multiplier
- **`minMoveDistance`** `number` - Minimum movement distance
- **`slopeSlideSpeed`** `number` - Speed when sliding on slopes
- **`slopeLimit`** `number` - Maximum slope angle in radians

### Movement State
- **`inputVelocity`** `BABYLON.Vector3` - Current input velocity
- **`verticalVelocity`** `number` - Current vertical velocity
- **`verticalStepSpeed`** `number` - Step climbing speed
- **`minimumStepHeight`** `number` - Minimum step height
- **`slopeAngleRadians`** `number` - Current slope angle in radians
- **`slopeAngleDegrees`** `number` - Current slope angle in degrees

### Physics State
- **`isGrounded`** `boolean` - Whether character is on ground
- **`isSliding`** `boolean` - Whether character is sliding on slope
- **`isSteppingUp`** `boolean` - Whether character is climbing step
- **`groundCollisionNode`** `BABYLON.TransformNode` - Ground collision reference

### Configuration Options
- **`enableStepOffset`** `boolean` - Enable step climbing feature
- **`enableGravity`** `boolean` - Enable gravity application
- **`downwardForce`** `number` - Extra downward force
- **`raycastLength`** `number` - Minimum raycast length
- **`showRaycasts`** `boolean` - Debug mode to show ray lines
- **`verticalVelocityOffset`** `number` - Vertical velocity offset

### Events
- **`onUpdatePositionObservable`** `BABYLON.Observable<BABYLON.TransformNode>` - Triggered when position updates
- **`onUpdateVelocityObservable`** `BABYLON.Observable<BABYLON.TransformNode>` - Triggered when velocity updates

## Character Control Methods

### Movement Control

#### `move(velocity, aux?)`
Translates the character with the specified linear velocity.

**Parameters:**
- `velocity` `BABYLON.Vector3` - Movement velocity vector
- `aux?` `boolean` - Auxiliary parameter (optional)

#### `jump(speed)`
Jumps the character with the specified speed.

**Parameters:**
- `speed` `number` - Jump velocity

#### `turn(angle)`
Turns the character to the specified angular velocity.

**Parameters:**
- `angle` `number` - Turn angle in radians

#### `rotate(x, y, z, w)`
Rotates the character to the specified rotation.

**Parameters:**
- `x` `number` - X component of quaternion
- `y` `number` - Y component of quaternion
- `z` `number` - Z component of quaternion
- `w` `number` - W component of quaternion

#### `translate(x, y, z)`
Translates the character to the specified position.

**Parameters:**
- `x` `number` - X position
- `y` `number` - Y position
- `z` `number` - Z position

#### `set(px, py, pz, rx?, ry?, rz?, rw?)`
Sets the character position and rotation to the specified values.

**Parameters:**
- `px` `number` - X position
- `py` `number` - Y position
- `pz` `number` - Z position
- `rx?` `number` - X rotation (optional)
- `ry?` `number` - Y rotation (optional)
- `rz?` `number` - Z rotation (optional)
- `rw?` `number` - W rotation (optional)

### State Query Methods

#### `isGrounded()`
Returns whether the character is currently on the ground.

**Returns:** `boolean`

#### `isSliding()`
Returns whether the character is currently sliding on a slope.

**Returns:** `boolean`

#### `isSteppingUp()`
Returns whether the character is currently climbing a step.

**Returns:** `boolean`

#### `canSlide()`
Returns whether the character can slide on the current surface.

**Returns:** `boolean`

#### `canJump()`
Returns whether the character can currently jump.

**Returns:** `boolean`

### Property Accessors

#### `getAvatarRadius()`
Gets the character capsule radius.

**Returns:** `number`

#### `getAvatarHeight()`
Gets the character capsule height.

**Returns:** `number`

#### `getCenterOffset()`
Gets the center offset from transform.

**Returns:** `BABYLON.Vector3`

#### `getSkinWidth()`
Gets the collision skin width.

**Returns:** `number`

#### `getStepHeight()`
Gets the maximum step height.

**Returns:** `number`

#### `getGravityFactor()`
Gets the gravity multiplier.

**Returns:** `number`

#### `setGravityFactor(factor)`
Sets the gravity multiplier.

**Parameters:**
- `factor` `number` - Gravity multiplier

#### `getInputVelocity()`
Gets the current input velocity.

**Returns:** `BABYLON.Vector3`

#### `getVerticalVelocity()`
Gets the current vertical velocity.

**Returns:** `number`

#### `getSlopeAngleRadians()`
Gets the current slope angle in radians.

**Returns:** `number`

#### `getSlopeAngleDegrees()`
Gets the current slope angle in degrees.

**Returns:** `number`

#### `getGroundCollisionNode()`
Gets the ground collision reference node.

**Returns:** `BABYLON.TransformNode`

#### `getVerticalStepSpeed()`
Gets the step climbing speed.

**Returns:** `number`

#### `setVerticalStepSpeed(speed)`
Sets the step climbing speed.

**Parameters:**
- `speed` `number` - Step climbing speed

#### `getMinimumStepHeight()`
Gets the minimum step height.

**Returns:** `number`

#### `setMinimumStepHeight(height)`
Sets the minimum step height.

**Parameters:**
- `height` `number` - Minimum step height

#### `getMinMoveDistance()`
Gets the minimum movement distance.

**Returns:** `number`

#### `setMinMoveDistance(distance)`
Sets the minimum movement distance.

**Parameters:**
- `distance` `number` - Minimum movement distance

#### `getSlopeSlideSpeed()`
Gets the slope sliding speed.

**Returns:** `number`

#### `setSlopeSlideSpeed(speed)`
Sets the slope sliding speed.

**Parameters:**
- `speed` `number` - Slope sliding speed

#### `getSlopeLimit()`
Gets the maximum slope angle.

**Returns:** `number`

#### `setSlopeLimit(slopeRadians)`
Sets the maximum slope angle.

**Parameters:**
- `slopeRadians` `number` - Maximum slope angle in radians

### Physics Configuration

#### `setRigidBodyMass(mass)`
Sets the character controller rigidbody mass property.

**Parameters:**
- `mass` `number` - Character mass

#### `setCollisionState(collision)`
Sets the character controller rigidbody collision type.

**Parameters:**
- `collision` `boolean` - Collision state

## Usage Examples

### Basic Character Setup
```typescript
const characterController = new TOOLKIT.CharacterController(transform, scene);

characterController.enableGravity = true;
characterController.enableStepOffset = true;
characterController.setGravityFactor(1.0);
characterController.setSlopeLimit(TOOLKIT.System.Deg2Rad * 45);

characterController.setMinimumStepHeight(0.3);
characterController.setVerticalStepSpeed(5.0);
```

### Character Movement
```typescript
const inputVelocity = new BABYLON.Vector3();

if (TOOLKIT.InputController.GetKeyboardInput(87)) { // W key
    inputVelocity.z = 5.0;
}
if (TOOLKIT.InputController.GetKeyboardInput(83)) { // S key
    inputVelocity.z = -5.0;
}
if (TOOLKIT.InputController.GetKeyboardInput(65)) { // A key
    inputVelocity.x = -5.0;
}
if (TOOLKIT.InputController.GetKeyboardInput(68)) { // D key
    inputVelocity.x = 5.0;
}

characterController.move(inputVelocity);

if (TOOLKIT.InputController.GetKeyDown("space") && characterController.canJump()) {
    characterController.jump(8.0);
}
```

### Character State Monitoring
```typescript
characterController.onUpdatePositionObservable.add((transform) => {
    console.log("Character position updated:", transform.position);
});

characterController.onUpdateVelocityObservable.add((transform) => {
    console.log("Character velocity updated");
});

if (characterController.isGrounded()) {
    console.log("Character is on ground");
}

if (characterController.isSliding()) {
    console.log("Character is sliding on slope:", 
                characterController.getSlopeAngleDegrees() + " degrees");
}

if (characterController.isSteppingUp()) {
    console.log("Character is climbing step");
}
```

## Related Classes
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
- [SimpleCharacterController](SimpleCharacterController.md) - Non-physics character controller
- [RecastCharacterController](RecastCharacterController.md) - Navigation-based character controller
- [RigidbodyPhysics](RigidbodyPhysics.md) - Physics system integration
