import { FiltersName, SortMode } from '../constant.js';
import MenuView from '../view/menu.js';
import { render } from '../utils/component.js';

export default class Menu {
  constructor({ navigationElement, filterPresenter, statisticsPresenter, tourPresenter, filterModel, addEventButton }) {
    this._menu = new MenuView();
    this._filterPresenter = filterPresenter;
    this._statisticsPresenter = statisticsPresenter;
    this._tourPresenter = tourPresenter;
    this._filterModel = filterModel;
    this._addEventButton = addEventButton;
    this._container = navigationElement;

    this._statisticsButtonClickCallback = this._statisticsButtonClickCallback.bind(this);
    this._tourButtonClickCallback = this._tourButtonClickCallback.bind(this);

    this._menu.setStatisticsButtonClickHandler(this._statisticsButtonClickCallback);
    this._menu.setTourButtonClickHandler(this._tourButtonClickCallback);
  }

  init() {
    render(this._menu, this._container);
  }

  _tourButtonClickCallback() {
    this._filterPresenter.disableButtons();
    this._addEventButton.disabled = false;
    this._statisticsPresenter.statistics.hideElement();
    this._tourPresenter.tour.showElement();
  }

  _statisticsButtonClickCallback() {
    this._filterPresenter.filter.disableButtons({}, true);

    if (this._filterModel.currentFilter !== FiltersName.EVERYTHING || this._tourPresenter.currentSortMode !== SortMode.DATE) {
      this._filterModel.currentFilter = FiltersName.EVERYTHING;
      this._tourPresenter.init();
    }

    this._tourPresenter.tour.hideElement();
    this._tourPresenter.closeAllEditors();

    if (this._statisticsPresenter.dataChangedStatus) {
      this._statisticsPresenter.init();
    }

    this._statisticsPresenter.statistics.showElement();
    this._addEventButton.disabled = true;
  }
}
