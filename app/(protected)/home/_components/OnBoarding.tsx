import React from "react";
import Link from "next/link";
import { CircleCheck, ChevronRight } from "lucide-react";

import { onBoardingSteps } from "@/lib/data";

const OnBoarding = () => {
  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Getting Started
        </h2>
        <p className="text-sm text-muted-foreground">
          Complete these steps to set up your account
        </p>
      </div>

      {/* Steps List */}
      <div className="flex flex-col gap-2">
        {onBoardingSteps.map((step, index) => (
          <Link
            key={index}
            href={step.link}
            className="group relative flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-gradient-to-r from-background to-background/50 hover:from-primary/5 hover:to-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-md hover:shadow-primary/5 hover:scale-[1.02]"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Step Number Badge */}
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-medium text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {index + 1}
              </div>
              {/* Connecting line for all but last item */}
              {index < onBoardingSteps.length - 1 && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-border to-transparent" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                {step.title}
              </p>
            </div>

            {/* Check Icon & Arrow */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <CircleCheck className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100" />
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
            </div>

            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-xl" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OnBoarding;
