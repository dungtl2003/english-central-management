import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {ReactElement} from "react";
import {FaEdit} from "react-icons/fa";
import AttendanceTable from "./attendance-table";
import AttendanceTimer from "./attendance-timer";
import ConfirmDialog from "@/components/comfirm-dialog";
import {SessionTableModel} from "./types";

export const SessionEdit: React.FC<{data: SessionTableModel}> = ({
    data,
}): ReactElement => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    // Dùng biến này check xem ngày hiện tại có lớn hơn ngày theo lịch
    // Nếu lớn hơn thì để false => lúc này cái nút sẽ bấm được
    // Nếu nhỏ hơn thì để true => lúc này cái nút sẽ bị làm mờ
    const isEditable: boolean = false;
    // Dùng biến này để kiểm tra xem bản ghi điểm danh đã được lưu lần đầu chưa
    // Mặc định ban đầu sẽ là false
    // Khi bấm nút "Save attendance" => setFlag(true) => đổi biến cờ
    //! const [flag, setFlag] = useState(false);

    const [confirmedTime, setConfirmedTime] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    const handleOnSaveTime = () => {
        setConfirmedTime(true);
        setDisabled(true);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger disabled={isEditable} asChild>
                <Button variant="outline">
                    <span className="pr-1">
                        <FaEdit />
                    </span>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent
                className="max-w-[80%] min-h-[80%]"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <AttendanceTimer
                    data={data}
                    disabled={disabled}
                    handleOnSaveTime={handleOnSaveTime}
                />
                {confirmedTime ? <AttendanceTable data={data} /> : ""}
                <DialogFooter>
                    {confirmedTime ? (
                        <ConfirmDialog
                            onConfirm={handleClose}
                            title="Save attendance"
                        />
                    ) : (
                        ""
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
