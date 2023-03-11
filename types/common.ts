export type Children = {
  children: JSX.Element | JSX.Element[] | string | string[];
};

export interface ListResponse<T> {
  count: number;
  next?: number;
  previous?: number;
  results: T;
}

export interface PaginatedRequest {
  limit?: string;
  offset?: string;
}

export interface IdTitle {
  id: number;
  title: string;
}

export interface BaseModel {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface ListResponsePagination {
  count: number;
  title: string;
}
