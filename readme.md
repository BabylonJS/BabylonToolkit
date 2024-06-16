# Babylon Toolkit

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
Example Playground: https://playground.babylonjs.com/index.html?UnityToolkit#00G5R9


# Getting Started

Some verbage about using the Unity Editor and its eco system goes here

[ Getting Started Video Goes Here ]


# Unity Starter Assets (Pro Features)

Some verbage about using the Pro Features goes here

[ Pro Feature List Goes Here]

[ Unity Assets Video Goes Here ]

Example Playground: https://playground.babylonjs.com/index.html?UnityToolkit#RNACBR


# Example Racing System (Premium Addons)

Some verbage about using the Premium Addons goes here

[ Premium Addons List Goes Here]

[ Example Vehicle Video Goes Here ]

Vehicle Project Demo: https://www.babylontoolkit.com/racer

