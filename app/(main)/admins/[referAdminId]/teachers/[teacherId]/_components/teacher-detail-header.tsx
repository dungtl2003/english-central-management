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

const copyToClipboard = (teacherId: string) => {
    navigator.clipboard.writeText(teacherId);
};

function shortenString(input: string): string {
    const shortened = input ? `${input.slice(0, 18)}.....` : "";
    return shortened;
}

const TeacherDetailHeader = ({
    teacherId,
    firstName,
    lastName,
    imageUrl,
    status,
    getStatusColor,
}: {
    teacherId: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    status: string;
    getStatusColor: (status: string) => ReactElement;
}): ReactElement => {
    const [icon, setIcon] = React.useState<ReactElement>(<FaCopy />);

    const handleCopyClick = () => {
        copyToClipboard(teacherId);
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
                                    <AvatarImage src={imageUrl} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                Image url: {imageUrl}
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    <div className="col-span-5">
                        <div className="flex items-center text-2xl">
                            {lastName} {firstName}
                        </div>
                        <div className="flex items-center text-sm text-slate-800">
                            ID: {shortenString(teacherId)}
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
                <div className="flex items-center justify-end">
                    <Button className="text-md" variant="outline">
                        Status: {getStatusColor(status)}
                    </Button>
                </div>
            </div>
            <Separator />
        </div>
    );
};

export default TeacherDetailHeader;
