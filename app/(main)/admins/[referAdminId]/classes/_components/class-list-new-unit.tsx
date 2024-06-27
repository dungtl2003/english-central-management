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

const formSchema = z.object({
    year: z.string(),
    grade: z.string(),
    maxSessions: z.string(),
    maxStudents: z.string(),
    studyTime: z.object({
        hours: z.string().regex(/^\d+$/, "Must be a number"),
        minutes: z.string().regex(/^\d+$/, "Must be a number"),
        seconds: z.string().regex(/^\d+$/, "Must be a number"),
    }),
    pricePerSession: z.string(),
});

const ClassListNewUnit = (): ReactElement => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            year: new Date().getFullYear().toString(),
            grade: "",
            maxSessions: "",
            maxStudents: "",
            studyTime: {
                hours: "",
                minutes: "",
                seconds: "",
            },
            pricePerSession: "",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    const [open, setOpen] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="success" className="ml-auto">
                    New unit{" "}
                    <span className="pl-1.5">
                        <FaPlusCircle size={15} />
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="max-w-[500px]"
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                        Create new unit
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
                                name="year"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="pl-1 dark:text-white text-black">
                                            Unit year
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:text-white text-black"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="grade"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="pl-1 dark:text-white text-black">
                                            Grade
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:text-white text-black"
                                                autoComplete="off"
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
                                name="maxSessions"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="pl-1 dark:text-white text-black appearance-none">
                                            Max sessions
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:text-white text-black"
                                                autoComplete="off"
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
                                name="maxStudents"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="pl-1 dark:text-white text-black appearance-none">
                                            Max students
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:text-white text-black"
                                                autoComplete="off"
                                                type="number"
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
                                                                autoComplete="off"
                                                                placeholder="00"
                                                                type="number"
                                                                min={0}
                                                                max={23}
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
                                                                autoComplete="off"
                                                                placeholder="00"
                                                                type="number"
                                                                min={0}
                                                                max={59}
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
                                                                autoComplete="off"
                                                                placeholder="00"
                                                                type="number"
                                                                min={0}
                                                                max={59}
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
                                name="pricePerSession"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="pl-1 dark:text-white text-black">
                                            Price per session{" "}
                                            <span className="text-slate-400">
                                                ($)
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:text-white text-black"
                                                autoComplete="off"
                                                {...field}
                                            />
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

export default ClassListNewUnit;
