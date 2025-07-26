import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { type FeatureCard } from "@/types";

const FeatureCard = ({ Icon, heading, link }: FeatureCard) => {
  return (
    <Link
      href={link}
      className="group relative px-8 py-8 flex flex-col items-start justify-between gap-8 rounded-2xl border border-border/50 bg-gradient-to-br from-secondary/80 via-secondary/60 to-secondary/40 backdrop-blur-xl hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02] overflow-hidden min-h-[200px]"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-radial from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-radial from-accent/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-lg" />

      {/* Icon container */}
      <div className="relative z-10 p-4 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25">
        <div className="text-primary group-hover:text-primary-foreground transition-colors duration-300">
          {Icon}
        </div>
      </div>

      {/* Content section */}
      <div className="relative z-10 w-full">
        <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight mb-4">
          {heading}
        </p>

        {/* Action indicator */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-all duration-300">
          <span className="font-medium">Get started</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </Link>
  );
};

export default FeatureCard;
