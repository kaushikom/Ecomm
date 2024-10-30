import Stripe from "stripe";
import { Payment } from "../models/payment.model.js";
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Update payment with Stripe session ID and handle status
async function updatePaymentWithStripeSession(paymentId, session) {
  try {
    // Verify session status
    const isSuccessful = session.payment_status === "paid";

    // Update payment document with session details
    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        $set: {
          "stripe.sessionId": session.id,
          "stripe.paymentIntentId": session.payment_intent,
          "stripe.paymentStatus": session.payment_status,
          // Update main status to paid if transaction is successful
          status: isSuccessful ? "paid" : "upcoming",
          // Update receipt URL if available
          ...(session.receipt_url && {
            "stripe.receiptUrl": session.receipt_url,
          }),
          // Update payment method if available
          ...(session.payment_method_types?.[0] && {
            "stripe.paymentMethod": session.payment_method_types[0],
          }),
        },
      },
      { new: true } // Return updated document
    );

    if (!updatedPayment) {
      throw new Error(`Payment with ID ${paymentId} not found`);
    }

    return updatedPayment;
  } catch (error) {
    console.error("Error updating payment with Stripe session:", error);
    throw error;
  }
}

export async function POST(req, res) {
  try {
    const { paymentId, successUrl, cancelUrl } = await req.body;

    // Find the payment
    const payment = await Payment.findById(paymentId).populate([
      {
        path: "task",
        select: "serviceType",
        populate: [{ path: "serviceType", select: "name" }],
      },
    ]);

    // Check if payment exists
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // Validate required nested data
    if (!payment.task?.serviceType?.name || !payment.amount) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment data: missing required fields",
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: payment.task.serviceType.name,
              description: `Payment for ${payment.task.serviceType.name}`, // Optional: add description
            },
            unit_amount: Math.round(payment.amount * 100), // Convert to cents and ensure integer
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        successUrl ||
        `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.BASE_URL}/cancel`,
      metadata: {
        paymentId: payment._id.toString(), // Store payment ID in metadata for reference
      },
    });
    // Update payment with Stripe session ID
    const updatedPayment = await Payment.findByIdAndUpdate(payment._id, {
      "stripe.sessionId": session.id,
    });

    return res.status(200).json({
      success: true,
      id: session.id,
      message: "Payment checkout session created successfully",
      url: session.url, // Return the checkout URL directly
      updatedPayment,
    });
  } catch (error) {
    console.error("Stripe error:", error);

    // Handle specific error types
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment ID format",
      });
    }

    if (error.type === "StripeInvalidRequestError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Stripe request",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your payment",
    });
  }
}
