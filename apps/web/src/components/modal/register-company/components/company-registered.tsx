import LottieAnimation from '@/components/Lottie';
import {
  CustomModalDescription,
  CustomModalFooter,
  CustomModalHeader,
  CustomModalTitle
} from '@/components/custom-modal';

import emailVerification from '@/animation/email-verification.json'
import { Button } from '@/components/ui/button';

interface CompanyRegisteredProps {
  setOpen(open: boolean): void;
}

export function CompanyRegistered({ setOpen }: Readonly<CompanyRegisteredProps>) {
  return (
    <div>
      <CustomModalHeader>
        <CustomModalTitle>Cheque seu email!</CustomModalTitle>
        <CustomModalDescription>
          Um email de confirmação foi enviado para sua caixa de entrada.
        </CustomModalDescription>
      </CustomModalHeader>

      <div className='flex justify-center items-center h-[calc(100vh-250px)]'>
        <LottieAnimation lotti={emailVerification} height={320} width={320} />
      </div>

      <CustomModalFooter>
        <Button size="lg" className="w-full" onClick={() => setOpen(false)}>
          Entendi
        </Button>
      </CustomModalFooter>
    </div>
  );
}
