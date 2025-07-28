import { type PageHeader } from "@/types";
import React from "react";
import PurpleIcon from "./icons/PurpleIcon";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const PageHeader = ({
  heading,
  mainIcon,
  leftIcon,
  rightIcon,
  children,
  placeholder,
}: PageHeader) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex justify-center sm:justify-between items-center gap-8 flex-wrap">
        <p className="text-primary text-4xl font-semibold">{heading}</p>
        <div className="relative md:mr-28">
          <PurpleIcon className="absolute -left-4 -top-3 -z-10 -rotate-45 py-3">
            {leftIcon}
          </PurpleIcon>
          <PurpleIcon className="z-10 backdrop-blur">{mainIcon}</PurpleIcon>
          <PurpleIcon className="absolute -right-4 -z-10 py-3 rotate-45 -top-3">
            {rightIcon}
          </PurpleIcon>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 sm:justify-between">
        <div className="flex-1 min-w-0 sm:max-w-md relative order-2 sm:order-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder={placeholder || "Search..."}
            className="pl-9 py-2 text-sm rounded-md h-9 w-full"
          />
        </div>
        <div className="flex-shrink-0 w-full sm:w-auto order-1 sm:order-2 scrollbar-hide overflow-x-auto">
          <div className="flex sm:justify-end min-w-max">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
