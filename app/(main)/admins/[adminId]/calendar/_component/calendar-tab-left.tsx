import React, {ReactElement, SetStateAction} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parseISO,
} from "date-fns";
import {CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {SessionModel} from "./calendar";

interface CalendarTabLeftProps {
    firstDayCurrentMonth: Date;
    previousMonth: () => void;
    nextMonth: () => void;
    days: Date[];
    setSelectedDay: (value: SetStateAction<Date>) => void;
    sessions: SessionModel[];
    selectedDay: Date;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
];

const CalendarTabLeft = ({
    previousMonth,
    nextMonth,
    setSelectedDay,
    sessions,
    days,
    firstDayCurrentMonth,
    selectedDay,
}: CalendarTabLeftProps): ReactElement => {
    return (
        <CardHeader className="col-span-8">
            <div className="flex items-center pb-2.5">
                <CardTitle className="flex-auto">
                    {format(firstDayCurrentMonth, "MMMM yyyy")}
                </CardTitle>
                <div className="grid grid-cols-2 gap-x-1">
                    <Button variant="ghost" onClick={previousMonth}>
                        <ChevronLeftIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" onClick={nextMonth} type="button">
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
                            dayIdx === 0 ? colStartClasses[getDay(day)] : "",
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
                                !isEqual(day, selectedDay) && isToday(day)
                                    ? "text-lightCyan"
                                    : "",
                                !isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                    isSameMonth(day, firstDayCurrentMonth)
                                    ? "dark:text-slate-400 text-slate-600"
                                    : "",
                                !isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                    !isSameMonth(day, firstDayCurrentMonth)
                                    ? "text-gray-400"
                                    : "",
                                isEqual(day, selectedDay) && isToday(day)
                                    ? "bg-darkCyan"
                                    : "",
                                isEqual(day, selectedDay) && !isToday(day)
                                    ? "dark:bg-gray-600 bg-gray-500"
                                    : "",
                                !isEqual(day, selectedDay)
                                    ? "hover:dark:bg-gray-600 hover:bg-gray-400"
                                    : "",
                                isEqual(day, selectedDay) || isToday(day)
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
                                isSameDay(parseISO(session.startDateTime), day)
                            ) && (
                                <div className="w-1 h-1 rounded-full bg-lightCyan"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </CardHeader>
    );
};

export default CalendarTabLeft;
