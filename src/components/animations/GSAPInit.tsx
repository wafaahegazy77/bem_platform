"use client";

import { useEffect } from "react";
import { initGSAPAnimations } from "./gsap";

const GSAPInit = () => {
    useEffect(() => {
        let cleanup: (() => void) | undefined;
        let initialized = false;

        const initialize = () => {
            if (initialized) {
                return;
            }

            initialized = true;

            requestAnimationFrame(() => {
                cleanup = initGSAPAnimations();
            });
        };

        const handleLoaderFinished = () => {
            initialize();
        };

        const handleWindowLoad = () => {
            const loader = document.querySelector(
                ".page_loader"
            );

            if (!loader) {
                initialize();
            }
        };

        window.addEventListener(
            "beem-loader-finished",
            handleLoaderFinished
        );

        window.addEventListener(
            "load",
            handleWindowLoad,
            { once: true }
        );

        const loader = document.querySelector(
            ".page_loader"
        );

        if (!loader && document.readyState === "complete") {
            initialize();
        }

        return () => {
            window.removeEventListener(
                "beem-loader-finished",
                handleLoaderFinished
            );

            window.removeEventListener(
                "load",
                handleWindowLoad
            );

            cleanup?.();
        };
    }, []);

    return null;
};

export default GSAPInit;