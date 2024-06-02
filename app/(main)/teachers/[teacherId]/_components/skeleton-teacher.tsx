import {Skeleton} from "@/components/ui/skeleton";

export function SkeletonTableContent() {
    return (
        <div className="w-full">
            <Skeleton className="h-[375px] rounded-xl" />
        </div>
    );
}

export function SkeletonTableFilter() {
    return (
        <div className="flex items-center py-4">
            <div className="flex flex-row gap-x-4">
                <Skeleton className="h-10 w-[346px]" />
                <div className="space-y-2">
                    <Skeleton className="h-10 w-[100px]" />
                </div>
            </div>
        </div>
    );
}

export function SkeletonTablePagination() {
    return (
        <div className="flex items-center py-4">
            <div className="inline-flex flex-1">
                <Skeleton className="h-8 w-[250px]" />
            </div>
            <div className="inline-flex space-x-2">
                <div>
                    <Skeleton className="h-8 w-[80px]" />
                </div>
                <div>
                    <Skeleton className="h-8 w-[55px]" />
                </div>
            </div>
        </div>
    );
}
