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
import {FormType, TeacherModel, UnitModel} from "./types";

const NewClassBasicInfo = ({
    unitsData,
    teachersData,
    form,
}: {
    unitsData: UnitModel[];
    teachersData: TeacherModel[];
    form: UseFormReturn<FormType, undefined>;
}): ReactElement => {
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

    const handleUnitChange = (unitYear: string) => {
        const selectedUnit = unitsData.find((unit) => unit.year === unitYear);
        if (selectedUnit) {
            form.setValue("pricePerSession", selectedUnit.pricePerSession);
            form.setValue("maxSessions", selectedUnit.maxSessions);
            form.setValue("maxStudents", selectedUnit.maxStudents);
            form.setValue("studyTime.hours", selectedUnit.studyTime.hours);
            form.setValue("studyTime.minutes", selectedUnit.studyTime.minutes);
            form.setValue("studyTime.seconds", selectedUnit.studyTime.seconds);
        }
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-x-4">
                <FormField
                    control={form.control}
                    name="unitId"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black">
                                Unit
                            </FormLabel>
                            <Select
                                {...form.register("unitId")}
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    handleUnitChange(value);
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select unit ... " />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {unitsData.map((unit) => {
                                        return (
                                            <SelectItem
                                                key={unit.unitId}
                                                value={unit.unitId || "select"}
                                            >
                                                {unit.year}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="teacherId"
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
                                    {teachersData.map((teacher) => {
                                        return (
                                            <Accordion
                                                type="single"
                                                collapsible
                                                key={teacher.teacherId}
                                            >
                                                <AccordionItem value="item-1">
                                                    <AccordionTrigger>
                                                        <SelectItem
                                                            key={
                                                                teacher.teacherId
                                                            }
                                                            value={
                                                                teacher.teacherId
                                                            }
                                                        >
                                                            {teacher.fullName}
                                                        </SelectItem>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="pl-8 text-slate-400">
                                                            ID:{" "}
                                                            {shortenString(
                                                                teacher.teacherId
                                                            )}
                                                            <Button
                                                                variant="icon"
                                                                size="icon"
                                                                onClick={() =>
                                                                    handleCopyClick(
                                                                        teacher.teacherId
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
                    name="maxSessions"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black">
                                Max sessions
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="dark:text-white text-black appearance-none"
                                    readOnly
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="maxStudents"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black">
                                Max students
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="dark:text-white text-black pr-[45px]"
                                    readOnly
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                {/* <FormField
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
                /> */}
                <FormField
                    control={form.control}
                    name="pricePerSession"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="pl-1 dark:text-white text-black">
                                Price per session{" "}
                                <span className="text-slate-400">($)</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="dark:text-white text-black pr-[45px]"
                                    readOnly
                                    {...field}
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
                                        render={({field}) => (
                                            <div className="col-span-3">
                                                <Input
                                                    className="dark:text-white text-black text-right appearance-none"
                                                    readOnly
                                                    placeholder="00"
                                                    {...field}
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
                                        render={({field}) => (
                                            <div className="col-span-3">
                                                <Input
                                                    className="dark:text-white text-black text-right appearance-none"
                                                    readOnly
                                                    placeholder="00"
                                                    {...field}
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
                                        render={({field}) => (
                                            <div className="col-span-3">
                                                <Input
                                                    className="dark:text-white text-black text-right appearance-none"
                                                    readOnly
                                                    placeholder="00"
                                                    {...field}
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
                                                selected={
                                                    field.value
                                                        ? parse(
                                                              field.value,
                                                              "yyyy-MM-dd",
                                                              new Date()
                                                          )
                                                        : new Date()
                                                }
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
