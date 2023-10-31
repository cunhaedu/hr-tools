import { RegisterCompany } from '@/components/modal/register-company';
import { SignIn } from '@/components/modal/sign-in';

export default function Home() {
  return (
    <div className="relative mx-auto flex max-w-3xl flex-col justify-center pt-4">
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
  )
}
