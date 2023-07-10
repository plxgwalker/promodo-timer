import WelcomeText from "@/components/auth/signIn/WelcomeText";
import GoogleSignInButton from "../../../components/auth/signIn/GoogleSignInButton";
import GithubSignInButton from "../../../components/auth/signIn/GitHubSignInButton";
import CredentialsForm from "../../../components/auth/signIn/CredentialsForm";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession();
  if (session === null) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen p-5 bg-slate-100 dark:bg-black">
        <div className="w-full max-w-xl flex flex-col p-10 border-2 rounded-3xl border-slate-100 bg-slate-100 drop-shadow-2xl dark:border-zinc-950 dark:bg-zinc-950 dark:shadow-2xl dark:shadow-white">
          <WelcomeText />
          <div className="md:flex sm:space-x-4">
            <GoogleSignInButton />
            <GithubSignInButton />
          </div>
          <span className="py-6 mt-4 text-center font-semibold text-gray-800 dark:text-white">
            or
          </span>
          <CredentialsForm />
        </div>
      </div>
    );
  } else {
    redirect("/");
  }
}
