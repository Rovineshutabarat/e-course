import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsLetter = () => {
  return (
    <section className="py-10 md:py-14 lg:py-20 text-white bg-gradient-to-r from-blue-700 to-blue-800/80 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-75 h-75 md:w-100 md:h-100 lg:w-150 lg:h-150 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-75 h-75 md:w-100 md:h-100 lg:w-150 lg:h-150 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
      </div>
      <div className="container px-4 md:px-8 lg:px-20 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-white/10 text-white">
            Newsletter
          </div>
          <h2 className="mb-3 text-lg font-bold md:text-xl">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mb-6 text-white/80">
            Subscribe to our newsletter and get updates on new courses and
            promotions
          </p>
          <div className="flex flex-col items-center max-w-md mx-auto space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 placeholder:text-white/60 text-white rounded-full"
            />
            <Button className="w-full md:w-auto bg-white text-black rounded-full px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
