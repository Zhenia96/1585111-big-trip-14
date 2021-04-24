import AbstractComponentView from '../abstract/companent.js';

const getEventListTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class EventList extends AbstractComponentView {

  getTemplate() {
    return getEventListTemplate();
  }
}
