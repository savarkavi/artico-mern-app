import express from "express";
import upload from "../middleware/multer.js";
import { uploadEditorImg, uploadImg, publish } from "../controllers/write.js";
import { verifyJWT } from "../middleware/verifyJwt.js";

const router = express.Router();

router.post("/upload-img", verifyJWT, upload.single("photo"), uploadImg);
router.post("/upload-editor-img", upload.single("file"), uploadEditorImg);
router.post("/publish", verifyJWT, publish);

export default router;
