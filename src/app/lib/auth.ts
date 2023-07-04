import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import UserService from "../../services/userService";
import UserPasswordService from "../../services/userPasswordService";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  adapter: PrismaAdapter(prisma),

  debug: true,

  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const userService = new UserService();
        const currentUser = await userService.getUserByEmail(credentials.email);

        if (currentUser == null) {
          throw new Error("User not found");
        }

        const userPasswordService = new UserPasswordService();
        const currentUserPassword =
          await userPasswordService.getUserPasswordByUserId(currentUser.id);

        if (!currentUserPassword) {
          throw new Error("User password not found");
        }

        const match = await bcrypt.compare(
          credentials.password,
          currentUserPassword.hashedPassword
        );

        if (match) {
          return currentUser;
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
};
