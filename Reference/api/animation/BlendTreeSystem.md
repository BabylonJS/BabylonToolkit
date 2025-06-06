# BlendTreeSystem

Blend tree animation system providing static methods for calculating animation weights in 1D and 2D blend spaces.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

BlendTreeSystem provides a comprehensive set of static methods for calculating animation blending weights in various blend tree configurations. It supports 1D simple blend trees and 2D freeform blend trees with both directional and cartesian coordinate systems.

## Static Methods

### 1D Blend Tree Calculation

#### `Calculate1DSimpleBlendTree(inputX, blendTreeArray)`
Calculates animation weights for a 1D simple blend tree based on a single input parameter.

**Parameters:**
- `inputX` `number` - Input value for the blend tree calculation
- `blendTreeArray` `TOOLKIT.BlendTreeValue[]` - Array of blend tree values to calculate weights for

**Usage:**
Used for simple blending scenarios like walk-to-run transitions based on speed.

### 2D Blend Tree Calculations

#### `Calculate2DFreeformDirectional(inputX, inputY, blendTreeArray)`
Calculates animation weights for a 2D freeform directional blend tree using directional coordinates.

**Parameters:**
- `inputX` `number` - X-axis input value (typically forward/backward movement)
- `inputY` `number` - Y-axis input value (typically left/right movement)
- `blendTreeArray` `TOOLKIT.BlendTreeValue[]` - Array of blend tree values to calculate weights for

**Usage:**
Ideal for directional movement blending where the direction of movement matters more than the exact position.

#### `Calculate2DFreeformCartesian(inputX, inputY, blendTreeArray)`
Calculates animation weights for a 2D freeform cartesian blend tree using cartesian coordinates.

**Parameters:**
- `inputX` `number` - X-axis input value in cartesian space
- `inputY` `number` - Y-axis input value in cartesian space
- `blendTreeArray` `TOOLKIT.BlendTreeValue[]` - Array of blend tree values to calculate weights for

**Usage:**
Best for precise positional blending where exact coordinate positioning is important.

## Usage Examples

### 1D Simple Blend Tree
```typescript
class MovementController extends TOOLKIT.ScriptComponent {
    public speed: number = 0.0;
    public blendTreeValues: TOOLKIT.BlendTreeValue[] = [];

    protected start(): void {
        this.setupBlendTree();
    }

    private setupBlendTree(): void {
        this.blendTreeValues = [
            new TOOLKIT.BlendTreeValue({
                source: { motion: "idle" },
                motion: "idle",
                posX: 0.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "walk" },
                motion: "walk",
                posX: 5.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "run" },
                motion: "run",
                posX: 10.0,
                weight: 0.0
            })
        ];
    }

    protected update(): void {
        this.updateMovementBlending();
    }

    private updateMovementBlending(): void {
        this.speed = this.getCurrentSpeed();
        
        TOOLKIT.BlendTreeSystem.Calculate1DSimpleBlendTree(
            this.speed,
            this.blendTreeValues
        );
        
        this.applyBlendWeights();
    }

    private getCurrentSpeed(): number {
        return 7.5;
    }

    private applyBlendWeights(): void {
        for (const blendValue of this.blendTreeValues) {
            console.log(`${blendValue.motion}: weight = ${blendValue.weight}`);
        }
    }
}
```

### 2D Directional Blend Tree
```typescript
class DirectionalMovement extends TOOLKIT.ScriptComponent {
    public moveX: number = 0.0;
    public moveY: number = 0.0;
    public directionalBlendTree: TOOLKIT.BlendTreeValue[] = [];

    protected start(): void {
        this.setupDirectionalBlendTree();
    }

    private setupDirectionalBlendTree(): void {
        this.directionalBlendTree = [
            new TOOLKIT.BlendTreeValue({
                source: { motion: "idle" },
                motion: "idle",
                posX: 0.0,
                posY: 0.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "walkForward" },
                motion: "walkForward",
                posX: 0.0,
                posY: 1.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "walkBackward" },
                motion: "walkBackward",
                posX: 0.0,
                posY: -1.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "walkLeft" },
                motion: "walkLeft",
                posX: -1.0,
                posY: 0.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "walkRight" },
                motion: "walkRight",
                posX: 1.0,
                posY: 0.0,
                weight: 0.0
            })
        ];
    }

    protected update(): void {
        this.updateDirectionalBlending();
    }

    private updateDirectionalBlending(): void {
        const input = this.getMovementInput();
        this.moveX = input.x;
        this.moveY = input.y;
        
        TOOLKIT.BlendTreeSystem.Calculate2DFreeformDirectional(
            this.moveX,
            this.moveY,
            this.directionalBlendTree
        );
        
        this.applyDirectionalWeights();
    }

    private getMovementInput(): { x: number, y: number } {
        return { x: 0.5, y: 0.8 };
    }

    private applyDirectionalWeights(): void {
        for (const blendValue of this.directionalBlendTree) {
            if (blendValue.weight > 0.01) {
                console.log(`${blendValue.motion}: weight = ${blendValue.weight.toFixed(3)}`);
            }
        }
    }
}
```

