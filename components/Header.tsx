"use client";
import React from "react";
import { redirect, usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { type Header } from "@/types";
import PurpleIcon from "@/components/icons/PurpleIcon";
import LighteningIcon from "@/components/icons/LighteningIcon";
import CreateWebinarButton from "@/components/CreateWebinarButton";
import { StripeElements } from "@/components/Stripe/StripeElements";
import SubscriptionModal from "@/components/Stripe/SubscriptionModal";

const Header = ({ user, stripeProducts }: Header) => {
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return redirect("/sign-in");

  return (
    <div className="w-full px-4 pt-10 sticky top-0 z-10 flex justify-between items-center flex-wrap gap-4 bg-background">
      {pathname.includes("pipeline") ? (
        <Button
          className="bg-primary/10 border border-border rounded-xl"
          variant={"outline"}
          onClick={() => router.push("/webinar")}
        >
          <ArrowLeft /> Back to Webinar
        </Button>
      ) : (
        <div className="px-4 py-2 flex justify-center text-bold items-center rounded-xl bg-background border border-border text-primary capitalize">
          {pathname.split("/")[1]}
        </div>
      )}

      <div className="flex gap-6 items-center flex-wrap ">
        <PurpleIcon>
          <LighteningIcon />
        </PurpleIcon>
        {user.subscription ? (
          <CreateWebinarButton stripeProducts={stripeProducts} />
        ) : (
          <StripeElements>
            <SubscriptionModal user={user} />
          </StripeElements>
        )}
      </div>
    </div>
  );
};

export default Header;
