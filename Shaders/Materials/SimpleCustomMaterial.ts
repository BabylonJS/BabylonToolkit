namespace PROJECT {
    /**
     * Custom Shader Material (BABYLON.PBRMaterial)
     * @class SimpleCustomMaterial
     */
    export class SimpleCustomMaterial extends TOOLKIT.CustomShaderMaterial {

        public constructor(name: string, scene: BABYLON.Scene) {
            super(name, scene);
            this.shader = this.getClassName();
            this.plugin = new PROJECT.SimpleCustomMaterialPlugin(this, this.shader);
        }

        public update(): void {
            /* Update values before binding */
        }

        public getClassName(): string {
            return "SimpleCustomMaterial";
        }
    }
    /**
     * Custom Shader Material Plugin (BABYLON.MaterialPluginBase)
     * @class SimpleCustomMaterialPlugin
     */
    export class SimpleCustomMaterialPlugin extends TOOLKIT.CustomShaderMaterialPlugin {

        public constructor(customMaterial: TOOLKIT.CustomShaderMaterial, shaderName: string) {
            // The second parameter is the name of this plugin.
            // The third one is a priority, which lets you define the order multiple plugins are run. Lower numbers run first.
            // The fourth one is a list of defines used in the shader code.
            super(customMaterial, shaderName, 100, { SIMPLECUSTOMMATERIAL: false });
        }

        public isCompatible(shaderLanguage: BABYLON.ShaderLanguage): boolean {
            return (shaderLanguage === BABYLON.ShaderLanguage.WGSL || shaderLanguage === BABYLON.ShaderLanguage.GLSL);
        }

        public getClassName(): string {
            return "SimpleCustomMaterialPlugin";
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
            if (shaderType === "vertex") {
                if (shaderLanguage === BABYLON.ShaderLanguage.WGSL) {
                    return {
                        // EXAMPLE OUTPUT COLOR VERTEX
                        // CUSTOM_VERTEX_DEFINITIONS: this.vertexDefinitions,
                        // CUSTOM_VERTEX_MAIN_END: `
                        //     output.color = vec4<f32>(input.color.r*0.299 + input.color.g*0.587 + input.color.b*0.114, 1.0);
                        // `,
                    };
                } else if (shaderLanguage === BABYLON.ShaderLanguage.GLSL) {
                    return {
                        // EXAMPLE FRONT COLOR VERTEX
                        // CUSTOM_VERTEX_DEFINITIONS: this.vertexDefinitions,
                        // CUSTOM_VERTEX_MAIN_END: `
                        //     gl_FrontColor = vec4(gl_Color.r*0.299 + gl_Color.g*0.587 + gl_Color.b*0.114, 1.0);
                        // `,
                    };
                }
            } else if (shaderType === "fragment") {
                if (shaderLanguage === BABYLON.ShaderLanguage.WGSL) {
                    return {
                        // EXAMPLE BLACK AND WHITE FILTER
                        CUSTOM_FRAGMENT_DEFINITIONS: this.fragmentDefinitions,
                        CUSTOM_FRAGMENT_MAIN_END: `
                            var luma = fragmentOutputs.color.r*0.299 + fragmentOutputs.color.g*0.587 + fragmentOutputs.color.b*0.114;
                            fragmentOutputs.color = vec4f(luma, luma, luma, 1.0);
                        `,
                    };
                } else if (shaderLanguage === BABYLON.ShaderLanguage.GLSL) {
                    return {
                        // EXAMPLE BLACK AND WHITE FILTER
                        CUSTOM_FRAGMENT_DEFINITIONS: this.fragmentDefinitions,
                        CUSTOM_FRAGMENT_MAIN_END: `
                            float luma = gl_FragColor.r*0.299 + gl_FragColor.g*0.587 + gl_FragColor.b*0.114;
                            gl_FragColor = vec4(luma, luma, luma, 1.0);
                        `,
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
    }

    TOOLKIT.SceneManager.RegisterClass("PROJECT.SimpleCustomMaterial", SimpleCustomMaterial);
    TOOLKIT.SceneManager.RegisterClass("PROJECT.SimpleCustomMaterialPlugin", SimpleCustomMaterialPlugin);
}