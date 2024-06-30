"use client";

import React, {ReactElement} from "react";
import TeacherDetail from "./_components/teacher-detail";

const TeacherDetailPage = (): ReactElement => {
    return (
        <div className="flex justify-center">
            <TeacherDetail />
        </div>
    );
};

export default TeacherDetailPage;
