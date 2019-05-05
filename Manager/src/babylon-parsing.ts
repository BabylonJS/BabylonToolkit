module BABYLON {
    /**
     * Babylon scene manager parser class (Internal use only)
     * @class MetadataParser
     */
    export class MetadataParser {
        private _disposeList:Array<BABYLON.TransformNode>;
        private _detailList:Array<BABYLON.AbstractMesh>;
        private _physicList:Array<BABYLON.AbstractMesh>;
        private _shadowList:Array<BABYLON.AbstractMesh>;
        private _scriptList:Array<any>;
        private _babylonScene:BABYLON.Scene;
        private _gltfLoader:BABYLON.GLTF2.GLTFLoader;
        public get loader():BABYLON.GLTF2.GLTFLoader { return this._gltfLoader; }
        constructor(scene:BABYLON.Scene, loader:BABYLON.GLTF2.GLTFLoader = null) { this._babylonScene = scene; this._gltfLoader = loader; this._disposeList = []; this._detailList = []; this._physicList = []; this._shadowList = []; this._scriptList = []; }
        /** Parse the scene component metadata. Note: Internal use only */
        public parseSceneComponents(entity: BABYLON.AbstractMesh): void {
            BABYLON.MetadataParser.DoParseSceneComponents(this._babylonScene, entity, this._physicList, this._shadowList, this._scriptList);
        }
        /** Post process pending scene components. Note: Internal use only */
        public postProcessSceneComponents():void {
            BABYLON.MetadataParser.DoProcessPendingDetails(this._babylonScene, this._detailList);
            BABYLON.MetadataParser.DoProcessPendingPhysics(this._babylonScene, this._physicList);
            BABYLON.MetadataParser.DoProcessPendingShadows(this._babylonScene, this._shadowList);
            BABYLON.MetadataParser.DoProcessPendingScripts(this._babylonScene, this._scriptList);
            BABYLON.MetadataParser.DoProcessPendingDisposes(this._disposeList);
            this._babylonScene = null; this._disposeList = null; this._detailList = null; this._physicList = null; this._shadowList = null; this._scriptList = null;
        }
        /** Add detail level list item. Note: Internal use only */
        public addDetailLevelItem(mesh:BABYLON.AbstractMesh):void {
            this._detailList.push(mesh);
        }
        /** Add dispose entity list item. Note: Internal use only */
        public addDisposeEntityItem(transform:BABYLON.TransformNode):void {
            this._disposeList.push(transform);
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

        private static DoParseSceneComponents(scene:BABYLON.Scene, entity: BABYLON.AbstractMesh, physicList:Array<BABYLON.AbstractMesh>, shadowList: Array<BABYLON.AbstractMesh>, scriptList: Array<any>): void {
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
                        if (metadata.renderer.castshadows != null && metadata.renderer.castshadows === true) {
                            if (shadowList != null) shadowList.push(entity);
                        }
                        if (metadata.renderer.receiveshadows != null && metadata.renderer.receiveshadows === true) {
                            entity.receiveShadows = true;
                        }
                        if (metadata.renderer.checkcollisions != null && metadata.renderer.checkcollisions === true) {
                            entity.checkCollisions = true;
                        }
                    } else {
                        const primitives = BABYLON.SceneManager.GetPrimitiveMeshes(entity);
                        if (primitives != null && primitives.length > 0) {
                            primitives.forEach((primitive) => {
                                if (metadata.renderer.castshadows != null && metadata.renderer.castshadows === true) {
                                    if (shadowList != null) shadowList.push(primitive);
                                }
                                if (metadata.renderer.receiveshadows != null && metadata.renderer.receiveshadows === true) {
                                    primitive.receiveShadows = true;
                                }
                                if (metadata.renderer.checkcollisions != null && metadata.renderer.checkcollisions === true) {
                                    primitive.checkCollisions = true;
                                }
                            });
                        }
                    }
                }
                // ..
                // Parse Mesh Components
                // ..
                if (metadata.components != null) {
                    const components:any[] = metadata.components;
                    if (components != null && components.length > 0) {
                        components.forEach((component:any) => {
                            if (component != null) {
                                switch (component.alias) {
                                    case "script":
                                        if (scriptList != null) scriptList.push({mesh:entity, comp:component});
                                        break;
                                    case "camera":
                                        BABYLON.MetadataParser.SetupCameraComponent(scene, entity, component);
                                        break;
                                    case "light":
                                        BABYLON.MetadataParser.SetupLightComponent(scene, entity, component);
                                        break;
                                }
                            }
                        });
                    }
                }
            }
        }
        private static DoProcessPendingDisposes(disposeList: Array<BABYLON.TransformNode>):void {
            if (disposeList != null && disposeList.length > 0) {
                disposeList.forEach((node) => { node.dispose(false); });
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
                    physicList.forEach((mesh) => { BABYLON.MetadataParser.SetupPhysicsComponent(scene, mesh); });
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

        // ****************************************** //
        // * Scene Manager Private Worker Functions * //
        // ****************************************** //

        private static SetupPhysicsComponent(scene:BABYLON.Scene, entity: BABYLON.AbstractMesh): void {
            const metadata:any = (entity.metadata != null && entity.metadata.unity != null) ? entity.metadata.unity : null;
            if (metadata != null && metadata.physics != null) {
                entity.checkCollisions = false;
                const mass:number = (metadata.physics.mass != null) ? metadata.physics.mass : 0;
                const center:BABYLON.Vector3 = (metadata.physics.center != null) ? BABYLON.Utilities.ParseVector3(metadata.physics.center, BABYLON.Vector3.Zero()) : BABYLON.Vector3.Zero();
                if (metadata.physics.type === "rigidbody") {
                    if (BABYLON.SceneManager.DebugPhysics) BABYLON.Tools.Log("Initialize rigidbody physics for: " + entity.name);
                    if (metadata.collision != null && metadata.collision.type != null && metadata.collision.type === "MeshCollider") {
                        // ..
                        // Setup Mesh Collider Impostors
                        // ..
                        let impostortype:number = BABYLON.PhysicsImpostor.MeshImpostor;
                        const convexmesh:boolean = (metadata.collision.convexmesh != null) ? metadata.collision.convexmesh : false;
                        const impersonatemesh:string = (metadata.collision.impersonatemesh != null) ? metadata.collision.impersonatemesh : "DefaultImpostor";
                        const dynamicfriction:number = (metadata.collision.dynamicfriction != null) ? metadata.collision.dynamicfriction : 0.6;
                        const staticfriction:number = (metadata.collision.staticfriction != null) ? metadata.collision.staticfriction : 0.6;
                        const restitution:number = (metadata.collision.restitution != null) ? metadata.collision.restitution : 0.0;
                        const debugging:boolean = (metadata.collision.debugging != null) ? metadata.collision.debugging : false;
                        const istrigger:boolean = (metadata.collision.trigger != null) ? metadata.collision.trigger : false;
                        if (impersonatemesh === "BoxImpostor") impostortype = BABYLON.PhysicsImpostor.BoxImpostor;
                        else if (impersonatemesh === "PlaneImpostor") impostortype = BABYLON.PhysicsImpostor.PlaneImpostor;
                        else if (impersonatemesh === "SphereImpostor") impostortype = BABYLON.PhysicsImpostor.SphereImpostor;
                        else if (impersonatemesh === "CylinderImpostor") impostortype = BABYLON.PhysicsImpostor.CylinderImpostor;
                        else impostortype = (convexmesh === true) ? BABYLON.PhysicsImpostor.ConvexHullImpostor : BABYLON.PhysicsImpostor.MeshImpostor;
                        if (BABYLON.SceneManager.DebugPhysics) BABYLON.Tools.Log("Setup " + BABYLON.Utilities.FormatPhysicsImposterType(impostortype).toLowerCase() + " entity imposter for: " + entity.name);
                        BABYLON.MetadataParser.CreateEntityPhysicsImpostor(scene, entity, impostortype, { mass: mass, friction: dynamicfriction, restitution: restitution });
                        BABYLON.MetadataParser.SetupRigidbodyPhysicsFunction(scene, entity, false, istrigger, metadata.physics, debugging);
                    } else {
                        // ..
                        // Setup Compound Collider Impostors
                        // ..
                        let fdynamicfriction:number = 0.0;
                        let fstaticfriction:number = 0.0;
                        let frestitution:number = 0.0;
                        let fdebugging:number = 0;
                        let ftrigger:boolean = false;
                        let fcount:number = 0;
                        let childnodes:BABYLON.AbstractMesh[] = entity.getChildMeshes(true);
                        if (childnodes != null && childnodes.length > 0) {
                            childnodes.forEach((childnode:BABYLON.AbstractMesh) => {
                                if (childnode.metadata != null && childnode.metadata.unity != null) {
                                    if (childnode.metadata.unity.collision != null) {
                                        childnode.position.subtractInPlace(center);
                                        const collision:any = childnode.metadata.unity.collision;
                                        let cimpostortype:number = BABYLON.PhysicsImpostor.BoxImpostor;
                                        const cconvexmesh:boolean = (collision.convexmesh != null) ? collision.convexmesh : false;
                                        const cimpersonatemesh:string = (collision.impersonatemesh != null) ? collision.impersonatemesh : "DefaultImpostor";
                                        const cdynamicfriction:number = (collision.dynamicfriction != null) ? collision.dynamicfriction : 0.6;
                                        const cstaticfriction:number = (collision.staticfriction != null) ? collision.staticfriction : 0.6;
                                        const crestitution:number = (collision.restitution != null) ? collision.restitution : 0.0;
                                        const cdebugging:boolean = (collision.debugging != null) ? collision.debugging : false;
                                        const cistrigger:boolean = (collision.trigger != null) ? collision.trigger : false;
                                        const ccollider:string = (collision.type != null) ? collision.type : "BoxCollider";
                                        if (ccollider === "MeshCollider") {
                                            if (cimpersonatemesh === "BoxImpostor") cimpostortype = BABYLON.PhysicsImpostor.BoxImpostor;
                                            else if (cimpersonatemesh === "PlaneImpostor") cimpostortype = BABYLON.PhysicsImpostor.PlaneImpostor;
                                            else if (cimpersonatemesh === "SphereImpostor") cimpostortype = BABYLON.PhysicsImpostor.SphereImpostor;
                                            else if (cimpersonatemesh === "CylinderImpostor") cimpostortype = BABYLON.PhysicsImpostor.CylinderImpostor;
                                            else cimpostortype = (cconvexmesh === true) ? BABYLON.PhysicsImpostor.ConvexHullImpostor : BABYLON.PhysicsImpostor.MeshImpostor;
                                        } else if (ccollider === "WheelCollider") {
                                            cimpostortype = BABYLON.PhysicsImpostor.CylinderImpostor; 
                                        } else if (ccollider === "CapsuleCollider") {
                                            cimpostortype = BABYLON.PhysicsImpostor.CylinderImpostor; 
                                        } else if (ccollider === "CharacterController") {
                                            cimpostortype = BABYLON.PhysicsImpostor.CylinderImpostor; 
                                        } else if (ccollider === "SphereCollider") {
                                            cimpostortype = BABYLON.PhysicsImpostor.SphereImpostor; 
                                        } else if (ccollider === "BoxCollider") {
                                            cimpostortype = BABYLON.PhysicsImpostor.BoxImpostor; 
                                        }
                                        if (cdynamicfriction > fdynamicfriction) fdynamicfriction = cdynamicfriction;
                                        if (cstaticfriction > fstaticfriction) fstaticfriction = cstaticfriction;
                                        if (crestitution > frestitution) frestitution = crestitution;
                                        if (cdebugging === true) fdebugging = 1;
                                        if (cistrigger == true) ftrigger = true;
                                        if (BABYLON.SceneManager.DebugPhysics) BABYLON.Tools.Log("Setup " + BABYLON.Utilities.FormatPhysicsImposterType(cimpostortype).toLowerCase() + " child imposter for: " + childnode.name);
                                        BABYLON.MetadataParser.CreateEntityPhysicsImpostor(scene, childnode, cimpostortype, { mass: 0, friction: 0, restitution: 0 });
                                        BABYLON.MetadataParser.SetupRigidbodyPhysicsFunction(scene, childnode, true, false, metadata.physics, cdebugging);
                                        fcount++;
                                    }
                                }
                            });
                        }
                        if (fcount > 0) {
                            if (BABYLON.SceneManager.DebugPhysics) BABYLON.Tools.Log("Setup physics root no imposter for: " + entity.name);
                            BABYLON.MetadataParser.CreateEntityPhysicsImpostor(scene, entity, BABYLON.PhysicsImpostor.NoImpostor, { mass: mass, friction: fdynamicfriction, restitution: frestitution });
                            BABYLON.MetadataParser.SetupRigidbodyPhysicsFunction(scene, entity, false, ftrigger, metadata.physics, (fdebugging === 1));
                        }
                        childnodes = null;
                    }
                }
            }
        }
        private static SetupCameraComponent(scene:BABYLON.Scene, entity: BABYLON.AbstractMesh, component: any): void {
            const name = entity.name + "_rig";
            const rotation:number = (scene.useRightHandedSystem === true) ? Math.PI : 0;
            let babyonCamera:BABYLON.UniversalCamera = new BABYLON.UniversalCamera(name, BABYLON.Vector3.Zero(), scene);
            babyonCamera.parent = entity;
            babyonCamera.rotation = new BABYLON.Vector3(0, rotation, 0);
            babyonCamera.checkCollisions = false;
            entity.checkCollisions = false;
            // ..
            // Setup Camera Properties
            // ..
            const maincamera:boolean = component.maincamera != null ? component.maincamera : false;
            if (maincamera === true && scene.activeCamera == null) {
                scene.activeCamera = babyonCamera;
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
            const name = entity.name + "_rig";
            let babylonLight: BABYLON.Light;
            entity.checkCollisions = false;
            // ..
            // Setup Light Properties
            // ..
            let intensityFactor:number = 1.0;
            const lightType:number = component.type != null ? component.type : 0;
            switch (lightType) {
                case 0: { // DIRECTIONAL
                    const direction:Vector3 = (scene.useRightHandedSystem === true) ? BABYLON.Vector3.Backward() : BABYLON.Vector3.Forward();
                    const orthoscale:number = component.orthoscale != null ? component.orthoscale : 0.1;
                    const babylonDirLight = new BABYLON.DirectionalLight(name, direction, scene);
                    babylonDirLight.shadowOrthoScale = orthoscale;
                    babylonLight = babylonDirLight;
                    babylonLight.falloffType = BABYLON.Light.FALLOFF_STANDARD;
                    intensityFactor = 2.66;                    
                    break;
                }
                case 1: { // POINT
                    const babylonPointLight = babylonLight = new BABYLON.PointLight(name, BABYLON.Vector3.Zero(), scene);
                    babylonLight = babylonPointLight;
                    babylonLight.falloffType = BABYLON.Light.FALLOFF_STANDARD;
                    intensityFactor = 1.0;
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
                babylonLight.intensity = (component.intensity != null ? component.intensity : 1.0) * intensityFactor;
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
                const shadowdepthscale:number = component.shadowdepthscale != null ? component.shadowdepthscale : 50.0;
                const contacthardening:number = component.contacthardening != null ? component.contacthardening : 0.1;
                const usekernelblur:boolean = component.usekernelblur != null ? component.usekernelblur : true;
                const shadowblurkernel:number = component.shadowblurkernel != null ? component.shadowblurkernel : 1.0;
                const shadowblurscale:number = component.shadowblurscale != null ? component.shadowblurscale : 2.0;
                const shadowbluroffset:number = component.shadowbluroffset != null ? component.shadowbluroffset : 1.0;
                const shadowfilterquality:string = component.shadowfilterquality != null ? component.shadowfilterquality : "Medium";
                const transparencyshadow:boolean = component.transparencyshadow != null ? component.transparencyshadow : false;
                const forcebackfacesonly:boolean = component.forcebackfacesonly != null ? component.forcebackfacesonly : true;
                const frustumedgefalloff:number = component.frustumedgefalloff != null ? component.frustumedgefalloff : 0.0;
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
                    shadowgenerator.setDarkness(1.0 - BABYLON.Scalar.Clamp(shadowstrength * 0.9));
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
        /** Creates a safe physics impostor for the specified entity preserving parent child relations. */
        private static CreateEntityPhysicsImpostor(scene:BABYLON.Scene, entity: BABYLON.AbstractMesh, type: number, options: BABYLON.PhysicsImpostorParameters, reparent:boolean = true):void {
            if (entity == null) return;
            const parent:BABYLON.Node = entity.parent;
            if (reparent === true) entity.parent = null;
            entity.physicsImpostor = new BABYLON.PhysicsImpostor(entity, type, options, scene);
            if (reparent === true) entity.parent = parent;
        }
        private static SetupRigidbodyPhysicsFunction(scene:BABYLON.Scene, entity: BABYLON.AbstractMesh, child:boolean, trigger:boolean, physics:any, debugging:boolean):void {
            if (entity == null) return;
            if (entity.physicsImpostor != null) {
                entity.physicsImpostor.executeNativeFunction((word:any, body:any) => {
                    // console.log("===> Setup RidigBody Native Physics Body: " + entity.name);
                    // console.log(body);
                    // ..
                    // Disable Gravity
                    // ..
                    let gravity:boolean = (physics != null && physics.gravity != null) ? physics.gravity : true;
                    if (gravity === false) {
                        if (body.setGravity) {
                            body.setGravity(new Ammo.btVector3(0.0, 0.0, 0.0));
                        } else {
                            BABYLON.Tools.Warn("Physics engine set gravity override not supported for: " + entity.name);
                        }
                    }
                    // ..
                    // Setup Drag Damping
                    // ..
                    if (body.setDamping) {
                        const ldrag:number = (physics != null && physics.ldrag != null) ? physics.ldrag : 0.0;
                        const adrag:number = (physics != null && physics.adrag != null) ? physics.adrag : 0.05;
                        body.setDamping(ldrag, adrag);
                    } else {
                        BABYLON.Tools.Warn("Physics engine set drag damping not supported for: " + entity.name);
                    }
                    // ..
                    // Setup Collision Flags
                    // ..
                    if (body.setCollisionFlags && body.getCollisionFlags) {
                        if (trigger === true) body.setCollisionFlags(body.getCollisionFlags() | BABYLON.CollisionFlags.CF_NO_CONTACT_RESPONSE);
                    } else {
                        BABYLON.Tools.Warn("Physics engine set collision flags not supported for: " + entity.name);
                    }
                    // ..
                    // Setup Freeze Constraints
                    // ..
                    const freeze:any = (physics != null && physics.freeze != null) ? physics.freeze : null;
                    if (freeze != null) {
                        if (body.setLinearFactor) {
                            const freeze_pos_x:number = (freeze.positionx != null && freeze.positionx === true) ? 0 : 1;
                            const freeze_pos_y:number = (freeze.positiony != null && freeze.positiony === true) ? 0 : 1;
                            const freeze_pos_z:number = (freeze.positionz != null && freeze.positionz === true) ? 0 : 1;
                            body.setLinearFactor(new Ammo.btVector3(freeze_pos_x, freeze_pos_y, freeze_pos_z));
                        } else {
                            BABYLON.Tools.Warn("Physics engine set linear factor not supported for: " + entity.name);
                        }
                        if (body.setAngularFactor) {
                            const freeze_rot_x:number = (freeze.rotationx != null && freeze.rotationx === true) ? 0 : 1;
                            const freeze_rot_y:number = (freeze.rotationy != null && freeze.rotationy === true) ? 0 : 1;
                            const freeze_rot_z:number = (freeze.rotationz != null && freeze.rotationz === true) ? 0 : 1;
                            body.setAngularFactor(new Ammo.btVector3(freeze_rot_x, freeze_rot_y, freeze_rot_z));
                        } else {
                            BABYLON.Tools.Warn("Physics engine set angular factor not supported for: " + entity.name);
                        }
                    }
                });
                if (debugging === true) BABYLON.SceneManager.ShowEntityPhysicsImpostor(scene, entity);
            } else {
                BABYLON.Tools.Warn("No valid physics impostor to setup for " + entity.name);
            }
        }
    }
}