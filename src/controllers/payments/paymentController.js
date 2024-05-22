const { db } = require("../../models");
const stripe = require("stripe")(
  "sk_test_51PFrJHSBB0eNgorPYXQvaFInxKg4Y7ejk6mqaKhwmXiBe8vBNY6D5QeIs3Wkgrz4kDhnsq2NnKuZXuoZdlnK7ORg00HoCMIg6L"
);
const Payment = db.Payment;

const createPayment = async (req, res) => {
  try {
    const { totalAmount, userId, paymentMethodId } = req.body;
    console.log(req.body);

    // Create payment record in the database
    await Payment.create({
      totalAmount,
      userId,
    });

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount*100,
      currency: "inr",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Disable automatic redirects
      },
    });
    console.log("pppppppp--", paymentIntent);

    // Send response with payment intent details
    res.status(201).json({
      success: true,
      message: "Payment is done",
      paymentIntent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const createSubscription = async (req, res) => {
  try {
    const { totalAmount, userId, paymentMethodId, duration } = req.body;
    console.log(req.body);
    const installmentAmount = Math.round(totalAmount / duration);

    const payment=await Payment.create({
      totalAmount,
      userId,
    });
    const customer = await stripe.customers.create({
      email: 'paying.user@example.com',
      source: 'tok_mastercard',
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: installmentAmount*100, // Stripe expects amount in cents
      currency: "inr",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Disable automatic redirects
      },
    });
    console.log("cus----",customer);
    const subscription = await stripe.subscriptions.create({
      customer: customer?.id,
      items: [
        {
          price_data: {
            currency: "inr",
            product:  "prod_Q8lPagLRc2gF1g",
            recurring: {
              interval: "month",
            },
            unit_amount: installmentAmount*100, // Amount for each installment
          },
          quantity: duration - 1,
        },
      ],
      payment_behavior: "default_incomplete",
    });

    res.status(201).json({
      success: true,
      message: "Payment and subscription created successfully",
      paymentIntent,
      subscription,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", error });
  }
};
module.exports = {
  createPayment,
  createSubscription,
};
