# Babylon Toolkit Tween System

A modern, powerful animation system for BabylonJS that provides a clean async/await API for complex animations, group choreography, and easing effects.

## Features

- **Modern Async/Await API** - Clean, promise-based animation control
- **Comprehensive Easing Support** - 30+ built-in easing functions
- **Group Animations** - Parallel and sequential animation choreography with stagger effects
- **Dot Notation Properties** - Animate nested properties like `"position.x"` or `"material.alpha"`
- **Type-Safe** - Full TypeScript support with proper type checking
- **Flexible Control** - Both promise-based and callback-based workflows
- **Yoyo Effects** - Built-in reversible animations
- **Performance Optimized** - Built on native BabylonJS animation system

## Quick Start

```typescript
// Basic usage - fade out a material
await TOOLKIT.SceneManager.TweenToAsync(mesh.material, 
    { "alpha": 0.3 }, 
    { duration: 1.2, ease: "sineInOut" }
);

// Precise control with start and end values
await TOOLKIT.SceneManager.TweenFromToAsync(
    mesh,
    { "position.x": -2, "position.y": 0 },    // Start values
    { "position.x":  2, "position.y": 1.5 },  // End values
    { duration: 2, ease: "quadInOut", yoyo: true, yoyoCount: 1 }
);

// Group animations with stagger effect
await TOOLKIT.SceneManager.TweenGroupAsync([
    () => TOOLKIT.SceneManager.TweenTo(mesh1, { "position.z": -4 }, { duration: 0.8 }),
    () => TOOLKIT.SceneManager.TweenTo(mesh2, { "position.z": -4 }, { duration: 0.8 }),
    () => TOOLKIT.SceneManager.TweenTo(mesh3, { "position.z": -4 }, { duration: 0.8 })
], { mode: "all", stagger: 150 });
```

## API Reference

### Core Methods

#### `TweenTo(target, to, options?, scene?)`
Animates object properties to target values from current values.

```typescript
const tween = TOOLKIT.SceneManager.TweenTo(mesh, 
    { "position.x": 10, "rotation.y": Math.PI }, 
    { duration: 2, ease: "bounceOut" }
);

// Wait for completion
await tween.finished;
```

#### `TweenToAsync(target, to, options?, scene?)`
Async version that automatically awaits completion.

```typescript
await TOOLKIT.SceneManager.TweenToAsync(material, 
    { alpha: 0 }, 
    { duration: 1, ease: "sineOut" }
);
```

#### `TweenFromTo(target, from, to, options?, scene?)`
Animates from specific start values to target values.

```typescript
await TOOLKIT.SceneManager.TweenFromToAsync(mesh,
    { "position.y": -10, "material.alpha": 0 },  // Start
    { "position.y": 0, "material.alpha": 1 },    // End
    { duration: 1.5, ease: "backOut" }
);
```

#### `TweenGroupAsync(tweenFunctions, options?, scene?)`
Executes multiple animations in parallel or sequence.

```typescript
await TOOLKIT.SceneManager.TweenGroupAsync([
    () => TOOLKIT.SceneManager.TweenTo(door1, { "rotation.y": -Math.PI/2 }, { duration: 1 }),
    () => TOOLKIT.SceneManager.TweenTo(door2, { "rotation.y": Math.PI/2 }, { duration: 1 })
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

## Usage Examples

### Basic Animations

```typescript
// Simple movement
await TOOLKIT.SceneManager.TweenToAsync(mesh, 
    { "position.x": 10 }, 
    { duration: 2, ease: "quadOut" }
);

// Material fade
await TOOLKIT.SceneManager.TweenToAsync(material, 
    { alpha: 0 }, 
    { duration: 1, ease: "sineOut" }
);

// Scaling with callbacks
await TOOLKIT.SceneManager.TweenToAsync(mesh, 
    { "scaling.x": 2, "scaling.y": 2, "scaling.z": 2 }, 
    { 
        duration: 1, 
        ease: "bounceOut",
        onStart: () => console.log("Starting scale..."),
        onComplete: () => console.log("Scale complete!")
    }
);
```

### Vector and Color Animations

The system supports direct BABYLON vector and color objects for comprehensive animations:

```typescript
// Vector3 position animation
await TOOLKIT.SceneManager.TweenToAsync(mesh, {
    position: new BABYLON.Vector3(10, 5, -3)
}, { duration: 2, ease: "easeOutBounce" });

// Vector3 scaling with from/to
await TOOLKIT.SceneManager.TweenFromToAsync(mesh,
    { scaling: new BABYLON.Vector3(1, 1, 1) },      // From
    { scaling: new BABYLON.Vector3(2, 0.5, 1.5) },  // To
    { duration: 1.5, ease: "easeInOutElastic" }
);

// Color3 material animation
await TOOLKIT.SceneManager.TweenToAsync(material, {
    diffuseColor: new BABYLON.Color3(1, 0, 0)  // Red
}, { duration: 1, ease: "easeInOutQuad" });

