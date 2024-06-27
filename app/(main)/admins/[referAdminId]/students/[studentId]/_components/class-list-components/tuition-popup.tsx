import React, {ReactElement} from "react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import TuitionPopupTable from "./tuition-popup-components/tuition-popup-table";

const TuitionPopup = (): ReactElement => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="py-0 px-2 m-0 w-full justify-start"
                    variant="ghost"
                >
                    Tuition fee
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[60%] min-h-[75%]">
                <div className="flex justify-center items-center text-2xl">
                    Tuition table
                </div>
                <TuitionPopupTable />
            </DialogContent>
        </Dialog>
    );
};

export default TuitionPopup;
