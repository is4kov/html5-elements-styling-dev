function dialog() {
    var opener = document.getElementById('example-dialog-opener'),
        closer = document.getElementById('example-dialog-closer'),
        dialog = document.getElementById('example-dialog'),
        colorPicker = document.getElementById('example-dialog-color'),
        opacityPicker = document.getElementById('example-dialog-range');

    var rgba = {
        rgb: '255,255,255',
        alpha: 0.2
    }

    getColor = function() {
        color = this.value.toString();
        if(color.indexOf('#') != -1) {
            color = color.substring(1);
        }

        colorR = parseInt(color.substring(0, 2), 16);
        colorG = parseInt(color.substring(2, 4), 16);
        colorB = parseInt(color.substring(4, 6), 16);

        rgba.rgb = colorR + ',' + colorG + ',' + colorB;

        updateBackdropCSS(rgba.rgb, rgba.alpha);
    }

    getOpacity = function() {
        rgba.alpha = this.value;
        updateBackdropCSS(rgba.rgb, rgba.alpha);
    }

    opener.addEventListener('click', openDialog, false);
    closer.addEventListener('click', closeDialog, false);
    colorPicker.addEventListener('change', getColor, false);
    opacityPicker.addEventListener('change', getOpacity, false);

    function openDialog() {
        dialog.showModal();
    }

    function closeDialog() {
        dialog.close();
    }

    function updateBackdropCSS(color, opacity) {
        var style = document.createElement('style');
        style.innerHTML = '#example-dialog::backdrop { background: rgba(' + color + ',' + opacity + '); }';
        document.body.append(style);
    }
}

dialog();

function meter() {
    var meter = document.getElementById('example-meter-styled');
    var meter_low= document.getElementById('example-meter-styled_low');
    var meter_high= document.getElementById('example-meter-styled_high');
    var meter_optimum= document.getElementById('example-meter-styled_optimum');
    var meter_value= document.getElementById('example-meter-styled_value');

    var meter_webkit = document.getElementById('example-meter-styled-webkit');
    var meter_webkit_low= document.getElementById('example-meter-styled-webkit_low');
    var meter_webkit_high= document.getElementById('example-meter-styled-webkit_high');
    var meter_webkit_optimum= document.getElementById('example-meter-styled-webkit_optimum');
    var meter_webkit_value= document.getElementById('example-meter-styled-webkit_value');

    var optimum_color = document.getElementById('example-meter-styled_optimum-color');
    var low_color = document.getElementById('example-meter-styled_low-color');
    var high_color = document.getElementById('example-meter-styled_high-color');

    meter_low.addEventListener('change', updateMeter, false);
    meter_high.addEventListener('change', updateMeter, false);
    meter_optimum.addEventListener('change', updateMeter, false);
    meter_value.addEventListener('change', updateMeter, false);

    meter_webkit_low.addEventListener('change', updateMeterWebkit, false);
    meter_webkit_high.addEventListener('change', updateMeterWebkit, false);
    meter_webkit_optimum.addEventListener('change', updateMeterWebkit, false);
    meter_webkit_value.addEventListener('change', updateMeterWebkit, false);

    optimum_color.addEventListener('change', updateColors, false);
    low_color.addEventListener('change', updateColors, false);
    high_color.addEventListener('change', updateColors, false);

    function updateMeter() {
        var value = this.value;
        var type = this.id.substr(this.id.indexOf('_') + 1);

        if (type == 'low') {
            meter.low = value;
        } else if (type == 'high') {
            meter.high = value;
        } else if (type == 'optimum') {
            meter.optimum = value;
        } else if (type == 'value') {
            meter.value = value;
        }
        this.nextSibling.innerHTML = value;
    }

    function updateMeterWebkit() {
        var value = this.value;
        var type = this.id.substr(this.id.indexOf('_') + 1);

        if (type == 'low') {
            meter_webkit.low = value;
        } else if (type == 'high') {
            meter_webkit.high = value;
        } else if (type == 'optimum') {
            meter_webkit.optimum = value;
        } else if (type == 'value') {
            meter_webkit.value = value;
        }
        this.nextSibling.innerHTML = value;
    }

    var label_webkit = document.querySelector('label[for="section-meter-styled-webkit"]');
    label_webkit.addEventListener('click', gradientRemoving, false);

    function gradientRemoving() {
        if (!meter_webkit.classList.contains('without-gradients')) {
            meter_webkit.classList.add('without-gradients')
        }
    }

    function updateColors() {

        var type = this.id.substr(this.id.indexOf('_') + 1);
        var selector = '';
        var style = document.createElement('style');

        if (type == 'low-color') {
            selector = '::-webkit-meter-even-less-good-value'
        } else if (type == 'high-color') {
            selector = '::-webkit-meter-suboptimum-value'
        } else if (type == 'optimum-color') {
            selector = '::-webkit-meter-optimum-value'
        }

        style.innerHTML = '#example-meter-styled-webkit' + selector + '{ background: ' + this.value + '}'
        document.body.appendChild(style);
    }
}

// meter();

function progress() {
    var progress_webkit_selector = 'example-progress-styled-webkit';
    var inner_webkit = document.getElementById('example-progress-webkit-inner-element');
    var bar_webkit = document.getElementById('example-progress-webkit-progress-bar');
    var value_webkit = document.getElementById('example-progress-webkit-progress-value');

    inner_webkit.addEventListener('change', updateInnerElementWebkit, false);
    bar_webkit.addEventListener('change', updateProgressBarWebkit, false);
    value_webkit.addEventListener('change', updateProgressValueWebkit, false);

    function updateInnerElementWebkit() {
        var style = document.createElement('style');
        style.innerHTML = '#' + progress_webkit_selector + '::-webkit-progress-inner-element { display:block;border: ' + this.value + 'px solid #222; }';
        document.body.appendChild(style);
    }

    function updateProgressBarWebkit() {
        var style = document.createElement('style');
        style.innerHTML = '#' + progress_webkit_selector + '::-webkit-progress-bar {background: ' + this.value + '; }';
        document.body.appendChild(style);
    }

    function updateProgressValueWebkit() {
        var style = document.createElement('style');
        style.innerHTML = '#' + progress_webkit_selector + '::-webkit-progress-value {background: ' + this.value + '; }';
        document.body.appendChild(style);
    }
}

progress();