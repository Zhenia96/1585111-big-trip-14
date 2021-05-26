import { nanoid } from 'nanoid';

const getDataForStorage = (data) => {
  const result = {};

  data.forEach((dataItem) => {
    const id = dataItem.id ? dataItem.id : nanoid();
    result[id] = Object.assign({}, dataItem);
  });

  return JSON.stringify(result);
};

export default class Storage {
  constructor(storage) {
    this._storage = storage;
  }

  getItems(storeKey) {
    try {
      const store = this._storage.getItem(storeKey) || {};
      return JSON.parse(store);
    } catch (err) {
      return {};
    }
  }

  setItem(key, value, storeKey) {
    const store = JSON.parse(this._storage.getItem(storeKey));

    this._storage.setItem(storeKey,
      JSON.stringify(Object.assign({},
        store,
        { [key]: value },
      )),
    );
  }

  setItems(data, storeKey) {
    this._storage.setItem(storeKey, getDataForStorage(data));
  }
}
