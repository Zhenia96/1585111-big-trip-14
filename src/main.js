import MenuView from './view/menu.js';
import { generateEventDataList } from './mock/event.js';
import { Position, CssClassName } from './constant.js';
import { render } from './utils/component.js';
import ContentPresenter from './presenter/content.js';
import InfoPresenter from './presenter/info.js';
import FilterPresenter from './presenter/filter.js';
import EventModel from './model/event.js';
import FilterModel from './model/filter.js';

const tripMainElement = document.querySelector(CssClassName.TRIP_MAIN);
const navigationElement = tripMainElement.querySelector(CssClassName.NAVIGATION);
const filterContainer = tripMainElement.querySelector(CssClassName.FILTER);
const contentContainer = document.querySelector(CssClassName.CONTENT);
const eventDataList = generateEventDataList(20);

const menu = new MenuView();

const eventModel = new EventModel();
eventModel.data = eventDataList;

const filterModel = new FilterModel();

const infoPresenter = new InfoPresenter(tripMainElement, eventModel);
infoPresenter.init();

const contentPresenter = new ContentPresenter(contentContainer, eventModel, filterModel);
contentPresenter.init();

render(menu, navigationElement, Position.AFTER_BEGIN);

const filterPresenter = new FilterPresenter(filterContainer, filterModel);
filterPresenter.init();

