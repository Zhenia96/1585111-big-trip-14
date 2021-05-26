import { SERVER_ADDRESS, AUTHORIZATION_VALUE, ErrorMessage } from '../constant.js';
import { adaptPointToServer } from '../utils/adapter.js';

const HTTPRequestsMethod = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

export default class BasedApi {

  getData(path) {
    const url = SERVER_ADDRESS + path;
    const headers = new Headers();
    headers.append('Authorization', AUTHORIZATION_VALUE);

    return fetch(url, {
      method: HTTPRequestsMethod.GET,
      body: null,
      headers,
    }).then(this._hasOkStatus)
      .then(this._toJSON)
      .catch(BasedApi.catchError);
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
      .then(this._toJSON)
      .catch(BasedApi.catchError);
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
      .then(this._toJSON)
      .catch(BasedApi.catchError);
  }

  deleteData(path) {
    const url = SERVER_ADDRESS + path;
    const headers = new Headers();
    headers.append('Authorization', AUTHORIZATION_VALUE);

    return fetch(url, {
      method: HTTPRequestsMethod.DELETE,
      body: null,
      headers,
    }).then(this._hasOkStatus)
      .catch(BasedApi.catchError);
  }

  sync(path, data) {

    const url = SERVER_ADDRESS + path;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', AUTHORIZATION_VALUE);

    return fetch(url, {
      method: HTTPRequestsMethod.POST,
      body: JSON.stringify(data),
      headers,
    }).then(this._hasOkStatus)
      .then(this._toJSON)
      .catch(BasedApi.catchError);
  }

  _toJSON(response) {
    return response.json();
  }

  _hasOkStatus(response) {
    if (!response.ok) {
      throw new Error(`${ErrorMessage.ERROR_STATUS} ${response.status}`);
    }

    return response;
  }

  static catchError(err) {
    throw err;
  }
}
