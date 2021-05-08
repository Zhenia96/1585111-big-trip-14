import SortFormView from '../view/sort-form.js';
import EventListView from '../view/event-list/event-list.js';
import EmptyEventListMessageView from '../view/empty-event-list-message.js';
import EventPresentor from './event.js';
import { render } from '../utils/component.js';
import { sortData } from '../utils/common.js';
import { SortMode, ESCAPE_BUTTON, EventName } from '../constant.js';

export default class Content {
  constructor(container, eventModel) {
    this._eventModel = eventModel;

    this._container = container;
    this._sortForm = new SortFormView();
    this._eventList = new EventListView();
    this._emptyEventListMessage = new EmptyEventListMessageView();

    this._sortFormClickCallback = this._sortFormClickCallback.bind(this);
    this._closeAllEditors = this._closeAllEditors.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._changeData = this._changeData.bind(this);

    this._sortForm.setClickHandler(this._sortFormClickCallback);
    this._setEscKeydownHandler();

    this._currentSortMode = null;
    this._eventPresentor = {};
  }

  init(sortMode = SortMode.DATE) {
    if (this._eventModel.data.length === 0) {
      this._renderEmptyEventListMessage();
      return;
    }

    if (this._currentSortMode !== sortMode) {
      this._sort(sortMode);
    }


    this._renderSortForm();
    this._renderAllEvents();
    this._renderEventList();
  }

  _changeData(updatedData) {
    this._eventModel.update(updatedData);
    this._eventPresentor[updatedData.id].init(updatedData);
  }

  _sort(mode) {

    sortData(this._eventModel.data, mode);

    this._currentSortMode = mode;
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
        presentor.eventEditor.reset(presentor.eventData);
        presentor.replaceFromEditorToPoint();
      }
    });
  }

  _escKeydownHandler(evt) {
    if (evt.code === ESCAPE_BUTTON) {
      this._closeAllEditors();
    }
  }

  _setEscKeydownHandler() {
    document.addEventListener(EventName.KEYDOWN, this._escKeydownHandler);
  }

  _removeEscKeydownHandler() {
    document.removeEventListener(EventName.KEYDOWN, this._escKeydownHandler);
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
    const event = new EventPresentor(this._eventList, this._closeAllEditors, this._changeData);
    event.init(data);
    this._eventPresentor[data.id] = event;
  }

  _renderAllEvents() {
    this._eventModel.data.forEach((eventData) => {
      this._renderEvent(eventData);
    });
  }

  _removeAllEvents() {
    Object.values(this._eventPresentor).forEach((currentPresentor) => {
      currentPresentor.remove();
    });
    this._eventPresentor = {};
  }
}
