import React, { useEffect, useState } from "react";
import {
  deletePost,
  getPosts,
  updatedLikePost,
  getPostUser,
} from "../../../actions/posts";
import { getUser } from "../../../actions/userProfile";

import emptyProfile from "../../../assets/emptyProfile.png";
import pic from "../../../assets/pic.jpg";
import deleteIcon from "../../../assets/delete.png";
import starIcon from "../../../assets/star.png";
import commentIcon from "../../../assets/comment.png";
import moreIcon from "../../../assets/more.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

import moment from "moment";
const Post = ({ post, setUpdatePostData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(true);
  const auth = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isCategory, setIsCategory] = useState(
    location.pathname.includes("CategoryPage")
  );

  const capitalize = (name) => {
    return name
      ? String(
          name.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        ).replaceAll(",", " ")
      : "";
  };
  useEffect(() => {
    if (post?.likes?.length > 0) {
      if (
        post.likes.find(
          (like) =>
            like === user?.result?.googleId || like === user?.result?._id
        )
      ) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    } else {
      setIsLike(false);
    }
  }, [post.likes?.length, user, location, auth, posts]);

  return (
    <div>
      <div className="card rounded-md w-full bg-base-100 shadow-lg p-[1rem] flex gap-[1rem]">
        <div className="flex justify-between">
          <div className="flex gap-[5px] items-center">
            <Link
              to={`/ProfilePage/${post.creatorId}`}
              className="rounded-full  border-[1px] border-white flex justify-center items-center cursor-pointer w-[2.5rem] h-[2.5rem] overflow-hidden bg-white"
            >
              <img
                src={
                  post.creator?.profilePicture
                    ? post.creator?.profilePicture
                    : emptyProfile
                }
                className="mask mask-circle"
              />
            </Link>
            <div className="leading-[19px]">
              <Link to={`/ProfilePage/${post.creatorId}`}>
                <h1 className="font-medium cursor-pointer">
                  {capitalize(post.creator.name)}
                </h1>
              </Link>
              <p className="text-[#52575d]/70 text-[12px]">
                {moment(post.createAt).fromNow()}
              </p>
            </div>
          </div>
          {post.creatorId === user?.result?.googleId ||
          (post.creatorId === user?.result?._id && !isCategory) ? (
            <div className="btn btn-ghost btn-sm btn-circle">
              <img
                src={moreIcon}
                className="w-[1.1rem]"
                onClick={() => {
                  setUpdatePostData(post);
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="leading-[1.7rem]">
          <Link
            to={`/post/${post._id}`}
            className="font-extrabold hover:underline underline-offset-2"
          >
            {post.title}
          </Link>

          <p className="font-[300]">{post.message}</p>
        </div>
        <div>
          <img
            src={post.selectedFile}
            onClick={() => console.log(typeof post.selectedFile)}
          ></img>
          <p className="text-[#52575d]/70 italic max400:text-[12px]">
            tags: {post.tags}
          </p>
        </div>
        <div className="flex gap-[20px] text-[#52575d]/70">
          <p>{post.likes.length} likes</p>
          <p>{post.comments?.length} comments</p>
        </div>
        <div
          className={`flex ${
            isCategory ? "justify-center" : "justify-between"
          } border-y-[2px]`}
        >
          <div
            className={`flex gap-[8px] items-center btn btn-ghost rounded-none justify-center ${
              isLike ? "border-0 border-y-2 border-[#4506CB]" : ""
            } max420:btn-sm ${isCategory ? "hidden" : ""}`}
            onClick={() => {
              if (user) {
                dispatch(updatedLikePost(post._id));
              } else {
                navigate("/SignInPage");
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={`${isLike ? "#4506CB" : "#808080"}`}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <p
              className={` font-medium text-[1.1rem] ${
                isLike ? "text-[#4506CB]" : "text-[#52575d]/70"
              } max420:text-[0.9rem]`}
            >
              Like
            </p>
          </div>

          <Link
            to={`/post/${post._id}`}
            className="flex gap-[8px] items-center btn btn-ghost rounded-none justify-center  max420:btn-sm"
          >
            <img src={commentIcon} className="w-[1.5rem] max420:w-[1.1rem]" />
            <p className="text-[#52575d]/70 font-medium text-[1.1rem] max420:text-[0.9rem]">
              Comment
            </p>
          </Link>
          {post.creatorId === user?.result?.googleId ||
          post.creatorId === user?.result?._id ? (
            <div
              className={`flex gap-[8px] items-center btn btn-ghost rounded-none justify-center max420:btn-sm ${
                isCategory ? "hidden" : ""
              }`}
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            >
              <img src={deleteIcon} className="w-[1.5rem] max420:w-[1.1rem]" />
              <p className="text-[#52575d]/70 font-medium text-[1.1rem] max420:text-[0.9rem]">
                Delete
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
