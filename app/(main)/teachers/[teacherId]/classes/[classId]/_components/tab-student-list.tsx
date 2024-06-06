import React, {ReactElement} from "react";
import {TabsContent} from "@/components/ui/tabs";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";
import ClassListTable from "./_student-list-components/student-list-table";

const TabClassList: React.FC<{
    data: OutputType | undefined;
}> = ({data}): ReactElement => {
    return (
        <TabsContent value="studentList">
            <ClassListTable data={data} />
        </TabsContent>
    );
};

export default TabClassList;
