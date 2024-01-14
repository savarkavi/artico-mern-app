import Blog from "../models/Blog.js";
import BlogTracker from "../models/BlogTracker.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

export const getLatestBlogs = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const totalBlogs = await Blog.countDocuments({});

    const blogs = await Blog.find({})
      .populate("author", "profile_info.username profile_info.profile_img -_id")
      .sort({ createdAt: -1 })
      .select("title banner desc tags authorName activity createdAt")
      .skip((page - 1) * 5)
      .limit(5);

    res.status(200).json({ blogs, totalPages: Math.ceil(totalBlogs / 5) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrendingBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("author", "profile_info.username profile_info.profile_img -_id")
      .sort({
        "activity.total_reads": -1,
        "activity.total_likes": -1,
        createdAt: -1,
      })
      .select("title banner desc tags authorName activity createdAt")
      .limit(5);

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFilteredBlogs = async (req, res) => {
  const { category } = req.body;

  try {
    const page = req.query.page || 1;
    const totalBlogs = await Blog.countDocuments({ tags: category });

    const blogs = await Blog.find({ tags: category })
      .populate("author", "profile_info.username profile_info.profile_img -_id")
      .sort({ createdAt: -1 })
      .select("title banner desc tags authorName activity createdAt")
      .skip((page - 1) * 5)
      .limit(5);

    res.status(200).json({
      blogs,
      totalPages: Math.ceil(totalBlogs / 5),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserBlogs = async (req, res) => {
  const { userId } = req.body;

  try {
    const page = req.query.page || 1;
    const totalBlogs = await Blog.countDocuments({ author: userId });

    const blogs = await Blog.find({ author: userId })
      .populate("author", "profile_info.username profile_info.profile_img -_id")
      .select("title banner desc tags authorName activity createdAt")
      .skip((page - 1) * 5)
      .limit(5);

    res.status(200).json({
      blogs,
      totalPages: Math.ceil(totalBlogs / 5),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlog = async (req, res) => {
  const { blogId, username } = req.body;

  try {
    if (username) {
      const user = await User.findOne({ "profile_info.username": username });
      const blogTracker = await BlogTracker.findOneAndUpdate(
        {
          blogId,
          userId: user._id,
        },
        { hasViewd: true }
      );
      if (blogTracker) {
        const blog = await Blog.findById(blogId);
        res.status(200).json(blog);
      } else {
        await new BlogTracker({
          blogId,
          userId: user._id,
          hasViewd: true,
        }).save();
        const blog = await Blog.findByIdAndUpdate(blogId, {
          $inc: { "activity.total_reads": 1 },
        }).populate(
          "author",
          "profile_info.username profile_info.profile_img -_id"
        );

        await User.findOneAndUpdate(
          { "profile_info.username": blog.author.profile_info.username },
          { $inc: { "account_info.total_reads": 1 } }
        );

        res.status(200).json(blog);
      }
    } else {
      try {
        const blog = await Blog.findById(blogId);
        res.status(200).json(blog);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeBlog = async (req, res) => {
  const { blogId, isLiked, username } = req.body;

  const changedVal = !isLiked ? 1 : -1;

  try {
    const user = await User.findOne({ "profile_info.username": username });
    const blogTracker = await BlogTracker.findOne({
      blogId,
      userId: user._id,
    });

    if (blogTracker.hasLiked) {
      await BlogTracker.findOneAndUpdate(
        { blogId, userId: user._id },
        { hasLiked: false }
      );

      await Blog.findByIdAndUpdate(blogId, {
        $inc: { "activity.total_likes": changedVal },
      });
      res.status(200).send("Disliked the blog");
    } else {
      await BlogTracker.findOneAndUpdate(
        { blogId, userId: user._id },
        { hasLiked: true }
      );

      await Blog.findByIdAndUpdate(blogId, {
        $inc: { "activity.total_likes": changedVal },
      });

      res.status(200).send("Liked the blog");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postComment = async (req, res) => {
  const { content, blogId } = req.body;
  const { id } = req.User;

  try {
    const comment = await new Comment({
      content,
      blogId,
      commentedBy: id,
    }).save();

    const populateComment = await Comment.populate(comment, {
      path: "commentedBy",
      select: "profile_info.username profile_info.profile_img -_id",
    });
    res.status(201).json(populateComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComments = async (req, res) => {
  const { blogId } = req.body;

  try {
    const comments = await Comment.find({ blogId }).populate(
      "commentedBy",
      "profile_info.username profile_info.profile_img -_id"
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeComment = async (req, res) => {
  const { commentId, username } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (comment.userLikes?.includes(username)) {
      await Comment.findByIdAndUpdate(commentId, {
        $inc: { totalLikes: -1 },
        $pull: { userLikes: username },
      });
      res.status(200).send("Liked removed");
    } else {
      await Comment.findByIdAndUpdate(commentId, {
        $inc: { totalLikes: 1 },
        $addToSet: { userLikes: username },
      });
      res.status(200).send("Like comment");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const dislikeComment = async (req, res) => {
  const { commentId, username } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (comment.userDislikes?.includes(username)) {
      await Comment.findByIdAndUpdate(commentId, {
        $inc: { totalDislikes: -1 },
        $pull: { userDislikes: username },
      });
      res.status(200).send("Disliked removed");
    } else {
      await Comment.findByIdAndUpdate(commentId, {
        $inc: { totalDislikes: 1 },
        $addToSet: { userDislikes: username },
      });
      res.status(200).send("Disliked comment");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogsTracker = async (req, res) => {
  const { blogId, username } = req.body;

  try {
    const user = await User.findOne({ "profile_info.username": username });
    const blogTracker = await BlogTracker.findOne({ blogId, userId: user._id });
    res.status(200).json(blogTracker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
