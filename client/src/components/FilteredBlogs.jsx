/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import NoBlogsMessage from "./NoBlogsMessage";
import Pagination from "./Pagination";
import Spinner from "../common/Spinner";

const FilteredBlogs = ({ activeCategory, currentPage, setCurrentPage }) => {
  const [filteredBlogs, setFilteredBlogs] = useState(null);
  const [filteredTotalPages, setFilteredTotalPages] = useState(1);

  useEffect(() => {
    const category = activeCategory.toLowerCase();
    const fetchBlogs = async () => {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/blogs/filtered-blogs?page=${currentPage}`,
        { category }
      );
      setFilteredBlogs(data.blogs);
      setFilteredTotalPages(data.totalPages);
    };

    fetchBlogs();
  }, [activeCategory, currentPage]);

  if (!filteredBlogs) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 mt-16">
      {filteredBlogs.length === 0 ? (
        <NoBlogsMessage />
      ) : (
        filteredBlogs.map((blog) => {
          return (
            <div key={blog._id} className="">
              <BlogCard blog={blog} />
            </div>
          );
        })
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={filteredTotalPages}
      />
    </div>
  );
};

export default FilteredBlogs;
