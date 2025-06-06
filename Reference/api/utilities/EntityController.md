# EntityController

Network entity management utilities for handling networked game objects and synchronization across clients.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

EntityController provides comprehensive network entity management capabilities, including entity creation, synchronization, ownership management, and state replication across networked game sessions. It handles the complexities of networked game object lifecycle and data consistency.

## Properties

### Entity Identification
- **`entityId`** `string` - Unique identifier for the network entity
- **`ownerId`** `string` - ID of the client that owns this entity
- **`entityType`** `string` - Type classification of the entity

### Network State
- **`isNetworked`** `boolean` - Whether this entity is networked
- **`isOwner`** `boolean` - Whether the local client owns this entity
- **`syncPosition`** `boolean` - Whether to synchronize position data
- **`syncRotation`** `boolean` - Whether to synchronize rotation data
- **`syncScale`** `boolean` - Whether to synchronize scale data

### Update Control
- **`updateRate`** `number` - Rate at which updates are sent (updates per second)
- **`lastUpdateTime`** `number` - Timestamp of the last update sent
- **`interpolationEnabled`** `boolean` - Whether to use interpolation for smooth movement

## Methods

### Entity Management

#### `createNetworkEntity(entityType, position?, rotation?)`
Creates a new networked entity.

**Parameters:**
- `entityType` `string` - Type of entity to create
- `position?` `BABYLON.Vector3` - Initial position (optional)
- `rotation?` `BABYLON.Vector3` - Initial rotation (optional)

**Returns:** `string` - The created entity ID

#### `destroyNetworkEntity(entityId)`
Destroys a networked entity.

**Parameters:**
- `entityId` `string` - ID of the entity to destroy

#### `transferOwnership(entityId, newOwnerId)`
Transfers ownership of an entity to another client.

**Parameters:**
- `entityId` `string` - ID of the entity
- `newOwnerId` `string` - ID of the new owner client

### State Synchronization

#### `sendEntityUpdate(entityId, data)`
Sends an entity state update to other clients.

**Parameters:**
- `entityId` `string` - ID of the entity to update
- `data` `any` - Update data to send

#### `receiveEntityUpdate(entityId, data, senderId)`
Processes a received entity update from another client.

**Parameters:**
- `entityId` `string` - ID of the updated entity
- `data` `any` - Received update data
- `senderId` `string` - ID of the client that sent the update

### Interpolation

#### `enableInterpolation(entityId, enabled)`
Enables or disables interpolation for an entity.

**Parameters:**
- `entityId` `string` - ID of the entity
- `enabled` `boolean` - Whether to enable interpolation

#### `setInterpolationTarget(entityId, targetPosition, targetRotation)`
Sets interpolation targets for smooth movement.

**Parameters:**
- `entityId` `string` - ID of the entity
- `targetPosition` `BABYLON.Vector3` - Target position
- `targetRotation` `BABYLON.Vector3` - Target rotation

## Usage Examples

### Basic Network Entity Management
```typescript
class NetworkEntityManager extends TOOLKIT.ScriptComponent {
    public entityController: TOOLKIT.EntityController = new TOOLKIT.EntityController();
    public playerEntities: Map<string, string> = new Map();

    protected start(): void {
        this.setupNetworkEntitySystem();
    }

    private setupNetworkEntitySystem(): void {
        this.entityController.updateRate = 20;
        this.entityController.interpolationEnabled = true;
        
        this.createPlayerEntity();
        this.setupEntityEventHandlers();
    }

    private createPlayerEntity(): void {
        const playerPosition = new BABYLON.Vector3(0, 1, 0);
        const playerRotation = BABYLON.Vector3.Zero();
        
        const entityId = this.entityController.createNetworkEntity(
            "player",
            playerPosition,
            playerRotation
        );

        this.playerEntities.set("localPlayer", entityId);
        console.log(`Player entity created: ${entityId}`);
    }

    private setupEntityEventHandlers(): void {
        console.log("Entity event handlers configured");
    }

    protected update(): void {
        this.updatePlayerEntity();
        this.processNetworkUpdates();
    }

    private updatePlayerEntity(): void {
        const localPlayerId = this.playerEntities.get("localPlayer");
        if (localPlayerId && this.entityController.isOwner) {
            const currentTime = Date.now();
            
            if (currentTime - this.entityController.lastUpdateTime > (1000 / this.entityController.updateRate)) {
                const updateData = {
                    position: this.transform.position,
                    rotation: this.transform.rotation,
                    timestamp: currentTime
                };

                this.entityController.sendEntityUpdate(localPlayerId, updateData);
                this.entityController.lastUpdateTime = currentTime;
            }
        }
    }

    private processNetworkUpdates(): void {
        console.log("Processing network updates");
    }

    public onPlayerJoined(playerId: string): void {
        const playerPosition = new BABYLON.Vector3(
            Math.random() * 10 - 5,
            1,
            Math.random() * 10 - 5
        );

        const entityId = this.entityController.createNetworkEntity(
            "player",
            playerPosition
        );

        this.playerEntities.set(playerId, entityId);
        console.log(`Remote player entity created: ${entityId} for player: ${playerId}`);
    }

    public onPlayerLeft(playerId: string): void {
        const entityId = this.playerEntities.get(playerId);
        if (entityId) {
            this.entityController.destroyNetworkEntity(entityId);
            this.playerEntities.delete(playerId);
            console.log(`Player entity destroyed for: ${playerId}`);
        }
    }
}
```

