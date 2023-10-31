"use client"

import { useEffect, useState } from 'react';
import { MenuIcon } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Sidebar } from './sidebar';

export function MobileSidebar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger className='md:hidden'>
        <MenuIcon />
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
