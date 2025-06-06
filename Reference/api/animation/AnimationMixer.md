# AnimationMixer

Animation blending and mixing system for managing multiple animation states and transitions.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

AnimationMixer provides a comprehensive system for blending and mixing multiple animations, managing animation buffers, and handling root motion. It serves as the core component for advanced animation systems that require smooth transitions between multiple animation states.

## Properties

### Buffer Properties
- **`influenceBuffer`** `number` - Controls the influence weight for animation blending
- **`positionBuffer`** `BABYLON.Vector3` - Buffer for position animation data
- **`rotationBuffer`** `BABYLON.Quaternion` - Buffer for rotation animation data
- **`scalingBuffer`** `BABYLON.Vector3` - Buffer for scaling animation data

### Matrix and Transform
- **`originalMatrix`** `BABYLON.Matrix` - Original transformation matrix before animation
- **`blendingFactor`** `number` - Factor controlling the blend between animations
- **`blendingSpeed`** `number` - Speed at which blending occurs

### Root Motion
- **`rootPosition`** `BABYLON.Vector3` - Root motion position offset
- **`rootRotation`** `BABYLON.Quaternion` - Root motion rotation offset

## Usage Examples

### Basic Animation Mixing
```typescript
class CharacterAnimator extends TOOLKIT.ScriptComponent {
    public walkAnimation: string = "walk";
    public runAnimation: string = "run";
    public mixer: TOOLKIT.AnimationMixer = {} as TOOLKIT.AnimationMixer;

    protected start(): void {
        this.setupAnimationMixer();
    }

    private setupAnimationMixer(): void {
        this.mixer.blendingFactor = 0.5;
        this.mixer.blendingSpeed = 2.0;
        this.mixer.influenceBuffer = 1.0;
    }

    protected update(): void {
        this.updateAnimationBlending();
    }

    private updateAnimationBlending(): void {
        const speed = this.getMovementSpeed();
        
        if (speed > 5.0) {
            this.mixer.blendingFactor = Math.min(1.0, speed / 10.0);
        } else {
            this.mixer.blendingFactor = Math.max(0.0, speed / 5.0);
        }
    }

    private getMovementSpeed(): number {
        return 7.5;
    }
}
```

### Advanced Root Motion Handling
```typescript
class RootMotionController extends TOOLKIT.ScriptComponent {
    public mixer: TOOLKIT.AnimationMixer = {} as TOOLKIT.AnimationMixer;
    public enableRootMotion: boolean = true;

    protected start(): void {
        this.initializeRootMotion();
    }

    private initializeRootMotion(): void {
        this.mixer.rootPosition = BABYLON.Vector3.Zero();
        this.mixer.rootRotation = BABYLON.Quaternion.Identity();
    }

    protected update(): void {
        if (this.enableRootMotion) {
            this.applyRootMotion();
        }
    }

    private applyRootMotion(): void {
        const deltaTime = TOOLKIT.SceneManager.GetDeltaTime();
        
        const rootMotionPosition = this.mixer.rootPosition.scale(deltaTime);
        const rootMotionRotation = this.mixer.rootRotation;
        
        this.transform.position.addInPlace(rootMotionPosition);
        this.transform.rotationQuaternion = this.transform.rotationQuaternion.multiply(rootMotionRotation);
    }
}
```

### Multi-Layer Animation Blending
```typescript
class LayeredAnimationSystem extends TOOLKIT.ScriptComponent {
    public baseMixer: TOOLKIT.AnimationMixer = {} as TOOLKIT.AnimationMixer;
    public additiveMixer: TOOLKIT.AnimationMixer = {} as TOOLKIT.AnimationMixer;

    protected start(): void {
        this.setupLayeredBlending();
    }

    private setupLayeredBlending(): void {
        this.baseMixer.influenceBuffer = 1.0;
        this.baseMixer.blendingSpeed = 1.5;
        
        this.additiveMixer.influenceBuffer = 0.5;
        this.additiveMixer.blendingSpeed = 3.0;
    }

    protected update(): void {
        this.updateLayeredBlending();
    }

    private updateLayeredBlending(): void {
        const baseWeight = this.calculateBaseWeight();
        const additiveWeight = this.calculateAdditiveWeight();
        
        this.baseMixer.blendingFactor = baseWeight;
        this.additiveMixer.blendingFactor = additiveWeight;
        
        this.combineAnimationLayers();
    }

    private calculateBaseWeight(): number {
        return 0.8;
    }

    private calculateAdditiveWeight(): number {
        return 0.3;
    }

    private combineAnimationLayers(): void {
        const combinedPosition = this.baseMixer.positionBuffer.add(this.additiveMixer.positionBuffer);
        const combinedRotation = this.baseMixer.rotationBuffer.multiply(this.additiveMixer.rotationBuffer);
        
        this.transform.position = combinedPosition;
        this.transform.rotationQuaternion = combinedRotation;
    }
}
```

## Best Practices

1. **Initialize Buffers** - Always initialize position, rotation, and scaling buffers before use
2. **Manage Blending Speed** - Use appropriate blending speeds for smooth transitions
3. **Root Motion Control** - Carefully manage root motion to avoid unwanted movement
4. **Performance Optimization** - Reuse mixer instances when possible to reduce memory allocation
5. **Layer Management** - Use multiple mixers for complex layered animation systems

## Related Classes
- [AnimationState](AnimationState.md) - Animation state management
- [MachineState](MachineState.md) - State machine implementation
- [BlendTreeSystem](BlendTreeSystem.md) - Blend tree animation system
- [BlendingWeights](BlendingWeights.md) - Animation blending weights
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
