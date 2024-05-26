import React from "react";
import Image from "next/image";

const logoImg = "/images/logo.png";

const logo = () => {
    return <Image src={logoImg} width={40} height="40" alt="ECM Logo" />;
};

export default logo;
