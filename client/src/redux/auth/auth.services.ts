
import BaseHttpService from '../services/http.service';
import { Dispatch, AnyAction, Action } from 'redux';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './auth.types';
import jwt_decode from 'jwt-decode';

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
export default class AuthService extends BaseHttpService {
  register = (userData: I_RegisterData, history: any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      await this.post(`auth/register`, userData);
      history.pushState("/login")
    } catch (err) {
      dispatch(this.setErrors(err))
    }
  }
  login = (loginData: I_LoginData) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      const res = await this.post(`auth/login`, loginData);
      //@ts-ignore
      this.saveAccessToken(res.data.token);
      //@ts-ignore
      const decoded: I_Decoded = this.decodeToken(res.data.token);
      dispatch(this.setCurrentUser(decoded.email));
    } catch (err) {
      dispatch(this.setErrors(err))
    }
  }
  getUserDetails = async (dispatch: Dispatch<Action>) => {
    try {
      //@ts-ignore
      const user: ResponseData = await this.get(`auth/user-details`);
      return user.data;
    } catch (err) {
      return dispatch(this.setErrors(err))
    }
  }
  logOut = (dispatch: Dispatch<AnyAction>) => {
    this.removeAccessToken();
    dispatch(this.setCurrentUser({}));
  }

  setUser = (data: any) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(this.setCurrentUser(data));
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

  setErrors = (err: any) => {
    return {
      type: GET_ERRORS,
      payload: err.response.data
    };
  };

  setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
}
