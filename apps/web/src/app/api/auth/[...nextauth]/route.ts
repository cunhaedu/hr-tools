import NextAuth from "next-auth/next";

import { authOptions } from '@/app/lib/next-auth/auth-options';

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
