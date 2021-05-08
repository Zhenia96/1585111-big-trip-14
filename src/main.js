import FilterView from './view/filter.js';
import MenuView from './view/menu.js';
import { generateEventDataList } from './mock/event.js';
import { Position, CssClassName } from './constant.js';
import { render } from './utils/component.js';
import ContentPresenter from './presenter/content.js';
import InfoPresenter from './presenter/info.js';
import EventModel from './model/event.js';

const tripMainElement = document.querySelector(CssClassName.TRIP_MAIN);
const navigationElement = tripMainElement.querySelector(CssClassName.NAVIGATION);
const filterContainer = tripMainElement.querySelector(CssClassName.FILTER);
const contentContainer = document.querySelector(CssClassName.CONTENT);
const eventDataList = generateEventDataList(20);

const menu = new MenuView();
const filter = new FilterView();

const eventModel = new EventModel();
eventModel.data = eventDataList;

const infoPresentor = new InfoPresenter(tripMainElement, eventModel);
infoPresentor.init();

const contentPresentor = new ContentPresenter(contentContainer, eventModel);
contentPresentor.init();

render(menu, navigationElement, Position.AFTER_BEGIN);
render(filter, filterContainer, Position.AFTER_BEGIN);

