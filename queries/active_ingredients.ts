import {useQuery} from '@tanstack/react-query';
import {
  ActiveIngredientInfo,
  ActiveIngredientsApi,
  ActiveIngredientSupplementInfo,
} from '../api/active_ingredients.api';

export const ACTIVEINGREDIENT_QUERY_KEY = 'active_ingredient';
export const ACTIVEINGREDIENTSUPPLEMENT_QUERY_KEY =
  'active_ingredient_supplement';

export const useActiveIngredients = (slug: string) => {
  return useQuery<ActiveIngredientInfo[], Error, ActiveIngredientInfo[]>(
    [ACTIVEINGREDIENT_QUERY_KEY, slug],
    async () => {
      return await ActiveIngredientsApi.activeIngredient(slug);
    },
  );
};

export const useActiveIngredientsSupplements = (
  active_ingredient: string,
  page: number,
) => {
  return useQuery<
    ActiveIngredientSupplementInfo,
    Error,
    ActiveIngredientSupplementInfo
  >(
    [ACTIVEINGREDIENTSUPPLEMENT_QUERY_KEY, active_ingredient, page],
    async () => {
      return await ActiveIngredientsApi.listActiveIngredients(
        active_ingredient,
        page,
      );
    },
  );
};
