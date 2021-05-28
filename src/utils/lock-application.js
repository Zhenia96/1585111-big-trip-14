import { EventName } from '../constant.js';

const lockApplicationKeydownHandler = (evt) => {
  evt.preventDefault();
};

export const lockApplication = () => {
  document.documentElement.style.cursor = 'wait';
  document.body.style.pointerEvents = 'none';
  document.addEventListener(EventName.KEYDOWN, lockApplicationKeydownHandler);
};

export const unlockApplication = () => {
  document.documentElement.style.cursor = 'auto';
  document.body.style.pointerEvents = 'auto';
  document.removeEventListener(EventName.KEYDOWN, lockApplicationKeydownHandler);
};
