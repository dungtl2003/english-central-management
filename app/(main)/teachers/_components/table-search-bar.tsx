import {Input} from "@/components/ui/input";
import React, {ReactElement} from "react";
import {ClassInfo, TableDictionary} from "./class-info";
import {Table} from "@tanstack/react-table";

type TableSearchBarProps = {
    classInfoDictionary: TableDictionary;
    searchBar: React.RefObject<HTMLInputElement>;
    table: Table<ClassInfo>;
    filterType: string;
};

const TableSearchBar = (props: TableSearchBarProps): ReactElement => {
    return (
        <Input
            placeholder={`Filter by ${props.classInfoDictionary[
                "className"
            ].toLowerCase()}`}
            ref={props.searchBar}
            value={
                (props.table
                    .getColumn(props.filterType)
                    ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
                props.table
                    .getColumn(props.filterType)
                    ?.setFilterValue(event.target.value)
            }
            className="w-[346px]"
        />
    );
};

export default TableSearchBar;
