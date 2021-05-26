import { DASH, NON_BREAKING_SPACE, ELLIPSIS, DateFormat } from '../constant.js';
import { formatDate, calcTotalPrice } from '../utils/common.js';
import AbstractComponentView from './abstract/companent.js';

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
  const totalPrice = calcTotalPrice(dataList);
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

export default class TripInfo extends AbstractComponentView {
  constructor(dataList) {
    super();
    this._dataList = dataList;
  }

  getTemplate() {
    return getTripInfoTemplate(this._dataList);
  }
}
