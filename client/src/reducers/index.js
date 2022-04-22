import { combineReducers } from "redux";
import posts from "./posts.js";
import auth from "./auth.js";
import userProfile from "./userProfile.js";

export default combineReducers({
  posts,
  auth,
  userProfile,
});
