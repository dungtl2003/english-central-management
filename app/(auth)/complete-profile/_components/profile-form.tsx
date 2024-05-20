"use client";

//TODO: error clerk session not up to date
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
import {containsNumber} from "@/lib/utils";
import {Loader2} from "lucide-react";
import {useAction} from "@/hooks/use-action";
import {handler} from "@/lib/api/create-teacher";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {useAuth} from "@clerk/nextjs";

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

type FormData = z.infer<typeof FormSchema>;

export function ProfileForm() {
    const router = useRouter();
    const {userId} = useAuth();
    const {toast} = useToast();
    const {execute, isLoading} = useAction(handler, {
        onError: (error: string): void => {
            console.log(error);
            toast({
                title: "Uh oh!",
                variant: "destructive",
                description: "Something went wrong, please try again later",
            });
        },
        onSuccess: (): void => {
            router.push(`/teachers/${userId}`);
        },
    });

    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            role: "",
        },
    });

    function onSubmit(values: FormData) {
        execute({
            id: userId,
            firstName: values.firstName,
            lastName: values.lastName,
            role: values.role,
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
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isLoading ? "Please wait" : "Continue"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
