import Link from 'next/link';
import clsx from 'clsx';

import { Separator } from './ui/separator';
import { GithubIcon } from 'lucide-react'

interface MenuProps extends React.ComponentPropsWithoutRef<'nav'> {}

interface MenuItemProps extends React.ComponentPropsWithoutRef<'li'> {
  href: string;
}

function MenuItem({ className, children, href, ...props }: MenuItemProps) {
  return (
    <li className="inline-flex items-center justify-center" {...props}>
      <Link
        className={clsx(
          'text-muted-foreground inline-flex h-8 items-center justify-center rounded-md text-sm',
          'hover:text-foreground hover:bg-muted-foreground/20',
          'outline-none focus:bg-muted-foreground/20 focus:ring-2 focus:ring-muted-foreground/20',
          className
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  )
}

export function Menu({ className, ...props }: MenuProps) {
  return (
    <nav
      className={clsx('flex items-center gap-2', className)}
      {...props}
    >
      <ul className="flex gap-2">
        <MenuItem className="w-full px-2" href="/about">
          Sobre
        </MenuItem>
      </ul>

      <Separator orientation="vertical" className="h-6" />

      <ul className="flex gap-2">
        <MenuItem className="w-full px-2" href="/about">
          <GithubIcon className="w-5 h-5" />
        </MenuItem>
      </ul>
    </nav>
  )
}
