import { Footer } from '@/components/footer';
import { TopBar } from '@/components/topBar';
import { PropsWithChildren } from 'react';

export default async function LandingLayout({ children }: PropsWithChildren) {
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
