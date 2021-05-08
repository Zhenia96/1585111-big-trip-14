import EventItemView from '../view/event-list/event-item.js';
import EventEditorView from '../view/event-editor/event-editor.js';
import PointView from '../view/point.js';
import { render, replace, remove } from '../utils/component.js';

const showMode = {
  POINT: 'point',
  EDITOR: 'editor',
};


export default class Event {
  constructor(container, closeAllEditors, changeData) {
    this._eventData = null;
    this._point = null;
    this._eventEditor = null;
    this._event = new EventItemView();
    this._container = container;
    this._closeAllEditors = closeAllEditors;
    this._changeData = changeData;


    this._currentShowMode = showMode.POINT;

    this._changeFavoriteStatus = this._changeFavoriteStatus.bind(this);
    this._eventEditorSubmitCallback = this._eventEditorSubmitCallback.bind(this);
    this._pointOpenEditorCallback = this._pointOpenEditorCallback.bind(this);
    this._eventEditorCloseCallback = this._eventEditorCloseCallback.bind(this);

    render(this._event, this._container);
  }

  init(eventData) {
    this._eventData = eventData;

    const prevPoint = this._point;
    const prevEventEditor = this._eventEditor;

    this._point = new PointView(this._eventData);
    this._eventEditor = new EventEditorView(this._eventData);

    this._point.setFavoriteButtonClickHandler(this._changeFavoriteStatus);
    this._point.setOpenEditorButtonClickHandler(this._pointOpenEditorCallback);
    this._eventEditor.setCloseClickHandler(this._eventEditorCloseCallback);
    this._eventEditor.setSubmitHandler(this._eventEditorSubmitCallback);

    if (prevPoint === null) {
      render(this._point, this._event);
      return;
    }

    if (this._currentShowMode === showMode.POINT) {
      replace(this._point, prevPoint);
    }

    if (this._currentShowMode === showMode.EDITOR) {
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
    remove(this._event);
  }

  _eventEditorSubmitCallback(updateData) {
    this._changeData(updateData);
    this.replaceFromEditorToPoint();
  }

  _eventEditorCloseCallback() {
    this._eventEditor.reset(this._eventData);
    this.replaceFromEditorToPoint();
  }

  _pointOpenEditorCallback() {
    this._closeAllEditors();
    this._replaceFromPointToEditor();
  }

  _replaceFromPointToEditor() {
    replace(this._eventEditor, this._point);
    this._currentShowMode = showMode.EDITOR;
  }

  _changeFavoriteStatus() {
    this._changeData(Object.assign({},
      this._eventData,
      { isFavorite: !this._eventData.isFavorite }));
  }

  replaceFromEditorToPoint() {
    replace(this._point, this._eventEditor);
    this._currentShowMode = showMode.POINT;
  }
}
