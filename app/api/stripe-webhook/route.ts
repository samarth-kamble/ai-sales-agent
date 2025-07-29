import { updateSubscription } from "@/actions/stripe.actions";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const STRIPE_SUBSCRIPTION_EVENTS = new Set([
  "invoice.created",
  "invoice.finalized",
  "invoice.paid",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

const getStripeEvent = async (
  body: string,
  sig: string | null
): Promise<Stripe.Event> => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    throw new Error("Stripe webhook secret or signature is missing");
  }

  return stripe.webhooks.constructEvent(body, sig, webhookSecret);
};

export async function POST(request: NextRequest) {
  console.log("Received Stripe webhook request");
  const body = await request.text();

  const signature = (await headers()).get("Stripe-Signature");

  try {
    const stripeEvent = await getStripeEvent(body, signature);
    if (!STRIPE_SUBSCRIPTION_EVENTS.has(stripeEvent.type)) {
      console.log(`Unhandled event type: ${stripeEvent.type}`);
      return NextResponse.json(
        {
          received: true,
        },
        { status: 200 }
      );
    }
    const event = stripeEvent.data.object as Stripe.Subscription;

    const metadata = event.metadata;

    if (
      metadata.connectAccountPayments ||
      metadata.connectAccountSubscriptions
    ) {
      console.log("Skipping webhook for connected account");
      return NextResponse.json(
        {
          message: "Webhook processed successfully",
        },
        { status: 200 }
      );
    }

    switch (stripeEvent.type) {
      case "checkout.session.completed":

      case "customer.subscription.created":
      case "customer.subscription.updated":
        await updateSubscription(event);
        console.log("CREATED FROM WEBHOOK", event);
        return NextResponse.json({ received: true }, { status: 200 });
      default:
        console.log("Unhandled relevant event!", stripeEvent.type);
        return NextResponse.json({ received: true }, { status: 200 });
    }
  } catch (error) {
    console.error("Error processing Stripe webhook:", error);
    return new Response("Webhook Error", { status: 500 });
  }
}
