import { ErrorMessage } from '../../constant.js';
import { createElement } from '../../utils/component.js';

const ANIMATION_TIMEOUT = 600;

export default class Component {
  constructor() {
    if (new.target === 'AbstarctComponent') {
      throw new Error(ErrorMessage.CLASS_IS_NOT_FOR_INSTANTIATE);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(ErrorMessage.METHOD_HAS_NOT_BEEN_IMPLEMENTED);
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
