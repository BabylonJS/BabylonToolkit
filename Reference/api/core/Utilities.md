# Utilities

A comprehensive collection of utility functions and helpers for mathematical operations, transformations, physics calculations, and general-purpose toolkit functionality.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

The Utilities class provides a wide range of static methods for common operations in 3D development, including vector mathematics, quaternion operations, coordinate transformations, physics calculations, and various helper functions for working with Babylon.js objects.

## Mathematical Utilities

### Vector Operations

#### `GetAngle(from, to)`
Returns the angle in degrees between two vectors.

**Parameters:**
- `from` `BABYLON.Vector3` - First vector
- `to` `BABYLON.Vector3` - Second vector

**Returns:** `number` - Angle in degrees

#### `GetAngleRadians(from, to)`
Returns the angle in radians between two vectors.

**Parameters:**
- `from` `BABYLON.Vector3` - First vector
- `to` `BABYLON.Vector3` - Second vector

**Returns:** `number` - Angle in radians

#### `ProjectVector(vector, onnormal)`
Projects a vector onto another vector.

**Parameters:**
- `vector` `BABYLON.Vector3` - Vector to project
- `onnormal` `BABYLON.Vector3` - Normal vector to project onto

**Returns:** `BABYLON.Vector3` - Projected vector

#### `ProjectVectorOnPlane(vector, planenormal)`
Projects a vector onto a plane defined by a normal orthogonal to the plane.

**Parameters:**
- `vector` `BABYLON.Vector3` - Vector to project
- `planenormal` `BABYLON.Vector3` - Plane normal vector

**Returns:** `BABYLON.Vector3` - Projected vector

#### `AreVectorsEqual(v1, v2, p)`
Checks if two vectors are equal within a precision.

**Parameters:**
- `v1` `BABYLON.Vector3` - First vector
- `v2` `BABYLON.Vector3` - Second vector
- `p` `number` - Precision value

**Returns:** `boolean` - True if vectors are equal within precision

### Angle Operations

#### `ClampAngle(angle, min, max)`
Default Unity style angle clamping.

**Parameters:**
- `angle` `number` - Angle to clamp
- `min` `number` - Minimum angle
- `max` `number` - Maximum angle

**Returns:** `number` - Clamped angle

#### `ClampAngle180(angle, min, max)`
Clamps angle with 180-degree range handling.

**Parameters:**
- `angle` `number` - Angle in range 0 to 360
- `min` `number` - Min angle in range -180 to 180
- `max` `number` - Max angle in range -180 to 180

**Returns:** `number` - Clamped angle in range 0 to 360

#### `ClampAngle360(angle, min, max)`
Clamps angle with 360-degree range handling.

**Parameters:**
- `angle` `number` - Angle in range 0 to 360
- `min` `number` - Min angle in range 0 to 360
- `max` `number` - Max angle in range 0 to 360

**Returns:** `number` - Clamped angle in range 0 to 360

### Smooth Interpolation

#### `SmoothDamp(current, target, smoothTime, maxSpeed, deltaTime, currentVelocity)`
Gradually changes a number towards a desired goal over time.

**Parameters:**
- `current` `number` - Current value
- `target` `number` - Target value
- `smoothTime` `number` - Smooth time
- `maxSpeed` `number` - Maximum speed
- `deltaTime` `number` - Delta time
- `currentVelocity` `BABYLON.Vector2` - Current velocity (uses x component as output)

**Returns:** `number` - Smoothed value

#### `SmoothDampAngle(current, target, smoothTime, maxSpeed, deltaTime, currentVelocity)`
Gradually changes an angle given in degrees towards a desired goal angle over time.

**Parameters:**
- `current` `number` - Current angle in degrees
- `target` `number` - Target angle in degrees
- `smoothTime` `number` - Smooth time
- `maxSpeed` `number` - Maximum speed
- `deltaTime` `number` - Delta time
- `currentVelocity` `BABYLON.Vector2` - Current velocity (uses x component as output)

**Returns:** `number` - Smoothed angle

#### `SmoothDampVector3(current, target, smoothTime, maxSpeed, deltaTime, currentVelocity)`
Gradually changes a vector towards a desired goal over time.

**Parameters:**
- `current` `BABYLON.Vector3` - Current vector
- `target` `BABYLON.Vector3` - Target vector
- `smoothTime` `number` - Smooth time
- `maxSpeed` `number` - Maximum speed
- `deltaTime` `number` - Delta time
- `currentVelocity` `BABYLON.Vector3` - Current velocity (uses xyz as output)

**Returns:** `BABYLON.Vector3` - Smoothed vector

## Quaternion and Rotation Utilities

### Euler Conversion

#### `ToEuler(quaternion)`
Returns a new Vector Euler in degrees set from the passed quaternion.

**Parameters:**
- `quaternion` `BABYLON.Quaternion` - Source quaternion

**Returns:** `BABYLON.Vector3` - Euler angles in degrees

#### `FromEuler(x, y, z)`
Returns a new Quaternion set from the passed Euler float angles in degrees.

