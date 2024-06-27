import {Input} from "@/components/ui/input";
import React, {ReactElement} from "react";
import {TuitionPopupColumns, ColumnsDictionary} from "./types";
import {Table} from "@tanstack/react-table";

interface TableSearchBarProps {
    classInfoDictionary: ColumnsDictionary;
    searchBar: React.RefObject<HTMLInputElement>;
    table: Table<TuitionPopupColumns>;
    filterType: string;
}

const TuitionPopupSearchBar = ({
    classInfoDictionary,
    filterType,
    searchBar,
    table,
}: TableSearchBarProps): ReactElement => {
    return (
        <Input
            placeholder={`Filter by ${classInfoDictionary[
                "time"
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

export default TuitionPopupSearchBar;
