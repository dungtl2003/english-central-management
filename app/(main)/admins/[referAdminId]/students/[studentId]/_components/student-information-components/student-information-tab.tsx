import React, {ReactElement} from "react";
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

// Danh sách phụ huynh của học sinh
type parentPreviewModel = {
    imgUrl: string;
    fullName: string;
    id: string;
    email: string;
    phoneNumber: string;
    identityCard: string;
};

const testParentData: parentPreviewModel[] = [
    {
        imgUrl: "https://github.com/shadcn.png",
        fullName: "Phụ huynh 1",
        id: "ecda3ab8-9e62-451f-a5e9-307260cde548",
        email: "phuhuynh1@gmail.com",
        phoneNumber: "0123 456 789",
        identityCard: "0000 1111 2222",
    },
    {
        imgUrl: "https://github.com/shadcn.png",
        fullName: "Phụ huynh 2",
        id: "ecda3ab8-9e62-451f-a5e9-307260cde548   ",
        email: "phuhuynh2@gmail.com",
        phoneNumber: "0987 654 321",
        identityCard: "7777 8888 9999",
    },
];

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

const StudentInformationTab = (): ReactElement => {
    const [icon, setIcon] = React.useState<ReactElement>(<FaCopy />);
    const [editable, setEditable] = React.useState(false);
    const [btnTitle, setBtnTtile] = React.useState("Edit");
    const [btnVariant, setbtnVariant] =
        React.useState<ButtonVariant>("ghostMiddle");

    const handleCopyClick = (p: parentPreviewModel) => {
        copyToClipboard(p.id);
        setIcon(<FaCheck color="green" />);
        setTimeout(() => setIcon(<FaCopy />), 1000);
    };

    function shortenString(input: string): string {
        const shortened = `${input.slice(0, 18)}.....`;
        return shortened;
    }

    function handleClickEdit() {
        if (!editable) {
            setBtnTtile("Save");
            setbtnVariant("ghostSuccess");
            setEditable(true);
        } else {
            setBtnTtile("Edit");
            setbtnVariant("ghostMiddle");
            setEditable(false);
        }
    }

    return (
        <TabsContent value="studentInfo">
            <div className="pl-1 grid grid-cols-2">
                <div className="grid grid-cols-2 grid-rows-5 gap-x-4 gap-y-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">First name</Label>
                        <Input type="text" value={"Đức"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Last name</Label>
                        <Input type="text" value={"Nguyễn Minh"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Email</Label>
                        <Input type="text" value={"test@gmail.com"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Phone number</Label>
                        <Input type="text" value={"0123 456 789"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">
                            identity card
                        </Label>
                        <Input type="text" value={"0000 1111 2222"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 flex flex-row items-center text-[14px]">
                            Birthday{" "}
                            <span className="ml-1 text-slate-400">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                            </span>
                        </Label>
                        <Input type="text" value={"19/01/2003"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Role</Label>
                        <Input type="text" value={"Student"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">
                            Discount <span className="text-slate-400">($)</span>
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
                                defaultValue={"10%"}
                                readOnly={!editable}
                                className="pr-[68px]"
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
                        <Input type="text" value={"22/05/2023"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 flex flex-row items-center text-[14px]">
                            Accept date
                            <span className="ml-1 text-slate-400">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                            </span>
                        </Label>
                        <Input type="text" value={"22/05/2023"} readOnly />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="grid grid-rows-10">
                        <div className="text-lg flex items-center justify-center">
                            Parents
                        </div>
                        <Carousel className="row-span-9 w-full max-w-xs">
                            <CarouselContent>
                                {testParentData.map((parent) => (
                                    <CarouselItem className="" key={parent.id}>
                                        <Card>
                                            <CardContent className="pt-3 px-4 aspect-square items-center justify-center ">
                                                <div className="grid grid-cols-6">
                                                    <div className="col-span-1 flex items-center pl-1">
                                                        <Avatar className="max-h-8 max-w-8">
                                                            <AvatarImage src="https://github.com/shadcn.png" />
                                                            <AvatarFallback>
                                                                CN
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                    <div className="col-span-5">
                                                        <div className="flex items-center text-sm">
                                                            {parent.fullName}
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
                                                <div className="flex justify-center pt-2">
                                                    <Button className="max-h-9">
                                                        Detail{" "}
                                                        <span className="pl-1">
                                                            <FaArrowUpRightFromSquare
                                                                size={13}
                                                            />
                                                        </span>
                                                    </Button>
                                                </div>
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
    );
};

export default StudentInformationTab;
