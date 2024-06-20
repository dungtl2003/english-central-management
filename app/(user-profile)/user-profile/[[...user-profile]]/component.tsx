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

export const UserIdFeild = (form: UseFormReturn, userId: string) => {
    return (
        <FormField
            control={form.control}
            name="userId"
            render={() => (
                <FormItem>
                    <FormLabel className="text-md">User ID</FormLabel>
                    <FormControl>
                        <Input value={userId} type="text" readOnly />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const PhoneNumberFeild = (
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
                            defaultValue={phoneNumber}
                            type="text"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const IdentityCardFeild = (
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

export const RoleFeild = (form: UseFormReturn, role: string | undefined) => {
    return (
        <FormField
            control={form.control}
            name="role"
            render={() => (
                <FormItem>
                    <FormLabel className="text-md">Role</FormLabel>
                    <FormControl>
                        <Input defaultValue={role} type="text" readOnly />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const GenderFeild = (
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
                        defaultValue={field.value || gender}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose gender" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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

export const BirthdayFeild = (
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
                                <PopoverContent className="w-auto p-0">
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
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export const CreateDateFeild = (
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

export const UpdateDateFeild = (
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
