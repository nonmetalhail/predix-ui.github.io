(function(){Polymer({is:"px-app-header",properties:{fixed:{type:Boolean,value:!1,observer:"_fixedChanged"},_condenses:{type:Boolean,value:!0},_scrollEffect:{type:String,value:"px-app-header-scroll-effect"}},ready:function ready(){var _this=this;Polymer.dom(this.root).querySelector("app-header").addEventListener("px-app-header-scroll-reset",function(){_this._setHeaderFixedState()})},_setHeaderFixedState:function _setHeaderFixedState(){this._condenses=!this.fixed;this.fixed?this._scrollEffect="":this._scrollEffect="px-app-header-scroll-effect"},_fixedChanged:function _fixedChanged(){if(!Polymer.dom(this.root).querySelector("app-header").willCondense()){this._setHeaderFixedState()}}})})();