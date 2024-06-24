import React, {ReactElement} from "react";
import {TabsContent} from "@/components/ui/tabs";
import SesssionTable from "./_attendance-components/session-table";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";

const TabAttendance: React.FC<{
    data: OutputType | undefined;
}> = ({data}): ReactElement => {
    return (
        <TabsContent value="attendanceHistory">
            <SesssionTable data={data} />
        </TabsContent>
    );
};

export default TabAttendance;
