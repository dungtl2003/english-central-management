import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {ClassInfo} from "../../teachers/[teacherId]/_components/class-info";
import {OutputType} from "@/lib/action/teacher/get-classes/types";
import {formatDate} from "@/lib/utils";
import {useEffect, useState} from "react";

const formatData = (fetchedData: OutputType): ClassInfo[] | undefined => {
    if (!fetchedData) return undefined;

    const displayData: ClassInfo[] = [];
    fetchedData.forEach((data) =>
        displayData.push({
            classId: data.id,
            className: `${data.unit.grade}.${data.index}`,
            teacher: `${data.teacher.user.lastName} ${data.teacher.user.firstName}`,
            year: String(data.unit.year),
            start: formatDate(new Date(data.startTime)),
            end: formatDate(new Date(data.endTime)),
            price:
                "$" +
                String(
                    Math.round(
                        Number(data.unit.pricePerSession) *
                            data.unit.maxSessions *
                            100
                    ) / 100
                ),
        })
    );

    return displayData;
};

export async function TableDemo() {
    const [fetchedData, setFetchedData] = useState<OutputType | undefined>();

    setFetchedData(await handler());

    const [displayDatas, setDisplayDatas] = useState<ClassInfo[] | undefined>();

    useEffect(() => {
        setDisplayDatas(formatData(fetchedData as OutputType));
    }, [fetchedData]);

    return (
        <div className="w-11/12 pt-[120px]">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Class Id</TableHead>
                        <TableHead>Class Name</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayDatas?.map((displayData) => (
                        <TableRow key={displayData.classId}>
                            <TableCell className="font-medium">
                                {displayData.className}
                            </TableCell>
                            <TableCell>{displayData.year}</TableCell>
                            <TableCell>{displayData.start}</TableCell>
                            <TableCell>{displayData.end}</TableCell>
                            <TableCell>{displayData.teacher}</TableCell>
                            <TableCell className="text-right">
                                {displayData.price}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

const handler = async (): Promise<OutputType | undefined> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    const url = `${protocol}://${domain}/api/classes`;

    console.log(`Sending GET request to ${url}`);

    try {
        const response = await fetch(url, {
            method: "GET",
        });

        const body = await response.json();
        console.log("Received: ", body);

        return body as OutputType;
    } catch (error) {
        return undefined;
    }
};
