import { MINUTES_IN_HOUR, HOURS_IN_DAY } from './constant';
import { nanoid } from 'nanoid';
import AbstractComponentView from './view/abstract/companent.js';

const getRandomIntegerRange = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayValue = (array) => {
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

const getDuration = (start, end) => {
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

const hasData = (object) => Boolean(Object.keys(object).length || object.length);

const generateId = () => nanoid();

const createElement = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;
  return container.firstChild;
};

const render = (component, container, position = 'beforeend') => {
  if (component instanceof AbstractComponentView) {
    component = component.getElement();
  }

  if (container instanceof AbstractComponentView) {
    container = container.getElement();
  }

  if (position === 'beforeend') {
    container.append(component);
  }
  if (position === 'afterbegin') {
    container.prepend(component);
  }
};

export {
  generateId,
  formatDate,
  getDuration,
  getRandomText,
  getRandomIntegerRange,
  getRandomArrayValue,
  hasData,
  createElement,
  render
};
