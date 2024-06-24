"use client";

import {useUser} from "@clerk/nextjs";
import {ReactElement} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {toast} from "@/components/ui/use-toast";
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
import {format} from "date-fns";

const FormSchema = z
    .object({
        userId: z.string(),
        phoneNumber: PhoneNumberSchema,
        identityCard: IdentityCardSchema,
        role: z.string(),
        gender: z.nativeEnum(Gender),
        birthday: BirthdaySchema,
        createDate: z.date().nullable(),
        updateDate: z.date().nullable(),
    })
    .partial();

export type FormSchema = z.infer<typeof FormSchema>;

export const PersonalInforPage: React.FC<{
    userId: string;
}> = ({userId}): ReactElement => {
    const {user} = useUser();

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
        const updateData = {
            phoneNumber: data.phoneNumber,
            identityCard: data.identityCard,
            birthday: data.birthday,
            gender: data.gender,
        };
        user?.update({
            unsafeMetadata: updateData,
        });
        toast({
            title: "You updated the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {/* {JSON.stringify(data, null, 2)} */}
                        Phone number: {data.phoneNumber} <br />
                        Identity card: {data.identityCard} <br />
                        Gender: {data.gender} <br />
                        Birthday:{" "}
                        {format(new Date(data.birthday as Date), "dd/MM/yyyy")}
                    </code>
                </pre>
            ),
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
                        <Button className="min-w-[50%]" type="submit">
                            Update
                        </Button>
                    </div>
                    <div className="flex w-full justify-center">
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
