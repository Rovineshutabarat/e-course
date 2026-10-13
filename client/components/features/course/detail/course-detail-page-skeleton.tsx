import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

const CourseDetailPageSkeleton = () => {
    return (
        <Fragment>
            <div className="border-b">
                <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-4 md:px-6">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="hidden h-5 w-48 md:block" />
                </div>
            </div>

            <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
                    <div className="min-w-0 space-y-8 lg:col-span-2">

                        <div className="space-y-5">
                            <Skeleton className="h-56 w-full rounded-xl sm:h-72 lg:h-96" />
                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                    <Skeleton className="h-5 w-36" />
                                </div>
                                <Skeleton className="h-8 w-3/4" />
                                <div className="flex flex-wrap gap-4">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-5 w-28" />
                                    <Skeleton className="h-5 w-40" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Skeleton key={i} className="h-6 w-24 rounded-full" />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-4 w-44" />
                                </div>
                            </div>
                        </div>

                        <Skeleton className="h-px w-full" />

                        <div className="space-y-3">
                            <Skeleton className="h-6 w-40" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                            {["What You'll Learn", "Requirements"].map((title) => (
                                <div key={title} className="space-y-3">
                                    <Skeleton className="h-6 w-40" />
                                    <div className="space-y-2.5">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div key={i} className="flex items-start gap-2.5">
                                                <Skeleton className="mt-1 h-4 w-4 shrink-0 rounded-full" />
                                                <Skeleton className="h-4 w-full" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-72" />
                            </div>
                            <div className="overflow-hidden rounded-xl border">
                                <div className="flex items-center justify-between border-b px-5 py-4">
                                    <div className="space-y-1.5">
                                        <Skeleton className="h-5 w-36" />
                                        <Skeleton className="h-4 w-52" />
                                    </div>
                                    <Skeleton className="h-8 w-24" />
                                </div>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="space-y-2 border-b px-5 py-3.5 last:border-0">
                                        <Skeleton className="h-5 w-2/3" />
                                        <Skeleton className="h-4 w-1/4" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Skeleton className="h-px w-full" />

                        <div className="space-y-4">
                            <Skeleton className="h-6 w-28" />
                            <div className="flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center">
                                <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
                                <div className="flex-1 space-y-2.5">
                                    <Skeleton className="h-5 w-40" />
                                    <Skeleton className="h-4 w-56" />
                                    <div className="flex gap-4">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Skeleton className="h-6 w-56" />
                            <Skeleton className="h-4 w-72" />
                            <div className="overflow-hidden rounded-xl border">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="space-y-2 border-b px-5 py-4 last:border-0">
                                        <Skeleton className="h-5 w-3/4" />
                                        {i === 0 && <Skeleton className="h-4 w-full" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Skeleton className="h-px w-full" />

                        <div className="space-y-4">
                            <Skeleton className="h-6 w-36" />
                            <Skeleton className="h-4 w-64" />
                            <div className="rounded-xl border p-5">
                                <div className="flex items-start gap-3.5">
                                    <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside>
                        <div className="space-y-4 rounded-xl border p-5">
                            <div className="space-y-1.5">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-56" />
                            </div>
                            <div className="space-y-1.5">
                                <Skeleton className="h-8 w-36" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                            <div className="space-y-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                ))}
                            </div>
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-11 w-full rounded-lg" />
                            <Skeleton className="h-11 w-full rounded-lg" />
                        </div>
                    </aside>
                </div>
            </main>
        </Fragment>
    );
};

export default CourseDetailPageSkeleton;
