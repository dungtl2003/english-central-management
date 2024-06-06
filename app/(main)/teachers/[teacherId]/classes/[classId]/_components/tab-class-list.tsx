import React, {ReactElement} from "react";
import {TabsContent} from "@/components/ui/tabs";
import ClassListTable from "./_classList-components/class-list-table";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";

const TabClassList: React.FC<{
    data: OutputType | undefined;
}> = ({data}): ReactElement => {
    return (
        <TabsContent value="classList">
            <ClassListTable data={data} />
        </TabsContent>
    );
};

export default TabClassList;
