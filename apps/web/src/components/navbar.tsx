import { UserNav } from './user-nav';
import { ThemeToggle } from './theme-toggle';
import { MobileSidebar } from './mobile-sidebar';

export function Navbar() {
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar />

      <div className="flex w-full justify-end gap-4 items-center">
        <ThemeToggle />
        <UserNav />
      </div>
    </div>
  )
}
