"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";
import { m } from "motion/react";
import type { CSSProperties } from "react";
import "./_MessagesFeature.scss";

type MessagesFeatureProps = {
    feature: {
        id: number;
        title: string;
        description: string | null;
        image: string | null;
        format:
            | "image_first"
            | "image_last"
            | "image_below";
        placement: number;
    };
    video?: string;
    themeColor: string;
    isLast: boolean;
};

const MessagesFeature = ({
    feature,
    video,
    themeColor,
    isLast,
}: MessagesFeatureProps) => {
    const videoRef =
        useRef<HTMLVideoElement | null>(null);

    const featureRef =
        useRef<HTMLElement | null>(null);

    const retryTimeoutRef =
        useRef<ReturnType<
            typeof setTimeout
        > | null>(null);

    const [isVisible, setIsVisible] =
        useState(false);

    const hasVideo = Boolean(video);

    useEffect(() => {
        if (!hasVideo) {
            return;
        }

        const element = videoRef.current;
        const section = featureRef.current;

        if (!element || !section) {
            return;
        }

        const setPlaybackRate = () => {
            element.playbackRate = 1.5;
        };

        setPlaybackRate();

        element.addEventListener(
            "loadedmetadata",
            setPlaybackRate
        );

        const observer =
            new IntersectionObserver(
                ([entry]) => {
                    setIsVisible(
                        entry.isIntersecting
                    );
                },
                {
                    threshold: 0,
                    rootMargin:
                        "0px 0px 200px 0px",
                }
            );

        observer.observe(section);

        return () => {
            observer.disconnect();

            if (
                retryTimeoutRef.current
            ) {
                clearTimeout(
                    retryTimeoutRef.current
                );
            }

            element.pause();

            element.removeEventListener(
                "loadedmetadata",
                setPlaybackRate
            );
        };
    }, [hasVideo]);

    useEffect(() => {
        if (!hasVideo) {
            return;
        }

        const element = videoRef.current;

        if (!element) {
            return;
        }

        const playVideo = () => {
            if (!isVisible) {
                return;
            }

            element.playbackRate = 2;

            if (element.paused) {
                element
                    .play()
                    .catch(() => {});
            }
        };

        const retryPlayback = () => {
            if (!isVisible) {
                return;
            }

            if (
                retryTimeoutRef.current
            ) {
                clearTimeout(
                    retryTimeoutRef.current
                );
            }

            retryTimeoutRef.current =
                setTimeout(() => {
                    playVideo();
                }, 500);
        };

        const handleCanPlay = () => {
            playVideo();
        };

        const handleWaiting = () => {
            retryPlayback();
        };

        const handleStalled = () => {
            retryPlayback();
        };

        const handleEnded = () => {
            if (!isVisible) {
                return;
            }

            element.currentTime = 0;

            playVideo();
        };

        const handleError = () => {
            retryPlayback();
        };

        if (isVisible) {
            playVideo();
        } else {
            element.pause();
        }

        element.addEventListener(
            "canplay",
            handleCanPlay
        );

        element.addEventListener(
            "waiting",
            handleWaiting
        );

        element.addEventListener(
            "stalled",
            handleStalled
        );

        element.addEventListener(
            "ended",
            handleEnded
        );

        element.addEventListener(
            "error",
            handleError
        );

        return () => {
            element.removeEventListener(
                "canplay",
                handleCanPlay
            );

            element.removeEventListener(
                "waiting",
                handleWaiting
            );

            element.removeEventListener(
                "stalled",
                handleStalled
            );

            element.removeEventListener(
                "ended",
                handleEnded
            );

            element.removeEventListener(
                "error",
                handleError
            );

            if (
                retryTimeoutRef.current
            ) {
                clearTimeout(
                    retryTimeoutRef.current
                );
            }
        };
    }, [
        hasVideo,
        isVisible,
    ]);

    const mediaInitial =
        feature.format === "image_first"
            ? {
                  x: -60,
                  y: 0,
              }
            : feature.format === "image_last"
            ? {
                  x: 60,
                  y: 0,
              }
            : {
                  x: 0,
                  y: 60,
              };

    const textInitial =
        feature.format === "image_first"
            ? {
                  x: 60,
                  y: 0,
              }
            : feature.format === "image_last"
            ? {
                  x: -60,
                  y: 0,
              }
            : {
                  x: 0,
                  y: 60,
              };

    const isImageBelow =
        feature.format === "image_below";

    const mediaOrder =
        feature.format === "image_first"
            ? "order-lg-1"
            : feature.format === "image_last"
            ? "order-lg-2"
            : "order-2";

    const textOrder =
        feature.format === "image_first"
            ? "order-lg-2"
            : feature.format === "image_last"
            ? "order-lg-1"
            : "order-1";

    return (
        <section ref={featureRef}>
            <div className="container">
                <div
                    className={`messages-feature ${
                        feature.format
                    } ${
                        isLast
                            ? "last-feature"
                            : ""
                    }`}
                    style={
                        {
                            "--theme-color":
                                themeColor,
                        } as CSSProperties
                    }
                >
                    <div className="messages-feature-content row align-items-center">
                        <div
                            className={`messages-feature-media-col ${
                                isImageBelow
                                    ? "col-12"
                                    : "col-lg-6 col-12"
                            } ${mediaOrder}`}
                        >
                            <m.div
                                className="messages-feature-media"
                                initial={{
                                    opacity: 0,
                                    filter:
                                        "blur(12px)",
                                    ...mediaInitial,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    filter:
                                        "blur(0px)",
                                    x: 0,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.05,
                                }}
                                transition={{
                                    duration: 1.1,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                    ],
                                }}
                            >
                                {hasVideo ? (
                                    <video
                                        ref={videoRef}
                                        src={video}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                    />
                                ) : (
                                    feature.image && (
                                        <img
                                            src={
                                                feature.image
                                            }
                                            alt={
                                                feature.title
                                            }
                                        />
                                    )
                                )}
                            </m.div>
                        </div>

                        <div
                            className={`messages-feature-text-col ${
                                isImageBelow
                                    ? "col-12"
                                    : "col-lg-6 col-12"
                            } ${textOrder}`}
                        >
                            <m.div
                                className="messages-feature-text"
                                initial={{
                                    opacity: 0,
                                    filter:
                                        "blur(12px)",
                                    ...textInitial,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    filter:
                                        "blur(0px)",
                                    x: 0,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                                transition={{
                                    duration: 1.1,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                    ],
                                }}
                            >
                                <h2 className="fsz-35">
                                    {feature.title}
                                </h2>

                                {feature.description && (
                                    <div
                                        className="description col-lg-11"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                feature.description,
                                        }}
                                    />
                                )}
                            </m.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MessagesFeature;