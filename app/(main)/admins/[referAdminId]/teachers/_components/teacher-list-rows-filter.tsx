import React, {ReactElement} from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";

export const Status: string[] = ["All", "Teaching", "Pending", "Retired"];

type TeacherListRowsFilterProps = {
    selectedStatus: string[];
    handleStatusChange: (status: string) => void;
};

const TeacherListRowsFilter = ({
    selectedStatus,
    handleStatusChange,
}: TeacherListRowsFilterProps): ReactElement => {
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

export default TeacherListRowsFilter;
