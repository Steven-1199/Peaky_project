import React from "react";
import emptyProfile from "../assets/emptyProfile.png";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export const Comment = ({ props }) => {
  const { post, isLoading } = useSelector((state) => state.posts);

  const capitalize = (name) => {
    return name
      ? String(
          name.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        ).replaceAll(",", " ")
      : "";
  };
  /*if (isLoading) {
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
  }*/
  return (
    <div className="border-b border-gray-300 mt-4">
      <div className="flex gap-[5px] items-start">
        <div className="rounded-full  border-[1px] border-white flex justify-center items-center cursor-pointer w-[2.5rem] h-[2.5rem] overflow-hidden bg-white">
          <img
            src={props.profilePicture ? props.profilePicture : emptyProfile}
            className="mask mask-circle"
          />
        </div>
        <div className="leading-[19px] pt-1  w-[100%]">
          <div className="flex justify-between pr-12 mb-1 w-[100%]">
            <h1 className="font-medium cursor-pointer text-black">
              {capitalize(props.name)}
            </h1>
            <p className="text-[#52575d]/70 text-[12px]">
              {" "}
              {moment(props?.commentAt).format("MMMM Do YYYY")}
            </p>
          </div>
          <p className=" text-[14px] leading-5 tracking-wide">
            {props.comment}
          </p>
        </div>
      </div>
      <div className="px-12 pb-4 pt-1"></div>
    </div>
  );
};
