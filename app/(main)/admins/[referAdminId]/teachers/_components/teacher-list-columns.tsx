"Use client";

import React from "react";
import {TeacherListModel, TeacherListInfoDictionary} from "./types";
import {ArrowUpDown} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import Link from "next/link";
function createColumns(
    key: string,
    title: string
): ColumnDef<TeacherListModel> {
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

const TeacherListColumns: ColumnDef<TeacherListModel>[] = [];
for (const key in TeacherListInfoDictionary) {
    TeacherListColumns.push(createColumns(key, TeacherListInfoDictionary[key]));
}

TeacherListColumns.push({
    id: "actions",
    enableHiding: false,
    cell: () => (
        <Link href="/admins/1/teachers/1">
            <Button variant="outline">
                Detail
                <span className="pl-2">
                    <FaArrowUpRightFromSquare size={13} />
                </span>
            </Button>
        </Link>
    ),
});

export default TeacherListColumns;
