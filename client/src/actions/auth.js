import {
  AUTH,
  LOGOUT,
  GETPROFILE,
  START_USER_LOADING,
  END_USER_LOADING,
} from "../constant/actionTypes";
import * as api from "../api/index.js";
import { ToastContainer, toast } from "react-toastify";

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const editprofile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_USER_LOADING });
    const { data } = await api.editProfile(formData);
    dispatch({ type: AUTH, data });
    dispatch({ type: GETPROFILE, payload: data.result });
    dispatch({ type: END_USER_LOADING });
  } catch (err) {
    console.log(err);
    toast.error("Something's Wrong, please try again");
  }
};
