import { getEventEditorTemplate } from './view/event-editor/event-editor.js';
import { getOfferTemplate } from './view/event-editor/offer.js';
import { getEventListTemplate } from './view/event-list/event-list.js';
import { getEventItemTemplate } from './view/event-list/event-item.js';
import { getEventTemplate } from './view/event.js';
import { getFilterTemplate } from './view/filter.js';
import { getMenuTemplate } from './view/menu.js';
import { getSortFormTemplate } from './view/sort-form.js';
import { getTripInfoTemplate } from './view/trip-info.js';

const tripMainElement = document.querySelector('.trip-main');
const navigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
const eventsContainerElement = document.querySelector('.trip-events');

const pasteComponent = (component, container, position = 'beforeend') => {
  container.insertAdjacentHTML(position, component);
};

const addOffer = () => {
  const offersContainer = eventsContainerElement.querySelector('.event__available-offers');
  pasteComponent(getOfferTemplate(), offersContainer);
};

const addEvent = (content) => {
  const eventList = eventsContainerElement.querySelector('.trip-events__list');
  const eventItem = getEventItemTemplate(content);
  pasteComponent(eventItem, eventList);
};

pasteComponent(getTripInfoTemplate(), tripMainElement, 'afterbegin');
pasteComponent(getMenuTemplate(), navigationElement);
pasteComponent(getFilterTemplate(), filterElement);
pasteComponent(getSortFormTemplate(), eventsContainerElement, 'afterbegin');
pasteComponent(getEventListTemplate(), eventsContainerElement);
addEvent(getEventEditorTemplate(true, true));
addOffer();
addEvent(getEventTemplate());
addEvent(getEventTemplate());
addEvent(getEventTemplate());
