const PATH_TO_ICONS = 'img/icons/';
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DASH = '&mdash;';
const NON_BREAKING_SPACE = '&nbsp;';
const ELLIPSIS = '...';
const ESCAPE_BUTTON = 'Escape';

const CssClass = {
  FAVORITE_EVENT_BUTTON_ACTIVE: 'event__favorite-btn--active',
  OPEN_EVENT_EDITOR_BUTTON: '.event__rollup-btn',
  SAVE_CHANGES_BUTTON: '.event__save-btn',
  CLOSE_EVENT_EDITOR_BUTTON: '.event__reset-btn',
  EVENT_LIST: '.trip-events__list',
  EVENT_EDITOR: '.event--edit',
  TRIP_MAIN: '.trip-main',
  NAVIGATION: '.trip-controls__navigation',
  FILTER: '.trip-controls__filters',
  CONTENT: '.trip-events',
};

const EventName = {
  CLICK: 'click',
  SUBMIT: 'submit',
  KEYDOWN: 'keydown',
};

const Position = {
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
};

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
  PATH_TO_ICONS,
  typeIcon,
  DASH,
  NON_BREAKING_SPACE,
  ELLIPSIS,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
  Position,
  EventName,
  ESCAPE_BUTTON,
  CssClass
};
