import React, {ReactElement} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {format, parseISO} from "date-fns";
import {SessionCalendarData} from "./types";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

function CalendarSession({
    session,
}: {
    session: SessionCalendarData;
}): ReactElement {
    const startDateTime = parseISO(session.startDateTime);
    const endDateTime = parseISO(session.endDateTime);

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <li className="flex flex-row items-center mb-2 px-4 py-2 space-x-4 hover:dark:text-black rounded-lg focus-within:dark:bg-gray-300 hover:dark:bg-gray-300 focus-within:bg-zinc-200 hover:bg-zinc-200">
                    <Avatar>
                        <AvatarImage src={session.avatar} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
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
            </HoverCardTrigger>
            <HoverCardContent className="w-100">
                TeacherId: {session.teacherId} <br />
                Full name: {session.teacher || "___ ___"} <br />
                Birthday: {session.birthday || "___/___/___"} <br />
                Gender: {session.gender || "___"} <br />
                Class: {session.className} - Year: {session.classYear} <br />
                Start: {format(startDateTime, "h:mm a")} <br />
                End: {format(endDateTime, "h:mm a")} <br />
            </HoverCardContent>
        </HoverCard>
    );
}

export default CalendarSession;
