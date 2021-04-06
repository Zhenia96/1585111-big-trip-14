import { hasData } from '../../util.js';

const getPictureTemplate = (pictureData) => {
  return `
    <img class="event__photo" src="${pictureData}" alt="Event photo">`;
};

const getPicturesTemplate = (picturesData) => {
  let picturesList = '';
  picturesData.forEach((pictureData) => {
    picturesList += getPictureTemplate(pictureData);
  });
  return picturesList;
};

const getPictureContainerTemplate = (pictures) => {
  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${getPicturesTemplate(pictures)}
      </div>
    </div>`;
};

export const getDescriptionTemplate = ({ title, pictures }) => {
  const photoContainerTemplate = hasData(pictures) ? getPictureContainerTemplate(pictures) : '';

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${title}</p>

      ${photoContainerTemplate}
    </section>`;
};
