import SortFormView from '../view/sort-form.js';
import EventListView from '../view/event-list/event-list.js';
import EmptyEventListMessageView from '../view/empty-event-list-message.js';
import EventPresentor from './event.js';
import { render } from '../utils/component.js';
import { SortMode } from '../constant.js';

export default class Itinerary {
  constructor(container) {
    this._eventDataList = null;

    this._container = container;
    this._sortForm = new SortFormView();
    this._eventList = new EventListView();
    this._emptyEventListMessage = new EmptyEventListMessageView();

    this._sortFormClickCallback = this._sortFormClickCallback.bind(this);
    this._sortForm.setClickHandler(this._sortFormClickCallback);

    this._currentSortMode = null;
    this._eventPresentor = {};
  }

  init(eventDataList, sortMode = SortMode.DATE) {
    if (eventDataList.length === 0) {
      this._renderEmptyEventListMessage();
      return;
    }

    this._eventDataList = eventDataList.slice();

    if (this._currentSortMode !== sortMode) {
      this._sort(sortMode);
    }

    this._closeAllEditors = this._closeAllEditors.bind(this);

    this._renderSortForm();
    this._renderAllEvents();
    this._renderEventList();
  }

  _sort(mode) {
    if (this._eventDataList !== null) {

      switch (mode) {

        case SortMode.DATE:
          this._eventDataList.sort((firstEventData, secondEventData) => {

            if (firstEventData.time.start.unix() < secondEventData.time.start.unix()) {
              return -1;
            }

            if (firstEventData.time.start.unix() > secondEventData.time.start.unix()) {
              return 1;
            }

            return 0;
          });
          break;

        case SortMode.PRICE:
          this._eventDataList.sort((firstEventData, secondEventData) => {

            if (firstEventData.price < secondEventData.price) {
              return -1;
            }

            if (firstEventData.price > secondEventData.price) {
              return 1;
            }

            return 0;
          });
          break;

        case SortMode.TIME:
          this._eventDataList.sort((firstEventData, secondEventData) => {
            const firstEventTime = firstEventData.time.end.unix() - firstEventData.time.start.unix();
            const secondEventTime = secondEventData.time.end.unix() - secondEventData.time.start.unix();

            if (firstEventTime < secondEventTime) {
              return -1;
            }

            if (firstEventTime > secondEventTime) {
              return 1;
            }

            return 0;
          });
          break;
      }

      this._currentSortMode = mode;
    }
  }

  _sortFormClickCallback(sortMode) {
    if (this._currentSortMode !== sortMode) {
      this._removeAllEvents();
      this._sort(sortMode);
      this._currentSortMode = sortMode;
      this._renderAllEvents();
    }
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

  _removeAllEvents() {
    Object.values(this._eventPresentor).forEach((currentPresentor) => {
      currentPresentor.remove();
    });
    this._eventPresentor = {};
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
