import React from "react";
import { useState, useEffect } from "react";
import "./form.css";
import photoIcon from "../../../assets/photo.png";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../../actions/posts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Resizer from "react-image-file-resizer";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Form = ({ updatePostData, setUpdatePostData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [toggle, setToggle] = useState(false);
  const [hidePhotoIcon, setHidePhotoIcon] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const unique_id = uuid();

  const shrinkForm = () => {
    setToggle(false);
    setHidePhotoIcon(false);
    setUpdatePostData(null);
    postData.title = "";
    postData.message = "";
    postData.tags = "";
  };

  useEffect(() => {
    if (updatePostData) setPostData(updatePostData);
  }, [updatePostData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (postData.title) {
        if (updatePostData) {
          dispatch(updatePost({ ...postData }));
          shrinkForm();
        } else {
          dispatch(createPost({ ...postData }));
          shrinkForm();
        }
      } else if (!postData.title) {
        toast.error("Please fill in title");
      }
    } catch (err) {
      console.log(err);
      toast.error("Bad User Creditials");
    }
  };

  return toggle || updatePostData ? (
    <div
      className={`w-full h-[100vh] fixed top-0 right-0 z-20 bg-[#cccccc]/[0.8] flex justify-center items-center max640:p-[2rem]`}
    >
      <form
        className={`card rounded-md  bg-base-100 shadow-xl min-w-[700px] max1140:min-w-[600px] max920:min-w-[550px] max830:min-w-[500px] max640:min-w-full max400:min-w-[355px] min1225:w-[700px] relative`}
        onSubmit={handleSubmit}
      >
        <div className={`card-body p-[1.5rem] max640:p-[1rem]`}>
          <ToastContainer />
          <label
            className={`btn btn-sm btn-circle mb-[1rem]`}
            onClick={shrinkForm}
          >
            ✕
          </label>
          <textarea
            type="text"
            className={`input bg-[#cccccc]/30 break-words h-[6rem] break-all form-scrollbar resize-none py-[7px] max640:h-[2.8rem]`}
            placeholder="Share your story here..."
            name="title"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <textarea
            type="text"
            className={`input bg-[#cccccc]/30 break-words h-[4rem] break-all flex flex-wrap form-scrollbar resize-none py-[7px] max640:h-[5rem] max400:h-[4rem] cursor-auto`}
            placeholder="message(optional)"
            onClick={() => {
              //setToggle(true);
            }}
            name="message"
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <div className={`flex gap-[20px] max640:w-[60%] items-center`}>
            <textarea
              type="text"
              className="input bg-[#cccccc]/30 h-[3rem] resize-none py-[7px] overflow-hidden max640:h-[2.8rem] break-normal"
              placeholder="Tags"
              name="tags"
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value })
              }
            />
          </div>

          <div className="card-actions justify-end">
            {hidePhotoIcon ? (
              <div className="btn btn-ghost flex gap-[10px] max-w-[15rem] max830:btn-sm">
                {
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => {
                      setPostData({ ...postData, selectedFile: base64 });
                    }}
                  />
                }
              </div>
            ) : (
              <div
                className="btn btn-ghost flex gap-[10px] max-w-[15rem] max830:btn-sm"
                onClick={() => {
                  setHidePhotoIcon(true);
                  setToggle(true);
                }}
              >
                <img src={photoIcon} className="w-[1.5rem] max400:w-[1.3rem]" />
                <p className="max400:text-[12px]">Photo</p>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-[#570df8] max830:btn-sm max400:text-[12px]"
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div
      className={`${
        id === user?.result?._id || id === user?.result?.googleId
          ? ""
          : "hidden"
      } `}
    >
      <div className="card rounded-md w-full bg-base-100 shadow-xl">
        <div className={`card-body p-[1.5rem] max640:p-[1rem]`}>
          <textarea
            type="text"
            className={`input bg-[#cccccc]/30 break-words h-[6rem] break-all flex flex-wrap form-scrollbar resize-none py-[7px] max640:h-[5rem] max400:h-[4rem] ${
              toggle ? "cursor-auto" : "cursor-pointer"
            } `}
            placeholder="Share your story here..."
            onClick={() => {
              if (user) {
                setToggle(true);
              } else {
                navigate("/SignInPage");
              }
            }}
            name="message"
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />

          <div className="card-actions justify-end">
            <div
              className="btn btn-ghost flex gap-[10px] max-w-[15rem] max830:btn-sm"
              onClick={() => {
                if (user) {
                  setHidePhotoIcon(true);
                  setToggle(true);
                } else {
                  navigate("/SignInPage");
                }
              }}
            >
              <img src={photoIcon} className="w-[1.5rem] max400:w-[1.3rem]" />
              <p className="max400:text-[12px]">Photo</p>
            </div>

            <button
              className="btn btn-primary max830:btn-sm max400:text-[12px]"
              onClick={() => {
                if (user) {
                  setToggle(true);
                } else {
                  navigate("/SignInPage");
                }
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
