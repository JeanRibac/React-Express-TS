
import BaseHttpService from '../services/http.service';
import { SET_CURRENT_USER, USER_LOADING } from './auth.types';
import jwt_decode from 'jwt-decode';
import { I_RegisterData, I_LoginData, I_Decoded, I_ResponseData } from '../Interfaces';

class AuthService extends BaseHttpService {

  register = async (userData: I_RegisterData) => {
    try {
      await this.post(`auth/register`, userData);
    } catch (err) { }
  }
  login = async (loginData: I_LoginData) => {
    try {
      const res = await this.post(`auth/login`, loginData);
      //@ts-ignore
      this.saveAccessToken(res.data.token);
      //@ts-ignore
      const decoded: I_Decoded = this.decodeToken(res.data.token);
      this.setUser(decoded.email);
    } catch (err) { }
  }
  getUserDetails = async () => {
    try {
      //@ts-ignore
      const user: I_ResponseData = await this.get(`auth/user-details`);
      this.setUser(user.data)
      return user.data;
    } catch (err) {
      return null
    }
  }
  logOut = () => {
    this.removeAccessToken();
    this.dispatch(this.setCurrentUser({}));
  }

  setUser = (data: any) => {
    this.dispatch(this.setCurrentUser(data));
  }

  private setCurrentUser = (data: any) => {
    return {
      type: SET_CURRENT_USER,
      payload: data
    };
  };

  decodeToken(token: string) {
    return jwt_decode(token);
  }

  setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
}

export default new AuthService();
