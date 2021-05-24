import AbstractComponentView from './abstract/companent.js';
import { EventName, SortMode } from '../constant';

const getSortFormTemplate = (sortMode) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--day">
        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="date" value="sort-day" ${sortMode === SortMode.DATE ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-day">Day</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="time" value="sort-time" ${sortMode === SortMode.TIME ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-time">Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="price" value="sort-price" ${sortMode === SortMode.PRICE ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-price">Price</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
    </form>`;
};

export default class SortForm extends AbstractComponentView {

  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
    this._currentSortMode = SortMode.DATE;
  }

  getTemplate() {
    return getSortFormTemplate(this._currentSortMode);
  }

  changeSortMode(mode) {
    this._currentSortMode = mode;
  }

  _clickHandler(evt) {
    if (evt.target.dataset.sortType) {
      this._callback.clickSortButtons(evt.target.dataset.sortType);
    }
  }

  setClickHandler(callback) {
    this._callback.clickSortButtons = callback;
    this.getElement().addEventListener(EventName.CLICK, this._clickHandler);
  }
}
