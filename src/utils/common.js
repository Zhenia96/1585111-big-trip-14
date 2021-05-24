import { MINUTES_IN_HOUR, HOURS_IN_DAY, SortMode, FiltersName } from '../constant';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

export const getRandomIntegerRange = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomArrayValue = (array) => {
  const lastIndex = array.length - 1;
  const randomIndex = getRandomIntegerRange(0, lastIndex);
  return array[randomIndex];
};

export const getRandomText = (sentencesCount) => {
  const PLACEHOLDER = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna,',
    'non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'];
  const placeholderLastIndex = PLACEHOLDER.length - 1;
  let text = '';

  for (let i = 1; i <= sentencesCount; i++) {
    text += PLACEHOLDER[getRandomIntegerRange(0, placeholderLastIndex)];
    text += ' ';
  }
  return text;
};

export const formatDate = (date, format) => {
  return date.format(format);
};

export const getDuration = (start, end) => {
  const durationInDays = end.diff(start, 'day');
  const durationInHours = end.diff(start, 'hour');
  const durationInMinutes = end.diff(start, 'minute');

  const daysCount = durationInDays;
  const hoursCount = durationInHours - (durationInDays * HOURS_IN_DAY);
  const minutesCount = durationInMinutes - (durationInHours * MINUTES_IN_HOUR);

  let formatedDay = `${String(daysCount).padStart(2, '0')}D `;
  const formatedMinute = `${String(minutesCount).padStart(2, '0')}M`;
  let formatedHour = `${String(hoursCount).padStart(2, '0')}H `;
  if (daysCount === 0 && hoursCount === 0) {
    formatedHour = '';
  }
  if (daysCount === 0) {
    formatedDay = '';
  }

  return `${formatedDay}${formatedHour}${formatedMinute}`;
};

export const updateData = (dataList, updatedData) => {
  const index = dataList.findIndex((data) => data.id === updatedData.id);

  if (index === -1) {
    return dataList;
  }

  return [
    ...dataList.slice(0, index),
    updatedData,
    ...dataList.slice(index + 1),
  ];
};

export const hasData = (object) => Boolean(Object.keys(object).length || object.length);

export const generateId = () => nanoid();

export const sortData = (data, mode = SortMode.DATE) => {

  switch (mode) {

    case SortMode.DATE:
      return data.sort((firstEventData, secondEventData) => {

        if (firstEventData.time.start.unix() < secondEventData.time.start.unix()) {
          return -1;
        }

        if (firstEventData.time.start.unix() > secondEventData.time.start.unix()) {
          return 1;
        }

        return 0;
      });


    case SortMode.PRICE:
      return data.sort((firstEventData, secondEventData) => {

        if (firstEventData.price < secondEventData.price) {
          return 1;
        }

        if (firstEventData.price > secondEventData.price) {
          return -1;
        }

        return 0;
      });

    case SortMode.TIME:
      return data.sort((firstEventData, secondEventData) => {
        const firstEventTime = firstEventData.time.end.unix() - firstEventData.time.start.unix();
        const secondEventTime = secondEventData.time.end.unix() - secondEventData.time.start.unix();

        if (firstEventTime < secondEventTime) {
          return 1;
        }

        if (firstEventTime > secondEventTime) {
          return -1;
        }

        return 0;
      });
  }
};

export const filterData = (data, filter) => {
  const currentDate = dayjs();
  let filteredData = data;

  switch (filter) {
    case FiltersName.FUTURE:
      filteredData = data.filter((dataItem) => dataItem.time.start.diff(currentDate, 'minute') > 0);
      return filteredData;
    case FiltersName.PAST:
      filteredData = data.filter((dataItem) => dataItem.time.end.diff(currentDate, 'minute') < 0);
      return filteredData;
    default:
      return filteredData;
  }
};

export const calcOffersPrice = (offers) => {
  let result = 0;
  offers.forEach(({ price, isChecked }) => {
    if (isChecked) {
      result += price;
    }
  });
  return result;
};

export const calcTotalPrice = (dataList) => {
  let totalPrice = 0;
  dataList.forEach((value) => {
    const { price, offers } = value;
    totalPrice += price + calcOffersPrice(offers);
  });
  return totalPrice;
};

export const transformDateToString = (dateObject) => {
  return dateObject.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
};

export const transformDateToObject = (stringDate) => {
  const lastIndex = stringDate.length - 1;
  const lastSymbol = stringDate[lastIndex];
  if (lastSymbol === 'Z') {
    stringDate = stringDate.slice(0, lastIndex);
  }
  return dayjs(stringDate);
};

export const getOffers = (type, offers) => {
  const offer = offers.find((offer) => {
    return offer.type === type;
  });
  return offer.offers;
};

export const getDescription = (destination, descriptions) => {
  const result = Object.assign({},
    descriptions.find((description) => {
      return description.destination === destination;
    }));
  delete result.destination;
  return result;
};

export const generateTimeData = () => {
  const MIN_DAYS_COUNT = -10;
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

export const addAvailableOffers = (checkedOffers, availableOffers) => {
  const offers = [...checkedOffers];
  availableOffers.forEach((availableOffer) => {
    if (!offers.find((offer) => offer.title === availableOffer.title)) {
      offers.push(availableOffer);
    }
  });
  return (offers);
};

export const cloneObjects = (objects) => {
  const result = [];
  objects.forEach((object) => {
    result.push(Object.assign({}, object));
  });
  return result;
};
