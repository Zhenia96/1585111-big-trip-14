import SortFormView from '../view/sort-form.js';
import EventListView from '../view/event-list/event-list.js';
import EmptyEventListMessageView from '../view/empty-event-list-message.js';
import EventPresentor from './event.js';
import { render } from '../utils/component.js';


export default class Itinerary {
  constructor(container) {
    this._eventDataList = null;
    this._container = container;
    this._sortForm = new SortFormView();
    this._eventList = new EventListView();
    this._emptyEventListMessage = new EmptyEventListMessageView();

    this._eventPresentor = {};
  }

  init(eventDataList) {
    if (eventDataList.length === 0) {
      this._renderEmptyEventListMessage();
      return;
    }
    this._eventDataList = eventDataList.slice();

    this._closeAllEditors = this._closeAllEditors.bind(this);
    this._renderSortForm();
    this._renderAllEvents();
    this._renderEventList();
  }

  _closeAllEditors() {
    Object.values(this._eventPresentor).forEach((presentor) => {
      const event = presentor.event.getElement();
      const editor = presentor.eventEditor.getElement();
      if (event.contains(editor)) {
        presentor.replaceFromEditorToPoint();
      }
    });
  }

  _renderSortForm() {
    render(this._sortForm, this._container);
  }

  _renderEventList() {
    render(this._eventList, this._container);
  }

  _renderEmptyEventListMessage() {
    render(this._emptyEventListMessage, this._container);
  }

  _renderEvent(data) {
    const event = new EventPresentor(this._eventList, this._closeAllEditors);
    event.init(data);
    this._eventPresentor[data.id] = event;
  }

  _renderAllEvents() {
    this._eventDataList.forEach((eventData) => {
      this._renderEvent(eventData);
    });
  }
}
