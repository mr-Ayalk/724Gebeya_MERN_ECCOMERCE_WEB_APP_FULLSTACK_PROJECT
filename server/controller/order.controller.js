// server/controllers/order.controller.js
import OrderModel from "../models/order.js";
import UserModel from "../models/User.js";
import CartProductModel from "../models/cartproduct.js";

// Create an order (called after payment success or with payment details)
export const createOrderController = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, billingDetails, payment } = req.body; // payment: { method, id, status, raw }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items in order", error: true, success: false });
    }

    // compute totals
    const totalAmount = items.reduce((acc, it) => acc + (it.price * (it.quantity || 1)), 0);

    const order = new OrderModel({
      userId,
      items,
      billingDetails,
      payment,
      totalAmount,
      status: payment?.status === "COMPLETED" ? "Processing" : "Pending",
    });

    const saved = await order.save();

    // Optionally clear user's cart items referenced by these products
    await CartProductModel.deleteMany({ userId }); // adjust if you only want to remove purchased items

    // Save reference to user's orderHistory
    await UserModel.findByIdAndUpdate(userId, { $push: { orderHistory: saved._id } });

    return res.status(201).json({ success: true, error: false, data: saved });
  } catch (err) {
    console.error("createOrder error:", err);
    return res.status(500).json({ message: err.message || err, error: true, success: false });
  }
};

// Get user's orders
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ error: false, success: true, data: orders });
  } catch (err) {
    return res.status(500).json({ message: err.message || err, error: true, success: false });
  }
};
