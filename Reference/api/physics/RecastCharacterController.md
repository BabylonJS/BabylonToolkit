# RecastCharacterController

Navigation mesh-based character controller system that integrates with the Recast/Detour navigation system for AI-driven character movement.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Extends**: `TOOLKIT.ScriptComponent`  
**Copyright**: All rights reserved (c) 2020 Mackey Kinard

## Overview

RecastCharacterController provides character movement that follows navigation meshes using the Recast/Detour pathfinding system. This controller is ideal for AI characters that need to navigate complex environments with obstacles and multiple levels.

## Instance Properties

### Navigation Integration
- **`navigationAgent`** `TOOLKIT.NavigationAgent` - Associated navigation agent for pathfinding

## Navigation Methods

### Navigation Agent Management

#### `getNavigationAgent()`
Gets the associated navigation agent.

**Returns:** `TOOLKIT.NavigationAgent`

#### `setNavigationAgent(agent)`
Sets the navigation agent for pathfinding.

**Parameters:**
- `agent` `TOOLKIT.NavigationAgent` - Navigation agent to associate

#### `setDestinationPoint(destination, closestPoint?)`
Sets the destination point for navigation.

**Parameters:**
- `destination` `BABYLON.Vector3` - Target destination
- `closestPoint?` `boolean` - Whether to use closest point on navmesh

### Character Control Methods

#### `move(velocity, aux?)`
Translates the character with the specified velocity. The aux parameter controls closest point option.

**Parameters:**
- `velocity` `BABYLON.Vector3` - Movement velocity vector
- `aux?` `boolean` - Closest point option

#### `jump(speed)`
Jumps the character with the specified speed.

**Parameters:**
- `speed` `number` - Jump velocity

#### `turn(angle)`
Turns the character to the specified angle.

**Parameters:**
- `angle` `number` - Turn angle in radians

#### `rotate(x, y, z, w)`
Rotates the character to the specified quaternion.

**Parameters:**
- `x` `number` - X component of quaternion
- `y` `number` - Y component of quaternion
- `z` `number` - Z component of quaternion
- `w` `number` - W component of quaternion

#### `set(px, py, pz, rx?, ry?, rz?, rw?, aux?)`
Sets the character position and rotation to the specified values. The aux parameter controls closest point option.

**Parameters:**
- `px` `number` - X position
- `py` `number` - Y position
- `pz` `number` - Z position
- `rx?` `number` - X rotation (optional)
- `ry?` `number` - Y rotation (optional)
- `rz?` `number` - Z rotation (optional)
- `rw?` `number` - W rotation (optional)
- `aux?` `boolean` - Closest point option

## Usage Examples

### Basic Navigation Setup
```typescript
const recastController = new TOOLKIT.RecastCharacterController(transform, scene);

const navAgent = new TOOLKIT.NavigationAgent(transform, scene);
navAgent.speed = 3.5;
navAgent.angularSpeed = 120;
navAgent.acceleration = 8.0;
navAgent.stoppingDistance = 0.5;

recastController.setNavigationAgent(navAgent);
```

### AI Character Navigation
```typescript
const targetPosition = new BABYLON.Vector3(10, 0, 15);
recastController.setDestinationPoint(targetPosition, true);
```

### Patrol Behavior
```typescript
class PatrolBehavior {
    private patrolPoints: BABYLON.Vector3[];
    private currentPatrolIndex: number = 0;
    private waitTime: number = 2.0;
    private currentWaitTime: number = 0;
    
    constructor(
        private controller: TOOLKIT.RecastCharacterController,
        patrolPoints: BABYLON.Vector3[]
    ) {
        this.patrolPoints = patrolPoints;
        this.startPatrol();
    }
    
    startPatrol() {
        if (this.patrolPoints.length > 0) {
            this.controller.setDestinationPoint(this.patrolPoints[0], true);
        }
    }
    
    update() {
        const navAgent = this.controller.getNavigationAgent();
        
        if (navAgent.hasReachedDestination()) {
            this.currentWaitTime += scene.getEngine().getDeltaTime() / 1000.0;
            
            if (this.currentWaitTime >= this.waitTime) {
                this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
                this.controller.setDestinationPoint(this.patrolPoints[this.currentPatrolIndex], true);
                this.currentWaitTime = 0;
            }
        }
    }
}

const patrolPoints = [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(10, 0, 0),
    new BABYLON.Vector3(10, 0, 10),
    new BABYLON.Vector3(0, 0, 10)
];

const patrolBehavior = new PatrolBehavior(recastController, patrolPoints);
```

## Related Classes
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
- [NavigationAgent](../navigation/NavigationAgent.md) - Navigation pathfinding system
- [CharacterController](CharacterController.md) - Physics-based character controller
- [SimpleCharacterController](SimpleCharacterController.md) - Non-physics character controller
