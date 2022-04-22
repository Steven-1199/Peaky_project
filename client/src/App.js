import React, { useEffect, useState } from "react";
import { getPosts } from "./actions/posts.js";
import HomePage from "./Pages/HomePage.jsx";
import SignInPage from "./Pages/SignInPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import PostDetail from "./Pages/PostDetail.jsx";
import CategoryPage from "./Pages/CategoryPage.jsx";

import ProfilePage from "./Pages/ProfilePage.jsx";

import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./app.css";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "./actions/userProfile";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [auth]);

  return (
    <BrowserRouter>
      <div className="App p-0 m-0 bg-zinc-300 min-h-[100vh]">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate replace to="/posts" />} />
          <Route path="/posts" exact element={<HomePage />} />
          <Route path="/post/:id" exact element={<PostDetail />} />
          <Route path="/posts/search" exact element={<HomePage />} />
          <Route
            path="/SignInPage"
            exact
            element={user ? <Navigate replace to="/" /> : <SignInPage />}
          />
          <Route
            path="/SignUpPage"
            exact
            element={user ? <Navigate replace to="/" /> : <SignUpPage />}
          />
          <Route path="/ProfilePage/:id" element={<ProfilePage />} />
          <Route path="/CategoryPage" element={<CategoryPage />} />

          <Route
            path="/ProfilePage/:id/EditProfile"
            exact
            element={<ProfilePage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
