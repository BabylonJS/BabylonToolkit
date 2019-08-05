module BABYLON {
    /**
     * Babylon metadata parser class (Internal use only)
     * @class MetadataParser - All rights reserved (c) 2019 Mackey Kinard
     */
    export class MetadataParser {
        private _disposeList:Array<BABYLON.TransformNode>;
        private _detailList:Array<BABYLON.AbstractMesh>;
        private _physicList:Array<BABYLON.AbstractMesh>;
        private _shadowList:Array<BABYLON.AbstractMesh>;
        private _freezeList:Array<BABYLON.AbstractMesh>;
        private _shaderList:Array<BABYLON.Material>;
        private _scriptList:Array<any>;
        private _activeMeshes:boolean;
        private _babylonScene:BABYLON.Scene;
        private _gltfLoader:BABYLON.GLTF2.GLTFLoader;
        public get loader():BABYLON.GLTF2.GLTFLoader { return this._gltfLoader; }
        constructor(scene:BABYLON.Scene, loader:BABYLON.GLTF2.GLTFLoader = null) { this._babylonScene = scene; this._gltfLoader = loader; this._disposeList = []; this._detailList = []; this._physicList = []; this._shadowList = []; this._shaderList = []; this._freezeList = []; this._scriptList = []; this._activeMeshes = false; }
        /** Parse the scene component metadata. Note: Internal use only */
        public parseSceneComponents(entity: BABYLON.AbstractMesh): void {
            BABYLON.MetadataParser.DoParseSceneComponents(this._babylonScene, entity, this._physicList, this._shadowList, this._scriptList, this._freezeList);
        }
        /** Post process pending scene components. Note: Internal use only */
        public postProcessSceneComponents():void {
            BABYLON.MetadataParser.DoProcessPendingDetails(this._babylonScene, this._detailList);
            BABYLON.MetadataParser.DoProcessPendingPhysics(this._babylonScene, this._physicList);
            BABYLON.MetadataParser.DoProcessPendingShadows(this._babylonScene, this._shadowList);
            BABYLON.MetadataParser.DoProcessPendingShaders(this._babylonScene, this._shaderList);
            BABYLON.MetadataParser.DoProcessPendingFreezes(this._babylonScene, this._freezeList, this._activeMeshes);
            BABYLON.MetadataParser.DoProcessPendingScripts(this._babylonScene, this._scriptList);
            BABYLON.MetadataParser.DoProcessPendingDisposes(this._disposeList);
            this._babylonScene = null; this._disposeList = null; this._detailList = null; this._physicList = null; this._shadowList = null; this._shaderList = null; this._freezeList = null; this._scriptList = null; this._activeMeshes = false;
        }
        /** Add detail level list item. Note: Internal use only */
        public addDetailLevelItem(mesh:BABYLON.AbstractMesh):void {
            if (this._detailList != null) this._detailList.push(mesh);
        }
        /** Add dispose entity list item. Note: Internal use only */
        public addDisposeEntityItem(transform:BABYLON.TransformNode):void {
            if (this._disposeList != null) this._disposeList.push(transform);
        }
        /** Add freeze shader material list item. Note: Internal use only */
        public addFreezeShaderMaterial(material:BABYLON.Material):void {
            if (this._shaderList != null) this._shaderList.push(material);
        }
        /** Set freeze scene active meshe list items. Note: Internal use only */
        public setFreezeActiveMeshes(freeze:boolean):void {
            this._activeMeshes = freeze;
        }
        /** Load float array from gltf accessor data */
        public loadFloatAccessorData(context:string, index:number):Promise<Nullable<Float32Array>> {
            if (this._gltfLoader == null) return Promise.resolve(null);
            const accessor = BABYLON.GLTF2.ArrayItem.Get(context, this._gltfLoader.gltf.accessors, index);
            return (<any>this._gltfLoader)._loadFloatAccessorAsync(`/accessors/${index}`, accessor);
        }
        /** Load indices array from gltf accessor data */
        public loadIndicesAccessorData(context:string, index:number):Promise<BABYLON.IndicesArray> {
            if (this._gltfLoader == null) return Promise.resolve(null);
            const accessor = BABYLON.GLTF2.ArrayItem.Get(context, this._gltfLoader.gltf.accessors, index);
            return (<any>this._gltfLoader)._loadIndicesAccessorAsync(`/accessors/${index}`, accessor);
        }

        // ******************************************* //
        // * Scene Manager Private Parsing Functions * //
        // ******************************************* //

        private static DoParseSceneComponents(scene:BABYLON.Scene, entity: BABYLON.AbstractMesh, physicList:Array<BABYLON.AbstractMesh>, shadowList: Array<BABYLON.AbstractMesh>, scriptList: Array<any>, freezeList: Array<BABYLON.TransformNode>): void {
            if (entity != null && entity.metadata != null && entity.metadata.unity != null && entity.metadata.unity.parsed != null && entity.metadata.unity.parsed === false) {
                entity.metadata.parsed = true;
                const metadata:any = entity.metadata.unity;
                //console.warn("===> Registering Entity: " + entity.name);
                entity.onDisposeObservable.addOnce(() => { BABYLON.Utilities.DisposeEntity(entity); });
                entity.metadata.clone = () => { return BABYLON.Utilities.CloneMetadata(entity.metadata); };
                const abstractmesh:boolean = (entity instanceof BABYLON.AbstractMesh);
                const tags:string = metadata.tags;
                if (tags != null && tags !== "") {
                    BABYLON.Tags.AddTagsTo(entity, tags);
                    if (tags.indexOf("NavigationMesh") >= 0) {
                        entity.isVisible = false;
                    }
                }
                if (metadata.physics != null) {
                    if (physicList != null) physicList.push(entity);
                }
                // ..
                // Parse Mesh Primitives
                // ..
                if (metadata.renderer != null) {
                    if (abstractmesh === true) {
                        entity.isPickable = false;
                        entity.useVertexColors = false;
                        entity.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_STANDARD;
                        if (metadata.renderer.cullingstrategy != null && metadata.renderer.cullingstrategy !== BABYLON.AbstractMesh.CULLINGSTRATEGY_STANDARD) {
                            entity.cullingStrategy = metadata.renderer.cullingstrategy;
                        }
                        if (metadata.renderer.castshadows != null && metadata.renderer.castshadows === true) {
                            if (shadowList != null) shadowList.push(entity);
                        }
                        if (metadata.renderer.receiveshadows != null && metadata.renderer.receiveshadows === true) {
                            entity.receiveShadows = true;
                        }
                        if (metadata.renderer.checkcollisions != null && metadata.renderer.checkcollisions === true) {
                            entity.checkCollisions = true;
                        }
                        if (metadata.renderer.usevertexcolors != null && metadata.renderer.usevertexcolors === true) {
                            entity.useVertexColors = true;
                        }
                        if (metadata.renderer.setmeshpickable != null && metadata.renderer.setmeshpickable === true) {
                            entity.isPickable = true;
                        }
                        if (metadata.renderer.freezeworldmatrix != null && metadata.renderer.freezeworldmatrix === true) {
                            if (freezeList != null) freezeList.push(entity);
                        }
                    } else {
                        const primitives = BABYLON.SceneManager.GetPrimitiveMeshes(entity);
                        if (primitives != null && primitives.length > 0) {
                            primitives.forEach((primitive) => {
                                primitive.isPickable = false;
                                primitive.useVertexColors = false;
                                primitive.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_STANDARD;
                                if (metadata.renderer.cullingstrategy != null && metadata.renderer.cullingstrategy !== BABYLON.AbstractMesh.CULLINGSTRATEGY_STANDARD) {
                                    primitive.cullingStrategy = metadata.renderer.cullingstrategy;
                                }
                                if (metadata.renderer.castshadows != null && metadata.renderer.castshadows === true) {
                                    if (shadowList != null) shadowList.push(primitive);
                                }
                                if (metadata.renderer.receiveshadows != null && metadata.renderer.receiveshadows === true) {
                                    primitive.receiveShadows = true;
                                }
                                if (metadata.renderer.checkcollisions != null && metadata.renderer.checkcollisions === true) {
                                    primitive.checkCollisions = true;
                                }
                                if (metadata.renderer.usevertexcolors != null && metadata.renderer.usevertexcolors === true) {
                                    primitive.useVertexColors = true;
                                }
                                if (metadata.renderer.setmeshpickable != null && metadata.renderer.setmeshpickable === true) {
                                    primitive.isPickable = true;
                                }
                                if (metadata.renderer.freezeworldmatrix != null && metadata.renderer.freezeworldmatrix === true) {
                                    if (freezeList != null) freezeList.push(primitive);
                                }
                            });
                        }
                    }
                }
                // ..
                // Parse Node Components
                // ..
                if (metadata.components != null) {
                    const components:any[] = metadata.components;
                    if (components != null && components.length > 0) {
                        components.forEach((component:any) => {
                            if (component != null) {
                                switch (component.alias) {
                                    case "camera": {    // Parse Unity Camera Properties
                                        BABYLON.MetadataParser.SetupCameraComponent(scene, entity, component);
                                        break;
                                    }
                                    case "light": {     // Parse Unity Lighting And Shadowing
                                        BABYLON.MetadataParser.SetupLightComponent(scene, entity, component);
                                        break;
                                    }
                                    case "text": {      // Parse Unity Text Mesh Writer Properties
                                        BABYLON.MetadataParser.SetupTextComponent(scene, entity, component);                                        
                                        break;
                                    }
                                    case "script": {    // Parse Native Babylon Script Components
                                        if (scriptList != null) scriptList.push({mesh:entity, comp:component});
                                        break;
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
        private static DoProcessPendingDetails(scene:BABYLON.Scene, detailList:Array<BABYLON.AbstractMesh>):void {
            if (detailList != null && detailList.length > 0) {
                detailList.forEach((mesh) => {
                    if (mesh.metadata != null && mesh.metadata.unity != null && mesh.metadata.unity.lods != null) {
                        const lodmeshes:string[] = mesh.metadata.unity.lods;
                        const wasenabled:boolean = mesh.isEnabled(false);
                        const mastermesh:BABYLON.Mesh = mesh as BABYLON.Mesh;
                        if (mesh.metadata.unity.distances != null) {
                            const distances: number[] = mesh.metadata.unity.distances;
                            if (distances.length >= lodmeshes.length) {
                                const culling: number = (distances.length > lodmeshes.length) ? distances[distances.length - 1] : 0;
                                mastermesh.setEnabled(false);
                                for (let index = 0; index < lodmeshes.length; index++) {
                                    const lodid:string = lodmeshes[index];
                                    const lodmesh:BABYLON.Mesh = scene.getMeshByID(lodid) as BABYLON.Mesh;
                                    if (lodmesh != null) {
                                        mastermesh.addLODLevel(distances[index], lodmesh);
                                    }
                                }
                                if (culling > 0) {
                                    mastermesh.addLODLevel(culling, null);
                                }
                                if (wasenabled === true) {
                                    mastermesh.setEnabled(true);
                                }
                            } else {
                                BABYLON.Tools.Warn("Invalid level of detail distances for " + mesh.name);
                            }
                        } else if (mesh.metadata.unity.coverages != null) {
                            // TODO: Support LOD Coverages
                        }
                    }
                });
            }
        }
        private static DoProcessPendingPhysics(scene:BABYLON.Scene, physicList: Array<BABYLON.AbstractMesh>):void {
            if (physicList != null && physicList.length > 0) {
                const physicsenabled:boolean = scene.isPhysicsEnabled();
                const physicsengine:BABYLON.IPhysicsEngine = (physicsenabled === true) ? scene.getPhysicsEngine() : null;
                const physicsloaded:boolean = (physicsenabled === true && physicsengine != null && physicsengine.getPhysicsPluginName() === "AmmoJSPlugin");
                if (physicsloaded === true) {
                    physicList.forEach((mesh) => { 
                        // Pro Feature Pack - Rigidbody Physics System
                        if ((<any>window).BABYLON.RigidbodyPhysics && (<any>window).BABYLON.RigidbodyPhysics.SetupPhysicsComponent) {
                            (<any>window).BABYLON.RigidbodyPhysics.SetupPhysicsComponent(scene, mesh);
                        }
                    });
                } else {
                    BABYLON.Tools.Warn("Ammo.js physics engine not loaded. Physics impostors will not be created.");
                }
            }
        }
        private static DoProcessPendingShadows(scene:BABYLON.Scene, shadowList: Array<BABYLON.AbstractMesh>):void {
            if (shadowList != null && shadowList.length > 0) {
                if (scene.lights != null && scene.lights.length > 0) {
                    scene.lights.forEach((light) => {
                        if (light._shadowGenerator != null && light.metadata != null && light.metadata.unity != null && light.metadata.unity.generator === true) {
                            const shadowgenerator:BABYLON.IShadowGenerator = light._shadowGenerator;
                            const shadowmap:BABYLON.RenderTargetTexture = shadowgenerator.getShadowMap();
                            if (shadowmap != null) {
                                if (shadowmap.renderList == null) shadowmap.renderList = [];
                                shadowList.forEach((mesh:BABYLON.AbstractMesh) => { shadowmap.renderList.push(mesh); });
                            }
                        }
                    });
                }
            }
        }
        private static DoProcessPendingShaders(scene:BABYLON.Scene, shaderList: Array<BABYLON.Material>):void {
            if (shaderList != null && shaderList.length > 0) {
                shaderList.forEach((material) => { material.freeze(); });
            }
        }
        private static DoProcessPendingFreezes(scene:BABYLON.Scene, freezeList: Array<BABYLON.AbstractMesh>, activeMeshes:boolean):void {
            if (freezeList != null && freezeList.length > 0) {
                freezeList.forEach((mesh) => { mesh.freezeWorldMatrix(); });
            }
            if (activeMeshes === true) scene.freeActiveMeshes();
        }
        private static DoProcessPendingScripts(scene:BABYLON.Scene, scriptList: Array<any>):void {
            if (scriptList != null && scriptList.length > 0) {
                let registerList:Array<any> = [];
                scriptList.sort((left, right): number => {
                    if (left.comp.order < right.comp.order) return -1;
                    if (left.comp.order > right.comp.order) return 1;
                    return 0;
                });
                scriptList.forEach((item) => {
                    if (item.comp.klass != null && item.comp.klass !== "" && item.comp.klass !== "BABYLON.ScriptComponent") {
                        let ScriptComponentClass = BABYLON.Utilities.InstantiateClass(item.comp.klass);
                        if (ScriptComponentClass != null) {
                            const scriptComponent:BABYLON.ScriptComponent = new ScriptComponentClass(item.mesh, scene, item.comp.properties);
                            if (scriptComponent != null) {
                                const isscript:boolean = (scriptComponent instanceof BABYLON.ScriptComponent);
                                if (isscript === true) {
                                    item.comp.instance = scriptComponent;
                                    registerList.push(item.comp.instance);
                                } else {
                                    BABYLON.Tools.Warn("Non script component instantiated class: " + item.comp.klass);
                                }
                            } else {
                                BABYLON.Tools.Warn("Failed to instantiate script class: " + item.comp.klass);
                            }
                        } else {
                            BABYLON.Tools.Warn("Failed to locate script class: " + item.comp.klass);
                        }
                    }
                });
                if (registerList != null && registerList.length > 0) {
                    registerList.forEach((instance) => { BABYLON.SceneManager.RegisterScriptComponent(instance, false); });
                }
                registerList = null;
            }
        }
        private static DoProcessPendingDisposes(disposeList: Array<BABYLON.TransformNode>):void {
            if (disposeList != null && disposeList.length > 0) {
                disposeList.forEach((node) => { node.dispose(false); });
            }
        }

        // ****************************************** //
        // * Scene Manager Private Worker Functions * //
        // ****************************************** //
        
        private static SetupCameraComponent(scene:BABYLON.Scene, entity: BABYLON.AbstractMesh, component: any): void {
            entity.checkCollisions = false;
            const name = entity.name + "_rig";
            const rotation:number = (scene.useRightHandedSystem === true) ? (Math.PI * BABYLON.System.Rad2Deg) : 0;
            const babyonCamera:BABYLON.FreeCamera = new BABYLON.FreeCamera(name, BABYLON.Vector3.Zero(), scene);
            babyonCamera.checkCollisions = false;
            babyonCamera.rotationQuaternion = BABYLON.Utilities.FromEuler(0, rotation, 0);
            babyonCamera.parent = entity;
            if (babyonCamera.inputs != null) {
                babyonCamera.inputs.clear();
            }
            // ..
            // Setup Camera Properties
            // ..
            const maincamera:boolean = component.maincamera != null ? component.maincamera : false;
            if (maincamera === true) {
                if (scene.activeCamera == null) scene.activeCamera = babyonCamera;
            }
            const cameratype:number = component.type != null ? component.type : 0;
            switch (cameratype) {
                case 0: { // PERSPECTIVE
                    babyonCamera.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;
                    if (component.perspectiveyfov != null) {
                        babyonCamera.fov = component.perspectiveyfov;
                    }
                    if (component.perspectiveznear != null) {
                        babyonCamera.minZ = component.perspectiveznear;
                    }
                    if (component.perspectivezfar != null) {
                        babyonCamera.maxZ = component.perspectivezfar;
                    }
                    break;
                }
                case 1: { // ORTHOGRAPHIC
                    babyonCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
                    if (component.orthoxmag != null) {
                        babyonCamera.orthoLeft = -component.orthoxmag;
                        babyonCamera.orthoRight = component.orthoxmag;
                    }
                    if (component.orthoymag != null) {
                        babyonCamera.orthoBottom = -component.orthoymag;
                        babyonCamera.orthoTop = component.orthoymag;
                    }
                    if (component.orthoznear != null) {
                        babyonCamera.minZ = component.orthoznear;
                    }
                    if (component.orthozfar != null) {
                        babyonCamera.maxZ = component.orthozfar;
                    }
                    break;
                }
            }
            // ..
            // Attach Camera Rig To Mesh
            // ..
            (<any>entity).cameraRig = babyonCamera;
        }
        private static SetupLightComponent(scene:BABYLON.Scene, entity: BABYLON.AbstractMesh, component: any):void {
            entity.checkCollisions = false;
            const name = entity.name + "_rig";
            let babylonLight: BABYLON.Light;
            // ..
            // Setup Light Properties
            // ..
            let intensityFactor:number = 1;
            const lightType:number = component.type != null ? component.type : 0;
            switch (lightType) {
                case 0: { // DIRECTIONAL
                    const direction:Vector3 = (scene.useRightHandedSystem === true) ? BABYLON.Vector3.Backward() : BABYLON.Vector3.Forward();
                    const orthoscale:number = component.orthoscale != null ? component.orthoscale : 0.1;
                    const babylonDirLight = new BABYLON.DirectionalLight(name, direction, scene);
                    babylonDirLight.shadowOrthoScale = orthoscale;
                    babylonLight = babylonDirLight;
                    babylonLight.falloffType = BABYLON.Light.FALLOFF_STANDARD;
                    intensityFactor = 3.99;
                    break;
                }
                case 1: { // POINT
                    const babylonPointLight = babylonLight = new BABYLON.PointLight(name, BABYLON.Vector3.Zero(), scene);
                    babylonLight = babylonPointLight;
                    babylonLight.falloffType = BABYLON.Light.FALLOFF_STANDARD;
                    intensityFactor = 1;
                    break;
                }
                case 2: { // SPOT
                    const direction:Vector3 = (scene.useRightHandedSystem === true) ? BABYLON.Vector3.Backward() : BABYLON.Vector3.Forward();
                    const outerAngle:number = (component.spotangle != null) ? component.spotangle : (Math.PI / 4);
                    const babylonSpotLight = new BABYLON.SpotLight(name, BABYLON.Vector3.Zero(), direction, 0, 1, scene);
                    babylonSpotLight.angle = (outerAngle * BABYLON.System.Deg2Rad) * 0.966;
                    babylonSpotLight.innerAngle = (babylonSpotLight.angle * 0.8);
                    babylonLight = babylonSpotLight;
                    babylonLight.falloffType = BABYLON.Light.FALLOFF_GLTF;
                    intensityFactor = 6.66;
                    break;
                }
            }
            if (babylonLight != null) {
                babylonLight.parent = entity;
                babylonLight.range = component.range != null ? component.range : Number.MAX_VALUE;
                babylonLight.diffuse = component.color != null ? BABYLON.Utilities.ParseColor3(component.color) : BABYLON.Color3.White();
                babylonLight.intensity = (component.intensity != null ? component.intensity : 1) * intensityFactor;
                babylonLight.lightmapMode = component.lightmapmode != null ? component.lightmapmode : BABYLON.Light.LIGHTMAP_DEFAULT;
                babylonLight.intensityMode = BABYLON.Light.INTENSITYMODE_AUTOMATIC;
                babylonLight.shadowEnabled = false;                
                // ..
                const softshadows:boolean = component.softshadows != null ? component.softshadows : false;
                const shadowmapsize:number = component.shadowmapsize != null ? component.shadowmapsize : 512;
                const generateshadows:boolean = component.generateshadows != null ? component.generateshadows : false;
                const hardshadowfilter:string = component.hardshadowfilter != null ? component.hardshadowfilter : "None";
                const softshadowfilter:string = component.softshadowfilter != null ? component.softshadowfilter : "None";
                const biasscalefactor:number = component.biasscalefactor != null ? component.biasscalefactor : 0.01;
                const shadowmapbias:number = component.shadowmapbias != null ? component.shadowmapbias : 0.05;
                const normalmapbias:number = component.normalmapbias != null ? component.normalmapbias : 0.4;
                const shadowstrength:number = component.shadowstrength != null ? component.shadowstrength : 1;
                const shadowdistance:number = component.shadowdistance != null ? component.shadowdistance : 40;
                const shadownearplane:number = component.shadownearplane != null ? component.shadownearplane : 0.2;
                const shadowdepthscale:number = component.shadowdepthscale != null ? component.shadowdepthscale : 50;
                const contacthardening:number = component.contacthardening != null ? component.contacthardening : 0.1;
                const usekernelblur:boolean = component.usekernelblur != null ? component.usekernelblur : true;
                const shadowblurkernel:number = component.shadowblurkernel != null ? component.shadowblurkernel : 1;
                const shadowblurscale:number = component.shadowblurscale != null ? component.shadowblurscale : 2;
                const shadowbluroffset:number = component.shadowbluroffset != null ? component.shadowbluroffset : 1;
                const shadowfilterquality:string = component.shadowfilterquality != null ? component.shadowfilterquality : "Medium";
                const transparencyshadow:boolean = component.transparencyshadow != null ? component.transparencyshadow : false;
                const forcebackfacesonly:boolean = component.forcebackfacesonly != null ? component.forcebackfacesonly : true;
                const frustumedgefalloff:number = component.frustumedgefalloff != null ? component.frustumedgefalloff : 0;
                // ..                   
                if (generateshadows === true) {
                    const shadowlight = babylonLight as BABYLON.ShadowLight;
                    const shadowgenerator:BABYLON.ShadowGenerator = new BABYLON.ShadowGenerator(shadowmapsize, shadowlight, true);
                    // ..
                    // Setup Shadow Map Generator Options
                    // ..
                    shadowlight.shadowEnabled = true;
                    shadowlight.shadowMinZ = shadownearplane;
                    shadowlight.shadowMaxZ = shadowdistance;
                    // ..
                    shadowgenerator.bias = shadowmapbias * biasscalefactor;
                    shadowgenerator.normalBias = normalmapbias * biasscalefactor;
                    shadowgenerator.depthScale = shadowdepthscale;
                    shadowgenerator.setDarkness(1 - BABYLON.Scalar.Clamp(shadowstrength * 0.9));
                    shadowgenerator.useKernelBlur = usekernelblur;
                    shadowgenerator.blurKernel = shadowblurkernel;
                    shadowgenerator.blurScale = shadowblurscale;
                    shadowgenerator.blurBoxOffset = shadowbluroffset;
                    shadowgenerator.frustumEdgeFalloff = frustumedgefalloff;
                    shadowgenerator.forceBackFacesOnly = forcebackfacesonly;
                    shadowgenerator.setTransparencyShadow(transparencyshadow);
                    shadowgenerator.contactHardeningLightSizeUVRatio = contacthardening;
                    // ..
                    if (softshadows === true) {
                        switch (softshadowfilter) {
                            case "PoissonSampling":
                                shadowgenerator.usePoissonSampling = true;
                                break;
                            case "BlurExponentialShadowMap":
                                shadowgenerator.useBlurExponentialShadowMap = true;
                                break;
                            case "BlurCloseExponentialShadowMap":
                                shadowgenerator.useBlurCloseExponentialShadowMap = true;
                                break;
                            case "PercentageCloserFiltering":
                                shadowgenerator.usePercentageCloserFiltering = true;
                                break;
                            case "ContactHardeningShadowMap":
                                shadowgenerator.useContactHardeningShadow = true;
                                break;
                        }
                    } else {
                        switch (hardshadowfilter) {
                            case "ExponentialShadowMap":
                                shadowgenerator.useExponentialShadowMap = true;
                                break;
                            case "CloseExponentialShadowMap":
                                shadowgenerator.useCloseExponentialShadowMap = true;
                                break;
                        }
                    }
                    switch (shadowfilterquality) {
                        case "High":
                            shadowgenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_HIGH;
                            break;
                        case "Medium":
                            shadowgenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_MEDIUM;
                            break;
                        case "Low":
                            shadowgenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_LOW;
                            break;
                    }
                    if (babylonLight.metadata == null) babylonLight.metadata = {};
                    if (babylonLight.metadata.unity == null) babylonLight.metadata.unity = {};
                    babylonLight.metadata.unity.generator = true;
                }
                // ..
                // Attach Light Rig To Mesh
                // ..
                (<any>entity).lightRig = babylonLight;
            }
        }
        private static SetupTextComponent(scene:BABYLON.Scene, entity: BABYLON.AbstractMesh, component: any): void {
            //console.log("Parsing Text Mesh Component: " + entity.name);
            const achor:string = (component.anchor != null) ? component.anchor : "UpperLeft";
            const fontname:string = (component.fontname != null) ? component.fontname : "Arial";
            const fontnames:string[] = ["Arial", "Helvetica", "Sans-Serif", "ComicSans", "Jura", "HirukoPro-Book", "WebGL-Dings"];
            let anchor_mode:string = "upper";
            let text_anchor:string = "left";
            let font_name:string = "Arial";
            // ..
            const mesh_text:string = (component.text != null && component.text !== "") ? component.text : "babylon.js";
            const text_alpha:number = (component.alpha != null) ? component.alpha : 1;
            const letter_height:number = (component.charactersize != null) ? component.charactersize : 1;
            const letter_thickness:number = (component.letterthickness != null) ? component.letterthickness :0.01;
            const upper_offset:number = (letter_height * -1);
            const middle_offset:number = (letter_height * -0.33);
            const lower_offset:number = (letter_height * 0.25);
            const y_offset:number = (anchor_mode === "middle") ? middle_offset : (anchor_mode === "lower") ? lower_offset : upper_offset;
            const z_offset:number = (component.offsetz != null) ? component.offsetz : 0;
            // ..
            const diffuse_color:string = (component.diffusecolor != null && component.diffusecolor !== "") ? component.diffusecolor : "#FFFFFF";
            const ambient_color:string = (component.ambientcolor != null && component.ambientcolor !== "") ? component.ambientcolor : "#E6E6E6";
            const specular_color:string = (component.specularcolor != null && component.specularcolor !== "") ? component.specularcolor : "#000000";
            const emissive_color:string = (component.emissivecolor != null && component.emissivecolor !== "") ? component.emissivecolor : "#000000";
            const disable_lighting:boolean = (component.disablelighting != null) ? component.disablelighting : false;
            // ..
            if ((<any>window).BABYLON.MeshWriter) {
                const Writer = (<any>window).BABYLON.MeshWriter(scene, {scale: 1});
                if (Writer != null) {
                    const textOptions:any = {
                        "anchor" : text_anchor,
                        "font-family" : font_name, 
                        "letter-height" : letter_height,
                        "letter-thickness" : letter_thickness,
                        "position" : {
                            "y" : y_offset,
                            "z" : z_offset
                        },
                        "alpha" : text_alpha,
                        "colors" : {
                            "diffuse" : diffuse_color,
                            "ambient" : ambient_color,
                            "specular" : specular_color,                    
                            "emissive": emissive_color,
                        }
                    };
                    const textWriter  = new Writer(mesh_text, textOptions);
                    if (textWriter != null) { 
                        const textMaterial:BABYLON.StandardMaterial = textWriter.getMaterial();
                        if (textMaterial != null) {
                            textMaterial.disableLighting = disable_lighting;
                        }
                        const textMesh:BABYLON.AbstractMesh = textWriter.getMesh();
                        if (textMesh != null) {
                            textMesh.rotation = new BABYLON.Vector3(-Math.PI/2, Math.PI/2, -Math.PI/2);
                            textMesh.parent = entity;
                            textMesh.name = entity.name + "_text";
                        } else {
                            BABYLON.Tools.Warn("Failed to get text mesh or material for: " + entity.name);
                        }
                        // ..
                        // Attach Text Writer To Mesh
                        // ..
                        (<any>entity).textWriter = textWriter;
                    } else {
                        BABYLON.Tools.Warn("Failed to create textWriter instance for: " + entity.name);
                    }
                } else {
                    BABYLON.Tools.Warn("Failed to create MeshWriter class for: " + entity.name);
                }
            }
        }
    }
}