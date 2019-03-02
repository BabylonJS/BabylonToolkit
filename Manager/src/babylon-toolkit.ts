const CVTOOLS_NAME = "CVTOOLS_unity_metadata";
const CVTOOLS_HAND = "CVTOOLS_left_handedness";

/**
 * Babylon Editor Toolkit - Light Scaling
 */
const DIR_LIGHT_SCALE = 1.0;
const SPOT_LIGHT_SCALE = 1.0;
const POINT_LIGHT_SCALE = 1.0;
const AMBIENT_LIGHT_SCALE = 1.0;

/**
 * Babylon Editor Toolkit - Loader Class
 * @class CVTOOLS_unity_metadata
 * [Specification](https://github.com/MackeyK24/glTF/tree/master/extensions/2.0/Vendor/CVTOOLS_unity_metadata)
 */
class CVTOOLS_unity_metadata implements BABYLON.GLTF2.IGLTFLoaderExtension {
    /** The name of this extension. */
    public readonly name = CVTOOLS_NAME;

    /** Defines whether this extension is enabled. */
    public enabled = true;

    private _loader: BABYLON.GLTF2.GLTFLoader;

    private _physicsList:Array<any>;

    private _shadowList:Array<BABYLON.AbstractMesh>;

    private _scriptList:Array<any>;

    private _disposeRoot = false;

    private _leftHanded = false;

    private _sceneLoaded = false;

    /** @hidden */
    constructor(loader: BABYLON.GLTF2.GLTFLoader) {
        this._loader = loader;
    }

    /** @hidden */
    public dispose() {
        delete this._loader;
        this._physicsList = null;
        this._shadowList = null;
        this._scriptList = null;
        this._disposeRoot = false;    
        this._leftHanded = false;    
        this._sceneLoaded = false;
    }

    /** @hidden */
    public onLoading(): void {
        // console.warn("CVTOOLS: OnLoading");
        this._physicsList = [];
        this._shadowList = [];
        this._scriptList = [];
        this._disposeRoot = false;
        this._sceneLoaded = false;
        this._leftHanded = (this._loader.gltf != null && this._loader.gltf.extensionsUsed != null && this._loader.gltf.extensionsUsed.indexOf("CVTOOLS_left_handedness") >= 0);
        if (this._leftHanded === true && this._loader.rootBabylonMesh != null) { // Note: Force Left Handed System
            this._loader.rootBabylonMesh.rotationQuaternion = BABYLON.Quaternion.Identity();
            this._loader.rootBabylonMesh.scaling = BABYLON.Vector3.One();
        }
    }    

    /** @hidden */
    public onReady(): void {
        // console.warn("CVTOOLS: OnReady");
        if (this._disposeRoot === true && this._loader.rootBabylonMesh != null) this._loader.rootBabylonMesh.dispose(true);
        BABYLON.SceneManager.ProcessPendingPhysics(this._loader.babylonScene, this._physicsList);
        BABYLON.SceneManager.ProcessPendingShadows(this._loader.babylonScene, this._shadowList);
        BABYLON.SceneManager.ProcessPendingScripts(this._loader.babylonScene, this._scriptList);
        this._physicsList = null;
        this._shadowList = null;
        this._scriptList = null;
    }    

