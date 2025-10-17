namespace TOOLKIT {
  /**
    * Babylon universal terrain material pro class
    * @class UniversalTerrainMaterial - All rights reserved (c) 2024 Mackey Kinard
    */
  export class UniversalTerrainMaterial extends TOOLKIT.CustomShaderMaterial {
    protected terrainInfo: any = null;

    public constructor(name: string, scene: BABYLON.Scene) {
      super(name, scene);
      this.shader = this.getClassName();
      this.plugin = new TOOLKIT.UniversalTerrainMaterialPlugin(this, this.shader);
    }

    public update(): void {
      /* Update values before binding */
    }

    public getClassName(): string {
      return "UniversalTerrainMaterial";
    }

    public getTerrainInfo(): any {
      return this.terrainInfo;
    }
  }
  TOOLKIT.SceneManager.RegisterClass("TOOLKIT.UniversalTerrainMaterial", UniversalTerrainMaterial);
  /**
   * Custom Shader Material Plugin (BABYLON.MaterialPluginBase)
   * @class UniversalTerrainMaterialPlugin
   */
  export class UniversalTerrainMaterialPlugin extends TOOLKIT.CustomShaderMaterialPlugin {
    private colorName: string = "surfaceAlbedo";
    private splatmapSampler: string = "splatmapSampler";
    private detailsSampler: string = "detailsSampler";
    private normalsSampler: string = "normalsSampler";
    private GLSL_CustomFragment: string = null;
    private GLSL_CustomVertex: string = null;
    private GLSL_VertexMainEnd: string = null;
    private GLSL_FragmentUpdateColor: string = null;
    private WGSL_CustomFragment: string = null;
    private WGSL_CustomVertex: string = null;
    private WGSL_VertexMainEnd: string = null;
    private WGSL_FragmentUpdateColor: string = null;
    public constructor(customMaterial: TOOLKIT.CustomShaderMaterial, shaderName: string) {
      // The second parameter is the name of this plugin.
      // The third one is a priority, which lets you define the order multiple plugins are run. Lower numbers run first.
      // The fourth one is a list of defines used in the shader code.
      super(customMaterial, shaderName, 100, { UNIVERSALTERRAINMATERIAL: false });
    }

    public isCompatible(shaderLanguage: BABYLON.ShaderLanguage): boolean {
      return (shaderLanguage === BABYLON.ShaderLanguage.WGSL || shaderLanguage === BABYLON.ShaderLanguage.GLSL);
    }

    public getClassName(): string {
      return "UniversalTerrainMaterialPlugin";
    }

    /** This is used to create custom shader code
     * 
     *  WGSL - To sample a texture in a shader, you need to use the `textureSample` function.
     *  let customColor: vec4<f32> = textureSample(testTexture, testTextureSampler, fragmentInputs.vAlbedoUV);
     * 
     *  GLSL - To sample a texture in a shader, you need to use the `texture2D` function.
     *  vec4 customColor = texture2D(testTexture, vAlbedoUV);
     * 
     */
    public getCustomCode(shaderType: string, shaderLanguage: BABYLON.ShaderLanguage): any {
      const terrainInfo: any = (this.getCustomShaderMaterial() as TOOLKIT.UniversalTerrainMaterial).getTerrainInfo();
      if (shaderType === "vertex") {
        if (shaderLanguage === BABYLON.ShaderLanguage.WGSL) {
          if (this.WGSL_CustomVertex == null) this.WGSL_CustomVertex = this.WGSL_FormatTerrainVertexDefintions(terrainInfo);
          if (this.WGSL_VertexMainEnd == null) this.WGSL_VertexMainEnd = this.WGSL_FormatTerrainVertexMainEnd(terrainInfo);
          return {
            CUSTOM_VERTEX_DEFINITIONS: this.WGSL_CustomVertex,
            CUSTOM_VERTEX_MAIN_END: this.WGSL_VertexMainEnd,
          };
        } else if (shaderLanguage === BABYLON.ShaderLanguage.GLSL) {
          if (this.GLSL_CustomVertex == null) this.GLSL_CustomVertex = this.GLSL_FormatTerrainVertexDefintions(terrainInfo);
          if (this.GLSL_VertexMainEnd == null) this.GLSL_VertexMainEnd = this.GLSL_FormatTerrainVertexMainEnd(terrainInfo);
          return {
            CUSTOM_VERTEX_DEFINITIONS: this.GLSL_CustomVertex,
            CUSTOM_VERTEX_MAIN_END: this.GLSL_VertexMainEnd,
          };
        }
      } else if (shaderType === "fragment") {
        if (shaderLanguage === BABYLON.ShaderLanguage.WGSL) {
          if (this.WGSL_CustomFragment == null) this.WGSL_CustomFragment = this.WGSL_FormatTerrainFragmentDefintions(terrainInfo, this.splatmapSampler, this.detailsSampler, this.normalsSampler);
          if (this.WGSL_FragmentUpdateColor == null) this.WGSL_FragmentUpdateColor = this.WGSL_FormatTerrainFragmentUpdateColor(terrainInfo, this.colorName, this.splatmapSampler, this.detailsSampler, this.normalsSampler, TOOLKIT.SceneManager.TerrainColorCorrection);
          return {
            CUSTOM_FRAGMENT_DEFINITIONS: this.WGSL_CustomFragment,
            CUSTOM_FRAGMENT_BEFORE_LIGHTS: this.WGSL_FragmentUpdateColor,
          };
        } else if (shaderLanguage === BABYLON.ShaderLanguage.GLSL) {
          if (this.GLSL_CustomFragment == null) this.GLSL_CustomFragment = this.GLSL_FormatTerrainFragmentDefintions(terrainInfo, this.splatmapSampler, this.detailsSampler, this.normalsSampler);
          if (this.GLSL_FragmentUpdateColor == null) this.GLSL_FragmentUpdateColor = this.GLSL_FormatTerrainFragmentUpdateColor(terrainInfo, this.colorName, this.splatmapSampler, this.detailsSampler, this.normalsSampler, TOOLKIT.SceneManager.TerrainColorCorrection);
          return {
            CUSTOM_FRAGMENT_DEFINITIONS: this.GLSL_CustomFragment,
            CUSTOM_FRAGMENT_BEFORE_LIGHTS: this.GLSL_FragmentUpdateColor,
          };
        }
      }
      return null;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Shader Property Functions
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /** This gets the uniforms used in the shader code */
    public getUniforms(shaderLanguage: BABYLON.ShaderLanguage): any {
      const wsgl: boolean = (shaderLanguage === BABYLON.ShaderLanguage.WGSL);
      this.vertexDefinitions = this.getCustomShaderMaterial().getCustomVertexCode(wsgl);
      this.fragmentDefinitions = this.getCustomShaderMaterial().getCustomFragmentCode(wsgl);
      return this.getCustomShaderMaterial().getCustomUniforms(wsgl);
    }

    /** This gets the samplers used in the shader code */
    public getSamplers(samplers: string[]): void {
      const customSamplers: string[] = this.getCustomShaderMaterial().getCustomSamplers();
      if (customSamplers != null && customSamplers.length > 0) samplers.push(...customSamplers);
    }

    /** This get the attributes used in the shader code */
    public getAttributes(attributes: string[], scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void {
      const customAttributes: string[] = this.getCustomShaderMaterial().getCustomAttributes();
      if (customAttributes != null && customAttributes.length > 0) attributes.push(...customAttributes);
    }

    /** This prepares the shader defines */
    public prepareDefines(defines: BABYLON.MaterialDefines, scene: BABYLON.Scene, mesh: BABYLON.AbstractMesh): void {
      if (!this.isEnabled) return;
      this.getCustomShaderMaterial().prepareCustomDefines(defines);
    }

    /** This is used to update the uniforms bound to a mesh */
    public bindForSubMesh(uniformBuffer: BABYLON.UniformBuffer, scene: BABYLON.Scene, engine: BABYLON.AbstractEngine, subMesh: BABYLON.SubMesh): void {
      if (!this.isEnabled) return;
      this.getCustomShaderMaterial().updateCustomBindings(uniformBuffer);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // WGSL Shader Code Functions
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private WGSL_FormatTerrainVertexDefintions(terrainInfo: any): string {
      let result: string = "";
      if (terrainInfo != null && terrainInfo.textureAtlas != null && terrainInfo.splatmapAtlas != null && terrainInfo.splatmapCount > 0) {
        result = ("\r\n#define TERRAIN_VERTEX_DEFINITIONS\r\n\r\n"
          + "varying vSplatmapUV: vec2<f32>;\r\n"
          + "\r\n");
      }
      return result;
    }

    private WGSL_FormatTerrainVertexMainEnd(terrainInfo: any): string {
      let result: string = "";
      if (terrainInfo != null && terrainInfo.textureAtlas != null && terrainInfo.splatmapAtlas != null && terrainInfo.splatmapCount > 0) {
        result = ("\r\n#define TERRAIN_VERTEX_MAIN_END\r\n\r\n"
          + "#ifdef UV1\r\n"
          + "vertexOutputs.vSplatmapUV = uvUpdated;\r\n"
          + "#endif\r\n"
          + "\r\n");
      }
      return result;
    }

    private WGSL_FormatTerrainFragmentDefintions(terrainInfo: any, splatmapSampler: string, detailsSampler: string, normalsSampler: string): string {
      let result: string = "";
      if (terrainInfo != null && terrainInfo.textureAtlas != null && terrainInfo.splatmapAtlas != null && terrainInfo.splatmapCount > 0) {
        result = ("\r\n#define TERRAIN_FRAGMENT_DEFNITIONS\r\n\r\n"
          + "varying vSplatmapUV: vec2<f32>;\r\n"
          + "var " + splatmapSampler + ":texture_2d<f32>;\r\n"
          + "var " + splatmapSampler + "Sampler: sampler;\r\n"
          + "var " + detailsSampler + ":texture_2d<f32>;\r\n"
          + "var " + detailsSampler + "Sampler: sampler;\r\n"
          + "var " + normalsSampler + ":texture_2d<f32>;\r\n"
          + "var " + normalsSampler + "Sampler: sampler;\r\n"
          + "\r\n"
          + "fn srgb_to_linear(c: vec3<f32>) -> vec3<f32>\r\n"
          + "{\r\n"
          + "    return pow(c, vec3<f32>(2.2));\r\n"
          + "}\r\n"
          + "\r\n"
          + "fn linear_to_srgb(c: vec3<f32>) -> vec3<f32>\r\n"
          + "{\r\n"
          + "    return pow(c, vec3<f32>(1.0 / 2.2));\r\n"
          + "}\r\n"
          + "\r\n"
          + "fn calculateMipmapLevel(uvs: vec2<f32>, size: vec2<f32>) -> f32\r\n"
          + "{\r\n"
          + "    let dx: vec2<f32> = dpdx(uvs * size.x);\r\n"
          + "    let dy: vec2<f32> = dpdy(uvs * size.y);\r\n"
          + "    let d: f32 = max(dot(dx, dx), dot(dy, dy));\r\n"
          + "    return (0.4 * log2(d));\r\n"
          + "}\r\n"
          + "\r\n"
          + "fn sampleTextureAtlas2D(atlas: texture_2d<f32>, sampler: sampler, gamma: f32, tile: vec2<f32>, rect: vec4<f32>, uvs: vec2<f32>, lod: f32) -> vec4<f32>\r\n"
          + "{\r\n"
          + "    var level: f32 = lod;\r\n"
          + "    if (level < 0.0) {\r\n"
          + "        level = clamp(calculateMipmapLevel(uvs, vec2(tile.x, tile.x)), 0.0, tile.y);\r\n"
          + "    }\r\n"
          + "    let size: f32 = pow(2.0, tile.y - level);\r\n"
          + "    let sizex: f32 = size / rect.z;\r\n"
          + "    let sizey: f32 = size / rect.w;\r\n"
          + "    var uv: vec2<f32> = fract(uvs);\r\n"
          + "    uv.x = uv.x * ((sizex * rect.z - 1.0) / sizex) + 0.5 / sizex + rect.z * rect.x;\r\n"
          + "    uv.y = uv.y * ((sizey * rect.w - 1.0) / sizey) + 0.5 / sizey + rect.w * rect.y;\r\n"
          + "    var color: vec4<f32> = textureSampleLevel(atlas, sampler, uv, level);\r\n"
          + "    if (gamma != 1.0) {\r\n"
          + "        color.r = pow(color.r, gamma);\r\n"
          + "        color.g = pow(color.g, gamma);\r\n"
          + "        color.b = pow(color.b, gamma);\r\n"
          + "    }\r\n"
          + "    return color;\r\n"
          + "}\r\n"
          + "\r\n"
          + "fn sampleSplatmapAtlas2D(atlas: texture_2d<f32>, sampler: sampler, tile: vec2<f32>, rect: vec4<f32>, uvs: vec2<f32>) -> vec4<f32>\r\n"
          + "{\r\n"
          + "    let size: f32 = pow(2.0, tile.y);\r\n"
          + "	   let sizex: f32 = size / rect.z;\r\n"
          + "	   let sizey: f32 = size / rect.w;\r\n"
          + "	   var uv: vec2<f32> = uvs;\r\n"
          + "	   uv.x = uv.x * ((sizex * rect.z - 1.0) / sizex) + 0.5 / sizex + rect.z * rect.x;\r\n"
          + "	   uv.y = uv.y * ((sizey * rect.w - 1.0) / sizey) + 0.5 / sizey + rect.w * rect.y;\r\n"
          + "    return textureSample(atlas, sampler, uv);\r\n"
          + "}\r\n"
          + "\r\n"
          + "fn blendSplatmapAtlasColors(splatmap: vec4<f32>, color1: vec4<f32>, color2: vec4<f32>, color3: vec4<f32>, color4: vec4<f32>, mixbuffer: vec3<f32>) -> vec3<f32>\r\n"
          + "{\r\n"
          + "    let buffer1: vec3<f32> = mix(mixbuffer, color1.rgb, splatmap.r);\r\n"
          + "    let buffer2: vec3<f32> = mix(buffer1, color2.rgb, splatmap.g);\r\n"
          + "    let buffer3: vec3<f32> = mix(buffer2, color3.rgb, splatmap.b);\r\n"
          + "    return mix(buffer3, color4.rgb, splatmap.a);\r\n"
          + "}\r\n"
          + "\r\n"
          + "fn perturbNormalSamplerColor(cotangentFrame: mat3x3<f32>, samplerColor: vec3<f32>, scale: f32) -> vec3<f32>\r\n"
          + "{\r\n"
          + "    var map: vec3<f32> = samplerColor.xyz;\r\n"
          + "    map = map * 2.00787402 - 1.00787402;\r\n"
          + "    #ifdef NORMALXYSCALE\r\n"
          + "        map = normalize(map * vec3<f32>(scale, scale, 1.0));\r\n"
          + "    #endif\r\n"
          + "    return normalize(cotangentFrame * map);\r\n"
          + "}\r\n"
          + "\r\n"
          + "\r\n");
      }
      return result;
    }

    private WGSL_FormatTerrainFragmentUpdateColor(terrainInfo: any, colorName: string, splatmapSampler: string, detailsSampler: string, normalsSampler: string, colorCorrection: number = 1.0): string {
      let result: string = "";
      if (terrainInfo != null && terrainInfo.textureAtlas != null && terrainInfo.splatmapAtlas != null && terrainInfo.splatmapCount > 0) {
        result = ("\r\n#define TERRAIN_FRAGMENT_UPDATE_COLOR\r\n\r\n"
          + "var normalsColor: vec3<f32> = vec3<f32>(0.5, 0.5, 1.0);\r\n"
          + "var normalsBuffer: vec3<f32> = normalW.rgb;\r\n"
          + "var splatmapBuffer: vec3<f32> = " + colorName + ".rgb;\r\n"
          + "var autoMipMapLevel: f32 = -1.0;\r\n"
          + "var normalCorrection: f32 = 1.0;\r\n"
          + "var detailCorrection: f32 = " + colorCorrection.toFixed(4) + ";\r\n"
          + "\r\n"
          + "#if defined(ALBEDO) && defined(" + splatmapSampler.toUpperCase() + ") && defined(" + detailsSampler.toUpperCase() + ")\r\n"
          + "\r\n"
          + "// Reset Normal Values\r\n"
          + "#if defined(BUMP) || defined(PARALLAX) || defined(ANISOTROPIC)\r\n"
          + "    uvOffset = vec2<f32>(0.0, 0.0);\r\n"
          + "    #ifdef NORMAL\r\n"
          + "        normalW = normalize(input.vNormalW);\r\n"
          + "    #else\r\n"
          + "        normalW = normalize(cross(dpdx(input.vPositionW), dpdy(input.vPositionW))) * scene.vEyePosition.w;\r\n"
          + "    #endif\r\n"
          + "    #ifdef CLEARCOAT\r\n"
          + "        clearCoatNormalW = normalW;\r\n"
          + "    #endif\r\n"
          + "    #if defined(BUMP) || defined(PARALLAX)\r\n"
          + "        #if defined(CLEARCOAT_BUMP) && defined(TANGENT) && defined(NORMAL)\r\n"
          + "            TBN = vTBN;\r\n"
          + "        #else\r\n"
          + "            TBN = cotangent_frame(normalW, input.vPositionW, fragmentInputs.vSplatmapUV, vec2<f32>(1.0, 1.0));\r\n"
          + "        #endif\r\n"
          + "    #elif defined(ANISOTROPIC)\r\n"
          + "        #if defined(CLEARCOAT_BUMP) && defined(TANGENT) && defined(NORMAL)\r\n"
          + "            TBN = vTBN;\r\n"
          + "        #else\r\n"
          + "            TBN = cotangent_frame(normalW, input.vPositionW, fragmentInputs.vSplatmapUV, vec2<f32>(1.0, 1.0));\r\n"
          + "        #endif\r\n"
          + "    #endif\r\n"
          + "    #ifdef PARALLAX\r\n"
          + "        invTBN = transposeMat3(TBN);\r\n"
          + "    #endif\r\n"
          + "    normalW = perturbNormalSamplerColor(TBN, normalsColor, 1.0);\r\n"
          + "#endif\r\n"
          + "\r\n"
          + "// Global Atlas Values\r\n"
          + "let splatTileSize: f32 = " + terrainInfo.splatmapAtlas[2].toFixed(4) + ";\r\n"
          + "let splatTileBits: f32 = " + terrainInfo.splatmapAtlas[3].toFixed(4) + ";\r\n"
          + "let detailTileSize: f32 = " + terrainInfo.textureAtlas[2].toFixed(4) + ";\r\n"
          + "let detailTileBits: f32 = " + terrainInfo.textureAtlas[3].toFixed(4) + ";\r\n"
          + "\r\n"
          + "// Sample splatmap textures\r\n");
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Sample Each Splatmap Textures
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (terrainInfo.splatmapCount > 0) {
          let counter: number = 0;
          result += "normalsBuffer = vec3<f32>(0.0,0.0,0.0);\r\n";
          for (let index: number = 0; index < terrainInfo.splatmapCount; index++) {
            counter = (index * 4);
            const splatmapRect: number[] = terrainInfo["splatmapRect" + index];
            result += "var splatmapRect" + index + ": vec4<f32> = vec4<f32>(" + splatmapRect[0].toFixed(4) + ", " + splatmapRect[1].toFixed(4) + ", " + splatmapRect[2].toFixed(4) + ", " + splatmapRect[3].toFixed(4) + ");\r\n";
            result += "var splatmapAlbedo" + index + ": vec4<f32> = sampleSplatmapAtlas2D(" + splatmapSampler + ", " + splatmapSampler + "Sampler, vec2<f32>(splatTileSize, splatTileBits), splatmapRect" + index + ", (fragmentInputs.vSplatmapUV + uvOffset));\r\n";
            result += "var textureAlbedo" + (counter + 0) + ": vec4<f32> = vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "var textureAlbedo" + (counter + 1) + ": vec4<f32> = vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "var textureAlbedo" + (counter + 2) + ": vec4<f32> = vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "var textureAlbedo" + (counter + 3) + ": vec4<f32> = vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n";
            if (terrainInfo["textureRect" + (counter + 0)]) {
              const textureRect: number[] = terrainInfo["textureRect" + (counter + 0)];
              const textureInfo: number[] = terrainInfo["textureInfo" + (counter + 0)];
              result += "var textureRect" + (counter + 0) + ": vec4<f32> = vec4<f32>(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
              result += "var textureScale" + (counter + 0) + ": vec2<f32> = vec2<f32>(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
              result += "var textureOffset" + (counter + 0) + ": vec2<f32> = vec2<f32>(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
              result += "var textureTileUV" + (counter + 0) + ": vec2<f32> = ((fragmentInputs.vSplatmapUV + textureOffset" + (counter + 0) + ") * textureScale" + (counter + 0) + ");\r\n";
              result += "textureAlbedo" + (counter + 0) + " = sampleTextureAtlas2D(" + detailsSampler + ", " + detailsSampler + "Sampler, detailCorrection, vec2<f32>(detailTileSize, detailTileBits), textureRect" + (counter + 0) + ", textureTileUV" + (counter + 0) + ", autoMipMapLevel);\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 1)]) {
              const textureRect: number[] = terrainInfo["textureRect" + (counter + 1)];
              const textureInfo: number[] = terrainInfo["textureInfo" + (counter + 1)];
              result += "var textureRect" + (counter + 1) + ": vec4<f32> = vec4<f32>(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
              result += "var textureScale" + (counter + 1) + ": vec2<f32> = vec2<f32>(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
              result += "var textureOffset" + (counter + 1) + ": vec2<f32> = vec2<f32>(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
              result += "var textureTileUV" + (counter + 1) + ": vec2<f32> = ((fragmentInputs.vSplatmapUV + textureOffset" + (counter + 1) + ") * textureScale" + (counter + 1) + ");\r\n";
              result += "textureAlbedo" + (counter + 1) + " = sampleTextureAtlas2D(" + detailsSampler + ", " + detailsSampler + "Sampler, detailCorrection, vec2<f32>(detailTileSize, detailTileBits), textureRect" + (counter + 1) + ", textureTileUV" + (counter + 1) + ", autoMipMapLevel);\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 2)]) {
              const textureRect: number[] = terrainInfo["textureRect" + (counter + 2)];
              const textureInfo: number[] = terrainInfo["textureInfo" + (counter + 2)];
              result += "var textureRect" + (counter + 2) + ": vec4<f32> = vec4<f32>(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
              result += "var textureScale" + (counter + 2) + ": vec2<f32> = vec2<f32>(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
              result += "var textureOffset" + (counter + 2) + ": vec2<f32> = vec2<f32>(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
              result += "var textureTileUV" + (counter + 2) + ": vec2<f32> = ((fragmentInputs.vSplatmapUV + textureOffset" + (counter + 2) + ") * textureScale" + (counter + 2) + ");\r\n";
              result += "textureAlbedo" + (counter + 2) + " = sampleTextureAtlas2D(" + detailsSampler + ", " + detailsSampler + "Sampler, detailCorrection, vec2<f32>(detailTileSize, detailTileBits), textureRect" + (counter + 2) + ", textureTileUV" + (counter + 2) + ", autoMipMapLevel);\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 3)]) {
              const textureRect: number[] = terrainInfo["textureRect" + (counter + 3)];
              const textureInfo: number[] = terrainInfo["textureInfo" + (counter + 3)];
              result += "var textureRect" + (counter + 3) + ": vec4<f32> = vec4<f32>(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
              result += "var textureScale" + (counter + 3) + ": vec2<f32> = vec2<f32>(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
              result += "var textureOffset" + (counter + 3) + ": vec2<f32> = vec2<f32>(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
              result += "var textureTileUV" + (counter + 3) + ": vec2<f32> = ((fragmentInputs.vSplatmapUV + textureOffset" + (counter + 3) + ") * textureScale" + (counter + 3) + ");\r\n";
              result += "textureAlbedo" + (counter + 3) + " = sampleTextureAtlas2D(" + detailsSampler + ", " + detailsSampler + "Sampler, detailCorrection, vec2<f32>(detailTileSize, detailTileBits), textureRect" + (counter + 3) + ", textureTileUV" + (counter + 3) + ", autoMipMapLevel);\r\n";
            }
            result += "splatmapBuffer = blendSplatmapAtlasColors(splatmapAlbedo" + index + ", textureAlbedo" + (counter + 0) + ", textureAlbedo" + (counter + 1) + ", textureAlbedo" + (counter + 2) + ", textureAlbedo" + (counter + 3) + ", splatmapBuffer);\r\n";
            result += "#if defined(BUMP) || defined(PARALLAX) || defined(ANISOTROPIC)\r\n";
            result += "    #if defined(" + normalsSampler.toUpperCase() + ")\r\n";
            result += "        var normalColor" + (counter + 0) + ": vec4<f32> = vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "        var normalColor" + (counter + 1) + ": vec4<f32> = vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "        var normalColor" + (counter + 2) + ": vec4<f32> = vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "        var normalColor" + (counter + 3) + ": vec4<f32> = vec4<f32>(0.0, 0.0, 0.0, 1.0);\r\n";
            if (terrainInfo["textureRect" + (counter + 0)]) {
              const normalScale: number = terrainInfo["normalsScale" + (counter + 0)];
              result += "        var normalScale" + (counter + 0) + ": f32 = " + normalScale.toFixed(4) + ";\r\n";
              result += "        normalColor" + (counter + 0) + " = sampleTextureAtlas2D(" + normalsSampler + ", " + normalsSampler + "Sampler, normalCorrection, vec2<f32>(detailTileSize, detailTileBits), textureRect" + (counter + 0) + ", textureTileUV" + (counter + 0) + ", autoMipMapLevel);\r\n";
              result += "        normalColor" + (counter + 0) + " = vec4<f32>(perturbNormalSamplerColor(TBN, normalColor" + (counter + 0) + ".rgb, normalScale" + (counter + 0) + "), 1.0);\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 1)]) {
              const normalScale: number = terrainInfo["normalsScale" + (counter + 1)];
              result += "        var normalScale" + (counter + 1) + ": f32 = " + normalScale.toFixed(4) + ";\r\n";
              result += "        normalColor" + (counter + 1) + " = sampleTextureAtlas2D(" + normalsSampler + ", " + normalsSampler + "Sampler, normalCorrection, vec2<f32>(detailTileSize, detailTileBits), textureRect" + (counter + 1) + ", textureTileUV" + (counter + 1) + ", autoMipMapLevel);\r\n";
              result += "        normalColor" + (counter + 1) + " = vec4<f32>(perturbNormalSamplerColor(TBN, normalColor" + (counter + 1) + ".rgb, normalScale" + (counter + 1) + "), 1.0);\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 2)]) {
              const normalScale: number = terrainInfo["normalsScale" + (counter + 2)];
              result += "        var normalScale" + (counter + 2) + ": f32 = " + normalScale.toFixed(4) + ";\r\n";
              result += "        normalColor" + (counter + 2) + " = sampleTextureAtlas2D(" + normalsSampler + ", " + normalsSampler + "Sampler, normalCorrection, vec2<f32>(detailTileSize, detailTileBits), textureRect" + (counter + 2) + ", textureTileUV" + (counter + 2) + ", autoMipMapLevel);\r\n";
              result += "        normalColor" + (counter + 2) + " = vec4<f32>(perturbNormalSamplerColor(TBN, normalColor" + (counter + 2) + ".rgb, normalScale" + (counter + 2) + "), 1.0);\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 3)]) {
              const normalScale: number = terrainInfo["normalsScale" + (counter + 3)];
              result += "        var normalScale" + (counter + 3) + ": f32 = " + normalScale.toFixed(4) + ";\r\n";
              result += "        normalColor" + (counter + 3) + " = sampleTextureAtlas2D(" + normalsSampler + ", " + normalsSampler + "Sampler, normalCorrection, vec2<f32>(detailTileSize, detailTileBits), textureRect" + (counter + 3) + ", textureTileUV" + (counter + 3) + ", autoMipMapLevel);\r\n";
              result += "        normalColor" + (counter + 3) + " = vec4<f32>(perturbNormalSamplerColor(TBN, normalColor" + (counter + 3) + ".rgb, normalScale" + (counter + 3) + "), 1.0);\r\n";
            }
            result += "        normalsBuffer = blendSplatmapAtlasColors(splatmapAlbedo" + index + ", normalColor" + (counter + 0) + ", normalColor" + (counter + 1) + ", normalColor" + (counter + 2) + ", normalColor" + (counter + 3) + ", normalsBuffer);\r\n";
            result += "    #endif\r\n";
            result += "#endif\r\n";
            result += "\r\n";
          }
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        result += ("// Update Color Values\r\n"
          + colorName + " = splatmapBuffer.rgb;\r\n"
          + "#if defined(BUMP) || defined(PARALLAX) || defined(ANISOTROPIC)\r\n"
          + "    #if defined(" + normalsSampler.toUpperCase() + ")\r\n"
          + "        normalW = normalsBuffer.rgb;\r\n"
          + "    #endif\r\n"
          + "    #if defined(FORCENORMALFORWARD) && defined(NORMAL)\r\n"
          + "        var faceNormal: vec3<f32> = normalize(cross(dpdx(input.vPositionW), dpdy(input.vPositionW))) * scene.vEyePosition.w;\r\n"
          + "        #if defined(TWOSIDEDLIGHTING)\r\n"
          + "            faceNormal = select(-faceNormal, faceNormal, fragmentInputs.frontFacing)\r\n"
          + "        #endif\r\n"
          + "        normalW *= sign(dot(normalW, faceNormal));\r\n"
          + "    #endif\r\n"
          + "    #if defined(TWOSIDEDLIGHTING) && defined(NORMAL)\r\n"
          + "        normalW = select(-normalW, normalW, fragmentInputs.frontFacing);\r\n"
          + "    #endif\r\n"
          + "#endif\r\n"
          + "\r\n"
          + "#endif\r\n"
          + "\r\n");
      }
      return result;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // GLSL Shader Code Functions
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private GLSL_FormatTerrainVertexDefintions(terrainInfo: any): string {
      let result: string = "";
      if (terrainInfo != null && terrainInfo.textureAtlas != null && terrainInfo.splatmapAtlas != null && terrainInfo.splatmapCount > 0) {
        result = ("\r\n#define TERRAIN_VERTEX_DEFINITIONS\r\n\r\n"
          + "varying vec2 vSplatmapUV;\r\n"
          + "\r\n");
      }
      return result;
    }

    private GLSL_FormatTerrainVertexMainEnd(terrainInfo: any): string {
      let result: string = "";
      if (terrainInfo != null && terrainInfo.textureAtlas != null && terrainInfo.splatmapAtlas != null && terrainInfo.splatmapCount > 0) {
        result = ("\r\n#define TERRAIN_VERTEX_MAIN_END\r\n\r\n"
          + "#ifdef UV1\r\n"
          + "vSplatmapUV = uv;\r\n"
          + "#endif\r\n"
          + "\r\n");
      }
      return result;
    }

    private GLSL_FormatTerrainFragmentDefintions(terrainInfo: any, splatmapSampler: string, detailsSampler: string, normalsSampler: string): string {
      let result: string = "";
      if (terrainInfo != null && terrainInfo.textureAtlas != null && terrainInfo.splatmapAtlas != null && terrainInfo.splatmapCount > 0) {
        result = ("\r\n#define TERRAIN_FRAGMENT_DEFNITIONS\r\n\r\n"
          + "varying vec2 vSplatmapUV;\r\n"
          + "uniform sampler2D " + splatmapSampler + ";\r\n"
          + "uniform sampler2D " + detailsSampler + ";\r\n"
          + "uniform sampler2D " + normalsSampler + ";\r\n"
          + "\r\n"
          + "vec3 srgb_to_linear(const in vec3 c)\r\n"
          + "{\r\n"
          + "    return pow(c, vec3(2.2));\r\n"
          + "}\r\n"
          + "\r\n"
          + "vec3 linear_to_srgb(const in vec3 c)\r\n"
          + "{\r\n"
          + "    return pow(c, vec3(1.0 / 2.2));\r\n"
          + "}\r\n"
          + "\r\n"
          + "float calculateMipmapLevel(const in vec2 uvs, const in vec2 size)\r\n"
          + "{\r\n"
          + "    vec2 dx = dFdx(uvs * size.x);\r\n"
          + "    vec2 dy = dFdy(uvs * size.y);\r\n"
          + "    float d = max(dot(dx, dx), dot(dy, dy));\r\n"
          + "    return 0.4 * log2(d);\r\n"
          + "}\r\n"
          + "\r\n"
          + "vec4 sampleTextureAtlas2D(const in sampler2D atlas, const in float gamma, const in vec2 tile, const in vec4 rect, in vec2 uvs, in float lod)\r\n"
          + "{\r\n"
          + "    if (lod < 0.0) lod = clamp(calculateMipmapLevel(uvs, vec2(tile.x, tile.x)), 0.0, tile.y);   // Tile Info (tile.xy)\r\n"
          + "    float size = pow(2.0, tile.y - lod);                                                        // Tile Bits (tile.y)\r\n"
          + "    float sizex = size / rect.z;                                                                // Tile Width (rect.z)\r\n"
          + "    float sizey = size / rect.w;                                                                // Tile Height (rect.w)\r\n"
          + "    uvs = fract(uvs);                                                                           // Perfrom Tiling (fract)\r\n"
          + "    uvs.x = uvs.x * ((sizex * rect.z - 1.0) / sizex) + 0.5 / sizex + rect.z * rect.x;           // Tile Position X (rect.x)\r\n"
          + "    uvs.y = uvs.y * ((sizey * rect.w - 1.0) / sizey) + 0.5 / sizey + rect.w * rect.y;           // Tile Position Y (rect.y)\r\n"
          + "    vec4 color = texture2DLodEXT(atlas, uvs, lod);\r\n"
          + "    if (gamma != 1.0) {\r\n"
          + "        color.r = pow(color.r, gamma);\r\n"
          + "        color.g = pow(color.g, gamma);\r\n"
          + "        color.b = pow(color.b, gamma);\r\n"
          + "    }\r\n"
          + "    return color;\r\n"
          + "}\r\n"
          + "\r\n"
          + "vec4 sampleSplatmapAtlas2D(const in sampler2D atlas, const in vec2 tile, const in vec4 rect, in vec2 uvs)\r\n"
          + "{\r\n"
          + "    float size = pow(2.0, tile.y);                                                              // Tile Bits (tile.y)\r\n"
          + "	   float sizex = size / rect.z;                                                                // Tile Width (rect.z)\r\n"
          + "	   float sizey = size / rect.w;                                                                // Tile Height (rect.w)\r\n"
          + "	   uvs.x = uvs.x * ((sizex * rect.z - 1.0) / sizex) + 0.5 / sizex + rect.z * rect.x;           // Tile Position X (rect.x)\r\n"
          + "	   uvs.y = uvs.y * ((sizey * rect.w - 1.0) / sizey) + 0.5 / sizey + rect.w * rect.y;           // Tile Position Y (rect.y)\r\n"
          + "    return texture2D(atlas, uvs);\r\n"
          + "}\r\n"
          + "\r\n"
          + "vec3 blendSplatmapAtlasColors(const in vec4 splatmap, in vec4 color1, in vec4 color2, in vec4 color3, in vec4 color4, in vec3 mixbuffer)\r\n"
          + "{\r\n"
          + "    vec3 buffer1 = mix(mixbuffer, color1.rgb, splatmap.r);\r\n"
          + "    vec3 buffer2 = mix(buffer1, color2.rgb, splatmap.g);\r\n"
          + "    vec3 buffer3 = mix(buffer2, color3.rgb, splatmap.b);\r\n"
          + "    return mix(buffer3, color4.rgb, splatmap.a);\r\n"
          + "}\r\n"
          + "\r\n"
          + "vec3 perturbNormalSamplerColor(mat3 cotangentFrame, vec3 samplerColor, float scale)\r\n"
          + "{\r\n"
          + "    vec3 map = samplerColor.xyz;\r\n"
          + "    map = map * 2.00787402 - 1.00787402;\r\n"
          + "    #ifdef NORMALXYSCALE\r\n"
          + "        map = normalize(map * vec3(scale, scale, 1.0));\r\n"
          + "    #endif\r\n"
          + "    return normalize(cotangentFrame * map);\r\n"
          + "}\r\n"
          + "\r\n"
          + "\r\n");
      }
      return result;
    }

    private GLSL_FormatTerrainFragmentUpdateColor(terrainInfo: any, colorName: string, splatmapSampler: string, detailsSampler: string, normalsSampler: string, colorCorrection: number = 1.0): string {
      let result: string = "";
      if (terrainInfo != null && terrainInfo.textureAtlas != null && terrainInfo.splatmapAtlas != null && terrainInfo.splatmapCount > 0) {
        result = ("\r\n#define TERRAIN_FRAGMENT_UPDATE_COLOR\r\n\r\n"
          + "vec3 normalsColor = vec3(0.5, 0.5, 1.0);\r\n"
          + "vec3 normalsBuffer = normalW.rgb;\r\n"
          + "vec3 splatmapBuffer = " + colorName + ".rgb;\r\n"
          + "float autoMipMapLevel = -1.0;\r\n"
          + "float normalCorrection = 1.0;\r\n"
          + "float detailCorrection = " + colorCorrection.toFixed(4) + ";\r\n"
          + "\r\n"
          + "#if defined(ALBEDO) && defined(" + splatmapSampler.toUpperCase() + ") && defined(" + detailsSampler.toUpperCase() + ")\r\n"
          + "\r\n"
          + "// Reset Normal Values\r\n"
          + "#if defined(BUMP) || defined(PARALLAX) || defined(ANISOTROPIC)\r\n"
          + "    uvOffset = vec2(0.0, 0.0);\r\n"
          + "    #ifdef NORMAL\r\n"
          + "        normalW = normalize(vNormalW);\r\n"
          + "    #else\r\n"
          + "        normalW = normalize(cross(dFdx(vPositionW), dFdy(vPositionW))) * vEyePosition.w;\r\n"
          + "    #endif\r\n"
          + "    #ifdef CLEARCOAT\r\n"
          + "        clearCoatNormalW = normalW;\r\n"
          + "    #endif\r\n"
          + "    #if defined(BUMP) || defined(PARALLAX)\r\n"
          + "        #if defined(TANGENT) && defined(NORMAL)\r\n"
          + "            TBN = vTBN;\r\n"
          + "        #else\r\n"
          + "            TBN = cotangent_frame(normalW, vPositionW, vSplatmapUV);\r\n"
          + "        #endif\r\n"
          + "    #elif defined(ANISOTROPIC)\r\n"
          + "        #if defined(TANGENT) && defined(NORMAL)\r\n"
          + "            TBN = vTBN;\r\n"
          + "        #else\r\n"
          + "            TBN = cotangent_frame(normalW, vPositionW, vSplatmapUV, vec2(1.0, 1.0));\r\n"
          + "        #endif\r\n"
          + "    #endif\r\n"
          + "    #ifdef PARALLAX\r\n"
          + "        invTBN = transposeMat3(TBN);\r\n"
          + "    #endif\r\n"
          + "    normalW = perturbNormalSamplerColor(TBN, normalsColor, 1.0);\r\n"
          + "#endif\r\n"
          + "\r\n"
          + "// Global Atlas Values\r\n"
          + "float splatTileSize = " + terrainInfo.splatmapAtlas[2].toFixed(4) + ";\r\n"
          + "float splatTileBits = " + terrainInfo.splatmapAtlas[3].toFixed(4) + ";\r\n"
          + "float detailTileSize = " + terrainInfo.textureAtlas[2].toFixed(4) + ";\r\n"
          + "float detailTileBits = " + terrainInfo.textureAtlas[3].toFixed(4) + ";\r\n"
          + "\r\n"
          + "// Sample splatmap textures\r\n");
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Sample Each Splatmap Textures
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (terrainInfo.splatmapCount > 0) {
          let counter: number = 0;
          result += "normalsBuffer = vec3(0.0,0.0,0.0);\r\n";
          for (let index: number = 0; index < terrainInfo.splatmapCount; index++) {
            counter = (index * 4);
            const splatmapRect: number[] = terrainInfo["splatmapRect" + index];
            result += "vec4 splatmapRect" + index + " = vec4(" + splatmapRect[0].toFixed(4) + ", " + splatmapRect[1].toFixed(4) + ", " + splatmapRect[2].toFixed(4) + ", " + splatmapRect[3].toFixed(4) + ");\r\n";
            result += "vec4 splatmapAlbedo" + index + " = sampleSplatmapAtlas2D(" + splatmapSampler + ", vec2(splatTileSize, splatTileBits), splatmapRect" + index + ", (vSplatmapUV + uvOffset));\r\n";
            result += "vec4 textureAlbedo" + (counter + 0) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "vec4 textureAlbedo" + (counter + 1) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "vec4 textureAlbedo" + (counter + 2) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "vec4 textureAlbedo" + (counter + 3) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
            if (terrainInfo["textureRect" + (counter + 0)]) {
              const textureRect: number[] = terrainInfo["textureRect" + (counter + 0)];
              const textureInfo: number[] = terrainInfo["textureInfo" + (counter + 0)];
              result += "vec4 textureRect" + (counter + 0) + " = vec4(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
              result += "vec2 textureScale" + (counter + 0) + " = vec2(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
              result += "vec2 textureOffset" + (counter + 0) + " = vec2(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
              result += "vec2 textureTileUV" + (counter + 0) + " = ((vSplatmapUV + textureOffset" + (counter + 0) + ") * textureScale" + (counter + 0) + ");\r\n";
              result += "textureAlbedo" + (counter + 0) + " = sampleTextureAtlas2D(" + detailsSampler + ", detailCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 0) + ", textureTileUV" + (counter + 0) + ", autoMipMapLevel);\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 1)]) {
              const textureRect: number[] = terrainInfo["textureRect" + (counter + 1)];
              const textureInfo: number[] = terrainInfo["textureInfo" + (counter + 1)];
              result += "vec4 textureRect" + (counter + 1) + " = vec4(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
              result += "vec2 textureScale" + (counter + 1) + " = vec2(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
              result += "vec2 textureOffset" + (counter + 1) + " = vec2(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
              result += "vec2 textureTileUV" + (counter + 1) + " = ((vSplatmapUV + textureOffset" + (counter + 1) + ") * textureScale" + (counter + 1) + ");\r\n";
              result += "textureAlbedo" + (counter + 1) + " = sampleTextureAtlas2D(" + detailsSampler + ", detailCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 1) + ", textureTileUV" + (counter + 1) + ", autoMipMapLevel);\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 2)]) {
              const textureRect: number[] = terrainInfo["textureRect" + (counter + 2)];
              const textureInfo: number[] = terrainInfo["textureInfo" + (counter + 2)];
              result += "vec4 textureRect" + (counter + 2) + " = vec4(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
              result += "vec2 textureScale" + (counter + 2) + " = vec2(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
              result += "vec2 textureOffset" + (counter + 2) + " = vec2(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
              result += "vec2 textureTileUV" + (counter + 2) + " = ((vSplatmapUV + textureOffset" + (counter + 2) + ") * textureScale" + (counter + 2) + ");\r\n";
              result += "textureAlbedo" + (counter + 2) + " = sampleTextureAtlas2D(" + detailsSampler + ", detailCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 2) + ", textureTileUV" + (counter + 2) + ", autoMipMapLevel);\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 3)]) {
              const textureRect: number[] = terrainInfo["textureRect" + (counter + 3)];
              const textureInfo: number[] = terrainInfo["textureInfo" + (counter + 3)];
              result += "vec4 textureRect" + (counter + 3) + " = vec4(" + textureRect[0].toFixed(4) + ", " + textureRect[1].toFixed(4) + ", " + textureRect[2].toFixed(4) + ", " + textureRect[3].toFixed(4) + ");\r\n";
              result += "vec2 textureScale" + (counter + 3) + " = vec2(" + textureInfo[0].toFixed(4) + ", " + textureInfo[1].toFixed(4) + ");\r\n";
              result += "vec2 textureOffset" + (counter + 3) + " = vec2(" + textureInfo[2].toFixed(4) + ", " + textureInfo[3].toFixed(4) + ");\r\n";
              result += "vec2 textureTileUV" + (counter + 3) + " = ((vSplatmapUV + textureOffset" + (counter + 3) + ") * textureScale" + (counter + 3) + ");\r\n";
              result += "textureAlbedo" + (counter + 3) + " = sampleTextureAtlas2D(" + detailsSampler + ", detailCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 3) + ", textureTileUV" + (counter + 3) + ", autoMipMapLevel);\r\n";
            }
            result += "splatmapBuffer = blendSplatmapAtlasColors(splatmapAlbedo" + index + ", textureAlbedo" + (counter + 0) + ", textureAlbedo" + (counter + 1) + ", textureAlbedo" + (counter + 2) + ", textureAlbedo" + (counter + 3) + ", splatmapBuffer);\r\n";
            result += "#if defined(BUMP) || defined(PARALLAX) || defined(ANISOTROPIC)\r\n";
            result += "    #if defined(" + normalsSampler.toUpperCase() + ")\r\n";
            result += "        vec4 normalColor" + (counter + 0) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "        vec4 normalColor" + (counter + 1) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "        vec4 normalColor" + (counter + 2) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
            result += "        vec4 normalColor" + (counter + 3) + " = vec4(0.0, 0.0, 0.0, 1.0);\r\n";
            if (terrainInfo["textureRect" + (counter + 0)]) {
              const normalScale: number = terrainInfo["normalsScale" + (counter + 0)];
              result += "        float normalScale" + (counter + 0) + " = " + normalScale.toFixed(4) + ";\r\n";
              result += "        normalColor" + (counter + 0) + " = sampleTextureAtlas2D(" + normalsSampler + ", normalCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 0) + ", textureTileUV" + (counter + 0) + ", autoMipMapLevel);\r\n";
              result += "        normalColor" + (counter + 0) + ".rgb = perturbNormalSamplerColor(TBN, normalColor" + (counter + 0) + ".rgb, normalScale" + (counter + 0) + ");\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 1)]) {
              const normalScale: number = terrainInfo["normalsScale" + (counter + 1)];
              result += "        float normalScale" + (counter + 1) + " = " + normalScale.toFixed(4) + ";\r\n";
              result += "        normalColor" + (counter + 1) + " = sampleTextureAtlas2D(" + normalsSampler + ", normalCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 1) + ", textureTileUV" + (counter + 1) + ", autoMipMapLevel);\r\n";
              result += "        normalColor" + (counter + 1) + ".rgb = perturbNormalSamplerColor(TBN, normalColor" + (counter + 1) + ".rgb, normalScale" + (counter + 1) + ");\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 2)]) {
              const normalScale: number = terrainInfo["normalsScale" + (counter + 2)];
              result += "        float normalScale" + (counter + 2) + " = " + normalScale.toFixed(4) + ";\r\n";
              result += "        normalColor" + (counter + 2) + " = sampleTextureAtlas2D(" + normalsSampler + ", normalCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 2) + ", textureTileUV" + (counter + 2) + ", autoMipMapLevel);\r\n";
              result += "        normalColor" + (counter + 2) + ".rgb = perturbNormalSamplerColor(TBN, normalColor" + (counter + 2) + ".rgb, normalScale" + (counter + 2) + ");\r\n";
            }
            if (terrainInfo["textureRect" + (counter + 3)]) {
              const normalScale: number = terrainInfo["normalsScale" + (counter + 3)];
              result += "        float normalScale" + (counter + 3) + " = " + normalScale.toFixed(4) + ";\r\n";
              result += "        normalColor" + (counter + 3) + " = sampleTextureAtlas2D(" + normalsSampler + ", normalCorrection, vec2(detailTileSize, detailTileBits), textureRect" + (counter + 3) + ", textureTileUV" + (counter + 3) + ", autoMipMapLevel);\r\n";
              result += "        normalColor" + (counter + 3) + ".rgb = perturbNormalSamplerColor(TBN, normalColor" + (counter + 3) + ".rgb, normalScale" + (counter + 3) + ");\r\n";
            }
            result += "        normalsBuffer = blendSplatmapAtlasColors(splatmapAlbedo" + index + ", normalColor" + (counter + 0) + ", normalColor" + (counter + 1) + ", normalColor" + (counter + 2) + ", normalColor" + (counter + 3) + ", normalsBuffer);\r\n";
            result += "    #endif\r\n";
            result += "#endif\r\n";
            result += "\r\n";
          }
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        result += ("// Update Color Values\r\n"
          + colorName + " = splatmapBuffer.rgb;\r\n"
          + "#if defined(BUMP) || defined(PARALLAX) || defined(ANISOTROPIC)\r\n"
          + "    #if defined(" + normalsSampler.toUpperCase() + ")\r\n"
          + "        normalW = normalsBuffer.rgb;\r\n"
          + "    #endif\r\n"
          + "    #if defined(FORCENORMALFORWARD) && defined(NORMAL)\r\n"
          + "        vec3 faceNormal = normalize(cross(dFdx(vPositionW), dFdy(vPositionW))) * vEyePosition.w;\r\n"
          + "        #if defined(TWOSIDEDLIGHTING)\r\n"
          + "            faceNormal = gl_FrontFacing ? faceNormal : -faceNormal;\r\n"
          + "        #endif\r\n"
          + "        normalW *= sign(dot(normalW, faceNormal));\r\n"
          + "    #endif\r\n"
          + "    #if defined(TWOSIDEDLIGHTING) && defined(NORMAL)\r\n"
          + "        normalW = gl_FrontFacing ? normalW : -normalW;\r\n"
          + "    #endif\r\n"
          + "#endif\r\n"
          + "\r\n"
          + "#endif\r\n"
          + "\r\n");
      }
      return result;
    }
  }
}
