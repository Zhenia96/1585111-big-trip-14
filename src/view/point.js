import { formatDate, getDuration, isOnline } from '../utils/common.js';
import { toast } from '../utils/toast.js';
import { DateFormat, CssClassName, PATH_TO_ICONS, typeIcon, EventName, ErrorMessage } from '../constant';
import AbstractComponentView from './abstract/component.js';

const { MONTH_DAY, HOUR_MINUTE, SPECIAL_FULL, YEAR_MONTH_DAY } = DateFormat;

const getOfferTemplate = ({ title, price }) => {
  return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
};

const getOffersListTemplate = (offersData) => {
  let offersFragment = '';

  offersData.forEach((offerData) => {
    if (offerData.isChecked) {
      offersFragment += getOfferTemplate(offerData);
    }
  });

  return `<ul class="event__selected-offers">
     ${offersFragment}
    </ul>`;
};

const getPointTemplate = (data) => {
  const { type, destination, time, price, offers, isFavorite } = data;
  const { start, end } = time;
  const eventDate = formatDate(start, MONTH_DAY);
  const icon = typeIcon[type.toLowerCase()];
  const favoriteEventButtonClass = isFavorite ? 'event__favorite-btn--active' : '';
  const duration = getDuration(start, end);

  return `<div class="event">
      <time class="event__date" datetime="${formatDate(start, YEAR_MONTH_DAY)}">${eventDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${PATH_TO_ICONS}${icon}" alt="${type} icon">
                </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDate(start, SPECIAL_FULL)}">${formatDate(start, HOUR_MINUTE)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${formatDate(end, SPECIAL_FULL)}">${formatDate(end, HOUR_MINUTE)}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${getOffersListTemplate(offers)}
        <button class="event__favorite-btn ${favoriteEventButtonClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>`;
};

export default class Point extends AbstractComponentView {
  constructor(data) {
    super();
    this._data = data;
    this._handleOpenButtonClick = this._handleOpenButtonClick.bind(this);
    this._handleFavoriteButtonClick = this._handleFavoriteButtonClick.bind(this);
  }

  getTemplate() {
    return getPointTemplate(this._data);
  }

  setOpenButtonClickHandler(callback) {
    this._callback.clickOpenEditorButton = callback;
    this.getElement().querySelector(CssClassName.EVENT_EDITOR_OPEN_BUTTON).addEventListener(EventName.CLICK, this._handleOpenButtonClick);
  }

  setFavoriteButtonClickHandler(callback) {
    this._callback.clickFavoriteButton = callback;
    this.getElement().querySelector(CssClassName.EVENT_FAVORITE_BUTTON).addEventListener(EventName.CLICK, this._handleFavoriteButtonClick);
  }

  _handleOpenButtonClick() {
    if (!isOnline()) {
      toast(ErrorMessage.NO_INTERNET);
      this.shake();
      return;
    }
    this._callback.clickOpenEditorButton();
  }

  _handleFavoriteButtonClick() {
    this._callback.clickFavoriteButton();
  }
}

