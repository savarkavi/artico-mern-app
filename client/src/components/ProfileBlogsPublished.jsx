/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import BlogCard from "./BlogCard";
import NoBlogsMessage from "./NoBlogsMessage";
import Spinner from "../common/Spinner";
import { FaRegTrashAlt } from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
          return (
            <div key={i} className="flex gap-6 justify-between items-start">
              <BlogCard blog={blog} />
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="bg-white w-12 h-12 flex justify-center items-center p-4 rounded-full cursor-pointer">
                    <FaRegTrashAlt className="text-red-500 text-xl" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete the blog?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Once you delete the blog it cant be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          );
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
