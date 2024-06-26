"use client";

import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {ReactElement} from "react";
import TabOverview from "./_components/tab-overview";
import TabClassList from "./_components/tab-class-list";
import TabAttendanceHistory from "./_components/tab-attendance";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {FaCopy} from "react-icons/fa";
import {FaCheck} from "react-icons/fa";
import TabWaitingList from "./_components/tab-waiting-list";

// Đoạn này mô tả ý tưởng về việc copy vào clipboard
const teacherId: string = "0123456789123456789132456789";

function shortenString(input: string): string {
    const shortened = `${input.slice(0, 18)}.....`;
    return shortened;
}

const ClassDetailPage = (): ReactElement => {
    const [icon, setIcon] = React.useState<ReactElement>(<FaCopy />);

    const copyToClipboard = (teacherId: string) => {
        navigator.clipboard.writeText(teacherId);
    };

    const handleCopyClick = () => {
        copyToClipboard(teacherId);
        setIcon(<FaCheck color="green" />);
        setTimeout(() => setIcon(<FaCopy />), 1000);
    };

    return (
        <div className="flex justify-center">
            <div className="w-[80%] pt-[80px]">
                <div className="flex flex-row items-center">
                    <span className="text-4xl font-semibold">Class Detail</span>
                    <div className="flex flex-row items-center ml-auto gap-x-2">
                        <HoverCard openDelay={300}>
                            <HoverCardTrigger asChild>
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="p-0 flex gap-x-4 px-2 py-1"
                                >
                                    <Avatar className="max-w-[30px] max-h-[30px]">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    Nguyễn Minh Đức
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-fit p-2 pr-0 text-sm">
                                ID: {shortenString(teacherId)}{" "}
                                <Button
                                    variant="icon"
                                    size="icon"
                                    onClick={() => handleCopyClick()}
                                >
                                    {icon}
                                </Button>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
                <Tabs defaultValue="overview" className="mt-[15px] w-full">
                    <TabsList className="inline-flex h-10 items-center justify-center  dark:bg-slate-800 bg-slate-100">
                        <TabsTrigger
                            className="text-sm inline-flex items-center justify-center dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 data-[state=active]:bg-white data-[state=active]:text-slate-950"
                            value="overview"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            className="text-sm inline-flex items-center justify-center dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 data-[state=active]:bg-white data-[state=active]:text-slate-950"
                            value="classList"
                        >
                            Class list
                        </TabsTrigger>
                        <TabsTrigger
                            className="text-sm inline-flex items-center justify-center dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 data-[state=active]:bg-white data-[state=active]:text-slate-950"
                            value="attendanceHistory"
                        >
                            Attendance
                        </TabsTrigger>
                        <TabsTrigger
                            className="text-sm inline-flex items-center justify-center dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 data-[state=active]:bg-white data-[state=active]:text-slate-950"
                            value="waitingList"
                        >
                            Waiting list
                        </TabsTrigger>
                    </TabsList>
                    <TabOverview />
                    <TabClassList />
                    <TabAttendanceHistory />
                    <TabWaitingList />
                </Tabs>
            </div>
        </div>
    );
};

export default ClassDetailPage;
