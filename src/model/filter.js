import { FiltersName } from '../constant.js';
import Observer from '../utils/observer';

export default class Filter extends Observer {
  constructor() {
    super();

    this._currentFilter = FiltersName.EVERYTHING;
  }

  get currentFilter() {
    return this._currentFilter;
  }

  set currentFilter(newFilter) {
    this._currentFilter = newFilter;
    this._notify();
  }
}
