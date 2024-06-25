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
                            <SelectItem value="OTHERS">Others</SelectItem>
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
                                        defaultMonth={birthday}
                                        month={
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
                            defaultValue={
                                birthday
                                    ? format(birthday as Date, "dd/MM/yyyy")
                                    : ""
                            }
                            value={
                                field.value instanceof Date
                                    ? format(field.value, "dd/MM/yyyy")
                                    : field.value
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
