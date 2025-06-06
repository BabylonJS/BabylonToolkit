# TouchJoystickHandler

Touch joystick control handler for mobile and touch-enabled devices, providing virtual joystick functionality with customizable appearance and behavior.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

TouchJoystickHandler provides a comprehensive virtual joystick implementation for touch-enabled devices. It supports both fixed and dynamic positioning, customizable appearance, and provides normalized input values for game controls.

## Constructor

### `constructor(stickid, maxdistance, deadzone, fixed?, button?, baseid?)`
Creates a new touch joystick handler with the specified configuration.

**Parameters:**
- `stickid` `string` - HTML element ID for the joystick stick
- `maxdistance` `number` - Maximum distance the stick can move from center
- `deadzone` `number` - Dead zone radius where input is ignored
- `fixed?` `boolean` - Whether the joystick is fixed position (optional, defaults to false)
- `button?` `TOOLKIT.TouchMouseButton` - Mouse button for interaction (optional)
- `baseid?` `string` - HTML element ID for the joystick base (optional)

## Properties

### Configuration
- **`enabled`** `boolean` - Whether the joystick is enabled for input
- **`updateElements`** `boolean` - Whether to update HTML element positions
- **`preventDefault`** `boolean` - Whether to prevent default touch events
- **`stopPropagation`** `boolean` - Whether to stop event propagation

### Visual Appearance
- **`baseElementOpacity`** `string` - CSS opacity value for the base element
- **`stickElementOpacity`** `string` - CSS opacity value for the stick element

### Event Handlers
- **`onHandleDown`** `(event: any) => void` - Callback for touch/mouse down events
- **`onHandleMove`** `(event: any) => void` - Callback for touch/mouse move events
- **`onHandleUp`** `(event: any) => void` - Callback for touch/mouse up events

## Methods

### Lifecycle Management

#### `dispose()`
Disposes of the joystick handler and cleans up event listeners.

### State Queries

#### `isActive()`
Checks if the joystick is currently being used.

**Returns:** `boolean` - True if the joystick is active

#### `getInputX()`
Gets the normalized X-axis input value.

**Returns:** `number` - X-axis value between -1.0 and 1.0

#### `getInputY()`
Gets the normalized Y-axis input value.

**Returns:** `number` - Y-axis value between -1.0 and 1.0

#### `getInputMagnitude()`
Gets the magnitude of the joystick input vector.

**Returns:** `number` - Magnitude value between 0.0 and 1.0

## Usage Examples

### Basic Touch Joystick Setup
```typescript
class MobileController extends TOOLKIT.ScriptComponent {
    public joystick: TOOLKIT.TouchJoystickHandler;
    public moveSpeed: number = 5.0;

    protected start(): void {
        this.setupTouchJoystick();
    }

    private setupTouchJoystick(): void {
        this.joystick = new TOOLKIT.TouchJoystickHandler(
            "joystick-stick",
            100,
            20,
            true,
            TOOLKIT.TouchMouseButton.Left,
            "joystick-base"
        );

        this.joystick.enabled = true;
        this.joystick.updateElements = true;
        this.joystick.preventDefault = true;
        this.joystick.stopPropagation = true;

        this.joystick.baseElementOpacity = "0.5";
        this.joystick.stickElementOpacity = "0.8";

        this.setupJoystickEvents();
    }

    private setupJoystickEvents(): void {
        this.joystick.onHandleDown = (event) => {
            console.log("Joystick activated");
        };

        this.joystick.onHandleMove = (event) => {
            this.handleMovement();
        };

        this.joystick.onHandleUp = (event) => {
            console.log("Joystick released");
        };
    }

    protected update(): void {
        if (this.joystick.isActive()) {
            this.handleMovement();
        }
    }

    private handleMovement(): void {
        const inputX = this.joystick.getInputX();
        const inputY = this.joystick.getInputY();
        const magnitude = this.joystick.getInputMagnitude();

        if (magnitude > 0.1) {
            const deltaTime = TOOLKIT.SceneManager.GetDeltaTime();
            const moveVector = new BABYLON.Vector3(inputX, 0, inputY);
            moveVector.scaleInPlace(this.moveSpeed * magnitude * deltaTime);

            this.transform.position.addInPlace(moveVector);
        }
    }

    protected destroy(): void {
        if (this.joystick) {
            this.joystick.dispose();
        }
    }
}
```

