"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signInSchema } from '@/schemas/sign-in.schema';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';

interface SignInFormProps {
  handleFormChange(form: 'signIn' | 'forgotPassword' | 'registerCompany'): void;
}

export function SignInForm({ handleFormChange }: SignInFormProps) {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Bem vindo de volta!</DialogTitle>
        <DialogDescription>
          Para entrar no sistema informe seu email e senha.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
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
                  <Input placeholder="Digite sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 mt-8">
            <Button type="submit" size="lg" className="w-full">
              Entrar
            </Button>

            <Button
              type="button"
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => handleFormChange('forgotPassword')}
            >
              Esqueci a senha
            </Button>
          </div>
        </form>
      </Form>

      <DialogFooter className='flex flex-col gap-4 justify-center'>
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
      </DialogFooter>
    </>
  )
}
