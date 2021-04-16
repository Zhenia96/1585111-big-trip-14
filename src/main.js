import EventEditorView from './view/event-editor/event-editor.js';
import EventListView from './view/event-list/event-list.js';
import EventItemView from './view/event-list/event-container.js';
import PointView from './view/point.js';
import FilterView from './view/filter.js';
import MenuView from './view/menu.js';
import SortFormView from './view/sort-form.js';
import TripInfoView from './view/trip-info.js';
import { generateEventDataList } from './mock/event.js';
import { render } from './util.js';

const tripMainElement = document.querySelector('.trip-main');
const navigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const filterContainer = tripMainElement.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');
const eventDataList = generateEventDataList(20);

const renderTripInfo = () => {
  const tripInfo = new TripInfoView(eventDataList);
  const tripInfoElement = tripInfo.getElement();
  render(tripInfoElement, tripMainElement, 'afterbegin');
};

const renderMenu = () => {
  const menu = new MenuView();
  const menuElement = menu.getElement();
  render(menuElement, navigationElement, 'afterbegin');
};

const renderFilter = () => {
  const filter = new FilterView();
  const filterElement = filter.getElement();
  render(filterElement, filterContainer, 'afterbegin');
};

const renderSortForm = () => {
  const sortForm = new SortFormView();
  const sortFormElement = sortForm.getElement();
  render(sortFormElement, contentContainer, 'afterbegin');
};

const addPointButtonClickHandler = (eventItemElement, pointElement, eventEditorElement) => {
  const eventButton = pointElement.querySelector('.event__rollup-btn');
  eventButton.addEventListener('click', () => {
    eventItemElement.replaceChild(eventEditorElement, pointElement);
  });
};

const addEventEditorSaveButtonSubmitHandler = (eventItemElement, pointElement, eventEditorElement) => {
  const saveButton = eventEditorElement.querySelector('.event__save-btn');
  saveButton.addEventListener('Submit', () => {

    // ...Что-то добавиться в будущем :))))))

    eventItemElement.replaceChild(pointElement, eventEditorElement);
  });
};

const addEventEditorKeydownHandler = (eventItemElement, pointElement, eventEditorElement) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      eventItemElement.replaceChild(pointElement, eventEditorElement);
    }
  });
};

const addEventEditorCloseButtonClickHandler = (eventItemElement, pointElement, eventEditorElement) => {
  const closeButton = eventEditorElement.querySelector('.event__reset-btn');
  closeButton.addEventListener('click', () => {
    eventItemElement.replaceChild(pointElement, eventEditorElement);
  });
};

const addAllEventEditorHandlers = (eventItemElement, pointElement, eventEditorElement) => {
  addEventEditorSaveButtonSubmitHandler(eventItemElement, pointElement, eventEditorElement);
  addEventEditorKeydownHandler(eventItemElement, pointElement, eventEditorElement);
  addEventEditorCloseButtonClickHandler(eventItemElement, pointElement, eventEditorElement);
};


const renderPoint = (data) => {
  const eventList = contentContainer.querySelector('.trip-events__list');
  const eventItem = new EventItemView();
  const eventItemElement = eventItem.getElement();
  const point = new PointView(data);
  const pointElement = point.getElement();
  const eventEditor = new EventEditorView(data);
  const eventEditorElement = eventEditor.getElement();
  addPointButtonClickHandler(eventItemElement, pointElement, eventEditorElement);
  addAllEventEditorHandlers(eventItemElement, pointElement, eventEditorElement);
  render(pointElement, eventItemElement, 'afterbegin');

  if (!eventList) {
    const eventList = new EventListView();
    const eventListElement = eventList.getElement();
    render(eventItemElement, eventListElement, 'afterbegin');
    render(eventListElement, contentContainer, 'beforeend');
  } else {
    render(eventItemElement, eventList, 'afterbegin');
  }
};

const renderAllPoints = (dataList) => {
  dataList.forEach((data) => {
    renderPoint(data);
  });
};

renderTripInfo();
renderMenu();
renderFilter();
renderSortForm();
renderAllPoints(eventDataList);
