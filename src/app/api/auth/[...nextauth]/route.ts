import bcrypt from 'bcrypt';
import prisma from '@/src/server/db';
import NextAuth, { User } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  // ======= ADAPTER -->
  adapter: PrismaAdapter(prisma),

  // ======= PROVIDERS -->
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials): Promise<User | null> {
        if (!credentials!.email || !credentials!.password) return null;
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials!.email },
          });
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(
            credentials?.password as string,
            user.password as string
          );

          if (!passwordMatch) return null;
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  // ======= SESSION SETTINGS -->
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,

  // ======= PAGES -->
  pages: {
    signIn: '/auth/signup',
    signOut: '',
    error: '/auth/signup',
  },

  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      // I skipped the line below coz it gave me a TypeError
      // session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
  // ======= EVENT MONITOR -->
  //   events: {
  //     async signIn(message) {
  //       console.log(message);
  //     },
  //   },

  // ======= DEBUG MODE -->
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST, handler as HEAD };
