import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { type FeatureSectionLayout } from "@/types";

const FeatureSectionLayout = ({
  children,
  heading,
  link,
  className,
}: FeatureSectionLayout) => {
  return (
    <div
      className={`group relative p-8 lg:p-10 flex items-center justify-between flex-col gap-8 lg:gap-10 border rounded-3xl border-border/50 bg-gradient-to-br from-background/95 via-background/90 to-background/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-primary/20 overflow-hidden ${className}`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-xl" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 w-full flex flex-col gap-8 lg:gap-10">
        {/* Children content with enhanced styling */}
        <div className="transform group-hover:scale-[1.02] transition-transform duration-300">
          {children}
        </div>

        {/* Header and link section */}
        <div className="w-full justify-between items-center flex flex-wrap gap-6 lg:gap-10">
          <h3 className="sm:w-[70%] font-bold text-2xl lg:text-3xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent leading-tight">
            {heading}
          </h3>
          <Link
            href={link}
            className="group/link relative text-primary font-semibold text-base lg:text-lg flex items-center justify-center px-4 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
          >
            <span className="relative z-10">View</span>
            <MoveRight className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" />

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureSectionLayout;
