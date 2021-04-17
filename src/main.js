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
import { render } from './util.js';
import { Position, EventName, ESCAPE_BUTTON, ElementClass } from './constant.js';

const tripMainElement = document.querySelector(ElementClass.TRIP_MAIN);
const navigationElement = tripMainElement.querySelector(ElementClass.NAVIGATION);
const filterContainer = tripMainElement.querySelector(ElementClass.FILTER);
const contentContainer = document.querySelector(ElementClass.CONTENT);
const eventDataList = generateEventDataList(20);

const emptyEventListMessage = new EmptyEventListMessageView();
const tripInfo = new TripInfoView(eventDataList);
const menu = new MenuView();
const filter = new FilterView();
const sortForm = new SortFormView();

const renderEventListEmpty = () => {
  const eventListEmptyElement = emptyEventListMessage.getElement();
  render(eventListEmptyElement, contentContainer, Position.BEFORE_END);
};

const renderTripInfo = () => {
  const tripInfoElement = tripInfo.getElement();
  render(tripInfoElement, tripMainElement, Position.AFTER_BEGIN);
};

const renderMenu = () => {
  const menuElement = menu.getElement();
  render(menuElement, navigationElement, Position.AFTER_BEGIN);
};

const renderFilter = () => {
  const filterElement = filter.getElement();
  render(filterElement, filterContainer, Position.AFTER_BEGIN);
};

const renderSortForm = () => {
  const sortFormElement = sortForm.getElement();
  render(sortFormElement, contentContainer, Position.AFTER_BEGIN);
};

const addPointButtonClickHandler = (eventItemElement, pointElement, eventEditorElement) => {
  const openEventEditorButton = pointElement.querySelector(ElementClass.OPEN_EVENT_EDITOR_BUTTON);
  openEventEditorButton.addEventListener(EventName.CLICK, () => {
    eventItemElement.replaceChild(eventEditorElement, pointElement);
  });
};

const addEventEditorSaveButtonSubmitHandler = (eventItemElement, pointElement, eventEditorElement) => {
  const saveButton = eventEditorElement.querySelector(ElementClass.SAVE_CHANGES_BUTTON);
  saveButton.addEventListener(EventName.SUBMIT, () => {

    // ...Что-то добавиться в будущем :))))))

    eventItemElement.replaceChild(pointElement, eventEditorElement);
  });
};

const addEventEditorKeydownHandler = (eventItemElement, pointElement, eventEditorElement) => {
  document.addEventListener(EventName.KEYDOWN, (evt) => {
    if (evt.code === ESCAPE_BUTTON && eventItemElement.querySelector(ElementClass.EVENT_EDITOR)) {
      eventItemElement.replaceChild(pointElement, eventEditorElement);
    }
  });
};

const addEventEditorCloseButtonClickHandler = (eventItemElement, pointElement, eventEditorElement) => {
  const closeButton = eventEditorElement.querySelector(ElementClass.CLOSE_EVENT_EDITOR_BUTTON);
  closeButton.addEventListener(EventName.CLICK, () => {
    eventItemElement.replaceChild(pointElement, eventEditorElement);
  });
};

const addAllEventEditorHandlers = (eventItemElement, pointElement, eventEditorElement) => {
  addEventEditorSaveButtonSubmitHandler(eventItemElement, pointElement, eventEditorElement);
  addEventEditorKeydownHandler(eventItemElement, pointElement, eventEditorElement);
  addEventEditorCloseButtonClickHandler(eventItemElement, pointElement, eventEditorElement);
};

const renderPoint = (data) => {
  const eventList = contentContainer.querySelector(ElementClass.EVENT_LIST);
  const eventItem = new EventItemView();
  const eventItemElement = eventItem.getElement();
  const point = new PointView(data);
  const pointElement = point.getElement();
  const eventEditor = new EventEditorView(data);
  const eventEditorElement = eventEditor.getElement();
  addPointButtonClickHandler(eventItemElement, pointElement, eventEditorElement);
  addAllEventEditorHandlers(eventItemElement, pointElement, eventEditorElement);
  render(pointElement, eventItemElement, Position.AFTER_BEGIN);

  if (!eventList) {
    const eventList = new EventListView();
    const eventListElement = eventList.getElement();
    contentContainer.removeChild(emptyEventListMessage.getElement());
    render(eventItemElement, eventListElement, Position.AFTER_BEGIN);
    render(eventListElement, contentContainer, Position.BEFORE_END);
  } else {
    render(eventItemElement, eventList, Position.AFTER_BEGIN);
  }
};

const renderAllPoints = (dataList) => {
  dataList.forEach((data) => {
    renderPoint(data);
  });
};

renderEventListEmpty();
renderTripInfo();
renderMenu();
renderFilter();
renderSortForm();
renderAllPoints(eventDataList);
