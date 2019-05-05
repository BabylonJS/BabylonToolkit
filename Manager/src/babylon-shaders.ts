module BABYLON {
    /* Universal Material Types */
    export type UniversalMaterial = UniversalPushMaterial | UniversalAlbedoMaterial | UniversalDiffuseMaterial;

    /* Universal Shader Defines */
    export class UniversalShaderDefines {
        private _defines:any = {}
        constructor() { this._defines = {}; }
        public getDefines(): any { return this._defines; }
        public defineBoolean(name:string) : void { this._defines[name] = true;}
        public defineNumeric(name:string, value:number) : void { this._defines[name] = value; }
        public static ShaderIndexer = 0;
    }

    /* Universal Material Defines */
    export class UniversalMaterialDefines extends BABYLON.MaterialDefines {
        public DIFFUSE = false;
        public CLIPPLANE = false;
        public CLIPPLANE2 = false;
        public CLIPPLANE3 = false;
        public CLIPPLANE4 = false;
        public ALPHATEST = false;
        public DEPTHPREPASS = false;
        public POINTSIZE = false;
        public FOG = false;
        public NORMAL = false;
        public UV1 = false;
        public UV2 = false;
        public VERTEXCOLOR = false;
        public VERTEXALPHA = false;
        public NUM_BONE_INFLUENCERS = 0;
        public BonesPerMesh = 0;
        public INSTANCES = false;
        constructor() { super(); this.rebuild(); }
    }

    /* Universal Albedo Shader Chunks */
    export class UniversalAlbedoChunks {
        constructor() { }
        public Vertex_Begin: string;
        public Vertex_Definitions: string;
        public Vertex_MainBegin: string;
        public Vertex_Before_PositionUpdated: string;   // positionUpdated
        public Vertex_Before_NormalUpdated: string;     // normalUpdated
        public Vertex_MainEnd: string;                  // mainEnd
        public Fragment_Begin: string;
        public Fragment_Definitions: string;
        public Fragment_MainBegin: string;
        public Fragment_Custom_Albedo: string;          // surfaceAlbedo
        public Fragment_Custom_Alpha: string;           // alpha
        public Fragment_Before_Lights: string;          // lights
        public Fragment_Before_Fog: string;             // fog
        public Fragment_Before_FragColor: string;       // color

        public Fragment_MetallicRoughness: string;
        public Fragment_MicroSurface: string;
    
    }

    /* Universal Diffuse Shader Chunks */
    export class UniversalDiffuseChunks {
        constructor() { }
        public Vertex_Begin: string;
        public Vertex_Definitions: string;
        public Vertex_MainBegin: string;
        public Vertex_Before_PositionUpdated: string;   // positionUpdated
        public Vertex_Before_NormalUpdated: string;     // normalUpdated
        public Vertex_MainEnd: string;                  // mainEnd
        public Fragment_Begin: string;
        public Fragment_Definitions: string;
        public Fragment_MainBegin: string;
        public Fragment_Custom_Diffuse: string;         // diffuseColor
        public Fragment_Custom_Alpha: string;           // alpha
        public Fragment_Before_Lights: string;          // lights
        public Fragment_Before_Fog: string;             // fog
        public Fragment_Before_FragColor: string;       // color
    }

    /* Universal Shader Material Helper */
    export class UniversalShaderMaterial {
        public static Initialize(material:BABYLON.ShaderMaterial, binding:boolean = true):void {
            const shaderMaterial:any = material;
            const shaderProgram:string = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getShaderName") ? shaderMaterial.getShaderName() : "glsl";
            const alphaBlending:boolean = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getAlphaBlending") ? shaderMaterial.getAlphaBlending() : false;
            const alphaTesting:boolean = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getAlphaTesting") ? shaderMaterial.getAlphaTesting() : false;
            let defaultDefines:string[] = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getDefaultDefines") ? shaderMaterial.getDefaultDefines() : null;
            let defaultAttributes:string[] = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getDefaultAttributes") ? shaderMaterial.getDefaultAttributes() : null;
            let defaultUniforms:string[] = BABYLON.Utilities.HasOwnProperty(shaderMaterial, "getDefaultUniforms") ? shaderMaterial.getDefaultUniforms() : null;
            if (defaultDefines == null || defaultDefines.length <= 0) {
                defaultDefines = ["#define DIFFUSECOLOR", "#define DIFFUSETEXTURE"];
            }
            if (defaultAttributes == null || defaultAttributes.length <= 0) {
                defaultAttributes = ["position", "normal", "uv", "uv2", "color"];
            }
            if (defaultUniforms == null || defaultUniforms.length <= 0) {
                defaultUniforms = ["world", "worldView", "worldViewProjection", "view", "projection", "viewProjection", "diffuseColor", "diffuseTexture", "diffuseTextureInfos", "diffuseTextureMatrix"];
            }
            const shaderProgramInfo:any = { vertex: shaderProgram, fragment: shaderProgram };
            const shaderOptionsInfo:BABYLON.IShaderMaterialOptions = {
                needAlphaBlending: alphaBlending,
                needAlphaTesting: alphaTesting,
                attributes: defaultAttributes,
                uniforms: defaultUniforms,
                defines: defaultDefines,
                samplers: [],
                uniformBuffers: []
            };
            shaderMaterial._shaderPath = shaderProgramInfo;
            shaderMaterial._options = shaderOptionsInfo;
            if (binding === true) {
                shaderMaterial.fn_afterBind = shaderMaterial._afterBind;
                shaderMaterial._afterBind = (mesh:BABYLON.Mesh) => { 
                    const scene:BABYLON.Scene = material.getScene();
                    if (scene.texturesEnabled) {
                        for (let name in shaderMaterial._textures) {
                            const texture:BABYLON.Texture = shaderMaterial._textures[name];
                            if (texture != null) {
                                shaderMaterial._effect.setFloat2(name + "Infos", texture.coordinatesIndex, texture.level);
                                shaderMaterial._effect.setMatrix(name + "Matrix", texture.getTextureMatrix());
                            }
                        }
                    }
                    if (shaderMaterial.fn_afterBind) try { shaderMaterial.fn_afterBind(mesh); }catch(e){};
                };
            }
        }
    }

    /**
     * Babylon universal push material
     * @class UniversalPushMaterial
     */
    export class UniversalPushMaterial extends BABYLON.PushMaterial {
        @BABYLON.serializeAsTexture("diffuseTexture")
        private _diffuseTexture: BABYLON.BaseTexture;
        @BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public diffuseTexture: BABYLON.BaseTexture;

        @BABYLON.serializeAsColor3("diffuse")
        public diffuseColor = new BABYLON.Color3(1, 1, 1);

        @BABYLON.serialize("disableLighting")
        private _disableLighting = false;
        @BABYLON.expandToProperty("_markAllSubMeshesAsLightsDirty")
        public disableLighting: boolean;

        @BABYLON.serialize("maxSimultaneousLights")
        private _maxSimultaneousLights = 4;
        @BABYLON.expandToProperty("_markAllSubMeshesAsLightsDirty")
        public maxSimultaneousLights: number;

        public customShaderNameResolve: (shaderName: string, uniforms: string[], uniformBuffers: string[], samplers: string[], defines: BABYLON.UniversalMaterialDefines) => string;
        protected locals:BABYLON.UniversalShaderDefines = null;
        private _defines: BABYLON.UniversalMaterialDefines = null;
        private _uniforms:string[] = [];
        private _samplers:string[] = [];
        private _textures: { [name: string]: BABYLON.Texture } = {};
        private _vectors4: { [name: string]: BABYLON.Vector4 } = {};
        private _floats: { [name: string]: number } = {};
        private _renderId: number;

        constructor(name: string, scene: BABYLON.Scene) {
            super(name, scene);
            this.locals = new BABYLON.UniversalShaderDefines();
            this._defines = null;
            this.customShaderNameResolve = this._buildCustomShader;
        }

        public getClassName(): string {
            return "UniversalPushMaterial";
        }
        public getShaderName(): string {
            return "simple";
        }
        public getShaderDefines(): BABYLON.UniversalMaterialDefines {
            return this._defines;
        }
        public needAlphaBlending(): boolean {
            return (this.alpha < 1.0);
        }
        public needAlphaTesting(): boolean {
            return false;
        }
        public getAlphaTestTexture(): BABYLON.Nullable<BABYLON.BaseTexture> {
            return null;
        }

        /* Shader Material Property Accessor Functions */

        public getTexture(name:string): BABYLON.Texture {
            return this._textures[name];
        }
        public getVector4(name:string): BABYLON.Vector4 {
            return this._vectors4[name];
        }
        public getFloat(name:string): number {
            return this._floats[name];
        }
        public setTexture(name: string, texture: BABYLON.Texture, initialize:boolean = false): BABYLON.UniversalPushMaterial {
            if (initialize === true) this.checkSampler(name);
            this._textures[name] = texture;
            return this;
        }
        public setVector4(name: string, value: BABYLON.Vector4, initialize:boolean = false): BABYLON.UniversalPushMaterial {
            if (initialize === true) this.checkUniform(name);
            this._vectors4[name] = value;
            return this;
        }
        public setFloat(name: string, value: number, initialize:boolean = false): BABYLON.UniversalPushMaterial {
            if (initialize === true) this.checkUniform(name);
            this._floats[name] = value;
            return this;
        }
        public checkUniform(uniformName:string): void {
            if (this._uniforms.indexOf(uniformName) === -1) {
                this._uniforms.push(uniformName);
                this.locals.defineBoolean(uniformName.toUpperCase());
            }
        }
        public checkSampler(samplerName:string): void {
            if (this._samplers.indexOf(samplerName) === -1) {
                this._samplers.push(samplerName);
                this.locals.defineBoolean(samplerName.toUpperCase());
                this.checkUniform(samplerName + "Infos");
                this.checkUniform(samplerName + "Matrix");
            }
        }

        // Methods
        public isReadyForSubMesh(mesh: BABYLON.AbstractMesh, subMesh: BABYLON.SubMesh, useInstances?: boolean): boolean {
            if (this.isFrozen) {
                if (this._wasPreviouslyReady && subMesh.effect) {
                    return true;
                }
            }

            if (!subMesh._materialDefines) {
                subMesh._materialDefines = new BABYLON.UniversalMaterialDefines();
            }

            var defines = <BABYLON.UniversalMaterialDefines>subMesh._materialDefines;
            var scene = this.getScene();

            if (!this.checkReadyOnEveryCall && subMesh.effect) {
                if (this._renderId === scene.getRenderId()) {
                    return true;
                }
            }

            var engine = scene.getEngine();

            // Textures
            if (defines._areTexturesDirty) {
                defines._needUVs = false;
                if (scene.texturesEnabled) {
                    if (this._diffuseTexture && BABYLON.MaterialFlags.DiffuseTextureEnabled) {
                        if (!this._diffuseTexture.isReady()) {
                            return false;
                        } else {
                            defines._needUVs = true;
                            defines.DIFFUSE = true;
                        }
                    }
                }
            }

            // Misc.
            BABYLON.MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines);

            // Lights
            defines._needNormals = BABYLON.MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting);

            // Values that need to be evaluated on every frame
            BABYLON.MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false);

            // Attribs
            BABYLON.MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true);

            // Get correct effect
            if (defines.isDirty) {
                defines.markAsProcessed();
                scene.resetCachedMaterial();

                // Fallbacks
                var fallbacks = new BABYLON.EffectFallbacks();
                if (defines.FOG) {
                    fallbacks.addFallback(1, "FOG");
                }

                BABYLON.MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this.maxSimultaneousLights);

                if (defines.NUM_BONE_INFLUENCERS > 0) {
                    fallbacks.addCPUSkinningFallback(0, mesh);
                }

                //Attributes
                var attribs = [BABYLON.VertexBuffer.PositionKind];

                if (defines.NORMAL) {
                    attribs.push(BABYLON.VertexBuffer.NormalKind);
                }

                if (defines.UV1) {
                    attribs.push(BABYLON.VertexBuffer.UVKind);
                }

                if (defines.UV2) {
                    attribs.push(BABYLON.VertexBuffer.UV2Kind);
                }

                if (defines.VERTEXCOLOR) {
                    attribs.push(BABYLON.VertexBuffer.ColorKind);
                }

                BABYLON.MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
                BABYLON.MaterialHelper.PrepareAttributesForInstances(attribs, defines);

                var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor",
                    "vFogInfos", "vFogColor", "pointSize",
                    "vDiffuseInfos",
                    "mBones",
                    "vClipPlane", "vClipPlane2", "vClipPlane3", "vClipPlane4", "diffuseMatrix"
                ];
                var samplers = ["diffuseSampler"];
                var uniformBuffers = new Array<string>();

                BABYLON.MaterialHelper.PrepareUniformsAndSamplersList(<BABYLON.EffectCreationOptions>{
                    uniformsNames: uniforms,
                    uniformBuffersNames: uniformBuffers,
                    samplers: samplers,
                    defines: defines,
                    maxSimultaneousLights: this.maxSimultaneousLights
                });

                var shaderName = this.getShaderName();
                if (this.customShaderNameResolve) {
                    shaderName = this.customShaderNameResolve(shaderName, uniforms, uniformBuffers, samplers, defines);
                }

                var join = defines.toString();
                subMesh.setEffect(scene.getEngine().createEffect(shaderName,
                    <BABYLON.EffectCreationOptions>{
                        attributes: attribs,
                        uniformsNames: uniforms,
                        uniformBuffersNames: uniformBuffers,
                        samplers: samplers,
                        defines: join,
                        fallbacks: fallbacks,
                        onCompiled: this.onCompiled,
                        onError: this.onError,
                        indexParameters: { maxSimultaneousLights: this._maxSimultaneousLights - 1 }
                    }, engine), defines);

            }
            if (!subMesh.effect || !subMesh.effect.isReady()) {
                return false;
            }

            this._renderId = scene.getRenderId();
            this._wasPreviouslyReady = true;

            return true;
        }

        public bindForSubMesh(world: BABYLON.Matrix, mesh: BABYLON.Mesh, subMesh: BABYLON.SubMesh): void {
            var scene = this.getScene();

            var defines = <BABYLON.UniversalMaterialDefines>subMesh._materialDefines;
            if (!defines) {
                return;
            }

            var effect = subMesh.effect;
            if (!effect) {
                return;
            }
            this._activeEffect = effect;

            // Matrices
            this.bindOnlyWorldMatrix(world);
            this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());

            // Bones
            BABYLON.MaterialHelper.BindBonesParameters(mesh, this._activeEffect);

            if (this._mustRebind(scene, effect)) {
                // Textures
                if (this._diffuseTexture && BABYLON.MaterialFlags.DiffuseTextureEnabled) {
                    this._activeEffect.setTexture("diffuseSampler", this._diffuseTexture);

                    this._activeEffect.setFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level);
                    this._activeEffect.setMatrix("diffuseMatrix", this._diffuseTexture.getTextureMatrix());
                }

                // Clip plane
                BABYLON.MaterialHelper.BindClipPlane(this._activeEffect, scene);

                // Point size
                if (this.pointsCloud) {
                    this._activeEffect.setFloat("pointSize", this.pointSize);
                }

                BABYLON.MaterialHelper.BindEyePosition(effect, scene);
            }

            this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility);

            // Lights
            if (scene.lightsEnabled && !this.disableLighting) {
                BABYLON.MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
            }

            // View
            if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== BABYLON.Scene.FOGMODE_NONE) {
                this._activeEffect.setMatrix("view", scene.getViewMatrix());
            }

            // Fog
            BABYLON.MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);

            this._afterBind(mesh, this._activeEffect);
            this._attachAfterBind(mesh, this._activeEffect);
        }

        public getAnimatables(): BABYLON.IAnimatable[] {
            var results = [];

            if (this._diffuseTexture && this._diffuseTexture.animations && this._diffuseTexture.animations.length > 0) {
                results.push(this._diffuseTexture);
            }

            for (const name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture && texture.animations && texture.animations.length > 0) results.push(texture);
            }

            return results;
        }

        public getActiveTextures(): BABYLON.BaseTexture[] {
            var results = super.getActiveTextures();

            if (this._diffuseTexture) {
                results.push(this._diffuseTexture);
            }

            for (const name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture) results.push(texture);
            }

            return results;
        }

        public hasTexture(texture: BABYLON.BaseTexture): boolean {
            if (super.hasTexture(texture)) {
                return true;
            }

            if (this.diffuseTexture === texture) {
                return true;
            }

            let found:boolean = false;
            for (const name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture === texture) {
                    found = true;
                    break;
                }
            }
            return found;    
        }

        public dispose(forceDisposeEffect?: boolean): void {
            if (this._diffuseTexture) {
                this._diffuseTexture.dispose();
            }

            for (const name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture) texture.dispose();
                this._textures[name] = null;
            }
            this._textures = {};

            super.dispose(forceDisposeEffect);
        }

        public clone(cloneName: string): BABYLON.UniversalPushMaterial {
            let name: string;
            const destination = BABYLON.SerializationHelper.Clone<BABYLON.UniversalPushMaterial>(() => new BABYLON.UniversalPushMaterial(cloneName, this.getScene()), this);
            destination._textures = {};
            for (name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture) destination.setTexture(name, texture.clone(), true);
            }
            destination._vectors4 = {};
            for (name in this._vectors4) {
                destination.setVector4(name, this._vectors4[name].clone(), true);
            }
            destination._floats = {};
            for (name in this._floats) {
                destination.setFloat(name, this._floats[name], true);
            }
            return destination;
        }

        public serialize(): any {
            let name: string;
            const serializationObject = BABYLON.SerializationHelper.Serialize(this);
            serializationObject.customType = "BABYLON.UniversalPushMaterial";
            serializationObject.textures = {};
            for (name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture) serializationObject.textures[name] = texture.serialize();
            }
            serializationObject.vectors4 = {};
            for (name in this._vectors4) {
                serializationObject.vectors4[name] = this._vectors4[name].asArray();
            }
            serializationObject.floats = {};
            for (name in this._floats) {
                serializationObject.floats[name] = this._floats[name];
            }
            return serializationObject;
        }

        // Statics
        public static Parse(source: any, scene: BABYLON.Scene, rootUrl: string): BABYLON.UniversalPushMaterial {
            let name: string;
            const material =  BABYLON.SerializationHelper.Parse(() => new BABYLON.UniversalPushMaterial(source.name, scene), source, scene, rootUrl);
            for (name in source.textures) {
                const texture:BABYLON.Texture = source.textures[name];
                if (texture) material.setTexture(name, <BABYLON.Texture>Texture.Parse(texture, scene, rootUrl), true);
            }
            for (name in source.vectors4) {
                material.setVector4(name, BABYLON.Vector4.FromArray(source.vectors4[name]), true);
            }
            for (name in source.floats) {
                material.setFloat(name, source.floats[name], true);
            }
            return material;
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////  Protected Worker Funtions  //////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private _buildCustomShader(shaderName: string, uniforms: string[], uniformBuffers: string[], samplers: string[], defines: BABYLON.UniversalMaterialDefines) : string {
            this._defines = defines;
            let shaderProgram:string = this.getShaderName();
            if (shaderProgram == null || shaderProgram === "") {
                shaderProgram = shaderName;
            }
            if (shaderProgram == null || shaderProgram === "") {
                shaderProgram = "simple";
            }
            // Validate Property Defines
            const locals:any = this.locals.getDefines();
            if (locals != null && this._defines != null) {
                const keys:string[] = Object.keys(locals);
                if (keys != null && keys.length > 0) {
                    const source:any = this._defines;
                    for (const key of keys) {
                        source[key] = locals[key];
                    }
                    this._defines.rebuild();
                }
            }
            // Validate Property Uniforms
            let index:number = 0;
            if (this._uniforms != null && this._uniforms.length > 0) {
                for (index = 0; index < this._uniforms.length; index++) {
                    const uniformName = this._uniforms[index];
                    if (uniforms.indexOf(uniformName) === -1) {
                        uniforms.push(uniformName);
                    }
                }
            }
            // Validate Property Samplers
            index = 0;
            if (this._samplers != null && this._samplers.length > 0) {
                for (index = 0; index < this._samplers.length; index++) {
                    const samplerName:string = this._samplers[index];
                    if (samplers.indexOf(samplerName) === -1) {
                        samplers.push(samplerName);
                    }
                }
            }
            return shaderProgram;
        }
        private _attachAfterBind(mesh:BABYLON.Mesh, effect:BABYLON.Effect):void  {
            let name: string;
            const scene:BABYLON.Scene = this.getScene();
            if (scene.texturesEnabled) {
                for (name in this._textures) {
                    const texture:BABYLON.Texture = this._textures[name];
                    if (texture != null) {
                        effect.setTexture(name, texture);
                        effect.setFloat2(name + "Infos", texture.coordinatesIndex, texture.level);
                        effect.setMatrix(name + "Matrix", texture.getTextureMatrix());
                    }
                }
            }
            for (name in this._vectors4) {
                effect.setVector4(name, this._vectors4[name]);
            }
            for (name in this._floats) {
                effect.setFloat(name, this._floats[name]);
            }
        }
    }
    BABYLON._TypeStore.RegisteredTypes["UniversalPushMaterial"] = UniversalPushMaterial;
    
    /**
     * Babylon universal albedo material
     * @class UniversalAlbedoMaterial
     */
    export class UniversalAlbedoMaterial extends BABYLON.PBRMaterial {
        protected locals:BABYLON.UniversalShaderDefines = null;
        private _defines: BABYLON.PBRMaterialDefines = null;
        private _uniforms:string[] = [];
        private _samplers:string[] = [];
        private _textures: { [name: string]: BABYLON.Texture } = {};
        private _vectors4: { [name: string]: BABYLON.Vector4 } = {};
        private _floats: { [name: string]: number } = {};
        private _isCreatedShader: boolean;
        private _createdShaderName: string;
        private _enableShaderChunks:boolean;
        private _materialShaderChunks: BABYLON.UniversalAlbedoChunks;
        public constructor(name: string, scene: Scene) {
            super(name, scene);
            this.locals = new BABYLON.UniversalShaderDefines();
            this._defines = null;
            this._enableShaderChunks = false;
            this._setupAttachAfterBind();
            this._materialShaderChunks = new BABYLON.UniversalAlbedoChunks();
            this.customShaderNameResolve = this._buildCustomShader;
            this.customShaderChunkResolve();
        }
        public getClassName(): string {
            return "UniversalAlbedoMaterial";
        }
        public getShaderName(): string {
            return "pbr";
        }
        public getShaderChunk(): string {
            return null;
        }
        public getShaderDefines(): BABYLON.PBRMaterialDefines {
            return this._defines;
        }

        /* Shader Material Property Accessor Functions */

        public getTexture(name:string): BABYLON.Texture {
            return this._textures[name];
        }
        public getVector4(name:string): BABYLON.Vector4 {
            return this._vectors4[name];
        }
        public getFloat(name:string): number {
            return this._floats[name];
        }
        public setTexture(name: string, texture: BABYLON.Texture, initialize:boolean = false): BABYLON.UniversalAlbedoMaterial {
            if (initialize === true) this.checkSampler(name);
            this._textures[name] = texture;
            return this;
        }
        public setVector4(name: string, value: BABYLON.Vector4, initialize:boolean = false): BABYLON.UniversalAlbedoMaterial {
            if (initialize === true) this.checkUniform(name);
            this._vectors4[name] = value;
            return this;
        }
        public setFloat(name: string, value: number, initialize:boolean = false): BABYLON.UniversalAlbedoMaterial {
            if (initialize === true) this.checkUniform(name);
            this._floats[name] = value;
            return this;
        }
        public checkUniform(uniformName:string): void {
            if (this._uniforms.indexOf(uniformName) === -1) {
                this._uniforms.push(uniformName);
                this.locals.defineBoolean(uniformName.toUpperCase());
            }
        }
        public checkSampler(samplerName:string): void {
            if (this._samplers.indexOf(samplerName) === -1) {
                this._samplers.push(samplerName);
                this.locals.defineBoolean(samplerName.toUpperCase());
                this.checkUniform(samplerName + "Infos");
                this.checkUniform(samplerName + "Matrix");
            }
        }

        /* Shader Material Base Worker Functions */

        public getAnimatables(): IAnimatable[] {
            const results = super.getAnimatables();
            for (const name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture && texture.animations && texture.animations.length > 0) results.push(texture);
            }
            return results;
        }
        public getActiveTextures(): BaseTexture[] {
            const results = super.getActiveTextures();
            for (const name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture) results.push(texture);
            }
            return results;
        }
        public hasTexture(texture: BaseTexture): boolean {
            if (super.hasTexture(texture)) {
                return true;
            }
            let found:boolean = false;
            for (const name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture === texture) {
                    found = true;
                    break;
                }
            }
            return found;    
        }        

        /* Shader Material Factory Class Functions */

        public dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void {
            if (forceDisposeTextures) {
                for (const name in this._textures) {
                    const texture:BABYLON.Texture = this._textures[name];
                    if (texture) texture.dispose();
                    this._textures[name] = null;
                }
            }
            this._textures = {};
            super.dispose(forceDisposeEffect, forceDisposeTextures);
        }
        public clone(cloneName: string): BABYLON.UniversalAlbedoMaterial {
            let name: string;
            const destination = BABYLON.SerializationHelper.Clone<BABYLON.UniversalAlbedoMaterial>(() => new BABYLON.UniversalAlbedoMaterial(cloneName, this.getScene()), this);
            destination._textures = {};
            for (name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture) destination.setTexture(name, texture.clone(), true);
            }
            destination._vectors4 = {};
            for (name in this._vectors4) {
                destination.setVector4(name, this._vectors4[name].clone(), true);
            }
            destination._floats = {};
            for (name in this._floats) {
                destination.setFloat(name, this._floats[name], true);
            }
            return destination;
        }
        public serialize(): any {
            let name: string;
            const serializationObject = BABYLON.SerializationHelper.Serialize(this);
            serializationObject.customType = "BABYLON.UniversalAlbedoMaterial";
            serializationObject.textures = {};
            for (name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture) serializationObject.textures[name] = texture.serialize();
            }
            serializationObject.vectors4 = {};
            for (name in this._vectors4) {
                serializationObject.vectors4[name] = this._vectors4[name].asArray();
            }
            serializationObject.floats = {};
            for (name in this._floats) {
                serializationObject.floats[name] = this._floats[name];
            }
            return serializationObject;
        }
        public static Parse(source: any, scene: BABYLON.Scene, rootUrl: string): BABYLON.UniversalAlbedoMaterial {
            let name: string;
            const material =  BABYLON.SerializationHelper.Parse(() => new BABYLON.UniversalAlbedoMaterial(source.name, scene), source, scene, rootUrl);
            for (name in source.textures) {
                const texture:BABYLON.Texture = source.textures[name];
                if (texture) material.setTexture(name, <BABYLON.Texture>Texture.Parse(texture, scene, rootUrl), true);
            }
            for (name in source.vectors4) {
                material.setVector4(name, BABYLON.Vector4.FromArray(source.vectors4[name]), true);
            }
            for (name in source.floats) {
                material.setFloat(name, source.floats[name], true);
            }
            return material;
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////  Protected Worker Funtions  //////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        protected customShaderChunkResolve():void {
            const chunkName:string = this.getShaderChunk();
            if (chunkName != null && chunkName !== "") {
                const shaderChunkBase = chunkName + "ShaderChunks";
                if (BABYLON.Effect.ShadersStore[shaderChunkBase] != null) {
                    this._enableShaderChunks = true;
                    const shaderChunks:any = BABYLON.Effect.ShadersStore[shaderChunkBase];
                    const vertexBegin:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexBegin")) ? shaderChunks["VertexBegin"] : null;
                    if (vertexBegin != null && vertexBegin !== "") {
                        this._materialShaderChunks.Vertex_Begin = vertexBegin;
                    }
                    const vertexDefinitions:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexDefinitions")) ? shaderChunks["VertexDefinitions"] : null;
                    if (vertexDefinitions != null && vertexDefinitions !== "") {
                        this._materialShaderChunks.Vertex_Definitions = vertexDefinitions;
                    }
                    const vertexMainBegin:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexMainBegin")) ? shaderChunks["VertexMainBegin"] : null;
                    if (vertexMainBegin != null && vertexMainBegin !== "") {
                        this._materialShaderChunks.Vertex_MainBegin = vertexMainBegin;
                    }
                    const vertexUpdatePosition:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexUpdatePosition")) ? shaderChunks["VertexUpdatePosition"] : null;
                    if (vertexUpdatePosition != null && vertexUpdatePosition !== "") {
                        this._materialShaderChunks.Vertex_Before_PositionUpdated = vertexUpdatePosition.replace("result", "positionUpdated");
                    }
                    const vertexUpdateNormal:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexUpdateNormal")) ? shaderChunks["VertexUpdateNormal"] : null;
                    if (vertexUpdateNormal != null && vertexUpdateNormal !== "") {
                        this._materialShaderChunks.Vertex_Before_NormalUpdated = vertexUpdateNormal.replace("result", "normalUpdated");
                    }
                    const vertexMainEnd:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexMainEnd")) ? shaderChunks["VertexMainEnd"] : null;
                    if (vertexMainEnd != null && vertexMainEnd !== "") {
                        this._materialShaderChunks.Vertex_MainEnd = vertexMainEnd;
                    }

                    const fragmentBegin:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentBegin")) ? shaderChunks["FragmentBegin"] : null;
                    if (fragmentBegin != null && fragmentBegin !== "") {
                        this._materialShaderChunks.Fragment_Begin = fragmentBegin;
                    }
                    const fragmentDefinitions:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentDefinitions")) ? shaderChunks["FragmentDefinitions"] : null;
                    if (fragmentDefinitions != null && fragmentDefinitions !== "") {
                        this._materialShaderChunks.Fragment_Definitions = fragmentDefinitions;
                    }
                    const fragmentMainBegin:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentMainBegin")) ? shaderChunks["FragmentMainBegin"] : null;
                    if (fragmentMainBegin != null && fragmentMainBegin !== "") {
                        this._materialShaderChunks.Fragment_MainBegin = fragmentMainBegin;
                    }
                    const fragmentUpdateAlbedo:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentUpdateAlbedo")) ? shaderChunks["FragmentUpdateAlbedo"] : null;
                    if (fragmentUpdateAlbedo != null && fragmentUpdateAlbedo !== "") {
                        this._materialShaderChunks.Fragment_Custom_Albedo = fragmentUpdateAlbedo.replace("result", "surfaceAlbedo");
                    }
                    const fragmentUpdateAlpha:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentUpdateAlpha")) ? shaderChunks["FragmentUpdateAlpha"] : null;
                    if (fragmentUpdateAlpha != null && fragmentUpdateAlpha !== "") {
                        this._materialShaderChunks.Fragment_Custom_Alpha = fragmentUpdateAlpha.replace("result", "alpha");
                    }
                    const fragmentMetallicRoughness:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentMetallicRoughness")) ? shaderChunks["FragmentMetallicRoughness"] : null;
                    if (fragmentMetallicRoughness != null && fragmentMetallicRoughness !== "") {
                        this._materialShaderChunks.Fragment_MetallicRoughness = fragmentMetallicRoughness;
                    }
                    const fragmentMicroSurface:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentMicroSurface")) ? shaderChunks["FragmentMicroSurface"] : null;
                    if (fragmentMicroSurface != null && fragmentMicroSurface !== "") {
                        this._materialShaderChunks.Fragment_MicroSurface = fragmentMicroSurface;
                    }
                    const fragmentBeforeLights:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentBeforeLights")) ? shaderChunks["FragmentBeforeLights"] : null;
                    if (fragmentBeforeLights != null && fragmentBeforeLights !== "") {
                        this._materialShaderChunks.Fragment_Before_Lights = fragmentBeforeLights;
                    }
                    const fragmentBeforeFog:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentBeforeFog")) ? shaderChunks["FragmentBeforeFog"] : null;
                    if (fragmentBeforeFog != null && fragmentBeforeFog !== "") {
                        this._materialShaderChunks.Fragment_Before_Fog = fragmentBeforeFog;
                    }
                    const fragmentBeforeFragColor:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentBeforeFragColor")) ? shaderChunks["FragmentBeforeFragColor"] : null;
                    if (fragmentBeforeFragColor != null && fragmentBeforeFragColor !== "") {
                        this._materialShaderChunks.Fragment_Before_FragColor = fragmentBeforeFragColor.replace("result", "color");
                    }
                } else {
                    BABYLON.Tools.Warn("Failed To Locate Shader Chunk Base: " + shaderChunkBase);
                }
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////  Private Worker Funtions  ///////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        private _buildCustomShader(shaderName: string, uniforms: string[], uniformBuffers: string[], samplers: string[], defines: BABYLON.PBRMaterialDefines) : string {
            this._defines = defines;
            let shaderProgram:string = this.getShaderName();
            if (shaderProgram == null || shaderProgram === "") {
                shaderProgram = shaderName;
            }
            if (shaderProgram == null || shaderProgram === "") {
                shaderProgram = "pbr";
            }
            // Validate Property Defines
            const locals:any = this.locals.getDefines();
            if (locals != null && this._defines != null) {
                const keys:string[] = Object.keys(locals);
                if (keys != null && keys.length > 0) {
                    const source:any = this._defines;
                    for (const key of keys) {
                        source[key] = locals[key];
                    }
                    this._defines.rebuild();
                }
            }
            // Validate Property Uniforms
            let index:number = 0;
            if (this._uniforms != null && this._uniforms.length > 0) {
                for (index = 0; index < this._uniforms.length; index++) {
                    const uniformName = this._uniforms[index];
                    if (uniforms.indexOf(uniformName) === -1) {
                        uniforms.push(uniformName);
                    }
                }
            }
            // Validate Property Samplers
            index = 0;
            if (this._samplers != null && this._samplers.length > 0) {
                for (index = 0; index < this._samplers.length; index++) {
                    const samplerName:string = this._samplers[index];
                    if (samplers.indexOf(samplerName) === -1) {
                        samplers.push(samplerName);
                    }
                }
            }
            // Validate Shader Chunks
            return (this._enableShaderChunks === true) ? this._createShaderChunks(shaderProgram) : shaderProgram;
        }
        private _createShaderChunks(shaderName: string): string {
            if (this._isCreatedShader) {
                return this._createdShaderName;
            }
            this._isCreatedShader = false;
            
            let chunkName:string = this.getShaderChunk();
            if (chunkName == null || chunkName === "") {
                chunkName = shaderName;
            }
            
            BABYLON.UniversalShaderDefines.ShaderIndexer++;
            const name: string = (chunkName + "Custom" + BABYLON.UniversalShaderDefines.ShaderIndexer).trim();
            const vertex = Effect.ShadersStore[shaderName + "VertexShader"];
            const fragment = Effect.ShadersStore[shaderName + "PixelShader"];

            const vertexname = name + "VertexShader"
            Effect.ShadersStore[vertexname] = vertex
                .replace('#define CUSTOM_VERTEX_BEGIN', (this._materialShaderChunks.Vertex_Begin ? this._materialShaderChunks.Vertex_Begin : ""))
                .replace('#define CUSTOM_VERTEX_DEFINITIONS', (this._materialShaderChunks.Vertex_Definitions ? this._materialShaderChunks.Vertex_Definitions : ""))
                .replace('#define CUSTOM_VERTEX_MAIN_BEGIN', (this._materialShaderChunks.Vertex_MainBegin ? this._materialShaderChunks.Vertex_MainBegin : ""))
                .replace('#define CUSTOM_VERTEX_UPDATE_POSITION', (this._materialShaderChunks.Vertex_Before_PositionUpdated ? this._materialShaderChunks.Vertex_Before_PositionUpdated : ""))
                .replace('#define CUSTOM_VERTEX_UPDATE_NORMAL', (this._materialShaderChunks.Vertex_Before_NormalUpdated ? this._materialShaderChunks.Vertex_Before_NormalUpdated : ""))
                .replace('#define CUSTOM_VERTEX_MAIN_END', (this._materialShaderChunks.Vertex_MainEnd ? this._materialShaderChunks.Vertex_MainEnd : ""));
    
            const fragmentname = name + "PixelShader"
            Effect.ShadersStore[fragmentname] = fragment
                .replace('#define CUSTOM_FRAGMENT_BEGIN', (this._materialShaderChunks.Fragment_Begin ? this._materialShaderChunks.Fragment_Begin : ""))
                .replace('#define CUSTOM_FRAGMENT_DEFINITIONS', (this._materialShaderChunks.Fragment_Definitions ? this._materialShaderChunks.Fragment_Definitions : ""))
                .replace('#define CUSTOM_FRAGMENT_MAIN_BEGIN', (this._materialShaderChunks.Fragment_MainBegin ? this._materialShaderChunks.Fragment_MainBegin : ""))
                .replace('#define CUSTOM_FRAGMENT_UPDATE_ALBEDO', (this._materialShaderChunks.Fragment_Custom_Albedo ? this._materialShaderChunks.Fragment_Custom_Albedo : ""))
                .replace('#define CUSTOM_FRAGMENT_UPDATE_ALPHA', (this._materialShaderChunks.Fragment_Custom_Alpha ? this._materialShaderChunks.Fragment_Custom_Alpha : ""))
                .replace('#define CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS', (this._materialShaderChunks.Fragment_MetallicRoughness ? this._materialShaderChunks.Fragment_MetallicRoughness : ""))
                .replace('#define CUSTOM_FRAGMENT_UPDATE_MICROSURFACE', (this._materialShaderChunks.Fragment_MicroSurface ? this._materialShaderChunks.Fragment_MicroSurface : ""))
                .replace('#define CUSTOM_FRAGMENT_BEFORE_LIGHTS', (this._materialShaderChunks.Fragment_Before_Lights ? this._materialShaderChunks.Fragment_Before_Lights : ""))
                .replace('#define CUSTOM_FRAGMENT_BEFORE_FOG', (this._materialShaderChunks.Fragment_Before_Fog ? this._materialShaderChunks.Fragment_Before_Fog : ""))
                .replace('#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR', (this._materialShaderChunks.Fragment_Before_FragColor ? this._materialShaderChunks.Fragment_Before_FragColor : ""));
    
            this._isCreatedShader = true;
            this._createdShaderName = name;

            return name;
        }
        private _attachAfterBind(mesh:BABYLON.Mesh, effect:BABYLON.Effect):void  {
            let name: string;
            const scene:BABYLON.Scene = this.getScene();
            if (scene.texturesEnabled) {
                for (name in this._textures) {
                    const texture:BABYLON.Texture = this._textures[name];
                    if (texture != null) {
                        effect.setTexture(name, texture);
                        effect.setFloat2(name + "Infos", texture.coordinatesIndex, texture.level);
                        effect.setMatrix(name + "Matrix", texture.getTextureMatrix());
                    }
                }
            }
            for (name in this._vectors4) {
                effect.setVector4(name, this._vectors4[name]);
            }
            for (name in this._floats) {
                effect.setFloat(name, this._floats[name]);
            }
        }
        private _setupAttachAfterBind():void {
            const fn_afterBind = this._afterBind;
            this._afterBind = (mesh:BABYLON.Mesh, effect:BABYLON.Effect) => { 
                this._attachAfterBind(mesh, effect);
                if (fn_afterBind) try { fn_afterBind(mesh, effect); }catch(e){};
            };
        }
    }
    BABYLON._TypeStore.RegisteredTypes["UniversalAlbedoMaterial"] = UniversalAlbedoMaterial;
    
    /**
     * Babylon universal diffuse material
     * @class UniversalDiffuseMaterial
     */
    export class UniversalDiffuseMaterial extends BABYLON.StandardMaterial {
        protected locals:BABYLON.UniversalShaderDefines = null;
        private _defines:BABYLON.StandardMaterialDefines = null;
        private _uniforms:string[] = [];
        private _samplers:string[] = [];
        private _textures: { [name: string]: BABYLON.Texture } = {};
        private _vectors4: { [name: string]: BABYLON.Vector4 } = {};
        private _floats: { [name: string]: number } = {};
        private _isCreatedShader: boolean;
        private _createdShaderName: string;
        private _enableShaderChunks:boolean;
        private _materialShaderChunks: BABYLON.UniversalDiffuseChunks;
        public constructor(name: string, scene: Scene) {
            super(name, scene);
            this.locals = new BABYLON.UniversalShaderDefines();
            this._defines = null;
            this._enableShaderChunks = false;
            this._setupAttachAfterBind();
            this._materialShaderChunks = new BABYLON.UniversalDiffuseChunks();
            this.customShaderNameResolve = this._buildCustomShader;
            this.customShaderChunkResolve();
        }
        public getClassName(): string {
            return "UniversalDiffuseMaterial";
        }
        public getShaderName(): string {
            return "default";
        }
        public getShaderChunk(): string {
            return null;
        }
        public getShaderDefines(): BABYLON.StandardMaterialDefines {
            return this._defines;
        }

        /* Shader Material Property Accessor Functions */

        public getTexture(name:string): BABYLON.Texture {
            return this._textures[name];
        }
        public getVector4(name:string): BABYLON.Vector4 {
            return this._vectors4[name];
        }
        public getFloat(name:string): number {
            return this._floats[name];
        }
        public setTexture(name: string, texture: BABYLON.Texture, initialize:boolean = false): BABYLON.UniversalDiffuseMaterial {
            if (initialize === true) this.checkSampler(name);
            this._textures[name] = texture;
            return this;
        }
        public setVector4(name: string, value: BABYLON.Vector4, initialize:boolean = false): BABYLON.UniversalDiffuseMaterial {
            if (initialize === true) this.checkUniform(name);
            this._vectors4[name] = value;
            return this;
        }
        public setFloat(name: string, value: number, initialize:boolean = false): BABYLON.UniversalDiffuseMaterial {
            if (initialize === true) this.checkUniform(name);
            this._floats[name] = value;
            return this;
        }
        public checkUniform(uniformName:string): void {
            if (this._uniforms.indexOf(uniformName) === -1) {
                this._uniforms.push(uniformName);
                this.locals.defineBoolean(uniformName.toUpperCase());
            }
        }
        public checkSampler(samplerName:string): void {
            if (this._samplers.indexOf(samplerName) === -1) {
                this._samplers.push(samplerName);
                this.locals.defineBoolean(samplerName.toUpperCase());
                this.checkUniform(samplerName + "Infos");
                this.checkUniform(samplerName + "Matrix");
            }
        }
    
        /* Shader Material Base Worker Functions */

        public getAnimatables(): IAnimatable[] {
            const results = super.getAnimatables();
            for (const name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture && texture.animations && texture.animations.length > 0) results.push(texture);
            }
            return results;
        }
        public getActiveTextures(): BaseTexture[] {
            const results = super.getActiveTextures();
            for (const name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture) results.push(texture);
            }
            return results;
        }
        public hasTexture(texture: BaseTexture): boolean {
            if (super.hasTexture(texture)) {
                return true;
            }
            let found:boolean = false;
            for (const name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture === texture) {
                    found = true;
                    break;
                }
            }
            return found;    
        }        

        /* Shader Material Factory Class Functions */

        public dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void {
            if (forceDisposeTextures) {
                for (const name in this._textures) {
                    const texture:BABYLON.Texture = this._textures[name];
                    if (texture) texture.dispose();
                    this._textures[name] = null;
                }
            }
            this._textures = {};
            super.dispose(forceDisposeEffect, forceDisposeTextures);
        }
        public clone(cloneName: string): BABYLON.UniversalDiffuseMaterial {
            let name: string;
            const destination = BABYLON.SerializationHelper.Clone(() => new BABYLON.UniversalDiffuseMaterial(cloneName, this.getScene()), this);
            destination._textures = {};
            for (name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture) destination.setTexture(name, texture.clone(), true);
            }
            destination._vectors4 = {};
            for (name in this._vectors4) {
                destination.setVector4(name, this._vectors4[name].clone(), true);
            }
            destination._floats = {};
            for (name in this._floats) {
                destination.setFloat(name, this._floats[name], true);
            }
            return destination;
        }
        public serialize(): any {
            let name: string;
            const serializationObject = BABYLON.SerializationHelper.Serialize(this);
            serializationObject.customType = "BABYLON.UniversalDiffuseMaterial";
            serializationObject.textures = {};
            for (name in this._textures) {
                const texture:BABYLON.Texture = this._textures[name];
                if (texture) serializationObject.textures[name] = texture.serialize();
            }
            serializationObject.vectors4 = {};
            for (name in this._vectors4) {
                serializationObject.vectors4[name] = this._vectors4[name].asArray();
            }
            serializationObject.floats = {};
            for (name in this._floats) {
                serializationObject.floats[name] = this._floats[name];
            }
            return serializationObject;
        }
        public static Parse(source: any, scene: BABYLON.Scene, rootUrl: string): BABYLON.UniversalDiffuseMaterial {
            let name: string;
            const material =  BABYLON.SerializationHelper.Parse(() => new BABYLON.UniversalDiffuseMaterial(source.name, scene), source, scene, rootUrl);
            for (name in source.textures) {
                const texture:BABYLON.Texture = source.textures[name];
                if (texture) material.setTexture(name, <BABYLON.Texture>Texture.Parse(texture, scene, rootUrl), true);
            }
            for (name in source.vectors4) {
                material.setVector4(name, BABYLON.Vector4.FromArray(source.vectors4[name]), true);
            }
            for (name in source.floats) {
                material.setFloat(name, source.floats[name], true);
            }
            return material;
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////  Protected Worker Funtions  //////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        protected customShaderChunkResolve():void {
            const chunkName:string = this.getShaderChunk();
            if (chunkName != null && chunkName !== "") {
                const shaderChunkBase = chunkName + "ShaderChunks";
                if (BABYLON.Effect.ShadersStore[shaderChunkBase] != null) {
                    this._enableShaderChunks = true;
                    const shaderChunks:any = BABYLON.Effect.ShadersStore[shaderChunkBase];
                    const vertexBegin:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexBegin")) ? shaderChunks["VertexBegin"] : null;
                    if (vertexBegin != null && vertexBegin !== "") {
                        this._materialShaderChunks.Vertex_Begin = vertexBegin;
                    }
                    const vertexDefinitions:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexDefinitions")) ? shaderChunks["VertexDefinitions"] : null;
                    if (vertexDefinitions != null && vertexDefinitions !== "") {
                        this._materialShaderChunks.Vertex_Definitions = vertexDefinitions;
                    }
                    const vertexMainBegin:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexMainBegin")) ? shaderChunks["VertexMainBegin"] : null;
                    if (vertexMainBegin != null && vertexMainBegin !== "") {
                        this._materialShaderChunks.Vertex_MainBegin = vertexMainBegin;
                    }
                    const vertexUpdatePosition:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexUpdatePosition")) ? shaderChunks["VertexUpdatePosition"] : null;
                    if (vertexUpdatePosition != null && vertexUpdatePosition !== "") {
                        this._materialShaderChunks.Vertex_Before_PositionUpdated = vertexUpdatePosition.replace("result", "positionUpdated");
                    }
                    const vertexUpdateNormal:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexUpdateNormal")) ? shaderChunks["VertexUpdateNormal"] : null;
                    if (vertexUpdateNormal != null && vertexUpdateNormal !== "") {
                        this._materialShaderChunks.Vertex_Before_NormalUpdated = vertexUpdateNormal.replace("result", "normalUpdated");
                    }
                    const vertexMainEnd:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "VertexMainEnd")) ? shaderChunks["VertexMainEnd"] : null;
                    if (vertexMainEnd != null && vertexMainEnd !== "") {
                        this._materialShaderChunks.Vertex_MainEnd = vertexMainEnd;
                    }
                    const fragmentBegin:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentBegin")) ? shaderChunks["FragmentBegin"] : null;
                    if (fragmentBegin != null && fragmentBegin !== "") {
                        this._materialShaderChunks.Fragment_Begin = fragmentBegin;
                    }
                    const fragmentDefinitions:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentDefinitions")) ? shaderChunks["FragmentDefinitions"] : null;
                    if (fragmentDefinitions != null && fragmentDefinitions !== "") {
                        this._materialShaderChunks.Fragment_Definitions = fragmentDefinitions;
                    }
                    const fragmentMainBegin:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentMainBegin")) ? shaderChunks["FragmentMainBegin"] : null;
                    if (fragmentMainBegin != null && fragmentMainBegin !== "") {
                        this._materialShaderChunks.Fragment_MainBegin = fragmentMainBegin;
                    }
                    const fragmentUpdateDiffuse:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentUpdateDiffuse")) ? shaderChunks["FragmentUpdateDiffuse"] : null;
                    if (fragmentUpdateDiffuse != null && fragmentUpdateDiffuse !== "") {
                        this._materialShaderChunks.Fragment_Custom_Diffuse = fragmentUpdateDiffuse.replace("result", "diffuseColor");
                    }
                    const fragmentUpdateAlpha:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentUpdateAlpha")) ? shaderChunks["FragmentUpdateAlpha"] : null;
                    if (fragmentUpdateAlpha != null && fragmentUpdateAlpha !== "") {
                        this._materialShaderChunks.Fragment_Custom_Alpha = fragmentUpdateAlpha.replace("result", "alpha");
                    }
                    const fragmentBeforeLights:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentBeforeLights")) ? shaderChunks["FragmentBeforeLights"] : null;
                    if (fragmentBeforeLights != null && fragmentBeforeLights !== "") {
                        this._materialShaderChunks.Fragment_Before_Lights = fragmentBeforeLights;
                    }
                    const fragmentBeforeFog:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentBeforeFog")) ? shaderChunks["FragmentBeforeFog"] : null;
                    if (fragmentBeforeFog != null && fragmentBeforeFog !== "") {
                        this._materialShaderChunks.Fragment_Before_Fog = fragmentBeforeFog;
                    }
                    const fragmentBeforeFragColor:string = (BABYLON.Utilities.HasOwnProperty(shaderChunks, "FragmentBeforeFragColor")) ? shaderChunks["FragmentBeforeFragColor"] : null;
                    if (fragmentBeforeFragColor != null && fragmentBeforeFragColor !== "") {
                        this._materialShaderChunks.Fragment_Before_FragColor = fragmentBeforeFragColor.replace("result", "color");
                    }
                } else {
                    BABYLON.Tools.Warn("Failed To Locate Shader Chunk Base: " + shaderChunkBase);
                }
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////  Private Worker Funtions  ///////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private _buildCustomShader(shaderName: string, uniforms: string[], uniformBuffers: string[], samplers: string[], defines: BABYLON.StandardMaterialDefines) : string {
            this._defines = defines;
            let shaderProgram:string = this.getShaderName();
            if (shaderProgram == null || shaderProgram === "") {
                shaderProgram = shaderName;
            }
            if (shaderProgram == null || shaderProgram === "") {
                shaderProgram = "default";
            }
            // Validate Property Defines
            const locals:any = this.locals.getDefines();
            if (locals != null && this._defines != null) {
                const keys:string[] = Object.keys(locals);
                if (keys != null && keys.length > 0) {
                    const source:any = this._defines;
                    for (const key of keys) {
                        source[key] = locals[key];
                    }
                    this._defines.rebuild();
                }
            }
            // Validate Property Uniforms
            let index:number = 0;
            if (this._uniforms != null && this._uniforms.length > 0) {
                for (index = 0; index < this._uniforms.length; index++) {
                    const uniformName = this._uniforms[index];
                    if (uniforms.indexOf(uniformName) === -1) {
                        uniforms.push(uniformName);
                    }
                }
            }
            // Validate Property Samplers
            index = 0;
            if (this._samplers != null && this._samplers.length > 0) {
                for (index = 0; index < this._samplers.length; index++) {
                    const samplerName:string = this._samplers[index];
                    if (samplers.indexOf(samplerName) === -1) {
                        samplers.push(samplerName);
                    }
                }
            }
            // Validate Shader Chunks
            return (this._enableShaderChunks === true) ? this._createShaderChunks(shaderProgram) : shaderProgram;
        }
        private _createShaderChunks(shaderName: string): string {
            if (this._isCreatedShader) {
                return this._createdShaderName;
            }
            this._isCreatedShader = false;
            
            let chunkName:string = this.getShaderChunk();
            if (chunkName == null || chunkName === "") {
                chunkName = shaderName;
            }

            BABYLON.UniversalShaderDefines.ShaderIndexer++;
            const name: string = (chunkName + "Custom" + BABYLON.UniversalShaderDefines.ShaderIndexer).trim();
            const vertex = Effect.ShadersStore[shaderName + "VertexShader"];
            const fragment = Effect.ShadersStore[shaderName + "PixelShader"];

            const vertexname = name + "VertexShader"
            Effect.ShadersStore[vertexname] = vertex
                .replace('#define CUSTOM_VERTEX_BEGIN', (this._materialShaderChunks.Vertex_Begin ? this._materialShaderChunks.Vertex_Begin : ""))
                .replace('#define CUSTOM_VERTEX_DEFINITIONS', (this._materialShaderChunks.Vertex_Definitions ? this._materialShaderChunks.Vertex_Definitions : ""))
                .replace('#define CUSTOM_VERTEX_MAIN_BEGIN', (this._materialShaderChunks.Vertex_MainBegin ? this._materialShaderChunks.Vertex_MainBegin : ""))
                .replace('#define CUSTOM_VERTEX_UPDATE_POSITION', (this._materialShaderChunks.Vertex_Before_PositionUpdated ? this._materialShaderChunks.Vertex_Before_PositionUpdated : ""))
                .replace('#define CUSTOM_VERTEX_UPDATE_NORMAL', (this._materialShaderChunks.Vertex_Before_NormalUpdated ? this._materialShaderChunks.Vertex_Before_NormalUpdated : ""))
                .replace('#define CUSTOM_VERTEX_MAIN_END', (this._materialShaderChunks.Vertex_MainEnd ? this._materialShaderChunks.Vertex_MainEnd : ""));
    
            const fragmentname = name + "PixelShader"
            Effect.ShadersStore[fragmentname] = fragment
                .replace('#define CUSTOM_FRAGMENT_BEGIN', (this._materialShaderChunks.Fragment_Begin ? this._materialShaderChunks.Fragment_Begin : ""))
                .replace('#define CUSTOM_FRAGMENT_DEFINITIONS', (this._materialShaderChunks.Fragment_Definitions ? this._materialShaderChunks.Fragment_Definitions : ""))
                .replace('#define CUSTOM_FRAGMENT_MAIN_BEGIN', (this._materialShaderChunks.Fragment_MainBegin ? this._materialShaderChunks.Fragment_MainBegin : ""))
                .replace('#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE', (this._materialShaderChunks.Fragment_Custom_Diffuse ? this._materialShaderChunks.Fragment_Custom_Diffuse : ""))
                .replace('#define CUSTOM_FRAGMENT_UPDATE_ALPHA', (this._materialShaderChunks.Fragment_Custom_Alpha ? this._materialShaderChunks.Fragment_Custom_Alpha : ""))
                .replace('#define CUSTOM_FRAGMENT_BEFORE_LIGHTS', (this._materialShaderChunks.Fragment_Before_Lights ? this._materialShaderChunks.Fragment_Before_Lights : ""))
                .replace('#define CUSTOM_FRAGMENT_BEFORE_FOG', (this._materialShaderChunks.Fragment_Before_Fog ? this._materialShaderChunks.Fragment_Before_Fog : ""))
                .replace('#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR', (this._materialShaderChunks.Fragment_Before_FragColor ? this._materialShaderChunks.Fragment_Before_FragColor : ""));
    
            this._isCreatedShader = true;
            this._createdShaderName = name;
    
            return name;
        }
        private _attachAfterBind(mesh:BABYLON.Mesh, effect:BABYLON.Effect):void  {
            let name: string;
            const scene:BABYLON.Scene = this.getScene();
            if (scene.texturesEnabled) {
                for (name in this._textures) {
                    const texture:BABYLON.Texture = this._textures[name];
                    if (texture != null) {
                        effect.setTexture(name, texture);
                        effect.setFloat2(name + "Infos", texture.coordinatesIndex, texture.level);
                        effect.setMatrix(name + "Matrix", texture.getTextureMatrix());
                    }
                }
            }
            for (name in this._vectors4) {
                effect.setVector4(name, this._vectors4[name]);
            }
            for (name in this._floats) {
                effect.setFloat(name, this._floats[name]);
            }
        }
        private _setupAttachAfterBind():void {
            const fn_afterBind = this._afterBind;
            this._afterBind = (mesh:BABYLON.Mesh, effect:BABYLON.Effect) => { 
                this._attachAfterBind(mesh, effect);
                if (fn_afterBind) try { fn_afterBind(mesh, effect); }catch(e){};
            };
        }
    }
    BABYLON._TypeStore.RegisteredTypes["UniversalDiffuseMaterial"] = UniversalDiffuseMaterial;
}