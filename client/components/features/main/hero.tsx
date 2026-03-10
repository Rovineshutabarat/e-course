import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GraduationCap, Play, Star, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden lg:pt-16 lg:pb-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-400/15 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
      </div>
      <div className="container px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              <span className="mr-2">🔥</span> #129836981263 Learning Platform
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Learn New Skills Online with Top Educators
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Join industry-leading experts in advanced courses designed to
              sharpen your skills, deepen your knowledge, and give you the
              competitive edge in your career.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8">
                Explore Courses
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-full px-8 border-gray-300"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                  <Play size={12} className="text-primary ml-0.5" />
                </div>
                How it Works
              </Button>
            </div>
            <div className="flex items-center mt-10">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((index: number) => (
                  <Avatar
                    key={index}
                    className="border-2 border-white w-10 h-10"
                  >
                    <AvatarImage
                      src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYP-KKtRJXm9qK7k2_PA1utxbxWdpzGIdulQ&s`}
                    />
                    <AvatarFallback>U{index}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  From 3.5k+ Reviews
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://edma-theme.vercel.app/images/hero-1.png"
                alt="Learning Illustration"
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-background shadow-md dark:shadow-sm dark:shadow-primary/20 hover:scale-105 transition-all duration-300 rounded-2xl p-4 flex items-center gap-4 w-64">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">300+ Courses</p>
                  <p className="text-sm text-muted-foreground">
                    Enjoy our courses
                  </p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-background rounded-2xl shadow-md dark:shadow-sm dark:shadow-primary/20 hover:scale-105 transition-all duration-300 p-4 flex items-center gap-4 w-64">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">Expert Instructors</p>
                  <p className="text-sm text-muted-foreground">
                    Learn from the best
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full -z-10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
