import React, {ReactElement, useEffect} from "react";
import {SessionTableModel} from "./session-table-model";
import {Table} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import SessionTableFilter from "./session-table-filter";

interface TablePaginationProps {
    table: Table<SessionTableModel>;
}

const AttendanceTablePagination = (
    props: TablePaginationProps
): ReactElement => {
    const pageIndexInput = React.useRef<HTMLInputElement>(null);
    const pageIndex = props.table.getState().pagination.pageIndex;

    useEffect(() => {
        if (pageIndexInput.current) {
            pageIndexInput.current.value = String(pageIndex + 1);
        }
    }, [pageIndex]);

    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="inline-flex flex-1">
                <SessionTableFilter table={props.table} />
            </div>
            <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => props.table.previousPage()}
                    disabled={!props.table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => props.table.nextPage()}
                    disabled={!props.table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default AttendanceTablePagination;
