import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Camera,
  ChevronRight,
  Code,
  Music,
  PenTool,
  TrendingUp,
} from "lucide-react";

const TopCategories = () => {
  const categories = [
    { icon: Code, title: "Development", courses: 120 },
    { icon: Briefcase, title: "Business", courses: 85 },
    { icon: TrendingUp, title: "Marketing", courses: 64 },
    { icon: PenTool, title: "Design", courses: 92 },
    { icon: Camera, title: "Photography", courses: 46 },
    { icon: Music, title: "Music", courses: 38 },
  ];

  return (
    <section className="relative py-10 md:py-14 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-75 h-75 md:w-100 md:h-100 lg:w-150 lg:h-150 dark:bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-75 h-75 md:w-100 md:h-100 lg:w-150 lg:h-150 dark:bg-teal-400/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      </div>
      <div>
        <div className="container px-4 md:px-8 lg:px-20 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 md:mb-12">
            <div className="max-w-2xl mb-6 md:mb-0">
              <h2 className="mb-3 text-lg font-bold md:text-2xl">
                Browse Top Categories
              </h2>
              <p className="text-muted-foreground">
                Explore our wide range of courses across different categories
              </p>
            </div>
            <Button
              variant="outline"
              className="self-start rounded-full px-6 border-gray-300"
            >
              All Categories <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index: number) => (
              <Card
                key={index}
                className="overflow-hidden transition-all cursor-pointer bg-secondary dark:bg-secondary/20 dark:hover:bg-background/50 hover:scale-105 duration-300 border-transparent rounded-2xl"
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-muted-foreground/10 dark:bg-transparent transition-colors duration-300">
                        <category.icon className="w-5 h-5 text-foreground transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="text-base transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {category.courses} Courses
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
