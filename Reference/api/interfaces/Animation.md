# Animation Interfaces

Animation system interface definitions for state machines, blend trees, transitions, and animation data structures.

**Namespace**: `TOOLKIT`  
**Type**: `interfaces`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

The Animation interfaces define the contract for animation system components including state machines, blend trees, animation clips, and transition logic. These interfaces ensure consistent animation behavior and data structures across the animation system.

## Core Interfaces

### IAnimationState
Defines the structure for animation state data.

```typescript
interface IAnimationState {
    name: string;
    length: number;
    speed: number;
    loop: boolean;
    clip: BABYLON.AnimationGroup;
    events: IAnimationEvent[];
}
```

### IBlendTree
Defines blend tree structure for animation blending.

```typescript
interface IBlendTree {
    blendType: string;
    parameter: string;
    children: IBlendTreeChild[];
    useAutomaticThresholds: boolean;
    minThreshold: number;
    maxThreshold: number;
}
```

### ITransition
Defines animation transition properties.

```typescript
interface ITransition {
    destinationState: string;
    hasExitTime: boolean;
    exitTime: number;
    duration: number;
    offset: number;
    conditions: ITransitionCondition[];
}
```

### IAnimationEvent
Defines animation event structure.

```typescript
interface IAnimationEvent {
    time: number;
    functionName: string;
    stringParameter: string;
    floatParameter: number;
    intParameter: number;
    objectReferenceParameter: any;
}
```

## Usage Examples

### Animation State Implementation
```typescript
class AnimationStateComponent extends TOOLKIT.ScriptComponent implements TOOLKIT.IAnimationState {
    public name: string = "IdleState";
    public length: number = 2.0;
    public speed: number = 1.0;
    public loop: boolean = true;
    public clip: BABYLON.AnimationGroup;
    public events: TOOLKIT.IAnimationEvent[] = [];

    protected start(): void {
        this.setupAnimationState();
    }

    private setupAnimationState(): void {
        this.events.push({
            time: 0.5,
            functionName: "OnAnimationMidpoint",
            stringParameter: "idle",
            floatParameter: 0.5,
            intParameter: 1,
            objectReferenceParameter: null
        });

        console.log(`Animation state '${this.name}' configured`);
    }
}
```

## Best Practices

1. **Interface Compliance** - Ensure all animation components implement required interfaces
2. **State Management** - Use interfaces to maintain consistent state data structures
3. **Event Handling** - Implement animation events through standardized interfaces
4. **Blend Tree Design** - Follow interface contracts for blend tree implementations
5. **Transition Logic** - Use transition interfaces for consistent state changes
6. **Type Safety** - Leverage TypeScript interfaces for animation system type checking

## Related Classes
- [AnimationState](../animation/AnimationState.md) - Animation state management
- [MachineState](../animation/MachineState.md) - State machine implementation
- [BlendTreeSystem](../animation/BlendTreeSystem.md) - Blend tree animation system
- [Physics](Physics.md) - Physics system interfaces
