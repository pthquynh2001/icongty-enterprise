import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { AuthOptions, Session, User as TUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import Google, { GoogleProfile } from 'next-auth/providers/google';
import axios from 'axios';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { account, password } = credentials as {
          account: string;
          password: string;
        };
        try {
          await connectMongoDB();
          const user = await User.findOne({
            $or: [{ email: account }, { username: account }],
          });
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch (err) {
          console.log(err);
        }
      },
    }),
    Google({
      name: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',

      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, session, trigger, account, profile }) {
      if (trigger === 'update') {
        if (session?.email) token.email = session.email;
        if (session?.firstName) token.firstName = session.firstName;
        if (session?.lastName) token.lastName = session.lastName;
        if (session?.username) token.username = session.username;
        if (session?.phone) token.phone = session.phone;
        if (session?.picture) token.picture = session.picture;
      }
      if (account?.provider === 'credentials') {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.firstName = user.firstName;
          token.lastName = user.lastName;
          token.username = user.username;
          token.phone = user.phone;
          token.picture = user.picture;
        }
      }
      if (account?.provider === 'google') {
        await connectMongoDB();
        if (profile?.email) {
          const userExist = await User.findOne(
            { email: profile.email },
            { password: 0 }
          );
          if (userExist) {
            token.id = userExist.id;
            token.email = userExist.email;
            token.firstName = userExist.firstName;
            token.lastName = userExist.lastName;
            token.username = userExist.username;
            token.phone = userExist.phone;
            token.picture = userExist.picture;
          }
        }
      }
      return token;
    },
    async signIn({ profile, account }) {
      if (account?.provider === 'google') {
        console.log('profile', profile);
        try {
          await connectMongoDB();
          if (profile) {
            const userExist = await User.findOne(
              { email: profile.email },
              { password: 0 }
            );
            if (!userExist) {
              await User.create({
                email: profile.email,
                firstName: profile.given_name,
                lastName: profile.family_name,
                picture: profile.picture,
                username: profile.email?.split('@')[0] ?? profile.email,
                password: ' ',
              });
            }
            console.log('profile', profile);
          }

          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          username: token.username,
          phone: token.phone,
          picture: token.picture,
        },
      };
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};
