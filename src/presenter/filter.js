import { render } from '../utils/component.js';
import { Position } from '../constant.js';
import FilterView from '../view/filter.js';

export default class Filter {
  constructor(container, filterModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._filter = null;

    this._filterClickCallback = this._filterClickCallback.bind(this);
  }

  init() {
    if (this._filter === null) {
      this._filter = new FilterView();
      render(this._filter, this._container, Position.AFTER_BEGIN);

      this._filter.setClickHandler(this._filterClickCallback);
    }
  }

  _filterClickCallback(clickedFilter) {
    if (this._filterModel.currentFilter !== clickedFilter) {
      this._filterModel.currentFilter = clickedFilter;
    }
  }
}
