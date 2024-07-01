import React, {ReactElement, useState} from "react";
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
import {FormSchema, FormType, TeacherModel, UnitModel} from "./types";
import {teacherDummyData, unitDummyData} from "../class-list-dummy-data";

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
    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(values: FormType) {
        console.debug("submit");
        console.log(values);
    }

    const [open, setOpen] = React.useState(false);

    const [unitsData /* setUnitsData */] = useState<UnitModel[]>(unitDummyData);
    const [teachersData /* setTeachersData */] =
        useState<TeacherModel[]>(teacherDummyData);

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
                                                unitsData={unitsData}
                                                teachersData={teachersData}
                                            />
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
                            </div>
                            <div className="w-full flex place-content-evenly pt-3">
                                <Button
                                    variant="success"
                                    type="button"
                                    onClick={() => {
                                        onSubmit(form.getValues());
                                        setOpen(false);
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
