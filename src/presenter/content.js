import SortFormView from '../view/sort-form.js';
import EventListView from '../view/event-list/event-list.js';
import EmptyEventListMessageView from '../view/empty-event-list-message.js';
import EventPresentor from './event.js';
import EventNewPresentor from './eventNew.js';
import { remove, render } from '../utils/component.js';
import { sortData } from '../utils/common.js';
import { SortMode, ESCAPE_BUTTON, EventName, FiltersName, ActionType, UpdateType, CssClassName } from '../constant.js';

export default class Content {
  constructor(container, eventModel, filterModel) {
    this._container = container;
    this._addEventButton = document.querySelector(CssClassName.ADD_EVENT_BUTTON);

    this._eventModel = eventModel;
    this._filterModel = filterModel;
    this._data = null;
    this._currentSortMode = null;
    this._eventPresentor = {};

    this._handleSortFormClick = this._handleSortFormClick.bind(this);
    this._closeAllEditors = this._closeAllEditors.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._handleUserAction = this._handleUserAction.bind(this);
    this._addEventClickHandler = this._addEventClickHandler.bind(this);
    this._updateView = this._updateView.bind(this);
    this.destroy = this.destroy.bind(this);

    this._sortForm = new SortFormView();
    this._eventList = new EventListView();
    this._emptyEventListMessage = new EmptyEventListMessageView();
    this._eventNewPresentor = new EventNewPresentor(this._handleUserAction);
  }

  init(sortMode = SortMode.DATE) {
    this._currentSortMode = sortMode;
    this._data = this._getData();
    this.destroy();

    this._setEscKeydownHandler();
    this._setAddEventClickHandler();

    this._filterModel.addObserver(this._updateView);
    this._eventModel.addObserver(this._updateView);

    this._sortForm.setClickHandler(this._handleSortFormClick);

    if (this._data.length === 0) {
      this._renderEmptyEventListMessage();
      return;
    }

    this._renderSortForm();
    this._renderAllEvents();
    this._renderEventList();
  }

  _updateView(data, updateType = UpdateType.MAJOR) {
    if (updateType === UpdateType.MINOR) {
      this._eventPresentor[data.id].init(data);
    }

    if (updateType === UpdateType.MAJOR) {
      this.init();
    }
  }

  _getData() {
    let data = this._eventModel.data;

    switch (this._filterModel.currentFilter) {
      case FiltersName.FUTURE:
        data = this._eventModel.futureData;
        break;
      case FiltersName.PAST:
        data = this._eventModel.pastData;
        break;
    }

    return sortData(data, this._currentSortMode);
  }

  _handleUserAction(changedData, actionType, updateType) {
    switch (actionType) {
      case ActionType.ADD:
        this._eventModel.add(changedData, updateType);
        break;
      case ActionType.DELETE:
        this._eventModel.delete(changedData, updateType);
        break;
      case ActionType.UPDATE:
        this._eventModel.update(changedData, updateType);
        break;
    }
  }

  _sort(mode) {
    this._data = sortData(this._data, mode);
    this._currentSortMode = mode;
  }

  _handleSortFormClick(sortMode) {
    if (this._currentSortMode !== sortMode) {
      this._removeAllEvents();
      this._sort(sortMode);
      this._currentSortMode = sortMode;
      this._renderAllEvents();
    }
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

  _addEventClickHandler() {
    this._closeAllEditors();
    this._filterModel.currentFilter = FiltersName.EVERYTHING;
    this._eventNewPresentor.init(this._eventList);
  }

  _setAddEventClickHandler() {
    this._addEventButton.addEventListener(EventName.CLICK, this._addEventClickHandler);
  }

  _removeAddEventClickHandler() {
    document.removeEventListener(EventName.CLICK, this._addEventClickHandler);
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
    const event = new EventPresentor(this._eventList, this._closeAllEditors, this._handleUserAction);
    event.init(data);
    this._eventPresentor[data.id] = event;
  }

  _renderAllEvents() {
    this._data.forEach((eventData) => {
      this._renderEvent(eventData);
    });
  }

  _removeAllEvents() {
    Object.values(this._eventPresentor).forEach((currentPresentor) => {
      currentPresentor.remove();
    });
    this._eventPresentor = {};
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
    this._eventNewPresentor.remove();
  }

  _clearContent() {
    this._removeAllEvents();
    remove(this._sortForm);
    remove(this._eventList);
    remove(this._emptyEventListMessage);
    this._eventPresentor = {};
  }

  destroy() {
    this._clearContent();
    this._filterModel.removeObserver(this._updateView);
    this._eventModel.removeObserver(this._updateView);
    this._removeEscKeydownHandler();
    this._removeAddEventClickHandler();
  }
}