// Multiple vector properties simultaneously
await TOOLKIT.SceneManager.TweenToAsync(mesh, {
    position: new BABYLON.Vector3(5, 3, -2),
    rotation: new BABYLON.Vector3(0, Math.PI, 0),
    scaling: new BABYLON.Vector3(2, 2, 2)
}, { duration: 2, ease: "easeInOutBack" });

// Vector2 for UV animation
await TOOLKIT.SceneManager.TweenToAsync(texture, {
    uOffset: 1.0,
    vOffset: 0.5
}, { duration: 3, ease: "linear" });

// Or with Vector2 object
await TOOLKIT.SceneManager.TweenToAsync(customMaterial, {
    uvOffset: new BABYLON.Vector2(1, 0.5)
}, { duration: 3 });

// Color4 with alpha
await TOOLKIT.SceneManager.TweenToAsync(guiControl, {
    color: new BABYLON.Color4(1, 1, 1, 0.5)  // White with 50% alpha
}, { duration: 1, ease: "easeInOutQuad" });

// Quaternion rotation (smooth)
const targetRotation = BABYLON.Quaternion.FromEulerAngles(0, Math.PI, Math.PI/4);
await TOOLKIT.SceneManager.TweenToAsync(mesh, {
    rotationQuaternion: targetRotation
}, { duration: 2, ease: "easeInOutQuad" });

// Light color animation
await TOOLKIT.SceneManager.TweenToAsync(pointLight, {
    diffuse: new BABYLON.Color3(0.9, 0.7, 0.1)  // Warm light
}, { duration: 2.5, ease: "easeOutQuart" });

// Scene background color
await TOOLKIT.SceneManager.TweenFromToAsync(scene,
    { clearColor: BABYLON.Color3.Blue() },     // From blue
    { clearColor: BABYLON.Color3.Red() },      // To red
    { duration: 3, ease: "easeInOutCubic" }
);

