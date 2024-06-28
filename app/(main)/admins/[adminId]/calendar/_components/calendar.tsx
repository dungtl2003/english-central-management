import {Separator} from "@/components/ui/separator";
import {Card, CardContent} from "@/components/ui/card";
import {useState} from "react";
import {CalendarDummyData} from "./calendar-dummy-data";
import CalendarTabLeft from "./calendar-tab-left";
import CalendarTabRight from "./calendar-tab-right";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    isSameDay,
    parse,
    parseISO,
    startOfToday,
} from "date-fns";

export type SessionModel = {
    id: number;
    teacher: string;
    className: string;
    classYear: string;
    avatar: string;
    startDateTime: string;
    endDateTime: string;
};

const sessions: SessionModel[] = CalendarDummyData;

export default function Calendar() {
    const today: Date = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState(
        parse(currentMonth, "MMM-yyyy", new Date())
    );
    const [, setCustomMonth] = useState(format(firstDayCurrentMonth, "MM"));
    const [, setCustomYear] = useState(format(firstDayCurrentMonth, "yyyy"));
    const [days, setDays] = useState(() =>
        eachDayOfInterval({
            start: firstDayCurrentMonth,
            end: endOfMonth(firstDayCurrentMonth),
        })
    );

    function previousMonth() {
        const firstDayNextMonth: Date = add(firstDayCurrentMonth, {months: -1});
        setFirstDayCurrentMonth(firstDayNextMonth);
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
        setCustomMonth(format(firstDayNextMonth, "MM"));
        setCustomYear(format(firstDayNextMonth, "yyyy"));
        setDays(
            eachDayOfInterval({
                start: firstDayNextMonth,
                end: endOfMonth(firstDayNextMonth),
            })
        );
    }

    function nextMonth() {
        const firstDayNextMonth: Date = add(firstDayCurrentMonth, {months: 1});
        setFirstDayCurrentMonth(firstDayNextMonth);
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
        setCustomMonth(format(firstDayNextMonth, "MM"));
        setCustomYear(format(firstDayNextMonth, "yyyy"));
        setDays(
            eachDayOfInterval({
                start: firstDayNextMonth,
                end: endOfMonth(firstDayNextMonth),
            })
        );
    }

    const selectedDaySessions = sessions.filter((session): boolean =>
        isSameDay(parseISO(session.startDateTime), selectedDay)
    );

    return (
        <Card className="min-w-[70%] min-h-[430px]">
            <CardContent className="grid grid-cols-20">
                <CalendarTabLeft
                    days={days}
                    firstDayCurrentMonth={firstDayCurrentMonth}
                    nextMonth={nextMonth}
                    previousMonth={previousMonth}
                    selectedDay={selectedDay}
                    sessions={sessions}
                    setSelectedDay={setSelectedDay}
                    setFirstDayCurrentMonth={setFirstDayCurrentMonth}
                    setDays={setDays}
                    setCustomMonth={setCustomMonth}
                    setCustomYear={setCustomYear}
                />
                <div className="col-span-1 min-h-[430px] flex justify-center">
                    <Separator orientation="vertical" />
                </div>
                <CalendarTabRight
                    selectedDay={selectedDay}
                    selectedDaySessions={selectedDaySessions}
                />
            </CardContent>
        </Card>
    );
}
