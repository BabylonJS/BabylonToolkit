# Tween Style Animation System

A modern, powerful animation system for BabylonJS that provides a clean async/await API for complex animations, group choreography, and easing effects with **full GUI control support** and **individual animation control**.

## Features

- **Modern Async/Await API** - Clean, promise-based animation control
- **Comprehensive Easing Support** - 30+ built-in easing functions
- **Complete GUI Animation Support** - Full BABYLON.GUI.Control animation including position properties ✅ **FULLY WORKING**
- **Individual Animation Control** - Access and control each animated property separately ✅ **NEW!**
- **Group Animations** - Parallel and sequential animation choreography with stagger effects
- **Dot Notation Properties** - Animate nested properties like `"position.x"` or `"material.alpha"`
- **Type-Safe** - Full TypeScript support with proper type checking
- **Flexible Control** - Both promise-based and callback-based workflows
- **Yoyo Effects** - Built-in reversible animations
- **Performance Optimized** - Built on native BabylonJS animation system with GPU acceleration

## Aliases

SM -> TOOLKIT.SceneManager
WM -> TOOLKIT.WindowManager
UI -> TOOLKIT.UserInterface
IC -> TOOLKIT.InputController

## Quick Start

```typescript
// Basic usage - fade out a material
await SM.TweenToAsync(mesh.material, 
    { "alpha": 0.3 }, 
    { duration: 1.2, ease: "sineInOut" }
);

// Multiple property animation with individual control - NEW!
const tween = SM.TweenTo(mesh, 
    { "position.x": 10, "position.y": 5, "rotation.z": Math.PI }, 
    { duration: 2, ease: "quadInOut" }
);

// Control individual animations (one per property)
tween.animations[0];  // position.x animation
tween.animations[1];  // position.y animation  
tween.animations[2];  // rotation.z animation

// Stop only the Y position animation while keeping X and rotation
tween.animations[1].stop();

// Stop all animations
tween.animations.forEach(anim => anim.stop());

// Precise control with start and end values
await SM.TweenFromToAsync(
    mesh,
    { "position.x": -2, "position.y": 0 },    // Start values
    { "position.x":  2, "position.y": 1.5 },  // End values
    { duration: 2, ease: "quadInOut", yoyo: true, yoyoCount: 1 }
);

// Group animations with stagger effect
await SM.TweenGroupAsync([
    () => SM.TweenTo(mesh1, { "position.z": -4 }, { duration: 0.8 }),
    () => SM.TweenTo(mesh2, { "position.z": -4 }, { duration: 0.8 }),
    () => SM.TweenTo(mesh3, { "position.z": -4 }, { duration: 0.8 })
], { mode: "all", stagger: 150 });

// GUI control animations with individual property control - FULLY WORKING!
const guiTween = SM.TweenFromTo(guiButton,
    { top: "-100px", left: "50%", alpha: 0 },    // Start above screen
    { top: "20px", left: "50%", alpha: 1 },      // Drop down and fade in
    { duration: 1.2, ease: "backOut" }
);

// Stop only the horizontal movement while keeping vertical and alpha
guiTween.animations[1].stop(); // Stop left animation
// guiTween.animations[0] = top animation (continues)
// guiTween.animations[2] = alpha animation (continues)
```

## API Reference

### Core Methods

#### `TweenTo(target, to, options?, scene?)`
Animates object properties to target values from current values.

```typescript
const tween = SM.TweenTo(mesh, 
    { "position.x": 10, "rotation.y": Math.PI }, 
    { duration: 2, ease: "bounceOut" }
);

// Wait for completion
await tween.finished;
```

#### `TweenToAsync(target, to, options?, scene?)`
Async version that automatically awaits completion.

```typescript
await SM.TweenToAsync(material, 
    { alpha: 0 }, 
    { duration: 1, ease: "sineOut" }
);
```

#### `TweenFromTo(target, from, to, options?, scene?)`
Animates from specific start values to target values.

```typescript
await SM.TweenFromToAsync(mesh,
    { "position.y": -10, "material.alpha": 0 },  // Start
    { "position.y": 0, "material.alpha": 1 },    // End
    { duration: 1.5, ease: "backOut" }
);
```

#### `TweenGroupAsync(tweenFunctions, options?, scene?)`
Executes multiple animations in parallel or sequence.

