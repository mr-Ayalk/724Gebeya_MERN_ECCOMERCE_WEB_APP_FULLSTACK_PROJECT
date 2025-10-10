import mongoose from "mongoose";

const homeSliderSchema = mongoose.Schema(
  {
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const HomeSliderModel = mongoose.model("HomeSlider", homeSliderSchema);

export default HomeSliderModel;
