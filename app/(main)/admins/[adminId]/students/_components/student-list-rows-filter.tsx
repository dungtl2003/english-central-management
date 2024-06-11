import React, {ReactElement} from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";

export const Status: string[] = ["All", "Learning", "Pending", "Graduated"];

interface StudentListRowsFilterProps {
    selectedStatus: string[];
    handleStatusChange: (status: string) => void;
}

const StudentListRowsFilter = ({
    selectedStatus,
    handleStatusChange,
}: StudentListRowsFilterProps): ReactElement => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                    Status <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {Status.map((stt) => (
                    <DropdownMenuCheckboxItem
                        key={stt}
                        checked={selectedStatus.includes(stt)}
                        onCheckedChange={() => {
                            handleStatusChange(stt);
                        }}
                    >
                        {stt}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default StudentListRowsFilter;
