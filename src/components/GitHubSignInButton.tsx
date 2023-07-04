"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";

import githubWhiteIcon from "../../public/github-mark-white.png";
import githubIcon from "../../public/github-mark.png";

export default function GithubSignInButton() {
  const { resolvedTheme } = useTheme();

  const handleClick = () => {
    signIn("github");
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex items-center w-1/2 justify-center mt-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      <Image
        src={resolvedTheme === "dark" ? githubIcon : githubWhiteIcon}
        alt="Github Icon"
        width={20}
        height={20}
        className="mr-3"
      />
      <span>Continue with GitHub</span>
    </button>
  );
}