```typescript
await SM.TweenGroupAsync([
    () => SM.TweenTo(door1, { "rotation.y": -Math.PI/2 }, { duration: 1 }),
    () => SM.TweenTo(door2, { "rotation.y": Math.PI/2 }, { duration: 1 })
], { mode: "all", stagger: 200 });
```

### Options Interface

```typescript
interface ITweenOptions {
    duration?: number;           // Duration in seconds (default: 1)
    delay?: number;             // Delay before starting (default: 0)
    ease?: string | BABYLON.EasingFunction;  // Easing function
    loop?: boolean;             // Loop animation (default: false)
    yoyo?: boolean;             // Reverse on repeat (default: false)
    yoyoCount?: number;         // Number of yoyo cycles (default: 0)
    speed?: number;             // Speed multiplier (default: 1)
    onStart?: () => void;       // Start callback
    onComplete?: () => void;    // Completion callback
    onUpdate?: () => void;      // Update callback
    onRepeat?: () => void;      // Repeat callback
}
```

### Group Options Interface

```typescript
interface IGroupTweenOptions {
    mode?: "all" | "sequence";  // Execution mode
    stagger?: number;           // Delay between animations (ms)
    onComplete?: () => void;    // Group completion callback
}
```

### Tween Result Interface

```typescript
interface ITweenResult {
    animations: BABYLON.Animatable[];  // Array of animation instances (one per property)
    finished: Promise<void>;           // Promise that resolves when all animations complete
}
```

## Supported Easing Functions

The system supports 30+ easing functions with intuitive naming:

### Basic Easing
- `"linear"` - Constant speed
- `"sineIn"`, `"sineOut"`, `"sineInOut"` - Sine wave easing
- `"quadIn"`, `"quadOut"`, `"quadInOut"` - Quadratic easing
- `"cubicIn"`, `"cubicOut"`, `"cubicInOut"` - Cubic easing

### Advanced Easing
- `"quartIn"`, `"quartOut"`, `"quartInOut"` - Quartic easing
- `"quintIn"`, `"quintOut"`, `"quintInOut"` - Quintic easing
- `"expoIn"`, `"expoOut"`, `"expoInOut"` - Exponential easing
- `"circleIn"`, `"circleOut"`, `"circleInOut"` - Circular easing

### Special Effects
- `"backIn"`, `"backOut"`, `"backInOut"` - Overshooting easing
- `"elasticIn"`, `"elasticOut"`, `"elasticInOut"` - Elastic bounce
- `"bounceIn"`, `"bounceOut"`, `"bounceInOut"` - Bouncing effects

## Property Support

The system supports dot notation for nested properties and automatically detects types:

### Supported Types
- **Numbers**: `alpha`, `intensity`, `fov`
- **Vector2**: `{x, y}` properties, UV coordinates, 2D positions  
- **Vector3**: `position`, `rotation`, `scaling`, directions, 3D coordinates
- **Vector4**: 4D vectors, quaternion components
- **Color3**: `diffuseColor`, `emissiveColor`, `specularColor`, light colors
- **Color4**: Colors with alpha channel for GUI elements and transparency
- **Quaternion**: `rotationQuaternion` for smooth, gimbal-lock-free rotations
- **GUI Controls**: `BABYLON.GUI.Control` objects with position, alpha, and styling properties

### Examples
```typescript
// Nested property access
"position.x"
"material.alpha" 
"diffuseColor.r"
"scaling.y"

// Multiple properties
{
    "position.x": 5,
    "position.y": 2, 
    "material.alpha": 0.5,
    "scaling.z": 2
}

// Direct BABYLON vector/color objects
{
    position: new BABYLON.Vector3(10, 5, -3),
    scaling: new BABYLON.Vector3(2, 1.5, 1),
    diffuseColor: new BABYLON.Color3(1, 0.5, 0)
}
```

## GUI Animation Support

The tween system provides **comprehensive support for BABYLON.GUI.Control animations**, including position properties that were previously difficult to animate with high performance.

### Supported GUI Properties

