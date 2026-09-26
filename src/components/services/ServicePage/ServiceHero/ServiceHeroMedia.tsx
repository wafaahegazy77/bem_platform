"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";
import { m } from "motion/react";

type ServiceHeroMediaProps = {
    media: string;
    mediaType: "image" | "video";
    title: string;
};

const ServiceHeroMedia = ({
    media,
    mediaType,
    title,
}: ServiceHeroMediaProps) => {
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

    useEffect(() => {
        if (mediaType !== "video") {
            return;
        }

        const element = videoRef.current;

        if (!element) {
            return;
        }

        element.muted = true;
        element.defaultMuted = true;
        element.playsInline = true;
        element.playbackRate = 1.7;

        element.setAttribute("muted", "");
        element.setAttribute("playsinline", "");
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
    }, [mediaType]);

    useEffect(() => {
        if (
            mediaType !== "video" ||
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

        element.setAttribute("muted", "");
        element.setAttribute("playsinline", "");
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

            const playPromise = element.play();

            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    if (retryTimeoutRef.current) {
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

            if (retryTimeoutRef.current) {
                clearTimeout(
                    retryTimeoutRef.current
                );

                retryTimeoutRef.current = null;
            }
        };

        const handleWaiting = () => {
            if (!isVisible) {
                return;
            }

            if (retryTimeoutRef.current) {
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

            if (retryTimeoutRef.current) {
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

            if (retryTimeoutRef.current) {
                clearTimeout(
                    retryTimeoutRef.current
                );

                retryTimeoutRef.current = null;
            }
        };
    }, [
        mediaType,
        animationComplete,
        isVisible,
    ]);

    useEffect(() => {
        if (mediaType !== "video") {
            return;
        }

        const element = videoRef.current;

        if (!element) {
            return;
        }

        if (!isVisible) {
            element.pause();

            if (retryTimeoutRef.current) {
                clearTimeout(
                    retryTimeoutRef.current
                );

                retryTimeoutRef.current = null;
            }
        }
    }, [mediaType, isVisible]);

    const handleVideoEnd = () => {
        setShowReplay(true);
    };

    const handleReplay = () => {
        const element = videoRef.current;

        if (!element || !isVisible) {
            return;
        }

        if (retryTimeoutRef.current) {
            clearTimeout(
                retryTimeoutRef.current
            );

            retryTimeoutRef.current = null;
        }

        setShowReplay(false);

        element.muted = true;
        element.defaultMuted = true;
        element.playsInline = true;
        element.playbackRate = 1.7;
        element.currentTime = 0;

        element.play().catch(() => {});
    };

    return (
        <m.div
            className="service-hero-image"
            initial={{
                opacity: 0,
                scale: 0.9,
                filter: "blur(14px)",
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
            }}
            viewport={{
                once: true,
                amount: 0.01,
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
                setAnimationComplete(true)
            }
        >
            {mediaType === "video" ? (
                <div className="service-hero-video">
                    <video
                        ref={videoRef}
                        src={media}
                        muted
                        playsInline
                        preload="metadata"
                        onEnded={handleVideoEnd}
                    />

                    {showReplay && (
                        <button
                            type="button"
                            className="service-hero-replay"
                            onClick={handleReplay}
                            aria-label="Replay video"
                        >
                            <i className="fa-light fa-rotate-right" />
                        </button>
                    )}
                </div>
            ) : (
                <img
                    src={media}
                    alt={title}
                />
            )}
        </m.div>
    );
};

export default ServiceHeroMedia;