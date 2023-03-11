import {API} from './API';
import {ListResponsePagination} from '../types/common';

export interface Disease {
  disease__title: string;
  disease__slug: string;
  numh: number;
}

export interface DiseaseSupplementInfo extends ListResponsePagination {
  supplyments: DiseaseSupplement[];
}

export interface DiseaseSupplement {
  supplement: string;
  brand: string;
  title: string;
  frequency: number;
  count_dis: number;
  slug: string;
  pic: string;
}

export interface DiseaseSymptomTable {
  id: number;
  disease: string;
  slug: string;
  freq: number;
  without_symptoms?: boolean;
  result: SymptomFromDisease[];
}

export interface SymptomFromDisease {
  symp?: string;
  freq2?: number;
  review?: Review[];
}

type Review = [string];

export class DiseasesApi {
  static async topDiseases(): Promise<Disease[]> {
    const {data} = await API.get('/api/top_disease/');
    return data;
  }
  static async listDiseases(
    disease: string,
    page: number,
  ): Promise<DiseaseSupplementInfo> {
    const {data} = await API.get(`/api/disease/${disease}/?page=${page}`);
    return data;
  }

  static async tableDiseases(
    slug: string,
    page?: number,
  ): Promise<DiseaseSymptomTable[]> {
    if (!page) {
      const {data} = await API.get(`/api/table_disease/${slug}`);
      return data;
    } else {
      const {data} = await API.get(`/api/table_disease/${slug}/?page=${page}`);
      return data;
    }
  }

  static async searchDiseases(
    query: string,
    slug: string,
  ): Promise<DiseaseSupplement[]> {
    const {data} = await API.get(
      `/api/search_disease/?q=${query}&disease=${slug}`,
    );
    return data;
  }
}
