import { formatDate, getDuration } from '../util.js';

const FAVORITE_EVENT_CLASS = 'event__favorite-btn--active';
const EVENT_DATE_FORMAT = 'MMM DD';
const EVENT_TIME_FORMAT = 'HH:mm';
const DATE_TIME_ATTRIBUTE_LONG_FORMAT = 'YYYY-MM-DDTHH:mm';
const DATE_TIME_ATTRIBUTE_SHORT_FORMAT = 'YYYY-MM-DD';
const PATH_TO_ICONS = 'img/icons/';
const typeIcon = {
  'Taxi': 'taxi.png',
  'Bus': 'bus.png',
  'Train': 'train.png',
  'Ship': 'ship.png',
  'Transport': 'transport.png',
  'Drive': 'drive.png',
  'Flight': 'flight.png',
  'Check-in': 'check-in.png',
  'Sightseeing': 'sightseeing.png',
  'Restaurant': 'restaurant.png',
};

const getOfferTemplate = ({ title, price }) => {
  return `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
};

const getOffersListTemplate = (offersData) => {
  let offersFragment = '';

  offersData.forEach((offerData) => {
    offersFragment += getOfferTemplate(offerData);
  });

  return `
    <ul class="event__selected-offers">
     ${offersFragment}
    </ul>`;
};

export const getPointTemplate = (data) => {
  const { type, destination, time, price, offers, isFavorite } = data;
  const { start, end } = time;
  const eventDate = formatDate(start, EVENT_DATE_FORMAT);
  const icon = typeIcon[type];
  const favoriteEvent = isFavorite ? FAVORITE_EVENT_CLASS : '';
  const duration = getDuration(start, end);

  return `
    <div class="event">
      <time class="event__date" datetime="${formatDate(start, DATE_TIME_ATTRIBUTE_SHORT_FORMAT)}">${eventDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${PATH_TO_ICONS}${icon}" alt="${type} icon">
                </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDate(start, DATE_TIME_ATTRIBUTE_LONG_FORMAT)}">${formatDate(start, EVENT_TIME_FORMAT)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${formatDate(end, DATE_TIME_ATTRIBUTE_LONG_FORMAT)}">${formatDate(end, EVENT_TIME_FORMAT)}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${getOffersListTemplate(offers)}
        <button class="event__favorite-btn ${favoriteEvent}" type="button">
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

