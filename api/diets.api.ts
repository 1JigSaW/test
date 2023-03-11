import {API} from './API';

export interface DietInfo {
  title: string;
  what_ingr_text: string;
  what_text: string;
}

export interface DietSupplementInfo {
  count: number;
  property_data: DietData[];
  supplyments: DietSupplement[];
}

export interface DietData {
  id: number;
  title: string;
  slug: string;
}

export interface DietSupplement {
  brand: string;
  title: string;
  slug: string;
  pic: string;
}

export class DietsApi {
  static async diet(slug: string): Promise<DietInfo[]> {
    const {data} = await API.get(`/api/diet/${slug}`);
    return data;
  }

  static async listDiets(
    diet: string,
    page: number,
  ): Promise<DietSupplementInfo> {
    const {data} = await API.get(`/api/question/${diet}/?page=${page}`);
    return data;
  }
}
