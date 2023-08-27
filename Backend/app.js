import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import matchRouter from "./routes/match-routes";
import bookingsRouter from "./routes/booking-routes";
import paymentRoute from "./routes/paymentRoutes";
import cors from "cors";
dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/match", matchRouter);
app.use("/booking", bookingsRouter);

app.use("/api", paymentRoute);
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);



mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.n5i0ged.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(5002, () =>
      console.log("Connected To Database And Server is running")
    )
  )
  .catch((e) => console.log(e));
