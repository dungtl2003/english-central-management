import ConfirmDialog from "@/components/comfirm-dialog";
import {DialogFooter} from "@/components/ui/dialog";
import React, {ReactElement} from "react";

const AttendanceTableFooter: React.FC<{
    isLoading: boolean;
    canSaveAttendances: boolean;
    onConfirmHandler: () => void;
}> = ({canSaveAttendances, onConfirmHandler, isLoading}): ReactElement => {
    return (
        <DialogFooter>
            {canSaveAttendances ? (
                <ConfirmDialog
                    onConfirm={onConfirmHandler}
                    title="Save attendance"
                    isLoading={isLoading}
                />
            ) : (
                ""
            )}
        </DialogFooter>
    );
};

export default AttendanceTableFooter;
