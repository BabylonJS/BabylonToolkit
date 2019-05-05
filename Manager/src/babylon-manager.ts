module BABYLON {
    /**
     * Babylon scene manager class
     * @class SceneManager
     */
    export class SceneManager {
        /** Gets the toolkit framework version number */
        public static get VersionNumber():string { return  "4.1.0 - A1"; }
        /** Managed animation group start mode */
        public static AnimationStartMode?:BABYLON.GLTFLoaderAnimationStartMode = null;
        /** Forces scene loader into right hand mode */
        public static ForceRightHanded?:boolean = null;
        /** Enable scene physics system debug tracing */
        public static DebugPhysics:boolean = false;
        /** Managed json data store object */
        public static DataStore:any = {};

        // ********************************** //
        // * Babylon Scene Manager Plugins  * //
        // ********************************** //

        private static EnableSceneParsing:boolean = true;
        /** Enable scene loader parsing plugin */
        public static EnableSceneLoader(enabled:boolean):void {
            BABYLON.SceneManager.EnableSceneParsing = enabled;
        }
        /** Is scene loader parsing plugin enabled */
        public static IsSceneLoaderEnabled():boolean {
            return BABYLON.SceneManager.EnableSceneParsing;
        }

        // ************************************ //
        // * Babylon Scene Manager Platforms  * //
        // ************************************ //

        /** Are unversial windows platform services available. */
        public static IsWindows(): boolean {
            return (typeof Windows !== "undefined" && typeof Windows.UI !== "undefined" && typeof Windows.System !== "undefined" && typeof Windows.Foundation !== "undefined");
        }
        /** Are mobile cordova platform services available. */
        public static IsCordova(): boolean {
            return ((<any>window).cordova != null);
        }
        /** Are web assembly platform services available. */
        public static IsWebAssembly(): boolean {
            return ((<any>window).WebAssembly);
        }
        /** Is oculus browser platform agent. */
        public static IsOculusBrowser(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/OculusBrowser/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is samsung browser platform agent. */
        public static IsSamsungBrowser(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/SamsungBrowser/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is windows phone platform agent. */
        public static IsWindowsPhone(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/Windows Phone/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is blackberry web platform agent. */
        public static IsBlackBerry(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/BlackBerry/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is opera web platform agent. */
        public static IsOperaMini(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/Opera Mini/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is android web platform agent. */
        public static IsAndroid(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/Android/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is web os platform agent. */
        public static IsWebOS(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/webOS/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is ios web platform agent. */
        public static IsIOS(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is iphone web platform agent. */
        public static IsIPHONE(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/iPhone/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is ipad web platform agent. */
        public static IsIPAD(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/iPad/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is ipod web platform agent. */
        public static IsIPOD(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/iPod/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Is internet explorer 11 platform agent. */
        public static IsIE11():boolean {
            return (navigator.msMaxTouchPoints !== void 0);
        }
        /** Is mobile web platform agent. */
        public static IsMobile(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                const n = navigator.userAgent;
                if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone|iPad|iPod/i) || n.match(/BlackBerry/i) || n.match(/Opera Mini/i) || n.match(/Windows Phone/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Are playstation platform services available. */
        public static IsPlaystation(): boolean {
            let result: boolean = false;
            if (navigator != null && navigator.userAgent != null) {
                if (navigator.userAgent.match(/Playstation/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Are xbox one platform services available. */
        public static IsXboxOne(): boolean {
            let result: boolean = false;
            if (BABYLON.SceneManager.IsWindows() && typeof Windows.System.Profile !== "undefined" && typeof Windows.System.Profile.AnalyticsInfo !== "undefined" && typeof Windows.System.Profile.AnalyticsInfo.versionInfo !== "undefined" && typeof Windows.System.Profile.AnalyticsInfo.versionInfo.deviceFamily !== "undefined") {
                let n:string = Windows.System.Profile.AnalyticsInfo.versionInfo.deviceFamily;
                if (n.match(/Xbox/i)) {
                    result = true;
                }
            }
            return result;
        }
        /** Are xbox live platform services available. */
        public static IsXboxLive(): boolean {
            return (BABYLON.SceneManager.IsWindows() && typeof Microsoft !== "undefined" && typeof Microsoft.Xbox !== "undefined" && typeof Microsoft.Xbox.Services !== "undefined");
        }

        // ********************************** //
        // * Scene Manager System Functions * //
        // ********************************** //

        /** Run a function on the next render loop. */
        public static RunOnce(scene:BABYLON.Scene, func:()=>void): void {
            scene.onBeforeRenderObservable.addOnce(func);
        }
        /** Popup debug layer in window. */
        public static PopupDebug(scene:BABYLON.Scene): void {
            if (scene.debugLayer) {
                scene.debugLayer.hide();
                scene.debugLayer.show({ enablePopup: true, globalRoot: null });
            }            
        }
        /** Toggle debug layer on and off. */
        public static ToggleDebug(scene:BABYLON.Scene, popups:boolean = false, parent:HTMLElement = null): void {
            if (scene.debugLayer) {
                const wnd:any = window;
                if (BABYLON.SceneManager.debugLayerVisible === true) {
                    BABYLON.SceneManager.debugLayerVisible = false;
                    if (wnd.METER && wnd.METER.show) wnd.METER.show();
                    scene.debugLayer.hide();
                } else {
                    BABYLON.SceneManager.debugLayerVisible = true;
                    if (wnd.METER && wnd.METER.hide) wnd.METER.hide();
                    scene.debugLayer.show({ enablePopup: popups, globalRoot: parent });
                }
            }            
        }
        /** Disposes entire scene and release all resources */
        public static DisposeScene(scene:BABYLON.Scene, clearColor:BABYLON.Color4 = new BABYLON.Color4(0,0,0,1)): void {
            const engine:BABYLON.Engine = scene.getEngine();
            scene.dispose();
            engine.clear(clearColor, true, true, true);
        }
        /** Delays a function call using request animation frames. Returns a handle object */
        public static SetTimeout(timeout:number, func:()=>void):any {
            let handle:any = null;
            handle = TimerPlugin.requestTimeout(()=>{
                if (handle != null) BABYLON.SceneManager.ClearTimeout(handle);
                if (func != null) func();
            }, timeout);
            return handle;
        }
        /** Calls request animation frame delay with handle to cancel pending timeout call */
        public static ClearTimeout(handle:any):void {
            TimerPlugin.clearRequestTimeout(handle);
        }
        /** Repeats a function call using request animation frames. Retuns a handle object */
        public static SetInterval(interval:number, func:()=>void):any {
            return TimerPlugin.requestInterval(func, interval);
        }
        /** Calls request animation frame repeast with handle to clear pending interval call. */
        public static ClearInterval(handle:any):void {
            TimerPlugin.clearRequestInterval(handle);
        }

        // ********************************** //
        // * Scene Manager Helper Functions * //
        // ********************************** //

        /** TODO */
        public static RayCast(scene:BABYLON.Scene, ray: BABYLON.Ray, predicate?: (mesh: BABYLON.AbstractMesh) => boolean, fastCheck?: boolean): BABYLON.PickingInfo {
            return scene.pickWithRay(ray, predicate, fastCheck);
        }
        /** TODO */
        public static MultiRayCast(scene:BABYLON.Scene, ray: BABYLON.Ray, predicate?: (mesh: BABYLON.AbstractMesh) => boolean): BABYLON.PickingInfo[] {
            return scene.multiPickWithRay(ray, predicate);
        }
        /** Safely destroy transform node */
        public static SafeDestroy(transform: BABYLON.TransformNode, delay:number = 5, disable:boolean = false):void {
            if (delay > 0) { 
                if (disable === true) transform.setEnabled(false);
                BABYLON.SceneManager.SetTimeout(delay, ()=>{ transform.dispose(false, false); });
            } else { 
                transform.dispose(false, false);
            }
        }
        /** Open alert message dialog. */
        public static AlertMessage(text: string, title: string = "Babylon.js"): any {
            let result = null;
            if (BABYLON.SceneManager.IsWindows()) {
                result = new Windows.UI.Popups.MessageDialog(text, title).showAsync();
            } else {
                window.alert(text);
            }
            return result;
        }
        /**  Gets the names query string from page url. */
        public static GetQueryStringParam(name: string, url: string): string {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        /** Gets the current engine WebGL version string info. */
        public static GetWebGLVersionString(scene:BABYLON.Scene): string {
            let result = "WebGL - Unknown";
            if (scene != null) {
                const engine:BABYLON.Engine = scene.getEngine();
                if (engine != null) {
                    let glinfo = engine.getGlInfo();
                    if (glinfo != null) {
                        result = (glinfo.version + " - " + glinfo.renderer);
                    }
                }
            }
            return result;
        }
        /** Gets the current engine WebGL version number info. */
        public static GetWebGLVersionNumber(scene:BABYLON.Scene): number {
            let result = 0;
            if (scene != null) {
                const engine:BABYLON.Engine = scene.getEngine();
                if (engine != null) {
                    result = engine.webGLVersion
                }
            }
            return result;
        }
        /** TODO */
        public static GetDeltaSeconds(scene:BABYLON.Scene): number { 
            return (scene.getEngine().getDeltaTime() / 1000);
        }
        /** Gets the instanced material from scene. If does not exists, execute a optional defaultinstance handler. */
        public static GetMaterialInstance<T>(scene:BABYLON.Scene, name:string, defaultInstance:(newName:String)=>BABYLON.Material = null): T {
            let result:any = scene.getMaterialByName(name);
            if (result == null && defaultInstance != null) {
                result = defaultInstance(name);
            }
            return (result != null) ? result as T : null;
        }
        /** Set the Windows Runtime preferred launch windowing mode. */
        public static SetWindowsLaunchMode(mode:Windows.UI.ViewManagement.ApplicationViewWindowingMode): void {
            if (BABYLON.SceneManager.IsWindows() && typeof Windows.UI.ViewManagement !== "undefined" &&typeof Windows.UI.ViewManagement.ApplicationView !== "undefined") {
                Windows.UI.ViewManagement.ApplicationView.preferredLaunchWindowingMode = Windows.UI.ViewManagement.ApplicationViewWindowingMode.fullScreen
            }
        }
        /** Removes the default page scene loader. */
        public static RemoveSceneLoader():void {
            if ((<any>window).removeSceneLoader) {
                (<any>window).removeSceneLoader();
            } else {
                BABYLON.Tools.Warn("Default remove scene loader function not available.");
            }
        }
        /** Quit the Windows Runtime host application. */
        public static QuitWindowsApplication(): void {
            if (BABYLON.SceneManager.IsWindows()) {
                window.close();
            }
        }

        // ********************************** //
        // * Scene Manager Engine Functions * //
        // ********************************** //

        /** Get the last create engine instance */
        public static GetEngineInstances(): BABYLON.Engine[] { 
            return BABYLON.EngineStore.Instances;
        }
        /** Get the last create engine instance */
        public static GetLastCreatedEngine(): BABYLON.Engine { 
            return BABYLON.EngineStore.LastCreatedEngine;
        }
        /** Get the last created scene instance */
        public static GetLastCreatedScene(): BABYLON.Scene { 
            return BABYLON.EngineStore.LastCreatedScene;
        }

        // ******************************** //
        // * Scene Manager Mesh Functions * //
        // ******************************** //

        /** Gets the specified mesh from scene. */
        public static GetMesh(scene:BABYLON.Scene, name:string): BABYLON.AbstractMesh {
            return scene.getNodeByName(name) as BABYLON.AbstractMesh;
        }
        /** Gets the specified transform node from scene. */
        public static GetTransform(scene:BABYLON.Scene, name:string): BABYLON.TransformNode {
            if (scene == null) return null;
            return scene.getNodeByName(name) as BABYLON.TransformNode;
        }
        /** Gets the specified prefab mesh from scene. */
        public static GetPrefabMesh(scene:BABYLON.Scene, prefabName:string): BABYLON.AbstractMesh {
            const realPrefab:string = "Prefab." + prefabName;
            return BABYLON.SceneManager.GetMesh(scene, realPrefab);
        }
        /** TODO: Remove This - Gets the transform node primitive meshes. */
        public static GetPrimitiveMeshes(transform:TransformNode): BABYLON.AbstractMesh[] {
            return transform.getChildMeshes(true, (node:BABYLON.Node)=>{  return ( node.name.indexOf("_primitive") >= 0); });
        }
        /** Gets the transform node collision meshes. */
        public static GetCollisionMeshes(transform:TransformNode): BABYLON.AbstractMesh[] {
            return transform.getChildMeshes(true, (node:BABYLON.Node)=>{  return ( node.name.indexOf("_collider") >= 0); });
        }
        /** Gets the system navigation mesh from scene. */
        public static GetNavigationMesh(scene:BABYLON.Scene):BABYLON.AbstractMesh {
            return BABYLON.SceneManager.GetMesh(scene, "NavigationMesh");
        }
        /** Instantiates the specfied prefab object into scene. */
        public static InstantiatePrefab(scene:BABYLON.Scene, name:string, cloneName: string, newParent: Node = null, newPosition:BABYLON.Vector3 = null, newRotation:BABYLON.Vector3 = null, newScaling:BABYLON.Vector3 = null): BABYLON.AbstractMesh {
            if (scene == null) return null;
            let result:BABYLON.AbstractMesh = null;
            const prefab:BABYLON.AbstractMesh = BABYLON.SceneManager.GetPrefabMesh(scene, name);
            if (prefab != null) {
                result = prefab.clone(cloneName, newParent, false);
                if (result != null) {
                    if (newPosition != null) result.position = newPosition;
                    if (newRotation != null) result.rotation = newRotation;
                    if (newScaling != null) result.scaling = newScaling;
                    // Recurse all prefab clones
                    let clones:BABYLON.Node[] = null;
                    let childs:BABYLON.Node[] = result.getChildren(null, false);
                    if (childs != null) clones = childs;
                    if (clones == null) clones = [result];
                    else clones.unshift(result);
                    // Parse cloned mesh prefabs
                    const parser:BABYLON.MetadataParser = new BABYLON.MetadataParser(scene);
                    clones.forEach((cloned) => {
                        cloned.name = BABYLON.Utilities.ReplaceAll(cloned.name, "Prefab.", "");
                        cloned.id = BABYLON.Utilities.CreateGuid(cloned.uniqueId.toFixed());
                        cloned.setEnabled(true);
                        const clone:BABYLON.AbstractMesh = cloned as BABYLON.AbstractMesh;
                        const source:any = (<any>clone).source || (<any>clone).sourceMesh;
                        if (source != null) {
                            // Clone source skeleton
                            if (clone.skeleton == null && source.skeleton != null) {
                                const skeletonName:string = (clone.name + "." + source.skeleton.name);
                                clone.skeleton = source.skeleton.clone(skeletonName, skeletonName);
                                // Copy bone metadata
                                if (clone.skeleton != null && clone.skeleton.bones != null && source.skeleton.bones != null) {
                                    if (clone.skeleton.bones.length === source.skeleton.bones.length) {
                                        const boneCount:number = clone.skeleton.bones.length;
                                        for (let boneIndex = 0; boneIndex < boneCount; boneIndex++) {
                                            const bone:BABYLON.Bone = clone.skeleton.bones[boneIndex];
                                            if (bone.metadata == null && source.skeleton.bones[boneIndex].metadata != null) {
                                                bone.metadata = source.skeleton.bones[boneIndex].metadata;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        parser.parseSceneComponents(clone);
                    });
                    parser.postProcessSceneComponents();
                } else {
                    BABYLON.Tools.Warn("Failed to create prefab of: " + name);
                }
            } else {
                BABYLON.Tools.Warn("Failed to lookup source mesh: " + name);
            }
            return result;
        }

        // ************************************* //
        // * Scene Manager Component Functions * //
        // ************************************* //

        /** TODO */
        public static RegisterScriptComponent(instance:BABYLON.ScriptComponent, validate:boolean = true):void {
            if (instance != null && (<any>instance).registerComponentInstance) {
                (<any>instance).registerComponentInstance(instance, validate);
            }
        }
        /** TODO */
        public static DestroyScriptComponent(instance:BABYLON.ScriptComponent):void {
            if (instance != null && (<any>instance).destroyComponentInstance) {
                (<any>instance).destroyComponentInstance(instance);
            }
        }
        /** Finds a script component in the scene with the specfied class name. */
        public static FindScriptComponent<T extends BABYLON.ScriptComponent>(transform: BABYLON.TransformNode, klass: string): T {
            if (transform == null) return null;
            let result: any = null;
            if (transform.metadata != null && transform.metadata.unity) {
                const metadata: any = transform.metadata.unity;
                if (metadata.components != null && metadata.components.length > 0) {
                    for (let ii: number = 0; ii < metadata.components.length; ii++) {
                        const transformscript: any = metadata.components[ii];
                        if (transformscript.instance != null && transformscript.klass === klass) {
                            result = transformscript.instance;
                            break;
                        }
                    }
                }
            }
            return (result != null) ? result as T : null;
        }
        /** Finds all script components in the scene with the specfied class name. */
        public static FindScriptComponents<T extends BABYLON.ScriptComponent>(transform: BABYLON.TransformNode, klass: string): T[] {
            if (transform == null) return null;
            let result: any[] = null;
            if (transform.metadata != null && transform.metadata.unity) {
                const metadata: any = transform.metadata.unity;
                if (metadata.components != null && metadata.components.length > 0) {
                    for (let ii: number = 0; ii < metadata.components.length; ii++) {
                        const transformscript: any = metadata.components[ii];
                        if (transformscript.instance != null && transformscript.klass === klass) {
                            result.push(transformscript.instance);
                        }
                    }
                }
            }
            return (result != null) ? result as T[] : null;
        }
        /** Finds the transform object metedata in the scene. */
        public static FindSceneMetadata(transform: BABYLON.TransformNode): any {
            if (transform == null) return null;
            return (transform.metadata != null && transform.metadata.unity) ? transform.metadata.unity : null;
        }
        /** Finds the specfied particle system rig in the scene. */
        public static FindSceneParticleRig(transform: BABYLON.TransformNode): BABYLON.ParticleSystem {
            if (transform == null) return null;
            return ((<any>transform).particleRig != null) ? (<any>transform).particleRig : null;
        }
        /** Finds the specfied camera rig in the scene. */
        public static FindSceneCameraRig(transform: BABYLON.TransformNode): BABYLON.Camera {
            if (transform == null) return null;
            return ((<any>transform).cameraRig != null) ? (<any>transform).cameraRig : null;
        }
        /** Finds the specfied light rig in the scene. */
        public static FindSceneLightRig(transform: BABYLON.TransformNode): BABYLON.Light {
            if (transform == null) return null;
            return ((<any>transform).lightRig != null) ? (<any>transform).lightRig : null;
        }
        /** Finds the specfied lens flare system rig in the scene. */
        public static FindSceneFlareRig(transform: BABYLON.TransformNode): BABYLON.LensFlareSystem {
            if (transform == null) return null;
            return ((<any>transform).flareRig != null) ? (<any>transform).flareRig : null;
        }
        /** Finds the specfied child mesh in the scene. */
        public static FindSceneChildMesh(transform:BABYLON.TransformNode, name:string, searchType:BABYLON.SearchType = BABYLON.SearchType.StartsWith, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null):BABYLON.AbstractMesh {
            if (transform == null) return null;
            const search:BABYLON.SearchType = (searchType != null) ? searchType : BABYLON.SearchType.StartsWith;
            const children:BABYLON.AbstractMesh[] = transform.getChildMeshes(directDecendantsOnly, predicate) as BABYLON.AbstractMesh[];
            return BABYLON.Utilities.FindMesh(name, children, search);
        }
        /** Finds the specfied child transform in the scene. */
        public static FindSceneChildTransform(transform:BABYLON.TransformNode, name:string, searchType:BABYLON.SearchType = BABYLON.SearchType.StartsWith, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null):BABYLON.AbstractMesh {
            if (transform == null) return null;
            const search:BABYLON.SearchType = (searchType != null) ? searchType : BABYLON.SearchType.StartsWith;
            const children:BABYLON.AbstractMesh[] = transform.getChildTransformNodes(directDecendantsOnly, predicate) as BABYLON.AbstractMesh[];
            return BABYLON.Utilities.FindMesh(name, children, search);
        }

        // **************************************** //
        // *  Scene Manager Navigation Functions  * //
        // **************************************** //

        /** Gets the default navigation zone (https://github.com/wanadev/babylon-navigation-mesh) */
        public static GetNavigationZone(): string {
            return "scene";
        }
        /** Build navigation mesh zone nodes (https://github.com/wanadev/babylon-navigation-mesh) */
        public static BuildNavigationNodes(scene:BABYLON.Scene, customNavMesh:BABYLON.AbstractMesh = null): Navigation {
            let navigation:Navigation = null;
            const navmesh:BABYLON.AbstractMesh = customNavMesh || BABYLON.SceneManager.GetNavigationMesh(scene);
            if (navmesh != null) {
                navigation = new Navigation();
                const zoneNodes: any = navigation.buildNodes(navmesh);
                if (zoneNodes != null) {
                    navigation.setZoneData(BABYLON.SceneManager.GetNavigationZone(), zoneNodes);
                } else {
                    BABYLON.Tools.Warn("Failed to build navigation zone nodes");
                }
            } else {
                BABYLON.Tools.Warn("Failed to locate scene navigation mesh");
            }
            return navigation;
        }
        /** Finds a navigation path and returns a array of navigation positions (https://github.com/wanadev/babylon-navigation-mesh) */
        public static FindNavigationPath(navigation:Navigation, origin: BABYLON.Vector3, destination: BABYLON.Vector3): BABYLON.Vector3[] {
            const zone: string = BABYLON.SceneManager.GetNavigationZone();
            const group: number = navigation.getGroup(zone, origin);
            return navigation.findPath(origin, destination, zone, group);
        }

        // *********************************** //
        // * Scene Manager Physics Functions * //
        // *********************************** //

        private static PhysicsViewer:BABYLON.Debug.PhysicsViewer = null;

        /** Callback to setup ammo.js plugin when activated on the scene */
        public static OnSetupPhysicsPlugin:(scene:BABYLON.Scene, plugin:BABYLON.AmmoJSPlugin)=>void = null;

        /** Applies force to transform using physics impostor. */
        public static ApplyEntityForce(entity:BABYLON.AbstractMesh, force:BABYLON.Vector3, contact:BABYLON.Vector3) : void {
            if (entity == null) return;
            if (entity.physicsImpostor != null && entity.physicsImpostor.physicsBody != null) {
                if (force != null) entity.physicsImpostor.applyForce(force, contact);
            }
        }
        /** Applies impulse to entity using physics impostor. */
        public static ApplyEntityImpulse(entity:BABYLON.AbstractMesh, impusle:BABYLON.Vector3, contact:BABYLON.Vector3) : void {
            if (entity == null) return;
            if (entity.physicsImpostor != null && entity.physicsImpostor.physicsBody != null) {
                if (impusle != null) entity.physicsImpostor.applyImpulse(impusle, contact);
            }
        }
        /** Applies friction to entity using physics impostor. */
        public static ApplyEntityFriction(entity:BABYLON.AbstractMesh, friction:number):void {
            if (entity == null) return;
            if (entity.physicsImpostor != null && entity.physicsImpostor.physicsBody != null && entity.physicsImpostor.physicsBody.material != null) {
                if (entity.physicsImpostor.physicsBody.material.friction !== friction) {
                    entity.physicsImpostor.physicsBody.material.friction = friction;
                }
            }
        }
        /** Gets mass of entity using physics impostor. */
        public static GetEntityMass(entity:BABYLON.AbstractMesh):number {
            if (entity == null) return 0;
            let result:number = 0;
            if (entity.physicsImpostor != null) {
                result = entity.physicsImpostor.mass;
            }
            return result;
        }
        /** Sets mass to entity using physics impostor. */
        public static SetEntityMass(entity:BABYLON.AbstractMesh, mass:number):void {
            if (entity == null) return;
            if (entity.physicsImpostor != null) {
                entity.physicsImpostor.mass = mass;
                //entity.physicsImpostor.setMass(mass);
            }
        }
        /** Gets restitution of entity using physics impostor. */
        public static GetEntityRestitution(entity:BABYLON.AbstractMesh):number {
            if (entity == null) return 0;
            let result:number = 0;
            if (entity.physicsImpostor != null) {
                result = entity.physicsImpostor.restitution;
            }
            return result;
        }
        /** Sets restitution to entity using physics impostor. */
        public static SetEntityRestitution(entity:BABYLON.AbstractMesh, restitution:number):void {
            if (entity == null) return;
            if (entity.physicsImpostor != null) {
                entity.physicsImpostor.restitution = restitution;
            }
        }
        /** Gets entity friction level using physics impostor. */
        public static GetEntityFrictionLevel(entity:BABYLON.AbstractMesh):number {
            if (entity == null) return 0;
            let result:number = 0;
            if (entity.physicsImpostor != null && entity.physicsImpostor.physicsBody != null && entity.physicsImpostor.physicsBody.material != null) {
                result = entity.physicsImpostor.physicsBody.material.friction;
            }
            return result;
        }
        /** Gets entity linear velocity using physics impostor. */
        public static GetEntityLinearVelocity(entity:BABYLON.AbstractMesh):BABYLON.Vector3 {
            if (entity == null) return null;
            let result:BABYLON.Vector3 = null;
            if (entity.physicsImpostor != null && entity.physicsImpostor.physicsBody != null) {
                result = entity.physicsImpostor.getLinearVelocity();
            }
            return result;
        }
        /** Sets entity linear velocity using physics impostor. */
        public static SetEntityLinearVelocity(entity:BABYLON.AbstractMesh, velocity:BABYLON.Vector3):void {
            if (entity == null) return;
            if (entity.physicsImpostor != null && entity.physicsImpostor.physicsBody != null) {
                if (velocity != null) entity.physicsImpostor.setLinearVelocity(velocity);
            }
        }
        /** Gets entity angular velocity using physics impostor. */
        public static GetEntityAngularVelocity(entity:BABYLON.AbstractMesh):BABYLON.Vector3 {
            if (entity == null) return null;
            let result:BABYLON.Vector3 = null;
            if (entity.physicsImpostor != null && entity.physicsImpostor.physicsBody != null) {
                result = entity.physicsImpostor.getAngularVelocity();
            }
            return result;
        }
        /** Sets entity angular velocity using physics impostor. */
        public static SetEntityAngularVelocity(entity:BABYLON.AbstractMesh, velocity:BABYLON.Vector3):void {
            if (entity == null) return;
            if (entity.physicsImpostor != null && entity.physicsImpostor.physicsBody != null) {
                if (velocity != null) entity.physicsImpostor.setAngularVelocity(velocity);
            }
        }
        /** Checks collision contact of the entity using physics impostor. */
        public static CheckEntityCollisionContact(entity:BABYLON.AbstractMesh, collider:BABYLON.AbstractMesh, contact:BABYLON.CollisionContact, threashold:number = 0.5):boolean {
            if (entity == null) return false;
            let result:boolean = false;
            if (entity.physicsImpostor != null && entity.physicsImpostor.physicsBody != null) {
                // TODO: Valid Grounding Contact
                result = true;
            }
            return result;
        }

        // ************************************ //
        // * Scene Manager Impostor Functions * //
        // ************************************ //

        /** Shows the entity physics impostor for debugging. */
        public static ShowEntityPhysicsImpostor(scene:BABYLON.Scene, entity:BABYLON.AbstractMesh) : void {
            if (entity == null) return;
            if (entity.physicsImpostor != null && entity.physicsImpostor.physicsBody != null) {
                if (BABYLON.SceneManager.PhysicsViewer == null) {
                    BABYLON.SceneManager.PhysicsViewer = new BABYLON.Debug.PhysicsViewer(scene);
                }
                if (BABYLON.SceneManager.PhysicsViewer != null) {
                    BABYLON.SceneManager.PhysicsViewer.showImpostor(entity.physicsImpostor);
                }
            }
        }
        /** Hides the entity physics impostor for debugging. */
        public static HideEntityPhysicsImpostor(scene:BABYLON.Scene, entity:BABYLON.AbstractMesh) : void {
            if (entity == null) return;
            if (entity.physicsImpostor != null && entity.physicsImpostor.physicsBody != null) {
                if (BABYLON.SceneManager.PhysicsViewer != null) {
                    BABYLON.SceneManager.PhysicsViewer.hideImpostor(entity.physicsImpostor);
                }
            }
        }
        
        // *********************************** //
        // *  Scene Movement Helper Support  * //
        // *********************************** //
        
        /** Moves entity using collisions. */
        public static MoveWithCollisions(entity:BABYLON.AbstractMesh, velocity:BABYLON.Vector3) : void {
            if (entity == null) return null;
            if (velocity != null) entity.moveWithCollisions(velocity);
        }
        /** Moves entity using positions. */
        public static MoveWithTranslation(entity:BABYLON.AbstractMesh, velocity:BABYLON.Vector3) : void {
            if (entity == null) return null;
            if (velocity != null) entity.position.addInPlace(velocity);
        }
        /** Turns entity using rotations. */
        public static TurnWithRotation(entity:BABYLON.AbstractMesh, rotation:number = 0.0) : void {
            if (entity == null) return null;
            if (rotation != 0.0) entity.rotate(BABYLON.Axis.Y, rotation * BABYLON.System.Deg2Rad);
        }
        
        // ********************************** //
        // * Scene Manager Inputs Functions * //
        // ********************************** //

        /** TODO */
        public static GamepadManager:BABYLON.GamepadManager = null;
        /** TODO */
        public static GamepadConnected:(pad: BABYLON.Gamepad, state:BABYLON.EventState) => void = null;
        /** TODO */
        public static GamepadDisconnected:(pad: BABYLON.Gamepad, state:BABYLON.EventState) => void = null;
        /** Enable user input state in the scene. */
        public static EnableUserInput(scene:BABYLON.Scene, options: { preventDefault?: boolean, useCapture?: boolean, enableVirtualJoystick?: boolean, disableRightStick?:boolean } = null): void {
            const preventDefault: boolean = (options != null && options.preventDefault) ? options.preventDefault : false;
            const useCapture: boolean = (options != null && options.useCapture) ? options.useCapture : false;
            const enableVirtualJoystick: boolean = (options != null && options.enableVirtualJoystick) ? options.enableVirtualJoystick : false;
            const disableRightJoystick: boolean = (options != null && options.disableRightStick) ? options.disableRightStick : false;
            BABYLON.SceneManager.resetUserInput();
            if (!BABYLON.SceneManager.input) {
                // Document element event listeners
                document.documentElement.tabIndex = 1;
                document.documentElement.addEventListener("keyup", BABYLON.SceneManager.inputKeyUpHandler, useCapture);
                document.documentElement.addEventListener("keydown", BABYLON.SceneManager.inputKeyDownHandler, useCapture);
                document.documentElement.addEventListener("pointerup", BABYLON.SceneManager.inputPointerUpHandler, useCapture);
                document.documentElement.addEventListener("pointerdown", BABYLON.SceneManager.inputPointerDownHandler, useCapture);
                document.documentElement.addEventListener("pointermove", BABYLON.SceneManager.inputPointerMoveHandler, useCapture);
                document.documentElement.addEventListener("onwheel" in document ? "wheel" : "mousewheel", BABYLON.SceneManager.inputPointerWheelHandler, useCapture);
                BABYLON.SceneManager.preventDefault = preventDefault;
                // Note: Only Enable Gamepad Manager Once
                if (BABYLON.SceneManager.GamepadManager == null) {
                    BABYLON.SceneManager.GamepadManager = new BABYLON.GamepadManager(); // Note: Do Not Use Scene.GameManager Instance
                    BABYLON.SceneManager.GamepadManager.onGamepadConnectedObservable.add(BABYLON.SceneManager.inputManagerGamepadConnected)
                    BABYLON.SceneManager.GamepadManager.onGamepadDisconnectedObservable.add(BABYLON.SceneManager.inputManagerGamepadDisconnected)
                }
                // Note: Only Enable Virtual Joysticks Once
                if (BABYLON.SceneManager.virtualJoystick === false) {
                    BABYLON.SceneManager.virtualJoystick = enableVirtualJoystick;
                    if (BABYLON.SceneManager.virtualJoystick === true) {
                        if (BABYLON.SceneManager.leftJoystick == null) {
                            BABYLON.SceneManager.leftJoystick = new BABYLON.VirtualJoystick(true);
                            BABYLON.SceneManager.leftJoystick.setJoystickSensibility(BABYLON.UserInputOptions.JoystickLeftSensibility * 5);
                        }
                        if (disableRightJoystick === false && BABYLON.SceneManager.rightJoystick == null) {
                            BABYLON.SceneManager.rightJoystick = new BABYLON.VirtualJoystick(false);
                            BABYLON.SceneManager.rightJoystick.reverseUpDown = true;
                            BABYLON.SceneManager.rightJoystick.setJoystickSensibility(BABYLON.UserInputOptions.JoystickRightSensibility * 5);
                            BABYLON.SceneManager.rightJoystick.setJoystickColor(BABYLON.UserInputOptions.JoystickRightHandleColor);
                        }
                    }
                }
                BABYLON.SceneManager.input = true;
                document.documentElement.focus();
            }
            scene.registerAfterRender(BABYLON.SceneManager.updateUserInput);
        }
        /** Disables user input state in the scene. */
        public static DisableUserInput(scene:BABYLON.Scene, useCapture: boolean = false): void {
            scene.unregisterAfterRender(BABYLON.SceneManager.updateUserInput);
            BABYLON.SceneManager.resetUserInput();
        }

        // ********************************** //
        // *  Scene Get User Input Support  * //
        // ********************************** //

        /** Get user input state from the scene. */
        public static GetUserInput(input: BABYLON.UserInputAxis, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): number {
            let result: number = 0;
            if (BABYLON.SceneManager.input) {
                switch (input) {
                    case BABYLON.UserInputAxis.Vertical:
                    case BABYLON.UserInputAxis.Horizontal:
                        if (player === BABYLON.PlayerNumber.Four) {
                            result = (input === BABYLON.UserInputAxis.Horizontal) ? BABYLON.SceneManager.horizontal4 : BABYLON.SceneManager.vertical4;
                        } else if (player === BABYLON.PlayerNumber.Three) {
                            result = (input === BABYLON.UserInputAxis.Horizontal) ? BABYLON.SceneManager.horizontal3 : BABYLON.SceneManager.vertical3;
                        } else if (player === BABYLON.PlayerNumber.Two) {
                            result = (input === BABYLON.UserInputAxis.Horizontal) ? BABYLON.SceneManager.horizontal2 : BABYLON.SceneManager.vertical2;
                        } else {
                            result = (input === BABYLON.UserInputAxis.Horizontal) ? BABYLON.SceneManager.horizontal : BABYLON.SceneManager.vertical;
                        }
                        break;
                    case BABYLON.UserInputAxis.MouseX:
                    case BABYLON.UserInputAxis.MouseY:
                        if (player === BABYLON.PlayerNumber.Four) {
                            result = (input === BABYLON.UserInputAxis.MouseX) ? BABYLON.SceneManager.mousex4 : BABYLON.SceneManager.mousey4;
                        } else if (player === BABYLON.PlayerNumber.Three) {
                            result = (input === BABYLON.UserInputAxis.MouseX) ? BABYLON.SceneManager.mousex3 : BABYLON.SceneManager.mousey3;
                        } else if (player === BABYLON.PlayerNumber.Two) {
                            result = (input === BABYLON.UserInputAxis.MouseX) ? BABYLON.SceneManager.mousex2 : BABYLON.SceneManager.mousey2;
                        } else {
                            result = (input === BABYLON.UserInputAxis.MouseX) ? BABYLON.SceneManager.mousex : BABYLON.SceneManager.mousey;
                        }
                        break;
                    case BABYLON.UserInputAxis.ClientX:
                    case BABYLON.UserInputAxis.ClientY:
                        if (player === BABYLON.PlayerNumber.One) {
                            result = (input === BABYLON.UserInputAxis.ClientX) ? BABYLON.SceneManager.clientx : BABYLON.SceneManager.clienty;
                        }
                        break;
                    case BABYLON.UserInputAxis.Wheel:
                        if (player === BABYLON.PlayerNumber.One) {
                            result = BABYLON.SceneManager.wheel;
                        }
                        break;
                }
            }
            return result;
        }
        
        // ********************************* //
        // *  Scene Keycode State Support  * //
        // ********************************* //
        
        /** TODO */
        public static OnKeyboardUp(callback: (keycode: number) => void): void {
            if (BABYLON.SceneManager.input) BABYLON.SceneManager.keyButtonUp.push(callback);
        }
        /** TODO */
        public static OnKeyboardDown(callback: (keycode: number) => void): void {
            if (BABYLON.SceneManager.input) BABYLON.SceneManager.keyButtonDown.push(callback);
        }
        /** TODO */
        public static OnKeyboardPress(keycode: number, callback: () => void): void {
            if (BABYLON.SceneManager.input) BABYLON.SceneManager.keyButtonPress.push({ index: keycode, action: callback });
        }
        /** TODO */
        public static GetKeyboardInput(keycode: number): boolean {
            let result: boolean = false;
            if (BABYLON.SceneManager.input) {
                let key: string = "k:" + keycode.toString();
                if (BABYLON.SceneManager.keymap[key] != null) {
                    result = BABYLON.SceneManager.keymap[key];
                }
            }
            return result;
        }

        // ********************************* //
        // *   Scene Mouse State Support   * //
        // ********************************* //

        /** TODO */
        public static OnPointerUp(callback: (button: number) => void): void {
            if (BABYLON.SceneManager.input) BABYLON.SceneManager.mouseButtonUp.push(callback);
        }
        /** TODO */
        public static OnPointerDown(callback: (button: number) => void): void {
            if (BABYLON.SceneManager.input) BABYLON.SceneManager.mouseButtonDown.push(callback);
        }
        /** TODO */
        public static OnPointerPress(button: number, callback: () => void): void {
            if (BABYLON.SceneManager.input) BABYLON.SceneManager.mouseButtonPress.push({ index: button, action: callback });
        }
        /** TODO */
        public static GetPointerInput(button: number): boolean {
            let result: boolean = false;
            if (BABYLON.SceneManager.input) {
                let key: string = "p:" + button.toString();
                if (BABYLON.SceneManager.keymap[key] != null) {
                    result = BABYLON.SceneManager.keymap[key];
                }
            }
            return result;
        }

        // ********************************** //
        // *  Scene Joystick State Support  * //
        // ********************************** //

        /** TODO */
        public static GetLeftJoystick(): BABYLON.VirtualJoystick {
            return (BABYLON.SceneManager.input) ? BABYLON.SceneManager.leftJoystick : null;
        }
        /** TODO */
        public static GetRightJoystick(): BABYLON.VirtualJoystick {
            return (BABYLON.SceneManager.input) ? BABYLON.SceneManager.rightJoystick : null;
        }
        /** TODO */
        public static GetJoystickPress(button:number): boolean {
            let result: boolean = false;
            if (BABYLON.SceneManager.input) {
                if (button === BABYLON.JoystickButton.Left && BABYLON.SceneManager.leftJoystick != null && BABYLON.SceneManager.leftJoystick.pressed === true) {
                    result = true;
                } else if (button === BABYLON.JoystickButton.Right && BABYLON.SceneManager.rightJoystick != null && BABYLON.SceneManager.rightJoystick.pressed === true) {
                    result = true;
                }
            }
            return result;
        }
        /** TODO */
        public static DisposeVirtualJoysticks(): void {
            if (BABYLON.SceneManager.input) {
                if (BABYLON.SceneManager.leftJoystick != null) {
                    BABYLON.SceneManager.leftJoystick.releaseCanvas();
                    BABYLON.SceneManager.leftJoystick = null;
                }
                if (BABYLON.SceneManager.rightJoystick != null) {
                    BABYLON.SceneManager.rightJoystick.releaseCanvas();
                    BABYLON.SceneManager.rightJoystick = null;
                }
                BABYLON.SceneManager.virtualJoystick = false;
            }
        }

        // ********************************* //
        // *  Scene Gamepad State Support  * //
        // ********************************* //

        /** TODO */
        public static OnGamepadButtonUp(callback: (button: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (BABYLON.SceneManager.input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1ButtonUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2ButtonUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3ButtonUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4ButtonUp.push(callback);
                        break;
                }
            }
        }
        /** TODO */
        public static OnGamepadButtonDown(callback: (button: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (BABYLON.SceneManager.input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1ButtonDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2ButtonDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3ButtonDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4ButtonDown.push(callback);
                        break;
                }
            }
        }
        /** TODO */
        public static OnGamepadButtonPress(button: number, callback: () => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (BABYLON.SceneManager.input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1ButtonPress.push({ index: button, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2ButtonPress.push({ index: button, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3ButtonPress.push({ index: button, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4ButtonPress.push({ index: button, action: callback });
                        break;
                }
            }
        }
        /** TODO */
        public static GetGamepadButtonInput(button: number, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): boolean {
            let result: boolean = false;
            if (BABYLON.SceneManager.input) {
                let key: string = null;
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        key = "b1:" + button.toString();
                        break;
                    case BABYLON.PlayerNumber.Two:
                        key = "b2:" + button.toString();
                        break;
                    case BABYLON.PlayerNumber.Three:
                        key = "b3:" + button.toString();
                        break;
                    case BABYLON.PlayerNumber.Four:
                        key = "b4:" + button.toString();
                        break;
                }
                if (key != null && BABYLON.SceneManager.keymap[key] != null) {
                    result = BABYLON.SceneManager.keymap[key];
                }
            }
            return result;
        }
        /** TODO */
        public static OnGamepadDirectionUp(callback: (direction: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (BABYLON.SceneManager.input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1DpadUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2DpadUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3DpadUp.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4DpadUp.push(callback);
                        break;
                }
            }
        }
        /** TODO */
        public static OnGamepadDirectionDown(callback: (direction: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (BABYLON.SceneManager.input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1DpadDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2DpadDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3DpadDown.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4DpadDown.push(callback);
                        break;
                }
            }
        }
        /** TODO */
        public static OnGamepadDirectionPress(direction: number, callback: () => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (BABYLON.SceneManager.input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1DpadPress.push({ index: direction, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2DpadPress.push({ index: direction, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3DpadPress.push({ index: direction, action: callback });
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4DpadPress.push({ index: direction, action: callback });
                        break;
                }
            }
        }
        /** TODO */
        public static GetGamepadDirectionInput(direction: number, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): boolean {
            let result: boolean = false;
            if (BABYLON.SceneManager.input) {
                let key: string = null;
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        key = "d1:" + direction.toString();
                        break;
                    case BABYLON.PlayerNumber.Two:
                        key = "d2:" + direction.toString();
                        break;
                    case BABYLON.PlayerNumber.Three:
                        key = "d3:" + direction.toString();
                        break;
                    case BABYLON.PlayerNumber.Four:
                        key = "d4:" + direction.toString();
                        break;
                }
                if (key != null && BABYLON.SceneManager.keymap[key] != null) {
                    result = BABYLON.SceneManager.keymap[key];
                }
            }
            return result;
        }
        /** TODO */
        public static OnGamepadTriggerLeft(callback: (value: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (BABYLON.SceneManager.input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1LeftTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2LeftTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3LeftTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4LeftTrigger.push(callback);
                        break;
                }
            }
        }
        /** TODO */
        public static OnGamepadTriggerRight(callback: (value: number) => void, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (BABYLON.SceneManager.input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        BABYLON.SceneManager.gamepad1RightTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        BABYLON.SceneManager.gamepad2RightTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        BABYLON.SceneManager.gamepad3RightTrigger.push(callback);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        BABYLON.SceneManager.gamepad4RightTrigger.push(callback);
                        break;
                }
            }
        }
        /** TODO */
        public static GetGamepadTriggerInput(trigger: number, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): number {
            let result: number = 0;
            if (BABYLON.SceneManager.input) {
                let key: string = null;
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        key = "t1:" + trigger.toString();
                        break;
                    case BABYLON.PlayerNumber.Two:
                        key = "t2:" + trigger.toString();
                        break;
                    case BABYLON.PlayerNumber.Three:
                        key = "t3:" + trigger.toString();
                        break;
                    case BABYLON.PlayerNumber.Four:
                        key = "t4:" + trigger.toString();
                        break;
                }
                if (key != null && BABYLON.SceneManager.keymap[key] != null) {
                    result = BABYLON.SceneManager.keymap[key];
                }
            }
            return result;
        }
        /** TODO */
        public static GetGamepadType(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): BABYLON.GamepadType {
            let type:BABYLON.GamepadType = BABYLON.GamepadType.None;
            if (BABYLON.SceneManager.input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        type = BABYLON.SceneManager.gamepad1Type;
                        break;
                    case BABYLON.PlayerNumber.Two:
                        type = BABYLON.SceneManager.gamepad2Type;
                        break;
                    case BABYLON.PlayerNumber.Three:
                        type = BABYLON.SceneManager.gamepad3Type;
                        break;
                    case BABYLON.PlayerNumber.Four:
                        type = BABYLON.SceneManager.gamepad4Type;
                        break;
                }
            }
            return type;
        }
        /** TODO */
        public static GetGamepad(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): BABYLON.Gamepad {
            let pad:BABYLON.Gamepad = null;
            if (BABYLON.SceneManager.input) {
                switch(player) {
                    case BABYLON.PlayerNumber.One:
                        pad = BABYLON.SceneManager.gamepad1;
                        break;
                    case BABYLON.PlayerNumber.Two:
                        pad = BABYLON.SceneManager.gamepad2;
                        break;
                    case BABYLON.PlayerNumber.Three:
                        pad = BABYLON.SceneManager.gamepad3;
                        break;
                    case BABYLON.PlayerNumber.Four:
                        pad = BABYLON.SceneManager.gamepad4;
                        break;
                }
            }
            return pad;
        }

        // ************************************** //
        // * Babylon Xbox Live Helper Functions * //
        // ************************************** //

        /** Are xbox live platform services available and user enabled. */
        public static IsXboxLivePluginEnabled(): boolean {
            return ((<any>window).isXboxLivePluginEnabled) ? (<any>window).isXboxLivePluginEnabled() : false;
        }
        /** Is xbox live user signed in if platform services enabled. */
        public static IsXboxLiveUserSignedIn(systemUser: Windows.System.User = null, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): boolean {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                let user: Microsoft.Xbox.Services.System.XboxLiveUser = (systemUser != null) ? BABYLON.SceneManager.GetXboxLiveSystemUser(systemUser, player) : BABYLON.SceneManager.GetXboxLiveUser(player);
                return (user != null && user.isSignedIn == true);
            } else {
                return false;
            }
        }
        /** Validated sign in xbox live user if platform services available. */
        public static XboxLiveUserSignIn(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): void {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                BABYLON.SceneManager.XboxLiveUserSilentSignIn(player, (first: Microsoft.Xbox.Services.System.SignInResult) => {
                    if (first.status === Microsoft.Xbox.Services.System.SignInStatus.userInteractionRequired) {
                        BABYLON.SceneManager.XboxLiveUserDialogSignIn(player, (second: Microsoft.Xbox.Services.System.SignInResult) => {
                            if (oncomplete) oncomplete(second);
                        }, onerror, onprogress);
                    } else {
                        if (oncomplete) oncomplete(first);
                    }
                }, onerror, onprogress);
            }
        }
        /** Silent sign in xbox live user if platform services available. */
        public static XboxLiveUserSilentSignIn(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void> {
            return (BABYLON.SceneManager.IsXboxLivePluginEnabled()) ? BABYLON.SceneManager.GetXboxLiveUser(player).signInSilentlyAsync(null).then(oncomplete, onerror, onprogress) : null;
        }
        /** Dialog sign in xbox live user if platform services available. */
        public static XboxLiveUserDialogSignIn(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void> {
            return (BABYLON.SceneManager.IsXboxLivePluginEnabled()) ? BABYLON.SceneManager.GetXboxLiveUser(player).signInAsync(null).then(oncomplete, onerror, onprogress) : null;
        }
        /** Loads a xbox live user profile if platform services available. */
        public static LoadXboxLiveUserProfile(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One, oncomplete?: (result: Microsoft.Xbox.Services.Social.XboxUserProfile) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void> {
            return (BABYLON.SceneManager.IsXboxLivePluginEnabled()) ? BABYLON.SceneManager.GetXboxLiveUserContext(player).profileService.getUserProfileAsync(BABYLON.SceneManager.GetXboxLiveUser(player).xboxUserId).then(oncomplete, onerror, onprogress) : null;
        }
        /** Get xbox live user if platform services available. */
        public static GetXboxLiveUser(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): Microsoft.Xbox.Services.System.XboxLiveUser {
            let user: Microsoft.Xbox.Services.System.XboxLiveUser = null;
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                switch (player) {
                    case BABYLON.PlayerNumber.One:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveUserOne();
                        break;
                    case BABYLON.PlayerNumber.Two:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveUserTwo();
                        break;
                    case BABYLON.PlayerNumber.Three:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveUserThree();
                        break;
                    case BABYLON.PlayerNumber.Four:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveUserFour();
                        break;
               }
            }
            return user;
        }
        /** Get xbox live user if platform services available. */
        public static GetXboxLiveSystemUser(systemUser: Windows.System.User, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): Microsoft.Xbox.Services.System.XboxLiveUser {
            let user: Microsoft.Xbox.Services.System.XboxLiveUser = null;
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                switch (player) {
                    case BABYLON.PlayerNumber.One:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveSystemUserOne(systemUser);
                        break;
                    case BABYLON.PlayerNumber.Two:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveSystemUserTwo(systemUser);
                        break;
                    case BABYLON.PlayerNumber.Three:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveSystemUserThree(systemUser);
                        break;
                    case BABYLON.PlayerNumber.Four:
                        user = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveSystemUserFour(systemUser);
                        break;
               }
            }
            return user;
        }
        /** Get xbox live user context if platform services available. */
        public static GetXboxLiveUserContext(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): Microsoft.Xbox.Services.XboxLiveContext {
            let context: Microsoft.Xbox.Services.XboxLiveContext = null;
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                switch (player) {
                    case BABYLON.PlayerNumber.One:
                        context = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveContextOne();
                        break;
                    case BABYLON.PlayerNumber.Two:
                        context = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveContextTwo();
                        break;
                    case BABYLON.PlayerNumber.Three:
                        context = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveContextThree();
                        break;
                    case BABYLON.PlayerNumber.Four:
                        context = (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveContextFour();
                        break;
               }
            }
            return context;
        }
        /** Resets xbox live user context if platform services available. */
        public static ResetXboxLiveUserContext(player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                    switch (player) {
                        case BABYLON.PlayerNumber.One:
                            (<any>window).BabylonToolkit.XboxLive.Plugin.resetXboxLiveUserContextOne()
                            break;
                        case BABYLON.PlayerNumber.Two:
                            (<any>window).BabylonToolkit.XboxLive.Plugin.resetXboxLiveUserContextTwo()
                            break;
                        case BABYLON.PlayerNumber.Three:
                            (<any>window).BabylonToolkit.XboxLive.Plugin.resetXboxLiveUserContextThree()
                            break;
                        case BABYLON.PlayerNumber.Four:
                            (<any>window).BabylonToolkit.XboxLive.Plugin.resetXboxLiveUserContextFour()
                            break;
                   }
                }
            }
        }
        /** Get xbox live context property if platform services available. */
        public static GetXboxLiveContextProperty(name:any): any {
            return (BABYLON.SceneManager.IsXboxLivePluginEnabled()) ? (<any>window).BabylonToolkit.XboxLive.Plugin.getXboxLiveContextProperty(name) : null;
        }
        /** Get xbox live context property if platform services available. */
        public static SetXboxLiveContextProperty(name: any, property: any): void {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                (<any>window).BabylonToolkit.XboxLive.Plugin.setXboxLiveContextProperty(name, property);
            }
        }
        /** Resets xbox live property context bag if platform services available. */
        public static ResetXboxLivePropertyContexts(): void {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                (<any>window).BabylonToolkit.XboxLive.Plugin.resetXboxLivePropertyContexts()
            }
        }
        /** Sets the Xbox User Sign Out Complete Handler */
        public static SetXboxLiveSignOutHandler(handler: (result: Microsoft.Xbox.Services.System.SignOutCompletedEventArgs) => void = null): void {
            if (BABYLON.SceneManager.IsXboxLivePluginEnabled()) {
                (<any>window).BabylonToolkit.XboxLive.Plugin.onusersignout = handler;
            }
        }

        // ************************************ //
        // *  Private Input Helper Functions  * //
        // ************************************ //
        private static input:boolean = false;
        private static keymap: any = {};
        private static wheel: number = 0;
        private static clientx: number = 0;
        private static clienty: number = 0;
        private static mousex: number = 0;
        private static mousey: number = 0;
        private static vertical: number = 0;
        private static horizontal: number = 0;
        private static mousex2: number = 0;
        private static mousey2: number = 0;
        private static vertical2: number = 0;
        private static horizontal2: number = 0;
        private static mousex3: number = 0;
        private static mousey3: number = 0;
        private static vertical3: number = 0;
        private static horizontal3: number = 0;
        private static mousex4: number = 0;
        private static mousey4: number = 0;
        private static vertical4: number = 0;
        private static horizontal4: number = 0;
        private static x_wheel: number = 0;
        private static x_mousex: number = 0;
        private static x_mousey: number = 0;
        private static x_vertical: number = 0;
        private static x_horizontal: number = 0;
        private static k_mousex: number = 0;
        private static k_mousey: number = 0;
        private static k_vertical: number = 0;
        private static k_horizontal: number = 0;
        private static j_mousex: number = 0;
        private static j_mousey: number = 0;
        private static j_vertical: number = 0;
        private static j_horizontal: number = 0;
        private static g_mousex1: number = 0;
        private static g_mousey1: number = 0;
        private static g_vertical1: number = 0;
        private static g_horizontal1: number = 0;
        private static g_mousex2: number = 0;
        private static g_mousey2: number = 0;
        private static g_vertical2: number = 0;
        private static g_horizontal2: number = 0;
        private static g_mousex3: number = 0;
        private static g_mousey3: number = 0;
        private static g_vertical3: number = 0;
        private static g_horizontal3: number = 0;
        private static g_mousex4: number = 0;
        private static g_mousey4: number = 0;
        private static g_vertical4: number = 0;
        private static g_horizontal4: number = 0;
        private static mouseButtonPress: BABYLON.UserInputPress[] = [];
        private static mouseButtonDown: BABYLON.UserInputAction[] = [];
        private static mouseButtonUp: BABYLON.UserInputAction[] = [];
        private static keyButtonPress: BABYLON.UserInputPress[] = [];
        private static keyButtonDown: BABYLON.UserInputAction[] = [];
        private static keyButtonUp: BABYLON.UserInputAction[] = [];
        private static leftJoystick: BABYLON.VirtualJoystick = null;
        private static rightJoystick: BABYLON.VirtualJoystick = null;
        private static virtualJoystick:boolean = false;
        private static previousPosition: { x: number, y: number } = null;
        private static preventDefault: boolean = false;
        private static rightHanded: boolean = true;
        private static gamepad1: BABYLON.Gamepad = null;
        private static gamepad1Type: BABYLON.GamepadType = -1;
        private static gamepad1ButtonPress: BABYLON.UserInputPress[] = [];
        private static gamepad1ButtonDown: BABYLON.UserInputAction[] = [];
        private static gamepad1ButtonUp: BABYLON.UserInputAction[] = [];
        private static gamepad1DpadPress: BABYLON.UserInputPress[] = [];
        private static gamepad1DpadDown: BABYLON.UserInputAction[] = [];
        private static gamepad1DpadUp: BABYLON.UserInputAction[] = [];
        private static gamepad1LeftTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad1RightTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad2: BABYLON.Gamepad = null;
        private static gamepad2Type: BABYLON.GamepadType = -1;
        private static gamepad2ButtonPress: BABYLON.UserInputPress[] = [];
        private static gamepad2ButtonDown: BABYLON.UserInputAction[] = [];
        private static gamepad2ButtonUp: BABYLON.UserInputAction[] = [];
        private static gamepad2DpadPress: BABYLON.UserInputPress[] = [];
        private static gamepad2DpadDown: BABYLON.UserInputAction[] = [];
        private static gamepad2DpadUp: BABYLON.UserInputAction[] = [];
        private static gamepad2LeftTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad2RightTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad3: BABYLON.Gamepad = null;
        private static gamepad3Type: BABYLON.GamepadType = -1;
        private static gamepad3ButtonPress: BABYLON.UserInputPress[] = [];
        private static gamepad3ButtonDown: BABYLON.UserInputAction[] = [];
        private static gamepad3ButtonUp: BABYLON.UserInputAction[] = [];
        private static gamepad3DpadPress: BABYLON.UserInputPress[] = [];
        private static gamepad3DpadDown: BABYLON.UserInputAction[] = [];
        private static gamepad3DpadUp: BABYLON.UserInputAction[] = [];
        private static gamepad3LeftTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad3RightTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad4: BABYLON.Gamepad = null;
        private static gamepad4Type: BABYLON.GamepadType = -1;
        private static gamepad4ButtonPress: BABYLON.UserInputPress[] = [];
        private static gamepad4ButtonDown: BABYLON.UserInputAction[] = [];
        private static gamepad4ButtonUp: BABYLON.UserInputAction[] = [];
        private static gamepad4DpadPress: BABYLON.UserInputPress[] = [];
        private static gamepad4DpadDown: BABYLON.UserInputAction[] = [];
        private static gamepad4DpadUp: BABYLON.UserInputAction[] = [];
        private static gamepad4LeftTrigger: BABYLON.UserInputAction[] = [];
        private static gamepad4RightTrigger: BABYLON.UserInputAction[] = [];
        private static debugLayerVisible:boolean = false;
        private static updateUserInput(): void {
            BABYLON.SceneManager.inputVirtualJoysticks();
            // Reset global user input state  buffers
            BABYLON.SceneManager.x_horizontal = 0;
            BABYLON.SceneManager.x_vertical = 0;
            BABYLON.SceneManager.x_mousex = 0;
            BABYLON.SceneManager.x_mousey = 0;
            // Update user input state by order of precedence
            if (BABYLON.SceneManager.j_horizontal !== 0) {
                BABYLON.SceneManager.x_horizontal = BABYLON.SceneManager.j_horizontal;
            } else if (BABYLON.SceneManager.k_horizontal !== 0) {
                BABYLON.SceneManager.x_horizontal = BABYLON.SceneManager.k_horizontal;
            } else if (BABYLON.SceneManager.g_horizontal1 !== 0) {
                BABYLON.SceneManager.x_horizontal = BABYLON.SceneManager.g_horizontal1;
            }
            if (BABYLON.SceneManager.j_vertical !== 0) {
                BABYLON.SceneManager.x_vertical = BABYLON.SceneManager.j_vertical;
            } else if (BABYLON.SceneManager.k_vertical !== 0) {
                BABYLON.SceneManager.x_vertical = BABYLON.SceneManager.k_vertical;
            } else if (BABYLON.SceneManager.g_vertical1 !== 0) {
                BABYLON.SceneManager.x_vertical = BABYLON.SceneManager.g_vertical1;
            }
            if (BABYLON.SceneManager.j_mousex !== 0) {
                BABYLON.SceneManager.x_mousex = BABYLON.SceneManager.j_mousex;
            } else if (BABYLON.SceneManager.k_mousex !== 0) {
                BABYLON.SceneManager.x_mousex = BABYLON.SceneManager.k_mousex;
            } else if (BABYLON.SceneManager.g_mousex1 !== 0) {
                BABYLON.SceneManager.x_mousex = BABYLON.SceneManager.g_mousex1;
            }
            if (BABYLON.SceneManager.j_mousey !== 0) {
                BABYLON.SceneManager.x_mousey = BABYLON.SceneManager.j_mousey;
            } else if (BABYLON.SceneManager.k_mousey !== 0) {
                BABYLON.SceneManager.x_mousey = BABYLON.SceneManager.k_mousey;
            } else if (BABYLON.SceneManager.g_mousey1 !== 0) {
                BABYLON.SceneManager.x_mousey = BABYLON.SceneManager.g_mousey1;
            }
            // Update global user input state buffers
            BABYLON.SceneManager.horizontal = BABYLON.SceneManager.x_horizontal;
            BABYLON.SceneManager.vertical = BABYLON.SceneManager.x_vertical;
            BABYLON.SceneManager.mousex = BABYLON.SceneManager.x_mousex;
            BABYLON.SceneManager.mousey = BABYLON.SceneManager.x_mousey;
            BABYLON.SceneManager.wheel = BABYLON.SceneManager.x_wheel;
            // Update gamepad two user input 
            BABYLON.SceneManager.horizontal2 = BABYLON.SceneManager.g_horizontal2;
            BABYLON.SceneManager.vertical2 = BABYLON.SceneManager.g_vertical2;
            BABYLON.SceneManager.mousex2 = BABYLON.SceneManager.g_mousex2;
            BABYLON.SceneManager.mousey2 = BABYLON.SceneManager.g_mousey2;
            // Update gamepad three user input 
            BABYLON.SceneManager.horizontal3 = BABYLON.SceneManager.g_horizontal3;
            BABYLON.SceneManager.vertical3 = BABYLON.SceneManager.g_vertical3;
            BABYLON.SceneManager.mousex3 = BABYLON.SceneManager.g_mousex3;
            BABYLON.SceneManager.mousey3 = BABYLON.SceneManager.g_mousey3;
            // Update gamepad four user input 
            BABYLON.SceneManager.horizontal4 = BABYLON.SceneManager.g_horizontal4;
            BABYLON.SceneManager.vertical4 = BABYLON.SceneManager.g_vertical4;
            BABYLON.SceneManager.mousex4 = BABYLON.SceneManager.g_mousex4;
            BABYLON.SceneManager.mousey4 = BABYLON.SceneManager.g_mousey4;
            // Reset mouse wheel user input buffer
            BABYLON.SceneManager.x_mousey = 0;
        }
        private static resetUserInput(): void {
            BABYLON.SceneManager.keymap = {};
            BABYLON.SceneManager.wheel = 0;
            BABYLON.SceneManager.clientx = 0;
            BABYLON.SceneManager.clienty = 0;
            BABYLON.SceneManager.mousex = 0;
            BABYLON.SceneManager.mousey = 0;
            BABYLON.SceneManager.vertical = 0;
            BABYLON.SceneManager.horizontal = 0;
            BABYLON.SceneManager.mousex2 = 0;
            BABYLON.SceneManager.mousey2 = 0;
            BABYLON.SceneManager.vertical2 = 0;
            BABYLON.SceneManager.horizontal2 = 0;
            BABYLON.SceneManager.mousex3 = 0;
            BABYLON.SceneManager.mousey3 = 0;
            BABYLON.SceneManager.vertical3 = 0;
            BABYLON.SceneManager.horizontal3 = 0;
            BABYLON.SceneManager.mousex4 = 0;
            BABYLON.SceneManager.mousey4 = 0;
            BABYLON.SceneManager.vertical4 = 0;
            BABYLON.SceneManager.horizontal4 = 0;
            BABYLON.SceneManager.x_wheel = 0;
            BABYLON.SceneManager.x_mousex = 0;
            BABYLON.SceneManager.x_mousey = 0;
            BABYLON.SceneManager.x_vertical = 0;
            BABYLON.SceneManager.x_horizontal = 0;
            BABYLON.SceneManager.k_mousex = 0;
            BABYLON.SceneManager.k_mousey = 0;
            BABYLON.SceneManager.k_vertical = 0;
            BABYLON.SceneManager.k_horizontal = 0;
            BABYLON.SceneManager.j_mousex = 0;
            BABYLON.SceneManager.j_mousey = 0;
            BABYLON.SceneManager.j_vertical = 0;
            BABYLON.SceneManager.j_horizontal = 0;
            BABYLON.SceneManager.g_mousex1 = 0;
            BABYLON.SceneManager.g_mousey1 = 0;
            BABYLON.SceneManager.g_vertical1 = 0;
            BABYLON.SceneManager.g_horizontal1 = 0;
            BABYLON.SceneManager.g_mousex2 = 0;
            BABYLON.SceneManager.g_mousey2 = 0;
            BABYLON.SceneManager.g_vertical2 = 0;
            BABYLON.SceneManager.g_horizontal2 = 0;
            BABYLON.SceneManager.g_mousex3 = 0;
            BABYLON.SceneManager.g_mousey3 = 0;
            BABYLON.SceneManager.g_vertical3 = 0;
            BABYLON.SceneManager.g_horizontal3 = 0;
            BABYLON.SceneManager.g_mousex4 = 0;
            BABYLON.SceneManager.g_mousey4 = 0;
            BABYLON.SceneManager.g_vertical4 = 0;
            BABYLON.SceneManager.g_horizontal4 = 0;
            BABYLON.SceneManager.preventDefault = false;
            BABYLON.SceneManager.mouseButtonUp = [];
            BABYLON.SceneManager.mouseButtonDown = [];
            BABYLON.SceneManager.mouseButtonPress = [];
            BABYLON.SceneManager.keyButtonUp = [];
            BABYLON.SceneManager.keyButtonDown = [];
            BABYLON.SceneManager.keyButtonPress = [];
            BABYLON.SceneManager.gamepad1ButtonUp = [];
            BABYLON.SceneManager.gamepad1ButtonDown = [];
            BABYLON.SceneManager.gamepad1ButtonPress = [];
            BABYLON.SceneManager.gamepad1DpadUp = [];
            BABYLON.SceneManager.gamepad1DpadDown = [];
            BABYLON.SceneManager.gamepad1DpadPress = [];
            BABYLON.SceneManager.gamepad1LeftTrigger = [];
            BABYLON.SceneManager.gamepad1RightTrigger = [];
            BABYLON.SceneManager.gamepad2ButtonUp = [];
            BABYLON.SceneManager.gamepad2ButtonDown = [];
            BABYLON.SceneManager.gamepad2ButtonPress = [];
            BABYLON.SceneManager.gamepad2DpadUp = [];
            BABYLON.SceneManager.gamepad2DpadDown = [];
            BABYLON.SceneManager.gamepad2DpadPress = [];
            BABYLON.SceneManager.gamepad2LeftTrigger = [];
            BABYLON.SceneManager.gamepad2RightTrigger = [];
            BABYLON.SceneManager.gamepad3ButtonUp = [];
            BABYLON.SceneManager.gamepad3ButtonDown = [];
            BABYLON.SceneManager.gamepad3ButtonPress = [];
            BABYLON.SceneManager.gamepad3DpadUp = [];
            BABYLON.SceneManager.gamepad3DpadDown = [];
            BABYLON.SceneManager.gamepad3DpadPress = [];
            BABYLON.SceneManager.gamepad3LeftTrigger = [];
            BABYLON.SceneManager.gamepad3RightTrigger = [];
            BABYLON.SceneManager.gamepad4ButtonUp = [];
            BABYLON.SceneManager.gamepad4ButtonDown = [];
            BABYLON.SceneManager.gamepad4ButtonPress = [];
            BABYLON.SceneManager.gamepad4DpadUp = [];
            BABYLON.SceneManager.gamepad4DpadDown = [];
            BABYLON.SceneManager.gamepad4DpadPress = [];
            BABYLON.SceneManager.gamepad4LeftTrigger = [];
            BABYLON.SceneManager.gamepad4RightTrigger = [];
        }
        private static inputKeyDownHandler(e: KeyboardEvent): any {
            let key:string = "k:" + e.keyCode.toString();
            let pressed: boolean = false;
            if (BABYLON.SceneManager.keymap[key] != null) {
                pressed = BABYLON.SceneManager.keymap[key];
            }
            BABYLON.SceneManager.keymap[key] = true;
            switch (e.keyCode) {
                case 39: // Right
                case 68: // D-Key
                    BABYLON.SceneManager.k_horizontal = 1;
                    break;
                case 37: // Left
                case 65: // A-Key
                    BABYLON.SceneManager.k_horizontal = -1;
                    break;
                case 38: // Forward
                case 87: // W-Key
                    BABYLON.SceneManager.k_vertical = 1;
                    break;
                case 40: // Back
                case 83: // S-Key
                    BABYLON.SceneManager.k_vertical = -1;
                    break;
            }
            if (BABYLON.SceneManager.keyButtonDown != null && BABYLON.SceneManager.keyButtonDown.length > 0) {
                BABYLON.SceneManager.keyButtonDown.forEach((callback) => {
                    callback(e.keyCode);
                });
            }
            if (!pressed) {
                if (BABYLON.SceneManager.keyButtonPress != null && BABYLON.SceneManager.keyButtonPress.length > 0) {
                    BABYLON.SceneManager.keyButtonPress.forEach((press) => {
                        if (press.index === e.keyCode) {
                            press.action();
                        }
                    });
                }
            }
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }
        private static inputKeyUpHandler(e: KeyboardEvent): any {
            let key:string = "k:" + e.keyCode.toString();
            BABYLON.SceneManager.keymap[key] = false;
            switch (e.keyCode) {
                case 39: // Right
                case 37: // Left
                case 68: // D-Key
                case 65: // A-Key
                    BABYLON.SceneManager.k_horizontal = 0;
                    break;
                case 38: // Forward
                case 40: // Back
                case 87: // W-Key
                case 83: // S-Key
                    BABYLON.SceneManager.k_vertical = 0;
                    break;
            }
            if (BABYLON.SceneManager.keyButtonUp != null && BABYLON.SceneManager.keyButtonUp.length > 0) {
                BABYLON.SceneManager.keyButtonUp.forEach((callback) => {
                    callback(e.keyCode);
                });
            }
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }
        private static inputPointerWheelHandler(e:any): any {
            //let e = window.event || e; // old IE support
            //let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            let delta = e.deltaY ? -e.deltaY : e.wheelDelta / 40;
            BABYLON.SceneManager.x_wheel = Math.abs(delta) > BABYLON.UserInputOptions.PointerWheelDeadZone ? 0 + delta : 0;            
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }
        private static inputPointerDownHandler(e: PointerEvent): any {
            if (e.button === 0) {
                BABYLON.SceneManager.previousPosition = {
                    x: e.clientX,
                    y: e.clientY
                };
            }
            let key:string = "p:" + e.button.toString();
            let pressed: boolean = false;
            if (BABYLON.SceneManager.keymap[key] != null) {
                pressed = BABYLON.SceneManager.keymap[key];
            }
            BABYLON.SceneManager.keymap[key] = true;
            if (BABYLON.SceneManager.mouseButtonDown != null && BABYLON.SceneManager.mouseButtonDown.length > 0) {
                BABYLON.SceneManager.mouseButtonDown.forEach((callback) => {
                    callback(e.button);
                });
            }
            if (!pressed) {
                if (BABYLON.SceneManager.mouseButtonPress != null && BABYLON.SceneManager.mouseButtonPress.length > 0) {
                    BABYLON.SceneManager.mouseButtonPress.forEach((press) => {
                        if (press.index === e.button) {
                            press.action();
                        }
                    });
                }
            }
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }
        private static inputPointerUpHandler(e: PointerEvent): any {
            if (e.button === 0 && BABYLON.SceneManager.previousPosition != null) {
                BABYLON.SceneManager.previousPosition = null;
                BABYLON.SceneManager.k_mousex = 0;
                BABYLON.SceneManager.k_mousey = 0;
            }
            let key:string = "p:" + e.button.toString();
            BABYLON.SceneManager.keymap[key] = false;
            if (BABYLON.SceneManager.mouseButtonUp != null && BABYLON.SceneManager.mouseButtonUp.length > 0) {
                BABYLON.SceneManager.mouseButtonUp.forEach((callback) => {
                    callback(e.button);
                });
            }
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }
        private static inputPointerMoveHandler(e: PointerEvent): any {
            // Mouse Pointer Rotation When No Virtual Joystick Enabled
            if (BABYLON.SceneManager.virtualJoystick === false) {
                if (BABYLON.SceneManager.previousPosition != null) {
                    BABYLON.SceneManager.clientx = e.clientX;
                    BABYLON.SceneManager.clienty = e.clientY;
                    let offsetX = e.clientX - BABYLON.SceneManager.previousPosition.x;
                    let offsetY = e.clientY - BABYLON.SceneManager.previousPosition.y;
                    BABYLON.SceneManager.previousPosition = {
                        x: e.clientX,
                        y: e.clientY
                    };
                    let mousex:number = offsetX * (BABYLON.UserInputOptions.PointerAngularSensibility / 10);
                    let mousey:number = offsetY * (BABYLON.UserInputOptions.PointerAngularSensibility / 10);
                    if (mousex != 0) {
                        BABYLON.SceneManager.k_mousex = mousex;
                    }
                    if (mousey != 0) {
                        if (BABYLON.SceneManager.rightHanded) {
                            BABYLON.SceneManager.k_mousey = -mousey;
                        } else {
                            BABYLON.SceneManager.k_mousey = mousey;
                        }
                    }
                }
            }
            if (BABYLON.SceneManager.preventDefault) e.preventDefault();
            return true;
        }
        private static inputVirtualJoysticks(): void {
            if (BABYLON.SceneManager.leftJoystick != null) {
                // Update left virtual joystick values
                let LSDelta:BABYLON.Vector3 = BABYLON.SceneManager.leftJoystick.deltaPosition;
                if (!BABYLON.SceneManager.leftJoystick.pressed) {
                    LSDelta = LSDelta.scale(0.9);
                }
                let normalizedLX:number = LSDelta.x;
                let normalizedLY:number = LSDelta.y;
                LSDelta.x = Math.abs(normalizedLX) > BABYLON.UserInputOptions.JoystickDeadStickValue ? 0 + normalizedLX : 0;
                LSDelta.y = Math.abs(normalizedLY) > BABYLON.UserInputOptions.JoystickDeadStickValue ? 0 + normalizedLY : 0;
                BABYLON.SceneManager.j_horizontal = LSDelta.x;
                BABYLON.SceneManager.j_vertical = LSDelta.y;
            }
            if (BABYLON.SceneManager.rightJoystick != null) {
                // Update right virtual joystick values
                let RSDelta:BABYLON.Vector3 = BABYLON.SceneManager.rightJoystick.deltaPosition;
                if (!BABYLON.SceneManager.rightJoystick.pressed) {
                    RSDelta = RSDelta.scale(0.9);
                }
                let normalizedRX:number = RSDelta.x;
                let normalizedRY:number = RSDelta.y;
                RSDelta.x = Math.abs(normalizedRX) > BABYLON.UserInputOptions.JoystickDeadStickValue ? 0 + normalizedRX : 0;
                RSDelta.y = Math.abs(normalizedRY) > BABYLON.UserInputOptions.JoystickDeadStickValue ? 0 + normalizedRY : 0;
                BABYLON.SceneManager.j_mousex = RSDelta.x;
                BABYLON.SceneManager.j_mousey = RSDelta.y;
            }
        }
        private static inputOneButtonDownHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let key:string = "b1:" + button.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad1ButtonDown != null && BABYLON.SceneManager.gamepad1ButtonDown.length > 0) {
                    BABYLON.SceneManager.gamepad1ButtonDown.forEach((callback) => {
                        callback(button);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad1ButtonPress != null && BABYLON.SceneManager.gamepad1ButtonPress.length > 0) {
                        BABYLON.SceneManager.gamepad1ButtonPress.forEach((press) => {
                            if (press.index === button) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputOneButtonUpHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let key:string = "b1:" + button.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad1ButtonUp != null && BABYLON.SceneManager.gamepad1ButtonUp.length > 0) {
                    BABYLON.SceneManager.gamepad1ButtonUp.forEach((callback) => {
                        callback(button);
                    });
                }
            }
        }
        private static inputOneXboxDPadDownHandler(dPadPressed: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let key:string = "d1:" + dPadPressed.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad1DpadDown != null && BABYLON.SceneManager.gamepad1DpadDown.length > 0) {
                    BABYLON.SceneManager.gamepad1DpadDown.forEach((callback) => {
                        callback(dPadPressed);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad1DpadPress != null && BABYLON.SceneManager.gamepad1DpadPress.length > 0) {
                        BABYLON.SceneManager.gamepad1DpadPress.forEach((press) => {
                            if (press.index === dPadPressed) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputOneXboxDPadUpHandler(dPadReleased: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let key:string = "d1:" + dPadReleased.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad1DpadUp != null && BABYLON.SceneManager.gamepad1DpadUp.length > 0) {
                    BABYLON.SceneManager.gamepad1DpadUp.forEach((callback) => {
                        callback(dPadReleased);
                    });
                }
            }
        }
        private static inputOneXboxLeftTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                BABYLON.SceneManager.keymap["t1:0"] = value;
                if (BABYLON.SceneManager.gamepad1LeftTrigger != null && BABYLON.SceneManager.gamepad1LeftTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad1LeftTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputOneXboxRightTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                BABYLON.SceneManager.keymap["t1:1"] = value;
                if (BABYLON.SceneManager.gamepad1RightTrigger != null && BABYLON.SceneManager.gamepad1RightTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad1RightTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputOneLeftStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let LSValues:BABYLON.StickValues = values;
                let normalizedLX:number = LSValues.x * BABYLON.UserInputOptions.GamepadLStickSensibility;
                let normalizedLY:number = LSValues.y * BABYLON.UserInputOptions.GamepadLStickSensibility;
                LSValues.x = Math.abs(normalizedLX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLX : 0;
                LSValues.y = Math.abs(normalizedLY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLY : 0;
                BABYLON.SceneManager.g_horizontal1 = (BABYLON.UserInputOptions.GamepadLStickXInverted) ? -LSValues.x : LSValues.x;
                BABYLON.SceneManager.g_vertical1 = (BABYLON.UserInputOptions.GamepadLStickYInverted) ? LSValues.y : -LSValues.y;
            }
        }
        private static inputOneRightStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad1 != null) {
                let RSValues:BABYLON.StickValues = values;
                let normalizedRX:number = RSValues.x * BABYLON.UserInputOptions.GamepadRStickSensibility;
                let normalizedRY:number = RSValues.y * BABYLON.UserInputOptions.GamepadRStickSensibility;
                RSValues.x = Math.abs(normalizedRX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRX : 0;
                RSValues.y = Math.abs(normalizedRY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRY : 0;
                BABYLON.SceneManager.g_mousex1 = (BABYLON.UserInputOptions.GamepadRStickXInverted) ? -RSValues.x : RSValues.x;
                BABYLON.SceneManager.g_mousey1 = (BABYLON.UserInputOptions.GamepadRStickYInverted) ? -RSValues.y : RSValues.y;
            }
        }
        private static inputTwoButtonDownHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let key:string = "b2:" + button.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad2ButtonDown != null && BABYLON.SceneManager.gamepad2ButtonDown.length > 0) {
                    BABYLON.SceneManager.gamepad2ButtonDown.forEach((callback) => {
                        callback(button);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad2ButtonPress != null && BABYLON.SceneManager.gamepad2ButtonPress.length > 0) {
                        BABYLON.SceneManager.gamepad2ButtonPress.forEach((press) => {
                            if (press.index === button) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputTwoButtonUpHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let key:string = "b2:" + button.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad2ButtonUp != null && BABYLON.SceneManager.gamepad2ButtonUp.length > 0) {
                    BABYLON.SceneManager.gamepad2ButtonUp.forEach((callback) => {
                        callback(button);
                    });
                }
            }
        }
        private static inputTwoXboxDPadDownHandler(dPadPressed: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let key:string = "d2:" + dPadPressed.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad2DpadDown != null && BABYLON.SceneManager.gamepad2DpadDown.length > 0) {
                    BABYLON.SceneManager.gamepad2DpadDown.forEach((callback) => {
                        callback(dPadPressed);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad2DpadPress != null && BABYLON.SceneManager.gamepad2DpadPress.length > 0) {
                        BABYLON.SceneManager.gamepad2DpadPress.forEach((press) => {
                            if (press.index === dPadPressed) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputTwoXboxDPadUpHandler(dPadReleased: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let key:string = "d2:" + dPadReleased.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad2DpadUp != null && BABYLON.SceneManager.gamepad2DpadUp.length > 0) {
                    BABYLON.SceneManager.gamepad2DpadUp.forEach((callback) => {
                        callback(dPadReleased);
                    });
                }
            }
        }
        private static inputTwoXboxLeftTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                BABYLON.SceneManager.keymap["t2:0"] = value;
                if (BABYLON.SceneManager.gamepad2LeftTrigger != null && BABYLON.SceneManager.gamepad2LeftTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad2LeftTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputTwoXboxRightTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                BABYLON.SceneManager.keymap["t2:1"] = value;
                if (BABYLON.SceneManager.gamepad2RightTrigger != null && BABYLON.SceneManager.gamepad2RightTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad2RightTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputTwoLeftStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let LSValues:BABYLON.StickValues = values;
                let normalizedLX:number = LSValues.x * BABYLON.UserInputOptions.GamepadLStickSensibility;
                let normalizedLY:number = LSValues.y * BABYLON.UserInputOptions.GamepadLStickSensibility;
                LSValues.x = Math.abs(normalizedLX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLX : 0;
                LSValues.y = Math.abs(normalizedLY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLY : 0;
                BABYLON.SceneManager.g_horizontal2 = (BABYLON.UserInputOptions.GamepadLStickXInverted) ? -LSValues.x : LSValues.x;
                BABYLON.SceneManager.g_vertical2 = (BABYLON.UserInputOptions.GamepadLStickYInverted) ? LSValues.y : -LSValues.y;
            }
        }
        private static inputTwoRightStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad2 != null) {
                let RSValues:BABYLON.StickValues = values;
                let normalizedRX:number = RSValues.x * BABYLON.UserInputOptions.GamepadRStickSensibility;
                let normalizedRY:number = RSValues.y * BABYLON.UserInputOptions.GamepadRStickSensibility;
                RSValues.x = Math.abs(normalizedRX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRX : 0;
                RSValues.y = Math.abs(normalizedRY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRY : 0;
                BABYLON.SceneManager.g_mousex2 = (BABYLON.UserInputOptions.GamepadRStickXInverted) ? -RSValues.x : RSValues.x;
                BABYLON.SceneManager.g_mousey2 = (BABYLON.UserInputOptions.GamepadRStickYInverted) ? -RSValues.y : RSValues.y;
            }
        }
        private static inputThreeButtonDownHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let key:string = "b3:" + button.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad3ButtonDown != null && BABYLON.SceneManager.gamepad3ButtonDown.length > 0) {
                    BABYLON.SceneManager.gamepad3ButtonDown.forEach((callback) => {
                        callback(button);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad3ButtonPress != null && BABYLON.SceneManager.gamepad3ButtonPress.length > 0) {
                        BABYLON.SceneManager.gamepad3ButtonPress.forEach((press) => {
                            if (press.index === button) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputThreeButtonUpHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let key:string = "b3:" + button.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad3ButtonUp != null && BABYLON.SceneManager.gamepad3ButtonUp.length > 0) {
                    BABYLON.SceneManager.gamepad3ButtonUp.forEach((callback) => {
                        callback(button);
                    });
                }
            }
        }
        private static inputThreeXboxDPadDownHandler(dPadPressed: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let key:string = "d3:" + dPadPressed.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad3DpadDown != null && BABYLON.SceneManager.gamepad3DpadDown.length > 0) {
                    BABYLON.SceneManager.gamepad3DpadDown.forEach((callback) => {
                        callback(dPadPressed);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad3DpadPress != null && BABYLON.SceneManager.gamepad3DpadPress.length > 0) {
                        BABYLON.SceneManager.gamepad3DpadPress.forEach((press) => {
                            if (press.index === dPadPressed) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputThreeXboxDPadUpHandler(dPadReleased: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let key:string = "d3:" + dPadReleased.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad3DpadUp != null && BABYLON.SceneManager.gamepad3DpadUp.length > 0) {
                    BABYLON.SceneManager.gamepad3DpadUp.forEach((callback) => {
                        callback(dPadReleased);
                    });
                }
            }
        }
        private static inputThreeXboxLeftTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                BABYLON.SceneManager.keymap["t3:0"] = value;
                if (BABYLON.SceneManager.gamepad3LeftTrigger != null && BABYLON.SceneManager.gamepad3LeftTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad3LeftTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputThreeXboxRightTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                BABYLON.SceneManager.keymap["t3:1"] = value;
                if (BABYLON.SceneManager.gamepad3RightTrigger != null && BABYLON.SceneManager.gamepad3RightTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad3RightTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputThreeLeftStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let LSValues:BABYLON.StickValues = values;
                let normalizedLX:number = LSValues.x * BABYLON.UserInputOptions.GamepadLStickSensibility;
                let normalizedLY:number = LSValues.y * BABYLON.UserInputOptions.GamepadLStickSensibility;
                LSValues.x = Math.abs(normalizedLX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLX : 0;
                LSValues.y = Math.abs(normalizedLY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLY : 0;
                BABYLON.SceneManager.g_horizontal3 = (BABYLON.UserInputOptions.GamepadLStickXInverted) ? -LSValues.x : LSValues.x;
                BABYLON.SceneManager.g_vertical3 = (BABYLON.UserInputOptions.GamepadLStickYInverted) ? LSValues.y : -LSValues.y;
            }
        }
        private static inputThreeRightStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad3 != null) {
                let RSValues:BABYLON.StickValues = values;
                let normalizedRX:number = RSValues.x * BABYLON.UserInputOptions.GamepadRStickSensibility;
                let normalizedRY:number = RSValues.y * BABYLON.UserInputOptions.GamepadRStickSensibility;
                RSValues.x = Math.abs(normalizedRX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRX : 0;
                RSValues.y = Math.abs(normalizedRY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRY : 0;
                BABYLON.SceneManager.g_mousex3 = (BABYLON.UserInputOptions.GamepadRStickXInverted) ? -RSValues.x : RSValues.x;
                BABYLON.SceneManager.g_mousey3 = (BABYLON.UserInputOptions.GamepadRStickYInverted) ? -RSValues.y : RSValues.y;
            }
        }
        private static inputFourButtonDownHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let key:string = "b4:" + button.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad4ButtonDown != null && BABYLON.SceneManager.gamepad4ButtonDown.length > 0) {
                    BABYLON.SceneManager.gamepad4ButtonDown.forEach((callback) => {
                        callback(button);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad4ButtonPress != null && BABYLON.SceneManager.gamepad4ButtonPress.length > 0) {
                        BABYLON.SceneManager.gamepad4ButtonPress.forEach((press) => {
                            if (press.index === button) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputFourButtonUpHandler(button: number): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let key:string = "b4:" + button.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad4ButtonUp != null && BABYLON.SceneManager.gamepad4ButtonUp.length > 0) {
                    BABYLON.SceneManager.gamepad4ButtonUp.forEach((callback) => {
                        callback(button);
                    });
                }
            }
        }
        private static inputFourXboxDPadDownHandler(dPadPressed: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let key:string = "d4:" + dPadPressed.toString();
                let pressed: boolean = false;
                if (BABYLON.SceneManager.keymap[key] != null) {
                    pressed = BABYLON.SceneManager.keymap[key];
                }
                BABYLON.SceneManager.keymap[key] = true;
                if (BABYLON.SceneManager.gamepad4DpadDown != null && BABYLON.SceneManager.gamepad4DpadDown.length > 0) {
                    BABYLON.SceneManager.gamepad4DpadDown.forEach((callback) => {
                        callback(dPadPressed);
                    });
                }
                if (!pressed) {
                    if (BABYLON.SceneManager.gamepad4DpadPress != null && BABYLON.SceneManager.gamepad4DpadPress.length > 0) {
                        BABYLON.SceneManager.gamepad4DpadPress.forEach((press) => {
                            if (press.index === dPadPressed) {
                                press.action();
                            }
                        });
                    }
                }
            }
        }
        private static inputFourXboxDPadUpHandler(dPadReleased: BABYLON.Xbox360Dpad): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let key:string = "d4:" + dPadReleased.toString();
                BABYLON.SceneManager.keymap[key] = false;
                if (BABYLON.SceneManager.gamepad4DpadUp != null && BABYLON.SceneManager.gamepad4DpadUp.length > 0) {
                    BABYLON.SceneManager.gamepad4DpadUp.forEach((callback) => {
                        callback(dPadReleased);
                    });
                }
            }
        }
        private static inputFourXboxLeftTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                BABYLON.SceneManager.keymap["t4:0"] = value;
                if (BABYLON.SceneManager.gamepad4LeftTrigger != null && BABYLON.SceneManager.gamepad4LeftTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad4LeftTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputFourXboxRightTriggerHandler(value: number): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                BABYLON.SceneManager.keymap["t4:1"] = value;
                if (BABYLON.SceneManager.gamepad4RightTrigger != null && BABYLON.SceneManager.gamepad4RightTrigger.length > 0) {
                    BABYLON.SceneManager.gamepad4RightTrigger.forEach((callback) => {
                        callback(value);
                    });
                }
            }
        }
        private static inputFourLeftStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let LSValues:BABYLON.StickValues = values;
                let normalizedLX:number = LSValues.x * BABYLON.UserInputOptions.GamepadLStickSensibility;
                let normalizedLY:number = LSValues.y * BABYLON.UserInputOptions.GamepadLStickSensibility;
                LSValues.x = Math.abs(normalizedLX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLX : 0;
                LSValues.y = Math.abs(normalizedLY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedLY : 0;
                BABYLON.SceneManager.g_horizontal4 = (BABYLON.UserInputOptions.GamepadLStickXInverted) ? -LSValues.x : LSValues.x;
                BABYLON.SceneManager.g_vertical4 = (BABYLON.UserInputOptions.GamepadLStickYInverted) ? LSValues.y : -LSValues.y;
            }
        }
        private static inputFourRightStickHandler(values: BABYLON.StickValues): void {
            if (BABYLON.SceneManager.gamepad4 != null) {
                let RSValues:BABYLON.StickValues = values;
                let normalizedRX:number = RSValues.x * BABYLON.UserInputOptions.GamepadRStickSensibility;
                let normalizedRY:number = RSValues.y * BABYLON.UserInputOptions.GamepadRStickSensibility;
                RSValues.x = Math.abs(normalizedRX) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRX : 0;
                RSValues.y = Math.abs(normalizedRY) > BABYLON.UserInputOptions.GamepadDeadStickValue ? 0 + normalizedRY : 0;
                BABYLON.SceneManager.g_mousex4 = (BABYLON.UserInputOptions.GamepadRStickXInverted) ? -RSValues.x : RSValues.x;
                BABYLON.SceneManager.g_mousey4 = (BABYLON.UserInputOptions.GamepadRStickYInverted) ? -RSValues.y : RSValues.y;
            }
        }
        private static inputManagerGamepadConnected(pad: BABYLON.Gamepad, state:BABYLON.EventState) {
            if (BABYLON.SceneManager.gamepad1 == null && pad.index === 0) {
                BABYLON.SceneManager.gamepad1 = pad;
                BABYLON.Tools.Log("Gamepad One Connected: " + BABYLON.SceneManager.gamepad1.id);
                if ((<string>BABYLON.SceneManager.gamepad1.id).search("Xbox 360") !== -1 || (<string>BABYLON.SceneManager.gamepad1.id).search("Xbox One") !== -1 || (<string>BABYLON.SceneManager.gamepad1.id).search("xinput") !== -1) {
                    BABYLON.SceneManager.gamepad1Type = BABYLON.GamepadType.Xbox360;
                    let xbox360Pad1: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad1 as BABYLON.Xbox360Pad;
                    xbox360Pad1.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
                    xbox360Pad1.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
                    xbox360Pad1.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
                    xbox360Pad1.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
                    xbox360Pad1.ondpadup(BABYLON.SceneManager.inputOneXboxDPadUpHandler);
                    xbox360Pad1.ondpaddown(BABYLON.SceneManager.inputOneXboxDPadDownHandler);
                    xbox360Pad1.onlefttriggerchanged(BABYLON.SceneManager.inputOneXboxLeftTriggerHandler);
                    xbox360Pad1.onrighttriggerchanged(BABYLON.SceneManager.inputOneXboxRightTriggerHandler);
                } else {
                    BABYLON.SceneManager.gamepad1Type = BABYLON.GamepadType.Generic;
                    let genericPad1: BABYLON.GenericPad = BABYLON.SceneManager.gamepad1 as BABYLON.GenericPad;
                    genericPad1.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
                    genericPad1.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
                    genericPad1.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
                    genericPad1.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
                }
            }
            if (BABYLON.SceneManager.gamepad2 == null && pad.index === 1) {
                BABYLON.SceneManager.gamepad2 = pad;
                BABYLON.Tools.Log("Gamepad Two Connected: " + BABYLON.SceneManager.gamepad2.id);
                if ((<string>BABYLON.SceneManager.gamepad2.id).search("Xbox 360") !== -1 || (<string>BABYLON.SceneManager.gamepad2.id).search("Xbox One") !== -1 || (<string>BABYLON.SceneManager.gamepad2.id).search("xinput") !== -1) {
                    BABYLON.SceneManager.gamepad2Type = BABYLON.GamepadType.Xbox360;
                    let xbox360Pad2: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad2 as BABYLON.Xbox360Pad;
                    xbox360Pad2.onbuttonup(BABYLON.SceneManager.inputTwoButtonUpHandler);
                    xbox360Pad2.onbuttondown(BABYLON.SceneManager.inputTwoButtonDownHandler);
                    xbox360Pad2.onleftstickchanged(BABYLON.SceneManager.inputTwoLeftStickHandler);
                    xbox360Pad2.onrightstickchanged(BABYLON.SceneManager.inputTwoRightStickHandler);
                    xbox360Pad2.ondpadup(BABYLON.SceneManager.inputTwoXboxDPadUpHandler);
                    xbox360Pad2.ondpaddown(BABYLON.SceneManager.inputTwoXboxDPadDownHandler);
                    xbox360Pad2.onlefttriggerchanged(BABYLON.SceneManager.inputTwoXboxLeftTriggerHandler);
                    xbox360Pad2.onrighttriggerchanged(BABYLON.SceneManager.inputTwoXboxRightTriggerHandler);
                } else {
                    BABYLON.SceneManager.gamepad2Type = BABYLON.GamepadType.Generic;
                    let genericPad2: BABYLON.GenericPad = BABYLON.SceneManager.gamepad2 as BABYLON.GenericPad;
                    genericPad2.onbuttonup(BABYLON.SceneManager.inputTwoButtonUpHandler);
                    genericPad2.onbuttondown(BABYLON.SceneManager.inputTwoButtonDownHandler);
                    genericPad2.onleftstickchanged(BABYLON.SceneManager.inputTwoLeftStickHandler);
                    genericPad2.onrightstickchanged(BABYLON.SceneManager.inputTwoRightStickHandler);
                }
            }
            if (BABYLON.SceneManager.gamepad3 == null && pad.index === 2) {
                BABYLON.SceneManager.gamepad3 = pad;
                BABYLON.Tools.Log("Gamepad Three Connected: " + BABYLON.SceneManager.gamepad3.id);
                if ((<string>BABYLON.SceneManager.gamepad3.id).search("Xbox 360") !== -1 || (<string>BABYLON.SceneManager.gamepad3.id).search("Xbox One") !== -1 || (<string>BABYLON.SceneManager.gamepad3.id).search("xinput") !== -1) {
                    BABYLON.SceneManager.gamepad3Type = BABYLON.GamepadType.Xbox360;
                    let xbox360Pad3: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad3 as BABYLON.Xbox360Pad;
                    xbox360Pad3.onbuttonup(BABYLON.SceneManager.inputThreeButtonUpHandler);
                    xbox360Pad3.onbuttondown(BABYLON.SceneManager.inputThreeButtonDownHandler);
                    xbox360Pad3.onleftstickchanged(BABYLON.SceneManager.inputThreeLeftStickHandler);
                    xbox360Pad3.onrightstickchanged(BABYLON.SceneManager.inputThreeRightStickHandler);
                    xbox360Pad3.ondpadup(BABYLON.SceneManager.inputThreeXboxDPadUpHandler);
                    xbox360Pad3.ondpaddown(BABYLON.SceneManager.inputThreeXboxDPadDownHandler);
                    xbox360Pad3.onlefttriggerchanged(BABYLON.SceneManager.inputThreeXboxLeftTriggerHandler);
                    xbox360Pad3.onrighttriggerchanged(BABYLON.SceneManager.inputThreeXboxRightTriggerHandler);
                } else {
                    BABYLON.SceneManager.gamepad3Type = BABYLON.GamepadType.Generic;
                    let genericPad3: BABYLON.GenericPad = BABYLON.SceneManager.gamepad3 as BABYLON.GenericPad;
                    genericPad3.onbuttonup(BABYLON.SceneManager.inputThreeButtonUpHandler);
                    genericPad3.onbuttondown(BABYLON.SceneManager.inputThreeButtonDownHandler);
                    genericPad3.onleftstickchanged(BABYLON.SceneManager.inputThreeLeftStickHandler);
                    genericPad3.onrightstickchanged(BABYLON.SceneManager.inputThreeRightStickHandler);
                }
            }
            if (BABYLON.SceneManager.gamepad4 == null && pad.index === 3) {
                BABYLON.SceneManager.gamepad4 = pad;
                BABYLON.Tools.Log("Gamepad Four Connected: " + BABYLON.SceneManager.gamepad4.id);
                if ((<string>BABYLON.SceneManager.gamepad4.id).search("Xbox 360") !== -1 || (<string>BABYLON.SceneManager.gamepad4.id).search("Xbox One") !== -1 || (<string>BABYLON.SceneManager.gamepad4.id).search("xinput") !== -1) {
                    BABYLON.SceneManager.gamepad4Type = BABYLON.GamepadType.Xbox360;
                    let xbox360Pad4: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad4 as BABYLON.Xbox360Pad;
                    xbox360Pad4.onbuttonup(BABYLON.SceneManager.inputFourButtonUpHandler);
                    xbox360Pad4.onbuttondown(BABYLON.SceneManager.inputFourButtonDownHandler);
                    xbox360Pad4.onleftstickchanged(BABYLON.SceneManager.inputFourLeftStickHandler);
                    xbox360Pad4.onrightstickchanged(BABYLON.SceneManager.inputFourRightStickHandler);
                    xbox360Pad4.ondpadup(BABYLON.SceneManager.inputFourXboxDPadUpHandler);
                    xbox360Pad4.ondpaddown(BABYLON.SceneManager.inputFourXboxDPadDownHandler);
                    xbox360Pad4.onlefttriggerchanged(BABYLON.SceneManager.inputFourXboxLeftTriggerHandler);
                    xbox360Pad4.onrighttriggerchanged(BABYLON.SceneManager.inputFourXboxRightTriggerHandler);
                } else {
                    BABYLON.SceneManager.gamepad4Type = BABYLON.GamepadType.Generic;
                    let genericPad4: BABYLON.GenericPad = BABYLON.SceneManager.gamepad4 as BABYLON.GenericPad;
                    genericPad4.onbuttonup(BABYLON.SceneManager.inputFourButtonUpHandler);
                    genericPad4.onbuttondown(BABYLON.SceneManager.inputFourButtonDownHandler);
                    genericPad4.onleftstickchanged(BABYLON.SceneManager.inputFourLeftStickHandler);
                    genericPad4.onrightstickchanged(BABYLON.SceneManager.inputFourRightStickHandler);
                }
            }
            if (BABYLON.SceneManager.GamepadConnected != null) {
                BABYLON.SceneManager.GamepadConnected(pad, state);
            }
        }
        private static inputManagerGamepadDisconnected(pad: BABYLON.Gamepad, state:BABYLON.EventState) {
            if (BABYLON.SceneManager.GamepadDisconnected != null) {
                BABYLON.SceneManager.GamepadDisconnected(pad, state);
            }
        }
        private static inputManagerLeftControllerMainButton(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerLeftControllerPadState(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerLeftControllerPadValues(controller: BABYLON.StickValues, state:BABYLON.EventState) {
        }
        private static inputManagerLeftControllerAuxButton(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerLeftControllerTriggered(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerRightControllerMainButton(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerRightControllerPadState(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerRightControllerPadValues(controller: BABYLON.StickValues, state:BABYLON.EventState) {
        }
        private static inputManagerRightControllerAuxButton(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerRightControllerTriggered(controller: BABYLON.ExtendedGamepadButton, state:BABYLON.EventState) {
        }
        private static inputManagerControllerConnected(controller: BABYLON.WebVRController, state:BABYLON.EventState) {
            /*
            let xbox360Pad1: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad1 as BABYLON.Xbox360Pad;
            xbox360Pad1.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
            xbox360Pad1.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
            xbox360Pad1.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
            xbox360Pad1.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
            xbox360Pad1.ondpadup(BABYLON.SceneManager.inputOneXboxDPadUpHandler);
            xbox360Pad1.ondpaddown(BABYLON.SceneManager.inputOneXboxDPadDownHandler);
            xbox360Pad1.onlefttriggerchanged(BABYLON.SceneManager.inputOneXboxLeftTriggerHandler);
            xbox360Pad1.onrighttriggerchanged(BABYLON.SceneManager.inputOneXboxRightTriggerHandler);
            */
        }
    }
}
if (BABYLON.SceneManager.IsWindows()) {
    if (typeof Windows.UI.ViewManagement !== "undefined" && typeof Windows.UI.ViewManagement.ApplicationViewBoundsMode !== "undefined" && typeof Windows.UI.ViewManagement.ApplicationViewBoundsMode.useCoreWindow !== "undefined") {
        Windows.UI.ViewManagement.ApplicationView.getForCurrentView().setDesiredBoundsMode(Windows.UI.ViewManagement.ApplicationViewBoundsMode.useCoreWindow);
    }
}
if (BABYLON.SceneManager.IsXboxOne()) {
    if (navigator.gamepadInputEmulation) {
        navigator.gamepadInputEmulation = "gamepad";
    }
}