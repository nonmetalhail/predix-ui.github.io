(function(){'use strict';window.PxMapBehavior=window.PxMapBehavior||{},PxMapBehavior.ElementImpl={beforeRegister:function(){this.elementInst=null},attached:function(){this.__elAttached=!0},detached:function(){this.__elAttached=!1},notifyInstReady:function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:!0;return!!a&&(this.fire('px-map-element-ready-to-add'),!0)},shouldAddInst:function(){if(!this.elementInst){var a=this.__initialOptions=this.getInstOptions();this.elementInst=this.createInst(a),this.fire('px-map-element-instance-created')}this.__instEvents=this.__instEvents||[],this.__instEventsElementsMap=this.__instEventsElementsMap||new WeakMap},shouldRemoveInst:function(){this.unbindAllEvents(this.__instEvents,this.__instEventsElementsMap),this.__instEvents=null,this.__instEventsElementsMap=null},shouldUpdateInst:function(){if(!this.elementInst&&this.__elAttached&&this.canAddInst()&&this.notifyInstReady(this.canAddInst()),!!this.elementInst){var a=this.__lastOptions||this.__initialOptions,b=this.getInstOptions();this.updateInst(a,b),this.__lastOptions=b}},createInst:function(){throw new Error('The `createInst` method must be implemented.')},updateInst:function(){throw new Error('The `updateInst` method must be implemented.')},getInstOptions:function(){throw new Error('The `getInstOptions` method must be implemented.')},addInst:function(){throw new Error('The `bindInst` method must be implemented.')},removeInst:function(){throw new Error('The `unbindInst` method must be implemented.')},extendObj:function(a){if(!a||!(a instanceof Object))throw new Error('The first parameter of `extendObj` must be an object to be mutated.');for(var b=arguments.length,c=Array(1<b?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];return c.length&&Object.assign.apply(Object,[a].concat(c)),a},addProperties:function(){this.properties=this.properties||{};for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return b.length&&this.extend.apply(this,[this.properties].concat(b)),this.properties},bindEvents:function(a,b){if('object'===('undefined'===typeof a?'undefined':babelHelpers.typeof(a))&&Object.keys(a).length){var c=b||this.elementInst;if(c&&c.on){var d=this.__instEvents,e=this.__instEventsElementsMap,f=Object.keys(a);f.forEach(function(b){var f={name:b,fn:a[b]};c.on(f.name,f.fn),d.push(f),e.set(f,c)})}}},unbindAllEvents:function(a,b){a&&a.length&&b&&a.forEach(function(a){var c=b.get(a);if(c&&c.off){var d=a.name,e=a.fn;c.off(d,e),b.delete(a)}})},isShadyScoped:function(){return!Polymer.Settings.useNativeShadow},getShadyScope:function(){return'style-scope px-map'}},PxMapBehavior.Element=[PxMapBehavior.ElementImpl]})();