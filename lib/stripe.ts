import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
  appInfo: {
    name: "Spotlight AI",
    version: "0.1.0",
  },
});

export default stripe;
