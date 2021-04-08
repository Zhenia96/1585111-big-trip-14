import dayjs from 'dayjs';
import { getRandomIntegerRange, getRandomText, getRandomArrayElement } from '../util.js';

const EVENT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const EVENT_DESTINATIONS = ['Amsterdam', 'Geneva', 'Chamonix'];

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

const generatePicturesData = (count) => {
  const pictures = new Array(count);

  pictures.fill();
  pictures.forEach((value, index, pictures) => {
    pictures[index] = `http://picsum.photos/248/152?r=${getRandomIntegerRange()}`;
  });
  return pictures;
};

const generateDescriptionsData = () => {
  const MIN_SENTENCES_COUNT = 0;
  const MAX_SENTENCES_COUNT = 5;
  const MIN_PICTURES_COUNT = 0;
  const MAX_PICTURES_COUNT = 5;
  const picturesCount = getRandomIntegerRange(MIN_PICTURES_COUNT, MAX_PICTURES_COUNT);
  const sentencesCount = getRandomIntegerRange(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT);

  return {
    title: getRandomText(sentencesCount),
    pictures: generatePicturesData(picturesCount),
  };
};

const generateOffersData = (count) => {
  const SENTENCES_COUNT = 1;
  const MIN_PRICE = 30;
  const MAX_PRICE = 300;
  const offers = new Array(count);

  offers.fill();
  offers.forEach((value, index, offers) => {
    offers[index] = {
      title: getRandomText(SENTENCES_COUNT),
      price: getRandomIntegerRange(MIN_PRICE, MAX_PRICE),
      isChecked: Boolean(getRandomIntegerRange(0, 1)),
    };
  });
  return offers;
};

const generateEventData = () => {
  const MIN_PRICE = 200;
  const MAX_PRICE = 2000;
  const MIN_OFFERS_COUNT = 0;
  const MAX_OFFERS_COUNT = 5;
  const offersCount = getRandomIntegerRange(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT);

  return {
    type: getRandomArrayElement(EVENT_TYPES),
    destination: getRandomArrayElement(EVENT_DESTINATIONS),
    time: generateTimeData(),
    price: getRandomIntegerRange(MIN_PRICE, MAX_PRICE),
    offers: generateOffersData(offersCount),
    description: generateDescriptionsData(),
    isFavorite: Boolean(getRandomIntegerRange(0, 1)),
  };
};

export { generateEventData };
