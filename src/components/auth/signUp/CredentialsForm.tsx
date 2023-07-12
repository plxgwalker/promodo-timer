"use client";

import { useState } from "react";
import bcrypt from "bcrypt";
// import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import { PrismaClient } from "@prisma/client";
// import UserService from "@/services/userService";

import { SALT_ROUNDS } from "../../../constants";

export default function credentialsForm() {
  const [error, setError] = useState<string | null>(null);

  // const userService = new UserService();
  const prisma = new PrismaClient();

  // const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userEmail = data.get("email") as string;
    const userPassword = data.get("password") as string;
    const userConfirmPassword = data.get("confirmPassword") as string;

    if (userPassword !== userConfirmPassword) {
      setError("Passwords do not match");
      console.error("Passwords do not match");
      return;
    } else if (await prisma.user.findUnique({ where: { email: userEmail } })) {
      setError("Email already taken");
      console.error("Email already taken");
      return;
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: userEmail,
        },
      });

      // const newUserPassword = await prisma.userPassword.create({
      //   data: {
      //     hashedPassword: await bcrypt.hash(userPassword, SALT_ROUNDS),
      //     userId: newUser.id,
      //   },
      // });

      // const signInResponse = await signIn("credentials", {
      //   email: data.get("email") as string,
      //   password: data.get("password") as string,
      //   redirect: false,
      // });

      // if (signInResponse && !signInResponse.error) {
      //   if (typeof window !== "undefined") {
      //     const { useRouter } = require("next/router");
      //     const router = useRouter();
      //     router.push("/");
      //   }
      // } else {
      //   console.log("Error: ", signInResponse);
      //   setError("Incorrect email address or password.");
      // }

      // router.push("/auth/signin");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        {error && (
          <span className="p-3 block text-lg text-center font-semibold text-black bg-rose-500 shadow-lg rounded-xl">
            {error}
          </span>
        )}
        <label
          htmlFor="email"
          className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="flex items-center w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="example@example.com"
          required
        />
      </div>
      <div className="mb-6 relative container">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="flex items-center w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="••••••••"
          required
        />
      </div>
      <div className="mb-6 relative container">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="password"
          className="flex items-center w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create new account
      </button>
    </form>
  );
}
