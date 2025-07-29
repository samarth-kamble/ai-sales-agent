import React, { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWebinarStore } from "@/hooks/useWebinarStore";
import MultiStepForm from "./forms/MultiStepForm";
import BasicInfoStep from "./Steps/BasicInfoStep";
import CTAStep from "./Steps/CTAStep";
import AdditionalInfoStep from "./Steps/AdditionalInfoStep";
import Stripe from "stripe";

type Props = {
  stripeProducts: Stripe.Product[] | [];
};

const CreateWebinarButton = ({ stripeProducts }: Props) => {
  const { isModalOpen, setModalOpen, isComplete, setComplete } =
    useWebinarStore();
  const [webinarLink, setWebinarLink] = useState("");

  const steps = [
    {
      id: "basicInfo",
      title: "Basic Information",
      description:
        "Please fill out the standard info needded for your webinar.",
      component: <BasicInfoStep />,
    },
    {
      id: "cta",
      title: "CTA",
      description:
        "Please provide the end-point for your customers through your webinar",
      component: <CTAStep stripeProducts={stripeProducts} />,
    },
    {
      id: "additionalInfo",
      title: "Additional Information",
      description:
        "Please fill out information about additional options if necessary.",
      component: <AdditionalInfoStep />,
    },
  ];

  const handleComplete = (webinarId: string) => {
    setComplete(true);
    setWebinarLink(
      `${process.env.NEXT_PUBLIC_BASE_URL}/live-webinar/${webinarId}`
    );
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <button
          className="rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm font-normal text-primary hover:bg-primary-20"
          onClick={() => setModalOpen(true)}
        >
          <Plus />
          Create Webinar
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0 bg-transparent border-none">
        {isComplete ? (
          <div className="bg-muted text-primary rounded-lg overflow-hidden">
            <DialogTitle className="sr-only">Webinar Created</DialogTitle>
            {/* SuccessStep */}
          </div>
        ) : (
          <>
            <DialogTitle className="sr-only">Create Webinar</DialogTitle>
            <MultiStepForm steps={steps} onComplete={handleComplete} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateWebinarButton;
