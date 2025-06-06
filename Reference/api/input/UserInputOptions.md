# UserInputOptions

Static configuration class for managing input device settings, sensitivities, and behavior options across the input system.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

UserInputOptions provides a centralized configuration system for all input devices including keyboard, gamepad, mouse, and touch controls. It contains static properties that control sensitivity, dead zones, inversion settings, and device support options.

## Static Properties

### Keyboard Configuration
- **`KeyboardSmoothing`** `boolean` - Enable smoothing for keyboard input
- **`KeyboardMoveSensibility`** `number` - Sensitivity for keyboard movement input
- **`KeyboardArrowSensibility`** `number` - Sensitivity for keyboard arrow key input
- **`KeyboardMoveDeadZone`** `number` - Dead zone for keyboard movement input

### Gamepad Configuration
- **`GamepadDeadStickValue`** `number` - Dead zone value for gamepad analog sticks
- **`GamepadLStickXInverted`** `boolean` - Invert left stick X-axis
- **`GamepadLStickYInverted`** `boolean` - Invert left stick Y-axis
- **`GamepadRStickXInverted`** `boolean` - Invert right stick X-axis
- **`GamepadRStickYInverted`** `boolean` - Invert right stick Y-axis
- **`GamepadLStickSensibility`** `number` - Sensitivity for left analog stick
- **`GamepadRStickSensibility`** `number` - Sensitivity for right analog stick

### Device Support
- **`SupportedInputDevices`** `any[]` - Array of supported input device configurations

### Mouse and Pointer Configuration
- **`BabylonAngularSensibility`** `number` - Angular sensitivity for Babylon.js camera controls
- **`DefaultAngularSensibility`** `number` - Default angular sensitivity value
- **`PointerWheelDeadZone`** `number` - Dead zone for mouse wheel input
- **`PointerMouseDeadZone`** `number` - Dead zone for mouse movement
- **`PointerMouseInverted`** `boolean` - Invert mouse Y-axis movement

### Canvas and Rotation Settings
- **`UseCanvasElement`** `boolean` - Whether to use canvas element for input capture
- **`UseArrowKeyRotation`** `boolean` - Enable arrow key rotation controls
- **`EnableBabylonRotation`** `boolean` - Enable Babylon.js rotation controls

## Usage Examples

### Basic Input Configuration
```typescript
class InputConfigurationManager extends TOOLKIT.ScriptComponent {
    protected start(): void {
        this.setupBasicInputConfiguration();
    }

    private setupBasicInputConfiguration(): void {
        TOOLKIT.UserInputOptions.KeyboardSmoothing = true;
        TOOLKIT.UserInputOptions.KeyboardMoveSensibility = 2.0;
        TOOLKIT.UserInputOptions.KeyboardArrowSensibility = 1.5;
        TOOLKIT.UserInputOptions.KeyboardMoveDeadZone = 0.1;

        TOOLKIT.UserInputOptions.GamepadDeadStickValue = 0.15;
        TOOLKIT.UserInputOptions.GamepadLStickSensibility = 1.0;
        TOOLKIT.UserInputOptions.GamepadRStickSensibility = 1.2;

        TOOLKIT.UserInputOptions.PointerMouseDeadZone = 0.05;
        TOOLKIT.UserInputOptions.PointerWheelDeadZone = 0.1;

        console.log("Basic input configuration applied");
    }

    protected update(): void {
        this.logCurrentConfiguration();
    }

    private logCurrentConfiguration(): void {
        console.log(`Keyboard Sensitivity: ${TOOLKIT.UserInputOptions.KeyboardMoveSensibility}`);
        console.log(`Gamepad Dead Zone: ${TOOLKIT.UserInputOptions.GamepadDeadStickValue}`);
        console.log(`Mouse Dead Zone: ${TOOLKIT.UserInputOptions.PointerMouseDeadZone}`);
    }
}
```

