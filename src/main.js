import { getEventEditor } from './view/event-editor/event-editor.js';
import { getOffer } from './view/event-editor/offer.js';
import { getEventList } from './view/event-list/event-list.js';
import { getEventItem } from './view/event-list/event-item.js';
import { getEvent } from './view/event.js';
import { getFilter } from './view/filter.js';
import { getMenu } from './view/menu.js';
import { getSortForm } from './view/sort-form.js';
import { getTripInfo } from './view/trip-info.js';

const tripMainElement = document.querySelector('.trip-main');
const navigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
const eventsContainerElement = document.querySelector('.trip-events');

const pasteComponent = (component, container, position = 'beforeend') => {
  container.insertAdjacentHTML(position, component);
};

const addOffer = () => {
  const offersContainer = eventsContainerElement.querySelector('.event__available-offers');
  pasteComponent(getOffer(), offersContainer);
};

const addEvent = (content) => {
  const eventList = eventsContainerElement.querySelector('.trip-events__list');
  const eventItem = getEventItem(content);
  pasteComponent(eventItem, eventList);
};

pasteComponent(getTripInfo(), tripMainElement, 'afterbegin');
pasteComponent(getMenu(), navigationElement);
pasteComponent(getFilter(), filterElement);
pasteComponent(getSortForm(), eventsContainerElement, 'afterbegin');
pasteComponent(getEventList(), eventsContainerElement);
addEvent(getEventEditor(true, true));
addOffer();
addEvent(getEvent());
addEvent(getEvent());
addEvent(getEvent());
