import cloudinary from "cloudinary";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const uploadImg = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const uploadEditorImg = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    return res.json({ location: result.url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const publish = async (req, res) => {
  const { id } = req.User;
  const { title, bannerUrl, content, tags, desc, authorName } = req.body;

  if (!authorName) {
    return res.status(403).json({
      error: "Author name is required",
    });
  }

  if (!title) {
    return res.status(403).json({
      error: "Blog title is required",
    });
  }

  if (!desc) {
    return res.status(403).json({
      error: "Blog description is required",
    });
  }

  if (tags.length === 0) {
    return res.status(403).json({
      error: "Atleast one tag/topic is required",
    });
  }

  if (desc.length > 200) {
    return res.status(403).json({
      error: "Blog description can only be of maximum 200 characters",
    });
  }

  try {
    let newBlog = await new Blog({
      title,
      banner: bannerUrl,
      desc,
      tags,
      authorName,
      content,
      author: id,
    }).save();

    await User.findByIdAndUpdate(id, {
      $inc: { "account_info.total_posts": 1 },
      $push: { blogs: newBlog._id },
    });

    res.status(200).json("Blog Published!");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
