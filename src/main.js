import MenuView from './view/menu.js';
import { generateEventDataList } from './mock/event.js';
import { CssClassName, FiltersName, SortMode } from './constant.js';
import { render } from './utils/component.js';
import TourPresenter from './presenter/tour.js';
import StatisticsPresenter from './presenter/statistics.js';
import InfoPresenter from './presenter/info.js';
import FilterPresenter from './presenter/filter.js';
import EventModel from './model/event.js';
import FilterModel from './model/filter.js';

const tripMainElement = document.querySelector(CssClassName.TRIP_MAIN);
const navigationElement = tripMainElement.querySelector(CssClassName.NAVIGATION);
const filterContainer = tripMainElement.querySelector(CssClassName.FILTER);
const contentContainer = document.querySelector('.page-body__page-main .page-body__container');
const addEventButton = tripMainElement.querySelector('.trip-main__event-add-btn');
const eventDataList = generateEventDataList(20);

const eventModel = new EventModel();
eventModel.data = eventDataList;

const filterModel = new FilterModel();

const infoPresenter = new InfoPresenter(tripMainElement, eventModel, filterModel);
infoPresenter.init();

const tourPresenter = new TourPresenter(contentContainer, eventModel, filterModel);
tourPresenter.init();

const statisticsPresenter = new StatisticsPresenter(contentContainer, eventModel);
statisticsPresenter.init();

const menu = new MenuView();
render(menu, navigationElement);

const filterPresenter = new FilterPresenter(filterContainer, eventModel, filterModel);
filterPresenter.init();

const handleOpenTourClick = () => {
  filterPresenter.disableNeedlessButtons();
  addEventButton.disabled = false;
  statisticsPresenter.statistics.hideElement();
  if (filterModel.currentFilter !== FiltersName.EVERYTHING || tourPresenter.currentSortMode !== SortMode.DATE) {
    filterModel.currentFilter = FiltersName.EVERYTHING;
    tourPresenter.init();
  }
  tourPresenter.tour.showElement();
};

const handleOpenStatisticsClick = () => {
  addEventButton.disabled = true;
  filterPresenter.filter.disableButtons({}, true);
  tourPresenter.tour.hideElement();
  if (statisticsPresenter.dataChangedStatus) {
    statisticsPresenter.init();
  }
  statisticsPresenter.statistics.showElement();
};

menu.setOpenStatisticsClickHandler(handleOpenStatisticsClick);
menu.setOpenTourClickHandler(handleOpenTourClick);
