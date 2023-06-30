import CredentialsForm from "../../components/CredentialsForm";
import GoogleSignInButton from "../../components/GoogleSignInButton";

export default async function SignIn() {
  return (
    <div className="">
      <GoogleSignInButton />
      <span className="text-2xl font-semibold text-black text-center mt-8">
        Or
      </span>
      <CredentialsForm />
    </div>
  );
}
