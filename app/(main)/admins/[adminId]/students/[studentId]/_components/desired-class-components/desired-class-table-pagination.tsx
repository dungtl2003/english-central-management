import React, {ChangeEvent, ReactElement, useEffect} from "react";
import {DesiredClassColumns} from "./types";
import {Table} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

type TablePaginationProps = {
    table: Table<DesiredClassColumns>;
};

const DesiredClassTablePagination = (
    props: TablePaginationProps
): ReactElement => {
    const pageIndexInput = React.useRef<HTMLInputElement>(null);
    const pageIndex = props.table.getState().pagination.pageIndex;

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.value) return;

        try {
            const page = Number(e.target.value) - 1;
            if (page < 0 || page >= props.table.getPageCount()) return;
            props.table.setPageIndex(page);
        } catch (error) {}
    };

    useEffect(() => {
        if (pageIndexInput.current) {
            pageIndexInput.current.value = String(pageIndex + 1);
        }
    }, [pageIndex]);

    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm inline-flex flex-1">
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {pageIndex + 1} of{" "}
                        {props.table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <span className="flex pl-1.5 items-center gap-1">
                    | Go to page:
                    <Input
                        ref={pageIndexInput}
                        type="text"
                        defaultValue={
                            props.table.getState().pagination.pageIndex + 1
                        }
                        onChange={inputChangeHandler}
                        className="border p-1 h-[30px] rounded w-[35px]"
                    />
                </span>
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

export default DesiredClassTablePagination;
