"Use client";

import React from "react";
import {StudentListModel, StudentListInfoDictionary} from "./types";
import {ArrowUpDown} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import Link from "next/link";
function createColumns(
    key: string,
    title: string
): ColumnDef<StudentListModel> {
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

const StudentListColumns: ColumnDef<StudentListModel>[] = [];
for (const key in StudentListInfoDictionary) {
    StudentListColumns.push(createColumns(key, StudentListInfoDictionary[key]));
}

StudentListColumns.push({
    id: "actions",
    enableHiding: false,
    cell: () => (
        <Link href="/admins/1/students/1">
            <Button variant="outline">
                Detail
                <span className="pl-2">
                    <FaArrowUpRightFromSquare size={13} />
                </span>
            </Button>
        </Link>
    ),
});

export default StudentListColumns;
