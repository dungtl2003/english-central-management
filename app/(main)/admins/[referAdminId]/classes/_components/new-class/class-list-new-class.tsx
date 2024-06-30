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
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form} from "@/components/ui/form";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import NewClassBasicInfo from "./new-class-basic-info";
import NewClassSchedule from "./new-class-schedule";

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

const daysOfWeek: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const ClassListNewClass = (): ReactElement => {
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
                className="max-w-[650px] flex flex-col items-center"
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                        Create new class
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex items-center justify-center"
                    >
                        <Carousel className="w-[90%]">
                            <CarouselContent className="p-1">
                                <CarouselItem
                                    key={"info"}
                                    className="space-y-5"
                                >
                                    <NewClassBasicInfo form={form} />
                                </CarouselItem>
                                <CarouselItem key={"schedule"}>
                                    <NewClassSchedule
                                        form={form}
                                        daysOfWeek={daysOfWeek}
                                    />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </form>
                </Form>
                <div className="w-full flex place-content-evenly">
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

export default ClassListNewClass;
