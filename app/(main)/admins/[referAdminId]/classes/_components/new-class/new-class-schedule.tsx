import React, {ReactElement} from "react";
import {Button} from "@/components/ui/button";
import {UseFormReturn} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {ScrollArea} from "@/components/ui/scroll-area";
import {FormType} from "./types";

const NewClassSchedule = ({
    schedule,
    form,
    daysOfWeek,
}: {
    schedule: {
        dayOfWeek: string;
        startHour: number;
        startMinute: number;
        startSecond: number;
    }[];
    form: UseFormReturn<FormType, undefined>;
    daysOfWeek: {key: string; value: number}[];
}): ReactElement => {
    const sessionRef = React.useRef<HTMLInputElement>(null);
    const [numberOfSessions, setNumberOfSessions] = React.useState<number>(0);

    function handleOnSchedule() {
        const sessions = sessionRef.current?.value;
        if (sessions) {
            setNumberOfSessions(parseInt(sessions, 10));
            for (let index = 0; index < parseInt(sessions, 10); index++) {
                schedule.push({
                    dayOfWeek: "0",
                    startHour: 0,
                    startMinute: 0,
                    startSecond: 0,
                });
            }
        }
    }

    return (
        <ScrollArea className=" h-[350px]">
            <FormLabel className="pl-2 dark:text-white text-black">
                Number of sesion per week
            </FormLabel>
            <FormControl>
                <div className="flex gap-x-4 pl-1">
                    <Input
                        className="dark:text-white text-black appearance-none"
                        autoComplete="off"
                        placeholder="Write in a number... "
                        type="number"
                        ref={sessionRef}
                        min={1}
                    />
                    <Button
                        variant="outline"
                        type="button"
                        onClick={handleOnSchedule}
                    >
                        Schedule
                    </Button>
                </div>
            </FormControl>
            <FormMessage />

            <div className="flex flex-col gap-y-5 pt-4">
                {Array.from({length: numberOfSessions}, (_, index) => (
                    <div key={index} className="grid grid-cols-2 gap-x-4 pr-1">
                        <FormField
                            control={form.control}
                            name="schedule"
                            render={() => (
                                <>
                                    <FormItem className="pl-1">
                                        <FormLabel className="pl-1 dark:text-white text-black">
                                            Session {index + 1}
                                        </FormLabel>
                                        <Select
                                            onValueChange={(value) =>
                                                (schedule[index].dayOfWeek =
                                                    value)
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a day" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {daysOfWeek.map((day) => {
                                                    return (
                                                        <SelectItem
                                                            key={day.value}
                                                            value={day.value.toString()}
                                                        >
                                                            {day.key}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    <FormItem>
                                        <FormLabel className="pl-1 dark:text-white text-black">
                                            Start time
                                        </FormLabel>
                                        <FormControl>
                                            <div className="grid grid-cols-11">
                                                <div className="col-span-3">
                                                    <Input
                                                        className="dark:text-white text-black text-right appearance-none"
                                                        placeholder="00"
                                                        onChange={(event) => {
                                                            schedule[
                                                                index
                                                            ].startHour =
                                                                Number(
                                                                    event.target
                                                                        .value
                                                                );
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-span-1 flex items-center justify-center text-xl font-bold">
                                                    :
                                                </div>
                                                <div className="col-span-3">
                                                    <Input
                                                        className="dark:text-white text-black text-right appearance-none"
                                                        placeholder={"00"}
                                                        onChange={(event) => {
                                                            schedule[
                                                                index
                                                            ].startMinute =
                                                                Number(
                                                                    event.target
                                                                        .value
                                                                );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                ))}{" "}
            </div>
        </ScrollArea>
    );
};

export default NewClassSchedule;
