import React, { useState } from "react";
import FileBase from "react-file-base64";
import { editprofile } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "../actions/userProfile";
import { useParams } from "react-router-dom";
import { getPostUser } from "../actions/posts";

const EditProfilePage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();

  const [editData, setEditData] = useState({
    initialEmail: user?.result?.email,
    userName: "",
    email: "",
    password: "",
    profilePicture: "",
    coverPicture: "",
  });
  const { id } = useParams();

  return (
    <div className={`${id === user.result._id ? "" : "hidden"}`}>
      <ToastContainer />
      <div className="w-[600px] bg-white min-h-[30vh] card rounded-md my-2 p-4 max400:w-[370px]">
        <h1 className="font-bold">PICTURE</h1>

        <div
          tabIndex="0"
          className="collapse collapse-arrow px-4 border-base-300 bg-base-100 border border-x-0 border-t-0"
        >
          <input type="checkbox" className="peer" />

          <div className="collapse-title ">Upload profile picture</div>
          <div className="collapse-content text-sm flex">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setEditData({ ...editData, profilePicture: base64 });
              }}
            />
            <div
              className="btn btn-sm btn-primary btn-active hover:text-[#CCCCCC]"
              onClick={async () => {
                try {
                  if (!editData.profilePicture) {
                    return toast.error("Plese select a picture");
                  }
                  await dispatch(editprofile(editData));

                  dispatch(getUser(id));
                  dispatch(getPostUser(id));
                } catch (err) {
                  toast.error("Something's Wrong, please try again");
                }
              }}
            >
              save
            </div>
          </div>
        </div>
        <div tabIndex="0" className="collapse collapse-arrow px-4">
          <input type="checkbox" className="peer" />
          <div className="collapse-title ">Upload cover picture</div>
          <div className="collapse-content text-sm flex">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setEditData({ ...editData, coverPicture: base64 });
              }}
            />
            <div
              className="btn btn-sm btn-primary btn-active hover:text-[#CCCCCC]"
              onClick={async () => {
                try {
                  if (!editData.coverPicture) {
                    return toast.error("Plese select a picture");
                  }
                  await dispatch(editprofile(editData));

                  dispatch(getUser(id));
                  dispatch(getPostUser(id));
                } catch (err) {
                  toast.error("Something's Wrong, please try again");
                }
              }}
            >
              save
            </div>
          </div>
        </div>

        <h1 className="font-bold mt-4">ABOUT</h1>
        <div
          tabIndex="0"
          className="collapse collapse-arrow border border-base-300 bg-base-100 border-y-0 border-x-0 px-4"
        >
          <div className="collapse-title ">User Name</div>
          <input type="checkbox" className="peer" />

          <div className="collapse-content flex items-center justify-between">
            <textarea
              name="userName"
              type="text"
              className="textarea bg-[#cccccc]/30 h-[3rem] resize-none py-[7px] overflow-hidden max640:h-[2.8rem] break-normal textarea-bordered"
              placeholder="User Name"
              value={editData.userName}
              onChange={(e) =>
                setEditData({ ...editData, userName: e.target.value })
              }
            />
            <div
              className="btn btn-sm btn-primary btn-active hover:text-[#CCCCCC]"
              onClick={async () => {
                try {
                  if (!editData.userName) {
                    return toast.error("Plese type username");
                  }
                  await dispatch(editprofile(editData));

                  dispatch(getUser(id));
                  dispatch(getPostUser(id));
                } catch (err) {
                  toast.error("Something's Wrong, please try again");
                }
              }}
            >
              save
            </div>
          </div>
        </div>
        <div
          tabIndex="0"
          className="collapse collapse-arrow border border-base-300 bg-base-100 border-b-0 border-x-0 px-4"
        >
          <input type="checkbox" className="peer" />

          <div className="collapse-title">Email Address</div>
          <div className="collapse-content flex items-center justify-between">
            <textarea
              name="email"
              type="text"
              className="textarea bg-[#cccccc]/30 h-[3rem] resize-none py-[7px] overflow-hidden max640:h-[2.8rem] break-normal textarea-bordered"
              placeholder="Email"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />
            <div
              className="btn btn-sm btn-primary btn-active hover:text-[#CCCCCC]"
              onClick={async () => {
                try {
                  if (!editData.email) {
                    return toast.error("Plese type your email");
                  }
                  await dispatch(editprofile(editData));

                  dispatch(getUser(id));
                  dispatch(getPostUser(id));
                } catch (err) {
                  toast.error("Something's Wrong, please try again");
                }
              }}
            >
              save
            </div>
          </div>
        </div>
        <div
          tabIndex="0"
          className="collapse collapse-arrow border border-base-300 bg-base-100 border-b-0 border-x-0 px-4"
        >
          <input type="checkbox" className="peer" />

          <div className="collapse-title">Password</div>
          <div className="collapse-content flex items-center justify-between">
            <textarea
              name="password"
              type="text"
              className="textarea bg-[#cccccc]/30 h-[3rem] resize-none py-[7px] overflow-hidden max640:h-[2.8rem] break-normal textarea-bordered"
              placeholder="Password"
              value={editData.password}
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
            />
            <div
              className="btn btn-sm btn-primary btn-active hover:text-[#CCCCCC]"
              onClick={async () => {
                try {
                  if (!editData.password) {
                    return toast.error("Plese type password");
                  }
                  await dispatch(editprofile(editData));

                  dispatch(getPostUser(id));
                } catch (err) {
                  toast.error("Something's Wrong, please try again");
                }
              }}
            >
              save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
