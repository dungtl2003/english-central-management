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

import {RoleSelector} from "@/app/(auth)/complete-profile/_components/select-role";

import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";
import {containsNumber} from "@/lib/utils";

const FormSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name must have at least 1 letter")
        .refine(
            (str) => !containsNumber(str),
            "First name should only contain letters"
        ),
    lastName: z
        .string()
        .min(1, "Last name must have at least 1 letter")
        .refine(
            (str) => !containsNumber(str),
            "Last name should only contain letters"
        ),
    role: z.string().min(1, {
        message: "You must have a role",
    }),
});

export function ProfileForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            role: "",
        },
    });

    function onSubmit(values: z.infer<typeof FormSchema>) {
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
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. Harry"
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
                            name="lastName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. Potter"
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
                                    <RoleSelector {...field} />
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
