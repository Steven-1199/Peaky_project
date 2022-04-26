import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  UPDATE_LIKE,
  FETCH_SEARCH_POST,
  FETCH_USER_POST,
  START_LOADING,
  END_LOADING,
  START_USER_LOADING,
  END_USER_LOADING,
  FETCH_POST,
  FETCH_COMMENT,
  FETCH_CATEGORY_POSTS,
} from "../constant/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);
    // console.log(data);
    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
  //const action = { type: "FETCH_ALL", payload: [] };
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.getPost(id);
    dispatch({ type: FETCH_POST, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.updatePost(post);
    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await api.deletePost(postId);
    dispatch({ type: DELETE, payload: postId });
  } catch (err) {
    console.log(err);
  }
};

export const updatedLikePost = (likePostId) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  try {
    const { data } = await api.updatedLikePost(likePostId, user?.token);
    // console.log(data);
    dispatch({ type: UPDATE_LIKE, payload: data.updatedLikePost });
  } catch (err) {
    console.log(err);
  }
};

export const searchPost = (searchWord) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.searchPosts(searchWord);
    dispatch({ type: FETCH_SEARCH_POST, payload: { data: data.post } });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getPostUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_USER_LOADING });
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchUserPosts(id);
    //console.log(data.posts);
    dispatch({ type: FETCH_USER_POST, payload: { data: data.posts } });
    dispatch({ type: END_USER_LOADING });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getComment = (info, id) => async (dispatch) => {
  //console.log(info);
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.fetchComments(info, id);
    dispatch({ type: FETCH_COMMENT, payload: data });
    //dispatch({ type: END_LOADING });
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getCategoryPosts = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.getCategoryPosts(name);
    // console.log(data);
    dispatch({ type: FETCH_CATEGORY_POSTS, payload: { data: data } });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};
