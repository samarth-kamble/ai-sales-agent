import { prismaClient } from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      console.error("Missing code or state");
      return NextResponse.redirect(
        new URL(`/settings?success=false&message=Missing+required+parameters`)
      );
    }

    console.log("Processing Stripe Connect callback:", {
      code,
      stateId: state,
    });

    try {
      const response = await stripe.oauth.token({
        grant_type: "authorization_code",
        code,
      });

      await prismaClient.user.update({
        where: {
          id: state,
        },
        data: {
          stripeConnectId: response.stripe_user_id,
        },
      });

      console.log("Successfully Connected Stripe Account: ", {
        userId: state,
        stripeConnectId: response.stripe_user_id,
      });

      return NextResponse.redirect(
        new URL(
          `/settings?success=true&message=Stripe+account+connected+successfully`,
          request.url
        )
      );
    } catch (error) {
      console.error("Error connecting Stripe account:", error);
      return NextResponse.redirect(
        new URL(
          `/settings?success=false&message=${encodeURIComponent(
            (error as Error).message
          )}`,
          request.url
        )
      );
    }
  } catch (error) {
    console.error("Error processing Stripe Connect callback:", error);
    return NextResponse.redirect(
      new URL(
        `/settings?success=false&message=An+unexpected+error+occurred`,
        request.url
      )
    );
  }
}
