import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { resolvePath } from "@/lib/path-resolver"
import { UserResponse } from "@/types/payload/response/user.response"
import { BookOpen, Star, Users } from "lucide-react"

type CourseInstructorProps = {
    instructor: UserResponse
}

const CourseInstructor = ({ instructor }: CourseInstructorProps) => {
    return (
        <section className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Instructor</h2>
            <div className="flex flex-col gap-4 bg-card rounded-md shadow p-5 sm:flex-row sm:items-center sm:gap-5">
                <Avatar className="h-14 w-14 shrink-0">
                    <AvatarImage
                        src={resolvePath(instructor.image?.path) || "/placeholder.svg"}
                        alt={instructor.username}
                        className="object-cover"
                    />
                    <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                        {instructor.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1 space-y-2">
                    <div>
                        <p className="truncate text-[15px] font-semibold hover:text-primary hover:underline">
                            {instructor.username}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Senior Software Engineer & Educator
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-medium text-foreground">4.8</span> (1.2k ratings)
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            200 students
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5" />
                            14 courses
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CourseInstructor