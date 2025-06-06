# AnimationState

Comprehensive animation state management system for controlling and blending animations with Unity-style state machine functionality.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Extends**: `TOOLKIT.ScriptComponent`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

AnimationState provides a powerful animation system that manages animation playback, blending, state transitions, and event handling. It supports both simple animation playback and complex state machine-driven animation systems with blend trees and parameter-driven transitions.

## Static Properties

### Animation Configuration
- **`ANIMATION_FPS`** `number` - Default animation frames per second
- **`ANIMATION_SPEED_RATIO`** `number` - Global animation speed multiplier
- **`ANIMATION_LOOP_MODE`** `number` - Default animation loop mode

## Instance Properties

### Animation Control
- **`animationSpeed`** `number` - Speed multiplier for animation playback
- **`animationTime`** `number` - Current animation time position
- **`animationLength`** `number` - Total length of current animation
- **`animationFrame`** `number` - Current animation frame
- **`animationFrames`** `number` - Total frames in current animation
- **`animationLooping`** `boolean` - Whether animation should loop
- **`animationFinished`** `boolean` - Whether animation has finished playing

### State Machine
- **`enableStateMachine`** `boolean` - Enable state machine functionality
- **`defaultStateName`** `string` - Name of the default animation state
- **`currentStateName`** `string` - Name of the currently active state
- **`previousStateName`** `string` - Name of the previously active state

### Blending
- **`enableBlending`** `boolean` - Enable animation blending
- **`blendingSpeed`** `number` - Speed of blend transitions
- **`blendingWeight`** `number` - Current blend weight (0-1)

## Animation Control Methods

### Playback Control

#### `play(animationName?, startFrame?, endFrame?, loop?, speed?)`
Play an animation by name with optional parameters.

**Parameters:**
- `animationName?` `string` - Name of animation to play
- `startFrame?` `number` - Starting frame
- `endFrame?` `number` - Ending frame
- `loop?` `boolean` - Whether to loop
- `speed?` `number` - Playback speed

#### `stop()`
Stop the current animation playback.

#### `pause()`
Pause the current animation playback.

#### `resume()`
Resume paused animation playback.

#### `restart()`
Restart the current animation from the beginning.

### Animation Queries

#### `isPlaying(animationName?)`
Check if an animation is currently playing.

**Parameters:**
- `animationName?` `string` - Optional animation name to check

**Returns:** `boolean` - True if animation is playing

#### `isPaused()`
Check if animation is currently paused.

**Returns:** `boolean` - True if paused

#### `isFinished()`
Check if current animation has finished playing.

**Returns:** `boolean` - True if finished

#### `getCurrentAnimationName()`
Get the name of the currently playing animation.

**Returns:** `string` - Current animation name

#### `getAnimationLength(animationName?)`
Get the length of an animation in seconds.

**Parameters:**
- `animationName?` `string` - Animation name (current if not specified)

**Returns:** `number` - Animation length in seconds

## State Machine Methods

### State Control

#### `setState(stateName, blendTime?)`
Set the current animation state.

**Parameters:**
- `stateName` `string` - Name of the state to activate
- `blendTime?` `number` - Time to blend to new state

#### `getState()`
Get the current animation state name.

**Returns:** `string` - Current state name

#### `hasState(stateName)`
Check if a state exists in the state machine.

**Parameters:**
- `stateName` `string` - State name to check

**Returns:** `boolean` - True if state exists

#### `addState(stateName, animationName, loop?, speed?)`
Add a new state to the state machine.

**Parameters:**
- `stateName` `string` - Name of the new state
- `animationName` `string` - Animation to associate with state
- `loop?` `boolean` - Whether state should loop
- `speed?` `number` - Playback speed for state

#### `removeState(stateName)`
Remove a state from the state machine.

**Parameters:**
- `stateName` `string` - Name of state to remove

### State Transitions

#### `addTransition(fromState, toState, condition, blendTime?)`
Add a transition between two states.

**Parameters:**
- `fromState` `string` - Source state name
- `toState` `string` - Target state name
- `condition` `() => boolean` - Condition function for transition
- `blendTime?` `number` - Blend time for transition

