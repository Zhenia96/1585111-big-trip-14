import dayjs from 'dayjs';
import { getRandomIntegerRange, getRandomText, getRandomArrayValue } from '../util.js';

const EVENT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const EVENT_DESTINATIONS = ['Amsterdam', 'Geneva', 'Chamonix'];

let offerIdCount = 0;
let eventIdCount = 0;

const generateTimeData = () => {
  const MIN_DAYS_COUNT = 1;
  const MAX_DAYS_COUNT = 31;
  const MIN_MINUTES_COUNT = 30;
  const MAX_MINUTES_COUNT = 3000;
  const daysCount = getRandomIntegerRange(MIN_DAYS_COUNT, MAX_DAYS_COUNT);
  const minutesCount = getRandomIntegerRange(MIN_MINUTES_COUNT, MAX_MINUTES_COUNT);
  const start = dayjs().set('d', daysCount);
  const end = start.clone().set('m', start.$m + minutesCount);

  return {
    start,
    end,
  };
};

const generatePictureData = () => {
  return {
    src: `http://picsum.photos/248/152?r=${getRandomIntegerRange()}`,
    description: getRandomText(1),
  };
};

const generatePictureDataList = (count) => Array(count).fill().map(() => generatePictureData());

const generateDescriptionsData = () => {
  const MIN_SENTENCES_COUNT = 0;
  const MAX_SENTENCES_COUNT = 5;
  const MIN_PICTURES_COUNT = 0;
  const MAX_PICTURES_COUNT = 5;
  const picturesCount = getRandomIntegerRange(MIN_PICTURES_COUNT, MAX_PICTURES_COUNT);
  const sentencesCount = getRandomIntegerRange(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT);

  return {
    title: getRandomText(sentencesCount),
    pictures: generatePictureDataList(picturesCount),
  };
};

const generateOfferId = () => offerIdCount++;
const generateEventId = () => eventIdCount++;

const generateOfferDataList = (count) => {
  const SENTENCES_COUNT = 1;
  const MIN_PRICE = 30;
  const MAX_PRICE = 300;
  return Array(count).fill().map(() => {
    return {
      title: getRandomText(SENTENCES_COUNT),
      price: getRandomIntegerRange(MIN_PRICE, MAX_PRICE),
      id: generateOfferId(),
      isChecked: Boolean(getRandomIntegerRange(0, 1)),
    };
  });
};

const generateEventData = () => {
  const MIN_PRICE = 200;
  const MAX_PRICE = 2000;
  const MIN_OFFERS_COUNT = 0;
  const MAX_OFFERS_COUNT = 5;
  const offersCount = getRandomIntegerRange(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT);

  return {
    type: getRandomArrayValue(EVENT_TYPES),
    destination: getRandomArrayValue(EVENT_DESTINATIONS),
    time: generateTimeData(),
    price: getRandomIntegerRange(MIN_PRICE, MAX_PRICE),
    id: generateEventId(),
    offers: generateOfferDataList(offersCount),
    description: generateDescriptionsData(),
    isFavorite: Boolean(getRandomIntegerRange(0, 1)),
  };
};

const generateEventDataList = (count) => {
  return Array(count).fill().map(() => generateEventData());
};

export { generateEventData, generateEventDataList };
