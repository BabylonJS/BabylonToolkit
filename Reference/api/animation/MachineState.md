# MachineState

State machine implementation for managing animation states, transitions, and behaviors in the animation system.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

MachineState represents a single state within an animation state machine, containing all the information needed to manage animation playback, transitions, behaviors, and events. It serves as the core building block for complex animation state machines.

## Constructor

### `constructor()`
Creates a new machine state instance with default values.

## Properties

### State Identification
- **`hash`** `number` - Unique hash identifier for the state
- **`name`** `string` - Human-readable name of the state
- **`tag`** `string` - Tag for categorizing or grouping states
- **`machine`** `string` - Name of the state machine this state belongs to
- **`layer`** `string` - Animation layer name
- **`layerIndex`** `number` - Index of the animation layer

### Timing and Playback
- **`time`** `number` - Current playback time within the state
- **`length`** `number` - Total length of the animation state
- **`rate`** `number` - Playback rate multiplier
- **`played`** `number` - Amount of time the state has been played
- **`type`** `TOOLKIT.MotionType` - Type of motion (animation, blend tree, etc.)
- **`motionid`** `number` - Unique identifier for the motion

### Speed and Movement
- **`apparentSpeed`** `number` - Apparent speed of the animation
- **`averageAngularSpeed`** `number` - Average angular velocity during animation
- **`averageDuration`** `number` - Average duration of the animation
- **`averageSpeed`** `number[]` - Array of average speeds for different axes
- **`speed`** `number` - Current playback speed
- **`speedParameter`** `string` - Name of the speed parameter
- **`speedParameterActive`** `boolean` - Whether speed parameter is active

### Cycle and Offset Control
- **`cycleOffset`** `number` - Offset within the animation cycle
- **`cycleOffsetParameter`** `string` - Name of the cycle offset parameter
- **`cycleOffsetParameterActive`** `boolean` - Whether cycle offset parameter is active

### Mirroring
- **`mirror`** `boolean` - Whether the animation should be mirrored
- **`mirrorParameter`** `string` - Name of the mirror parameter
- **`mirrorParameterActive`** `boolean` - Whether mirror parameter is active

### IK and Advanced Features
- **`iKOnFeet`** `boolean` - Whether inverse kinematics is applied to feet
- **`interrupted`** `boolean` - Whether the state has been interrupted

### Animation Data
- **`blendtree`** `TOOLKIT.IBlendTree` - Blend tree configuration for this state
- **`transitions`** `TOOLKIT.ITransition[]` - Array of possible transitions from this state
- **`behaviours`** `TOOLKIT.IBehaviour[]` - Array of state machine behaviors
- **`events`** `TOOLKIT.IAnimatorEvent[]` - Array of animation events
- **`ccurves`** `TOOLKIT.IUnityCurve[]` - Custom curves for animation properties
- **`tcurves`** `BABYLON.Animation[]` - Transform curves for position, rotation, scale

## Usage Examples

### Basic State Setup
```typescript
class AnimationController extends TOOLKIT.ScriptComponent {
    public idleState: TOOLKIT.MachineState = new TOOLKIT.MachineState();
    public walkState: TOOLKIT.MachineState = new TOOLKIT.MachineState();

    protected start(): void {
        this.setupAnimationStates();
    }

    private setupAnimationStates(): void {
        this.idleState.name = "Idle";
        this.idleState.hash = this.generateStateHash("Idle");
        this.idleState.length = 2.0;
        this.idleState.rate = 1.0;
        this.idleState.layer = "Base Layer";
        this.idleState.layerIndex = 0;

        this.walkState.name = "Walk";
        this.walkState.hash = this.generateStateHash("Walk");
        this.walkState.length = 1.5;
        this.walkState.rate = 1.0;
        this.walkState.speedParameter = "Speed";
        this.walkState.speedParameterActive = true;
    }

    private generateStateHash(stateName: string): number {
        return stateName.split('').reduce((hash, char) => {
            return ((hash << 5) - hash) + char.charCodeAt(0);
        }, 0);
    }
}
```

