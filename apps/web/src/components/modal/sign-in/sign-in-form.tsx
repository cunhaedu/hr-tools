"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { signInSchema, signInSchemaType } from '@/schemas/sign-in.schema';
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  CustomModalDescription,
  CustomModalFooter,
  CustomModalHeader,
  CustomModalTitle,
} from "@/components/custom-modal";
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface SignInFormProps {
  handleFormChange(form: 'signIn' | 'forgotPassword' | 'registerCompany'): void;
}

export function SignInForm({ handleFormChange }: Readonly<SignInFormProps>) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: signInSchemaType) {
    const res = await signIn<'credentials'>('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });

    if(!res?.ok) {
      toast({
        title: "Erro ao realizar o login",
        description: "Verifique se seu usuário e senha estão corretos",
        variant: "destructive",
      });

      return;
    }

    router.push('/dashboard');
  }

  return (
    <>
      <CustomModalHeader>
        <CustomModalTitle>Bem vindo de volta!</CustomModalTitle>
        <CustomModalDescription>
          Para entrar no sistema informe seu email e senha.
        </CustomModalDescription>
      </CustomModalHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-2 min-h-[calc(100vh-24rem)]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o seu email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Digite sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <Button type="submit" size="lg" className="w-full">
              Entrar
            </Button>

            <Button
              type="button"
              size="lg"
              variant="outline"
              className="w-full"
              disabled={form.formState.isSubmitting}
              onClick={() => handleFormChange('forgotPassword')}
            >
              Esqueci a senha
            </Button>
          </div>
        </form>
      </Form>

      <CustomModalFooter className='flex flex-col gap-4 justify-center mt-8'>
        <Separator className="mb-2" />

        <span className='text-center'>Ainda não tem um cadastro?</span>
        <Button
          variant="ghost"
          size="lg"
          className="w-full font-semibold text-primary hover:text-primary"
          onClick={() => handleFormChange('registerCompany')}
        >
          Iniciar abertura de conta
        </Button>
      </CustomModalFooter>
    </>
  )
}
