import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.password) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return { id: user.id, name: user.name, email: user.email, plan: user.plan, planActiveUntil: user.planActiveUntil };
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.plan = (user as any).plan;
        token.planActiveUntil = (user as any).planActiveUntil ? new Date((user as any).planActiveUntil).toISOString() : null;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user = session.user || {};
      (session as any).user.plan = (token as any).plan;
      (session as any).user.planActiveUntil = (token as any).planActiveUntil;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions as any);
