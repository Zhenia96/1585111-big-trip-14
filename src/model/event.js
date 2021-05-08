export default class Event {

  /* constructor() {

  }
*/

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data.slice();
  }

  update(updatedData) {
    const index = this._data.findIndex((dataItem) => dataItem.id === updatedData.id);

    if (index !== -1) {
      this._data = [
        ...this._data.slice(0, index),
        updatedData,
        ...this._data.slice(index + 1),
      ];
    }
  }

  add(newData) {
    this._data = [
      newData,
      ...this._data,
    ];
  }

  delete(deletedData) {
    const index = this._data.findIndex((dataItem) => dataItem.id === deletedData.id);

    if (index !== -1) {
      this._data = [
        ...this._data.slice(0, index),
        ...this._data.slice(index + 1),
      ];
    }
  }
}
