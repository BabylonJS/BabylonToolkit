# TransitionCheck

Animation transition logic container that holds transition evaluation results and state information.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

TransitionCheck provides a data structure for managing animation transition evaluation results, including transition outcomes, timing offsets, blending parameters, and triggered condition tracking. It serves as a container for transition logic results in animation state machines.

## Properties

### Transition Result
- **`result`** `string` - The result of the transition evaluation (e.g., "allow", "deny", "pending")

### Timing Control
- **`offest`** `number` - Timing offset for the transition (note: property name as defined in source)

### Blending Parameters
- **`blending`** `number` - Blending factor for the transition (0.0 to 1.0)

### Condition Tracking
- **`triggered`** `string[]` - Array of condition names that have been triggered

## Usage Examples

### Basic Transition Check
```typescript
class AnimationTransitionManager extends TOOLKIT.ScriptComponent {
    public currentTransitionCheck: TOOLKIT.TransitionCheck = new TOOLKIT.TransitionCheck();

    protected start(): void {
        this.initializeTransitionCheck();
    }

    private initializeTransitionCheck(): void {
        this.currentTransitionCheck.result = "pending";
        this.currentTransitionCheck.offest = 0.0;
        this.currentTransitionCheck.blending = 0.0;
        this.currentTransitionCheck.triggered = [];
    }

    protected update(): void {
        this.evaluateTransitions();
    }

    private evaluateTransitions(): void {
        const canTransition = this.checkTransitionConditions();
        
        if (canTransition) {
            this.currentTransitionCheck.result = "allow";
            this.currentTransitionCheck.blending = this.calculateBlendingFactor();
            this.currentTransitionCheck.offest = this.calculateTimingOffset();
        } else {
            this.currentTransitionCheck.result = "deny";
            this.currentTransitionCheck.blending = 0.0;
        }
        
        this.logTransitionStatus();
    }

    private checkTransitionConditions(): boolean {
        const conditions = ["speedGreaterThan5", "isGrounded", "notAttacking"];
        
        for (const condition of conditions) {
            if (this.evaluateCondition(condition)) {
                if (!this.currentTransitionCheck.triggered.includes(condition)) {
                    this.currentTransitionCheck.triggered.push(condition);
                }
            }
        }
        
        return this.currentTransitionCheck.triggered.length >= 2;
    }

    private evaluateCondition(condition: string): boolean {
        switch (condition) {
            case "speedGreaterThan5":
                return this.getCurrentSpeed() > 5.0;
            case "isGrounded":
                return this.isCharacterGrounded();
            case "notAttacking":
                return !this.isCharacterAttacking();
            default:
                return false;
        }
    }

    private getCurrentSpeed(): number {
        return 7.5;
    }

    private isCharacterGrounded(): boolean {
        return true;
    }

    private isCharacterAttacking(): boolean {
        return false;
    }

    private calculateBlendingFactor(): number {
        return Math.min(1.0, this.currentTransitionCheck.triggered.length / 3.0);
    }

    private calculateTimingOffset(): number {
        return 0.1;
    }

    private logTransitionStatus(): void {
        console.log(`Transition: ${this.currentTransitionCheck.result}, ` +
                   `Blend: ${this.currentTransitionCheck.blending.toFixed(3)}, ` +
                   `Offset: ${this.currentTransitionCheck.offest.toFixed(3)}, ` +
                   `Triggered: [${this.currentTransitionCheck.triggered.join(", ")}]`);
    }
}
```

