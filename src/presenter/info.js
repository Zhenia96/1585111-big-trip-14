import TripInfoView from '../view/trip-info.js';
import { render, replace, remove } from '../utils/component.js';
import { sortData, calcTotalPrice } from '../utils/common.js';
import { Position, FiltersName } from '../constant.js';

export default class Info {
  constructor(container, modalEvent, modalFilter) {
    this._container = container;
    this._info = null;
    this._modalEvent = modalEvent;
    this._modalFilter = modalFilter;

    this._updateInfo = this._updateInfo.bind(this);
    this._modalEvent.addObserver(this._updateInfo);

    this._changeTotalPrice = this._changeTotalPrice.bind(this);
    this._modalFilter.addObserver(this._changeTotalPrice);
    this._modalEvent.addObserver(this._changeTotalPrice);
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

  _updateInfo() {
    this.init();
  }

  _changeTotalPrice() {
    if (this._modalEvent.data.length === 0) {
      return;
    }
    let currentData;
    const costField = this._info.getElement().querySelector('.trip-info__cost-value');
    if (this._modalFilter.currentFilter === FiltersName.EVERYTHING) {
      currentData = this._modalEvent.data;
    }
    if (this._modalFilter.currentFilter === FiltersName.FUTURE) {
      currentData = this._modalEvent.futureData;
    }
    if (this._modalFilter.currentFilter === FiltersName.PAST) {
      currentData = this._modalEvent.pastData;
    }

    costField.textContent = calcTotalPrice(currentData);
  }
}