### Advanced State Configuration
```typescript
class ComplexAnimationState extends TOOLKIT.ScriptComponent {
    public combatState: TOOLKIT.MachineState = new TOOLKIT.MachineState();

    protected start(): void {
        this.setupCombatState();
    }

    private setupCombatState(): void {
        this.combatState.name = "Combat";
        this.combatState.tag = "Action";
        this.combatState.length = 3.0;
        this.combatState.rate = 1.2;
        
        this.combatState.mirror = false;
        this.combatState.mirrorParameter = "MirrorAttack";
        this.combatState.mirrorParameterActive = true;
        
        this.combatState.cycleOffset = 0.1;
        this.combatState.cycleOffsetParameter = "AttackOffset";
        this.combatState.cycleOffsetParameterActive = true;
        
        this.combatState.iKOnFeet = true;
        this.combatState.apparentSpeed = 2.5;
        this.combatState.averageAngularSpeed = 45.0;
        this.combatState.averageSpeed = [1.0, 0.0, 2.0];
        
        this.setupStateTransitions();
        this.setupStateBehaviors();
        this.setupStateEvents();
    }

    private setupStateTransitions(): void {
        this.combatState.transitions = [
            {
                destinationState: "Idle",
                hasExitTime: true,
                exitTime: 0.8,
                duration: 0.2,
                conditions: []
            }
        ];
    }

    private setupStateBehaviors(): void {
        this.combatState.behaviours = [
            {
                name: "CombatBehavior",
                onStateEnter: true,
                onStateExit: false,
                onStateUpdate: true
            }
        ];
    }

    private setupStateEvents(): void {
        this.combatState.events = [
            {
                time: 0.3,
                functionName: "OnAttackHit",
                stringParameter: "sword",
                floatParameter: 25.0,
                intParameter: 1
            },
            {
                time: 0.7,
                functionName: "OnAttackEnd",
                stringParameter: "",
                floatParameter: 0.0,
                intParameter: 0
            }
        ];
    }
}
```

### State Machine Management
```typescript
class StateMachineManager extends TOOLKIT.ScriptComponent {
    public currentState: TOOLKIT.MachineState;
    public states: Map<string, TOOLKIT.MachineState> = new Map();

    protected start(): void {
        this.initializeStateMachine();
    }

    private initializeStateMachine(): void {
        const idleState = this.createState("Idle", 2.0);
        const walkState = this.createState("Walk", 1.5);
        const runState = this.createState("Run", 1.0);

        this.states.set("Idle", idleState);
        this.states.set("Walk", walkState);
        this.states.set("Run", runState);

        this.currentState = idleState;
    }

    private createState(name: string, length: number): TOOLKIT.MachineState {
        const state = new TOOLKIT.MachineState();
        state.name = name;
        state.length = length;
        state.rate = 1.0;
        state.time = 0.0;
        state.played = 0.0;
        state.interrupted = false;
        return state;
    }

    protected update(): void {
        this.updateCurrentState();
        this.checkStateTransitions();
    }

    private updateCurrentState(): void {
        const deltaTime = TOOLKIT.SceneManager.GetDeltaTime();
        
        this.currentState.time += deltaTime * this.currentState.rate;
        this.currentState.played += deltaTime;
        
        if (this.currentState.time >= this.currentState.length) {
            this.currentState.time = 0.0;
        }
        
        this.processStateEvents();
    }

    private processStateEvents(): void {
        for (const event of this.currentState.events) {
            if (this.currentState.time >= event.time && !event.triggered) {
                this.triggerAnimationEvent(event);
                event.triggered = true;
            }
        }
    }

    private triggerAnimationEvent(event: any): void {
        console.log(`Animation Event: ${event.functionName}`);
    }

    private checkStateTransitions(): void {
        for (const transition of this.currentState.transitions) {
            if (this.evaluateTransitionConditions(transition)) {
                this.transitionToState(transition.destinationState);
                break;
            }
        }
    }

    private evaluateTransitionConditions(transition: any): boolean {
        return this.currentState.time >= (transition.exitTime * this.currentState.length);
    }

    private transitionToState(stateName: string): void {
        const newState = this.states.get(stateName);
        if (newState) {
            this.currentState = newState;
            this.currentState.time = 0.0;
            this.currentState.played = 0.0;
            this.currentState.interrupted = false;
        }
    }
}
```

## Best Practices

1. **State Identification** - Use meaningful names and consistent hash generation
2. **Parameter Management** - Properly configure parameter names and activation flags
3. **Transition Setup** - Define clear transition conditions and timing
4. **Event Handling** - Use animation events for precise timing of game logic
5. **Performance** - Cache state references and avoid frequent state creation
6. **Layer Organization** - Use layers to separate different animation concerns

## Related Classes
- [AnimationState](AnimationState.md) - Animation state management
- [AnimationMixer](AnimationMixer.md) - Animation blending and mixing
- [TransitionCheck](TransitionCheck.md) - Animation transition logic
- [BlendTreeSystem](BlendTreeSystem.md) - Blend tree animation system
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
