import {useQuery} from '@tanstack/react-query';
import {
  DietInfo,
  DietSupplementInfo,
  DietsApi,
} from '../api/diets.api';

const DIETINFO_QUERY_KEY = 'diet';
const DIETSUPPLEMENT_QUERY_KEY = 'diet_supplement';

export const useDiet = (slug: string) => {
  return useQuery<DietInfo[], Error, DietInfo[]>(
    [DIETINFO_QUERY_KEY, slug],
    async () => {
      return await DietsApi.diet(slug);
    },
  );
};

export const useDietsSupplements = (diet: string, page: number) => {
  return useQuery<DietSupplementInfo, Error, DietSupplementInfo>(
    [DIETSUPPLEMENT_QUERY_KEY, diet, page],
    async () => {
      return await DietsApi.listDiets(diet, page);
    },
  );
};
