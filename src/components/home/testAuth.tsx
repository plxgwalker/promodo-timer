"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function TestAuth(props: any) {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <span>
        Signed in as <span className="font-black"></span>
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
    redirect("/");
  }
}
