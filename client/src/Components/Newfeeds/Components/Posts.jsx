import React from "react";
import Post from "./Post.jsx";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";

const Posts = ({ setUpdatePostData }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  return isLoading ? (
    <div className="flex justify-center mt-8 items-center">
      <ReactLoading
        type={"spin"}
        color={"rgb(96 165 250)"}
        height={100}
        width={100}
      />
    </div>
  ) : (
    <div className="mt-[1rem] flex flex-col gap-[1rem]">
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          setUpdatePostData={setUpdatePostData}
        />
      ))}
    </div>
  );
};

export default Posts;
