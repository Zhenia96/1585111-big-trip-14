import OffersView from './offer.js';
import DescriptionView from './description.js';
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

export default class Details {
  constructor(data) {
    this._data = data;
  }

  getTemplate() {
    return getDetailsTemplate(this._data);
  }
}

