import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_line1: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    state: { type: String, trim: true, required: true },
    pincode: { type: String, trim: true, required: true },
    country: { type: String, trim: true, required: true },
    // PhoneInput returns a string (e.g. "+251..."), so store as String
    mobile: { type: String, trim: true, required: true },
    status: { type: Boolean, default: true },
    selected: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // make sure your User model name is "User"
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const AddressModel = mongoose.model("address", addressSchema);
export default AddressModel;