### Advanced Entity Synchronization
```typescript
class AdvancedEntitySync extends TOOLKIT.ScriptComponent {
    public entityController: TOOLKIT.EntityController = new TOOLKIT.EntityController();
    public syncedEntities: Map<string, any> = new Map();

    protected start(): void {
        this.setupAdvancedSync();
    }

    private setupAdvancedSync(): void {
        this.entityController.syncPosition = true;
        this.entityController.syncRotation = true;
        this.entityController.syncScale = false;
        this.entityController.updateRate = 30;
        this.entityController.interpolationEnabled = true;

        this.createSyncedObjects();
    }

    private createSyncedObjects(): void {
        const objectTypes = ["vehicle", "projectile", "pickup", "npc"];
        
        objectTypes.forEach((type, index) => {
            const position = new BABYLON.Vector3(index * 5, 0, 0);
            const entityId = this.entityController.createNetworkEntity(type, position);
            
            this.syncedEntities.set(entityId, {
                type: type,
                lastSync: Date.now(),
                interpolationData: {
                    startPosition: position.clone(),
                    targetPosition: position.clone(),
                    startRotation: BABYLON.Vector3.Zero(),
                    targetRotation: BABYLON.Vector3.Zero(),
                    startTime: Date.now()
                }
            });
        });

        console.log(`Created ${objectTypes.length} synced entities`);
    }

    protected update(): void {
        this.updateEntityInterpolation();
        this.sendEntityUpdates();
    }

    private updateEntityInterpolation(): void {
        const currentTime = Date.now();
        
        this.syncedEntities.forEach((entityData, entityId) => {
            if (this.entityController.interpolationEnabled) {
                const interpolationData = entityData.interpolationData;
                const elapsed = currentTime - interpolationData.startTime;
                const duration = 1000 / this.entityController.updateRate;
                const t = Math.min(elapsed / duration, 1.0);

                const currentPosition = BABYLON.Vector3.Lerp(
                    interpolationData.startPosition,
                    interpolationData.targetPosition,
                    t
                );

                const currentRotation = BABYLON.Vector3.Lerp(
                    interpolationData.startRotation,
                    interpolationData.targetRotation,
                    t
                );

                this.applyEntityTransform(entityId, currentPosition, currentRotation);
            }
        });
    }

    private sendEntityUpdates(): void {
        const currentTime = Date.now();
        
        this.syncedEntities.forEach((entityData, entityId) => {
            if (this.entityController.isOwner && 
                currentTime - entityData.lastSync > (1000 / this.entityController.updateRate)) {
                
                const updateData = this.gatherEntityData(entityId);
                this.entityController.sendEntityUpdate(entityId, updateData);
                entityData.lastSync = currentTime;
            }
        });
    }

    private gatherEntityData(entityId: string): any {
        const entityData = this.syncedEntities.get(entityId);
        if (!entityData) return null;

        return {
            position: this.getCurrentPosition(entityId),
            rotation: this.getCurrentRotation(entityId),
            velocity: this.getCurrentVelocity(entityId),
            timestamp: Date.now()
        };
    }

    private getCurrentPosition(entityId: string): BABYLON.Vector3 {
        return new BABYLON.Vector3(0, 0, 0);
    }

    private getCurrentRotation(entityId: string): BABYLON.Vector3 {
        return BABYLON.Vector3.Zero();
    }

    private getCurrentVelocity(entityId: string): BABYLON.Vector3 {
        return BABYLON.Vector3.Zero();
    }

    private applyEntityTransform(entityId: string, position: BABYLON.Vector3, rotation: BABYLON.Vector3): void {
        console.log(`Applying transform to entity ${entityId}`);
    }

    public onEntityUpdateReceived(entityId: string, data: any, senderId: string): void {
        this.entityController.receiveEntityUpdate(entityId, data, senderId);
        
        const entityData = this.syncedEntities.get(entityId);
        if (entityData && !this.entityController.isOwner) {
            this.entityController.setInterpolationTarget(
                entityId,
                data.position,
                data.rotation
            );

            entityData.interpolationData.startPosition = this.getCurrentPosition(entityId);
            entityData.interpolationData.targetPosition = data.position;
            entityData.interpolationData.startRotation = this.getCurrentRotation(entityId);
            entityData.interpolationData.targetRotation = data.rotation;
            entityData.interpolationData.startTime = Date.now();
        }
    }

    public transferEntityOwnership(entityId: string, newOwnerId: string): void {
        this.entityController.transferOwnership(entityId, newOwnerId);
        
        const entityData = this.syncedEntities.get(entityId);
        if (entityData) {
            console.log(`Entity ${entityId} ownership transferred to ${newOwnerId}`);
        }
    }
}
```

## Best Practices

1. **Update Rate** - Balance update frequency with network bandwidth requirements
2. **Interpolation** - Use interpolation for smooth movement of non-owned entities
3. **Ownership** - Clearly define ownership rules and transfer mechanisms
4. **Data Compression** - Minimize data sent in updates to reduce network overhead
5. **Prediction** - Implement client-side prediction for responsive gameplay
6. **Conflict Resolution** - Handle ownership conflicts and state inconsistencies gracefully

## Related Classes
- [PrefabObjectPool](PrefabObjectPool.md) - Object pooling system
- [SceneManager](../core/SceneManager.md) - Main scene management class
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