### Advanced Gamepad Configuration
```typescript
class GamepadConfigurationSystem extends TOOLKIT.ScriptComponent {
    public leftStickInvertX: boolean = false;
    public leftStickInvertY: boolean = false;
    public rightStickInvertX: boolean = false;
    public rightStickInvertY: boolean = true;

    protected start(): void {
        this.setupGamepadConfiguration();
    }

    private setupGamepadConfiguration(): void {
        TOOLKIT.UserInputOptions.GamepadDeadStickValue = 0.2;
        
        TOOLKIT.UserInputOptions.GamepadLStickXInverted = this.leftStickInvertX;
        TOOLKIT.UserInputOptions.GamepadLStickYInverted = this.leftStickInvertY;
        TOOLKIT.UserInputOptions.GamepadRStickXInverted = this.rightStickInvertX;
        TOOLKIT.UserInputOptions.GamepadRStickYInverted = this.rightStickInvertY;

        TOOLKIT.UserInputOptions.GamepadLStickSensibility = 1.5;
        TOOLKIT.UserInputOptions.GamepadRStickSensibility = 2.0;

        this.setupSupportedDevices();
        
        console.log("Advanced gamepad configuration applied");
    }

    private setupSupportedDevices(): void {
        TOOLKIT.UserInputOptions.SupportedInputDevices = [
            { type: "xbox", name: "Xbox Controller" },
            { type: "playstation", name: "PlayStation Controller" },
            { type: "generic", name: "Generic Gamepad" }
        ];
    }

    protected update(): void {
        this.monitorGamepadSettings();
    }

    private monitorGamepadSettings(): void {
        const leftSensitivity = TOOLKIT.UserInputOptions.GamepadLStickSensibility;
        const rightSensitivity = TOOLKIT.UserInputOptions.GamepadRStickSensibility;
        const deadZone = TOOLKIT.UserInputOptions.GamepadDeadStickValue;

        console.log(`Gamepad Settings - Left: ${leftSensitivity}, Right: ${rightSensitivity}, Dead Zone: ${deadZone}`);
    }

    public toggleLeftStickInversion(): void {
        TOOLKIT.UserInputOptions.GamepadLStickXInverted = !TOOLKIT.UserInputOptions.GamepadLStickXInverted;
        TOOLKIT.UserInputOptions.GamepadLStickYInverted = !TOOLKIT.UserInputOptions.GamepadLStickYInverted;
        
        console.log(`Left stick inversion: X=${TOOLKIT.UserInputOptions.GamepadLStickXInverted}, Y=${TOOLKIT.UserInputOptions.GamepadLStickYInverted}`);
    }

    public toggleRightStickInversion(): void {
        TOOLKIT.UserInputOptions.GamepadRStickXInverted = !TOOLKIT.UserInputOptions.GamepadRStickXInverted;
        TOOLKIT.UserInputOptions.GamepadRStickYInverted = !TOOLKIT.UserInputOptions.GamepadRStickYInverted;
        
        console.log(`Right stick inversion: X=${TOOLKIT.UserInputOptions.GamepadRStickXInverted}, Y=${TOOLKIT.UserInputOptions.GamepadRStickYInverted}`);
    }

    public adjustSensitivity(leftSensitivity: number, rightSensitivity: number): void {
        TOOLKIT.UserInputOptions.GamepadLStickSensibility = Math.max(0.1, Math.min(5.0, leftSensitivity));
        TOOLKIT.UserInputOptions.GamepadRStickSensibility = Math.max(0.1, Math.min(5.0, rightSensitivity));
        
        console.log(`Sensitivity adjusted - Left: ${TOOLKIT.UserInputOptions.GamepadLStickSensibility}, Right: ${TOOLKIT.UserInputOptions.GamepadRStickSensibility}`);
    }
}
```

