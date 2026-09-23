"use client";

import { useEffect, useRef, useState } from "react";
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

    const [isVisible, setIsVisible] =
        useState(false);

    const [animationComplete, setAnimationComplete] =
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

        element.playbackRate = 1.4;

        const observer =
            new IntersectionObserver(
                ([entry]) => {
                    setIsVisible(
                        entry.isIntersecting
                    );

                    if (!entry.isIntersecting) {
                        element.pause();
                    }
                },
                {
                    threshold: 0.2,
                }
            );

        observer.observe(element);

        return () => {
            observer.disconnect();
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

        element.playbackRate = 1.4;

        if (
            isVisible &&
            animationComplete
        ) {
            element.play().catch(() => {});
        } else {
            element.pause();
        }
    }, [
        hasVideo,
        isVisible,
        animationComplete,
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
                                onAnimationComplete={() =>
                                    setAnimationComplete(
                                        true
                                    )
                                }
                            >
                                {hasVideo ? (
                                    <video
                                        ref={videoRef}
                                        src={video}
                                        muted
                                        // loop
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