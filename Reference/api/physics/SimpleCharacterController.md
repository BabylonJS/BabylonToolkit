# SimpleCharacterController

Simple non-physics based character controller system for basic character movement without collision detection or physics simulation.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Extends**: `TOOLKIT.ScriptComponent`  
**Copyright**: All rights reserved (c) 2020 Mackey Kinard

## Overview

SimpleCharacterController provides a lightweight character movement system that directly manipulates transform position and rotation without physics simulation. This is ideal for scenarios where you need basic character control without the complexity of physics-based movement.

## Character Control Methods

### Movement Control

#### `move(velocity, aux?)`
Translates the character with the specified velocity. The aux parameter is not used in this implementation.

**Parameters:**
- `velocity` `BABYLON.Vector3` - Movement velocity vector
- `aux?` `boolean` - Auxiliary parameter (not used)

#### `jump(speed)`
Jumps the character with the specified speed. Note: Without physics, this is a simple upward translation.

**Parameters:**
- `speed` `number` - Jump velocity

#### `turn(angle)`
Turns the character to the specified angle.

**Parameters:**
- `angle` `number` - Turn angle in radians

#### `rotate(x, y, z, w)`
Rotates the character to the specified quaternion.

**Parameters:**
- `x` `number` - X component of quaternion
- `y` `number` - Y component of quaternion
- `z` `number` - Z component of quaternion
- `w` `number` - W component of quaternion

#### `set(px, py, pz, rx?, ry?, rz?, rw?, aux?)`
Sets the character position and rotation to the specified values. The aux parameter is not used.

**Parameters:**
- `px` `number` - X position
- `py` `number` - Y position
- `pz` `number` - Z position
- `rx?` `number` - X rotation (optional)
- `ry?` `number` - Y rotation (optional)
- `rz?` `number` - Z rotation (optional)
- `rw?` `number` - W rotation (optional)
- `aux?` `boolean` - Auxiliary parameter (not used)

## Usage Examples

### Basic Character Setup
```typescript
const simpleController = new TOOLKIT.SimpleCharacterController(transform, scene);
```

### Character Movement
```typescript
const moveSpeed = 5.0;
const deltaTime = scene.getEngine().getDeltaTime() / 1000.0;

const inputDirection = new BABYLON.Vector3();

if (TOOLKIT.InputController.GetKey("w")) {
    inputDirection.z = 1.0;
}
if (TOOLKIT.InputController.GetKey("s")) {
    inputDirection.z = -1.0;
}
if (TOOLKIT.InputController.GetKey("a")) {
    inputDirection.x = -1.0;
}
if (TOOLKIT.InputController.GetKey("d")) {
    inputDirection.x = 1.0;
}

inputDirection.normalize();
inputDirection.scaleInPlace(moveSpeed * deltaTime);

simpleController.move(inputDirection);
```

### Character Rotation
```typescript
const mouseSensitivity = 0.002;
const mouseX = TOOLKIT.InputController.GetMouseX();
const mouseY = TOOLKIT.InputController.GetMouseY();

const yawAngle = mouseX * mouseSensitivity;
const pitchAngle = mouseY * mouseSensitivity;

simpleController.turn(yawAngle);

const rotation = BABYLON.Quaternion.RotationYawPitchRoll(yawAngle, pitchAngle, 0);
simpleController.rotate(rotation.x, rotation.y, rotation.z, rotation.w);
```

### Direct Position Control
```typescript
simpleController.set(10, 0, 5);

const targetRotation = BABYLON.Quaternion.RotationY(Math.PI / 2);
simpleController.set(
    10, 0, 5,
    targetRotation.x, targetRotation.y, targetRotation.z, targetRotation.w
);
```

## Related Classes
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
- [CharacterController](CharacterController.md) - Physics-based character controller
- [RecastCharacterController](RecastCharacterController.md) - Navigation-based character controller
- [InputController](../input/InputController.md) - Input handling system
