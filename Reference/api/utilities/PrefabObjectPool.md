# PrefabObjectPool

Object pooling system for efficient management and reuse of prefab instances to optimize memory allocation and performance.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

PrefabObjectPool provides an efficient object pooling system that manages the creation, reuse, and disposal of prefab instances. It helps reduce garbage collection overhead and improves performance by reusing objects instead of constantly creating and destroying them.

## Properties

### Pool Configuration
- **`poolName`** `string` - Unique name identifier for the pool
- **`prefabTemplate`** `BABYLON.TransformNode` - Template object for creating pool instances
- **`initialSize`** `number` - Initial number of objects to create in the pool
- **`maxSize`** `number` - Maximum number of objects the pool can contain
- **`autoExpand`** `boolean` - Whether the pool can grow beyond initial size

### Pool State
- **`activeObjects`** `BABYLON.TransformNode[]` - Currently active (in-use) objects
- **`inactiveObjects`** `BABYLON.TransformNode[]` - Available objects in the pool
- **`totalCreated`** `number` - Total number of objects created by this pool

## Usage Examples

### Basic Object Pooling
```typescript
class BasicObjectPoolExample extends TOOLKIT.ScriptComponent {
    public bulletPool: TOOLKIT.PrefabObjectPool;

    protected start(): void {
        this.setupObjectPool();
    }

    private setupObjectPool(): void {
        const bulletTemplate = BABYLON.MeshBuilder.CreateSphere("bulletTemplate", {
            diameter: 0.2
        }, this.scene);
        bulletTemplate.setEnabled(false);

        this.bulletPool = new TOOLKIT.PrefabObjectPool();
        this.bulletPool.poolName = "BulletPool";
        this.bulletPool.autoExpand = true;
        this.bulletPool.initialSize = 50;
        this.bulletPool.maxSize = 200;

        console.log("Bullet pool created");
    }

    public fireBullet(position: BABYLON.Vector3): void {
        const bullet = this.bulletPool.getObject();
        if (bullet) {
            bullet.position = position;
            bullet.setEnabled(true);
            
            setTimeout(() => {
                this.returnBullet(bullet);
            }, 3000);
        }
    }

    private returnBullet(bullet: BABYLON.TransformNode): void {
        bullet.setEnabled(false);
        this.bulletPool.returnObject(bullet);
    }
}
```

## Best Practices

1. **Pool Sizing** - Set appropriate initial and maximum pool sizes based on expected usage
2. **Template Management** - Keep template objects disabled to avoid rendering overhead
3. **Object Reset** - Reset object state when returning to pool for clean reuse
4. **Memory Management** - Dispose of pools when no longer needed
5. **Performance** - Use pooling for frequently created/destroyed objects
6. **Expansion Control** - Configure auto-expansion based on memory constraints

## Related Classes
- [EntityController](EntityController.md) - Network entity management
- [SceneManager](../core/SceneManager.md) - Main scene management class
