import CredentialProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from 'next-auth';
import { api } from '@/services/api';

export const authOptions : NextAuthOptions = {
  providers:[
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) : Promise<any>{
        try {
          const { data } = await api.post('/users/sign-in', {
            email: credentials?.email,
            password: credentials?.password
          });

          return {
            user: {
              name: data.name,
              id: data.id,
              permissions: data.permissions
            },
            jwt: data.token,
          };
        } catch (error) {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/"
  },
  callbacks: {
    async jwt(data) {
      return { ...data.token, ...data.user }
    },
    async session(data) {
      data.session.user = data.token.user as any;
      data.session.jwt = data.token.jwt as any;

      return data.session
    },
  },
}
