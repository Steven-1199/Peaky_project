import React, { useEffect } from "react";
import Category from "../Components/Category/Category";
import { useSearchParams } from "react-router-dom";
import technologyBackground from "../assets/technologyBackground.jpg";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Components/Newfeeds/Components/Post";
import ReactLoading from "react-loading";
import { getCategoryPosts } from "../actions/posts";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryPosts, isLoading, posts } = useSelector(
    (state) => state.posts
  );
  //console.log(posts);
  useEffect(() => {
    dispatch(getCategoryPosts(searchParams.get("name")));
  }, [posts]);

  return (
    <div>
      <div className="flex justify-center gap-[6px] max1225:gap-[20px] mt-[1rem] px-[1rem] items-start max640:px-0">
        <Category />
        <div className="w-[800px] flex flex-col items-center max830:w-[450px] max780:w-[400px]">
          <div className="w-[100%] flex justify-center h-[250px] overflow-hidden max830:h-[150px]">
            <div className="w-[50%] ">
              <img src={technologyBackground} />
            </div>
            <div className="w-[50%] flex justify-center items-center font-extrabold text-[3rem] bg-gray-100 text-center	p-4 max830:text-[1.5rem]">
              <h1 className="uppercase break-all">
                {searchParams.get("name").replace(",", " / ")}
              </h1>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center mt-8 items-center">
              <ReactLoading
                type={"spin"}
                color={"rgb(96 165 250)"}
                height={100}
                width={100}
              />
            </div>
          ) : categoryPosts?.data?.length === 0 ? (
            <div className="flex items-center gap-[3px] mt-[3rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#52575dd9"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
              <h1 className="font-medium text-[2rem] text-[#52575dd9]">
                NO POSTS
              </h1>
            </div>
          ) : (
            <div className="mt-[1rem] flex flex-col gap-[1rem] w-[600px] max830:w-[450px] max780:w-[400px]">
              {categoryPosts?.data?.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
