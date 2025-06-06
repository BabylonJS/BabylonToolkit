# BlendingWeights

Animation blending weights container that holds primary and secondary blend tree child references for animation mixing.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

BlendingWeights provides a simple container for managing primary and secondary animation blend tree children during animation blending operations. It serves as a lightweight data structure for organizing blend tree references in complex animation systems.

## Properties

### Blend Tree References
- **`primary`** `TOOLKIT.IBlendTreeChild` - Primary blend tree child reference
- **`secondary`** `TOOLKIT.IBlendTreeChild` - Secondary blend tree child reference

## Usage Examples

### Basic Blending Weights Setup
```typescript
class AnimationBlender extends TOOLKIT.ScriptComponent {
    public blendingWeights: TOOLKIT.BlendingWeights = {} as TOOLKIT.BlendingWeights;

    protected start(): void {
        this.setupBlendingWeights();
    }

    private setupBlendingWeights(): void {
        this.blendingWeights.primary = {
            motion: "walk",
            weight: 0.7,
            speed: 1.0
        };

        this.blendingWeights.secondary = {
            motion: "run",
            weight: 0.3,
            speed: 1.5
        };
    }

    protected update(): void {
        this.updateBlendingWeights();
        this.applyBlending();
    }

    private updateBlendingWeights(): void {
        const speed = this.getCurrentSpeed();
        
        if (speed < 5.0) {
            this.blendingWeights.primary.weight = 1.0 - (speed / 5.0);
            this.blendingWeights.secondary.weight = speed / 5.0;
        } else {
            this.blendingWeights.primary.weight = 0.0;
            this.blendingWeights.secondary.weight = 1.0;
        }
    }

    private getCurrentSpeed(): number {
        return 3.5;
    }

    private applyBlending(): void {
        const primaryWeight = this.blendingWeights.primary.weight;
        const secondaryWeight = this.blendingWeights.secondary.weight;
        
        console.log(`Primary (${this.blendingWeights.primary.motion}): ${(primaryWeight * 100).toFixed(1)}%`);
        console.log(`Secondary (${this.blendingWeights.secondary.motion}): ${(secondaryWeight * 100).toFixed(1)}%`);
    }
}
```

### Dynamic Blending Weight Management
```typescript
class DynamicBlendingSystem extends TOOLKIT.ScriptComponent {
    public currentBlending: TOOLKIT.BlendingWeights = {} as TOOLKIT.BlendingWeights;
    public targetBlending: TOOLKIT.BlendingWeights = {} as TOOLKIT.BlendingWeights;
    public blendTransitionSpeed: number = 2.0;

    protected start(): void {
        this.initializeBlendingSystem();
    }

    private initializeBlendingSystem(): void {
        this.currentBlending.primary = {
            motion: "idle",
            weight: 1.0,
            speed: 1.0
        };

        this.currentBlending.secondary = {
            motion: "walk",
            weight: 0.0,
            speed: 1.0
        };

        this.targetBlending.primary = { ...this.currentBlending.primary };
        this.targetBlending.secondary = { ...this.currentBlending.secondary };
    }

    protected update(): void {
        this.updateTargetBlending();
        this.interpolateToTarget();
        this.applyCurrentBlending();
    }

    private updateTargetBlending(): void {
        const movementState = this.getMovementState();
        
        switch (movementState) {
            case "idle":
                this.setTargetBlending("idle", 1.0, "walk", 0.0);
                break;
            case "walking":
                this.setTargetBlending("walk", 0.8, "run", 0.2);
                break;
            case "running":
                this.setTargetBlending("run", 1.0, "sprint", 0.0);
                break;
        }
    }

    private getMovementState(): string {
        const speed = this.getCurrentSpeed();
        
        if (speed < 1.0) return "idle";
        if (speed < 7.0) return "walking";
        return "running";
    }

    private getCurrentSpeed(): number {
        return Math.sin(Date.now() * 0.001) * 5.0 + 5.0;
    }

    private setTargetBlending(
        primaryMotion: string, primaryWeight: number,
        secondaryMotion: string, secondaryWeight: number
    ): void {
        this.targetBlending.primary.motion = primaryMotion;
        this.targetBlending.primary.weight = primaryWeight;
        
        this.targetBlending.secondary.motion = secondaryMotion;
        this.targetBlending.secondary.weight = secondaryWeight;
    }

    private interpolateToTarget(): void {
        const deltaTime = TOOLKIT.SceneManager.GetDeltaTime();
        const lerpFactor = Math.min(1.0, this.blendTransitionSpeed * deltaTime);
        
        this.currentBlending.primary.weight = this.currentBlending.primary.weight + 
            (this.targetBlending.primary.weight - this.currentBlending.primary.weight) * lerpFactor;
        
        this.currentBlending.secondary.weight = this.currentBlending.secondary.weight + 
            (this.targetBlending.secondary.weight - this.currentBlending.secondary.weight) * lerpFactor;
        
        if (this.currentBlending.primary.motion !== this.targetBlending.primary.motion) {
            this.currentBlending.primary.motion = this.targetBlending.primary.motion;
        }
        
        if (this.currentBlending.secondary.motion !== this.targetBlending.secondary.motion) {
            this.currentBlending.secondary.motion = this.targetBlending.secondary.motion;
        }
    }



    private applyCurrentBlending(): void {
        const totalWeight = this.currentBlending.primary.weight + this.currentBlending.secondary.weight;
        
        if (totalWeight > 0.01) {
            const normalizedPrimary = this.currentBlending.primary.weight / totalWeight;
            const normalizedSecondary = this.currentBlending.secondary.weight / totalWeight;
            
            console.log(`Blending: ${this.currentBlending.primary.motion} (${(normalizedPrimary * 100).toFixed(1)}%) + ` +
                       `${this.currentBlending.secondary.motion} (${(normalizedSecondary * 100).toFixed(1)}%)`);
        }
    }
}
```

