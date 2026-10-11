export interface PageResponse<T> {
  items: T[];
  page: number;
  size: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
