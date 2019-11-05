const CVTOOLS_NAME = "CVTOOLS_unity_metadata";
const CVTOOLS_MESH = "CVTOOLS_babylon_mesh";
const CVTOOLS_HAND = "CVTOOLS_left_handed";
/**
 * Babylon Toolkit Editor - Loader Class
 * @class CVTOOLS_unity_metadata - All rights reserved (c) 2019 Mackey Kinard
 * [Specification](https://github.com/MackeyK24/glTF/tree/master/extensions/2.0/Vendor/CVTOOLS_unity_metadata)
 */
class CVTOOLS_unity_metadata implements BABYLON.GLTF2.IGLTFLoaderExtension {
    /** The name of this extension. */
    public readonly name = CVTOOLS_NAME;

    /** Defines whether this extension is enabled. */
    public enabled = true;

    private _loader: BABYLON.GLTF2.GLTFLoader;
    private _parser: BABYLON.MetadataParser;
    private _parseScene = false;
    private _leftHanded = false;
    private _disposeRoot = false;
    private _sceneParsed = false;
    private _rootUrl:string = null;

    /** @hidden */
    constructor(loader: BABYLON.GLTF2.GLTFLoader) {
        this._loader = loader;
        this._parser = new BABYLON.MetadataParser(this._loader.babylonScene, this._loader);
        this._parseScene = this._leftHanded = this._disposeRoot = this._sceneParsed = false;
        this._rootUrl = null;
        (<any>this).order = 100;
    }

    /** @hidden */
    public dispose() {
        delete this._loader;
        this._parser = this._rootUrl = null;
        this._parseScene = this._leftHanded = this._disposeRoot = this._sceneParsed = false;
    }

    /** @hidden */
    public onLoading(): void {
        this._rootUrl = ((<any>this._loader)._uniqueRootUrl) ? (<any>this._loader)._uniqueRootUrl : "/";
        this._parseScene = (BABYLON.SceneManager.IsSceneLoaderEnabled() === true && this._loader.gltf != null && this._loader.gltf.extensionsUsed != null && this._loader.gltf.extensionsUsed.indexOf(CVTOOLS_NAME) >= 0);
        this._leftHanded = (this._loader.gltf != null && this._loader.gltf.extensionsUsed != null && this._loader.gltf.extensionsUsed.indexOf(CVTOOLS_HAND) >= 0);
        this._disposeRoot = this._sceneParsed = false;
        if (this._parseScene === true) {
            //console.warn("CVTOOLS: OnLoading");
        }
        if (this._leftHanded === true && this._loader.rootBabylonMesh != null) { // Note: Force Left Handed System
            this._loader.rootBabylonMesh.rotationQuaternion = BABYLON.Quaternion.Identity();
            this._loader.rootBabylonMesh.scaling = BABYLON.Vector3.One();
        }
    }    

    /** @hidden */
    public onReady(): void {
        if (this._parseScene === true) {
            //console.warn("CVTOOLS: OnReady");
            if (this._disposeRoot === true && this._loader.rootBabylonMesh != null) this._loader.rootBabylonMesh.dispose(true);
            this._parser.postProcessSceneComponents();
        }
    }    

    /** @hidden */
    public loadSceneAsync(context: string, scene: BABYLON.GLTF2.IScene): BABYLON.Nullable<Promise<void>> {
        if (this._parseScene === true && scene.extras != null && scene.extras.metadata != null) {
            //console.warn("CVTOOLS: LoadSceneAsync: " + scene.name);
            this._parseSceneProperties(context, scene);
            return this._loader.loadSceneAsync(context, scene);
        } else {
            return null; // Not Handled
        }
    }

    /** @hidden */
    public loadNodeAsync(context: string, node: BABYLON.GLTF2.INode, assign: (babylonMesh: BABYLON.TransformNode) => void): BABYLON.Nullable<Promise<BABYLON.TransformNode>> {
        if (this._parseScene === true && node.extras != null && node.extras.metadata != null) {
            //console.warn("CVTOOLS: LoadNodeAsync: " + node.name);
            return this._loader.loadNodeAsync(context, node, (source: BABYLON.TransformNode) => {
                //console.warn("CVTOOLS: ParseNodePropertiesAsync: " + node.name);
                const mesh:BABYLON.Mesh = source as BABYLON.Mesh;
                const metadata:any = node.extras.metadata;
                if (mesh.metadata == null) mesh.metadata = {};
                mesh.metadata.unity = metadata;
                BABYLON.Utilities.ValidateTransformGuid(mesh);
                BABYLON.Utilities.ValidateTransformMetadata(mesh);
                BABYLON.Utilities.ValidateTransformQuaternion(mesh);
                // ..
                // Note: Override Material Side Orientation
                // Force Counter Clock Wise Orientation For Left Hand Unwind And Native Right Hand System
                // ..
                if (this._leftHanded === true || this._loader.babylonScene.useRightHandedSystem === true) {
                    mesh.overrideMaterialSideOrientation = BABYLON.Material.CounterClockWiseSideOrientation;
                } else {
                    mesh.overrideMaterialSideOrientation = BABYLON.Material.ClockWiseSideOrientation;
                }
                if (mesh.name.indexOf("_dispose") >= 0) {
                    this._parser.addDisposeEntityItem(mesh);
                } else {
                    const prefab:boolean = (mesh.metadata.unity.prefab != null) ? mesh.metadata.unity.prefab : false;
                    mesh.isVisible = (mesh.metadata.unity.visible != null) ? mesh.metadata.unity.visible : true;
                    mesh.visibility = (mesh.metadata.unity.visibility != null) ? mesh.metadata.unity.visibility : 1;
                    mesh.billboardMode = (mesh.metadata.unity.billboard != null) ? mesh.metadata.unity.billboard : 0;
                    if (prefab === true) {
                        mesh.setEnabled(false);
                        mesh.metadata.clone = () => { return BABYLON.Utilities.CloneMetadata(mesh.metadata); };
                    } else {
                        this._parser.parseSceneComponents(mesh);
                    }
                }
                assign(mesh);
            });
        } else {
            return null; // Not Handled
        }
    }

