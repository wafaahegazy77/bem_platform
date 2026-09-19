"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(
        SplitText,
        ScrollTrigger
    );
}

const titleReveal = (element: HTMLElement) => {
    const split = SplitText.create(element, {
        type: "lines",
        mask: "lines",
        linesClass: "gsap-title-line",
        aria: "none",
        autoSplit: true,

        onSplit(self) {
            self.masks.forEach((mask) => {
                gsap.set(mask, {
                    paddingBlock: "0.2em",
                    marginBlock: "-0.2em",
                });
            });

            gsap.set(self.lines, {
                transformPerspective: 1000,
                transformOrigin: "50% 100%",
                willChange:
                    "transform, opacity, filter",
            });

            return gsap.fromTo(
                self.lines,
                {
                    yPercent: 115,
                    rotateX: -55,
                    skewY: 4,
                    scaleY: 1.12,
                    opacity: 0.15,
                    filter: "blur(8px)",
                },
                {
                    yPercent: 0,
                    rotateX: 0,
                    skewY: 0,
                    scaleY: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.2,
                    stagger: 0.12,
                    ease: "expo.out",
                    force3D: true,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        once: true,
                    },
                }
            );
        },
    });

    return () => {
        split.revert();
    };
};

const fadeUp = (element: HTMLElement) => {
    return gsap.fromTo(
        element,
        {
            opacity: 0,
            y: 60,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true,
            },
        }
    );
};

const fadeIn = (element: HTMLElement) => {
    return gsap.fromTo(
        element,
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true,
            },
        }
    );
};

const scaleIn = (element: HTMLElement) => {
    return gsap.fromTo(
        element,
        {
            opacity: 0,
            scale: 0.85,
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true,
            },
        }
    );
};

const slideLeft = (element: HTMLElement) => {
    return gsap.fromTo(
        element,
        {
            opacity: 0,
            x: -80,
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true,
            },
        }
    );
};

const slideRight = (element: HTMLElement) => {
    return gsap.fromTo(
        element,
        {
            opacity: 0,
            x: 80,
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true,
            },
        }
    );
};

const initGSAPAnimations = () => {
    if (typeof window === "undefined") {
        return;
    }

    const cleanups: (() => void)[] = [];

    document
        .querySelectorAll<HTMLElement>(
            ".gsap-title-reveal"
        )
        .forEach((element) => {
            cleanups.push(titleReveal(element));
        });

    document
        .querySelectorAll<HTMLElement>(
            ".gsap-text-reveal"
        )
        .forEach((element) => {
            const split = SplitText.create(element, {
                type: "lines",
                mask: "lines",
                linesClass: "gsap-text-line",
                aria: "none",
                autoSplit: true,

                onSplit(self) {
                    self.masks.forEach((mask) => {
                        gsap.set(mask, {
                            paddingBlock: "0.12em",
                            marginBlock: "-0.12em",
                        });
                    });

                    return gsap.from(self.lines, {
                        yPercent: 110,
                        duration: 1.15,
                        stagger: 0.1,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            once: true,
                        },
                    });
                },
            });

            cleanups.push(() => {
                split.revert();
            });
        });

    document
        .querySelectorAll<HTMLElement>(
            ".gsap-fade-up"
        )
        .forEach((element) => {
            const animation = fadeUp(element);

            cleanups.push(() => {
                animation.kill();
            });
        });

    document
        .querySelectorAll<HTMLElement>(
            ".gsap-fade-in"
        )
        .forEach((element) => {
            const animation = fadeIn(element);

            cleanups.push(() => {
                animation.kill();
            });
        });

    document
        .querySelectorAll<HTMLElement>(
            ".gsap-scale-in"
        )
        .forEach((element) => {
            const animation = scaleIn(element);

            cleanups.push(() => {
                animation.kill();
            });
        });

    document
        .querySelectorAll<HTMLElement>(
            ".gsap-slide-left"
        )
        .forEach((element) => {
            const animation = slideLeft(element);

            cleanups.push(() => {
                animation.kill();
            });
        });

    document
        .querySelectorAll<HTMLElement>(
            ".gsap-slide-right"
        )
        .forEach((element) => {
            const animation = slideRight(element);

            cleanups.push(() => {
                animation.kill();
            });
        });

    ScrollTrigger.refresh();

    return () => {
        cleanups.forEach((cleanup) => {
            cleanup();
        });

        ScrollTrigger.getAll().forEach((trigger) => {
            trigger.kill();
        });
    };
};

export {
    initGSAPAnimations,
    gsap,
    ScrollTrigger,
};