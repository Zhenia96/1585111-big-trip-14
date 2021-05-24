import { transformDateToString, transformDateToObject, generateId } from './common.js';

const adaptTypeToClient = (type) => type[0].toUpperCase() + type.slice(1);

const adaptOfferToClient = (offer, isNewData) => {
  return {
    title: offer.title,
    price: offer.price,
    id: generateId(),
    isChecked: !isNewData,
  };
};

const adaptOffersToClient = (offers, isNewData = false) => {
  const adaptedOffers = [];
  offers.forEach((offer) => {
    adaptedOffers.push(adaptOfferToClient(offer, isNewData));
  });
  return adaptedOffers;
};

const adaptOfferForEditorToClient = (offer, isNewData) => {
  return {
    type: adaptTypeToClient(offer.type),
    offers: adaptOffersToClient(offer.offers, isNewData),
  };
};

const adaptDestinationForEditorToClient = (destination) => {
  return {
    title: destination.description,
    destination: destination.name,
    pictures: destination.pictures,
  };
};

export const adaptPointToClient = (point) => {
  return {
    type: adaptTypeToClient(point.type),
    destination: point.destination.name,
    time: {
      start: transformDateToObject(point.date_from),
      end: transformDateToObject(point.date_to),
    },
    price: point.base_price,
    id: point.id,
    offers: adaptOffersToClient(point.offers),
    description: {
      title: point.destination.description,
      pictures: point.destination.pictures,
    },
    isFavorite: point.is_favorite,
  };
};

export const adaptPointsToClient = (points) => {
  const adaptedPoints = [];
  points.forEach((point) => {
    adaptedPoints.push(adaptPointToClient(point));
  });
  return adaptedPoints;
};

export const adaptOffersForEditorToClient = (offers, isNewData = true) => {
  const adaptedOffers = [];
  offers.forEach((offer) => {
    adaptedOffers.push(adaptOfferForEditorToClient(offer, isNewData));
  });
  return adaptedOffers;
};

export const adaptDestinationsForEditorToClient = (destinations) => {
  const adaptedDestinations = [];
  destinations.forEach((destination) => {
    adaptedDestinations.push(adaptDestinationForEditorToClient(destination));
  });
  return adaptedDestinations;
};

const adaptTypeToServer = (type) => {
  const result = type.toLowerCase();
  return result;
};

const adaptOfferToServer = (offer) => {
  return {
    'title': offer.title,
    'price': offer.price,
  };
};

const adaptOffersToServer = (offers) => {
  const adaptedOffers = [];
  offers.forEach((offer) => {
    if (offer.isChecked) {
      adaptedOffers.push(adaptOfferToServer(offer));
    }
  });
  return adaptedOffers;
};

export const adaptPointToServer = (point, isLocal = false) => {
  const adaptedPoint = {
    'base_price': point.price,
    'date_from': transformDateToString(point.time.start),
    'date_to': transformDateToString(point.time.end),
    'destination': {
      'description': point.description.title,
      'name': point.destination,
      'pictures': point.description.pictures,
    },
    'is_favorite': point.isFavorite,
    'offers': adaptOffersToServer(point.offers),
    'type': adaptTypeToServer(point.type),
  };

  if (!isLocal) {
    adaptedPoint['id'] = point.id;
  }

  return adaptedPoint;
};

export const adaptPointsToServer = (points) => {
  const adaptedPoints = [];
  points.forEach((point) => {
    adaptedPoints.push(adaptPointToServer(point));
  });
  return adaptedPoints;
};
