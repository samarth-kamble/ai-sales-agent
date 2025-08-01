"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, PlusCircle, Sparkles } from "lucide-react";

import { type SuccessStep } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SuccessStep = ({ webinarLink, onCreateNew, onClose }: SuccessStep) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(webinarLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative text-center space-y-8 py-12 px-8 bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-400/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400/60 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Success icon with animation */}
      <div className="flex items-center justify-center relative">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 shadow-lg shadow-green-500/25 animate-pulse">
          <Check className="h-8 w-8 text-white" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-ping opacity-20"></div>
      </div>

      {/* Success message */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-green-500 animate-pulse" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Webinar Created Successfully!
          </h2>
          <Sparkles className="h-5 w-5 text-green-500 animate-pulse delay-500" />
        </div>
        <p className="text-muted-foreground text-lg">
          Your webinar is ready to go! Share the link below with your audience.
        </p>
      </div>

      {/* Link sharing section */}
      <div className="space-y-4">
        <div className="flex items-center max-w-lg mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl border border-green-200/50 dark:border-green-800/50 shadow-lg overflow-hidden">
          <Input
            value={webinarLink}
            readOnly
            className="bg-transparent border-none flex-1 px-4 py-3 text-sm font-mono focus:ring-0"
            placeholder="Webinar link will appear here..."
          />
          <Button
            onClick={handleCopyLink}
            variant="ghost"
            size="sm"
            className={`mx-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              copied
                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                : "hover:bg-green-50 dark:hover:bg-green-900/30"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
              </>
            )}
          </Button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
          <Link href={webinarLink} target="_blank" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/50 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview Webinar
            </Button>
          </Link>
        </div>
      </div>

      {/* Create another webinar */}
      {onCreateNew && (
        <div className="pt-6 border-t border-green-200/30 dark:border-green-800/30">
          <Button
            onClick={onCreateNew}
            variant="outline"
            className=" text-white shadow-lg shadow-green-500/25 transition-all duration-200 hover:shadow-xl hover:scale-105"
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Create Another Webinar
          </Button>
        </div>
      )}
    </div>
  );
};

export default SuccessStep;
