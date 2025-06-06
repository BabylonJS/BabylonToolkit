# InputController

Comprehensive input handling system for keyboard, mouse, touch, and gamepad input with customizable key mapping and input processing.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Extends**: `TOOLKIT.ScriptComponent`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

InputController provides a unified input system that handles multiple input devices and methods. It supports keyboard input, mouse input, touch controls, gamepad input, and virtual joysticks with customizable key mappings and input processing.

## Static Properties

### Input Configuration
- **`KEYBOARD_INPUT_ENABLED`** `boolean` - Enable keyboard input processing
- **`MOUSE_INPUT_ENABLED`** `boolean` - Enable mouse input processing
- **`TOUCH_INPUT_ENABLED`** `boolean` - Enable touch input processing
- **`GAMEPAD_INPUT_ENABLED`** `boolean` - Enable gamepad input processing
- **`VIRTUAL_JOYSTICK_ENABLED`** `boolean` - Enable virtual joystick controls

## Instance Properties

### Input State
- **`inputEnabled`** `boolean` - Whether input processing is enabled
- **`keyboardEnabled`** `boolean` - Whether keyboard input is enabled
- **`mouseEnabled`** `boolean` - Whether mouse input is enabled
- **`touchEnabled`** `boolean` - Whether touch input is enabled
- **`gamepadEnabled`** `boolean` - Whether gamepad input is enabled

### Mouse Properties
- **`mousePosition`** `BABYLON.Vector2` - Current mouse position
- **`mouseDelta`** `BABYLON.Vector2` - Mouse movement delta
- **`mouseWheelDelta`** `number` - Mouse wheel scroll delta
- **`mouseSensitivity`** `number` - Mouse sensitivity multiplier

### Touch Properties
- **`touchPosition`** `BABYLON.Vector2` - Primary touch position
- **`touchDelta`** `BABYLON.Vector2` - Touch movement delta
- **`touchCount`** `number` - Number of active touches
- **`touchSensitivity`** `number` - Touch sensitivity multiplier

## Input Query Methods

### Keyboard Input

#### `getKey(keyCode)`
Check if a key is currently being held down.

**Parameters:**
- `keyCode` `number` - Key code to check

**Returns:** `boolean` - True if key is held down

#### `getKeyDown(keyCode)`
Check if a key was pressed this frame.

**Parameters:**
- `keyCode` `number` - Key code to check

**Returns:** `boolean` - True if key was pressed this frame

#### `getKeyUp(keyCode)`
Check if a key was released this frame.

**Parameters:**
- `keyCode` `number` - Key code to check

**Returns:** `boolean` - True if key was released this frame

#### `getKeyByName(keyName)`
Check if a named key is currently being held down.

**Parameters:**
- `keyName` `string` - Key name (e.g., "Space", "Enter", "A")

**Returns:** `boolean` - True if key is held down

### Mouse Input

#### `getMouseButton(button)`
Check if a mouse button is currently being held down.

**Parameters:**
- `button` `number` - Mouse button (0=left, 1=middle, 2=right)

**Returns:** `boolean` - True if button is held down

#### `getMouseButtonDown(button)`
Check if a mouse button was pressed this frame.

**Parameters:**
- `button` `number` - Mouse button to check

**Returns:** `boolean` - True if button was pressed this frame

#### `getMouseButtonUp(button)`
Check if a mouse button was released this frame.

**Parameters:**
- `button` `number` - Mouse button to check

**Returns:** `boolean` - True if button was released this frame

#### `getMousePosition()`
Get the current mouse position.

**Returns:** `BABYLON.Vector2` - Mouse position in screen coordinates

#### `getMouseDelta()`
Get the mouse movement delta since last frame.

**Returns:** `BABYLON.Vector2` - Mouse movement delta

#### `getMouseWheelDelta()`
Get the mouse wheel scroll delta.

**Returns:** `number` - Wheel scroll delta

### Touch Input

#### `getTouchPosition(index?)`
Get the position of a touch input.

**Parameters:**
- `index?` `number` - Touch index (0 for primary touch)

**Returns:** `BABYLON.Vector2` - Touch position

#### `getTouchDelta(index?)`
Get the movement delta of a touch input.

**Parameters:**
- `index?` `number` - Touch index (0 for primary touch)

