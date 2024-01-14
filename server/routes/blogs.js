import express from "express";
import {
  getLatestBlogs,
  getTrendingBlogs,
  getFilteredBlogs,
  getUserBlogs,
  getBlog,
  likeBlog,
  postComment,
  getComments,
  likeComment,
  dislikeComment,
  getBlogsTracker,
} from "../controllers/blogs.js";
import { verifyJWT } from "../middleware/verifyJwt.js";
const router = express.Router();

router.get("/latest-blogs", getLatestBlogs);
router.get("/trending-blogs", getTrendingBlogs);
router.post("/filtered-blogs", getFilteredBlogs);
router.post("/user-blogs", getUserBlogs);
router.post("/get-blog", getBlog);
router.post("/like-blog", verifyJWT, likeBlog);
router.post("/post-comment", verifyJWT, postComment);
router.post("/like-comment", verifyJWT, likeComment);
router.post("/dislike-comment", verifyJWT, dislikeComment);
router.post("/get-comments", getComments);
router.post("/get-blogs-tracker", getBlogsTracker);

export default router;
