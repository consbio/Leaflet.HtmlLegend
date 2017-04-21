# Leaflet.HtmlLegend

A simple Leaflet plugin for creating legends with HTML.

*Tested with Leaflet 1.0.3*

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
<script src="L.Control.HtmlLegend-min.js"></script>
```


Options:
```
{
    position: 'topright',
    legends: [],   // array of legend entries. see below for the structure
    collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
    detectStretched: false,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
    layersOpacity: {
        default: 1, // default opacity for layers in specified in legends.
        sliderIcons: { // css classes for the opacity slider icons
            visible: 'fa fa-eye',
            hidden: 'fa fa-eye-slash'
        }
    }
}
```



Each entry in `legends` array can have the following keys:
* name
* array of elements


Each element has:
* label (optional)
* html (optional): string representaiton of an HTML elemnt that goes into the legend block
* style (optional): an object containing css styling of the legend block


See the [example](//consbio.github.io/Leaflet.HtmlLegend) for usage details.

## Contributors:
* [Kaveh Karimi](https://github.com/ka7eh)