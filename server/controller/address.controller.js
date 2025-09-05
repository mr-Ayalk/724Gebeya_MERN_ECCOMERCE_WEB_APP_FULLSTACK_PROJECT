// import { request } from "express";
// import AddressModel from "../models/address.js";
// import UserModel from "../models/User.js";

// export const addAddressController = async (request, response) => {
//   try {
//     const {
//       address_line1,
//       city,
//       state,
//       pincode,
//       country,
//       mobile,
//       status,
//       userId,
//     } = request.body;
//     // const userId = request.userId;
//     // if (!address_line1 || city || state || pincode || country || mobile || userId) {
//     //   return response.status(500).json({
//     //     message: "Please provide all the fields",
//     //     error: true,
//     //     success: false,
//     //   });
//     // }

//     const address = new AddressModel({
//       address_line1,
//       city,
//       state,
//       pincode,
//       country,
//       mobile,
//       status,
//       userId,
//     });
//     const savedAddress = await address.save();
//     const updateCartUser = await UserModel.updateOne(
//       { _id: userId },
//       {
//         $push: {
//           address_details: savedAddress?._id,
//         },
//       }
//     );

//     return response.status(200).json({
//       data: savedAddress,
//       message: "Address added successfully",
//       error: false,
//       success: true,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// export const getAddressController = async (request, response) => {
//   try {
//     const address = await AddressModel.find({ userId: request?.query?.userId });
//     if (!address) {
//       return response.json({
//         message: "Address not found",
//         error: true,
//         success: false,
//       });
//     } else {
//       const updatedUser = await UserModel.updateOne(
//         {
//           _id: request?.query?.userId,
//         },
//         {
//           $push: {
//             // address_details: address?._id,
//             address: address?._id,
//           },
//         }
//       );
//     }
//     return response.status(200).json({
//       error: false,
//       success: true,
//       data: address,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };
// ❌ remove: import { request } from "express";
import AddressModel from "../models/address.js";
import UserModel from "../models/User.js";

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
