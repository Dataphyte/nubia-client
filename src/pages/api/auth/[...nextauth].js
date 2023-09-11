import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY,
    }),
  }),
  session: {
    maxAge: 30 * 24 * 60 * 60, // 1 month in seconds (default is 30 days)
  },
  pages: {
    SignIn: '/auth/signup',
    signOut: '',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;

      return session;
    },
    async jwt({ token, user, account, profile }) {
      account && (token.accessToken = account.access_token);
      return token;
    },
  },

  events: {
    async signIn(message) {
      console.log(message);
    },
  },
});
