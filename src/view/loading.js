import AbstractComponentView from './abstract/companent.js';

const getLoadingTemplate = () => {
  return '<p class="trip-events__msg">Loading...</p>';
};

export default class Loading extends AbstractComponentView {

  getTemplate() {
    return getLoadingTemplate();
  }
}
