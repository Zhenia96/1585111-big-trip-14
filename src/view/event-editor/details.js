import { getOffersTemplate } from './offer.js';
import { getDescriptionTemplate } from './description.js';
import { hasData } from '../../util.js';

export const getDetailsTemplate = ({ offers, description }) => {
  const { title, pictures } = description;

  const offersTemplate = hasData(offers) ? getOffersTemplate(offers) : '';
  const descriptionTemplate = hasData(title) || hasData(pictures) ?
    getDescriptionTemplate(description) :
    '';

  return `
    <section class="event__details">
      ${offersTemplate}

      ${descriptionTemplate}
    </section>`;
};