    /** @hidden */
    public loadSceneAsync(context: string, scene: BABYLON.GLTF2.Loader.IScene): BABYLON.Nullable<Promise<void>> {
        // console.warn("CVTOOLS: ===> ParseSceneAsync: " + scene.name);
        if (scene.extras != null && scene.extras.metadata != null) {
            const metadata:any = scene.extras.metadata;
            let scriptid:string = null;
            let projectjs:string = null;
            let hasscript:boolean = false;
            if (document != null && metadata.script != null && metadata.script !== "" && metadata.project != null && metadata.project !== "")  {
                scriptid = metadata.script;
                projectjs = metadata.project;
                hasscript = (document.getElementById(scriptid) != null);
            }
            let loadscript:boolean = (scriptid != null && projectjs != null && hasscript === false);
            if (this._sceneLoaded === false && loadscript === true) {
                const loadProjectScript = (id:string, script:string) => {
                    return new Promise<any>((resolve, reject) => {
                        BABYLON.Tools.Log("Loading script file " + script.toLowerCase());
                        const header = document.head || document.getElementsByTagName("head")[0];        
                        const loader:any = (<any>this._loader);
                        const rooturl:string = loader._uniqueRootUrl ? loader._uniqueRootUrl : "";
                        const filesrc = rooturl + script;
                        const fileref = document.createElement("script");
                        fileref.id = id;
                        fileref.setAttribute("type", "text/javascript");
                        fileref.setAttribute("src", filesrc);
                        fileref.onload = () => { resolve(id); };
                        fileref.onerror = (err) => { reject(err); BABYLON.Tools.Warn("Failed to load script file " + script.toLowerCase()); };
                        header.appendChild(fileref)
                    })
                };
                return loadProjectScript(scriptid, projectjs).then(() => {
                    this._loadScenePropertiesAsync(context, scene);
                    return this._loader.loadSceneAsync(context, scene);        
                }).catch(() => { 
                    this._loadScenePropertiesAsync(context, scene);
                    return this._loader.loadSceneAsync(context, scene);        
                });
            } else {
                this._loadScenePropertiesAsync(context, scene);
                return this._loader.loadSceneAsync(context, scene);        
            }
        } else {
            return this._loader.loadSceneAsync(context, scene);        
        }
    }

