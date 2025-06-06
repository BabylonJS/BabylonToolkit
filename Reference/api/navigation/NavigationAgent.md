# NavigationAgent

Unity-style navigation agent system for AI pathfinding and movement using Recast/Detour navigation meshes.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Extends**: `TOOLKIT.ScriptComponent`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

NavigationAgent provides a comprehensive navigation system similar to Unity's NavMeshAgent. It integrates with Recast/Detour navigation meshes to provide intelligent pathfinding, obstacle avoidance, and crowd simulation for AI characters.

## Static Properties

### Configuration Constants
- **`TARGET_ANGLE_FACTOR`** `number` - Factor for target angle calculations
- **`ANGULAR_SPEED_RATIO`** `number` - Ratio for angular speed calculations
- **`GLOBAL_CROWD_INSTANCE`** `boolean` - Use global crowd instance for all agents

## Instance Properties

### Movement Configuration
- **`heightOffset`** `number` - Height offset from navigation mesh surface
- **`angularSpeed`** `number` - Angular rotation speed in degrees per second
- **`updatePosition`** `boolean` - Whether to automatically update transform position
- **`updateRotation`** `boolean` - Whether to automatically update transform rotation
- **`distanceEpsilon`** `number` - Distance threshold for reaching destinations
- **`velocityEpsilon`** `number` - Velocity threshold for stopping
- **`offMeshVelocity`** `number` - Velocity when traversing off-mesh links
- **`stoppingDistance`** `number` - Distance from target to stop moving

## Observables

### Event Handlers
- **`onReadyObservable`** `BABYLON.Observable<BABYLON.TransformNode>` - Triggered when agent is ready for navigation
- **`onPreUpdateObservable`** `BABYLON.Observable<BABYLON.TransformNode>` - Triggered before navigation update
- **`onPostUpdateObservable`** `BABYLON.Observable<BABYLON.TransformNode>` - Triggered after navigation update
- **`onNavCompleteObservable`** `BABYLON.Observable<BABYLON.TransformNode>` - Triggered when navigation is complete

## State Query Methods

### Agent Status

#### `isReady()`
Check if the navigation agent is ready for pathfinding.

**Returns:** `boolean` - True if agent is initialized and ready

#### `isNavigating()`
Check if the agent is currently navigating to a destination.

**Returns:** `boolean` - True if agent is moving to a target

#### `isTeleporting()`
Check if the agent is currently teleporting.

**Returns:** `boolean` - True if agent is in teleport state

#### `isOnOffMeshLink()`
Check if the agent is currently traversing an off-mesh link.

**Returns:** `boolean` - True if on off-mesh link

### Agent Information

#### `getAgentType()`
Get the agent type identifier.

**Returns:** `number` - Agent type ID

#### `getAgentState()`
Get the current agent state.

**Returns:** `number` - Current state (see CrowdAgentState enum)

#### `getAgentIndex()`
Get the agent index in the crowd system.

**Returns:** `number` - Agent index

#### `getAgentOffset()`
Get the agent height offset from navigation mesh.

**Returns:** `number` - Height offset value

#### `getTargetDistance()`
Get the distance to the current target destination.

**Returns:** `number` - Distance to target in world units

## Position and Movement

### Current State

#### `getCurrentPosition()`
Get the agent's current world position.

**Returns:** `BABYLON.Vector3` - Current world position

#### `getCurrentRotation()`
Get the agent's current world rotation.

**Returns:** `BABYLON.Quaternion` - Current world rotation

#### `getCurrentVelocity()`
Get the agent's current velocity vector.

**Returns:** `BABYLON.Vector3` - Current velocity

#### `getAgentVelocity()`
Get the agent's current world space velocity.

**Returns:** `BABYLON.Vector3` - World space velocity

#### `getAgentVelocityToRef(result)`
Get the agent's current world space velocity to a result vector.

**Parameters:**
- `result` `BABYLON.Vector3` - Result vector to store velocity

