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
dotenv.config();
const PORT = process.env.PORT || 8000; // <-- FIXED

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

app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/myList", myListRouter);
app.use("/api/address", addressRouter);
app.use("/api/homeSlider", homeSliderRouter);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
});
