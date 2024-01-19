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
    } & DefaultSession['user'];
  }
  interface User extends DefaultUser {
    username: string | null;
    firstName: string;
    lastName: string;
    username: string;
  }
}