**Returns:** `BABYLON.Vector2` - Touch movement delta

#### `getTouchCount()`
Get the number of active touches.

**Returns:** `number` - Number of active touches

#### `isTouching()`
Check if any touch is currently active.

**Returns:** `boolean` - True if touching

### Gamepad Input

#### `getGamepadButton(button, gamepadIndex?)`
Check if a gamepad button is currently being held down.

**Parameters:**
- `button` `number` - Button index
- `gamepadIndex?` `number` - Gamepad index (default 0)

**Returns:** `boolean` - True if button is held down

#### `getGamepadButtonDown(button, gamepadIndex?)`
Check if a gamepad button was pressed this frame.

**Parameters:**
- `button` `number` - Button index
- `gamepadIndex?` `number` - Gamepad index (default 0)

**Returns:** `boolean` - True if button was pressed this frame

#### `getGamepadAxis(axis, gamepadIndex?)`
Get the value of a gamepad axis.

**Parameters:**
- `axis` `number` - Axis index
- `gamepadIndex?` `number` - Gamepad index (default 0)

**Returns:** `number` - Axis value (-1.0 to 1.0)

#### `getGamepadStick(stick, gamepadIndex?)`
Get the values of a gamepad stick.

**Parameters:**
- `stick` `number` - Stick index (0=left, 1=right)
- `gamepadIndex?` `number` - Gamepad index (default 0)

**Returns:** `BABYLON.Vector2` - Stick values (x, y)

## Input Mapping

### Key Mapping

#### `mapKey(actionName, keyCode)`
Map a key to an action name.

**Parameters:**
- `actionName` `string` - Action name
- `keyCode` `number` - Key code to map

#### `mapKeys(actionName, keyCodes)`
Map multiple keys to an action name.

**Parameters:**
- `actionName` `string` - Action name
- `keyCodes` `number[]` - Array of key codes to map

#### `unmapKey(actionName)`
Remove key mapping for an action.

**Parameters:**
- `actionName` `string` - Action name to unmap

#### `getAction(actionName)`
Check if a mapped action is currently active.

**Parameters:**
- `actionName` `string` - Action name

**Returns:** `boolean` - True if action is active

#### `getActionDown(actionName)`
Check if a mapped action was activated this frame.

**Parameters:**
- `actionName` `string` - Action name

**Returns:** `boolean` - True if action was activated this frame

#### `getActionUp(actionName)`
Check if a mapped action was deactivated this frame.

**Parameters:**
- `actionName` `string` - Action name

**Returns:** `boolean` - True if action was deactivated this frame

### Axis Mapping

#### `mapAxis(axisName, positiveKey, negativeKey)`
Map keys to an axis.

**Parameters:**
- `axisName` `string` - Axis name
- `positiveKey` `number` - Key for positive direction
- `negativeKey` `number` - Key for negative direction

#### `getAxis(axisName)`
Get the value of a mapped axis.

**Parameters:**
- `axisName` `string` - Axis name

**Returns:** `number` - Axis value (-1.0 to 1.0)

## Virtual Controls

### Virtual Joystick

#### `enableVirtualJoystick(enabled)`
Enable or disable virtual joystick.

**Parameters:**
- `enabled` `boolean` - Whether to enable virtual joystick

#### `getVirtualJoystickPosition()`
Get the virtual joystick position.

**Returns:** `BABYLON.Vector2` - Joystick position (-1.0 to 1.0)

#### `isVirtualJoystickActive()`
Check if virtual joystick is currently being used.

**Returns:** `boolean` - True if joystick is active

## Lifecycle Methods

### Component Lifecycle

#### `awake()`
Called when the component is first created. Initializes the input system.

**Protected method** - Override in derived classes

#### `update()`
Called every frame during the update loop. Updates input state.

**Protected method** - Override in derived classes

#### `destroy()`
Called when the component is being destroyed. Cleans up input resources.

**Protected method** - Override in derived classes

## Usage Examples

### Basic Input Setup
```typescript
// Create input controller
const input = new TOOLKIT.InputController(playerTransform, scene);

// Enable input types
input.keyboardEnabled = true;
input.mouseEnabled = true;
input.touchEnabled = true;

// Check for input in update loop
if (input.getKey(87)) { // W key
    console.log("Moving forward");
}

if (input.getMouseButtonDown(0)) { // Left mouse button
    console.log("Mouse clicked");
}
```

