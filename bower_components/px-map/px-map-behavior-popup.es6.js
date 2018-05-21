(function(){"use strict";window.PxMapBehavior=window.PxMapBehavior||{};PxMapBehavior.PopupImpl={properties:{closeOnControlInteract:{type:Boolean,value:!1},opened:{type:Boolean,value:!1,observer:"shouldUpdateInst",notify:!0}},addInst:function addInst(parent){if(parent&&parent.getPopup&&parent.getPopup()!==this.elementInst){parent.bindPopup(this.elementInst);if(this.opened){parent.openPopup()}var controlClickFn=this._handleControlClick.bind(this,parent);this.bindEvents({controlclick:controlClickFn},parent._mapToAdd);var popupOpenFn=this._handlePopupOpenChange.bind(this,!0),popupCloseFn=this._handlePopupOpenChange.bind(this,!1);this.bindEvents({popupopen:popupOpenFn,popupclose:popupCloseFn},parent)}},_handlePopupOpenChange:function _handlePopupOpenChange(opened){this.opened=opened},removeInst:function removeInst(parent){if(parent&&parent.getPopup&&parent.getPopup()===this.elementInst){parent.unbindPopup(this.elementInst)}},updateInst:function updateInst(lastOptions,nextOptions){if(lastOptions.opened!==nextOptions.opened){if(nextOptions.opened&&!this.elementInst.isOpen()){this.elementInst._source.openPopup()}else if(!nextOptions.opened&&this.elementInst.isOpen()){this.elementInst._source.closePopup()}}},getInstOptions:function getInstOptions(){return{opened:this.opened}},_handleControlClick:function _handleControlClick(parent){if(this.closeOnControlInteract&&parent&&parent.closePopup){parent.closePopup()}}};PxMapBehavior.Popup=[PxMapBehavior.Layer,PxMapBehavior.PopupImpl];PxMapBehavior.InfoPopupImpl={properties:{title:{type:String,observer:"shouldUpdateInst"},description:{type:String,observer:"shouldUpdateInst"},imgSrc:{type:String,observer:"shouldUpdateInst"}},createInst:function createInst(options){return new PxMap.InfoPopup(options)},updateInst:function updateInst(lastOptions,nextOptions){PxMapBehavior.PopupImpl.updateInst.call(this,lastOptions,nextOptions);var updates={};if(lastOptions.title!==nextOptions.title){updates.title=nextOptions.title}if(lastOptions.description!==nextOptions.description){updates.description=nextOptions.description}if(lastOptions.imgSrc!==nextOptions.imgSrc){updates.imgSrc=nextOptions.imgSrc}if(Object.keys(updates).length){this.elementInst.updateSettings(updates)}},getInstOptions:function getInstOptions(){var opts=PxMapBehavior.PopupImpl.getInstOptions.call(this);return Object.assign({},opts,{title:this.title,description:this.description,imgSrc:this.imgSrc,styleScope:this.isShadyScoped()?this.getShadyScope():void 0})}};PxMapBehavior.InfoPopup=[PxMapBehavior.Popup,PxMapBehavior.InfoPopupImpl];PxMapBehavior.DataPopupImpl={properties:{title:{type:String,observer:"shouldUpdateInst"},data:{type:Object,value:function value(){return{}},observer:"shouldUpdateInst"}},canAddInst:function canAddInst(){return this.data&&"object"===babelHelpers.typeof(this.data)&&Object.keys(this.data).length},createInst:function createInst(options){return new PxMap.DataPopup(options)},updateInst:function updateInst(lastOptions,nextOptions){PxMapBehavior.PopupImpl.updateInst.call(this,lastOptions,nextOptions);var updates={};if(lastOptions.title!==nextOptions.title){updates.title=nextOptions.title}if(lastOptions.dataHash!==nextOptions.dataHash){updates.data=nextOptions.data}if(Object.keys(updates).length){this.elementInst.updateSettings(updates)}},getInstOptions:function getInstOptions(){var opts=PxMapBehavior.PopupImpl.getInstOptions.call(this),data=this._getValidData();return Object.assign({},opts,{title:this.title,data:data,dataHash:JSON.stringify(data),styleScope:this.isShadyScoped()?this.getShadyScope():void 0})},_getValidData:function _getValidData(){if("object"!==babelHelpers.typeof(this.data)){console.log("PX-MAP CONFIGURATION ERROR:\n          You entered an invalid `data` attribute for ".concat(this.is,". You must pass a valid object.\n          An attribute of type `").concat(babelHelpers.typeof(this.data),"` was passed."));return{}}return this.data}};PxMapBehavior.DataPopup=[PxMapBehavior.Popup,PxMapBehavior.DataPopupImpl];window.PxMap=window.PxMap||{};var InfoPopup=function(_L$Popup){babelHelpers.inherits(InfoPopup,_L$Popup);function InfoPopup(){var _this,settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};babelHelpers.classCallCheck(this,InfoPopup);_this=babelHelpers.possibleConstructorReturn(this,(InfoPopup.__proto__||Object.getPrototypeOf(InfoPopup)).call(this));_this._createPopup(settings);return babelHelpers.possibleConstructorReturn(_this,babelHelpers.assertThisInitialized(_this))}babelHelpers.createClass(InfoPopup,[{key:"onAdd",value:function onAdd(map){if(map.__addShadyScope&&!Polymer.Element){var srcPane=this.getPane(),srcFn=srcPane.appendChild;srcPane.appendChild=function(el){map.__addShadyScope(el,!1);var d=Polymer.dom(srcPane);d.appendChild(el)}}L.Popup.prototype.onAdd.call(this,map);if(map.__addShadyScope&&!Polymer.Element){srcPane.appendChild=srcFn}}},{key:"_updateContent",value:function _updateContent(){if(this._map&&this._map.__addShadyScope&&this._content.length){var srcNode=this._contentNode,fakeNode={innerHTML:null};this._contentNode=fakeNode}L.DivOverlay.prototype._updateContent.call(this);if(this._map&&this._map.__addShadyScope&&this._content.length){if("string"===typeof fakeNode.innerHTML){Polymer.dom(srcNode).innerHTML=fakeNode.innerHTML}this._contentNode=srcNode}}},{key:"_createPopup",value:function _createPopup(){var settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};this.settings=settings;var title=settings.title,description=settings.description,imgSrc=settings.imgSrc,styleScope=settings.styleScope,content=this._generatePopupContent(title,description,imgSrc),className="map-popup-info ".concat(styleScope||"");this.initialize({className:className,maxWidth:400,minWidth:300});this.setContent(content)}},{key:"_generatePopupContent",value:function _generatePopupContent(title,description,imgSrc){var _this2=this,tmplFnIf=function(fn){for(var _len=arguments.length,vals=Array(1<_len?_len-1:0),_key=1;_key<_len;_key++){vals[_key-1]=arguments[_key]}return vals.length&&vals[0]!==void 0?fn.call.apply(fn,[_this2].concat(vals)):""};return"\n        <section class=\"map-box-info\">\n          ".concat(tmplFnIf(function imgTmpl(imgSrc){return"\n        <div class=\"map-box-info__image\">\n          <img src=\"".concat(imgSrc,"\" />\n        </div>\n      ")},imgSrc),"\n          <div class=\"map-box-info__content\">\n            ").concat(tmplFnIf(function titleTmpl(title){return"\n        <p class=\"map-box-info__title\">".concat(title,"</p>\n      ")},title),"\n            ").concat(tmplFnIf(function descriptionTmpl(description){return"\n        <p class=\"map-box-info__description\">".concat(description,"</p>\n      ")},description),"\n          </div>\n        </section>\n      ")}},{key:"updateSettings",value:function updateSettings(){var settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};Object.assign(this.settings,settings);var _this$settings=this.settings,title=_this$settings.title,description=_this$settings.description,imgSrc=_this$settings.imgSrc,styleScope=_this$settings.styleScope,content=this._generatePopupContent(title,description,imgSrc);this.setContent(content);this.update()}}]);return InfoPopup}(L.Popup);PxMap.InfoPopup=InfoPopup;var DataPopup=function(_L$Popup2){babelHelpers.inherits(DataPopup,_L$Popup2);function DataPopup(){var _this3,settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};babelHelpers.classCallCheck(this,DataPopup);_this3=babelHelpers.possibleConstructorReturn(this,(DataPopup.__proto__||Object.getPrototypeOf(DataPopup)).call(this));_this3._createPopup(settings);return babelHelpers.possibleConstructorReturn(_this3,babelHelpers.assertThisInitialized(_this3))}babelHelpers.createClass(DataPopup,[{key:"onAdd",value:function onAdd(map){if("object"!==babelHelpers.typeof(this.settings.data)||0===Object.keys(this.settings.data).length){return}if(map.__addShadyScope&&!Polymer.Element){var srcPane=this.getPane(),srcFn=srcPane.appendChild;srcPane.appendChild=function(el){map.__addShadyScope(el,!1);Polymer.dom(srcPane).appendChild(el)}}L.Popup.prototype.onAdd.call(this,map);if(map.__addShadyScope&&!Polymer.Element){srcPane.appendChild=srcFn}}},{key:"_updateContent",value:function _updateContent(){if(this._map&&this._map.__addShadyScope&&this._content.length){var srcNode=this._contentNode,fakeNode={innerHTML:null};this._contentNode=fakeNode}L.DivOverlay.prototype._updateContent.call(this);if(this._map&&this._map.__addShadyScope&&this._content.length){if("string"===typeof fakeNode.innerHTML){Polymer.dom(srcNode).innerHTML=fakeNode.innerHTML}this._contentNode=srcNode}}},{key:"_createPopup",value:function _createPopup(){var settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},config=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{};this.settings=settings;var title=settings.title,data=settings.data,styleScope=settings.styleScope,content=this._generatePopupContent(title,data),className="map-popup-data ".concat(styleScope||"");this.initialize({className:className,maxWidth:400,minWidth:300});this.setContent(content)}},{key:"_generatePopupContent",value:function _generatePopupContent(title,data){var _this4=this,tmplFnIf=function(fn){for(var _len2=arguments.length,vals=Array(1<_len2?_len2-1:0),_key2=1;_key2<_len2;_key2++){vals[_key2-1]=arguments[_key2]}return vals.length&&vals[0]!==void 0?fn.call.apply(fn,[_this4].concat(vals)):""},dataItemTmpl=function(label,value){return"\n        <div class=\"map-data-box__table__cell\"><p>".concat(label,"</p></div>\n        <div class=\"map-data-box__table__cell\"><p>").concat(value,"</p></div>\n      ")};return"\n        <section class=\"map-box-data\">\n          ".concat(tmplFnIf(function titleTmpl(title){return"\n        <div class=\"map-data-box__header\">\n          <h3 class=\"map-data-box__header__text\">".concat(title,"</h3>\n        </div>\n      ")},title),"\n          ").concat(tmplFnIf(function dataTmpl(data){var dataList=Object.keys(data).reduce(function(accum,key){return accum.concat([dataItemTmpl(key,data[key])])},[]).join("");return"\n          <div class=\"map-data-box__table\">\n            ".concat(dataList,"\n          </div>\n        ")},data),"\n        </section>\n      ")}},{key:"updateSettings",value:function updateSettings(){var settings=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};Object.assign(this.settings,settings);var _this$settings2=this.settings,title=_this$settings2.title,data=_this$settings2.data,content=this._generatePopupContent(title,data);if(this.isOpen()&&0===Object.keys(data).length){this._close()}this.setContent(content);this.update()}}]);return DataPopup}(L.Popup);PxMap.DataPopup=DataPopup})();