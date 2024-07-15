# Babylon Toolkit

The <a href="https://www.babylontoolkit.com" target="_blank">Babylon Toolkit</a> is an extended game development framework that provide advanced mechanics for BabylonJS.


# Documentation

https://doc.babylonjs.com/communityExtensions/BabylonToolkit


# Download Files

https://github.com/BabylonJS/UnityExporter/tree/master/Runtime
https://github.com/BabylonJS/UnityExporter/tree/master/Editors
https://github.com/BabylonJS/UnityExporter/tree/master/Modules
https://github.com/BabylonJS/UnityExporter/tree/master/Template


# Runtime Library

The **babylon.toolkit.js** runtime library **must** be loaded in your host environment:

```
<script type="text/javascript" src="scripts/babylon.toolkit.js"></script>
```

Or at runtime:
```
await BABYLON.Tools.LoadScriptAsync("scripts/babylon.toolkit.js");
```

Or on playgrounds:
```
 await BABYLON.Toolkit.SceneManager.InitializePlayground(engine);
```


# Entity Component System

The **Script Component** is the foundation of the babylon toolkit extended framework. It was modeled after Unity's MonoBehavior class:
```
module PROJECT {
    export class SampleScript extends BABYLON.Toolkit.ScriptComponent {
        constructor(transform:BABYLON.TransformNode, scene:BABYLON.Scene, properties:any={}) {
           super(transform, scene, properties, "PROJECT.SampleScript");
        }

        protected awake(): void {
            /* Init component function */
        }

        protected start(): void {
            /* Start component function */
        }

        protected ready(): void {
            /* Execute when ready function */
        }

        protected update(): void {
            /* Update render loop function */
        }

        protected late(): void {
            /* Late update render loop function */
        }

        protected step(): void {
            /* Before physics step function (remove empty function for performance) */
        }

        protected fixed(): void {
            /* After physics step function (remove empty function for performance) */
        }

        protected after(): void {
            /* After update render loop function */
        }

        protected reset(): void {
            /* Reset component function */
        }

        protected destroy(): void {
            /* Destroy component function */
        }
    }
}
```
<a href="https://playground.babylonjs.com/index.html?UnityToolkit#9SDE5Q" target="_blank">Example Playground</a>


# Scene Manager Class

The **BABYLON.Toolkit.SceneManager** class provides runtime life cycle management for game objects. The extension supports a scene component application programming interface to enable the usage of modern game mechanics to ease web game development and provide a native game editor style development experience.


# Window Manager Class

The **BABYLON.Toolkit.WindowManager** class provides DOM Level helper functions.


# Input Controller Class

The **BABYLON.Toolkit.InputController** class provides game engine style user input functions.


# Content Creation Plugins

The <a href="https://github.com/BabylonJS/UnityExporter/tree/master/Editors/Unity" target="_blank">Unity Editor</a> and <a href="https://github.com/BabylonJS/UnityExporter/tree/master/Editors/Unreal" target="_blank">Unreal Engine</a> exporter plugins allow you to export GLTF content from the specfied eco system

