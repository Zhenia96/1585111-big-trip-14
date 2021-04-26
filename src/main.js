import FilterView from './view/filter.js';
import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import { generateEventDataList } from './mock/event.js';
import { Position, CssClassName } from './constant.js';
import { render } from './utils/component.js';
import Itinerary from './presenter/itinerary.js';

const tripMainElement = document.querySelector(CssClassName.TRIP_MAIN);
const navigationElement = tripMainElement.querySelector(CssClassName.NAVIGATION);
const filterContainer = tripMainElement.querySelector(CssClassName.FILTER);
const contentContainer = document.querySelector(CssClassName.CONTENT);
const eventDataList = generateEventDataList(20);

const tripInfo = new TripInfoView(eventDataList);
const menu = new MenuView();
const filter = new FilterView();

const itinerary = new Itinerary(contentContainer);
itinerary.init(eventDataList);

if (eventDataList.length > 0) {
  render(tripInfo, tripMainElement, Position.AFTER_BEGIN);
}

render(menu, navigationElement, Position.AFTER_BEGIN);
render(filter, filterContainer, Position.AFTER_BEGIN);

