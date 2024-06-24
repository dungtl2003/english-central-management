import React, {ReactElement, useState} from "react";
import {classListColumnsDictionary, ClasslistTableData} from "./types";
import ClassListTablePagination from "./class-list-table-pagination";
import ClassListTableFilter from "./class-list-table-filter";
import ClassListTableContent from "./class-list-table-content";
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
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import Link from "next/link";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import {ClassListData} from "../../types";
import {useParams} from "next/navigation";

function createColumn(
    key: string,
    title: string
): ColumnDef<ClasslistTableData> {
    return {
        accessorKey: key,
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() !== "desc")
                }
            >
                {title}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    };
}

const createColumns = (adminId: string): ColumnDef<ClasslistTableData>[] => {
    const ClassListTableColumns: ColumnDef<ClasslistTableData>[] = [];
    for (const key in classListColumnsDictionary) {
        ClassListTableColumns.push(
            createColumn(key, classListColumnsDictionary[key])
        );
    }

    ClassListTableColumns.push({
        id: "actions",
        enableHiding: false,
        cell: ({row}) => (
            <Link
                href={"/admins/" + adminId + "/classes/" + row.original.classId}
            >
                <Button variant="outline">
                    Detail
                    <span className="pl-2">
                        <FaArrowUpRightFromSquare size={13} />
                    </span>
                </Button>
            </Link>
        ),
    });
    return ClassListTableColumns;
};

const formatData = (
    classListData: ClassListData[] | undefined
): ClasslistTableData[] => {
    if (!classListData) return [];
    const classListTableData: ClasslistTableData[] = [];
    classListData.forEach((e) => {
        const d: ClasslistTableData = {
            classId: e.classId,
            grade: e.grade,
            index: e.index,
            startTime: e.startTime,
            endTime: e.endTime,
            year: e.year,
            price: e.price,
            className: e.grade + "." + e.index,
        };
        classListTableData.push(d);
    });
    return classListTableData;
};

const ClassListTab = ({
    classListData,
}: {
    classListData: ClassListData[] | undefined;
}): ReactElement => {
    const {adminId} = useParams();
    const columns: ColumnDef<ClasslistTableData>[] = createColumns(
        adminId as string
    );

    const [data] = useState<ClasslistTableData[]>(formatData(classListData));
    const [sorting, _setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 4,
    });

    const table = useReactTable({
        data,
        columns,
        onSortingChange: _setSorting,
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

    return (
        <TabsContent value="classList">
            <ClassListTableFilter table={table} />
            <ClassListTableContent table={table} columns={columns} />
            <ClassListTablePagination table={table} />
        </TabsContent>
    );
};

export default ClassListTab;
