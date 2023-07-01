"use client";

import Image from "next/image";
import googleIcon from "../public/google.png";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex items-center border-black border-solid"
    >
      <Image
        src={googleIcon}
        alt="Google Icon"
        width={18}
        height={18}
        className="mr-3"
      />
      <span>Continue with Google</span>
    </button>
  );
}
