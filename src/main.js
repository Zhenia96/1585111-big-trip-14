import MenuView from './view/menu.js';
import { generateEventDataList } from './mock/event.js';
import { Position, CssClassName } from './constant.js';
import { render } from './utils/component.js';
import TourPresenter from './presenter/tour.js';
import InfoPresenter from './presenter/info.js';
import FilterPresenter from './presenter/filter.js';
import EventModel from './model/event.js';
import FilterModel from './model/filter.js';

const tripMainElement = document.querySelector(CssClassName.TRIP_MAIN);
const navigationElement = tripMainElement.querySelector(CssClassName.NAVIGATION);
const filterContainer = tripMainElement.querySelector(CssClassName.FILTER);
const contentContainer = document.querySelector('.page-body__page-main .page-body__container');
const eventDataList = generateEventDataList(20);

const eventModel = new EventModel();
eventModel.data = eventDataList;

const filterModel = new FilterModel();

const infoPresenter = new InfoPresenter(tripMainElement, eventModel, filterModel);
infoPresenter.init();

const tourPresenter = new TourPresenter(contentContainer, eventModel, filterModel);
tourPresenter.init();

const menu = new MenuView();
render(menu, navigationElement, Position.AFTER_BEGIN);

const filterPresenter = new FilterPresenter(filterContainer, eventModel, filterModel);
filterPresenter.init();

