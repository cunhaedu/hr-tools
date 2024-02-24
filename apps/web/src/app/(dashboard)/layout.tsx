import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  readonly children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className='h-full relative'>
      <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]'>
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        <div className='p-4'>
          {children}
        </div>
      </main>
    </div>
  )
}
