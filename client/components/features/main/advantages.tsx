import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, GraduationCap, TrendingUp } from "lucide-react";

type Image = {
  src: string;
  alt: string;
};
const Advantages = () => {
  const images: Image[] = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZjrHJ7etMn2x06FgG4AFV5bE4owz4u7cpCw&s",
      alt: "Student studying",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RSUtGdQTfbl53Pwtl3iqLqMpYKBM6WONQQ&s",
      alt: "Student with headphones",
    },
    {
      src: "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
      alt: "Student writing",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI1jZbSfgaVNtyY5vqYEXMiu_AVqdLg6Fk5w&s",
      alt: "Student with tablet",
    },
  ];

  return (
    <section className="relative pt-28 pb-16 overflow-hidden lg:pt-16 lg:pb-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-400/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
      </div>
      <section className="py-20 ">
        <div className="container px-16 mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Why Wahyedu is the{" "}
                <span className="text-blue-500">#1921737 Choice</span> for
                Students?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Our instructors are professional in their skills, they have
                years of experience and good at explaining. We at Wahyedu,
                always care our instructors and students to gain more knowledge
                by giving them benefits, like:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 mt-1 rounded-full bg-green-100">
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Flexible Learning Schedules</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 mt-1 rounded-full bg-yellow-100">
                    <TrendingUp className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Monitor and improve learning outcomes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 mt-1 rounded-full bg-blue-100">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Learn from industry professionals
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8">
                Start Learning Today
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {images.map((image: Image, index: number) => {
                return (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className={cn(
                      "rounded-2xl w-full h-auto object-cover",
                      (index === 1 || index === 3) && "mt-8",
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Advantages;
