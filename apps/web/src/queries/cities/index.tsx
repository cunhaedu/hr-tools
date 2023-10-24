import { QueryFunctionContext, useQuery } from 'react-query';
import axios from 'axios';

import removeDuplicateKeyInObjectArrayHelper from '@/utils/removeDuplicateKeyInObjectArray.helper';
import { City } from './types';

async function getCitiesByUF(ctx: QueryFunctionContext) {
  const [_key, uf] = ctx.queryKey;

  const { data } = await axios<City[]>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`
  );

  return removeDuplicateKeyInObjectArrayHelper(data, 'nome');
}

export function useFetchCitiesByUF(uf?: string) {
  return useQuery({
    queryKey: ['cities', uf],
    enabled: !!uf,
    queryFn: getCitiesByUF
  });
}
