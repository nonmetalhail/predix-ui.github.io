---
title: Introduction to configuring a chart
moduleName: view-develop-vis-configure-charts
pathToRoot: ../../../
layout: default
---

# Introduction

The vis framework and charts keep growing as we add new features while also improving performance and ease of use. We've always worked with the philosophy that the charts should use "appropriate defaults" out of the box, in other words, you shouldn't have to know about all the available features and the chart should work with minimum configuration. However, because the charts can be used in a variety of different environments, each feature has to be fully configurable, which has lead to our demos becoming quite daunting for a new developer.

This article aims at giving a new developer the most important configuration options and how to use them.

# ChartData
The two most important properties that each chart needs are chartData and seriesConfig. ChartData holds the data in the format needed by the chart: an array of objects where each object holds the data related to one or several assets, usually for a specific time. For example a dataset for 3 assets could look like:

```json
[
 {
  'Timestamp': 1466610420000,
  'asset1': 8.2,
  'asset2': 3.7765,
  'asset3': 0.5
 },
 {
  'Timestamp': 1577720820000,
  'asset1': 9.21,
  'asset3': 42.3,
 },
 {
  'Timestamp': 1688831220000,
  'asset1': 9.21,
  'asset2': 17.9,
  'asset3': 32.3
 }
]
```

Notice that each point doesn't need to have a definition for each asset. If you get your data from the Predix Timeseries service you can use px-vis-data-converter to transform the data into the appropriate format.

# SeriesConfig
If ChartData represents the data the chart needs to display then seriesConfig tells the chart how to interpret and visualize it.

In the vis framework a series is a visual representation of a set of points related to each other, by plotting a set of values (Y) against another (X). In real life this usually translates to the visual representation of some asset's performance metrics, usually gathered by a sensor: temperature over time, gas consumption vs speed, wind turbine speed over time etc... In simple terms think of one series as one line on your chart, or a set of scatter points with the same visual representation (blue dots for example).

If the chart is very simple and no specific configuration is required then the "includeAllSeries" property can be set to true on the chart for it to dynamically create the configuration from the data. It will try to understand the data structure and appropriately draw each series available in the data. However in general more precise control is required, which is where seriesConfig kicks in.

  <catalog-picture
    img-src="../../img/guidelines/dev/vis/configure-charts/include_all_series"
    img-alt="Simple Timeseries example with includeAllSeries"
    caption="Simple Timeseries example with includeAllSeries. We still had to define what value the chart interpret as X through defaultSeriesConfig (see below)">
  </catalog-picture>


SeriesConfig is an object where each sub-object is a definition for one series. Each definition's key needs to be unique and each value will contain information on what to render and how to render it. For example, a seriesConfig for rendering the previous chartData as a timeseries chart could be:

<div class="picture-code">
  <catalog-picture
    style="margin: 0; padding: 0"
    img-src="../../img/guidelines/dev/vis/configure-charts/conf_chart_1"
    img-alt="Custom seriesConfig"
    caption="Custom seriesConfig. Note that we could have drawn only two series by adding only 2 definitions.">
  </catalog-picture>

  ```json
  {
    "uniqueSeriesId1": {
      "x": "Timestamp",
      "y": "asset1",
      "name": "Asset 1",
      "type": "scatter"
    },
    "uniqueSeriesId2": {
      "x": "Timestamp",
      "y": "asset2",
      "name": "Asset 2",
      "type": "scatter"
    },
    "uniqueSeriesId3": {
      "x": "Timestamp",
      "y": "asset3",
      "name": "Asset 3",
      "type": "line"
    }
  }
  ```

</div>

'x' and 'y' define how each series relates to the dataset, so for a series on the XY Chart they could respectively be 'asset1' and 'asset2' but for a Timeseries chart each series should have the timestamp as its X value. Each series definition in seriesConfig has a lot more options that can be added such as the X and Y units, color, marker shape/size/opacity/stroke, interpolation function for lines, dash pattern, and an Axis definition if using multiple Y axis (Timeseries and XY charts only). The options will be listed in the <a href="https://www.predix-ui.com/#/components/px-vis-timeseries/" target="_top">API of a chart</a> under the seriesConfig property and more feature can be added over time.

When all series need to have the same subset of configuration, for example the timestamp definition for x for a timeseries or all/the majority of series should be scatter, you can use the defaultSeriesConfig object. This default object properties will be applied to each series definition in seriesConfig if this property doesn't already exit in the seriesConfig series definition. The previous example would become:

<div class="picture-code">
  <catalog-picture
    style="margin: 0; padding: 0"
    img-src="../../img/guidelines/dev/vis/configure-charts/conf_chart_1"
    img-alt="Same Custom seriesConfig"
    caption="Same chart as above with a defaultSeriesConfig">
  </catalog-picture>

  ```javascript
  seriesConfig = {
    'uniqueSeriesId1': {
      'y': 'asset1',
      'name': 'Asset 1',
    },
    'uniqueSeriesId2': {
      'y': 'asset2',
      'name': 'Asset 2',
    },
    'uniqueSeriesId3': {
      'y': 'asset3',
      'name': 'Asset 3',
      'type': 'line'
    }
  }

  defaultSeriesConfig = {
    'x': 'Timestamp',
    'type': 'scatter'
  }
  ```

</div>

In this example, all three series would get the default 'x' definition from the default, and 'uniqueSeriesId1' and 'uniqueSeriesId2' would get the default 'scatter' 'type', since they don't have a local definition. 'uniqueSeriesId3' would keep its 'line' 'type'.

