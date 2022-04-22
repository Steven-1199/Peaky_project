import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PaginationItem = ({ page, currentPage }) => {
  return (
    <Link
      to={`/posts?page=${page}`}
      href="#"
      className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white ${
        Number(currentPage) === page ? "bg-blue-400" : ""
      }`}
    >
      {page}
    </Link>
  );
};

export default PaginationItem;
