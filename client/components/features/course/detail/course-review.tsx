import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

const dummyReviews = [
  {
    id: "1",
    user: {
      name: "Andi Prasetyo",
      avatar: "",
      isInstructor: false,
    },
    rating: 5,
    date: "2024-11-10",
    content:
      "Kursus ini sangat membantu! Materi dijelaskan dengan sangat jelas dan mudah dipahami. Instrukturnya sangat berpengalaman dan responsif terhadap pertanyaan.",
  },
  {
    id: "2",
    user: {
      name: "Sari Dewi",
      avatar: "",
      isInstructor: false,
    },
    rating: 4,
    date: "2024-11-05",
    content:
      "Konten kursusnya sangat komprehensif. Saya belajar banyak hal baru. Hanya saja, beberapa video terasa agak terlalu cepat dan perlu ditonton ulang beberapa kali.",
  },
];
const CourseReview = () => {
  const [sortBy, setSortBy] = useState("newest");

  const sortedReviews = [...dummyReviews].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return 0;
  });

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight">Student reviews</h3>
          <p className="text-sm text-muted-foreground">
            What learners say after taking this course.
          </p>
        </div>
        <Select defaultValue="newest" onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 pt-1">
          {sortedReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-5">
                <div className="flex items-start gap-3.5">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage
                      src={review.user.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {review.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="text-sm font-semibold">{review.user.name}</h4>
                        <div className="mt-0.5 flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "h-3.5 w-3.5",
                                  star <= review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/30",
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-2 text-sm leading-6 text-foreground/80">{review.content}</p>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Mark review helpful">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Mark review not helpful">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
  );
};

export default CourseReview;
