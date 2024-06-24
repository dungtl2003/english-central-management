import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import React, {ReactElement, useCallback, useMemo, useState} from "react";
import {format} from "date-fns";
import {Calendar as CalendarIcon, Loader2} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {hour, minute} from "@/components/time-list";
import TimePicker from "./time-picker";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Input} from "@/components/ui/input";
import {SessionTableModel} from "./types";
import {Time} from "@/lib/time";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {OutputType} from "@/lib/action/teacher/update-session/types";
import {useToast} from "@/components/ui/use-toast";
import {handler} from "@/lib/action/teacher/update-session";

function calculateEndTime(
    startHour: number,
    startMinute: number,
    studyHour: number,
    studyMinute: number
): string {
    return new Time(startHour, startMinute, 0)
        .plus(new Time(studyHour, studyMinute, 0))
        .toString();
}

const AttendanceTimer: React.FC<{
    data: SessionTableModel;
}> = ({data}): ReactElement => {
    const {toast} = useToast();
    const memoHandler = useCallback(handler, []);
    const memoEvent = useMemo(() => {
        return {
            onSuccess: () => {
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Updated schedule",
                });

                window.location.reload();
            },
            onError: (error) => {
                toast({
                    title: "Error updating schedule",
                    variant: "destructive",
                    description: error,
                });
            },
        } as UseActionOptions<OutputType>;
    }, [toast]);
    const {execute, isLoading} = useAction(memoHandler, memoEvent);
    const isEditable: boolean = data.actualStartTime === null;

    const startDate = data.actualStartTime ?? data.estimatedStartTime;
    const [date, setDate] = React.useState<Date | undefined>(startDate);
    const startTimeParts = data.startTime.split(":");
    const [startHour, setStartHour] = useState<string>(startTimeParts[0]);
    const [startMinute, setStartMinute] = useState<string>(startTimeParts[1]);
    const [endHour, endMinute] = calculateEndTime(
        Number(startHour),
        Number(startMinute),
        data.studyHour,
        data.studyMinute
    ).split(":");

    const actualStudyTime = new Date(
        date!.getFullYear(),
        date!.getMonth(),
        date!.getDate(),
        Number(startHour),
        Number(startMinute),
        0
    );

    const updateScheduleTimeHandler = () => {
        execute({
            sessionId: data.sessionId,
            actualTime: actualStudyTime,
        });
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>
                    <div className="grid grid-cols-7">
                        <div className="col-span-2 grid grid-rows-2 items-center justify-center">
                            <div className="text-center text-[14px]">
                                Attendance date
                            </div>
                            <Popover modal={true}>
                                <PopoverTrigger asChild>
                                    <Button
                                        disabled={!isEditable || isLoading}
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {format(date!, "PPP")}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <TimePicker
                            hour={hour}
                            minute={minute}
                            title="Start time"
                            disabled={!isEditable || isLoading}
                            defaultHour={startHour}
                            defaultMinute={startMinute}
                            onHourChange={(hour) => {
                                setStartHour(hour);
                            }}
                            onMinuteChange={(minute) => {
                                setStartMinute(minute);
                            }}
                        />

                        <div className="col-span-2 grid grid-rows-2 items-center justify-center">
                            <div className="text-center text-[14px]">
                                End time
                            </div>
                            <div className="grid grid-cols-2 gap-x-2">
                                <Input
                                    disabled={!isEditable}
                                    readOnly
                                    className="w-[135px]"
                                    value={endHour}
                                />

                                <Input
                                    disabled={!isEditable}
                                    readOnly
                                    className="w-[135px]"
                                    value={endMinute}
                                />
                            </div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div></div>
                            <div className="flex items-center justify-center">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            disabled={!isEditable || isLoading}
                                            type="submit"
                                        >
                                            {isLoading && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            {isLoading
                                                ? "Please wait..."
                                                : "Save calendar"}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="h-[180px]">
                                        <AlertDialogHeader className="flex items-center justify-center">
                                            <AlertDialogTitle className="flex items-center justify-center text-2xl">
                                                This cannot be undone.
                                                <br />
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className="grid grid-cols-2 items-center ">
                                            <AlertDialogCancel className="min-w-[160px] text-md justify-self-center">
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={
                                                    updateScheduleTimeHandler
                                                }
                                                className="min-w-[160px] text-md justify-self-center"
                                            >
                                                Save
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </DialogTitle>
            </DialogHeader>
        </>
    );
};

export default AttendanceTimer;
