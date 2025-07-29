import React from "react";
import { type SubscriptionModal } from "@/types";
import { useRouter } from "next/navigation";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Loader2, Plus, CreditCard, Shield, Zap, Crown } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  onGetStripeClientSecret,
  updateSubscription,
} from "@/actions/stripe.actions";
import Stripe from "stripe";

const SubscriptionModal = ({ user }: SubscriptionModal) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Fix hydration error by ensuring component is mounted
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      if (!stripe || !elements) {
        return toast.error("Stripe elements not found");
      }

      const intent = await onGetStripeClientSecret(user.email, user.id);

      if (!intent.secret) {
        throw new Error("Failed to get Stripe client secret");
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        return toast.error("Card element not found");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        intent.secret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      console.log("Payment Successful:", paymentIntent);

      // Update user subscription status in database
      if (paymentIntent.status === "succeeded") {
        // Get the subscription from the intent metadata or create a subscription object
        const subscriptionData = {
          id: intent.subscriptionId,
          status: "active" as const,
          metadata: {
            userId: user.id,
          },
        } as unknown as Stripe.Subscription;

        await updateSubscription(subscriptionData);
        toast.success("Payment successful! Subscription activated!");

        // Use Next.js router refresh to update the UI
        router.refresh();

        // Optional: Add a small delay to ensure the refresh takes effect
        setTimeout(() => {
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      toast.error("Error processing payment: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-[2px] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
        <div className="flex items-center gap-2 rounded-[10px] bg-gray-900 px-6 py-3 font-semibold text-gray-100 transition-all duration-300 group-hover:bg-gray-800">
          <Plus className="w-5 h-5" />
          Create Webinar
        </div>
      </button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm font-normal text-primary hover:bg-primary-20">
          <Plus className="w-5 h-5" />
          Create Webinar
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto bg-gray-950 rounded-2xl shadow-2xl border border-gray-800 p-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-6 text-white">
          <DialogHeader className="space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="w-6 h-6" />
              <DialogTitle className="text-2xl font-bold text-center text-white">
                Spotlight Premium
              </DialogTitle>
            </div>
            <p className="text-center text-blue-100 text-sm">
              Unlock unlimited webinars and advanced features
            </p>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-gray-950">
          {/* Features highlight */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-purple-900/30 border border-purple-500/30 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs text-gray-300">Unlimited Access</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-900/30 border border-blue-500/30 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs text-gray-300">Secure Payments</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-cyan-900/30 border border-cyan-500/30 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-xs text-gray-300">Easy Billing</span>
            </div>
          </div>

          {/* Payment form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment Information
              </label>
              <div className="relative">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#F3F4F6",
                        fontFamily: "'Inter', sans-serif",
                        backgroundColor: "#1F2937",
                        "::placeholder": {
                          color: "#6B7280",
                        },
                      },
                      invalid: {
                        color: "#EF4444",
                      },
                    },
                  }}
                  className="border-2 border-gray-700 focus-within:border-purple-500 transition-colors duration-200 rounded-lg p-4 w-full bg-gray-800"
                />
              </div>
            </div>

            {/* Security notice */}
            <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300">
                Your payment information is secure and encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 pt-0 flex flex-col sm:flex-row gap-3 bg-gray-950">
          <DialogClose
            className="flex-1 px-4 py-2 border-2 border-gray-700 rounded-lg text-gray-300 font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleConfirm}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                Subscribe Now
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
