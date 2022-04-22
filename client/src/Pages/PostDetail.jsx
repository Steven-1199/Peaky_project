import React, { useEffect, useState, useRef } from "react";
import sample from "../assets/sample.png";
import { useParams } from "react-router-dom";
import { getPost } from "../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import moment from "moment";
import emptyProfile from "../assets/emptyProfile.png";
import { Comment } from "../Components/Comment";
import { getComment } from "../actions/posts";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const commentsRef = useRef();
  const [commentsx, setCommentsx] = useState(post?.comments);

  const handleComment = async () => {
    const info = { commentCreatorId: user?.result?._id, comment: comment };
    post?.comments.push({
      name: user?.result.name,
      profilePicture: user?.result.profilePicture,
      comment: comment,
      commentOwner: user?.result._id,
      commentAt: new Date(),
    });
    setCommentsx(post.comments);
    const data = dispatch(getComment(info, id));
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
    setComment("");
  };

  useEffect(() => {
    dispatch(getPost(id));
    setCommentsx(post?.comments);
  }, [id]);
  useEffect(() => {
    // dispatch(getPost(id));
    setCommentsx(post?.comments);
  }, [post]);
  if (isLoading || !post) {
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
    <div className="flex justify-center bg-zinc-300 min-h-[100vh]">
      <div className="w-[600px] flex flex-col bg-[#F2F2F2] shadow p-4 pb-12 max400:w-[400px]">
        <div className="border-b border-gray-300 py-4">
          <h1 className="font-extrabold text-[1.1rem]">{post?.title}</h1>
        </div>
        {post?.message && (
          <div>
            <p className="font-[300] text-black mt-4">{post?.message}</p>
          </div>
        )}
        {post?.selectedFile && (
          <div className=" flex justify-center mt-[20px]">
            <img src={post?.selectedFile} className="w-[90%]" />
          </div>
        )}
        <div className="flex justify-end my-4">
          <div className="stats shadow bg-blue-400/20 ">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    <img
                      src={
                        post.creator?.profilePicture
                          ? post.creator?.profilePicture
                          : emptyProfile
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="stat-title text-xs">Post by</div>
              <div className="">
                <h2 className="font-bold text-sm">{post?.creator?.name}</h2>
              </div>
              <div className="stat-desc text-secondary">
                {moment(post?.createAt).format("MMMM Do YYYY")}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 py-2 flex flex-col">
          <h3 className="font-bold">Comment</h3>
          <div className="w-[500px] flex flex-col items-end gap-[10px] max400:w-[300px]">
            <textarea
              className="textarea textarea-bordered w-[500px] h-[100px] mt-4 max400:w-[300px]"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button onClick={handleComment} className="btn btn-sm">
              Post
            </button>
          </div>
        </div>

        <div>
          {commentsx
            ? commentsx?.map((e, i) => <Comment props={e} key={i} />)
            : post?.comments?.map((e, i) => <Comment props={e} key={i} />)}
          <div ref={commentsRef} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
