import axios from "axios";
const f = "https://peaky-project.herokuapp.com";
const baseURLs = "http://localhost:5000";
const API = axios.create({
  baseURL: "https://peaky-project.herokuapp.com",
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchUserPosts = (id) => API.get(`/posts/user/${id}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (updatePostData) =>
  API.patch(`/posts/${updatePostData._id}`, updatePostData);

export const searchPosts = (searchWord) =>
  API.get(`/posts/search?searchWord=${searchWord}`);

export const deletePost = (deletePostId) =>
  API.delete(`/posts/${deletePostId}`);

export const updatedLikePost = (likePostId) =>
  API.patch(`/posts/${likePostId}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);

export const editProfile = (formData) =>
  API.patch("/user/editprofile", formData);

export const getProfile = (id) => API.get(`/user/getprofile/${id}`);

export const getPost = (id) => API.get(`/posts/post/${id}`);

export const fetchComments = (info, id) =>
  API.post(`/posts/post/${id}/comment`, info);

export const getCategoryPosts = (name) =>
  API.get(`/posts/category?name=${name}`);
