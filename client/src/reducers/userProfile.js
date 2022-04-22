import { GETPROFILE, REMOVEUSER } from "../constant/actionTypes";

export default (userProfile = {}, action) => {
  switch (action.type) {
    case GETPROFILE:
      return action.payload;
    case REMOVEUSER:
      return null;
    default:
      return userProfile;
  }
};
