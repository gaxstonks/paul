
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        if (credentials.email === "test@test.com" && credentials.password === "123") {
          return { id: 1, email: credentials.email };
        }
        return null;
      }
    })
  ]
});
