"use client"

import { useFormContext } from 'react-hook-form';

import { registerCompanySchemaType } from '@/schemas/register-company.schema';
import { useFetchCitiesByUF } from '@/queries/cities';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
} from '@/components/ui/form';

interface SelectCityProps {
  readonly uf?: string;
}

export function SelectCity({ uf }: SelectCityProps) {
  const { control } = useFormContext<registerCompanySchemaType>();

  const { data, isLoading } = useFetchCitiesByUF(uf);

  return (
    <FormField
      control={control}
      name="city"
      render={({ field }) => (
        <FormItem className='flex-1'>
          <FormLabel>Cidade</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar..." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {!isLoading && data && data.map((city) => (
                <SelectItem key={city.id} value={city.nome.toString()}>
                  {city.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
