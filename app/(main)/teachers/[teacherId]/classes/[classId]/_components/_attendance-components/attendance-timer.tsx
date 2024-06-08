import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import React, {ReactElement, useState} from "react";
import {format} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";
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
    handleOnSaveTime: () => void;
    disabled: boolean;
}> = ({data, handleOnSaveTime, disabled}): ReactElement => {
    const [date, setDate] = React.useState<Date | undefined>(
        new Date(data.attendanceDate)
    );
    const estimateStartTimeParts = data.startTime.split(":");
    const [estimateStartHour, setEstimatedStartHour] = useState<string>(
        estimateStartTimeParts[0]
    );
    const [estimateStartMinute, setEstimatedStartMinute] = useState<string>(
        estimateStartTimeParts[1]
    );
    const [estimateEndHour, estimateEndMinute] = calculateEndTime(
        Number(estimateStartHour),
        Number(estimateStartMinute),
        data.studyHour,
        data.studyMinute
    ).split(":");

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
                                        disabled={disabled}
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date
                                            ? format(date, "PPP")
                                            : "Select a date"}
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
                            disabled={disabled}
                            defaultHour={estimateStartHour}
                            defaultMinute={estimateStartMinute}
                            onHourChange={(hour) => {
                                setEstimatedStartHour(hour);
                            }}
                            onMinuteChange={(minute) => {
                                setEstimatedStartMinute(minute);
                            }}
                        />

                        <div className="col-span-2 grid grid-rows-2 items-center justify-center">
                            <div className="text-center text-[14px]">
                                End time
                            </div>
                            <div className="grid grid-cols-2 gap-x-2">
                                <Input
                                    disabled={disabled}
                                    readOnly
                                    className="w-[135px]"
                                    value={estimateEndHour}
                                />

                                <Input
                                    disabled={disabled}
                                    readOnly
                                    className="w-[135px]"
                                    value={estimateEndMinute}
                                />
                            </div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div></div>
                            <div className="flex items-center justify-center">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            disabled={disabled}
                                            type="submit"
                                        >
                                            Save calendar
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="h-[180px]">
                                        <AlertDialogHeader className="flex items-center justify-center">
                                            <AlertDialogTitle className="flex items-center justify-center text-2xl">
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className="grid grid-cols-2 items-center ">
                                            <AlertDialogCancel className="min-w-[160px] text-md justify-self-center">
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleOnSaveTime}
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
