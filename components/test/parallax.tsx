import {Parallax, ParallaxLayer} from "@react-spring/parallax";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ParallaxPage = () => {
    return (
        <div className="App">
            <Parallax
                pages={2}
                style={{top: "0", left: "0"}}
                className="animation"
            >
                <ParallaxLayer offset={0} speed={0.25}>
                    <div
                        className="animation_layer parallax"
                        id="artback"
                    ></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.3}>
                    <div
                        className="animation_layer parallax"
                        id="mountain"
                    ></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-0.1}>
                    <div
                        className="animation_layer parallax"
                        id="logoland"
                    ></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.3}>
                    <div
                        className="animation_layer parallax"
                        id="jungle1"
                    ></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.35}>
                    <div
                        className="animation_layer parallax"
                        id="jungle2"
                    ></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.5}>
                    <div
                        className="animation_layer parallax"
                        id="jungle3"
                    ></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.45}>
                    <div
                        className="animation_layer parallax"
                        id="jungle4"
                    ></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.4}>
                    <div
                        className="animation_layer parallax"
                        id="manonmountain"
                    ></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.35}>
                    <div
                        className="animation_layer parallax"
                        id="jungle5"
                    ></div>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={0.25}>
                    <div id="textblock">
                        <div id="textblock-container">
                            <h1 id="textblock-title">What is ECM?</h1>
                            <p className="textblock-content">
                                The year is 2024.
                                <br />
                                <br />
                                An English center is an educational institution
                                dedicated to teaching the English language to
                                non-native speakers. These centers offer a range
                                of programs, including general English courses,
                                business English, exam preparation, and
                                specialized language training.
                                <br />
                                <br />
                                Equipped with experienced instructors and
                                immersive learning environments, English centers
                                focus on developing students speaking,
                                listening, reading, and writing skills.
                                <br />
                                <br />
                                They often incorporate modern teaching methods,
                                interactive activities, and cultural immersion
                                to enhance language acquisition. English centers
                                help students achieve their language goals and
                                improve their communication proficiency for
                                academic, professional, and personal purposes.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center my-5">
                            <span className="textblock-content">
                                Click to sign-in
                            </span>
                            <Link href="/sign-in">
                                <Image
                                    src="/images/logo.png"
                                    width={40}
                                    className="cursor-pointer"
                                    height="40"
                                    alt="ECM Logo"
                                />
                            </Link>
                        </div>
                        <footer id="textblock-footer">
                            Created with 🧡 By&nbsp;
                            <a
                                id="textblock-devsense"
                                href="https://youtube.com/c/DevSense19"
                            >
                                Pinkrex, Ilikeblue, Himawari
                            </a>
                        </footer>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    );
};

export default ParallaxPage;
