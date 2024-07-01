"Use client";

import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ClassInfo} from "./class-info";
import TeacherTableColumns from "./teacher-table-columns";
import TablePagination from "./table-pagination";
import TableFilter from "./table-filter";
import TableContent from "./table-content";
import {
    ColumnDef,
    SortingState,
    PaginationState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {handler} from "@/lib/action/teacher/get-classes";
import {OutputType} from "@/lib/action/teacher/get-classes/types";
import {toast} from "@/components/ui/use-toast";
import {useAuth} from "@clerk/nextjs";
import {concatName, roundUp} from "@/lib/utils";
import {
    SkeletonTableContent,
    SkeletonTableFilter,
    SkeletonTablePagination,
} from "./skeleton-teacher";
import {format} from "date-fns";

const formatData = (fetchedData: OutputType): ClassInfo[] | undefined => {
    if (!fetchedData) return undefined;

    const displayData: ClassInfo[] = [];
    fetchedData.forEach((data) =>
        displayData.push({
            classId: data.id,
            className: `${data.unit.grade}.${data.index}`,
            teacher: concatName(
                data.teacher.user.firstName,
                data.teacher.user.lastName,
                true
            ),
            year: String(data.unit.year),
            start: format(data.startTime, "dd/MM/yyyy"),
            end: format(data.endTime, "dd/MM/yyyy"),
            price: "$" + roundUp(Number(data.unit.pricePerSession), 2),
        })
    );

    return displayData;
};

const columns: ColumnDef<ClassInfo>[] = TeacherTableColumns;

const fallbackDisplayData: ClassInfo[] = [];

export function TeacherTable() {
    const fetchClassesHandler = useCallback(handler, []);
    const event: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.error("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Get classes failed",
                });
                setIsLoading(false);
            },
            onSuccess: (data: OutputType) => {
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Get classes succeed",
                });
                setDisplayData(formatData(data));
                setIsLoading(false);
            },
        };
    }, []);
    const {isLoaded, userId, isSignedIn} = useAuth();
    const {execute} = useAction(fetchClassesHandler, event);
    const [isLoading, setIsLoading] = useState(true);
    const [displayData, setDisplayData] = useState<ClassInfo[] | undefined>(
        undefined
    );
    const [sorting, setSorting] = React.useState<SortingState>([]);
    // Define how many rows can be display
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });
    const table = useReactTable<ClassInfo>({
        data: displayData ?? fallbackDisplayData,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            pagination,
        },
    });

    useEffect(() => {
        if (!isLoaded || !isSignedIn || !userId) return;
        execute({referTeacherId: userId});
    }, [isLoaded, userId, execute, isSignedIn]);

    return (
        <>
            <div className="w-11/12 pt-[120px]">
                {isLoading ? (
                    <SkeletonTableFilter />
                ) : (
                    <TableFilter table={table} />
                )}
                {isLoading ? (
                    <SkeletonTableContent />
                ) : (
                    <TableContent table={table} columns={columns} />
                )}
                {isLoading ? (
                    <SkeletonTablePagination />
                ) : (
                    <TablePagination table={table} />
                )}
            </div>
        </>
    );
}
