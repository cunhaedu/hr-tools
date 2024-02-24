import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { authOptions } from '../lib/next-auth/auth-options';
import { Footer } from '@/components/footer';
import { TopBar } from '@/components/topBar';

interface LandingLayoutProps {
  readonly children: ReactNode;
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
  const session = await getServerSession(authOptions);

  if(session) {
    redirect('/dashboard');
  }

  return (
    <div>
      <TopBar />
      <main className="md:pt-0 mx-auto flex h-[calc(100vh-6rem)] max-w-7xl flex-col justify-between px-4">
        {children}
        <Footer />
      </main>
    </div>
  )
}
