"use client";

import Link from "next/link";

export default function LinkToSignUpPage() {
  return (
    <div className="py-6 mt-4 text-center text-sm text-gray-800 dark:text-white">
      Doesn't have an account?{" "}
      <Link
        className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
        href="/auth/signup"
      >
        Register here
      </Link>
    </div>
  );
}
