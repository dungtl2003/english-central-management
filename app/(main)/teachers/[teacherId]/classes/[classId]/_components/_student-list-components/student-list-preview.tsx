import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import React, {ReactElement} from "react";
import PayingPopup from "./paying-popup";
import {StudentInfoData, StudentInfoArray} from "./types";

const ClassListPreview: React.FC<{data: StudentInfoData}> = ({
    data,
}): ReactElement => {
    return (
        <>
            <div className="flex flex-row gap-x-6 justify-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Detail</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Student name</SheetTitle>
                            <SheetDescription>
                                View more student properties. Click close when
                                you are done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            {StudentInfoArray.map((obj) => {
                                const key = obj.key as keyof StudentInfoData;
                                return (
                                    <div
                                        key={obj.key}
                                        className="grid grid-cols-4 items-center gap-4"
                                    >
                                        <Label
                                            htmlFor={obj.key}
                                            className="text-left"
                                        >
                                            {obj.title}
                                        </Label>
                                        <Input
                                            id={obj.key}
                                            value={
                                                ((typeof data[key] ===
                                                    "string" ||
                                                    typeof data[key] ===
                                                        "number") &&
                                                    String(data[key])) ||
                                                ""
                                            }
                                            className="col-span-3"
                                            readOnly
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button>Close sheet</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <PayingPopup data={data} />
            </div>
        </>
    );
};

export default ClassListPreview;
