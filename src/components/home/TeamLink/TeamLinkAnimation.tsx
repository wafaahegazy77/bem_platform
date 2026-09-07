"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

interface Service {
    code: string;
    name: string;
    icon?: string | null;
}

interface TeamLinkAnimationProps {
    services: Service[];
}

const TeamLinkAnimation = ({
    services,
}: TeamLinkAnimationProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const pathsGroupRef = useRef<SVGGElement>(null);

    useEffect(() => {
        const nw = wrapperRef.current;
        const pg = pathsGroupRef.current;

        if (!nw || !pg || services.length === 0) {
            return;
        }

        let tweens: gsap.core.Tween[] = [];
        let resizeTimeout: ReturnType<typeof setTimeout>;

        const hoverHandlers: {
            node: HTMLElement;
            enter: () => void;
            leave: () => void;
        }[] = [];

        const build = () => {
            tweens.forEach((tween) => tween.kill());
            tweens = [];

            hoverHandlers.forEach(({ node, enter, leave }) => {
                node.removeEventListener("mouseenter", enter);
                node.removeEventListener("mouseleave", leave);
            });

            hoverHandlers.length = 0;
            pg.innerHTML = "";

            const W = nw.offsetWidth || 680;
            const H = nw.offsetHeight || 400;

            const NW = 80;

            const cx = W / 2;
            const cy = H / 2;

            const svgW = 1040;
            const svgH = 400;

            const sx = svgW / W;
            const sy = svgH / H;

            const gapY = H * 0.3;

            const yTop = cy - gapY - NW / 2;
            const yBot = cy + gapY - NW / 2;

            const sideGap = W * 0.46;

            const xFarL = cx - sideGap;
            const xInL = cx - sideGap * 0.42;

            const xInR = cx + sideGap * 0.42 - NW;
            const xFarR = cx + sideGap - NW;

            const positions = [
                { x: xFarL, y: yTop },
                { x: xInL, y: yTop },
                { x: xInR, y: yTop },
                { x: xFarR, y: yTop },
                { x: xFarL, y: yBot },
                { x: xInL, y: yBot },
                { x: xInR, y: yBot },
                { x: xFarR, y: yBot },
            ];

            for (let i = 0; i < services.length; i++) {
                const node = document.getElementById(`n${i}`);

                if (!node) {
                    continue;
                }

                node.style.left = `${positions[i].x}px`;
                node.style.top = `${positions[i].y}px`;
                node.style.transform = "none";
            }

            const toSvg = (x: number, y: number) => ({
                x: x * sx,
                y: y * sy,
            });

            const C = toSvg(cx, cy);
            const R = 30;

            const startOffsets = [
                -100,
                -100,
                -100,
                -100,
                100,
                100,
                100,
                100,
            ];

            const makePath = (ni: number) => {
                const p = positions[ni];

                const N = toSvg(
                    p.x + NW / 2,
                    p.y + NW / 2
                );

                const isLeft = N.x < C.x;
                const isTop = N.y < C.y;

                const signX = isLeft ? -1 : 1;
                const signY = isTop ? -1 : 1;

                const startY =
                    C.y + startOffsets[ni] * sy;

                const exitDist = 50 * sx;

                const exitX =
                    C.x + signX * exitDist;

                const exitY = startY;

                const cp1x =
                    C.x + signX * -1 * sx;

                const cp1y =
                    startY + signY * -100 * sy;

                const cp2x =
                    exitX - signX * 12 * sx;

                const cp2y = exitY;

                const cornerX = N.x;
                const cornerY = startY;

                return [
                    `M ${C.x} ${startY}`,
                    `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${exitX} ${exitY}`,
                    `L ${cornerX - signX * R} ${cornerY}`,
                    `Q ${cornerX} ${cornerY} ${cornerX} ${cornerY + signY * R}`,
                    `L ${N.x} ${N.y}`,
                ].join(" ");
            };

            for (let i = 0; i < services.length; i++) {
                const d = makePath(i);

                const path =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );

                path.setAttribute("d", d);
                path.setAttribute("fill", "none");
                path.setAttribute(
                    "stroke",
                    "rgba(100,120,200,0.15)"
                );
                path.setAttribute("stroke-width", "1.5");
                path.setAttribute("id", `path${i}`);

                pg.appendChild(path);

                [
                    {
                        r: 5,
                        color: "#7c8ef5",
                        opacity: 0.9,
                    },
                    {
                        r: 3,
                        color: "#7c8ef5",
                        opacity: 0.4,
                    },
                ].forEach((config, j) => {
                    const dot =
                        document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "circle"
                        );

                    dot.setAttribute("r", `${config.r}`);
                    dot.setAttribute("fill", config.color);
                    dot.style.opacity =
                        `${config.opacity}`;

                    pg.appendChild(dot);

                    const tween = gsap.fromTo(
                        dot,
                        {
                            motionPath: {
                                path,
                                align: path,
                                alignOrigin: [0.5, 0.5],
                                start: 1,
                                end: 1,
                            },
                        },
                        {
                            duration:
                                2 + Math.random() * 1.5,
                            repeat: -1,
                            ease: "power1.inOut",
                            delay:
                                i * 0.35 +
                                j * 0.15 +
                                Math.random() * 0.4,
                            motionPath: {
                                path,
                                align: path,
                                autoRotate: false,
                                alignOrigin: [0.5, 0.5],
                                start: 1,
                                end: 0,
                            },
                        }
                    );

                    tweens.push(tween);
                });

                const node = document.getElementById(
                    `n${i}`
                );

                if (!node) {
                    continue;
                }

                const enter = () => {
                    gsap.to(path, {
                        attr: {
                            stroke:
                                "rgba(99,102,241,0.55)",
                            "stroke-width": 2.5,
                        },
                        duration: 0.3,
                    });

                    gsap.to(node, {
                        scale: 1.07,
                        duration: 0.3,
                    });

                    node.style.borderColor =
                        "rgba(99,102,241,0.4)";
                };

                const leave = () => {
                    gsap.to(path, {
                        attr: {
                            stroke:
                                "rgba(100,120,200,0.15)",
                            "stroke-width": 1.5,
                        },
                        duration: 0.3,
                    });

                    gsap.to(node, {
                        scale: 1,
                        duration: 0.3,
                    });

                    node.style.borderColor =
                        "rgba(91,130,200,0.2)";
                };

                node.addEventListener(
                    "mouseenter",
                    enter
                );

                node.addEventListener(
                    "mouseleave",
                    leave
                );

                hoverHandlers.push({
                    node,
                    enter,
                    leave,
                });
            }
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(() => {
                build();
            }, 100);
        };

        build();

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            clearTimeout(resizeTimeout);

            window.removeEventListener(
                "resize",
                handleResize
            );

            tweens.forEach((tween) => tween.kill());

            hoverHandlers.forEach(
                ({ node, enter, leave }) => {
                    node.removeEventListener(
                        "mouseenter",
                        enter
                    );

                    node.removeEventListener(
                        "mouseleave",
                        leave
                    );
                }
            );

            hoverHandlers.length = 0;

            pg.innerHTML = "";
        };
    }, [services]);

    return (
        <div className="lines-shap">
            <div className="team-animation">

                <svg
                    ref={svgRef}
                    className="team-svg"
                    viewBox="0 0 1040 400"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g ref={pathsGroupRef}></g>
                </svg>

                <div
                    ref={wrapperRef}
                    className="team-nodes"
                >
                    <div className="team-center">
                        <div className="team-center-logo">
                            <img
                                src="/images/favicon.svg"
                                alt=""
                                className="th-60"
                            />
                        </div>
                    </div>

                    {services.map((service, index) => (
                        <div
                            key={service.code}
                            id={`n${index}`}
                            className="sn"
                        >
                            {service.icon && (
                                <img
                                    src={service.icon}
                                    alt={service.name}
                                    className="icon-30"
                                />
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TeamLinkAnimation;