Internally seriesConfig and defaultSeriesConfig will be processed to form completeSeriesConfig which is the object actually used by the chart.

# ChartExtents
In addition to the chartData and seriesConfig, another very useful property to be aware of is the chartExtents. ChartExtents is used by the chart to determine the extents (min and max values) of each X and Y scale used by the axes. For example, a single Y axis XY chart can be configured to have its Y axis range from 0 to 10 and its X axis from -5 to 5:

<div class="picture-code">
  <catalog-picture
    style="margin: 0; padding: 0"
    img-src="../../img/guidelines/dev/vis/configure-charts/extents_1"
    img-alt="Basic Chart Extents example">
  </catalog-picture>

  ```javascript
  {
  "x": [-5, 5],
  "y": [0, 10]
  }
  ```

</div>

It is also possible to pass "dynamic" instead of a value, in which case the chart will parse the data to find the extents of each axis. This is more computationally intensive so pass the extents to the charts if you already have them!

<div class="picture-code">
  <catalog-picture
    style="margin: 0; padding: 0"
    img-src="../../img/guidelines/dev/vis/configure-charts/extents_y_dynamic"
    img-alt="Dynamic Y Chart Extents example">
  </catalog-picture>

  ```json
  {
    "x": [-5, 5],
    "y": ["dynamic", "dynamic"]
  }
  ```

</div>

For timeseries or XY charts with multiple Y axis, each axis can get its own extents by adding a property to chartExtents with the axisId as the key and the extents as the value. The `y` property will still be applied to axis that don't have a specific extents defined. For example for an XY chart with 3 axis, "axis 1", "axis 2" and "axis 3":

<div class="picture-code">
  <catalog-picture
    style="margin: 0; padding: 0"
    img-src="../../img/guidelines/dev/vis/configure-charts/extents_multi"
    img-alt="Chart Extents example each axis">
  </catalog-picture>

  ```javascript
  //Axis 1 will range from -10 to 10
  //axis 2 and axis 3 will dynamically
  //search for their extents:
  {
  "x": [0 ,10],
  "y": ["dynamic", "dynamic"],
  "axis1": [-10,10]
  }
  ```

</div>

In the case where a scale is ordinal then a set of values can be passed in the chart extents:

<div class="picture-code">
  <catalog-picture
    style="margin: 0; padding: 0"
    img-src="../../img/guidelines/dev/vis/configure-charts/ordinal_extents"
    img-alt="Dynamic Chart Extents example">
  </catalog-picture>

  ```javascript
  //ordinal x scale
  {
  "x": ["low", "medium", "high"],
  "y": [-100, 100]
  }
  ```

</div>

If chartExtents is not defined then the chart will default to dynamic search on X, 0 for for the minimum Y and dynamic search for the maximum Y, which would be equivalent to:

<div class="picture-code">
  <catalog-picture
    style="margin: 0; padding: 0"
    img-src="../../img/guidelines/dev/vis/configure-charts/extents_default"
    img-alt="Dynamic Chart Extents example">
  </catalog-picture>

  ```javascript
  {
  "x": ["dynamic", "dynamic"],
  "y": [0, "dynamic"]
  }
  ```

</div>

Please note, in case of the Radar chart, although it has several axes, it only has one scale. This means that setting the 'y' part of chartExtents for the Radar chart will have it applied to all axes automatically and that it is not possible to have separate extents for each axis. Also, Parallel Coordinates charts currently do not support developer set chartExtents. This is a future enhancement.

# Chart sub components

Each chart is built with a set of vis framework components, and most of those components are usually configurable. This makes the chart flexible in terms of configuration, but could also end up being a nightmare to maintain: imagine having to expose and propagate every configurable property of every subcomponent! The chart would end up with hundreds of configuration options with obscure names.

To circumvent the issue each configurable sub component has its configuration object exposed at the chart level, e.g. tooltipConfig, registerConfig, xAxisConfig.... When this object changes, each property defined in that object is applied to the subcomponent, only overriding properties you decided to modify and not changing the others. For example, here is a registerConfig object that can be passed to a chart:

```javascript
registerConfig = {
 "forceDateTimeDisplay": true
}
```

In this case the register of the chart will have its "forceDateTimeDisplay" property changed, but all other properties of the px-vis-register will stay unchanged.

This also means that every time a new feature/property is added to a sub component it is automatically available at the chart level through the appropriate config object without us having to update the chart code.

The downside is that some of the configuration is hidden at first sight, in particular for developers that use vis for the first time. In general, the documentation of the chart will mention all the config objects available and the developer will then have to go to [the appropriate vis component API](#/elements/vis/px-vis/px-vis) to find all the options available.

# PreventResize

By default each chart tries to fit its container and will resize itself when the container size changes. This means that by default if your container already has a size of its own the chart doesn't need to have a width and height defined. However if your container has no height (an empty div for example) you might have to either force the container height or set the height property on the chart.

This also means that each resize of the container, including possible changes of layout in your app when things collapse or are still loading, will trigger a full redraw of the chart, which is pretty intensive. Try to either control the size of your container or only append the chart once you know your layout should be relatively stable (the charts can be dynamically created and appended to the dom).

This behavior can be disabled by setting 'preventResize' on the chart. The chart will then use its width and height properties, which now have to be defined, to decide how big it should be.

