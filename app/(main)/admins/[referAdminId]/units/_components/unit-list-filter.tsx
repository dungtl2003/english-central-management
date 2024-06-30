import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {
    UnitListModel,
    unitListInfoArray,
    unitListInfoDictionary,
} from "./types";
import UnitListSearchBar from "./unit-list-search-bar";
import UnitListColumnsFilter from "./unit-list-columns-filter";
import UnitListNewUnit from "./unit-list-new-unit";

interface TableFilterProps {
    table: Table<UnitListModel>;
}

const UnitListFilter = ({table}: TableFilterProps): ReactElement => {
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
        <div className="flex items-center py-4">
            <div className="w-full flex flex-row gap-x-4">
                <UnitListSearchBar
                    classInfoDictionary={unitListInfoDictionary}
                    searchBar={searchBar}
                    table={table}
                    filterType={filterType}
                />
                <UnitListColumnsFilter
                    tableColumns={unitListInfoArray}
                    selectedOptions={selectedRadio}
                    searchBarRef={searchBar}
                    handleOnSelect={handleRadioClick}
                />
                <div className="ml-auto">
                    <UnitListNewUnit />
                </div>
            </div>
        </div>
    );
};

export default UnitListFilter;
