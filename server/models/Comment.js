import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Blog",
    },
    commentedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userLikes: {
      type: Array,
      default: [],
    },
    userDislikes: {
      type: Array,
      default: [],
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalDislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
