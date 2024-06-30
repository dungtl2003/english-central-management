import React, {ReactElement, useCallback} from "react";
import {CurveType, NumericAccessor} from "@unovis/ts";
import {VisXYContainer, VisAxis, VisArea, VisBulletLegend} from "@unovis/react";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";
import {ClassChartData, Status, statuses} from "./types";
// import {format} from "date-fns";
import {GoAlertFill} from "react-icons/go";
import {Card, CardContent} from "@/components/ui/card";

const formatData = (rawData: OutputType | undefined): ClassChartData[] => {
    const records: ClassChartData[] = [];
    if (!rawData) return records;

    // rawData.sessions
    //     .filter((session) => session.attendedTime)
    //     .sort(
    //         (session1, session2) =>
    //             new Date(session1.actualStartTime!).getTime() -
    //             new Date(session2.actualStartTime!).getTime()
    //     )
    //     .forEach((session) => {
    //         const presents = session.attendances.filter(
    //             (attendance) => attendance.status === "PRESENT"
    //         ).length;
    //         const absents = session.attendances.filter(
    //             (attendance) => attendance.status === "ABSENT"
    //         ).length;
    //         const lates = session.attendances.filter(
    //             (attendance) => attendance.status === "LATE"
    //         ).length;

    //         records.push({
    //             dateTime: `${format(session.actualStartTime!, "dd/MM/yyyy")}\n${format(session.actualStartTime!, "HH:mm:ss")}`,
    //             cases: {
    //                 pr: presents,
    //                 la: lates,
    //                 ab: absents,
    //             },
    //         });
    //     });

    return records;
};

function dataNotEnough(data: ClassChartData[]): ReactElement {
    if (data.length < 10) {
        return (
            <>
                <div className="w-full h-full bg-black absolute top-0 left-0 opacity-70"></div>
                <Card className="w-fit p-3 absolute left-[23%] top-[45%] ">
                    <CardContent className="text-2xl flex">
                        <span className="flex items-center pr-2">
                            <GoAlertFill color="yellow" />
                        </span>{" "}
                        <span className="text-cyan">
                            Not enough data to display
                        </span>{" "}
                        <span className="flex items-center pl-2">
                            <GoAlertFill color="yellow" />
                        </span>
                    </CardContent>
                </Card>
            </>
        );
    }

    return <></>;
}

const ClassChart: React.FC<{rawData: OutputType | undefined}> = ({
    rawData,
}): ReactElement => {
    const data = formatData(rawData);
    const x = useCallback((_: ClassChartData, i: number) => i, []);

    const Accessors = (
        id: Status
    ): {y: NumericAccessor<ClassChartData>; color: string | undefined} => ({
        y: useCallback((d: ClassChartData) => d.cases[id], [id]),
        color: statuses[id].color,
    });

    const xTicks = useCallback(
        (i: number | Date) => data[parseInt(i.toString())].dateTime,
        [data]
    );

    const yTicksFormatter = Intl.NumberFormat(navigator.language, {
        notation: "compact",
    }).format;

    const yTicks = (tick: number | Date) => {
        if (typeof tick === "number") {
            return yTicksFormatter(tick);
        }
        return tick.toString();
    };

    return (
        <div className="w-full p-0 pt-5 px-2 m-0 text-black relative">
            <VisXYContainer
                data={data.length > 10 ? data : []}
                height="280px"
                className="custom-area"
            >
                <VisBulletLegend
                    className="flex items-center justify-center"
                    items={Object.values(statuses)}
                />
                <VisArea
                    minHeight1Px={true}
                    {...Accessors(Status.Absent)}
                    x={x}
                    curveType={CurveType.Basis}
                />
                <VisArea
                    minHeight1Px={true}
                    {...Accessors(Status.Late)}
                    x={x}
                    curveType={CurveType.Basis}
                />
                <VisArea
                    minHeight1Px={true}
                    {...Accessors(Status.Present)}
                    x={x}
                    curveType={CurveType.Basis}
                />
                <VisAxis type="x" gridLine={false} tickFormat={xTicks} />
                <VisAxis type="y" tickFormat={yTicks} />
            </VisXYContainer>
            {dataNotEnough(data)}
        </div>
    );
};

export default ClassChart;
