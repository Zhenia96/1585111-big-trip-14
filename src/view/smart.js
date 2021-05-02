import AbstractComponentView from './abstract/companent.js';
import { replace } from '../utils/component.js';

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
    throw new Error('This method has not been implemented. Implement it in an extended class');
  }
}
