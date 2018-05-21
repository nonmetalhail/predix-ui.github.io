"use strict";(function(){"use strict";var _Mathfloor=Math.floor;Polymer({is:"px-vis-demos-dynamic-add",properties:{chartTypes:{type:Array,value:function(){return[{key:"px-vis-timeseries",val:"px-vis-timeseries"},{key:"px-vis-xy-chart",val:"px-vis-xy-chart"},{key:"px-vis-polar",val:"px-vis-polar"},{key:"px-vis-radar",val:"px-vis-radar"},{key:"px-vis-parallel-coordinates",val:"px-vis-parallel-coordinates"}]},readOnly:!0},selectedChartType:{type:String,value:"px-vis-timeseries"},dataSets:{type:Object,value:function(){return{"px-vis-timeseries":[{key:"dummy",val:"PLEASE GENERATE DATA"}],"px-vis-xy-chart":[{key:"dummy",val:"PLEASE GENERATE DATA"}],"px-vis-polar":[{key:"dummy",val:"PLEASE GENERATE DATA"}],"px-vis-radar":[{key:"dummy",val:"PLEASE GENERATE DATA"}],"px-vis-parallel-coordinates":[{key:"dummy",val:"PLEASE GENERATE DATA"}]}}},chartPool:{type:Object,value:function(){return{"px-vis-timeseries":[],"px-vis-xy-chart":[],"px-vis-polar":[],"px-vis-radar":[],"px-vis-parallel-coordinates":[],"px-vis-pie-chart":[]}}},_currentDataSets:{type:Array},_generateListener:{type:Function},_createListener:{type:Function},_removeListener:{type:Function},_drawingListener:{type:Function},_moveListener:{type:Function},_generateOptions:{type:Object,value:function(){return{startTime:5714748e5,endTime:_Mathfloor(Date.now()),dataMin:-10,dataMax:10,variance:.7,counter:0,randomise:!1}}},_chartOptions:{type:Object,value:function(){return{scatter:!1,disableNav:!1,canvas:!1,progressiveRendering:!1,addDynamicMenus:!1,addThresholds:!1,multiAxis:!1,rendToSvg:!1,resizeDebounce:250,width:800,height:500,preventResize:!1,customToolbar:!1,hideRegister:!1,includeChartExtents:!1,addEvents:!1,eventsNumber:4,eventsType:"unicode",eventsNoLine:!1,eventsNoTooltip:!1,markerSize:64,markerSymbol:"circle",markerScale:1,markerFillOpacity:.6,markerStrokeOpacity:1,preventWwSync:!1,addCategories:!1,hideCategoryRegister:!1,markerTSNumber:50,markerTSRowsNumber:3,markerTSSize:64,markerTSSymbol:"bar",markerTSScale:1,markerTSFillOpacity:.6,markerTSStrokeOpacity:1,markerShowTooltip:!0,hardMute:!1,showTooltip:!1,allowNegativeValues:!1,addCrosshairData:!1}}},_drawingCounter:{type:Number,value:0},_drawingsPerChart:{type:Number,value:0},_drawingMultiplier:{type:Number,value:1},_drawingNumberOfCharts:{type:Number,value:0},_drawingTimerName:{type:String},_test:{type:Number,value:99999}},observers:["_computeCurrentDataSets(selectedChartType, dataSets.*)"],attached:function(){this._generateListener=this._generateDataSet.bind(this);this._createListener=this._createChart.bind(this);this._removeListener=this._removeChart.bind(this);this._drawingListener=this._drawingListen.bind(this);this._moveListener=this._moveChart.bind(this);this.$.generate.addEventListener("click",this._generateListener);this.$.btnCreate.addEventListener("click",this._createListener);this.$.btnRemove.addEventListener("click",this._removeListener);this.$.btnMove.addEventListener("click",this._moveListener);this.addEventListener("px-vis-scatter-rendering-ended",this._drawingListener);this.addEventListener("px-vis-line-svg-rendering-ended",this._drawingListener);this.addEventListener("px-vis-chart-canvas-rendering-ended",this._drawingListener)},detached:function(){this.$.generate.removeEventListener("click",this._generateListener);this.$.btnCreate.removeEventListener("click",this._createListener);this.$.btnRemove.removeEventListener("click",this._removeListener);this.$.btnMove.removeEventListener("click",this._moveListener);this.removeEventListener("px-vis-scatter-rendering-ended",this._drawingListener);this.removeEventListener("px-vis-line-svg-rendering-ended",this._drawingListener);this.removeEventListener("px-vis-chart-canvas-rendering-ended",this._drawingListener)},_generateDataSet:function(){var dataSet=this._generateData(this.$.pointsPerSeries.value,this.$.seriesNumber.value,this.selectedChartType);if("dummy"===this.dataSets[this.selectedChartType][0].key){this.dataSets[this.selectedChartType][0]=dataSet}else{this.dataSets[this.selectedChartType].push(dataSet)}this._computeCurrentDataSets()},_generateData:function(pointsNumber,seriesNumber,chartType,seriesNames){var _NumberMAX_VALUE=Number.MAX_VALUE;console.time("generating "+pointsNumber*seriesNumber+" total ("+seriesNumber+" series each "+pointsNumber+" points) for "+chartType);var result=[],step=_Mathfloor((this._generateOptions.endTime-this._generateOptions.startTime)/pointsNumber),extents={};if("px-vis-timeseries"===chartType){extents.x=[this._generateOptions.startTime,this._generateOptions.startTime+pointsNumber*step]}else if("px-vis-xy-chart"===chartType){extents.x=[0,pointsNumber]}this._generateOptions.counter++;for(var i=0,newData;i<pointsNumber;i++){newData={};newData.timeStamp=this._generateOptions.startTime+i*step;for(var j=0;j<seriesNumber;j++){var name=seriesNames?seriesNames[j]:"y"+j,axisName="axis"+j;if(0===result.length||this._generateOptions.randomise){newData[name]=(Math.random()*(this._generateOptions.dataMax-this._generateOptions.dataMin)+this._generateOptions.dataMin).toFixed(3);newData.x="px-vis-polar"===chartType?360*Math.random():Math.random()*(this._generateOptions.dataMax-this._generateOptions.dataMin)+this._generateOptions.dataMin}else{newData[name]=(+result[i-1][name]+(2*Math.random()-1)*this._generateOptions.variance).toFixed(3);newData.x=i}if("px-vis-radar"===chartType||"px-vis-parallel-coordinates"===chartType){newData.category=(i%4).toString()}if(!extents[axisName]){extents[axisName]=[_NumberMAX_VALUE,-_NumberMAX_VALUE]}if(+newData[name]<+extents[axisName][0]){extents[axisName][0]=newData[name]}if(+newData[name]>+extents[axisName][1]){extents[axisName][1]=newData[name]}}for(var extKeys=Object.keys(extents),min=_NumberMAX_VALUE,max=-_NumberMAX_VALUE,k=0;k<extKeys.length;k++){if("x"!==extKeys[k]){if(+extents[extKeys[k]][1]>max){max=extents[extKeys[k]][1]}if(+extents[extKeys[k]][0]<min){min=extents[extKeys[k]][0]}}}extents.y=[min,max];result.push(newData)}console.timeEnd("generating "+pointsNumber*seriesNumber+" total ("+seriesNumber+" series each "+pointsNumber+" points) for "+chartType);return{val:"[Gen]["+this._generateOptions.counter+"] "+pointsNumber*seriesNumber+" total ("+seriesNumber+" series each "+pointsNumber+" points)",key:{data:result,extents:extents}}},_computeCurrentDataSets:function(){this.set("_currentDataSets",this.dataSets[this.selectedChartType].slice());if(this.dataSets[this.selectedChartType]&&this.dataSets[this.selectedChartType].length){this.$.dataSetDropdown.set("displayValue",this.dataSets[this.selectedChartType][this.dataSets[this.selectedChartType].length-1].val);this.$.dataSetDropdown.set("selectedKey",this.dataSets[this.selectedChartType][this.dataSets[this.selectedChartType].length-1].key)}},_canScatter:function(selectedChartType){return"px-vis-parallel-coordinates"!==selectedChartType&&"px-vis-radar"!==selectedChartType&&"px-vis-pie-chart"!==selectedChartType&&"px-vis-polar"!==selectedChartType},_canCanvas:function(selectedChartType){return"px-vis-timeseries"===selectedChartType||"px-vis-xy-chart"===selectedChartType||"px-vis-polar"===selectedChartType},_canSvg:function(selectedChartType){return"px-vis-parallel-coordinates"===selectedChartType||"px-vis-radar"===selectedChartType},_canProgRender:function(selectedChartType,canvas,svg){return this._canCanvas(selectedChartType)&&canvas||this._canSvg(selectedChartType)&&!svg},_isTimeseries:function(selectedChartType){return"px-vis-timeseries"===selectedChartType},_isPolar:function(selectedChartType){return"px-vis-polar"===selectedChartType},_canMultiY:function(selectedChartType){return"px-vis-timeseries"===selectedChartType||"px-vis-xy-chart"===selectedChartType},_canChartExtents:function(selectedChartType){return"px-vis-parallel-coordinates"!==selectedChartType&&"px-vis-polar"!==selectedChartType},_canWebWorker:function(selectedChartType){return"px-vis-parallel-coordinates"!==selectedChartType&&"px-vis-radar"!==selectedChartType},_createChart:function(){var data=this.$.dataSetDropdown.selectedKey.data,extents=this.$.dataSetDropdown.selectedKey.extents;if("dummy"===this.$.dataSetDropdown.selectedKey){console.log("No data selected, please generate data for "+this.selectedChartType);return}if(data){this._drawingCounter=0;this._drawingsPerChart=this._getNumberOfDrawingPerCharts(data);this._drawingNumberOfCharts=this.$.chartNumber.value;this._drawingTimerName="draw "+this._drawingNumberOfCharts+" "+this.selectedChartType;if("px-vis-timeseries"===this.selectedChartType||"px-vis-xy-chart"===this.selectedChartType||"px-vis-polar"===this.selectedChartType){if(this._chartOptions.canvas){this._drawingMultiplier="px-vis-timeseries"===this.selectedChartType&&!this._chartOptions.disableNav?2:1}else{this._drawingMultiplier=this._drawingsPerChart}}else{if(this._chartOptions.rendToSvg){this._drawingMultiplier=1}else{this._drawingMultiplier=this._drawingsPerChart}}var newDiv,newChart,currWidth=this.$.chartHolder.getBoundingClientRect().width,fragment=document.createElement("div");fragment.classList.add("creationBatchDiv");for(var i=0;i<this._drawingNumberOfCharts;i++){newDiv=document.createElement("div");newDiv.classList.add("divwrapper");if(this.$.reuse.checked){if(this.chartPool[this.selectedChartType].length){newChart=this.chartPool[this.selectedChartType].pop()}else{console.log("failed to reuse "+this.selectedChartType+" from chartPool, none available");newChart=document.createElement(this.selectedChartType)}}else{newChart=document.createElement(this.selectedChartType)}newChart.debounceResizeTiming=this._chartOptions.resizeDebounce;newChart.set("preventResize",this._chartOptions.preventResize);newChart.set("height",this._chartOptions.height);if(newChart.preventResize){newChart.set("width",this._chartOptions.width)}else{newChart.width=currWidth}this._processOptions(newChart,extents,data);newChart.chartData=data;newChart.hardMute=this._chartOptions.hardMute;newChart.showTooltip=this._chartOptions.showTooltip;if(this._chartOptions.addCrosshairData){newChart.set("highlighterConfig",{drawWithLocalCrosshairData:!1,differentDataset:!0,fuzz:1e11,showTooltipData:!0});var timestamp=data[_Mathfloor(data.length/2)].timeStamp;newChart.set("crosshairData",{rawData:[{timeStamp:timestamp}],timeStamps:[timestamp]})}if(this._chartOptions.customToolbar){var newConf={config:{}};if(newChart.toolbarConfig){for(var keys=Object.keys(newChart.toolbarConfig.config),j=0;j<keys.length;j++){newConf.config[keys[j]]=newChart.toolbarConfig.config[keys[j]]}}newConf.config.addSerie={tooltipLabel:"Add a serie to the chart",title:"+1",onClick:this._addSerie,onClickContext:this,chart:newChart};newConf.config.removeSerie={tooltipLabel:"Remove a serie from the chart",title:"-1",onClick:this._removeSerie,onClickContext:this,chart:newChart};newConf.config.modifyData={tooltipLabel:"Changes the data for the current series",title:"~",onClick:this._changeData,onClickContext:this,chart:newChart};newConf.config.modifyDataAndSeries={tooltipLabel:"Changes the data and the series",title:"~~",onClick:this._changeDataAndSeries,onClickContext:this,chart:newChart};newConf.config.addAndModify={tooltipLabel:"Changes the data for the current series and add 1 series",title:"+1/~",onClick:this._addSerieAndModifyData,onClickContext:this,chart:newChart};newConf.config.removeAndModify={tooltipLabel:"Changes the data for the current series and remove 1 series",title:"-1/~",onClick:this._removeSerieAndModifyData,onClickContext:this,chart:newChart};newChart.set("toolbarConfig",newConf)}Polymer.dom(newDiv).appendChild(newChart);Polymer.dom(fragment).appendChild(newDiv)}Polymer.dom(this.$.chartHolder).appendChild(fragment);this._startPerfMeasure()}else{console.log("please select data")}},_generateSeriesName:function(){return"y"+_Mathfloor(1e3*Math.random())},_addSerieAndModifyData:function(info){var numberOfSeries=Object.keys(info.chart.chartData[0]).length-2,seriesNames=Object.keys(info.chart.chartData[0]).filter(function(d){return"y"===d[0]}),data,seriesName=this._generateSeriesName();seriesNames.push(seriesName);data=this._generateData(info.chart.chartData.length,numberOfSeries+1,info.chart.nodeName.toLowerCase(),seriesNames);info.chart.set("chartData",data.key.data);this._addOneSerieFromConfig(info.chart,numberOfSeries,seriesName)},_removeSerieAndModifyData:function(info){var data,seriesNames=Object.keys(info.chart.chartData[0]).filter(function(d){return"y"===d[0]});data=this._generateData(info.chart.chartData.length,Object.keys(info.chart.chartData[0]).length-3,info.chart.nodeName.toLowerCase(),seriesNames);for(var missing,keys=Object.keys(data.key.data[0]),i=0;i<seriesNames.length;i++){if(!data.key.data[0][seriesNames[i]]){missing=seriesNames[i];break}}info.chart.set("chartData",data.key.data);this._deleteOneSerieFromConfig(info.chart,missing)},_changeData:function(info){var data,seriesNames=Object.keys(info.chart.chartData[0]).filter(function(d){return"y"===d[0]});data=this._generateData(info.chart.chartData.length,Object.keys(info.chart.chartData[0]).length-2,info.chart.nodeName.toLowerCase(),seriesNames);info.chart.set("chartData",data.key.data)},_changeDataAndSeries:function(info){for(var numberOfSeries=Object.keys(info.chart.chartData[0]).length-2,seriesNames=[],currentNames=Object.keys(info.chart.chartData[0]).filter(function(d){return"y"===d[0]}),data,i=0;i<currentNames.length;i++){seriesNames.push(this._generateSeriesName())}data=this._generateData(info.chart.chartData.length,numberOfSeries,info.chart.nodeName.toLowerCase(),seriesNames);info.chart.set("chartData",data.key.data);if("px-vis-timeseries"===info.chart.nodeName.toLowerCase()||"px-vis-xy-chart"===info.chart.nodeName.toLowerCase()||"px-vis-polar"===info.chart.nodeName.toLowerCase()){for(var newConf={},i=0;i<numberOfSeries;i++){if("px-vis-polar"===info.chart.nodeName.toLowerCase()){newConf[seriesNames[i]]={x:"x",y:seriesNames[i],yAxisUnit:"u"}}else{newConf[seriesNames[i]]=this._generateSeriesConfigXYTS(seriesNames[i].slice(1),!1,"px-vis-timeseries"===info.chart.nodeName.toLowerCase(),info.chart)}}info.chart.set("seriesConfig",newConf)}else if("px-vis-parallel-coordinates"===info.chart.nodeName.toLowerCase()||"px-vis-radar"===info.chart.nodeName.toLowerCase()){info.chart._computeAxes()}},_removeSerie:function(info){var currentNames=Object.keys(info.chart.chartData[0]).filter(function(d){return"y"===d[0]}),seriesName=currentNames[currentNames.length-1];this._deleteOneSeriesData(info.chart.chartData,seriesName);this._deleteOneSerieFromConfig(info.chart,seriesName)},_deleteOneSerieFromConfig:function(chart,seriesName){if("px-vis-timeseries"===chart.nodeName.toLowerCase()||"px-vis-xy-chart"===chart.nodeName.toLowerCase()||"px-vis-polar"===chart.nodeName.toLowerCase()){for(var newConf={},confKeys=Object.keys(chart.seriesConfig),i=0;i<confKeys.length;i++){if(seriesName!==confKeys[i]){newConf[confKeys[i]]=chart.seriesConfig[confKeys[i]]}}chart.set("seriesConfig",newConf)}else if("px-vis-parallel-coordinates"===chart.nodeName.toLowerCase()||"px-vis-radar"===chart.nodeName.toLowerCase()){chart._computeAxes()}},_addOneSerieFromConfig:function(chart,numberOfSeries,seriesName){if("px-vis-timeseries"===chart.nodeName.toLowerCase()||"px-vis-xy-chart"===chart.nodeName.toLowerCase()||"px-vis-polar"===chart.nodeName.toLowerCase()){for(var newConf={},confKeys=Object.keys(chart.seriesConfig),isTS="px-vis-timeseries"===chart.nodeName.toLowerCase(),i=0;i<confKeys.length;i++){newConf[confKeys[i]]=chart.seriesConfig[confKeys[i]]}if("px-vis-polar"===chart.nodeName.toLowerCase()){newConf[seriesName]={x:"x",y:seriesName,yAxisUnit:"u"}}else{newConf[seriesName]=this._generateSeriesConfigXYTS(seriesName.slice(1),!1,isTS,chart)}chart.set("seriesConfig",newConf)}else if("px-vis-parallel-coordinates"===chart.nodeName.toLowerCase()||"px-vis-radar"===chart.nodeName.toLowerCase()){chart._computeAxes()}},_addSerie:function(info){var numberOfSeries=Object.keys(info.chart.chartData[0]).length-2,seriesName=this._generateSeriesName();this._addOneSeriesData(info.chart.chartData,seriesName);this._addOneSerieFromConfig(info.chart,numberOfSeries,seriesName)},_addOneSeriesData:function(data,seriesName){for(var number=Object.keys(data[0]).length-2,i=0;i<data.length;i++){if(0===i){data[i][seriesName]=Math.random()*(this._generateOptions.dataMax-this._generateOptions.dataMin)+this._generateOptions.dataMin}else{data[i][seriesName]=data[i-1][seriesName]+(2*Math.random()-1)*this._generateOptions.variance}}},_deleteOneSeriesData:function(data,seriesName){for(var number=Object.keys(data[0]).length-3,i=0;i<data.length;i++){delete data[i][seriesName]}},_generateSeriesConfigXYTS:function(numberId,useGenerationConfig,isTS,chart){var result={},seriesNumber,isMultiAxis=useGenerationConfig?this._chartOptions.multiAxis:1<Object.keys(chart.y).length,type;if(useGenerationConfig){seriesNumber=this._chartOptions.disableNav||!isTS?this._drawingsPerChart:this._drawingsPerChart/2;type=this._chartOptions.scatter?"scatter":"line"}else{var configKey=Object.keys(chart.seriesConfig);seriesNumber=Object.keys(chart.chartData[0]).length-2;type=chart.seriesConfig[configKey[0]].type}result={x:isTS?"timeStamp":"x",y:"y"+numberId,type:type,yAxisUnit:"u",xAxisUnit:"u",markerSize:this._chartOptions.markerSize,markerSymbol:this._chartOptions.markerSymbol,markerScale:this._chartOptions.markerScale,markerFillOpacity:this._chartOptions.markerFillOpacity,markerStrokeOpacity:this._chartOptions.markerStrokeOpacity};if(isMultiAxis){var side;if(useGenerationConfig){side=numberId<seriesNumber/2?"left":"right"}else{side=chart.numLeftAxes===chart.numRightAxes?"left":"right"}result.axis={id:"axis"+numberId,number:numberId,side:side}}return result},_removeChart:function(){var wrappers=Polymer.dom(this.root).querySelectorAll(".creationBatchDiv"),lastWrap=wrappers[wrappers.length-1],chart;if(lastWrap){if(this.$.reuse.checked){for(var i=0;i<lastWrap.children.length;i++){chart=lastWrap.children[i].children[0];this.chartPool[chart.nodeName.toLowerCase()].push(chart)}}Polymer.dom(this.$.chartHolder).removeChild(lastWrap)}},_moveChart:function(){var wrappers=Polymer.dom(this.root).querySelectorAll(".divwrapper"),lastWrap=wrappers[wrappers.length-1];if(lastWrap){Polymer.dom(this.$.chartHolder).removeChild(lastWrap);setTimeout(function(){this._startPerfMeasure();Polymer.dom(this.$.chartHolder).appendChild(lastWrap)}.bind(this),500)}},_startPerfMeasure:function(){window.performance.clearMarks();window.performance.mark("start")},_drawingListen:function(){this._drawingCounter++;if(0===this._drawingCounter%(this._drawingMultiplier*+this._drawingNumberOfCharts)){window.performance.mark("end");performance.clearMeasures();window.performance.measure("lastMeasure","start","end");var duration=window.performance.getEntriesByName("lastMeasure")[0].duration;console.log(this._drawingTimerName+": "+duration+" (average per chart: "+duration/+this._drawingNumberOfCharts+")")}},_getNumberOfDrawingPerCharts:function(data){switch(this.selectedChartType){case"px-vis-timeseries":var multiplier=this._chartOptions.disableNav?1:2;return multiplier*(Object.keys(data[0]).length-2);case"px-vis-xy-chart":return Object.keys(data[0]).length-2;case"px-vis-polar":return Object.keys(data[0]).length-2;case"px-vis-parallel-coordinates":return 1;case"px-vis-radar":return 1;case"px-vis-pie-chart":}},_processOptions:function(chart,extents,data){switch(this.selectedChartType){case"px-vis-timeseries":this._processOptionsTS(chart,extents,data);break;case"px-vis-xy-chart":this._processOptionsXY(chart,extents);break;case"px-vis-polar":this._processOptionsPolar(chart);break;case"px-vis-parallel-coordinates":this._processOptionsParallel(chart);break;case"px-vis-radar":this._processOptionsRadar(chart,extents);break;case"px-vis-pie-chart":}},_processOptionsTS:function(chart,extents,data){for(var seriesConfig={},seriesNumber=this._chartOptions.disableNav?this._drawingsPerChart:this._drawingsPerChart/2,i=0;i<seriesNumber;i++){seriesConfig["y"+i]=this._generateSeriesConfigXYTS(i,!0,!0)}chart.set("seriesConfig",seriesConfig);chart.set("renderToCanvas",this._chartOptions.canvas);chart.toolbarConfig={config:{tooltipWithSearchTypesAndRadius:!0,advancedZoom:!0,pan:!0}};chart.hideRegister=this._chartOptions.hideRegister;chart.showGaps=this._chartOptions.showGaps;if(this._chartOptions.includeChartExtents){chart.chartExtents=extents}else{chart.chartExtents={x:["dynamic","dynamic"],y:["dynamic","dynamic"]}}chart.xAxisConfig={title:"X",labelPosition:"center",orientation:"bottom"};chart.yAxisConfig={title:"An Axis"};if(!this._chartOptions.multiAxis){chart.yAxisConfig.preventSeriesBar=!0}if(this._chartOptions.addEvents){for(var step=(data[data.length-1].timeStamp-data[0].timeStamp)/this._chartOptions.eventsNumber,eventData=[],i=0;i<this._chartOptions.eventsNumber;i++){eventData.push({id:i,time:data[0].timeStamp+step*(i+.5),label:this._chartOptions.eventsType})}chart.eventData=eventData;chart.eventConfig={fa:{color:"blue",icon:"px-fea:deployments",type:"px",offset:[0,0],lineColor:"red",lineWeight:this._chartOptions.eventsNoLine?0:1,enableTooltip:this._chartOptions.eventsNoTooltip?!1:!0},unicode:{color:"green",icon:"px-obj:truck",type:"px",offset:[1,0],lineWeight:this._chartOptions.eventsNoLine?0:1,enableTooltip:this._chartOptions.eventsNoTooltip?!1:!0},default:{lineWeight:this._chartOptions.eventsNoLine?0:1,enableTooltip:this._chartOptions.eventsNoTooltip?!1:!0}}}else{chart.eventData=[];chart.eventConfig={}}if(this._chartOptions.addMarkers){var step=(data[data.length-1].timeStamp-data[0].timeStamp)/this._chartOptions.markerTSNumber,markerData=[],config={},newMargin={};newMargin.top=chart.margin.top;newMargin.bottom=chart.margin.bottom+50;newMargin.left=chart.margin.left;newMargin.right=chart.margin.right;for(var j=0;j<this._chartOptions.markerTSRowsNumber;j++){for(var i=0;i<this._chartOptions.markerTSNumber;i++){markerData.push({time:_Mathfloor(data[0].timeStamp+step*(i+.5)),label:"label"+j,customKey:"someVal",customKey2:1223124});if(0===j){markerData.push({time:_Mathfloor(data[0].timeStamp+step*(i+.5)),label:"labelCustom",customKey:"someOtherVal",customKey2:1});markerData.push({time:_Mathfloor(data[0].timeStamp+step*(i+.5)),label:"labelCustom2",customKey:"pwet",customKey2:323})}}config["label"+j]={color:"rgb(123,0,0)",location:0===j%2?"top":"bottom",row:j,markerSize:this._chartOptions.markerTSSize,markerSymbol:this._chartOptions.markerTSSymbol,markerScale:this._chartOptions.markerTSScale,markerFillOpacity:this._chartOptions.markerTSFillOpacity,markerStrokeOpacity:this._chartOptions.markerTSStrokeOpacity,showTooltip:this._chartOptions.markerShowTooltip,priority:10,firstDateTimeFormat:"HH:mm A z",timezone:"Etc/GMT"};if(0===j%2){newMargin.top+=15}else{newMargin.bottom+=15}}config.labelCustom={color:"rgb(123,123,123)",location:"top",row:0,markerSize:this._chartOptions.markerTSSize,markerSymbol:"star",markerScale:this._chartOptions.markerTSScale,markerFillOpacity:this._chartOptions.markerTSFillOpacity,markerStrokeOpacity:this._chartOptions.markerTSStrokeOpacity,showTooltip:this._chartOptions.markerShowTooltip,priority:1,firstDateTimeFormat:"HH:mm A z",timezone:"Etc/GMT+10"};config.labelCustom2={color:"rgb(0,255,0)",location:"top",row:0,markerSize:this._chartOptions.markerTSSize,markerSymbol:"wye",markerScale:this._chartOptions.markerTSScale,markerFillOpacity:this._chartOptions.markerTSFillOpacity,markerStrokeOpacity:this._chartOptions.markerTSStrokeOpacity,showTooltip:this._chartOptions.markerShowTooltip,priority:2,firstDateTimeFormat:"HH:mm A z",timezone:"Etc/GMT+10"};chart.set("margin",newMargin);chart.markerData=markerData;chart.markerConfig=config}else{chart.markerData=[];chart.markerConfig={}}if(this._chartOptions.addThresholds){chart.thresholdData=[{for:"series0",type:"max",value:8.4784},{for:"series0",type:"min",value:-9.6531},{for:"series0",type:"mean",value:.330657585139331},{for:"series1",type:"mean",value:2},{for:"series1",type:"quartile",value:-3}];chart.thresholdConfig={max:{color:"red",dashPattern:"5,0",title:"MAX",showThresholdBox:!0,displayTitle:!0}}}else{chart.thresholdData=[];chart.thresholdConfig={}}if(this._chartOptions.addDynamicMenus){chart.dynamicMenuConfig=[{name:"Delete",action:"function(data) {var newConf = {}, confKeys = Object.keys(this.seriesConfig); for(var i=0; i<confKeys.length; i++) { if(data.additionalDetail.name !== confKeys[i]) {newConf[confKeys[i]] = this.seriesConfig[confKeys[i]];}}this.set(\"seriesConfig\", newConf);}",eventName:"delete",icon:"px-vis:trash-series"},{name:"Bring To Front",action:"function(data) { this.set(\"serieToRedrawOnTop\", data.additionalDetail.name);}",eventName:"bring-to-front",icon:"px-vis:bring-to-front"}]}else{chart.dynamicMenuConfig=[]}chart.disableNavigator=this._chartOptions.disableNav;chart.preventWebWorkerSynchronization=this._chartOptions.preventWwSync},_processOptionsXY:function(chart,extents){for(var seriesConfig={},i=0;i<this._drawingsPerChart;i++){seriesConfig["y"+i]=this._generateSeriesConfigXYTS(i,!0,!1)}chart.hideRegister=this._chartOptions.hideRegister;chart.showGaps=this._chartOptions.showGaps;chart.registerConfig={forceDateTimeDisplay:"true",width:250};chart.toolbarConfig={config:{tooltipWithFullOptions:!0,advancedZoom:!0,pan:!0}};chart.xAxisConfig={title:"X",labelPosition:"center",orientation:"bottom"};chart.yAxisConfig={title:"An Axis"};if(!this._chartOptions.multiAxis){chart.yAxisConfig.preventSeriesBar=!0}chart.seriesConfig=seriesConfig;chart.margin={top:"30",bottom:"60",left:"80",right:"100"};chart.timeData="timeStamp";if(this._chartOptions.includeChartExtents){chart.chartExtents=extents}else{chart.chartExtents={x:["dynamic","dynamic"],y:["dynamic","dynamic"]}}chart.renderToCanvas=this._chartOptions.canvas;if(this._chartOptions.addDynamicMenus){chart.dynamicMenuConfig=[{name:"Delete",action:"function(data) { var conf = this.seriesConfig;  delete conf[data.additionalDetail.name]; this.set(\"seriesConfig\", {}); this.set(\"seriesConfig\", conf);}",eventName:"delete",icon:"px-vis:trash-series"},{name:"Bring To Front",action:"function(data) { this.set(\"serieToRedrawOnTop\", data.additionalDetail.name);}",eventName:"bring-to-front",icon:"px-vis:bring-to-front"}]}else{chart.dynamicMenuConfig=[]}chart.preventWebWorkerSynchronization=this._chartOptions.preventWwSync},_processOptionsPolar:function(chart){for(var seriesConfig={},i=0;i<this._drawingsPerChart;i++){seriesConfig["y"+i]={x:"x",y:"y"+i,yAxisUnit:"someUnit"}}chart.showArrows=this._chartOptions.showArrows;chart.hideRegister=this._chartOptions.hideRegister;chart.allowNegativeValues=this._chartOptions.allowNegativeValues;chart.registerConfig={forceDateTimeDisplay:"true",width:250};chart.toolbarConfig={config:{tooltipWithSearchTypes:!0,zoom:!0,pan:!0}};chart.seriesConfig=seriesConfig;chart.useDegrees=!0;chart.margin={top:"0",bottom:"0",left:"10",right:"10"};chart.timeData="timeStamp";chart.renderToCanvas=this._chartOptions.canvas;if(this._chartOptions.addDynamicMenus){chart.dynamicMenuConfig=[{name:"Dummy",action:"function(data) { console.log(\"dummy\")}",eventName:"delete",icon:"px-vis:trash-series"}]}else{chart.dynamicMenuConfig=[]}chart.preventWebWorkerSynchronization=this._chartOptions.preventWwSync},_processOptionsParallel:function(chart){chart.generateAxesFromData=!0;chart.matchTicks=!0;chart.seriesKey="timeStamp";chart.skipKeys={x:!0,timeStamp:!0,category:!0};chart.renderToSvg=this._chartOptions.rendToSvg;chart.hideAxisRegister=this._chartOptions.hideRegister;chart.hideCategoryRegister=this._chartOptions.hideCategoryRegister;chart.categoryKey=this._chartOptions.addCategories?"category":"";chart.categories=[0,1,2,3];if(this._chartOptions.addDynamicMenus){chart.dynamicMenuConfig=[{name:"Dummy",action:"function(data) { console.log(\"dummy\")}",eventName:"delete",icon:"px-vis:trash-series"}]}else{chart.dynamicMenuConfig=[]}},_processOptionsRadar:function(chart,extents){chart.generateAxesFromData=!0;chart.matchTicks=!0;chart.seriesKey="timeStamp";chart.skipKeys={x:!0,timeStamp:!0};chart.renderToSvg=this._chartOptions.rendToSvg;chart.hideAxisRegister=this._chartOptions.hideRegister;chart.hideCategoryRegister=this._chartOptions.hideCategoryRegister;chart.categoryKey=this._chartOptions.addCategories?"category":"";chart.categories=[0,1,2,3];if(this._chartOptions.includeChartExtents){chart.chartExtents=extents}if(this._chartOptions.addDynamicMenus){chart.dynamicMenuConfig=[{name:"Dummy",action:"function(data) { console.log(\"dummy\")}",eventName:"delete",icon:"px-vis:trash-series"}]}else{chart.dynamicMenuConfig=[]}},_processOptionsPie:function(){}})})();