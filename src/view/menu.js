import AbstractComponentView from './abstract/companent.js';
import { EventName } from '../constant';

const ACTIVE_BUTTON = 'trip-tabs__btn--active';


const getMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" data-type="table" href="#">Table</a>
      <a class="trip-tabs__btn" data-type="stats" href="#">Stats</a>
    </nav>`;
};

export default class Menu extends AbstractComponentView {

  constructor() {
    super();
    this._tableButton = this.getElement().querySelector('[data-type=table]');
    this._statsButton = this.getElement().querySelector('[data-type=stats]');

    this._openTourClickHandler = this._openTourClickHandler.bind(this);
    this._openStatisticsClickHandler = this._openStatisticsClickHandler.bind(this);
  }

  getTemplate() {
    return getMenuTemplate();
  }

  _openTourClickHandler(evt) {
    evt.preventDefault();
    if (!this._tableButton.classList.contains(ACTIVE_BUTTON)) {
      this._statsButton.classList.remove(ACTIVE_BUTTON);
      this._tableButton.classList.add(ACTIVE_BUTTON);
      this._callback.openTour();
    }
  }

  setOpenTourClickHandler(callback) {
    this._callback.openTour = callback;
    this._tableButton.addEventListener(EventName.CLICK, this._openTourClickHandler);
  }

  _openStatisticsClickHandler(evt) {
    evt.preventDefault();
    if (!this._statsButton.classList.contains(ACTIVE_BUTTON)) {
      this._tableButton.classList.remove(ACTIVE_BUTTON);
      this._statsButton.classList.add(ACTIVE_BUTTON);
      this._callback.openStatistics();
    }
  }

  setOpenStatisticsClickHandler(callback) {
    this._callback.openStatistics = callback;
    this._statsButton.addEventListener(EventName.CLICK, this._openStatisticsClickHandler);
  }
}
