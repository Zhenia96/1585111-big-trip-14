import { getEventEditorTemplate } from './view/event-editor/event-editor.js';
import { getEventListTemplate } from './view/event-list/event-list.js';
import { getEventContainerTemplate } from './view/event-list/event-container.js';
import { getPointTemplate } from './view/point.js';
import { getFilterTemplate } from './view/filter.js';
import { getMenuTemplate } from './view/menu.js';
import { getSortFormTemplate } from './view/sort-form.js';
import { getTripInfoTemplate } from './view/trip-info.js';
import { generateEventData, generateEventDataList } from './mock/event.js';

const tripMainElement = document.querySelector('.trip-main');
const navigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
const eventsContainerElement = document.querySelector('.trip-events');

const pasteComponent = (component, container, position = 'beforeend') => {
  container.insertAdjacentHTML(position, component);
};

const addEvent = (content) => {
  const eventList = eventsContainerElement.querySelector('.trip-events__list');
  const eventItem = getEventContainerTemplate(content);
  pasteComponent(eventItem, eventList);
};

const addPoints = (eventDataList) => {
  const eventList = eventsContainerElement.querySelector('.trip-events__list');
  let eventsFtagment = '';
  eventDataList.forEach((eventData) => {
    const eventItem = getEventContainerTemplate(getPointTemplate(eventData));
    eventsFtagment += eventItem;
  });
  pasteComponent(eventsFtagment, eventList);
};

pasteComponent(getTripInfoTemplate(), tripMainElement, 'afterbegin');
pasteComponent(getMenuTemplate(), navigationElement);
pasteComponent(getFilterTemplate(), filterElement);
pasteComponent(getSortFormTemplate(), eventsContainerElement, 'afterbegin');
pasteComponent(getEventListTemplate(), eventsContainerElement);
addEvent(getEventEditorTemplate(generateEventData()));
addPoints(generateEventDataList(20));
