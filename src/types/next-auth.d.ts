import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';
import { GoogleProfile } from 'next-auth/providers/google';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    picture: string;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: User & DefaultSession['user'];
  }
  interface Profile extends DefaultProfile, GoogleProfile {}
}
