import React from "react";
import { Elements } from "@stripe/react-stripe-js";

import { useStripeElements } from "@/hooks/useStripeElements";

export const StripeElements = ({ children }: { children: React.ReactNode }) => {
  const { StripePromise } = useStripeElements();
  const promise = StripePromise();

  return promise && <Elements stripe={promise}>{children}</Elements>;
};
