# Babylon Toolkit

The <a href="https://www.babylontoolkit.com">Babylon Toolkit Extension</a> is an advanced game development framework that provides modern game engine mechanics for BabylonJS.


# Download Files

https://github.com/BabylonJS/BabylonToolkit/tree/master/Editors
https://github.com/BabylonJS/BabylonToolkit/tree/master/Runtime
https://github.com/BabylonJS/BabylonToolkit/tree/master/Modules
https://github.com/BabylonJS/BabylonToolkit/tree/master/Snippets


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
 await TOOLKIT.SceneManager.InitializePlayground(engine);
```

Or node package manager:
```
 npm install babylon-toolkit
```


# Node Package Manager

A universal runtime library packaged for UMD and ES6 projects.

https://www.npmjs.com/package/babylon-toolkit


# Content Creation Tools

The <a href="https://github.com/BabylonJS/BabylonToolkit/tree/master/Editors/Unity">Unity Exporter</a> and <a href="https://github.com/BabylonJS/BabylonToolkit/tree/master/Editors/Unreal">Unreal Engine Exporter</a> plugins allow you to export interactive content from the game engine editor


# Entity Component System

The **Script Component** is the foundation of the babylon toolkit extended framework. It was modeled after Unity's MonoBehavior class:
```
namespace PROJECT {
    export class SampleScript extends TOOLKIT.ScriptComponent {
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties: any = {}, alias: string = "PROJECT.SampleScript") {
            super(transform, scene, properties, alias);
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


Getting Started 
----------------
<a href="https://playground.babylonjs.com/index.html?BabylonToolkit#PNII2N">Your First TypeScript Playground (TS)</a>

<a href="https://playground.babylonjs.com/index.html?BabylonToolkit#HLQXU4">Your First JavaScript Playground (JS)</a>


Unity Starter Content
----------------------
<a href="https://playground.babylonjs.com/index.html?BabylonToolkit#V9AUOR">TypeScript Starter Playground (TS)</a>

<a href="https://playground.babylonjs.com/index.html?BabylonToolkit#GJWO5O">JavaScript Starter Playground (JS)</a>

