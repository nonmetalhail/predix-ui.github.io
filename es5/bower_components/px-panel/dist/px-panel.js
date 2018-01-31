'use strict';(function(){Polymer({is:'px-panel',behaviors:[Polymer.IronResizableBehavior,Polymer.IronA11yKeysBehavior],listeners:{"iron-resize":'_handleResize'},keyBindings:{esc:'close'},hostAttributes:{role:'region'},properties:{position:{type:String,value:'right',observer:'_handleResize'},opened:{type:Boolean,value:!1,notify:!0,observer:'_handleResize'},fixed:{type:Boolean,value:!1,observer:'_handleResize'},persistent:{type:Boolean,value:!1,observer:'_persistentChanged'},background:{type:String,value:'light'},floating:{type:Boolean,value:!1},minimizable:{type:Boolean,value:!1},_fullSize:{type:Boolean,value:!1},keyEventTarget:{type:Object,value:function(){return document.body}}},open:function(){this.opened=!0},close:function(){this.persistent||(this.opened=!1)},_getContainerClasses:function(a,b,c,d,e,f,g,h){var i=[a,b];return c&&i.push('fixed'),d&&i.push('persistent'),e&&i.push('opened'),f&&i.push('floating'),g&&i.push('minimizable'),h&&i.push('full-size'),i.join(' ')},_persistentChanged:function(a){a&&!this.opened&&this.open()},_handleResize:function(){var a='measure-available-width';return'number'===typeof this._availableWidth?void(this.isDebouncerActive(a)&&this.cancelDebouncer(a),this.debounce(a,this._measureAvailableWidth.bind(this),100)):void this._measureAvailableWidth()},_measureAvailableWidth:function(){this._fullSize=this.fixed?('left'===this.position||'right'===this.position)&&600>window.innerWidth||('top'===this.position||'bottom'===this.position)&&600>window.innerHeight:('left'===this.position||'right'===this.position)&&600>this.parentNode.getBoundingClientRect().width||('top'===this.position||'bottom'===this.position)&&600>this.parentNode.getBoundingClientRect().height},_isHidden:function(a,b){return a&&b||!a}})})();