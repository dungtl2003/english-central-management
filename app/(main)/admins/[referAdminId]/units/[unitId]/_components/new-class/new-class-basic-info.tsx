import React, {ReactElement} from "react";
import {Button} from "@/components/ui/button";
import {Controller, UseFormReturn} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {teacherDummyData} from "../unit-detail-dummy-data";
import {CalendarIcon} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format, isValid, parse} from "date-fns";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {FaCheck, FaCopy} from "react-icons/fa6";

interface NewClassBasicInfoProps {
    form: UseFormReturn<
        {
            unit: string;
            teacher: string;
            index: string;
            pricePerSession: string;
            maxSessions: string;
            maxStudents: string;
            studyTime: {
                hours: string;
                minutes: string;
                seconds: string;
            };
            startDate: string;
        },
        undefined
    >;
}

const NewClassBasicInfo = ({form}: NewClassBasicInfoProps): ReactElement => {
    const [icon, setIcon] = React.useState<ReactElement>(<FaCopy />);

    function shortenString(input: string): string {
        const shortened = `${input.slice(0, 18)}.....`;
        return shortened;
    }

    function copyToClipboard(teacherId: string) {
        navigator.clipboard.writeText(teacherId);
    }

    function handleCopyClick(teacherId: string) {
        copyToClipboard(teacherId);
        setIcon(<FaCheck color="green" />);
        setTimeout(() => setIcon(<FaCopy />), 1000);
    }

    const handleDateChange = (date: Date | undefined) => {
        if (date && isValid(date)) {
            form.setValue("startDate", format(date, "yyyy-MM-dd"));
        } else {
            form.setValue("startDate", "");
        }
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-x-4">
                <FormField
                    control={form.control}
                    name="unit"
                    render={() => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black">
                                Unit
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="dark:text-white text-black pr-[45px]"
                                    value={"U01 - 2024"}
                                    readOnly
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="teacher"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black">
                                Teacher
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select teacher ... " />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {teacherDummyData.map((teacher) => {
                                        return (
                                            <Accordion
                                                type="single"
                                                collapsible
                                                key={teacher.id}
                                            >
                                                <AccordionItem value="item-1">
                                                    <AccordionTrigger>
                                                        <SelectItem
                                                            key={teacher.id}
                                                            value={teacher.id}
                                                        >
                                                            {teacher.fullName}
                                                        </SelectItem>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="pl-8 text-slate-400">
                                                            ID:{" "}
                                                            {shortenString(
                                                                teacher.id
                                                            )}
                                                            <Button
                                                                variant="icon"
                                                                size="icon"
                                                                onClick={() =>
                                                                    handleCopyClick(
                                                                        teacher.id
                                                                    )
                                                                }
                                                            >
                                                                {icon}
                                                            </Button>
                                                        </div>
                                                        <div className="pl-8 text-slate-400">
                                                            {" "}
                                                            Birthday:{" "}
                                                            {teacher.birthday}
                                                        </div>
                                                        <div className="pl-8 text-slate-400">
                                                            Create date:{" "}
                                                            {teacher.createDate}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <FormField
                    control={form.control}
                    name="index"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black">
                                Class index
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="dark:text-white text-black appearance-none"
                                    autoComplete="off"
                                    placeholder="Write a name ... "
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pricePerSession"
                    render={() => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black">
                                Price per session{" "}
                                <span className="text-slate-400">($)</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="dark:text-white text-black pr-[45px]"
                                    value={"7$"}
                                    readOnly
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <FormField
                    control={form.control}
                    name="maxSessions"
                    render={() => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black">
                                Max sessions
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="dark:text-white text-black appearance-none"
                                    readOnly
                                    value={"50"}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="maxStudents"
                    render={() => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black">
                                Max students
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="dark:text-white text-black pr-[45px]"
                                    readOnly
                                    value={"45"}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <FormField
                    control={form.control}
                    name="studyTime"
                    render={() => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black">
                                Study time
                            </FormLabel>
                            <FormControl>
                                <div className="grid grid-cols-11">
                                    <Controller
                                        name="studyTime.hours"
                                        control={form.control}
                                        render={() => (
                                            <div className="col-span-3">
                                                <Input
                                                    className="dark:text-white text-black text-right appearance-none"
                                                    value={"02"}
                                                    readOnly
                                                />
                                            </div>
                                        )}
                                    />
                                    <div className="col-span-1 flex items-center justify-center text-xl font-bold">
                                        :
                                    </div>
                                    <Controller
                                        name="studyTime.minutes"
                                        control={form.control}
                                        render={() => (
                                            <div className="col-span-3">
                                                <Input
                                                    className="dark:text-white text-black text-right appearance-none"
                                                    value={"30"}
                                                    readOnly
                                                />
                                            </div>
                                        )}
                                    />
                                    <div className="col-span-1 flex items-center justify-center text-xl font-bold">
                                        :
                                    </div>
                                    <Controller
                                        name="studyTime.seconds"
                                        control={form.control}
                                        render={() => (
                                            <div className="col-span-3">
                                                <Input
                                                    className="dark:text-white text-black text-right appearance-none"
                                                    value={"00"}
                                                    readOnly
                                                />
                                            </div>
                                        )}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black appearance-none">
                                Start date
                            </FormLabel>
                            <FormControl className="relative">
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                type="button"
                                                className="right-0 absolute p-3"
                                            >
                                                <CalendarIcon className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={parse(
                                                    field.value,
                                                    "yyyy-MM-dd",
                                                    new Date()
                                                )}
                                                onSelect={(date) => {
                                                    handleDateChange(date);
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Input
                                        className="dark:text-white text-black pr-[45px]"
                                        autoComplete="off"
                                        placeholder="Pick a date ... "
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>
    );
};

export default NewClassBasicInfo;
