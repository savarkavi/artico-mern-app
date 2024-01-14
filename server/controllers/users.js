import User from "../models/User.js";
import cloudinary from "cloudinary";

export const searchUser = async (req, res) => {
  const { query } = req.body;
  const regex = new RegExp(query, "i");
  try {
    const users = await User.find({
      "profile_info.username": { $regex: regex },
    }).limit(10);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ "profile_info.username": username });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfileImage = async (req, res) => {
  const { id } = req.User;

  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const updatedUser = await User.findByIdAndUpdate(id, {
      "profile_info.profile_img": result.url,
    });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  const { newUsername, newBio, socialLinks } = req.body;
  const { id } = req.User;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        "profile_info.username": newUsername,
        "profile_info.bio": newBio,
        social_links: socialLinks,
      },
      { new: true }
    );

    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findOne(userId).select(
      "profile_info.profile_img profile_info.username"
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
