import React, {ReactElement} from "react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {FaCopy} from "react-icons/fa";
import {FaCheck} from "react-icons/fa";
import UnitDetailNewClass from "./new-class/unit-detail-new-class";

interface TeacherDetailHeaderProps {
    studentId: string;
}

const copyToClipboard = (teacherId: string) => {
    navigator.clipboard.writeText(teacherId);
};

const StudentDetailHeader = ({
    studentId,
}: TeacherDetailHeaderProps): ReactElement => {
    const [icon, setIcon] = React.useState<ReactElement>(<FaCopy />);

    const handleCopyClick = () => {
        copyToClipboard(studentId);
        setIcon(<FaCheck color="green" />);
        setTimeout(() => setIcon(<FaCopy />), 1000);
    };

    return (
        <div className="pt-5 pl-6 pr-6 row-span-1">
            <div className="grid grid-cols-3 pb-4">
                <div className="grid grid-cols-6">
                    <div className="col-span-5">
                        <div className="flex items-center text-2xl">
                            U01 - 2024
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                            ID: {studentId}{" "}
                            <Button
                                variant="icon"
                                size="icon"
                                onClick={() => handleCopyClick()}
                            >
                                {icon}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className=""></div>
                <div className="flex items-center justify-end">
                    <UnitDetailNewClass />
                </div>
            </div>
            <Separator />
        </div>
    );
};

export default StudentDetailHeader;
