(function(){"use strict";window.PxAppNavBehavior=window.PxAppNavBehavior||{};PxAppNavBehavior.MeasureText={_measureText:function _measureText(text,fontName,fontSize){var cv=this._get2dMeasureCanvas(fontName,fontSize),size=cv.measureText(text).width;return isNaN(size)?void 0:Math.round(size)},_get2dMeasureCanvas:function _get2dMeasureCanvas(fontName,fontSize){var ctx=this.__measureContextCache;if(!ctx){var cv=document.createElement("canvas");cv.height=999;cv.width=999;ctx=this.__measureContextCache=cv.getContext("2d")}var fontInfo=fontSize+" "+fontName;if(ctx.fontInfo!==fontInfo){ctx.font=fontInfo}return ctx}}})();