- **Position Properties**: `top`, `left`, `topInPixels`, `leftInPixels` ✅ **FULLY WORKING**
- **Size Properties**: `width`, `height`, `widthInPixels`, `heightInPixels` ✅ **FULLY WORKING**
- **Standard Properties**: `alpha`, `color`, `scaleX`, `scaleY`, `rotation` ✅ **FULLY WORKING**
- **String & Numeric Values**: Supports both numeric values and string values like `"50px"`, `"25%"` ✅ **FULLY WORKING**
- **Mixed Units**: Can animate between different unit types seamlessly ✅ **FULLY WORKING**

### GUI Animation Features

- ✅ **High Performance**: Uses `scene.beginAnimation` for optimal GPU acceleration
- ✅ **Individual Property Control**: Each GUI property gets its own animation that can be controlled separately  
- ✅ **Proxy Object System**: Intelligent detection and handling of GUI controls with position properties
- ✅ **InPixels Setters**: Properly uses BabylonJS `topInPixels`, `leftInPixels` setters for position animation
- ✅ **String Support**: Handles both `"50px"` string values and numeric values seamlessly  
- ✅ **Unit Conversion**: Automatically converts between pixels, percentages, and viewport units
- ✅ **Full Compatibility**: Works with all easing functions, yoyo, loops, and group animations
- ✅ **Type Safety**: Full TypeScript support with proper error handling
- ✅ **Auto-Detection**: Automatically detects GUI controls and applies appropriate animation handling
- ✅ **Selective Control**: Stop individual properties (like `left`) while keeping others (like `top`, `alpha`) running

### Technical Implementation

The GUI animation system uses an innovative **proxy object pattern** that:

1. **Detects GUI Controls**: Automatically identifies `BABYLON.GUI.Control` objects using multiple detection methods
2. **Creates Animation Proxies**: For position properties (`top`, `left`, `width`, `height`) that need special handling
3. **Uses InPixels Setters**: Leverages BabylonJS's `topInPixels = value` setters which internally set `top = "100px"`
4. **Individual Animation Tracking**: Each property gets its own `BABYLON.Animatable` for precise control
5. **Maintains Compatibility**: Preserves all existing 3D object animation functionality
6. **Handles String Values**: Seamlessly converts between string formats ("50px", "25%") and numeric values
7. **Syncs in Real-Time**: Proxy objects update the GUI control's actual properties during animation
8. **Performance Optimized**: Still uses `scene.beginAnimation` for maximum GPU acceleration
9. **Selective Control**: Enables stopping individual property animations while others continue

### GUI Animation Examples

