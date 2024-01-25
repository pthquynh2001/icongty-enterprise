import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { AuthOptions, Session, User as TUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';

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
  ],
  callbacks: {
    async jwt({
      token,
      user,
      session,
      trigger,
    }: {
      token: JWT;
      user: TUser;
      session?: any;
      trigger?: 'signIn' | 'signUp' | 'update';
    }) {
      if (trigger === 'update') {
        if (session?.email) token.email = session.email;
        if (session?.firstName) token.firstName = session.firstName;
        if (session?.lastName) token.lastName = session.lastName;
        if (session?.username) token.username = session.username;
        if (session?.phone) token.phone = session.phone;
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
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
