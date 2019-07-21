/// <reference path="babylon.d.ts" />
/// <reference path="babylon.scenecomponents.ts" />
/// <reference path="babylon.scenemanager.ts" />

module BABYLON {
    /* Universal Material Define Support */
    export class UniversalShaderDefines {
        private _defines:any = {}
        constructor() {
            this._defines = {};
        }
        public getDefines(): any {
            return this._defines;
        }
        public resetDefines(): any {
            return this._defines = {};
        }
        public defineBoolean(name:string) : void {
            this._defines[name] = true;
        }
        public defineNumeric(name:string, value:number) : void {
            this._defines[name] = value;
        }
    }
    
    /* Universal Push Material With Life Cycle Support */
    export class UniversalPushMaterial extends BABYLON.PushMaterial {
        protected start(): void { }
        protected update(): void { }
        protected after(): void { }
        protected destroy(): void { }
        protected ticking:boolean = false;
        constructor(name: string, scene: BABYLON.Scene, tick:boolean = false) {
            super(name, scene);
            this.ticking = tick;
            if (this.ticking) this.initializeInstance();
        }

        private _manager: BABYLON.SceneManager = null;
        public getManager(): BABYLON.SceneManager {
            if (this._manager == null) {
                this._manager = BABYLON.SceneManager.GetInstance();
            }
            return this._manager;
        }
        
        private _started: boolean = false;
        private _register: () => void = null;
        private _before: () => void = null;
        private _after: () => void = null;
        private _destroy: () => void = null;
        private initializeInstance() : void {
            this._started = false;
            // ..
            // TODO: Optimize life-cycle instance Handling
            // ..
            const me: BABYLON.UniversalPushMaterial = this;
            me._register = function () { me.registerInstance(me); };
            me._before = function () { me.updateInstance(me); };
            me._after = function () { me.afterInstance(me); };
            me._destroy = function () { me.destoryInstance(me); };
            me._register();
        }

        private registerInstance(me: BABYLON.UniversalPushMaterial): void {
            me.getScene().registerBeforeRender(me._before);
            me.getScene().registerAfterRender(me._after);
        }

        private updateInstance(me: BABYLON.UniversalPushMaterial): void {
            if (!me._started) {
                me.start();
                me._started = true;
            } else {
                me.update();
            }
        }
        
        private afterInstance(me: BABYLON.UniversalPushMaterial): void {
            if (me._started) {
                me.after();
            }
        }
        
        private destoryInstance(me: BABYLON.UniversalPushMaterial) {
            me.getScene().unregisterBeforeRender(me._before);
            me.getScene().unregisterAfterRender(me._after);
            me.destroy();
            me._started = false;
            me._register = null;
            me._before = null;
            me._after = null;
            me._destroy = null;
        }

