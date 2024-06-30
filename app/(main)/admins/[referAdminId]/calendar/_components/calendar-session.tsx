import React, {ReactElement} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SessionModel} from "./calendar";
import {format, parseISO} from "date-fns";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

interface SessionProps {
    session: SessionModel;
}

function CalendarSession({session}: SessionProps): ReactElement {
    const startDateTime = parseISO(session.startDateTime);
    const endDateTime = parseISO(session.endDateTime);

    return (
        <li className="flex flex-row items-center mb-2 px-4 py-2 space-x-4 hover:dark:text-black rounded-lg focus-within:dark:bg-gray-300 hover:dark:bg-gray-300 focus-within:bg-zinc-200 hover:bg-zinc-200">
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Avatar>
                        <AvatarImage src={session.avatar} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    Thích để gì thì để vào đây, ví dụ
                    <br />
                    Họ tên: Nguyễn Minh Đức <br />
                    Mã GV: 12313213131321231321 <br />
                    Ngày sinh: 2131321321 <br />
                    Giới tính: Nam
                </HoverCardContent>
            </HoverCard>
            <div className="flex-auto ">
                <p className="font-medium">
                    {session.teacher +
                        " - " +
                        session.className +
                        " - " +
                        session.classYear}
                </p>
                <p className="mt-0.5 font-normal">
                    <time dateTime={session.startDateTime}>
                        {format(startDateTime, "h:mm a")}
                    </time>{" "}
                    -{" "}
                    <time dateTime={session.endDateTime}>
                        {format(endDateTime, "h:mm a")}
                    </time>
                </p>
            </div>
        </li>
    );
}

export default CalendarSession;
