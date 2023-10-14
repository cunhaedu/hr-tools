import { useFormContext } from 'react-hook-form';

import { registerCompanySchemaType } from '@/schemas/register-company.schema';
import { statesList } from '@/utils/states-list';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { SelectCity } from '../components/select-city';

export function RegisterCompanyFormeStep2() {
  const { control, watch, setValue } = useFormContext<registerCompanySchemaType>();

  const selectedUf = watch('state');

  function onSelectedUFChange(field: string) {
    setValue('state', field);
    setValue('city', '');
  }

  return (
    <>
      <div className='flex justify-center items-center gap-4'>
        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>UF</FormLabel>
              <Select onValueChange={onSelectedUFChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue className='min-w-full' placeholder="Selecione uma UF" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statesList.map((state) => (
                    <SelectItem
                      key={state.sigla}
                      value={state.sigla}
                    >
                      {state.sigla}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <SelectCity uf={selectedUf} />
      </div>

      <div className='flex justify-center items-center gap-4'>
        <FormField
          control={control}
          name="cep"
          defaultValue=""
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="Digite o cep da empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="streetNumber"
          defaultValue=""
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input placeholder="Digite o número da empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="street"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Logradouro</FormLabel>
            <FormControl>
              <Input placeholder="Digite o Logradouro da empresa" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="neighborhood"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bairro</FormLabel>
            <FormControl>
              <Input placeholder="Digite o bairro da empresa" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
