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
import { CourseFilters, useCourseFilters } from "@/hooks/use-course-filters";
import { Star, X } from "lucide-react";
import React from "react";

const difficulties = [
  { title: "Beginner", value: "BEGINNER" },
  { title: "Intermediate", value: "INTERMEDIATE" },
  { title: "Advanced", value: "ADVANCE" },
];

type DraftFilters = {
  difficulty: string | null;
  minPrice?: number;
  maxPrice?: number;
  priceTouched: boolean;
};

function createDraft(filters: CourseFilters): DraftFilters {
  return {
    difficulty: filters.difficulty ?? null,
    minPrice: filters.min_price,
    maxPrice: filters.max_price,
    priceTouched:
      filters.min_price !== undefined || filters.max_price !== undefined,
  };
}

type DifficultySectionProps = {
  value: string | null;
  onToggle: (value: string) => void;
};

const DifficultySection = ({ value, onToggle }: DifficultySectionProps) => {
  return (
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
                checked={value === difficulty.value}
                onCheckedChange={() => onToggle(difficulty.value)}
                className="cursor-pointer"
              />
              <span
                className="text-sm cursor-pointer"
                onClick={() => onToggle(difficulty.value)}
              >
                {difficulty.title}
              </span>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

type PriceSectionProps = {
  minPrice?: number;
  maxPrice?: number;
  onPriceChange: (lowerPrice: number, upperPrice: number) => void;
};

const PriceSection = ({
  minPrice,
  maxPrice,
  onPriceChange,
}: PriceSectionProps) => {
  return (
    <AccordionItem value="price">
      <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">
        Price Range
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 px-2 pt-1">
          <Slider
            value={[minPrice ? minPrice : 0, maxPrice ? maxPrice : 200]}
            max={500}
            step={5}
            onValueChange={(value) => onPriceChange(value[0], value[1])}
          />
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
              ${minPrice ?? 0}
            </span>
            <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
              ${maxPrice ?? 200}
            </span>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const DurationSection = () => {
  return (
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
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const RatingSection = () => {
  return (
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
  );
};

const CourseFilter = () => {
  const { filters, setFilters, resetFilters } = useCourseFilters();
  const [draft, setDraft] = React.useState<DraftFilters>(() =>
    createDraft(filters),
  );

  React.useEffect(() => {
    setDraft(createDraft(filters));
  }, [filters.difficulty, filters.min_price, filters.max_price]);

  function toggleDifficulty(value: string) {
    setDraft((current) => ({
      ...current,
      difficulty: current.difficulty === value ? null : value,
    }));
  }

  function changePrice(lowerPrice: number, upperPrice: number) {
    setDraft((current) => ({
      ...current,
      minPrice: lowerPrice,
      maxPrice: upperPrice,
      priceTouched: true,
    }));
  }

  function applyDraft() {
    setFilters({
      difficulty: draft.difficulty ?? undefined,
      min_price: draft.priceTouched ? draft.minPrice : undefined,
      max_price: draft.priceTouched ? draft.maxPrice : undefined,
    });
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
          defaultValue={["level", "rating"]}
        >
          <DifficultySection
            value={draft.difficulty}
            onToggle={toggleDifficulty}
          />
          <PriceSection
            minPrice={draft.minPrice}
            maxPrice={draft.maxPrice}
            onPriceChange={changePrice}
          />
          <DurationSection />
          <RatingSection />
        </Accordion>

        <div className="mt-4 space-y-3">
          <Button className="w-full cursor-pointer" onClick={applyDraft}>
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
