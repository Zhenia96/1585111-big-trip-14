import { ActionType, EditorMode, UpdateType, ErrorMessage, ShowMode } from '../constant.js';
import EventItemView from '../view/event-list/event-item.js';
import EventEditorView from '../view/event-editor/event-editor.js';
import PointView from '../view/point.js';
import { render, replace, remove } from '../utils/component.js';
import { addAvailableOffers, getOffers, isOnline } from '../utils/common.js';
import { lockApplicationt, unlockApplicationt } from '../utils/lock-application.js';
import { toast } from '../utils/toast.js';

export default class Event {
  constructor(container, closeAllEditors, handleUserAction, eventModel) {
    this._eventModel = eventModel;
    this._eventData = null;
    this._point = null;
    this._eventEditor = null;
    this._event = new EventItemView();
    this._container = container;
    this._closeAllEditors = closeAllEditors;
    this._handleUserAction = handleUserAction;
    this._currentShowMode = ShowMode.POINT;

    this._changeFavoriteStatus = this._changeFavoriteStatus.bind(this);
    this._eventEditorSubmitCallback = this._eventEditorSubmitCallback.bind(this);
    this._pointOpenEditorCallback = this._pointOpenEditorCallback.bind(this);
    this._eventEditorCloseCallback = this._eventEditorCloseCallback.bind(this);
    this._eventEditorDeleteCallback = this._eventEditorDeleteCallback.bind(this);

    render(this._event, this._container);
  }

  init(eventData) {
    this._eventData = eventData;
    this._eventData.offers = addAvailableOffers(this._eventData.offers, getOffers(this._eventData.type, this._eventModel.offers));

    const prevPoint = this._point;
    const prevEventEditor = this._eventEditor;

    this._point = new PointView(this._eventData);
    this._point.setFavoriteButtonClickHandler(this._changeFavoriteStatus);
    this._point.setOpenButtonClickHandler(this._pointOpenEditorCallback);

    this._eventEditor = new EventEditorView(
      this._eventData,
      EditorMode.EDITOR,
      this._eventModel.availableDestintionNames,
      this._eventModel.destinations,
      this._eventModel.offers,
    );
    this._eventEditor.setCloseClickHandler(this._eventEditorCloseCallback);
    this._eventEditor.setSubmitHandler(this._eventEditorSubmitCallback);
    this._eventEditor.setDeleteClickHandler(this._eventEditorDeleteCallback);


    if (prevPoint === null) {
      render(this._point, this._event);
      return;
    }

    if (this._currentShowMode === ShowMode.POINT) {
      replace(this._point, prevPoint);
    }

    if (this._currentShowMode === ShowMode.EDITOR) {
      replace(this._eventEditor, prevEventEditor);
    }
  }

  get eventData() {
    return this._eventData;
  }

  get event() {
    return this._event;
  }

  get eventEditor() {
    return this._eventEditor;
  }

  remove() {
    if (this._eventEditor !== null) {
      this._eventEditor.removeStartTimeDatepicker();
      this._eventEditor.removeEndTimeDatepicker();
    }

    remove(this._event);
  }

  replaceFromEditorToPoint() {
    replace(this._point, this._eventEditor);
    this._currentShowMode = ShowMode.POINT;
  }

  _replaceFromPointToEditor() {
    replace(this._eventEditor, this._point);
    this._currentShowMode = ShowMode.EDITOR;
  }

  _changeFavoriteStatus() {
    lockApplicationt();
    this._handleUserAction(Object.assign({},
      this._eventData,
      { isFavorite: !this._eventData.isFavorite }), ActionType.UPDATE, UpdateType.MINOR)
      .finally(() => {
        unlockApplicationt();
      });
  }

  _eventEditorSubmitCallback(updateData) {
    if (!isOnline()) {
      toast(ErrorMessage.NO_INTERNET);
      this._eventEditor.shake();
      return;
    }

    this._eventEditor.setSaveButtonState(true);
    lockApplicationt();
    this._handleUserAction(updateData, ActionType.UPDATE, UpdateType.MAJOR_WITHOUT_SORT_RESET)
      .then(() => {
        this.replaceFromEditorToPoint();
      })
      .catch(() => {
        this._eventEditor.shake();
      })
      .finally(() => {
        this._eventEditor.setSaveButtonState(false);
        unlockApplicationt();
      });
  }

  _eventEditorCloseCallback() {
    this._eventEditor.reset(this._eventData);
    this.replaceFromEditorToPoint();
  }

  _eventEditorDeleteCallback(deletedData) {
    if (!isOnline()) {
      toast(ErrorMessage.NO_INTERNET);
      this._eventEditor.shake();
      return;
    }

    this._eventEditor.setDeleteButtonState(true);
    lockApplicationt();
    this._handleUserAction(deletedData, ActionType.DELETE, UpdateType.MAJOR_WITHOUT_SORT_RESET)
      .catch(() => {
        this._eventEditor.shake();
      })
      .finally(() => {
        this._eventEditor.setDeleteButtonState(false);
        unlockApplicationt();
      });
  }

  _pointOpenEditorCallback() {
    if (!isOnline()) {
      toast(ErrorMessage.NO_INTERNET);
      this._point.shake();
      return;
    }

    this._closeAllEditors();
    this._replaceFromPointToEditor();
  }
}
