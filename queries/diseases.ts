import {useQuery} from '@tanstack/react-query';
import {
  Disease,
  DiseasesApi,
  DiseaseSupplement,
  DiseaseSupplementInfo,
  DiseaseSymptomTable,
} from '../api/diseases.api';

export const DISEASE_QUERY_KEY = 'disease';
export const DISEASESUPPLEMENT_QUERY_KEY = 'disease_supplement';
export const TABLEDISEASE_QUERY_KEY = 'table_disease';
export const SEARCHDISEASE_QUERY_KEY = 'search_disease';

export const useTopDiseases = () => {
  return useQuery<Disease[], Error, Disease[]>(
    [DISEASE_QUERY_KEY],
    async () => {
      return await DiseasesApi.topDiseases();
    },
  );
};

export const useDiseasesSupplements = (disease: string, page: number) => {
  return useQuery<DiseaseSupplementInfo, Error, DiseaseSupplementInfo>(
    [DISEASESUPPLEMENT_QUERY_KEY, disease, page],
    async () => {
      return await DiseasesApi.listDiseases(disease, page);
    },
  );
};

export const useTableDiseases = (slug: string, page?: number) => {
  return useQuery<DiseaseSymptomTable[], Error, DiseaseSymptomTable[]>(
    [TABLEDISEASE_QUERY_KEY, slug, page],
    async () => {
      return await DiseasesApi.tableDiseases(slug, page);
    },
  );
};

export const useSearchDiseases = (query: string, slug: string) => {
  return useQuery<DiseaseSupplement[], Error, DiseaseSupplement[]>(
    [SEARCHDISEASE_QUERY_KEY, slug, query],
    async () => {
      return await DiseasesApi.searchDiseases(query, slug);
    },
  );
};
