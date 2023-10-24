import { useFormContext } from 'react-hook-form';

import { registerCompanySchemaType } from '@/schemas/register-company.schema';
import { InputMask } from '@/components/ui/input-mask';
import { Input } from '@/components/ui/input';
import {
  FormDescription,
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
} from '@/components/ui/form';

export function RegisterCompanyFormeStep3() {
  const { control } = useFormContext<registerCompanySchemaType>();

  return (
    <>
      <FormField
        control={control}
        name="phoneNumber"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número de celular</FormLabel>
            <FormControl>
              <InputMask
                mask="+55 (99) 99999-9999"
                placeholder="(99) 99999-999"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type='email' placeholder="Digite o email da empresa" {...field} />
            </FormControl>
            <FormDescription>
              Um email de confirmação será enviado para esse endereço
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='flex justify-center items-center gap-4'>
        <FormField
          control={control}
          name="responsibleFirstName"
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Primeiro nome</FormLabel>
              <FormControl>
                <Input type='text' placeholder="Digite seu primeiro nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="responsibleLastName"
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Último nome</FormLabel>
              <FormControl>
                <Input type='text' placeholder="Digite seu último nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}