### Action Mapping
```typescript
// Map keys to actions
input.mapKey("jump", 32); // Space bar
input.mapKey("fire", 17); // Ctrl key
input.mapKeys("run", [16, 304]); // Shift keys

// Map axes
input.mapAxis("horizontal", 68, 65); // D and A keys
input.mapAxis("vertical", 87, 83); // W and S keys

// Use mapped inputs
if (input.getActionDown("jump")) {
    this.jump();
}

if (input.getAction("fire")) {
    this.fire();
}

const horizontal = input.getAxis("horizontal");
const vertical = input.getAxis("vertical");
this.move(horizontal, vertical);
```

### Mouse and Touch Input
```typescript
// Mouse input
const mousePos = input.getMousePosition();
const mouseDelta = input.getMouseDelta();
const wheelDelta = input.getMouseWheelDelta();

// Touch input
if (input.isTouching()) {
    const touchPos = input.getTouchPosition();
    const touchDelta = input.getTouchDelta();
    const touchCount = input.getTouchCount();
}

// Virtual joystick
input.enableVirtualJoystick(true);
if (input.isVirtualJoystickActive()) {
    const joystickPos = input.getVirtualJoystickPosition();
    this.moveWithJoystick(joystickPos);
}
```

### Gamepad Input
```typescript
// Check gamepad connection
if (input.gamepadEnabled) {
    // Button input
    if (input.getGamepadButtonDown(0)) { // A button
        this.jump();
    }
    
    // Axis input
    const leftStick = input.getGamepadStick(0);
    const rightStick = input.getGamepadStick(1);
    
    this.move(leftStick.x, leftStick.y);
    this.look(rightStick.x, rightStick.y);
    
    // Trigger input
    const leftTrigger = input.getGamepadAxis(6);
    const rightTrigger = input.getGamepadAxis(7);
}
```

### Complete Player Controller
```typescript
class PlayerController extends TOOLKIT.ScriptComponent {
    private input: TOOLKIT.InputController;
    private moveSpeed: number = 5.0;
    private lookSpeed: number = 2.0;

    protected awake(): void {
        this.input = new TOOLKIT.InputController(this.transform, this.scene);
        this.setupInputMappings();
    }

    protected update(): void {
        this.handleMovement();
        this.handleLook();
        this.handleActions();
    }

    private setupInputMappings(): void {
        // Movement
        this.input.mapAxis("horizontal", 68, 65); // D, A
        this.input.mapAxis("vertical", 87, 83); // W, S
        
        // Actions
        this.input.mapKey("jump", 32); // Space
        this.input.mapKey("run", 16); // Shift
        this.input.mapKey("crouch", 67); // C
        
        // Mouse sensitivity
        this.input.mouseSensitivity = 2.0;
    }

    private handleMovement(): void {
        const horizontal = this.input.getAxis("horizontal");
        const vertical = this.input.getAxis("vertical");
        
        if (horizontal !== 0 || vertical !== 0) {
            const speed = this.input.getAction("run") ? this.moveSpeed * 2 : this.moveSpeed;
            this.moveCharacter(horizontal, vertical, speed);
        }
    }

    private handleLook(): void {
        if (this.input.mouseEnabled) {
            const mouseDelta = this.input.getMouseDelta();
            this.rotateCamera(mouseDelta.x * this.lookSpeed, mouseDelta.y * this.lookSpeed);
        }
    }

    private handleActions(): void {
        if (this.input.getActionDown("jump")) {
            this.jump();
        }
        
        if (this.input.getActionDown("crouch")) {
            this.toggleCrouch();
        }
    }
}
```

## Key Codes Reference

Common key codes for mapping:
- **Space**: 32
- **Enter**: 13
- **Shift**: 16
- **Ctrl**: 17
- **Alt**: 18
- **A-Z**: 65-90
- **0-9**: 48-57
- **Arrow Keys**: 37-40
- **F1-F12**: 112-123

## Related Classes
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
- [TouchJoystickHandler](TouchJoystickHandler.md) - Touch joystick implementation
- [UserInputOptions](UserInputOptions.md) - Input configuration options
- [SceneManager](../core/SceneManager.md) - Scene management utilities
