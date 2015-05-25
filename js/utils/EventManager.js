define(function () {
	"use strict";

	var slice = [].slice;

    function EventManager() {
        this._events = {};
    }
	
	var proto = EventManager.prototype;
	
    //register event callback
    proto.on = function (eventName, fn, scope) {
		var self = this, list = this._events[eventName] || (this._events[eventName]=[]);
		list.push({
			scope: scope || self,
			fn: fn
		});
		return this;
	};
	
	//fire event
	proto.emit = function (eventName) {
		var list = this._events[eventName];
		if (list) {
			var args = slice.call(arguments, 1);
			for (var i = 0, j = list.length; i < j; i++) {
				var callFn = list[i];
				callFn.fn.apply(callFn.scope, args);
			}
		}
		return this;
	};
       
	//off event
	proto.off = function (eventName, fn, scope) {
		var list = this._events[eventName], ctx = scope || this, len, callFn;
		if(list){
			if(fn){
				len = list.length;
				while(len--){
					callFn = list[len];
					if(fn == callFn.fn && ctx == callFn.scope){
						list.splice(len, 1);
					}
				}
			}else{
				delete this._events[eventName];
			}
		}
		return this;
	};
	
	//destroy event mananger
	proto.destroy = function () {
		delete this._events;
	};
	
    return EventManager;
});