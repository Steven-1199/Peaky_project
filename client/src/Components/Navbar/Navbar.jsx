import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import editIcon from "../../assets/edit.png";
import homeIcon from "../../assets/home.png";
import userIcon from "../../assets/user.png";
import menuIcon from "../../assets/menu.png";
import "./navbar.css";
import decode from "jwt-decode";
import { REMOVEUSER } from "../../constant/actionTypes";
import { searchPost } from "../../actions/posts";

const Navbar = () => {
  const [selected, setSelected] = useState(true);
  const [searchInput, setSearchInput] = useState({ input: "" });
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.userProfile);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
    dispatch({ type: REMOVEUSER });
  };

  const capitalize = (name) => {
    return name
      ? String(
          name.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        ).replaceAll(",", " ")
      : "";
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [auth]);

  return (
    <div className="sticky top-0 l-0 r-0 bg-white z-10">
      <div className="navbar w-full bg-base-100 flex justify-between min1225:px-[180px] s810:pr-[20px] shadow-lg max400:px-0">
        <div className="max600:hidden">
          <Link
            to="/posts"
            className="btn btn-ghost normal-case text-5xl max620:text-4xl"
          >
            PEAKY
          </Link>
        </div>
        <div className="flex gap-[40px] max600:justify-between max600:w-[100%] max600:px-[6px]">
          <div className="form-control">
            <form className="input-group ">
              <input
                type="text"
                placeholder="Search…"
                value={searchInput.input}
                className="input input-bordered min810:w-[20rem] max620:w-[8rem]"
                onChange={(e) => setSearchInput({ input: e.target.value })}
              />
              <button
                type="submit"
                className="btn btn-square bg-[#1f2937]"
                onClick={async (e) => {
                  e.preventDefault();
                  await dispatch(searchPost(searchInput.input));
                  navigate(`/posts/search?searchWord=${searchInput.input}`);
                  setSearchInput({ input: "" });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
          {/*For Phone Screen-start*/}
          <div className="border-[3px] border-[#1f2937] min600:hidden max510:border-[2px] max400:px-0">
            <Link
              to="/posts"
              className="btn btn-ghost normal-case text-5xl max620:text-4xl max510:text3xl max400:text-2xl max400:px-[10px]"
            >
              P
            </Link>
          </div>
          {/* <div className="dropdown dropdown-end min600:hidden">
            <label
              tabIndex="0"
              className="btn btn-ghost rounded-btn max400:pl-0 max400:pr-1"
            >
              <div className="w-[2rem]">
                <img src={menuIcon} />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-48 mt-4"
            >
              <li>
                <Link to="/posts" className="flex justify-end items-end">
                  <p className="text-[1.1rem]">Home</p>
                </Link>
              </li>
              <li className="">
                <a className="flex justify-center items-center btn btn-outline p-0 m-0">
                  <p className="text-[1.1rem]">Profile</p>
                  <div className="w-[2rem] rounded-full avatar online border-[1px] border-black p-[6px] flex justify-center items-center">
                    <img src={userIcon} />
                  </div>
                </a>
              </li>
            </ul>
          </div>*/}
          {user ? (
            <div className="dropdown dropdown-end min600:hidden">
              <label
                tabIndex="0"
                className="w-fit flex items-center gap-1 cursor-pointer hover:bg-[#3D4451]/20 p-2 rounded-xl "
              >
                <div className="w-[2rem]">
                  <img src={menuIcon} />
                </div>
              </label>
              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to={`/ProfilePage/${user?.result?._id}`}
                    className="justify-between"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={`/ProfilePage/${user?.result?._id}/EditProfile`}>
                    Settings
                  </Link>
                </li>
                <li>
                  <a onClick={logout}>LogOut</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="./signInPage"
              className="btn btn-active hover:text-[#CCCCCC]  min600:hidden"
            >
              Sign In
            </Link>
          )}
          {/*For Phone Screen--end*/}
          <div className="flex gap-[0.9rem] max600:hidden">
            <Link to="/" className="w-[2rem] cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-full w-full opacity-[1] svg_active ${
                  location.pathname === "/" || location.pathname === "/posts"
                    ? "isActive"
                    : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="rgba(82 87 93)"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex="0"
                  className="w-fit flex items-center gap-1 cursor-pointer hover:bg-[#3D4451]/20 p-2 rounded-xl "
                >
                  <div className="w-12 rounded-full text-center avatar online">
                    {user?.result?.profilePicture ? (
                      <img
                        src={user?.result?.profilePicture}
                        className="mask mask-circle"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-fit w-fit"
                        viewBox="0 0 20 20"
                        fill="#52575d"
                        fillOpacity="0.7"
                        strokeWidth="4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-black font-medium">
                    {capitalize(user?.result?.name)}
                  </p>
                </label>
                <ul
                  tabIndex="0"
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link
                      to={`/ProfilePage/${user?.result?._id}`}
                      className="justify-between"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to={`/ProfilePage/${user?.result?._id}/EditProfile`}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <a onClick={logout}>LogOut</a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="./signInPage"
                className="btn btn-active hover:text-[#CCCCCC]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
