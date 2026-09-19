import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { api } from "@/lib/api";
import "./_PricingPlans.scss";
import Reveal from "@/components/animations/Reveal";

type Package = {
    code: string;
    type: string;
    type_label: string;
    title: string;
    details: string | null;
    description: string | null;
    is_free: number | boolean;
    has_price: boolean;
    has_features: boolean;
    cost: number | null;
    discount: number | null;
    discount_type: string | null;
    final_cost: number | null;
};

const PricingPlans = async () => {
    const locale = await getLocale();
    const t = await getTranslations("pricing");

    const response = await api.getPackages(locale);

    const packages: Package[] = response?.data || [];
    const visiblePackages = packages.slice(0, 3);

    const getCardAnimation = (index: number) => {
        if (index === 0) {
            return "fade-left-blur" as const;
        }

        if (index === 1) {
            return "fade-up-blur" as const;
        }

        return "fade-right-blur" as const;
    };

    return (
        <section className="pricing-cards section-padding">
            <div className="container">

                <Reveal
                    animation="fade-up-blur"
                    duration={1}
                >
                    <ul
                        className="nav nav-pills pricing-tabs p-1 mx-auto mb-50 flex-nowrap"
                        id="pricingTabs"
                        role="tablist"
                    >
                        <li
                            className="nav-item"
                            role="presentation"
                        >
                            <button
                                className="nav-link active fsz-14 fw-700"
                                id="monthly-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#monthly-pane"
                                type="button"
                                role="tab"
                                aria-controls="monthly-pane"
                                aria-selected="true"
                                tabIndex={0}
                            >
                                {t("monthly")}
                            </button>
                        </li>

                        <li
                            className="nav-item"
                            role="presentation"
                        >
                            <button
                                className="nav-link fsz-14 fw-700"
                                id="yearly-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#yearly-pane"
                                type="button"
                                role="tab"
                                aria-controls="yearly-pane"
                                aria-selected="false"
                                tabIndex={-1}
                            >
                                {t("yearly")}

                                <span className="color_primary fsz-12 fw-500 mx-1">
                                    ( {t("yearlyDiscount")} 10% )
                                </span>
                            </button>
                        </li>
                    </ul>
                </Reveal>

                <div className="tab-content">

                    <div
                        className="tab-pane fade show active"
                        id="monthly-pane"
                        role="tabpanel"
                        aria-labelledby="monthly-tab"
                    >
                        <div className="row">

                            {visiblePackages.map((plan, index) => {
                                const isFree =
                                    plan.is_free === true ||
                                    plan.is_free === 1;

                                const isContactPlan =
                                    !isFree &&
                                    (!plan.has_price ||
                                        plan.final_cost === null);

                                const isFeatured =
                                    !isFree && !isContactPlan;

                                const isProfessional =
                                    index === 1;

                                const isEnterprise =
                                    index === 2;

                                const planHref = isFree
                                    ? `/apply?package=${plan.code}&type=basic`
                                    : isProfessional
                                      ? `/apply?package=${plan.code}&type=professional`
                                      : isEnterprise
                                        ? `/apply?package=${plan.code}&type=enterprise`
                                        : plan.has_price
                                          ? `/checkout?package=${plan.code}&billing=monthly`
                                          : "/contact";

                                const planButtonText = isFree
                                    ? t("startNow")
                                    : isProfessional
                                      ? t("subscribeNow")
                                      : isEnterprise
                                        ? t("contactTeam")
                                        : plan.has_price
                                          ? t("subscribeNow")
                                          : t("contactTeam");

                                return (
                                    <div
                                        className="col-lg-4 mb-30"
                                        key={plan.code}
                                    >
                                        <Reveal
                                            animation={getCardAnimation(
                                                index
                                            )}
                                            delay={0.1 + index * 0.12}
                                            duration={1.1}
                                        >
                                            <div
                                                className={`item h-100 radius-20 p-40 ${
                                                    isFeatured
                                                        ? "featured"
                                                        : ""
                                                } ${
                                                    isFree
                                                        ? "free-plan"
                                                        : ""
                                                } ${
                                                    isContactPlan
                                                        ? "contact-plan"
                                                        : ""
                                                }`}
                                            >
                                                <h4 className="fsz-22 fw-800 cr-blue mb-15 color_primary">
                                                    {plan.title}
                                                </h4>

                                                {plan.details && (
                                                    <div
                                                        className="fsz-16 mt-15 mb-30 mt-3 mb-4 fw-400"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                plan.details,
                                                        }}
                                                    />
                                                )}

                                                <div className="price mb-10">
                                                    {isFree ? (
                                                        <span className="free-price fsz-50 fw-300">
                                                            {t("free")}
                                                        </span>
                                                    ) : isFeatured &&
                                                      plan.has_price &&
                                                      plan.final_cost !==
                                                          null ? (
                                                        <div className="d-flex align-items-end justify-content-center gap-3">
                                                            <span className="fsz-60 fw-500 color_primary">
                                                                {
                                                                    plan.final_cost
                                                                }

                                                                <span className="fsz-16 ms-1 fw-400">
                                                                    <img
                                                                        src="/images/sar.png"
                                                                        className="sar icon-20 mx-1 filter_primary"
                                                                        alt=""
                                                                    />
                                                                </span>
                                                            </span>

                                                            {plan.cost !==
                                                                null && (
                                                                <del className="fsz-30 fw-400">
                                                                    {
                                                                        plan.cost
                                                                    }

                                                                    <img
                                                                        src="/images/sar.png"
                                                                        className="sar icon-15 mx-1 op-7"
                                                                        alt=""
                                                                    />
                                                                </del>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="contact-price fsz-50 fw-300">
                                                            {t(
                                                                "contactUs"
                                                            )}
                                                        </span>
                                                    )}
                                                </div>

                                                {!isFree &&
                                                    plan.has_price &&
                                                    plan.final_cost !==
                                                        null && (
                                                        <div className="fsz-15 fw-500 mb-30">
                                                            {t(
                                                                "perUserMonthly"
                                                            )}
                                                        </div>
                                                    )}

                                                {isFree && (
                                                    <div className="fsz-13 cr-999 mb-30">
                                                        {t(
                                                            "noCreditCard"
                                                        )}
                                                    </div>
                                                )}

                                                <Link
                                                    href={planHref}
                                                    className={`butn ${
                                                        isFeatured
                                                            ? "primary_butn"
                                                            : "white_border_butn"
                                                    } py-3 rounded-pill hvr-txt-trans fw-bold w-100 d-block`}
                                                >
                                                    <div
                                                        className="txt"
                                                        data-text={
                                                            planButtonText
                                                        }
                                                    >
                                                        <span>
                                                            {
                                                                planButtonText
                                                            }
                                                        </span>
                                                    </div>
                                                </Link>

                                                {plan.description && (
                                                    <div
                                                        className="festures_box text fsz-15 cr-666 mb-10 mt-4"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                plan.description,
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </Reveal>
                                    </div>
                                );
                            })}

                        </div>
                    </div>

                    <div
                        className="tab-pane fade"
                        id="yearly-pane"
                        role="tabpanel"
                        aria-labelledby="yearly-tab"
                    >
                        <div className="row">

                            {visiblePackages.map((plan, index) => {
                                const isFree =
                                    plan.is_free === true ||
                                    plan.is_free === 1;

                                const isContactPlan =
                                    !isFree &&
                                    (!plan.has_price ||
                                        plan.final_cost === null);

                                const isFeatured =
                                    !isFree && !isContactPlan;

                                const isProfessional =
                                    index === 1;

                                const isEnterprise =
                                    index === 2;

                                const yearlyPrice =
                                    plan.cost !== null
                                        ? Number(
                                              (
                                                  plan.cost *
                                                  12 *
                                                  0.9
                                              ).toFixed(2)
                                          )
                                        : null;

                                const planHref = isFree
                                    ? `/apply?package=${plan.code}&type=basic`
                                    : isProfessional
                                      ? `/apply?package=${plan.code}&type=professional`
                                      : isEnterprise
                                        ? `/apply?package=${plan.code}&type=enterprise`
                                        : plan.has_price
                                          ? `/checkout?package=${plan.code}&billing=yearly`
                                          : "/contact";

                                const planButtonText = isFree
                                    ? t("startNow")
                                    : isProfessional
                                      ? t("subscribeNow")
                                      : isEnterprise
                                        ? t("contactTeam")
                                        : plan.has_price
                                          ? t("subscribeNow")
                                          : t("contactTeam");

                                return (
                                    <div
                                        className="col-lg-4 mb-30"
                                        key={`yearly-${plan.code}`}
                                    >
                                        <Reveal
                                            animation={getCardAnimation(
                                                index
                                            )}
                                            delay={0.1 + index * 0.12}
                                            duration={1.1}
                                        >
                                            <div
                                                className={`item h-100 radius-20 p-40 ${
                                                    isFeatured
                                                        ? "featured"
                                                        : ""
                                                } ${
                                                    isFree
                                                        ? "free-plan"
                                                        : ""
                                                } ${
                                                    isContactPlan
                                                        ? "contact-plan"
                                                        : ""
                                                }`}
                                            >
                                                <h4 className="fsz-22 fw-800 cr-blue mb-15 color_primary">
                                                    {plan.title}
                                                </h4>

                                                {plan.details && (
                                                    <div
                                                        className="fsz-16 mt-15 mb-30 mt-3 mb-4 fw-400"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                plan.details,
                                                        }}
                                                    />
                                                )}

                                                <div className="price mb-10">
                                                    {isFree ? (
                                                        <span className="free-price fsz-50 fw-300">
                                                            {t("free")}
                                                        </span>
                                                    ) : isFeatured &&
                                                      plan.has_price &&
                                                      yearlyPrice !==
                                                          null ? (
                                                        <span className="fsz-60 fw-500 color_primary">
                                                            {yearlyPrice}

                                                            <span className="fsz-16 ms-1 fw-400">
                                                                <img
                                                                    src="/images/sar.png"
                                                                    className="sar icon-20 mx-1 filter_primary"
                                                                    alt=""
                                                                />
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="contact-price fsz-50 fw-300">
                                                            {t(
                                                                "contactUs"
                                                            )}
                                                        </span>
                                                    )}
                                                </div>

                                                {!isFree &&
                                                    plan.has_price &&
                                                    yearlyPrice !==
                                                        null && (
                                                        <div className="fsz-15 fw-700 mb-30">
                                                            {t(
                                                                "perUserYearly"
                                                            )}
                                                        </div>
                                                    )}

                                                {isFree && (
                                                    <div className="fsz-13 cr-999 mb-30">
                                                        {t(
                                                            "noCreditCard"
                                                        )}
                                                    </div>
                                                )}

                                                <Link
                                                    href={planHref}
                                                    className={`butn ${
                                                        isFeatured
                                                            ? "primary_butn"
                                                            : "white_border_butn"
                                                    } py-3 rounded-pill hvr-txt-trans fw-bold w-100 d-block`}
                                                >
                                                    <div
                                                        className="txt"
                                                        data-text={
                                                            planButtonText
                                                        }
                                                    >
                                                        <span>
                                                            {
                                                                planButtonText
                                                            }
                                                        </span>
                                                    </div>
                                                </Link>

                                                {plan.description && (
                                                    <div
                                                        className="festures_box text fsz-15 cr-666 mb-10 mt-4"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                plan.description,
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </Reveal>
                                    </div>
                                );
                            })}

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PricingPlans;