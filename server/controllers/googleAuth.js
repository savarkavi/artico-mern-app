// import { getAuth } from "firebase-admin/auth";
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// const generateUsername = async (email) => {
//   let username = email.split("@")[0];
//   const existingUser = await User.exists({
//     "profile_info.username": username,
//   });

//   if (existingUser) {
//     username = username + nanoid().slice(0, 5);
//     return username;
//   } else {
//     return username;
//   }
// };

// const formattedData = (user) => {
//   const access_token = jwt.sign(
//     { username: user.profile_info.username, id: user._id },
//     process.env.SECRET_KEY
//   );

//   return {
//     username: user.profile_info.username,
//     fullname: user.profile_info.fullname,
//     profileImg: user.profile_info.profile_img,
//     access_token,
//   };
// };

// export const googleAuth = async (req, res) => {
//   const {
//     stsTokenManager: { accessToken },
//   } = req.body;

//   console.log(accessToken);

//   await getAuth()
//     .verifyIdToken(accessToken)
//     .then(async (user) => {
//       const { email, name, picture } = user;
//       const existingUser = await User.findOne({ "profile_info.email": email });

//       if (existingUser) {
//         if (!existingUser.google_auth) {
//           return res
//             .status(403)
//             .json({ error: "This account is not signed up through Google" });
//         } else {
//           return res.json(formattedData(existingUser));
//         }
//       } else {
//         const userName = await generateUsername(email);
//         await new User({
//           profile_info: {
//             fullname: name,
//             email: email,
//             username: userName,
//             profile_img: picture,
//           },
//           google_auth: true,
//         })
//           .save()
//           .then((user) => {
//             res.json(formattedData(user));
//           })
//           .catch((error) => res.status(500).json({ error: error.message }));
//       }
//     })
//     .catch((error) => {
//       console.log({ error: "Failed to Sign In. Try another account" }, error);
//     });
// };
