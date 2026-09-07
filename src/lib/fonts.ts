import localFont from "next/font/local";

export const diodrum  = localFont({
    src: [
        {
            path: "../../public/fonts/diodrum/light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/diodrum/regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/diodrum/medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/diodrum/semibold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/diodrum/bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/diodrum/extralight.ttf",
            weight: "200",
            style: "normal",
        },
    ],
    variable: "--font-diodrum",
    display: "swap",
});