    /** @hidden */
    private _loadScenePropertiesAsync(context: string, scene: BABYLON.GLTF2.Loader.IScene): void {
        if (this._sceneLoaded === false && scene.extras != null && scene.extras.metadata != null && scene.extras.metadata.properties != null && scene.extras.metadata.properties === true) {
            // console.warn("CVTOOLS: ===> LoadSceneProperties: " + scene.name);
            const metadata:any = scene.extras.metadata;
            const filename:string = (<any>this._loader)._fileName ? (<any>this._loader)._fileName : null;
            if (this._loader.rootBabylonMesh != null) this._loader.rootBabylonMesh.name = "Root." + filename.replace(".gltf", "").replace(".glb", "");
            this._disposeRoot = (metadata.disposeroot != null && metadata.disposeroot === true);
            // ..
            // Setup Scene Clear Coloring
            // ..
            this._loader.babylonScene.autoClear = true;
            this._loader.babylonScene.ambientColor = BABYLON.Color3.Black();
            if (metadata.clearcolor != null) {
                this._loader.babylonScene.clearColor = BABYLON.Utilities.ParseColor4(metadata.clearcolor);
            }
            // ..
            // Setup Scene Environment Textures
            // ..
            if (metadata.skybox != null)  {
                const skybox:any = metadata.skybox;
                const skyurl:string = ((<any>this._loader)._uniqueRootUrl) ? (<any>this._loader)._uniqueRootUrl : "";
                const skyfog:boolean = (skybox.skyfog != null) ? skybox.skyfog : false;
                const skypath:string = (skybox.basename != null && skybox.basename !== "") ? (skyurl + skybox.basename) : null;
                const extensions:string[] = (skybox.extensions != null && skybox.extensions.length > 0) ? skybox.extensions : null;
                const polynomial:number = (skybox.polynomial != null) ? skybox.polynomial : 1.0;
                try {
                    if (skypath != null && skypath !== "") {
                        BABYLON.SceneManager.CreateSkyboxMesh(this._loader.babylonScene, skyurl, skypath, 1000, extensions, skyfog);
                    }
                } catch (e1) {
                    console.warn(e1);
                }
                // Setup Default Scene Environment
                if (skybox.environment != null)  {
                    const environment:any = skybox.environment;
                    if (environment != null) {
                        const envname:string = (environment.name != null && environment.name !== "") ? environment.name : "SkyboxEnvironment";
                        const envtype:string = (environment.type != null && environment.type !== "") ? environment.type : null;
                        const envpath:string = (environment.url != null && environment.url !== "") ? (skyurl + environment.url) : null;
                        if (envtype != null && envtype !== "") {
                            try {
                                if (envtype === "image/dds") {
                                    var ddsTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(envpath, this._loader.babylonScene);
                                    ddsTexture.name = envname;
                                    ddsTexture.gammaSpace = false;
                                    if (this._loader.babylonScene.useRightHandedSystem === true) { 
                                        ddsTexture.invertZ = true;
                                        //ddsTexture.rotationY = Math.PI;
                                    }
                                    this._loader.babylonScene.environmentTexture = ddsTexture;
                                } else if (envtype === "image/env") {
                                    var envTexture = new BABYLON.CubeTexture(envpath, this._loader.babylonScene);
                                    envTexture.name = envname;
                                    envTexture.gammaSpace = false;
                                    if (this._loader.babylonScene.useRightHandedSystem === true) { 
                                        envTexture.invertZ = true;
                                        //envTexture.rotationY = Math.PI;
                                    }
                                    this._loader.babylonScene.environmentTexture = envTexture;
                                } else {
                                    BABYLON.Tools.Warn("Unsupported environment texture type: " + envtype);
                                }
                                // Support Spherical Polynomial Scaling
                                if (this._loader.babylonScene.environmentTexture != null && polynomial !== 1.0) {
                                    const scene:BABYLON.Scene = this._loader.babylonScene;
                                    if (scene.isReady()) scene.environmentTexture.sphericalPolynomial.scale(polynomial);
                                    else scene.onReadyObservable.addOnce(() => { scene.environmentTexture.sphericalPolynomial.scale(polynomial); });
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
                        const lightname:string = "Ambient Light";
                        this._loader.babylonScene.ambientColor = BABYLON.Utilities.ParseColor3(metadata.ambientskycolor);
                        let ambientlight:BABYLON.HemisphericLight = this._loader.babylonScene.getLightByName(lightname) as BABYLON.HemisphericLight;
                        if (ambientlight == null) {
                            ambientlight = new BABYLON.HemisphericLight(lightname, new BABYLON.Vector3(0, 1, 0), this._loader.babylonScene);
                        }
                        ambientlight.diffuse = BABYLON.Utilities.ParseColor3(metadata.ambientskycolor);

                        if (metadata.ambientlightintensity != null) { 
                            ambientlight.intensity = (metadata.ambientlightintensity * AMBIENT_LIGHT_SCALE);
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
                    const defaultvalue:BABYLON.Vector3 = new BABYLON.Vector3(0, -9.81, 0);
                    const deltaworldstep:boolean = metadata.deltaworldstep != null ? metadata.deltaworldstep : true;
                    const defaultgravity:BABYLON.Vector3 = metadata.defaultgravity != null ? BABYLON.Utilities.ParseVector3(metadata.defaultgravity, defaultvalue) : defaultvalue;
                    if (BABYLON.AmmoJSPlugin) {
                        const physicsenabled:boolean = this._loader.babylonScene.isPhysicsEnabled();
                        const physicsengine:BABYLON.IPhysicsEngine = (physicsenabled === true) ? this._loader.babylonScene.getPhysicsEngine() : null;
                        const physicsloaded:boolean = (physicsenabled === true && physicsengine != null && physicsengine.getPhysicsPluginName() === "AmmoJSPlugin");
                        if (physicsloaded === false) {
                            const physicsplugin:BABYLON.AmmoJSPlugin = new BABYLON.AmmoJSPlugin(deltaworldstep);
                            if (BABYLON.SceneManager.OnSetupPhysicsPlugin != null) {
                                BABYLON.SceneManager.OnSetupPhysicsPlugin(this._loader.babylonScene, physicsplugin);
                            }
                            this._loader.babylonScene.enablePhysics(defaultgravity, physicsplugin);
                            BABYLON.Tools.Log("Enabled ammo.js physics engine plugin");
                        } else {
                            BABYLON.Tools.Log("Attached ammo.js physics engine plugin");
                        }
                    } else {
                        BABYLON.Tools.Warn("Ammo.js physics engine plugin not loaded");
                    }
                }
            }
            // ..
            // Setup Scene Managed User Input Controller
            // ..
            if (metadata.enableinput != null) {
                const enableinput:boolean = metadata.enableinput;
                if (enableinput === true) {
                    const preventDefault:boolean = metadata.preventdefault != null ? metadata.preventdefault : false;
                    const useCapture:boolean = metadata.usecapture != null ? metadata.usecapture : false;
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
                    const inputOptions:any = { 
                        preventDefault: preventDefault,
                        useCapture: useCapture,
                        enableVirtualJoystick: (joystick === 1 || (joystick === 2 && BABYLON.SceneManager.IsMobile())),
                        disableRightStick: disableRight
                    };
                    BABYLON.SceneManager.EnableUserInput(this._loader.babylonScene, inputOptions);
                }
            }
        }
        this._sceneLoaded = true;
    }

    /** @hidden */
    public loadNodeAsync(context: string, node: BABYLON.GLTF2.Loader.INode, assign: (babylonMesh: BABYLON.TransformNode) => void): BABYLON.Nullable<Promise<BABYLON.TransformNode>> {
        return this._loader.loadNodeAsync(context, node, (source: BABYLON.TransformNode) => {
            // console.warn("CVTOOLS: LoadNodeAsync: " + node.name);
            const mesh:BABYLON.Mesh = source as BABYLON.Mesh;
            // ..
            // Setup Scene Component Mesh Node
            // ..
            if (node.extras != null && node.extras.metadata != null) {
                const metadata:any = node.extras.metadata;
                if (mesh.metadata == null) mesh.metadata = {};
                mesh.metadata.unity = metadata;
                const prefab:boolean = (mesh.metadata.unity.prefab != null) ? mesh.metadata.unity.prefab : false;
                mesh.isVisible = (mesh.metadata.unity.visible != null) ? mesh.metadata.unity.visible : true;
                mesh.visibility = (mesh.metadata.unity.visibility != null) ? mesh.metadata.unity.visibility : 1.0;
                if (prefab === true) {
                    mesh.setEnabled(false);
                    mesh.metadata.clone = () => { return BABYLON.Utilities.CloneMetadata(mesh.metadata); };
                } else {
                    BABYLON.SceneManager.ParseSceneComponents(this._loader.babylonScene, mesh, this._shadowList, this._scriptList, this._physicsList);
                }
            }
            assign(mesh);
        });
    }

    /** @hidden */
    public createMaterial(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonDrawMode: number): BABYLON.Nullable<BABYLON.Material> {
        // console.warn("CVTOOLS: CreateMaterial: " + material.name);
        let babylonMaterial:BABYLON.Material = null;
        const commonConstant:any = (material.extras != null && material.extras.metadata != null) ? material.extras.metadata : null;
        if (commonConstant != null && commonConstant.customMaterial != null) {
            const CustomClassName:string = (commonConstant.customMaterial === "LegacyMaterial") ? "BABYLON.StandardMaterial" : commonConstant.customMaterial;
            const CustomMaterialClass:any = BABYLON.Utilities.InstantiateClass(CustomClassName);
            if (CustomMaterialClass != null) {
                const customMaterial = new CustomMaterialClass(material.name || "Material" + material.index, this._loader.babylonScene);
                if (customMaterial != null) {
                    const ismaterial:boolean = (customMaterial instanceof BABYLON.Material);
                    if (ismaterial === true) {
                        babylonMaterial = customMaterial;
                        babylonMaterial.sideOrientation = this._loader.babylonScene.useRightHandedSystem ? BABYLON.Material.CounterClockWiseSideOrientation : BABYLON.Material.ClockWiseSideOrientation;
                        babylonMaterial.fillMode = babylonDrawMode;
                    } else {
                        BABYLON.Tools.Warn("Non material instantiated class: " + CustomClassName);
                    }
                } else {
                    BABYLON.Tools.Warn("Failed to instantiate material class: " + CustomClassName);
                }
            } else {
                BABYLON.Tools.Warn("Failed to locate material class: " + CustomClassName);
            }
        }
        return babylonMaterial;       
    }

    /** @hidden */
    public loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: BABYLON.Material): BABYLON.Nullable<Promise<void>> {
        // console.warn("CVTOOLS: LoadMaterialPropertiesAsync: " + material.name);
        if (this._leftHanded === true) { // Note: Force Left Handed System
            babylonMaterial.sideOrientation = BABYLON.Material.CounterClockWiseSideOrientation;
        }
        if (babylonMaterial instanceof BABYLON.StandardMaterial) return this._loadStandardMaterialPropertiesAsync(context, material, babylonMaterial);
        else if (babylonMaterial instanceof BABYLON.ShaderMaterial) return this._loadShaderMaterialPropertiesAsync(context, material, babylonMaterial);
        else return this._loadDefaultMaterialPropertiesAsync(context, material, babylonMaterial)
    }

    /** @hidden */
    private _loadDefaultMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: BABYLON.Material): BABYLON.Nullable<Promise<void>> {
        // console.warn("CVTOOLS: LoadDefaultMaterialPropertiesAsync: " + material.name);
        const commonConstant:any = (material.extras != null && material.extras.metadata != null) ? material.extras.metadata : null;
        const promises = new Array<Promise<any>>();
        promises.push(this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));

        if (babylonMaterial instanceof BABYLON.PBRMaterial) {
            const pbrMaterial:BABYLON.PBRMaterial = babylonMaterial as BABYLON.PBRMaterial;

            // BASE PROPERTIES
            
            if (commonConstant != null) {
                pbrMaterial.directIntensity = (commonConstant.directIntensity != null) ? commonConstant.directIntensity : 1.0;
                pbrMaterial.specularIntensity = (commonConstant.specularIntensity != null) ? commonConstant.specularIntensity : 1.0;
                pbrMaterial.emissiveIntensity = (commonConstant.emissiveIntensity != null) ? commonConstant.emissiveIntensity : 1.0;
                pbrMaterial.environmentIntensity = (commonConstant.environmentIntensity != null) ? commonConstant.environmentIntensity : 1.0;
            }
        }

        // LIGHTMAP PROPERTIES

        if (commonConstant != null && commonConstant.lightmapTexture) {
            promises.push(this._loader.loadTextureInfoAsync(context + "/lightmapTexture", commonConstant.lightmapTexture, (texture) => {
                const commonMaterial:any = babylonMaterial;
                commonMaterial.lightmapTexture = texture;
                commonMaterial.useLightmapAsShadowmap = true;
            }));
        }

        // TODO: CUSTOM PBR MATERIAL PROPERTIES

        return Promise.all(promises).then(() => { });
    }
    
    /** @hidden */
    private _loadStandardMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: BABYLON.StandardMaterial): BABYLON.Nullable<Promise<void>> {
        // console.warn("CVTOOLS: LoadStandardMaterialPropertiesAsync: " + material.name);
        const commonConstant:any = (material.extras != null && material.extras.metadata != null) ? material.extras.metadata : null;
        const promises = new Array<Promise<any>>();

        // BASE PROPERTIES

        babylonMaterial.specularColor = BABYLON.Color3.Black(); // TODO: Default Specular Coloring - ???
        if (this._loader.babylonScene.ambientColor) babylonMaterial.ambientColor = this._loader.babylonScene.ambientColor.clone();

        // STANDARD PROPERTIES

        let baseColorAlpha:number = 1.0;
        if (material.pbrMetallicRoughness) {
            const properties = material.pbrMetallicRoughness;
            if (properties) {
                if (properties.baseColorFactor) {
                    const linearBaseColor:BABYLON.Color3 = BABYLON.Color3.FromArray(properties.baseColorFactor);
                    babylonMaterial.diffuseColor = new BABYLON.Color3(Math.pow(linearBaseColor.r, 1 / 2.2), Math.pow(linearBaseColor.g, 1 / 2.2), Math.pow(linearBaseColor.b, 1 / 2.2));
                    baseColorAlpha = properties.baseColorFactor[3];
                }
                else {
                    babylonMaterial.diffuseColor = BABYLON.Color3.White();
                }
                if (properties.baseColorTexture) {
                    promises.push(this._loader.loadTextureInfoAsync(`${context}/baseColorTexture`, properties.baseColorTexture, (texture) => {
                        texture.name = `${babylonMaterial.name} (Base Color)`;
                        babylonMaterial.diffuseTexture = texture;
                    }));
                }
            }
        }

        const linearEmmisveColor:BABYLON.Color3 = material.emissiveFactor ? BABYLON.Color3.FromArray(material.emissiveFactor) : new BABYLON.Color3(0, 0, 0);
        babylonMaterial.emissiveColor = new BABYLON.Color3(Math.pow(linearEmmisveColor.r, 1 / 2.2), Math.pow(linearEmmisveColor.g, 1 / 2.2), Math.pow(linearEmmisveColor.b, 1 / 2.2));
        if (material.doubleSided) {
            babylonMaterial.backFaceCulling = false;
            babylonMaterial.twoSidedLighting = true;
        }

        if (material.normalTexture) {
            promises.push(this._loader.loadTextureInfoAsync(`${context}/normalTexture`, material.normalTexture, (texture) => {
                texture.name = `${babylonMaterial.name} (Normal)`;
                babylonMaterial.bumpTexture = texture;
            }));

            babylonMaterial.invertNormalMapX = !this._loader.babylonScene.useRightHandedSystem;
            babylonMaterial.invertNormalMapY = this._loader.babylonScene.useRightHandedSystem;
            if (material.normalTexture.scale != undefined) {
                babylonMaterial.bumpTexture.level = material.normalTexture.scale;
            }
        }

        if (material.occlusionTexture) {
            promises.push(this._loader.loadTextureInfoAsync(`${context}/occlusionTexture`, material.occlusionTexture, (texture) => {
                texture.name = `${babylonMaterial.name} (Occlusion)`;
                babylonMaterial.ambientTexture = texture;
                if (material.occlusionTexture.strength != undefined) {
                    babylonMaterial.ambientTexture.level = material.occlusionTexture.strength;
                }
            }));
        }

        if (material.emissiveTexture) {
            promises.push(this._loader.loadTextureInfoAsync(`${context}/emissiveTexture`, material.emissiveTexture, (texture) => {
                texture.name = `${babylonMaterial.name} (Emissive)`;
                babylonMaterial.emissiveTexture = texture;
                babylonMaterial.useEmissiveAsIllumination = true;
            }));
        }

        // ALPHA PROPERTIES (Needs Blend Testing)

        babylonMaterial.alpha = baseColorAlpha;             // Note: Default Base Color Alpha
        const alphaMode = material.alphaMode || BABYLON.GLTF2.MaterialAlphaMode.OPAQUE;
        switch (alphaMode) {
            case BABYLON.GLTF2.MaterialAlphaMode.OPAQUE: {  // Note: Normal-Mode (OPAQUE)
                babylonMaterial.alpha = 1.0;                // Note: Reset Alpha To Opaque
                break;
            }
            case BABYLON.GLTF2.MaterialAlphaMode.MASK: {    // Note: Transparency-Cutout (ALPHATEST)
                babylonMaterial.alphaCutOff = (material.alphaCutoff == undefined ? 0.5 : material.alphaCutoff);
                if (babylonMaterial.diffuseTexture) {
                    babylonMaterial.alpha = 1.0;            // Note: Use Alpha From Texture
                    babylonMaterial.diffuseTexture.hasAlpha = true;
                }
                break;
            }
            case BABYLON.GLTF2.MaterialAlphaMode.BLEND: {   // Note: Transparency (ALPHABLEND)
                if (babylonMaterial.diffuseTexture) {
                    babylonMaterial.alpha = 1.0;            // Note: Use Alpha From Texture
                    babylonMaterial.diffuseTexture.hasAlpha = true;
                    babylonMaterial.useAlphaFromDiffuseTexture = true;
                }
                break;
            }
            default: {
                throw new Error(`${context}/alphaMode: Invalid value (${material.alphaMode})`);
            }
        }

        // LIGHTMAP PROPERTIES

        if (commonConstant != null && commonConstant.lightmapTexture) {
            promises.push(this._loader.loadTextureInfoAsync(context + "/lightmapTexture", commonConstant.lightmapTexture, (texture) => {
                const commonMaterial:any = babylonMaterial;
                commonMaterial.lightmapTexture = texture;
                commonMaterial.useLightmapAsShadowmap = true;
            }));
        }

        // TODO: CUSTOM STD MATERIAL PROPERTIES

        return Promise.all(promises).then(() => { });
    }

    /** @hidden */
    private _loadShaderMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: BABYLON.ShaderMaterial): BABYLON.Nullable<Promise<void>> {
        // console.warn("CVTOOLS: LoadShaderMaterialPropertiesAsync: " + material.name);
        const commonConstant:any = (material.extras != null && material.extras.metadata != null) ? material.extras.metadata : null;
        const promises = new Array<Promise<any>>();

        // TODO: BASE PROPERTIES

        // LIGHTMAP PROPERTIES

        if (commonConstant != null && commonConstant.lightmapTexture) {
            promises.push(this._loader.loadTextureInfoAsync(context + "/lightmapTexture", commonConstant.lightmapTexture, (texture) => {
                const commonMaterial:any = babylonMaterial;
                commonMaterial.lightmapTexture = texture;
                commonMaterial.useLightmapAsShadowmap = true;
            }));
        }

        // TODO: CUSTOM SHADER MATERIAL PROPERTIES

        return Promise.all(promises).then(() => { });
    }
}

