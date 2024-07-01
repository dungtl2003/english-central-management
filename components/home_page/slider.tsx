import * as React from "react";
import Image from "next/image";

import {Card, CardContent} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const images: string[] = [
    "/images/anh1.jpg",
    "/images/anh2.jpg",
    "/images/anh3.jpg",
    "/images/anh4.jpg",
    "/images/anh5.jpg",
];

export function Slider() {
    return (
        <Carousel className="w-[1300px] h-[630px]">
            <CarouselContent>
                {Array.from({length: 5}).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex h-[630px] items-center justify-center ">
                                    <Image
                                        src={images[index]}
                                        width={1400}
                                        height={630}
                                        alt="ECM Logo"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="w-10 h-20" />
            <CarouselNext className="w-10 h-20" />
        </Carousel>
    );
}
