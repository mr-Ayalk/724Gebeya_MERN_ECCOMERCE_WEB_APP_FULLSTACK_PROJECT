import AddressModel from "../models/address.js";
import UserModel from "../models/User.js";
import mongoose from "mongoose";
// POST /api/address/add
export const addAddressController = async (request, response) => {
  try {
    // Always trust auth middleware, not the client body, for user id
    const userId = request.userId;

    const { address_line1, city, state, pincode, country, mobile, status } =
      request.body;

    // Validate required fields
    if (!address_line1 || !city || !state || !pincode || !country || !mobile) {
      return response.status(400).json({
        message: "Please provide all required fields.",
        error: true,
        success: false,
      });
    }

    const address = new AddressModel({
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile, // keep as string (e.g. "+251...")
      status: Boolean(status), // normalize to boolean
      userId,
    });

    const savedAddress = await address.save();

    // keep a reference on the user doc (assuming you have address_details: [ObjectId])
    await UserModel.updateOne(
      { _id: userId },
      { $addToSet: { address_details: savedAddress._id } }
    );

    return response.status(201).json({
      data: savedAddress,
      message: "Address added successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// GET /api/address/get
export const getAddressController = async (request, response) => {
  try {
    // Use authenticated user
    const userId = request.userId;

    // Fetch all addresses for the user; no side effects here
    const addresses = await AddressModel.find({ userId }).sort({
      createdAt: -1,
    });

    // If none found, return empty list with success=false? Better: success=true + empty array.
    return response.status(200).json({
      error: false,
      success: true,
      data: addresses,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteAddressController = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const _id = req.params.id;

    if (!_id) {
      return res.status(401).json({
        message: "Unauthorized.Provide _id",
        error: true,
        success: false,
      });
    }

    const deletedItem = await AddressModel.deleteOne({
      _id: _id,
      userId: userId,
    });

    if (!deletedItem) {
      return res.status(404).json({
        message: "Address not found in database",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Address removed successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Delete Address error:", error.message);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
