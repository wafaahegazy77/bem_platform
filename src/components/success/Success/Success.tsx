"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Reveal from "@/components/animations/Reveal";
import "./_Success.scss";

type SuccessType = "basic" | "professional";

type SuccessProps = {
    type?: string;
};

const Success = ({ type }: SuccessProps) => {
    const t = useTranslations("success");

    const successType: SuccessType =
        type === "professional"
            ? "professional"
            : "basic";

    const isBasic = successType === "basic";

    return (
        <main className="success-page">
            <Navbar auth />

            <div className="success-content">
                <div className="container">

                    <Reveal
                        animation="zoom-in"
                    >
                        <div className="success-card text-center col-lg-6 mx-auto">

                            <Reveal
                                animation="zoom-in"
                            >
                                <div className="success-icon">
                                    <i
                                        className={
                                            isBasic
                                                ? "fa-light fa-check"
                                                : "fa-light fa-check"
                                        }
                                    />
                                </div>
                            </Reveal>

                            <Reveal
                                animation="fade-down-blur"
                                delay={0.15}
                            >
                                <h1 className="success-title fsz-30 fw-600">
                                    {isBasic
                                        ? t("basic.title")
                                        : t("professional.title")}
                                </h1>
                            </Reveal>

                            <Reveal
                                animation="fade-up"
                                delay={0.25}
                            >
                                <p className="success-description fsz-14 cr-999 col-lg-10 mx-auto mt-4 mb-5">
                                    {isBasic
                                        ? t("basic.description")
                                        : t("professional.description")}
                                </p>
                            </Reveal>

                            {isBasic && (
                                <Reveal
                                    animation="fade-up-blur"
                                    delay={0.35}
                                >
                                    <div className="success-summary">

                                        <h2 className="summary-title fsz-20 fw-600">
                                            <i className="fa-light fa-rectangle-list" />
                                            {t("orderSummary")}
                                        </h2>

                                        <div className="summary-row">
                                            <span>
                                                {t("package")}
                                            </span>

                                            <strong>
                                                {t("basic.package")}
                                            </strong>
                                        </div>

                                        <div className="summary-row">
                                            <span>
                                                {t("amount")}
                                            </span>

                                            <div className="summary-price">
                                                <img
                                                    src="/images/sar.png"
                                                    alt="SAR"
                                                />

                                                <strong>
                                                    0.00
                                                </strong>
                                            </div>
                                        </div>

                                    </div>
                                </Reveal>
                            )}
                            <Reveal
                                animation="fade-up-blur"
                                delay={0.6}
                            >
                                <p className="success-footer fsz-18 cr-666 mb-3">
                                    {t("downloadPrompt")}{" "}
                                    <Link href="/download">
                                        {t("downloadApp")}
                                    </Link>
                                </p>
                            </Reveal>
                            <Reveal
                                animation="fade-up"
                                delay={0.5}
                            >
                                <Link
                                    href="/"
                                    className="success-button butn primary_butn rounded-pill hvr-txt-trans mx-auto mt-4 fsz-20"
                                >
                                    <div
                                        className="txt px-4"
                                        data-text={t("goToBeem")}
                                    >
                                        <span>
                                            {t("goToBeem")}
                                        </span>
                                    </div>
                                </Link>
                            </Reveal>



                        </div>
                    </Reveal>

                </div>
            </div>
        </main>
    );
};

export default Success;