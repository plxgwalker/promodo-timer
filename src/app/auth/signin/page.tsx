import { getServerSession } from "next-auth";
import CredentialsForm from "../../../components/auth/signIn/CredentialsForm";
import GithubSignInButton from "../../../components/auth/signIn/GitHubSignInButton";
import GoogleSignInButton from "../../../components/auth/signIn/GoogleSignInButton";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession();
  console.log(session);

  if (session === null) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen py-2 bg-slate-800 dark:bg-slate-1000">
        <div className="w-full max-w-xl flex flex-col p-10 border-2 rounded border-gray-300 dark:border-slate-900 dark:bg-slate-900 text-left">
          <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <div className="flex flex-wrap">
            <GoogleSignInButton />
            <GithubSignInButton />
          </div>
          <span className="py-6 mt-2 text-center font-semibold text-gray-800 dark:text-white">
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
