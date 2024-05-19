"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {RoleSelector} from "@/app/(auth)/complete-profile/_components/selectRole";

import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";

const validateText = function (str: string): boolean {
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(parseInt(str[i]))) {
            return false;
        }
    }
    return true;
};

const formSchema = z.object({
    fullName: z.string().superRefine((val, context) => {
        if (!validateText(val)) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Name should only contain letters.",
            });
            return;
        }

        if (val.length < 3) {
            context.addIssue({
                code: z.ZodIssueCode.too_small,
                minimum: 2,
                type: "string",
                inclusive: true,
                message: "Name must have at least 2 letters.",
            });
            return;
        }
    }),
    role: z.string().min(1, {
        message: "You must have a role.",
    }),
});

export function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            role: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        toast({
            title: "User profile:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <div className="border-4 p-6 rounded-md">
            <Form {...form}>
                <div className="flex justify-center text-2xl pb-4 font-bold">
                    Profile
                </div>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="w-[250px]">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Full name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. Nguyễn Văn Nam"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-[250px]">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>You are ... ?</FormLabel>
                                    <RoleSelector
                                        valueChange={field.onChange}
                                        selectValue={field.value}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit">Continue</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
