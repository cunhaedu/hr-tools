import { RegisterCompany } from '@/components/modal/register-company';
import { SignIn } from '@/components/modal/sign-in';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <div className="pt-28 md:pt-0 mx-auto flex h-[calc(100vh-6rem)] max-w-7xl flex-col justify-between px-4">
        <div className="relative mx-auto flex max-w-3xl flex-col justify-center">
          <div className="max-w-[725px] text-center">
            <h1 className="font-bold md:text-[70px] md:leading-[85px] tracking-[-1.024px;] text-5xl relative mb-8">
              O software mais moderno de 9box
            </h1>

            <p className="sm:px-20 text-base md:text-xl tracking-[-0.16px] text-muted-foreground">
              Crie estratégias para valorização, retenção e desenvolvimento
              dos seus colaboradores a partir da matriz 9Box
            </p>

            </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignIn />
            <RegisterCompany />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
