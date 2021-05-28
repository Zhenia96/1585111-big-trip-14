import AbstractComponentView from '../abstract/component.js';

const getEventItemTemplate = () => {
  return '<li class="trip-events__item"></li>';
};

export default class EventItem extends AbstractComponentView {

  getTemplate() {
    return getEventItemTemplate();
  }
}
