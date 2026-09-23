import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import { Link } from "@/i18n/routing";
import "./_Footer.scss";
import FooterLanguage from "./FooterLanguage";
import Reveal from "@/components/animations/Reveal";

const Footer = async () => {
    const locale = await getLocale();
    const t = await getTranslations("footer");

    const footerResponse = await api.getPage("footer", locale);
    const servicesResponse = await api.getServices(locale);

    const footerData = footerResponse.data;
    const services = servicesResponse.data || [];

    const apps = [
        {
            name: t("apps.apple"),
            icon: "/images/icons/apple.svg",
            href: "#",
        },
        {
            name: t("apps.google"),
            icon: "/images/icons/google.svg",
            href: "#",
        },
        {
            name: t("apps.windows"),
            icon: "/images/icons/windows.svg",
            href: "#",
        },
        {
            name: t("apps.mac"),
            icon: "/images/icons/mac.svg",
            href: "#",
        },
    ];

    return (
        <footer className="footer">
            <div className="container">

                <div className="foot-top d-flex align-items-center justify-content-between pb-70">

                    <div className="info col-lg-6">

                        <Reveal
                            animation="fade-left-blur"
                            duration={1.1}
                        >
                            <div
                                className="text fsz-21"
                                dangerouslySetInnerHTML={{
                                    __html: footerData.content || "",
                                }}
                            />
                        </Reveal>

                    </div>

                    <div className="btns d-flex gap-3">

                        <Reveal
                            animation="fade-up"
                            delay={0.15}
                            duration={0.9}
                        >
                            <Link
                                href="/pricing"
                                className="butn primary_butn rounded-pill hvr-txt-trans hvr-scale fw-bold"
                            >
                                <div
                                    className="txt mx-3"
                                    data-text={t("choosePlan")}
                                >
                                    <span>{t("choosePlan")}</span>
                                </div>
                            </Link>
                        </Reveal>

                        <Reveal
                            animation="fade-down"
                            delay={0.25}
                            duration={0.9}
                        >
                            <Link
                                href="/contact"
                                className="butn secondary_border_butn rounded-pill hvr-txt-trans hvr-scale fw-bold"
                            >
                                <div
                                    className="txt mx-3"
                                    data-text={t("contact")}
                                >
                                    <span>{t("contact")}</span>
                                </div>
                            </Link>
                        </Reveal>

                    </div>
                </div>

                <div className="foot-mid d-flex align-items-center justify-content-between py-5 col-lg-11 mx-auto border-bottom border-dr-1">

                    <FooterLanguage />

                    <div className="socials d-flex align-items-center gap-3">

                        <a
                            href="#"
                            className="color_primary fsz-20"
                            aria-label="Instagram"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>

                        <a
                            href="#"
                            className="color_primary fsz-20"
                            aria-label="LinkedIn"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>

                        <a
                            href="#"
                            className="color_primary fsz-20"
                            aria-label="X"
                        >
                            <i className="fab fa-x-twitter"></i>
                        </a>

                        <a
                            href="#"
                            className="color_primary fsz-20"
                            aria-label="Facebook"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>

                    </div>
                </div>

                <div className="foot-links mt-50 col-lg-11 mx-auto">

                    <div className="row justify-content-between">

                        <div className="col-lg-5 col-md-6 mb-40">

                            <div className="brand">

                                <a
                                    href="#"
                                    className="logo d-inline-block"
                                >
                                    <img
                                        src="/images/logo.svg"
                                        alt="Beem"
                                        className="th-40"
                                    />
                                </a>

                                <div className="isos d-flex align-items-center gap-3 mt-50">

                                    <img
                                        src="/images/iso1.svg"
                                        alt="ISO 9001"
                                        className="icon-80"
                                    />

                                    <img
                                        src="/images/iso2.svg"
                                        alt="ISO 22301"
                                        className="icon-80"
                                    />

                                    <img
                                        src="/images/iso3.svg"
                                        alt="ISO 27001"
                                        className="icon-80"
                                    />

                                </div>

                                <img
                                    src="/images/foot-logo-light.png"
                                    alt=""
                                    className="government-logo mt-70"
                                />

                            </div>

                        </div>

                        <div className="col-lg-2 col-md-6 mb-40">


                            <div>

                                <h5 className="title fsz-18 fw-800 color_primary mb-20">
                                    {t("services")}
                                </h5>

                                <ul className="links">

                                    {services.map((service: any) => (
                                        <li key={service.code}>
                                            <Link
                                                href={`/services/${service.slug}`}
                                            >
                                                {service.name}
                                            </Link>
                                        </li>
                                    ))}

                                </ul>

                            </div>

                        </div>

                        <div className="col-lg-2 col-6 mb-40">

                            <div>

                                <h5 className="title fsz-18 fw-800 color_primary mb-20">
                                    {t("about")}
                                </h5>

                                <ul className="links">

                                    <li>
                                        <Link href="/help-center">
                                            {t("helpCenter")}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/contact">
                                            {t("contact")}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/terms">
                                            {t("terms")}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/privacy">
                                            {t("privacy")}
                                        </Link>
                                    </li>

                                </ul>

                            </div>

                        </div>

                        <div className="col-lg-2 col-6 mb-40">


                            <div>

                                <h5 className="fsz-18 fw-800 color_primary mb-20">
                                    {t("download")}
                                </h5>

                                <ul className="links">

                                    {apps.map((app) => (
                                        <li key={app.name}>
                                            <a href={app.href}>
                                                {app.name}
                                            </a>
                                        </li>
                                    ))}

                                </ul>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="copy text-center fsz-15 mt-60">
                    2026 © Beem Digital Ltd.
                </div>

            </div>
        </footer>
    );
};

export default Footer;