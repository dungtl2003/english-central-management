// import {Separator} from "@/components/ui/separator";
// import {Card, CardContent} from "@/components/ui/card";
// import {useCallback, useEffect, useMemo, useState} from "react";
// import CalendarTabLeft from "./calendar-tab-left";
// import CalendarTabRight from "./calendar-tab-right";
// import {
//     add,
//     eachDayOfInterval,
//     endOfMonth,
//     format,
//     isSameDay,
//     parse,
//     parseISO,
//     startOfToday,
// } from "date-fns";
// import {handler} from "@/lib/action/admin/get-sessions";
// import {SessionCalendarData} from "./types";
// import {OutputType} from "@/lib/action/admin/get-sessions/types";
// import {SkeletonCalendar} from "./skeleton-calendar";
// import {UseActionOptions, useAction} from "@/hooks/use-action";
// import {toast} from "@/components/ui/use-toast";

// const defaultImageUrl = "https://www.gravatar.com/avatar?d=mp";

// const formatData = (data: OutputType | undefined): SessionCalendarData[] => {
//     if (!data) return [];
//     const sessions: SessionCalendarData[] = [];
//     data.forEach((e) => console.log(e.class.teacher));
//     data.forEach((element) => {
//         const session: SessionCalendarData = {
//             id: element.id,
//             teacherId: element.class.teacherId,
//             teacher:
//                 element.class.teacher.user.lastName +
//                 " " +
//                 element.class.teacher.user.firstName,
//             birthday: element.class.teacher.user.birthday
//                 ? format(element.class.teacher.user.birthday, "dd/MM/yyyy")
//                 : "",
//             gender: element.class.teacher.user.gender as string,
//             className: element.class.unit.grade + "." + element.class.index,
//             classYear: element.class.unit.year + "",
//             avatar: element.class.teacher.user.imageUrl
//                 ? (element.class.teacher.user.imageUrl as string)
//                 : defaultImageUrl,
//             startDateTime: element.actualStartTime
//                 ? element.actualStartTime.toString()
//                 : element.estimatedStartTime.toString(),
//             endDateTime: element.actualStartTime
//                 ? add(element.actualStartTime, {
//                       hours: element.class.unit.studyHour,
//                       minutes: element.class.unit.studyMinute,
//                       seconds: element.class.unit.studySecond,
//                   }).toISOString()
//                 : add(element.estimatedStartTime, {
//                       hours: element.class.unit.studyHour,
//                       minutes: element.class.unit.studyMinute,
//                       seconds: element.class.unit.studySecond,
//                   }).toISOString(),
//         };
//         sessions.push(session);
//     });
//     return sessions;
// };

// export default function Calendar() {
//     const [sessions, setSessions] = useState<SessionCalendarData[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const fetchSessions = useCallback(handler, []);
//     const event: UseActionOptions<OutputType> = useMemo(() => {
//         return {
//             onError: (error: string) => {
//                 console.log("Error: ", error);
//                 toast({
//                     title: "error",
//                     variant: "destructive",
//                     description: "Get calendar failed",
//                 });
//                 setIsLoading(false);
//             },
//             onSuccess: (data: OutputType) => {
//                 setSessions(formatData(data));
//                 console.log(formatData(data));
//                 toast({
//                     title: "success",
//                     variant: "success",
//                     description: "Get calendar succeed",
//                 });

//                 setIsLoading(false);
//             },
//         };
//     }, []);

//     const {execute} = useAction<void, OutputType>(fetchSessions, event);
//     useEffect(() => {
//         execute();
//     }, [execute]);

//     const today: Date = startOfToday();
//     const [selectedDay, setSelectedDay] = useState(today);
//     const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
//     const firstDayCurrentMonth: Date = parse(
//         currentMonth,
//         "MMM-yyyy",
//         new Date()
//     );

//     const days: Date[] = eachDayOfInterval({
//         start: firstDayCurrentMonth,
//         end: endOfMonth(firstDayCurrentMonth),
//     });

//     function previousMonth() {
//         const firstDayNextMonth: Date = add(firstDayCurrentMonth, {months: -1});
//         setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
//     }

//     function nextMonth() {
//         const firstDayNextMonth: Date = add(firstDayCurrentMonth, {months: 1});
//         setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
//     }

//     const selectedDaySessions = sessions.filter((session): boolean =>
//         isSameDay(parseISO(session.startDateTime), selectedDay)
//     );

//     return (
//         <>
//             {isLoading && <SkeletonCalendar />}
//             {!isLoading && (
//                 <Card className="min-w-[70%] min-h-[430px]">
//                     <CardContent className="grid grid-cols-20">
//                         <CalendarTabLeft
//                             days={days}
//                             firstDayCurrentMonth={firstDayCurrentMonth}
//                             nextMonth={nextMonth}
//                             previousMonth={previousMonth}
//                             selectedDay={selectedDay}
//                             sessions={sessions}
//                             setSelectedDay={setSelectedDay}
//                         />
//                         <div className="col-span-1 min-h-[430px] flex justify-center">
//                             <Separator orientation="vertical" />
//                         </div>
//                         <CalendarTabRight
//                             selectedDay={selectedDay}
//                             selectedDaySessions={selectedDaySessions}
//                         />
//                     </CardContent>
//                 </Card>
//             )}
//         </>
//     );
// }

// Đoạn trên là cái cũ

import {Separator} from "@/components/ui/separator";
import {Card, CardContent} from "@/components/ui/card";
import {useState} from "react";
import CalendarTabLeft from "./calendar-tab-left";
// import CalendarTabRight from "./calendar-tab-right"; // Cái này cần
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    // isSameDay, // Cái này cần
    parse,
    // parseISO, // Cái này cần
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
];

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

    // const selectedDaySessions = sessions.filter((session): boolean =>
    //     isSameDay(parseISO(session.startDateTime), selectedDay)
    // ); // Cái này cần

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
                {/* <CalendarTabRight
                    selectedDay={selectedDay}
                    selectedDaySessions={selectedDaySessions}
                /> // Cái này cần */}
            </CardContent>
        </Card>
    );
}
