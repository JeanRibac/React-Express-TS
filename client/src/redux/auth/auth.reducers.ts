import {
  SET_CURRENT_USER,
  USER_LOADING
} from "./auth.types";

import isEmpty from "is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

interface I_Action {
  payload?: any
  type?: string
}

export default function (state = initialState, action: I_Action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}