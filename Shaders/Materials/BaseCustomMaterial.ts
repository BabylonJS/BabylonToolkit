/** Babylon Toolkit Namespace */
namespace TOOLKIT {
  /**
    * GLTF Custom Shader Material (BABYLON.PBRMaterial)
    * @class CustomShaderMaterial - All rights reserved (c) 2024 Mackey Kinard
    */
  export class CustomShaderMaterial extends BABYLON.PBRMaterial {
    public universalMaterial: boolean = true;
    private _defines: any = {};
    private _uniforms: string[] = [];
    private _samplers: string[] = [];
    private _attributes: string[] = [];
    private _textures: { [name: string]: BABYLON.Texture } = {};
    private _vectors4: { [name: string]: BABYLON.Vector4 } = {};
    private _vectors3: { [name: string]: BABYLON.Vector3 } = {};
    private _vectors2: { [name: string]: BABYLON.Vector2 } = {};
    private _floats: { [name: string]: number } = {};
    private _bools: { [name: string]: boolean } = {};
    private _ubos: TOOLKIT.CustomUniformProperty[] = null;
    protected shader: string = null;
    protected plugin: BABYLON.MaterialPluginBase = null;
    public constructor(name: string, scene: BABYLON.Scene) {
      super(name, scene);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Custom Uniforms And Attributes
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /** Adds a custom attribute property */
    public addAttribute(attributeName: string): void {
      if (this._attributes.indexOf(attributeName) === -1) {
        this._attributes.push(attributeName);
      }
    }
    /** Checks uniform values. Internal Use Only */
    public checkUniform(uniformName: string, type: string, value: any = null): void {
      if (this._uniforms.indexOf(uniformName) === -1) {
        this._uniforms.push(uniformName);
        this._defines[uniformName.toUpperCase()] = true;
        this.buildUniformProperty(uniformName, type, value);
      }
    }
    /** Checks sampler values. Internal Use Only */
    public checkSampler(samplerName: string, texture: any = null): void {
      if (this._samplers.indexOf(samplerName) === -1) {
        this._samplers.push(samplerName);
        this._defines[samplerName.toUpperCase()] = true;
        this.buildUniformProperty(samplerName, "sampler2D", texture);
        this.checkUniform(samplerName + "Infos", "vec2", BABYLON.Vector2.Zero());
        this.checkUniform(samplerName + "Matrix", "mat4", BABYLON.Matrix.Identity()); 
      }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Custom Material Property Functions
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /** Adds a texture uniform property */
    public addTextureUniform(name: string, texture: BABYLON.Texture): TOOLKIT.CustomShaderMaterial {
      this.checkSampler(name, texture);
      this._textures[name] = texture;
      return this;
    }
    /** Sets the texture uniform value */
    public setTextureValue(name: string, texture: BABYLON.Texture): TOOLKIT.CustomShaderMaterial {
      this._textures[name] = texture;
      return this;
    }
    /** Gets the texture uniform value */
    public getTextureValue(name: string): BABYLON.Texture {
      return this._textures[name];
    }
    /** Adds a vector4 uniform property */
    public addVector4Uniform(name: string, value: BABYLON.Vector4): TOOLKIT.CustomShaderMaterial {
      this.checkUniform(name, "vec4", value);
      this._vectors4[name] = value;
      return this;
    }
    /** Sets the vector4 uniform value */
    public setVector4Value(name: string, value: BABYLON.Vector4): TOOLKIT.CustomShaderMaterial {
      this._vectors4[name] = value;
      return this;
    }
    /** Gets the vector4 uniform value */
    public getVector4Value(name: string): BABYLON.Vector4 {
      return this._vectors4[name];
    }
    /** Adds a vector3 uniform property */
    public addVector3Uniform(name: string, value: BABYLON.Vector3): TOOLKIT.CustomShaderMaterial {
      this.checkUniform(name, "vec3", value);
      this._vectors3[name] = value;
      return this;
    }
    /** Sets the vector3 uniform value */
    public setVector3Value(name: string, value: BABYLON.Vector3): TOOLKIT.CustomShaderMaterial {
      this._vectors3[name] = value;
      return this;
    }
    /** Gets the vector3 uniform value */
    public getVector3Value(name: string): BABYLON.Vector3 {
      return this._vectors3[name];
    }
    /** Adds a vector2 uniform property */
    public addVector2Uniform(name: string, value: BABYLON.Vector2): TOOLKIT.CustomShaderMaterial {
      this.checkUniform(name, "vec2", value);
      this._vectors2[name] = value;
      return this;
    }
    /** Sets the vector2 uniform value */
    public setVector2Value(name: string, value: BABYLON.Vector2): TOOLKIT.CustomShaderMaterial {
      this._vectors2[name] = value;
      return this;
    }
    /** Gets the vector2 uniform value */
    public getVector2Value(name: string): BABYLON.Vector2 {
      return this._vectors2[name];
    }
    /** Adds a float uniform property */
    public addFloatUniform(name: string, value: number): TOOLKIT.CustomShaderMaterial {
      this.checkUniform(name, "float", value);
      this._floats[name] = value;
      return this;
    }
    /** Sets the float uniform value */
    public setFloatValue(name: string, value: number): TOOLKIT.CustomShaderMaterial {
      this._floats[name] = value;
      return this;
    }
    /** Gets the float uniform value */
    public getFloatValue(name: string): number {
      return this._floats[name];
    }
    /** Adds a boolean uniform property */
    public addBoolUniform(name: string, value: boolean): TOOLKIT.CustomShaderMaterial {
      this.checkUniform(name, "bool", value);
      this._bools[name] = value;
      return this;
    }
    /** Sets the boolean uniform value */
    public setBoolValue(name: string, value: boolean): TOOLKIT.CustomShaderMaterial {
      this._bools[name] = value;
      return this;
    }
    /** Gets the boolean uniform value */
    public getBoolValue(name: string): boolean {
      return this._bools[name];
    }
    /** Gets the animatables */
    public getAnimatables(): BABYLON.IAnimatable[] {
      const results = super.getAnimatables();
      for (const name in this._textures) {
        const texture: BABYLON.Texture = this._textures[name];
        if (texture && texture.animations && texture.animations.length > 0) results.push(texture);
      }
      return results;
    }
    /** Gets the active textures */
    public getActiveTextures(): BABYLON.BaseTexture[] {
      const results = super.getActiveTextures();
      for (const name in this._textures) {
        const texture: BABYLON.Texture = this._textures[name];
        if (texture) results.push(texture);
      }
      return results;
    }
    /** Has the specified texture */
    public hasTexture(texture: BABYLON.BaseTexture): boolean {
      if (super.hasTexture(texture)) {
        return true;
      }
      let found: boolean = false;
      for (const name in this._textures) {
        const texture: BABYLON.Texture = this._textures[name];
        if (texture === texture) {
          found = true;
          break;
        }
      }
      return found;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Custom Material Update Functions
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /** Gets this custom material uniforms */
    public getCustomUniforms(wgsl: boolean): TOOLKIT.CustomUniformProperty[] {
      let result: TOOLKIT.CustomUniformProperty[] = null;
      if (this._ubos != null && this._ubos.length > 0) {
        // DEPRECATED: return (wgsl === true) ? this._ubos.filter(uniform => uniform.type !== "sampler2D") : null;
        result = this._ubos.filter(uniform => uniform.type !== "sampler2D");
      }
      return result;
    }
    /** Gets this custom material uniforms */
    public getCustomSamplers(): string[] {
      return this._samplers;
    }
    /** Gets this custom material attributes */
    public getCustomAttributes(): string[] {
      return this._attributes;
    }
    /** Gets this custom material vertex source */
    public getCustomVertexCode(wgsl: boolean): string {
      return null;
    }
    /** Gets this custom material fragment source */
    public getCustomFragmentCode(wgsl: boolean): string {
      let result: string = null;
      if (this._ubos != null && this._ubos.length > 0) {
        result = "#ifdef " + this.shader.toUpperCase() + "\n";
        this._ubos.forEach((ubo: TOOLKIT.CustomUniformProperty) => {
          if (wgsl === true) {
            if (ubo.type === "sampler2D") {
              result += "\tvar " + ubo.name + ": texture_2d<f32>;\n";
              result += "\tvar " + ubo.name + "Sampler: sampler;\n";
            }            
          } else {
            if (ubo.type === "float" || ubo.type === "bool" || ubo.type === "int") {
              result += "\tuniform float " + ubo.name + ";\n";
            } else if (ubo.type === "vec2") {
              result += "\tuniform vec2 " + ubo.name + ";\n";
            } else if (ubo.type === "vec3") {
              result += "\tuniform vec3 " + ubo.name + ";\n";
            } else if (ubo.type === "vec4") {
              result += "\tuniform vec4 " + ubo.name + ";\n";
            } else if (ubo.type === "mat4") {
              result += "\tuniform mat4 " + ubo.name + ";\n";
            } else if (ubo.type === "sampler2D") {
              result += "\tuniform sampler2D " + ubo.name + ";\n";
            }
          }
        });
        result += "#endif\n";
      }
      return result;
    }
    /** Prepares the custom material defines */
    public prepareCustomDefines(defines: BABYLON.MaterialDefines): void {
      defines[this.shader.toUpperCase()] = true;
      if (this._defines != null) {
        const keys: string[] = Object.keys(this._defines);
        if (keys != null && keys.length > 0) {
          for (const key of keys) {
            defines[key] = this._defines[key];
          }
        }
      }
      if (defines.isDirty) defines.rebuild();
    }
    /** Update custom material bindings */
    public updateCustomBindings(effect: BABYLON.UniformBuffer): void {
      let name: string;
      const scene: BABYLON.Scene = this.getScene();
      const instance: TOOLKIT.CustomShaderMaterial = this;
      if (instance["update"]) instance["update"]();
      if (scene.texturesEnabled) {
        for (name in this._textures) {
          const texture: BABYLON.Texture = this._textures[name];
          if (texture != null && texture.isReady && texture.isReady()) {
            if ((<any>texture).isChecked == null) {
              (<any>texture).isChecked = true;
              if (name === "detailsSampler" || name === "normalsSampler" || name.indexOf("(Atlas)") >= 0) {
                texture.updateSamplingMode(8); // Note: Texture Atlas Sampling Mode - Nearest & Linear
              }
            }
            effect.setTexture(name, texture);
            effect.updateFloat2(name + "Infos", texture.coordinatesIndex, texture.level);
            effect.updateMatrix(name + "Matrix", texture.getTextureMatrix());
          }
        }
      }
      for (name in this._vectors4) {
        effect.updateVector4(name, this._vectors4[name]);
      }
      for (name in this._vectors3) {
        effect.updateVector3(name, this._vectors3[name]);
      }
      for (name in this._vectors2) {
        effect.updateFloat2(name, this._vectors2[name].x, this._vectors2[name].y);
      }
      for (name in this._floats) {
        effect.updateFloat(name, this._floats[name]);
      }
      for (name in this._bools) {
        effect.updateFloat(name, this._bools[name] ? 1.0 : 0.0);
      }
      effect.update(); // Ensure the uniform buffer is updated on the GPU
    }
    /** Builds a custom uniform property */
    protected buildUniformProperty(uniformName: string, uniformType: string, uniformValue: any): void {
      let uniformSize: number = 1;
      switch (uniformType) {
        case "float": uniformSize = 1; break;
        case "bool": uniformSize = 1; break;
        case "int": uniformSize = 1; break;
        case "vec2": uniformSize = 2; break;
        case "vec3": uniformSize = 3; break;
        case "vec4": uniformSize = 4; break;
        case "mat4": uniformSize = 16; break;
      }
      if (this._ubos == null) this._ubos = [];
      this._ubos.push({ name: uniformName, size: uniformSize, type: uniformType });
    }
  }
  TOOLKIT.SceneManager.RegisterClass("TOOLKIT.CustomShaderMaterial", CustomShaderMaterial);
  /**
    * GLTF Custom Shader Material Plugin (BABYLON.MaterialPluginBase)
    * @class CustomShaderMaterialPlugin - All rights reserved (c) 2024 Mackey Kinard
    */
  export class CustomShaderMaterialPlugin extends BABYLON.MaterialPluginBase {
    private _isEnabled: boolean = false;
    /**
     * Creates a new material plugin
     * @param material parent material of the plugin
     * @param name name of the plugin
     * @param priority priority of the plugin
     * @param defines list of defines used by the plugin. The value of the property is the default value for this property
     * @param addToPluginList true to add the plugin to the list of plugins managed by the material plugin manager of the material (default: true)
     * @param enable true to enable the plugin (it is handy if the plugin does not handle properties to switch its current activation)
     * @param resolveIncludes Indicates that any #include directive in the plugin code must be replaced by the corresponding code (default: false)
     */
    public constructor(material: BABYLON.Material, name: string, priority: number, defines?: {}, addToPluginList: boolean = true, enable: boolean = true, resolveIncludes: boolean = false) {
      super(material, name, priority, defines, addToPluginList, enable, resolveIncludes);
      this.isEnabled = enable;
    }
    public get isEnabled() { return this._isEnabled; }
    public set isEnabled(enabled) {
      if (this._isEnabled === enabled) return;
      this._isEnabled = enabled;
      this.markAllDefinesAsDirty();
      this._enable(this._isEnabled);
    }
    public vertexDefinitions: string = null;
    public fragmentDefinitions: string = null;
    /** Gets a reference to the custom shader material */
    public getCustomShaderMaterial(): TOOLKIT.CustomShaderMaterial {
      return (this._material as TOOLKIT.CustomShaderMaterial);
    }
  }
  TOOLKIT.SceneManager.RegisterClass("TOOLKIT.CustomShaderMaterialPlugin", CustomShaderMaterialPlugin);
  /**
   * Babylon custom uniform items (GLTF)
   */
  export type CustomUniformProperty = { name: string; size: number; type: string; arraySize?: number; }
}
