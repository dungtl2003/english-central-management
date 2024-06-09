import {Calendar as CalendarIcon} from "lucide-react";
import {UseFormReturn} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {cn, formatDate} from "@/lib/utils";
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

export const BirthDayFeild = (
    form: UseFormReturn,
    birthday: Date | undefined
) => {
    // const [date, setDate] = useState(birthday);

    return (
        <FormField
            control={form.control}
            name="birthday"
            render={({field}) => (
                <FormItem>
                    <FormLabel className="text-md">Birthday</FormLabel>
                    <FormControl>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !birthday && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value || birthday ? (
                                        formatDate(
                                            field.value || (birthday as Date)
                                        )
                                    ) : (
                                        <span>Pick your birthday</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value || birthday}
                                    onSelect={field.onChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
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
                                    ? formatDate(createDate as Date)
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
                                    ? formatDate(updateDate as Date)
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
