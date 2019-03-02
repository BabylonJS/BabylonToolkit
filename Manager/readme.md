
The BabylonJS Managed Scene Component API uses a component object model to create and manage a scene component's life-cycle.

To compile the project just run *npm install* and *gulp* in the folder. 

All scene level functionallity is exposed via the BABYLON.SceneManager static helper class and BABYLON.ScriptComponent subclass instances:

```
/**
 * Babylon Script Component
 * @class MyScriptComponent
 */
class MyScriptComponent extends BABYLON.ScriptComponent {
    protected ready(): void {
        // Initialize component function
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

.