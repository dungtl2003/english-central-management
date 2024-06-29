import {Input} from "@/components/ui/input";
import React, {ReactElement} from "react";
import {UnitListModel, UnitListDictionary} from "./types";
import {Table} from "@tanstack/react-table";

interface TableSearchBarProps {
    classInfoDictionary: UnitListDictionary;
    searchBar: React.RefObject<HTMLInputElement>;
    table: Table<UnitListModel>;
    filterType: string;
}

const UnitListSearchBar = ({
    classInfoDictionary,
    filterType,
    searchBar,
    table,
}: TableSearchBarProps): ReactElement => {
    return (
        <Input
            placeholder={`Filter by ${classInfoDictionary[
                "year"
            ].toLowerCase()}`}
            ref={searchBar}
            value={
                (table.getColumn(filterType)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
                table.getColumn(filterType)?.setFilterValue(event.target.value)
            }
            className="w-[346px]"
        />
    );
};

export default UnitListSearchBar;
