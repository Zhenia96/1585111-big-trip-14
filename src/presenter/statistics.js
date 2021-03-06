import { ChartType } from '../constant.js';
import StatisticsView from '../view/statistics.js';
import { remove, render } from '../utils/component.js';
import { getChart, getLabels, getMoneyChartData, getTypeChartData, getTimeChartData } from '../utils/statistics.js';

const BAR_HEIGHT = 55;

export default class Statistics {
  constructor(container, eventModel) {
    this._container = container;
    this._eventModel = eventModel;
    this._dataChangedStatus = true;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._labels = null;
    this._barHeight = null;

    this._statistics = null;

    this._changeDataChangedStatus = this._changeDataChangedStatus.bind(this);
    this._eventModel.addObserver(this._changeDataChangedStatus);
  }

  init() {
    this._destroy();
    this._statistics = new StatisticsView();

    this._labels = getLabels(this._eventModel.data);
    this._barHeight = BAR_HEIGHT * this._labels.length;

    this._statistics.setChartHeight(this._barHeight);

    this._moneyChartData = getMoneyChartData(this._eventModel.data, this._labels);
    this._typeChartData = getTypeChartData(this._eventModel.data, this._labels);
    this._timeChartData = getTimeChartData(this._eventModel.data, this._labels);

    this._moneyChart = getChart(
      ChartType.MONEY,
      this._moneyChartData,
      this._statistics.moneyCtx,
    );

    this._typeChart = getChart(
      ChartType.TYPE,
      this._typeChartData,
      this._statistics.typeCtx,
    );

    this._timeChart = getChart(
      ChartType.TIME,
      this._timeChartData,
      this._statistics.timeCtx,
    );

    render(this._statistics, this._container);
    this._dataChangedStatus = false;
  }

  get statistics() {
    return this._statistics;
  }

  get dataChangedStatus() {
    return this._dataChangedStatus;
  }

  _changeDataChangedStatus() {
    this._dataChangedStatus = true;
  }

  _destroy() {
    remove(this._statistics);
    this._statistics = null;
  }
}
