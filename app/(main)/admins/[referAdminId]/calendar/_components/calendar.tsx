import {Separator} from "@/components/ui/separator";
import {Card, CardContent} from "@/components/ui/card";
import {useCallback, useEffect, useMemo, useState} from "react";
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
    // setMonth,
    // setYear,
    startOfToday,
} from "date-fns";
import {handler} from "@/lib/action/admin/get-sessions";
import {SessionCalendarData} from "./types";
import {OutputType} from "@/lib/action/admin/get-sessions/types";
import {SkeletonCalendar} from "./skeleton-calendar";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {toast} from "@/components/ui/use-toast";
import {concatName} from "@/lib/utils";

const defaultImageUrl = "https://www.gravatar.com/avatar?d=mp";

const formatData = (data: OutputType | undefined): SessionCalendarData[] => {
    if (!data) return [];
    const sessions: SessionCalendarData[] = [];
    data.forEach((element) => {
        const session: SessionCalendarData = {
            id: element.id,
            teacherId: element.class.teacherId,
            teacher: concatName(
                element.class.teacher.user.firstName,
                element.class.teacher.user.lastName,
                true
            ),
            birthday: element.class.teacher.user.birthday
                ? format(element.class.teacher.user.birthday, "dd/MM/yyyy")
                : "",
            gender: element.class.teacher.user.gender as string,
            className: element.class.unit.grade + "." + element.class.index,
            classYear: element.class.unit.year + "",
            avatar: element.class.teacher.user.imageUrl
                ? (element.class.teacher.user.imageUrl as string)
                : defaultImageUrl,
            startDateTime: element.actualStartTime
                ? element.actualStartTime.toString()
                : element.estimatedStartTime.toString(),
            endDateTime: element.actualStartTime
                ? add(element.actualStartTime, {
                      hours: element.class.unit.studyHour,
                      minutes: element.class.unit.studyMinute,
                      seconds: element.class.unit.studySecond,
                  }).toISOString()
                : add(element.estimatedStartTime, {
                      hours: element.class.unit.studyHour,
                      minutes: element.class.unit.studyMinute,
                      seconds: element.class.unit.studySecond,
                  }).toISOString(),
        };
        sessions.push(session);
    });
    return sessions;
};

export default function Calendar() {
    const [sessions, setSessions] = useState<SessionCalendarData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSessions = useCallback(handler, []);
    const event: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.log("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Get calendar failed",
                });
                setIsLoading(false);
            },
            onSuccess: (data: OutputType) => {
                setSessions(formatData(data));
                toast({
                    title: "success",
                    variant: "success",
                    description: "Get calendar succeed",
                });

                setIsLoading(false);
            },
        };
    }, []);

    const {execute} = useAction<void, OutputType>(fetchSessions, event);
    useEffect(() => {
        execute();
    }, [execute]);

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

    // function selectedMonth (selectedMonth:number) {
    //     const firstDaySelectedMonth:Date = setMonth(firstDayCurrentMonth,selectedMonth-1);
    //     setCurrentMonth(format(firstDaySelectedMonth, "MMM-yyyy"))
    // }

    // function selectedYear (selectedYear:number) {
    //     const firstDaySelectedYear:Date = setYear(firstDayCurrentMonth,selectedYear);
    //     setCurrentMonth(format(firstDaySelectedYear, "MMM-yyyy"))
    // }

    const selectedDaySessions = sessions.filter((session): boolean =>
        isSameDay(parseISO(session.startDateTime), selectedDay)
    );

    return (
        <>
            {isLoading && <SkeletonCalendar />}
            {!isLoading && (
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
            )}
        </>
    );
}
