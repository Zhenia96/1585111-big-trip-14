import { hasData } from '../../util.js';

const getPictureTemplate = ({ src, description }) => {
  return `
    <img class="event__photo" src="${src}" alt="${description}">`;
};

const getPicturesFragment = (picturesData) => {
  let picturesFragment = '';
  picturesData.forEach((pictureData) => {
    picturesFragment += getPictureTemplate(pictureData);
  });
  return picturesFragment;
};

const getPictureContainerTemplate = (pictures) => {
  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${getPicturesFragment(pictures)}
      </div>
    </div>`;
};

export const getDescriptionTemplate = ({ title, pictures }) => {
  const pictureContainerTemplate = hasData(pictures) ? getPictureContainerTemplate(pictures) : '';

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${title}</p>

      ${pictureContainerTemplate}
    </section>`;
};
