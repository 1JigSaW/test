import {API} from './API';

export interface OtherIngredientInfo {
  title: string;
  text_what_is_it: string;
  text_vegan: string;
  text_vegetarian: string;
  text_hamful_for_human: string;
  text_history: string;
}

export class OtherIngredientsApi {
  static async ingredient(slug: string): Promise<OtherIngredientInfo[]> {
    const {data} = await API.get(`/api/ingredient/${slug}`);
    return data;
  }
}
