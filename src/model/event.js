import Observer from '../utils/observer';
import { filterData } from '../utils/common.js';
import { FiltersName } from '../constant.js';


export default class Event extends Observer {

  constructor() {
    super();
    this._data = [];
    this._pastData = [];
    this._futureData = [];
    this._destinations = [];
    this._offers = [];
    this._availableDestintionNames = [];

    this.setAvailableDestintionNames = this.setAvailableDestintionNames.bind(this);
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
    this._pastData = filterData(this._data, FiltersName.PAST);
    this._futureData = filterData(this._data, FiltersName.FUTURE);
    this._notify();
  }

  get offers() {
    return this._offers;
  }

  set offers(offers) {
    this._offers = offers;
  }

  get destinations() {
    return this._destinations;
  }

  set destinations(destinations) {
    this._destinations = destinations;
  }

  get availableDestintionNames() {
    return this._availableDestintionNames;
  }

  get pastData() {
    return this._pastData;
  }

  get futureData() {
    return this._futureData;
  }

  setAvailableDestintionNames() {
    this._destinations.forEach((destination) => {
      this._availableDestintionNames.push(destination.destination);
    });
  }

  update(changedData, updateType) {
    const index = this._data.findIndex((dataItem) => dataItem.id === changedData.id);

    if (index !== -1) {
      this._data = [
        ...this._data.slice(0, index),
        changedData,
        ...this._data.slice(index + 1),
      ];
    }
    this._pastData = filterData(this._data, FiltersName.PAST);
    this._futureData = filterData(this._data, FiltersName.FUTURE);
    this._notify(changedData, updateType);
  }

  add(changedData, updateType) {
    this._data = [
      changedData,
      ...this._data,
    ];
    this._pastData = filterData(this._data, FiltersName.PAST);
    this._futureData = filterData(this._data, FiltersName.FUTURE);
    this._notify(changedData, updateType);
  }

  delete(changedData, updateType) {
    const index = this._data.findIndex((dataItem) => dataItem.id === changedData.id);

    if (index !== -1) {
      this._data = [
        ...this._data.slice(0, index),
        ...this._data.slice(index + 1),
      ];
    }
    this._pastData = filterData(this._data, FiltersName.PAST);
    this._futureData = filterData(this._data, FiltersName.FUTURE);
    this._notify(changedData, updateType);
  }
}
