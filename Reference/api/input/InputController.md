# InputController

Static input handling system for keyboard, mouse, touch, and gamepad input with comprehensive input processing capabilities.

**Namespace**: `TOOLKIT`  
**Type**: `class` (static only)  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

InputController provides a unified static input system that handles multiple input devices and methods. It supports keyboard input, mouse input, touch controls, gamepad input, and pointer interactions through static methods only.

## Static Properties

### Input Configuration
- **`MOUSE_DAMPENER`** `number` - Mouse input dampening factor
- **`TAP_THRESHOLD_MS`** `number` - Tap threshold in milliseconds
- **`GamepadManager`** `BABYLON.GamepadManager` - Global gamepad manager
- **`AllowMobileControls`** `boolean` - Are mobile input controls allowed
- **`MobileControlsActive`** `boolean` - Are mobile input controls currently active
- **`EnablePinchZoomTracking`** `boolean` - Is mobile pinch zoom tracking enabled

### Event Handlers
- **`GamepadConnected`** `(pad: BABYLON.Gamepad, state: BABYLON.EventState) => void` - Global gamepad connect event handler
- **`GamepadDisconnected`** `(pad: BABYLON.Gamepad, state: BABYLON.EventState) => void` - Global gamepad disconnect event handler

## Static Methods

### Input System Management

#### `EnableUserInput(engine, scene, options?)`
Enable user input state in the scene.

**Parameters:**
- `engine` `BABYLON.AbstractEngine` - Babylon engine instance
- `scene` `BABYLON.Scene` - Scene to enable input for
- `options?` `object` - Optional configuration
  - `contextMenu?` `boolean` - Enable context menu
  - `pointerLock?` `boolean` - Enable pointer lock
  - `preventDefault?` `boolean` - Prevent default events
  - `useCapture?` `boolean` - Use event capture

#### `ConfigureUserInput(engine, scene, options?)`
Configure user input state in the scene.

**Parameters:**
- `engine` `BABYLON.AbstractEngine` - Babylon engine instance
- `scene` `BABYLON.Scene` - Scene to configure input for
- `options?` `object` - Optional configuration (same as EnableUserInput)

#### `DisableUserInput(scene, useCapture?)`
Disables user input state in the scene.

**Parameters:**
- `scene` `BABYLON.Scene` - Scene to disable input for
- `useCapture?` `boolean` - Use event capture

### Keyboard Input

#### `GetKeyboardInput(keycode)`
Get the specified keyboard input by keycode.

**Parameters:**
- `keycode` `number` - Key code to check

**Returns:** `boolean` - True if key is currently pressed

#### `IsKeyboardButtonHeld(keycode)`
Is the specified keyboard button held down.

**Parameters:**
- `keycode` `number` - Key code to check

**Returns:** `boolean` - True if key is held down

#### `WasKeyboardButtonTapped(keycode, reset?)`
Was the specified keyboard button tapped.

**Parameters:**
- `keycode` `number` - Key code to check
- `reset?` `boolean` - Reset tapped state after check

**Returns:** `boolean` - True if key was tapped

#### `ResetKeyboardButtonTapped(keycode)`
Reset the specified keyboard button tapped state.

**Parameters:**
- `keycode` `number` - Key code to reset

### Keyboard Event Handlers

#### `OnKeyboardUp(callback)`
Set a keyboard up event handler.

**Parameters:**
- `callback` `(keycode: number) => void` - Callback function

#### `OnKeyboardDown(callback)`
Set a keyboard down event handler.

**Parameters:**
- `callback` `(keycode: number) => void` - Callback function

#### `OnKeyboardPress(keycode, callback)`
Set a keyboard press event handler.

**Parameters:**
- `keycode` `number` - Key code to listen for
- `callback` `() => void` - Callback function

### Mouse/Pointer Input

#### `GetLeftButtonDown()`
Get the value of the left button down.

**Returns:** `boolean` - True if left button is down

#### `GetMiddleButtonDown()`
Get the value of the middle button down.

**Returns:** `boolean` - True if middle button is down

#### `GetRightButtonDown()`
Get the value of the right button down.

**Returns:** `boolean` - True if right button is down

#### `GetMouseButtonsDown()`
Get the value of all mouse buttons down.

**Returns:** `number` - Bitmask of mouse buttons down

#### `GetPointerInput(button)`
Get the specified pointer input by button.

**Parameters:**
- `button` `number` - Button index

**Returns:** `boolean` - True if pointer button is pressed

#### `IsPointerButtonHeld(button)`
Is the specified pointer button held down.

**Parameters:**
- `button` `number` - Button index

**Returns:** `boolean` - True if pointer button is held

#### `WasPointerButtonTapped(number, reset?)`
Was the specified pointer button tapped.

**Parameters:**
- `number` `number` - Button index
- `reset?` `boolean` - Reset tapped state after check

