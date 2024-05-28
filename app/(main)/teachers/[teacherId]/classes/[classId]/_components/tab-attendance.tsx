import React, {ReactElement} from "react";
import {TabsContent} from "@/components/ui/tabs";

const TabAttendance = (): ReactElement => {
    return (
        <TabsContent value="attendanceHistory">
            This is class attendance
        </TabsContent>
    );
};

export default TabAttendance;
