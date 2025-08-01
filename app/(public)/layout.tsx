import React from "react";

const PublicRouteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full container mx-auto min-h-screen">{children}</div>
  );
};

export default PublicRouteLayout;
