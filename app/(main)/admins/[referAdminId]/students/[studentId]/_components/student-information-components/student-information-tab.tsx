import React, {ReactElement, useEffect, useMemo, useRef, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {TabsContent} from "@/components/ui/tabs";
import {CalendarIcon} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {FaCopy} from "react-icons/fa";
import {FaCheck} from "react-icons/fa";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import {StudentInfoFormatData, ParentPreviewData} from "./types";
import {StudentInfoData} from "../types";
import {format} from "date-fns";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {
    InputType,
    OutputType,
} from "@/lib/action/admin/update-student-discount/types";
import {toast} from "@/components/ui/use-toast";
import {handler} from "@/lib/action/admin/update-student-discount";
import {LoadingUpdate} from "../loading-update-data";
import {concatName} from "@/lib/utils";
import Link from "next/link";
import {useUser} from "@clerk/nextjs";

const copyToClipboard = (teacherId: string) => {
    navigator.clipboard.writeText(teacherId);
};

type ButtonVariant =
    | "ghost"
    | "icon"
    | "link"
    | "default"
    | "destructive"
    | "success"
    | "outline"
    | "secondary"
    | "ghostSuccess"
    | "ghostMiddle"
    | "ghostDanger"
    | null
    | undefined;

const formatData = (
    studentInfoData: StudentInfoData | undefined,
    currentDiscount: number
): StudentInfoFormatData => {
    if (!studentInfoData)
        return {
            firstName: "___",
            lastName: "___",
            email: "___",
            phoneNumber: "___",
            identityCard: "___",
            birthday: "___/___/___",
            role: "___",
            discount: "0",
            createDate: "___/___/___",
            deleleDate: "___/___/___",
            parents: [],
        };
    const parents: ParentPreviewData[] = [];
    studentInfoData.parents.forEach((element) => {
        const parent: ParentPreviewData = {
            id: element.id,
            imgUrl: element.user.imageUrl || "https://github.com/shadcn.png",
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

    const studentInfo: StudentInfoFormatData = {
        firstName: studentInfoData?.user.firstName || "___",
        lastName: studentInfoData?.user.lastName || "___",
        email: studentInfoData?.user.email,
        phoneNumber: studentInfoData?.user.phoneNumber || "___",
        identityCard: studentInfoData?.user.identifyCard || "___",
        birthday: studentInfoData?.user.birthday
            ? format(studentInfoData?.user.birthday, "yyyy/MM/dd")
            : "___/___/___",
        role: studentInfoData?.user.role as string,
        discount: currentDiscount.toString(),
        createDate: studentInfoData?.user.createdAt
            ? format(studentInfoData?.user.createdAt, "yyyy/MM/dd")
            : "___/___/___",
        deleleDate: studentInfoData?.user.deletedAt
            ? format(studentInfoData?.user.deletedAt, "yyyy/MM/dd")
            : "___/___/___",
        parents: parents,
    };

    return studentInfo;
};

const StudentInformationTab = ({
    studentInfoData,
    currentDiscount,
    setCurrentDiscount,
}: {
    studentInfoData: StudentInfoData | undefined;
    currentDiscount: number;
    setCurrentDiscount: (v: number) => void;
}): ReactElement => {
    const [icon, setIcon] = React.useState<ReactElement>(<FaCopy />);
    const [editable, setEditable] = React.useState(false);
    const [btnTitle, setBtnTtile] = React.useState("Edit");
    const [btnVariant, setbtnVariant] =
        React.useState<ButtonVariant>("ghostMiddle");

    const handleCopyClick = (p: ParentPreviewData) => {
        copyToClipboard(p.id);
        setIcon(<FaCheck color="green" />);
        setTimeout(() => setIcon(<FaCopy />), 1000);
    };

    function shortenString(input: string): string {
        const shortened = `${input.slice(0, 18)}.....`;
        return shortened;
    }

    const [studentInfo, setStudentInfo] = useState<StudentInfoFormatData>(
        formatData(studentInfoData, currentDiscount)
    );

    useEffect(() => {
        setStudentInfo(formatData(studentInfoData, currentDiscount));
    }, [studentInfoData, currentDiscount]);

    const discountRef = useRef(currentDiscount);

    const eventUpdateDiscount: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.log("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Update discount failed",
                });
                setIsUpdating(false);
            },
            onSuccess: () => {
                toast({
                    title: "success",
                    variant: "success",
                    description: "Update discount succeed",
                });
                setIsUpdating(false);
                setCurrentDiscount(discountRef.current);
            },
        };
    }, [setCurrentDiscount]);
    const {execute} = useAction<InputType, OutputType>(
        handler,
        eventUpdateDiscount
    );

    const [isUpdating, setIsUpdating] = useState(false);

    function handleClickEdit() {
        if (!editable) {
            setBtnTtile("Save");
            setbtnVariant("ghostSuccess");
            setEditable(true);
        } else {
            const input = discountRef.current;
            if (
                currentDiscount != input &&
                0 <= Number(input) &&
                Number(input) <= 100
            ) {
                setIsUpdating(true);
                execute({
                    studentId: studentInfoData?.id as string,
                    discount: input,
                });
            } else if (currentDiscount != input) {
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Discount must be between 0 and 100",
                });
            }
            setBtnTtile("Edit");
            setbtnVariant("ghostMiddle");
            setEditable(false);
        }
    }

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

    const {user} = useUser();
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const [currentUrl, setCurrentUrl] = useState("");
    useEffect(() => {
        console.debug("......................");
        if (!user) return;
        setCurrentUrl(`${protocol}://${domain}/admins/${user!.id}`);
    }, [protocol, domain, user]);

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
                            <div className="relative">
                                <Button
                                    variant={btnVariant}
                                    className="min-w-[65px] absolute right-0"
                                    onClick={() => handleClickEdit()}
                                >
                                    {btnTitle}
                                </Button>
                                <Input
                                    type="text"
                                    defaultValue={discountRef.current}
                                    readOnly={!editable}
                                    className="pr-[68px]"
                                    onChange={(e) =>
                                        (discountRef.current = Number(
                                            e.target.value
                                        ))
                                    }
                                    onKeyDown={(e) => {
                                        if (/^[^0-9]*$/.test(e.key)) {
                                            if (allowedKeys.includes(e.key))
                                                return;
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
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
                        <div className="grid w-full items-center gap-1.5">
                            <Label className="pl-1 flex flex-row items-center text-[14px]">
                                Delete date
                                <span className="ml-1 text-slate-400">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                </span>
                            </Label>
                            <Input
                                type="text"
                                value={studentInfo.deleleDate}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="grid grid-rows-10">
                            <div className="text-lg flex items-center justify-center">
                                Parents
                            </div>
                            <Carousel className="row-span-9 w-full max-w-xs">
                                <CarouselContent>
                                    {studentInfo.parents.map((parent) => (
                                        <CarouselItem
                                            className=""
                                            key={parent.id}
                                        >
                                            <Card>
                                                <CardContent className="pt-3 px-4 aspect-square items-center justify-center ">
                                                    <div className="grid grid-cols-6">
                                                        <div className="col-span-1 flex items-center pl-1">
                                                            <Avatar className="max-h-8 max-w-8">
                                                                <AvatarImage
                                                                    src={
                                                                        parent.imgUrl
                                                                    }
                                                                />
                                                                <AvatarFallback>
                                                                    CN
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                        <div className="col-span-5">
                                                            <div className="flex items-center text-sm">
                                                                {
                                                                    parent.fullName
                                                                }
                                                            </div>
                                                            <div className="flex items-center text-xs text-slate-500">
                                                                ID:{" "}
                                                                {shortenString(
                                                                    parent.id
                                                                )}{" "}
                                                                <Button
                                                                    variant="icon"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        handleCopyClick(
                                                                            parent
                                                                        )
                                                                    }
                                                                >
                                                                    {icon}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="grid w-full items-center gap-1.5 pt-1 pb-1.5">
                                                        <Label className="pl-1 text-xs">
                                                            Email
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="max-h-8"
                                                            value={parent.email}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="grid w-full items-center gap-1.5 pb-1.5">
                                                        <Label className="pl-1 text-xs">
                                                            Phone number
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="max-h-8"
                                                            value={
                                                                parent.phoneNumber
                                                            }
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="grid w-full items-center gap-1.5 pb-1.5">
                                                        <Label className="pl-1 text-xs">
                                                            Identity card
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="max-h-8"
                                                            value={
                                                                parent.identityCard
                                                            }
                                                            readOnly
                                                        />
                                                    </div>
                                                    <Link
                                                        href={
                                                            currentUrl
                                                                ? currentUrl +
                                                                  "/parents/" +
                                                                  parent.id
                                                                : "/"
                                                        }
                                                        className="flex justify-center pt-2"
                                                    >
                                                        <Button className="max-h-9">
                                                            Detail{" "}
                                                            <span className="pl-1">
                                                                <FaArrowUpRightFromSquare
                                                                    size={13}
                                                                />
                                                            </span>
                                                        </Button>
                                                    </Link>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </TabsContent>
            {isUpdating && <LoadingUpdate />}
        </>
    );
};

export default StudentInformationTab;
