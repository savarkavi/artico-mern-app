/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import Spinner from "../common/Spinner";

const LatestBlogs = ({ currentPage, setCurrentPage }) => {
  const [latestBlogs, setLatestBlogs] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/blogs/latest-blogs?page=${currentPage}`
      );
      setLatestBlogs(data.blogs);
      setTotalPages(data.totalPages);
    };

    fetchBlogs();
  }, [currentPage]);

  if (!latestBlogs) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 mt-16">
      {latestBlogs.map((blog) => {
        return (
          <div key={blog._id} className="">
            <BlogCard blog={blog} />
          </div>
        );
      })}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default LatestBlogs;
