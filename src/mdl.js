import {inject, customAttribute} from 'aurelia-framework';
import {componentHandler} from 'material-design-lite';

let mdlTypes = {
    button: {
        html: ["mdl-button", "mdl-js-button"]
      , js: ['MaterialButton']
      , fct: [manageRipple]

    }
  , textfield: {
       js: ['MaterialTextfield']
     , html: ["mdl-textfield", "mdl-js-textfield"]
  }
  , layout: {
       js: ['MaterialLayout']
     , html: ["mdl-layout", "mdl-js-layout"]
  }
  , menu: {
       js: ['MaterialMenu']
     , html: ["mdl-menu", "mdl-js-menu"]
     , fct: [manageRipple]
  }
  , "data-table": {
       js: ['MaterialDataTable']
     , html: ["mdl-data-table", "mdl-js-data-table"]
     , fct: [manageRipple]
  }
  , tabs: {
       js: ['MaterialTabs']
     , html: ["mdl-tabs", "mdl-js-tabs"]
     , fct: [manageRipple]
  }
  , slider: {
       js: ['MaterialSlider']
     , html: ["mdl-slider", "mdl-js-slider"]
  }
  , tooltip: {
       js: ['MaterialTooltip']
     , html: ["mdl-tooltip"]
  }
  , progress: {
       js: ['MaterialProgress']
     , html: ["mdl-progress", "mdl-js-progress"]
  }
  , spinner: {
       js: ['MaterialSpinner']
     , html: ["mdl-spinner", "mdl-js-spinner"]
  }
  , badge: {
     html: ["mdl-badge"]
  }
  , "switch": {
       js: ['MaterialSwitch']
     , html: ["mdl-switch", "mdl-js-switch"]
     , fct: [manageRipple]
  }
  , "radio": {
       js: ['MaterialRadio']
     , html: ["mdl-radio", "mdl-js-radio"]
     , fct: [manageRipple]
  }
  , "icon-toggle": {
       js: ['MaterialIconToggle']
     , html: ["mdl-icon-toggle", "mdl-js-icon-toggle"]
     , fct: [manageRipple]
  }
  , "checkbox": {
       js: ['MaterialCheckbox']
     , html: ["mdl-checkbox", "mdl-js-checkbox"]
     , fct: [manageRipple]
  }  
  , "snackbar": {
       js: ['MaterialSnackbar']
     , html: ["mdl-js-snackbar", "mdl-snackbar"]
     , fct: [manageRipple]
  }
}

function manageRipple(element) {
    if (element.classList.contains('mdl-js-ripple-effect')) {
        this.componentHandler.upgradeElement(element, 'MaterialRipple');
    }
    var elements = element.querySelectorAll('.mdl-js-ripple-effect');
    for (let el of elements) {
        this.componentHandler.upgradeElement(el, 'MaterialRipple');
    }
}

function upgradeElement(element, type) {
    let {fct=[], html, js=[]} = (mdlTypes[type] || {});
    if (html) {
        for (let h of html) {
             element.classList.add(h);
        }
    }
    for (let t of js) {
      this.componentHandler.upgradeElement(element, t);
    }
    for (let f of fct) f(element);
}

@inject(Element)
@customAttribute('mdl')
export class MDLCustomAttribute {

    constructor(element) {
        this.element = element;
     }

    attached() {
      //console.log("mdl attached: " + this.value);
      upgradeElement(this.element, this.value);
    }
}
