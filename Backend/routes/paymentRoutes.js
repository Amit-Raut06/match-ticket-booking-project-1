import express from "express";
import {
  orders,
  paymentVerification,
} from "../controllers/paymentController.js";

const paymentRoute = express.Router();

paymentRoute.post("/orders",orders)

paymentRoute.post("/paymentverification", paymentVerification)

export default paymentRoute;
