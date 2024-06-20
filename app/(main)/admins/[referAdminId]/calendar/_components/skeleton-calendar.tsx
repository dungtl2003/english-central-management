import {Skeleton} from "@/components/ui/skeleton";

export function SkeletonCalendar() {
    return (
        <div className="min-w-[70%] min-h-[430px] py-4">
            <Skeleton className="w-full h-full"></Skeleton>
        </div>
    );
}
