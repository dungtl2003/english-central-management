// import React, {ReactElement, SetStateAction} from "react";
// import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
// import {
//     format,
//     getDay,
//     isEqual,
//     isSameDay,
//     isSameMonth,
//     isToday,
//     parseISO,
// } from "date-fns";
// import {CardHeader, CardTitle} from "@/components/ui/card";
// import {Button} from "@/components/ui/button";
// import {SessionCalendarData} from "./types";

// interface CalendarTabLeftProps {
//     firstDayCurrentMonth: Date;
//     previousMonth: () => void;
//     nextMonth: () => void;
//     days: Date[];
//     setSelectedDay: (value: SetStateAction<Date>) => void;
//     sessions: SessionCalendarData[];
//     selectedDay: Date;
// }

// function classNames(...classes: string[]) {
//     return classes.filter(Boolean).join(" ");
// }

// const colStartClasses = [
//     "",
//     "col-start-2",
//     "col-start-3",
//     "col-start-4",
//     "col-start-5",
//     "col-start-6",
//     "col-start-7",
// ];

// const CalendarTabLeft = ({
//     previousMonth,
//     nextMonth,
//     setSelectedDay,
//     sessions,
//     days,
//     firstDayCurrentMonth,
//     selectedDay,
// }: CalendarTabLeftProps): ReactElement => {
//     return (
//         <CardHeader className="col-span-8">
//             <div className="flex items-center pb-2.5">
//                 <CardTitle className="flex-auto">
//                     {format(firstDayCurrentMonth, "MMMM yyyy")}
//                 </CardTitle>
//                 <div className="grid grid-cols-2 gap-x-1">
//                     <Button variant="ghost" onClick={previousMonth}>
//                         <ChevronLeftIcon className="w-5 h-5" />
//                     </Button>
//                     <Button variant="ghost" onClick={nextMonth} type="button">
//                         <ChevronRightIcon className="w-5 h-5" />
//                     </Button>
//                 </div>
//             </div>
//             <div className="grid grid-cols-7 text-sm text-center">
//                 <div>S</div>
//                 <div>M</div>
//                 <div>T</div>
//                 <div>W</div>
//                 <div>T</div>
//                 <div>F</div>
//                 <div>S</div>
//             </div>
//             <div className="grid grid-cols-7 mt-2 text-sm">
//                 {days.map((day, dayIdx) => (
//                     <div
//                         key={day.toString()}
//                         className={classNames(
//                             dayIdx === 0 ? colStartClasses[getDay(day)] : "",
//                             "py-1.5"
//                         )}
//                     >
//                         <Button
//                             variant="ghost"
//                             type="button"
//                             onClick={() => setSelectedDay(day)}
//                             className={classNames(
//                                 isEqual(day, selectedDay)
//                                     ? "text-white hover:dark:text-white hover:bg-gray-400"
//                                     : "",
//                                 !isEqual(day, selectedDay) && isToday(day)
//                                     ? "text-lightCyan"
//                                     : "",
//                                 !isEqual(day, selectedDay) &&
//                                     !isToday(day) &&
//                                     isSameMonth(day, firstDayCurrentMonth)
//                                     ? "dark:text-slate-400 text-slate-600"
//                                     : "",
//                                 !isEqual(day, selectedDay) &&
//                                     !isToday(day) &&
//                                     !isSameMonth(day, firstDayCurrentMonth)
//                                     ? "text-gray-400"
//                                     : "",
//                                 isEqual(day, selectedDay) && isToday(day)
//                                     ? "bg-darkCyan"
//                                     : "",
//                                 isEqual(day, selectedDay) && !isToday(day)
//                                     ? "dark:bg-gray-600 bg-gray-500"
//                                     : "",
//                                 !isEqual(day, selectedDay)
//                                     ? "hover:dark:bg-gray-600 hover:bg-gray-400"
//                                     : "",
//                                 isEqual(day, selectedDay) || isToday(day)
//                                     ? "font-semibold"
//                                     : "",
//                                 "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
//                             )}
//                         >
//                             <time dateTime={format(day, "yyyy-MM-dd")}>
//                                 {format(day, "d")}
//                             </time>
//                         </Button>
//                         <div className="w-1 h-1 mx-auto mt-1">
//                             {sessions.some((session) =>
//                                 isSameDay(parseISO(session.startDateTime), day)
//                             ) && (
//                                 <div className="w-1 h-1 rounded-full bg-lightCyan"></div>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </CardHeader>
//     );
// };

