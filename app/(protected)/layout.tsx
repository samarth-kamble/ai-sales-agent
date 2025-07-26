import React from "react";
import { redirect } from "next/navigation";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

import { onAuthenticateUser } from "@/actions/auth.actions";

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = async ({ children }: Props) => {
  const userExist = await onAuthenticateUser();

  if (!userExist) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full h-screen overflow-auto px-4 scrollbar-hide container mx-auto">
        <Header user={userExist.user!} />
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
