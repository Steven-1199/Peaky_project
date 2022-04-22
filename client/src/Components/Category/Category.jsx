import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryPosts } from "../../actions/posts";
import category from "../../assets/category.png";
import computer from "../../assets/computer.png";
import financial from "../../assets/financial.png";
import web from "../../assets/web.png";
import science from "../../assets/science.png";
import philosophy from "../../assets/philosophy.png";
import { useNavigate, useSearchParams } from "react-router-dom";

function Category() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState(auth.authData);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [auth]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = (e) => {
    dispatch(getCategoryPosts(e.target.id));
    navigate(`/CategoryPage?name=${e.target.id}`);
  };
  return (
    <div className="sticky top-[80px] max640:hidden">
      <div
        className={`text-[15px] card rounded-md flex flex-col ${
          user ? "w-[300px]" : "w-[400px]"
        }  py-[1rem]  max1225:w-[300px] max920:w-[100px] bg-white min-h-[90vh]`}
      >
        <div
          className={`flex gap-[10px]  cursor-pointer hover:bg-[#363940]/30 min-h-[3rem] items-center pl-[1rem] ${
            searchParams.get("name")
              ? ""
              : "bg-[#363940]/10 border-r-[6px] border-[#05386b] "
          } `}
        >
          <img src={category} className="w-[1.5rem] mask mask-squircle" />
          <p className=" text-[#52575d]/70">Category</p>
        </div>
        <div
          className={`flex pl-[1rem] gap-[10px] cursor-pointer hover:bg-[#363940]/30 min-h-[3rem] items-center relative ${
            searchParams.get("name") === "technology"
              ? "bg-[#363940]/10 border-r-[6px] border-[#05386b] shadow-inner"
              : ""
          }`}
          id="technology"
          onClick={handleClick}
        >
          <img
            src={computer}
            className="w-[1.5rem] mask mask-squircle pointer-events-none"
          />
          <p className="text-[#52575d]/70 pointer-events-none">Technology</p>
        </div>
        <div
          className={`flex gap-[10px] pl-[1rem] cursor-pointer hover:bg-[#363940]/30 min-h-[3rem] items-center ${
            searchParams.get("name") === "business,finance"
              ? "bg-[#363940]/10 border-r-[6px] border-[#05386b] shadow-inner"
              : ""
          }`}
          id="business,finance"
          onClick={handleClick}
        >
          <img
            src={financial}
            className="w-[1.5rem] mask mask-squircle pointer-events-none"
          />
          <p className="text-[#52575d]/70 pointer-events-none">
            Business and Finance
          </p>
        </div>
        <div
          className={`flex gap-[10px] pl-[1rem] cursor-pointer hover:bg-[#363940]/30 min-h-[3rem] items-center ${
            searchParams.get("name") === "entertainment"
              ? "bg-[#363940]/10 border-r-[6px] border-[#05386b] shadow-inner"
              : ""
          }`}
          id="entertainment"
          onClick={handleClick}
        >
          <img
            src={web}
            className="w-[1.5rem] mask mask-squircle pointer-events-none"
          />
          <p className="text-[#52575d]/70 pointer-events-none">Entertainment</p>
        </div>
        <div
          className={`flex gap-[10px] pl-[1rem] cursor-pointer hover:bg-[#363940]/30 min-h-[3rem] items-center ${
            searchParams.get("name") === "science,physic"
              ? "bg-[#363940]/10 border-r-[6px] border-[#05386b] shadow-inner"
              : ""
          }`}
          id="science,physic"
          onClick={handleClick}
        >
          <img
            src={science}
            className="w-[1.5rem] mask mask-squircle pointer-events-none"
          />
          <p className="text-[#52575d]/70 pointer-events-none">
            Science and Physic
          </p>
        </div>
        <div
          className={`flex gap-[10px] pl-[1rem] cursor-pointer hover:bg-[#363940]/30 min-h-[3rem] items-center ${
            searchParams.get("name") === "philosophy"
              ? "bg-[#363940]/10 border-r-[6px] border-[#05386b] shadow-inner"
              : ""
          }`}
          id="philosophy"
          onClick={handleClick}
        >
          <img
            src={philosophy}
            className="w-[1.5rem] mask mask-squircle pointer-events-none"
          />
          <p className="text-[#52575d]/70 pointer-events-none">Philosophy</p>
        </div>
      </div>
    </div>
  );
}

export default Category;