    /** @hidden */
    public loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.IMaterial, babylonMaterial: BABYLON.Material): BABYLON.Nullable<Promise<void>> {
        if (this._parseScene === true) {
            //console.warn("CVTOOLS: LoadMaterialPropertiesAsync: " + material.name);
            if (babylonMaterial instanceof BABYLON.ShaderMaterial) return this._parseShaderMaterialPropertiesAsync(context, material, babylonMaterial);
            else if (babylonMaterial instanceof BABYLON.PBRMaterial) return this._parseAlbedoMaterialPropertiesAsync(context, material, babylonMaterial);
            else return this._parseDiffuseMaterialPropertiesAsync(context, material, babylonMaterial)
        } else {
            return null; // Not Handled
        }
    }

    /** @hidden */
    public createMaterial(context: string, material: BABYLON.GLTF2.IMaterial, babylonDrawMode: number): BABYLON.Nullable<BABYLON.Material> {
        if (this._parseScene === true && material.extras != null && material.extras.metadata != null && material.extras.metadata.customMaterial != null) {
            let babylonMaterial: BABYLON.Material = null;
            const materialName:string = material.name || "No Name";
            //console.warn("CVTOOLS: CreateCustomMaterial: " + materialName);
            const commonConstant: any = material.extras.metadata;
            const CustomClassName: string = commonConstant.customMaterial;
            const CustomMaterialClass: any = BABYLON.Utilities.InstantiateClass(CustomClassName);
            if (CustomMaterialClass != null) {
                const customMaterial = new CustomMaterialClass(materialName, this._loader.babylonScene);
                if (customMaterial != null) {
                    const ismaterial: boolean = (customMaterial instanceof BABYLON.Material);
                    if (ismaterial === true) {
                        babylonMaterial = customMaterial;
                        babylonMaterial.fillMode = babylonDrawMode;
                        if (babylonMaterial instanceof BABYLON.ShaderMaterial) {
                            BABYLON.Utilities.InitializeShaderMaterial(babylonMaterial);
                        }
                    } else {
                        BABYLON.Tools.Warn("Non material instantiated class: " + CustomClassName);
                    }
                } else {
                    BABYLON.Tools.Warn("Failed to instantiate material class: " + CustomClassName);
                }
            } else {
                BABYLON.Tools.Warn("Failed to locate material class: " + CustomClassName);
            }
            return babylonMaterial;
        } else {
            return null; // Not Handled
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Mesh Primitive Loader Functions (GLTF Loader Copies)
    //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    /** @hidden */
    public _loadMeshPrimitiveAsync(context: string, name: string, node: BABYLON.GLTF2.INode, mesh: BABYLON.GLTF2.IMesh, primitive: BABYLON.GLTF2.IMeshPrimitive, assign: (babylonMesh: BABYLON.AbstractMesh) => void): Promise<BABYLON.AbstractMesh> {
        if (this._parseScene === true) {
            //console.warn("CVTOOLS: LoadMeshPrimitiveAsync: " + name);
            const loader:any = this._loader;

            loader.logOpen(`${context}`);

            const canInstance = (node.skin == undefined && !mesh.primitives[0].targets);

            let babylonAbstractMesh: BABYLON.AbstractMesh;
            let promise: Promise<any>;

            const instanceData = (<any>primitive)._instanceData;
            if (canInstance && instanceData) {
                babylonAbstractMesh = instanceData.babylonSourceMesh.createInstance(name);
                promise = instanceData.promise;
            }
            else {
                const promises = new Array<Promise<any>>();
                const babylonMesh = new BABYLON.Mesh(name, loader._babylonScene);

                loader._createMorphTargets(context, node, mesh, primitive, babylonMesh);
                promises.push(loader._loadVertexDataAsync(context, primitive, babylonMesh).then((babylonGeometry) => {
                    return loader._loadMorphTargetsAsync(context, primitive, babylonMesh, babylonGeometry).then(() => {
                        babylonGeometry.applyToMesh(babylonMesh);
                        //////////////////////////////////////////////////////
                        // Mackey Primitives Modifications
                        //////////////////////////////////////////////////////
                        this._setupBabylonMesh(babylonMesh, node, mesh, primitive);
                        //////////////////////////////////////////////////////
                    });
                }));

                const babylonDrawMode = (<any>BABYLON.GLTF2.GLTFLoader)._GetDrawMode(context, primitive.mode);
                if (primitive.extras != null && primitive.extras.metadata != null && primitive.extras.metadata.multimaterial != null && primitive.extras.metadata.submeshes != null) {
                    //////////////////////////////////////////////////////
                    // Mackey Primitives Modifications
                    //////////////////////////////////////////////////////
                    this._setupBabylonMaterials(context, promises, babylonDrawMode, babylonMesh, mesh, primitive);
                    //////////////////////////////////////////////////////
                } else if (primitive.material == undefined) {
                    let babylonMaterial = loader._defaultBabylonMaterialData[babylonDrawMode];
                    if (!babylonMaterial) {
                        babylonMaterial = loader._createDefaultMaterial("__GLTFLoader._default", babylonDrawMode);
                        loader._parent.onMaterialLoadedObservable.notifyObservers(babylonMaterial);
                        loader._defaultBabylonMaterialData[babylonDrawMode] = babylonMaterial;
                    }
                    babylonMesh.material = babylonMaterial;
                } else {
                    const material:any = BABYLON.GLTF2.ArrayItem.Get(`${context}/material`, loader._gltf.materials, primitive.material);
                    promises.push(loader._loadMaterialAsync(`/materials/${material.index}`, material, babylonMesh, babylonDrawMode, (babylonMaterial) => {
                        babylonMesh.material = babylonMaterial;
                    }));
                }
    
                promise = Promise.all(promises);

                if (canInstance) {
                    (<any>primitive)._instanceData = {
                        babylonSourceMesh: babylonMesh,
                        promise: promise
                    };
                }

                babylonAbstractMesh = babylonMesh;
            }

            BABYLON.GLTF2.GLTFLoader.AddPointerMetadata(babylonAbstractMesh, context);
            loader._parent.onMeshLoadedObservable.notifyObservers(babylonAbstractMesh);
            assign(babylonAbstractMesh);

            loader.logClose();

            return promise.then(() => {
                return babylonAbstractMesh;
            });
        } else {
            return null; // Not Handled
        }
    }

    private _setupBabylonMesh(babylonMesh:BABYLON.Mesh, node: BABYLON.GLTF2.INode, mesh: BABYLON.GLTF2.IMesh, primitive: BABYLON.GLTF2.IMeshPrimitive): void {
        if (this._parseScene === true) {
            const loader:any = this._loader;
            // Setup Sub Meshes
            if (primitive.extras != null && primitive.extras.metadata != null && primitive.extras.metadata.multimaterial != null && primitive.extras.metadata.submeshes != null) {
                const submeshes:any = primitive.extras.metadata.submeshes;
                babylonMesh.subMeshes = [];
                for (let subIndex = 0; subIndex < submeshes.length; subIndex++) {
                    const parsedSubMesh = submeshes[subIndex];
                    BABYLON.SubMesh.AddToMesh(parsedSubMesh.materialIndex, parsedSubMesh.verticesStart, parsedSubMesh.verticesCount, parsedSubMesh.indexStart, parsedSubMesh.indexCount, <BABYLON.AbstractMesh>babylonMesh);
                }
            }
            // Setup Level Details
            if (node.extras != null && node.extras.metadata != null && node.extras.metadata.lods != null && node.extras.metadata.distances != null) {
                this._parser.addDetailLevelItem(babylonMesh);
            }
            // Update World Matrix
            babylonMesh.computeWorldMatrix(true);
        }
    }
    
    private _setupBabylonMaterials(context:string, promises:Array<Promise<any>>, drawmode:number, babylonMesh:BABYLON.Mesh, mesh: BABYLON.GLTF2.IMesh, primitive: BABYLON.GLTF2.IMeshPrimitive): void {
        if (this._parseScene === true) {
            const loader:any = this._loader;
            const multimaterial:any = primitive.extras.metadata.multimaterial;
            const materialids:string[] = multimaterial.materials;
            const materials:BABYLON.GLTF2.IMaterial[] = [];
            const matid = multimaterial.id || (mesh.name + "_multi");
            const matname = multimaterial.name || (mesh.name + "_multi");
            const multimat = new BABYLON.MultiMaterial(matname, loader._babylonScene);
            multimat.id = matid;
            // Get Multi Materials
            materialids.forEach((materialId) => {
                const material:any = BABYLON.GLTF2.ArrayItem.Get(`${context}/material`, loader._gltf.materials, parseInt(materialId));
                materials.push(material);
            });
            // Setup Multi Materials
            promises.push(this._parseMultiMaterialAsync(`/materials/${matname}`, materials, babylonMesh, drawmode, (babylonMaterials) => {
                multimat.subMaterials = babylonMaterials;
                babylonMesh.material = multimat;
            }));
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Private Property Parsing Worker Functions
    //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    private _parseSceneProperties(context: string, scene: BABYLON.GLTF2.IScene): void {
        if (this._sceneParsed === false && scene.extras != null && scene.extras.metadata != null && scene.extras.metadata.properties != null && scene.extras.metadata.properties === true) {
            this._sceneParsed = true;
            //console.warn("CVTOOLS: ParseSceneProperties: " + scene.name);
            const root:string = (this._rootUrl != null) ? this._rootUrl : "/";
            const metadata:any = scene.extras.metadata;
            const filename:string = (<any>this._loader)._fileName ? (<any>this._loader)._fileName : null;
            if (this._loader.rootBabylonMesh != null) this._loader.rootBabylonMesh.name = "Root." + filename.replace(".gltf", "").replace(".glb", "");
            this._disposeRoot = (metadata.disposeroot != null && metadata.disposeroot === true);
            BABYLON.SceneManager.SetRootUrl(this._loader.babylonScene, root);
            BABYLON.SceneManager.SetRightHanded(this._loader.babylonScene, !this._leftHanded);
            // ..
            // Setup Scene Default Coloring
            // ..
            if (metadata.autoclear != null && metadata.autoclear === true) {
                this._loader.babylonScene.autoClear = true;
                this._loader.babylonScene.autoClearDepthAndStencil = true;
            }
            if (metadata.clearcolor != null) {
                this._loader.babylonScene.clearColor = BABYLON.Utilities.ParseColor4(metadata.clearcolor);
            }
            this._loader.babylonScene.ambientColor = BABYLON.Color3.Black();
            // ..
            // Setup Scene Environment Textures
            // ..
            if (metadata.skybox != null)  {
                const skybox:any = metadata.skybox;
                const skyfog:boolean = (skybox.skyfog != null) ? skybox.skyfog : false; // NOTE: NOT IMPLEMENTED
                const skytags:string = (skybox.skytags != null) ? skybox.skytags : "Untagged";
                const skysize:number = (skybox.skysize != null) ? skybox.skysize : 1000;
                const skyroty:number = (skybox.rotation != null) ? skybox.rotation : 0;
                const skypath:string = (skybox.basename != null && skybox.basename !== "") ? (root + skybox.basename) : null;
                const extensions:string[] = (skybox.extensions != null && skybox.extensions.length > 0) ? skybox.extensions : null;
                const polynomial:number = (skybox.polynomial != null) ? skybox.polynomial : 1;
                try {
                    if (skypath != null && skypath !== "") {
                        const skyboxTexture:BABYLON.CubeTexture = new BABYLON.CubeTexture(skypath, this._loader.babylonScene, extensions);                
                        skyboxTexture.name = skybox.basename;
                        skyboxTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
                        const skyboxMesh:BABYLON.Mesh = BABYLON.Mesh.CreateBox("Ambient Skybox", skysize, this._loader.babylonScene);
                        skyboxMesh.infiniteDistance = true;
                        skyboxMesh.applyFog = skyfog;
                        skyboxTexture.rotationY = ((skyroty * BABYLON.System.Deg2Rad) / 2);
                        if (skytags != null && skytags !== "") {
                            BABYLON.Tags.AddTagsTo(skyboxMesh, skytags);
                        }
                        if (BABYLON.SceneManager.GetRightHanded(this._loader.babylonScene) === true) {
                            skyboxTexture.rotationY += Math.PI;
                        }
                        if (this._loader.babylonScene.useRightHandedSystem === true) { 
                            skyboxMesh.scaling.x *= -1;
                        }
                        const standardMaterial = new BABYLON.StandardMaterial("SkyboxMaterial", this._loader.babylonScene);
                        standardMaterial.backFaceCulling = false;
                        standardMaterial.disableLighting = true;
                        standardMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
                        standardMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                        standardMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);
                        standardMaterial.reflectionTexture =  skyboxTexture;
                        skyboxMesh.material = standardMaterial;
                    }
                } catch (e1) {
                    console.warn(e1);
                }
                // Setup Default Scene Environment
                if (skybox.environment != null)  {
                    const environment:any = skybox.environment;
                    if (environment != null) {
                        const envtype:string = (environment.type != null && environment.type !== "") ? environment.type : null;
                        const envpath:string = (environment.url != null && environment.url !== "") ? (root + environment.url) : null;
                        const envname:string = (environment.url != null && environment.url !== "") ? environment.url : "SkyboxEnvironment";
                        if (envtype != null && envtype !== "") {
                            try {
                                if (envtype === "image/dds") {
                                    var ddsTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(envpath, this._loader.babylonScene);
                                    ddsTexture.name = envname;
                                    ddsTexture.gammaSpace = false;
                                    this._loader.babylonScene.environmentTexture = ddsTexture;
                                } else if (envtype === "image/env") {
                                    var envTexture = new BABYLON.CubeTexture(envpath, this._loader.babylonScene);
                                    envTexture.name = envname;
                                    envTexture.gammaSpace = false;
                                    this._loader.babylonScene.environmentTexture = envTexture;
                                } else {
                                    BABYLON.Tools.Warn("Unsupported environment texture type: " + envtype);
                                }
                                // Support Spherical Polynomial Scaling
                                if (this._loader.babylonScene.environmentTexture != null && this._loader.babylonScene.environmentTexture.sphericalPolynomial != null) {
                                    const scene:BABYLON.Scene = this._loader.babylonScene;
                                    if (scene.isReady()) scene.environmentTexture.sphericalPolynomial.scaleInPlace(polynomial);
                                    else scene.onReadyObservable.addOnce(() => { scene.environmentTexture.sphericalPolynomial.scaleInPlace(polynomial); });
                                }    
                            } catch (e2) {
                                console.warn(e2);
                            }
                        }
                    }
                }
            }
            // ..
            // Setup Scene Ambient Lighting
            // ..
            if (metadata.ambientlighting != null) {
                const ambientlighting:boolean = metadata.ambientlighting;
                if (ambientlighting === true) {
                    if (metadata.ambientskycolor != null) {
                        const intensityFactor:number = 0.33;
                        const lightname:string = "Ambient Light";
                        this._loader.babylonScene.ambientColor = BABYLON.Utilities.ParseColor3(metadata.ambientskycolor);
                        let ambientlight:BABYLON.HemisphericLight = this._loader.babylonScene.getLightByName(lightname) as BABYLON.HemisphericLight;
                        if (ambientlight == null) {
                            ambientlight = new BABYLON.HemisphericLight(lightname, new BABYLON.Vector3(0, 1, 0), this._loader.babylonScene);
                        }
                        ambientlight.falloffType = BABYLON.Light.FALLOFF_STANDARD;
                        ambientlight.lightmapMode = BABYLON.Light.LIGHTMAP_DEFAULT;
                        ambientlight.intensityMode = BABYLON.Light.INTENSITYMODE_AUTOMATIC;
                        ambientlight.diffuse = BABYLON.Utilities.ParseColor3(metadata.ambientskycolor);
                        if (metadata.ambientlightintensity != null) { 
                            ambientlight.intensity = (metadata.ambientlightintensity * intensityFactor);
                        }
                        if (metadata.ambientspecularcolor != null) { 
                            ambientlight.specular = BABYLON.Utilities.ParseColor3(metadata.ambientspecularcolor);
                        }
                        if (metadata.ambientgroundcolor != null) { 
                            ambientlight.groundColor = BABYLON.Utilities.ParseColor3(metadata.ambientgroundcolor);
                        }
                    }
                }
            }
            // ..
            // Setup Scene Fogging Information
            // ..
            if (metadata.fogmode != null) {
                const fogmode:number = metadata.fogmode;
                if (fogmode > 0) {
                    this._loader.babylonScene.fogMode = fogmode;
                    this._loader.babylonScene.fogEnabled = true;
                    if (metadata.fogdensity != null) { 
                        this._loader.babylonScene.fogDensity = metadata.fogdensity;
                    }
                    if (metadata.fogstart != null) { 
                        this._loader.babylonScene.fogStart = metadata.fogstart;
                    }
                    if (metadata.fogend != null) { 
                        this._loader.babylonScene.fogEnd = metadata.fogend;
                    }
                    if (metadata.fogcolor != null) { 
                        this._loader.babylonScene.fogColor = BABYLON.Utilities.ParseColor3(metadata.fogcolor);
                    }
                }
            }
            // ..
            // Setup Scene Physics Engine Library
            // ..
            if (metadata.enablephysics != null) {
                const enablephysics:boolean = metadata.enablephysics;
                if (enablephysics === true) {
                    const gravitycheck:BABYLON.Vector3 = new BABYLON.Vector3(0, -9.81, 0);
                    const maxphysicsstep:number = metadata.maxphysicsstep != null ? metadata.maxphysicsstep : 0;
                    const maxworldsweep:number = metadata.maxworldsweep != null ? metadata.maxworldsweep : 1000;
                    const ccdenabled:boolean = metadata.ccdenabled != null ? metadata.ccdenabled : true;
                    const ccdpenetration:number = metadata.ccdpenetration != null ? metadata.ccdpenetration : 0;
                    const deltaworldstep:boolean = metadata.deltaworldstep != null ? metadata.deltaworldstep : true;
                    const defaultgravity:BABYLON.Vector3 = metadata.defaultgravity != null ? BABYLON.Utilities.ParseVector3(metadata.defaultgravity, gravitycheck) : gravitycheck;
                    BABYLON.SceneManager.ConfigurePhysicsEngine(this._loader.babylonScene, deltaworldstep, maxphysicsstep, maxworldsweep, ccdenabled, ccdpenetration, defaultgravity);
                }
            }
            // ..
            // Setup Scene Managed User Input Controller
            // ..
            let disableRight:boolean = false;
            let joystick:number = 0;
            if (metadata.userinput != null) {
                const userInput:any = metadata.userinput;
                joystick = userInput.joystickInputValue;
                disableRight = userInput.disableRightStick;
                // Setup Default User Input Properties
                const colorText:string = userInput.joystickRightColorText;
                if (colorText != null && colorText !== "") BABYLON.UserInputOptions.JoystickRightHandleColor = colorText;
                BABYLON.UserInputOptions.JoystickLeftSensibility = userInput.joystickLeftLevel;
                BABYLON.UserInputOptions.JoystickRightSensibility = userInput.joystickRightLevel;
                BABYLON.UserInputOptions.JoystickDeadStickValue = userInput.joystickDeadStick;
                BABYLON.UserInputOptions.GamepadDeadStickValue = userInput.padDeadStick;
                BABYLON.UserInputOptions.GamepadLStickXInverted = userInput.padLStickXInvert;
                BABYLON.UserInputOptions.GamepadLStickYInverted = userInput.padLStickYInvert;
                BABYLON.UserInputOptions.GamepadRStickXInverted = userInput.padRStickXInvert;
                BABYLON.UserInputOptions.GamepadRStickYInverted = userInput.padRStickYInvert;
                BABYLON.UserInputOptions.GamepadLStickSensibility = userInput.padLStickLevel;
                BABYLON.UserInputOptions.GamepadRStickSensibility = userInput.padRStickLevel;
                BABYLON.UserInputOptions.PointerAngularSensibility = userInput.mouseAngularLevel;
                BABYLON.UserInputOptions.PointerWheelDeadZone = userInput.wheelDeadZone;
            }
            if (metadata.enableinput != null) {
                const enableinput:boolean = metadata.enableinput;
                if (enableinput === true) {
                    const preventDefault:boolean = metadata.preventdefault != null ? metadata.preventdefault : false;
                    const useCapture:boolean = metadata.usecapture != null ? metadata.usecapture : false;
                    const inputOptions:any = { 
                        preventDefault: preventDefault,
                        useCapture: useCapture,
                        enableVirtualJoystick: (joystick === 1 || (joystick === 2 && BABYLON.SceneManager.IsMobile())),
                        disableRightStick: disableRight
                    };
                    BABYLON.SceneManager.EnableUserInput(this._loader.babylonScene, inputOptions);
                }
            }
            // ..
            // Setup Freeze Active Meshes Optimization
            // ..
            if (metadata.freezeactivemeshes != null && metadata.freezeactivemeshes === true)  {
                this._parser.setFreezeActiveMeshes(true);
            }
        }
    }

    private _parseMultiMaterialAsync(context: string, materials: BABYLON.GLTF2.IMaterial[], babylonMesh: BABYLON.Mesh, babylonDrawMode: number, assign: (babylonMaterials: BABYLON.Material[]) => void = () => { }): Promise<BABYLON.Material[]> {
        //console.warn("CVTOOLS: ParseMultiMaterialAsync: " + babylonMesh.name);
        const loader:any = this._loader;
        const xmaterials:any = materials;

        xmaterials._data = xmaterials._data || {};
        let babylonData = xmaterials._data[babylonDrawMode];
        if (!babylonData) {
            loader.logOpen(`${context} ${babylonMesh.name || ""}`);

            const babylonMaterials:BABYLON.Material[] = [];
            const promises = new Array<Promise<any>>();

            materials.forEach((material) => {
                const babylonMaterial = loader.createMaterial(context, material, babylonDrawMode);
                BABYLON.GLTF2.GLTFLoader.AddPointerMetadata(babylonMaterial, context);
                loader._parent.onMaterialLoadedObservable.notifyObservers(babylonMaterial);

                promises.push(loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
                babylonMaterials.push(babylonMaterial);
            });

            babylonData = {
                babylonMaterials: babylonMaterials,
                babylonMeshes: [],
                promises: promises
            };

            xmaterials._data[babylonDrawMode] = babylonData;

            loader.logClose();
        }

        babylonData.babylonMeshes.push(babylonMesh);

        babylonMesh.onDisposeObservable.addOnce(() => {
            const index = babylonData.babylonMeshes.indexOf(babylonMesh);
            if (index !== -1) {
                babylonData.babylonMeshes.splice(index, 1);
            }
        });

        assign(babylonData.babylonMaterials);

        return Promise.all(babylonData.promises).then(() => {
            return babylonData.babylonMaterials;
        });
    }

    private _parseShaderMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.IMaterial, sourceMaterial: BABYLON.Material): BABYLON.Nullable<Promise<void>> {
        //console.warn("CVTOOLS: ParseShaderMaterialPropertiesAsync: " + material.name);
        const commonConstant:any = (material.extras != null && material.extras.metadata != null) ? material.extras.metadata : null;
        const babylonMaterial:BABYLON.ShaderMaterial = sourceMaterial as BABYLON.ShaderMaterial;
        const promises = new Array<Promise<any>>();
        // ..
        // SHADER PROPERTIES
        // ..
        if (material.doubleSided) {
            babylonMaterial.backFaceCulling = false;
        }
        // ..
        // GENERAL PROPERTIES
        // ..
        let baseColorAlpha:number = 1;
        if (material.pbrMetallicRoughness) {
            const properties = material.pbrMetallicRoughness;
            if (properties) {
                if (properties.baseColorFactor) {
                    const linearBaseColor:BABYLON.Color4 = BABYLON.Color4.FromArray(properties.baseColorFactor);
                    babylonMaterial.setVector4("diffuseColor", new BABYLON.Vector4(Math.pow(linearBaseColor.r, 1 / 2.2), Math.pow(linearBaseColor.g, 1 / 2.2), Math.pow(linearBaseColor.b, 1 / 2.2), linearBaseColor.a));
                    baseColorAlpha = linearBaseColor.a;
                } else {
                    babylonMaterial.setVector4("diffuseColor", new BABYLON.Vector4(1, 1, 1, 1));
                }
                if (properties.baseColorTexture) {
                    promises.push(this._loader.loadTextureInfoAsync(`${context}/baseColorTexture`, properties.baseColorTexture, (texture) => {
                        texture.name = `${sourceMaterial.name} (Base Color)`;
                        const diffuseTexture:BABYLON.Texture = texture as BABYLON.Texture;
                        diffuseTexture.level = (commonConstant != null && commonConstant.diffuseIntensity != null) ? commonConstant.diffuseIntensity : 1;
                        babylonMaterial.setTexture("diffuseTexture", diffuseTexture);
                    }));
                }
            }
        }
        if (material.normalTexture) {
            promises.push(this._loader.loadTextureInfoAsync(`${context}/normalTexture`, material.normalTexture, (texture) => {
                texture.name = `${sourceMaterial.name} (Normal)`;
                const bumpTexture:BABYLON.Texture = texture as BABYLON.Texture;
                if (material.normalTexture.scale != undefined) bumpTexture.level = material.normalTexture.scale;
                babylonMaterial.setTexture("bumpTexture", bumpTexture);
            }));
        }
        if (material.occlusionTexture) {
            promises.push(this._loader.loadTextureInfoAsync(`${context}/occlusionTexture`, material.occlusionTexture, (texture) => {
                texture.name = `${sourceMaterial.name} (Occlusion)`;
                const ambientTexture:BABYLON.Texture = texture as BABYLON.Texture;
                if (material.occlusionTexture.strength != undefined) ambientTexture.level = material.occlusionTexture.strength;
                babylonMaterial.setTexture("ambientTexture", ambientTexture);
            }));
        }
        if (material.emissiveFactor) {
            const linearEmmisveColor:BABYLON.Color4 = BABYLON.Color4.FromArray(material.emissiveFactor);
            babylonMaterial.setVector4("emissiveColor", new BABYLON.Vector4(Math.pow(linearEmmisveColor.r, 1 / 2.2), Math.pow(linearEmmisveColor.g, 1 / 2.2), Math.pow(linearEmmisveColor.b, 1 / 2.2), linearEmmisveColor.a));
        }
        if (material.emissiveTexture) {
            promises.push(this._loader.loadTextureInfoAsync(`${context}/emissiveTexture`, material.emissiveTexture, (texture) => {
                texture.name = `${sourceMaterial.name} (Emissive)`;
                const emissiveTexture:BABYLON.Texture = texture as BABYLON.Texture;
                babylonMaterial.setTexture("emissiveTexture", emissiveTexture);
            }));
        }
        // ..
        // ALPHA PROPERTIES
        // ..
        babylonMaterial.alpha = baseColorAlpha;             // Note: Default Base Color Alpha
        const alphaMode = material.alphaMode || BABYLON.GLTF2.MaterialAlphaMode.OPAQUE;
        switch (alphaMode) {
            case BABYLON.GLTF2.MaterialAlphaMode.OPAQUE: {  // Note: Normal-Mode (OPAQUE)
                babylonMaterial.alpha = 1;                  // Note: Reset Alpha To Opaque
                break;
            }
            case BABYLON.GLTF2.MaterialAlphaMode.MASK: {    // Note: Transparency-Cutout (ALPHATEST)
                //babylonMaterial.alphaCutOff = (material.alphaCutoff == undefined ? 0.5 : material.alphaCutoff);
                //if (babylonMaterial.diffuseTexture) {
                //    babylonMaterial.diffuseTexture.hasAlpha = true;
                //}
                break;
            }
            case BABYLON.GLTF2.MaterialAlphaMode.BLEND: {   // Note: Transparency (ALPHABLEND)
                //if (babylonMaterial.diffuseTexture) {
                //    babylonMaterial.diffuseTexture.hasAlpha = true;
                //    //babylonMaterial.useAlphaFromDiffuseTexture = true;
                //}
                break;
            }
            default: {
                throw new Error(`${context}/AlphaMode: Invalid value (${material.alphaMode})`);
            }
        }
        if (commonConstant != null) {
            babylonMaterial.wireframe = (commonConstant.useWireframe != null) ? commonConstant.useWireframe : false;
            babylonMaterial.needDepthPrePass = (commonConstant.depthPrepass != null) ? commonConstant.depthPrepass : false;
            // ..
            // LIGHTMAP PROPERTIES
            // ..
            if (commonConstant.lightmapTexture) {
                promises.push(this._loader.loadTextureInfoAsync(context + "/lightmapTexture", commonConstant.lightmapTexture, (texture) => {
                    texture.name = `${sourceMaterial.name} (Light Map)`;
                    texture.level = (commonConstant.lightmapLevel) ? commonConstant.lightmapLevel : 1;
                    babylonMaterial.setTexture("lightmapTexture", texture as BABYLON.Texture);
                    //babylonMaterial.useLightmapAsShadowmap = false;
                }));
            }
            // ..
            // CUSTOM PROPERTIES
            // ..
            if (commonConstant.customTextures) {
                for(const tkey in commonConstant.customTextures) {
                    const tvalue = commonConstant.customTextures[tkey];
                    if (tvalue != null) {
                        promises.push(this._loader.loadTextureInfoAsync(context + "/" + tkey, tvalue, (texture) => {
                            texture.name = `${sourceMaterial.name} (Custom)`;
                            babylonMaterial.setTexture(tkey, texture as BABYLON.Texture);
                        }));
                    }
                } 
            }
            if (commonConstant.customVectors) {
                for(const vkey in commonConstant.customVectors) {
                    const vvalue = commonConstant.customVectors[vkey];
                    if (vvalue != null) {
                        babylonMaterial.setVector4(vkey, BABYLON.Vector4.FromArray(vvalue));
                    }
                } 
            }
            if (commonConstant.customColors) {
                for(const ckey in commonConstant.customColors) {
                    const cvalue = commonConstant.customColors[ckey];
                    if (cvalue != null) {
                        babylonMaterial.setVector4(ckey, BABYLON.Vector4.FromArray(cvalue));
                    }
                } 
            }
            if (commonConstant.customFloats) {
                for(const fkey in commonConstant.customFloats) {
                    const fvalue = commonConstant.customFloats[fkey];
                    if (fvalue != null) {
                        babylonMaterial.setFloat(fkey, fvalue);
                    }
                } 
            }
            // ..
            // FREEZE MATERIAL PROPERTIES
            // ..
            if (commonConstant.freezeMaterial != null && commonConstant.freezeMaterial === true) {
                this._parser.addFreezeShaderMaterial(babylonMaterial);
            }
        }
        return Promise.all(promises).then(() => { });
    }

    private _parseAlbedoMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.IMaterial, sourceMaterial: BABYLON.Material): BABYLON.Nullable<Promise<void>> {
        //console.warn("CVTOOLS: ParseAlbedoMaterialPropertiesAsync: " + material.name);
        const promises = new Array<Promise<any>>();
        promises.push(this._loader.loadMaterialPropertiesAsync(context, material, sourceMaterial));
        this._parseCommonConstantProperties(promises, context, material, sourceMaterial);
        return Promise.all(promises).then(() => { });
    }

    private _parseDiffuseMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.IMaterial, sourceMaterial: BABYLON.Material): BABYLON.Nullable<Promise<void>> {
        //console.warn("CVTOOLS: ParseDiffuseMaterialPropertiesAsync: " + material.name);
        const commonConstant:any = (material.extras != null && material.extras.metadata != null) ? material.extras.metadata : null;
        const babylonMaterial:any = sourceMaterial;
        const promises = new Array<Promise<any>>();
        // ..
        // STANDARD PROPERTIES
        // ..
        if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "ambientColor")) {
            babylonMaterial.ambientColor = (commonConstant != null && commonConstant.ambientColorFactor) ? BABYLON.Color3.FromArray(commonConstant.ambientColorFactor) : BABYLON.Color3.Black();
        }
        if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "specularColor")) {
            babylonMaterial.specularColor = BABYLON.Color3.Black();
        }
        if (material.doubleSided) {
            if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "backFaceCulling")) {
                babylonMaterial.backFaceCulling = false;
            }
            if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "twoSidedLighting")) {
                babylonMaterial.twoSidedLighting = true;
            }
        }
        // ..
        // GENERAL PROPERTIES
        // ..
        let baseColorAlpha:number = 1;
        if (material.pbrMetallicRoughness) {
            const properties = material.pbrMetallicRoughness;
            if (properties) {
                if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "diffuseColor")) {
                    if (properties.baseColorFactor) {
                        const linearBaseColor:BABYLON.Color4 = BABYLON.Color4.FromArray(properties.baseColorFactor);
                        babylonMaterial.diffuseColor = new BABYLON.Color3(Math.pow(linearBaseColor.r, 1 / 2.2), Math.pow(linearBaseColor.g, 1 / 2.2), Math.pow(linearBaseColor.b, 1 / 2.2));
                        baseColorAlpha = linearBaseColor.a;
                    } else {
                        babylonMaterial.diffuseColor = BABYLON.Color3.White();
                    }
                }
                if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "diffuseTexture")) {
                    if (properties.baseColorTexture) {
                        promises.push(this._loader.loadTextureInfoAsync(`${context}/baseColorTexture`, properties.baseColorTexture, (texture) => {
                            texture.name = `${sourceMaterial.name} (Base Color)`;
                            babylonMaterial.diffuseTexture = texture;
                            babylonMaterial.diffuseTexture.level = (commonConstant != null && commonConstant.diffuseIntensity != null) ? commonConstant.diffuseIntensity : 1;
                        }));
                    }
                }
            }
        }
        if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "bumpTexture")) {
            if (material.normalTexture) {
                promises.push(this._loader.loadTextureInfoAsync(`${context}/normalTexture`, material.normalTexture, (texture) => {
                    texture.name = `${sourceMaterial.name} (Normal)`;
                    babylonMaterial.bumpTexture = texture;                    
                    if (material.normalTexture.scale != undefined) babylonMaterial.bumpTexture.level = material.normalTexture.scale;
                }));
                if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "invertNormalMapX")) {
                    babylonMaterial.invertNormalMapX = !this._loader.babylonScene.useRightHandedSystem;
                }
                if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "invertNormalMapY")) {
                    babylonMaterial.invertNormalMapY = this._loader.babylonScene.useRightHandedSystem;
                }
            }
        }
        if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "ambientTexture")) {
            if (material.occlusionTexture) {
                promises.push(this._loader.loadTextureInfoAsync(`${context}/occlusionTexture`, material.occlusionTexture, (texture) => {
                    texture.name = `${sourceMaterial.name} (Occlusion)`;
                    babylonMaterial.ambientTexture = texture;
                    if (material.occlusionTexture.strength != undefined) babylonMaterial.ambientTexture.level = material.occlusionTexture.strength;
                }));
            }
        }
        if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "emissiveColor")) {
            const linearEmmisveColor:BABYLON.Color4 = material.emissiveFactor ? BABYLON.Color4.FromArray(material.emissiveFactor) : new BABYLON.Color4(0, 0, 0, 1);
            babylonMaterial.emissiveColor = new BABYLON.Color3(Math.pow(linearEmmisveColor.r, 1 / 2.2), Math.pow(linearEmmisveColor.g, 1 / 2.2), Math.pow(linearEmmisveColor.b, 1 / 2.2));
        }
        if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "emissiveTexture")) {
            if (material.emissiveTexture) {
                promises.push(this._loader.loadTextureInfoAsync(`${context}/emissiveTexture`, material.emissiveTexture, (texture) => {
                    texture.name = `${sourceMaterial.name} (Emissive)`;
                    babylonMaterial.emissiveTexture = texture;
                    if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "useEmissiveAsIllumination")) {
                        babylonMaterial.useEmissiveAsIllumination = (commonConstant != null && commonConstant.useEmissiveAsIllumination != null) ? commonConstant.useEmissiveAsIllumination : false;
                    }
                }));
            }
        }
        // ..
        // ALPHA PROPERTIES
        // ..
        if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "alpha")) {
            babylonMaterial.alpha = baseColorAlpha;             // Note: Default Base Color Alpha
        }
        const alphaMode = material.alphaMode || BABYLON.GLTF2.MaterialAlphaMode.OPAQUE;
        switch (alphaMode) {
            case BABYLON.GLTF2.MaterialAlphaMode.OPAQUE: {      // Note: Normal-Mode (OPAQUE)
                if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "alpha")) {
                    babylonMaterial.alpha = 1;                  // Note: Reset Alpha To Opaque
                }
                break;
            }
            case BABYLON.GLTF2.MaterialAlphaMode.MASK: {        // Note: Transparency-Cutout (ALPHATEST)
                babylonMaterial.alphaCutOff = (material.alphaCutoff == undefined ? 0.5 : material.alphaCutoff);
                if (babylonMaterial.diffuseTexture) {
                    if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "diffuseTexture")) {
                        babylonMaterial.diffuseTexture.hasAlpha = true;
                    }
                }
                break;
            }
            case BABYLON.GLTF2.MaterialAlphaMode.BLEND: {       // Note: Transparency (ALPHABLEND)
                if (babylonMaterial.diffuseTexture) {
                    if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "diffuseTexture")) {
                        babylonMaterial.diffuseTexture.hasAlpha = true;
                    }
                    if (BABYLON.Utilities.HasOwnProperty(babylonMaterial, "useAlphaFromDiffuseTexture")) {
                        babylonMaterial.useAlphaFromDiffuseTexture = true;
                    }
                }
                break;
            }
            default: {
                throw new Error(`${context}/AlphaMode: Invalid value (${material.alphaMode})`);
            }
        }
        this._parseCommonConstantProperties(promises, context, material, sourceMaterial);
        return Promise.all(promises).then(() => { });
    }

    private _parseCommonConstantProperties(promises:Array<Promise<any>>, context: string, material: BABYLON.GLTF2.IMaterial, sourceMaterial: BABYLON.Material): void {
        const commonConstant:any = (material.extras != null && material.extras.metadata != null) ? material.extras.metadata : null;
        if (commonConstant != null) {
            //console.warn("CVTOOLS: ParseCommonConstantMaterialProperties: " + material.name);
            const commonMaterial:any = sourceMaterial;
            // ..
            // PBR PROPERTIES (TODO: Support Seconday Albedo And Normal Maps)
            // ..
            if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "directIntensity")) {
                commonMaterial.directIntensity = (commonConstant.directIntensity != null) ? commonConstant.directIntensity : 1;
            }
            if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "specularIntensity")) {
                commonMaterial.specularIntensity = (commonConstant.specularIntensity != null) ? commonConstant.specularIntensity : 1;
            }
            if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "emissiveIntensity")) {
                commonMaterial.emissiveIntensity = (commonConstant.emissiveIntensity != null) ? commonConstant.emissiveIntensity : 1;
            }
            if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "environmentIntensity")) {
                commonMaterial.environmentIntensity = (commonConstant.environmentIntensity != null) ? commonConstant.environmentIntensity : 1;
            }
            // ..
            // LIGHT PROPERTIES
            // ..
            if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "unlit")) {
                commonMaterial.unlit = (commonConstant.unlitMaterial != null) ? commonConstant.unlitMaterial : false;
            }
            if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "wireframe")) {
                commonMaterial.wireframe = (commonConstant.useWireframe != null) ? commonConstant.useWireframe : false;
            }
            if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "disableLighting")) {
                commonMaterial.disableLighting = (commonConstant.disableLighting != null) ? commonConstant.disableLighting : false;
            }
            if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "maxSimultaneousLights")) {
                commonMaterial.maxSimultaneousLights = (commonConstant.maxSimultaneousLights != null) ? commonConstant.maxSimultaneousLights : 4;
            }
            if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "needDepthPrePass")) {
                commonMaterial.needDepthPrePass = (commonConstant.depthPrepass != null) ? commonConstant.depthPrepass : false;
            }
            // ..
            // LIGHTMAP PROPERTIES
            // ..
            if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "lightmapTexture")) {
                if (commonConstant.lightmapTexture) {
                    let useLightmapAsShadowmap:boolean = false;            
                    if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "useLightmapAsShadowmap")) {
                        useLightmapAsShadowmap = (commonConstant.useLightmapAsShadowmap != null) ? commonConstant.useLightmapAsShadowmap : false;
                    }
                    promises.push(this._loader.loadTextureInfoAsync(context + "/lightmapTexture", commonConstant.lightmapTexture, (texture) => {
                        texture.name = `${sourceMaterial.name} (Light Map)`;
                        texture.level = (commonConstant.lightmapLevel) ? commonConstant.lightmapLevel : 1;
                        commonMaterial.lightmapTexture = texture;
                        commonMaterial.useLightmapAsShadowmap = useLightmapAsShadowmap;
                    }));
                }
            }
            // ..
            // TERRAIN PROPERTIES
            // ..
            if (BABYLON.Utilities.HasOwnProperty(commonMaterial, "terrainInfo")) {
                commonMaterial.terrainInfo = (commonConstant.terrainInfo != null) ? commonConstant.terrainInfo : null;
            }
            // ..
            // CUSTOM PROPERTIES
            // ..
            if (BABYLON.Utilities.HasOwnProperty(sourceMaterial, "universalMaterial")) {
                // Parse Universal Material Custom Properties
                const universalMaterial:any = sourceMaterial;
                //console.warn("CVTOOLS: UniversalMaterialProperties: " + universalMaterial.name);
                if (commonConstant.customTextures) {
                    for(const tkey in commonConstant.customTextures) {
                        const tvalue = commonConstant.customTextures[tkey];
                        if (tvalue != null) {
                            universalMaterial.checkSampler(tkey); // Note: Preset Texture Sampler Uniforms
                            promises.push(this._loader.loadTextureInfoAsync(context + "/" + tkey, tvalue, (texture) => {
                                texture.name = `${sourceMaterial.name} (Custom)`;
                                universalMaterial.setTexture(tkey, texture as BABYLON.Texture, true);
                            }));
                        }
                    } 
                }
                if (commonConstant.customVectors) {
                    for(const vkey in commonConstant.customVectors) {
                        const vvalue = commonConstant.customVectors[vkey];
                        if (vvalue != null) {
                            universalMaterial.setVector4(vkey, BABYLON.Vector4.FromArray(vvalue), true);
                        }
                    } 
                }
                if (commonConstant.customColors) {
                    for(const ckey in commonConstant.customColors) {
                        const cvalue = commonConstant.customColors[ckey];
                        if (cvalue != null) {
                            universalMaterial.setVector4(ckey, BABYLON.Vector4.FromArray(cvalue), true);
                        }
                    } 
                }
                if (commonConstant.customFloats) {
                    for(const fkey in commonConstant.customFloats) {
                        const fvalue = commonConstant.customFloats[fkey];
                        if (fvalue != null) {
                            universalMaterial.setFloat(fkey, fvalue, true);
                        }
                    } 
                }
            } else {
                // Parse Strong Typed Custom Material Properties
                if (commonConstant.customTextures) {
                    for(const tkey in commonConstant.customTextures) {
                        const tvalue = commonConstant.customTextures[tkey];
                        if (tvalue != null && BABYLON.Utilities.HasOwnProperty(commonMaterial, tkey)) {
                            promises.push(this._loader.loadTextureInfoAsync(context + "/" + tkey, tvalue, (texture) => {
                                texture.name = `${sourceMaterial.name} (Custom)`;
                                commonMaterial[tkey] = texture;
                            }));
                        }
                    } 
                }
                if (commonConstant.customVectors) {
                    for(const vkey in commonConstant.customVectors) {
                        const vvalue = commonConstant.customVectors[vkey];
                        if (vvalue != null && BABYLON.Utilities.HasOwnProperty(commonMaterial, vkey)) {
                            commonMaterial[vkey] = BABYLON.Vector4.FromArray(vvalue);
                        }
                    } 
                }
                if (commonConstant.customColors) {
                    for(const ckey in commonConstant.customColors) {
                        const cvalue = commonConstant.customColors[ckey];
                        if (cvalue != null && BABYLON.Utilities.HasOwnProperty(commonMaterial, ckey)) {
                            // TODO: Must be detectable instance property
                            if (commonMaterial[ckey] instanceof BABYLON.Vector4) {
                                commonMaterial[ckey] = BABYLON.Vector4.FromArray(cvalue);
                            } else if (commonMaterial[ckey] instanceof BABYLON.Color4) {
                                commonMaterial[ckey] = BABYLON.Color4.FromArray(cvalue);
                            } else {
                                commonMaterial[ckey] = BABYLON.Color3.FromArray(cvalue);
                            }
                        }
                    } 
                }
                if (commonConstant.customFloats) {
                    for(const fkey in commonConstant.customFloats) {
                        const fvalue = commonConstant.customFloats[fkey];
                        if (fvalue != null && BABYLON.Utilities.HasOwnProperty(commonMaterial, fkey)) {
                            // TODO: Must be detectable instance property
                            if (commonMaterial[fkey] instanceof Boolean) {
                                commonMaterial[fkey] = (fvalue > 0);
                            } else {
                                commonMaterial[fkey] = fvalue;
                            }
                        }
                    } 
                }
            }
            // ..
            // FREEZE MATERIAL PROPERTIES
            // ..
            if (commonConstant.freezeMaterial != null && commonConstant.freezeMaterial === true) {
                this._parser.addFreezeShaderMaterial(sourceMaterial);
            }
        }
    }
}

