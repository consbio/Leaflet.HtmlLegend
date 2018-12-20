# Leaflet.HtmlLegend

A simple Leaflet plugin for creating legends with HTML.

*Tested with Leaflet 1.3.x*

## Install

From NPM:

```bash
npm install leaflet-html-legend
```


## Usage

Include the CSS:

```html
<link rel="stylesheet" href="L.Control.HtmlLegend.css" />
```


Include the JavaScript:

```html
<script src="L.Control.HtmlLegend.min.js"></script>
```


#### Options:
| Option | Type | Default | Description |
| :---   | :--- | :---    | :---        |
| position | String | 'topright' | Map position of element |
| legend | Array | - | Array of legend entries (see below for the structure) |
| collapseSimple | bool | false | Whether to use compact presentation for legend entries that are from a simple renderer |
| detectStreched | bool | false | Test to see if legend entries look stretched (these are usually in sets of 3 with the middle element having no label) |
| collapsedOnInit | bool | false | Whether to initialize instance in collapsed mode |
| disableVisibilityControls | bool | false | Whether to add visibility toggle button and opacity sliders |
| updateOpacity | function | null | If set, this function is used to update opacity of the attached layer (it receives the layer and opacity as arguments) |
| defaultOpacity | number | 1 | Default opacity for layers in specified in legends |
| visibleIcon | String | 'leaflet-html-legend-icon-eye' | css class for the visible icon on opacity slider |
| hiddenIcon | String | 'leaflet-html-legend-icon-eye-slash' | css class for the hidden icon on opacity slider |
| toggleIcon | String | 'leaflet-html-legend-icon-eye-slash' | css class for the icon on visibility toggle button |

Each entry in `legends` array can have the following keys:
* name
* array of elements


Each element has:
* label (optional)
* html (optional): string representaiton of an HTML elemnt that goes into the legend block
* style (optional): an object containing css styling of the legend block

You can use `addLegend` method to add legends to existing instances of `HtmlLegend`:
```javascript
var htmlLegend = L.control.htmllegend({...});
htmlLegend.addLegend({
        name: 'Layer name',
        layer: layerInstance,
        elements: [{
            html: '<div>Legend description</div>'
        }]
    })
```

An existing entry in a legend control instance can be removed using `removeLegend`. This method needs id of the entry, which can be obtained from `htmllegend._entries` (see the example for usage).


See the [example](//consbio.github.io/Leaflet.HtmlLegend) for usage details.

## Contributors:
* [Kaveh Karimi](https://github.com/ka7eh)
