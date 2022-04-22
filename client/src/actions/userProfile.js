import * as api from "../api";
import {
  GETPROFILE,
  AUTH,
  START_USER_LOADING,
  START_LOADING,
  END_USER_LOADING,
  END_LOADING,
} from "../constant/actionTypes";

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_USER_LOADING });
    const { data } = await api.getProfile(id);
    //console.log(data);
    dispatch({ type: GETPROFILE, payload: data });
    dispatch({ type: END_USER_LOADING });
  } catch (err) {
    console.log(err.message);
  }
};