### Multi-Layer Blending Weights
```typescript
class LayeredBlendingSystem extends TOOLKIT.ScriptComponent {
    public baseLayerWeights: TOOLKIT.BlendingWeights = {} as TOOLKIT.BlendingWeights;
    public additiveLayerWeights: TOOLKIT.BlendingWeights = {} as TOOLKIT.BlendingWeights;
    public overrideLayerWeights: TOOLKIT.BlendingWeights = {} as TOOLKIT.BlendingWeights;

    protected start(): void {
        this.setupLayeredBlending();
    }

    private setupLayeredBlending(): void {
        this.baseLayerWeights.primary = {
            motion: "locomotion",
            weight: 1.0,
            speed: 1.0
        };
        this.baseLayerWeights.secondary = {
            motion: "idle",
            weight: 0.0,
            speed: 1.0
        };

        this.additiveLayerWeights.primary = {
            motion: "breathing",
            weight: 0.3,
            speed: 1.0
        };
        this.additiveLayerWeights.secondary = {
            motion: "headLook",
            weight: 0.2,
            speed: 1.0
        };

        this.overrideLayerWeights.primary = {
            motion: "upperBodyAction",
            weight: 0.0,
            speed: 1.0
        };
        this.overrideLayerWeights.secondary = {
            motion: "none",
            weight: 0.0,
            speed: 1.0
        };
    }

    protected update(): void {
        this.updateLayeredBlending();
        this.applyLayeredBlending();
    }

    private updateLayeredBlending(): void {
        this.updateBaseLayer();
        this.updateAdditiveLayer();
        this.updateOverrideLayer();
    }

    private updateBaseLayer(): void {
        const speed = this.getCurrentSpeed();
        
        if (speed > 1.0) {
            this.baseLayerWeights.primary.motion = "locomotion";
            this.baseLayerWeights.primary.weight = 1.0;
            this.baseLayerWeights.secondary.weight = 0.0;
        } else {
            this.baseLayerWeights.primary.motion = "idle";
            this.baseLayerWeights.primary.weight = 1.0;
            this.baseLayerWeights.secondary.weight = 0.0;
        }
    }

    private updateAdditiveLayer(): void {
        const breathingIntensity = this.getBreathingIntensity();
        const lookIntensity = this.getLookIntensity();
        
        this.additiveLayerWeights.primary.weight = breathingIntensity;
        this.additiveLayerWeights.secondary.weight = lookIntensity;
    }

    private updateOverrideLayer(): void {
        const isPerformingAction = this.isPerformingUpperBodyAction();
        
        if (isPerformingAction) {
            this.overrideLayerWeights.primary.motion = "upperBodyAction";
            this.overrideLayerWeights.primary.weight = 0.8;
        } else {
            this.overrideLayerWeights.primary.weight = 0.0;
        }
    }

    private getCurrentSpeed(): number {
        return 2.5;
    }

    private getBreathingIntensity(): number {
        return 0.3;
    }

    private getLookIntensity(): number {
        return 0.4;
    }

    private isPerformingUpperBodyAction(): boolean {
        return false;
    }

    private applyLayeredBlending(): void {
        console.log("=== Layered Blending ===");
        
        console.log(`Base Layer: ${this.baseLayerWeights.primary.motion} (${(this.baseLayerWeights.primary.weight * 100).toFixed(1)}%)`);
        
        if (this.additiveLayerWeights.primary.weight > 0.01) {
            console.log(`Additive: ${this.additiveLayerWeights.primary.motion} (${(this.additiveLayerWeights.primary.weight * 100).toFixed(1)}%)`);
        }
        
        if (this.additiveLayerWeights.secondary.weight > 0.01) {
            console.log(`Additive: ${this.additiveLayerWeights.secondary.motion} (${(this.additiveLayerWeights.secondary.weight * 100).toFixed(1)}%)`);
        }
        
        if (this.overrideLayerWeights.primary.weight > 0.01) {
            console.log(`Override: ${this.overrideLayerWeights.primary.motion} (${(this.overrideLayerWeights.primary.weight * 100).toFixed(1)}%)`);
        }
    }

    public getEffectiveBlending(): TOOLKIT.BlendingWeights {
        const effective = {} as TOOLKIT.BlendingWeights;
        
        if (this.overrideLayerWeights.primary.weight > 0.5) {
            effective.primary = { ...this.overrideLayerWeights.primary };
            effective.secondary = { ...this.baseLayerWeights.primary };
            effective.secondary.weight *= (1.0 - this.overrideLayerWeights.primary.weight);
        } else {
            effective.primary = { ...this.baseLayerWeights.primary };
            effective.secondary = { ...this.baseLayerWeights.secondary };
        }
        
        return effective;
    }
}
```

