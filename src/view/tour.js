import AbstractComponentView from './abstract/companent.js';

const getContentTemplate = () => {
  return `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  </section>`;
};

export default class Content extends AbstractComponentView {

  getTemplate() {
    return getContentTemplate();
  }
}
