import { render } from '../utils/component.js';
import { FiltersName, SortMode } from '../constant.js';
import MenuView from '../view/menu.js';

export default class Menu {
  constructor({ navigationElement, filterPresenter, statisticsPresenter, tourPresenter, filterModel, addEventButton }) {
    this._menu = new MenuView();
    this._filterPresenter = filterPresenter;
    this._statisticsPresenter = statisticsPresenter;
    this._tourPresenter = tourPresenter;
    this._filterModel = filterModel;
    this._addEventButton = addEventButton;
    this._container = navigationElement;
    this._handleOpenStatisticsClick = this._handleOpenStatisticsClick.bind(this);
    this._handleOpenTourClick = this._handleOpenTourClick.bind(this);

    this._menu.setOpenStatisticsClickHandler(this._handleOpenStatisticsClick);
    this._menu.setOpenTourClickHandler(this._handleOpenTourClick);
  }

  init() {
    render(this._menu, this._container);
  }

  _handleOpenTourClick() {
    this._filterPresenter.disableNeedlessButtons();
    this._addEventButton.disabled = false;
    this._statisticsPresenter.statistics.hideElement();
    this._tourPresenter.tour.showElement();
  }

  _handleOpenStatisticsClick() {
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
