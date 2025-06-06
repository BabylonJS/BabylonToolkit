# BlendTreeValue

Blend tree value container that holds animation source information, motion data, position coordinates, and blending weights.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

BlendTreeValue represents a single point in a blend tree, containing all the necessary information for animation blending calculations. It stores the animation source, motion identifier, position coordinates in blend space, and the calculated weight for blending.

## Constructor

### `constructor(config)`
Creates a new blend tree value with the specified configuration.

**Parameters:**
- `config` `object` - Configuration object with the following properties:
  - `source` `TOOLKIT.IBlendTreeChild` - The animation source or child blend tree
  - `motion` `string` - Name or identifier of the motion/animation
  - `posX?` `number` - X-position in blend space (optional, defaults to 0)
  - `posY?` `number` - Y-position in blend space (optional, defaults to 0)
  - `weight?` `number` - Initial blend weight (optional, defaults to 0)

## Properties

### Animation Source
- **`source`** `TOOLKIT.IBlendTreeChild` - Reference to the animation source or child blend tree

### Motion Identification
- **`motion`** `string` - Name or identifier of the motion/animation clip

### Blend Space Position
- **`posX`** `number` - X-coordinate position in the blend space
- **`posY`** `number` - Y-coordinate position in the blend space

### Blending Weight
- **`weight`** `number` - Current calculated weight for this blend tree value (0.0 to 1.0)

## Usage Examples

### Basic Blend Tree Value Creation
```typescript
class BlendTreeSetup extends TOOLKIT.ScriptComponent {
    public blendValues: TOOLKIT.BlendTreeValue[] = [];

    protected start(): void {
        this.createBlendTreeValues();
    }

    private createBlendTreeValues(): void {
        const idleValue = new TOOLKIT.BlendTreeValue({
            source: { motion: "idle" },
            motion: "idle",
            posX: 0.0,
            posY: 0.0,
            weight: 1.0
        });

        const walkValue = new TOOLKIT.BlendTreeValue({
            source: { motion: "walk" },
            motion: "walk",
            posX: 5.0,
            posY: 0.0,
            weight: 0.0
        });

        const runValue = new TOOLKIT.BlendTreeValue({
            source: { motion: "run" },
            motion: "run",
            posX: 10.0,
            posY: 0.0,
            weight: 0.0
        });

        this.blendValues = [idleValue, walkValue, runValue];
    }

    protected update(): void {
        this.displayBlendWeights();
    }

    private displayBlendWeights(): void {
        for (const value of this.blendValues) {
            if (value.weight > 0.01) {
                console.log(`${value.motion}: weight=${value.weight.toFixed(3)} pos=(${value.posX}, ${value.posY})`);
            }
        }
    }
}
```

### 2D Directional Blend Tree Values
```typescript
class DirectionalBlendTree extends TOOLKIT.ScriptComponent {
    public directionalValues: TOOLKIT.BlendTreeValue[] = [];

    protected start(): void {
        this.setupDirectionalBlendTree();
    }

    private setupDirectionalBlendTree(): void {
        this.directionalValues = [
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
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "walkForwardLeft" },
                motion: "walkForwardLeft",
                posX: -0.7,
                posY: 0.7,
                weight: 0.0
            }),
            new TOOLKIT.BlendTreeValue({
                source: { motion: "walkForwardRight" },
                motion: "walkForwardRight",
                posX: 0.7,
                posY: 0.7,
                weight: 0.0
            })
        ];
    }

    protected update(): void {
        this.updateDirectionalBlending();
    }

    private updateDirectionalBlending(): void {
        const horizontalInput = TOOLKIT.InputController.GetKeyboardInput(68) ? 1 : 
                               TOOLKIT.InputController.GetKeyboardInput(65) ? -1 : 0; // D and A keys
        const verticalInput = TOOLKIT.InputController.GetKeyboardInput(87) ? 1 : 
                             TOOLKIT.InputController.GetKeyboardInput(83) ? -1 : 0; // W and S keys
        
        TOOLKIT.BlendTreeSystem.Calculate2DFreeformDirectional(
            horizontalInput,
            verticalInput,
            this.directionalValues
        );
        
        this.applyBlendWeights();
    }

    private applyBlendWeights(): void {
        for (const value of this.directionalValues) {
            if (value.weight > 0.01) {
                console.log(`${value.motion}: ${(value.weight * 100).toFixed(1)}%`);
            }
        }
    }
}
```