// Mixed individual components and full objects
await TOOLKIT.SceneManager.TweenToAsync(mesh, {
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
    await TOOLKIT.SceneManager.TweenToAsync(material, {
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
    await TOOLKIT.SceneManager.TweenToAsync(mesh, {
        position: position
    }, { duration: 1, ease: "easeInOutQuad" });
}

// Group animation with vectors and colors
await TOOLKIT.SceneManager.TweenGroupAsync([
    () => TOOLKIT.SceneManager.TweenTo(mesh1, 
        { position: new BABYLON.Vector3(10, 0, 0) }, 
        { duration: 2, ease: "easeOutBounce" }
    ),
    () => TOOLKIT.SceneManager.TweenTo(mesh2, 
        { scaling: new BABYLON.Vector3(1.5, 1.5, 1.5) }, 
        { duration: 1.5, ease: "easeInOutElastic" }
    ),
    () => TOOLKIT.SceneManager.TweenTo(material, 
        { diffuseColor: BABYLON.Color3.Red() }, 
        { duration: 2.5, ease: "easeInOutQuad" }
    )
], { stagger: 0.3 });
```

### Precise Control Animations

```typescript
// Entrance animation
await TOOLKIT.SceneManager.TweenFromToAsync(character,
    { "position.y": -5, "material.alpha": 0 },  // Start below ground, invisible
    { "position.y": 0, "material.alpha": 1 },   // End at ground level, visible
    { duration: 1.5, ease: "backOut" }
);

// Yoyo effect (wave animation)
await TOOLKIT.SceneManager.TweenFromToAsync(flag,
    { "rotation.z": 0 },
    { "rotation.z": 0.3 },
    { duration: 0.5, ease: "sineInOut", yoyo: true, yoyoCount: 3 }
);

// Camera shake
for (let i = 0; i < 5; i++) {
    await TOOLKIT.SceneManager.TweenFromToAsync(camera,
        { "position.x": camera.position.x - 0.1 },
        { "position.x": camera.position.x + 0.1 },
        { duration: 0.05, ease: "linear" }
    );
}
```

### Group Choreography

```typescript
// Parallel with stagger (wave effect)
await TOOLKIT.SceneManager.TweenGroupAsync([
    () => TOOLKIT.SceneManager.TweenTo(mesh1, { "position.y": 2 }, { duration: 0.8 }),
    () => TOOLKIT.SceneManager.TweenTo(mesh2, { "position.y": 2 }, { duration: 0.8 }),
    () => TOOLKIT.SceneManager.TweenTo(mesh3, { "position.y": 2 }, { duration: 0.8 }),
    () => TOOLKIT.SceneManager.TweenTo(mesh4, { "position.y": 2 }, { duration: 0.8 }),
    () => TOOLKIT.SceneManager.TweenTo(mesh5, { "position.y": 2 }, { duration: 0.8 })
], { mode: "all", stagger: 150 });

// Sequential entrance
await TOOLKIT.SceneManager.TweenGroupAsync([
    () => TOOLKIT.SceneManager.TweenFromTo(title, 
        { "position.y": 50, "material.alpha": 0 },
        { "position.y": 0, "material.alpha": 1 }, 
        { duration: 1, ease: "backOut" }
    ),
    () => TOOLKIT.SceneManager.TweenFromTo(subtitle,
        { "position.y": -20, "material.alpha": 0 },
        { "position.y": -5, "material.alpha": 1 },
        { duration: 0.8, ease: "sineOut" }
    ),
    () => TOOLKIT.SceneManager.TweenTo(button, 
        { "scaling.x": 1.2, "scaling.y": 1.2 }, 
        { duration: 0.3, ease: "elasticOut" }
    )
], { mode: "sequence" });

// Complex mixed choreography
await TOOLKIT.SceneManager.TweenGroupAsync([
    () => Promise.all([  // Parallel sub-group
        TOOLKIT.SceneManager.TweenToAsync(leftDoor, { "rotation.y": -Math.PI/2 }, { duration: 1 }),
        TOOLKIT.SceneManager.TweenToAsync(rightDoor, { "rotation.y": Math.PI/2 }, { duration: 1 })
    ]),
    () => TOOLKIT.SceneManager.TweenTo(light, { intensity: 2 }, { duration: 0.5 }),
    () => TOOLKIT.SceneManager.TweenTo(character, { "position.z": 0 }, { duration: 1.5 })
], { 
    mode: "sequence",
    onComplete: () => console.log("Grand entrance complete!")
});
```

### Real-World Patterns

```typescript
// UI Panel slide-in
await TOOLKIT.SceneManager.TweenFromToAsync(panel,
    { "position.x": -10, "material.alpha": 0 },  // Off-screen
    { "position.x": 0, "material.alpha": 1 },    // On-screen
    { duration: 0.8, ease: "quartOut" }
);

// Loading spinner
const spinnerTween = TOOLKIT.SceneManager.TweenTo(spinner,
    { "rotation.z": Math.PI * 2 },
    { duration: 2, ease: "linear", loop: true }
);
// Stop when loading complete
spinnerTween.animation.stop();

// Attention pulse
await TOOLKIT.SceneManager.TweenFromToAsync(button,
    { "scaling.x": 1, "scaling.y": 1 },
    { "scaling.x": 1.3, "scaling.y": 1.3 },
    { duration: 0.6, ease: "sineInOut", yoyo: true, yoyoCount: 2 }
);

// Character walk cycle
await TOOLKIT.SceneManager.TweenGroupAsync([
    () => TOOLKIT.SceneManager.TweenTo(character, { "position.z": 10 }, { duration: 5, ease: "linear" }),
    () => TOOLKIT.SceneManager.TweenFromTo(character, { "position.y": 0 }, { "position.y": 0.2 }, 
        { duration: 0.5, ease: "sineInOut", yoyo: true, yoyoCount: 10 }),
    () => TOOLKIT.SceneManager.TweenFromTo(character, { "rotation.z": 0 }, { "rotation.z": 0.1 }, 
        { duration: 0.8, ease: "sineInOut", yoyo: true, yoyoCount: 6 })
], { mode: "all" });
```

## Advanced Features

### Promise Integration

```typescript
// Sequential animations
async function performSequence() {
    await TOOLKIT.SceneManager.TweenToAsync(mesh, { "position.x": 10 }, { duration: 1 });
    await TOOLKIT.SceneManager.TweenToAsync(mesh, { "position.y": 5 }, { duration: 0.5 });
    await TOOLKIT.SceneManager.TweenToAsync(material, { alpha: 0 }, { duration: 1 });
    console.log("Sequence complete!");
}

// Parallel animations
await Promise.all([
    TOOLKIT.SceneManager.TweenToAsync(mesh, { "position.z": -4 }, { duration: 2 }),
    TOOLKIT.SceneManager.TweenToAsync(camera, { "position.y": 8 }, { duration: 1.5 })
]);

// Race conditions
const winner = await Promise.race([
    TOOLKIT.SceneManager.TweenToAsync(mesh1, { "position.x": 10 }, { duration: 2 }),
    TOOLKIT.SceneManager.TweenToAsync(mesh2, { "position.x": 10 }, { duration: 1.8 })
]);
```

### Custom Easing Functions

```typescript
// Use BabylonJS easing functions directly
const customEasing = new BABYLON.BezierCurveEase(0.25, 0.1, 0.25, 1);
await TOOLKIT.SceneManager.TweenToAsync(mesh, 
    { "position.x": 5 }, 
    { duration: 1, ease: customEasing }
);
```

### Animation Control

```typescript
// Get animation reference for manual control
const tween = TOOLKIT.SceneManager.TweenTo(mesh, 
    { "position.x": 10 }, 
    { duration: 5, ease: "linear" }
);

// Pause/resume/stop
tween.animation.pause();
tween.animation.restart();
tween.animation.stop();

// Still wait for completion if needed
await tween.finished;
```

## Performance Notes

- Built on BabylonJS's optimized animation system
- Animations run on the GPU when possible
- Group animations share resources efficiently  
- Automatic cleanup when animations complete
- No memory leaks from promise chains

## Browser Compatibility

- Modern browsers with ES2017+ support
- TypeScript 4.0+ recommended
- BabylonJS 5.0+ required

## License

All rights reserved (c) 2024 Mackey Kinard
