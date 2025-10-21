import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
    },

    image: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    rating: {
      type: Number,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const CartProductModel = mongoose.model("cartProduct", cartProductSchema);
export default CartProductModel;
