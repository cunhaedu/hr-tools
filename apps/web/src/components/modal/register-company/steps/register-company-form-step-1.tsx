"use-client"

import { useFormContext } from 'react-hook-form';

import { registerCompanySchemaType } from '@/schemas/register-company.schema';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

export function RegisterCompanyFormeStep1() {
  const { control } = useFormContext<registerCompanySchemaType>();

  return (
    <>
      <FormField
        control={control}
        name="name"
        defaultValue=""
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
        control={control}
        name="cnpj"
        defaultValue=""
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
    </>
  )
}