### Mouse and Camera Configuration
```typescript
class MouseCameraConfiguration extends TOOLKIT.ScriptComponent {
    public mouseSensitivity: number = 1.0;
    public invertMouse: boolean = false;

    protected start(): void {
        this.setupMouseConfiguration();
    }

    private setupMouseConfiguration(): void {
        TOOLKIT.UserInputOptions.PointerMouseInverted = this.invertMouse;
        TOOLKIT.UserInputOptions.PointerMouseDeadZone = 0.02;
        TOOLKIT.UserInputOptions.PointerWheelDeadZone = 0.05;

        TOOLKIT.UserInputOptions.BabylonAngularSensibility = 2000;
        TOOLKIT.UserInputOptions.DefaultAngularSensibility = 2000;

        TOOLKIT.UserInputOptions.UseCanvasElement = true;
        TOOLKIT.UserInputOptions.UseArrowKeyRotation = true;
        TOOLKIT.UserInputOptions.EnableBabylonRotation = true;

        console.log("Mouse and camera configuration applied");
    }

    protected update(): void {
        this.updateMouseSettings();
    }

    private updateMouseSettings(): void {
        const adjustedSensitivity = TOOLKIT.UserInputOptions.DefaultAngularSensibility * this.mouseSensitivity;
        TOOLKIT.UserInputOptions.BabylonAngularSensibility = adjustedSensitivity;
    }

    public setMouseSensitivity(sensitivity: number): void {
        this.mouseSensitivity = Math.max(0.1, Math.min(5.0, sensitivity));
        console.log(`Mouse sensitivity set to: ${this.mouseSensitivity}`);
    }

    public toggleMouseInversion(): void {
        this.invertMouse = !this.invertMouse;
        TOOLKIT.UserInputOptions.PointerMouseInverted = this.invertMouse;
        console.log(`Mouse inversion: ${this.invertMouse ? "Enabled" : "Disabled"}`);
    }

    public setDeadZones(mouseDeadZone: number, wheelDeadZone: number): void {
        TOOLKIT.UserInputOptions.PointerMouseDeadZone = Math.max(0.0, Math.min(0.5, mouseDeadZone));
        TOOLKIT.UserInputOptions.PointerWheelDeadZone = Math.max(0.0, Math.min(0.5, wheelDeadZone));
        
        console.log(`Dead zones set - Mouse: ${TOOLKIT.UserInputOptions.PointerMouseDeadZone}, Wheel: ${TOOLKIT.UserInputOptions.PointerWheelDeadZone}`);
    }

    public enableCameraControls(enable: boolean): void {
        TOOLKIT.UserInputOptions.UseArrowKeyRotation = enable;
        TOOLKIT.UserInputOptions.EnableBabylonRotation = enable;
        
        console.log(`Camera controls: ${enable ? "Enabled" : "Disabled"}`);
    }
}
```

