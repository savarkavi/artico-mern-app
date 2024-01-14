import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import authRoute from "./routes/auth.js";
import googleAuthRoute from "./routes/google-auth.js";
import writeRoute from "./routes/write.js";
import blogsRoute from "./routes/blogs.js";
import usersRoute from "./routes/users.js";
import admin from "firebase-admin";
import serviceAccount from "./blogs-mern-app-firebase-adminsdk-pck5b-b38de0be71.json" assert { type: "json" };
import cloudinary from "cloudinary";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());
app.use(cors());

app.use("/api/blogs", blogsRoute);
app.use("/api/auth", authRoute);
app.use("/api/google-auth", googleAuthRoute);
app.use("/api/write", writeRoute);
app.use("/api/users", usersRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is connected to port ${process.env.PORT}`);
});
