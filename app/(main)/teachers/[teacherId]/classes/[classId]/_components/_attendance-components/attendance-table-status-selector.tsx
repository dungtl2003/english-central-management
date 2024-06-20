import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {ReactElement} from "react";
import {AttendanceTableModel} from "./types";
import {AttendanceStatus} from "@prisma/client";

const AttendanceTableStatusSelector: React.FC<{
    initialValue: AttendanceTableModel;
    onChange: (value: AttendanceStatus) => void;
}> = ({initialValue, onChange}): ReactElement => {
    return (
        <Select
            defaultValue={initialValue.status || "PRESENT"}
            onValueChange={(value) => onChange(value as AttendanceStatus)}
        >
            <SelectTrigger className="w-full">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="PRESENT">Present</SelectItem>
                <SelectItem value="ABSENT">Absent</SelectItem>
                <SelectItem value="LATE">Late</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default AttendanceTableStatusSelector;
