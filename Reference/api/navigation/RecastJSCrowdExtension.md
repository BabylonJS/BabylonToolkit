# RecastJSCrowdExtension

Extended crowd simulation system implementing multiple navigation meshes and advanced agent behaviors.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Implements**: `BABYLON.ICrowd`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

RecastJSCrowdExtension provides advanced crowd simulation capabilities with support for multiple navigation meshes, complex agent behaviors, and optimized performance for large numbers of agents.

## Instance Properties

### Core Properties
- **`recastPlugin`** `TOOLKIT.RecastJSPluginExtension` - Associated Recast plugin

## Usage Examples

### Basic Crowd Setup
```typescript
const recastPlugin = new TOOLKIT.RecastJSPluginExtension();
const crowd = new TOOLKIT.RecastJSCrowdExtension(recastPlugin);

const maxAgents = 100;
const maxAgentRadius = 0.6;

crowd.initialize(maxAgents, maxAgentRadius, scene);
```

### Agent Management
```typescript
const agentParams = {
    radius: 0.5,
    height: 2.0,
    maxAcceleration: 4.0,
    maxSpeed: 3.5,
    collisionQueryRange: 0.5,
    pathOptimizationRange: 0.0,
    separationWeight: 1.0,
    obstacleAvoidanceType: 3,
    queryFilterType: 0
};

const agentTransform = scene.createTransformNode("crowdAgent");
const agentIndex = crowd.addAgent(startPosition, agentParams, agentTransform);

const targetPosition = new BABYLON.Vector3(10, 0, 10);
crowd.agentGoto(agentIndex, targetPosition);
```

### Multi-Level Navigation
```typescript
const groundFloorNavMesh = 0;
const secondFloorNavMesh = 1;

crowd.setActiveNavMesh(groundFloorNavMesh);

const groundAgents = [];
for (let i = 0; i < 20; i++) {
    const agent = crowd.addAgent(groundStartPos, agentParams, agentTransform);
    groundAgents.push(agent);
}

crowd.setActiveNavMesh(secondFloorNavMesh);

const secondFloorAgents = [];
for (let i = 0; i < 15; i++) {
    const agent = crowd.addAgent(secondFloorStartPos, agentParams, agentTransform);
    secondFloorAgents.push(agent);
}
```

### Advanced Agent Behaviors
```typescript
class CrowdManager {
    private crowd: TOOLKIT.RecastJSCrowdExtension;
    private agents: Map<number, AgentData> = new Map();
    
    constructor(crowd: TOOLKIT.RecastJSCrowdExtension) {
        this.crowd = crowd;
    }
    
    createPatrolAgent(patrolPoints: BABYLON.Vector3[]) {
        const agentIndex = this.crowd.addAgent(patrolPoints[0], agentParams, agentTransform);
        
        this.agents.set(agentIndex, {
            type: "patrol",
            patrolPoints: patrolPoints,
            currentPatrolIndex: 0,
            waitTime: 2.0,
            currentWaitTime: 0
        });
        
        return agentIndex;
    }
    
    createFollowerAgent(targetAgent: number) {
        const targetPos = this.crowd.getAgentPosition(targetAgent);
        const agentIndex = this.crowd.addAgent(targetPos, agentParams, agentTransform);
        
        this.agents.set(agentIndex, {
            type: "follower",
            targetAgent: targetAgent,
            followDistance: 3.0
        });
        
        return agentIndex;
    }
    
    update() {
        this.agents.forEach((agentData, agentIndex) => {
            switch (agentData.type) {
                case "patrol":
                    this.updatePatrolAgent(agentIndex, agentData);
                    break;
                case "follower":
                    this.updateFollowerAgent(agentIndex, agentData);
                    break;
            }
        });
    }
    
    private updatePatrolAgent(agentIndex: number, data: any) {
        if (this.crowd.agentReachedDestination(agentIndex)) {
            data.currentWaitTime += scene.getEngine().getDeltaTime() / 1000.0;
            
            if (data.currentWaitTime >= data.waitTime) {
                data.currentPatrolIndex = (data.currentPatrolIndex + 1) % data.patrolPoints.length;
                this.crowd.agentGoto(agentIndex, data.patrolPoints[data.currentPatrolIndex]);
                data.currentWaitTime = 0;
            }
        }
    }
    
    private updateFollowerAgent(agentIndex: number, data: any) {
        const targetPos = this.crowd.getAgentPosition(data.targetAgent);
        const agentPos = this.crowd.getAgentPosition(agentIndex);
        const distance = BABYLON.Vector3.Distance(agentPos, targetPos);
        
        if (distance > data.followDistance) {
            this.crowd.agentGoto(agentIndex, targetPos);
        }
    }
}
```

