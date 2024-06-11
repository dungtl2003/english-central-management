"use client";

import {UserProfile} from "@clerk/nextjs";
import {ReactElement, useState} from "react";
import {IoInformationCircle} from "react-icons/io5";
import {IoArrowBackCircle} from "react-icons/io5";
import {Calendar as CalendarIcon} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {format, isValid, parse} from "date-fns";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";
import * as theme from "@clerk/themes";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
    userId: z.string(),
    phoneNumber: z.string(),
    identityCard: z.string(),
    role: z.string(),
    gender: z.string(),
    birthday: z.string(),
    createDate: z.string(),
    updateDate: z.string(),
});

const CustomPage = (): ReactElement => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userId: "",
            phoneNumber: "",
            identityCard: "",
            role: "",
            gender: "",
            birthday: "",
            createDate: "",
            updateDate: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    const [month, setMonth] = useState(new Date());

    // Hold the selected date in state
    const [selectedDate, setSelectedDate] = useState<Date>(); // Nếu có ngày sinh nhật thì để vào đây

    // Hold the input value in state
    const [inputValue, setInputValue] = useState("");

    const handleDayPickerSelect = (date: Date | undefined) => {
        if (!date) {
            setInputValue("");
            setSelectedDate(undefined);
        } else {
            setSelectedDate(date);
            setMonth(date);
            setInputValue(format(date, "MM/dd/yyyy"));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // keep the input value in sync

        const parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date());

        if (isValid(parsedDate)) {
            setSelectedDate(parsedDate);
            setMonth(parsedDate);
        } else {
            setSelectedDate(undefined);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="userId"
                    render={() => (
                        <FormItem>
                            <FormLabel className="text-md">User id</FormLabel>
                            <FormControl>
                                <Input
                                    value={"000-111-222-333-444-555"} // truyền value vào đây, cái này ko cần validate vì ko edit được
                                    type="text"
                                    readOnly
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={() => (
                        <FormItem>
                            <FormLabel className="text-md">
                                Phone number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    defaultValue={"0123456789"} // truyền value vào đây, validate xem có phải số không, sđt max bao nhiêu ký tự
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="identityCard"
                    render={() => (
                        <FormItem>
                            <FormLabel className="text-md">
                                Identity card
                            </FormLabel>
                            <FormControl>
                                <Input
                                    defaultValue={"1111-2222-3333-4444"} // truyền value vào đây, validate tương tự số điện thoại
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-x-2">
                    <FormField
                        control={form.control}
                        name="role"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-md">Role</FormLabel>
                                <FormControl>
                                    <Input
                                        defaultValue={"Admin"} // truyền value vào đây
                                        type="text"
                                        readOnly
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-md">
                                    Gender
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="female">
                                            Female
                                        </SelectItem>
                                        <SelectItem value="others">
                                            Others
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormControl></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-3 gap-x-2">
                    <FormField
                        control={form.control}
                        name="birthday"
                        render={() => (
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
                                                month={month}
                                                onMonthChange={setMonth}
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={handleDayPickerSelect}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormLabel>
                                <Input
                                    type="text"
                                    placeholder="dd/MM/yyyy"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="createDate"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-md">
                                    Create date
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        defaultValue={"01/31/2024"} // truyền value vào đây
                                        type="text"
                                        readOnly
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="updateDate"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-md">
                                    Update date
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        defaultValue={"06/05/2024"} // truyền value vào đây
                                        type="text"
                                        readOnly
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                    <div className="flex w-full justify-center">
                        <Button className="min-w-[50%]" type="submit">
                            Submit
                        </Button>
                    </div>
                    <div className="flex w-full justify-center">
                        {/* Lúc làm cái nút này thì onClick sẽ xóa hết các trường vừa điền */}
                        <Button
                            className="min-w-[50%]"
                            variant="destructive"
                            type="reset"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

const UserProfilePage = (): ReactElement => (
    <div className="flex justify-center">
        <UserProfile
            routing="hash"
            appearance={{
                baseTheme: theme.dark,
            }}
        >
            <UserProfile.Page
                label="Personal Information"
                labelIcon={<IoInformationCircle size={18} />}
                url="/personal-information"
            >
                <CustomPage />
            </UserProfile.Page>
            <UserProfile.Link
                label="Back to site"
                labelIcon={<IoArrowBackCircle size={18} />}
                url="/teachers/1/classes/1"
            ></UserProfile.Link>
        </UserProfile>
    </div>
);

export default UserProfilePage;
