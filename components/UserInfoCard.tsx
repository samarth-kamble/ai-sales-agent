import React from "react";
import { User, Mail } from "lucide-react";

import { type UserInfoCard } from "@/types";
import { cn } from "@/lib/utils";

const UserInfoCard = ({ customer, tags, className }: UserInfoCard) => {
  return (
    <div
      className={cn(
        "group relative w-full max-w-xs p-4 rounded-xl border border-gray-600 backdrop-blur-xl  shadow-xl hover:shadow-black/50 transition-all duration-500 hover:border-gray-500 hover:-translate-y-2 overflow-hidden",
        className
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute -bottom-5 -left-5 w-24 h-24   rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40  rounded-full blur-3xl" />
      </div>

      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse p-[1px]">
        <div className="w-full h-full rounded-xl" />
      </div>

      <div className="relative z-10">
        {/* Header section with avatar */}
        <div className="flex items-center gap-3 mb-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600/30 to-gray-700/20 border-2 border-gray-500/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>

          {/* Name and email */}
          <div className="flex-1">
            <h3 className="font-bold text-base text-white group-hover:text-gray-300 transition-colors duration-300 leading-tight mb-1">
              {customer.name}
            </h3>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-white/70" />
              <p className="text-xs text-white/70 font-medium">
                {customer.email}
              </p>
            </div>
          </div>
        </div>

        {/* Tags with enhanced styling */}
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 hover:scale-105 hover:-translate-y-0.5",
                index === 0
                  ? "text-emerald-700  border-emerald-300/50 hover:border-emerald-400"
                  : index === 1
                  ? "text-blue-700  border-blue-300/50 hover:border-blue-400"
                  : "text-purple-700  border-purple-300/50 hover:border-purple-400"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
