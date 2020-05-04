// Importing tokens
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Importing action definitions from types.js
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register Workshop
export const registerWorkshop = (userData, history) => (dispatch) => {
  axios
    .post("/workshopSignUp", userData)
    .then((res) => {
      console.log(res.data);
      history.push("/login");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/signup", userData)
    .then((res) => {
      history.push("/login");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  let path = "/login";
  if (userData.typeOfUser == "Workshop") {
    path = "/login";
  }
  if (userData.typeOfUser == "Public User") {
    path = "/login";
  }
  if (userData.typeOfUser == "Registration Auth") {
    //path = "/regLogin";
    path = "/login";
  }
  axios
    .post(path, userData)
    .then((res) => {
      // ------- Save to localStorage ---------
      // Set token to localStorage
      const { token } = res.data;
      console.log(token);
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = (history) => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);

  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  history.push("/login");
};
