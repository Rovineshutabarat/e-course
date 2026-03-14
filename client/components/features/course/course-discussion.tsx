import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsDown, ThumbsUp } from "lucide-react";
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
    isHelpful: true,
    replies: [
      {
        user: {
          name: "Budi Santoso",
          avatar: "",
          isInstructor: true,
        },
        date: "2024-11-11",
        content:
          "Terima kasih atas ulasan positifnya, Andi! Senang mendengar kursus ini bermanfaat untukmu. Jangan ragu untuk bertanya jika ada yang perlu diklarifikasi.",
      },
    ],
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
    isHelpful: false,
    replies: [],
  },
  {
    id: "3",
    user: {
      name: "Reza Firmansyah",
      avatar: "",
      isInstructor: false,
    },
    rating: 5,
    date: "2024-10-28",
    content:
      "Salah satu kursus terbaik yang pernah saya ikuti! Proyek praktiknya sangat relevan dengan kebutuhan industri saat ini. Sangat direkomendasikan!",
    isHelpful: true,
    replies: [],
  },
];

const CourseDiscussion = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState("");

  const sortedReviews = [...dummyReviews].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return 0;
  });

  return (
    <div className="m-4">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold tracking-tight">
            Course Discussion
          </h3>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[160px] border-none shadow-none font-medium hover:bg-accent">
              <div className="flex items-center gap-2">
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 mb-10">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <div className="flex-1 flex flex-col gap-2">
            <Textarea
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="min-h-[45px] h-auto resize-none border-t-0 border-x-0 border-b rounded-none px-3 py-1 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary transition-all duration-200 bg-transparent"
            />

            {(isFocused || comment.length > 0) && (
              <div className="flex justify-end gap-2 mt-1 animate-in fade-in duration-300">
                <Button
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => {
                    setIsFocused(false);
                    setComment("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={comment.length === 0}
                  className="rounded-full bg-primary px-5"
                >
                  Comment
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <h4 className="font-medium">{review.user.name}</h4>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{review.content}</p>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Reply
                    </Button>
                  </div>

                  {review.replies && review.replies.length > 0 && (
                    <div className="pl-4 border-l-2 mt-4 space-y-4">
                      {review.replies.map((reply, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={reply.user.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {reply.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium text-sm">
                                {reply.user.name}
                              </h5>
                              {reply.user.isInstructor && (
                                <Badge variant="outline" className="text-xs">
                                  Instructor
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {new Date(reply.date).toLocaleDateString(
                                  "id-ID",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseDiscussion;
