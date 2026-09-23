"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import "./_MessagesStepsFeature.scss";

const steps = [
    {
        title: "أختر الرسالة",
        description:
            "اختر المحادثة أو الرسالة أو الملف الذي تريد إعادة توجيهه.",
    },
    {
        title: "أختر المحادثة",
        description:
            "حدد المحادثة التي تريد إعادة توجيه الرسالة إليها.",
    },
    {
        title: "أختر وجهة التوجيه",
        description:
            "حدد وجهة التوجيه المناسبة لإرسال الرسالة إليها.",
    },
    {
        title: "تمت إعادة التوجيه",
        description:
            "تمت إعادة توجيه الرسالة بنجاح إلى الوجهة المحددة.",
    },
];

const STEP_DURATION = 4000;

const MessagesStepsFeature = () => {
    const [activeStep, setActiveStep] =
        useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((currentStep) => {
                if (
                    currentStep >=
                    steps.length - 1
                ) {
                    return 0;
                }

                return currentStep + 1;
            });
        }, STEP_DURATION);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <section className="messages-steps-feature">
            <div className="container">
                <div className="messages-steps-feature-heading">
                    <m.h2
                        className="fsz-45 fw-500"
                        initial={{
                            opacity: 0,
                            y: 35,
                            filter: "blur(10px)",
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                        }}
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 1,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                    >
                        أعد توجية المحادثات فى بضع
                        <br />
                        خطوات بسيطة وأمنة
                    </m.h2>
                </div>

                <div className="messages-steps-feature-content row align-items-center">

                    <div className="messages-steps-col col-lg-6">
                        <div className="messages-steps mt-4 ">
                            <div className="messages-steps-list">
                                {steps.map(
                                    (
                                        step,
                                        index
                                    ) => {
                                        const isActive =
                                            activeStep ===
                                            index;

                                        const isLast =
                                            index ===
                                            steps.length -
                                                1;

                                        return (
                                            <div
                                                className={`messages-step ${
                                                    isActive
                                                        ? "active"
                                                        : ""
                                                }`}
                                                key={
                                                    step.title
                                                }
                                            >
                                                <div className="messages-step-row">
                                                    <div className="messages-step-marker">
                                                        <span className="messages-step-number">
                                                            {String(
                                                                index +
                                                                    1
                                                            ).padStart(
                                                                2,
                                                                "0"
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="messages-step-content">
                                                        <button
                                                            type="button"
                                                            className="messages-step-button"
                                                            onClick={() =>
                                                                setActiveStep(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <span className="messages-step-title">
                                                                {
                                                                    step.title
                                                                }
                                                            </span>
                                                        </button>

                                                        <AnimatePresence
                                                            initial={
                                                                false
                                                            }
                                                        >
                                                            {isActive && (
                                                                <m.div
                                                                    className="messages-step-description"
                                                                    initial={{
                                                                        height: 0,
                                                                        opacity: 0,
                                                                    }}
                                                                    animate={{
                                                                        height: "auto",
                                                                        opacity: 1,
                                                                    }}
                                                                    exit={{
                                                                        height: 0,
                                                                        opacity: 0,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.45,
                                                                        ease: [
                                                                            0.22,
                                                                            1,
                                                                            0.36,
                                                                            1,
                                                                        ],
                                                                    }}
                                                                >
                                                                    {
                                                                        step.description
                                                                    }
                                                                </m.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>

                                                {!isLast && (
                                                    <div className="messages-step-connector">
                                                        <span className="messages-step-connector-base" />

                                                        {isActive && (
                                                            <m.span
                                                                key={`progress-${activeStep}`}
                                                                className="messages-step-connector-progress"
                                                                initial={{
                                                                    scaleY: 0,
                                                                }}
                                                                animate={{
                                                                    scaleY: 1,
                                                                }}
                                                                transition={{
                                                                    duration:
                                                                        STEP_DURATION /
                                                                        1000,
                                                                    ease: "linear",
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="messages-steps-feature-video-col col-lg-6">
                        <m.div
                            className="messages-steps-feature-video"
                            initial={{
                                opacity: 0,
                                x: -50,
                                filter: "blur(12px)",
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                                filter: "blur(0px)",
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 1.1,
                                delay: 0.15,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}
                        >
                            <video
                                src="/videos/vid-4.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                            />
                        </m.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MessagesStepsFeature;