#### `getAgentPosition()`
Get the agent's current world space position.

**Returns:** `BABYLON.Vector3` - World space position

#### `getAgentPositionToRef(result)`
Get the agent's current world space position to a result vector.

**Parameters:**
- `result` `BABYLON.Vector3` - Result vector to store position

#### `getAgentWaypoint()`
Get the agent's current waypoint position.

**Returns:** `BABYLON.Vector3` - Current waypoint position

#### `getAgentWaypointToRef(result)`
Get the agent's current waypoint position to a result vector.

**Parameters:**
- `result` `BABYLON.Vector3` - Result vector to store waypoint

## Movement Commands

### Navigation Control

#### `move(offset, closetPoint?)`
Move agent relative to current position.

**Parameters:**
- `offset` `BABYLON.Vector3` - Relative movement offset
- `closetPoint?` `boolean` - Snap to closest point on navmesh

#### `teleport(destination, closetPoint?)`
Teleport agent to destination point.

**Parameters:**
- `destination` `BABYLON.Vector3` - Target destination
- `closetPoint?` `boolean` - Snap to closest point on navmesh

#### `setDestination(destination, closetPoint?)`
Set agent's current destination point.

**Parameters:**
- `destination` `BABYLON.Vector3` - Target destination
- `closetPoint?` `boolean` - Snap to closest point on navmesh

#### `cancelNavigation()`
Cancel current waypoint path navigation.

## Agent Configuration

### Movement Parameters

#### `setAcceleration(speed)`
Set agent's current acceleration speed.

**Parameters:**
- `speed` `number` - Acceleration value

#### `setMovementSpeed(speed)`
Set agent's current movement speed.

**Parameters:**
- `speed` `number` - Movement speed value

#### `setSeparationWeight(weight)`
Set agent's current separation weight for collision avoidance.

**Parameters:**
- `weight` `number` - Separation weight (how aggressive collision avoidance should be)

#### `setOptimizationRange(range)`
Set agent's current path optimization range.

**Parameters:**
- `range` `number` - Path visibility optimization range (larger values allow shortcuts)

#### `setCollisionQueryRange(range)`
Set agent's current collision query range.

**Parameters:**
- `range` `number` - Collision element detection range for steering behaviors

### Physical Properties

#### `setAgentRadius(radius)`
Set agent's current radius.

**Parameters:**
- `radius` `number` - Agent radius

#### `setAgentHeight(height)`
Set agent's current height.

**Parameters:**
- `height` `number` - Agent height

## Advanced Configuration

### Agent Parameters

#### `getAgentParameters()`
Get the current agent parameters configuration.

**Returns:** `BABYLON.IAgentParameters` - Current agent parameters

#### `setAgentParameters(parameters)`
Set the agent parameters configuration.

**Parameters:**
- `parameters` `BABYLON.IAgentParameters` - New agent parameters

## Lifecycle Methods

### Component Lifecycle

#### `awake()`
Called when the component is first created. Initializes the navigation agent.

**Protected method** - Override in derived classes

#### `update()`
Called every frame during the update loop. Updates navigation and movement.

**Protected method** - Override in derived classes

#### `destroy()`
Called when the component is being destroyed. Cleans up navigation resources.

**Protected method** - Override in derived classes

## Usage Examples

### Basic Navigation Setup
```typescript
// Get navigation agent component
const agent = TOOLKIT.SceneManager.GetComponent(enemyTransform, "TOOLKIT.NavigationAgent");

// Configure agent properties
agent.angularSpeed = 180; // degrees per second
agent.stoppingDistance = 1.0;
agent.heightOffset = 0.1;

// Set up event handlers
agent.onReadyObservable.add(() => {
    console.log("Navigation agent is ready");
});

agent.onNavCompleteObservable.add(() => {
    console.log("Navigation complete");
});
```

