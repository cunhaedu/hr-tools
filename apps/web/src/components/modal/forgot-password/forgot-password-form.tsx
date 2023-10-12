"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { forgotPasswordSchema } from '@/schemas/forgot-password.schema';
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ForgotPasswordFormProps {
  handleFormChange(form: 'signIn' | 'forgotPassword' | 'registerCompany'): void;
}

export function ForgotPasswordForm({ handleFormChange }: ForgotPasswordFormProps) {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    console.log(values);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Esqueceu sua senha?</DialogTitle>
        <DialogDescription>
          Informe seu email para continuar.
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

          <div className="flex flex-col gap-4 mt-8">
            <Button type="submit" size="lg" className="w-full">
              Continuar
            </Button>

            <Button
              type="button"
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => handleFormChange('signIn')}
            >
              Voltar
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
