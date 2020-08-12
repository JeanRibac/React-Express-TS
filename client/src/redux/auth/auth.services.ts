
import BaseHttpService from '../services/http.service';
import { SET_CURRENT_USER, USER_LOADING } from './auth.types';
import jwt_decode from 'jwt-decode';
// import store from '../store';


interface I_LoginData {
  email: string,
  password: string
}
interface I_RegisterData extends I_LoginData {
  confirmedPassword: string
}
interface I_Decoded {
  email: string
}

interface ResponseData {
  data: {}
}
class AuthService extends BaseHttpService {

  register = async (userData: I_RegisterData) => {
    try {
      await this.post(`auth/register`, userData);
    } catch (err) {
      // dispatch(this.setErrors(err))
    }
  }
  login = async (loginData: I_LoginData) => {
    try {
      const res = await this.post(`auth/login`, loginData);
      //@ts-ignore
      this.saveAccessToken(res.data.token);
      //@ts-ignore
      const decoded: I_Decoded = this.decodeToken(res.data.token);
      this.setUser(decoded.email);
    } catch (err) {
      // dispatch(this.setErrors(err))
    }
  }
  getUserDetails = async () => {
    try {
      //@ts-ignore
      const user: ResponseData = await this.get(`auth/user-details`);
      return user.data;
    } catch (err) {
      // return dispatch(this.setErrors(err))
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

  private setCurrentUser = (decoded: any) => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
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
