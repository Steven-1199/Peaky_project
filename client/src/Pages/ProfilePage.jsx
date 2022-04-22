import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import emptyProfile from "../assets/emptyProfile.png";
import { useState, useEffect, useLayoutEffect } from "react";
import Newfeeds from "../Components/Newfeeds/Newfeeds";
import EditProfilePage from "./EditProfilePage";
import { getUser } from "../actions/userProfile";
import { getPostUser } from "../actions/posts";
import ReactLoading from "react-loading";

const ProfilePage = () => {
  const auth = useSelector((state) => state.auth);
  const userProfile = useSelector((state) => state.userProfile);

  const { posts } = useSelector((state) => state.posts);

  const [user, setUser] = useState(auth.authData);
  const [name, setName] = useState("");

  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const capitalize = (name) => {
    return name
      ? String(
          name.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        ).replaceAll(",", " ")
      : "";
  };
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [auth]);

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getPostUser(id));
  }, [id]);
  if (auth.isUserLoading) {
    return (
      <div
        className={`w-full h-[100vh] fixed top-0 right-0 z-20 bg-[#cccccc]/[0.8] flex justify-center items-center max640:p-[2rem]`}
      >
        <ReactLoading
          type={"spin"}
          color={"rgb(96 165 250)"}
          height={100}
          width={100}
        />
      </div>
    );
  }
  return (
    <div className={`top-[80px] min-h-[100vh] `}>
      <div className="w-full flex justify-center bg-white/80 rounded-b-md">
        <div className="card w-[600px] glass rounded-none rounded-t-md h-[420px]">
          <figure className="h-[280px] bg-[#303640]/50 overflow-hidden ">
            <img
              className="w-full"
              src={userProfile?.coverPicture ? userProfile?.coverPicture : ""}
            />
          </figure>
          <div className="card-body indicator w-full h-fit ">
            <div className="mb-[1rem] overflow-hidden bg-white max400:mb-[2rem]">
              <img
                src={
                  userProfile?.profilePicture
                    ? userProfile?.profilePicture
                    : emptyProfile
                }
                className="indicator-item indicator-top indicator-center w-[9rem] h-[9rem]  rounded-xl"
              />
            </div>
            <h2 className="card-title max400:mb-[1rem] max400:mt-[0.5rem]">
              {capitalize(userProfile?.name)}
            </h2>
            <div className="tabs absolute bottom-0 left-[0]">
              <Link
                to={`/ProfilePage/${id}`}
                className={`tab tab-md tab-lifted ${
                  location.pathname.split("/").includes("EditProfile")
                    ? ""
                    : "tab-active"
                }`}
              >
                All Posts
              </Link>
              {user?.result?._id === id ? (
                <Link
                  to={`/ProfilePage/${id}/EditProfile`}
                  className={`tab tab-md tab-lifted flex gap-[5px] ${
                    location.pathname.split("/").includes("EditProfile")
                      ? "tab-active"
                      : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Profile
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {location.pathname.split("/").includes("EditProfile") ? (
          <EditProfilePage />
        ) : (
          <Newfeeds />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
