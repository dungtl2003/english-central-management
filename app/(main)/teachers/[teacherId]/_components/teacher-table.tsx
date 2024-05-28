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
import {formatDate} from "@/lib/utils";
import {Button} from "@/components/ui/button";

//TODO: for temp testing, will remove later
const addTempClasses = async (teacherId: string): Promise<void> => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    const url = `${protocol}://${domain}/api/.personal/add-classes-for-teacher`;
    const tempBody = {
        teacherId: teacherId,
        classes: 57,
        students: 45,
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(tempBody),
    });

    console.log(response);
};

const formatData = (fetchedData: OutputType): ClassInfo[] | undefined => {
    if (!fetchedData) return undefined;

    const displayData: ClassInfo[] = [];
    fetchedData.forEach((data) =>
        displayData.push({
            className: `${data.unit.grade}.${data.index}`,
            teacher: `${data.teacher.user.lastName} ${data.teacher.user.firstName}`,
            year: String(data.unit.year),
            start: formatDate(new Date(data.startTime)),
            end: formatDate(new Date(data.endTime)),
            price:
                String(
                    Math.round(
                        Number(data.unit.price_per_session) *
                            data.unit.max_sessions *
                            100
                    ) / 100
                ) + "$",
        })
    );

    return displayData;
};

// Get columns model
const columns: ColumnDef<ClassInfo>[] = TeacherTableColumns;

const fallbackDisplayData: ClassInfo[] = [];

export function TeacherTable() {
    const fetchClassesHandler = useCallback(handler, []);
    const event: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.log("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Get classes failed",
                });
            },
            onSuccess: (data: OutputType) => {
                setDisplayData(formatData(data));
            },
        };
    }, []);
    const {isLoaded, userId} = useAuth();
    const {execute} = useAction(fetchClassesHandler, event);
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
        if (!isLoaded) return;
        execute({teacherId: userId!});
    }, [isLoaded, userId, execute]);

    return (
        <>
            <div className="w-11/12 pt-[120px]">
                <Button onClick={() => addTempClasses(userId!)}>
                    add temp data
                </Button>
                <TableFilter table={table} />
                <TableContent table={table} columns={columns} />
                <TablePagination table={table} />
            </div>
        </>
    );
}
