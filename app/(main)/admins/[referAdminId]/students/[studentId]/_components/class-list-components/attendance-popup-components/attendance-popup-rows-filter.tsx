import React, {ReactElement} from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";

export const statuses: string[] = ["All", "Present", "Late", "Absent"];

interface AttendancePopupRowsFilterProps {
    selectedStatus: string[];
    handleStatusChange: (status: string) => void;
}

const AttendancePopupRowsFilter = ({
    selectedStatus,
    handleStatusChange,
}: AttendancePopupRowsFilterProps): ReactElement => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                    Status <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {statuses.map((status) => (
                    <DropdownMenuCheckboxItem
                        key={status}
                        checked={selectedStatus.includes(status)}
                        onCheckedChange={() => {
                            handleStatusChange(status);
                        }}
                    >
                        {status}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AttendancePopupRowsFilter;
