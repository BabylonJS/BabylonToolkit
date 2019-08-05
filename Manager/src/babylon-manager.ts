module BABYLON {
    /**
     * Babylon scene manager class
     * @class SceneManager - All rights reserved (c) 2019 Mackey Kinard
     */
    export class SceneManager {
        /** Gets the toolkit framework version number */
        public static get VersionNumber():string { return  "4.1.0 - A1"; }
        /** Gets the toolkit framework copyright notice */
        public static get CopyrightNotice():string { return  "All rights reserved (c) 2019 Mackey Kinard"; }
        /** Gets the toolkit framework copyright notice */
        public static get ToolkitLicense():string { return  ((<any>window).BabylonToolkitLicense != null && (<any>window).BabylonToolkitLicense !== "") ? (<any>window).BabylonToolkitLicense : "STANDARD" ; }
        /** Managed animation group start mode */
        public static AnimationStartMode?:BABYLON.GLTFLoaderAnimationStartMode = null;
        /** Forces scene loader into right hand mode */
        public static ForceRightHanded?:boolean = null;

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

        // ********************************* //
        // * Scene Manager Timer Functions * //
        // ********************************* //

        /** Get the game time in seconds */
        public static GetGameTime():number {
            return (TimerPlugin.getTimeMilliseconds() - TimerPlugin.gameStartTime) / 1000;
        }
        /** Get the system time in seconds */
        public static GetSystemTime():number {
            return TimerPlugin.getTimeMilliseconds() / 1000;
        }

        // *********************************** //
        // * Scene Manager Timeout Functions * //
        // *********************************** //

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
        // * Scene Manager System Functions * //
        // ********************************** //

        /** Run a function on the next render loop. */
        public static RunOnce(scene:BABYLON.Scene, func:()=>void): BABYLON.Observer<BABYLON.Scene> {
            return scene.onBeforeRenderObservable.addOnce(func);
        }
        /** Popup debug layer in window. */
        public static PopupDebug(scene:BABYLON.Scene): void {
            if (scene.debugLayer) {
                scene.debugLayer.hide();
                scene.debugLayer.show({ enablePopup: true, globalRoot: null });
            }            
        }
        /** Toggle debug layer on and off. */
        public static ToggleDebug(scene:BABYLON.Scene, embed:boolean = false, parent:HTMLElement = null): void {
            if (scene.debugLayer) {
                const wnd:any = window;
                if (BABYLON.SceneManager.debugLayerVisible === true) {
                    BABYLON.SceneManager.debugLayerVisible = false;
                    if (wnd.METER && wnd.METER.show) wnd.METER.show();
                    scene.debugLayer.hide();
                } else {
                    BABYLON.SceneManager.debugLayerVisible = true;
                    if (wnd.METER && wnd.METER.hide) wnd.METER.hide();
                    scene.debugLayer.show({ embedMode: embed, globalRoot: parent });
                }
            }            
        }
        /** Disposes entire scene and release all resources */
        public static DisposeScene(scene:BABYLON.Scene, clearColor:BABYLON.Color4 = new BABYLON.Color4(0,0,0,1)): void {
            const engine:BABYLON.Engine = scene.getEngine();
            scene.dispose();
            engine.clear(clearColor, true, true, true);
        }

        // ********************************** //
        // * Scene Manager Helper Functions * //
        // ********************************** //

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
        /** Get the root url the main scene properties was loaded from */
        public static GetRootUrl(scene:BABYLON.Scene):string {
            return ((<any>scene)._rootUrl != null && (<any>scene)._rootUrl !== "") ? (<any>scene)._rootUrl : "/";
        }
        /** Sets the root url the main scene properties was loaded from */
        public static SetRootUrl(scene:BABYLON.Scene, url:string):void {
            (<any>scene)._rootUrl = url;
        }
        /** TODO */
        public static GetDeltaSeconds(scene:BABYLON.Scene, applyAnimationRatio:boolean = true): number {
            const deltaTime = scene.useConstantAnimationDeltaTime ? 16 : Math.max(Scene.MinDeltaTime, Math.min(scene.getEngine().getDeltaTime(), Scene.MaxDeltaTime));
            if (applyAnimationRatio === true) {
                let animationRatio:number = 1.0;            
                if (scene.getEngine().isDeterministicLockStep()) {
                    const defaultFPS:number = (60.0 / 1000.0);
                    const defaultFrameTime:number = scene.getDeterministicFrameTime();
                    animationRatio = defaultFrameTime * defaultFPS;
                } else {
                    animationRatio = deltaTime * (60.0 / 1000.0);                
                }
                return (deltaTime / 1000) * animationRatio;
            }  else {
                return (deltaTime / 1000);
            }
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
        // * Scene Manager Node Functions * //
        // ******************************** //

        /** Gets the specified transform node primary tag name. */
        public static GetTransformTag(transform:BABYLON.TransformNode): string {
            return (transform.metadata != null && transform.metadata.unity != null && transform.metadata.unity.group != null && transform.metadata.unity.group !== "") ? transform.metadata.unity.group : "Untagged";
        }
        /** Gets the specified transform node by name from scene. */
        public static GetTransformNode(scene:BABYLON.Scene, name:string): BABYLON.TransformNode {
            if (scene == null) return null;
            return scene.getNodeByName(name) as BABYLON.TransformNode;
        }
        /** Gets the specified transform node by id from scene. */
        public static GetTransformNodeByID(scene:BABYLON.Scene, id:string): BABYLON.TransformNode {
            if (scene == null) return null;
            return scene.getNodeByID(id) as BABYLON.TransformNode;
        }
        /** Gets the specified abstract mesh by name from scene. */
        public static GetAbstractMesh(scene:BABYLON.Scene, name:string): BABYLON.AbstractMesh {
            if (scene == null) return null;
            return scene.getNodeByName(name) as BABYLON.AbstractMesh;
        }
        /** Gets the specified abstract mesh by id from scene. */
        public static GetAbstractMeshByID(scene:BABYLON.Scene, id:string): BABYLON.AbstractMesh {
            if (scene == null) return null;
            return scene.getNodeByID(id) as BABYLON.AbstractMesh;
        }
        /** Gets the specified raw prefab mesh from scene. */
        public static GetRawPrefabMesh(scene:BABYLON.Scene, prefabName:string): BABYLON.AbstractMesh {
            const realPrefab:string = "Prefab." + prefabName;
            return BABYLON.SceneManager.GetAbstractMesh(scene, realPrefab);
        }
        /** Gets the transform node primitive meshes. */
        public static GetPrimitiveMeshes(transform:TransformNode): BABYLON.AbstractMesh[] {
            return transform.getChildMeshes(true, (node:BABYLON.Node)=>{  return ( node.name.indexOf("_primitive") >= 0); });
        }
        /** Gets the transform node collision meshes. */
        public static GetCollisionMeshes(transform:TransformNode): BABYLON.AbstractMesh[] {
            return transform.getChildMeshes(true, (node:BABYLON.Node)=>{  return ( node.name.indexOf("_collider") >= 0); });
        }

        // ********************************** //
        // * Scene Manager Prefab Functions * //
        // ********************************** //

        /** Instantiates the specfied prefab object into scene. */
        public static InstantiatePrefab(scene:BABYLON.Scene, name:string, cloneName: string, newParent: Node = null, newPosition:BABYLON.Vector3 = null, newRotation:BABYLON.Vector3 = null, newScaling:BABYLON.Vector3 = null): BABYLON.AbstractMesh {
            if (scene == null) return null;
            let result:BABYLON.AbstractMesh = null;
            const prefab:BABYLON.AbstractMesh = BABYLON.SceneManager.GetRawPrefabMesh(scene, name);
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
        /** Finds the specfied camera rig in the scene. */
        public static FindSceneCameraRig(transform: BABYLON.TransformNode): BABYLON.FreeCamera {
            if (transform == null) return null;
            return ((<any>transform).cameraRig != null) ? (<any>transform).cameraRig : null;
        }
        /** Finds the specfied light rig in the scene. */
        public static FindSceneLightRig(transform: BABYLON.TransformNode): BABYLON.Light {
            if (transform == null) return null;
            return ((<any>transform).lightRig != null) ? (<any>transform).lightRig : null;
        }
        /** Finds the specfied text writer in the scene. (Pro Feature Pack Only) */
        public static FindSceneTextWriter(transform: BABYLON.TransformNode): any {
            if (transform == null) return null;
            return ((<any>transform).textWriter != null) ? (<any>transform).textWriter : null;
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

        // *************************************** //
        // *  Scene Camera Input Helper Support  * //
        // *************************************** //

        /** Update simple first person style camera input. */
        public static UpdateCameraInput(camera:BABYLON.FreeCamera, movementSpeed: number, rotationSpeed: number, player:BABYLON.PlayerNumber = BABYLON.PlayerNumber.One): void {
            if (camera != null) {
                let horizontal: number = BABYLON.SceneManager.GetUserInput(BABYLON.UserInputAxis.Horizontal, player);
                let vertical: number = BABYLON.SceneManager.GetUserInput(BABYLON.UserInputAxis.Vertical, player);
                let mousex: number = BABYLON.SceneManager.GetUserInput(BABYLON.UserInputAxis.MouseX, player);
                let mousey: number = BABYLON.SceneManager.GetUserInput(BABYLON.UserInputAxis.MouseY, player);
                BABYLON.SceneManager.UpdateCameraPosition(camera, horizontal, vertical, movementSpeed);
                BABYLON.SceneManager.UpdateCameraRotation(camera, mousex, mousey, rotationSpeed);
            }
        }
        /** Update simple first person style camera position. */
        public static UpdateCameraPosition(camera:BABYLON.FreeCamera, horizontal: number, vertical: number, speed: number): void {
            if (camera != null) {
                let cameraLocal:number = (camera._computeLocalCameraSpeed() * speed);
                // Camera Transform Translation
                (<any>window).BABYLON.Utilities.TempMatrix.reset();
                BABYLON.Matrix.RotationYawPitchRollToRef(camera.rotation.y, camera.rotation.x, 0, (<any>window).BABYLON.Utilities.TempMatrix);
                // Camera Transform Position Delta
                (<any>window).BABYLON.Utilities.AuxVector.copyFromFloats(0, 0, 0);
                (<any>window).BABYLON.Utilities.TempVector3.copyFromFloats((horizontal * cameraLocal), 0, (vertical * cameraLocal));
                BABYLON.Vector3.TransformCoordinatesToRef((<any>window).BABYLON.Utilities.TempVector3, (<any>window).BABYLON.Utilities.TempMatrix, (<any>window).BABYLON.Utilities.AuxVector);
                camera.cameraDirection.addInPlace((<any>window).BABYLON.Utilities.AuxVector);
            }
        }
        /** Update simple first person style camera rotation. */
        public static UpdateCameraRotation(camera:BABYLON.FreeCamera, mousex: number, mousey: number, speed: number): void {
            if (camera != null) {
                (<any>window).BABYLON.Utilities.TempVector2.copyFromFloats(mousey * speed, mousex * speed);
                camera.cameraRotation.addInPlace((<any>window).BABYLON.Utilities.TempVector2);
            }
        }
        /** Update the specfied entity transform camera rigging. */
        public static UpdateCameraRigging(transform: BABYLON.TransformNode, camera:BABYLON.FreeCamera): void {
            if (transform == null) return null;
            (<any>transform).cameraRig = camera;
        }

        // ****************************************** //
        // *  Scene Entity Movement Helper Support  * //
        // ****************************************** //
        
        /** Moves entity using vector position with camera collisions. */
        public static MoveWithCollisions(entity:BABYLON.AbstractMesh, velocity:BABYLON.Vector3) : void {
            if (entity == null) return null;
            if (velocity != null) entity.moveWithCollisions(velocity);
        }
        /** Moves entity using vector position using translations. */
        public static MoveWithTranslation(entity:BABYLON.TransformNode, velocity:BABYLON.Vector3) : void {
            if (entity == null) return null;
            if (velocity != null) entity.position.addInPlace(velocity);
        }
        /** Turns entity using quaternion rotations in radians. */
        public static TurnWithRotation(entity:BABYLON.TransformNode, radians:number, space:BABYLON.Space = BABYLON.Space.LOCAL) : void {
            if (entity == null) return null;
            if (radians != 0) entity.rotate(BABYLON.Axis.Y, radians, space);
        }

        // *************************************** //
        // * Scene Physcis Engine Helper Support * //
        // *************************************** //

        /** Callback to setup ammo.js plugin properties when activated on the scene. */
        public static OnSetupPhysicsPlugin:(scene:BABYLON.Scene, plugin:BABYLON.AmmoJSPlugin)=>void = null;
        /** Confiures ammo.js physcis engine advanced sweeping and collision detection options on the scene. */
        public static ConfigurePhysicsEngine(scene:BABYLON.Scene, deltaWorldStep:boolean = true, maxWorldSweep:number = 1000, ccdEnabled:boolean = true, ccdPenetration:number = 0, gravityLevel:BABYLON.Vector3 = null):void {
            Ammo.btCollisionObject.prototype.entity = null;
            const defaultvalue:BABYLON.Vector3 = new BABYLON.Vector3(0, -9.81, 0);
            const defaultgravity:BABYLON.Vector3 = gravityLevel != null ? gravityLevel : defaultvalue;
            if (BABYLON.AmmoJSPlugin) {
                // Check Bullet Physcis Engine (Ammo.js)
                let physicsenabled:boolean = scene.isPhysicsEnabled();
                let physicsengine:BABYLON.IPhysicsEngine = (physicsenabled === true) ? scene.getPhysicsEngine() : null;
                let physicsplugin:BABYLON.IPhysicsEnginePlugin = (physicsenabled === true && physicsengine != null) ? physicsengine.getPhysicsPlugin() : null;
                let physicsammojs:boolean = (physicsenabled === true && physicsengine != null && physicsengine.getPhysicsPluginName() === "AmmoJSPlugin");
                if (physicsammojs === false) {
                    // Enable Bullet Physcis Engine (Ammo.js)
                    let ammojsplugin:BABYLON.AmmoJSPlugin = null;
                    if (maxWorldSweep > 0) {
                        const worldPairCache:any = new Ammo.btAxisSweep3(new Ammo.btVector3(-maxWorldSweep, -maxWorldSweep, -maxWorldSweep), new Ammo.btVector3(maxWorldSweep, maxWorldSweep, maxWorldSweep));
                        ammojsplugin = new BABYLON.AmmoJSPlugin(deltaWorldStep, Ammo, worldPairCache);
                        BABYLON.Tools.Log("Ammo.js physics plugin ready (btAxisSweep3)");
                    } else {
                        ammojsplugin = new BABYLON.AmmoJSPlugin(deltaWorldStep);
                        BABYLON.Tools.Log("Ammo.js physics plugin ready (btDbvtBroadphase)");
                    }
                    if (BABYLON.SceneManager.OnSetupPhysicsPlugin != null) {
                        BABYLON.SceneManager.OnSetupPhysicsPlugin(scene, ammojsplugin);
                    }
                    scene.enablePhysics(defaultgravity, ammojsplugin);
                    // Validate Bullet Physcis Engine (Ammo.js)
                    physicsenabled = scene.isPhysicsEnabled();
                    physicsengine = (physicsenabled === true) ? scene.getPhysicsEngine() : null;
                    physicsplugin = (physicsenabled === true && physicsengine != null) ? physicsengine.getPhysicsPlugin() : null;
                    physicsammojs = (physicsenabled === true && physicsengine != null && physicsengine.getPhysicsPluginName() === "AmmoJSPlugin");
                } else {
                    BABYLON.Tools.Warn("Ammo.js physics plugin already enabled");
                }
                // Configure Bullet Collision Detection (Ammo.js)
                if (physicsammojs === true && physicsengine != null && physicsplugin != null && physicsplugin.world != null) {
                    physicsplugin.world.getBroadphase().getOverlappingPairCache().setInternalGhostPairCallback(new Ammo.btGhostPairCallback());
                    physicsplugin.world.getDispatchInfo().set_m_allowedCcdPenetration(ccdPenetration);
                    const contactAddedCallbackPtr = Ammo.addFunction((cp:any, colObj0Wrap:any, partId0:number, index0:number, colObj1Wrap, partId1:number, index1:number) => {
                        // NOTE: KEEP FOR REFERENCE
                        // colObj0Wrap = Ammo.wrapPointer(colObj0Wrap, Ammo.btCollisionObjectWrapper);
                        // colObj1Wrap = Ammo.wrapPointer(colObj1Wrap, Ammo.btCollisionObjectWrapper);
                        // const colobj0:any = colObj0Wrap.getCollisionObject();
                        // const colobj1:any = colObj1Wrap.getCollisionObject();
                        // if (colobj0 != null && colobj1 != null) {
                        //    const colshape0:any = colobj0.getCollisionShape();
                        //    const colshape1:any = colobj1.getCollisionShape();
                        // }
                        if (physicsplugin.world.adjustInternalEdgeContacts) {
                            physicsplugin.world.adjustInternalEdgeContacts(cp, colObj1Wrap, colObj0Wrap, partId1, index1);
                            return true;
                        } else {
                            return false;
                        }
                    });
                    physicsplugin.world.setContactAddedCallback(contactAddedCallbackPtr);
                    const physicsscene:any = scene;
                    if (!physicsscene._monitorContactManifolds) {
                        physicsscene._monitorContactManifolds = true;
                        if (ccdEnabled === true) {
                            BABYLON.Tools.Log("Ammo.js physics contact manifolds enabled");
                            scene.registerBeforeRender(()=>{
                                const manifolds:number = physicsplugin.world.getDispatcher().getNumManifolds();
                                if (manifolds > 0) {
                                    for (let index = 0; index < manifolds; index++) {
                                        const persistentManifold = physicsplugin.world.getDispatcher().getManifoldByIndexInternal(index);
                                        const persistentBody0:any = Ammo.castObject(persistentManifold.getBody0(), Ammo.btCollisionObject);
                                        const persistentBody1:any = Ammo.castObject(persistentManifold.getBody1(), Ammo.btCollisionObject);
                                        // Parse Collision Contact Manifold Pairs (Ammo.js)
                                        if (persistentBody0 != null && persistentBody0.entity != null && persistentBody0.entity.physicsImpostor != null) {
                                            if (persistentBody1 != null && persistentBody1.entity != null && persistentBody1.isActive()) {
                                                if (persistentBody0.entity.physicsImpostor.tmpCollisionObjects != null) {
                                                    persistentBody0.entity.physicsImpostor.tmpCollisionObjects[persistentBody1.entity.uniqueId] = persistentBody1.entity;
                                                }
                                            }
                                        }
                                        if (persistentBody1 != null && persistentBody1.entity != null && persistentBody1.entity.physicsImpostor != null) {
                                            if (persistentBody0 != null && persistentBody0.entity != null && persistentBody0.isActive()) {
                                                if (persistentBody1.entity.physicsImpostor.tmpCollisionObjects != null) {
                                                    persistentBody1.entity.physicsImpostor.tmpCollisionObjects[persistentBody0.entity.uniqueId] = persistentBody0.entity;
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                } else {
                    BABYLON.Tools.Warn("Ammo.js physics plugins are invalid");
                }
            } else {
                BABYLON.Tools.Warn("Ammo.js physics library not loaded");
            }
        }
        /** Gets the current ammo.js physics world. */
        public static GetPhysicsEngine(scene:BABYLON.Scene):BABYLON.IPhysicsEngine {
            return scene.getPhysicsEngine();
        }
        /** Gets the current ammo.js physics world. */
        public static GetPhysicsWorld(scene:BABYLON.Scene):any {
            let result:any = null;
            const physicsengine:BABYLON.IPhysicsEngine = BABYLON.SceneManager.GetPhysicsEngine(scene);
            if (physicsengine != null) {
                const physicsplugin:BABYLON.IPhysicsEnginePlugin = physicsengine.getPhysicsPlugin();
                if (physicsplugin != null) {
                    result = physicsplugin.world;
                }
            }
            return result;
        }

        // ***************************************** //
        // * Scene Physcis Impostor Helper Support * //
        // ***************************************** //

        /** Creates a validated entity parent child physics impostor */
        public static CreatePhysicsImpostor(scene:BABYLON.Scene, entity: BABYLON.AbstractMesh, type: number, options: BABYLON.PhysicsImpostorParameters, reparent:boolean = true):void {
            if (entity == null) return;
            entity.checkCollisions = false;
            const parent:BABYLON.Node = entity.parent;
            if (reparent === true) entity.parent = null;
            entity.physicsImpostor = new BABYLON.PhysicsImpostor(entity, type, options, scene);
            if (reparent === true) entity.parent = parent;
        }
        /** Gets the physics impostor type as a string. */
        public static GetPhysicsImposterType(type:number):string {
            let result:string = "Unknownr";
            switch (type) {
                case BABYLON.PhysicsImpostor.NoImpostor:
                    result = "No";
                    break;
                case BABYLON.PhysicsImpostor.SphereImpostor:
                    result = "Sphere";
                    break;
                case BABYLON.PhysicsImpostor.BoxImpostor:
                    result = "Box";
                    break;
                case BABYLON.PhysicsImpostor.PlaneImpostor:
                    result = "Plane";
                    break;
                case BABYLON.PhysicsImpostor.MeshImpostor:
                    result = "Mesh";
                    break;
                case BABYLON.PhysicsImpostor.CapsuleImpostor:
                    result = "Capsule";
                    break;
                case BABYLON.PhysicsImpostor.CylinderImpostor:
                    result = "Cylinder";
                    break;
                case BABYLON.PhysicsImpostor.ParticleImpostor:
                    result = "Particle";
                    break;
                case BABYLON.PhysicsImpostor.HeightmapImpostor:
                    result = "Heightmap";
                    break;
                case BABYLON.PhysicsImpostor.ConvexHullImpostor:
                    result = "ConvexHull";
                    break;
            }
            return result;
        }

        // **************************************** //
        // * Scene Physcis Raycast Helper Support * //
        // **************************************** //

        /** Perform a simple ray cast in the physics world. */
        public static SimpleRayCast(scene:BABYLON.Scene, origin:BABYLON.Vector3, dest:BABYLON.Vector3): BABYLON.Nullable<BABYLON.PhysicsRaycastResult> {
            if (scene == null) return null;
            let result:BABYLON.PhysicsRaycastResult = null;
            const physics:BABYLON.IPhysicsEngine = BABYLON.SceneManager.GetPhysicsEngine(scene);
            if (physics != null) {
                result = physics.raycast(origin, dest);
            }
            return result;
        }
        private static TempVRayOrigin = null;
        private static TempVRayDest = null;
        private static ClosestRayResultCallback = null;
        /** void rayTest(btVector3 rayFromWorld, btVector3 rayToWorld, RayResultCallback resultCallback); */
        /** Perform a ammo.js physics world ray test and optional filter mask. Can set result contact point and normal info. */
        public static PerformRayTest(world:any, origin:BABYLON.Vector3, dest:BABYLON.Vector3, group:number = null, mask:number = null, resultContactPoint:BABYLON.Vector3 = null, resultContactNormal:BABYLON.Vector3 = null): BABYLON.Nullable<boolean> {
            if (world == null) return null;
            if (BABYLON.SceneManager.TempVRayOrigin == null) BABYLON.SceneManager.TempVRayOrigin = new Ammo.btVector3(0, 0, 0);
            if (BABYLON.SceneManager.TempVRayDest == null) BABYLON.SceneManager.TempVRayDest = new Ammo.btVector3(0, 0, 0);
            if (BABYLON.SceneManager.ClosestRayResultCallback == null) BABYLON.SceneManager.ClosestRayResultCallback = new Ammo.ClosestRayResultCallback(BABYLON.SceneManager.TempVRayOrigin, BABYLON.SceneManager.TempVRayDest);
            // Reset closet callback result
            var rayCallBack = Ammo.castObject(BABYLON.SceneManager.ClosestRayResultCallback, Ammo.RayResultCallback);
            rayCallBack.set_m_closestHitFraction(1);
            rayCallBack.set_m_collisionObject(null);
            if (group != null) rayCallBack.set_m_collisionFilterGroup(group);
            else rayCallBack.set_m_collisionFilterGroup(BABYLON.CollisionFilters.DefaultFilter);
            if (mask != null) rayCallBack.set_m_collisionFilterMask(mask);
            else rayCallBack.set_m_collisionFilterMask(BABYLON.CollisionFilters.AllFilter);
            // Set origin and desttination
            BABYLON.SceneManager.TempVRayOrigin.setValue(origin.x, origin.y, origin.z);
            BABYLON.SceneManager.TempVRayDest.setValue(dest.x, dest.y, dest.z);
            BABYLON.SceneManager.ClosestRayResultCallback.get_m_rayFromWorld().setValue(origin.x, origin.y, origin.z);
            BABYLON.SceneManager.ClosestRayResultCallback.get_m_rayToWorld().setValue(dest.x, dest.y, dest.z);
            // Perform ray cast testing
            let result:boolean = false;
            world.rayTest(BABYLON.SceneManager.TempVRayOrigin, BABYLON.SceneManager.TempVRayDest, BABYLON.SceneManager.ClosestRayResultCallback);
            if (BABYLON.SceneManager.ClosestRayResultCallback.hasHit()) {
                result = true;
                if (resultContactPoint != null) {
                    const point = BABYLON.SceneManager.ClosestRayResultCallback.get_m_hitPointWorld();
                    resultContactPoint.set(point.x(), point.y(), point.z());
                    // Calculate Ray Hit Distance
                    // const resultContactDistance = BABYLON.Vector3.Distance(origin, resultContactPoint);
                }
                if (resultContactNormal != null) {
                    const normal = BABYLON.SceneManager.ClosestRayResultCallback.get_m_hitNormalWorld();
                    resultContactNormal.set(normal.x(), normal.y(), normal.z());
                }
            }
            return result;
        }
        /** void rayTest(btVector3 rayFromWorld, btVector3 rayToWorld, RayResultCallback resultCallback); */
        /** Perform a ammo.js physics world ray test all and optional filter mask. Can set result contact point and normal info. */
        public static PerformRayTestAll(world:any, origin:BABYLON.Vector3, dest:BABYLON.Vector3, group:number = null, mask:number = null, resultContactPoint:BABYLON.Vector3 = null, resultContactNormal:BABYLON.Vector3 = null): BABYLON.Nullable<boolean> {
            return null;
        }
        /** void convexSweepTest(btConvexShape castShape, btTransform from, btTransform to, ConvexResultCallback resultCallback, float allowedCcdPenetration); */
        /** Perform a ammo.js physics world box convex test and optional filter mask. Can set result contact point and normal info. */
        public static PerformBoxTest(world:any): BABYLON.Nullable<boolean> {
            return null;
        }
        /** void convexSweepTest(btConvexShape castShape, btTransform from, btTransform to, ConvexResultCallback resultCallback, float allowedCcdPenetration); */
        /** Perform a ammo.js physics world box convex test all and optional filter mask. Can set result contact point and normal info. */
        public static PerformBoxTestAll(world:any): BABYLON.Nullable<boolean> {
            return null;
        }
        /** void convexSweepTest(btConvexShape castShape, btTransform from, btTransform to, ConvexResultCallback resultCallback, float allowedCcdPenetration); */
        /** Perform a ammo.js physics world capsule convex test and optional filter mask. Can set result contact point and normal info. */
        public static PerformCapsuleTest(world:any): BABYLON.Nullable<boolean> {
            return null;
        }
        /** void convexSweepTest(btConvexShape castShape, btTransform from, btTransform to, ConvexResultCallback resultCallback, float allowedCcdPenetration); */
        /** Perform a ammo.js physics world capsule convex test all and optional filter mask. Can set result contact point and normal info. */
        public static PerformCapsuleTestAll(world:any): BABYLON.Nullable<boolean> {
            return null;
        }
        /** void convexSweepTest(btConvexShape castShape, btTransform from, btTransform to, ConvexResultCallback resultCallback, float allowedCcdPenetration); */
        /** Perform a ammo.js physics world sphere convex test and optional filter mask. Can set result contact point and normal info. */
        public static PerformSphereTest(world:any): BABYLON.Nullable<boolean> {
            return null;
        }
        /** void convexSweepTest(btConvexShape castShape, btTransform from, btTransform to, ConvexResultCallback resultCallback, float allowedCcdPenetration); */
        /** Perform a ammo.js physics world sphere convex test all and optional filter mask. Can set result contact point and normal info. */
        public static PerformSphereTestAll(world:any): BABYLON.Nullable<boolean> {
            return null;
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
        /** Locks user pointer state in the scene. */
        public static LockMousePointer(scene:BABYLON.Scene, lock: boolean): void {
            scene.getEngine().isPointerLock = lock;
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
        private static inputOneShockDPadDownHandler(dPadPressed: BABYLON.DualShockDpad): void {
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
        private static inputOneShockDPadUpHandler(dPadReleased: BABYLON.DualShockDpad): void {
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
        private static inputTwoShockDPadDownHandler(dPadPressed: BABYLON.DualShockDpad): void {
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
        private static inputTwoShockDPadUpHandler(dPadReleased: BABYLON.DualShockDpad): void {
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
        private static inputThreeShockDPadDownHandler(dPadPressed: BABYLON.DualShockDpad): void {
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
        private static inputThreeShockDPadUpHandler(dPadReleased: BABYLON.DualShockDpad): void {
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
        private static inputFourShockDPadDownHandler(dPadPressed: BABYLON.DualShockDpad): void {
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
        private static inputFourShockDPadUpHandler(dPadReleased: BABYLON.DualShockDpad): void {
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
                if (BABYLON.SceneManager.gamepad1 instanceof BABYLON.Xbox360Pad) {                    
                    BABYLON.SceneManager.gamepad1Type = BABYLON.GamepadType.Xbox360;
                    const xbox360Pad1: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad1 as BABYLON.Xbox360Pad;
                    xbox360Pad1.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
                    xbox360Pad1.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
                    xbox360Pad1.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
                    xbox360Pad1.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
                    xbox360Pad1.ondpadup(BABYLON.SceneManager.inputOneXboxDPadUpHandler);
                    xbox360Pad1.ondpaddown(BABYLON.SceneManager.inputOneXboxDPadDownHandler);
                    xbox360Pad1.onlefttriggerchanged(BABYLON.SceneManager.inputOneXboxLeftTriggerHandler);
                    xbox360Pad1.onrighttriggerchanged(BABYLON.SceneManager.inputOneXboxRightTriggerHandler);
                } else if (BABYLON.SceneManager.gamepad1 instanceof BABYLON.DualShockPad) {
                    BABYLON.SceneManager.gamepad1Type = BABYLON.GamepadType.DualShock;
                    const dualShockPad1: BABYLON.DualShockPad = BABYLON.SceneManager.gamepad1 as BABYLON.DualShockPad;
                    dualShockPad1.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
                    dualShockPad1.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
                    dualShockPad1.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
                    dualShockPad1.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
                    dualShockPad1.ondpadup(BABYLON.SceneManager.inputOneShockDPadUpHandler);
                    dualShockPad1.ondpaddown(BABYLON.SceneManager.inputOneShockDPadDownHandler);
                    dualShockPad1.onlefttriggerchanged(BABYLON.SceneManager.inputOneXboxLeftTriggerHandler);
                    dualShockPad1.onrighttriggerchanged(BABYLON.SceneManager.inputOneXboxRightTriggerHandler);
                } else if (BABYLON.SceneManager.gamepad1 instanceof BABYLON.PoseEnabledController) {
                    // TODO: Handle Pose Enabled Controllers (WebVR)
                    /*
                    gamepad.onTriggerStateChangedObservable.add((button, state)=>{
                        triggerText.text = "Trigger:" + button.value;
                    })
                    gamepad.onMainButtonStateChangedObservable.add((button, state)=>{
                        buttonsText.text = "Main button:" + button.value;
                    })
                    //Stick events
                    gamepad.onleftstickchanged((values)=>{               
                        stickText.text = "x:" + values.x.toFixed(3) + " y:" + values.y.toFixed(3);
                    });
                    gamepad.onrightstickchanged((values)=>{
                        stickText.text = "x:" + values.x.toFixed(3) + " y:" + values.y.toFixed(3);
                    }); 
                    */                    
                } else {
                    BABYLON.SceneManager.gamepad1Type = BABYLON.GamepadType.Generic;
                    const genericPad1: BABYLON.GenericPad = BABYLON.SceneManager.gamepad1 as BABYLON.GenericPad;
                    genericPad1.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
                    genericPad1.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
                    genericPad1.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
                    genericPad1.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
                }
            }
            if (BABYLON.SceneManager.gamepad2 == null && pad.index === 1) {
                BABYLON.SceneManager.gamepad2 = pad;
                BABYLON.Tools.Log("Gamepad Two Connected: " + BABYLON.SceneManager.gamepad2.id);
                if (BABYLON.SceneManager.gamepad2 instanceof BABYLON.Xbox360Pad) {                    
                    BABYLON.SceneManager.gamepad2Type = BABYLON.GamepadType.Xbox360;
                    const xbox360Pad2: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad2 as BABYLON.Xbox360Pad;
                    xbox360Pad2.onbuttonup(BABYLON.SceneManager.inputTwoButtonUpHandler);
                    xbox360Pad2.onbuttondown(BABYLON.SceneManager.inputTwoButtonDownHandler);
                    xbox360Pad2.onleftstickchanged(BABYLON.SceneManager.inputTwoLeftStickHandler);
                    xbox360Pad2.onrightstickchanged(BABYLON.SceneManager.inputTwoRightStickHandler);
                    xbox360Pad2.ondpadup(BABYLON.SceneManager.inputTwoXboxDPadUpHandler);
                    xbox360Pad2.ondpaddown(BABYLON.SceneManager.inputTwoXboxDPadDownHandler);
                    xbox360Pad2.onlefttriggerchanged(BABYLON.SceneManager.inputTwoXboxLeftTriggerHandler);
                    xbox360Pad2.onrighttriggerchanged(BABYLON.SceneManager.inputTwoXboxRightTriggerHandler);
                } else if (BABYLON.SceneManager.gamepad2 instanceof BABYLON.DualShockPad) {
                    BABYLON.SceneManager.gamepad2Type = BABYLON.GamepadType.DualShock;
                    const dualShockPad2: BABYLON.DualShockPad = BABYLON.SceneManager.gamepad2 as BABYLON.DualShockPad;
                    dualShockPad2.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
                    dualShockPad2.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
                    dualShockPad2.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
                    dualShockPad2.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
                    dualShockPad2.ondpadup(BABYLON.SceneManager.inputOneShockDPadUpHandler);
                    dualShockPad2.ondpaddown(BABYLON.SceneManager.inputOneShockDPadDownHandler);
                    dualShockPad2.onlefttriggerchanged(BABYLON.SceneManager.inputOneXboxLeftTriggerHandler);
                    dualShockPad2.onrighttriggerchanged(BABYLON.SceneManager.inputOneXboxRightTriggerHandler);
                } else if (BABYLON.SceneManager.gamepad2 instanceof BABYLON.PoseEnabledController) {
                    // TODO: Handle Pose Enabled Controllers (WebVR)
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
                if (BABYLON.SceneManager.gamepad3 instanceof BABYLON.Xbox360Pad) {                    
                    BABYLON.SceneManager.gamepad3Type = BABYLON.GamepadType.Xbox360;
                    const xbox360Pad3: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad3 as BABYLON.Xbox360Pad;
                    xbox360Pad3.onbuttonup(BABYLON.SceneManager.inputThreeButtonUpHandler);
                    xbox360Pad3.onbuttondown(BABYLON.SceneManager.inputThreeButtonDownHandler);
                    xbox360Pad3.onleftstickchanged(BABYLON.SceneManager.inputThreeLeftStickHandler);
                    xbox360Pad3.onrightstickchanged(BABYLON.SceneManager.inputThreeRightStickHandler);
                    xbox360Pad3.ondpadup(BABYLON.SceneManager.inputThreeXboxDPadUpHandler);
                    xbox360Pad3.ondpaddown(BABYLON.SceneManager.inputThreeXboxDPadDownHandler);
                    xbox360Pad3.onlefttriggerchanged(BABYLON.SceneManager.inputThreeXboxLeftTriggerHandler);
                    xbox360Pad3.onrighttriggerchanged(BABYLON.SceneManager.inputThreeXboxRightTriggerHandler);
                } else if (BABYLON.SceneManager.gamepad3 instanceof BABYLON.DualShockPad) {
                    const dualShockPad3: BABYLON.DualShockPad = BABYLON.SceneManager.gamepad3 as BABYLON.DualShockPad;
                    dualShockPad3.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
                    dualShockPad3.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
                    dualShockPad3.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
                    dualShockPad3.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
                    dualShockPad3.ondpadup(BABYLON.SceneManager.inputOneShockDPadUpHandler);
                    dualShockPad3.ondpaddown(BABYLON.SceneManager.inputOneShockDPadDownHandler);
                    dualShockPad3.onlefttriggerchanged(BABYLON.SceneManager.inputOneXboxLeftTriggerHandler);
                    dualShockPad3.onrighttriggerchanged(BABYLON.SceneManager.inputOneXboxRightTriggerHandler);
                } else if (BABYLON.SceneManager.gamepad3 instanceof BABYLON.PoseEnabledController) {
                    // TODO: Handle Pose Enabled Controllers (WebVR)
                } else {
                    BABYLON.SceneManager.gamepad3Type = BABYLON.GamepadType.Generic;
                    const genericPad3: BABYLON.GenericPad = BABYLON.SceneManager.gamepad3 as BABYLON.GenericPad;
                    genericPad3.onbuttonup(BABYLON.SceneManager.inputThreeButtonUpHandler);
                    genericPad3.onbuttondown(BABYLON.SceneManager.inputThreeButtonDownHandler);
                    genericPad3.onleftstickchanged(BABYLON.SceneManager.inputThreeLeftStickHandler);
                    genericPad3.onrightstickchanged(BABYLON.SceneManager.inputThreeRightStickHandler);
                }
            }
            if (BABYLON.SceneManager.gamepad4 == null && pad.index === 3) {
                BABYLON.SceneManager.gamepad4 = pad;
                BABYLON.Tools.Log("Gamepad Four Connected: " + BABYLON.SceneManager.gamepad4.id);
                if (BABYLON.SceneManager.gamepad4 instanceof BABYLON.Xbox360Pad) {                    
                    BABYLON.SceneManager.gamepad4Type = BABYLON.GamepadType.Xbox360;
                    const xbox360Pad4: BABYLON.Xbox360Pad = BABYLON.SceneManager.gamepad4 as BABYLON.Xbox360Pad;
                    xbox360Pad4.onbuttonup(BABYLON.SceneManager.inputFourButtonUpHandler);
                    xbox360Pad4.onbuttondown(BABYLON.SceneManager.inputFourButtonDownHandler);
                    xbox360Pad4.onleftstickchanged(BABYLON.SceneManager.inputFourLeftStickHandler);
                    xbox360Pad4.onrightstickchanged(BABYLON.SceneManager.inputFourRightStickHandler);
                    xbox360Pad4.ondpadup(BABYLON.SceneManager.inputFourXboxDPadUpHandler);
                    xbox360Pad4.ondpaddown(BABYLON.SceneManager.inputFourXboxDPadDownHandler);
                    xbox360Pad4.onlefttriggerchanged(BABYLON.SceneManager.inputFourXboxLeftTriggerHandler);
                    xbox360Pad4.onrighttriggerchanged(BABYLON.SceneManager.inputFourXboxRightTriggerHandler);
                } else if (BABYLON.SceneManager.gamepad4 instanceof BABYLON.DualShockPad) {
                    const dualShockPad4: BABYLON.DualShockPad = BABYLON.SceneManager.gamepad4 as BABYLON.DualShockPad;
                    dualShockPad4.onbuttonup(BABYLON.SceneManager.inputOneButtonUpHandler);
                    dualShockPad4.onbuttondown(BABYLON.SceneManager.inputOneButtonDownHandler);
                    dualShockPad4.onleftstickchanged(BABYLON.SceneManager.inputOneLeftStickHandler);
                    dualShockPad4.onrightstickchanged(BABYLON.SceneManager.inputOneRightStickHandler);
                    dualShockPad4.ondpadup(BABYLON.SceneManager.inputOneShockDPadUpHandler);
                    dualShockPad4.ondpaddown(BABYLON.SceneManager.inputOneShockDPadDownHandler);
                    dualShockPad4.onlefttriggerchanged(BABYLON.SceneManager.inputOneXboxLeftTriggerHandler);
                    dualShockPad4.onrighttriggerchanged(BABYLON.SceneManager.inputOneXboxRightTriggerHandler);
                } else if (BABYLON.SceneManager.gamepad4 instanceof BABYLON.PoseEnabledController) {
                    // TODO: Handle Pose Enabled Controllers (WebVR)
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
