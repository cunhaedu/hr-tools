import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { TopBar } from '@/components/topBar'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <div className="h-screen-ios relative z-20 mx-auto flex h-screen max-w-7xl flex-col justify-between px-4">
        <TopBar />

        <div className="relative mx-auto flex max-w-3xl flex-col justify-center">
          <div className="max-w-[725px] text-center">
            <h1 className="font-bold md:text-[70px] md:leading-[85px] tracking-[-1.024px;] text-5xl relative mb-8">
              O software mais moderno de 9box
            </h1>

            <div className="sm:px-20">
              <p className="text-base md:text-xl tracking-[-0.16px] text-muted-foreground">
                Crie estratégias para valorização, retenção e desenvolvimento
                dos seus colaboradores a partir da matriz 9Box
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="w-48" asChild>
              <Link href="/login" className='flex justify-center items-center'>
                Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="secondary" className="w-48" asChild>
              <Link href="/register-company" className='flex justify-center items-center'>
                Registrar empresa
              </Link>
            </Button>
          </div>
        </div>

        <Footer />
      </div>
      <Image
        className="absolute top-[220px] left-0 z-[10] h-full w-full select-none md:top-0"
        fill
        priority
        src="/static/bg.webp"
        alt={''}
        style={{ position: 'absolute' }}
      />
    </>
  )
}
