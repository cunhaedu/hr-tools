"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

import { AccountVerificationForm } from './account-verification-form';
import { useToast } from '@/components/ui/use-toast';

interface AccountVerificationProps {
  readonly params: {
    token: string
  }
}

export default function AccountVerification({ params }: AccountVerificationProps) {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    axios.post<{ isValid: boolean }>('/api/token/verify', {
      token: params.token
    })
      .then(() => setIsTokenValid(true))
      .catch(response => {
        console.log(response);

        toast({
          title: 'Token inválido',
          description: 'O token fornecido é inválido. Caso a empresa não tenha sido verificada você pode tentar gerar um novo token.',
          variant: 'destructive',
        });
        // router.replace('/');
      });
  }, [params.token, router, toast]);

  // if(!isTokenValid) {
  //   return <div className='h-[calc(100vh-6rem)]'></div>;
  // }

  return (
    <div className="container h-[calc(100vh-6rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <aside className="hidden h-full lg:flex items-center justify-center p-2">
        <Image
          src="/static/illustrations/account_validation.png"
          alt='validation account image'
          width={400}
          height={400}
        />
      </aside>

      <main className="h-full mx-auto flex w-full flex-col justify-center sm:w-[350px]">
        <AccountVerificationForm token={params.token} />
      </main>
    </div>
  );
}
