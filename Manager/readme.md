
The Managed Scene Component API uses a component object model to create and manage a scene component's life-cycle. 

Extended scene functionallity is provided via the **BABYLON.SceneManager** static helper class and **BABYLON.ScriptComponent** subclass instances that can be attached to game objects in the editor toolkit.

```
/**
 * Babylon Script Component
 * @class MyScriptComponent
 */
class MyScriptComponent extends BABYLON.ScriptComponent {
    public constructor(entity: BABYLON.AbstractMesh, scene: BABYLON.Scene, properties: any = {}) {
        super(entity, scene, properties);
    }

    protected start(): void {
        // Start render loop function
    }

    protected update(): void {
        // Update render loop function
    }

    protected after(): void {
        // After render loop function
    }

    protected destroy(): void {
        // Destroy component function
    }
}
```

To compile the project just run **npm install** and **gulp** in the scene manager folder. 

.