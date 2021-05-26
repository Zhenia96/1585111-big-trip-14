import SortFormView from '../view/sort-form.js';
import TourView from '../view/tour.js';
import LoadingView from '../view/loading.js';
import EventListView from '../view/event-list/event-list.js';
import EmptyEventListMessageView from '../view/empty-event-list-message.js';
import EventPresentor from './event.js';
import EventNewPresentor from './eventNew.js';
import { remove, render } from '../utils/component.js';
import { adaptPointToClient } from '../utils/adapter.js';
import { sortData, isOnline } from '../utils/common.js';
import { toast } from '../utils/toast.js';
import { SortMode, ServerPath, ESCAPE_BUTTON, EventName, FiltersName, ActionType, UpdateType, CssClassName, ErrorMessage, StoreKey } from '../constant.js';

export default class Tour {
  constructor(container, eventModel, filterModel, api) {
    this._container = container;
    this._addEventButton = document.querySelector(CssClassName.ADD_EVENT_BUTTON);

    this._eventModel = eventModel;
    this._filterModel = filterModel;
    this._data = null;
    this._currentSortMode = null;
    this._eventPresentor = {};
    this._api = api;

    this._handleSortFormClick = this._handleSortFormClick.bind(this);
    this.closeAllEditors = this.closeAllEditors.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._handleUserAction = this._handleUserAction.bind(this);
    this._addEventClickHandler = this._addEventClickHandler.bind(this);
    this._updateView = this._updateView.bind(this);
    this.destroy = this.destroy.bind(this);
    this._handleEventEditorCancel = this._handleEventEditorCancel.bind(this);

    this._tour = new TourView();
    this._sortForm = new SortFormView();
    this._eventList = new EventListView();
    this._emptyEventListMessage = new EmptyEventListMessageView();
    this._loading = new LoadingView();
    this._eventNewPresentor = new EventNewPresentor(this._handleUserAction, this._addEventButton, this._handleEventEditorCancel, this._eventModel);

    this._renderLoading();
    render(this._tour, this._container);
  }

  init(sortMode = SortMode.DATE) {
    this._removeLoading();
    this._addEventButton.disabled = false;
    this._currentSortMode = sortMode;
    this._sortForm.changeSortMode(this._currentSortMode);
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

    if (updateType === UpdateType.MAJOR_WITHOUT_SORT_RESET) {
      this.init(this._currentSortMode);
    }
  }

  get tour() {
    return this._tour;
  }

  get currentSortMode() {
    return this._currentSortMode;
  }

  _getData() {
    let data;

    switch (this._filterModel.currentFilter) {
      case FiltersName.FUTURE:
        data = this._eventModel.futureData;
        break;
      case FiltersName.PAST:
        data = this._eventModel.pastData;
        break;
      default:
        data = this._eventModel.data;
    }

    return sortData(data, this._currentSortMode);
  }

  _handleUserAction(changedData, actionType, updateType) {

    switch (actionType) {
      case ActionType.ADD:
        return this._api.addData(ServerPath.POINTS, changedData)
          .then((response) => {
            this._eventModel.add(adaptPointToClient(response), updateType);
          });

      case ActionType.DELETE:
        return this._api.deleteData(`${ServerPath.POINTS}/${changedData.id}`)
          .then(() => {
            this._eventModel.delete(changedData, updateType);
          });

      case ActionType.UPDATE:
        return this._api.updateData(`${ServerPath.POINTS}/${changedData.id}`, changedData, StoreKey.POINTS)
          .then((response) => {
            this._eventModel.update(adaptPointToClient(response), updateType);
          });
    }
  }

  _handleEventEditorCancel() {
    if (this._data.length === 0) {
      this._renderEmptyEventListMessage();
    }
  }

  _sort(mode) {
    this._data = sortData(this._data, mode);
    this._currentSortMode = mode;
  }

  _handleSortFormClick(sortMode) {
    if (this._currentSortMode !== sortMode) {
      this._sort(sortMode);
      this.init(this._currentSortMode);
    }
  }

  _escKeydownHandler(evt) {
    if (evt.code === ESCAPE_BUTTON) {
      this.closeAllEditors();
      if (this._data.length === 0) {
        this._renderEmptyEventListMessage();
      }
    }
  }

  _setEscKeydownHandler() {
    document.addEventListener(EventName.KEYDOWN, this._escKeydownHandler);
  }

  _removeEscKeydownHandler() {
    document.removeEventListener(EventName.KEYDOWN, this._escKeydownHandler);
  }

  _addEventClickHandler() {
    if (!isOnline()) {
      toast(ErrorMessage.NO_INTERNET);
      return;
    }
    this.closeAllEditors();
    this._filterModel.currentFilter = FiltersName.EVERYTHING;
    if (this._data.length === 0) {
      remove(this._emptyEventListMessage);
      this._renderEventList();
    }
    this._eventNewPresentor.init(this._eventList);
  }

  _setAddEventClickHandler() {
    this._addEventButton.addEventListener(EventName.CLICK, this._addEventClickHandler);
  }

  _removeAddEventClickHandler() {
    document.removeEventListener(EventName.CLICK, this._addEventClickHandler);
  }

  _renderLoading() {
    render(this._loading, this._tour);
  }

  _removeLoading() {
    remove(this._loading);
  }

  _renderSortForm() {
    render(this._sortForm, this._tour);
  }

  _renderEventList() {
    render(this._eventList, this._tour);
  }

  _renderEmptyEventListMessage() {
    render(this._emptyEventListMessage, this._tour);
  }

  _renderEvent(data) {
    const event = new EventPresentor(this._eventList, this.closeAllEditors, this._handleUserAction, this._eventModel);
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

  closeAllEditors() {
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