#### `removeTransition(fromState, toState)`
Remove a transition between states.

**Parameters:**
- `fromState` `string` - Source state name
- `toState` `string` - Target state name

#### `checkTransitions()`
Check and execute valid state transitions.

## Parameter System

### Parameter Management

#### `setParameter(name, value)`
Set an animation parameter value.

**Parameters:**
- `name` `string` - Parameter name
- `value` `any` - Parameter value

#### `getParameter(name, defaultValue?)`
Get an animation parameter value.

**Parameters:**
- `name` `string` - Parameter name
- `defaultValue?` `any` - Default value if parameter doesn't exist

**Returns:** `any` - Parameter value

#### `hasParameter(name)`
Check if a parameter exists.

**Parameters:**
- `name` `string` - Parameter name

**Returns:** `boolean` - True if parameter exists

#### `setBool(name, value)`
Set a boolean parameter.

**Parameters:**
- `name` `string` - Parameter name
- `value` `boolean` - Boolean value

#### `getBool(name)`
Get a boolean parameter.

**Parameters:**
- `name` `string` - Parameter name

**Returns:** `boolean` - Boolean value

#### `setFloat(name, value)`
Set a float parameter.

**Parameters:**
- `name` `string` - Parameter name
- `value` `number` - Float value

#### `getFloat(name)`
Get a float parameter.

**Parameters:**
- `name` `string` - Parameter name

**Returns:** `number` - Float value

#### `setTrigger(name)`
Set a trigger parameter (automatically resets after use).

**Parameters:**
- `name` `string` - Trigger name

## Blend Tree System

### Blend Tree Control

#### `enableBlendTree(enabled)`
Enable or disable blend tree functionality.

**Parameters:**
- `enabled` `boolean` - Whether to enable blend trees

#### `addBlendTree(name, parameter, animations)`
Add a blend tree for parameter-driven animation blending.

**Parameters:**
- `name` `string` - Blend tree name
- `parameter` `string` - Parameter to drive blending
- `animations` `Array<{animation: string, threshold: number}>` - Animations and their thresholds

#### `updateBlendTree(name)`
Update a blend tree based on current parameter values.

**Parameters:**
- `name` `string` - Blend tree name to update

## Event System

### Animation Events

#### `addAnimationEvent(animationName, time, callback)`
Add an event callback at a specific time in an animation.

**Parameters:**
- `animationName` `string` - Animation name
- `time` `number` - Time in animation to trigger event
- `callback` `() => void` - Callback function

#### `removeAnimationEvent(animationName, time)`
Remove an animation event.

**Parameters:**
- `animationName` `string` - Animation name
- `time` `number` - Event time to remove

#### `clearAnimationEvents(animationName?)`
Clear animation events for an animation or all animations.

**Parameters:**
- `animationName?` `string` - Animation name (all if not specified)

## Lifecycle Methods

### Component Lifecycle

#### `awake()`
Called when the component is first created. Initializes the animation system.

**Protected method** - Override in derived classes

#### `update()`
Called every frame during the update loop. Updates animation state and transitions.

**Protected method** - Override in derived classes

#### `destroy()`
Called when the component is being destroyed. Cleans up animation resources.

**Protected method** - Override in derived classes

## Usage Examples

### Basic Animation Control
```typescript
// Get animation state component
const animState = TOOLKIT.SceneManager.GetComponent(characterTransform, "TOOLKIT.AnimationState");

// Play an animation
animState.play("walk", 0, 30, true, 1.0);

// Check if playing
if (animState.isPlaying("walk")) {
    console.log("Character is walking");
}

// Stop animation
animState.stop();
```

### State Machine Setup
```typescript
// Enable state machine
animState.enableStateMachine = true;

// Add states
animState.addState("idle", "idle_animation", true, 1.0);
animState.addState("walk", "walk_animation", true, 1.0);
animState.addState("run", "run_animation", true, 1.5);
animState.addState("jump", "jump_animation", false, 1.0);

// Set default state
animState.defaultStateName = "idle";
animState.setState("idle");
```

