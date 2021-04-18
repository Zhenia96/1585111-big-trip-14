import { DASH, NON_BREAKING_SPACE, ELLIPSIS, DateFormat } from '../constant.js';
import { formatDate, createElement } from '../util.js';


const calcOffersPrice = (offers) => {
  let result = 0;
  offers.forEach(({ price }) => result += price);
  return result;
};

const getTotalPrice = (dataList) => {
  let totalPrice = 0;
  dataList.forEach((value) => {
    const { price, offers } = value;
    totalPrice += price + calcOffersPrice(offers);
  });
  return totalPrice;
};

const getRoute = (dataList) => {
  const routeTemporary = [];
  let route;
  dataList.forEach(({ destination }) => {
    const routeLastValue = routeTemporary[routeTemporary.length - 1];
    if (destination !== routeLastValue) {
      routeTemporary.push(destination);
    }
  });

  if (routeTemporary.length <= 3) {
    route = routeTemporary.join(` ${DASH} `);
  } else {
    const firstPoint = routeTemporary[0];
    const lastPoint = routeTemporary[routeTemporary.length - 1];
    route = `${firstPoint} ${DASH} ${ELLIPSIS} ${DASH} ${lastPoint}`;
  }

  return route;
};

const getDistance = (dataList) => {
  const firstPoint = dataList[0];
  const lastPoint = dataList[dataList.length - 1];
  let distance = formatDate(firstPoint.time.start, DateFormat.MONTH_DAY);
  if (dataList.length > 1) {
    const firstMonth = firstPoint.time.start.$M;
    const lastMonth = lastPoint.time.end.$M;
    const firstYear = firstPoint.time.start.$y;
    const lastYear = lastPoint.time.end.$y;
    const lastDay = lastPoint.time.end.$D;
    const endDate = firstMonth === lastMonth && firstYear === lastYear ?
      lastDay :
      formatDate(lastPoint.time.end, DateFormat.MONTH_DAY);
    distance += `${NON_BREAKING_SPACE}${DASH}${NON_BREAKING_SPACE}${endDate}`;
  }
  return distance;
};

const getTripInfoTemplate = (dataList) => {
  const totalPrice = getTotalPrice(dataList);
  const route = getRoute(dataList);
  const distance = getDistance(dataList);
  return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>

        <p class="trip-info__dates">${distance}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`;
};

export default class TripInfo {
  constructor(dataList) {
    this._dataList = dataList;
    this._element = null;
  }

  getTemplate() {
    return getTripInfoTemplate(this._dataList);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
