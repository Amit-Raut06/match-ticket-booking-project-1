// import { instance } from "../app.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import Payment from "../models/paymentModel";

var server_order_id;

export const orders = async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET, 
  });

  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

 
  const order = await instance.orders.create(options);
  console.log(order);
  server_order_id=order.id;

  instance.orders.create(options, function (err, order) {
    if (err) {
        return res.send({ code: 500, message: 'Server Err.' })
    }
    return res.send({ code: 200, message: 'order created', data: order })
});
};

export const paymentVerification = async (req, res) => {

  console.log(req.body.response.razorpay_order_id);
  console.log(req.body.response.razorpay_payment_id);
  console.log(req.body.response.razorpay_signature);
  
  // req.body.response.razorpay_order_id

  let body = server_order_id + "|" + req.body.response.razorpay_payment_id;

  var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest('hex');

  let payment;    
  if (expectedSignature === req.body.response.razorpay_signature) {

    // const razorpay_order_id = req.body.response.razorpay_order_id;
    // const razorpay_payment_id = req.body.response.razorpay_payment_id;
    // const razorpay_signature = req.body.response.razorpay_signature
    // console.log(razorpay_order_id);
    // console.log(razorpay_payment_id);

    try {
      payment = new Payment({razorpay_order_id: req.body.response.razorpay_order_id,
        razorpay_payment_id: req.body.response.razorpay_payment_id,
        razorpay_signature: req.body.response.razorpay_signature });
        
      payment = await payment.save();
      console.log(payment);
    } catch (err) {
      return console.log(err);
    }


      res.send({ code: 200, message: 'Sign Valid' });
  } else {

      res.send({ code: 500, message: 'Sign Invalid' });
  }
  
};
