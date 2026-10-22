export type CourseFilterRequest = {
  key?: string;
  categoryId?: number;
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
};
