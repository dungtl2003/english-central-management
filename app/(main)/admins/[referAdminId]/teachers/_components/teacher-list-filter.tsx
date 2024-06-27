import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {
    TeacherListModel,
    TeacherListInfoArray,
    TeacherListInfoDictionary,
} from "./types";
import TeacherListSearchBar from "./teacher-list-search-bar";
import TeacherListColumnsFilter from "./teacher-list-columns-filter";
import TeacherListRowsFilter from "./teacher-list-rows-filter";

interface TableFilterProps {
    table: Table<TeacherListModel>;
    selectedStatus: string[];
    handleStatusChange: (status: string) => void;
}

const TeacherListFilter = ({
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
                <TeacherListSearchBar
                    classInfoDictionary={TeacherListInfoDictionary}
                    searchBar={searchBar}
                    table={table}
                    filterType={filterType}
                />
                <TeacherListColumnsFilter
                    tableColumns={TeacherListInfoArray}
                    selectedOptions={selectedRadio}
                    searchBarRef={searchBar}
                    handleOnSelect={handleRadioClick}
                />
                <TeacherListRowsFilter
                    selectedStatus={selectedStatus}
                    handleStatusChange={handleStatusChange}
                />
            </div>
        </div>
    );
};

export default TeacherListFilter;
