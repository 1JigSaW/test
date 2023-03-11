import {API} from './API';

export interface SupplementGeneral {
  title: string;
  slug: string;
  pic_reg?: string;
}

export interface TopSupplement extends SupplementGeneral {
  brand_name?: string;
  full_title?: string;
}

export interface OtherIngredient {
  name: string;
  value?: number;
  url: string;
}
export interface ActiveIngredient {
  id: number;
  title: string;
  slug: string;
  quantity?: string;
  units?: string;
  per_unit?: number;
  per_unit2?: number;
  ihearb_price_per_unit?: number;
}
export interface Cards {
  id: number;
  title: string;
  slug: string;
  value?: string;
}
export interface Supplement extends SupplementGeneral {
  supp_id: number;
  brand?: string;
  serving_size?: string;
  servings_per_container?: string;
  suggested_use?: string;
  serving_size_unit?: string;
  rating?: number;
  ingredient_count?: number;
  list_ingredients?: OtherIngredient[];
  active_ingredients?: ActiveIngredient[];
  count?: number;
  count2?: number;
  cards: Cards[];
}

export class SupplementsApi {
  static async supplement(supp: string): Promise<Supplement> {
    const {data} = await API.get(`/api/supplement/${supp}/`);
    return data;
  }
  static async topSupplement(): Promise<TopSupplement[]> {
    const {data} = await API.get('/api/random_supplements/');
    return data;
  }
}
