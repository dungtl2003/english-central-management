import {ReactElement, useMemo, useRef, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {TabsContent} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {FaSave, FaEdit} from "react-icons/fa";
import SalaryDetailTable from "./salary-detail-table";
import {SalaryDetailData} from "../../types";
import {TeacherStatus} from "@prisma/client";
import {handler} from "@/lib/action/admin/update-teacher";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {InputType, OutputType} from "@/lib/action/admin/update-teacher/types";
import {toast} from "@/components/ui/use-toast";
import {parse} from "date-fns";
import {LoadingUpdate} from "../loading-update-data";
import {useUser} from "@clerk/nextjs";

const SalaryDetailTab = ({
    teacherId,
    salaryDetailDatas,
    teacherStatus,
    acceptDate,
    baseSalary,
    setBaseSalary,
    monthlySalary,
    setMonthlySalary,
}: {
    teacherId: string;
    salaryDetailDatas: SalaryDetailData[] | undefined;
    teacherStatus: TeacherStatus;
    acceptDate: string;
    baseSalary: string;
    setBaseSalary: (v: string) => void;
    monthlySalary: string;
    setMonthlySalary: (v: string) => void;
}): ReactElement => {
    const {user} = useUser();
    const [isEditing, setIsEditing] = useState(false);

    const eventUpdateBaseSalary: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.log("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Update base salary failed",
                });
            },
            onSuccess: (data: OutputType) => {
                toast({
                    title: "success",
                    description: "Update base salary succeed",
                });
                console.log("Update base salary successful: ", data);
            },
        };
    }, []);
    const {execute} = useAction<InputType, OutputType>(
        handler,
        eventUpdateBaseSalary
    );
    const [isUpdating, setIsUpdating] = useState(false);

    const seniority = acceptDate
        ? new Date().getFullYear() -
          parse(acceptDate as string, "dd/MM/yyyy", new Date()).getFullYear()
        : 0;
    const handleEditClick = () => {
        const input: string = baseSalaryRef.current;
        if (isEditing) {
            if (!(input === baseSalary)) {
                setIsUpdating(true);
                setBaseSalary(input);
                setMonthlySalary(
                    seniority
                        ? (Number(input) * (1 + seniority / 10)).toString()
                        : "0"
                );
                execute({
                    teacherId: teacherId,
                    referAdminId: user?.id as string,
                    baseSalary: Number(input),
                }).then(() => {
                    setIsUpdating(false);
                });
            }
        }
        setIsEditing(!isEditing);
    };

    // const handleBlur = (value: string, setter: (value: string) => void) => {
    //     if (!value.includes("$")) {
    //         setter(`${value}$`);
    //     }
    // };

    const baseSalaryRef = useRef(baseSalary);

    const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
        "Home",
        "End",
        "Shift",
        "Control",
        "Alt",
    ];

    return (
        <>
            <TabsContent value="salaryDetail">
                <div className="grid grid-rows-6">
                    <div className="row-span-1 grid grid-cols-3 gap-x-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 text-[14px]">
                                Base salary{" "}
                                <span className="text-slate-400">($)</span>
                            </Label>
                            <Input
                                id="baseSalaryInput"
                                type="text"
                                defaultValue={baseSalaryRef.current}
                                disabled={!isEditing}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    if (/^[0-9]*$/.test(input)) {
                                        baseSalaryRef.current = input;
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (/^[^0-9]*$/.test(e.key)) {
                                        if (allowedKeys.includes(e.key)) return;
                                        e.preventDefault();
                                    }
                                }}
                                //onBlur={() => handleBlur(baseSalary, setBaseSalary)}
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 text-[14px]">
                                Monthly salary{" "}
                                <span className="text-slate-400">($)</span>
                            </Label>
                            <Input
                                type="text"
                                value={monthlySalary}
                                disabled={true}
                                //onChange={(e) => setMonthlySalary(e.target.value)}
                                // onBlur={() =>
                                //     handleBlur(monthlySalary, setMonthlySalary)
                                // }
                            />
                        </div>
                        <div className="grid grid-rows-3">
                            <div></div>
                            <div className="row-span-2 flex items-end">
                                <Button
                                    onClick={handleEditClick}
                                    disabled={
                                        teacherStatus === "PENDING" ||
                                        teacherStatus === "DELETED" ||
                                        teacherStatus === "REJECTED"
                                    }
                                    variant={isEditing ? "success" : "default"}
                                    className="min-w-[85px]"
                                >
                                    <span className="pr-1">
                                        {isEditing ? <FaSave /> : <FaEdit />}
                                    </span>{" "}
                                    {isEditing ? "Save" : "Edit"}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="row-span-5 pt-5">
                        <SalaryDetailTable
                            teacherStatus={teacherStatus}
                            setIsUpdating={setIsUpdating}
                            teacherId={teacherId}
                            salaryDetailDatas={salaryDetailDatas}
                            baseSalary={baseSalary}
                            monthlySalary={monthlySalary}
                            acceptDate={acceptDate}
                        />
                    </div>
                </div>
            </TabsContent>
            {isUpdating && <LoadingUpdate />}
        </>
    );
};

export default SalaryDetailTab;
