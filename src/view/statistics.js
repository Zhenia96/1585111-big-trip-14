import { CssClassName } from '../constant.js';
import AbstractComponentView from './abstract/component.js';

const getStatisticsTemplate = () => {
  return `<section class="statistics" hidden>
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;
};

export default class Statistics extends AbstractComponentView {
  constructor() {
    super();

    this._moneyCtx = this.getElement().querySelector(CssClassName.STATISTICS_MONEY);
    this._typeCtx = this.getElement().querySelector(CssClassName.STATISTICS_TYPE);
    this._timeCtx = this.getElement().querySelector(CssClassName.STATISTICS_TIME);
  }

  get moneyCtx() {
    return this._moneyCtx;
  }

  get typeCtx() {
    return this._typeCtx;
  }

  get timeCtx() {
    return this._timeCtx;
  }

  getTemplate() {
    return getStatisticsTemplate();
  }

  setChartHeight(height) {
    this._moneyCtx.height = height;
    this._typeCtx.height = height;
    this._timeCtx.height = height;
  }
}
