import React, {ReactElement} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FaPlusCircle} from "react-icons/fa";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {teacherDummyData} from "./unit-detail-dummy-data";
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
import {FaCopy} from "react-icons/fa";
import {FaCheck} from "react-icons/fa";

const formSchema = z.object({
    unit: z.string(),
    teacher: z.string(),
    index: z.string(),
    pricePerSession: z.string(),
    maxSessions: z.string(),
    maxStudents: z.string(),
    studyTime: z.object({
        hours: z.string(),
        minutes: z.string(),
        seconds: z.string(),
    }),
    startDate: z.string(),
});

const UnitDetailNewClass = (): ReactElement => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            unit: "",
            teacher: "",
            index: "",
            pricePerSession: "",
            maxSessions: "",
            maxStudents: "",
            studyTime: {
                hours: "",
                minutes: "",
                seconds: "",
            },
            startDate: "",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    const [open, setOpen] = React.useState(false);
    const [icon, setIcon] = React.useState<ReactElement>(<FaCopy />);

    const handleDateChange = (date: Date | undefined) => {
        if (date && isValid(date)) {
            form.setValue("startDate", format(date, "yyyy-MM-dd"));
        } else {
            form.setValue("startDate", "");
        }
    };

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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="success" className="ml-auto">
                    New class{" "}
                    <span className="pl-1.5">
                        <FaPlusCircle size={15} />
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="max-w-[650px]"
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                        Create new class
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
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
                                                {teacherDummyData.map(
                                                    (teacher) => {
                                                        return (
                                                            <Accordion
                                                                type="single"
                                                                collapsible
                                                                key={teacher.id}
                                                            >
                                                                <AccordionItem value="item-1">
                                                                    <AccordionTrigger>
                                                                        <SelectItem
                                                                            key={
                                                                                teacher.id
                                                                            }
                                                                            value={
                                                                                teacher.id
                                                                            }
                                                                        >
                                                                            {
                                                                                teacher.fullName
                                                                            }
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
                                                                                {
                                                                                    icon
                                                                                }
                                                                            </Button>
                                                                        </div>
                                                                        <div className="pl-8 text-slate-400">
                                                                            {" "}
                                                                            Birthday:{" "}
                                                                            {
                                                                                teacher.birthday
                                                                            }
                                                                        </div>
                                                                        <div className="pl-8 text-slate-400">
                                                                            Create
                                                                            date:{" "}
                                                                            {
                                                                                teacher.createDate
                                                                            }
                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                            </Accordion>
                                                        );
                                                    }
                                                )}
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
                                            <span className="text-slate-400">
                                                ($)
                                            </span>
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
                                                            onSelect={(
                                                                date
                                                            ) => {
                                                                handleDateChange(
                                                                    date
                                                                );
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
                    </form>
                </Form>
                <div className="flex place-content-evenly">
                    <Button
                        variant="success"
                        type="submit"
                        onClick={() => setOpen(false)}
                    >
                        Create
                    </Button>
                    <Button
                        variant="destructive"
                        type="button"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UnitDetailNewClass;
