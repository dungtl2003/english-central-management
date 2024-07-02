import React, {ReactElement, useMemo, useRef} from "react";
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
import {FormSchema, FormType} from "./types";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {OutputType} from "@/lib/action/admin/add-class/types";
import {toast} from "@/components/ui/use-toast";
import {handler} from "@/lib/action/admin/add-class";
import {parse} from "date-fns";
import {TeacherModel, UnitModel} from "../types";

const daysOfWeek: {key: string; value: number}[] = [
    {key: "Monday", value: 1},
    {key: "Tuesday", value: 2},
    {key: "Wednesday", value: 3},
    {key: "Thursday", value: 4},
    {key: "Friday", value: 5},
    {key: "Saturday", value: 6},
    {key: "Sunday", value: 7},
];

const ClassListNewClass = ({
    units,
    teachers,
}: {
    units: UnitModel[];
    teachers: TeacherModel[];
}): ReactElement => {
    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
    });

    const event: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.error("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: `Fail to update status this teacher`,
                });
            },
            onSuccess: () => {
                toast({
                    title: "Success",
                    variant: "success",
                    description: `Update status this teacher successful`,
                });
                window.location.reload();
            },
        };
    }, []);
    const {execute} = useAction(handler, event);
    const schedule = useRef<
        {
            dayOfWeek: string;
            startHour: number;
            startMinute: number;
            startSecond: number;
        }[]
    >([]);

    function onSubmit(values: FormType) {
        form.setValue("schedule", schedule.current);
        execute({
            unitId: values.unitId,
            teacherId: values.teacherId,
            startDate: parse(values.startDate, "yyyy-MM-dd", new Date()),
            schedules: schedule.current.map((value) => {
                return {
                    dayOfWeek: Number(value.dayOfWeek),
                    startHour: value.startHour,
                    startMinute: value.startMinute,
                    startSecond: value.startSecond,
                };
            }),
        });
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
                        // onSubmit={() => {
                        //     () => console.log("hello");
                        // }}
                        className="flex items-center justify-center"
                    >
                        <div>
                            <div className="flex items-center justify-center">
                                <Carousel className="w-[90%]">
                                    <CarouselContent className="p-1">
                                        <CarouselItem
                                            key={"info"}
                                            className="space-y-5"
                                        >
                                            <NewClassBasicInfo
                                                form={form}
                                                unitsData={units}
                                                teachersData={teachers}
                                            />
                                        </CarouselItem>

                                        <CarouselItem key={"schedule"}>
                                            <NewClassSchedule
                                                schedule={schedule.current}
                                                form={form}
                                                daysOfWeek={daysOfWeek}
                                            />
                                        </CarouselItem>
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                            <div className="w-full flex place-content-evenly pt-3">
                                <Button
                                    variant="success"
                                    type="button"
                                    onClick={() => {
                                        onSubmit(form.getValues());
                                        //setOpen(false);
                                    }}
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
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ClassListNewClass;
