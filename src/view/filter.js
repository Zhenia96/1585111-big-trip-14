import AbstractComponentView from './abstract/companent.js';
import { EventName } from '../constant';


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
    this._clickHandler = this._clickHandler.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
  }

  getTemplate() {
    return getFilterTemplate();
  }

  _clickHandler(evt) {
    if (evt.target.value && !evt.target.disabled) {
      this._callback.click(evt.target.value);
    }
  }

  disableButtons({ isEverythingDisabled, isFutureDisabled, isPastDisabled }) {
    const everythingButton = this.getElement().querySelector('[value = everything]');
    const futureButton = this.getElement().querySelector('[value = future]');
    const pastButton = this.getElement().querySelector('[value = past]');

    everythingButton.disabled = isEverythingDisabled;
    futureButton.disabled = isFutureDisabled;
    pastButton.disabled = isPastDisabled;
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(EventName.CLICK, this._clickHandler);
  }
}
