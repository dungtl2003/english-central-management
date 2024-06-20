import React, {ChangeEvent, ReactElement, useEffect} from "react";
import {TeacherListData} from "./types";
import {Table} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

type TablePaginationProps = {
    table: Table<TeacherListData>;
};

const TeacherListPagination = ({table}: TablePaginationProps): ReactElement => {
    const pageIndexInput = React.useRef<HTMLInputElement>(null);
    const pageIndex = table.getState().pagination.pageIndex;

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.value) return;

        try {
            const page = Number(e.target.value) - 1;
            if (page < 0 || page >= table.getPageCount()) return;
            table.setPageIndex(page);
        } catch (error) {}
    };

    useEffect(() => {
        if (pageIndexInput.current) {
            pageIndexInput.current.value = String(pageIndex + 1);
        }
    }, [pageIndex]);

    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="inline-flex flex-1">
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {pageIndex + 1} of{" "}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <span className="flex pl-1.5 items-center gap-1">
                    | Go to page:
                    <Input
                        ref={pageIndexInput}
                        type="text"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={inputChangeHandler}
                        className="border p-1 h-[35px] rounded w-16"
                    />
                </span>
            </div>
            <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default TeacherListPagination;
