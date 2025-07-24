import { constructMetadata } from "@/lib/metadata";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;

export const metadata = constructMetadata({
  title: "Sign Up | Spotlight-AI",
});
