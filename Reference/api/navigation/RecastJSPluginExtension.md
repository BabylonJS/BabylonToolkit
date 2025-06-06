# RecastJSPluginExtension

Extended Recast navigation plugin supporting multiple navigation meshes and advanced pathfinding features.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Implements**: `BABYLON.INavigationEnginePlugin`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

RecastJSPluginExtension extends the standard Babylon.js Recast plugin to support multiple navigation meshes, worker-based mesh generation, and advanced crowd simulation features. It provides comprehensive pathfinding and navigation capabilities.

## Instance Properties

### Core Properties
- **`bjsRECAST`** `any` - Reference to the Recast library
- **`name`** `string` - Plugin name identifier
- **`navMesh`** `any` - The active navigation mesh
- **`navMeshes`** `any[]` - Array of all navigation meshes

### Configuration
- **`timeFactor`** `number` - Time factor for crowd agent updates (default 1)

## Navigation Mesh Management

### Mesh Creation

#### `createNavMesh(meshes, parameters, completion?)`
Creates and activates a new navigation mesh.

**Parameters:**
- `meshes` `Array<BABYLON.Mesh>` - Geometry for navigation mesh computation
- `parameters` `BABYLON.INavMeshParameters` - Navigation mesh parameters
- `completion?` `(navmeshData: Uint8Array) => void` - Completion callback

**Returns:** `number` - Navigation mesh index

#### `buildFromNavmeshData(data)`
Builds and activates a navigation mesh from previously saved state.

**Parameters:**
- `data` `Uint8Array` - Navigation mesh data

**Returns:** `number` - Navigation mesh index

#### `getNavmeshData()`
Returns the navigation mesh data for saving and reuse.

**Returns:** `Uint8Array`

### Mesh Access

#### `setActiveNavMesh(index)`
Sets the active navigation mesh by index.

**Parameters:**
- `index` `number` - Navigation mesh index

**Returns:** `boolean` - Success status

#### `getActiveNavMesh()`
Gets the currently active navigation mesh.

**Returns:** `any`

#### `getIndexedNavMesh(index)`
Gets a navigation mesh by index.

**Parameters:**
- `index` `number` - Navigation mesh index

**Returns:** `any`

#### `getNavMeshCount()`
Gets the total number of navigation meshes.

**Returns:** `number`

#### `getNavMeshArray()`
Gets the navigation mesh array.

**Returns:** `any[]`

## Pathfinding Methods

### Point Queries

#### `getClosestPoint(position)`
Gets a navigation mesh constrained position, closest to the parameter position.

**Parameters:**
- `position` `BABYLON.Vector3` - World position

**Returns:** `BABYLON.Vector3`

#### `getClosestPointToRef(position, result)`
Gets a navigation mesh constrained position using a reference vector.

**Parameters:**
- `position` `BABYLON.Vector3` - World position
- `result` `BABYLON.Vector3` - Output result vector

#### `getRandomPointAround(position, maxRadius)`
Gets a random navigation mesh constrained position within a radius.

**Parameters:**
- `position` `BABYLON.Vector3` - Center position
- `maxRadius` `number` - Maximum distance

**Returns:** `BABYLON.Vector3`

#### `getRandomPointAroundToRef(position, maxRadius, result)`
Gets a random point around position using a reference vector.

**Parameters:**
- `position` `BABYLON.Vector3` - Center position
- `maxRadius` `number` - Maximum distance
- `result` `BABYLON.Vector3` - Output result vector

### Path Computation

#### `computePath(start, end)`
Computes a straight navigation path from start to end.

**Parameters:**
- `start` `BABYLON.Vector3` - Start position
- `end` `BABYLON.Vector3` - End position

**Returns:** `BABYLON.Vector3[]` - Path points array

#### `computePathSmooth(start, end)`
Computes a smooth navigation path following mesh geometry.

**Parameters:**
- `start` `BABYLON.Vector3` - Start position
- `end` `BABYLON.Vector3` - End position

