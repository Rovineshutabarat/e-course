import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TopCourses = () => {
  const popularCourses = [
    {
      title: "UI/UX Design Fundamentals",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZjrHJ7etMn2x06FgG4AFV5bE4owz4u7cpCw&s",
      rating: 4.6,
      reviews: "980",
      difficulty: "Beginner",
      duration: "50 hours",
      modules: "120",
      price: "Rp.120.000",
      enrolled: "15,000",
      instructor: {
        name: "Jessica Taylor",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZjrHJ7etMn2x06FgG4AFV5bE4owz4u7cpCw&s",
      },
    },
    {
      title: "Advanced Figma Techniques",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZjrHJ7etMn2x06FgG4AFV5bE4owz4u7cpCw&s",
      rating: 4.7,
      reviews: "850",
      difficulty: "Intermediate",
      duration: "45 hours",
      modules: "95",
      price: "Rp.150.000",
      enrolled: "12,000",
      instructor: {
        name: "Daniel White",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZjrHJ7etMn2x06FgG4AFV5bE4owz4u7cpCw&s",
      },
    },
    {
      title: "User Research & Testing Masterclass",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZjrHJ7etMn2x06FgG4AFV5bE4owz4u7cpCw&s",
      rating: 4.8,
      reviews: "1.3K",
      difficulty: "Advanced",
      duration: "60 hours",
      modules: "150",
      price: "Rp.180.000",
      enrolled: "18,000",
      instructor: {
        name: "Olivia Green",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZjrHJ7etMn2x06FgG4AFV5bE4owz4u7cpCw&s",
      },
    },
    {
      title: "Mobile App UI Design for Beginners",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZjrHJ7etMn2x06FgG4AFV5bE4owz4u7cpCw&s",
      rating: 4.5,
      reviews: "1.1K",
      difficulty: "Beginner",
      duration: "40 hours",
      modules: "85",
      price: "Rp.120.000",
      enrolled: "22,000",
      instructor: {
        name: "Chris Johnson",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZjrHJ7etMn2x06FgG4AFV5bE4owz4u7cpCw&s",
      },
    },
  ];

  const categories = [
    { name: "Design" },
    { name: "Web Development" },
    { name: "Data Science" },
    { name: "Marketing" },
    { name: "Business" },
    { name: "Lifestyle" },
  ];

  return (
    <section className="py-20">
      <div className="container px-16 mx-auto">
        <div className="text-center mb-8">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">
            Our Most <span className="text-blue-500">Popular Courses</span>
          </h2>
          <p className="text-muted-foreground">
            Looking for a quick go through? here are the most popular that
            people take.
          </p>
        </div>

        <Tabs defaultValue="design" className="mb-12">
          <TabsList className="flex flex-wrap justify-center mb-8 bg-transparent w-full h-auto p-0 space-x-4 md:space-x-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name.toLowerCase().replace(" ", "-")}
                className="mb-2 pb-2 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 rounded-none bg-transparent hover:text-blue-500 transition-colors"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="design" className="mt-0">
            <ScrollArea className="w-full rounded-md">
              <div className="flex w-max space-x-8">
                {popularCourses.map((course) => (
                  // <CourseCard key={course.title} course={course} />
                  ""
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>

          {categories.slice(1).map((category) => (
            <TabsContent
              key={category.name}
              value={category.name.toLowerCase().replace(" ", "-")}
              className="mt-0"
            >
              <div className="flex justify-center items-center p-16">
                <p className="text-center text-muted-foreground">
                  More {category.name} courses coming soon!
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default TopCourses;