### 2D Cartesian Blend Tree
```typescript
class CartesianMovement extends TOOLKIT.ScriptComponent {
    public positionX: number = 0.0;
    public positionY: number = 0.0;
    public cartesianBlendTree: TOOLKIT.BlendTreeValue[] = [];

    protected start(): void {
        this.setupCartesianBlendTree();
    }

    private setupCartesianBlendTree(): void {
        this.cartesianBlendTree = [
            new TOOLKIT.BlendTreeValue({
                source: { motion: "idle" },
                motion: "idle",
                posX: 0.0,
                posY: 0.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "walkSlow" },
                motion: "walkSlow",
                posX: 2.0,
                posY: 2.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "walkFast" },
                motion: "walkFast",
                posX: 5.0,
                posY: 5.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "run" },
                motion: "run",
                posX: 8.0,
                posY: 8.0,
                weight: 0.0
            })
        ];
    }

    protected update(): void {
        this.updateCartesianBlending();
    }

    private updateCartesianBlending(): void {
        const position = this.getCurrentPosition();
        this.positionX = position.x;
        this.positionY = position.y;
        
        TOOLKIT.BlendTreeSystem.Calculate2DFreeformCartesian(
            this.positionX,
            this.positionY,
            this.cartesianBlendTree
        );
        
        this.applyCartesianWeights();
    }

    private getCurrentPosition(): { x: number, y: number } {
        return { x: 3.5, y: 4.2 };
    }

    private applyCartesianWeights(): void {
        let totalWeight = 0.0;
        
        for (const blendValue of this.cartesianBlendTree) {
            totalWeight += blendValue.weight;
        }
        
        console.log(`Total blend weight: ${totalWeight.toFixed(3)}`);
        
        for (const blendValue of this.cartesianBlendTree) {
            if (blendValue.weight > 0.01) {
                const normalizedWeight = blendValue.weight / totalWeight;
                console.log(`${blendValue.motion}: ${(normalizedWeight * 100).toFixed(1)}%`);
            }
        }
    }
}
```

### Advanced Blend Tree Manager
```typescript
class BlendTreeManager extends TOOLKIT.ScriptComponent {
    public locomotionBlendTree: TOOLKIT.BlendTreeValue[] = [];
    public combatBlendTree: TOOLKIT.BlendTreeValue[] = [];
    public currentBlendTree: TOOLKIT.BlendTreeValue[] = [];
    public blendMode: string = "locomotion";

    protected start(): void {
        this.setupAllBlendTrees();
    }

    private setupAllBlendTrees(): void {
        this.setupLocomotionBlendTree();
        this.setupCombatBlendTree();
        this.currentBlendTree = this.locomotionBlendTree;
    }

    private setupLocomotionBlendTree(): void {
        this.locomotionBlendTree = [
            new TOOLKIT.BlendTreeValue({
                source: { motion: "idle" },
                motion: "idle",
                posX: 0.0,
                posY: 0.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "walk" },
                motion: "walk",
                posX: 0.0,
                posY: 5.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "run" },
                motion: "run",
                posX: 0.0,
                posY: 10.0,
                weight: 0.0
            })
        ];
    }

    private setupCombatBlendTree(): void {
        this.combatBlendTree = [
            new TOOLKIT.BlendTreeValue({
                source: { motion: "combatIdle" },
                motion: "combatIdle",
                posX: 0.0,
                posY: 0.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "combatWalk" },
                motion: "combatWalk",
                posX: 0.0,
                posY: 3.0,
                weight: 0.0
            })
        ];
    }

    protected update(): void {
        this.updateBlendTreeCalculations();
    }

    private updateBlendTreeCalculations(): void {
        const input = this.getBlendInput();
        
        switch (this.blendMode) {
            case "locomotion":
                this.calculateLocomotionBlending(input);
                break;
            case "combat":
                this.calculateCombatBlending(input);
                break;
        }
    }

    private getBlendInput(): { x: number, y: number } {
        return { x: 0.0, y: 6.5 };
    }

    private calculateLocomotionBlending(input: { x: number, y: number }): void {
        TOOLKIT.BlendTreeSystem.Calculate2DFreeformDirectional(
            input.x,
            input.y,
            this.locomotionBlendTree
        );
    }

    private calculateCombatBlending(input: { x: number, y: number }): void {
        TOOLKIT.BlendTreeSystem.Calculate1DSimpleBlendTree(
            input.y,
            this.combatBlendTree
        );
    }

    public switchBlendMode(mode: string): void {
        this.blendMode = mode;
        this.currentBlendTree = mode === "combat" ? this.combatBlendTree : this.locomotionBlendTree;
    }
}
```

## Best Practices

1. **Blend Tree Setup** - Properly configure blend tree values with appropriate positions and motions
2. **Input Normalization** - Ensure input values are within expected ranges for consistent blending
3. **Weight Validation** - Check that calculated weights sum to appropriate values
4. **Performance** - Cache blend tree arrays and avoid frequent recalculation
5. **Coordinate Systems** - Choose the appropriate blend tree type (directional vs cartesian) for your use case
6. **Smooth Transitions** - Use interpolation between blend tree calculations for smoother animation transitions

## Related Classes
- [BlendTreeValue](BlendTreeValue.md) - Blend tree value container
- [BlendTreeUtils](BlendTreeUtils.md) - Blend tree utilities
- [BlendingWeights](BlendingWeights.md) - Animation blending weights
- [AnimationMixer](AnimationMixer.md) - Animation blending and mixing
- [MachineState](MachineState.md) - State machine implementation
