"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ReactNode } from 'react';

interface ThemeProviderCustomProps extends ThemeProviderProps {
  readonly children: ReactNode;
}

export function ThemeProvider({ children, ...props }: ThemeProviderCustomProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
