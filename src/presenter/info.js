import TripInfoView from '../view/trip-info.js';
import { render, replace, remove } from '../utils/component.js';
import { sortData } from '../utils/common.js';
import { Position } from '../constant.js';

export default class Info {
  constructor(container, modalEvent) {
    this._container = container;
    this._info = null;
    this._modalEvent = modalEvent;
  }

  init() {
    if (this._modalEvent.data.length === 0) {
      remove(this._info);
      this._info = null;
      return;
    }

    const sortedData = this._modalEvent.data.slice();
    sortData(sortedData);

    const prevInfo = this._info;

    this._info = new TripInfoView(sortedData);

    if (prevInfo === null) {
      render(this._info, this._container, Position.AFTER_BEGIN);
      return;
    }

    replace(this._info, prevInfo);
  }
}
