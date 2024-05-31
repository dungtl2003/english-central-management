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
import ConfirmDialog from "@/components/comfirm-dialog";

interface SessionEditHeaderProps {
    data: SessionTableModel;
}

const SessionEditHeader = ({data}: SessionEditHeaderProps): ReactElement => {
    const estimateDate: Date = new Date(data.attendanceDate);
    const [date, setDate] = React.useState<Date | undefined>(estimateDate);

    // Hiện tại, t đang tạm thời tách như thế này để lấy giờ và phút riêng
    // Cm làm thì tự sửa nhé
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
                            defaultHour={
                                estimateStartHour ? estimateStartHour : "0"
                            }
                            defaultMinute={
                                estimateStartMinute ? estimateStartMinute : "00"
                            }
                        />

                        <TimePicker
                            hour={hour}
                            minute={minute}
                            title="End time"
                            defaultHour={
                                estimateEndHour ? estimateEndHour : "0"
                            }
                            defaultMinute={
                                estimateEndMinute ? estimateEndMinute : "00"
                            }
                        />
                        <div className="flex items-center justify-center">
                            <ConfirmDialog title="Save calendar" />
                        </div>
                    </div>
                </DialogTitle>
            </DialogHeader>
        </>
    );
};

export default SessionEditHeader;
