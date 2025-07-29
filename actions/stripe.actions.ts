"use server";

import stripe from "@/lib/stripe";
import { onAuthenticateUser } from "./auth.actions";
import Stripe from "stripe";
import { prismaClient } from "@/lib/prisma";
import { subscriptionPriceId } from "@/lib/data";

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

export const onGetStripeClientSecret = async (
  email: string,
  userId: string
) => {
  try {
    let customer: Stripe.Customer;
    const existingCustomers = await stripe.customers.list({ email: email });
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      // create a new customer if one doesn't exist
      customer = await stripe.customers.create({
        email: email,
        metadata: {
          userId: userId,
        },
      });
    }

    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        stripeCustomerId: customer.id,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: subscriptionPriceId,
        },
      ],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
      metadata: {
        userId: userId,
      },
    });

    if (!subscription.latest_invoice) {
      console.error(
        "No invoice found. Subscription status:",
        subscription.status
      );
      throw new Error("No invoice found on subscription");
    }

    const invoice = subscription.latest_invoice as Stripe.Invoice;

    // If there's no payment intent, we need to create one for the invoice
    let paymentIntent: Stripe.PaymentIntent;

    if (!invoice.payment_intent) {
      console.log(
        "No payment intent found. Creating PaymentIntent for invoice:",
        invoice.id
      );

      // Create a PaymentIntent for the invoice
      paymentIntent = await stripe.paymentIntents.create({
        amount: invoice.amount_due,
        currency: invoice.currency || "usd",
        customer: customer.id,
        metadata: {
          invoice_id: invoice.id,
          subscription_id: subscription.id,
          userId: userId,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      // Optional: Associate the PaymentIntent with the invoice
      await stripe.invoices.update(invoice.id, {
        metadata: {
          payment_intent_id: paymentIntent.id,
        },
      });
    } else {
      paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;
    }

    if (!paymentIntent.client_secret) {
      console.error(
        "No client secret found. Payment intent status:",
        paymentIntent.status
      );
      throw new Error("No client secret found on payment intent");
    }

    return {
      status: 200,
      secret: paymentIntent.client_secret,
      customerId: customer.id,
      subscriptionId: subscription.id, // Make sure this is returned
      invoiceId: invoice.id,
    };
  } catch (error) {
    console.error("🔴 ERROR:", error);
    return {
      error: "Failed to create subscription",
      status: 400,
      success: false,
    };
  }
};

export const updateSubscription = async (subscription: Stripe.Subscription) => {
  try {
    const userId = subscription.metadata.userId;

    await prismaClient.user.update({
      where: { id: userId },
      data: {
        subscription: subscription.status === "active" ? true : false,
      },
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
  }
};
