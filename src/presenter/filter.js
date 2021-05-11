import { render } from '../utils/component.js';
import { Position } from '../constant.js';
import FilterView from '../view/filter.js';

export default class Filter {
  constructor(container, eventModel, filterModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._eventModel = eventModel;
    this._filter = new FilterView();

    this._handleFilterClick = this._handleFilterClick.bind(this);
    this._disableNeedlessButtons = this._disableNeedlessButtons.bind(this);

    this._eventModel.addObserver(this._disableNeedlessButtons);
  }

  init() {
    render(this._filter, this._container, Position.AFTER_BEGIN);

    this._disableNeedlessButtons();
    this._filter.setClickHandler(this._handleFilterClick);
  }

  _disableNeedlessButtons() {
    const config = {
      isEverythingDisabled: this._eventModel.data.length === 0,
      isFutureDisabled: this._eventModel.futureData.length === 0,
      isPastDisabled: this._eventModel.pastData.length === 0,
    };

    this._filter.disableButtons(config);
  }

  _handleFilterClick(clickedFilter) {
    if (this._filterModel.currentFilter !== clickedFilter) {
      this._filterModel.currentFilter = clickedFilter;
    }
  }
}
