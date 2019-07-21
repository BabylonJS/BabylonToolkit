/// <reference path="babylon.d.ts" />
/// <reference path="babylon.scenecomponents.ts" />
/// <reference path="babylon.scenemanager.ts" />

module BABYLON {
    /* Shuriken Particle System Bursts */
    export interface IShurikenBusrt {
        time:number;
        minCount:number;
        maxCount:number;
    }
    /* Shuriken Particle System Curves */
    export interface IShurikenCurve {
        length:number;
        preWrapMode:string;
        postWrapMode:string;
        keyframes:BABYLON.IShurikenKeyframe[];
    }
    /* Shuriken Particle System Keyframe */
    export interface IShurikenKeyframe {
        time:number;
        value:number;
        inTangent:number;
        outTangent:number;
        tangentMode:number;
    }
    /* Shuriken Particle System Interface */
    export type IShurikenParticleSystem = BABYLON.ShurikenParticleSystem | BABYLON.GPUShurikenParticleSystem;
    /* Shuriken Style Particle System Class */
    export class ShurikenParticleSystem extends BABYLON.ParticleSystem {
        public static get EMISSION_RATE():number { return 0; }
        public static get EMISSION_BURST():number { return 1; }
        
        public emitType:number = ShurikenParticleSystem.EMISSION_RATE;
        public loopPlay:boolean = false;
        public delayTime:number = 0.0;
        private _self:any = null;
        private _duration:number = 0.0;
        private _startSpeed:number = -1;
        private _emissionBurst:BABYLON.IShurikenBusrt[] = null;
        public getDuration():number { return this._duration; }
        constructor(name: string, capacity: number, scene: BABYLON.Scene, duration:number = 0.0, emission:number = ShurikenParticleSystem.EMISSION_RATE, startSpeed:number= 0.01, emissionBurst:BABYLON.IShurikenBusrt[] = null) {
            super(name, capacity, scene);
            this._self = this;
            this._duration = duration;
            this._startSpeed = startSpeed;
            this._emissionBurst = emissionBurst;

            this.delayTime = 0.0;
            this.loopPlay = false;
            this.emitType = emission;
            this.updateSpeed = startSpeed;
            this.targetStopDuration = 0;
            this.updateFunction = this.defaultUpdateFunctionHandler;
            this.manualEmitCount = (this.emitType === ShurikenParticleSystem.EMISSION_BURST) ? 0 : -1;
        }
        
        /** Babylon Particle System Overrides */

        public start() : void {
            this.internalStop(false);
            this.updateSpeed = this._startSpeed;
            this.targetStopDuration = 0;
            if (this.emitType === ShurikenParticleSystem.EMISSION_BURST) {
                // Shuriken time based burst emissions
                if (this._emissionBurst != null && this._emissionBurst.length > 0) {
                    this._emissionBurst.forEach((burst:BABYLON.IShurikenBusrt) => {
                        this.internalPlay(this.delayTime + burst.time, burst.minCount, burst.maxCount);
                    });
                }
            } else {
                // Standard stream based rate emissions
                this.internalPlay(this.delayTime);
            }
            // Shuriken time based updates and cycling
            if (this._duration > 0.0) {
                let cycleLength:number = (this.delayTime + this._duration);
                BABYLON.SceneManager.GetInstance().delay(()=>{ this.internalCycle(); }, cycleLength * 1000);
            }
        }

        public stop():void {
            this.internalStop(true);
        }
        
        public dispose() :void {
            this.internalStop(true);
            this._emissionBurst = null;
            super.dispose();
        }
        
        /* Shuriken Particle System Internal Worker Functions */
        
        private get internalScene(): BABYLON.Scene {
            return (<any>this)._scene;
        }
        
        private internalPlay(delay:number = 0.0, min:number = -1, max:number = -1, ):void {
            if (delay > 0.0) {
                BABYLON.SceneManager.GetInstance().delay(()=>{ this.internalStart(min, max); }, delay * 1000);
            } else {
                this.internalStart(min, max);
            }
        }

        private internalCycle():void {
            this.stop();
            if (this.loopPlay === true) {
                 this.start(); 
            }
        }        
        
        private internalStart(min:number, max):void {
            let emitCount = (this.emitType === ShurikenParticleSystem.EMISSION_BURST) ? 0 : -1;
            if (this.emitType === ShurikenParticleSystem.EMISSION_BURST && min >= 1.0 && max >= 1.0) {
                emitCount = BABYLON.Scalar.RandomRange(min, max);
            }
            this.manualEmitCount = emitCount;
            super.start();
        }
        