### Blending Weight Utilities
```typescript
class BlendingWeightUtilities extends TOOLKIT.ScriptComponent {
    public blendingWeights: TOOLKIT.BlendingWeights = {} as TOOLKIT.BlendingWeights;

    protected start(): void {
        this.initializeUtilities();
    }

    private initializeUtilities(): void {
        this.blendingWeights.primary = {
            motion: "animation1",
            weight: 0.6,
            speed: 1.0
        };

        this.blendingWeights.secondary = {
            motion: "animation2",
            weight: 0.4,
            speed: 1.2
        };
    }

    protected update(): void {
        this.demonstrateUtilities();
    }

    private demonstrateUtilities(): void {
        this.normalizeWeights();
        this.validateWeights();
        this.logWeightInfo();
    }

    private normalizeWeights(): void {
        const totalWeight = this.blendingWeights.primary.weight + this.blendingWeights.secondary.weight;
        
        if (totalWeight > 0.0) {
            this.blendingWeights.primary.weight /= totalWeight;
            this.blendingWeights.secondary.weight /= totalWeight;
        }
    }

    private validateWeights(): void {
        this.blendingWeights.primary.weight = this.clampWeight(this.blendingWeights.primary.weight);
        this.blendingWeights.secondary.weight = this.clampWeight(this.blendingWeights.secondary.weight);
    }

    private clampWeight(weight: number): number {
        return Math.max(0.0, Math.min(1.0, weight));
    }

    private logWeightInfo(): void {
        const primaryPercent = (this.blendingWeights.primary.weight * 100).toFixed(1);
        const secondaryPercent = (this.blendingWeights.secondary.weight * 100).toFixed(1);
        
        console.log(`Weights - Primary: ${primaryPercent}%, Secondary: ${secondaryPercent}%`);
    }

    public swapWeights(): void {
        const temp = { ...this.blendingWeights.primary };
        this.blendingWeights.primary = { ...this.blendingWeights.secondary };
        this.blendingWeights.secondary = temp;
    }

    public setWeights(primaryWeight: number, secondaryWeight: number): void {
        const total = primaryWeight + secondaryWeight;
        
        if (total > 0.0) {
            this.blendingWeights.primary.weight = primaryWeight / total;
            this.blendingWeights.secondary.weight = secondaryWeight / total;
        }
    }

    public getWeightRatio(): number {
        if (this.blendingWeights.secondary.weight === 0.0) {
            return Infinity;
        }
        
        return this.blendingWeights.primary.weight / this.blendingWeights.secondary.weight;
    }

    public copyWeights(): TOOLKIT.BlendingWeights {
        const copy = {} as TOOLKIT.BlendingWeights;
        copy.primary = { ...this.blendingWeights.primary };
        copy.secondary = { ...this.blendingWeights.secondary };
        return copy;
    }
}
```

## Best Practices

1. **Weight Normalization** - Ensure primary and secondary weights sum to 1.0 for predictable blending
2. **Validation** - Always validate weight values to prevent invalid blending states
3. **Reference Management** - Properly manage blend tree child references to avoid memory leaks
4. **Smooth Transitions** - Use interpolation when changing blending weights for smooth animation transitions
5. **Performance** - Reuse BlendingWeights instances when possible to reduce allocation overhead
6. **Layer Organization** - Use separate BlendingWeights instances for different animation layers

## Related Classes
- [BlendTreeValue](BlendTreeValue.md) - Blend tree value container
- [BlendTreeSystem](BlendTreeSystem.md) - Blend tree animation system
- [AnimationMixer](AnimationMixer.md) - Animation blending and mixing
- [MachineState](MachineState.md) - State machine implementation
- [TransitionCheck](TransitionCheck.md) - Animation transition logic
