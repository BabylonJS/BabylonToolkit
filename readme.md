# Babylon Toolkit For Unity

The **Unity Exporter** is host to a set of tools designed to provide a small subset of native game editor features to export scene content files. You can create your games using a design time script component based architecture. The minimum editor version for the latest Babylon Toolkit is Unity 2022.3.33f1 or greater. Legacy toolkits require editor versions 2021, 2022 or 2023.


# Documentation

https://doc.babylonjs.com/communityExtensions/Unity/Intro


# Download Files

https://github.com/BabylonJS/UnityExporter/tree/master/Redist/Editors
https://github.com/BabylonJS/UnityExporter/tree/master/Redist/Runtime


# Runtime Library

The **babylon.toolkit.js** runtime library **must** be loaded on your host html page:

```
<script type="text/javascript" src="scripts/babylon.toolkit.js"></script>
```

Or at runtime:
```
await BABYLON.Tools.LoadScriptAsync("scripts/babylon.toolkit.js");
```

Or on playgrounds:
```
 await UNITY.SceneManager.InitializePlayground(engine);
```


# Scene Manager Class

The **UNITY.SceneManager** extension provides runtime life cycle management for game objects. The extension supports a scene component application programming interface to enable the usage of modern game mechanics to ease web game development and provide a native game editor style development experience.


# Script Component Class

The **UNITY.ScriptComponent** is the foundation of the babylon toolkit scripting system. It was modeled after Unity's MonoBehavior class:
```
module PROJECT {
    export class MyScript extends UNITY.ScriptComponent {

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

# Getting Started

The Unity Editor plugin lets BabylonJS artists, designers, and developers collaborate to create amazing immersive and interactive experiences.

<a href="https://www.youtube.com/watch?v=d1spQKztIZI&list=PLQjLia99I6qDtO16j-ia64xC5r8ps09bB&index=1&pp=gAQBiAQB" target="_blank">Getting Started Video</a>


# Unity Starter Assets (Pro Features)

The Babylon Toolkit Pro Classes allows out of the box features that help you jump start your next project.

- Rigidbody physics system
- Animation state machines
- Player character controllers
- Recast navigation meshes
- Detour path following
- Raycast wheeled vehicles
- Audio source components
- Video player components
- Terrain building tools

<a href="https://www.youtube.com/watch?v=qrXDwPhQNfY&list=PLQjLia99I6qDtO16j-ia64xC5r8ps09bB&index=2&t=53s&pp=gAQBiAQB" target="_blank">Using Starter Assets Video</a>

<a href="https://www.youtube.com/watch?v=YTlp_ut53wo&list=PLQjLia99I6qDtO16j-ia64xC5r8ps09bB&index=3&pp=gAQBiAQB" target="_blank">Pro Edition Features Video</a>

<a href="https://playground.babylonjs.com/index.html?UnityToolkit#V93DXU" target="_blank">Starter Assets Playground</a>


# Advanced Game Development (Premium Addons)

The Babylon Toolkit Premium Addons provide more advanced script components for that next level game development experience. 

- Networking components
- Player avatar components
- Managed racing components

<a href="https://www.youtube.com/watch?v=jsMJp00d1E8&list=PLQjLia99I6qAaof4M3KDkL59jQ2oqAHUb&index=1&t=665s&pp=gAQBiAQB" target="_blank">Burnout Dev Blog: Part One</a>

<a href="https://www.youtube.com/watch?v=d25x5hlhL4A&list=PLQjLia99I6qAaof4M3KDkL59jQ2oqAHUb&index=2&t=571s&pp=gAQBiAQB" target="_blank">Burnout Dev Blog: Part Two</a>

<a href="https://www.babylontoolkit.com/racer" target="_blank">Burnout Project Demo</a>
