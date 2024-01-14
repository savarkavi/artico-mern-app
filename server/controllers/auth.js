import bcrypt from "bcrypt";
import User from "../models/User.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

const formattedData = (user) => {
  const access_token = jwt.sign(
    { username: user.profile_info.username, id: user._id },
    process.env.SECRET_KEY
  );

  return {
    username: user.profile_info.username,
    fullname: user.profile_info.fullname,
    profileImg: user.profile_info.profile_img,
    access_token,
  };
};

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ "profile_info.email": email });

    if (!user) {
      return res.status(403).json({ error: "User does not exist" });
    }

    if (user.google_auth) {
      return res
        .status(403)
        .json({
          error:
            "This email already exists with Google. Try signing in with Google",
        });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      user.profile_info.password
    );

    if (!isPasswordCorrect) {
      return res.status(403).json({ error: "Password is incorrect" });
    } else {
      return res.json(formattedData(user));
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;

  const generateUsername = async (email) => {
    let username = email.split("@")[0];
    const existingUser = await User.exists({
      "profile_info.username": username,
    });

    if (existingUser) {
      username = username + nanoid().slice(0, 5);
      return username;
    } else {
      return username;
    }
  };

  if (fullname.length < 2) {
    return res
      .status(403)
      .json({ error: "Your Name must be atleast 2 characters long" });
  }

  if (password.length < 6) {
    return res
      .status(403)
      .json({ error: "Password must be atleast 6 characters long" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Invalid Email" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = await generateUsername(email);

    const existingEmail = await User.exists({ "profile_info.email": email });

    if (existingEmail) {
      return res.status(500).json({ error: "Email already exists" });
    } else {
      const newUser = await new User({
        profile_info: {
          fullname,
          email,
          password: hashedPassword,
          username,
        },
      }).save();

      return res.status(201).json(formattedData(newUser));
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err.message);
  }
};
