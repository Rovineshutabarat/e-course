import { Button } from "@/components/ui/button";
import { CalendarCheck, ChartLine, GraduationCap } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
};
const Advantages = () => {
  const images: GalleryImage[] = [
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
    <section className="relative py-10 md:py-14 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-75 h-75 md:w-100 md:h-100 lg:w-150 lg:h-150 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute top-0 right-0 w-75 h-75 md:w-100 md:h-100 lg:w-150 lg:h-150 bg-teal-400/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
      </div>
      <div>
        <div className="container px-4 md:px-8 lg:px-20 mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-2">
            <div className="max-w-xl">
              <h2 className="mb-4 text-lg font-bold md:text-2xl">
                Why students choose Wahyedu
              </h2>
              <p className="mb-6 text-muted-foreground">
                Our instructors are professional in their skills, they have
                years of experience and good at explaining. We at Wahyedu,
                always care our instructors and students to gain more knowledge
                by giving them benefits, like:
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-primary/10 dark:bg-primary/10">
                    <CalendarCheck className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Flexible Learning Schedules</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-primary/10 dark:bg-primary/10">
                    <ChartLine className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Monitor and improve learning outcomes
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-primary/10 dark:bg-primary/10">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Learn from industry professionals
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
                Start Learning Today
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {[images[0], images[2]].map((image: GalleryImage) => {
                  return (
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      className="rounded-2xl w-full h-auto object-cover"
                    />
                  );
                })}
              </div>
              <div className="space-y-4 mt-10">
                {[images[1], images[3]].map((image: GalleryImage) => {
                  return (
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      className="rounded-2xl w-full h-auto object-cover"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
