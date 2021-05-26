import { DateFormat, typeIcon, PATH_TO_ICONS, EventName, CssClassName, EditorMode } from '../../constant';
import { formatDate, hasData, getOffers, getDescription, cloneObjects } from '../../utils/common.js';
import DetailsView from './details.js';
import SmartView from '../smart.js';
import flatpickr from 'flatpickr';
import { } from '../../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { FULL } = DateFormat;

const SaveButtonState = {
  SAVING: 'Saving...',
  DEFAULT: 'Save',
};

const DeleteButtonState = {
  DELETING: 'Deleting...',
  DEFAULT: 'Delete',
};

const TimeFieldName = {
  START: 'event-start-time',
  END: 'event-end-time',
};

const EditorButton = {
  CANCEL: '[data-type=cancel]',
  DELETE: '[data-type=delete]',
  SAVE: '[data-type=save]',
};

const typeStatus = {
  'taxi': '',
  'bus': '',
  'train': '',
  'ship': '',
  'transport': '',
  'drive': '',
  'flight': 'checked',
  'check-in': '',
  'sightseeng': '',
  'restaurant': '',
};

const getDestinationOptions = (destinations) => {
  let destinationOptions = '';

  if (destinations.length > 0) {
    destinations.forEach((destination) => {
      destinationOptions += `<option value="${destination}"></option>`;
    });
  }
  return destinationOptions;
};

const changeTypeStatus = (type) => {
  const allTypes = Object.keys(typeStatus);

  allTypes.forEach((type) => {
    typeStatus[type] = '';
  });
  typeStatus[type] = 'checked';
};

