"use client";

import { m } from "motion/react";
import { ReactNode } from "react";

export type AnimationType =
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "fade-up-left"
    | "fade-up-right"
    | "fade-down-left"
    | "fade-down-right"
    | "fade-up-blur"
    | "fade-down-blur"
    | "fade-left-blur"
    | "fade-right-blur"
    | "fade-up-left-blur"
    | "fade-up-right-blur"
    | "fade-down-left-blur"
    | "fade-down-right-blur"
    | "zoom-in"
    | "zoom-out"
    | "zoom-in-up"
    | "zoom-in-down"
    | "zoom-in-left"
    | "zoom-in-right"
    | "zoom-out-up"
    | "zoom-out-down"
    | "zoom-out-left"
    | "zoom-out-right"
    | "flip-left"
    | "flip-right"
    | "flip-up"
    | "flip-down"
    | "slide-ltr"
    | "slide-rtl";

type RevealProps = {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    once?: boolean;
    amount?: number;
    className?: string;
    trigger?: "view" | "load";
};

const show = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    filter: "blur(0px)",
};

const fade = (
    x = 0,
    y = 0,
    blur = false
) => ({
    initial: {
        opacity: 0,
        x,
        y,
        ...(blur && {
            filter: "blur(12px)",
        }),
    },

    animate: blur
        ? show
        : {
              opacity: 1,
              x: 0,
              y: 0,
          },
});

const zoom = (
    scale: number,
    x = 0,
    y = 0
) => ({
    initial: {
        opacity: 0,
        scale,
        x,
        y,
    },
    animate: show,
});

const flip = (
    rotateX = 0,
    rotateY = 0
) => ({
    initial: {
        opacity: 0,
        rotateX,
        rotateY,
    },
    animate: show,
});

const slide = (
    direction: "ltr" | "rtl"
) => ({
    initial: {
        opacity: 1,
        x:
            direction === "ltr"
                ? 40
                : -40,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
});

const animations: Record<
    AnimationType,
    any
> = {
    // Fade
    "fade-up": fade(0, 60),
    "fade-down": fade(0, -60),
    "fade-left": fade(-60, 0),
    "fade-right": fade(60, 0),

    "fade-up-left": fade(-60, 60),
    "fade-up-right": fade(60, 60),
    "fade-down-left": fade(-60, -60),
    "fade-down-right": fade(60, -60),

    // Fade with blur
    "fade-up-blur": fade(0, 60, true),
    "fade-down-blur": fade(0, -60, true),
    "fade-left-blur": fade(-60, 0, true),
    "fade-right-blur": fade(60, 0, true),

    "fade-up-left-blur": fade(
        -60,
        60,
        true
    ),
    "fade-up-right-blur": fade(
        60,
        60,
        true
    ),
    "fade-down-left-blur": fade(
        -60,
        -60,
        true
    ),
    "fade-down-right-blur": fade(
        60,
        -60,
        true
    ),

    // Zoom
    "zoom-in": zoom(0.7),

    "zoom-in-up": zoom(
        0.7,
        0,
        60
    ),
    "zoom-in-down": zoom(
        0.7,
        0,
        -60
    ),
    "zoom-in-left": zoom(
        0.7,
        -60
    ),
    "zoom-in-right": zoom(
        0.7,
        60
    ),

    "zoom-out": zoom(1.3),

    "zoom-out-up": zoom(
        1.3,
        0,
        60
    ),
    "zoom-out-down": zoom(
        1.3,
        0,
        -60
    ),
    "zoom-out-left": zoom(
        1.3,
        -60
    ),
    "zoom-out-right": zoom(
        1.3,
        60
    ),

    // Flip
    "flip-left": flip(0, -90),
    "flip-right": flip(0, 90),
    "flip-up": flip(-90, 0),
    "flip-down": flip(90, 0),

    // Slide
    "slide-ltr": slide("ltr"),
    "slide-rtl": slide("rtl"),
};

export default function Reveal({
    children,
    animation = "fade-up",
    delay = 0,
    duration = 1.5,
    once = true,
    amount = 0.2,
    className,
    trigger = "view",
}: RevealProps) {
    const variant =
        animations[animation];

    return (
        <m.div
            className={className}
            initial={variant.initial}
            animate={
                trigger === "load"
                    ? variant.animate
                    : undefined
            }
            whileInView={
                trigger === "view"
                    ? variant.animate
                    : undefined
            }
            viewport={{
                once,
                amount,
            }}
            transition={{
                duration,
                delay,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                ],
            }}
            style={{
                transformStyle:
                    "preserve-3d",
            }}
        >
            {children}
        </m.div>
    );
}