### Performance Optimization
```typescript
class OptimizedCrowd {
    private crowd: TOOLKIT.RecastJSCrowdExtension;
    private updateGroups: number[][] = [];
    private currentGroup: number = 0;
    
    constructor(crowd: TOOLKIT.RecastJSCrowdExtension) {
        this.crowd = crowd;
        this.setupUpdateGroups();
    }
    
    setupUpdateGroups() {
        const groupSize = 10;
        const totalAgents = this.crowd.getAgentCount();
        
        for (let i = 0; i < totalAgents; i += groupSize) {
            const group = [];
            for (let j = i; j < Math.min(i + groupSize, totalAgents); j++) {
                group.push(j);
            }
            this.updateGroups.push(group);
        }
    }
    
    update() {
        if (this.updateGroups.length === 0) return;
        
        const currentGroupAgents = this.updateGroups[this.currentGroup];
        
        currentGroupAgents.forEach(agentIndex => {
            this.updateAgent(agentIndex);
        });
        
        this.currentGroup = (this.currentGroup + 1) % this.updateGroups.length;
    }
    
    private updateAgent(agentIndex: number) {
        const agentPos = this.crowd.getAgentPosition(agentIndex);
        const agentVel = this.crowd.getAgentVelocity(agentIndex);
        
        if (agentVel.length() < 0.1 && !this.crowd.agentReachedDestination(agentIndex)) {
            const randomTarget = this.crowd.getRandomPointAround(agentPos, 5.0);
            this.crowd.agentGoto(agentIndex, randomTarget);
        }
    }
}
```

### Event-Driven Crowd System
```typescript
class EventDrivenCrowd {
    private crowd: TOOLKIT.RecastJSCrowdExtension;
    private eventQueue: CrowdEvent[] = [];
    
    constructor(crowd: TOOLKIT.RecastJSCrowdExtension) {
        this.crowd = crowd;
    }
    
    addEvent(event: CrowdEvent) {
        this.eventQueue.push(event);
    }
    
    processEvents() {
        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift();
            this.handleEvent(event);
        }
    }
    
    private handleEvent(event: CrowdEvent) {
        switch (event.type) {
            case "agent_reached_destination":
                this.onAgentReachedDestination(event.agentIndex);
                break;
            case "agent_collision":
                this.onAgentCollision(event.agentIndex, event.otherAgentIndex);
                break;
            case "agent_stuck":
                this.onAgentStuck(event.agentIndex);
                break;
        }
    }
    
    private onAgentReachedDestination(agentIndex: number) {
        const randomTarget = this.crowd.getRandomPointAround(
            this.crowd.getAgentPosition(agentIndex), 
            10.0
        );
        this.crowd.agentGoto(agentIndex, randomTarget);
    }
    
    private onAgentCollision(agentIndex: number, otherAgentIndex: number) {
        const agentPos = this.crowd.getAgentPosition(agentIndex);
        const avoidanceTarget = this.crowd.getRandomPointAround(agentPos, 2.0);
        this.crowd.agentGoto(agentIndex, avoidanceTarget);
    }
    
    private onAgentStuck(agentIndex: number) {
        const agentPos = this.crowd.getAgentPosition(agentIndex);
        const unstuckTarget = this.crowd.getRandomPointAround(agentPos, 5.0);
        this.crowd.agentGoto(agentIndex, unstuckTarget);
    }
}
```

## Related Classes
- [RecastJSPluginExtension](RecastJSPluginExtension.md) - Navigation mesh plugin
- [NavigationAgent](NavigationAgent.md) - Individual navigation agent
- [RecastCharacterController](../physics/RecastCharacterController.md) - Navigation-based character controller
