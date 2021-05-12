import { render } from '../utils/component.js';
import { ChartType } from '../constant.js';
import StatisticsView from '../view/statistics.js';
import { getChart, getLabels, getMoneyChartData, getTypeChartData, getTimeChartData } from '../utils/statistics.js';

const BAR_HEIGHT = 55;

export default class Statistics {
  constructor(container, eventModel) {
    this._container = container;
    this._eventModel = eventModel;

    this._moneyCtx = null;
    this._typeCtx = null;
    this._timeCtx = null;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._labels = null;
    this._barHeight = null;

    this._statistics = new StatisticsView();
  }

  init() {
    this._moneyCtx = this._statistics.getElement().querySelector('.statistics__chart--money');
    this._typeCtx = this._statistics.getElement().querySelector('.statistics__chart--transport');
    this._timeCtx = this._statistics.getElement().querySelector('.statistics__chart--time');

    this._labels = getLabels(this._eventModel.data);
    this._barHeight = BAR_HEIGHT * this._labels.length;

    this._moneyCtx.height = this._barHeight;
    this._typeCtx.height = this._barHeight;
    this._timeCtx.height = this._barHeight;

    this._moneyChart = getChart(
      ChartType.MONEY,
      this._labels,
      this._moneyCtx,
      getMoneyChartData(this._eventModel.data, this._labels),
    );

    this._typeChart = getChart(
      ChartType.TYPE,
      this._labels,
      this._typeCtx,
      getTypeChartData(this._eventModel.data, this._labels),
    );
    this._timeChart = getChart(
      ChartType.TIME,
      this._labels,
      this._timeCtx,
      getTimeChartData(this._eventModel.data, this._labels),
    );

    render(this._statistics, this._container);
  }

  get statistics() {
    return this._statistics;
  }

}