### Movement Control
```typescript
// Set destination
const targetPosition = new BABYLON.Vector3(10, 0, 5);
agent.setDestination(targetPosition, true);

// Move relative to current position
const offset = new BABYLON.Vector3(2, 0, 0);
agent.move(offset);

// Teleport to position
agent.teleport(spawnPoint, true);

// Cancel current navigation
agent.cancelNavigation();
```

### Agent Configuration
```typescript
// Configure movement parameters
agent.setMovementSpeed(5.0);
agent.setAcceleration(8.0);
agent.setAgentRadius(0.5);
agent.setAgentHeight(2.0);

// Configure avoidance behavior
agent.setSeparationWeight(2.0);
agent.setCollisionQueryRange(3.0);
agent.setOptimizationRange(10.0);
```

### State Monitoring
```typescript
// Check agent status
if (agent.isReady()) {
    if (agent.isNavigating()) {
        const distance = agent.getTargetDistance();
        console.log(`Distance to target: ${distance}`);
        
        const velocity = agent.getCurrentVelocity();
        console.log(`Current velocity: ${velocity.length()}`);
    }
    
    if (agent.isOnOffMeshLink()) {
        console.log("Agent is traversing off-mesh link");
    }
}
```

### Advanced Parameter Configuration
```typescript
// Get current parameters
const params = agent.getAgentParameters();

// Modify parameters
params.maxSpeed = 10.0;
params.maxAcceleration = 15.0;
params.radius = 0.6;
params.height = 1.8;
params.separationWeight = 1.5;

// Apply modified parameters
agent.setAgentParameters(params);
```

### Event-Driven Navigation
```typescript
class AIController extends TOOLKIT.ScriptComponent {
    private agent: TOOLKIT.NavigationAgent;
    private patrolPoints: BABYLON.Vector3[];
    private currentPatrolIndex: number = 0;

    protected awake(): void {
        this.agent = TOOLKIT.SceneManager.GetComponent(this.transform, "TOOLKIT.NavigationAgent");
        
        // Set up patrol points
        this.patrolPoints = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(10, 0, 0),
            new BABYLON.Vector3(10, 0, 10),
            new BABYLON.Vector3(0, 0, 10)
        ];

        // Handle navigation completion
        this.agent.onNavCompleteObservable.add(() => {
            this.moveToNextPatrolPoint();
        });

        // Start patrolling when ready
        this.agent.onReadyObservable.add(() => {
            this.startPatrol();
        });
    }

    private startPatrol(): void {
        if (this.patrolPoints.length > 0) {
            this.agent.setDestination(this.patrolPoints[0]);
        }
    }

    private moveToNextPatrolPoint(): void {
        this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
        this.agent.setDestination(this.patrolPoints[this.currentPatrolIndex]);
    }
}
```

## Crowd Agent States

The navigation system uses the following agent states:

### CrowdAgentState Enum
- **`DT_CROWDAGENT_STATE_INVALID`** `0` - The agent is not in a valid state
- **`DT_CROWDAGENT_STATE_WALKING`** `1` - The agent is traversing a normal navigation mesh polygon
- **`DT_CROWDAGENT_STATE_OFFMESH`** `2` - The agent is traversing an off-mesh connection

## Performance Considerations

1. **Global Crowd Instance**: Use `GLOBAL_CROWD_INSTANCE` for better performance with many agents
2. **Update Frequency**: Disable `updatePosition` or `updateRotation` if manual control is needed
3. **Collision Query Range**: Keep reasonable values to balance performance and accuracy
4. **Agent Count**: Monitor performance with large numbers of agents

## Related Classes
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
- [RecastJSPluginExtension](RecastJSPluginExtension.md) - Navigation mesh plugin
- [RecastJSCrowdExtension](RecastJSCrowdExtension.md) - Crowd simulation system
- [CharacterController](../physics/CharacterController.md) - Character movement
- [SceneManager](../core/SceneManager.md) - Scene management utilities