**Parameters:**
- `x` `number` - X rotation in degrees
- `y` `number` - Y rotation in degrees
- `z` `number` - Z rotation in degrees

**Returns:** `BABYLON.Quaternion` - Resulting quaternion

### Quaternion Operations

#### `QuaternionDiff(a, b)`
Computes the difference in quaternion values.

**Parameters:**
- `a` `BABYLON.Quaternion` - First quaternion
- `b` `BABYLON.Quaternion` - Second quaternion

**Returns:** `BABYLON.Quaternion` - Difference quaternion

#### `RotateVector(vec, quat)`
Multiplies a quaternion by a vector (rotates vector).

**Parameters:**
- `vec` `BABYLON.Vector3` - Vector to rotate
- `quat` `BABYLON.Quaternion` - Rotation quaternion

**Returns:** `BABYLON.Vector3` - Rotated vector

#### `LookRotation(direction)`
Returns a new Quaternion set from the passed vector direction.

**Parameters:**
- `direction` `BABYLON.Vector3` - Direction vector

**Returns:** `BABYLON.Quaternion` - Look rotation quaternion

### Matrix Operations

#### `ToMatrix(x, y, z)`
Returns a new Matrix as a rotation matrix from the Euler angles in degrees.

**Parameters:**
- `x` `number` - X rotation in degrees
- `y` `number` - Y rotation in degrees
- `z` `number` - Z rotation in degrees

**Returns:** `BABYLON.Matrix` - Rotation matrix

#### `FastMatrixLerp(startValue, endValue, gradient, result)`
Set the passed matrix "result" as the interpolated values for "gradient" between the matrices.

**Parameters:**
- `startValue` `BABYLON.Matrix` - Start matrix
- `endValue` `BABYLON.Matrix` - End matrix
- `gradient` `number` - Interpolation factor (0-1)
- `result` `BABYLON.Matrix` - Result matrix

## Transform Utilities

### Position and Rotation

#### `SetAbsolutePosition(transform, position)`
Sets the transform node absolute position.

**Parameters:**
- `transform` `BABYLON.TransformNode` - Target transform
- `position` `BABYLON.Vector3` - New absolute position

#### `GetAbsolutePosition(transform, offsetPosition?, computeMatrix?)`
Gets the transform node absolute position.

**Parameters:**
- `transform` `BABYLON.TransformNode` - Source transform
- `offsetPosition?` `BABYLON.Vector3` - Optional offset position
- `computeMatrix?` `boolean` - Whether to compute matrix

**Returns:** `BABYLON.Vector3` - Absolute position

#### `SetAbsoluteRotation(transform, rotation)`
Sets the transform node absolute rotation.

**Parameters:**
- `transform` `BABYLON.TransformNode` - Target transform
- `rotation` `BABYLON.Quaternion` - New absolute rotation

#### `GetAbsoluteRotation(transform)`
Gets the transform node absolute rotation.

**Parameters:**
- `transform` `BABYLON.TransformNode` - Source transform

**Returns:** `BABYLON.Quaternion` - Absolute rotation

### Coordinate Transformations

#### `TransformPoint(owner, position, computeMatrix?)`
Transforms position from local space to world space.

**Parameters:**
- `owner` `BABYLON.TransformNode | BABYLON.Camera` - Transform owner
- `position` `BABYLON.Vector3` - Local position
- `computeMatrix?` `boolean` - Whether to compute matrix

**Returns:** `BABYLON.Vector3` - World space position

#### `InverseTransformPoint(owner, position, computeMatrix?)`
Inverse transforms position from world space to local space.

**Parameters:**
- `owner` `BABYLON.TransformNode | BABYLON.Camera` - Transform owner
- `position` `BABYLON.Vector3` - World position
- `computeMatrix?` `boolean` - Whether to compute matrix

**Returns:** `BABYLON.Vector3` - Local space position

#### `TransformDirection(owner, direction, computeMatrix?)`
Transforms direction from local space to world space.

**Parameters:**
- `owner` `BABYLON.TransformNode | BABYLON.Camera` - Transform owner
- `direction` `BABYLON.Vector3` - Local direction
- `computeMatrix?` `boolean` - Whether to compute matrix

**Returns:** `BABYLON.Vector3` - World space direction

### Direction Vectors

#### `GetForwardVector(owner)`
Gets the blue axis of the owner in world space.

**Parameters:**
- `owner` `BABYLON.TransformNode | BABYLON.Camera` - Transform owner

**Returns:** `BABYLON.Vector3` - Forward vector

#### `GetRightVector(owner)`
Gets the red axis of the owner in world space.

**Parameters:**
- `owner` `BABYLON.TransformNode | BABYLON.Camera` - Transform owner

**Returns:** `BABYLON.Vector3` - Right vector

#### `GetUpVector(owner)`
Gets the green axis of the owner in world space.

**Parameters:**
- `owner` `BABYLON.TransformNode | BABYLON.Camera` - Transform owner

**Returns:** `BABYLON.Vector3` - Up vector

