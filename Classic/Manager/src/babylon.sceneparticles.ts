/// <reference path="babylon.d.ts" />
/// <reference path="babylon.scenecomponents.ts" />
/// <reference path="babylon.scenemanager.ts" />
/// <reference path="babylon.sceneshuriken.ts" />
/// <reference path="babylon.sceneutilities.ts" />

module BABYLON {
    /* Universal Particle System Controller */
    export class UniversalParticleSystem extends BABYLON.MeshComponent {
        private _time:number = 0.0;
        private _auto:boolean = false;
        private _mode:number = 0;
        private _size:number = 4096;
        private _shape:number = 0;
        private _shuriken:BABYLON.IShurikenParticleSystem = null;
        public get mode():number { return this._mode; }
        public get shape():number { return this._shape; }
        public get shuriken():BABYLON.IShurikenParticleSystem { return this._shuriken; }
        public constructor(owner: BABYLON.AbstractMesh, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            super(owner, scene, tick, propertyBag);
            this._time = 0.0;
            this._auto = false;
            this._shuriken = null;
            this.initializeParticleSystem();
        }
        
        /* Universal Particle System Life Cycle */
        
        protected start() :void {
            if (this._auto === true && this._shuriken != null) {
                this._shuriken.start();
            }
        }

        protected destroy() :void {
            if (this._shuriken != null) {
                this._shuriken.dispose();
                this._shuriken = null;
            }
        }
        
        /* Initialize Universial Particle System Properties */

