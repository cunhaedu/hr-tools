"use client"

import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { registerCompanySchema } from '@/schemas/register-company.schema';
import { useQuery } from 'react-query';

interface SelectCityProps {
  uf?: string;
}

type ibgeCitiesByUF = {
  id: number;
  nome: string;
}

export function SelectCity({ uf }: SelectCityProps) {
  console.log(uf);

  const { control } = useFormContext<z.infer<typeof registerCompanySchema>>();

  const { data, isLoading } = useQuery<ibgeCitiesByUF[]>({
    queryKey:['cities', uf],
    enabled: !!uf,
    queryFn: () =>
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`)
        .then(res => res.json())
  });

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
                <SelectValue placeholder="Selecione a cidade de destino" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              { !isLoading && data && data.map((city) => (
                <SelectItem value={city.nome} key={city.id}>
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
