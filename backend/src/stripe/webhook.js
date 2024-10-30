import express from "express";
import Stripe from "stripe";
import { Payment } from "../models/payment.model.js"; // Adjust path as needed

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handleStripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    console.log("Webhook received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Retrieve the payment intent to get additional details
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent
      );

      console.log("Updating payment for session:", session.id);
      console.log("Payment Intent details:", paymentIntent);

      // Find payment by session ID
      const payment = await Payment.findOne({ "stripe.sessionId": session.id });

      if (!payment) {
        console.error("Payment not found for session:", session.id);
        return res.status(404).json({ error: "Payment not found" });
      }

      // Safely access receipt URL
      const receiptUrl = paymentIntent.charges?.data?.[0]?.receipt_url || null;

      // Update all relevant fields
      const updatedPayment = await Payment.findByIdAndUpdate(
        payment._id,
        {
          $set: {
            status: "paid",
            "stripe.paymentIntentId": session.payment_intent,
            "stripe.paymentMethod": paymentIntent.payment_method_types[0],
            "stripe.paymentStatus": "paid",
            "stripe.receiptUrl": receiptUrl,
            updatedAt: new Date(),
          },
        },
        { new: true }
      );

      console.log("Payment updated successfully:", updatedPayment);

      // Send webhook response
      res.json({
        received: true,
        paymentId: payment._id,
        status: "paid",
      });
    } else {
      // Handle other event types if needed
      res.json({ received: true });
    }
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
