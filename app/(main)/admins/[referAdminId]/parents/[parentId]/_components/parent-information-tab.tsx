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

// Danh sách học sinh của phụ huynh
type parentPreviewModel = {
    imgUrl: string;
    fullName: string;
    id: string;
    email: string;
    debt: string;
    phoneNumber: string;
};

const testChildrenData: parentPreviewModel[] = [
    {
        imgUrl: "https://github.com/shadcn.png",
        fullName: "Học sinh 1",
        id: "ecda3ab8-9e62-451f-a5e9-307260cde548",
        email: "hocsinh1@gmail.com",
        debt: "2,000$",
        phoneNumber: "0123 456 789",
    },
    {
        imgUrl: "https://github.com/shadcn.png",
        fullName: "Học sinh 2",
        id: "ecda3ab8-9e62-451f-a5e9-307260cde548   ",
        email: "hocsinh2@gmail.com",
        debt: "0$",
        phoneNumber: "0987 654 321",
    },
];

const copyToClipboard = (teacherId: string) => {
    navigator.clipboard.writeText(teacherId);
};

const ParentInformationTab = (): ReactElement => {
    const [icon, setIcon] = React.useState<ReactElement>(<FaCopy />);

    const handleCopyClick = (p: parentPreviewModel) => {
        copyToClipboard(p.id);
        setIcon(<FaCheck color="green" />);
        setTimeout(() => setIcon(<FaCopy />), 1000);
    };

    function shortenString(input: string): string {
        const shortened = `${input.slice(0, 18)}.....`;
        return shortened;
    }

    return (
        <TabsContent value="parentInfo">
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
                            Total debt
                        </Label>
                        <Input type="text" value={"2,000$"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Role</Label>
                        <Input type="text" value={"Student"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">
                            Children <span className="text-slate-400">($)</span>
                        </Label>
                        <Input type="text" value={"2"} readOnly />
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
                            Birthday{" "}
                            <span className="ml-1 text-slate-400">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                            </span>
                        </Label>
                        <Input type="text" value={"19/01/2003"} readOnly />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="grid grid-rows-10">
                        <div className="text-lg flex items-center justify-center">
                            Parents
                        </div>
                        <Carousel className="row-span-9 w-full max-w-xs">
                            <CarouselContent>
                                {testChildrenData.map((child) => (
                                    <CarouselItem className="" key={child.id}>
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
                                                            {child.fullName}
                                                        </div>
                                                        <div className="flex items-center text-xs text-slate-500">
                                                            ID:{" "}
                                                            {shortenString(
                                                                child.id
                                                            )}{" "}
                                                            <Button
                                                                variant="icon"
                                                                size="icon"
                                                                onClick={() =>
                                                                    handleCopyClick(
                                                                        child
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
                                                        value={child.email}
                                                        readOnly
                                                    />
                                                </div>

                                                <div className="grid w-full items-center gap-1.5 pb-1.5">
                                                    <Label className="pl-1 text-xs">
                                                        Debt
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="max-h-8"
                                                        value={child.debt}
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
                                                            child.phoneNumber
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

export default ParentInformationTab;
