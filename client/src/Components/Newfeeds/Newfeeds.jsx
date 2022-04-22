import React, { useState, useEffect } from "react";
import menuIcon from "../../assets/menu.png";
import Form from "./Components/Form.jsx";
import Posts from "./Components/Posts.jsx";
import Pagination from "./Components/Pagination.jsx";

import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../actions/posts";

const Newfeeds = () => {
  const [updatePostData, setUpdatePostData] = useState(null);
  const [isProfilePage, setIsProfilePage] = useState(false);
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [searchWord, setSearchWord] = useSearchParams();
  const { isLoading } = useSelector((state) => state.posts);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.split("/").includes("ProfilePage")) {
      setIsProfilePage(true);
    } else {
      setIsProfilePage(false);
    }

    if (location.pathname.split("/").includes("search")) {
      setIsSearchPage(true);
    }
  }, [location]);
  return (
    <div
      className={`${
        isProfilePage
          ? "w-[600px] mt-2 max400:w-[370px]"
          : "min-w-[600px] min-h-[150vh] max1225:px-[1rem]  px-[2rem] max1225:w-[600px] max1140:min-w-[600px] max920:min-w-[550px] max830:min-w-[500px] max640:min-w-full max400:min-w-[355px] min1225:w-[800px] max640:px-[1rem] max400:p-[0.5rem] "
      }`}
    >
      {isSearchPage ? (
        <h1 className="text-[#52575d]/70 italic max400:text-[12px] text-[1.5rem]">
          Search for: {searchWord.get("searchWord")}
        </h1>
      ) : (
        <Form
          updatePostData={updatePostData}
          setUpdatePostData={setUpdatePostData}
        />
      )}
      <Posts setUpdatePostData={setUpdatePostData} />
      {location.pathname.split("/").includes("posts") &&
      !location.pathname.split("/").includes("search") ? (
        <div className="flex justify-center pt-[40px] pb-[30px]">
          <Pagination />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Newfeeds;
