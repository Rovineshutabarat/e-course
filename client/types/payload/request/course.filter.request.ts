export type CourseFilterRequest = {
  key?: string;
  category_id?: number;
  difficulty?: string;
  min_price?: number;
  max_price?: number;
  page?: number;
  size?: number;
};
