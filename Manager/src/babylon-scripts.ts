module BABYLON {
    /**
     * Babylon script component class
     * @class ScriptComponent - All rights reserved (c) 2019 Mackey Kinard
     */
    export abstract class ScriptComponent {
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

        /** Gets the safe transform mesh entity */
        public getTransformMesh(): BABYLON.Mesh {
            return (this._transform instanceof BABYLON.Mesh) ? this._transform as BABYLON.Mesh : null;
        }
        /** Gets the safe transform abstract mesh entity */
        public getAbstractMesh(): BABYLON.AbstractMesh {
            return (this._transform instanceof BABYLON.AbstractMesh) ? this._transform as BABYLON.AbstractMesh : null;
        }
        /** Gets the safe transform instanced mesh entity */
        public getInstancedMesh(): BABYLON.InstancedMesh {
            return (this._transform instanceof BABYLON.InstancedMesh) ? this._transform as BABYLON.InstancedMesh : null;
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
        public getCameraRig(): BABYLON.FreeCamera {
            return BABYLON.SceneManager.FindSceneCameraRig(this._transform);
        }
        /** TODO */
        public getLightRig(): BABYLON.Light {
            return BABYLON.SceneManager.FindSceneLightRig(this._transform);
        }
        /** TODO */
        public getTextWriter(): any {
            return BABYLON.SceneManager.FindSceneTextWriter(this._transform);
        }
        /** TODO */
        public getChildMesh(name:string, searchType:BABYLON.SearchType = BABYLON.SearchType.StartsWith, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null): BABYLON.AbstractMesh {
            return BABYLON.SceneManager.FindSceneChildMesh(this._transform, name, searchType, directDecendantsOnly, predicate);
        }
        /** TODO */
        public getChildTransform(name:string, searchType:BABYLON.SearchType = BABYLON.SearchType.StartsWith, directDecendantsOnly:boolean = true, predicate:(node:BABYLON.Node)=>boolean = null): BABYLON.AbstractMesh {
            return BABYLON.SceneManager.FindSceneChildTransform(this._transform, name, searchType, directDecendantsOnly, predicate);
        }
        /** Gets a script component transform primary tag name. */
        public getTransformTag(): string {
            return BABYLON.SceneManager.GetTransformTag(this.transform);
        }
        /** Gets the total game time in seconds */
        public getGameTime(): number {
            return BABYLON.SceneManager.GetGameTime();
        }
        /** Gets the system time in seconds */
        public getSystemTime(): number {
            return BABYLON.SceneManager.GetSystemTime();
        }
        /** Gets the delta time spent between current and previous frame in seconds */
        public getDeltaSeconds(applyAnimationRatio:boolean = true): number {
            return BABYLON.SceneManager.GetDeltaSeconds(this._scene, applyAnimationRatio);
        }
        /** Sets the new free camera rig for the specified entity */
        public updateCameraRigging(camera:BABYLON.FreeCamera): void {
            BABYLON.SceneManager.UpdateCameraRigging(this._transform, camera);
        }

        ////////////////////////////////////////////////////////////////////////////////////
        // Component Entity Property Helper Functions
        ////////////////////////////////////////////////////////////////////////////////////

        /** Manually sets a script component property bag value */
        protected setEditorProperty(name: string, propertyValue: any): void {
            if (this._properties == null) this._properties = {};
            this._properties[name] = propertyValue;
        }
        /** Manually gets a script component property bag value */
        protected getEditorProperty<T>(name: string, defaultValue: T = null): T {
            let result: any = null
            if (this._properties != null) {
                result = this._properties[name];
            }
            if (result == null) result = defaultValue;
            return (result != null) ? result as T : null;
        }

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
     * Babylon bounding box updater class
     * @class BoundingBoxUpdater - All rights reserved (c) 2019 Mackey Kinard
     */
    export class BoundingBoxUpdater extends BABYLON.ScriptComponent {
        private _abtractMesh:BABYLON.AbstractMesh = null;
        public constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties: any = {}) {
            super(transform, scene, properties);
            this._abtractMesh = this.getAbstractMesh();
        }
        protected update(): void {
            if (this._abtractMesh != null) {
                this._abtractMesh.refreshBoundingInfo(true);
            }
        }
        protected destroy(): void {
            this._abtractMesh = null;
        }
    }
}