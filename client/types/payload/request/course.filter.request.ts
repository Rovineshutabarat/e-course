export type CourseFilterRequest = {
  slug?: string;
  categoryId?: number;
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
};