### State Transitions
```typescript
// Add transitions with conditions
animState.addTransition("idle", "walk", () => {
    return animState.getFloat("speed") > 0.1;
}, 0.2);

animState.addTransition("walk", "run", () => {
    return animState.getFloat("speed") > 5.0;
}, 0.3);

animState.addTransition("walk", "idle", () => {
    return animState.getFloat("speed") < 0.1;
}, 0.2);

animState.addTransition("idle", "jump", () => {
    return animState.getBool("isJumping");
}, 0.1);
```

### Parameter-Driven Animation
```typescript
class CharacterController extends TOOLKIT.ScriptComponent {
    private animState: TOOLKIT.AnimationState;
    private speed: number = 0;

    protected awake(): void {
        this.animState = TOOLKIT.SceneManager.GetComponent(this.transform, "TOOLKIT.AnimationState");
        this.setupAnimations();
    }

    protected update(): void {
        // Update animation parameters based on character state
        this.animState.setFloat("speed", this.speed);
        this.animState.setBool("isGrounded", this.isGrounded());
        
        // Check for jump input
        if (this.isJumpPressed()) {
            this.animState.setTrigger("jump");
        }

        // Update state machine
        this.animState.checkTransitions();
    }

    private setupAnimations(): void {
        this.animState.enableStateMachine = true;
        
        // Setup states and transitions
        this.animState.addState("idle", "character_idle", true);
        this.animState.addState("walk", "character_walk", true);
        this.animState.addState("run", "character_run", true);
        
        // Setup transitions
        this.animState.addTransition("idle", "walk", () => 
            this.animState.getFloat("speed") > 0.5, 0.2);
        this.animState.addTransition("walk", "run", () => 
            this.animState.getFloat("speed") > 3.0, 0.3);
    }
}
```

### Blend Tree Animation
```typescript
// Setup blend tree for directional movement
animState.enableBlendTree(true);

// Add blend tree for movement directions
animState.addBlendTree("movement", "direction", [
    { animation: "walk_forward", threshold: 0 },
    { animation: "walk_right", threshold: 90 },
    { animation: "walk_backward", threshold: 180 },
    { animation: "walk_left", threshold: 270 }
]);

// Update blend tree based on movement direction
const movementAngle = this.getMovementAngle();
animState.setFloat("direction", movementAngle);
animState.updateBlendTree("movement");
```

### Animation Events
```typescript
// Add events to animations
animState.addAnimationEvent("walk", 0.5, () => {
    console.log("Left foot step");
    this.playFootstepSound();
});

animState.addAnimationEvent("walk", 1.0, () => {
    console.log("Right foot step");
    this.playFootstepSound();
});

animState.addAnimationEvent("jump", 0.2, () => {
    console.log("Jump takeoff");
    this.applyJumpForce();
});

animState.addAnimationEvent("jump", 0.8, () => {
    console.log("Jump landing");
    this.handleLanding();
});
```

### Advanced Blending
```typescript
// Enable blending between animations
animState.enableBlending = true;
animState.blendingSpeed = 2.0;

// Smooth transition between states
animState.setState("run", 0.5); // 0.5 second blend time

// Manual blend weight control
animState.blendingWeight = 0.7; // 70% new animation, 30% old
```

## Animation Parameter Types

The animation system supports several parameter types:

- **Float**: Continuous values for blend trees and conditions
- **Bool**: Boolean flags for state transitions
- **Trigger**: One-shot events that auto-reset
- **Int**: Integer values for discrete states

## Best Practices

1. **Use State Machines** for complex character animations
2. **Set up Blend Trees** for smooth directional movement
3. **Use Animation Events** for synchronized sound and effects
4. **Cache Animation References** for better performance
5. **Use Parameters** instead of direct state changes for flexibility
6. **Test Transition Conditions** thoroughly to avoid stuck states

## Related Classes
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
- [AnimationMixer](AnimationMixer.md) - Animation blending utilities
- [BlendTreeSystem](BlendTreeSystem.md) - Blend tree implementation
- [MachineState](MachineState.md) - State machine implementation
- [SceneManager](../core/SceneManager.md) - Scene management utilities
