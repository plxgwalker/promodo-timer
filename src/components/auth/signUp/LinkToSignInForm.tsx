"use client";

import Link from "next/link";

export default function LinkToSignInPage() {
  return (
    <div className="py-6 mt-4 text-center text-sm text-gray-800 dark:text-white">
      Already have an account?{" "}
      <Link
        className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
        href="/auth/signin"
      >
        Login here
      </Link>
    </div>
  );
}
