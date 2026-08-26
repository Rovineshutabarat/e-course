import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

const CourseDetailPageSkeleton = () => {
    return (
        <Fragment>
            {/* Navbar */}
            <div className="bg-muted border-b shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center gap-4">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-48 hidden md:block" />
                </div>
            </div>

            <main className="container mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column */}
                    <div className="lg:w-2/3 space-y-10">

                        {/* Wallpaper */}
                        <Skeleton className="w-full h-[200px] md:h-[300px] lg:h-[400px] rounded-xl" />

                        {/* Title & Badges */}
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-3/4" />

                            {/* Badge row 1 */}
                            <div className="flex flex-wrap gap-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton key={i} className="h-6 w-24 rounded-full" />
                                ))}
                            </div>

                            {/* Badge row 2 */}
                            <div className="flex flex-wrap gap-3">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/6" />
                        </div>

                        {/* What You'll Learn */}
                        <div className="p-6 border rounded-xl bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                            <Skeleton className="h-7 w-48" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Skeleton className="h-5 w-5 rounded-full shrink-0 mt-0.5" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="space-y-4">
                            <Skeleton className="h-7 w-36" />
                            <div className="grid gap-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="h-2 w-2 rounded-full shrink-0" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instructor */}
                        <div className="space-y-4">
                            <Skeleton className="h-7 w-28" />
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-1">
                                <Skeleton className="h-20 w-20 rounded-full shrink-0" />
                                <div className="space-y-3 w-full">
                                    <div className="space-y-1.5">
                                        <Skeleton className="h-5 w-40" />
                                        <Skeleton className="h-4 w-56" />
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-28" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="space-y-4">
                            <Skeleton className="h-7 w-64" />
                            <div className="border rounded-lg overflow-hidden divide-y">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="px-4 py-4 space-y-2">
                                        <Skeleton className="h-5 w-3/4" />
                                        {i === 0 && (
                                            <div className="space-y-1.5 pt-1">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-5/6" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="space-y-4">
                            <Skeleton className="h-7 w-32" />
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-16 w-16 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column — Checkout Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-12 border rounded-xl p-6 space-y-5">
                            <Skeleton className="w-full h-48 rounded-lg" />
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-5 w-2/3" />
                            <div className="space-y-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                ))}
                            </div>
                            <Skeleton className="h-11 w-full rounded-lg" />
                            <Skeleton className="h-11 w-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <div className="border-t mt-10 py-8">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-4">
                    <Skeleton className="h-5 w-40" />
                    <div className="flex gap-4">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-20" />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CourseDetailPageSkeleton;