import React, {ReactElement} from "react";
import {Button} from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import {FaCopy} from "react-icons/fa";
import {FaCheck} from "react-icons/fa";
import {DEFAULT_AVATAR_URL} from "@/constaints";

const copyToClipboard = (teacherId: string) => {
    navigator.clipboard.writeText(teacherId);
};

function shortenString(input: string): string {
    const shortened = input ? `${input.slice(0, 18)}.....` : "";
    return shortened;
}

const StudentDetailHeader = ({
    firstName,
    lastName,
    studentId,
    imageUrl,
}: {
    studentId: string;
    firstName: string;
    lastName: string;
    imageUrl: string | null | undefined;
}): ReactElement => {
    const [icon, setIcon] = React.useState<ReactElement>(<FaCopy />);

    const handleCopyClick = () => {
        copyToClipboard(studentId);
        setIcon(<FaCheck color="green" />);
        setTimeout(() => setIcon(<FaCopy />), 1000);
    };

    return (
        <div className="pt-5 pl-6 pr-6 row-span-1">
            <div className="grid grid-cols-3 pb-4">
                <div className="grid grid-cols-6">
                    <div className="col-span-1 flex items-center pl-1">
                        <HoverCard>
                            <HoverCardTrigger>
                                <Avatar>
                                    <AvatarImage
                                        src={imageUrl || DEFAULT_AVATAR_URL}
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                Image url: {imageUrl || DEFAULT_AVATAR_URL}
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    <div className="col-span-5">
                        <div className="flex items-center text-2xl">
                            {lastName + " " + firstName}
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                            ID: {shortenString(studentId)}{" "}
                            <Button
                                variant="icon"
                                size="icon"
                                onClick={() => handleCopyClick()}
                            >
                                {icon}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className=""></div>
                <div className="flex items-center justify-end"></div>
            </div>
            <Separator />
        </div>
    );
};

export default StudentDetailHeader;
