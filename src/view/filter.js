import AbstractComponentView from './abstract/component.js';
import { EventName } from '../constant';

const FilterButton = {
  EVERYTHING: '[value = everything]',
  FUTURE: '[value = future]',
  PAST: '[value = past]',
};

const getFilterTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class Filter extends AbstractComponentView {
  constructor() {
    super();

    this._everythingButton = this.getElement().querySelector(FilterButton.EVERYTHING);
    this._futureButton = this.getElement().querySelector(FilterButton.FUTURE);
    this._pastButton = this.getElement().querySelector(FilterButton.PAST);

    this._handleButtonClick = this._handleButtonClick.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
  }

  get everythingButton() {
    return this._everythingButton;
  }

  get futureButton() {
    return this._futureButton;
  }

  get pastButton() {
    return this._pastButton;
  }

  getTemplate() {
    return getFilterTemplate();
  }

  disableButtons({ isEverythingDisabled, isFutureDisabled, isPastDisabled }, disableAllButtons = false) {
    this._everythingButton.disabled = disableAllButtons ? true : isEverythingDisabled;
    this._futureButton.disabled = disableAllButtons ? true : isFutureDisabled;
    this._pastButton.disabled = disableAllButtons ? true : isPastDisabled;
  }

  setButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(EventName.CLICK, this._handleButtonClick);
  }

  _handleButtonClick(evt) {
    if (evt.target.value && !evt.target.disabled) {
      this._callback.click(evt.target.value);
    }
  }
}
