import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      phone: number;
      password: string;
    } & DefaultSession['user'];
  }
  //  extends `TokenSet`, which is different tokens returned by OAuth Providers.
  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phone: number;
  }
}