### Comprehensive Input Settings Manager
```typescript
class InputSettingsManager extends TOOLKIT.ScriptComponent {
    public inputProfile: string = "default";

    protected start(): void {
        this.loadInputProfile(this.inputProfile);
    }

    public loadInputProfile(profileName: string): void {
        switch (profileName) {
            case "casual":
                this.applyCasualProfile();
                break;
            case "competitive":
                this.applyCompetitiveProfile();
                break;
            case "accessibility":
                this.applyAccessibilityProfile();
                break;
            default:
                this.applyDefaultProfile();
                break;
        }
        
        this.inputProfile = profileName;
        console.log(`Input profile '${profileName}' loaded`);
    }

    private applyDefaultProfile(): void {
        TOOLKIT.UserInputOptions.KeyboardSmoothing = true;
        TOOLKIT.UserInputOptions.KeyboardMoveSensibility = 2.0;
        TOOLKIT.UserInputOptions.KeyboardArrowSensibility = 1.5;
        TOOLKIT.UserInputOptions.KeyboardMoveDeadZone = 0.1;

        TOOLKIT.UserInputOptions.GamepadDeadStickValue = 0.15;
        TOOLKIT.UserInputOptions.GamepadLStickSensibility = 1.0;
        TOOLKIT.UserInputOptions.GamepadRStickSensibility = 1.0;
        TOOLKIT.UserInputOptions.GamepadLStickXInverted = false;
        TOOLKIT.UserInputOptions.GamepadLStickYInverted = false;
        TOOLKIT.UserInputOptions.GamepadRStickXInverted = false;
        TOOLKIT.UserInputOptions.GamepadRStickYInverted = false;

        TOOLKIT.UserInputOptions.PointerMouseDeadZone = 0.05;
        TOOLKIT.UserInputOptions.PointerWheelDeadZone = 0.1;
        TOOLKIT.UserInputOptions.PointerMouseInverted = false;
        TOOLKIT.UserInputOptions.BabylonAngularSensibility = 2000;
    }

    private applyCasualProfile(): void {
        TOOLKIT.UserInputOptions.KeyboardSmoothing = true;
        TOOLKIT.UserInputOptions.KeyboardMoveSensibility = 1.5;
        TOOLKIT.UserInputOptions.KeyboardArrowSensibility = 1.2;
        TOOLKIT.UserInputOptions.KeyboardMoveDeadZone = 0.15;

        TOOLKIT.UserInputOptions.GamepadDeadStickValue = 0.2;
        TOOLKIT.UserInputOptions.GamepadLStickSensibility = 0.8;
        TOOLKIT.UserInputOptions.GamepadRStickSensibility = 0.8;

        TOOLKIT.UserInputOptions.PointerMouseDeadZone = 0.08;
        TOOLKIT.UserInputOptions.BabylonAngularSensibility = 1500;
    }

    private applyCompetitiveProfile(): void {
        TOOLKIT.UserInputOptions.KeyboardSmoothing = false;
        TOOLKIT.UserInputOptions.KeyboardMoveSensibility = 3.0;
        TOOLKIT.UserInputOptions.KeyboardArrowSensibility = 2.5;
        TOOLKIT.UserInputOptions.KeyboardMoveDeadZone = 0.05;

        TOOLKIT.UserInputOptions.GamepadDeadStickValue = 0.1;
        TOOLKIT.UserInputOptions.GamepadLStickSensibility = 1.5;
        TOOLKIT.UserInputOptions.GamepadRStickSensibility = 2.0;

        TOOLKIT.UserInputOptions.PointerMouseDeadZone = 0.02;
        TOOLKIT.UserInputOptions.BabylonAngularSensibility = 3000;
    }

    private applyAccessibilityProfile(): void {
        TOOLKIT.UserInputOptions.KeyboardSmoothing = true;
        TOOLKIT.UserInputOptions.KeyboardMoveSensibility = 1.0;
        TOOLKIT.UserInputOptions.KeyboardArrowSensibility = 1.0;
        TOOLKIT.UserInputOptions.KeyboardMoveDeadZone = 0.25;

        TOOLKIT.UserInputOptions.GamepadDeadStickValue = 0.3;
        TOOLKIT.UserInputOptions.GamepadLStickSensibility = 0.6;
        TOOLKIT.UserInputOptions.GamepadRStickSensibility = 0.6;

        TOOLKIT.UserInputOptions.PointerMouseDeadZone = 0.15;
        TOOLKIT.UserInputOptions.BabylonAngularSensibility = 1000;
    }

    public saveCurrentSettings(): any {
        return {
            keyboardSmoothing: TOOLKIT.UserInputOptions.KeyboardSmoothing,
            keyboardMoveSensibility: TOOLKIT.UserInputOptions.KeyboardMoveSensibility,
            keyboardArrowSensibility: TOOLKIT.UserInputOptions.KeyboardArrowSensibility,
            keyboardMoveDeadZone: TOOLKIT.UserInputOptions.KeyboardMoveDeadZone,
            gamepadDeadStickValue: TOOLKIT.UserInputOptions.GamepadDeadStickValue,
            gamepadLStickSensibility: TOOLKIT.UserInputOptions.GamepadLStickSensibility,
            gamepadRStickSensibility: TOOLKIT.UserInputOptions.GamepadRStickSensibility,
            gamepadLStickXInverted: TOOLKIT.UserInputOptions.GamepadLStickXInverted,
            gamepadLStickYInverted: TOOLKIT.UserInputOptions.GamepadLStickYInverted,
            gamepadRStickXInverted: TOOLKIT.UserInputOptions.GamepadRStickXInverted,
            gamepadRStickYInverted: TOOLKIT.UserInputOptions.GamepadRStickYInverted,
            pointerMouseDeadZone: TOOLKIT.UserInputOptions.PointerMouseDeadZone,
            pointerWheelDeadZone: TOOLKIT.UserInputOptions.PointerWheelDeadZone,
            pointerMouseInverted: TOOLKIT.UserInputOptions.PointerMouseInverted,
            babylonAngularSensibility: TOOLKIT.UserInputOptions.BabylonAngularSensibility,
            useCanvasElement: TOOLKIT.UserInputOptions.UseCanvasElement,
            useArrowKeyRotation: TOOLKIT.UserInputOptions.UseArrowKeyRotation,
            enableBabylonRotation: TOOLKIT.UserInputOptions.EnableBabylonRotation
        };
    }

    public loadSettings(settings: any): void {
        TOOLKIT.UserInputOptions.KeyboardSmoothing = settings.keyboardSmoothing;
        TOOLKIT.UserInputOptions.KeyboardMoveSensibility = settings.keyboardMoveSensibility;
        TOOLKIT.UserInputOptions.KeyboardArrowSensibility = settings.keyboardArrowSensibility;
        TOOLKIT.UserInputOptions.KeyboardMoveDeadZone = settings.keyboardMoveDeadZone;
        TOOLKIT.UserInputOptions.GamepadDeadStickValue = settings.gamepadDeadStickValue;
        TOOLKIT.UserInputOptions.GamepadLStickSensibility = settings.gamepadLStickSensibility;
        TOOLKIT.UserInputOptions.GamepadRStickSensibility = settings.gamepadRStickSensibility;
        TOOLKIT.UserInputOptions.GamepadLStickXInverted = settings.gamepadLStickXInverted;
        TOOLKIT.UserInputOptions.GamepadLStickYInverted = settings.gamepadLStickYInverted;
        TOOLKIT.UserInputOptions.GamepadRStickXInverted = settings.gamepadRStickXInverted;
        TOOLKIT.UserInputOptions.GamepadRStickYInverted = settings.gamepadRStickYInverted;
        TOOLKIT.UserInputOptions.PointerMouseDeadZone = settings.pointerMouseDeadZone;
        TOOLKIT.UserInputOptions.PointerWheelDeadZone = settings.pointerWheelDeadZone;
        TOOLKIT.UserInputOptions.PointerMouseInverted = settings.pointerMouseInverted;
        TOOLKIT.UserInputOptions.BabylonAngularSensibility = settings.babylonAngularSensibility;
        TOOLKIT.UserInputOptions.UseCanvasElement = settings.useCanvasElement;
        TOOLKIT.UserInputOptions.UseArrowKeyRotation = settings.useArrowKeyRotation;
        TOOLKIT.UserInputOptions.EnableBabylonRotation = settings.enableBabylonRotation;

        console.log("Custom settings loaded");
    }

    public resetToDefaults(): void {
        this.applyDefaultProfile();
        console.log("Settings reset to defaults");
    }

    public getCurrentProfile(): string {
        return this.inputProfile;
    }
}
```

## Best Practices

1. **Profile Management** - Use input profiles for different user types and preferences
2. **Sensitivity Ranges** - Keep sensitivity values within reasonable ranges (0.1 to 5.0)
3. **Dead Zone Tuning** - Adjust dead zones based on device quality and user needs
4. **Inversion Options** - Provide inversion options for both axes of analog controls
5. **Settings Persistence** - Save and load user input preferences
6. **Device Detection** - Configure supported devices based on platform capabilities

## Related Classes
- [InputController](InputController.md) - Comprehensive input handling
- [TouchJoystickHandler](TouchJoystickHandler.md) - Touch joystick controls
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
