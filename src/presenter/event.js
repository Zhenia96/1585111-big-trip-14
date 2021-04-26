import EventItemView from '../view/event-list/event-item.js';
import EventEditorView from '../view/event-editor/event-editor.js';
import PointView from '../view/point.js';
import { render, replace } from '../utils/component.js';


export default class Event {
  constructor(container, closeAllEditors) {
    this._eventData = null;
    this._event = null;
    this._point = null;
    this._eventEditor = null;
    this._container = container;
    this._closeAllEditors = closeAllEditors;
  }

  init(eventData) {

    if (this._eventData !== eventData) {
      this._eventData = eventData;
      this._point = new PointView(this._eventData);
      this._eventEditor = new EventEditorView(this._eventData);

      this._changeFavoriteStatus = this._changeFavoriteStatus.bind(this);
      this._eventKeydownCallback = this._eventKeydownCallback.bind(this);
      this._eventEditorSubmitCallback = this._eventEditorSubmitCallback.bind(this);
      this._pointOpenEditorCallback = this._pointOpenEditorCallback.bind(this);
      this._eventEditorCloseCallback = this._eventEditorCloseCallback.bind(this);

      this._point.setFavoriteButtonClickHandler(this._changeFavoriteStatus);
      this._point.setOpenEditorButtonClickHandler(this._pointOpenEditorCallback);
      this._eventEditor.setClickHandler(this._eventEditorCloseCallback);
      this._eventEditor.setSubmitHandler(this._eventEditorSubmitCallback);

      this._event = new EventItemView();
      this._event.setKeydownHandler(this._eventKeydownCallback);

      render(this._point, this._event);
      render(this._event, this._container);
    }
  }

  get event() {
    return this._event;
  }

  get eventEditor() {
    return this._eventEditor;
  }

  _eventKeydownCallback() {
    this.replaceFromEditorToPoint();
  }

  _eventEditorSubmitCallback() {
    this.replaceFromEditorToPoint();
  }

  _eventEditorCloseCallback() {
    this.replaceFromEditorToPoint();
  }

  _pointOpenEditorCallback() {
    this._closeAllEditors();
    this._replaceFromPointToEditor();
  }

  _replaceFromPointToEditor() {
    replace(this._eventEditor, this._point);
  }

  _changeFavoriteStatus() {
    this._eventData.isFavorite = !this._eventData.isFavorite;
    this.init(this._eventData);
  }

  replaceFromEditorToPoint() {
    replace(this._point, this._eventEditor);
  }
}