```typescript
// Basic GUI button animation
const button = BABYLON.GUI.Button.CreateSimpleButton("myButton", "Click Me");
button.topInPixels = 100;
button.leftInPixels = 50;
button.alpha = 0;
advancedTexture.addControl(button);

// Animate position and alpha together with individual control
const tween = SM.TweenTo(button, {
    topInPixels: 200,      // ✅ Position animation - FULLY WORKING! (animations[0])
    leftInPixels: 150,     // ✅ Position animation - FULLY WORKING! (animations[1])
    alpha: 1               // ✅ Alpha animation - Always worked (animations[2])
}, {
    duration: 2,
    ease: "easeOutBounce"
});

// NEW: Stop only the horizontal movement while keeping vertical and alpha
tween.animations[1].stop(); // Stop leftInPixels animation
// tween.animations[0] and tween.animations[2] continue running

// Control individual animations
setTimeout(() => {
    tween.animations[0].pause(); // Pause top animation at current position
}, 1000);

setTimeout(() => {
    tween.animations[0].restart(); // Resume top animation
}, 1500);

// String-based positioning (also works)
await SM.TweenToAsync(button, {
    top: "50px",           // ✅ String position - FULLY WORKING!
    left: "25%",           // ✅ Percentage position - FULLY WORKING!
    alpha: 0.8
}, {
    duration: 1.5,
    ease: "sineInOut"
});

// Complex GUI entrance animation
await SM.TweenFromToAsync(panel,
    { 
        top: "-100px",         // Start above screen
        left: "50%",           // Centered horizontally
        alpha: 0               // Invisible
    },
    { 
        top: "20px",           // Final position
        left: "50%",           // Stay centered
        alpha: 1               // Fully visible
    },
    { 
        duration: 1.2, 
        ease: "backOut" 
    }
);

// GUI button pulse effect
await SM.TweenFromToAsync(button,
    { scaleX: 1.0, scaleY: 1.0 },
    { scaleX: 1.3, scaleY: 1.3 },
    { 
        duration: 0.6, 
        ease: "sineInOut", 
        yoyo: true, 
        yoyoCount: 2 
    }
);

// Panel slide-in from left
await SM.TweenFromToAsync(sidePanel,
    { left: "-200px", alpha: 0 },    // Off-screen left
    { left: "0px", alpha: 1 },       // On-screen
    { duration: 0.8, ease: "quartOut" }
);

// Notification toast animation
await SM.TweenFromToAsync(notification,
    { 
        top: "-50px",      // Start above screen
        alpha: 0 
    },
    { 
        top: "20px",       // Drop down
        alpha: 1 
    },
    { duration: 0.5, ease: "bounceOut" }
);

// Auto-hide after delay
setTimeout(async () => {
    await SM.TweenToAsync(notification, {
        top: "-50px",
        alpha: 0
    }, { duration: 0.3, ease: "sineIn" });
}, 3000);

// Group GUI animation with stagger and individual control
const buttons = [button1, button2, button3, button4];
const groupTweens = await Promise.all(
    buttons.map((btn, index) => {
        return new Promise<TOOLKIT.ITweenResult>((resolve) => {
            setTimeout(() => {
                const tween = SM.TweenFromTo(btn,
                    { top: "300px", alpha: 0 },      // Start below screen
                    { top: "100px", alpha: 1 },      // Final position
                    { duration: 0.6, ease: "backOut" }
                );
                resolve(tween);
            }, index * 150); // Manual stagger for control
        });
    })
);

// Later: stop all alpha animations while keeping position animations
groupTweens.forEach(tween => {
    tween.animations[1].stop(); // Stop alpha animation (index 1)
    // tween.animations[0] (top) continues
});

// Responsive GUI layout transition
await SM.TweenToAsync(mobilePanel, {
    left: "0%",            // Full width on mobile
    top: "0%",
    width: "100%",
    height: "100%"
}, { duration: 0.8, ease: "easeInOutQuart" });

// Modal dialog entrance
await SM.TweenFromToAsync(modal,
    { 
        scaleX: 0.3, 
        scaleY: 0.3, 
        alpha: 0 
    },
    { 
        scaleX: 1.0, 
        scaleY: 1.0, 
        alpha: 1 
    },
    { 
        duration: 0.4, 
        ease: "backOut" 
    }
);
```

### GUI Technical Details

The GUI animation system uses an innovative **proxy object pattern** that:

- **Detects GUI Controls**: Automatically identifies `BABYLON.GUI.Control` objects
- **Creates Animation Proxies**: For position properties that need special handling
- **Maintains Compatibility**: Preserves all existing 3D object animation functionality
- **Handles String Values**: Converts between string formats ("50px", "25%") and numeric values
- **Syncs in Real-Time**: Proxy objects update the GUI control's actual properties during animation

**Benefits of the new system:**
- 🚀 **Better Performance**: GPU-accelerated via `scene.beginAnimation`
- 🎨 **30+ Easing Functions**: Professional animation curves
- 🔧 **Less Code**: Single line vs complex RAF loops
- 🎯 **Type Safety**: Full TypeScript support with error checking
- ⚡ **Promise Support**: Clean async/await workflow
- 🎭 **Advanced Features**: Yoyo, loops, groups, stagger effects
- 🎮 **Individual Control**: Stop/pause/restart each animated property separately ✅ **NEW!**
- 🔀 **Selective Animation**: Keep some properties animating while stopping others ✅ **NEW!**

## Usage Examples

### Basic Animations with Individual Control

```typescript
// Simple movement with individual animation access
const tween = SM.TweenTo(mesh, 
    { "position.x": 10 }, 
    { duration: 2, ease: "quadOut" }
);
// tween.animations[0] = position.x animation

// Material fade with individual control
const fadeTween = SM.TweenTo(material, 
    { alpha: 0 }, 
    { duration: 1, ease: "sineOut" }
);
// fadeTween.animations[0] = alpha animation

// Multi-property scaling with selective control
const scaleTween = SM.TweenTo(mesh, 
    { "scaling.x": 2, "scaling.y": 2, "scaling.z": 2 }, 
    { 
        duration: 1, 
        ease: "bounceOut",
        onStart: () => console.log("Starting scale..."),
        onComplete: () => console.log("Scale complete!")
    }
);

// Stop only Z scaling while keeping X and Y
scaleTween.animations[2].stop(); // Stop scaling.z
// scaleTween.animations[0] (scaling.x) continues
// scaleTween.animations[1] (scaling.y) continues
```

