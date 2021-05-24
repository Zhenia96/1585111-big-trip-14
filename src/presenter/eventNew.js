import EventItemView from '../view/event-list/event-item.js';
import EventEditorView from '../view/event-editor/event-editor.js';
import { render, remove } from '../utils/component.js';
import { ActionType, EditorMode, UpdateType, Position } from '../constant.js';
import { getOffers, getDescription, generateTimeData } from '../utils/common.js';
import { lockApplicationt, unlockApplicationt } from '../utils/lock-application.js';

export default class EventNew {
  constructor(handleUserAction, addEventButton, handleEventEditorCancel, eventModel) {
    this._eventModel = eventModel;
    this._addEventButton = addEventButton;
    this._handleEventEditorCancel = handleEventEditorCancel;
    this._eventData = null;
    this._eventEditor = null;
    this._event = new EventItemView();
    this._container = null;
    this._handleUserAction = handleUserAction;


    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
  }

  init(container) {
    this._addEventButton.disabled = true;
    this._eventData = this._getDefaultData();
    this._container = container;

    this._eventEditor = new EventEditorView(
      this._eventData,
      EditorMode.CREATOR,
      this._eventModel.availableDestintionNames,
      this._eventModel.destinations,
      this._eventModel.offers,
    );

    this._eventEditor.setSubmitHandler(this._handleSubmit);
    this._eventEditor.setCancelClickHandler(this._handleCancelClick);

    render(this._eventEditor, this._event);
    render(this._event, this._container, Position.AFTER_BEGIN);
  }

  remove() {
    if (this._eventEditor !== null) {
      this._eventEditor.removeStartTimeDatepicker();
      this._eventEditor.removeEndTimeDatepicker();
    }
    remove(this._event);
    this._addEventButton.disabled = false;
  }

  _handleCancelClick() {
    this.remove();
    this._handleEventEditorCancel();
  }

  _handleSubmit(addedData) {
    this._eventEditor.setSaveButtonState(true);
    lockApplicationt();
    this._handleUserAction(addedData, ActionType.ADD, UpdateType.MAJOR)
      .catch(() => {
        this._eventEditor.shake();
      })
      .finally(() => {
        this._eventEditor.setSaveButtonState(false);
        unlockApplicationt();
      });
  }

  _getDefaultData() {
    return {
      type: 'Taxi',
      destination: 'Amsterdam',
      time: generateTimeData(),
      price: 500,
      offers: getOffers('Taxi', this._eventModel.offers),
      description: getDescription('Amsterdam', this._eventModel.destinations),
      isFavorite: false,
    };
  }
}