/**
 * Babylon Toolkit Editor - Loader Class
 * @class CVTOOLS_babylon_mesh - All rights reserved (c) 2019 Mackey Kinard
 * [Specification](https://github.com/MackeyK24/glTF/tree/master/extensions/2.0/Vendor/CVTOOLS_unity_metadata)
 */
class CVTOOLS_babylon_mesh implements BABYLON.GLTF2.IGLTFLoaderExtension {
    /** The name of this extension. */
    public readonly name = CVTOOLS_MESH;

    /** Defines whether this extension is enabled. */
    public enabled = true;

    private _loader: BABYLON.GLTF2.GLTFLoader;

    /** @hidden */
    constructor(loader: BABYLON.GLTF2.GLTFLoader) {
        this._loader = loader;
        (<any>this).order = 101;
    }

    /** @hidden */
    public dispose() {
        delete this._loader;
    }
}

/**
 * Babylon Toolkit Editor - Loader Class
 * @class CVTOOLS_left_handed - All rights reserved (c) 2019 Mackey Kinard
 * [Specification](https://github.com/MackeyK24/glTF/tree/master/extensions/2.0/Vendor/CVTOOLS_unity_metadata)
 */
class CVTOOLS_left_handed implements BABYLON.GLTF2.IGLTFLoaderExtension {
    /** The name of this extension. */
    public readonly name = CVTOOLS_HAND;

