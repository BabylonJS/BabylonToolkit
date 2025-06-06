# Core Interfaces

Core framework interfaces and type definitions for the Babylon Toolkit.

**Namespace**: `TOOLKIT`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

This document covers the core interfaces and type definitions used throughout the Babylon Toolkit framework for configuration, messaging, and asset management.

## Playground Configuration

### IPlaygroundOptions
Configuration options for initializing the Babylon Toolkit playground environment.

```typescript
interface IPlaygroundOptions {
    loadProjectScriptBundle?: boolean;
    projectScriptBundleUrl?: string;
    showDefaultLoadingScreen?: boolean;
    hideLoadingUIWithEngine?: boolean;
    defaultLoadingUIMarginTop?: string;
}
```

**Properties:**
- **`loadProjectScriptBundle?`** `boolean` - Whether to load project script bundle
- **`projectScriptBundleUrl?`** `string` - URL for project script bundle
- **`showDefaultLoadingScreen?`** `boolean` - Show default loading screen
- **`hideLoadingUIWithEngine?`** `boolean` - Hide loading UI with engine
- **`defaultLoadingUIMarginTop?`** `string` - Top margin for loading text

## Asset Management

### IAssetPreloader
Interface for asset preloading functionality.

```typescript
interface IAssetPreloader {
    addPreloaderTasks(assetsManager: TOOLKIT.PreloadAssetsManager): void;
}
```

**Methods:**
- **`addPreloaderTasks(assetsManager)`** - Add preloader tasks to assets manager

## Messaging System

### IWindowMessage
Interface for window messaging system.

```typescript
interface IWindowMessage {
    source: string;
    command: string;
    [key: string]: any;
}
```

**Properties:**
- **`source`** `string` - Message source identifier
- **`command`** `string` - Command type
- **`[key: string]`** `any` - Additional message data

## Input System

### UserInputPress
Input press event data structure.

```typescript
interface UserInputPress {
    index: number;
    action: () => void;
}
```

**Properties:**
- **`index`** `number` - Input index
- **`action`** `() => void` - Action callback function

### KeymapState
Keyboard input state tracking.

```typescript
interface KeymapState {
    result: boolean | number;
    pressTime: number;
    releaseTime: number;
}
```

**Properties:**
- **`result`** `boolean | number` - Input result value
- **`pressTime`** `number` - Time when key was pressed
- **`releaseTime`** `number` - Time when key was released

## Animation System

### IAnimatorEvent
Animation event data structure.

```typescript
interface IAnimatorEvent {
    id: number;
    clip: string;
    time: number;
    functionName: string;
    stringParameter: string;
    floatParameter: number;
    intParameter: number;
    objectIdParameter: string;
    objectNameParameter: string;
}
```

**Properties:**
- **`id`** `number` - Event identifier
- **`clip`** `string` - Animation clip name
- **`time`** `number` - Event time in animation
- **`functionName`** `string` - Function to call
- **`stringParameter`** `string` - String parameter
- **`floatParameter`** `number` - Float parameter
- **`intParameter`** `number` - Integer parameter
- **`objectIdParameter`** `string` - Object ID parameter
- **`objectNameParameter`** `string` - Object name parameter

## Enumerations

### UserInputKeyboard
Keyboard key code enumeration for common keys.

```typescript
enum UserInputKeyboard {
    BackSpace = 8,
    Tab = 9,
    Enter = 13,
    Shift = 16,
    Ctrl = 17,
    Alt = 18,
    Pause = 19,
    CapsLock = 20,
    Escape = 27,
    Space = 32,
    PageUp = 33,
    PageDown = 34,
    End = 35,
    Home = 36,
    LeftArrow = 37,
    UpArrow = 38,
    RightArrow = 39,
    DownArrow = 40,
    Insert = 45,
    Delete = 46,
    Num0 = 48,
    Num1 = 49,
    Num2 = 50,
    Num3 = 51,
    Num4 = 52,
    Num5 = 53,
    Num6 = 54,
    Num7 = 55,
    Num8 = 56,
    Num9 = 57,
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
    LeftWindowKey = 91,
    RightWindowKey = 92,
    SelectKey = 93,
    Numpad0 = 96,
    Numpad1 = 97,
    Numpad2 = 98,
    Numpad3 = 99,
    Numpad4 = 100,
    Numpad5 = 101,
    Numpad6 = 102,
    Numpad7 = 103,
    Numpad8 = 104,
    Numpad9 = 105,
    Multiply = 106,
    Add = 107,
    Subtract = 109,
    DecimalPoint = 110,
    Divide = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    NumLock = 144,
    ScrollLock = 145,
    SemiColon = 186,
    EqualSign = 187,
    Comma = 188,
    Dash = 189,
    Period = 190,
    ForwardSlash = 191,
    GraveAccent = 192,
    OpenBracket = 219,
    BackSlash = 220,
    CloseBraket = 221,
    SingleQuote = 222
}
```

