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
    form,
    daysOfWeek,
}: {
    form: UseFormReturn<FormType, undefined>;
    daysOfWeek: string[];
}): ReactElement => {
    const sessionRef = React.useRef<HTMLInputElement>(null);
    const [numberOfSessions, setNumberOfSessions] = React.useState<number>(0);

    function handleOnSchedule() {
        const sessions = sessionRef.current?.value;
        if (sessions) {
            setNumberOfSessions(parseInt(sessions, 10));
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
                            name="startDate"
                            render={({field}) => (
                                <FormItem className="pl-1">
                                    <FormLabel className="pl-1 dark:text-white text-black">
                                        Session {index + 1}
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
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
                                                        key={day.toLowerCase()}
                                                        value={day.toLowerCase()}
                                                    >
                                                        {day}
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
                                                            placeholder="00"
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
                                                            placeholder={"00"}
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
                                                            placeholder={"00"}
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
                    </div>
                ))}{" "}
            </div>
        </ScrollArea>
    );
};

export default NewClassSchedule;
