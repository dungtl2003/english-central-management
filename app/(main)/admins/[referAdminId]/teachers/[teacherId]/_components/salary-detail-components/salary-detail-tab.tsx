import React, {ReactElement} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {TabsContent} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {FaSave, FaEdit} from "react-icons/fa";
import SalaryDetailTable from "./salary-detail-table";

const SalaryDetailTab = (): ReactElement => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [baseSalary, setBaseSalary] = React.useState("100$");
    const [monthlySalary, setMonthlySalary] = React.useState("500$");

    const handleEditClick = () => {
        if (isEditing) {
            // Save logic here
        }
        setIsEditing(!isEditing);
    };

    const handleBlur = (value: string, setter: (value: string) => void) => {
        if (!value.includes("$")) {
            setter(`${value}$`);
        }
    };

    return (
        <TabsContent value="salaryDetail">
            <div className="grid grid-rows-6">
                <div className="row-span-1 grid grid-cols-3 gap-x-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">
                            Base salary{" "}
                            <span className="text-slate-400">($)</span>
                        </Label>
                        <Input
                            type="text"
                            value={baseSalary}
                            disabled={!isEditing}
                            onChange={(e) => setBaseSalary(e.target.value)}
                            onBlur={() => handleBlur(baseSalary, setBaseSalary)}
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
                            disabled={!isEditing}
                            onChange={(e) => setMonthlySalary(e.target.value)}
                            onBlur={() =>
                                handleBlur(monthlySalary, setMonthlySalary)
                            }
                        />
                    </div>
                    <div className="grid grid-rows-3">
                        <div></div>
                        <div className="row-span-2 flex items-end">
                            <Button
                                onClick={handleEditClick}
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
                    <SalaryDetailTable />
                </div>
            </div>
        </TabsContent>
    );
};

export default SalaryDetailTab;