### AnimatorParameterType
Animation parameter type enumeration.

```typescript
enum AnimatorParameterType {
    Float = 1,
    Int = 3,
    Bool = 4,
    Trigger = 9
}
```

**Values:**
- **`Float`** `1` - Floating point parameter
- **`Int`** `3` - Integer parameter
- **`Bool`** `4` - Boolean parameter
- **`Trigger`** `9` - Trigger parameter (auto-reset)

## Usage Examples

### Playground Initialization
```typescript
const options: TOOLKIT.IPlaygroundOptions = {
    loadProjectScriptBundle: true,
    projectScriptBundleUrl: "./scripts/project.js",
    showDefaultLoadingScreen: true,
    hideLoadingUIWithEngine: true,
    defaultLoadingUIMarginTop: "150px"
};

await TOOLKIT.SceneManager.InitializePlayground(engine, options);
```

### Asset Preloader Implementation
```typescript
class GameAssetPreloader implements TOOLKIT.IAssetPreloader {
    addPreloaderTasks(assetsManager: TOOLKIT.PreloadAssetsManager): void {
        // Add texture tasks
        assetsManager.addTextureTask("player", "./textures/player.jpg");
        assetsManager.addTextureTask("ground", "./textures/ground.jpg");
        
        // Add mesh tasks
        assetsManager.addMeshTask("level", "", "./models/", "level.babylon");
        assetsManager.addMeshTask("character", "", "./models/", "character.glb");
        
        // Add sound tasks
        assetsManager.addBinaryFileTask("music", "./audio/background.mp3");
    }
}
```

### Window Messaging
```typescript
// Send window message
const message: TOOLKIT.IWindowMessage = {
    source: "game",
    command: "playerScore",
    score: 1500,
    level: 3
};

window.postMessage(message, "*");

// Handle window messages
window.addEventListener("message", (event) => {
    const msg = event.data as TOOLKIT.IWindowMessage;
    if (msg.source === "game") {
        switch (msg.command) {
            case "playerScore":
                this.updateScore(msg.score);
                break;
            case "levelComplete":
                this.loadNextLevel();
                break;
        }
    }
});
```

### Input Key Mapping
```typescript
// Use keyboard enumeration for key mapping
input.mapKey("jump", TOOLKIT.UserInputKeyboard.Space);
input.mapKey("run", TOOLKIT.UserInputKeyboard.Shift);
input.mapKey("crouch", TOOLKIT.UserInputKeyboard.C);

// Map movement keys
input.mapAxis("horizontal", 
    TOOLKIT.UserInputKeyboard.D, 
    TOOLKIT.UserInputKeyboard.A
);
input.mapAxis("vertical", 
    TOOLKIT.UserInputKeyboard.W, 
    TOOLKIT.UserInputKeyboard.S
);
```

### Animation Events
```typescript
// Create animation event
const jumpEvent: TOOLKIT.IAnimatorEvent = {
    id: 1,
    clip: "jump",
    time: 0.5,
    functionName: "onJumpApex",
    stringParameter: "jump_apex",
    floatParameter: 1.0,
    intParameter: 1,
    objectIdParameter: "player_001",
    objectNameParameter: "Player"
};

// Add event to animation system
animationState.addAnimationEvent(jumpEvent.clip, jumpEvent.time, () => {
    this.handleJumpApex(jumpEvent);
});
```

## Related Documentation
- [SceneManager](../core/SceneManager.md) - Core scene management
- [InputController](../input/InputController.md) - Input system
- [AnimationState](../animation/AnimationState.md) - Animation system
- [PreloadAssetsManager](../assets/PreloadAssetsManager.md) - Asset management
