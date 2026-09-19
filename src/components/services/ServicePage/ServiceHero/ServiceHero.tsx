import Link from "next/link";
import { getTranslations } from "next-intl/server";
import "./_ServiceHero.scss";
import Reveal from "@/components/animations/Reveal";

type ServiceHeroProps = {
    service: {
        name: string;
        icon: string;
        theme_color: string;
        inner_page: {
            title: string;
            description: string | null;
            hero_image: string | null;
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

                    <Reveal
                        animation="zoom-in"
                        duration={0.9}
                    >
                        <div
                            className="service-hero-name"
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
                        duration={1.1}
                    >
                        <h1 className="fsz-45">
                            {service.inner_page.title}
                        </h1>
                    </Reveal>

                    {service.inner_page.description && (
                        <Reveal
                            animation="fade-up"
                            delay={0.25}
                            duration={1}
                        >
                            <div className="description">
                                {service.inner_page.description}
                            </div>
                        </Reveal>
                    )}

                    <Reveal
                        animation="fade-up-blur"
                        delay={0.4}
                        duration={0.9}
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
                        <Reveal
                            animation="zoom-in-up"
                            delay={0.5}
                            duration={1.2}
                        >
                            <div className="service-hero-image">
                                <img
                                    src={service.inner_page.hero_image}
                                    alt={service.inner_page.title}
                                />
                            </div>
                        </Reveal>
                    )}

                </div>
            </div>
        </section>
    );
};

export default ServiceHero;