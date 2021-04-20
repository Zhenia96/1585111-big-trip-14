import AbstractComponentView from './abstract/companent.js';

const getEmptyEventListMessageTemplate = () => {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

export default class EmptyEventListMessage extends AbstractComponentView {

  getTemplate() {
    return getEmptyEventListMessageTemplate();
  }
}
