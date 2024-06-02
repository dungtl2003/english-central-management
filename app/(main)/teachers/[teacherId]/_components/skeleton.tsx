import {Skeleton} from "@/components/ui/skeleton";

export function SkeletonTable() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[1400px] rounded-xl" />
        </div>
    );
}
