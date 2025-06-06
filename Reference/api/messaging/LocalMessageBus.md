# LocalMessageBus

Local event messaging system for handling component-to-component communication within a single scene or context.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

LocalMessageBus provides a lightweight messaging system for local event communication between components within the same scene or application context. It offers methods for posting messages, handling incoming messages, and managing message handlers with automatic cleanup capabilities.

## Methods

### Message Posting

#### `postMessage(message, data?)`
Posts a message to the local message bus for processing by registered handlers.

**Parameters:**
- `message` `string` - The message type or identifier
- `data?` `any` - Optional data payload to send with the message

### Message Handling

#### `addMessageHandler(message, handler)`
Registers a message handler for a specific message type.

**Parameters:**
- `message` `string` - The message type to listen for
- `handler` `(data: any) => void` - Callback function to handle the message

#### `removeMessageHandler(message, handler)`
Removes a specific message handler for a message type.

**Parameters:**
- `message` `string` - The message type
- `handler` `(data: any) => void` - The handler function to remove

#### `removeAllHandlers(message?)`
Removes all handlers for a specific message type, or all handlers if no message type is specified.

**Parameters:**
- `message?` `string` - Optional message type to clear handlers for

### Lifecycle Management

#### `dispose()`
Disposes of the message bus and cleans up all handlers.

## Usage Examples

### Basic Local Messaging
```typescript
class LocalMessagingExample extends TOOLKIT.ScriptComponent {
    public messageBus: TOOLKIT.LocalMessageBus = new TOOLKIT.LocalMessageBus();

    protected start(): void {
        this.setupMessageHandlers();
        this.testMessaging();
    }

    private setupMessageHandlers(): void {
        this.messageBus.addMessageHandler("player-moved", (data) => {
            console.log(`Player moved to position: ${data.x}, ${data.y}, ${data.z}`);
        });

        this.messageBus.addMessageHandler("item-collected", (data) => {
            console.log(`Item collected: ${data.itemName} (value: ${data.value})`);
        });

        this.messageBus.addMessageHandler("health-changed", (data) => {
            console.log(`Health changed: ${data.oldHealth} -> ${data.newHealth}`);
        });
    }

    private testMessaging(): void {
        this.messageBus.postMessage("player-moved", {
            x: 10.5,
            y: 0.0,
            z: 15.2
        });

        this.messageBus.postMessage("item-collected", {
            itemName: "Health Potion",
            value: 50
        });

        this.messageBus.postMessage("health-changed", {
            oldHealth: 80,
            newHealth: 100
        });
    }

    protected destroy(): void {
        this.messageBus.dispose();
    }
}
```

### Component Communication System
```typescript
class PlayerController extends TOOLKIT.ScriptComponent {
    public messageBus: TOOLKIT.LocalMessageBus = new TOOLKIT.LocalMessageBus();
    public health: number = 100;
    public position: BABYLON.Vector3 = BABYLON.Vector3.Zero();

    protected start(): void {
        this.setupPlayerMessaging();
    }

    private setupPlayerMessaging(): void {
        this.messageBus.addMessageHandler("damage-taken", (data) => {
            this.takeDamage(data.amount, data.source);
        });

        this.messageBus.addMessageHandler("heal-received", (data) => {
            this.heal(data.amount);
        });

        this.messageBus.addMessageHandler("teleport-player", (data) => {
            this.teleportTo(data.position);
        });
    }

    protected update(): void {
        this.checkMovement();
    }

    private checkMovement(): void {
        const newPosition = this.transform.position;
        
        if (!this.position.equals(newPosition)) {
            this.position = newPosition.clone();
            
            this.messageBus.postMessage("player-position-changed", {
                position: this.position,
                timestamp: Date.now()
            });
        }
    }

    private takeDamage(amount: number, source: string): void {
        const oldHealth = this.health;
        this.health = Math.max(0, this.health - amount);
        
        this.messageBus.postMessage("player-health-changed", {
            oldHealth: oldHealth,
            newHealth: this.health,
            damage: amount,
            source: source
        });

        if (this.health <= 0) {
            this.messageBus.postMessage("player-died", {
                cause: source,
                position: this.position
            });
        }
    }

    private heal(amount: number): void {
        const oldHealth = this.health;
        this.health = Math.min(100, this.health + amount);
        
        this.messageBus.postMessage("player-health-changed", {
            oldHealth: oldHealth,
            newHealth: this.health,
            healing: amount
        });
    }

    private teleportTo(position: BABYLON.Vector3): void {
        this.transform.position = position;
        this.position = position.clone();
        
        this.messageBus.postMessage("player-teleported", {
            newPosition: position,
            timestamp: Date.now()
        });
    }

    protected destroy(): void {
        this.messageBus.dispose();
    }
}

class UIController extends TOOLKIT.ScriptComponent {
    public messageBus: TOOLKIT.LocalMessageBus = new TOOLKIT.LocalMessageBus();

    protected start(): void {
        this.setupUIMessaging();
    }

    private setupUIMessaging(): void {
        this.messageBus.addMessageHandler("player-health-changed", (data) => {
            this.updateHealthBar(data.newHealth);
        });

        this.messageBus.addMessageHandler("player-position-changed", (data) => {
            this.updatePositionDisplay(data.position);
        });

        this.messageBus.addMessageHandler("player-died", (data) => {
            this.showDeathScreen(data.cause);
        });
    }

    private updateHealthBar(health: number): void {
        console.log(`Updating health bar: ${health}%`);
    }

    private updatePositionDisplay(position: BABYLON.Vector3): void {
        console.log(`Position: ${position.x.toFixed(1)}, ${position.y.toFixed(1)}, ${position.z.toFixed(1)}`);
    }

    private showDeathScreen(cause: string): void {
        console.log(`Player died from: ${cause}`);
    }

    protected destroy(): void {
        this.messageBus.dispose();
    }
}
```

