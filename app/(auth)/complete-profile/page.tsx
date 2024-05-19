"use client";

import {ReactElement} from "react";
import {ProfileForm} from "@/app/(auth)/complete-profile/_components/profileForm";

const CompleteProfilePage: React.FC = (): ReactElement => {
    return (
        <div>
            <ProfileForm />
        </div>
    );
};

export default CompleteProfilePage;
