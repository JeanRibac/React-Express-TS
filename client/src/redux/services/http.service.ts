import axios, { AxiosResponse } from 'axios';

export default class BaseHttpService {
  BASE_URL = '/api';
  _accessToken = ""

  async get(endpoint: string, options = {}) {
    //add to the options object the auth token with the _getCommonOptions()
    Object.assign(options, this._getCommonOptions());
    return axios.get(`${this.BASE_URL}/${endpoint}`, options)
      .catch(error => this._handleHttpError(error));
  }

  async post(endpoint: string, data = {}, options = {}): Promise<void | AxiosResponse<any>> {
    Object.assign(options, this._getCommonOptions());
    const result = await axios.post(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch(error => this._handleHttpError(error));
    return result;
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

  _handleHttpError(error: { response: { data: { statusCode: any; }; }; }) {
    const { statusCode } = error.response.data;
    // 401 request has been made with wrong credentials
    if (statusCode !== 401) {
      throw error;
    } else {
      console.log(error)
    }
  }

  _getCommonOptions() {
    const token = this.loadAccessToken();

    return {
      headers: {
        authorization: `${token}`,
      },
    };
  }

  setAccessToken(accessToken: any) {
    return this._accessToken = accessToken
  }

  get getAccessToken() {
    return this._accessToken ? this._accessToken : this.loadAccessToken();
  }

  saveAccessToken(token: string) {
    this.setAccessToken(token);
    if (token) {
      this.setAuthToken(token)
      return localStorage.setItem('token', token);
    }
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
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.setAuthToken(null)
  }
}
