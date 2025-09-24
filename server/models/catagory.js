import mongoose, { Mongoose } from "mongoose";

const catagorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    // color: {
    //   type: String,
    // },
    parentCatName: {
      type: String,
    },
    parentId: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

const Categorymodel = mongoose.model("category", catagorySchema);
export default Categorymodel;