### Individual Animation Control - NEW!

The tween system now returns an array of animations (one per animated property), enabling precise control over each property:

```typescript
// Multi-property animation
const tween = SM.TweenTo(mesh, {
    "position.x": 10,     // animations[0]
    "position.y": 5,      // animations[1]
    "rotation.z": Math.PI,// animations[2]
    "scaling.x": 2        // animations[3]
}, { duration: 3 });

// Control individual animations
tween.animations[0].pause();     // Pause X position
tween.animations[1].stop();      // Stop Y position completely
tween.animations[2].restart();   // Restart rotation from beginning
// tween.animations[3] continues normally

// Check animation status
const activeAnimations = tween.animations.filter(anim => !anim.stopped);
console.log(`${activeAnimations.length} animations still running`);

// Create dynamic control interface
tween.animations.forEach((anim, index) => {
    const property = ['position.x', 'position.y', 'rotation.z', 'scaling.x'][index];
    
    // Add UI controls for each animation
    createButton(`Pause ${property}`, () => anim.pause());
    createButton(`Resume ${property}`, () => anim.restart());
    createButton(`Stop ${property}`, () => anim.stop());
});

// Wait for all remaining animations to complete
await tween.finished;
```

### GUI Individual Control Examples

```typescript
// GUI button with multiple animated properties
const guiTween = SM.TweenTo(button, {
    topInPixels: 100,     // animations[0] - vertical position
    leftInPixels: 200,    // animations[1] - horizontal position  
    alpha: 1,             // animations[2] - transparency
    scaleX: 1.2,          // animations[3] - horizontal scale
    scaleY: 1.2           // animations[4] - vertical scale
}, { duration: 2 });

// Create interactive control scenarios:

// 1. Stop horizontal movement but keep vertical
guiTween.animations[1].stop(); // Stop leftInPixels
// Button continues moving vertically and scaling

// 2. Pause scaling temporarily
setTimeout(() => {
    guiTween.animations[3].pause(); // Pause scaleX
    guiTween.animations[4].pause(); // Pause scaleY
}, 1000);

// 3. Resume scaling after delay
setTimeout(() => {
    guiTween.animations[3].restart(); // Resume scaleX
    guiTween.animations[4].restart(); // Resume scaleY
}, 1500);

// 4. Emergency stop all animations
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        guiTween.animations.forEach(anim => anim.stop());
    }
});

// 5. Selective animation based on conditions
if (button.topInPixels > 150) {
    guiTween.animations[0].stop(); // Stop vertical movement
} else {
    guiTween.animations[1].stop(); // Stop horizontal movement
}
```

The system supports direct BABYLON vector and color objects for comprehensive animations:

