import { onAuthenticateUser } from "@/actions/auth.actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const AuthCallbackPage = async () => {
  try {
    const auth = await onAuthenticateUser();

    if (auth.status === 200 || auth.status === 201) {
      redirect("/home");
    }

    redirect("/");
  } catch (error) {
    console.error("Auth callback error:", error);
    redirect("/");
  }
};

export default AuthCallbackPage;