### Dynamic Joystick with Custom Styling
```typescript
class DynamicJoystickController extends TOOLKIT.ScriptComponent {
    public leftJoystick: TOOLKIT.TouchJoystickHandler;
    public rightJoystick: TOOLKIT.TouchJoystickHandler;

    protected start(): void {
        this.setupDynamicJoysticks();
    }

    private setupDynamicJoysticks(): void {
        this.leftJoystick = new TOOLKIT.TouchJoystickHandler(
            "left-stick",
            80,
            15,
            false
        );

        this.rightJoystick = new TOOLKIT.TouchJoystickHandler(
            "right-stick",
            80,
            15,
            false
        );

        this.configureJoysticks();
    }

    private configureJoysticks(): void {
        [this.leftJoystick, this.rightJoystick].forEach((joystick, index) => {
            joystick.enabled = true;
            joystick.updateElements = true;
            joystick.preventDefault = true;
            joystick.stopPropagation = true;

            joystick.baseElementOpacity = "0.3";
            joystick.stickElementOpacity = "0.7";

            joystick.onHandleDown = (event) => {
                this.onJoystickDown(index, event);
            };

            joystick.onHandleMove = (event) => {
                this.onJoystickMove(index, event);
            };

            joystick.onHandleUp = (event) => {
                this.onJoystickUp(index, event);
            };
        });
    }

    private onJoystickDown(joystickIndex: number, event: any): void {
        const joystickName = joystickIndex === 0 ? "Left" : "Right";
        console.log(`${joystickName} joystick activated`);
    }

    private onJoystickMove(joystickIndex: number, event: any): void {
        if (joystickIndex === 0) {
            this.handleMovementInput();
        } else {
            this.handleLookInput();
        }
    }

    private onJoystickUp(joystickIndex: number, event: any): void {
        const joystickName = joystickIndex === 0 ? "Left" : "Right";
        console.log(`${joystickName} joystick released`);
    }

    protected update(): void {
        if (this.leftJoystick.isActive()) {
            this.handleMovementInput();
        }

        if (this.rightJoystick.isActive()) {
            this.handleLookInput();
        }
    }

    private handleMovementInput(): void {
        const inputX = this.leftJoystick.getInputX();
        const inputY = this.leftJoystick.getInputY();
        const magnitude = this.leftJoystick.getInputMagnitude();

        console.log(`Movement: X=${inputX.toFixed(2)}, Y=${inputY.toFixed(2)}, Mag=${magnitude.toFixed(2)}`);
    }

    private handleLookInput(): void {
        const inputX = this.rightJoystick.getInputX();
        const inputY = this.rightJoystick.getInputY();
        const magnitude = this.rightJoystick.getInputMagnitude();

        console.log(`Look: X=${inputX.toFixed(2)}, Y=${inputY.toFixed(2)}, Mag=${magnitude.toFixed(2)}`);
    }

    protected destroy(): void {
        if (this.leftJoystick) {
            this.leftJoystick.dispose();
        }
        if (this.rightJoystick) {
            this.rightJoystick.dispose();
        }
    }
}
```

