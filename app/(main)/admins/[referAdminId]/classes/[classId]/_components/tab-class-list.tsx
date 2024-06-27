import React, {ReactElement} from "react";
import {TabsContent} from "@/components/ui/tabs";
import ClassListTable from "./_classList-components/class-list-table";

const TabClassList = (): ReactElement => {
    return (
        <TabsContent value="classList">
            <ClassListTable />
        </TabsContent>
    );
};

export default TabClassList;
