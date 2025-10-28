import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./lib/connectDb.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import myListRouter from "./routes/myList.route.js";
import addressRouter from "./routes/address.route.js";
import homeSliderRouter from "./routes/homeSlides.route.js";
import bannerV1Router from "./routes/bannerV1.js";
import blogRouter from "./routes/blog.route.js";
import orderRouter from "./routes/order.route.js";
import paymentRouter from "./routes/payment.route.js";
import OpenAI from "openai";

dotenv.config();
const PORT = process.env.PORT || 8000; // <-- FIXED
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // <-- FIXED

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Server is running on port " + PORT });
});

app.use(`/api/user`, userRouter);
app.use(`/api/category`, categoryRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/myList", myListRouter);
app.use("/api/address", addressRouter);
app.use("/api/bannerV1", bannerV1Router);
app.use("/api/homeSlider", homeSliderRouter);
app.use("/api/blog", blogRouter);
app.use("/api/payment", paymentRouter);
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            You are a friendly AI chatbot for an eCommerce website.
            Answer questions about products, shipping, orders, and returns.
            Keep responses short, helpful, and polite.
          `,
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ reply: "Oops! Something went wrong on the server." });
  }
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
});
