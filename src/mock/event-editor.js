import dayjs from 'dayjs';
import { getRandomIntegerRange, getRandomText } from './../util.js';


const EVENT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const EVENT_DESTINATIONS = ['Amsterdam', 'Geneva', 'Chamonix'];

const getRandomArrayElement = (array) => {
  const lastIndex = array.length - 1;
  const randomIndex = getRandomIntegerRange(0, lastIndex);
  return array[randomIndex];
};

/*const formatDate = (date) => {
  return date.format('DD/MM/YY HH:mm');
};
*/

const generateTime = () => {
  const start = dayjs().set('d', getRandomIntegerRange(1, 31));
  const end = start.clone().set('m', start.$m + getRandomIntegerRange(30, 3000));
  return {
    start,
    end,
  };
};

const generatePictures = (count) => {
  const pictures = new Array(count);
  pictures.fill();
  pictures.forEach((value, index, array) => {
    array[index] = `http://picsum.photos/248/152?r=${getRandomIntegerRange(1, 100)}`;
  });
  return pictures;
};

const generateDescription = () => {
  return {
    title: getRandomText(getRandomIntegerRange(2, 15)),
    pictures: generatePictures(getRandomIntegerRange(0, 5)),
  };
};

const generateOffers = () => {
  return {
    title: getRandomText(1),
    price: getRandomIntegerRange(1, 1000),
  };
};

const generateEventEditor = () => {
  return {
    type: getRandomArrayElement(EVENT_TYPES),
    destination: getRandomArrayElement(EVENT_DESTINATIONS),
    time: generateTime(),
    price: getRandomIntegerRange(1, 1000),
    offers: generateOffers(),
    description: generateDescription(),
  };
};