**Returns:** `boolean` - True if pointer button was tapped

### Pointer Event Handlers

#### `OnPointerUp(callback)`
Set a pointer up event handler.

**Parameters:**
- `callback` `(button: number) => void` - Callback function

#### `OnPointerDown(callback)`
Set a pointer down event handler.

**Parameters:**
- `callback` `(button: number) => void` - Callback function

#### `OnPointerPress(button, callback)`
Set a pointer press event handler.

**Parameters:**
- `button` `number` - Button index to listen for
- `callback` `() => void` - Callback function

### Gamepad Input

#### `GetGamepadButtonInput(button, player?)`
Get the specified gamepad input by button.

**Parameters:**
- `button` `number` - Button index
- `player?` `TOOLKIT.PlayerNumber` - Player number (optional)

**Returns:** `boolean` - True if gamepad button is pressed

#### `IsGamepadButtonHeld(button, player?)`
Is the specified gamepad button held.

**Parameters:**
- `button` `number` - Button index
- `player?` `TOOLKIT.PlayerNumber` - Player number (optional)

**Returns:** `boolean` - True if gamepad button is held

#### `IsGamepadButtonTapped(button, player?)`
Is the specified gamepad button tapped.

**Parameters:**
- `button` `number` - Button index
- `player?` `TOOLKIT.PlayerNumber` - Player number (optional)

**Returns:** `boolean` - True if gamepad button was tapped

#### `GetGamepadDirectionInput(direction, player?)`
Get the specified gamepad direction input by number.

**Parameters:**
- `direction` `number` - Direction index
- `player?` `TOOLKIT.PlayerNumber` - Player number (optional)

**Returns:** `boolean` - True if gamepad direction is pressed

#### `GetGamepadTriggerInput(trigger, player?)`
Get the specified gamepad trigger input by number.

**Parameters:**
- `trigger` `number` - Trigger index
- `player?` `TOOLKIT.PlayerNumber` - Player number (optional)

**Returns:** `number` - Trigger value (0.0 to 1.0)

#### `GetGamepadType(player?)`
Get the specified gamepad type.

**Parameters:**
- `player?` `TOOLKIT.PlayerNumber` - Player number (optional)

**Returns:** `TOOLKIT.GamepadType` - Gamepad type

#### `GetGamepad(player?)`
Get the specified gamepad.

**Parameters:**
- `player?` `TOOLKIT.PlayerNumber` - Player number (optional)

**Returns:** `BABYLON.Gamepad` - Gamepad instance

### User Input System

#### `GetUserInput(input, player?)`
Get user input state from the scene.

**Parameters:**
- `input` `TOOLKIT.UserInputAxis` - Input axis to check
- `player?` `TOOLKIT.PlayerNumber` - Player number (optional)

**Returns:** `number` - Input value

### Pointer Lock

#### `LockMousePointer(scene, lock)`
Locks user pointer state in the scene.

**Parameters:**
- `scene` `BABYLON.Scene` - Scene instance
- `lock` `boolean` - Whether to lock pointer

#### `IsPointerLocked()`
Check if pointer is currently locked.

**Returns:** `boolean` - True if pointer is locked

#### `IsPointerLockHandled()`
Check if pointer lock is handled.

**Returns:** `boolean` - True if pointer lock is handled

### Utility Methods

#### `GetMouseDownTarget()`
Get the target of mouse button down event.

**Returns:** `any` - Mouse down target

#### `GetMouseDragTarget()`
Get the target of mouse button drag event.

**Returns:** `any` - Mouse drag target

#### `GetPinchZoomState()`
Get the value of the pinch zoom state.

**Returns:** `TOOLKIT.PinchZoomState` - Pinch zoom state

#### `IsWheelScrolling()`
Is the mouse wheel scrolling this frame.

**Returns:** `boolean` - True if wheel is scrolling

## Usage Examples

### Basic Keyboard Input
```typescript
class PlayerController extends TOOLKIT.ScriptComponent {
    private moveSpeed: number = 5.0;

    protected update(): void {
        this.handleMovement();
        this.handleActions();
    }

    private handleMovement(): void {
        const horizontal = TOOLKIT.InputController.GetKeyboardInput(68) ? 1 : 
                          TOOLKIT.InputController.GetKeyboardInput(65) ? -1 : 0; // D and A keys
        const vertical = TOOLKIT.InputController.GetKeyboardInput(87) ? 1 : 
                        TOOLKIT.InputController.GetKeyboardInput(83) ? -1 : 0; // W and S keys

        if (horizontal !== 0 || vertical !== 0) {
            const speed = TOOLKIT.InputController.GetKeyboardInput(16) ? this.moveSpeed * 2 : this.moveSpeed; // Shift for run
            this.moveCharacter(horizontal, vertical, speed);
        }
    }

    private handleActions(): void {
        if (TOOLKIT.InputController.GetKeyboardInput(32)) { // Space bar
            this.jump();
        }

        if (TOOLKIT.InputController.GetKeyboardInput(17)) { // Ctrl key
            this.fire();
        }
    }
}
```

