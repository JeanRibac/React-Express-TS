import { GET_ERRORS } from "./auth.types";

const initialState = {};

interface Action {
  payload?: any
  type: string
}

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}