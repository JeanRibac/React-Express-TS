import { GET_ERRORS } from "./auth.types";
import { I_Action } from "../Interfaces";

const initialState = {};

export default function (state = initialState, action: I_Action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}