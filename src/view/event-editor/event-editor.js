import { formatDate, hasData } from '../../utils/common.js';
import { DateFormat, typeIcon, PATH_TO_ICONS, EventName, CssClassName } from '../../constant';
import DetailsView from './details.js';
import SmartView from '../smart.js';
import { generateDescriptionsData, generateOfferDataList } from '../../mock/event.js';
import flatpickr from 'flatpickr';

import { } from '../../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const { FULL } = DateFormat;

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

const changeTypeStatus = (type) => {
  const allTypes = Object.keys(typeStatus);
  allTypes.forEach((type) => {
    typeStatus[type] = '';
  });
  typeStatus[type] = 'checked';
};

const getEventEditorTemplate = (data) => {
  const { type, destination, time, price, offers, description } = data;
  const { start, end } = time;
  const { title, pictures } = description;
  changeTypeStatus(type.toLowerCase());
  const detailsTemplate = hasData(offers) || hasData(title) || hasData(pictures) ?
    new DetailsView(data).getTemplate() :
    '';

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
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${typeStatus['taxi']}>
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${typeStatus['bus']}>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${typeStatus['train']}>
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${typeStatus['ship']}>
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${typeStatus['transport']}>
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${typeStatus['drive']}>
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${typeStatus['flight']}>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${typeStatus['check-in']}>
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${typeStatus['sightseeing']}>
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${typeStatus['restaurant']}>
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
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
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

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    ${detailsTemplate}
  </form>`;
};

export default class EventEditor extends SmartView {
  constructor(data) {
    super();
    this._data = data;
    this._startTimeDatepicker = null;
    this._endTimeDatepicker = null;
    this._submitHandler = this._submitHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._timeChangeHandler = this._timeChangeHandler.bind(this);


    this._setTypeChangeHandler();
    this._setDestinationChangeHandler();
    this._setStartTimeDatepicker();
    this._setEndTimeDatepicker();
    this._setTimeChangeHandler();
  }

  getTemplate() {
    return getEventEditorTemplate(this._data);
  }

  reset(data) {
    this._updateData(
      data,
    );
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._startTimeDatepicker.destroy();
    this._endTimeDatepicker.destroy();
    this._callback.submit(this._data);
  }

  _closeClickHandler() {
    this._callback.click();
  }

  _destinationChangeHandler(evt) {
    this._updateData(
      {
        destination: evt.target.value,
        description: generateDescriptionsData(),
      },
    );
  }

  _typeChangeHandler(evt) {
    this._updateData(
      {
        type: evt.target.value,
        offers: generateOfferDataList(),
      },
    );
  }

  _timeChangeHandler(evt) {
    if (evt.target.name === 'event-start-time') {
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

    if (evt.target.name === 'event-end-time') {
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

  _setTimeChangeHandler() {
    this.getElement().querySelector(CssClassName.EVENT_EDITOR_TIME).addEventListener(EventName.CHANGE, this._timeChangeHandler);
  }

  _setStartTimeDatepicker() {
    const startTimeField = this.getElement().querySelector('[name=event-start-time]');
    if (this._startTimeDatepicker !== null) {
      this._startTimeDatepicker.destroy();
      this._startTimeDatepicker = null;
    }

    this._startTimeDatepicker = flatpickr(startTimeField, {
      dateFormat: DateFormat.CALENDAR_FULL,
      enableTime: true,
      minuteIncrement: 1,
      time_24hr: true,
    });
  }

  _setEndTimeDatepicker() {
    const endTimeField = this.getElement().querySelector('[name=event-end-time]');
    if (this._endTimeDatepicker !== null) {
      this._endTimeDatepicker.destroy();
      this._endTimeDatepicker = null;
    }

    this._endTimeDatepicker = flatpickr(endTimeField, {
      dateFormat: DateFormat.CALENDAR_FULL,
      enableTime: true,
      minuteIncrement: 1,
      time_24hr: true,
    });
  }

  _setDestinationChangeHandler() {
    this.getElement().querySelector(CssClassName.EVENT_EDITOR_DESTINATION_BUTTON).addEventListener(EventName.CHANGE, this._destinationChangeHandler);
  }

  _setTypeChangeHandler() {
    this.getElement().querySelector(CssClassName.EVENT_EDITOR_TYPE_GROUP).addEventListener(EventName.CHANGE, this._typeChangeHandler);
  }

  setSubmitHandler(callback = this._callback.submit) {
    this._callback.submit = callback;
    if (this._callback.submit) {
      this.getElement().addEventListener(EventName.SUBMIT, this._submitHandler);
    }
  }

  setCloseClickHandler(callback = this._callback.click) {
    this._callback.click = callback;
    if (this._callback.click) {
      this.getElement().querySelector(CssClassName.CLOSE_EVENT_EDITOR_BUTTON).addEventListener(EventName.CLICK, this._closeClickHandler);
    }
  }

  _restoreHandlers() {
    this.setSubmitHandler();
    this.setCloseClickHandler();
    this._setTypeChangeHandler();
    this._setDestinationChangeHandler();
    this._setStartTimeDatepicker();
    this._setEndTimeDatepicker();
    this._setTimeChangeHandler();
  }
}
