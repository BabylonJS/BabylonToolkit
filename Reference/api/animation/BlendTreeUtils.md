# BlendTreeUtils

Utility functions for blend tree calculations including value clamping, angle calculations, and interpolation methods.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

BlendTreeUtils provides essential utility functions for blend tree calculations, including mathematical operations for clamping values, calculating signed angles between vectors, linear interpolation, and finding neighbor indices in blend tree arrays.

## Static Methods

### Value Clamping

#### `ClampValue(num, min, max)`
Clamps a numeric value between specified minimum and maximum bounds.

**Parameters:**
- `num` `number` - The value to clamp
- `min` `number` - Minimum allowed value
- `max` `number` - Maximum allowed value

**Returns:** `number` - The clamped value

**Usage:**
Essential for ensuring blend tree input values stay within valid ranges.

### Vector Mathematics

#### `GetSignedAngle(a, b)`
Calculates the signed angle between two 2D vectors.

**Parameters:**
- `a` `BABYLON.Vector2` - First vector
- `b` `BABYLON.Vector2` - Second vector

**Returns:** `number` - Signed angle in radians between the vectors

**Usage:**
Used for directional blend tree calculations where the direction between vectors matters.

### Interpolation

#### `GetLinearInterpolation(x0, y0, x1, y1, x)`
Performs linear interpolation between two points given an x-coordinate.

**Parameters:**
- `x0` `number` - X-coordinate of the first point
- `y0` `number` - Y-coordinate of the first point
- `x1` `number` - X-coordinate of the second point
- `y1` `number` - Y-coordinate of the second point
- `x` `number` - X-coordinate to interpolate at

**Returns:** `number` - Interpolated Y value at the given X coordinate

**Usage:**
Core function for calculating smooth transitions between blend tree values.

### Array Operations

#### `GetRightNeighbourIndex(inputX, blendTreeArray)`
Finds the index of the right neighbor in a sorted blend tree array for a given input value.

**Parameters:**
- `inputX` `number` - Input value to find the neighbor for
- `blendTreeArray` `TOOLKIT.BlendTreeValue[]` - Sorted array of blend tree values

**Returns:** `number` - Index of the right neighbor in the array

**Usage:**
Used for efficient lookup of adjacent blend tree values during weight calculation.

## Usage Examples

### Basic Value Clamping
```typescript
class BlendTreeController extends TOOLKIT.ScriptComponent {
    public speed: number = 0.0;
    public maxSpeed: number = 10.0;
    public minSpeed: number = 0.0;

    protected update(): void {
        const rawSpeed = this.getRawSpeedInput();
        
        this.speed = TOOLKIT.BlendTreeUtils.ClampValue(
            rawSpeed,
            this.minSpeed,
            this.maxSpeed
        );
        
        this.updateBlendTree();
    }

    private getRawSpeedInput(): number {
        return 15.0;
    }

    private updateBlendTree(): void {
        console.log(`Clamped speed: ${this.speed}`);
    }
}
```

### Directional Angle Calculations
```typescript
class DirectionalBlending extends TOOLKIT.ScriptComponent {
    public currentDirection: BABYLON.Vector2 = new BABYLON.Vector2(1, 0);
    public targetDirection: BABYLON.Vector2 = new BABYLON.Vector2(0, 1);

    protected update(): void {
        this.calculateDirectionalBlending();
    }

    private calculateDirectionalBlending(): void {
        const signedAngle = TOOLKIT.BlendTreeUtils.GetSignedAngle(
            this.currentDirection,
            this.targetDirection
        );
        
        const angleDegrees = signedAngle * (180 / Math.PI);
        
        console.log(`Signed angle: ${angleDegrees.toFixed(2)} degrees`);
        
        this.applyDirectionalBlending(signedAngle);
    }

    private applyDirectionalBlending(angle: number): void {
        const normalizedAngle = TOOLKIT.BlendTreeUtils.ClampValue(
            angle,
            -Math.PI,
            Math.PI
        );
        
        const blendWeight = Math.abs(normalizedAngle) / Math.PI;
        console.log(`Blend weight from angle: ${blendWeight.toFixed(3)}`);
    }
}
```

