import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

type ChildrenProps<T = undefined> = T extends undefined
  ? {
      children?: ReactNode;
    }
  : T & { children: ReactNode };

const Layout = ({ children }: ChildrenProps) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#8c5cff",
        },
        elements: {
          formButtonPrimary: "bg-primary text-white",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default Layout;
