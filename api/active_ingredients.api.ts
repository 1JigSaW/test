import {API} from './API';

export interface ActiveIngredientInfo {
  title: string;
  slug: string;
}

export interface ActiveIngredientSupplementInfo {
  count: number;
  supplyments: ActiveIngredientSupplement[];
}

export interface ActiveIngredientSupplement {
  supplement: string;
  brand: string;
  title: string;
  price: number;
  unit: string;
  per_unit: number;
  slug: string;
  pic: string;
}

export class ActiveIngredientsApi {
  static async activeIngredient(slug: string): Promise<ActiveIngredientInfo[]> {
    const {data} = await API.get(`/api/active_ingredient/${slug}`);
    return data;
  }

  static async listActiveIngredients(
    active_ingredient: string,
    page: number,
  ): Promise<ActiveIngredientSupplementInfo> {
    const {data} = await API.get(
      `/api/top_active_ingredient/${active_ingredient}/?page=${page}`,
    );
    return data;
  }
}
