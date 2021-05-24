import { SERVER_ADDRESS, AUTHORIZATION_VALUE } from './constant.js';
import { adaptPointToServer } from './utils/adapter.js';

const HTTPRequestsMethod = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

export default class Api {

  getData(path) {
    const url = SERVER_ADDRESS + path;
    const headers = new Headers();
    headers.append('Authorization', AUTHORIZATION_VALUE);

    return fetch(url, {
      method: HTTPRequestsMethod.GET,
      body: null,
      headers,
    }).then(this._hasOkStatus)
      .then(this._toJSON);
  }

  updateData(path, data) {
    const url = SERVER_ADDRESS + path;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', AUTHORIZATION_VALUE);

    return fetch(url, {
      method: HTTPRequestsMethod.PUT,
      body: JSON.stringify(adaptPointToServer(data, true)),
      headers,
    }).then(this._hasOkStatus)
      .then(this._toJSON);
  }

  addData(path, data) {
    const url = SERVER_ADDRESS + path;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', AUTHORIZATION_VALUE);

    return fetch(url, {
      method: HTTPRequestsMethod.POST,
      body: JSON.stringify(adaptPointToServer(data, true)),
      headers,
    }).then(this._hasOkStatus)
      .then(this._toJSON);
  }

  deleteData(path) {
    const url = SERVER_ADDRESS + path;
    const headers = new Headers();
    headers.append('Authorization', AUTHORIZATION_VALUE);

    return fetch(url, {
      method: HTTPRequestsMethod.DELETE,
      body: null,
      headers,
    }).then(this._hasOkStatus);
  }

  _toJSON(response) {
    return response.json();
  }

  _hasOkStatus(response) {
    if (!response.ok) {
      this._getError(response.status);
    }
    return response;
  }

  _getError(responseStatus) {
    throw new Error(`Статус ошибки ${responseStatus}`);
  }
}
