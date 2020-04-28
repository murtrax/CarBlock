// Importing two of our actions from types.js required for authentication purposes.
import {
    SET_CURRENT_USER,
    USER_LOADING
  } from "../actions/types";

  // Defining the initial state
  const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
  };

  // Function that defines how states should change based on the actions by using a SWITCH statement.
  // Note that this function is for authentication, errors will be dealt in errorReducer.js!
  export default function(state = initialState, action) {
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