        public dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean) : void {
            this._destroy();
            super.dispose(forceDisposeEffect, forceDisposeTextures);
        }
    }

    /* Universal Shader Material With Life Cycle Support */
    export class UniversalShaderMaterial extends BABYLON.StandardMaterial {
        protected tick:boolean = true;
        protected start(): void { }
        protected update(): void { }
        protected define(locals:BABYLON.UniversalShaderDefines):void {}
        protected after(): void { }
        protected destroy(): void { }
        protected ticking:boolean = false;
        protected program:string = "default";
        private _locals:BABYLON.UniversalShaderDefines = null;
        constructor(name: string, scene: BABYLON.Scene, tick:boolean = false) {
            super(name, scene);
            this._locals = new BABYLON.UniversalShaderDefines();
            this.customShaderNameResolve = this._buildCustomShader;
            this.ticking = tick;
            if (this.ticking) this.initializeInstance();
        }
        
        /* Shader Material Property Define Functions */

        private _uniforms:string[] = [];
        private _samplers:string[] = [];
        private _textures: { [name: string]: BABYLON.Texture } = {};
        private _textureArrays: { [name: string]: BABYLON.Texture[] } = {};
        private _floats: { [name: string]: number } = {};
        private _floatsArrays: { [name: string]: number[] } = {};
        private _colors3: { [name: string]: BABYLON.Color3 } = {};
        private _colors4: { [name: string]: BABYLON.Color4 } = {};
        private _vectors2: { [name: string]: BABYLON.Vector2 } = {};
        private _vectors3: { [name: string]: BABYLON.Vector3 } = {};
        private _vectors4: { [name: string]: BABYLON.Vector4 } = {};
        private _matrices: { [name: string]: BABYLON.Matrix } = {};
        private _matrices3x3: { [name: string]: Float32Array } = {};
        private _matrices2x2: { [name: string]: Float32Array } = {};
        private _vectors3Arrays: { [name: string]: number[] } = {};

        public get textures():{ [name: string]: BABYLON.Texture } {
            return this._textures;
        }
        public get textureArray():{ [name: string]: BABYLON.Texture[] } {
            return this._textureArrays;
        }
        public get floats():{ [name: string]: number } {
            return this._floats;
        }
        public get floatsArrays():{ [name: string]: number[] } {
            return this._floatsArrays;
        }
        public get colors3():{ [name: string]: BABYLON.Color3 } {
            return this._colors3;
        }
        public get colors4():{ [name: string]: BABYLON.Color4 } {
            return this._colors4;
        }
        public get vectors2():{ [name: string]: BABYLON.Vector2 } {
            return this._vectors2;
        }
        public get vectors3():{ [name: string]: BABYLON.Vector3 } {
            return this._vectors3;
        }
        public get vectors4():{ [name: string]: BABYLON.Vector4 } {
            return this._vectors4;
        }
        public get matrices():{ [name: string]: BABYLON.Matrix } {
            return this._matrices;
        }
        public get matrices3x3():{ [name: string]: Float32Array } {
            return this._matrices3x3;
        }
        public get matrices2x2():{ [name: string]: Float32Array } {
            return this._matrices2x2;
        }
        public get vectors3Arrays():{ [name: string]: number[] } {
            return this._vectors3Arrays;
        }

        /* Shader Material Property Accessor Functions */

        public setTexture(name: string, texture: BABYLON.Texture): BABYLON.UniversalShaderMaterial {
            this._checkSampler(name);
            this._textures[name] = texture;
            return this;
        }

        public setTextureArray(name: string, textures: BABYLON.Texture[]): BABYLON.UniversalShaderMaterial {
            if (this._samplers.indexOf(name) === -1) {
                this._samplers.push(name);
            }
            this._checkUniform(name);
            this._textureArrays[name] = textures;
            return this;
        }

        public setFloat(name: string, value: number): BABYLON.UniversalShaderMaterial {
            this._checkUniform(name);
            this._floats[name] = value;
            return this;
        }

        public setFloats(name: string, value: number[]): BABYLON.UniversalShaderMaterial {
            this._checkUniform(name);
            this._floatsArrays[name] = value;
            return this;
        }

        public setColor3(name: string, value: BABYLON.Color3): BABYLON.UniversalShaderMaterial {
            this._checkUniform(name);
            this._colors3[name] = value;
            return this;
        }

        public setColor4(name: string, value: BABYLON.Color4): BABYLON.UniversalShaderMaterial {
            this._checkUniform(name);
            this._colors4[name] = value;
            return this;
        }

        public setVector2(name: string, value: BABYLON.Vector2): BABYLON.UniversalShaderMaterial {
            this._checkUniform(name);
            this._vectors2[name] = value;
            return this;
        }

        public setVector3(name: string, value: BABYLON.Vector3): BABYLON.UniversalShaderMaterial {
            this._checkUniform(name);
            this._vectors3[name] = value;
            return this;
        }

        public setVector4(name: string, value: BABYLON.Vector4): BABYLON.UniversalShaderMaterial {
            this._checkUniform(name);
            this._vectors4[name] = value;
            return this;
        }

        public setMatrix(name: string, value: BABYLON.Matrix): BABYLON.UniversalShaderMaterial {
            this._checkUniform(name);
            this._matrices[name] = value;
            return this;
        }

        public setMatrix3x3(name: string, value: Float32Array): BABYLON.UniversalShaderMaterial {
            this._checkUniform(name);
            this._matrices3x3[name] = value;
            return this;
        }

        public setMatrix2x2(name: string, value: Float32Array): BABYLON.UniversalShaderMaterial {
            this._checkUniform(name);
            this._matrices2x2[name] = value;
            return this;
        }

        public setArray3(name: string, value: number[]): BABYLON.UniversalShaderMaterial {
            this._checkUniform(name);
            this._vectors3Arrays[name] = value;
            return this;
        }

        /* Shader Material Base Worker Functions */
        
        public isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean {
            this._locals.resetDefines();
            this.define(this._locals);
            // Custom shader properties
            let needUVs = false;
            let scene = this.getScene();
            if (scene.texturesEnabled) {
                let name: string;
                let ready:boolean = true;
                // Check all texture items
                for (name in this._textures) {
                    let texture:BABYLON.BaseTexture = this._textures[name];
                    if (texture && texture.isReadyOrNotBlocking()) {
                        needUVs = true;
                        this._locals.defineBoolean(name + "Def");
                        this._checkUniform(name + "Infos");
                        this._checkUniform(name + "Scale");
                        this._checkUniform(name + "Matrix");
                    } else {
                        ready = false;
                    }
                }
                if (!ready) return false;
                ready = true;
                // Check all texture array items
                for (name in this._textureArrays) {
                    this._locals.defineBoolean(name + "Def");
                    let array = this._textureArrays[name];
                    for (let index = 0; index < array.length; index++) {
                        let texture_x:BABYLON.Texture = array[index];
                        if (texture_x && texture_x.isReadyOrNotBlocking()) {
                            needUVs = true;
                        } else {
                            ready = false;
                        }
                    }
                }
                if (!ready) return false;
            }            
            return super.isReadyForSubMesh(mesh, subMesh, useInstances);
        }

        public getAnimatables(): IAnimatable[] {
            let results = super.getAnimatables();
            // Custom shader properties
            let name: string;
            for (name in this._textures) {
                let texture:BABYLON.Texture = this._textures[name];
                if (texture) {
                    results.push(texture);
                }
            }
            for (name in this._textureArrays) {
                let array = this._textureArrays[name];
                for (let index = 0; index < array.length; index++) {
                    let texture:BABYLON.Texture = array[index];
                    if (texture) {
                        results.push(texture);
                    }
                }
            }
            return results;
        }

        public getActiveTextures(): BaseTexture[] {
            let results = super.getActiveTextures();
            // Custom shader properties
            let name: string;
            for (name in this._textures) {
                let texture:BABYLON.Texture = this._textures[name];
                if (texture) {
                    results.push(texture);
                }
            }
            for (name in this._textureArrays) {
                let array = this._textureArrays[name];
                for (let index = 0; index < array.length; index++) {
                    let texture:BABYLON.Texture = array[index];
                    if (texture) {
                        results.push(texture);
                    }
                }
            }
            return results;
        }

        public hasTexture(texture: BaseTexture): boolean {
            if (super.hasTexture(texture)) {
                return true;
            }
            // Custom shader properties
            let name: string;
            let found:boolean = false;
            for (name in this._textures) {
                let tex:BABYLON.Texture = this._textures[name];
                if (tex && tex === texture) {
                    found = true;
                    break;
                }
            }
            if (found === false) {
                for (name in this._textureArrays) {
                    let array = this._textureArrays[name];
                    for (let index = 0; index < array.length; index++) {
                        let tx2:BABYLON.Texture = array[index];
                        if (tx2 && tx2 === texture) {
                            found = true;
                            break;
                        }
                    }
                    if (found === true) break;
                }
            }
            return found;    
        }        

        /* Shader Material Factory Class Functions */

        public clone(name: string): BABYLON.UniversalShaderMaterial {
            let result = BABYLON.SerializationHelper.Clone(() => new BABYLON.UniversalShaderMaterial(name, this.getScene()), this);
            BABYLON.UniversalShaderMaterial.CloneCustomProperties(this, result);            
            return result;
        }

        public serialize(): any {
            let serializationObject = BABYLON.SerializationHelper.Serialize(this);
            serializationObject.customType = "BABYLON.UniversalShaderMaterial";
            BABYLON.UniversalShaderMaterial.SerializeCustomProperties(this, serializationObject);            
            return serializationObject;
        }

        public static Parse(source: any, scene: BABYLON.Scene, rootUrl: string): BABYLON.UniversalShaderMaterial {
            let material =  BABYLON.SerializationHelper.Parse(() => new BABYLON.UniversalShaderMaterial(source.name, scene), source, scene, rootUrl);
            BABYLON.UniversalShaderMaterial.ParseCustomProperties(material, source, scene, rootUrl);
            return material;
        }
        
        /* Shader Material Factory Helper Functions */

        public static CloneCustomProperties(material: UniversalShaderMaterial, destination:UniversalShaderMaterial): void {
            if (material != null && destination != null) {
                // Custom shader properties
                let name: string;
                destination._textures = {};
                for (name in material._textures) {
                    let texture:BABYLON.Texture = material._textures[name];
                    if (texture) {
                        destination.setTexture(name, texture.clone());
                    }
                }
                // Arrays
                destination._textureArrays = {};
                for (name in material._textureArrays) {
                    destination._textureArrays[name] = [];
                    let array = material._textureArrays[name];
                    let textureArray = new Array<Texture>();
                    for (let index = 0; index < array.length; index++) {
                        textureArray.push(array[index].clone());
                    }
                    destination.setTextureArray(name, textureArray);
                }
                // Float    
                destination._floats = {};
                for (name in material._floats) {
                    destination.setFloat(name, material._floats[name]);
                }
                // Floats   
                destination._floatsArrays = {};
                for (name in material._floatsArrays) {
                    destination.setFloats(name, material._floatsArrays[name]);
                }
                // Color3    
                destination._colors3 = {};
                for (name in material._colors3) {
                    destination.setColor3(name, material._colors3[name].clone());
                }
                // Color4  
                destination._colors4 = {};
                for (name in material._colors4) {
                    destination.setColor4(name, material._colors4[name].clone());
                }
                // Vector2  
                destination._vectors2 = {};
                for (name in material._vectors2) {
                    destination.setVector2(name, material._vectors2[name].clone());
                }
                // Vector3        
                destination._vectors3 = {};
                for (name in material._vectors3) {
                    destination.setVector3(name, material._vectors3[name].clone());
                }
                // Vector4        
                destination._vectors4 = {};
                for (name in material._vectors4) {
                    destination.setVector4(name, material._vectors4[name].clone());
                }
                // Matrix      
                destination._matrices = {};
                for (name in material._matrices) {
                    destination.setMatrix(name, material._matrices[name].clone());
                }
                // Matrix 3x3
                destination._matrices3x3 = {};
                for (name in material._matrices3x3) {
                    destination.setMatrix3x3(name, material._matrices3x3[name]);
                }
                // Matrix 2x2
                destination._matrices2x2 = {};
                for (name in material._matrices2x2) {
                    destination.setMatrix2x2(name, material._matrices2x2[name]);
                }
                // Vector3Array
                destination._vectors3Arrays = {};
                for (name in material._vectors3Arrays) {
                    destination.setArray3(name, material._vectors3Arrays[name]);
                }
            }
        }
        
        public static SerializeCustomProperties(material: UniversalShaderMaterial, serializationObject:any): void {
            if (serializationObject != null && material != null) {
                // Custom shader properties
                let name: string;
                serializationObject.textures = {};
                for (name in material._textures) {
                    let texture:BABYLON.Texture = material._textures[name];
                    if (texture) {
                        serializationObject.textures[name] = texture.serialize();
                    }
                }
                // Arrays
                serializationObject.textureArrays = {};
                for (name in material._textureArrays) {
                    serializationObject.textureArrays[name] = [];
                    let array = material._textureArrays[name];
                    for (let index = 0; index < array.length; index++) {
                        serializationObject.textureArrays[name].push(array[index].serialize());
                    }
                }
                // Float    
                serializationObject.floats = {};
                for (name in material._floats) {
                    serializationObject.floats[name] = material._floats[name];
                }
                // Floats   
                serializationObject.floatsArrays = {};
                for (name in material._floatsArrays) {
                    serializationObject.floatsArrays[name] = material._floatsArrays[name];
                }
                // Color3    
                serializationObject.colors3 = {};
                for (name in material._colors3) {
                    serializationObject.colors3[name] = material._colors3[name].asArray();
                }
                // Color4  
                serializationObject.colors4 = {};
                for (name in material._colors4) {
                    serializationObject.colors4[name] = material._colors4[name].asArray();
                }
                // Vector2  
                serializationObject.vectors2 = {};
                for (name in material._vectors2) {
                    serializationObject.vectors2[name] = material._vectors2[name].asArray();
                }
                // Vector3        
                serializationObject.vectors3 = {};
                for (name in material._vectors3) {
                    serializationObject.vectors3[name] = material._vectors3[name].asArray();
                }
                // Vector4        
                serializationObject.vectors4 = {};
                for (name in material._vectors4) {
                    serializationObject.vectors4[name] = material._vectors4[name].asArray();
                }
                // Matrix      
                serializationObject.matrices = {};
                for (name in material._matrices) {
                    serializationObject.matrices[name] = material._matrices[name].asArray();
                }
                // Matrix 3x3
                serializationObject.matrices3x3 = {};
                for (name in material._matrices3x3) {
                    serializationObject.matrices3x3[name] = material._matrices3x3[name];
                }
                // Matrix 2x2
                serializationObject.matrices2x2 = {};
                for (name in material._matrices2x2) {
                    serializationObject.matrices2x2[name] = material._matrices2x2[name];
                }
                // Vector3Array
                serializationObject.vectors3Arrays = {};
                for (name in material._vectors3Arrays) {
                    serializationObject.vectors3Arrays[name] = material._vectors3Arrays[name];
                }
            }
        }
        
        public static ParseCustomProperties(material: UniversalShaderMaterial, source:any, scene: BABYLON.Scene, rootUrl: string): void {
            if (source != null && material != null) {
                let name: string;
                for (name in source.textures) {
                    let texture:BABYLON.Texture = source.textures[name];
                    if (texture) {
                        material.setTexture(name, <BABYLON.Texture>Texture.Parse(texture, scene, rootUrl));
                    }
                }
                // Arrays
                for (name in source.textureArrays) {
                    let array = source.textureArrays[name];
                    let textureArray = new Array<Texture>();
                    for (let index = 0; index < array.length; index++) {
                        textureArray.push(<Texture>Texture.Parse(array[index], scene, rootUrl));
                    }
                    material.setTextureArray(name, textureArray);
                }
                // Float    
                for (name in source.floats) {
                    material.setFloat(name, source.floats[name]);
                }
                // Floats   
                for (name in source.floatsArrays) {
                    material.setFloats(name, source.floatsArrays[name]);
                }
                // Color3        
                for (name in source.colors3) {
                    material.setColor3(name, BABYLON.Color3.FromArray(source.colors3[name]));
                }
                // Color4      
                for (name in source.colors4) {
                    material.setColor4(name, BABYLON.Color4.FromArray(source.colors4[name]));
                }
                // Vector2        
                for (name in source.vectors2) {
                    material.setVector2(name, BABYLON.Vector2.FromArray(source.vectors2[name]));
                }
                // Vector3        
                for (name in source.vectors3) {
                    material.setVector3(name, BABYLON.Vector3.FromArray(source.vectors3[name]));
                }
                // Vector4        
                for (name in source.vectors4) {
                    material.setVector4(name, BABYLON.Vector4.FromArray(source.vectors4[name]));
                }
                // Matrix      
                for (name in source.matrices) {
                    material.setMatrix(name, BABYLON.Matrix.FromArray(source.matrices[name]));
                }
                // Matrix 3x3
                for (name in source.matrices3x3) {
                    material.setMatrix3x3(name, source.matrices3x3[name]);
                }
                // Matrix 2x2
                for (name in source.matrices2x2) {
                    material.setMatrix2x2(name, source.matrices2x2[name]);
                }
                // Vector3Array
                for (name in source.vectors3Arrays) {
                    material.setArray3(name, source.vectors3Arrays[name]);
                }
            }
        }
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////  Scene Manager Funtion  ////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private _manager: BABYLON.SceneManager = null;
        public getManager(): BABYLON.SceneManager {
            if (this._manager == null) {
                this._manager = BABYLON.SceneManager.GetInstance();
            }
            return this._manager;
        }
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////  Private Worker Funtions  ///////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        private _checkUniform(uniformName): void {
            if (this._uniforms.indexOf(uniformName) === -1) {
                this._uniforms.push(uniformName);
            }
        }

        private _checkSampler(samplerName): void {
            if (this._samplers.indexOf(samplerName) === -1) {
                this._samplers.push(samplerName);
            }
        }

        private _buildCustomShader(shaderName: string, uniforms: string[], uniformBuffers: string[], samplers: string[], defines: BABYLON.StandardMaterialDefines) : string {
            if (this.program == null || this.program === "") {
                this.program = "default";
            }
            // Attach Property Defines
            let locals:any = this._locals.getDefines();
            if (locals != null) {
                let keys:string[] = Object.keys(locals);
                if (keys != null && keys.length > 0) {
                    let source:any = defines;
                    for (let key of keys) {
                        source[key] = locals[key];
                    }
                    defines.rebuild();
                }
            }
            // Attach Property Uniforms
            let index:number = 0;
            if (this._uniforms != null && this._uniforms.length > 0) {
                for (index = 0; index < this._uniforms.length; index++) {
                    uniforms.push(this._uniforms[index]);
                }
            }
            // Attach Property Samplers
            index = 0;
            if (this._samplers != null && this._samplers.length > 0) {
                for (index = 0; index < this._samplers.length; index++) {
                    samplers.push(this._samplers[index]);
                }
            }
            // Attach Property Bindings
            let fn_afterBind = this._afterBind;
            this._afterBind = (mesh:BABYLON.Mesh, effect:BABYLON.Effect) => { 
                this._attachAfterBind(mesh, effect);
                if (fn_afterBind) try{ fn_afterBind(mesh, effect); }catch(e){};
            };
            return this.program;
        }

        public _attachAfterBind(mesh:BABYLON.Mesh, effect:BABYLON.Effect):void  {
            let scene:BABYLON.Scene = this.getScene();
            // Custom shader properties
            let name: string;
            if (scene.texturesEnabled) {
                for (name in this._textures) {
                    let texture:BABYLON.Texture = this._textures[name];
                    if (texture) {
                        effect.setTexture(name, texture);
                        effect.setFloat2(name + "Infos", texture.coordinatesIndex, texture.level);
                        effect.setFloat2(name + "Scale", texture.uScale, texture.vScale);
                        effect.setMatrix(name + "Matrix", texture.getTextureMatrix());
                    }
                }
            }
            // Arrays
            if (scene.texturesEnabled) {
                for (name in this._textureArrays) {
                    effect.setTextureArray(name, this._textureArrays[name]);
                }
            }
            // Float    
            for (name in this._floats) {
                effect.setFloat(name, this._floats[name]);
            }
            // Float s   
            for (name in this._floatsArrays) {
                effect.setArray(name, this._floatsArrays[name]);
            }
            // Color3        
            for (name in this._colors3) {
                effect.setColor3(name, this._colors3[name]);
            }
            // Color4      
            for (name in this._colors4) {
                let color = this._colors4[name];
                effect.setFloat4(name, color.r, color.g, color.b, color.a);
            }
            // Vector2        
            for (name in this._vectors2) {
                effect.setVector2(name, this._vectors2[name]);
            }
            // Vector3        
            for (name in this._vectors3) {
                effect.setVector3(name, this._vectors3[name]);
            }
            // Vector4        
            for (name in this._vectors4) {
                effect.setVector4(name, this._vectors4[name]);
            }
            // Matrix      
            for (name in this._matrices) {
                effect.setMatrix(name, this._matrices[name]);
            }
            // Matrix 3x3
            for (name in this._matrices3x3) {
                effect.setMatrix3x3(name, this._matrices3x3[name]);
            }
            // Matrix 2x2
            for (name in this._matrices2x2) {
                effect.setMatrix2x2(name, this._matrices2x2[name]);
            }
            // Vector3Array   
            for (name in this._vectors3Arrays) {
                effect.setArray3(name, this._vectors3Arrays[name]);
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////  Component Life - Cycle  ////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private _started: boolean = false;
        private _register: () => void = null;
        private _before: () => void = null;
        private _after: () => void = null;
        private _destroy: () => void = null;
        
        private initializeInstance() : void {
            this._started = false;
            let me: BABYLON.UniversalShaderMaterial = this;
            me._register = function () { me.registerInstance(me); };
            me._before = function () { me.updateInstance(me); };
            me._after = function () { me.afterInstance(me); };
            me._destroy = function () { me.destoryInstance(me); };
            me._register();
        }

        private registerInstance(me: BABYLON.UniversalShaderMaterial): void {
            me.getScene().registerBeforeRender(me._before);
            me.getScene().registerAfterRender(me._after);
        }

        private updateInstance(me: BABYLON.UniversalShaderMaterial): void {
            if (!me._started) {
                me.start();
                me._started = true;
            } else {
                me.update();
            }
        }
        
        private afterInstance(me: BABYLON.UniversalShaderMaterial): void {
            if (me._started) {
                me.after();
            }
        }
        
        private destoryInstance(me: BABYLON.UniversalShaderMaterial) {
            me.getScene().unregisterBeforeRender(me._before);
            me.getScene().unregisterAfterRender(me._after);
            me.destroy();
            me._started = false;
            me._register = null;
            me._before = null;
            me._after = null;
            me._destroy = null;
        }

        public dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void {
            if (forceDisposeTextures) {
                // Custom shader properties
                let name: string;
                for (name in this._textures) {
                    let texture:BABYLON.Texture = this._textures[name];
                    if (texture) {
                        texture.dispose();
                    }
                    this._textures[name] = null;
                }
                for (name in this._textureArrays) {
                    let array = this._textureArrays[name];
                    for (let index = 0; index < array.length; index++) {
                        array[index].dispose();
                    }
                }
            }
            this._textures = {};
            this._destroy();
            super.dispose(forceDisposeEffect, forceDisposeTextures);
        }
    }

    /* Universal Shader Material Define Support */
    export class UniversalTerrainMaterial extends BABYLON.UniversalShaderMaterial {
        private _totalTexturesLoaded:number = 0;
        private _maxTexturesImageUnits:number = 0;
        public get totalTexturesLoaded(): number { return this._totalTexturesLoaded; }
        public get maxTexturesImageUnits(): number { return this._maxTexturesImageUnits; }
        constructor(name: string, scene: BABYLON.Scene, tick:boolean = true) {
            super(name, scene, tick);
            this.program = "splatmap";
            let engine = scene.getEngine();
            let caps:BABYLON.EngineCapabilities = engine.getCaps();
            this._totalTexturesLoaded = 0;
            this._maxTexturesImageUnits = caps.maxTexturesImageUnits;
        }

        /* Terrain Material Life Cycle Functions */

        protected start() {
            this._totalTexturesLoaded =  0;
            if (this.diffuseTexture) this._totalTexturesLoaded++;
            if (this.bumpTexture) this._totalTexturesLoaded++;
            if (this.lightmapTexture) this._totalTexturesLoaded++;
            if (this.reflectionTexture) this._totalTexturesLoaded++;
            if (this.emissiveTexture) this._totalTexturesLoaded++;
            if (this.specularTexture) this._totalTexturesLoaded++;
            if (this.ambientTexture) this._totalTexturesLoaded++;
            if (this.opacityTexture) this._totalTexturesLoaded++;
            if (this.refractionTexture) this._totalTexturesLoaded++;
            if (this.cameraColorGradingTexture) this._totalTexturesLoaded++;
            let name: string;
            for (name in this.textures) {
                let texture:BABYLON.Texture = this.textures[name];
                if (texture) this._totalTexturesLoaded++;
            }
            for (name in this.textureArray) {
                let textures:BABYLON.Texture[] = this.textureArray[name];
                if (textures) {
                    textures.forEach((texture) => {
                        if (texture) this._totalTexturesLoaded++;
                    });
                }
            }
            if (this.totalTexturesLoaded > this.maxTexturesImageUnits) {
                BABYLON.Tools.Warn("Babylon.js max terrain texture units exceeded (" + this.totalTexturesLoaded.toString() + " of " + this.maxTexturesImageUnits.toString()+ ")");
            }
        }

        protected define(locals:BABYLON.UniversalShaderDefines):void {
            locals.defineNumeric("TOTAL_TEXTURES_LOADED", this.totalTexturesLoaded);
            locals.defineNumeric("MAX_TEXTURE_IMAGE_UNITS", this.maxTexturesImageUnits);
            if (this.totalTexturesLoaded <= this.maxTexturesImageUnits) {
                locals.defineBoolean("SPLATMAPS_ENABLED");
            }                
        }

        /* Shader Material Factory Class Functions */

        public clone(name: string): BABYLON.UniversalTerrainMaterial {
            let result = BABYLON.SerializationHelper.Clone(() => new BABYLON.UniversalTerrainMaterial(name, this.getScene()), this);
            BABYLON.UniversalShaderMaterial.CloneCustomProperties(this, result);            
            return result;
        }

        public serialize(): any {
            let serializationObject = BABYLON.SerializationHelper.Serialize(this);
            serializationObject.customType = "BABYLON.UniversalTerrainMaterial";
            BABYLON.UniversalShaderMaterial.SerializeCustomProperties(this, serializationObject);            
            return serializationObject;
        }

        public static Parse(source: any, scene: BABYLON.Scene, rootUrl: string): BABYLON.UniversalTerrainMaterial {
            let material = BABYLON.SerializationHelper.Parse(() => new BABYLON.UniversalTerrainMaterial(source.name, scene), source, scene, rootUrl);
            BABYLON.UniversalShaderMaterial.ParseCustomProperties(material, source, scene, rootUrl);
            return material;
        }
    }
} 
