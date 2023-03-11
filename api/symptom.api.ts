import {API} from './API';

export interface SymptomTable {
  id: number;
  symptom: string;
  frequency: number;
  result: Review[];
}

export interface Review {
  id: number;
  review: string;
}

export class SymptomsApi {
  static async tableSymptoms(
    slug: string,
    page?: number,
  ): Promise<SymptomTable[]> {
    const {data} = await API.get(`/api/table_symptom/${slug}/?page=${page}`);
    return data;
  }
}
