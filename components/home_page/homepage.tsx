import {ParallaxProvider} from "react-scroll-parallax";
import {AdvancedBannerTop} from "./parallax";
import "./styles.css";
import {Slider} from "./slider";

export const ParallaxAdminHomePage = () => {
    return (
        <ParallaxProvider>
            <AdvancedBannerTop />
            <div className="flex items-center justify-center w-full min-h-[620px] mt-[80px]">
                <Slider />
            </div>
        </ParallaxProvider>
    );
};
