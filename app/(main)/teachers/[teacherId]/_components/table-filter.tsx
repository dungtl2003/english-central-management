import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {ClassInfo, ClassInfoArray, ClassInfoDictionary} from "./class-info";
import TableSearchBar from "./table-search-bar";
import TableFilterOptions from "./table-filter-options";

type TableFilterProps = {
    table: Table<ClassInfo>;
};

const TableFilter = (props: TableFilterProps): ReactElement => {
    const [filterType, setFilterType] = React.useState("className");
    const [selectedRadio, setSelectedRadio] = React.useState("className");
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
        setFilterType(key);
        setSelectedRadio(key);
        props.table.setSorting([]);
        props.table.setRowSelection({});
    };

    return (
        <div className="flex items-center py-4">
            <div className="flex flex-row gap-x-4">
                <TableSearchBar
                    classInfoDictionary={ClassInfoDictionary}
                    searchBar={searchBar}
                    table={props.table}
                    filterType={filterType}
                />
                <TableFilterOptions
                    tableColumns={ClassInfoArray}
                    selectedOptions={selectedRadio}
                    searchBarRef={searchBar}
                    handleOnSelect={handleRadioClick}
                />
            </div>
        </div>
    );
};

export default TableFilter;