const getEventEditorTemplate = (data, mode, destinationOptions) => {
  const { type, destination, time, price, offers, description } = data;
  const { start, end } = time;
  const { title, pictures } = description;

  const detailsTemplate = hasData(offers) || hasData(title) || hasData(pictures) ?
    new DetailsView(data).getTemplate() :
    '';

  const cancelButton = mode === EditorMode.CREATOR ?
    '<button class="event__reset-btn" type="reset" data-type="cancel">Cancel</button>' :
    '';

  const closeButton = mode === EditorMode.EDITOR ?
    `<button class="event__rollup-btn" type="button">
       <span class="visually-hidden">Open event</span>
     </button>` :
    '';

  const deleteButton = mode === EditorMode.EDITOR ?
    '<button class="event__reset-btn" type="reset" data-type="delete">Delete</button>' :
    '';

  changeTypeStatus(type.toLowerCase());

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="${PATH_TO_ICONS}${typeIcon[type.toLowerCase()]}" alt="${type} icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Taxi" ${typeStatus['taxi']}>
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Bus" ${typeStatus['bus']}>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Train" ${typeStatus['train']}>
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Ship" ${typeStatus['ship']}>
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Transport" ${typeStatus['transport']}>
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Drive" ${typeStatus['drive']}>
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Flight" ${typeStatus['flight']}>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Check-in" ${typeStatus['check-in']}>
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Sightseeing" ${typeStatus['sightseeing']}>
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="Restaurant" ${typeStatus['restaurant']}>
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationOptions}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(start, FULL)}">
      &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(end, FULL)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
        &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" data-type="save">Save</button>
      ${cancelButton}
      ${deleteButton}
      ${closeButton}
    </header>
    ${detailsTemplate}
  </form>`;
};

export default class EventEditor extends SmartView {
  constructor(data, mode, availableDestintionNames, destinations, offers) {
    super();

    this._availableDestintionNames = availableDestintionNames;
    this._destinations = destinations;
    this._offers = offers;
    this._data = data;
    this._mode = mode;
    this._startTimeDatepicker = null;
    this._endTimeDatepicker = null;

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);
    this._handleDestinationChange = this._handleDestinationChange.bind(this);
    this._handleTimeChange = this._handleTimeChange.bind(this);
    this.removeStartTimeDatepicker = this.removeStartTimeDatepicker.bind(this);
    this.removeEndTimeDatepicker = this.removeEndTimeDatepicker.bind(this);

    this._setTypeChangeHandler();
    this._setDestinationChangeHandler();
    this._setStartTimeDatepicker();
    this._setEndTimeDatepicker();
    this._setTimeChangeHandler();
    this._setPriceInputHandler();
    this._setOffersClickHandler();

    if (this._mode === EditorMode.EDITOR) {
      this._handleCloseClickr = this._handleCloseClickr.bind(this);
      this._handleDeleteClick = this._handleDeleteClick.bind(this);
    }

    if (this._mode === EditorMode.CREATOR) {
      this._handleCancelClick = this._handleCancelClick.bind(this);
    }
  }

  getTemplate() {
    return getEventEditorTemplate(this._data, this._mode, getDestinationOptions(this._availableDestintionNames));
  }

  reset(data) {
    this._updateData(
      data,
    );
  }

  setSaveButtonState(isSaving) {
    const saveButton = this.getElement().querySelector(EditorButton.SAVE);

    saveButton.textContent = isSaving ? SaveButtonState.SAVING : SaveButtonState.DEFAULT;
  }

  setDeleteButtonState(isDeleting) {
    const deleteButton = this.getElement().querySelector(EditorButton.DELETE);

    deleteButton.textContent = isDeleting ? DeleteButtonState.DELETING : DeleteButtonState.DEFAULT;
  }

  setCancelClickHandler(callback = this._callback.cancel) {
    this._callback.cancel = callback;

    if (this._callback.cancel) {
      this.getElement().querySelector(EditorButton.CANCEL).addEventListener(EventName.CLICK, this._handleCancelClick);
    }
  }

  setSubmitHandler(callback = this._callback.submit) {
    this._callback.submit = callback;

    if (this._callback.submit) {
      this.getElement().addEventListener(EventName.SUBMIT, this._handleSubmit);
    }
  }

  setCloseClickHandler(callback = this._callback.close) {
    if (this._mode !== EditorMode.EDITOR) {
      return;
    }

    this._callback.close = callback;

    if (this._callback.close) {
      this.getElement().querySelector([CssClassName.EVENT_EDITOR_CLOSE_BUTTON]).addEventListener(EventName.CLICK, this._handleCloseClickr);
    }
  }

  setDeleteClickHandler(callback = this._callback.delete) {
    if (this._mode !== EditorMode.EDITOR) {
      return;
    }

    this._callback.delete = callback;

    if (this._callback.delete) {
      this.getElement().querySelector(EditorButton.DELETE).addEventListener(EventName.CLICK, this._handleDeleteClick);
    }
  }

  _setOffersClickHandler() {
    const offers = this.getElement().querySelector(CssClassName.AVAILABLE_OFFERS);

    if (offers) {
      this.getElement().querySelector(CssClassName.AVAILABLE_OFFERS).addEventListener(EventName.CLICK, (evt) => {

        if (evt.target.type === 'checkbox') {
          const updatedOffers = cloneObjects(this._data.offers);
          let targetedOffer = this._data.offers.find((offer) => evt.target.id === offer.id);
          targetedOffer = Object.assign({}, targetedOffer);
          targetedOffer.isChecked = !targetedOffer.isChecked;

          const targetedIndex = updatedOffers.findIndex((offer) => offer.id === targetedOffer.id);

          updatedOffers[targetedIndex] = targetedOffer;
          this._updateData(
            {
              offers: updatedOffers,
            }, false,
          );
        }
      });
    }
  }

  _setTimeChangeHandler() {
    this.getElement().querySelector(CssClassName.EVENT_EDITOR_TIME).addEventListener(EventName.CHANGE, this._handleTimeChange);
  }

  _setPriceInputHandler() {
    this.getElement().querySelector(CssClassName.EVENT_EDITOR_PRICE).addEventListener(EventName.INPUT, (evt) => {
      evt.target.value = evt.target.value.replace(/[^\d]/, '');
      this._updateData(
        {
          price: Number(evt.target.value),
        }, false,
      );
    });
  }

  _setDestinationChangeHandler() {
    this.getElement().querySelector(CssClassName.EVENT_EDITOR_DESTINATION_BUTTON).addEventListener(EventName.CHANGE, this._handleDestinationChange);
  }

  _setTypeChangeHandler() {
    this.getElement().querySelector(CssClassName.EVENT_EDITOR_TYPE_GROUP).addEventListener(EventName.CHANGE, this._handleTypeChange);
  }

  _setStartTimeDatepicker() {
    const startTimeField = this.getElement().querySelector(`[name=${TimeFieldName.START}]`);

    if (this._startTimeDatepicker !== null) {
      this.removeStartTimeDatepicker();
    }

    this._startTimeDatepicker = flatpickr(startTimeField, {
      dateFormat: DateFormat.CALENDAR_FULL,
      enableTime: true,
      minuteIncrement: 1,
      time_24hr: true,
    });
  }

  _setEndTimeDatepicker() {
    const endTimeField = this.getElement().querySelector(`[name=${TimeFieldName.END}]`);

    if (this._endTimeDatepicker !== null) {
      this.removeEndTimeDatepicker();
    }

    this._endTimeDatepicker = flatpickr(endTimeField, {
      dateFormat: DateFormat.CALENDAR_FULL,
      enableTime: true,
      minuteIncrement: 1,
      time_24hr: true,
    });
  }

  removeStartTimeDatepicker() {
    if (this._startTimeDatepicker !== null) {
      this._startTimeDatepicker.destroy();
      this._startTimeDatepicker = null;
    }
  }

  removeEndTimeDatepicker() {
    if (this._endTimeDatepicker !== null) {
      this._endTimeDatepicker.destroy();
      this._endTimeDatepicker = null;
    }
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    this._startTimeDatepicker.destroy();
    this._endTimeDatepicker.destroy();
    this._callback.submit(this._data);
  }

  _handleCloseClickr() {
    this._callback.close();
  }

  _handleCancelClick() {
    this._callback.cancel();
  }

  _handleDeleteClick() {
    this._callback.delete(this._data);
  }

  _handleDestinationChange(evt) {
    if (this._availableDestintionNames.includes(evt.target.value)) {
      this._updateData(
        {
          destination: evt.target.value,
          description: getDescription(evt.target.value, this._destinations),
        },
      );
    }
  }

  _handleTypeChange(evt) {
    this._updateData(
      {
        type: evt.target.value,
        offers: getOffers(evt.target.value, this._offers),
      },
    );
  }

  _handleTimeChange(evt) {
    if (evt.target.name === TimeFieldName.START) {
      const startTime = dayjs(evt.target.value, FULL);

      if (this._data.time.end.diff(startTime, 'second') > 0) {
        this._updateData(
          {
            time: {
              start: startTime,
              end: this._data.time.end,
            },
          }, false,
        );
      }

    }

    if (evt.target.name === TimeFieldName.END) {
      const endTime = dayjs(evt.target.value, FULL);

      if (endTime.diff(this._data.time.start, 'second') > 0) {
        this._updateData(
          {
            time: {
              start: this._data.time.start,
              end: endTime,
            },
          }, false,
        );
      }

    }
  }

  _restoreHandlers() {
    this.setSubmitHandler();
    this._setTypeChangeHandler();
    this._setDestinationChangeHandler();
    this._setStartTimeDatepicker();
    this._setEndTimeDatepicker();
    this._setTimeChangeHandler();
    this._setPriceInputHandler();
    this._setOffersClickHandler();

    if (this._mode === EditorMode.EDITOR) {
      this.setCloseClickHandler();
      this.setDeleteClickHandler();
    }

    if (this._mode === EditorMode.CREATOR) {
      this.setCancelClickHandler();
    }
  }
}
