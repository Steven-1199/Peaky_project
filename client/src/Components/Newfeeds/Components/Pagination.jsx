import React from "react";
import PaginationItem from "./PaginationItem";
import {
  useSearchParams,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { getPosts } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Pagination = () => {
  const query = useQuery();
  const location = useLocation();
  const [searchWord, setSearchWord] = useSearchParams();
  const navigate = useNavigate();
  const { numberOfPages, currentPage } = useSelector((state) => state.posts);
  const page = query.get("page") || 1;
  const dispatch = useDispatch();
  const totalPage = new Array(numberOfPages).fill(1);
  useEffect(() => {
    const checkLocation = location.pathname.split("/");

    if (
      !checkLocation.includes("ProfilePage") &&
      !checkLocation.includes("search")
    ) {
      dispatch(getPosts(page));
    }
  }, [page]);
  return (
    <div>
      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={() => {
            if (
              Number(page) > 1 &&
              !location.pathname.split("/").includes("ProfilePage") &&
              !location.pathname.split("/").includes("search")
            ) {
              navigate(`/posts?page=${String(Number(page) - 1)}`);
            }
          }}
          className="flex items-center px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
        >
          Previous
        </button>

        {totalPage.map((element, index) => (
          <PaginationItem
            currentPage={currentPage ? currentPage : 1}
            page={index + 1}
            key={index + 1}
          />
        ))}
        <button
          type="button"
          className="px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
          onClick={() => {
            if (
              Number(page) < numberOfPages &&
              !location.pathname.split("/").includes("ProfilePage") &&
              !location.pathname.split("/").includes("search")
            ) {
              navigate(`/posts?page=${String(Number(page) + 1)}`);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
