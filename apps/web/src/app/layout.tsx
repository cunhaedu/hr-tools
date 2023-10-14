import { ThemeProvider } from '@/providers/theme-provider'
import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TopBar } from '@/components/topBar'
import { ReactQueryProvider } from '@/providers/react-query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ninebox',
  description: 'O software mais moderno de 9box do mercado!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <TopBar />
            {children}
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