### Mouse Input Handling
```typescript
class CameraController extends TOOLKIT.ScriptComponent {
    private lookSpeed: number = 2.0;

    protected start(): void {
        TOOLKIT.InputController.EnableUserInput(this.scene.getEngine(), this.scene, {
            pointerLock: true,
            preventDefault: true
        });
    }

    protected update(): void {
        this.handleMouseInput();
    }

    private handleMouseInput(): void {
        if (TOOLKIT.InputController.GetLeftButtonDown()) {
            console.log("Left mouse button pressed");
        }

        if (TOOLKIT.InputController.GetRightButtonDown()) {
            console.log("Right mouse button pressed");
        }

        if (TOOLKIT.InputController.IsWheelScrolling()) {
            console.log("Mouse wheel scrolling");
        }
    }
}
```

### Gamepad Input
```typescript
class GamepadController extends TOOLKIT.ScriptComponent {
    protected update(): void {
        this.handleGamepadInput();
    }

    private handleGamepadInput(): void {
        if (TOOLKIT.InputController.GetGamepadButtonInput(0)) { // A button
            this.jump();
        }

        if (TOOLKIT.InputController.GetGamepadButtonInput(1)) { // B button
            this.crouch();
        }

        const leftTrigger = TOOLKIT.InputController.GetGamepadTriggerInput(0);
        const rightTrigger = TOOLKIT.InputController.GetGamepadTriggerInput(1);

        if (leftTrigger > 0.5) {
            this.aimDownSights();
        }

        if (rightTrigger > 0.5) {
            this.fire();
        }
    }
}
```

### Input Event Handlers
```typescript
class InputEventManager extends TOOLKIT.ScriptComponent {
    protected start(): void {
        this.setupInputEventHandlers();
    }

    private setupInputEventHandlers(): void {
        TOOLKIT.InputController.OnKeyboardDown((keycode: number) => {
            console.log(`Key pressed: ${keycode}`);
        });

        TOOLKIT.InputController.OnKeyboardUp((keycode: number) => {
            console.log(`Key released: ${keycode}`);
        });

        TOOLKIT.InputController.OnKeyboardPress(27, () => { // Escape key
            this.showPauseMenu();
        });

        TOOLKIT.InputController.OnPointerDown((button: number) => {
            console.log(`Pointer button pressed: ${button}`);
        });

        TOOLKIT.InputController.OnPointerPress(0, () => { // Left click
            this.handleLeftClick();
        });
    }

    private showPauseMenu(): void {
        console.log("Showing pause menu");
    }

    private handleLeftClick(): void {
        console.log("Left click detected");
    }
}
```

### User Input System
```typescript
class UserInputManager extends TOOLKIT.ScriptComponent {
    protected update(): void {
        this.handleUserInput();
    }

    private handleUserInput(): void {
        const horizontalInput = TOOLKIT.InputController.GetUserInput(TOOLKIT.UserInputAxis.Horizontal);
        const verticalInput = TOOLKIT.InputController.GetUserInput(TOOLKIT.UserInputAxis.Vertical);
        const mouseX = TOOLKIT.InputController.GetUserInput(TOOLKIT.UserInputAxis.MouseX);
        const mouseY = TOOLKIT.InputController.GetUserInput(TOOLKIT.UserInputAxis.MouseY);

        if (Math.abs(horizontalInput) > 0.1 || Math.abs(verticalInput) > 0.1) {
            this.moveCharacter(horizontalInput, verticalInput);
        }

        if (Math.abs(mouseX) > 0.1 || Math.abs(mouseY) > 0.1) {
            this.rotateCamera(mouseX, mouseY);
        }
    }

    private moveCharacter(horizontal: number, vertical: number): void {
        console.log(`Moving character: ${horizontal}, ${vertical}`);
    }

    private rotateCamera(mouseX: number, mouseY: number): void {
        console.log(`Rotating camera: ${mouseX}, ${mouseY}`);
    }
}
```

## Key Codes Reference

Common key codes for keyboard input:
- **Space**: 32
- **Enter**: 13
- **Shift**: 16
- **Ctrl**: 17
- **Alt**: 18
- **Escape**: 27
- **A-Z**: 65-90
- **0-9**: 48-57
- **Arrow Keys**: 37-40 (Left, Up, Right, Down)
- **F1-F12**: 112-123

## Related Classes
- [TouchJoystickHandler](TouchJoystickHandler.md) - Touch joystick implementation
- [UserInputOptions](UserInputOptions.md) - Input configuration options
- [SceneManager](../core/SceneManager.md) - Scene management utilities
