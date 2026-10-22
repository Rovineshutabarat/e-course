"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useCourseFilters } from "@/hooks/use-course-filters";
import { Star, X } from "lucide-react";
import React from "react";

type PriceRange = {
  lowerPrice?: number;
  upperPrice?: number;
};

const difficulties = [
  { title: "Beginner", value: "BEGINNER" },
  { title: "Intermediate", value: "INTERMEDIATE" },
  { title: "Advanced", value: "ADVANCE" },
];
const CourseFilter = () => {
  const { filters, setFilters, resetFilters } = useCourseFilters();
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<
    string | null
  >(filters.difficulty ?? null);

  const [selectedPrice, setSelectedPrice] = React.useState<PriceRange>({
    lowerPrice: filters.min_price,
    upperPrice: filters.max_price,
  });
  const [priceTouched, setPriceTouched] = React.useState(
    filters.min_price !== undefined || filters.max_price !== undefined,
  );

  React.useEffect(() => {
    setSelectedDifficulty(filters.difficulty ?? null);
    setSelectedPrice({
      lowerPrice: filters.min_price,
      upperPrice: filters.max_price,
    });
    setPriceTouched(
      filters.min_price !== undefined || filters.max_price !== undefined,
    );
  }, [filters.difficulty, filters.min_price, filters.max_price]);

  function toggleDifficulty(value: string) {
    setSelectedDifficulty((current) => (current === value ? null : value));
  }

  function applyFilters() {
    setFilters({
      difficulty: selectedDifficulty ?? undefined,
      min_price: priceTouched ? selectedPrice.lowerPrice : undefined,
      max_price: priceTouched ? selectedPrice.upperPrice : undefined,
    });
  }

  function handleReset() {
    resetFilters();
  }

  return (
    <div className="sticky top-20 left-0 w-full">
      <div className="flex items-center justify-between md:justify-start mb-3">
        <h2 className="text-lg font-bold tracking-tight">Course Filters</h2>
        <Button variant="ghost" size="sm" className="md:hidden">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="max-h-[calc(100vh-120px)] overflow-y-auto pr-5 pb-4">
        <Accordion
          type="multiple"
          defaultValue={["level", "duration", "rating"]}
        >
          <AccordionItem value="level">
            <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
              Level
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                {difficulties.map((difficulty, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60"
                  >
                    <Checkbox
                      checked={selectedDifficulty === difficulty.value}
                      onCheckedChange={() => toggleDifficulty(difficulty.value)}
                      className="cursor-pointer"
                    />
                    <span
                      className="text-sm cursor-pointer"
                      onClick={() => toggleDifficulty(difficulty.value)}
                    >
                      {difficulty.title}
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 px-2 pt-1">
                <Slider
                  value={[
                    selectedPrice?.lowerPrice ? selectedPrice.lowerPrice : 0,
                    selectedPrice?.upperPrice ? selectedPrice.upperPrice : 200,
                  ]}
                  max={500}
                  step={5}
                  onValueChange={(value) => {
                    setPriceTouched(true);
                    setSelectedPrice({
                      lowerPrice: value[0],
                      upperPrice: value[1],
                    });
                  }}
                />
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                    ${selectedPrice?.lowerPrice ?? 0}
                  </span>
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                    ${selectedPrice?.upperPrice ?? 200}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="duration">
            <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
              Duration
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                {["< 20 hours", "20-40 hours", "40-60 hours", "> 60 hours"].map(
                  (duration, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60"
                    >
                      <Checkbox id={`duration-${index}`} />
                      <label
                        htmlFor={`duration-${index}`}
                        className="text-sm cursor-pointer"
                      >
                        {duration}
                      </label>
                    </div>
                  ),
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rating">
            <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
              Rating
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                {[4.5, 4.0, 3.5, 3.0].map((rating, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60"
                  >
                    <Checkbox id={`rating-${index}`} />
                    <label
                      htmlFor={`rating-${index}`}
                      className="text-sm cursor-pointer flex items-center"
                    >
                      <div className="flex mr-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${star <= Math.floor(rating)
                              ? "text-yellow-500 fill-yellow-500"
                              : star - rating <= 0.5
                                ? "text-yellow-500 fill-yellow-500 opacity-50"
                                : "text-muted-foreground/40"
                              }`}
                          />
                        ))}
                      </div>
                      <span>{rating} star up</span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-4 space-y-3">
          <Button className="w-full cursor-pointer" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
