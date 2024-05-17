import React from "react";
import Image from "next/image";

const logoImg = "/images/logo.png";

const logo = () => {
    return (
        <div className="mr-auto flex items-center gap-x-2">
            <div className="col-span-2 max-h-12 w-full object-contain lg:col-span-1">
                <Image src={logoImg} width="40" height="40" alt="ECM Logo" />
            </div>
        </div>
    );
};

export default logo;
