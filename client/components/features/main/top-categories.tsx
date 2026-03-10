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
    <section className="relative pt-28 pb-16 overflow-hidden lg:pt-16 lg:pb-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-400/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      </div>
      <section className="py-20">
        <div className="container px-16 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
            <div className="max-w-2xl mb-8 md:mb-0">
              <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Top Categories
              </div>
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
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
                className="overflow-hidden transition-all cursor-pointer dark:bg-secondary/20 dark:hover:bg-background/50 hover:scale-105 duration-300 border-transparent rounded-2xl"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 dark:bg-transparent transition-colors duration-300">
                        <category.icon className="w-6 h-6 text-primary transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="text-xl transition-colors duration-300">
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
      </section>
    </section>
  );
};

export default TopCategories;
