import EventItemView from '../view/event-list/event-item.js';
import EventEditorView from '../view/event-editor/event-editor.js';
import { render, remove } from '../utils/component.js';
import { ActionType, EditorMode, UpdateType, Position } from '../constant.js';

import { generateEventDataList } from '../mock/event.js';

const dataTemplate = generateEventDataList(1)[0];

export default class EventNew {
  constructor(handleUserAction) {
    this._eventData = null;
    this._eventEditor = null;
    this._event = new EventItemView();
    this._container = null;
    this._handleUserAction = handleUserAction;


    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
  }

  init(container) {
    this._eventData = dataTemplate;
    this._container = container;

    this._eventEditor = new EventEditorView(this._eventData, EditorMode.CREATOR);

    this._eventEditor.setSubmitHandler(this._handleSubmit);
    this._eventEditor.setCancelClickHandler(this._handleCancelClick);

    render(this._eventEditor, this._event);
    render(this._event, this._container, Position.AFTER_BEGIN);
  }

  remove() {
    remove(this._event);
  }

  _handleCancelClick() {
    this.remove();
  }

  _handleSubmit(addedData) {
    this._handleUserAction(addedData, ActionType.ADD, UpdateType.MAJOR);
  }
}
