import mongoose from "mongoose";

const myListSchema = mongoose.Schema(
  {
   productId: {
         type: mongoose.Schema.ObjectId,
         ref: "product",
       },

    userId: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const MyListModel = mongoose.model("myList", myListSchema);
export default MyListModel;
