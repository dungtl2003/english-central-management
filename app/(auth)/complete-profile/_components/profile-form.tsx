"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {RoleSelector} from "@/app/(auth)/complete-profile/_components/select-role";

import {Loader2} from "lucide-react";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {handler} from "@/lib/action/add-user-role";
import {useToast} from "@/components/ui/use-toast";
import {useUser} from "@clerk/nextjs";
import {useCallback, useEffect, useMemo, useState} from "react";
import {PublicMetadata} from "@/constaints";
import {OutputType} from "@/lib/action/add-user-role/types";
import {useRouter} from "next/navigation";

const FormSchema = z.object({
    role: z.string().min(1, {
        message: "You must have a role",
    }),
});

type FormData = z.infer<typeof FormSchema>;

export function ProfileForm() {
    const {user, isSignedIn, isLoaded} = useUser();
    const router = useRouter();
    const [disabled, setDisabled] = useState<boolean>(false);
    const {toast} = useToast();

    const memoEvent = useMemo(() => {
        return {
            onError: (error: string): void => {
                console.error("Error: ", error);
                toast({
                    title: "Uh oh!",
                    variant: "destructive",
                    description: "Something went wrong, please try again later",
                });
            },
            onSuccess: (): void => {
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Completed sign up",
                });
                setDisabled(true);
                window.location.href = "/";
            },
        } as UseActionOptions<OutputType>;
    }, [toast]);
    const memoHandler = useCallback(handler, []);
    const role = (user?.publicMetadata as PublicMetadata)?.role;
    const {execute, isLoading} = useAction(memoHandler, memoEvent);
    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            role: "",
        },
    });
    const title = disabled
        ? "Redirecting"
        : isLoading
          ? "Please wait"
          : "Continue";

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn || role) {
            router.push("/");
        }
    }, [isLoaded, isSignedIn, router, role]);

    function onSubmit(values: FormData) {
        execute({
            id: user!.id,
            role: values.role,
        });
    }

    //the user does not have an account or already has a role

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
                            name="role"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Please select your role:
                                    </FormLabel>
                                    <RoleSelector {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" disabled={isLoading || disabled}>
                            {(isLoading || disabled) && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {title}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
