'use client';

import { SessionProvider as NextAuthProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session: any;
};

export default function SessionProvider({ children, session }: Props) {
  return (
    <NextAuthProvider session={session}>
      {children}
    </NextAuthProvider>
  );
}