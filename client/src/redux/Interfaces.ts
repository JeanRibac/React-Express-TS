export interface I_State {
  auth: {
    isAuthenticated?: boolean,
    loading?: boolean,
    user: {}
  }
  errors: {}
}
export interface I_Action {
  payload?: any
  type?: string
}
export interface I_LoginData {
  email: string,
  password: string
}
export interface I_RegisterData extends I_LoginData {
  confirmedPassword: string
}
export interface I_Decoded {
  email: string
}
export interface I_ResponseData {
  data: {}
}
export interface I_Auth {
  isAuthenticated: boolean;
  user: I_User;
  loading: boolean;
}

export interface I_User {
  email: string;
  postings: [];
}
export interface Props { }
