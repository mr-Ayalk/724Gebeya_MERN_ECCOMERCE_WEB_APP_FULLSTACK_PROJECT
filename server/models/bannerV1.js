import mongoose from "mongoose";

const bannerV1Schema = new mongoose.Schema(
  {
    bannerTitle: {
      type: String,
      required: true,
    },
    catId: {
      type: String,
      required: true,
      default: "",
    },
    subCatId: {
      type: String,
      required: true,
      default: "",
    },
    thirdsubCatId: {
      type: String,
      required: true,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

const BannerV1Model = mongoose.model("bannerV1", bannerV1Schema);
export default BannerV1Model;
