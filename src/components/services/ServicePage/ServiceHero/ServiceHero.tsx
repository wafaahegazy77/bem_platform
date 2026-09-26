import Link from "next/link";
import { getTranslations } from "next-intl/server";
import "./_ServiceHero.scss";
import Reveal from "@/components/animations/Reveal";
import ServiceHeroMedia from "./ServiceHeroMedia";

type ServiceHeroProps = {
    service: {
        name: string;
        icon: string;
        theme_color: string;
        inner_page: {
            title: string;
            description: string | null;
            hero_image: string | null;
            hero_image_media_type: "image" | "video";
        };
    };
};

const hexToRgba = (hex: string, opacity: number) => {
    const value = hex.replace("#", "");

    const r = parseInt(value.substring(0, 2), 16);
    const g = parseInt(value.substring(2, 4), 16);
    const b = parseInt(value.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const ServiceHero = async ({ service }: ServiceHeroProps) => {
    const t = await getTranslations("ServiceHero");
    const themeColor = hexToRgba(service.theme_color, 0.4);

    return (
        <section
            className="service-hero"
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
                className="service-hero-floating-icon"
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
                <div className="service-hero-content text-center">

                    <Reveal animation="zoom-in">
                        <div
                            className="service-hero-name fsz-15"
                            style={{
                                color: service.theme_color,
                            }}
                        >
                            <img
                                src={service.icon}
                                alt={service.name}
                            />

                            <span>{service.name}</span>
                        </div>
                    </Reveal>

                    <Reveal
                        animation="fade-down-blur"
                        delay={0.15}
                    >
                        <h1 className="fsz-55">
                            {service.inner_page.title}
                        </h1>
                    </Reveal>

                    {service.inner_page.description && (
                        <Reveal
                            animation="fade-up"
                            delay={0.25}
                        >
                            <div className="description fsz-18 color_secondary op-7 mt-4">
                                {service.inner_page.description}
                            </div>
                        </Reveal>
                    )}

                    <Reveal
                        animation="fade-up-blur"
                        delay={0.4}
                    >
                        <Link
                            href="/pricing"
                            className="butn secondary_border_butn hvr-txt-trans px-4 mx-auto mt-4"
                        >
                            <div
                                className="txt px-2"
                                data-text={t("startFree")}
                            >
                                <span>{t("startFree")}</span>
                            </div>
                        </Link>
                    </Reveal>

                    {service.inner_page.hero_image && (
                        <ServiceHeroMedia
                            media={
                                service.inner_page.hero_image
                            }
                            mediaType={
                                service.inner_page
                                    .hero_image_media_type
                            }
                            title={
                                service.inner_page.title
                            }
                        />
                    )}

                </div>
            </div>
        </section>
    );
};

export default ServiceHero;