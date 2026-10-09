import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => {
    return Array.from({ length: 9 }).map((_, i: number) => (
        <div key={i} className="w-full min-w-0 flex flex-col" >
            <Skeleton className="w-full aspect-video rounded-lg" />

            <div className="flex flex-1 flex-col pt-3">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                    <Skeleton className="h-3 w-20 shrink-0" />
                    <Skeleton className="h-3 w-14 shrink-0" />
                    <Skeleton className="h-3 w-16 shrink-0" />
                </div>
                <Skeleton className="h-[18px] w-full mb-1.5" />
                <Skeleton className="h-[18px] w-4/5 mb-2.5" />

                <Skeleton className="h-4 w-5/6 mb-2.5" />

                <div className="flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-5 h-5 rounded-full shrink-0" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                    <Skeleton className="h-6 w-20 shrink-0" />
                </div>
            </div>
        </div>
    ));
};

export default CourseCardSkeleton;
