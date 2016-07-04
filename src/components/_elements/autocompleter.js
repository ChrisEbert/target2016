import Awesomplete from 'awesomplete';
import {customElement, inject, bindable} from 'aurelia-framework';

@customElement('autocompleter')
@inject(Element)
export class Autocompleter {
  @bindable field;
  @bindable result;

  constructor(element) {
    this.element = element;
  }

  attached() {
    const input = this.element.getElementById(this.field);
    new Awesomplete(input, {
      list: `${this.field}List`
    });
  }
}
