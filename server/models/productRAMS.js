import mongoose from "mongoose";

const productRAMSSchema = mongoose.Schema(
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

const ProductRAMSModel = mongoose.model("ProductRAMS", productRAMSSchema);

export default ProductRAMSModel;