        private initializeParticleSystem():void  {
            this._mode = this.getProperty("systemMode", 0);
            this._size = this.getProperty("randomSize", 4096);
            this._auto = this.getProperty("autoStart", false);
            this._shape = this.getProperty("preset", 0);
            // Setup particle system properties
            let pcap:number = this.getProperty("capacity", 100);
            let pname:string = this.getProperty("particleName", null);
            let speed:number = this.getProperty("startSpeed", 0.01);
            let angle:number = this.getProperty("angle", 1.0);
            let radius:number = this.getProperty("radius", 1.0);
            let count:number = this.getProperty("activeCount", 100000);
            let emission:number = this.getProperty("emitType", 0.0);
            let duration:number = this.getProperty("duration", 10.0);
            let randomizer:number = this.getProperty("randomizer", 0);
            if (pname == null || pname === "") pname = (this.entity.name + ".Particle." + BABYLON.Tools.RandomId()); 
            let bursts:BABYLON.IShurikenBusrt[] = this.getProperty<BABYLON.IShurikenBusrt[]>("emitBurst", null);
            
            // Setup particle system texture mask (CPU ONLY)
            let textureMask:any = this.getProperty("textureMask");
            let angularSpeed:any = this.getProperty("angularSpeed");
            let textureMaskCol:BABYLON.Color4 = BABYLON.Utilities.ParseColor4(textureMask, new BABYLON.Color4(1.0, 1.0, 1.0, 1.0));
            let mm_rotate_vector:BABYLON.Vector2 = BABYLON.Utilities.ParseVector2(angularSpeed, new BABYLON.Vector2(0.0, 0.0));
            
            // Create shuriken particle system
            if (this._mode === 1) {
                if (BABYLON.GPUParticleSystem.IsSupported) {
                    this._shuriken = new BABYLON.GPUShurikenParticleSystem(pname, pcap, this.scene, this._size, duration, speed);
                    this._shuriken.activeParticleCount = count;
                }
                if (this._shuriken == null) {
                    this._mode = 0;
                    this._shuriken = new BABYLON.ShurikenParticleSystem(pname, pcap, this.scene, duration, emission, speed, bursts);
                    this._shuriken.textureMask = textureMaskCol;
                    this._shuriken.minAngularSpeed = mm_rotate_vector.x;
                    this._shuriken.maxAngularSpeed = mm_rotate_vector.y;
                    BABYLON.Tools.Warn("Babylon.js using cpu particle system fallback for owner: " + this.entity.name);
                }
            } else {
                this._shuriken = new BABYLON.ShurikenParticleSystem(pname, pcap, this.scene, duration, emission, speed, bursts);
                this._shuriken.textureMask = textureMaskCol;
                this._shuriken.minAngularSpeed = mm_rotate_vector.x;
                this._shuriken.maxAngularSpeed = mm_rotate_vector.y;
            }

            // Setup default particle properties
            this._shuriken.emitter = this.mesh;
            this._shuriken.blendMode = this.getProperty("blendMode", 0.0);
            this._shuriken.emitRate = this.getProperty("emitRate", 100.0);
            this._shuriken.loopPlay = this.getProperty("loopPlay", false);
            this._shuriken.delayTime = this.getProperty("delayTime", 0.0);
            
            // Parse particle system classes
            let mm_lifetime:any = this.getProperty("lifeTime");
            let mm_lifetime_vector:BABYLON.Vector2 = BABYLON.Utilities.ParseVector2(mm_lifetime, new BABYLON.Vector2(1.0, 1.0));
            this._shuriken.minLifeTime = mm_lifetime_vector.x;
            this._shuriken.maxLifeTime = mm_lifetime_vector.y;
            let mm_power:any = this.getProperty("emitPower");
            let mm_power_vector:BABYLON.Vector2 = BABYLON.Utilities.ParseVector2(mm_power, new BABYLON.Vector2(1.0, 1.0));
            this._shuriken.minEmitPower = mm_power_vector.x;
            this._shuriken.maxEmitPower = mm_power_vector.y;
            let mm_size:any = this.getProperty("particleSize");
            let mm_size_vector:BABYLON.Vector2 = BABYLON.Utilities.ParseVector2(mm_size, new BABYLON.Vector2(1.0, 1.0));
            this._shuriken.minSize = mm_size_vector.x;
            this._shuriken.maxSize = mm_size_vector.y;
            let color1:any = this.getProperty("color1");
            this._shuriken.color1 = BABYLON.Utilities.ParseColor4(color1, new BABYLON.Color4(1.0, 1.0 ,1.0, 1.0));
            let color2:any = this.getProperty("color2");
            this._shuriken.color2 = BABYLON.Utilities.ParseColor4(color2, new BABYLON.Color4(1.0, 1.0, 1.0, 1.0));
            let colorDead:any = this.getProperty("colorDead");
            this._shuriken.colorDead = BABYLON.Utilities.ParseColor4(colorDead, new BABYLON.Color4(0.0, 0.0, 0.0, 1.0));

            // Particle system emission shapes
            let direction1:any = this.getProperty("direction1");
            let directionVec1:BABYLON.Vector3 = BABYLON.Utilities.ParseVector3(direction1, new BABYLON.Vector3(0.0, 1.0, 0.0));
            let direction2:any = this.getProperty("direction2");
            let directionVec2:BABYLON.Vector3 = BABYLON.Utilities.ParseVector3(direction2, new BABYLON.Vector3(0.0, 1.0, 0.0));
            let minEmitBox:any = this.getProperty("minEmitBox");
            let minEmitBoxVec:BABYLON.Vector3 = BABYLON.Utilities.ParseVector3(minEmitBox, new BABYLON.Vector3(0.0, 0.0, 0.0));
            let maxEmitBox:any = this.getProperty("maxEmitBox");
            let maxEmitBoxVec:BABYLON.Vector3 = BABYLON.Utilities.ParseVector3(maxEmitBox, new BABYLON.Vector3(0.0, 0.0, 0.0));
            switch(this._shape) {
                case 0: {
                    let boxEmitter:BABYLON.BoxParticleEmitter = new BABYLON.BoxParticleEmitter();
                    boxEmitter.direction1 = directionVec1;
                    boxEmitter.direction2 = directionVec2;
                    boxEmitter.minEmitBox = minEmitBoxVec;
                    boxEmitter.maxEmitBox = maxEmitBoxVec;
                    this._shuriken.particleEmitterType = boxEmitter
                    break;
                }
                case 1: {
                    this._shuriken.particleEmitterType = new BABYLON.ConeParticleEmitter(radius, angle, randomizer);
                    break;
                }
                case 2: {
                    this._shuriken.particleEmitterType = new BABYLON.SphereParticleEmitter(radius, randomizer);
                    break;
                }
                case 3: {
                    this._shuriken.particleEmitterType = new BABYLON.SphereDirectedParticleEmitter(radius, directionVec1, directionVec2);
                    break;
                }
            }
            
            // Parse particle system gravity
            let gravity:any = this.getProperty("gravityVector");
            let gravityMode:number = this.getProperty("gravityMode", 0);
            let gravityMultiplier:number = this.getProperty("gravityMultiplier", 0.0);
            if (gravityMode === 1) this._shuriken.gravity = this.scene.gravity.scale(gravityMultiplier);
            else this._shuriken.gravity = BABYLON.Utilities.ParseVector3(gravity, new BABYLON.Vector3(0.0, 0.0, 0.0));
            
            // Parse particle system textures
            let texture:any = this.getProperty("textureImage", null);
            let texturePath:string = this.manager.getScenePath();
            if (texture != null && texture.name && texture.name !== "") {
                this._shuriken.particleTexture = new BABYLON.Texture((texturePath + texture.name), this.scene);
            }
        }
    }
}