## Data Parsing Utilities

### Unity Asset Parsing

#### `ParseColor3(source, defaultValue?, toLinearSpace?)`
Parse Unity color to Babylon Color3.

**Parameters:**
- `source` `TOOLKIT.IUnityColor` - Unity color data
- `defaultValue?` `BABYLON.Color3` - Default color if parsing fails
- `toLinearSpace?` `boolean` - Convert to linear space

**Returns:** `BABYLON.Color3` - Parsed color

#### `ParseVector3(source, defaultValue?)`
Parse Unity vector to Babylon Vector3.

**Parameters:**
- `source` `TOOLKIT.IUnityVector3` - Unity vector data
- `defaultValue?` `BABYLON.Vector3` - Default vector if parsing fails

**Returns:** `BABYLON.Vector3` - Parsed vector

#### `ParseTexture(source, scene, noMipmap?, invertY?, samplingMode?, onLoad?, onError?, buffer?, deleteBuffer?, format?)`
Parse Unity texture to Babylon texture.

**Parameters:**
- `source` `TOOLKIT.IUnityTexture` - Unity texture data
- `scene` `BABYLON.Scene` - Scene instance
- `noMipmap?` `boolean` - Disable mipmaps
- `invertY?` `boolean` - Invert Y axis
- `samplingMode?` `number` - Sampling mode
- `onLoad?` `BABYLON.Nullable<() => void>` - Load callback
- `onError?` `BABYLON.Nullable<(message?: string, exception?: any) => void>` - Error callback
- `buffer?` `BABYLON.Nullable<any>` - Buffer data
- `deleteBuffer?` `boolean` - Delete buffer after use
- `format?` `number` - Texture format

**Returns:** `BABYLON.Texture` - Parsed texture

## Physics Utilities

### Collision Detection

#### `CalculateCombinedFriction(friction0, friction1)`
Calculate combined friction value for physics materials.

**Parameters:**
- `friction0` `number` - First friction value
- `friction1` `number` - Second friction value

**Returns:** `number` - Combined friction

#### `CalculateCombinedRestitution(restitution0, restitution1)`
Calculate combined restitution value for physics materials.

**Parameters:**
- `restitution0` `number` - First restitution value
- `restitution1` `number` - Second restitution value

**Returns:** `number` - Combined restitution

### Slope Analysis

#### `GetVerticalSlopeAngle(v, max?)`
Returns the slope (in degrees) of a vector in the vertical plane.

**Parameters:**
- `v` `BABYLON.Vector3` - Vector to analyze
- `max?` `number` - Maximum angle

**Returns:** `number` - Slope angle in degrees

## String Utilities

#### `StartsWith(source, word)`
Check if string starts with specified word.

**Parameters:**
- `source` `string` - Source string
- `word` `string` - Word to check

**Returns:** `boolean` - True if starts with word

#### `EndsWith(source, word)`
Check if string ends with specified word.

**Parameters:**
- `source` `string` - Source string
- `word` `string` - Word to check

**Returns:** `boolean` - True if ends with word

#### `ReplaceAll(source, word, replace)`
Replace all occurrences of a word in a string.

**Parameters:**
- `source` `string` - Source string
- `word` `string` - Word to replace
- `replace` `string` - Replacement word

**Returns:** `string` - Modified string

#### `IsNullOrEmpty(source)`
Check if string is null or empty.

**Parameters:**
- `source` `string` - String to check

**Returns:** `boolean` - True if null or empty

## Examples

### Vector Mathematics
```typescript
// Calculate angle between vectors
const angle = TOOLKIT.Utilities.GetAngle(forward, target);

// Project vector onto plane
const projected = TOOLKIT.Utilities.ProjectVectorOnPlane(velocity, groundNormal);

// Smooth movement
const smoothPos = TOOLKIT.Utilities.SmoothDampVector3(
    currentPos, targetPos, 0.3, 10.0, deltaTime, velocity
);
```

### Rotation Operations
```typescript
// Convert quaternion to Euler angles
const euler = TOOLKIT.Utilities.ToEuler(transform.rotationQuaternion);

// Create look rotation
const lookRot = TOOLKIT.Utilities.LookRotation(targetDirection);

// Rotate vector
const rotatedVec = TOOLKIT.Utilities.RotateVector(localVector, rotation);
```

### Transform Utilities
```typescript
// Get world space position
const worldPos = TOOLKIT.Utilities.GetAbsolutePosition(transform);

// Transform point to world space
const worldPoint = TOOLKIT.Utilities.TransformPoint(transform, localPoint);

// Get direction vectors
const forward = TOOLKIT.Utilities.GetForwardVector(transform);
const right = TOOLKIT.Utilities.GetRightVector(transform);
```

## Related Classes
- [SceneManager](SceneManager.md) - Main scene management
- [RigidbodyPhysics](../physics/RigidbodyPhysics.md) - Physics calculations
- [NavigationAgent](../navigation/NavigationAgent.md) - Navigation utilities
- [AnimationState](../animation/AnimationState.md) - Animation mathematics
