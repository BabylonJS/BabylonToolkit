# GlobalMessageBus

Global event messaging system for handling cross-scene and application-wide communication with window message support.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

GlobalMessageBus provides a comprehensive global messaging system that enables communication across different scenes, components, and even external applications through window messaging. It supports message posting, handler management, and automatic cleanup with enhanced features for cross-context communication.

## Methods

### Message Posting

#### `postMessage(message, data?)`
Posts a message to the global message bus for processing by all registered handlers.

**Parameters:**
- `message` `string` - The message type or identifier
- `data?` `any` - Optional data payload to send with the message

### Message Handling

#### `addMessageHandler(message, handler)`
Registers a global message handler for a specific message type.

**Parameters:**
- `message` `string` - The message type to listen for
- `handler` `(data: any) => void` - Callback function to handle the message

#### `removeMessageHandler(message, handler)`
Removes a specific global message handler for a message type.

**Parameters:**
- `message` `string` - The message type
- `handler` `(data: any) => void` - The handler function to remove

#### `removeAllHandlers(message?)`
Removes all handlers for a specific message type, or all handlers if no message type is specified.

**Parameters:**
- `message?` `string` - Optional message type to clear handlers for

### Window Messaging

#### `handleWindowMessage(event)`
Handles incoming window messages from external sources.

**Parameters:**
- `event` `MessageEvent` - The window message event

### Lifecycle Management

#### `dispose()`
Disposes of the global message bus and cleans up all handlers and window listeners.

## Usage Examples

### Basic Global Messaging
```typescript
class GlobalMessagingExample extends TOOLKIT.ScriptComponent {
    protected start(): void {
        this.setupGlobalMessageHandlers();
        this.testGlobalMessaging();
    }

    private setupGlobalMessageHandlers(): void {
        TOOLKIT.SceneManager.GlobalMessageBus.addMessageHandler("scene-loaded", (data) => {
            console.log(`Scene loaded: ${data.sceneName} in ${data.loadTime}ms`);
        });

        TOOLKIT.SceneManager.GlobalMessageBus.addMessageHandler("user-login", (data) => {
            console.log(`User logged in: ${data.username} (ID: ${data.userId})`);
        });

        TOOLKIT.SceneManager.GlobalMessageBus.addMessageHandler("application-state-changed", (data) => {
            console.log(`App state changed: ${data.oldState} -> ${data.newState}`);
        });
    }

    private testGlobalMessaging(): void {
        TOOLKIT.SceneManager.GlobalMessageBus.postMessage("scene-loaded", {
            sceneName: "MainMenu",
            loadTime: 1250
        });

        TOOLKIT.SceneManager.GlobalMessageBus.postMessage("user-login", {
            username: "Player1",
            userId: 12345,
            timestamp: Date.now()
        });

        TOOLKIT.SceneManager.GlobalMessageBus.postMessage("application-state-changed", {
            oldState: "loading",
            newState: "ready"
        });
    }
}
```

## Best Practices

1. **Handler Cleanup** - Always dispose of global message handlers when components are destroyed
2. **Message Naming** - Use consistent, descriptive message names for global communication
3. **Cross-Scene Safety** - Ensure message handlers can handle being called from different scenes
4. **Window Security** - Validate origins when handling window messages from external sources
5. **Performance** - Use global messaging sparingly to avoid performance overhead
6. **Error Handling** - Implement robust error handling for cross-context communication

## Related Classes
- [LocalMessageBus](LocalMessageBus.md) - Local event messaging system
- [SceneManager](../core/SceneManager.md) - Main scene management class
