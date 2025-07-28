import React from "react";

import { cn } from "@/lib/utils";
import { type PurpleIcon } from "@/types";

const PurpleIcon = ({ className, children }: PurpleIcon) => {
  return (
    <div className={cn("px-4 py-2 iconBackground ", className)}>{children}</div>
  );
};

export default PurpleIcon;
