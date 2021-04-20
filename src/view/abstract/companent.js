import { createElement } from '../../utils/component.js';

export default class Companent {
  constructor() {
    if (new.target === 'AbstarctCompanent') {
      throw new Error('The class is not for instantiate. Create extended class by this class and use it');
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error('The method has not implemented. Implement it in an extended class');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
