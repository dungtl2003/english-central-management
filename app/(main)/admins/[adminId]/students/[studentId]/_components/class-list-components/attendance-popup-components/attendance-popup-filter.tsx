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
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
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
            <div className="flex flex-row w-full gap-x-4">
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
                <div className="flex gap-x-4 ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                {/* số buổi đã học hiện tại / tổng số buổi */}
                                Current progress:{" "}
                                <span className="pl-1.5">27 / 50</span>{" "}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="">
                            <DropdownMenuItem className="flex justify-center items-center">
                                {/* Cái này là đến đúng giờ, nếu mà đến muộn vẫn tính là "Present" thì tự cộng vào hoặc đổi cái "Present" => "On time" */}
                                Present:{" "}
                                <span className="pl-1.5 text-green-400">
                                    23
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center items-center">
                                Late:{" "}
                                <span className="pl-1.5 text-yellow-400">
                                    3
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center items-center">
                                Absent:{" "}
                                <span className="pl-1.5 text-red-600">1</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default AttendancePopupFilter;
