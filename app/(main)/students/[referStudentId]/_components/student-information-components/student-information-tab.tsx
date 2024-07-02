import React, {ReactElement, useEffect, useRef, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {TabsContent} from "@/components/ui/tabs";
import {CalendarIcon} from "lucide-react";
import {StudentInfoFormatData, ParentPreviewData} from "./types";
import {StudentInfoData} from "../types";
import {format} from "date-fns";
import {LoadingUpdate} from "../loading-update-data";
import {concatName} from "@/lib/utils";
import {DEFAULT_AVATAR_URL} from "@/constaints";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {ScrollArea} from "@/components/ui/scroll-area";

const dummyData: {fullName: string; id: string}[] = [
    {
        fullName: "Trần Lưu Dũng",
        id: "12345678901234567890",
    },
    {
        fullName: "Nguyễn Minh Đức",
        id: "12345678901234567891",
    },
    {
        fullName: "Nguyễn Hữu Nhật Quang",
        id: "12345678901234567892",
    },
];

const formatData = (
    studentInfoData: StudentInfoData,
    currentDiscount: number
): StudentInfoFormatData => {
    if (!studentInfoData)
        return {
            firstName: "___",
            lastName: "___",
            email: "___",
            phoneNumber: "___",
            identityCard: "___",
            gender: "___",
            birthday: "___",
            role: "___",
            discount: "0",
            createDate: "___",
            deleleDate: "___",
            parents: [],
        };
    const parents: ParentPreviewData[] = [];
    if (studentInfoData.parents) {
        studentInfoData.parents.forEach((element) => {
            const parent: ParentPreviewData = {
                id: element.id,
                imgUrl: element.user.imageUrl || DEFAULT_AVATAR_URL,
                fullName:
                    concatName(
                        element.user.firstName,
                        element.user.lastName,
                        true
                    ) || "___ ___",
                email: element.user.email,
                phoneNumber: element.user.phoneNumber || "___",
                identityCard: element.user.identifyCard || "___",
            };
            parents.push(parent);
        });
    }

    const studentInfo: StudentInfoFormatData = {
        firstName: studentInfoData?.user.firstName || "___",
        lastName: studentInfoData?.user.lastName || "___",
        email: studentInfoData?.user.email,
        phoneNumber: studentInfoData?.user.phoneNumber || "___",
        identityCard: studentInfoData?.user.identifyCard || "___",
        gender: studentInfoData.user.gender || "___",
        birthday: studentInfoData?.user.birthday
            ? format(studentInfoData?.user.birthday, "yyyy-MM-dd")
            : "___",
        role: studentInfoData?.user.role as string,
        discount: currentDiscount.toString(),
        createDate: studentInfoData?.user.createdAt
            ? format(studentInfoData?.user.createdAt, "yyyy-MM-dd")
            : "___",
        deleleDate: studentInfoData?.user.deletedAt
            ? format(studentInfoData?.user.deletedAt, "yyyy-MM-dd")
            : "___",
        parents: parents,
    };

    return studentInfo;
};

const StudentInformationTab = ({
    studentInfoData,
    currentDiscount,
}: {
    studentInfoData: StudentInfoData;
    currentDiscount: number;
}): ReactElement => {
    const [studentInfo, setStudentInfo] = useState<StudentInfoFormatData>(
        formatData(studentInfoData, currentDiscount)
    );

    useEffect(() => {
        setStudentInfo(formatData(studentInfoData, currentDiscount));
    }, [studentInfoData, currentDiscount]);

    const discountRef = useRef(currentDiscount);

    const [isUpdating] = useState(false);

    const [selectedParent, setSelectedParent] = useState<{
        fullName: string;
        id: string;
    } | null>(null);
    const [selectedParents, setSelectedParents] = useState<
        {fullName: string; id: string}[]
    >([]);

    const handleAddParent = () => {
        if (selectedParent) {
            setSelectedParents([...selectedParents, selectedParent]);
            setSelectedParent(null);
        }
    };

    return (
        <>
            <TabsContent value="studentInfo">
                <div className="pl-1 grid grid-cols-2">
                    <div className="grid grid-cols-2 grid-rows-5 gap-x-4 gap-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 text-[14px]">
                                First name
                            </Label>
                            <Input
                                type="text"
                                value={studentInfo.firstName}
                                readOnly
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 text-[14px]">
                                Last name
                            </Label>
                            <Input
                                type="text"
                                value={studentInfo.lastName}
                                readOnly
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 text-[14px]">Email</Label>
                            <Input
                                type="text"
                                value={studentInfo.email}
                                readOnly
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 text-[14px]">
                                Phone number
                            </Label>
                            <Input
                                type="text"
                                value={studentInfo.phoneNumber}
                                readOnly
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 text-[14px]">
                                identity card
                            </Label>
                            <Input
                                type="text"
                                value={studentInfo.identityCard}
                                readOnly
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 flex flex-row items-center text-[14px]">
                                Gender
                                <span className="ml-1 text-slate-400">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                </span>
                            </Label>
                            <Input
                                type="text"
                                value={studentInfo.gender}
                                readOnly
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 flex flex-row items-center text-[14px]">
                                Birthday{" "}
                                <span className="ml-1 text-slate-400">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                </span>
                            </Label>
                            <Input
                                type="text"
                                value={studentInfo.birthday}
                                readOnly
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 text-[14px]">Role</Label>
                            <Input
                                type="text"
                                value={studentInfo.role}
                                readOnly
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 text-[14px]">
                                Discount{" "}
                                <span className="text-slate-400">(%)</span>
                            </Label>
                            <Input
                                type="text"
                                defaultValue={discountRef.current}
                                readOnly
                                className="pr-[68px]"
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 flex flex-row items-center text-[14px]">
                                Create date
                                <span className="ml-1 text-slate-400">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                </span>
                            </Label>
                            <Input
                                type="text"
                                value={studentInfo.createDate}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="pl-4 gap-y-5">
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 flex flex-row items-center text-[14px]">
                                Parents
                            </Label>
                            <div className="flex gap-x-4">
                                <Select
                                    value={selectedParent?.id ?? ""}
                                    onValueChange={(value) =>
                                        setSelectedParent(
                                            dummyData.find(
                                                (parent) => parent.id === value
                                            ) || null
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select parent(s)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {dummyData.map((parent) => {
                                                return (
                                                    <SelectItem
                                                        key={parent.id}
                                                        value={parent.id}
                                                    >
                                                        {parent.fullName}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleAddParent}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                        <Card className="mt-5">
                            <ScrollArea className="h-[320px]">
                                <CardContent className="p-3">
                                    <pre>
                                        {JSON.stringify(
                                            selectedParents,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </CardContent>
                            </ScrollArea>
                        </Card>
                    </div>
                </div>
            </TabsContent>
            {isUpdating && <LoadingUpdate />}
        </>
    );
};

export default StudentInformationTab;
