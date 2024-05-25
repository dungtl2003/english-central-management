"Use client";

import React, {useEffect} from "react";
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
import {useAction} from "@/hooks/use-action";
import {handler} from "@/lib/api/teacher/get-classes";
import {OutputType} from "@/lib/api/teacher/get-classes/types";
import {toast} from "@/components/ui/use-toast";
import {useAuth} from "@clerk/nextjs";

//TODO: for temp testing, will remove later
// const addTempClasses = async (teacherId: string): Promise<void> => {
//     const domain = process.env.NEXT_PUBLIC_DOMAIN;
//     const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
//
//     const url = `${protocol}://${domain}/api/.personal/add-classes-for-teacher`;
//     const tempBody = {
//         teacherId: teacherId,
//         classes: 57,
//     };
//
//     const response = await fetch(url, {
//         method: "POST",
//         body: JSON.stringify(tempBody),
//     });
//
//     console.log(response);
// };

// Get columns model
const columns: ColumnDef<ClassInfo>[] = TeacherTableColumns;

const fallbackData: OutputType[] = [];

export function TeacherTable() {
    const {isLoaded, userId} = useAuth();
    const {data, execute} = useAction(handler, {
        onError: (error: string) => {
            console.log("Error: ", error);
            toast({
                title: "error",
                variant: "destructive",
                description: "Cannot get classes",
            });
        },
    });
    const [sorting, setSorting] = React.useState<SortingState>([]);
    // Define how many rows can be display
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });
    const table = useReactTable<OutputType>({
        data: data ?? fallbackData,
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
        if (!isLoaded) return;
        execute({teacherId: userId!});
    }, [isLoaded]);
    return (
        <>
            <div className="w-11/12 pt-[120px]">
                <TableFilter table={table} />
                <TableContent table={table} columns={columns} />
                <TablePagination table={table} />
            </div>
        </>
    );
}
