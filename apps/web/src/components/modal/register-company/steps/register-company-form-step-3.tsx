import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerCompanySchema } from '@/schemas/register-company.schema';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

export function RegisterCompanyFormeStep3() {
  const { control } = useFormContext<z.infer<typeof registerCompanySchema>>();

  return (
    <>
      <FormField
        control={control}
        name="cep"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <Input placeholder="Digite o cep da empresa" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <FormField
        control={control}
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
      /> */}
    </>
  )
}
