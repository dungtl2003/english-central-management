import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import {Button} from "@/components/ui/button";
import React, {ReactElement} from "react";
import {FaEdit} from "react-icons/fa";
import AttendanceTable from "./attendance-table";
import {SessionTableModel} from "./session-table-model";
import SessionEditHeader from "./session-edit-header";

interface SessionEditProps {
    data: SessionTableModel;
}

export function SessionEdit({data}: SessionEditProps): ReactElement {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    // Dùng biến này check xem ngày hiện tại có lớn hơn ngày theo lịch
    // Nếu lớn hơn thì để false => lúc này cái nút sẽ bấm được
    // Nếu nhỏ hơn thì để true => lúc này cái nút sẽ bị làm mờ
    const isEditable: boolean = false;

    // Dùng biến này để kiểm tra xem bản ghi điểm danh đã được lưu lần đầu chưa
    // Mặc định ban đầu sẽ là false
    // Khi bấm nút "Save attendance" => setFlag(true) => đổi biến cờ
    // const [flag, setFlag] = useState(false);

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
                <SessionEditHeader data={data} />
                <AttendanceTable />
                <DialogFooter>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="submit">Save attendance</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClose}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
