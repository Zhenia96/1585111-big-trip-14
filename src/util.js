import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MIN_TWO_DICIT_NUMBER = 10;

const getRandomIntegerRange = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (array) => {
  const lastIndex = array.length - 1;
  const randomIndex = getRandomIntegerRange(0, lastIndex);
  return array[randomIndex];
};

const getRandomText = (sentencesCount) => {
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

const formatDate = (date, format) => {
  return date.format(format);
};

const addZero = (number) => number < MIN_TWO_DICIT_NUMBER ? `0${number}` : number;

const getDuration = (start, end) => {
  const durationInDays = end.diff(start, 'day');
  const durationInHours = end.diff(start, 'hour');
  const durationInMinutes = end.diff(start, 'minute');

  const daysCount = durationInDays;
  const hoursCount = durationInHours - (durationInDays * HOURS_IN_DAY);
  const minutesCount = durationInMinutes - (durationInHours * MINUTES_IN_HOUR);

  const formatedDay = daysCount > 0 ? `${addZero(daysCount)}D ` : '';
  const formatedMinute = `${addZero(minutesCount)}M`;
  let formatedHour = `${addZero(hoursCount)}H `;
  if (daysCount === 0 && hoursCount === 0) {
    formatedHour = '';
  }

  return `${formatedDay}${formatedHour}${formatedMinute}`;
};

const hasData = (object) => Boolean(Object.keys(object).length || object.length);

export { formatDate, getDuration, getRandomText, getRandomIntegerRange, getRandomArrayElement, hasData };
