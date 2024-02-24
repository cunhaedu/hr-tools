"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/components/ui/form';
import {
  AccountVerificationSchemaType,
  AccountVerificationSchema,
} from '@/schemas/account-verification.schema';

import { AccountVerificationFormSuccess } from './account-verification-form-success';

interface AccountVerificationFormProps {
  readonly token: string;
}

export function AccountVerificationForm({ token }: AccountVerificationFormProps) {
  const [isFormSuccessfullySubmitted, setIsFormSuccessfullySubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<AccountVerificationSchemaType>({
    resolver: zodResolver(AccountVerificationSchema),
    defaultValues: {},
  });

  async function onSubmit(values: AccountVerificationSchemaType) {
    const data = {
      password: values.password,
      token
    }

    try {
      await api.post('/companies/account-verification', data);

      setIsFormSuccessfullySubmitted(true);
    } catch (error) {
      toast({
        title: "Erro ao validar o cadastro!",
        description: "Verifique se o link está correto ou tente gerar um novo!",
        variant: "destructive",
      });
    }
  }

  if(isFormSuccessfullySubmitted) {
    return <AccountVerificationFormSuccess />
  }

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Verificação de conta
        </h1>
        <p className="text-sm text-muted-foreground">
          Para verificar a sua conta, entre com uma nova senha!
        </p>

        <span>State: {String(form.formState.isSubmitting)}</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder="Digite sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder="Confirme sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 mt-8">
            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              Verificar conta
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
