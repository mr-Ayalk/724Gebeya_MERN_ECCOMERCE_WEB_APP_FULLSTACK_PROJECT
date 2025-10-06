import mongoose from "mongoose";

const productSIZESchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const ProductSIZEModel = mongoose.model("ProductSIZE", productSIZESchema);

export default ProductSIZEModel;
