import {useQuery} from '@tanstack/react-query';
import {Price, PriceApi} from '../api/price.api';

const PRICE_QUERY_KEY = 'price';

export const usePrice = (slug: string) => {
  return useQuery<Price, Error, Price>([PRICE_QUERY_KEY, slug], async () => {
    return await PriceApi.price(slug);
  });
};
