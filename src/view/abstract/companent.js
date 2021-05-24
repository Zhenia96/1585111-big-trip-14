import { createElement } from '../../utils/component.js';

const ANIMATION_TIMEOUT = 600;

export default class Companent {
  constructor() {
    if (new.target === 'AbstarctCompanent') {
      throw new Error('The class is not for instantiate. Create extended class by this class and use it');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('The method has not been implemented. Implement it in an extended class');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  hideElement() {
    this.getElement().hidden = true;
  }

  showElement() {
    this.getElement().hidden = false;
  }

  removeElement() {
    this._element = null;
  }

  shake() {
    this.getElement().style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';
    }, ANIMATION_TIMEOUT);
  }
}
