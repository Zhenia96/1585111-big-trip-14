import { CssClassName, ServerPath, StoreKey, EventName, OFFLINE } from './constant.js';
import { adaptPointsToClient, adaptEditorDestinationsToClient, adaptEditorOffersToClient } from './utils/adapter.js';
import { isOnline } from './utils/common.js';
import TourPresenter from './presenter/tour.js';
import StatisticsPresenter from './presenter/statistics.js';
import InfoPresenter from './presenter/info.js';
import FilterPresenter from './presenter/filter.js';
import MenuPresenter from './presenter/menu.js';
import EventModel from './model/event.js';
import FilterModel from './model/filter.js';
import Api from './api/api.js';
import BasedApi from './api/based-api.js';
import Storage from './api/storage.js';

const PATH_FOR_SERVICE_WORKER = './sw.js';

const tripMainElement = document.querySelector(CssClassName.TRIP_MAIN);
const navigationElement = tripMainElement.querySelector(CssClassName.NAVIGATION);
const filterContainer = tripMainElement.querySelector(CssClassName.FILTER);
const contentContainer = document.querySelector(CssClassName.CONTENT_CONTAINER);
const addEventButton = tripMainElement.querySelector(CssClassName.ADD_EVENT_BUTTON);

const basedApi = new BasedApi();
const storage = new Storage(window.localStorage);
const api = new Api(basedApi, storage);

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
  return api.getData(ServerPath.POINTS, StoreKey.POINTS)
    .then((response) => {
      eventModel.setData(adaptPointsToClient(response));
    });
};

const initDestinationsData = () => {
  return basedApi.getData(ServerPath.DESTINATIONS)
    .then((response) => {
      eventModel.destinations = adaptEditorDestinationsToClient(response);
      eventModel.setAvailableDestintionNames();
    });
};

const initOffersData = () => {
  return api.getData(ServerPath.OFFERS, StoreKey.OFFERS)
    .then((response) => {
      eventModel.offers = adaptEditorOffersToClient(response);
    });
};

const initApplicationData = () => {
  Promise.all([
    initPointsData(),
    initOffersData(),
    initDestinationsData(),
  ])
    .catch(() => {
      if (!isOnline()) {
        document.title += OFFLINE;
      }
    })
    .finally(() => {
      tourPresenter.init();
    });
};

initApplicationData();

window.addEventListener(EventName.LOAD, () => {
  window.navigator.serviceWorker.register(PATH_FOR_SERVICE_WORKER);
});

window.addEventListener(EventName.ONLINE, () => {
  api.sync(ServerPath.SYNC, StoreKey.POINTS)
    .then((points) => {
      eventModel.setData(adaptPointsToClient(points), true);

      if (!eventModel.destinations.length) {
        initDestinationsData();
      }
    });
  document.title = document.title.replace(OFFLINE, '');
});

window.addEventListener(EventName.OFFLINE, () => {
  document.title += OFFLINE;
});
