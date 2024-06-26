import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {
    ParentListModel,
    parentListInfoArray,
    parentListInfoDictionary,
} from "./types";
import StudentListSearchBar from "./parent-list-search-bar";
import StudentListColumnsFilter from "./parent-list-columns-filter";
import {Button} from "@/components/ui/button";

interface TableFilterProps {
    table: Table<ParentListModel>;
    total: number;
}

const ParentListFilter = ({table, total}: TableFilterProps): ReactElement => {
    const [filterType, _setFilterType] = React.useState("fullName");
    const [selectedRadio, _setSelectedRadio] = React.useState("fullName");
    const searchBar = React.useRef<HTMLInputElement>(null);
    const handleRadioClick = (
        key: string,
        title: string,
        searchBar: React.RefObject<HTMLInputElement>
    ) => {
        searchBar.current?.setAttribute(
            "placeholder",
            `Filter by ${title.toLocaleLowerCase()}`
        );
        _setFilterType(key);
        _setSelectedRadio(key);
        table.setSorting([]);
        table.setColumnFilters([]);
        table.setRowSelection({});
    };

    return (
        <div className="flex items-center py-4 w-full">
            <div className="flex flex-row gap-x-4 w-full">
                <StudentListSearchBar
                    classInfoDictionary={parentListInfoDictionary}
                    searchBar={searchBar}
                    table={table}
                    filterType={filterType}
                />
                <StudentListColumnsFilter
                    tableColumns={parentListInfoArray}
                    selectedOptions={selectedRadio}
                    searchBarRef={searchBar}
                    handleOnSelect={handleRadioClick}
                />
                <div className="ml-auto">
                    <Button variant="outline">
                        Total:{" "}
                        <span className="text-green-500 pl-1.5">{total}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ParentListFilter;
