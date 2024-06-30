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

const formatData = (
    data: OutputType | undefined
): {
    sessionCalendarData: SessionCalendarData[];
    minYear: number;
    maxYear: number;
} => {
    if (!data)
        return {
            sessionCalendarData: [],
            minYear: new Date().getFullYear(),
            maxYear: new Date().getFullYear(),
        };
    const sessions: SessionCalendarData[] = [];
    let minYear: number = data[0].actualStartTime
        ? new Date(data[0].actualStartTime).getFullYear()
        : new Date(data[0].estimatedStartTime).getFullYear();
    let maxYear: number = data[0].actualStartTime
        ? new Date(data[0].actualStartTime).getFullYear()
        : new Date(data[0].estimatedStartTime).getFullYear();
    data.forEach((element) => {
        if (!element.class.closedAt) {
            const elementYear: number = element.actualStartTime
                ? new Date(element.actualStartTime).getFullYear()
                : new Date(element.estimatedStartTime).getFullYear();
            if (elementYear < minYear) minYear = elementYear;
            if (elementYear > maxYear) maxYear = elementYear;

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
        }
    });
    return {
        sessionCalendarData: sessions,
        minYear: minYear,
        maxYear: maxYear,
    };
};

export default function Calendar() {
    const [sessions, setSessions] = useState<SessionCalendarData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [minYear, setMinYear] = useState(new Date().getFullYear());
    const [maxYear, setMaxYear] = useState(new Date().getFullYear());

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
                toast({
                    title: "success",
                    variant: "success",
                    description: "Get calendar succeed",
                });
                const dataFormat: {
                    sessionCalendarData: SessionCalendarData[];
                    minYear: number;
                    maxYear: number;
                } = formatData(data);
                setMinYear(dataFormat.minYear);
                setMaxYear(dataFormat.maxYear);
                setSessions(dataFormat.sessionCalendarData);
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
    const [currentMonth] = useState(format(today, "MMM-yyyy"));

    const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState<Date>(
        parse(currentMonth, "MMM-yyyy", new Date())
    );

    const days: Date[] = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

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
                            selectedDay={selectedDay}
                            sessions={sessions}
                            setSelectedDay={setSelectedDay}
                            setFirstDayCurrentMonth={setFirstDayCurrentMonth}
                            minYear={minYear}
                            maxYear={maxYear}
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
