import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
}, {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel;