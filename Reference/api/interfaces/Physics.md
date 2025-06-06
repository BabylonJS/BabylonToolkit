# Physics Interfaces

Physics system interface definitions for collision detection, rigid body dynamics, and physics simulation components.

**Namespace**: `TOOLKIT`  
**Type**: `interfaces`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

The Physics interfaces define the contract for physics system components including collision shapes, rigid body properties, physics materials, and simulation parameters. These interfaces ensure consistent physics behavior across different physics engines and implementations.

## Core Interfaces

### IPhysicsBody
Defines the structure for physics body components.

```typescript
interface IPhysicsBody {
    mass: number;
    isKinematic: boolean;
    useGravity: boolean;
    linearDamping: number;
    angularDamping: number;
    freezePosition: boolean[];
    freezeRotation: boolean[];
}
```

### ICollisionShape
Defines collision shape properties and geometry.

```typescript
interface ICollisionShape {
    shapeType: string;
    isTrigger: boolean;
    center: BABYLON.Vector3;
    size: BABYLON.Vector3;
    radius: number;
    height: number;
}
```

### IPhysicsMaterial
Defines physics material properties for surface interactions.

```typescript
interface IPhysicsMaterial {
    friction: number;
    bounciness: number;
    frictionCombine: string;
    bounceCombine: string;
    staticFriction: number;
    dynamicFriction: number;
}
```

## Usage Examples

### Physics Body Implementation
```typescript
class PhysicsBodyComponent extends TOOLKIT.ScriptComponent implements TOOLKIT.IPhysicsBody {
    public mass: number = 1.0;
    public isKinematic: boolean = false;
    public useGravity: boolean = true;
    public linearDamping: number = 0.0;
    public angularDamping: number = 0.05;
    public freezePosition: boolean[] = [false, false, false];
    public freezeRotation: boolean[] = [false, false, false];

    protected start(): void {
        this.setupPhysicsBody();
    }

    private setupPhysicsBody(): void {
        console.log(`Physics body configured with mass: ${this.mass}`);
    }
}
```

## Best Practices

1. **Interface Compliance** - Ensure all physics components implement required interfaces
2. **Type Safety** - Use TypeScript interfaces for compile-time type checking
3. **Consistent Properties** - Maintain consistent property naming across implementations
4. **Documentation** - Document interface implementations for clarity
5. **Validation** - Validate interface property values for physics stability
6. **Extensibility** - Design interfaces to support future physics features

## Related Classes
- [RigidbodyPhysics](../physics/RigidbodyPhysics.md) - Rigid body physics implementation
- [CharacterController](../physics/CharacterController.md) - Character physics controller
- [Animation](Animation.md) - Animation system interfaces
