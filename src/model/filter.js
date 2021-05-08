import { FiltersName } from '../constant.js';

export default class Filter {
  constructor() {
    this._currentFilter = FiltersName.EVERYTHING;
  }

  get currentFilter() {
    return this._currentFilter;
  }

  set currentFilter(newFilter) {
    this._currentFilter = newFilter;
  }
}

