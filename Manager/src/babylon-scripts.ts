module BABYLON {
    /**
     * Babylon script component class
     * @class ScriptComponent
     */
    export class ScriptComponent {
        protected start(): void { }
        protected update(): void { }
        protected after(): void { }
        protected destroy(): void { }
        private _before: () => void = null;
        private _after: () => void = null;
        private _properties:any = null;
        private _started:boolean = false;
        private _scene:BABYLON.Scene = null;
        private _transform:BABYLON.TransformNode = null;
        public get scene():BABYLON.Scene { return this._scene; }
        public get transform():BABYLON.TransformNode { return this._transform; };
        public constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties: any = {}) {
            if (transform == null) throw new Error("Null transform object specified.");
            if (scene == null) throw new Error("Null host scene object specified.");
            this._scene = scene;
            this._transform = transform;
            this._properties = properties || {};
            // ..
            // Register script component instance
            // ..
            const instance:BABYLON.ScriptComponent = this;
            instance._before = () => { BABYLON.ScriptComponent.BeforeInstance(instance); };
            instance._after = () => { BABYLON.ScriptComponent.AfterInstance(instance); };
            if (!instance.registerComponentInstance || !instance.destroyComponentInstance) {
                BABYLON.Tools.Warn("Invalid component registration handlers for: " + this._transform.name);
            }
        }
        /** Gets the script component class name */
        public getClassName():string {
            const funcNameRegex = /function (.{1,})\(/;
            const results = (funcNameRegex).exec((<any> this).constructor.toString());
            return (results && results.length > 1) ? results[1] : "";
        }

        ////////////////////////////////////////////////////////////////////////////////////
        // Component Mesh Entity Helper Functions
        ////////////////////////////////////////////////////////////////////////////////////

        /** Sets a script component property bag value */
        public setProperty(name: string, propertyValue: any): void {
            if (this._properties == null) this._properties = {};
            this._properties[name] = propertyValue;
        }
        /** Gets a script component property bag value */
        public getProperty<T>(name: string, defaultValue: T = null): T {
            let result: any = null
            if (this._properties != null) {
                result = this._properties[name];
            }
            if (result == null) result = defaultValue;
            return (result != null) ? result as T : null;
        }

        ////////////////////////////////////////////////////////////////////////////////////
        // Component Mesh Entity Helper Functions
        ////////////////////////////////////////////////////////////////////////////////////

        /** Gets the safe transform mesh entity */
        public getTransformMesh(): BABYLON.Mesh {
            return (this._transform instanceof BABYLON.Mesh) ? this._transform as BABYLON.Mesh : null;
        }
        /** Gets the safe transform abstract mesh entity */
        public getAbstractMesh(): BABYLON.AbstractMesh {
            return (this._transform instanceof BABYLON.AbstractMesh) ? this._transform as BABYLON.AbstractMesh : null;
        }
        /** Gets the transform collision meshes */
        public getCollisionMeshes(): BABYLON.AbstractMesh[] {
            return BABYLON.SceneManager.GetCollisionMeshes(this.transform);
        }
        /** Gets the transform primitive meshes */
        public getPrimitiveMeshes(): BABYLON.AbstractMesh[] {
            return BABYLON.SceneManager.GetPrimitiveMeshes(this.transform);
        }

        ////////////////////////////////////////////////////////////////////////////////////
        // Component Scene Manager Helper Functions
        ////////////////////////////////////////////////////////////////////////////////////

        /** TODO */
        public getMetadata(): any {
            return BABYLON.SceneManager.FindSceneMetadata(this._transform);
        }
        /** TODO */
        public getComponent<T extends BABYLON.ScriptComponent>(klass: string): T {
            const result:any = BABYLON.SceneManager.FindScriptComponent<T>(this._transform, klass);
            return (result != null) ? result as T : null;
        }
        /** TODO */
        public getComponents<T extends BABYLON.ScriptComponent>(klass: string): T[] {
            const result:any = BABYLON.SceneManager.FindScriptComponents<T>(this._transform, klass);
            return (result != null) ? result as T[] : null;
        }
        /** TODO */
        public getParticleRig(): BABYLON.ParticleSystem {
            return BABYLON.SceneManager.FindSceneParticleRig(this._transform);
        }
        /** TODO */
        public getCameraRig(): BABYLON.Camera {
            return BABYLON.SceneManager.FindSceneCameraRig(this._transform);
        }
        /** TODO */
        public getLightRig(): BABYLON.Light {
            return BABYLON.SceneManager.FindSceneLightRig(this._transform);
        }
        /** TODO */
        public getFlareRig(): BABYLON.LensFlareSystem {
            return BABYLON.SceneManager.FindSceneFlareRig(this._transform);
        }
        /** TODO */
        public getChildMesh(name:string, searchType:BABYLON.SearchType = BABYLON.SearchType.StartsWith, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null): BABYLON.AbstractMesh {
            return BABYLON.SceneManager.FindSceneChildMesh(this._transform, name, searchType, directDecendantsOnly, predicate);
        }
        /** TODO */
        public getChildTransform(name:string, searchType:BABYLON.SearchType = BABYLON.SearchType.StartsWith, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null): BABYLON.AbstractMesh {
            return BABYLON.SceneManager.FindSceneChildTransform(this._transform, name, searchType, directDecendantsOnly, predicate);
        }
        /** Gets the delta time spent between current and previous frame in seconds */
        public getDeltaSeconds(): number {
            return BABYLON.SceneManager.GetDeltaSeconds(this._scene);
        };

        ////////////////////////////////////////////////////////////////////////////////////
        // Component Instance Registration Functions
        ////////////////////////////////////////////////////////////////////////////////////

        private registerComponentInstance(instance: BABYLON.ScriptComponent, validate:boolean = true):void {
            if (validate === true) {
                BABYLON.Utilities.ValidateTransformMetadata(this._transform);
                const script:any = { alias: "script", order: 0, klass: this.getClassName(), properties: null, instance: instance };
                if (this._transform.metadata.unity.components == null) this._transform.metadata.unity.components = [];
                this._transform.metadata.unity.components.push(script);
            }
            BABYLON.ScriptComponent.RegisterInstance(instance);
        }
        private destroyComponentInstance(instance: BABYLON.ScriptComponent):void {
            BABYLON.ScriptComponent.DestroyInstance(instance);
        }

        ////////////////////////////////////////////////////////////////////////////////////
        // Component Instance Life Cycle Helpers
        ////////////////////////////////////////////////////////////////////////////////////

        private static RegisterInstance(instance: BABYLON.ScriptComponent): void {
            if (instance != null) {
                if (instance._before != null) {
                    instance.scene.registerBeforeRender(instance._before);
                }
                if (instance._after != null) {
                    instance.scene.registerAfterRender(instance._after);
                }
            }
        }
        private static BeforeInstance(instance: BABYLON.ScriptComponent): void {
            if (instance != null) {
                if (!instance._started) {
                    instance.start();
                    instance._started = true;
                } else if (instance._before != null && instance._started) {
                    instance.update();
                }
            }
        }
        private static AfterInstance(instance: BABYLON.ScriptComponent): void {
            if (instance != null) {
                if (instance._after != null && instance._started) {
                    instance.after();
                }
            }
        }
        private static DestroyInstance(instance: BABYLON.ScriptComponent) {
            if (instance != null && instance.transform != null) {
                instance.scene.unregisterBeforeRender(instance._before);
                instance.scene.unregisterAfterRender(instance._after);
                // ..
                // TODO: Remove Transform Mesh From All Light Shadow Map Render Lists - ???
                // ..
                try{ instance.destroy(); }catch(e){};
                instance._transform = null;
                instance._properties = null;
                instance._started = false;
                instance._before = null;
                instance._after = null;
                instance._scene = null;
            }
        }
    }

    /**
     * Babylon shuriken particle class
     * @class ShurikenParticleSystem
     */
    export class ShurikenParticleSystem extends BABYLON.ScriptComponent {
        public constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties: any = {}) {
            super(transform, scene, properties);
            // TODO: Create Shuriken Particle System
        }

        protected start(): void {
            // Start render loop function
        }

        protected update(): void {
            // Update render loop function
        }

        protected after(): void {
            // After render loop function
        }

        protected destroy(): void {
            // Destroy component function
        }
    }

    /**
     * Babylon character controller class
     * @class CharacterController
     */
    export class CharacterController extends BABYLON.ScriptComponent {
        public constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties: any = {}) {
            super(transform, scene, properties);
            // TODO: Create Character Controller System
        }

        protected start(): void {
            // Start render loop function
        }
    
        protected update(): void {
            // Update render loop function
        }
    
        protected after(): void {
            // After render loop function
        }
    
        protected destroy(): void {
            // Destroy component function
        }
    }

    /**
     * Babylon animation state class
     * @class AnimationState
     */
    export class AnimationState extends BABYLON.ScriptComponent {
        public constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties: any = {}) {
            super(transform, scene, properties);
            // TODO: Create Animation State Machine
        }

        protected start(): void {
            // Start render loop function
        }

        protected update(): void {
            // Update render loop function
        }

        protected after(): void {
            // After render loop function
        }

        protected destroy(): void {
            // Destroy component function
        }
    }

    /**
     * Babylon navigation agent class
     * @class NavigationAgent
     */
    export class NavigationAgent extends BABYLON.ScriptComponent {
        public get info():BABYLON.INavigationAgent { return this._info; }
        public get hasAgentInfo(): boolean { return (this.info != null); }
        private _info:BABYLON.INavigationAgent;
        public constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties: any = {}) {
            super(transform, scene, properties);
        }

        protected start(): void {
            // Start render loop function
        }

        protected update(): void {
            // Update render loop function
        }

        protected after(): void {
            // After render loop function
        }

        protected destroy(): void {
            // Destroy component function
        }
        
        /** TODO */
        public setDestination(destination: BABYLON.Vector3): void {
            if (this.hasAgentInfo) {
                // TODO: Create SetDestination Navigation AI With Obsticale Avoidance
            } else {
                BABYLON.Tools.Warn("Null navigation agent metadata. Set agent destination ignored.");
            }
        }
    }
}