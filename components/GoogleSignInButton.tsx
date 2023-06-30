import Image from "next/image";
import googleIcon from "../public/google.png";

export default async function GoogleSignInButton() {
  return (
    <button
      type="button"
      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex items-center"
    >
      <Image
        src={googleIcon}
        alt="Google Icon"
        width={24}
        height={24}
        className="mr-2"
      />
      <span>Continue with Google</span>
    </button>
  );
}