### Linear Interpolation for Smooth Blending
```typescript
class SmoothBlendTransition extends TOOLKIT.ScriptComponent {
    public blendPoints: Array<{x: number, y: number}> = [];

    protected start(): void {
        this.setupBlendPoints();
    }

    private setupBlendPoints(): void {
        this.blendPoints = [
            { x: 0.0, y: 0.0 },   // Idle
            { x: 5.0, y: 0.5 },   // Walk
            { x: 10.0, y: 1.0 }   // Run
        ];
    }

    protected update(): void {
        const currentSpeed = this.getCurrentSpeed();
        const blendWeight = this.calculateBlendWeight(currentSpeed);
        
        console.log(`Speed: ${currentSpeed}, Blend Weight: ${blendWeight.toFixed(3)}`);
    }

    private getCurrentSpeed(): number {
        return 7.5;
    }

    private calculateBlendWeight(speed: number): number {
        const clampedSpeed = TOOLKIT.BlendTreeUtils.ClampValue(
            speed,
            0.0,
            10.0
        );
        
        for (let i = 0; i < this.blendPoints.length - 1; i++) {
            const point1 = this.blendPoints[i];
            const point2 = this.blendPoints[i + 1];
            
            if (clampedSpeed >= point1.x && clampedSpeed <= point2.x) {
                return TOOLKIT.BlendTreeUtils.GetLinearInterpolation(
                    point1.x, point1.y,
                    point2.x, point2.y,
                    clampedSpeed
                );
            }
        }
        
        return 0.0;
    }
}
```

### Neighbor Index Finding
```typescript
class BlendTreeIndexManager extends TOOLKIT.ScriptComponent {
    public blendTreeValues: TOOLKIT.BlendTreeValue[] = [];

    protected start(): void {
        this.setupBlendTreeValues();
    }

    private setupBlendTreeValues(): void {
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
        const inputSpeed = this.getInputSpeed();
        this.findBlendNeighbors(inputSpeed);
    }

    private getInputSpeed(): number {
        return 7.0;
    }

    private findBlendNeighbors(inputSpeed: number): void {
        const rightIndex = TOOLKIT.BlendTreeUtils.GetRightNeighbourIndex(
            inputSpeed,
            this.blendTreeValues
        );
        
        const leftIndex = Math.max(0, rightIndex - 1);
        
        if (rightIndex < this.blendTreeValues.length) {
            const leftValue = this.blendTreeValues[leftIndex];
            const rightValue = this.blendTreeValues[rightIndex];
            
            console.log(`Input: ${inputSpeed}`);
            console.log(`Left neighbor: ${leftValue.motion} at ${leftValue.posX}`);
            console.log(`Right neighbor: ${rightValue.motion} at ${rightValue.posX}`);
            
            this.interpolateBetweenNeighbors(inputSpeed, leftValue, rightValue);
        }
    }

    private interpolateBetweenNeighbors(
        input: number,
        left: TOOLKIT.BlendTreeValue,
        right: TOOLKIT.BlendTreeValue
    ): void {
        const interpolatedWeight = TOOLKIT.BlendTreeUtils.GetLinearInterpolation(
            left.posX, 0.0,
            right.posX, 1.0,
            input
        );
        
        const clampedWeight = TOOLKIT.BlendTreeUtils.ClampValue(
            interpolatedWeight,
            0.0,
            1.0
        );
        
        left.weight = 1.0 - clampedWeight;
        right.weight = clampedWeight;
        
        console.log(`Left weight: ${left.weight.toFixed(3)}, Right weight: ${right.weight.toFixed(3)}`);
    }
}
```

