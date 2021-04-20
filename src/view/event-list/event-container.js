import AbstractComponentView from '../abstract/companent.js';

const getEventItemTemplate = () => {
  return '<li class="trip-events__item"></li>';
};

export default class EventItem extends AbstractComponentView {

  getTemplate() {
    return getEventItemTemplate();
  }
}
