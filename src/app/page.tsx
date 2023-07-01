import CredentialsForm from "../../components/CredentialsForm";
import GoogleSignInButton from "../../components/GoogleSignInButton";

export default async function SignIn() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center ">
        <GoogleSignInButton />
        <span className="text-2xl text-black text-center mt-8">Or</span>
        <CredentialsForm />
      </div>
    </div>
  );
}
