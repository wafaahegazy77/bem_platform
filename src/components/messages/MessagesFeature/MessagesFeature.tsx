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

    const retryTimeoutRef =
        useRef<ReturnType<typeof setTimeout> | null>(
            null
        );

    const [showReplay, setShowReplay] =
        useState(false);

    const [animationComplete, setAnimationComplete] =
        useState(false);

    const [isVisible, setIsVisible] =
        useState(false);

    const hasVideo = Boolean(video);

    useEffect(() => {
        if (!hasVideo) {
            return;
        }

        const element = videoRef.current;

        if (!element) {
            return;
        }

        element.muted = true;
        element.defaultMuted = true;
        element.playsInline = true;

        element.setAttribute(
            "muted",
            ""
        );

        element.setAttribute(
            "playsinline",
            ""
        );

        element.setAttribute(
            "webkit-playsinline",
            ""
        );

        element.playbackRate = 1.5;

        const setPlaybackRate = () => {
            element.playbackRate = 1.5;
        };

        element.addEventListener(
            "loadedmetadata",
            setPlaybackRate
        );

        return () => {
            if (retryTimeoutRef.current) {
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

        const observer =
            new IntersectionObserver(
                ([entry]) => {
                    setIsVisible(
                        entry.isIntersecting
                    );
                },
                {
                    threshold: 0.01,
                }
            );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [hasVideo]);

    useEffect(() => {
        if (
            !hasVideo ||
            !animationComplete ||
            !isVisible
        ) {
            return;
        }

        const element = videoRef.current;

        if (!element) {
            return;
        }

        if (retryTimeoutRef.current) {
            clearTimeout(
                retryTimeoutRef.current
            );
        }

        element.muted = true;
        element.defaultMuted = true;
        element.playsInline = true;
        element.playbackRate = 1.5;

        element.setAttribute(
            "muted",
            ""
        );

        element.setAttribute(
            "playsinline",
            ""
        );

        element.setAttribute(
            "webkit-playsinline",
            ""
        );

        element.autoplay = true;

        const startVideo = () => {
            if (!isVisible) {
                return;
            }

            element.muted = true;
            element.defaultMuted = true;
            element.playbackRate = 1.5;

            const playPromise =
                element.play();

            if (
                playPromise !== undefined
            ) {
                playPromise.catch(() => {
                    if (
                        retryTimeoutRef.current
                    ) {
                        clearTimeout(
                            retryTimeoutRef.current
                        );
                    }

                    retryTimeoutRef.current =
                        setTimeout(() => {
                            if (
                                isVisible &&
                                !element.ended
                            ) {
                                startVideo();
                            }
                        }, 250);
                });
            }
        };

        const handleCanPlay = () => {
            startVideo();
        };

        const handleLoadedData = () => {
            startVideo();
        };

        const handlePlaying = () => {
            setShowReplay(false);

            if (
                retryTimeoutRef.current
            ) {
                clearTimeout(
                    retryTimeoutRef.current
                );

                retryTimeoutRef.current =
                    null;
            }
        };

        const handleWaiting = () => {
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
                    startVideo();
                }, 250);
        };

        const handleStalled = () => {
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
                    startVideo();
                }, 250);
        };

        element.addEventListener(
            "canplay",
            handleCanPlay
        );

        element.addEventListener(
            "loadeddata",
            handleLoadedData
        );

        element.addEventListener(
            "playing",
            handlePlaying
        );

        element.addEventListener(
            "waiting",
            handleWaiting
        );

        element.addEventListener(
            "stalled",
            handleStalled
        );

        startVideo();

        return () => {
            element.removeEventListener(
                "canplay",
                handleCanPlay
            );

            element.removeEventListener(
                "loadeddata",
                handleLoadedData
            );

            element.removeEventListener(
                "playing",
                handlePlaying
            );

            element.removeEventListener(
                "waiting",
                handleWaiting
            );

            element.removeEventListener(
                "stalled",
                handleStalled
            );

            if (
                retryTimeoutRef.current
            ) {
                clearTimeout(
                    retryTimeoutRef.current
                );

                retryTimeoutRef.current =
                    null;
            }
        };
    }, [
        hasVideo,
        animationComplete,
        isVisible,
    ]);

    useEffect(() => {
        if (!hasVideo) {
            return;
        }

        const element = videoRef.current;

        if (!element) {
            return;
        }

        if (!isVisible) {
            element.pause();

            if (
                retryTimeoutRef.current
            ) {
                clearTimeout(
                    retryTimeoutRef.current
                );

                retryTimeoutRef.current =
                    null;
            }
        }
    }, [
        hasVideo,
        isVisible,
    ]);

    const handleVideoEnd = () => {
        setShowReplay(true);
    };

    const handleReplay = () => {
        const element = videoRef.current;

        if (!element) {
            return;
        }

        if (!isVisible) {
            return;
        }

        if (
            retryTimeoutRef.current
        ) {
            clearTimeout(
                retryTimeoutRef.current
            );

            retryTimeoutRef.current =
                null;
        }

        setShowReplay(false);

        element.muted = true;
        element.defaultMuted = true;
        element.playsInline = true;
        element.playbackRate = 1.5;

        element.currentTime = 0;

        element
            .play()
            .catch(() => {});
    };

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
        <section>
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
                                    amount: 0.01,
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
                                onAnimationComplete={() => {
                                    if (hasVideo) {
                                        setAnimationComplete(
                                            true
                                        );
                                    }
                                }}
                            >
                                {hasVideo ? (
                                    <div className="messages-feature-video">
                                        <video
                                            ref={
                                                videoRef
                                            }
                                            src={video}
                                            muted
                                            playsInline
                                            autoPlay={
                                                animationComplete
                                            }
                                            preload="metadata"
                                            onEnded={
                                                handleVideoEnd
                                            }
                                        />

                                        {showReplay && (
                                            <button
                                                type="button"
                                                className="messages-feature-replay"
                                                onClick={
                                                    handleReplay
                                                }
                                                aria-label="Replay video"
                                            >
                                                <i className="fa-light fa-rotate-right" />
                                            </button>
                                        )}
                                    </div>
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
                                    amount: 0.01,
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