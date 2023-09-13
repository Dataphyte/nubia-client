import NextAuth, { User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/src/server/mongodb';
import UserModel from '@/src/server/models/user.model';
import { UserInterface } from '@/src/server/server';
import connectDB from '@/src/server/mongoose';
import mongoose from 'mongoose';

const mongo = connectDB();

const handler = NextAuth({
  // ======= ADAPTER -->
  adapter: MongoDBAdapter(clientPromise)
  ),

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

      async authorize(credentials): Promise<any | null> {
        if (!credentials!.email || !credentials!.password) return null;
        try {
          const user = await UserModel.findOne({ email: credentials?.email });
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

  // ======= EVENT MONITOR -->
  //   events: {
  //     async signIn(message) {
  //       console.log(message);
  //     },
  //   },

  // ======= DEBUG MODE -->
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
