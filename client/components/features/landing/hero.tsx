import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GraduationCap, Play, Star, Users } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative py-10 md:py-14 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-75 h-75 md:w-100 md:h-100 lg:w-150 lg:h-150 dark:bg-teal-400/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-75 h-75 md:w-100 md:h-100 lg:w-150 lg:h-150 dark:bg-teal-400/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
      </div>
      <div className="container px-4 md:px-8 lg:px-20 mx-auto">
        <div className="grid items-center grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary">
              #129836981263 Learning Platform
            </div>
            <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-2xl lg:text-3xl">
              Learn New Skills Online with Top Educators
            </h1>
            <p className="mb-6 text-base text-muted-foreground">
              Join industry-leading experts in advanced courses designed to
              sharpen your skills, deepen your knowledge, and give you the
              competitive edge in your career.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/courses">
                <Button className="rounded-full px-6 cursor-pointer">
                  Explore Courses
                </Button>
              </Link>
              <Button
                variant="outline"
                className="gap-2 rounded-full px-6 border-gray-300"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                  <Play size={12} className="text-primary ml-0.5" />
                </div>
                How it Works
              </Button>
            </div>
            <div className="flex items-center mt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((index: number) => (
                  <Avatar
                    key={index}
                    className="border-2 border-white w-8 h-8"
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
                className="w-full lg:w-140 h-auto rounded-2xl"
              />
              <div className="absolute -bottom-6 left-4 lg:-left-6 bg-background shadow-md dark:shadow-sm dark:shadow-primary/20 hover:scale-105 transition-all duration-300 rounded-2xl p-3 flex items-center gap-3 w-56">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 dark:bg-primary/20">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">300+ Courses</p>
                  <p className="text-sm text-muted-foreground">
                    Enjoy our courses
                  </p>
                </div>
              </div>
              <div className="absolute -top-6 right-4 lg:right-1  bg-background rounded-2xl shadow-md dark:shadow-sm dark:shadow-primary/20 hover:scale-105 transition-all duration-300 p-3 flex items-center gap-3 w-56">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Expert Instructors</p>
                  <p className="text-sm text-muted-foreground">
                    Learn from the best
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 dark:bg-teal-400/10 rounded-full -z-10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 dark:bg-primary/10 rounded-full -z-10 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
