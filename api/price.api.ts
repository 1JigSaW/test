import {API} from './API';

export interface Price {
  status: string;
  old_price: number;
  current_price: number;
  shop_title: string;
  supplement_url: string;
}

export class PriceApi {
  static async price(slug: string): Promise<Price> {
    const {data} = await API.get(`/api/price/${slug}`);
    return data;
  }
}