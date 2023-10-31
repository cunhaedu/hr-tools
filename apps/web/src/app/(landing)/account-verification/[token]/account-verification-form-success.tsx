import { useRouter } from 'next/navigation';

import SuccessAnimation from '@/animation/success.json';
import LottieAnimation from '@/components/Lottie';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/heading';

export function AccountVerificationFormSuccess() {
  const router = useRouter();

  return (
    <div className='flex gap-8 flex-col justify-center items-center'>
      <LottieAnimation
        lotti={SuccessAnimation}
        height={150}
        width={150}
        loop={false}
      />

      <Heading variant="h2" className='text-center' asChild>
        <h1>Conta validada com sucesso!</h1>
      </Heading>

      <span className='text-sm text-muted-foreground font-medium text-center'>
        Seu cadastro foi concluido com sucesso, agora você pode acessar sua
        conta e aproveitar ao máximo tudo que nossa ferramenta tem a oferecer!
      </span>

      <Button onClick={() => router.replace('/')} className='w-full'>
        Acessar plataforma!
      </Button>
    </div>
  )
}
