import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ScrollArea} from "@/components/ui/scroll-area";

type SessionModel = {
    id: number;
    teacher: string;
    className: string;
    classYear: string;
    avatar: string;
    startDateTime: string;
    endDateTime: string;
};

const sessions: SessionModel[] = [
    {
        id: 1,
        teacher: "Nguyễn Minh Đức",
        className: "3.1",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T07:00",
        endDateTime: "2024-06-01T09:00",
    },
    {
        id: 2,
        teacher: "Trần Lưu Dũng",
        className: "3.2",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T14:00",
        endDateTime: "2024-06-01T16:00",
    },
    {
        id: 3,
        teacher: "Nguyễn Hữu Nhật Quang",
        className: "3.3",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T19:00",
        endDateTime: "2024-06-01T21:00",
    },
    {
        id: 4,
        teacher: "Nguyễn Minh Đức",
        className: "3.1",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T07:00",
        endDateTime: "2024-06-01T09:00",
    },
    {
        id: 5,
        teacher: "Trần Lưu Dũng",
        className: "3.2",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T14:00",
        endDateTime: "2024-06-01T16:00",
    },
    {
        id: 6,
        teacher: "Nguyễn Hữu Nhật Quang",
        className: "3.3",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T19:00",
        endDateTime: "2024-06-01T21:00",
    },
    {
        id: 7,
        teacher: "Nguyễn Minh Đức",
        className: "3.1",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T07:00",
        endDateTime: "2024-06-01T09:00",
    },
    {
        id: 8,
        teacher: "Trần Lưu Dũng",
        className: "3.2",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T14:00",
        endDateTime: "2024-06-01T16:00",
    },
    {
        id: 9,
        teacher: "Nguyễn Hữu Nhật Quang",
        className: "3.3",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T19:00",
        endDateTime: "2024-06-01T21:00",
    },
    {
        id: 10,
        teacher: "Nguyễn Minh Đức",
        className: "3.1",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T07:00",
        endDateTime: "2024-06-01T09:00",
    },
    {
        id: 11,
        teacher: "Trần Lưu Dũng",
        className: "3.2",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T14:00",
        endDateTime: "2024-06-01T16:00",
    },
    {
        id: 12,
        teacher: "Nguyễn Hữu Nhật Quang",
        className: "3.3",
        classYear: "2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDateTime: "2024-06-01T19:00",
        endDateTime: "2024-06-01T21:00",
    },
];

const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Calendar() {
    const today: Date = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    const firstDayCurrentMonth: Date = parse(
        currentMonth,
        "MMM-yyyy",
        new Date()
    );

    const days: Date[] = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    function previousMonth() {
        const firstDayNextMonth: Date = add(firstDayCurrentMonth, {months: -1});
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    }

    function nextMonth() {
        const firstDayNextMonth: Date = add(firstDayCurrentMonth, {months: 1});
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    }

    const selectedDaySessions = sessions.filter((session): boolean =>
        isSameDay(parseISO(session.startDateTime), selectedDay)
    );

    return (
        <Card className="min-w-[70%] min-h-[430px]">
            <CardContent className="grid grid-cols-20">
                <CardHeader className="col-span-8">
                    <div className="flex items-center pb-2.5">
                        <CardTitle className="flex-auto">
                            {format(firstDayCurrentMonth, "MMMM yyyy")}
                        </CardTitle>
                        <div className="grid grid-cols-2 gap-x-1">
                            <Button variant="ghost" onClick={previousMonth}>
                                <ChevronLeftIcon className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={nextMonth}
                                type="button"
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 text-sm text-center">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div className="grid grid-cols-7 mt-2 text-sm">
                        {days.map((day, dayIdx) => (
                            <div
                                key={day.toString()}
                                className={classNames(
                                    dayIdx === 0
                                        ? colStartClasses[getDay(day)]
                                        : "",
                                    "py-1.5"
                                )}
                            >
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={() => setSelectedDay(day)}
                                    className={classNames(
                                        isEqual(day, selectedDay)
                                            ? "text-white hover:dark:text-white hover:bg-gray-400"
                                            : "",
                                        !isEqual(day, selectedDay) &&
                                            isToday(day)
                                            ? "text-lightCyan"
                                            : "",
                                        !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            isSameMonth(
                                                day,
                                                firstDayCurrentMonth
                                            )
                                            ? "dark:text-slate-400 text-slate-600"
                                            : "",
                                        !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            !isSameMonth(
                                                day,
                                                firstDayCurrentMonth
                                            )
                                            ? "text-gray-400"
                                            : "",
                                        isEqual(day, selectedDay) &&
                                            isToday(day)
                                            ? "bg-darkCyan"
                                            : "",
                                        isEqual(day, selectedDay) &&
                                            !isToday(day)
                                            ? "dark:bg-gray-600 bg-gray-500"
                                            : "",
                                        !isEqual(day, selectedDay)
                                            ? "hover:dark:bg-gray-600 hover:bg-gray-400"
                                            : "",
                                        isEqual(day, selectedDay) ||
                                            isToday(day)
                                            ? "font-semibold"
                                            : "",
                                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                                    )}
                                >
                                    <time dateTime={format(day, "yyyy-MM-dd")}>
                                        {format(day, "d")}
                                    </time>
                                </Button>
                                <div className="w-1 h-1 mx-auto mt-1">
                                    {sessions.some((session) =>
                                        isSameDay(
                                            parseISO(session.startDateTime),
                                            day
                                        )
                                    ) && (
                                        <div className="w-1 h-1 rounded-full bg-lightCyan"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardHeader>
                <div className="col-span-1 min-h-[430px] flex justify-center">
                    <Separator orientation="vertical" />
                </div>
                <CardHeader className="col-span-11">
                    <section className="mt-12 md:mt-0">
                        <div className="flex items-center h-[40px]">
                            <CardTitle>
                                Sessions on{" "}
                                <time
                                    dateTime={format(selectedDay, "yyyy-MM-dd")}
                                >
                                    {format(selectedDay, "MM/dd/yyyy")}
                                </time>
                            </CardTitle>
                        </div>
                        <ScrollArea className="mt-4 space-y-1 h-[340px] text-sm leading-6">
                            {selectedDaySessions.length > 0 ? (
                                selectedDaySessions.map((session) => (
                                    <Session
                                        session={session}
                                        key={session.id}
                                    />
                                ))
                            ) : (
                                <CardDescription>
                                    No meetings for today.
                                </CardDescription>
                            )}
                        </ScrollArea>
                    </section>
                </CardHeader>
            </CardContent>
        </Card>
    );
}

interface SessionProps {
    session: SessionModel;
}

function Session({session}: SessionProps) {
    const startDateTime = parseISO(session.startDateTime);
    const endDateTime = parseISO(session.endDateTime);

    return (
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
    );
}
