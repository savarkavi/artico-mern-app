import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import parse from "html-react-parser";
import { UilShare, UilEye } from "@iconscout/react-unicons";
import { LikesContext, UserContext } from "../App";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import Comments from "../components/Comments";

const Blog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  const { likedBlogs, setLikedBlogs } = useContext(LikesContext);
  const { userAuth } = useContext(UserContext);

  useEffect(() => {
    if (userAuth) {
      const fetchBlog = async () => {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/blogs/get-blog`,
          { blogId, username: userAuth.username }
        );

        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/blogs/get-blogs-tracker`,
          { blogId, username: userAuth.username }
        );

        console.log(res);
        setBlog(data);
        setLikedBlogs((prev) => ({ ...prev, [blogId]: res.data.hasLiked }));
      };

      fetchBlog();
    } else {
      const fetchBlog = async () => {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/blogs/get-blog`,
          { blogId }
        );

        setBlog(data);
      };

      fetchBlog();
    }
  }, [blogId, userAuth, setLikedBlogs]);

  console.log(likedBlogs);

  const isLiked = likedBlogs[blogId] || false;
  const handleLikeClick = () => {
    if (!userAuth) {
      toast.error("You have to Sign In first");
    } else {
      let {
        activity,
        activity: { total_likes },
      } = blog;
      setLikedBlogs((prev) => ({ ...prev, [blogId]: !isLiked }));
      let changeVal = isLiked ? --total_likes : ++total_likes;
      setBlog({
        ...blog,
        activity: { ...activity, total_likes: changeVal },
      });
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/blogs/like-blog`,
        {
          blogId,
          username: userAuth.username,
          isLiked,
        },
        { headers: { Authorization: `Bearer ${userAuth.access_token}` } }
      );
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-8 ">
      <img
        src={blog.banner}
        alt="Blog image"
        className="w-full h-[400px] lg:h-[500px] object-cover"
      />
      <div className="max-w-[1024px] mx-auto mt-4 px-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-white text-3xl lg:text-5xl">{blog.title}</h1>
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-full">
              <div className="text-gray-300 text-sm">
                <h2 className="">{`By ${blog.authorName}`}</h2>
              </div>
              <div className="text-gray-300 text-sm">{`Published on ${format(
                new Date(blog.createdAt),
                "dd-MM-yy"
              )}`}</div>
            </div>
          </div>
          <div className="text-white mt-12">{parse(blog.content)}</div>
        </div>
        <hr className="mt-20" />
        <div className="flex items-center gap-8 mt-12">
          <div className="flex items-center gap-2">
            {isLiked ? (
              <FaHeart
                className="text-red-500 w-6 h-6 cursor-pointer"
                onClick={handleLikeClick}
              />
            ) : (
              <CiHeart
                className={`text-white w-6 h-6 cursor-pointer`}
                onClick={handleLikeClick}
              />
            )}
            <span className="text-white">{blog.activity.total_likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <UilEye className="text-white w-6 h-6" />
            <span className="text-white">{blog.activity.total_reads}</span>
          </div>{" "}
          <UilShare className="text-white w-6 h-6" />
        </div>
        <div className="">
          <Comments userAuth={userAuth} blogId={blogId} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
