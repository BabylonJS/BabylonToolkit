// Project Script Bundle
globalThis['default.playground.js']=true;


// default.playground.js
"use strict";var MY;(function(MY){class CustomRotator extends TOOLKIT.ScriptComponent{rotationSpeed=5.0;constructor(transform,scene,properties={},alias="MY.CustomRotator"){super(transform,scene,properties,alias)}awake(){}start(){}ready(){}update(){this.transform.addRotation(0,this.rotationSpeed*this.getDeltaTime(),0)}late(){}step(){}fixed(){}after(){}reset(){}destroy(){}}MY.CustomRotator=CustomRotator;TOOLKIT.SceneManager.RegisterClass("MY.CustomRotator",CustomRotator)})(MY||(MY={}))

