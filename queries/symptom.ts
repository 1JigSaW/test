import {useQuery} from '@tanstack/react-query';
import {SymptomsApi, SymptomTable} from '../api/symptom.api';

export const TABLESYMPTOM_QUERY_KEY = 'symptom';

export const useTableSymptoms = (slug: string, page: number) => {
  return useQuery<SymptomTable[], Error, SymptomTable[]>(
    [TABLESYMPTOM_QUERY_KEY, slug, page],
    async () => {
      return await SymptomsApi.tableSymptoms(slug, page);
    },
  );
};
