import {Input} from "@/components/ui/input";
import React, {ReactElement} from "react";
import {AttendancePopupColumns, ColumnsDictionary} from "./types";
import {Table} from "@tanstack/react-table";

interface TableSearchBarProps {
    classInfoDictionary: ColumnsDictionary;
    searchBar: React.RefObject<HTMLInputElement>;
    table: Table<AttendancePopupColumns>;
    filterType: string;
}

const AttendancePopupSearchBar = ({
    classInfoDictionary,
    filterType,
    searchBar,
    table,
}: TableSearchBarProps): ReactElement => {
    return (
        <Input
            placeholder={`Filter by ${classInfoDictionary[
                "date"
            ].toLowerCase()}`}
            ref={searchBar}
            value={
                (table.getColumn(filterType)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
                table.getColumn(filterType)?.setFilterValue(event.target.value)
            }
            className="w-[250px]"
        />
    );
};

export default AttendancePopupSearchBar;
