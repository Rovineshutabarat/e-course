import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => {
    return Array.from({ length: 9 }).map((_, i: number) => (
        <div key={i} className="w-[20rem] shrink-0 flex flex-col" >
            <div className="overflow-hidden rounded-xl mb-4">
                <Skeleton className="w-full h-48" />
            </div>

            <div className="flex flex-col space-y-1 items-start my-2">
                <Skeleton className="h-5 w-full mb-4" />

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mb-3" />
            </div>

            <div className="flex items-center gap-2 mb-2">
                <Skeleton className="w-5 h-5 rounded-full shrink-0" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
            </div>

            <Skeleton className="h-6 w-24 mt-auto" />
        </div>
    ));
};

export default CourseCardSkeleton;