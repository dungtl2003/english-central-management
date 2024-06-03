import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import React, {ReactElement} from "react";
import {SessionTableModel} from "./session-table-model";
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

interface SessionEditHeaderProps {
    data: SessionTableModel;
    handleOnSaveTime: () => void;
    disabled: boolean;
}

const AttendanceTimer = ({
    data,
    handleOnSaveTime,
    disabled,
}: SessionEditHeaderProps): ReactElement => {
    const estimateDate: Date = new Date(data.attendanceDate);
    const [date, setDate] = React.useState<Date | undefined>(estimateDate);

    const [estimateStartHour, estimateStartMinute]: string[] =
        data.startTime.split("h");
    const [estimateEndHour, estimateEndMinute]: string[] =
        data.endTime.split("h");

    return (
        <>
            <DialogHeader>
                <DialogTitle>
                    <div className="grid grid-cols-7">
                        <div className="col-span-2 grid grid-rows-2 items-center justify-center">
                            <div className="text-center text-[14px]">
                                Attendance date
                            </div>
                            <Popover>
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
                            defaultHour={
                                estimateStartHour ? estimateStartHour : "0"
                            }
                            defaultMinute={
                                estimateStartMinute ? estimateStartMinute : "00"
                            }
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
                                    defaultValue={estimateEndHour}
                                />

                                <Input
                                    disabled={disabled}
                                    readOnly
                                    className="w-[135px]"
                                    defaultValue={estimateEndMinute}
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