        private internalStop(force:boolean = false):void {
            if (force === false) {
                let pSystem:any = (<any>this);
                if(pSystem != null && pSystem._started && !pSystem._stopped) {
                    super.stop();
                }
            } else {
                super.stop();
            }
        }

        /* Shuriken Particle System Update Module Functions */

        public getParticles(): Array<BABYLON.Particle> {
            return (<any>this).particles;
        }

        public defaultUpdateFunctionHandler(particles: BABYLON.Particle[]): void {
            if (this._self != null) {
                for (let index = 0; index < particles.length; index++) {
                    let particle = particles[index];
                    particle.age += this._self._scaledUpdateSpeed;

                    if (particle.age >= particle.lifeTime) { // Recycle by swapping with last particle
                        this._self._emitFromParticle(particle);
                        this._self.recycleParticle(particle);
                        index--;
                        continue;
                    }
                    else {
                        particle.colorStep.scaleToRef(this._self._scaledUpdateSpeed, this._self._scaledColorStep);
                        particle.color.addInPlace(this._self._scaledColorStep);

                        if (particle.color.a < 0)
                            particle.color.a = 0;

                        particle.angle += particle.angularSpeed * this._self._scaledUpdateSpeed;

                        particle.direction.scaleToRef(this._self._scaledUpdateSpeed, this._self._scaledDirection);
                        particle.position.addInPlace(this._self._scaledDirection);

                        this._self.gravity.scaleToRef(this._self._scaledUpdateSpeed, this._self._scaledGravity);
                        particle.direction.addInPlace(this._self._scaledGravity);

                        if (this._self._isAnimationSheetEnabled) {
                            particle.updateCellIndex();
                        }
                    }
                }
            }
        }
    }
    /* GPU - Shuriken Style Particle System Class */
    export class GPUShurikenParticleSystem extends BABYLON.GPUParticleSystem {
        public loopPlay:boolean = false;
        public delayTime:number = 0.0;
        private _self:any = null;
        private _duration:number = 0.0;
        private _startSpeed:number = -1;
        public getDuration():number { return this._duration; }
        constructor(name: string, capacity: number, scene: BABYLON.Scene, size:number = 4096, duration:number = 0.0, startSpeed:number= 0.01) {
            super(name, { capacity: capacity, randomTextureSize: size }, scene);
            this._self = this;
            this._duration = duration;
            this._startSpeed = startSpeed;

            this.delayTime = 0.0;
            this.loopPlay = false;
            this.updateSpeed = startSpeed;
            this.targetStopDuration = 0;
        }
        
        /** Babylon Particle System Overrides */

        public start() : void {
            this.internalStop(false);
            this.updateSpeed = this._startSpeed;
            this.targetStopDuration = 0;
            // Standard rate based emissions
            this.internalPlay(this.delayTime);
            // Shuriken time based cycling
            if (this._duration > 0.0) {
                let cycleLength:number = (this.delayTime + this._duration);
                BABYLON.SceneManager.GetInstance().delay(()=>{ this.internalCycle(); }, cycleLength * 1000);
            }
        }

        public stop():void {
            this.internalStop(true);
        }
        
        public dispose() :void {
            this.internalStop(true);
            super.dispose();
        }
        
        /* Shuriken Particle System Internal Worker Functions */
        
        //private get internalScene(): BABYLON.Scene {
        //    return (<any>this)._scene;
        //}
        
        private internalPlay(delay:number = 0.0, min:number = -1, max:number = -1, ):void {
            if (delay > 0.0) {
                BABYLON.SceneManager.GetInstance().delay(()=>{ this.internalStart(min, max); }, delay * 1000);
            } else {
                this.internalStart(min, max);
            }
        }

        private internalCycle():void {
            this.stop();
            if (this.loopPlay === true) {
                 this.start(); 
            }
        }        
        
        private internalStart(min:number, max):void {
            super.start();
        }
        
        private internalStop(force:boolean = false):void {
            if (force === false) {
                let pSystem:any = (<any>this);
                if(pSystem != null && pSystem._started && !pSystem._stopped) {
                    super.stop();
                }
            } else {
                super.stop();
            }
        }
    }
}
