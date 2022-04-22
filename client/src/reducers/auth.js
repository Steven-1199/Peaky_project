import {
  AUTH,
  LOGOUT,
  START_USER_LOADING,
  END_USER_LOADING,
} from "../constant/actionTypes";

export default (auth = { authData: null, isUserLoading: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...auth, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...auth, authData: null };
    case START_USER_LOADING:
      return { ...auth, isUserLoading: true };
    case END_USER_LOADING:
      return { ...auth, isUserLoading: false };

    default:
      return auth;
  }
};
