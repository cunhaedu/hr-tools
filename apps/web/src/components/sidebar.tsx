"use client"

import Link from 'next/link';

import { Logo } from './logo';
import { LayoutDashboardIcon, LucideIcon, UserCogIcon } from 'lucide-react';

const routes: Array<{ label: string; href: string; icon: LucideIcon; permission: any }> = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboardIcon,
    permission: null,
  },
  {
    label: 'Gerenciamento',
    href: '/management',
    icon: UserCogIcon,
    permission: null,
  },
]

export function Sidebar() {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full border-r border-primary-foreground bg-primary dark:bg-inherit">
      <div className='px-3 py-2'>
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <Logo />
        </Link>

        <div className="space-y-1">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-secondary-foreground/20 transition rounded-lg"
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
