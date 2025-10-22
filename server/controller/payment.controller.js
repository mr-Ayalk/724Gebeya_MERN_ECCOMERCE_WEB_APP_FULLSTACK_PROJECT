// server/controllers/payment.controller.js
import fetch from "node-fetch"; // or use axios
import OrderModel from "../models/order.js";

/**
 * Create a PayPal order (server-side). This uses PayPal REST API v2.
 * Requires PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET in env.
 */
export const createPayPalOrder = async (req, res) => {
  try {
    const { totalAmount, currency = "USD", items } = req.body;
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        { amount: { currency_code: currency, value: totalAmount.toString() } },
      ],
    };

    const r = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await r.json();
    return res.json({ success: true, data });
  } catch (err) {
    console.error("createPayPalOrder error", err);
    return res.status(500).json({ error: true, message: err.message });
  }
};

/**
 * Capture PayPal order (server-side, called after client approval)
 */
export const capturePayPalOrder = async (req, res) => {
  try {
    const { orderID } = req.body;
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");
    const r = await fetch(
      `https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await r.json();
    return res.json({ success: true, data });
  } catch (err) {
    console.error("capturePayPalOrder error", err);
    return res.status(500).json({ error: true, message: err.message });
  }
};

/**
 * Create Chapa payment (server-side)
 * Chapa: https://developers.getchapa.com
 */
export const createChapaPayment = async (req, res) => {
  try {
    const {
      amount,
      currency = "ETB",
      email,
      firstName,
      lastName,
      callback_url,
    } = req.body;
    const payload = {
      amount,
      currency,
      phone_number: req.body.phone_number || "",
      email,
      first_name: firstName || "",
      last_name: lastName || "",
      callback_url:
        callback_url || `${process.env.FRONTEND_URL}/checkout/success`,
    };

    const r = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await r.json();
    // returns checkout url in data.data.checkout_url
    return res.json({ success: true, data });
  } catch (err) {
    console.error("createChapaPayment error", err);
    return res.status(500).json({ error: true, message: err.message });
  }
};
