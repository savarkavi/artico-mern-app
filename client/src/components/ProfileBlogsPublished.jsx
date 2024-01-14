/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import BlogCard from "./BlogCard";
import NoBlogsMessage from "./NoBlogsMessage";
import Spinner from "../common/Spinner";

const ProfileBlogsPublished = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userBlogs, setUserBlogs] = useState(null);
  const [userBlogsPages, setUserBlogsPages] = useState(1);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/blogs/user-blogs?page=${currentPage}`,
        { userId: user._id }
      );
      setUserBlogs(data.blogs);
      setUserBlogsPages(data.totalPages);
    };

    fetchUserBlogs();
  }, [currentPage, user._id]);

  if (!userBlogs) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  if (userBlogs.length === 0) return <NoBlogsMessage />;

  return (
    <div>
      <div className="flex flex-col gap-16 mt-16">
        {userBlogs.map((blog, i) => {
          return <BlogCard key={i} blog={blog} />;
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={userBlogsPages}
      />
    </div>
  );
};

export default ProfileBlogsPublished;