### Dynamic Blend Tree Value Management
```typescript
class DynamicBlendTreeManager extends TOOLKIT.ScriptComponent {
    public blendValues: TOOLKIT.BlendTreeValue[] = [];
    public animationClips: string[] = ["idle", "walk", "run", "sprint"];

    protected start(): void {
        this.createDynamicBlendTree();
    }

    private createDynamicBlendTree(): void {
        this.blendValues = [];
        
        for (let i = 0; i < this.animationClips.length; i++) {
            const clipName = this.animationClips[i];
            const position = i * 2.5;
            
            const blendValue = new TOOLKIT.BlendTreeValue({
                source: { motion: clipName },
                motion: clipName,
                posX: position,
                posY: 0.0,
                weight: 0.0
            });
            
            this.blendValues.push(blendValue);
        }
        
        this.blendValues[0].weight = 1.0;
    }

    protected update(): void {
        this.updateDynamicBlending();
    }

    private updateDynamicBlending(): void {
        const speed = this.getCurrentSpeed();
        
        TOOLKIT.BlendTreeSystem.Calculate1DSimpleBlendTree(
            speed,
            this.blendValues
        );
        
        this.logActiveBlendValues();
    }

    private getCurrentSpeed(): number {
        return Math.sin(Date.now() * 0.001) * 5.0 + 5.0;
    }

    private logActiveBlendValues(): void {
        const activeValues = this.blendValues.filter(v => v.weight > 0.01);
        
        if (activeValues.length > 0) {
            const weightInfo = activeValues.map(v => 
                `${v.motion}:${(v.weight * 100).toFixed(1)}%`
            ).join(", ");
            
            console.log(`Active blends: ${weightInfo}`);
        }
    }

    public addBlendValue(motionName: string, posX: number, posY: number = 0.0): void {
        const newValue = new TOOLKIT.BlendTreeValue({
            source: { motion: motionName },
            motion: motionName,
            posX: posX,
            posY: posY,
            weight: 0.0
        });
        
        this.blendValues.push(newValue);
        this.sortBlendValuesByPosition();
    }

    public removeBlendValue(motionName: string): void {
        const index = this.blendValues.findIndex(v => v.motion === motionName);
        if (index !== -1) {
            this.blendValues.splice(index, 1);
        }
    }

    private sortBlendValuesByPosition(): void {
        this.blendValues.sort((a, b) => {
            if (a.posX !== b.posX) {
                return a.posX - b.posX;
            }
            return a.posY - b.posY;
        });
    }
}
```

### Blend Tree Value Validation
```typescript
class BlendTreeValidator extends TOOLKIT.ScriptComponent {
    public blendValues: TOOLKIT.BlendTreeValue[] = [];

    protected start(): void {
        this.setupBlendTreeWithValidation();
    }

    private setupBlendTreeWithValidation(): void {
        const configurations = [
            { motion: "idle", posX: 0.0, posY: 0.0 },
            { motion: "walk", posX: 5.0, posY: 0.0 },
            { motion: "run", posX: 10.0, posY: 0.0 },
            { motion: "jump", posX: 0.0, posY: 5.0 }
        ];

        for (const config of configurations) {
            if (this.validateBlendValueConfig(config)) {
                const blendValue = new TOOLKIT.BlendTreeValue({
                    source: { motion: config.motion },
                    motion: config.motion,
                    posX: config.posX,
                    posY: config.posY,
                    weight: 0.0
                });
                
                this.blendValues.push(blendValue);
            }
        }
    }

    private validateBlendValueConfig(config: any): boolean {
        if (!config.motion || typeof config.motion !== 'string') {
            console.warn(`Invalid motion name: ${config.motion}`);
            return false;
        }

        if (typeof config.posX !== 'number' || typeof config.posY !== 'number') {
            console.warn(`Invalid position values for ${config.motion}`);
            return false;
        }

        if (this.blendValues.some(v => v.motion === config.motion)) {
            console.warn(`Duplicate motion name: ${config.motion}`);
            return false;
        }

        return true;
    }

    protected update(): void {
        this.validateBlendWeights();
    }

    private validateBlendWeights(): void {
        let totalWeight = 0.0;
        
        for (const value of this.blendValues) {
            if (value.weight < 0.0 || value.weight > 1.0) {
                console.warn(`Invalid weight for ${value.motion}: ${value.weight}`);
                value.weight = TOOLKIT.BlendTreeUtils.ClampValue(value.weight, 0.0, 1.0);
            }
            
            totalWeight += value.weight;
        }
        
        if (Math.abs(totalWeight - 1.0) > 0.01 && totalWeight > 0.0) {
            console.log(`Total blend weight: ${totalWeight.toFixed(3)} (should be close to 1.0)`);
        }
    }

    public getBlendValueByMotion(motionName: string): TOOLKIT.BlendTreeValue | null {
        return this.blendValues.find(v => v.motion === motionName) || null;
    }

    public setBlendWeight(motionName: string, weight: number): void {
        const blendValue = this.getBlendValueByMotion(motionName);
        if (blendValue) {
            blendValue.weight = TOOLKIT.BlendTreeUtils.ClampValue(weight, 0.0, 1.0);
        }
    }
}
```

## Best Practices

1. **Proper Initialization** - Always provide valid source and motion information when creating blend tree values
2. **Position Planning** - Carefully plan blend space positions to ensure smooth interpolation
3. **Weight Management** - Keep weights within the 0.0 to 1.0 range for predictable blending
4. **Motion Naming** - Use consistent and descriptive motion names for easier debugging
5. **Validation** - Validate blend tree configurations to prevent runtime errors
6. **Performance** - Reuse blend tree value instances when possible to reduce memory allocation

## Related Classes
- [BlendTreeSystem](BlendTreeSystem.md) - Blend tree animation system
- [BlendTreeUtils](BlendTreeUtils.md) - Blend tree utilities
- [BlendingWeights](BlendingWeights.md) - Animation blending weights
- [AnimationMixer](AnimationMixer.md) - Animation blending and mixing
- [MachineState](MachineState.md) - State machine implementation