    /** Defines whether this extension is enabled. */
    public enabled = true;

    private _loader: BABYLON.GLTF2.GLTFLoader;

    /** @hidden */
    constructor(loader: BABYLON.GLTF2.GLTFLoader) {
        this._loader = loader;
        (<any>this).order = 102;
    }

    /** @hidden */
    public dispose() {
        delete this._loader;
    }
}

/**
 * Babylon Toolkit Editor - Register Extensions
 */
BABYLON.GLTF2.GLTFLoader.RegisterExtension(CVTOOLS_NAME, (loader) => new CVTOOLS_unity_metadata(loader));
BABYLON.GLTF2.GLTFLoader.RegisterExtension(CVTOOLS_MESH, (loader) => new CVTOOLS_babylon_mesh(loader));
BABYLON.GLTF2.GLTFLoader.RegisterExtension(CVTOOLS_HAND, (loader) => new CVTOOLS_left_handed(loader));
BABYLON.SceneLoader.OnPluginActivatedObservable.add(function (loader) {
    if (loader.name === "gltf") {
        if (BABYLON.SceneManager.AnimationStartMode != null) {
            (<any>loader).animationStartMode = BABYLON.SceneManager.AnimationStartMode;
        }
        if (BABYLON.SceneManager.ForceRightHanded != null && BABYLON.SceneManager.ForceRightHanded === true) {
            (<any>loader).coordinateSystemMode = BABYLON.GLTFLoaderCoordinateSystemMode.FORCE_RIGHT_HANDED;
        }
        (<any>loader).dispose();
    }
});