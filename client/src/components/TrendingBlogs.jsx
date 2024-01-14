/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Spinner from "../common/Spinner";

const TrendingBlogs = ({ sidebar = false }) => {
  const [trendingBlogs, setTrendingBlogs] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blogs/trending-blogs`
      );
      setTrendingBlogs(data);
    };

    fetchBlogs();
  }, []);

  if (!trendingBlogs) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={`mb-12 flex flex-col gap-16 ${!sidebar && "mt-16"}`}>
      {trendingBlogs.map((blog) => {
        return (
          <div key={blog._id} className="">
            <BlogCard blog={blog} sidebar={sidebar} />
          </div>
        );
      })}
    </div>
  );
};

export default TrendingBlogs;
