"use-client";

import {ReactElement} from "react";
import {ProfileForm} from "@/app/(auth)/complete-profile/_components/profile-form";

const CompleteProfilePage: React.FC = (): ReactElement => {
    return (
        <div>
            <ProfileForm />
        </div>
    );
};

export default CompleteProfilePage;
