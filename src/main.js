import EventEditorView from './view/event-editor/event-editor.js';
import EventListView from './view/event-list/event-list.js';
import EventItemView from './view/event-list/event-container.js';
import PointView from './view/point.js';
import FilterView from './view/filter.js';
import MenuView from './view/menu.js';
import SortFormView from './view/sort-form.js';
import TripInfoView from './view/trip-info.js';
import EmptyEventListMessageView from './view/empty-event-list-message.js';
import { generateEventDataList } from './mock/event.js';
import { remove, render, replace } from './utils/component.js';
import { Position, CssClass } from './constant.js';

const tripMainElement = document.querySelector(CssClass.TRIP_MAIN);
const navigationElement = tripMainElement.querySelector(CssClass.NAVIGATION);
const filterContainer = tripMainElement.querySelector(CssClass.FILTER);
const contentContainer = document.querySelector(CssClass.CONTENT);
const eventDataList = generateEventDataList(20);

const emptyEventListMessage = new EmptyEventListMessageView();
const tripInfo = new TripInfoView(eventDataList);
const menu = new MenuView();
const filter = new FilterView();
const sortForm = new SortFormView();

const renderEvent = (data) => {
  const eventList = contentContainer.querySelector(CssClass.EVENT_LIST);
  const eventItem = new EventItemView();
  const point = new PointView(data);
  const eventEditor = new EventEditorView(data);

  point.setClickHandler(() => {
    replace(eventEditor, point);
  });

  eventEditor.setClickHandler(() => {
    replace(point, eventEditor);
  });

  eventEditor.setSubmitHandler(() => {
    // ...Что-то добавиться в будущем :))))))
    replace(point, eventEditor);
  });

  eventItem.setKeydownHandler(() => {
    replace(point, eventEditor);
  });

  render(point, eventItem, Position.AFTER_BEGIN);

  if (!eventList) {
    const eventList = new EventListView();
    remove(emptyEventListMessage);
    render(eventItem, eventList, Position.AFTER_BEGIN);
    render(eventList, contentContainer, Position.BEFORE_END);
  } else {
    render(eventItem, eventList, Position.AFTER_BEGIN);
  }
};

const renderAllEvents = (dataList) => {
  dataList.forEach((data) => {
    renderEvent(data);
  });
};

render(emptyEventListMessage, contentContainer, Position.BEFORE_END);
render(tripInfo, tripMainElement, Position.AFTER_BEGIN);
render(menu, navigationElement, Position.AFTER_BEGIN);
render(filter, filterContainer, Position.AFTER_BEGIN);
render(sortForm, contentContainer, Position.AFTER_BEGIN);
renderAllEvents(eventDataList);
