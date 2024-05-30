import React, {ReactElement} from "react";
import ClassListTableHeader from "./class-list-table-header";
import ClassListTableBody from "./class-list-table-body";
import {Table as T} from "@/components/ui/table";
import {ColumnDef, Table} from "@tanstack/react-table";
import {StudentInfo} from "../_attendance-components/student-info";

type TableContentProps = {
    table: Table<StudentInfo>;
    columns: ColumnDef<StudentInfo>[];
};

const ClassListTableContent = (props: TableContentProps): ReactElement => {
    return (
        <div className="rounded-md border">
            <T>
                <ClassListTableHeader table={props.table} />
                <ClassListTableBody
                    table={props.table}
                    columns={props.columns}
                />
            </T>
        </div>
    );
};

export default ClassListTableContent;