**Returns:** `BABYLON.Vector3[]` - Path points array

#### `moveAlong(position, destination)`
Computes the final position from a segment made of destination-position.

**Parameters:**
- `position` `BABYLON.Vector3` - Current position
- `destination` `BABYLON.Vector3` - Target destination

**Returns:** `BABYLON.Vector3`

#### `moveAlongToRef(position, destination, result)`
Computes movement along navmesh using a reference vector.

**Parameters:**
- `position` `BABYLON.Vector3` - Current position
- `destination` `BABYLON.Vector3` - Target destination
- `result` `BABYLON.Vector3` - Output result vector

## Crowd Simulation

#### `createCrowd(maxAgents, maxAgentRadius, scene)`
Creates a new crowd for agent simulation.

**Parameters:**
- `maxAgents` `number` - Maximum agent count
- `maxAgentRadius` `number` - Maximum agent radius
- `scene` `BABYLON.Scene` - Scene reference

**Returns:** `BABYLON.ICrowd`

## Obstacle Management

#### `addCylinderObstacle(position, radius, height)`
Creates a cylinder obstacle and adds it to navigation.

**Parameters:**
- `position` `BABYLON.Vector3` - Obstacle position
- `radius` `number` - Cylinder radius
- `height` `number` - Cylinder height

**Returns:** `BABYLON.IObstacle`

#### `addBoxObstacle(position, extent, angle)`
Creates an oriented box obstacle and adds it to navigation.

**Parameters:**
- `position` `BABYLON.Vector3` - Obstacle position
- `extent` `BABYLON.Vector3` - Box dimensions
- `angle` `number` - Rotation angle in radians

**Returns:** `BABYLON.IObstacle`

#### `removeObstacle(obstacle)`
Removes an obstacle from navigation.

**Parameters:**
- `obstacle` `BABYLON.IObstacle` - Obstacle to remove

## Configuration Methods

### Worker Configuration

#### `setWorkerURL(workerURL)`
Sets worker URL for navigation mesh generation.

**Parameters:**
- `workerURL` `string | URL` - Worker URL

**Returns:** `boolean` - Worker creation success

### Timing Configuration

#### `setTimeStep(newTimeStep?)`
Sets the time step for navigation tick updates.

**Parameters:**
- `newTimeStep?` `number` - New timestep (default 1/60)

#### `getTimeStep()`
Gets the current time step.

**Returns:** `number`

#### `setMaximumSubStepCount(newStepCount?)`
Sets maximum sub-iterations per navigation tick.

**Parameters:**
- `newStepCount?` `number` - Maximum iterations (0 = unlimited)

#### `getMaximumSubStepCount()`
Gets the maximum sub-step count.

**Returns:** `number`

### Query Configuration

#### `setDefaultQueryExtent(extent)`
Sets the bounding box extent for spatial queries.

**Parameters:**
- `extent` `BABYLON.Vector3` - Query extent values

#### `getDefaultQueryExtent()`
Gets the default query extent.

**Returns:** `BABYLON.Vector3`

#### `getDefaultQueryExtentToRef(result)`
Gets the default query extent using a reference vector.

**Parameters:**
- `result` `BABYLON.Vector3` - Output result vector

### Random Seed

#### `getRandomSeed()`
Returns the seed used for randomized functions.

**Returns:** `number`

#### `setRandomSeed(seed)`
Sets the seed for randomized functions.

**Parameters:**
- `seed` `number` - Random seed value

## Debug and Utility

#### `createDebugNavMesh(scene)`
Creates a navigation mesh debug visualization.

**Parameters:**
- `scene` `BABYLON.Scene` - Scene for debug mesh

**Returns:** `BABYLON.Mesh`

#### `isSupported()`
Checks if the plugin is supported.

**Returns:** `boolean`

#### `dispose()`
Disposes the plugin and releases resources.

## Usage Examples

