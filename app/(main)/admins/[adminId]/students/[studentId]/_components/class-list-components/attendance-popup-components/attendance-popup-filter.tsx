import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {
    AttendancePopupColumns,
    attendancePopupColumnsArray,
    attendancePopupColumnsDictionary,
} from "./types";
import AttendancePopupSearchBar from "./attendance-popup-search-bar";
import AttendancePopupColumnsFilter from "./attendance-popup-columns-filter";
import AttendancePopupRowsFilter from "./attendance-popup-rows-filter";

interface TableFilterProps {
    table: Table<AttendancePopupColumns>;
    selectedStatus: string[];
    handleStatusChange: (status: string) => void;
}

const AttendancePopupFilter = ({
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
                <AttendancePopupSearchBar
                    classInfoDictionary={attendancePopupColumnsDictionary}
                    searchBar={searchBar}
                    table={table}
                    filterType={filterType}
                />
                <AttendancePopupColumnsFilter
                    tableColumns={attendancePopupColumnsArray}
                    selectedOptions={selectedRadio}
                    searchBarRef={searchBar}
                    handleOnSelect={handleRadioClick}
                />
                <AttendancePopupRowsFilter
                    selectedStatus={selectedStatus}
                    handleStatusChange={handleStatusChange}
                />
            </div>
        </div>
    );
};

export default AttendancePopupFilter;
