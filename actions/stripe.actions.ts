"use server";

import stripe from "@/lib/stripe";
import { onAuthenticateUser } from "./auth.actions";

export const getAllProductsFromStripe = async () => {
  try {
    const currentUser = await onAuthenticateUser();
    if (!currentUser.user) {
      return {
        error: "User not authenticated",
        status: 401,
        success: false,
      };
    }

    const stripeProducts = await stripe.products.list(
      {},
      {
        stripeAccount: currentUser.user.stripeConnectId || undefined,
      }
    );

    return {
      products: stripeProducts.data,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log("🔴 ERROR:", error);
    return {
      error: "Failed to fetch products from Stripe",
      status: 500,
      success: false,
    };
  }
};
