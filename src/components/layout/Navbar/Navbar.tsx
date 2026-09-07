"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import "./_Navbar.scss";

export default function Navbar() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("navbar");

    const isHome = pathname === "/";

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "ar" : "en";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <nav className={`navbar navbar-expand-lg ff-heading ${isHome ? "homeNav" : "innerNav"}`}>
            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand" href="/">
                    <img
                        src={isHome ? "/images/logo-white.svg" : "/images/logo.svg"}
                        alt="Beem"
                        className="logo object-fit-contain"
                        width={100}
                        height={35}
                    />
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    {/* Main Links */}
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link" href="/products">
                                {t("products")}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/pricing">
                                {t("pricing")}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/help-center">
                                {t("help_center")}
                            </Link>
                        </li>

                    </ul>

                    {/* Right Side */}
                    <div className="nav-side d-flex align-items-center">

                        <Link
                            className="login-link fw-medium"
                            href="/login"
                        >
                            {t("login")}
                        </Link>

                        <button
                            type="button"
                            className="language_switcher fw-medium"
                            onClick={toggleLanguage}
                        >
                            <i className="fa-regular fa-globe"></i>

                            <span>
                                {locale === "ar" ? "English" : "عربي"}
                            </span>
                        </button>

                        <Link
                            className="contact-btn butn hvr-txt-trans px-4"
                            href="/contact"
                        >
                            <div className="txt px-2" data-text={t("contact")} >
                                <span>{t("contact")}</span>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    );
}