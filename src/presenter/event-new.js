import { ActionType, EditorMode, UpdateType, Position } from '../constant.js';
import EventItemView from '../view/event-list/event-item.js';
import EventEditorView from '../view/event-editor/event-editor.js';
import { render, remove } from '../utils/component.js';
import { getOffers, getDescription, generateTimeData } from '../utils/common.js';
import { lockApplication, unlockApplication } from '../utils/lock-application.js';

const DEFAULT_TYPE = 'Taxi';
const DEFAULT_DESTINATION = 'Amsterdam';
const DEFAULT_PRICE = 500;

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


    this._submitCallback = this._submitCallback.bind(this);
    this._cancelClickCallback = this._cancelClickCallback.bind(this);
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

    this._eventEditor.setSubmitHandler(this._submitCallback);
    this._eventEditor.setCancelClickHandler(this._cancelClickCallback);

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

  _getDefaultData() {
    return {
      type: DEFAULT_TYPE,
      destination: DEFAULT_DESTINATION,
      time: generateTimeData(),
      price: DEFAULT_PRICE,
      offers: getOffers(DEFAULT_TYPE, this._eventModel.offers),
      description: getDescription(DEFAULT_DESTINATION, this._eventModel.destinations),
      isFavorite: false,
    };
  }

  _cancelClickCallback() {
    this.remove();
    this._handleEventEditorCancel();
  }

  _submitCallback(addedData) {
    this._eventEditor.setSaveButtonState(true);
    lockApplication();
    this._handleUserAction(addedData, ActionType.ADD, UpdateType.MAJOR)
      .catch(() => {
        this._eventEditor.shake();
      })
      .finally(() => {
        this._eventEditor.setSaveButtonState(false);
        unlockApplication();
      });
  }
}