### Advanced Transition Logic
```typescript
class ComplexTransitionSystem extends TOOLKIT.ScriptComponent {
    public transitionChecks: Map<string, TOOLKIT.TransitionCheck> = new Map();
    public transitionStates: string[] = ["idle", "walk", "run", "jump", "attack"];

    protected start(): void {
        this.initializeTransitionChecks();
    }

    private initializeTransitionChecks(): void {
        for (const state of this.transitionStates) {
            const transitionCheck = new TOOLKIT.TransitionCheck();
            transitionCheck.result = "deny";
            transitionCheck.offest = 0.0;
            transitionCheck.blending = 0.0;
            transitionCheck.triggered = [];
            
            this.transitionChecks.set(state, transitionCheck);
        }
    }

    protected update(): void {
        this.evaluateAllTransitions();
        this.processTransitionResults();
    }

    private evaluateAllTransitions(): void {
        for (const [stateName, transitionCheck] of this.transitionChecks) {
            this.evaluateTransitionToState(stateName, transitionCheck);
        }
    }

    private evaluateTransitionToState(stateName: string, transitionCheck: TOOLKIT.TransitionCheck): void {
        transitionCheck.triggered = [];
        
        const conditions = this.getConditionsForState(stateName);
        let satisfiedConditions = 0;
        
        for (const condition of conditions) {
            if (this.evaluateStateCondition(condition)) {
                transitionCheck.triggered.push(condition);
                satisfiedConditions++;
            }
        }
        
        const requiredConditions = Math.ceil(conditions.length * 0.7);
        
        if (satisfiedConditions >= requiredConditions) {
            transitionCheck.result = "allow";
            transitionCheck.blending = satisfiedConditions / conditions.length;
            transitionCheck.offest = this.calculateStateOffset(stateName);
        } else {
            transitionCheck.result = "deny";
            transitionCheck.blending = 0.0;
            transitionCheck.offest = 0.0;
        }
    }

    private getConditionsForState(stateName: string): string[] {
        const conditionMap: { [key: string]: string[] } = {
            "idle": ["lowSpeed", "isGrounded", "notJumping"],
            "walk": ["mediumSpeed", "isGrounded", "notJumping"],
            "run": ["highSpeed", "isGrounded", "notJumping"],
            "jump": ["jumpPressed", "isGrounded"],
            "attack": ["attackPressed", "notJumping", "hasTarget"]
        };
        
        return conditionMap[stateName] || [];
    }

    private evaluateStateCondition(condition: string): boolean {
        const speed = this.getCurrentSpeed();
        
        switch (condition) {
            case "lowSpeed":
                return speed < 2.0;
            case "mediumSpeed":
                return speed >= 2.0 && speed < 7.0;
            case "highSpeed":
                return speed >= 7.0;
            case "isGrounded":
                return this.isGrounded();
            case "notJumping":
                return !this.isJumping();
            case "jumpPressed":
                return this.isJumpPressed();
            case "attackPressed":
                return this.isAttackPressed();
            case "hasTarget":
                return this.hasTarget();
            default:
                return false;
        }
    }

    private getCurrentSpeed(): number {
        return 5.5;
    }

    private isGrounded(): boolean {
        return true;
    }

    private isJumping(): boolean {
        return false;
    }

    private isJumpPressed(): boolean {
        return false;
    }

    private isAttackPressed(): boolean {
        return false;
    }

    private hasTarget(): boolean {
        return true;
    }

    private calculateStateOffset(stateName: string): number {
        const offsetMap: { [key: string]: number } = {
            "idle": 0.0,
            "walk": 0.1,
            "run": 0.15,
            "jump": 0.05,
            "attack": 0.2
        };
        
        return offsetMap[stateName] || 0.0;
    }

    private processTransitionResults(): void {
        const allowedTransitions = Array.from(this.transitionChecks.entries())
            .filter(([_, check]) => check.result === "allow")
            .sort(([_, a], [__, b]) => b.blending - a.blending);
        
        if (allowedTransitions.length > 0) {
            const [bestState, bestCheck] = allowedTransitions[0];
            console.log(`Best transition: ${bestState} (blend: ${bestCheck.blending.toFixed(3)})`);
        }
    }
}
```

