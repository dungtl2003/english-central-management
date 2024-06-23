import {Input} from "@/components/ui/input";
import React, {ReactElement} from "react";
import {ClassListModel, ClassListDictionary} from "./types";
import {Table} from "@tanstack/react-table";

interface TableSearchBarProps {
    classInfoDictionary: ClassListDictionary;
    searchBar: React.RefObject<HTMLInputElement>;
    table: Table<ClassListModel>;
    filterType: string;
}

const ClassListSearchBar = ({
    classInfoDictionary,
    filterType,
    searchBar,
    table,
}: TableSearchBarProps): ReactElement => {
    return (
        <Input
            placeholder={`Filter by ${classInfoDictionary[
                "className"
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

export default ClassListSearchBar;
