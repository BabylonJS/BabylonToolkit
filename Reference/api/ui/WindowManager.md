# WindowManager

Window and viewport management system providing platform detection, device information, and window state management capabilities.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

WindowManager provides comprehensive window and viewport management functionality, including platform detection, device type identification, screen orientation handling, and window state monitoring. It serves as a central hub for managing application window behavior across different platforms and devices.

## Static Methods

### Platform Detection

#### `GetPlatformType()`
Detects and returns the current platform type.

**Returns:** `string` - Platform identifier (e.g., "windows", "macos", "linux", "android", "ios")

#### `IsMobilePlatform()`
Checks if the current platform is a mobile device.

**Returns:** `boolean` - True if running on mobile platform

#### `IsDesktopPlatform()`
Checks if the current platform is a desktop system.

**Returns:** `boolean` - True if running on desktop platform

#### `IsWebPlatform()`
Checks if the application is running in a web browser.

**Returns:** `boolean` - True if running in web browser

### Device Information

#### `GetDeviceType()`
Determines the device type based on screen size and capabilities.

**Returns:** `string` - Device type ("phone", "tablet", "desktop", "tv")

#### `GetScreenResolution()`
Gets the current screen resolution.

**Returns:** `{ width: number, height: number }` - Screen dimensions

#### `GetViewportSize()`
Gets the current viewport dimensions.

**Returns:** `{ width: number, height: number }` - Viewport dimensions

#### `GetDevicePixelRatio()`
Gets the device pixel ratio for high-DPI displays.

**Returns:** `number` - Device pixel ratio

### Orientation and Layout

#### `GetScreenOrientation()`
Gets the current screen orientation.

**Returns:** `string` - Orientation ("portrait", "landscape", "portrait-primary", "landscape-primary")

#### `IsPortraitMode()`
Checks if the device is in portrait orientation.

**Returns:** `boolean` - True if in portrait mode

#### `IsLandscapeMode()`
Checks if the device is in landscape orientation.

**Returns:** `boolean` - True if in landscape mode

### Window State

#### `IsFullscreen()`
Checks if the application is in fullscreen mode.

**Returns:** `boolean` - True if in fullscreen

#### `RequestFullscreen()`
Requests fullscreen mode for the application.

**Returns:** `Promise<void>` - Promise that resolves when fullscreen is entered

#### `ExitFullscreen()`
Exits fullscreen mode.

**Returns:** `Promise<void>` - Promise that resolves when fullscreen is exited

#### `ToggleFullscreen()`
Toggles between fullscreen and windowed mode.

**Returns:** `Promise<void>` - Promise that resolves when toggle is complete

### Event Management

#### `OnWindowResize(callback)`
Registers a callback for window resize events.

**Parameters:**
- `callback` `(width: number, height: number) => void` - Resize event callback

#### `OnOrientationChange(callback)`
Registers a callback for orientation change events.

**Parameters:**
- `callback` `(orientation: string) => void` - Orientation change callback

#### `OnFullscreenChange(callback)`
Registers a callback for fullscreen state changes.

**Parameters:**
- `callback` `(isFullscreen: boolean) => void` - Fullscreen change callback

## Usage Examples

### Basic Platform Detection
```typescript
class PlatformManager extends TOOLKIT.ScriptComponent {
    protected start(): void {
        this.detectPlatformInfo();
        this.setupPlatformSpecificBehavior();
    }

    private detectPlatformInfo(): void {
        const platformType = TOOLKIT.WindowManager.GetPlatformType();
        const deviceType = TOOLKIT.WindowManager.GetDeviceType();
        const isMobile = TOOLKIT.WindowManager.IsMobilePlatform();
        const isDesktop = TOOLKIT.WindowManager.IsDesktopPlatform();
        const isWeb = TOOLKIT.WindowManager.IsWebPlatform();

        console.log(`Platform: ${platformType}`);
        console.log(`Device: ${deviceType}`);
        console.log(`Mobile: ${isMobile}`);
        console.log(`Desktop: ${isDesktop}`);
        console.log(`Web: ${isWeb}`);

        const resolution = TOOLKIT.WindowManager.GetScreenResolution();
        const viewport = TOOLKIT.WindowManager.GetViewportSize();
        const pixelRatio = TOOLKIT.WindowManager.GetDevicePixelRatio();

        console.log(`Screen: ${resolution.width}x${resolution.height}`);
        console.log(`Viewport: ${viewport.width}x${viewport.height}`);
        console.log(`Pixel Ratio: ${pixelRatio}`);
    }

    private setupPlatformSpecificBehavior(): void {
        if (TOOLKIT.WindowManager.IsMobilePlatform()) {
            this.setupMobileBehavior();
        } else if (TOOLKIT.WindowManager.IsDesktopPlatform()) {
            this.setupDesktopBehavior();
        }
    }

    private setupMobileBehavior(): void {
        console.log("Configuring for mobile platform");
    }

    private setupDesktopBehavior(): void {
        console.log("Configuring for desktop platform");
    }
}
```

### Responsive Layout Management
```typescript
class ResponsiveLayoutManager extends TOOLKIT.ScriptComponent {
    public currentLayout: string = "unknown";

    protected start(): void {
        this.setupResponsiveLayout();
        this.registerWindowEvents();
    }

    private setupResponsiveLayout(): void {
        this.updateLayout();
    }

    private registerWindowEvents(): void {
        TOOLKIT.WindowManager.OnWindowResize((width, height) => {
            console.log(`Window resized: ${width}x${height}`);
            this.updateLayout();
        });

        TOOLKIT.WindowManager.OnOrientationChange((orientation) => {
            console.log(`Orientation changed: ${orientation}`);
            this.updateLayout();
        });
    }

    private updateLayout(): void {
        const viewport = TOOLKIT.WindowManager.GetViewportSize();
        const deviceType = TOOLKIT.WindowManager.GetDeviceType();

        let newLayout = "default";

        if (deviceType === "phone") {
            newLayout = TOOLKIT.WindowManager.IsPortraitMode() ? "phone-portrait" : "phone-landscape";
        } else if (deviceType === "tablet") {
            newLayout = TOOLKIT.WindowManager.IsPortraitMode() ? "tablet-portrait" : "tablet-landscape";
        } else if (deviceType === "desktop") {
            if (viewport.width < 1024) {
                newLayout = "desktop-small";
            } else if (viewport.width < 1920) {
                newLayout = "desktop-medium";
            } else {
                newLayout = "desktop-large";
            }
        }

        if (newLayout !== this.currentLayout) {
            this.currentLayout = newLayout;
            this.applyLayout(newLayout);
        }
    }

    private applyLayout(layout: string): void {
        console.log(`Applying layout: ${layout}`);
    }
}
```

## Best Practices

1. **Platform Detection** - Use platform detection to optimize user experience for different devices
2. **Responsive Design** - Implement responsive layouts that adapt to different screen sizes
3. **Orientation Handling** - Handle orientation changes gracefully for mobile devices
4. **Fullscreen Management** - Provide intuitive fullscreen controls for immersive experiences
5. **Event Cleanup** - Properly remove event listeners when components are destroyed
6. **Performance** - Cache platform information to avoid repeated detection calls

## Related Classes
- [CustomLoadingScreen](CustomLoadingScreen.md) - Custom loading screen implementation
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
