import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {
    ClassListModel,
    classListInfoDictionary,
    ClassStatistics,
} from "./types";
import ClassListSearchBar from "./class-list-search-bar";
import ClassListColumnsFilter from "./class-list-columns-filter";
import ClassListRowsFilter from "./class-list-rows-filter";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";

interface TableFilterProps {
    table: Table<ClassListModel>;
    selectedStatus: string[];
    handleStatusChange: (status: string) => void;
    stats: ClassStatistics;
    tableColumns: string[];
}

const ClassListFilter = ({
    table,
    selectedStatus,
    handleStatusChange,
    stats,
    tableColumns,
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
            <div className="flex gap-x-4 w-full">
                <ClassListSearchBar
                    classInfoDictionary={classListInfoDictionary}
                    searchBar={searchBar}
                    table={table}
                    filterType={filterType}
                />
                <ClassListColumnsFilter
                    tableColumns={tableColumns}
                    selectedOptions={selectedRadio}
                    searchBarRef={searchBar}
                    handleOnSelect={handleRadioClick}
                />
                <ClassListRowsFilter
                    selectedStatus={selectedStatus}
                    handleStatusChange={handleStatusChange}
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Total classes:{" "}
                            <span className="pl-1.5">{stats.total}</span>{" "}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        <DropdownMenuItem className="flex justify-center items-center">
                            Active:{" "}
                            <span className="pl-1.5 text-green-400">
                                {stats.active}
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex justify-center items-center">
                            Waiting:{" "}
                            <span className="pl-1.5 text-yellow-400">
                                {stats.waiting}
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex justify-center items-center">
                            Closed:{" "}
                            <span className="pl-1.5 text-red-600">
                                {stats.closed}
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default ClassListFilter;
