const FAVORITE_EVENT_CLASS = 'event__favorite-btn--active';
const PATH_TO_ICONS = 'img/icons/';
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MIN_TWO_DICIT_NUMBER = 10;
const DASH = '&mdash;';
const NON_BREAKING_SPACE = '&nbsp;';
const ELLIPSIS = '...';

const DateFormat = {
  FULL: 'DD/MM/YY HH:mm',
  MONTH_DAY: 'MMM DD',
  HOUR_MINUTE: 'HH:mm',
  SPECIAL_FULL: 'YYYY-MM-DDTHH:mm',
  YEAR_MONTH_DAY: 'YYYY-MM-DD',
};

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

export {
  DateFormat,
  FAVORITE_EVENT_CLASS,
  PATH_TO_ICONS,
  typeIcon,
  DASH,
  NON_BREAKING_SPACE,
  ELLIPSIS,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
  MIN_TWO_DICIT_NUMBER
};
