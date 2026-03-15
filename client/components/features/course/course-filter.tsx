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
import { Star, X } from "lucide-react";
import React from "react";

type PriceRange = {
  lowerPrice?: number;
  upperPrice?: number;
};

const difficulties = [
  { title: "Beginner", value: "BEGINNER" },
  { title: "Intermediate", value: "INTERMEDIATE" },
  { title: "Advanced", value: "ADVANCED" },
];
const CourseFilter = () => {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<
    string | null
  >(null);

  const [selectedPrice, setSelectedPrice] = React.useState<PriceRange>();

  function applyFilters() {}

  return (
    <div className="sticky top-20 left-0 w-full">
      <div className="flex items-center justify-between md:justify-start mb-2">
        <h2 className="text-lg font-bold">Course Filters</h2>
        <Button variant="ghost" size="sm" className="md:hidden">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-5 max-h-[calc(100vh-120px)] overflow-y-auto pr-7 pb-4">
        <Accordion
          type="multiple"
          defaultValue={["level", "duration", "rating"]}
        >
          <AccordionItem value="level">
            <AccordionTrigger className="text-sm font-medium py-2">
              Level
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {difficulties.map((difficulty, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedDifficulty === difficulty.value}
                      onCheckedChange={() =>
                        setSelectedDifficulty(difficulty.value)
                      }
                      className="cursor-pointer"
                    />
                    <span
                      className="text-sm cursor-pointer"
                      onClick={() => setSelectedDifficulty(difficulty.value)}
                    >
                      {difficulty.title}
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger className="text-sm font-medium py-2">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  value={[
                    selectedPrice?.lowerPrice ? selectedPrice.lowerPrice : 0,
                    selectedPrice?.upperPrice ? selectedPrice.upperPrice : 200,
                  ]}
                  max={500}
                  step={5}
                  onValueChange={(value) => {
                    setSelectedPrice({
                      lowerPrice: value[0],
                      upperPrice: value[1],
                    });
                  }}
                />
                <div className="flex justify-between">
                  <span className="text-xs">
                    ${selectedPrice?.lowerPrice ?? 0}
                  </span>
                  <span className="text-xs">
                    ${selectedPrice?.upperPrice ?? 200}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="duration">
            <AccordionTrigger className="text-sm font-medium py-2">
              Duration
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["< 20 hours", "20-40 hours", "40-60 hours", "> 60 hours"].map(
                  (duration, index) => (
                    <div key={index} className="flex items-center gap-2">
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
            <AccordionTrigger className="text-sm font-medium py-2">
              Rating
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0].map((rating, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox id={`rating-${index}`} />
                    <label
                      htmlFor={`rating-${index}`}
                      className="text-sm cursor-pointer flex items-center"
                    >
                      <div className="flex mr-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= Math.floor(rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : star - rating <= 0.5
                                  ? "text-yellow-500 fill-yellow-500 opacity-50"
                                  : "text-gray-300"
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
          <Button variant="outline" className="w-full cursor-pointer">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
