import { render } from '../utils/component.js';
import { Position } from '../constant.js';
import FilterView from '../view/filter.js';
import { FiltersName } from '../constant.js';

export default class Filter {
  constructor(container, eventModel, filterModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._eventModel = eventModel;
    this._filter = new FilterView();

    this._handleFilterClick = this._handleFilterClick.bind(this);
    this.disableNeedlessButtons = this.disableNeedlessButtons.bind(this);
    this.checkButton = this.checkButton.bind(this);

    this._eventModel.addObserver(this.disableNeedlessButtons);
    this._filterModel.addObserver(this.checkButton);
  }

  get filter() {
    return this._filter;
  }

  init() {
    render(this._filter, this._container, Position.AFTER_BEGIN);

    this.disableNeedlessButtons();
    this._filter.setClickHandler(this._handleFilterClick);
  }

  checkButton() {
    switch (this._filterModel.currentFilter) {
      case FiltersName.FUTURE:
        this._filter.futureButton.checked = true;
        break;
      case FiltersName.PAST:
        this._filter.pastButton.checked = true;
        break;
      default:
        this._filter.everythingButton.checked = true;
    }
  }

  disableNeedlessButtons() {
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
