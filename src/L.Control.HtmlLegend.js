L.Control.HtmlLegend = L.Control.extend({
    _map: null,
    _activeLayers: 0,
    _alwaysShow: false,
    options: {
        position: 'topright',

        // array of legend entries - see README for format
        legends: [],

        // if true, legend entries that are from a simple renderer will use compact presentation
        collapseSimple: false,

        // if true, will test to see if legend entries look stretched; these are usually in sets of 3 with the middle element having no label
        detectStretched: false,

        // if true, legends will be collapsed when a new instance is initialized
        collapsedOnInit: false,

        defaultOpacity: 1,
        visibleIcon: 'leaflet-html-legend-icon-eye',
        hiddenIcon: 'leaflet-html-legend-icon-eye-slash',
        toggleIcon: 'leaflet-html-legend-icon-eye'
    },

    onAdd(map) {
        this._map = map;
        this._container = L.DomUtil.create('div', 'leaflet-control leaflet-bar leaflet-html-legend');

        // Disable events on container
        L.DomEvent.disableClickPropagation(this._container);
        L.DomEvent.disableScrollPropagation(this._container);

        this.render();

        return this._container;
    },

    render() {
        L.DomUtil.empty(this._container);

        this.options.legends.forEach(this._renderLegend, this);

        this._checkVisibility();
    },

    addLegend(legend) {
        this.options.legends.push(legend);
        if (this._map) {
            this._renderLegend(legend);
        }
    },

    _renderLegend(legend) {
        if (!legend.elements) {
            return;
        }

        const elements = legend.elements;

        let className = 'legend-block';

        if (this.options.detectStretched) {
            if (
                elements.length === 3 &&
                elements[0].label !== '' &&
                elements[1].label === '' &&
                elements[2].label !== ''
            ) {
                className += ' legend-stretched';
            }
        }

        const block = L.DomUtil.create('div', className, this._container);

        if (this.options.collapseSimple && elements.length === 1 && !elements[0].label) {
            this._addElement(elements[0].html, legend.name, elements[0].style, block);
            this._connectLayer(block, legend);
            return;
        }

        if (legend.name) {
            const header = L.DomUtil.create('h4', null, block);
            L.DomUtil.create('div', 'legend-caret', header);
            L.DomUtil.create('span', null, header).innerHTML = legend.name;

            if (this.options.collapsedOnInit) {
                L.DomUtil.addClass(header, 'closed');
            }

            L.DomEvent.on(header, 'click', () => {
                if (L.DomUtil.hasClass(header, 'closed')) {
                    L.DomUtil.removeClass(header, 'closed');
                }
                else {
                    L.DomUtil.addClass(header, 'closed');
                }
            }, this);
        }

        const elementContainer = L.DomUtil.create('div', 'legend-elements', block);

        elements.forEach((element) => {
            this._addElement(element.html, element.label, element.style, elementContainer);
        }, this);

        this._connectLayer(block, legend);
    },

    _addElement(html, label, style, container) {
        const row = L.DomUtil.create('div', 'legend-row', container);
        const symbol = L.DomUtil.create('span', 'symbol', row);
        if (style) {
            Object.entries(style).forEach(([k, v]) => { symbol.style[k] = v; });
        }
        symbol.innerHTML = html;
        if (label) {
            L.DomUtil.create('label', null, row).innerHTML = label;
        }
    },

    _updateOpacity(layer, opacity) {
        if (typeof layer.setOpacity === 'function') {
            layer.setOpacity(opacity);
        }
        else if (typeof layer.setStyle === 'function') {
            layer.setStyle({ opacity });
        }
    },

    _connectLayer(container, legend) {
        const layer = legend.layer;

        if (!layer) {
            this._alwaysShow = true;
            return;
        }

        const opacity = layer.opacity || this.options.defaultOpacity || 1;
        this._updateOpacity(layer, opacity);

        if (this._map.hasLayer(layer)) {
            this._activeLayers += 1;
        }
        else {
            container.style.display = 'none';
        }

        container.classList.add('layer-control');

        const toggleButton = L.DomUtil.create('i', `visibility-toggle ${this.options.toggleIcon}`, container);
        toggleButton.dataset.visibileOpacity = opacity;
        L.DomEvent.on(toggleButton, 'click', (e) => {
            const button = e.target;
            if (L.DomUtil.hasClass(button, 'disabled')) {
                L.DomUtil.removeClass(button, 'disabled');
                this._updateOpacity(layer, button.dataset.visibileOpacity);
            }
            else {
                L.DomUtil.addClass(button, 'disabled');
                this._updateOpacity(layer, 0);
            }
        });

        const opacityController = L.DomUtil.create('span', 'opacity-slider', container);

        L.DomUtil.create('span', 'slider-label', opacityController).innerHTML = 'Transparency:';

        L.DomUtil.create('i', this.options.visibleIcon, opacityController);

        const opacitySlider = L.DomUtil.create('input', null, opacityController);
        opacitySlider.type = 'range';
        opacitySlider.min = 0;
        opacitySlider.max = 1;
        opacitySlider.step = 0.1;
        opacitySlider.onchange = ((e) => {
            const newOpacity = 1 - e.target.value || 0;
            this._updateOpacity(layer, newOpacity);
            toggleButton.dataset.visibileOpacity = newOpacity;
            L.DomUtil.removeClass(toggleButton, 'disabled');
        });
        opacitySlider.value = 1 - (opacity);

        L.DomUtil.create('i', this.options.hiddenIcon, opacityController);

        this._map.on('layeradd', (e) => {
            if (e.layer === layer) {
                this._activeLayers += 1;
                container.style.display = '';
                this._checkVisibility();
            }
        }).on('layerremove', (e) => {
            if (e.layer === layer) {
                this._activeLayers -= 1;
                container.style.display = 'none';
                this._checkVisibility();
            }
        });
    },

    _checkVisibility() {
        if (this._alwaysShow || this._activeLayers) {
            this._container.style.display = '';
        }
        else {
            this._container.style.display = 'none';
        }
    }
});

L.control.htmllegend = options => new L.Control.HtmlLegend(options);
