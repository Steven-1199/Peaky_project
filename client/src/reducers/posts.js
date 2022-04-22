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
  FETCH_POST,
  FETCH_COMMENT,
  FETCH_CATEGORY_POSTS,
} from "../constant/actionTypes";

export default (state = { posts: [], isLoading: true }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return { ...state, post: action.payload.data };
    case FETCH_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id == +action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case FETCH_SEARCH_POST:
      return {
        ...state,
        posts: action.payload.data,
      };
    case FETCH_CATEGORY_POSTS:
      return {
        ...state,
        categoryPosts: action.payload.data,
      };
    case FETCH_USER_POST:
      return { ...state, posts: action.payload.data };
    case CREATE:
      return { ...state, posts: [action.payload, ...state.posts] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};