### Transition Check Validation
```typescript
class TransitionValidator extends TOOLKIT.ScriptComponent {
    public transitionCheck: TOOLKIT.TransitionCheck = new TOOLKIT.TransitionCheck();

    protected start(): void {
        this.setupTransitionValidation();
    }

    private setupTransitionValidation(): void {
        this.transitionCheck.result = "pending";
        this.transitionCheck.offest = 0.0;
        this.transitionCheck.blending = 0.0;
        this.transitionCheck.triggered = [];
    }

    protected update(): void {
        this.validateAndUpdateTransition();
    }

    private validateAndUpdateTransition(): void {
        this.validateTransitionCheck();
        this.updateTransitionCheck();
    }

    private validateTransitionCheck(): void {
        if (!this.isValidResult(this.transitionCheck.result)) {
            console.warn(`Invalid transition result: ${this.transitionCheck.result}`);
            this.transitionCheck.result = "deny";
        }
        
        if (this.transitionCheck.blending < 0.0 || this.transitionCheck.blending > 1.0) {
            console.warn(`Invalid blending value: ${this.transitionCheck.blending}`);
            this.transitionCheck.blending = TOOLKIT.BlendTreeUtils.ClampValue(
                this.transitionCheck.blending, 0.0, 1.0
            );
        }
        
        if (this.transitionCheck.offest < 0.0) {
            console.warn(`Invalid offset value: ${this.transitionCheck.offest}`);
            this.transitionCheck.offest = 0.0;
        }
        
        if (!Array.isArray(this.transitionCheck.triggered)) {
            console.warn("Invalid triggered array");
            this.transitionCheck.triggered = [];
        }
    }

    private isValidResult(result: string): boolean {
        const validResults = ["allow", "deny", "pending", "blocked"];
        return validResults.includes(result);
    }

    private updateTransitionCheck(): void {
        const conditions = ["condition1", "condition2", "condition3"];
        this.transitionCheck.triggered = [];
        
        for (const condition of conditions) {
            if (this.evaluateCondition(condition)) {
                this.transitionCheck.triggered.push(condition);
            }
        }
        
        if (this.transitionCheck.triggered.length > 0) {
            this.transitionCheck.result = "allow";
            this.transitionCheck.blending = this.transitionCheck.triggered.length / conditions.length;
            this.transitionCheck.offest = 0.1 * this.transitionCheck.triggered.length;
        } else {
            this.transitionCheck.result = "deny";
            this.transitionCheck.blending = 0.0;
            this.transitionCheck.offest = 0.0;
        }
    }

    private evaluateCondition(condition: string): boolean {
        return Math.random() > 0.5;
    }

    public getTransitionSummary(): string {
        return `Result: ${this.transitionCheck.result}, ` +
               `Blend: ${this.transitionCheck.blending.toFixed(3)}, ` +
               `Offset: ${this.transitionCheck.offest.toFixed(3)}, ` +
               `Conditions: ${this.transitionCheck.triggered.length}`;
    }

    public resetTransitionCheck(): void {
        this.transitionCheck.result = "pending";
        this.transitionCheck.offest = 0.0;
        this.transitionCheck.blending = 0.0;
        this.transitionCheck.triggered = [];
    }

    public copyTransitionCheck(): TOOLKIT.TransitionCheck {
        const copy = new TOOLKIT.TransitionCheck();
        copy.result = this.transitionCheck.result;
        copy.offest = this.transitionCheck.offest;
        copy.blending = this.transitionCheck.blending;
        copy.triggered = [...this.transitionCheck.triggered];
        return copy;
    }
}
```

## Best Practices

1. **Result Validation** - Always validate transition results against expected values
2. **Blending Range** - Keep blending values within the 0.0 to 1.0 range
3. **Condition Tracking** - Maintain accurate triggered condition arrays for debugging
4. **Timing Control** - Use appropriate offset values for smooth transition timing
5. **State Management** - Reset transition checks when appropriate to prevent stale data
6. **Performance** - Avoid frequent allocation of new TransitionCheck instances

## Related Classes
- [MachineState](MachineState.md) - State machine implementation
- [AnimationState](AnimationState.md) - Animation state management
- [BlendTreeSystem](BlendTreeSystem.md) - Blend tree animation system
- [AnimationMixer](AnimationMixer.md) - Animation blending and mixing
- [BlendTreeUtils](BlendTreeUtils.md) - Blend tree utilities
