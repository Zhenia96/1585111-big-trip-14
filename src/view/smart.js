import AbstractComponentView from './abstract/component.js';
import { replace } from '../utils/component.js';
import { ErrorMessage } from '../constant';

export default class Smart extends AbstractComponentView {
  constructor() {
    super();
    this._data = {};
  }

  _updateData(updatedData, haveRequirementToUpdateElement = true) {
    this._data = Object.assign(
      {},
      this._data,
      updatedData,
    );

    if (haveRequirementToUpdateElement) {
      this._updateElement();
    }
  }

  _updateElement() {
    const prevElement = this.getElement();
    this.removeElement();

    const newElement = this.getElement();
    replace(newElement, prevElement);

    this._restoreHandlers();
  }

  _restoreHandlers() {
    throw new Error(ErrorMessage.METHOD_HAS_NOT_BEEN_IMPLEMENTED);
  }
}
