import axios, { AxiosResponse } from 'axios';
import { GET_ERRORS } from '../auth/auth.types';
import store from '../store';

export default class BaseHttpService {
  protected BASE_URL = '/api';
  protected _accessToken = ""
  protected dispatch = store.dispatch;

  async get(endpoint: string, options = {}) {
    //add to the options object the auth token with the _getCommonOptions()
    Object.assign(options, this._getCommonOptions());
    return axios.get(`${this.BASE_URL}/${endpoint}`, options)
      .catch(error => this._handleHttpError(error));
  }

  async post(endpoint: string, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions());
    try {
      const result = await axios.post(`${this.BASE_URL}/${endpoint}`, data, options)
      return result;
    } catch (error) {
      return this._handleHttpError(error)
    }
  }

  async delete(endpoint: string, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.delete(`${this.BASE_URL}/${endpoint}`, options)
      .catch(error => this._handleHttpError(error));
  }

  async patch(endpoint: string, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios.patch(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch(error => this._handleHttpError(error));
  }

  _handleHttpError(error: { response: { data: {}; }; }) {
    const { data } = error.response;
    // 401 request has been made with wrong credentials
    // if (status !== 401) {
    //   this.setErrors(data)
    // } else {
    //   console.log(error)
    // }
    return store.dispatch(this.setErrors(data))
  }

  _getCommonOptions() {
    const token = this.loadAccessToken();

    return {
      headers: {
        authorization: `${token}`,
      },
    };
  }

  setErrors = (err: any) => {
    return {
      type: GET_ERRORS,
      payload: err
    };
  };

  setAccessToken(accessToken: any) {
    return this._accessToken = accessToken
  }

  get getAccessToken() {
    return this._accessToken ? this._accessToken : this.loadAccessToken();
  }

  saveAccessToken(token: string) {
    if (token) {
      this.setAccessToken(token);
      this.setAuthToken(token)
      return localStorage.setItem('token', token);
    }
    return null
  }

  setAuthToken = (token: string | null) => {
    if (token) {
      // Apply authorization token to every request if logged in
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  loadAccessToken() {
    const token = localStorage.getItem("token")
    this.setAccessToken(token);
    return token;
  }

  removeAccessToken() {
    localStorage.removeItem('token');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    this.setAuthToken(null)
  }
}
