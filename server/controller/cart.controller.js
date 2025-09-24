import CartProductModel from "../models/cartproduct.js";
import UserModel from "../models/User.js";

import mongoose from "mongoose";

//add cart item

export const addToCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const { productId } = request.body;
    if (!productId) {
      return response.status(402).json({
        message: "Provide productId",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });
    if (checkItemCart) {
      return response.status(400).json({
        message: "Item already exist in cart",
      });
    }
    const cartItem = new CartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });
    const save = await cartItem.save();

    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );
    return response.status(200).json({
      data: save,
      message: "Item added successfully",
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

//get cart items

export const getCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const cartItem = await CartProductModel.find({
      userId: userId,
    }).populate("productId");
    return response.json({
      data: cartItem,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//update cart items

export const updateCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id, qty } = request.body;
    if (!_id || !qty) {
      return response.status(400).json({
        message: "Provide _id ,qty",
      });
    }
    const updatedCartitem = await CartProductModel.updateOne(
      {
        _id: _id,
        userId: userId,
      },
      {
        quantity: qty,
      }
    );

    return response.status(200).json({
      message: "Updated cart",
      success: true,
      error: false,
      data: updatedCartitem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


export const deleteCartItemWtyController = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { productId } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized. UserId not found",
        error: true,
        success: false,
      });
    }

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Provide a valid productId",
        error: true,
        success: false,
      });
    }

    // Delete from cartproducts
    const deletedCartItem = await CartProductModel.deleteOne({
      userId: new mongoose.Types.ObjectId(userId),
      productId: new mongoose.Types.ObjectId(productId),
    });

    console.log("Deleted CartItem result:", deletedCartItem);

    if (!deletedCartItem.deletedCount) {
      return res.status(404).json({
        message: "Item not found in cart",
        error: true,
        success: false,
      });
    }

    // Remove from user's shopping_cart array
    await UserModel.findByIdAndUpdate(userId, {
      $pull: { shopping_cart: new mongoose.Types.ObjectId(productId) },
    });

    return res.status(200).json({
      message: "Item removed successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Delete cart item error:", error.message);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
