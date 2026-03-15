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
    <div className="mt-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Student Reviews</h3>
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

        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <Card key={review.id}>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      src={review.user.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {review.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{review.user.name}</h4>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "h-4 w-4",
                                  star <= review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300",
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm mb-3">{review.content}</p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsUp className={cn("h-4 w-4")} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseReview;
