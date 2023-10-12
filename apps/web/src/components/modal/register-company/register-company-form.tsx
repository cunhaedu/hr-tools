"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { registerCompanySchema } from '@/schemas/register-company.schema';
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

interface RegisterCompanyFormProps {
  handleFormChange(form: 'signIn' | 'forgotPassword' | 'registerCompany'): void;
}

export function RegisterCompanyForm({ handleFormChange }: RegisterCompanyFormProps) {
  const form = useForm<z.infer<typeof registerCompanySchema>>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof registerCompanySchema>) {
    console.log(values);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Abra uma conta para a sua empresa</DialogTitle>
        <DialogDescription>
          Inicie hoje mesmo com nosso sistema!
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome empresarial</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome da empresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o CNPJ da empresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit" size="lg" className="w-full">
              Continuar
            </Button>
          </DialogFooter>
        </form>
      </Form>

      <DialogFooter className='flex flex-col gap-4 justify-center'>
        <Separator className="mb-2" />

        <span className='text-center'>
          Já tem um cadastro com email e senha?
        </span>
        <Button
          variant="ghost"
          size="lg"
          className="w-full font-semibold text-primary hover:text-primary"
          onClick={() => handleFormChange('signIn')}
        >
          Realizar login
        </Button>
      </DialogFooter>
    </>
  )
}
