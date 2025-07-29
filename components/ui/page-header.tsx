import React, { ReactNode } from "react";

interface PageHeaderProps {
  leftIcon?: ReactNode;
  mainIcon: ReactNode;
  rightIcon?: ReactNode;
  heading: string;
  placeholder?: string;
}

export function PageHeader({
  leftIcon,
  mainIcon,
  rightIcon,
  heading,
  placeholder,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex items-center justify-center gap-4">
        {leftIcon && <div className="text-muted-foreground">{leftIcon}</div>}
        <div className="p-2 rounded-full bg-primary/10">{mainIcon}</div>
        {rightIcon && <div className="text-muted-foreground">{rightIcon}</div>}
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {placeholder && (
          <p className="text-sm text-muted-foreground">{placeholder}</p>
        )}
      </div>
    </div>
  );
}
