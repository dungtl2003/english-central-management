"use client";

import * as React from "react";
import {format} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

export function DatePicker(): React.ReactElement {
    return (
        <Button
            variant={"outline"}
            className={cn("w-[200px] justify-start text-left font-normal")}
        >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(new Date(), "PPP")}
        </Button>
    );
}
