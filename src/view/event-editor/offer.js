const getOfferTemplate = ({ title, price, id, isChecked }) => {
  const status = isChecked ? 'checked' : '';

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="event-offer-luggage" ${status}>
      <label class="event__offer-label" for="${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
};

const getOfferListTemplate = (offersData) => {
  let offersList = '';
  offersData.forEach((offerData) => {
    offersList += getOfferTemplate(offerData);
  });

  return offersList;
};

export const getOffersTemplate = (offersData) => {
  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
       ${getOfferListTemplate(offersData)}
      </div>
    </section>`;
};
