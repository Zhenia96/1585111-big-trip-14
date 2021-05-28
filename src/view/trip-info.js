import { DASH, NON_BREAKING_SPACE, ELLIPSIS, DateFormat, CssClassName } from '../constant.js';
import { formatDate, calcTotalPrice } from '../utils/common.js';
import AbstractComponentView from './abstract/component.js';

const TRIP_INFO_TITLE_MAX_RANGE = 3;

const getTitle = (dataList) => {
  const titleTemporary = [];
  let title;
  dataList.forEach(({ destination }) => {
    const titleLastValue = titleTemporary[titleTemporary.length - 1];

    if (destination !== titleLastValue) {
      titleTemporary.push(destination);
    }
  });

  if (titleTemporary.length <= TRIP_INFO_TITLE_MAX_RANGE) {
    title = titleTemporary.join(` ${DASH} `);
  } else {
    const firstPoint = titleTemporary[0];
    const lastPoint = titleTemporary[titleTemporary.length - 1];

    title = `${firstPoint} ${DASH} ${ELLIPSIS} ${DASH} ${lastPoint}`;
  }

  return title;
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
  const title = getTitle(dataList);
  const distance = getDistance(dataList);

  return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>

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
    this._totalPrice = this.getElement().querySelector(CssClassName.TOTAL_PRICE);
  }

  getTemplate() {
    return getTripInfoTemplate(this._dataList);
  }

  setTotalPrice(price) {
    this._totalPrice.textContent = price;
  }
}
