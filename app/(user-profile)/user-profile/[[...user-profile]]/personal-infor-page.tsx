"use client";

import {useUser} from "@clerk/nextjs";
import {ReactElement, useCallback, useMemo} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {useToast} from "@/components/ui/use-toast";
import {PublicMetadata, UnsafeMetadata} from "@/constaints";
import {Gender} from "@prisma/client";
import {
    PhoneNumberSchema,
    IdentityCardSchema,
    BirthdaySchema,
} from "./validateSchema";
import {
    BirthdayField,
    CreateDateField,
    GenderField,
    IdentityCardField,
    PhoneNumberField,
    RoleField,
    UpdateDateField,
    UserIdField,
} from "./component";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {handler} from "@/lib/action/update-profile";
import {OutputType} from "@/lib/action/update-profile/types";
import {Loader2} from "lucide-react";

const FormSchema = z
    .object({
        userId: z.string(),
        phoneNumber: PhoneNumberSchema.optional().or(z.literal("")),
        identityCard: IdentityCardSchema.optional().or(z.literal("")),
        role: z.string(),
        gender: z.nativeEnum(Gender),
        birthday: BirthdaySchema,
        createDate: z.date().nullable(),
        updateDate: z.date().nullable(),
    })
    .partial();

export type FormSchema = z.infer<typeof FormSchema>;

export const PersonalInfoPage: React.FC<{
    userId: string;
}> = ({userId}): ReactElement => {
    const {user} = useUser();
    const {toast} = useToast();
    const memoHandler = useCallback(handler, []);
    const memoEvent = useMemo(() => {
        return {
            onError(error) {
                console.error("Error: ", error);
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: "Failed to update profile",
                });
            },
            onSuccess() {
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Updated profile successfully",
                });
            },
        } as UseActionOptions<OutputType>;
    }, [toast]);
    const {execute, isLoading} = useAction(memoHandler, memoEvent);

    const userData = {
        clerkData: {
            userId: userId,
            createDate: user?.createdAt,
            updateDate: user?.updatedAt,
        },
        unsafeMetaData: {
            phoneNumber: (user?.unsafeMetadata as UnsafeMetadata).phoneNumber,
            identityCard: (user?.unsafeMetadata as UnsafeMetadata).identityCard,
            birthday: (user?.unsafeMetadata as UnsafeMetadata).birthday,
            gender: (user?.unsafeMetadata as UnsafeMetadata).gender,
        },
        publicMetaData: {
            role: (user?.publicMetadata as PublicMetadata).role,
        },
    };
    //const [birthday, setBirthday] = useState<Date|undefined>(userData.unsafeMetaData.birthday);// birthday is date
    const birthday = userData.unsafeMetaData.birthday
        ? new Date(userData.unsafeMetaData.birthday)
        : undefined; //birthday is string

    const form = useForm<FormSchema>({
        resolver: zodResolver(FormSchema),
        values: {
            userId: userId,
            phoneNumber: userData.unsafeMetaData.phoneNumber,
            identityCard: userData.unsafeMetaData.identityCard,
            role: userData.publicMetaData.role,
            gender: userData.unsafeMetaData.gender,
            birthday: birthday,
            createDate: userData.clerkData.createDate,
            updateDate: userData.clerkData.updateDate,
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!user) {
            toast({
                title: "Error",
                variant: "destructive",
                description: "Something went wrong, please try again later",
            });
            return;
        }

        const updateData = {
            phoneNumber: data.phoneNumber,
            identityCard: data.identityCard,
            birthday: data.birthday,
            gender: data.gender,
        };
        execute({
            referUserId: user.id,
            unsafeMetadata: updateData,
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {UserIdField(form, userId)}
                {PhoneNumberField(form, userData.unsafeMetaData.phoneNumber)}
                {IdentityCardField(form, userData.unsafeMetaData.identityCard)}
                <div className="grid grid-cols-2 gap-x-2">
                    {RoleField(form, userData.publicMetaData.role)}
                    {GenderField(form, userData.unsafeMetaData.gender)}
                </div>
                <div className="grid grid-cols-3 gap-x-2">
                    {BirthdayField(form, birthday)}
                    {CreateDateField(form, userData.clerkData.createDate)}
                    {UpdateDateField(form, userData.clerkData.updateDate)}
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                    <div className="flex w-full justify-center">
                        <Button
                            disabled={isLoading}
                            className="min-w-[50%] bg-slate-50 text-slate-900 hover:bg-slate-50/90"
                            type="submit"
                        >
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isLoading ? "Please wait..." : "Update"}
                        </Button>
                    </div>
                    <div className="flex w-full justify-center">
                        <Button
                            disabled={isLoading}
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
