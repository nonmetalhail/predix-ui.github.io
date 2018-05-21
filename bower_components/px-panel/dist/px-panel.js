"use strict";(function(){Polymer({is:"px-panel",behaviors:[Polymer.IronResizableBehavior,Polymer.IronA11yKeysBehavior],listeners:{"iron-resize":"_handleResize"},keyBindings:{esc:"close"},hostAttributes:{role:"region"},properties:{position:{type:String,value:"right",observer:"_handleResize"},opened:{type:Boolean,value:!1,notify:!0,observer:"_handleResize"},fixed:{type:Boolean,value:!1,observer:"_handleResize"},persistent:{type:Boolean,value:!1,observer:"_persistentChanged"},background:{type:String,value:"light"},floating:{type:Boolean,value:!1},minimizable:{type:Boolean,value:!1},_fullSize:{type:Boolean,value:!1},keyEventTarget:{type:Object,value:function(){return document.body}}},open:function(){this.opened=!0},close:function(){if(!this.persistent){this.opened=!1}},_getContainerClasses:function(position,background,fixed,persistent,opened,floating,minimizable,fullSize){var classes=[position,background];if(fixed)classes.push("fixed");if(persistent)classes.push("persistent");if(opened)classes.push("opened");if(floating)classes.push("floating");if(minimizable)classes.push("minimizable");if(fullSize)classes.push("full-size");return classes.join(" ")},_persistentChanged:function(newValue){if(newValue&&!this.opened){this.open()}},_handleResize:function(){var debouncer="measure-available-width";if("number"!==typeof this._availableWidth){this._measureAvailableWidth();return}if(this.isDebouncerActive(debouncer)){this.cancelDebouncer(debouncer)}this.debounce(debouncer,this._measureAvailableWidth.bind(this),100)},_measureAvailableWidth:function(){if(this.fixed){if(("left"===this.position||"right"===this.position)&&600>window.innerWidth||("top"===this.position||"bottom"===this.position)&&600>window.innerHeight){this._fullSize=!0}else{this._fullSize=!1}}else{if(("left"===this.position||"right"===this.position)&&600>this.parentNode.getBoundingClientRect().width||("top"===this.position||"bottom"===this.position)&&600>this.parentNode.getBoundingClientRect().height){this._fullSize=!0}else{this._fullSize=!1}}},_isHidden:function(minimizable,opened){return minimizable&&opened||!minimizable}})})();