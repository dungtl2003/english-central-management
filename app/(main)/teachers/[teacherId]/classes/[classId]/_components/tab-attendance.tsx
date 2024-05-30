import React, {ReactElement} from "react";
import {TabsContent} from "@/components/ui/tabs";
import SesssionTable from "./_attendance-components/session-table";

const TabAttendance = (): ReactElement => {
    return (
        <TabsContent value="attendanceHistory">
            <SesssionTable />
        </TabsContent>
    );
};

export default TabAttendance;
