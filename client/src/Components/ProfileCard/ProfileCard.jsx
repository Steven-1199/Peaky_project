import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import emptyProfile from "../../assets/emptyProfile.png";
import { useState, useEffect } from "react";

const ProfileCard = () => {
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState(auth.authData);
  const capitalize = (name) => {
    return name
      ? String(
          name.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        ).replaceAll(",", " ")
      : "";
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [auth]);

  return (
    <div className={`sticky top-[80px] max640:hidden ${user ? "" : "hidden"}`}>
      <div className="card w-[300px] max1250:hidden glass rounded-md">
        <figure className="h-[250px] bg-[#303640]/50">
          <img
            src={`${
              user?.result?.coverPicture ? user?.result?.coverPicture : ""
            }`}
            className="h-[100%]"
          />
        </figure>
        <div className="card-body indicator w-full">
          <div className="mb-[1rem]">
            <img
              src={`${
                user?.result?.profilePicture
                  ? user?.result?.profilePicture
                  : emptyProfile
              }`}
              className="indicator-item indicator-top indicator-center w-[6rem] rounded-xl"
            />
          </div>
          <h2 className="card-title">{capitalize(user?.result?.name)}</h2>
          <p>Welcom to Peaky Page!</p>
          <div className="card-actions justify-end p-2">
            <Link
              to={`/ProfilePage/${
                user?.result?._id ? user?.result?._id : user?.result?.googleId
              }`}
              className="btn btn-active rounded-3xl tracking-[1px] hover:text-[#CCCCCC]"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
