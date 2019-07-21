
/// <reference path="babylon.d.ts" />
/// <reference path="babylon.scenecomponents.ts" />
/// <reference path="babylon.scenemanager.ts" />

module BABYLON {
    export class ToolkitProgress implements BABYLON.ILoadingScreen {
        public borderPrefix:string = "4px solid";
        public panelElement:HTMLElement = null;
        public loaderElement:HTMLElement = null;
        public statusElement:HTMLElement = null;
        public projectElement:HTMLElement = null;
        //optional, but needed due to interface definitions
        public loadingUIBackgroundColor: string
        constructor(public loadingUIText: string) {}
        //optional, status element progress coloring
        private _statusColor:string = "#0000ff";
        public get statusColor():string { return this._statusColor }
        public set statusColor(color:string) {
            this._statusColor = color;
            if (this.loaderElement != null) {
                this.loaderElement.style.borderTop = (this.borderPrefix + " " + this._statusColor);
            }
        }
        //required, and needed due to interface definitions
        public displayLoadingUI() {
            if (this.panelElement != null) this.panelElement.className = "";
            if (this.loaderElement != null) this.loaderElement.className = "";
            if (this.statusElement != null) this.statusElement.className = "";
            if (this.projectElement != null) this.projectElement.className = "";
            this.updateLoadingUI();
        }
        public updateLoadingUI() {
            if (this.statusElement != null && this.statusElement.innerHTML !== this.loadingUIText) {
                this.statusElement.innerHTML = this.loadingUIText;
            }
        }
        public hideLoadingUI() {
            if (this.panelElement != null) this.panelElement.className = "hidden";
            if (this.loaderElement != null) this.loaderElement.className = "hidden";
            if (this.statusElement != null) this.statusElement.className = "hidden";
            if (this.projectElement != null) this.projectElement.className = "hidden";
        }
    }
}
// ..
// STATS Plugin Support
// ..
declare class Stats {
	REVISION: number;
	dom: HTMLElement;
	showPanel(value: number): void;
	begin(): void;
	end(): number;
	update(): void;
	addPanel(pane: any): any;
	static Panel: any;
}
// ..
// requestAnimationFrame() Original Shim By: Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// ..
var TimerPlugin:any = window;
TimerPlugin.requestAnimFrame = (function() {
	return  TimerPlugin.requestAnimationFrame || 
			TimerPlugin.webkitRequestAnimationFrame || 
			TimerPlugin.mozRequestAnimationFrame || 
			TimerPlugin.oRequestAnimationFrame || 
			TimerPlugin.msRequestAnimationFrame || function(callback, element){ TimerPlugin.setTimeout(callback, 1000 / 60); };
})();
/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
TimerPlugin.requestInterval = function(fn, delay) {
	if( !TimerPlugin.requestAnimationFrame && 
		!TimerPlugin.webkitRequestAnimationFrame && 
		!(TimerPlugin.mozRequestAnimationFrame && TimerPlugin.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
        !TimerPlugin.oRequestAnimationFrame &&
        !TimerPlugin.msRequestAnimationFrame)
			return TimerPlugin.setInterval(fn, delay);
			
    let start = TimerPlugin.getTimeMilliseconds();
	let	handle:any = new Object();
	function loop() {
		let current = TimerPlugin.getTimeMilliseconds(), delta = current - start;
		if(delta >= delay) {
			fn.call();
			start = TimerPlugin.getTimeMilliseconds();
		}
		handle.value = TimerPlugin.requestAnimFrame(loop);
    };
    // ..
	handle.value = TimerPlugin.requestAnimFrame(loop);
	return handle;
}
/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
    TimerPlugin.clearRequestInterval = function(handle) {
    TimerPlugin.cancelAnimationFrame ? TimerPlugin.cancelAnimationFrame(handle.value) :
    TimerPlugin.webkitCancelAnimationFrame ? TimerPlugin.webkitCancelAnimationFrame(handle.value) :
    TimerPlugin.webkitCancelRequestAnimationFrame ? TimerPlugin.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    TimerPlugin.mozCancelRequestAnimationFrame ? TimerPlugin.mozCancelRequestAnimationFrame(handle.value) :
    TimerPlugin.oCancelRequestAnimationFrame	? TimerPlugin.oCancelRequestAnimationFrame(handle.value) :
    TimerPlugin.msCancelRequestAnimationFrame ? TimerPlugin.msCancelRequestAnimationFrame(handle.value) :
    clearInterval(handle);
    handle = null;
};
/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
TimerPlugin.requestTimeout = function(fn, delay) {
	if( !TimerPlugin.requestAnimationFrame      	&& 
		!TimerPlugin.webkitRequestAnimationFrame && 
		!(TimerPlugin.mozRequestAnimationFrame && TimerPlugin.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		!TimerPlugin.oRequestAnimationFrame      && 
		!TimerPlugin.msRequestAnimationFrame)
			return TimerPlugin.setTimeout(fn, delay);
			
	let start = TimerPlugin.getTimeMilliseconds();
    let	handle:any = new Object();
	function loop(){
		let current = TimerPlugin.getTimeMilliseconds(), delta = current - start;
		delta >= delay ? fn.call() : handle.value = TimerPlugin.requestAnimFrame(loop);
    };
    // ..
	handle.value = TimerPlugin.requestAnimFrame(loop);
	return handle;
};
/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
TimerPlugin.clearRequestTimeout = function(handle) {
    TimerPlugin.cancelAnimationFrame ? TimerPlugin.cancelAnimationFrame(handle.value) :
    TimerPlugin.webkitCancelAnimationFrame ? TimerPlugin.webkitCancelAnimationFrame(handle.value) :
    TimerPlugin.webkitCancelRequestAnimationFrame ? TimerPlugin.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    TimerPlugin.mozCancelRequestAnimationFrame ? TimerPlugin.mozCancelRequestAnimationFrame(handle.value) :
    TimerPlugin.oCancelRequestAnimationFrame	? TimerPlugin.oCancelRequestAnimationFrame(handle.value) :
    TimerPlugin.msCancelRequestAnimationFrame ? TimerPlugin.msCancelRequestAnimationFrame(handle.value) :
    clearTimeout(handle);
    handle = null;
};
/**
 * Return the game time in total milliseconds
 */
TimerPlugin.getTimeMilliseconds = function () {
    return BABYLON.Tools.Now;
}
// ..
// Validate Unversial Windows Platform Support
// ..
if (BABYLON.SceneManager.IsWindows()) {
    if (typeof Windows.UI.ViewManagement !== "undefined" && typeof Windows.UI.ViewManagement.ApplicationViewBoundsMode !== "undefined" && typeof Windows.UI.ViewManagement.ApplicationViewBoundsMode.useCoreWindow !== "undefined") {
        Windows.UI.ViewManagement.ApplicationView.getForCurrentView().setDesiredBoundsMode(Windows.UI.ViewManagement.ApplicationViewBoundsMode.useCoreWindow);
    }
}
// ..
// Process Window Load And Device Ready Handlers
// ..
window.addEventListener("load", ()=>{
    if ((<any>window).ontoolkitload) {
        (<any>window).ontoolkitload();
    }
    document.addEventListener("deviceready", ()=>{
        if ((<any>navigator).splashscreen) {
            (<any>navigator).splashscreen.hide();
        }
        if ((<any>window).ontoolkitdevice) {
            (<any>window).ontoolkitdevice();
        }
    }, false);
}, false);
