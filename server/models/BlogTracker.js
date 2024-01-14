import mongoose from "mongoose";

const blogTrackerSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  hasViewd: Boolean,
  hasLiked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("BlogTracker", blogTrackerSchema);
