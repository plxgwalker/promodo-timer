"use client";

import { signIn, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TestAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/signin");
  };

  if (status === "authenticated") {
    return (
      <span>
        Logged in as <span className="font-semibold"></span>
        {session.user?.name}
        <button
          onClick={() => signOut()}
          className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
        >
          Log out
        </button>
      </span>
    );
  } else if (status === "loading") {
    return <span>Loading...</span>;
  } else {
    return (
      <span>
        You are not logged in, pls sign in
        <button
          onClick={handleClick}
          className="ml-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md"
        >
          Sign In
        </button>
      </span>
    );
  }
}
