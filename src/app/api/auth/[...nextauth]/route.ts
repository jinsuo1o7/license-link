import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUserIfNotExists } from "@/service/userService";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      if (!email) return false;
      await createUserIfNotExists({ id, name, email, image });
      return true;
    },
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          id: token.id as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
