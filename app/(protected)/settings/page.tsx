import {
  LucideAlertCircle,
  LucideArrowRight,
  LucideCheckCircle2,
  LucideCreditCard,
  LucideShield,
  LucideBarChart3,
} from "lucide-react";
import React from "react";
import { onAuthenticateUser } from "@/actions/auth.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getStripeOAuthLink } from "@/lib/utils";

const SettingsPage = async () => {
  const userExist = await onAuthenticateUser();

  if (!userExist) {
    return redirect("/sign-in");
  }

  const isConnected = !!userExist?.user?.stripeConnectId;

  const stripeLink = await getStripeOAuthLink(
    "api/stripe-connect",
    userExist.user?.id || ""
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full mx-auto py-8 px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Payment Settings</h1>
            <p className="text-muted-foreground">
              Manage your payment processing and connect with Stripe to start
              accepting payments for your webinars.
            </p>
          </div>

          <div className="space-y-6">
            {/* Stripe Connect Card */}
            <div className="w-full p-6 border border-input rounded-lg bg-background shadow-sm">
              {/* Header */}
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center mr-4">
                  <LucideCreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-primary">
                    Stripe Connect
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Connect your Stripe account to start accepting payments
                  </p>
                </div>
              </div>

              {/* Status Card */}
              <div className="my-6 p-4 bg-muted rounded-md">
                <div className="flex items-start">
                  {isConnected ? (
                    <LucideCheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  ) : (
                    <LucideAlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">
                      {isConnected
                        ? "Your Stripe account is connected"
                        : "Your Stripe account is not connected yet"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isConnected
                        ? "You can manage your account settings and view analytics in your Stripe dashboard"
                        : "Connect your Stripe account to start processing payments and managing subscriptions"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  {isConnected
                    ? "You can reconnect or disconnect your Stripe account anytime"
                    : "Click the button below to connect your Stripe account"}
                </div>

                <Link
                  href={stripeLink}
                  className={`px-5 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-all ${
                    isConnected
                      ? "bg-muted hover:bg-muted/80 text-foreground border border-input"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isConnected ? (
                    <>
                      <LucideCreditCard size={16} />
                      Manage Account
                    </>
                  ) : (
                    <>
                      Connect with Stripe
                      <LucideArrowRight size={16} />
                    </>
                  )}
                </Link>
              </div>

              {/* Benefits Section */}
              {!isConnected && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-medium mb-3">
                    Why connect with Stripe?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <LucideShield className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Secure Payments</p>
                        <p className="text-xs text-muted-foreground">
                          Process payments securely from customers worldwide
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <LucideCreditCard className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Subscriptions</p>
                        <p className="text-xs text-muted-foreground">
                          Manage subscriptions and recurring billing
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <LucideBarChart3 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Analytics</p>
                        <p className="text-xs text-muted-foreground">
                          Access detailed financial reporting and analytics
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Payment Processing Section */}
            {isConnected && (
              <div className="p-6 border border-input rounded-lg bg-background shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Payment Processing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-md">
                    <h4 className="font-medium mb-2">Webinar Payments</h4>
                    <p className="text-sm text-muted-foreground">
                      Accept payments for paid webinars and manage ticket sales.
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <h4 className="font-medium mb-2">
                      Subscription Management
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Handle recurring subscriptions and membership plans.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
