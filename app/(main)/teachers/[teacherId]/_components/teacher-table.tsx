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
import {Time} from "@/lib/time";
import {Schedule} from "@/app/api/classes/schema";
import {Unit} from "@prisma/client";

interface PostUnit {
    year: number;
    grade: number;
    maxSessions: number;
    maxStudents: number;
    studyHour: number;
    studyMinute: number;
    studySecond: number;
    pricePerSession: number;
}

interface PostClass {
    unitId: string;
    teacherId: string;
    startDate: Date;
    timeZone: string;
    schedules: Schedule[];
}

//TODO: for temp testing, will remove later
const bypass = async (teacherId: string): Promise<void> => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    const unitUrl = `${protocol}://${domain}/api/units`;
    const classUrl = `${protocol}://${domain}/api/classes`;

    const tempUnitBody: PostUnit = {
        year: 2024,
        grade: 3,
        maxSessions: 17,
        maxStudents: 50,
        studyHour: 2,
        studyMinute: 30,
        studySecond: 0,
        pricePerSession: 5.99,
    };

    const unitRes = await fetch(unitUrl, {
        method: "POST",
        body: JSON.stringify(tempUnitBody),
    });
    const unit: Unit = await unitRes.json();

    const tempClassBody: PostClass = {
        unitId: unit.id,
        teacherId: teacherId,
        startDate: new Date(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        schedules: [],
    };

    const startTime = [
        "01:30:00", //1
        "07:00:00", //4
        "15:30:00", //1
    ];
    const dow = [1, 4, 1];
    for (let i = 0; i < 3; i++) {
        const t = Time.from(startTime[i]);
        tempClassBody.schedules.push({
            dayOfWeek: dow[i],
            startHour: t.hour,
            startMinute: t.minute,
            startSecond: t.second,
        });
    }

    const classRes = await fetch(classUrl, {
        method: "POST",
        body: JSON.stringify(tempClassBody),
    });

    const cls = await classRes.json();

    console.log("Unit: ", unit);
    console.log("Class: ", cls);
};

const formatData = (fetchedData: OutputType): ClassInfo[] | undefined => {
    if (!fetchedData) return undefined;

    const displayData: ClassInfo[] = [];
    fetchedData.forEach((data) =>
        displayData.push({
            classId: data.id,
            className: `${data.unit.grade}.${data.index}`,
            teacher: `${data.teacher.user.lastName} ${data.teacher.user.firstName}`,
            year: String(data.unit.year),
            start: formatDate(new Date(data.startTime)),
            end: formatDate(new Date(data.endTime)),
            price:
                "$" +
                String(
                    Math.round(
                        Number(data.unit.pricePerSession) *
                            data.unit.maxSessions *
                            100
                    ) / 100
                ),
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
                <Button onClick={() => bypass(userId!)}>bypass</Button>
                <TableFilter table={table} />
                <TableContent table={table} columns={columns} />
                <TablePagination table={table} />
            </div>
        </>
    );
}
