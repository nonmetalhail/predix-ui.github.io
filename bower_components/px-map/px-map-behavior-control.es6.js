(function(){"use strict";window.PxMapBehavior=window.PxMapBehavior||{};PxMapBehavior.ControlImpl={properties:{position:{type:String,value:"bottomright",observer:"shouldUpdateInst"}},addInst:function addInst(parent){this.elementInst.addTo(parent)},removeInst:function removeInst(){this.elementInst.remove()},getInstOptions:function getInstOptions(){return{position:this._getValidPosition()}},_getValidPosition:function _getValidPosition(){var positionIsValid=/^(topright|topleft|bottomright|bottomleft)$/.test(this.position);if(!positionIsValid){console.log("PX-MAP CONFIGURATION ERROR:\n          You entered an invalid `position` attribute '".concat(this.position,"' for ").concat(this.is,".\n          Position must be a string with one of the following values:\n          - 'topright'\n          - 'topleft'\n          - 'bottomright'\n          - 'bottomleft'\n          Defaulting to 'bottomright'."));return"bottomright"}return this.position}};PxMapBehavior.Control=[PxMapBehavior.Layer,PxMapBehavior.ControlImpl];PxMapBehavior.ZoomControlImpl={properties:{language:{type:String,value:"en"},resources:{type:Object,value:function value(){return{en:{"Zoom in":"Zoom in","Zoom out":"Zoom out"}}}}},createInst:function createInst(options){return new PxMap.ZoomControl(options)},updateInst:function updateInst(lastOptions,nextOptions){if(lastOptions.position!==nextOptions.position){this.elementInst.setPosition(nextOptions.position)}},getInstOptions:function getInstOptions(){var options=PxMapBehavior.ControlImpl.getInstOptions.call(this);options.position=this.position;options.zoomInText="<px-icon icon=\"px-utl:add\"></px-icon>";options.zoomOutText="<px-icon icon=\"px-utl:remove\"></px-icon>";if("function"===typeof this.localize){options.zoomInTitle=this.localize("Zoom in");options.zoomOutTitle=this.localize("Zoom out")}return options}};PxMapBehavior.ZoomControl=[Polymer.AppLocalizeBehavior,PxMapBehavior.Control,PxMapBehavior.ZoomControlImpl];PxMapBehavior.ScaleControlImpl={properties:{imperialUnits:{type:Boolean,value:!1,observer:"shouldUpdateInst"},metricUnits:{type:Boolean,value:!1,observer:"shouldUpdateInst"},reverseColors:{type:Boolean,value:!1,observer:"shouldUpdateInst"}},createInst:function createInst(options){return new PxMap.ScaleControl(options)},updateInst:function updateInst(lastOptions,nextOptions){if(lastOptions.position!==nextOptions.position){this.elementInst.setPosition(nextOptions.position)}if(lastOptions.reverseColors!==nextOptions.reverseColors){this.elementInst.setReverseColors(nextOptions.reverseColors)}if(lastOptions.metric!==nextOptions.metric){this.elementInst.showMetric(nextOptions.metric)}if(lastOptions.imperial!==nextOptions.imperial){this.elementInst.showImperial(nextOptions.imperial)}},getInstOptions:function getInstOptions(){var options=PxMapBehavior.ControlImpl.getInstOptions.call(this);options.imperial=this.imperialUnits;options.metric=this.metricUnits;options.reverseColors=this.reverseColors;return options}};PxMapBehavior.ScaleControl=[PxMapBehavior.Control,PxMapBehavior.ScaleControlImpl];PxMapBehavior.LocateControlImpl={properties:{locateTitle:{type:String,value:"Zoom to your location",observer:"shouldUpdateInst"},moveToLocation:{type:Boolean,value:!1},moveMaxZoom:{type:Number,observer:"shouldUpdateInst"},lastFoundLocation:{type:Object,value:function value(){return{}},notify:!0}},addInst:function addInst(parent){PxMapBehavior.ControlImpl.addInst.call(this,parent);var foundFn=this._handleLocationFound.bind(this),errorFn=this._handleLocationError.bind(this),tapFn=this._handleLocationTap.bind(this);this.bindEvents({locationfound:foundFn,locationerror:errorFn,controlclick:tapFn})},removeInst:function removeInst(parent){PxMapBehavior.ControlImpl.removeInst.call(this,parent)},createInst:function createInst(options){return new PxMap.LocateControl(options)},updateInst:function updateInst(lastOptions,nextOptions){if(lastOptions.position!==nextOptions.position){this.elementInst.setPosition(nextOptions.position)}if(lastOptions.moveMaxZoom!==nextOptions.moveMaxZoom){this.elementInst.setMoveMaxZoom(nextOptions.moveMaxZoom)}},getInstOptions:function getInstOptions(){return{position:this.position,locateIcon:"<px-icon icon=\"px-vis:crosshair\"></px-icon>",locateTitle:this.locateTitle,moveToLocation:this.moveToLocation,moveMaxZoom:this.moveMaxZoom}},_handleLocationFound:function _handleLocationFound(evt){if(!evt)return;var detail={lat:evt.latitude||null,lng:evt.longitude||null,timestamp:evt.timestamp||null,bounds:evt.bounds||null,accuracy:evt.bounds.getCenter()&&evt.bounds.getNorthWest()?evt.bounds.getCenter().distanceTo(evt.bounds.getNorthEast()):null};this.fire("px-map-control-locate-succeeded",detail);this.set("lastFoundLocation",detail);this.notifyPath("lastFoundLocation.*")},_handleLocationError:function _handleLocationError(evt){if(!evt)return;var detail={message:evt.message||null};this.fire("px-map-control-locate-failed",detail)},_handleLocationTap:function _handleLocationTap(evt){if(!evt||"locate"!==evt.action)return;this.fire("px-map-locate-button-tapped")}};PxMapBehavior.LocateControl=[PxMapBehavior.Control,PxMapBehavior.LocateControlImpl];window.PxMap=window.PxMap||{};var ScaleControl=function(_L$Control$Scale){babelHelpers.inherits(ScaleControl,_L$Control$Scale);function ScaleControl(){babelHelpers.classCallCheck(this,ScaleControl);return babelHelpers.possibleConstructorReturn(this,(ScaleControl.__proto__||Object.getPrototypeOf(ScaleControl)).apply(this,arguments))}babelHelpers.createClass(ScaleControl,[{key:"initialize",value:function initialize(options){babelHelpers.get(ScaleControl.prototype.__proto__||Object.getPrototypeOf(ScaleControl.prototype),"initialize",this).call(this,options)}},{key:"onAdd",value:function onAdd(map){this.__scaleContainer=babelHelpers.get(ScaleControl.prototype.__proto__||Object.getPrototypeOf(ScaleControl.prototype),"onAdd",this).call(this,map);if(!0===this.options.reverseColors){L.DomUtil.addClass(this.__scaleContainer,"leaflet-control-scale--reverse")}return this.__scaleContainer}},{key:"onRemove",value:function onRemove(map){babelHelpers.get(ScaleControl.prototype.__proto__||Object.getPrototypeOf(ScaleControl.prototype),"onRemove",this).call(this,map);this.__scaleContainer=null}},{key:"setReverseColors",value:function setReverseColors(shouldReverse){if(!this.__scaleContainer)return;if(shouldReverse&&!this.options.reverseColors){this.options.reverseColors=!0;L.DomUtil.addClass(this.__scaleContainer,"leaflet-control-scale--reverse")}if(!shouldReverse&&this.options.reverseColors){this.options.reverseColors=!1;L.DomUtil.removeClass(this.__scaleContainer,"leaflet-control-scale--reverse")}}},{key:"showImperial",value:function showImperial(shouldShowImperial){if(!this.__scaleContainer)return;if(shouldShowImperial&&!this.options.imperial&&!this._iScale){this._iScale=L.DomUtil.create("div","leaflet-control-scale-line",this.__scaleContainer);this.options.imperial=!0}if(!shouldShowImperial&&this.options.imperial&&this._iScale){this.options.imperial=!1;L.DomUtil.remove(this._iScale);this._iScale=null}this._update()}},{key:"showMetric",value:function showMetric(shouldShowMetric){if(!this.__scaleContainer)return;if(shouldShowMetric&&!this.options.metric&&!this._mScale){this._mScale=L.DomUtil.create("div","leaflet-control-scale-line",this.__scaleContainer);this.options.metric=!0}if(!shouldShowMetric&&this.options.metric&&this._mScale){this.options.metric=!1;L.DomUtil.remove(this._mScale);this._mScale=null}this._update()}}]);return ScaleControl}(L.Control.Scale);PxMap.ScaleControl=ScaleControl;var ZoomControl=function(_L$Control$Zoom){babelHelpers.inherits(ZoomControl,_L$Control$Zoom);function ZoomControl(){babelHelpers.classCallCheck(this,ZoomControl);return babelHelpers.possibleConstructorReturn(this,(ZoomControl.__proto__||Object.getPrototypeOf(ZoomControl)).apply(this,arguments))}babelHelpers.createClass(ZoomControl,[{key:"_zoomIn",value:function _zoomIn(e){babelHelpers.get(ZoomControl.prototype.__proto__||Object.getPrototypeOf(ZoomControl.prototype),"_zoomIn",this).call(this,e);if(this._map&&this._map.fire){this._map.fire("controlclick",{src:this,action:"zoomin"})}}},{key:"_zoomOut",value:function _zoomOut(e){babelHelpers.get(ZoomControl.prototype.__proto__||Object.getPrototypeOf(ZoomControl.prototype),"_zoomOut",this).call(this,e);if(this._map&&this._map.fire){this._map.fire("controlclick",{src:this,action:"zoomout"})}}},{key:"_fireZoomClickEvt",value:function _fireZoomClickEvt(){}}]);return ZoomControl}(L.Control.Zoom);PxMap.ZoomControl=ZoomControl;var LocateControl=function(_L$Control){babelHelpers.inherits(LocateControl,_L$Control);function LocateControl(){babelHelpers.classCallCheck(this,LocateControl);return babelHelpers.possibleConstructorReturn(this,(LocateControl.__proto__||Object.getPrototypeOf(LocateControl)).apply(this,arguments))}babelHelpers.createClass(LocateControl,[{key:"initialize",value:function initialize(){var options=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},composedOptions=Object.assign({position:"bottomright",className:"",locateIcon:"<px-icon icon=\"px-utl:location\"></px-icon>",locateTitle:"Zoom to your location",locateTimeout:1e4,moveToLocation:!0,moveMaxZoom:null},options);L.Util.setOptions(this,composedOptions)}},{key:"onAdd",value:function onAdd(map){this.__container=L.DomUtil.create("div","".concat("leaflet-control-locate"," leaflet-bar ").concat(this.options.className));this.__locateButton=this._createButton(this.options.locateIcon,this.options.locateTitle,"leaflet-control-locate-button",this.__container);L.DomEvent.on(map,"locationfound",this._locationFound,this);L.DomEvent.on(map,"locationerror",this._locationError,this);L.DomEvent.disableClickPropagation(this.__locateButton);L.DomEvent.on(this.__locateButton,"click",L.DomEvent.stop);L.DomEvent.on(this.__locateButton,"click",this._locate,this);L.DomEvent.on(this.__locateButton,"click",this._refocusOnMap,this);return this.__container}},{key:"onRemove",value:function onRemove(map){L.DomEvent.off(map,"locationfound",this._locationFound,this);L.DomEvent.off(map,"locationerror",this._locationError,this);L.DomEvent.off(this.__locateButton,"click",L.DomEvent.stop);L.DomEvent.off(this.__locateButton,"click",this._locate,this);L.DomEvent.off(this.__locateButton,"click",this._refocusOnMap,this)}},{key:"setMoveMaxZoom",value:function setMoveMaxZoom(zoom){if("string"===typeof zoom&&zoom.length&&!isNaN(zoom)){zoom=parseInt(zoom)}if("number"===typeof zoom&&this.options.moveMaxZoom!==zoom){this.options.moveMaxZoom=zoom}}},{key:"on",value:function on(){var _this$_map;if(!this._map){return}return(_this$_map=this._map).on.apply(_this$_map,arguments)}},{key:"off",value:function off(){var _this$_map2;if(!this._map){return}return(_this$_map2=this._map).off.apply(_this$_map2,arguments)}},{key:"_locate",value:function _locate(evt){this._map.fire("controlclick",{src:this,action:"locate"});this.locate(evt)}},{key:"locate",value:function locate(){this.__locating=!0;this._map.locate({setView:this.options.moveToLocation,maxZoom:this.options.moveMaxZoom,timeout:this.options.locateTimeout});this._setLocatingState()}},{key:"reset",value:function reset(){this._setReadyState()}},{key:"isDisabled",value:function isDisabled(){return this.__disabled||!1}},{key:"_createButton",value:function _createButton(html,title,className,container){var buttonEl=L.DomUtil.create("a",className,container);buttonEl.innerHTML=html;buttonEl.href="#";buttonEl.title=title;buttonEl.setAttribute("role","button");buttonEl.setAttribute("aria-label",title);return buttonEl}},{key:"_locationFound",value:function _locationFound(){if(this.__locating){this.__locating=!1;this._setReadyState()}}},{key:"_locationError",value:function _locationError(){if(this.__locating){this.__locating=!1;this._setReadyState()}}},{key:"_setLocatingState",value:function _setLocatingState(){if(!this.__locateButton||!this.__locating)return;L.DomUtil.addClass(this.__locateButton,"leaflet-control-locate-button--locating");this.__disabled=!0;this._updateDisabled()}},{key:"_setReadyState",value:function _setReadyState(){if(!this.__locateButton||this.__locating)return;this.__locateButton.innerHTML=this.options.locateIcon;L.DomUtil.removeClass(this.__locateButton,"leaflet-control-locate-button--locating");L.DomUtil.removeClass(this.__locateButton,"leaflet-control-locate-button--error");this.__disabled=!1;this._updateDisabled()}},{key:"_updateDisabled",value:function _updateDisabled(){if(!this.__locateButton)return;if(this.__disabled){L.DomUtil.addClass(this.__locateButton,"leaflet-control-locate-button--disabled")}if(!this.__disabled){L.DomUtil.removeClass(this.__locateButton,"leaflet-control-locate-button--disabled")}}}]);return LocateControl}(L.Control);PxMap.LocateControl=LocateControl})();