### Advanced Joystick Configuration
```typescript
class AdvancedJoystickSystem extends TOOLKIT.ScriptComponent {
    public joystick: TOOLKIT.TouchJoystickHandler;
    public sensitivity: number = 1.5;
    public smoothing: number = 0.1;
    public currentInput: BABYLON.Vector2 = BABYLON.Vector2.Zero();
    public targetInput: BABYLON.Vector2 = BABYLON.Vector2.Zero();

    protected start(): void {
        this.setupAdvancedJoystick();
    }

    private setupAdvancedJoystick(): void {
        this.joystick = new TOOLKIT.TouchJoystickHandler(
            "advanced-stick",
            120,
            25,
            true,
            TOOLKIT.TouchMouseButton.Left,
            "advanced-base"
        );

        this.configureAdvancedSettings();
        this.setupAdvancedEvents();
    }

    private configureAdvancedSettings(): void {
        this.joystick.enabled = true;
        this.joystick.updateElements = true;
        this.joystick.preventDefault = true;
        this.joystick.stopPropagation = true;

        this.joystick.baseElementOpacity = "0.4";
        this.joystick.stickElementOpacity = "0.9";
    }

    private setupAdvancedEvents(): void {
        this.joystick.onHandleDown = (event) => {
            this.onJoystickActivated(event);
        };

        this.joystick.onHandleMove = (event) => {
            this.onJoystickMoved(event);
        };

        this.joystick.onHandleUp = (event) => {
            this.onJoystickReleased(event);
        };
    }

    private onJoystickActivated(event: any): void {
        console.log("Advanced joystick activated");
        this.joystick.baseElementOpacity = "0.6";
        this.joystick.stickElementOpacity = "1.0";
    }

    private onJoystickMoved(event: any): void {
        const rawX = this.joystick.getInputX();
        const rawY = this.joystick.getInputY();
        const magnitude = this.joystick.getInputMagnitude();

        this.targetInput.x = rawX * this.sensitivity;
        this.targetInput.y = rawY * this.sensitivity;

        this.targetInput.x = this.applyCurve(this.targetInput.x, magnitude);
        this.targetInput.y = this.applyCurve(this.targetInput.y, magnitude);
    }

    private onJoystickReleased(event: any): void {
        console.log("Advanced joystick released");
        this.joystick.baseElementOpacity = "0.4";
        this.joystick.stickElementOpacity = "0.9";
        
        this.targetInput.x = 0;
        this.targetInput.y = 0;
    }

    protected update(): void {
        this.updateSmoothInput();
        this.applyInput();
    }

    private updateSmoothInput(): void {
        const deltaTime = TOOLKIT.SceneManager.GetDeltaTime();
        const lerpFactor = Math.min(1.0, this.smoothing * deltaTime * 60);

        this.currentInput.x = this.lerp(this.currentInput.x, this.targetInput.x, lerpFactor);
        this.currentInput.y = this.lerp(this.currentInput.y, this.targetInput.y, lerpFactor);
    }

    private lerp(a: number, b: number, t: number): number {
        return a + (b - a) * t;
    }

    private applyCurve(value: number, magnitude: number): number {
        const curve = magnitude * magnitude;
        return value * curve;
    }

    private applyInput(): void {
        if (this.currentInput.length() > 0.01) {
            const deltaTime = TOOLKIT.SceneManager.GetDeltaTime();
            const moveVector = new BABYLON.Vector3(
                this.currentInput.x,
                0,
                this.currentInput.y
            );
            moveVector.scaleInPlace(deltaTime * 5.0);

            this.transform.position.addInPlace(moveVector);
        }
    }

    public setJoystickSensitivity(sensitivity: number): void {
        this.sensitivity = Math.max(0.1, Math.min(3.0, sensitivity));
    }

    public setJoystickSmoothing(smoothing: number): void {
        this.smoothing = Math.max(0.01, Math.min(1.0, smoothing));
    }

    public getJoystickInfo(): any {
        return {
            isActive: this.joystick.isActive(),
            inputX: this.joystick.getInputX(),
            inputY: this.joystick.getInputY(),
            magnitude: this.joystick.getInputMagnitude(),
            currentX: this.currentInput.x,
            currentY: this.currentInput.y,
            sensitivity: this.sensitivity,
            smoothing: this.smoothing
        };
    }

    protected destroy(): void {
        if (this.joystick) {
            this.joystick.dispose();
        }
    }
}
```

## Best Practices

1. **Element Setup** - Ensure HTML elements exist before creating joystick handlers
2. **Event Management** - Always dispose of joystick handlers to prevent memory leaks
3. **Dead Zone** - Use appropriate dead zone values to prevent unwanted micro-movements
4. **Visual Feedback** - Provide clear visual feedback for joystick state changes
5. **Input Smoothing** - Apply smoothing to joystick input for better user experience
6. **Sensitivity Tuning** - Allow users to adjust sensitivity for different preferences

## Related Classes
- [InputController](InputController.md) - Comprehensive input handling
- [UserInputOptions](UserInputOptions.md) - Input configuration options
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