// export default CalendarTabLeft;

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
    parse,
    endOfMonth,
    eachDayOfInterval,
} from "date-fns";
import {CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {SessionModel} from "./calendar";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

interface CalendarTabLeftProps {
    firstDayCurrentMonth: Date;
    previousMonth: () => void;
    nextMonth: () => void;
    days: Date[];
    setDays: (days: Date[]) => void;
    setSelectedDay: (value: SetStateAction<Date>) => void;
    setFirstDayCurrentMonth: (value: SetStateAction<Date>) => void;
    setCustomMonth: (value: SetStateAction<string>) => void;
    setCustomYear: (value: SetStateAction<string>) => void;
    sessions: SessionModel[];
    selectedDay: Date;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const colStartClasses: string[] = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
];

const months: {fullLabel: string; label: string; value: string}[] = [
    {fullLabel: "January", label: "Jan", value: "01"},
    {fullLabel: "February", label: "Feb", value: "02"},
    {fullLabel: "March", label: "Mar", value: "03"},
    {fullLabel: "April", label: "Apr", value: "04"},
    {fullLabel: "May", label: "May", value: "05"},
    {fullLabel: "June", label: "Jun", value: "06"},
    {fullLabel: "July", label: "Jul", value: "07"},
    {fullLabel: "August", label: "Aug", value: "08"},
    {fullLabel: "September", label: "Sep", value: "09"},
    {fullLabel: "October", label: "Oct", value: "10"},
    {fullLabel: "November", label: "Nov", value: "11"},
    {fullLabel: "December", label: "Dec", value: "12"},
];

const years: string[] = [
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
];

const CalendarTabLeft = ({
    previousMonth,
    nextMonth,
    setSelectedDay,
    setFirstDayCurrentMonth,
    setCustomMonth,
    setCustomYear,
    setDays,
    sessions,
    days,
    firstDayCurrentMonth,
    selectedDay,
}: CalendarTabLeftProps): ReactElement => {
    const currentMonth = format(firstDayCurrentMonth, "MM");
    const currentYear = format(firstDayCurrentMonth, "yyyy");

    const [monthOpen, setMonthOpen] = React.useState(false);
    const [customMonth, setCustomMonthState] = React.useState(currentMonth);

    const [yearOpen, setYearOpen] = React.useState(false);
    const [customYear, setCustomYearState] = React.useState(currentYear);

    const handleMonthChange = (newMonth: string) => {
        setCustomMonth(newMonth);
        const newDate = parse(
            `${customYear}-${newMonth}-01`,
            "yyyy-MM-dd",
            new Date()
        );
        setFirstDayCurrentMonth(newDate);
        const newDays = eachDayOfInterval({
            start: newDate,
            end: endOfMonth(newDate),
        });
        setDays(newDays);
    };

    const handleYearChange = (newYear: string) => {
        setCustomYear(newYear);
        const newDate = parse(
            `${newYear}-${customMonth}-01`,
            "yyyy-MM-dd",
            new Date()
        );
        setFirstDayCurrentMonth(newDate);
        const newDays = eachDayOfInterval({
            start: newDate,
            end: endOfMonth(newDate),
        });
        setDays(newDays);
    };

    React.useEffect(() => {
        setCustomMonthState(currentMonth);
        setCustomYearState(currentYear);
    }, [firstDayCurrentMonth]);

    return (
        <CardHeader className="col-span-8">
            <div className="flex items-center pb-2.5">
                <CardTitle className="flex-auto">
                    <div className="flex flex-row items-center gap-x-3">
                        <Popover open={monthOpen} onOpenChange={setMonthOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={monthOpen}
                                    className="w-fit justify-between"
                                >
                                    {customMonth
                                        ? months.find(
                                              (month) =>
                                                  month.value === customMonth
                                          )?.label
                                        : "Select month"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[150px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search month" />
                                    <CommandList>
                                        <CommandEmpty>
                                            No month found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {months.map((month) => (
                                                <CommandItem
                                                    key={month.value}
                                                    value={month.value}
                                                    onSelect={(
                                                        currentValue: string
                                                    ) => {
                                                        handleMonthChange(
                                                            currentValue
                                                        );
                                                        setMonthOpen(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            customMonth ===
                                                                month.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {month.fullLabel}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <Popover open={yearOpen} onOpenChange={setYearOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={yearOpen}
                                    className="w-fit justify-between"
                                >
                                    {customYear ? customYear : "Select year"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[150px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search year" />
                                    <CommandList>
                                        <CommandEmpty>
                                            No year found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {years.map((year) => (
                                                <CommandItem
                                                    key={year}
                                                    value={year}
                                                    onSelect={(
                                                        currentValue: string
                                                    ) => {
                                                        handleYearChange(
                                                            currentValue
                                                        );
                                                        setYearOpen(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            customYear === year
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {year}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
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