### Advanced Utility Combinations
```typescript
class AdvancedBlendTreeCalculator extends TOOLKIT.ScriptComponent {
    public blendTreeValues: TOOLKIT.BlendTreeValue[] = [];
    public inputVector: BABYLON.Vector2 = new BABYLON.Vector2(0, 0);
    public referenceVector: BABYLON.Vector2 = new BABYLON.Vector2(1, 0);

    protected start(): void {
        this.setupAdvancedBlendTree();
    }

    private setupAdvancedBlendTree(): void {
        this.blendTreeValues = [
            new TOOLKIT.BlendTreeValue({
                source: { motion: "idle" },
                motion: "idle",
                posX: 0.0,
                posY: 0.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "forward" },
                motion: "forward",
                posX: 0.0,
                posY: 1.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "right" },
                motion: "right",
                posX: 1.0,
                posY: 0.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "backward" },
                motion: "backward",
                posX: 0.0,
                posY: -1.0,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "left" },
                motion: "left",
                posX: -1.0,
                posY: 0.0,
                weight: 0.0
            })
        ];
    }

    protected update(): void {
        this.updateInputVector();
        this.calculateAdvancedBlending();
    }

    private updateInputVector(): void {
        this.inputVector.x = Math.sin(Date.now() * 0.001);
        this.inputVector.y = Math.cos(Date.now() * 0.001);
        
        this.inputVector.x = TOOLKIT.BlendTreeUtils.ClampValue(this.inputVector.x, -1.0, 1.0);
        this.inputVector.y = TOOLKIT.BlendTreeUtils.ClampValue(this.inputVector.y, -1.0, 1.0);
    }

    private calculateAdvancedBlending(): void {
        const angle = TOOLKIT.BlendTreeUtils.GetSignedAngle(
            this.referenceVector,
            this.inputVector
        );
        
        const magnitude = Math.sqrt(this.inputVector.x * this.inputVector.x + this.inputVector.y * this.inputVector.y);
        const clampedMagnitude = TOOLKIT.BlendTreeUtils.ClampValue(magnitude, 0.0, 1.0);
        
        for (const blendValue of this.blendTreeValues) {
            const valueVector = new BABYLON.Vector2(blendValue.posX, blendValue.posY);
            const valueAngle = TOOLKIT.BlendTreeUtils.GetSignedAngle(
                this.referenceVector,
                valueVector
            );
            
            const angleDifference = Math.abs(angle - valueAngle);
            const angleWeight = Math.max(0.0, 1.0 - (angleDifference / Math.PI));
            
            blendValue.weight = angleWeight * clampedMagnitude;
        }
        
        this.normalizeBlendWeights();
    }

    private normalizeBlendWeights(): void {
        let totalWeight = 0.0;
        
        for (const blendValue of this.blendTreeValues) {
            totalWeight += blendValue.weight;
        }
        
        if (totalWeight > 0.0) {
            for (const blendValue of this.blendTreeValues) {
                blendValue.weight /= totalWeight;
                
                if (blendValue.weight > 0.01) {
                    console.log(`${blendValue.motion}: ${(blendValue.weight * 100).toFixed(1)}%`);
                }
            }
        }
    }
}
```

## Best Practices

1. **Input Validation** - Always clamp input values to prevent unexpected behavior
2. **Angle Calculations** - Use signed angles for directional blending to maintain proper orientation
3. **Interpolation Precision** - Ensure interpolation points are properly ordered and within valid ranges
4. **Performance** - Cache frequently used calculations and avoid redundant computations
5. **Neighbor Finding** - Sort blend tree arrays by position for efficient neighbor lookup
6. **Weight Normalization** - Always normalize blend weights to ensure they sum to 1.0

## Related Classes
- [BlendTreeSystem](BlendTreeSystem.md) - Blend tree animation system
- [BlendTreeValue](BlendTreeValue.md) - Blend tree value container
- [BlendingWeights](BlendingWeights.md) - Animation blending weights
- [AnimationMixer](AnimationMixer.md) - Animation blending and mixing
- [MachineState](MachineState.md) - State machine implementation
