import AbstractComponentView from '../abstract/companent.js';
import { ESCAPE_BUTTON, CssClassName, EventName } from '../../constant.js';

const getEventItemTemplate = () => {
  return '<li class="trip-events__item"></li>';
};

export default class EventItem extends AbstractComponentView {
  constructor() {
    super();
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  _keydownHandler(evt) {
    if (evt.code === ESCAPE_BUTTON && this.getElement().querySelector(CssClassName.EVENT_EDITOR)) {
      this._callback.keydown();
    }
  }

  setKeydownHandler(callback) {
    this._callback.keydown = callback;
    document.addEventListener(EventName.KEYDOWN, this._keydownHandler);
  }

  getTemplate() {
    return getEventItemTemplate();
  }
}
