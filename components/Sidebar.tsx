"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { sidebarData } from "@/lib/data";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="group w-18 sm:w-28 h-screen sticky top-0 py-8 px-3 sm:px-6 border-r border-border/50 bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur-xl flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
      {/* Logo Section */}
      <div className="w-full flex items-center justify-center mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 rounded-xl flex items-center justify-center shadow-md">
          <div className="w-6 h-6 bg-primary-foreground rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="w-full flex flex-col gap-3">
        {sidebarData.map((item, index) => {
          const isActive = pathname.includes(item.link);
          return (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.link}
                    className={`group/item relative flex items-center justify-center w-12 h-12 cursor-pointer rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "iconBackground shadow-md text-white"
                        : "hover:bg-primary/10 border border-transparent hover:border-primary/20"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-gray-200 rounded-r-full" />
                    )}

                    <item.icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-white"
                          : "text-muted-foreground group-hover/item:text-primary"
                      }`}
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="ml-2 bg-popover/95 backdrop-blur-sm border-border/50 shadow-xl"
                >
                  <p className="font-bold text-sm text-gray-200">
                    {item.title}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* Spacer to push user button to bottom */}
      <div className="flex-1" />

      {/* Bottom Section - User Button */}
      <div className="w-full flex flex-col items-center gap-4">
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />

        <div className="w-full flex items-center justify-center">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "ring-1 ring-border shadow-sm",
              },
            }}
          />
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-xl" />
      </div>
    </div>
  );
};

export default Sidebar;
