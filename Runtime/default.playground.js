// Project Script Bundle
globalThis['default.playground.js']=true;


// default.playground.js
"use strict";var PROJECT;(function(PROJECT){class MyCustomRotator extends TOOLKIT.ScriptComponent{rotationSpeed=1.0;constructor(transform,scene,properties={},alias="PROJECT.MyCustomRotator"){super(transform,scene,properties,alias);console.log("MyCustomRotator script created with properties:",properties)}awake(){console.log("MyCustomRotator script awake!")}start(){console.log("MyCustomRotator script start!")}update(){this.transform.addRotation(0,this.rotationSpeed*this.getDeltaTime(),0)}}PROJECT.MyCustomRotator=MyCustomRotator;TOOLKIT.SceneManager.RegisterClass("PROJECT.MyCustomRotator",MyCustomRotator)})(PROJECT||(PROJECT={}))

