import AbstractComponentView from './abstract/companent.js';

const getTourTemplate = () => {
  return `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  </section>`;
};

export default class Tour extends AbstractComponentView {

  getTemplate() {
    return getTourTemplate();
  }
}