/**
 * Babylon Editor Toolkit - Loader Class
 * @class CVTOOLS_left_handedness
 * [Specification](https://github.com/MackeyK24/glTF/tree/master/extensions/2.0/Vendor/CVTOOLS_unity_metadata)
 */
class CVTOOLS_left_handedness implements BABYLON.GLTF2.IGLTFLoaderExtension {
    /** The name of this extension. */
    public readonly name = CVTOOLS_HAND;

    /** Defines whether this extension is enabled. */
    public enabled = true;

    private _loader: BABYLON.GLTF2.GLTFLoader;

    /** @hidden */
    constructor(loader: BABYLON.GLTF2.GLTFLoader) {
        this._loader = loader;
    }

    /** @hidden */
    public dispose() {
        delete this._loader;
    }
}

/**
 * Babylon Editor Toolkit - Register Extensions
 */
BABYLON.GLTF2.GLTFLoader.RegisterExtension(CVTOOLS_NAME, (loader) => new CVTOOLS_unity_metadata(loader));
BABYLON.GLTF2.GLTFLoader.RegisterExtension(CVTOOLS_HAND, (loader) => new CVTOOLS_left_handedness(loader));
BABYLON.SceneLoader.OnPluginActivatedObservable.add(function (loader) {
    if (loader.name === "gltf") {
        if (BABYLON.SceneManager.ForceRightHanded === true) {
            (<any>loader).coordinateSystemMode = BABYLON.GLTFLoaderCoordinateSystemMode.FORCE_RIGHT_HANDED;
        }
        (<any>loader).dispose();
    }
});