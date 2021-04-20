import OffersView from './offer.js';
import DescriptionView from './description.js';
import AbstractComponentView from '../abstract/companent.js';
import { hasData } from '../../util.js';

const getDetailsTemplate = ({ offers, description }) => {
  const { title, pictures } = description;

  const offersTemplate = hasData(offers) ? new OffersView(offers).getTemplate() : '';
  const descriptionTemplate = hasData(title) || hasData(pictures) ?
    new DescriptionView(description).getTemplate() :
    '';

  return `<section class="event__details">
      ${offersTemplate}

      ${descriptionTemplate}
    </section>`;
};

export default class Details extends AbstractComponentView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return getDetailsTemplate(this._data);
  }
}

