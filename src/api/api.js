import { isOnline } from '../utils/common.js';
import { adaptPointToServer } from '../utils/adapter.js';

const getSyncedPoints = (items) => items.map(({ payload }) => payload.point);

export default class Api {
  constructor(basedApi, store) {
    this._basedApi = basedApi;
    this._store = store;
  }

  getData(path, storeKey) {
    if (isOnline()) {
      return this._basedApi.getData(path)
        .then((response) => {
          this._store.setItems(response, storeKey);

          return response;
        });
    }
    const storeData = Object.values(this._store.getItems(storeKey));

    return Promise.resolve(storeData);
  }

  updateData(path, data, storeKey) {
    if (isOnline()) {
      return this._basedApi.updateData(path, data)
        .then((response) => {
          this._store.setItem(response.id, response, storeKey);

          return response;
        });
    }

    this._store.setItem(data.id, adaptPointToServer(Object.assign({}, data)), storeKey);

    return Promise.resolve(adaptPointToServer(data));
  }

  addData(path, data) {
    return this._basedApi.addData(path, data);
  }

  deleteData(path) {
    return this._basedApi.deleteData(path);
  }

  sync(path, storeKey) {
    if (isOnline()) {
      const storeData = Object.values(this._store.getItems(storeKey));

      return this._basedApi.sync(path, storeData)
        .then((response) => {
          const points = getSyncedPoints(response.updated);
          this._store.setItems(points, storeKey);

          return points;
        });
    }
  }
}
