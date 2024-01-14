/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { getFromSession, storeInSession } from "../common/sessions";
import { UserContext } from "../App";

const Comments = ({ blogId }) => {
  const { userAuth } = useContext(UserContext);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [likedComments, setLikedComments] = useState({});
  const [dislikedComments, setDislikedComments] = useState({});

  useEffect(() => {
    const storedLikedComments = JSON.parse(getFromSession("likedComments"));
    const storedDislikedComments = JSON.parse(
      getFromSession("dislikedComments")
    );

    if (storedLikedComments) {
      setLikedComments(storedLikedComments);
    }

    if (storedDislikedComments) {
      setDislikedComments(storedDislikedComments);
    }

    const fetchComments = async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/blogs/get-comments`,
        { blogId }
      );
      setComments(data);
    };

    fetchComments();
  }, [blogId]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!userAuth) {
      return toast.error("You must Sign In first");
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/blogs/post-comment`,
        { content, blogId },
        { headers: { Authorization: `Bearer ${userAuth.access_token}` } }
      );

      setComments((prev) => [...prev, data]);
      setContent("");
      toast.success("Comment posted");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleCommentLike = async (id) => {
    if (userAuth) {
      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/blogs/like-comment`,
          { commentId: id, username: userAuth.username },
          { headers: { Authorization: `Bearer ${userAuth?.access_token}` } }
        );

        let isLiked = likedComments[id];
        const updatedComments = comments.map((comment) => {
          return comment._id === id
            ? {
                ...comment,
                totalLikes: isLiked
                  ? comment.totalLikes - 1
                  : comment.totalLikes + 1,
              }
            : comment;
        });
        setLikedComments((prev) => ({ ...prev, [id]: !isLiked }));
        storeInSession(
          "likedComments",
          JSON.stringify({ ...likedComments, [id]: !isLiked })
        );
        setComments(updatedComments);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("You must Sign In first");
    }
  };

  const handleCommentDislike = async (id) => {
    if (!userAuth) {
      return toast.error("You must Sign In first");
    }

    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/blogs/dislike-comment`,
      { commentId: id, username: userAuth.username },
      { headers: { Authorization: `Bearer ${userAuth.access_token}` } }
    );

    let isDisliked = dislikedComments[id];

    const updatedComments = comments.map((comment) => {
      return comment._id === id
        ? {
            ...comment,
            totalDislikes: isDisliked
              ? comment.totalDislikes - 1
              : comment.totalDislikes + 1,
          }
        : comment;
    });
    setDislikedComments((prev) => ({ ...prev, [id]: !isDisliked }));
    storeInSession(
      "dislikedComments",
      JSON.stringify({ ...dislikedComments, [id]: !isDisliked })
    );
    setComments(updatedComments);
  };
  console.log(likedComments);

  return (
    <div className="text-white text-xl my-8">
      <div className="mb-8">Comments</div>
      <div className="flex gap-8">
        <img
          src={userAuth ? userAuth.profileImg : "../../public/pp.png"}
          alt="pp"
          className="w-12 h-12 rounded-full"
        />
        <form
          className="w-full flex flex-col gap-4 items-end"
          onSubmit={handleFormSubmit}
        >
          <input
            placeholder="Write a comment"
            className="border-b outline-none bg-transparent text-sm w-full py-2"
            onChange={handleContentChange}
            value={content}
          />
          <button className="bg-zinc-800 px-4 py-2 text-sm rounded-full w-[100px]">
            Comment
          </button>
        </form>
      </div>
      <div>
        {comments && (
          <div className="flex flex-col gap-6 mt-8">
            {comments.map((comment) => {
              return (
                <div key={comment._id} className="flex gap-2">
                  <img
                    src={comment.commentedBy.profile_info.profile_img}
                    alt="pp"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <span className="text-white font-bold">
                        {`@${comment.commentedBy.profile_info.username}`}
                      </span>
                      <span>{`Posted at ${format(
                        new Date(comment.createdAt),
                        "dd-MM-yy"
                      )}`}</span>
                    </div>
                    <p className="text-base">{comment.content}</p>
                    <div className="flex items-center gap-6 mt-2">
                      <div className="flex items-center gap-2">
                        {likedComments[comment._id] ? (
                          <AiFillLike
                            className="cursor-pointer"
                            onClick={() => handleCommentLike(comment._id)}
                          />
                        ) : (
                          <AiOutlineLike
                            className="cursor-pointer"
                            onClick={() => handleCommentLike(comment._id)}
                          />
                        )}
                        <span className="text-sm">{comment.totalLikes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {dislikedComments[comment._id] ? (
                          <AiFillDislike
                            className="cursor-pointer"
                            onClick={() => handleCommentDislike(comment._id)}
                          />
                        ) : (
                          <AiOutlineDislike
                            className="cursor-pointer"
                            onClick={() => handleCommentDislike(comment._id)}
                          />
                        )}
                        <span className="text-sm">{comment.totalDislikes}</span>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
