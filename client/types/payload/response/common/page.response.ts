export interface PageResponse<T> {
  items: T[];
  page: number;
  size: number;
  has_previous: boolean;
  has_next: boolean;
}
