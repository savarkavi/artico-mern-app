import express from "express";
import {
  searchUser,
  getProfile,
  getUser,
  updateProfileImage,
  updateProfile,
} from "../controllers/users.js";
import { verifyJWT } from "../middleware/verifyJwt.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/search-user", searchUser);
router.post("/user-profile", getProfile);
router.post(
  "/update-profile-img",
  verifyJWT,
  upload.single("photo"),
  updateProfileImage
);
router.post("/update-profile", verifyJWT, updateProfile);
router.post("/get-user", getUser);

export default router;
