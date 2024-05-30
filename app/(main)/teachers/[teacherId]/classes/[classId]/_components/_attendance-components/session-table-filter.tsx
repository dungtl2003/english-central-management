import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {SessionTableModel} from "./session-table-model";
import {Input} from "@/components/ui/input";

interface TableFilterProps {
    table: Table<SessionTableModel>;
}

const SessionTableFilter = ({table}: TableFilterProps): ReactElement => {
    const filterType: string = "attendanceDate";
    const searchBar = React.useRef<HTMLInputElement>(null);
    return (
        <div className="flex flex-row gap-x-4">
            <Input
                placeholder={"Filter by attendance date"}
                ref={searchBar}
                value={
                    (table.getColumn(filterType)?.getFilterValue() as string) ??
                    ""
                }
                onChange={(event) =>
                    table
                        .getColumn(filterType)
                        ?.setFilterValue(event.target.value)
                }
                className="w-[250px]"
            />
        </div>
    );
};

export default SessionTableFilter;
