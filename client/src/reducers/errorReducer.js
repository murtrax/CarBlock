// Importing error action from types.js
import { GET_ERRORS } from "../actions/types";

// Defining the initial state
const initialState = {};

// Function that defines how states should change beased on the actions by using a SWITCH statement.
// Note that this function is for errors, authentication will be dealt in authReducer.js!
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}