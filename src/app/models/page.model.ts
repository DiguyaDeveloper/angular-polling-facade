export class Page<T> {
  content: T[];
  sort: Sort;
  pageable: Pageable;
  totalElements?: number;
  totalPages?: number;
}

interface Pageable {
  length: number;
  pageNumber?: number;
  pageSize?: number;
  offset?: number;
  paged?: boolean;
}

interface Sort {
  sort: string;
  order: 'asc' | 'desc' | '';
}
