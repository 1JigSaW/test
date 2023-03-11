import {useQuery} from '@tanstack/react-query';
import {
  OtherIngredientInfo,
  OtherIngredientsApi,
} from '../api/other_ingredients.api';

export const OTHERINGREDIENT_QUERY_KEY = 'disease';

export const useOtherIngredients = (slug: string) => {
  return useQuery<OtherIngredientInfo[], Error, OtherIngredientInfo[]>(
    [OTHERINGREDIENT_QUERY_KEY, slug],
    async () => {
      return await OtherIngredientsApi.ingredient(slug);
    },
  );
};
