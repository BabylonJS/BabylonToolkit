# TriggerVolume

Trigger volume detection system for handling spatial events and collision detection without physical response.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

TriggerVolume provides a spatial event system that detects when objects enter, stay within, or exit defined volumes without causing physical collisions. It's commonly used for gameplay events, area detection, and interactive zones.

## Properties

### Volume Configuration
- **`volumeShape`** `string` - Shape of the trigger volume ("box", "sphere", "capsule")
- **`size`** `BABYLON.Vector3` - Dimensions of the trigger volume
- **`center`** `BABYLON.Vector3` - Center position of the trigger volume
- **`enabled`** `boolean` - Whether the trigger volume is active

### Detection Settings
- **`detectPlayers`** `boolean` - Whether to detect player objects
- **`detectEnemies`** `boolean` - Whether to detect enemy objects
- **`detectProjectiles`** `boolean` - Whether to detect projectile objects
- **`triggerOnce`** `boolean` - Whether the trigger fires only once

### Event Callbacks
- **`onTriggerEnter`** `(other: BABYLON.AbstractMesh) => void` - Called when object enters volume
- **`onTriggerStay`** `(other: BABYLON.AbstractMesh) => void` - Called while object remains in volume
- **`onTriggerExit`** `(other: BABYLON.AbstractMesh) => void` - Called when object exits volume

## Methods

### Volume Management

#### `createTriggerVolume(shape, size, position)`
Creates a new trigger volume with the specified parameters.

**Parameters:**
- `shape` `string` - Shape type for the volume
- `size` `BABYLON.Vector3` - Size dimensions
- `position` `BABYLON.Vector3` - Position in world space

#### `setTriggerCallbacks(onEnter, onStay, onExit)`
Sets the callback functions for trigger events.

**Parameters:**
- `onEnter` `(other: BABYLON.AbstractMesh) => void` - Enter callback
- `onStay` `(other: BABYLON.AbstractMesh) => void` - Stay callback
- `onExit` `(other: BABYLON.AbstractMesh) => void` - Exit callback

### Detection Control

#### `enableTrigger(enabled)`
Enables or disables the trigger volume.

**Parameters:**
- `enabled` `boolean` - Whether to enable the trigger

#### `setDetectionFilters(players, enemies, projectiles)`
Configures what types of objects the trigger detects.

**Parameters:**
- `players` `boolean` - Detect player objects
- `enemies` `boolean` - Detect enemy objects
- `projectiles` `boolean` - Detect projectile objects

## Usage Examples

### Basic Trigger Volume Setup
```typescript
class BasicTriggerSystem extends TOOLKIT.ScriptComponent {
    public triggerVolume: TOOLKIT.TriggerVolume;

    protected start(): void {
        this.setupTriggerVolume();
    }

    private setupTriggerVolume(): void {
        this.triggerVolume = new TOOLKIT.TriggerVolume();
        
        this.triggerVolume.createTriggerVolume(
            "box",
            new BABYLON.Vector3(5, 3, 5),
            new BABYLON.Vector3(0, 1.5, 0)
        );

        this.triggerVolume.setTriggerCallbacks(
            (other) => this.onObjectEnter(other),
            (other) => this.onObjectStay(other),
            (other) => this.onObjectExit(other)
        );

        this.triggerVolume.setDetectionFilters(true, true, false);
        this.triggerVolume.enableTrigger(true);

        console.log("Basic trigger volume setup complete");
    }

    private onObjectEnter(other: BABYLON.AbstractMesh): void {
        console.log(`Object entered trigger: ${other.name}`);
    }

    private onObjectStay(other: BABYLON.AbstractMesh): void {
        console.log(`Object staying in trigger: ${other.name}`);
    }

    private onObjectExit(other: BABYLON.AbstractMesh): void {
        console.log(`Object exited trigger: ${other.name}`);
    }
}
```

