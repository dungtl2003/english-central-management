import React, {ReactElement} from "react";
import {Table as T} from "@/components/ui/table";
import {ColumnDef, Table} from "@tanstack/react-table";
import ClassListTableBody from "./student-list-table-body";
import ClassListTableHeader from "./student-list-table-header";
import {StudentInfoData} from "./types";

type TableContentProps = {
    table: Table<StudentInfoData>;
    columns: ColumnDef<StudentInfoData>[];
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
