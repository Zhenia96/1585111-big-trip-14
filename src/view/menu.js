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
    this._statisticsButton = this.getElement().querySelector('[data-type=stats]');

    this._handleTourButtonClick = this._handleTourButtonClick.bind(this);
    this._handleStatisticsButtonClick = this._handleStatisticsButtonClick.bind(this);
  }

  getTemplate() {
    return getMenuTemplate();
  }

  setTourButtonClickHandler(callback) {
    this._callback.openTour = callback;
    this._tableButton.addEventListener(EventName.CLICK, this._handleTourButtonClick);
  }

  setStatisticsButtonClickHandler(callback) {
    this._callback.openStatistics = callback;
    this._statisticsButton.addEventListener(EventName.CLICK, this._handleStatisticsButtonClick);
  }

  _handleTourButtonClick(evt) {
    evt.preventDefault();

    if (!this._tableButton.classList.contains(ACTIVE_BUTTON)) {
      this._statisticsButton.classList.remove(ACTIVE_BUTTON);
      this._tableButton.classList.add(ACTIVE_BUTTON);
      this._callback.openTour();
    }
  }

  _handleStatisticsButtonClick(evt) {
    evt.preventDefault();

    if (!this._statisticsButton.classList.contains(ACTIVE_BUTTON)) {
      this._tableButton.classList.remove(ACTIVE_BUTTON);
      this._statisticsButton.classList.add(ACTIVE_BUTTON);
      this._callback.openStatistics();
    }
  }
}
