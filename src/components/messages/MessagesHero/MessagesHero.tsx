"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { m } from "motion/react";
import "./_MessagesHero.scss";

type MessagesHeroProps = {
    service: {
        name: string;
        icon: string;
        theme_color: string;
        inner_page: {
            title: string;
            description: string | null;
        };
    };
    video: string;
};

const hexToRgba = (
    hex: string,
    opacity: number
) => {
    const value = hex.replace("#", "");

    const r = parseInt(
        value.substring(0, 2),
        16
    );

    const g = parseInt(
        value.substring(2, 4),
        16
    );

    const b = parseInt(
        value.substring(4, 6),
        16
    );

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const MessagesHero = ({
    service,
    video,
}: MessagesHeroProps) => {
    const t = useTranslations("ServiceHero");

    const videoRef =
        useRef<HTMLVideoElement | null>(null);

    const retryTimeoutRef =
        useRef<ReturnType<typeof setTimeout> | null>(
            null
        );

    const [animationComplete, setAnimationComplete] =
        useState(false);

    const [showReplay, setShowReplay] =
        useState(false);

    const [isVisible, setIsVisible] =
        useState(true);

    const themeColor = hexToRgba(
        service.theme_color,
        0.4
    );

    useEffect(() => {
        const element = videoRef.current;

        if (!element) {
            return;
        }

        element.muted = true;
        element.defaultMuted = true;
        element.playsInline = true;
        element.playbackRate = 1.7;

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

        const setPlaybackRate = () => {
            element.playbackRate = 1.7;
        };

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
                    threshold: 0.01,
                }
            );

        observer.observe(element);

        return () => {
            observer.disconnect();

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
    }, []);

    useEffect(() => {
        if (
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
        element.playbackRate = 1.7;
        element.autoplay = true;

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

        const startVideo = () => {
            if (!isVisible) {
                return;
            }

            element.muted = true;
            element.defaultMuted = true;
            element.playbackRate = 1.7;

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

        setShowReplay(false);

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
        animationComplete,
        isVisible,
    ]);

    useEffect(() => {
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
    }, [isVisible]);

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
        element.playbackRate = 1.7;

        element.currentTime = 0;

        element
            .play()
            .catch(() => {});
    };

    return (
        <section
            className="messages-hero"
            style={{
                background: `linear-gradient(
                    to bottom,
                    ${themeColor} 0%,
                    rgba(255, 255, 255, 0.15) 65%,
                    #ffffff 100%
                )`,
            }}
        >
            <div
                className="messages-hero-floating-icon"
                style={{
                    opacity: 0.06,
                }}
            >
                <img
                    src={service.icon}
                    alt=""
                />
            </div>

            <div className="container">
                <div className="messages-hero-content text-center">
                    <m.div
                        initial={{
                            opacity: 0,
                            scale: 0.7,
                            filter: "blur(12px)",
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        transition={{
                            duration: 0.9,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                    >
                        <div
                            className="messages-hero-name"
                            style={{
                                color:
                                    service.theme_color,
                            }}
                        >
                            <img
                                src={service.icon}
                                alt={service.name}
                            />

                            <span>
                                {service.name}
                            </span>
                        </div>
                    </m.div>

                    <m.h1
                        className="fsz-45"
                        initial={{
                            opacity: 0,
                            y: -60,
                            filter: "blur(12px)",
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.15,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                    >
                        {service.inner_page.title}
                    </m.h1>

                    {service.inner_page
                        .description && (
                        <m.div
                            className="description pt-1"
                            initial={{
                                opacity: 0,
                                y: 50,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.9,
                                delay: 0.25,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}
                        >
                            {
                                service.inner_page
                                    .description
                            }
                        </m.div>
                    )}

                    <m.div
                        initial={{
                            opacity: 0,
                            y: 50,
                            filter: "blur(10px)",
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                        }}
                        transition={{
                            duration: 0.9,
                            delay: 0.4,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                    >
                        <Link
                            href="/pricing"
                            className="butn secondary_border_butn hvr-txt-trans px-4 mx-auto mt-4"
                        >
                            <div
                                className="txt px-2"
                                data-text={t(
                                    "startFree"
                                )}
                            >
                                <span>
                                    {t(
                                        "startFree"
                                    )}
                                </span>
                            </div>
                        </Link>
                    </m.div>

                    <m.div
                        className="messages-hero-video"
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            filter: "blur(14px)",
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.5,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        onAnimationComplete={() =>
                            setAnimationComplete(
                                true
                            )
                        }
                    >
                        <div className="messages-hero-video-wrapper">
                            <video
                                ref={videoRef}
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
                                    className="messages-hero-replay"
                                    onClick={
                                        handleReplay
                                    }
                                    aria-label="Replay video"
                                >
                                    <i className="fa-light fa-rotate-right" />
                                </button>
                            )}
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
    );
};

export default MessagesHero;