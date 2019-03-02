
The BabylonJS Managed Scene Component API uses a component object model to create and manage a scene component's life-cycle.

To compile the project just run "npm install" in the folder. 

Scene Manager Static Helpers:

* BABYLON.SceneManager.CreateScene - Creates a new scene and attaches a manager object.
* BABYLON.SceneManager.LoadScene - Calls BABYLON.SceneLoader.Load and parses the scene metadata (attaches a manager object to loaded scene)
* BABYLON.SceneManager.AppendScene - Calls BABYLON.SceneLoader.Append and parses the scene metadata (attaches a manager object to loaded scene)
* BABYLON.SceneManager.ImportMeshes - Call BABYLON.SceneLoader.ImportMesh and parses mesh metadata (a manager object is already attached)
* BABYLON.SceneManager.GetInstance - Get the currently attached manager object on the scene

All scene level functionallity is exposed via the BABYLON.SceneManager and BABYLON.SceneComponent instances.

To Create A Scene Controller At Runtime: manager.createSceneController("PROJECT.NewSceneController");

To Add A Scene Component At Runtime: manager.addSceneComponent(mesh | light | camera, "PROJECT.NewMeshComponent");

* Example Scene Controller Class:

    module PROJECT {
        export class NewSceneController extends BABYLON.SceneController {

            public ready() :void {
                // Scene execute when ready
            }

            public start() :void {
                // Start component function
            }

            public update() :void {
                // Update render loop function
            }

            public after() :void {
                // After render loop function
            }

            public destroy() :void {
                // Destroy component function
            }
        }
    }

* Example Mesh Component Class:

    module PROJECT {
        export class NewMeshComponent extends BABYLON.MeshComponent {

            public ready() :void {
                // Scene execute when ready
            }

            public start() :void {
                // Start component function
            }

            public update() :void {
                // Update render loop function
            }

            public after() :void {
                // After render loop function
            }

            public destroy() :void {
                // Destroy component function
            }
        }
    }

* Example Light Component Class:

    module PROJECT {
        export class NewLightComponent extends BABYLON.LightComponent {

            public ready() :void {
                // Scene execute when ready
            }

            public start() :void {
                // Start component function
            }

            public update() :void {
                // Update render loop function
            }

            public after() :void {
                // After render loop function
            }

            public destroy() :void {
                // Destroy component function
            }
        }
    }

* Example Camera Component Class:

    module PROJECT {
        export class NewCameraComponent extends BABYLON.CameraComponent {

            public ready() :void {
                // Scene execute when ready
            }

            public start() :void {
                // Start component function
            }

            public update() :void {
                // Update render loop function
            }

            public after() :void {
                // After render loop function
            }

            public destroy() :void {
                // Destroy component function
            }
        }
    }

.