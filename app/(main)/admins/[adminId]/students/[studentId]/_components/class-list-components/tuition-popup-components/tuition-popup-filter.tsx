import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {
    TuitionPopupColumns,
    tuitionPopupColumnsArray,
    tuitionPopupColumnsDictionary,
} from "./types";
import TuitionPopupSearchBar from "./tuition-popup-search-bar";
import TuitionPopupColumnsFilter from "./tuition-popup-columns-filter";
import TuitionPopupRowsFilter from "./tuition-popup-rows-filter";

interface TableFilterProps {
    table: Table<TuitionPopupColumns>;
    selectedStatus: string[];
    handleStatusChange: (status: string) => void;
}

const TuitionPopupFilter = ({
    table,
    selectedStatus,
    handleStatusChange,
}: TableFilterProps): ReactElement => {
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
            <div className="flex flex-row gap-x-4">
                <TuitionPopupSearchBar
                    classInfoDictionary={tuitionPopupColumnsDictionary}
                    searchBar={searchBar}
                    table={table}
                    filterType={filterType}
                />
                <TuitionPopupColumnsFilter
                    tableColumns={tuitionPopupColumnsArray}
                    selectedOptions={selectedRadio}
                    searchBarRef={searchBar}
                    handleOnSelect={handleRadioClick}
                />
                <TuitionPopupRowsFilter
                    selectedStatus={selectedStatus}
                    handleStatusChange={handleStatusChange}
                />
            </div>
        </div>
    );
};

export default TuitionPopupFilter;