### Advanced Trigger System
```typescript
class AdvancedTriggerSystem extends TOOLKIT.ScriptComponent {
    public triggerZones: Map<string, TOOLKIT.TriggerVolume> = new Map();
    public playerInZones: Set<string> = new Set();

    protected start(): void {
        this.setupMultipleTriggerZones();
    }

    private setupMultipleTriggerZones(): void {
        this.createCheckpointTrigger();
        this.createDangerZoneTrigger();
        this.createCollectibleTrigger();
        this.createTeleportTrigger();
    }

    private createCheckpointTrigger(): void {
        const checkpointTrigger = new TOOLKIT.TriggerVolume();
        checkpointTrigger.createTriggerVolume(
            "sphere",
            new BABYLON.Vector3(3, 3, 3),
            new BABYLON.Vector3(10, 0, 0)
        );

        checkpointTrigger.setTriggerCallbacks(
            (other) => this.onCheckpointEnter(other),
            null,
            null
        );

        checkpointTrigger.triggerOnce = true;
        checkpointTrigger.setDetectionFilters(true, false, false);
        checkpointTrigger.enableTrigger(true);

        this.triggerZones.set("checkpoint", checkpointTrigger);
    }

    private createDangerZoneTrigger(): void {
        const dangerTrigger = new TOOLKIT.TriggerVolume();
        dangerTrigger.createTriggerVolume(
            "box",
            new BABYLON.Vector3(8, 2, 8),
            new BABYLON.Vector3(-10, 1, 0)
        );

        dangerTrigger.setTriggerCallbacks(
            (other) => this.onDangerZoneEnter(other),
            (other) => this.onDangerZoneStay(other),
            (other) => this.onDangerZoneExit(other)
        );

        dangerTrigger.setDetectionFilters(true, false, false);
        dangerTrigger.enableTrigger(true);

        this.triggerZones.set("danger", dangerTrigger);
    }

    private createCollectibleTrigger(): void {
        const collectibleTrigger = new TOOLKIT.TriggerVolume();
        collectibleTrigger.createTriggerVolume(
            "sphere",
            new BABYLON.Vector3(2, 2, 2),
            new BABYLON.Vector3(0, 0, 10)
        );

        collectibleTrigger.setTriggerCallbacks(
            (other) => this.onCollectibleTouch(other),
            null,
            null
        );

        collectibleTrigger.triggerOnce = true;
        collectibleTrigger.setDetectionFilters(true, false, false);
        collectibleTrigger.enableTrigger(true);

        this.triggerZones.set("collectible", collectibleTrigger);
    }

    private createTeleportTrigger(): void {
        const teleportTrigger = new TOOLKIT.TriggerVolume();
        teleportTrigger.createTriggerVolume(
            "capsule",
            new BABYLON.Vector3(2, 4, 2),
            new BABYLON.Vector3(0, 0, -10)
        );

        teleportTrigger.setTriggerCallbacks(
            (other) => this.onTeleportEnter(other),
            null,
            null
        );

        teleportTrigger.setDetectionFilters(true, false, false);
        teleportTrigger.enableTrigger(true);

        this.triggerZones.set("teleport", teleportTrigger);
    }

    private onCheckpointEnter(other: BABYLON.AbstractMesh): void {
        console.log("Checkpoint reached!");
        this.savePlayerProgress();
    }

    private onDangerZoneEnter(other: BABYLON.AbstractMesh): void {
        console.log("Entered danger zone!");
        this.playerInZones.add("danger");
        this.startDamageOverTime();
    }

    private onDangerZoneStay(other: BABYLON.AbstractMesh): void {
        if (this.playerInZones.has("danger")) {
            this.applyDamageOverTime();
        }
    }

    private onDangerZoneExit(other: BABYLON.AbstractMesh): void {
        console.log("Exited danger zone!");
        this.playerInZones.delete("danger");
        this.stopDamageOverTime();
    }

    private onCollectibleTouch(other: BABYLON.AbstractMesh): void {
        console.log("Collectible obtained!");
        this.collectItem();
        this.triggerZones.get("collectible")?.enableTrigger(false);
    }

    private onTeleportEnter(other: BABYLON.AbstractMesh): void {
        console.log("Teleporting player!");
        this.teleportPlayer(new BABYLON.Vector3(20, 0, 0));
    }

    private savePlayerProgress(): void {
        console.log("Player progress saved");
    }

    private startDamageOverTime(): void {
        console.log("Damage over time started");
    }

    private applyDamageOverTime(): void {
        console.log("Applying damage over time");
    }

    private stopDamageOverTime(): void {
        console.log("Damage over time stopped");
    }

    private collectItem(): void {
        console.log("Item collected and added to inventory");
    }

    private teleportPlayer(destination: BABYLON.Vector3): void {
        console.log(`Player teleported to: ${destination}`);
    }

    public enableZone(zoneName: string, enabled: boolean): void {
        const zone = this.triggerZones.get(zoneName);
        if (zone) {
            zone.enableTrigger(enabled);
            console.log(`Zone '${zoneName}' ${enabled ? "enabled" : "disabled"}`);
        }
    }

    public isPlayerInZone(zoneName: string): boolean {
        return this.playerInZones.has(zoneName);
    }
}
```

## Best Practices

1. **Performance** - Use appropriate trigger shapes and sizes to minimize unnecessary checks
2. **Event Handling** - Implement proper cleanup in exit callbacks to prevent memory leaks
3. **Filter Configuration** - Set detection filters to only check relevant object types
4. **Trigger Once** - Use triggerOnce for one-time events like checkpoints or collectibles
5. **Visual Debug** - Provide visual indicators for trigger volumes during development
6. **State Management** - Track trigger states properly to handle complex interactions

## Related Classes
- [RaycastHitResult](RaycastHitResult.md) - Raycast result container
- [RigidbodyPhysics](../physics/RigidbodyPhysics.md) - Physics system
- [SceneManager](../core/SceneManager.md) - Main scene management class