### Basic Navigation Setup
```typescript
const recastPlugin = new TOOLKIT.RecastJSPluginExtension();

const navMeshParameters = {
    cs: 0.2,
    ch: 0.2,
    walkableSlopeAngle: 35,
    walkableHeight: 1,
    walkableClimb: 1,
    walkableRadius: 1,
    maxEdgeLen: 12,
    maxSimplificationError: 1.3,
    minRegionArea: 8,
    mergeRegionArea: 20,
    maxVertsPerPoly: 6,
    detailSampleDist: 6,
    detailSampleMaxError: 1
};

const groundMeshes = scene.meshes.filter(mesh => mesh.name.includes("ground"));
const navMeshIndex = recastPlugin.createNavMesh(groundMeshes, navMeshParameters);
```

### Multiple Navigation Meshes
```typescript
const indoorMeshes = scene.meshes.filter(mesh => mesh.name.includes("indoor"));
const outdoorMeshes = scene.meshes.filter(mesh => mesh.name.includes("outdoor"));

const indoorNavMesh = recastPlugin.createNavMesh(indoorMeshes, navMeshParameters);
const outdoorNavMesh = recastPlugin.createNavMesh(outdoorMeshes, navMeshParameters);

recastPlugin.setActiveNavMesh(indoorNavMesh);

console.log(`Total navigation meshes: ${recastPlugin.getNavMeshCount()}`);
```

### Pathfinding
```typescript
const startPos = new BABYLON.Vector3(0, 0, 0);
const endPos = new BABYLON.Vector3(10, 0, 10);

const straightPath = recastPlugin.computePath(startPos, endPos);
const smoothPath = recastPlugin.computePathSmooth(startPos, endPos);

console.log(`Straight path has ${straightPath.length} points`);
console.log(`Smooth path has ${smoothPath.length} points`);

const closestPoint = recastPlugin.getClosestPoint(startPos);
const randomPoint = recastPlugin.getRandomPointAround(startPos, 5.0);
```

### Crowd Simulation
```typescript
const crowd = recastPlugin.createCrowd(50, 0.5, scene);

const agentParams = {
    radius: 0.5,
    height: 2.0,
    maxAcceleration: 4.0,
    maxSpeed: 3.5,
    collisionQueryRange: 0.5,
    pathOptimizationRange: 0.0,
    separationWeight: 1.0
};

for (let i = 0; i < 10; i++) {
    const startPosition = recastPlugin.getRandomPointAround(BABYLON.Vector3.Zero(), 10);
    const agentIndex = crowd.addAgent(startPosition, agentParams, scene.createTransformNode(`agent_${i}`));
    
    const targetPosition = recastPlugin.getRandomPointAround(BABYLON.Vector3.Zero(), 15);
    crowd.agentGoto(agentIndex, targetPosition);
}
```

### Dynamic Obstacles
```typescript
const cylinderObstacle = recastPlugin.addCylinderObstacle(
    new BABYLON.Vector3(5, 0, 5),
    1.0,
    2.0
);

const boxObstacle = recastPlugin.addBoxObstacle(
    new BABYLON.Vector3(-5, 0, -5),
    new BABYLON.Vector3(2, 1, 2),
    Math.PI / 4
);

setTimeout(() => {
    recastPlugin.removeObstacle(cylinderObstacle);
    recastPlugin.removeObstacle(boxObstacle);
}, 10000);
```

### Worker-based Generation
```typescript
recastPlugin.setWorkerURL("./recast.worker.js");

const navMeshIndex = recastPlugin.createNavMesh(groundMeshes, navMeshParameters, (navmeshData) => {
    console.log("Navigation mesh generated by worker");
    console.log(`Data size: ${navmeshData.length} bytes`);
    
    localStorage.setItem("navmesh_data", JSON.stringify(Array.from(navmeshData)));
});
```

## Related Classes
- [RecastJSCrowdExtension](RecastJSCrowdExtension.md) - Crowd simulation extension
- [NavigationAgent](NavigationAgent.md) - Navigation agent system
- [RecastCharacterController](../physics/RecastCharacterController.md) - Navigation-based character controller
