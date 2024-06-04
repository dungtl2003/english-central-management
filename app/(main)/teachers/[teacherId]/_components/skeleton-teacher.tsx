import {Card} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {ReactElement} from "react";

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

export function SkeletonOverviewCard() {
    return (
        <div className="pt-3 flex flex-row">
            <div className="min-w-full grid grid-cols-4 gap-x-5 h-[107px]">
                <Card className="">
                    <Skeleton className="h-full w-full" />
                </Card>
                <Card className="">
                    <Skeleton className="h-full w-full" />
                </Card>
                <Card className="">
                    <Skeleton className="h-full w-full" />
                </Card>
                <Card className="">
                    <Skeleton className="h-full w-full" />
                </Card>
            </div>
        </div>
    );
}

export function SkeletonClassBasicInformation() {
    return (
        <div className="pt-5 grid grid-cols-5 gap-x-5">
            <div className="col-span-2 ">
                <Card className="min-h-[340px] max-h-[340px]">
                    <Skeleton className="w-full h-[340px]" />
                </Card>
            </div>
            <div className="col-span-3 ">
                <Card className="min-h-[340px] max-h-[340px]">
                    <Skeleton className="w-full h-[340px]" />
                </Card>
            </div>
        </div>
    );
}

export function SkeletonClassDetailTabList(): ReactElement {
    return (
        <div className="w-[273px]">
            <Skeleton className="w-full h-full" />
        </div>
    );
}
