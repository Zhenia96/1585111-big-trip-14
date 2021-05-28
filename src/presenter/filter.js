import { FiltersName, Position } from '../constant.js';
import FilterView from '../view/filter.js';
import { render } from '../utils/component.js';


export default class Filter {
  constructor(container, eventModel, filterModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._eventModel = eventModel;
    this._filter = new FilterView();

    this._buttonClickCallback = this._buttonClickCallback.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
    this.checkButton = this.checkButton.bind(this);

    this._eventModel.addObserver(this.disableButtons);
    this._filterModel.addObserver(this.checkButton);
  }

  init() {
    render(this._filter, this._container, Position.AFTER_BEGIN);

    this.disableButtons();
    this._filter.setButtonClickHandler(this._buttonClickCallback);
  }

  get filter() {
    return this._filter;
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

  disableButtons() {
    const config = {
      isEverythingDisabled: !this._eventModel.data.length,
      isFutureDisabled: !this._eventModel.futureData.length,
      isPastDisabled: !this._eventModel.pastData.length,
    };

    this._filter.disableButtons(config);
  }

  _buttonClickCallback(clickedFilter) {
    if (this._filterModel.currentFilter !== clickedFilter) {
      this._filterModel.currentFilter = clickedFilter;
    }
  }
}
