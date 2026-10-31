"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCourseFilters } from "@/hooks/use-course-filters";
import { CategoryService } from "@/services/category.service";
import { Category } from "@/types/entity/category";
import { useQuery } from "@tanstack/react-query";

const MAX_VISIBLE_CATEGORY = 20;

const badgeClass =
  "whitespace-nowrap cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium";

const CategoryBadges = () => {
  const { filters, setFilters } = useCourseFilters();
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getAllCategories(),
  });

  const categoryList = categories?.data ?? [];
  if (categoryList.length === 0) return null;

  return (
    <ScrollArea>
      <div className="flex items-center gap-2">
        <Badge
          variant={filters.category_id === undefined ? "default" : "secondary"}
          className={badgeClass}
          onClick={() => setFilters({ category_id: undefined })}
        >
          All
        </Badge>
        {categoryList
          .slice(0, MAX_VISIBLE_CATEGORY)
          .map((category: Category) => (
            <Badge
              key={category.id}
              variant={
                filters.category_id === category.id ? "default" : "secondary"
              }
              className={badgeClass}
              onClick={() => setFilters({ category_id: category.id! })}
            >
              {category.name}
            </Badge>
          ))}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
};

export default CategoryBadges;
