import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {
    StudentListModel,
    studentListInfoArray,
    studentListInfoDictionary,
} from "./types";
import StudentListSearchBar from "./student-list-search-bar";
import StudentListColumnsFilter from "./student-list-columns-filter";
import StudentListRowsFilter from "./student-list-rows-filter";

interface TableFilterProps {
    table: Table<StudentListModel>;
    selectedStatus: string;
    handleStatusChange: (status: string) => void;
}

const StudentListFilter = ({
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
                <StudentListSearchBar
                    classInfoDictionary={studentListInfoDictionary}
                    searchBar={searchBar}
                    table={table}
                    filterType={filterType}
                />
                <StudentListColumnsFilter
                    tableColumns={studentListInfoArray}
                    selectedOptions={selectedRadio}
                    searchBarRef={searchBar}
                    handleOnSelect={handleRadioClick}
                />
                <StudentListRowsFilter
                    selectedStatus={selectedStatus}
                    handleStatusChange={handleStatusChange}
                />
            </div>
        </div>
    );
};

export default StudentListFilter;