```typescript
// Vector3 position animation
await SM.TweenToAsync(mesh, {
    position: new BABYLON.Vector3(10, 5, -3)
}, { duration: 2, ease: "easeOutBounce" });

// Vector3 scaling with from/to
await SM.TweenFromToAsync(mesh,
    { scaling: new BABYLON.Vector3(1, 1, 1) },      // From
    { scaling: new BABYLON.Vector3(2, 0.5, 1.5) },  // To
    { duration: 1.5, ease: "easeInOutElastic" }
);

// Color3 material animation
await SM.TweenToAsync(material, {
    diffuseColor: new BABYLON.Color3(1, 0, 0)  // Red
}, { duration: 1, ease: "easeInOutQuad" });

// Multiple vector properties simultaneously
await SM.TweenToAsync(mesh, {
    position: new BABYLON.Vector3(5, 3, -2),
    rotation: new BABYLON.Vector3(0, Math.PI, 0),
    scaling: new BABYLON.Vector3(2, 2, 2)
}, { duration: 2, ease: "easeInOutBack" });

// Vector2 for UV animation
await SM.TweenToAsync(texture, {
    uOffset: 1.0,
    vOffset: 0.5
}, { duration: 3, ease: "linear" });

// Or with Vector2 object
await SM.TweenToAsync(customMaterial, {
    uvOffset: new BABYLON.Vector2(1, 0.5)
}, { duration: 3 });

// Color4 with alpha
await SM.TweenToAsync(guiControl, {
    color: new BABYLON.Color4(1, 1, 1, 0.5)  // White with 50% alpha
}, { duration: 1, ease: "easeInOutQuad" });

// Quaternion rotation (smooth)
const targetRotation = BABYLON.Quaternion.FromEulerAngles(0, Math.PI, Math.PI/4);
await SM.TweenToAsync(mesh, {
    rotationQuaternion: targetRotation
}, { duration: 2, ease: "easeInOutQuad" });

// Light color animation
await SM.TweenToAsync(pointLight, {
    diffuse: new BABYLON.Color3(0.9, 0.7, 0.1)  // Warm light
}, { duration: 2.5, ease: "easeOutQuart" });

// Scene background color
await SM.TweenFromToAsync(scene,
    { clearColor: BABYLON.Color3.Blue() },     // From blue
    { clearColor: BABYLON.Color3.Red() },      // To red
    { duration: 3, ease: "easeInOutCubic" }
);

// Mixed individual components and full objects
await SM.TweenToAsync(mesh, {
    "position.x": 10,                           // Individual component
    "position.y": 5,                            // Individual component
    scaling: new BABYLON.Vector3(2, 2, 2),      // Full vector object
    "material.diffuseColor.r": 0.8              // Nested component
}, { duration: 2 });

// Rainbow color cycling
const material = mesh.material as BABYLON.StandardMaterial;
const colors = [
    BABYLON.Color3.Red(),
    BABYLON.Color3.Yellow(), 
    BABYLON.Color3.Green(),
    BABYLON.Color3.Blue(),
    BABYLON.Color3.Magenta()
];

for (const color of colors) {
    await SM.TweenToAsync(material, {
        diffuseColor: color
    }, { duration: 0.5, ease: "easeInOutQuad" });
}

// Vector path animation
const path = [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(5, 3, 2),
    new BABYLON.Vector3(10, 0, 5), 
    new BABYLON.Vector3(15, -2, 3),
    new BABYLON.Vector3(20, 0, 0)
];

for (const position of path) {
    await SM.TweenToAsync(mesh, {
        position: position
    }, { duration: 1, ease: "easeInOutQuad" });
}

// Group animation with vectors and colors
await SM.TweenGroupAsync([
    () => SM.TweenTo(mesh1, 
        { position: new BABYLON.Vector3(10, 0, 0) }, 
        { duration: 2, ease: "easeOutBounce" }
    ),
    () => SM.TweenTo(mesh2, 
        { scaling: new BABYLON.Vector3(1.5, 1.5, 1.5) }, 
        { duration: 1.5, ease: "easeInOutElastic" }
    ),
    () => SM.TweenTo(material, 
        { diffuseColor: BABYLON.Color3.Red() }, 
        { duration: 2.5, ease: "easeInOutQuad" }
    )
], { stagger: 0.3 });
```

### Precise Control Animations

```typescript
// Entrance animation
await SM.TweenFromToAsync(character,
    { "position.y": -5, "material.alpha": 0 },  // Start below ground, invisible
    { "position.y": 0, "material.alpha": 1 },   // End at ground level, visible
    { duration: 1.5, ease: "backOut" }
);

// Yoyo effect (wave animation)
await SM.TweenFromToAsync(flag,
    { "rotation.z": 0 },
    { "rotation.z": 0.3 },
    { duration: 0.5, ease: "sineInOut", yoyo: true, yoyoCount: 3 }
);

// Yoyo effect (pulsate button)
const tween = SM.TweenTo(
    this.playButton,
    { scaleX: button.x * 1.2, scaleY: button.y * 1.2 }, // Scale up by 20%
    {
        duration: 1.5,
        delay: 0.0,
        ease: "easeInOutSine",
        yoyo: true,      // Reverse back to original
        loop: true       // Repeat forever
    }
);
// To stop the pulsating effect later:
tween.animations.forEach(anim => anim.stop());

// Camera shake
for (let i = 0; i < 5; i++) {
    await SM.TweenFromToAsync(camera,
        { "position.x": camera.position.x - 0.1 },
        { "position.x": camera.position.x + 0.1 },
        { duration: 0.05, ease: "linear" }
    );
}
```

### Group Choreography

```typescript
// Parallel with stagger (wave effect)
await SM.TweenGroupAsync([
    () => SM.TweenTo(mesh1, { "position.y": 2 }, { duration: 0.8 }),
    () => SM.TweenTo(mesh2, { "position.y": 2 }, { duration: 0.8 }),
    () => SM.TweenTo(mesh3, { "position.y": 2 }, { duration: 0.8 }),
    () => SM.TweenTo(mesh4, { "position.y": 2 }, { duration: 0.8 }),
    () => SM.TweenTo(mesh5, { "position.y": 2 }, { duration: 0.8 })
], { mode: "all", stagger: 150 });

// Sequential entrance
await SM.TweenGroupAsync([
    () => SM.TweenFromTo(title, 
        { "position.y": 50, "material.alpha": 0 },
        { "position.y": 0, "material.alpha": 1 }, 
        { duration: 1, ease: "backOut" }
    ),
    () => SM.TweenFromTo(subtitle,
        { "position.y": -20, "material.alpha": 0 },
        { "position.y": -5, "material.alpha": 1 },
        { duration: 0.8, ease: "sineOut" }
    ),
    () => SM.TweenTo(button, 
        { "scaling.x": 1.2, "scaling.y": 1.2 }, 
        { duration: 0.3, ease: "elasticOut" }
    )
], { mode: "sequence" });

// Complex mixed choreography
await SM.TweenGroupAsync([
    () => Promise.all([  // Parallel sub-group
        SM.TweenToAsync(leftDoor, { "rotation.y": -Math.PI/2 }, { duration: 1 }),
        SM.TweenToAsync(rightDoor, { "rotation.y": Math.PI/2 }, { duration: 1 })
    ]),
    () => SM.TweenTo(light, { intensity: 2 }, { duration: 0.5 }),
    () => SM.TweenTo(character, { "position.z": 0 }, { duration: 1.5 })
], { 
    mode: "sequence",
    onComplete: () => console.log("Grand entrance complete!")
});
```

### Real-World Patterns

```typescript
// UI Panel slide-in
await SM.TweenFromToAsync(panel,
    { "position.x": -10, "material.alpha": 0 },  // Off-screen
    { "position.x": 0, "material.alpha": 1 },    // On-screen
    { duration: 0.8, ease: "quartOut" }
);

// Loading spinner
const spinnerTween = SM.TweenTo(spinner,
    { "rotation.z": Math.PI * 2 },
    { duration: 2, ease: "linear", loop: true }
);
// Stop when loading complete
spinnerTween.animations.forEach(anim => anim.stop());

// Attention pulse
await SM.TweenFromToAsync(button,
    { "scaling.x": 1, "scaling.y": 1 },
    { "scaling.x": 1.3, "scaling.y": 1.3 },
    { duration: 0.6, ease: "sineInOut", yoyo: true, yoyoCount: 2 }
);

// Character walk cycle
await SM.TweenGroupAsync([
    () => SM.TweenTo(character, { "position.z": 10 }, { duration: 5, ease: "linear" }),
    () => SM.TweenFromTo(character, { "position.y": 0 }, { "position.y": 0.2 }, 
        { duration: 0.5, ease: "sineInOut", yoyo: true, yoyoCount: 10 }),
    () => SM.TweenFromTo(character, { "rotation.z": 0 }, { "rotation.z": 0.1 }, 
        { duration: 0.8, ease: "sineInOut", yoyo: true, yoyoCount: 6 })
], { mode: "all" });
```

## Advanced Features

### Promise Integration

```typescript
// Sequential animations
async function performSequence() {
    await SM.TweenToAsync(mesh, { "position.x": 10 }, { duration: 1 });
    await SM.TweenToAsync(mesh, { "position.y": 5 }, { duration: 0.5 });
    await SM.TweenToAsync(material, { alpha: 0 }, { duration: 1 });
    console.log("Sequence complete!");
}

// Parallel animations
await Promise.all([
    SM.TweenToAsync(mesh, { "position.z": -4 }, { duration: 2 }),
    SM.TweenToAsync(camera, { "position.y": 8 }, { duration: 1.5 })
]);

// Race conditions
const winner = await Promise.race([
    SM.TweenToAsync(mesh1, { "position.x": 10 }, { duration: 2 }),
    SM.TweenToAsync(mesh2, { "position.x": 10 }, { duration: 1.8 })
]);
```

