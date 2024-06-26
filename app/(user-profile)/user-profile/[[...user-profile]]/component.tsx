import {Calendar as CalendarIcon} from "lucide-react";
import {UseFormReturn} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Gender} from "@prisma/client";
import {format, isValid, parse} from "date-fns";

const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab",
    "Home",
    "End",
    "Shift",
    "Control",
    "Alt",
];

export const UserIdField = (form: UseFormReturn, userId: string) => {
    return (
        <FormField
            control={form.control}
            name="userId"
            render={() => (
                <FormItem>
                    <FormLabel className="text-md">User ID</FormLabel>
                    <FormControl>
                        <Input
                            className="border-slate-800 bg-slate-950 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:ring-slate-300"
                            value={userId}
                            type="text"
                            readOnly
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const PhoneNumberField = (
    form: UseFormReturn,
    phoneNumber: string | undefined
) => {
    return (
        <FormField
            control={form.control}
            name="phoneNumber"
            render={() => (
                <FormItem>
                    <FormLabel className="text-md">Phone number</FormLabel>
                    <FormControl>
                        <Input
                            {...form.register("phoneNumber")}
                            className="border-slate-800 bg-slate-950 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:ring-slate-300"
                            defaultValue={phoneNumber}
                            type="text"
                            onKeyDown={(e) => {
                                if (/^[^0-9]*$/.test(e.key)) {
                                    if (allowedKeys.includes(e.key)) return;
                                    e.preventDefault();
                                }
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const IdentityCardField = (
    form: UseFormReturn,
    identityCard: string | undefined
) => {
    return (
        <FormField
            control={form.control}
            name="identityCard"
            render={() => (
                <FormItem>
                    <FormLabel className="text-md">Identity card</FormLabel>
                    <FormControl>
                        <>
                            <Input
                                {...form.register("identityCard")}
                                className="border-slate-800 bg-slate-950 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:ring-slate-300"
                                defaultValue={identityCard}
                                type="text"
                            />
                        </>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const RoleField = (form: UseFormReturn, role: string | undefined) => {
    return (
        <FormField
            control={form.control}
            name="role"
            render={() => (
                <FormItem>
                    <FormLabel className="text-md">Role</FormLabel>
                    <FormControl>
                        <Input
                            className="border-slate-800 bg-slate-950 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:ring-slate-300"
                            defaultValue={role}
                            type="text"
                            readOnly
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const GenderField = (
    form: UseFormReturn,
    gender: Gender | undefined
) => {
    return (
        <FormField
            control={form.control}
            name="gender"
            render={({field}) => (
                <FormItem>
                    <FormLabel className="text-md">Gender</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={gender}
                        value={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className="border-slate-800 bg-slate-950 ring-offset-slate-950 placeholder:text-slate-400 focus:ring-slate-300">
                                <SelectValue placeholder="Choose gender" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-slate-800 bg-slate-950 text-slate-50">
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormControl></FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const BirthdayField = (
    form: UseFormReturn,
    birthday: Date | undefined
) => {
    return (
        <div className="grid grid-cols-1 gap-x-2">
            <FormField
                control={form.control}
                name="birthday"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className="flex flex-row items-center text-md">
                            Birthday{" "}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <span className="pl-2">
                                        <CalendarIcon className="mr-2 h-4 w-4 hover:cursor-pointer" />
                                    </span>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 border-slate-800 bg-slate-950 text-slate-50">
                                    <Calendar
                                        //classNames={{
                                        //    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                        //    month: "space-y-4",
                                        //    caption:
                                        //        "flex justify-center pt-1 relative items-center",
                                        //    caption_label:
                                        //        "text-sm font-medium",
                                        //    nav: "space-x-1 flex items-center",
                                        //    nav_button: cn(
                                        //        buttonVariants({
                                        //            variant: "outline",
                                        //        }),
                                        //        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                                        //    ),
                                        //    nav_button_previous:
                                        //        "absolute left-1",
                                        //    nav_button_next: "absolute right-1",
                                        //    table: "w-full border-collapse space-y-1",
                                        //    head_row: "flex",
                                        //    head_cell:
                                        //        "rounded-md w-9 font-normal text-[0.8rem] text-slate-400",
                                        //    row: "flex w-full mt-2",
                                        //    cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 [&:has([aria-selected].day-outside)]:bg-slate-800/50 [&:has([aria-selected])]:bg-slate-800",
                                        //    day: cn(
                                        //        buttonVariants({
                                        //            variant: "ghost",
                                        //        }),
                                        //        "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
                                        //    ),
                                        //    day_range_end: "day-range-end",
                                        //    day_selected:
                                        //        "bg-slate-50 text-slate-900 hover:bg-slate-50 hover:text-slate-900 focus:bg-slate-50 focus:text-slate-900",
                                        //    day_today:
                                        //        "bg-slate-800 text-slate-50",
                                        //    day_outside:
                                        //        "day-outside opacity-50 aria-selected:opacity-30 text-slate-400 aria-selected:bg-slate-800/50 aria-selected:text-slate-400",
                                        //    day_disabled:
                                        //        "opacity-50 text-slate-400",
                                        //    day_range_middle:
                                        //        "aria-selected:bg-slate-800 aria-selected:text-slate-50",
                                        //    day_hidden: "invisible",
                                        //}}
                                        defaultMonth={
                                            field.value instanceof Date
                                                ? field.value
                                                : isValid(
                                                        parse(
                                                            field.value || "",
                                                            "dd/MM/yyyy",
                                                            new Date()
                                                        )
                                                    )
                                                  ? parse(
                                                        field.value,
                                                        "dd/MM/yyyy",
                                                        new Date()
                                                    )
                                                  : birthday
                                        }
                                        mode="single"
                                        selected={
                                            field.value instanceof Date
                                                ? field.value
                                                : isValid(
                                                        parse(
                                                            field.value || "",
                                                            "dd/MM/yyyy",
                                                            new Date()
                                                        )
                                                    )
                                                  ? parse(
                                                        field.value,
                                                        "dd/MM/yyyy",
                                                        new Date()
                                                    )
                                                  : birthday
                                        }
                                        onSelect={field.onChange}
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormLabel>
                        <Input
                            className="border-slate-800 bg-slate-950 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:ring-slate-300"
                            type="text"
                            placeholder="dd/MM/yyyy"
                            value={
                                field.value
                                    ? field.value instanceof Date
                                        ? format(field.value, "dd/MM/yyyy")
                                        : field.value
                                    : birthday
                                      ? format(birthday as Date, "dd/MM/yyyy")
                                      : ""
                            }
                            onChange={field.onChange}
                            onKeyDown={(e) => {
                                if (/^[^0-9]*$/.test(e.key)) {
                                    if (
                                        allowedKeys.includes(e.key) ||
                                        e.key === "/"
                                    )
                                        return;
                                    e.preventDefault();
                                }
                            }}
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export const CreateDateField = (
    form: UseFormReturn,
    createDate: Date | null | undefined
) => {
    return (
        <FormField
            control={form.control}
            name="createDate"
            render={() => (
                <FormItem>
                    <FormLabel className="text-md">Create date</FormLabel>
                    <FormControl>
                        <Input
                            className="border-slate-800 bg-slate-950 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:ring-slate-300"
                            defaultValue={
                                createDate
                                    ? format(new Date(createDate), "dd/MM/yyyy")
                                    : "..."
                            }
                            type="text"
                            readOnly
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const UpdateDateField = (
    form: UseFormReturn,
    updateDate: Date | null | undefined
) => {
    return (
        <FormField
            control={form.control}
            name="updateDate"
            render={() => (
                <FormItem>
                    <FormLabel className="text-md">Update date</FormLabel>
                    <FormControl>
                        <Input
                            className="border-slate-800 bg-slate-950 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:ring-slate-300"
                            defaultValue={
                                updateDate
                                    ? format(new Date(updateDate), "dd/MM/yyyy")
                                    : "..."
                            }
                            type="text"
                            readOnly
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
