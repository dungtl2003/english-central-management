import {Skeleton} from "@/components/ui/skeleton";

export function SkeletonStudentListFilter() {
    return (
        <div className="inline-flex space-x-2">
            <div className="w-[577px] h-[72px] flex py-4 space-x-4">
                <Skeleton className="w-full h-full"></Skeleton>
                <Skeleton className="h-full w-[169px]" />
                <Skeleton className="h-full w-[169px]" />
            </div>
        </div>
    );
}

export function SkeletonStudentListContent() {
    return (
        <div className="w-full">
            <Skeleton className="h-[375px] rounded-xl" />
        </div>
    );
}

export function SkeletonStudentListPagination() {
    return (
        <div className="flex items-center py-4">
            <div className="inline-flex flex-1">
                <Skeleton className="h-8 w-[265px]" />
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

export function SkeletonStudentDetail() {
    return (
        <div className="w-[75%] min-h-[680px] pt-[90px]">
            <Skeleton className="w-full h-full"></Skeleton>
        </div>
    );
}
