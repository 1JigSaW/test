import {useQuery} from '@tanstack/react-query';
import {
  Supplement,
  TopSupplement,
  SupplementsApi,
} from '../api/supplements.api';

export const SUPPLEMENT_QUERY_KEY = 'supplement';
export const TOPSUPPLEMENT_QUERY_KEY = 'top_supplement';

export const useSupplement = (supp: string) => {
  return useQuery<Supplement, Error, Supplement>(
    [SUPPLEMENT_QUERY_KEY, supp],
    async () => {
      return await SupplementsApi.supplement(supp);
    },
  );
};
export const useTopSupplements = () => {
  return useQuery<TopSupplement[], Error, TopSupplement[]>(
    [TOPSUPPLEMENT_QUERY_KEY],
    async () => {
      return await SupplementsApi.topSupplement();
    },
  );
};
