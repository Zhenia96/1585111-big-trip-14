import { CssClassName, ServerPath } from './constant.js';
import TourPresenter from './presenter/tour.js';
import StatisticsPresenter from './presenter/statistics.js';
import InfoPresenter from './presenter/info.js';
import FilterPresenter from './presenter/filter.js';
import MenuPresenter from './presenter/menu.js';
import EventModel from './model/event.js';
import FilterModel from './model/filter.js';
import { adaptPointsToClient, adaptDestinationsForEditorToClient, adaptOffersForEditorToClient } from './utils/adapter.js';
import { } from './utils/lock-application.js';
import Api from './api.js';

const tripMainElement = document.querySelector(CssClassName.TRIP_MAIN);
const navigationElement = tripMainElement.querySelector(CssClassName.NAVIGATION);
const filterContainer = tripMainElement.querySelector(CssClassName.FILTER);
const contentContainer = document.querySelector('.page-body__page-main .page-body__container');
const addEventButton = tripMainElement.querySelector('.trip-main__event-add-btn');

const api = new Api();

const eventModel = new EventModel();

const filterModel = new FilterModel();

const infoPresenter = new InfoPresenter(tripMainElement, eventModel, filterModel);
infoPresenter.init();

const tourPresenter = new TourPresenter(contentContainer, eventModel, filterModel, api);

const statisticsPresenter = new StatisticsPresenter(contentContainer, eventModel);
statisticsPresenter.init();

const filterPresenter = new FilterPresenter(filterContainer, eventModel, filterModel);
filterPresenter.init();

const menuPresenter = new MenuPresenter({ navigationElement, filterPresenter, statisticsPresenter, tourPresenter, filterModel, addEventButton });
menuPresenter.init();

const initPointsData = () => {
  return api.getData(ServerPath.POINTS)
    .then((json) => {
      eventModel.data = adaptPointsToClient(json);
    });
};

const initDestinationsData = () => {
  return api.getData(ServerPath.DESTINATIONS)
    .then((json) => {
      eventModel.destinations = adaptDestinationsForEditorToClient(json);
      eventModel.setAvailableDestintionNames();
    });
};

const initOffersData = () => {
  return api.getData(ServerPath.OFFERS)
    .then((json) => {
      eventModel.offers = adaptOffersForEditorToClient(json);
    });
};

const firstInit = () => {
  Promise.all([
    initPointsData(),
    initDestinationsData(),
    initOffersData(),
  ])
    .finally(() => {
      tourPresenter.init();
    });
};

firstInit();
