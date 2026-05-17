# DemoSampleScene Script Component

This script loads a physics enabled sample scene and playable character. It demonstrates initializing the playground.babylon.js editor, enabling havok physics, loading interactive scene content and attaching a script component to the player armature model.

```
class Playground {
    public static async CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): Promise<BABYLON.Scene> {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // This creates and positions a debug camera (non-mesh)
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());

        // This loads the demo starter assets scene
        await DemoScene.Load(scene);

        return scene;
    }
}

class DemoScene {
    private static ScriptBundleUrl:string = TOOLKIT.SceneManager.PlaygroundCdn + "default.playground.js";

    public static async Load(scene:BABYLON.Scene): Promise<void> {
        
        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        // STEP 1 - Initializes the runtime and global scene properties
        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        await TOOLKIT.SceneManager.InitializePlayground(scene.getEngine(), { showDefaultLoadingScreen: true, hideLoadingUIWithEngine: false });
        globalThis.SCRIPTBUNDLE_JS = globalThis.SCRIPTBUNDLE_JS || await BABYLON.Tools.LoadScriptAsync(DemoScene.ScriptBundleUrl);
        
        // @ts-ignore - This initializes fresh physics for this scene
        globalThis.HK = await HavokPhysics();
        globalThis.HKP = new BABYLON.HavokPlugin(false);
        scene.enablePhysics(new BABYLON.Vector3(0,-9.81,0), globalThis.HKP);

        // This cleans up globals when the scene is disposed
        const cleanupGlobals = () => {
            if (globalThis["HKP"]) delete globalThis["HKP"];
            if (globalThis["HK"]) delete globalThis["HK"];
        };
        scene.onDisposeObservable.addOnce(cleanupGlobals);
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        // STEP 2 - The loads the sample scene & player armature exported from the unity starter assets project
        // https://assetstore.unity.com/packages/essentials/starter-assets-character-controllers-urp-267961
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        const assetsManager = new BABYLON.AssetsManager(scene);
        assetsManager.addMeshTask("samplescene", null, TOOLKIT.SceneManager.PlaygroundRepo, "samplescene.gltf");
        assetsManager.addMeshTask("playerarmature", null, TOOLKIT.SceneManager.PlaygroundRepo, "playerarmature.gltf");
        await TOOLKIT.SceneManager.LoadRuntimeAssets(assetsManager, ["samplescene.gltf", "playerarmature.gltf"], ()=> {

            /////////////////////////////////////////////////////////////////////////////////////////////////////
            // STEP 3 - Attach the player controller to the player armature
            /////////////////////////////////////////////////////////////////////////////////////////////////////
            try {
                const player = scene.getNodeByName("PlayerArmature") as BABYLON.TransformNode;
                if (player != null) {
                    const controller = new PROJECT.ThirdPersonPlayerController(player, scene, { arrowKeyRotation: true, smoothMotionSpeed:true, smoothChangeRate: 25.0 });
                    controller.enableInput = true;
                    controller.attachCamera = true;
                    controller.moveSpeed = 5.335;
                    controller.walkSpeed = 2.0;
                    controller.jumpSpeed = 12.0;
                }
            } catch (e) {
                console.error("Failed to attach player controller", e);
            } finally {
                TOOLKIT.SceneManager.HideLoadingScreen(scene.getEngine());
                TOOLKIT.SceneManager.FocusRenderCanvas(scene);
            }
        });
    }
}

export default Playground
```
