import {ParallaxProvider} from "react-scroll-parallax";
import {AdvancedBannerTop} from "./parallax";
import "./styles.css";
import {Slider} from "./slider";

export const ParallaxTest = () => {
    return (
        <ParallaxProvider>
            <AdvancedBannerTop />
            <div className="flex items-center justify-center w-full min-h-[620px]">
                <Slider />
            </div>
            <div className="flex items-center justify-center w-full min-h-[620px] text-[200px]">
                Sign up now
            </div>
        </ParallaxProvider>
    );
};
