import React, { useEffect } from "react";
import Newfeeds from "../Components/Newfeeds/Newfeeds";
import Category from "../Components/Category/Category";
import ProfileCard from "../Components/ProfileCard/ProfileCard";
import { useDispatch } from "react-redux";

const HomePage = () => {
  return (
    <div className="flex justify-center gap-[6px] max1225:gap-[6px] mt-[1rem] px-[1rem] items-start max640:px-0 max780:gap-0">
      <Category />
      <Newfeeds className="justify-self-center" />
      <ProfileCard />
    </div>
  );
};

export default HomePage;
