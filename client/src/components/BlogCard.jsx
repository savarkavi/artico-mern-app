/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { UilEye } from "@iconscout/react-unicons";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, sidebar }) => {
  return (
    <div className="text-white flex justify-between gap-8 items-center">
      <div
        className={`flex flex-col gap-4 sm:w-[60%] ${sidebar && "sm:w-full"}`}
      >
        <div className="flex gap-3 items-center text-gray-300 text-sm">
          <img
            src={blog.author.profile_info.profile_img}
            alt="pp"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h2>{blog.authorName}</h2>
          <span>{format(new Date(blog.createdAt), "dd-MM-yy")}</span>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            to={`/blog/${blog._id}`}
            className={`font-bold text-lg ${
              !sidebar && "lg:text-2xl"
            } hover:underline`}
          >
            {blog.title}
          </Link>
          <p
            className={`text-sm w-[300px] ${
              !sidebar && "lg:w-[500px]"
            } cursor-default`}
          >
            {blog.desc}
          </p>
          <div className="flex items-center gap-4 md:gap-20w-full flex-wrap mt-4">
            {!sidebar && (
              <div className="flex gap-3 items-center">
                {blog.tags.map((tag, i) => {
                  return (
                    <div
                      key={i}
                      className="bg-zinc-400 py-1 px-4 rounded-full text-black text-xs"
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 items-center">
                <UilEye className="w-4 h-4" />
                <span className="text-sm">{blog.activity.total_reads}</span>
              </div>
              <div className="flex gap-2 items-center">
                <FaHeart className="w-4 h-4 cursor-default" />
                <span className="text-sm">{blog.activity.total_likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`hidden sm:block ${sidebar && "hidden"}`}>
        <img
          src={blog.banner}
          alt="blog img"
          className={`w-36 h-36 lg:w-80 lg:h-56 object-cover rounded-lg ${
            sidebar && "hidden"
          }`}
        />
      </div>
    </div>
  );
};

export default BlogCard;
