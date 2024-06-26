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
import {ClassInfo, ClassInfoArray} from "./class-info";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {ReactElement} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

type TablePreviewSheetProps = {
    data: ClassInfo;
};

const TablePreviewSheet: React.FC<TablePreviewSheetProps> = ({
    data,
}): ReactElement => {
    const currentUrl = usePathname();
    const redirectUrl = `${currentUrl}/classes/${data.classId}`;

    return (
        <>
            <div className="flex flex-row gap-x-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Preview</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Class preview</SheetTitle>
                            <SheetDescription>
                                View more class properties. Click close when you
                                are done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            {ClassInfoArray.map((obj) => {
                                const key = obj.key as keyof ClassInfo;
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
                                            value={data[key] || ""}
                                            className="col-span-3"
                                            readOnly
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Link
                                    className="mr-auto flex gap-x-2"
                                    href={redirectUrl}
                                >
                                    <Button variant="outline">
                                        View detail
                                    </Button>
                                </Link>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <Link className="mr-auto flex gap-x-2" href={redirectUrl}>
                    <Button variant="outline">Detail</Button>
                </Link>
            </div>
        </>
    );
};

export default TablePreviewSheet;