### Custom Easing Functions

```typescript
// Use BabylonJS easing functions directly
const customEasing = new BABYLON.BezierCurveEase(0.25, 0.1, 0.25, 1);
await SM.TweenToAsync(mesh, 
    { "position.x": 5 }, 
    { duration: 1, ease: customEasing }
);
```

### Animation Control

```typescript
// Get animation references for manual control
const tween = SM.TweenTo(mesh, 
    { "position.x": 10, "position.y": 5, "rotation.z": Math.PI }, 
    { duration: 5, ease: "linear" }
);

// Control individual animations (one per property)
// tween.animations[0] = position.x animation
// tween.animations[1] = position.y animation  
// tween.animations[2] = rotation.z animation

// Pause only the Y position animation
tween.animations[1].pause();

// Stop only the rotation animation
tween.animations[2].stop();

// Restart the X position animation
tween.animations[0].restart();

// Control all animations at once
tween.animations.forEach(anim => {
    anim.pause();
    anim.restart();
    anim.stop();
});

// Still wait for completion if needed
await tween.finished;
```

### GUI Control with Multiple Properties

```typescript
// GUI controls with multiple properties return multiple animations
const guiTween = SM.TweenTo(button, {
    topInPixels: 100,     // Animation 0
    leftInPixels: 200,    // Animation 1  
    alpha: 0.5           // Animation 2
}, { duration: 2 });

// Stop only the left position animation while keeping top and alpha
guiTween.animations[1].stop();

// The other animations continue running
console.log(`Active animations: ${guiTween.animations.filter(a => !a.stopped).length}`);
```

## Performance Notes

- Built on BabylonJS's optimized animation system
- Animations run on the GPU when possible
- Group animations share resources efficiently  
- Automatic cleanup when animations complete
- No memory leaks from promise chains
- Individual animation control adds minimal overhead
- Each property gets its own optimized `BABYLON.Animatable` instance

## Current System Status ✅

### ✅ **Fully Working Features:**
- **Multi-Property Animations**: Animate any number of properties simultaneously
- **Individual Property Control**: Stop, pause, restart each animated property separately
- **GUI Position Animations**: `top`, `left`, `topInPixels`, `leftInPixels` work perfectly
- **GUI All Properties**: `alpha`, `width`, `height`, `scaleX`, `scaleY`, `rotation` 
- **String & Numeric Values**: Supports `"50px"`, `"25%"`, and numeric values seamlessly
- **Performance Optimized**: 100% GPU-accelerated via `scene.beginAnimation`
- **Type Safety**: Full TypeScript support with proper interfaces
- **Promise Integration**: Clean async/await workflow
- **Group Animations**: Parallel and sequential with stagger effects
- **30+ Easing Functions**: Professional animation curves
- **Yoyo & Loops**: Advanced timing and repetition control

### ✅ **Key Advantages:**
1. **Precise Control**: `tween.animations[1].stop()` - stop only one property
2. **High Performance**: GPU-accelerated via BabylonJS native animation system
3. **GUI Support**: Full BABYLON.GUI.Control support including position properties
4. **Developer Friendly**: Clean API with full TypeScript support
5. **Production Ready**: No RAF loops, no performance issues, no memory leaks

### ✅ **Architecture:**
- **100% Native BabylonJS**: Uses `scene.beginAnimation` for everything
- **Proxy Object Pattern**: Enables GUI controls to work with native animation system
- **No RequestAnimationFrame**: Everything is GPU-accelerated
- **Individual Animatables**: Each property gets its own `BABYLON.Animatable` for control
- **Smart Detection**: Automatically handles 3D objects vs GUI controls

### ✅ **Perfect For:**
- Game UI animations with precise control
- 3D object animations with selective property control  
- Interactive applications requiring dynamic animation control
- Professional applications with complex animation sequences
- Any project requiring high-performance, controllable animations

## Browser Compatibility

- Modern browsers with ES2017+ support
- TypeScript 5.0+ recommended  
- BabylonJS 5.0+ required (tested with BabylonJS 5.0-8.0+)
- WebGL2/WebGPU support recommended for optimal performance
- All major browsers: Chrome, Firefox, Safari, Edge
