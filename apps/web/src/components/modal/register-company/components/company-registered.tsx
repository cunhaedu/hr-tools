import LottieAnimation from '@/components/Lottie';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import emailVerification from '@/animation/email-verification.json'
import { Button } from '@/components/ui/button';

interface CompanyRegisteredProps {
  setOpen(open: boolean): void;
}

export function CompanyRegistered({ setOpen }: CompanyRegisteredProps) {
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Cheque seu email!</DialogTitle>
        <DialogDescription>
          Um email de confirmação foi enviado para sua caixa de entrada.
        </DialogDescription>
      </DialogHeader>

      <div className='flex justify-center items-center h-[calc(100vh-250px)]'>
        <LottieAnimation lotti={emailVerification} height={320} width={320} />
      </div>

      <DialogFooter>
        <Button size="lg" className="w-full" onClick={() => setOpen(false)}>
          Entendi
        </Button>
      </DialogFooter>
    </div>
  );
}