### Event-Driven Game Systems
```typescript
class GameSystemManager extends TOOLKIT.ScriptComponent {
    public messageBus: TOOLKIT.LocalMessageBus = new TOOLKIT.LocalMessageBus();
    public gameState: string = "playing";
    public score: number = 0;

    protected start(): void {
        this.setupGameSystemMessaging();
    }

    private setupGameSystemMessaging(): void {
        this.messageBus.addMessageHandler("enemy-defeated", (data) => {
            this.onEnemyDefeated(data);
        });

        this.messageBus.addMessageHandler("level-completed", (data) => {
            this.onLevelCompleted(data);
        });

        this.messageBus.addMessageHandler("game-paused", () => {
            this.onGamePaused();
        });

        this.messageBus.addMessageHandler("game-resumed", () => {
            this.onGameResumed();
        });

        this.messageBus.addMessageHandler("power-up-activated", (data) => {
            this.onPowerUpActivated(data);
        });
    }

    private onEnemyDefeated(data: any): void {
        this.score += data.points;
        
        this.messageBus.postMessage("score-updated", {
            newScore: this.score,
            pointsAdded: data.points,
            enemyType: data.enemyType
        });

        console.log(`Enemy defeated: ${data.enemyType} (+${data.points} points)`);
    }

    private onLevelCompleted(data: any): void {
        const bonusPoints = data.timeBonus + data.perfectBonus;
        this.score += bonusPoints;
        
        this.messageBus.postMessage("level-complete", {
            level: data.level,
            finalScore: this.score,
            bonusPoints: bonusPoints
        });

        console.log(`Level ${data.level} completed! Bonus: ${bonusPoints}`);
    }

    private onGamePaused(): void {
        this.gameState = "paused";
        
        this.messageBus.postMessage("game-state-changed", {
            oldState: "playing",
            newState: "paused"
        });

        console.log("Game paused");
    }

    private onGameResumed(): void {
        this.gameState = "playing";
        
        this.messageBus.postMessage("game-state-changed", {
            oldState: "paused",
            newState: "playing"
        });

        console.log("Game resumed");
    }

    private onPowerUpActivated(data: any): void {
        this.messageBus.postMessage("apply-power-up", {
            type: data.type,
            duration: data.duration,
            strength: data.strength
        });

        console.log(`Power-up activated: ${data.type} for ${data.duration}s`);
    }

    public pauseGame(): void {
        this.messageBus.postMessage("game-paused");
    }

    public resumeGame(): void {
        this.messageBus.postMessage("game-resumed");
    }

    public defeatEnemy(enemyType: string, points: number): void {
        this.messageBus.postMessage("enemy-defeated", {
            enemyType: enemyType,
            points: points,
            timestamp: Date.now()
        });
    }

    protected destroy(): void {
        this.messageBus.dispose();
    }
}
```

### Message Handler Management
```typescript
class MessageHandlerManager extends TOOLKIT.ScriptComponent {
    public messageBus: TOOLKIT.LocalMessageBus = new TOOLKIT.LocalMessageBus();
    public handlers: Map<string, Function[]> = new Map();

    protected start(): void {
        this.setupDynamicHandlers();
    }

    private setupDynamicHandlers(): void {
        this.addHandler("system-event", this.handleSystemEvent.bind(this));
        this.addHandler("user-action", this.handleUserAction.bind(this));
        this.addHandler("network-event", this.handleNetworkEvent.bind(this));
    }

    private addHandler(message: string, handler: Function): void {
        if (!this.handlers.has(message)) {
            this.handlers.set(message, []);
        }
        
        this.handlers.get(message)!.push(handler);
        this.messageBus.addMessageHandler(message, handler as any);
    }

    private removeHandler(message: string, handler: Function): void {
        const messageHandlers = this.handlers.get(message);
        if (messageHandlers) {
            const index = messageHandlers.indexOf(handler);
            if (index !== -1) {
                messageHandlers.splice(index, 1);
                this.messageBus.removeMessageHandler(message, handler as any);
            }
        }
    }

    private handleSystemEvent(data: any): void {
        console.log(`System event: ${data.type} - ${data.message}`);
    }

    private handleUserAction(data: any): void {
        console.log(`User action: ${data.action} with data:`, data.payload);
    }

    private handleNetworkEvent(data: any): void {
        console.log(`Network event: ${data.event} from ${data.source}`);
    }

    public clearAllHandlers(): void {
        for (const [message, handlers] of this.handlers) {
            this.messageBus.removeAllHandlers(message);
        }
        this.handlers.clear();
    }

    public clearHandlersForMessage(message: string): void {
        this.messageBus.removeAllHandlers(message);
        this.handlers.delete(message);
    }

    public getHandlerCount(message: string): number {
        return this.handlers.get(message)?.length || 0;
    }

    public hasHandlers(message: string): boolean {
        return this.getHandlerCount(message) > 0;
    }

    protected destroy(): void {
        this.clearAllHandlers();
        this.messageBus.dispose();
    }
}
```

## Best Practices

1. **Handler Cleanup** - Always dispose of message buses and remove handlers when components are destroyed
2. **Message Naming** - Use consistent, descriptive message names with clear naming conventions
3. **Data Structure** - Use well-defined data structures for message payloads
4. **Error Handling** - Implement error handling in message handlers to prevent system crashes
5. **Performance** - Avoid excessive message posting in update loops for better performance
6. **Decoupling** - Use messaging to decouple components and reduce direct dependencies

## Related Classes
- [GlobalMessageBus](GlobalMessageBus.md) - Global event messaging system
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
