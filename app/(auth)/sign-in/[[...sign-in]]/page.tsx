import { constructMetadata } from "@/lib/metadata";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;

export const metadata = constructMetadata({
  title: "Sign In | Spotlight-AI",
});
