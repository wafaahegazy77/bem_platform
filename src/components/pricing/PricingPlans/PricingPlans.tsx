import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import { Link } from "@/i18n/routing";
import "./_PricingPlans.scss";

type PackageFeature = {
    key: string;
    title: string;
    field_type: string;
    is_boolean: boolean;
    is_text: boolean;
    is_enabled: boolean | null;
    value: string | number | null;
    is_visible: boolean;
    placement: string | number;
};

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
    features: PackageFeature[];
};

const PricingPlans = async () => {
    const locale = await getLocale();
    const t = await getTranslations("pricing");

    const response = await api.getPackages(locale);
    const packages: Package[] = response.data || [];

    const visiblePackages = packages.slice(0, 3);

    return (
        <section className="pricing-cards section-padding">
            <div className="container">

                <ul
                    className="nav nav-pills pricing-tabs p-1 mx-auto mb-50 flex-nowrap"
                    id="pricingTabs"
                    role="tablist"
                >
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active fsz-14 fw-700"
                            id="monthly-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#monthly-pane"
                            type="button"
                            role="tab"
                            aria-controls="monthly-pane"
                            aria-selected="true"
                        >
                            {t("monthly")}
                        </button>
                    </li>

                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link fsz-14 fw-700"
                            id="yearly-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#yearly-pane"
                            type="button"
                            role="tab"
                            aria-controls="yearly-pane"
                            aria-selected="false"
                        >
                            {t("yearly")}

                            <span className="cr-teal">
                                {t("yearlyDiscount")}
                            </span>
                        </button>
                    </li>
                </ul>

                <div className="tab-content">

                    <div
                        className="tab-pane fade show active"
                        id="monthly-pane"
                        role="tabpanel"
                        aria-labelledby="monthly-tab"
                    >
                        <div className="row">

                            {visiblePackages.map((plan) => {

                                const isFree =
                                    plan.is_free === true ||
                                    plan.is_free === 1;

                                const isContactPlan =
                                    !isFree &&
                                    (!plan.has_price ||
                                        plan.final_cost === null);

                                const isFeatured =
                                    !isFree && !isContactPlan;

                                const visibleFeatures = (
                                    plan.features || []
                                )
                                    .filter(
                                        (feature) =>
                                            feature.is_visible !== false
                                    )
                                    .sort(
                                        (a, b) =>
                                            Number(a.placement) -
                                            Number(b.placement)
                                    );

                                return (
                                    <div
                                        className="col-lg-4 mb-30"
                                        key={plan.code}
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

                                            <div
                                                className={`price ${
                                                    isFree
                                                        ? "fsz-50 fw-300"
                                                        : "fsz-60 fw-500 color_primary"
                                                } mb-10`}
                                            >
                                                {isFree ? (
                                                    <span className="free-price">
                                                        {t("free")}
                                                    </span>
                                                ) : plan.has_price &&
                                                  plan.final_cost !== null ? (
                                                    <>
                                                        {plan.final_cost}
                                                        <span className="fsz-16 ms-1 fw-400">
                                                            <img src="/images/sar.png" className="sar icon-20 mx-1 filter_primary" alt="" />
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="contact-price">
                                                        {t("contactUs")}
                                                    </span>
                                                )}
                                            </div>

                                            {!isFree &&
                                                plan.has_price &&
                                                plan.final_cost !== null && (
                                                    <div className="fsz-15 fw-500 mb-30">
                                                        {t("perUserMonthly")}
                                                    </div>
                                                )}

                                            {isFree && (
                                                <div className="fsz-13 cr-999 mb-30">
                                                    {t("noCreditCard")}
                                                </div>
                                            )}

                                            <Link
                                                href={
                                                    isFree
                                                        ? "/register"
                                                        : plan.has_price
                                                        ? "/register"
                                                        : "/contact"
                                                }
                                                className={`butn ${
                                                    isFeatured
                                                        ? "primary_butn"
                                                        : "white_border_butn"
                                                } py-3 rounded-pill hvr-txt-trans fw-bold w-100 d-block`}
                                            >
                                                <div
                                                    className="txt"
                                                    data-text={
                                                        isFree
                                                            ? t("startNow")
                                                            : plan.has_price
                                                            ? t(
                                                                  "subscribeNow"
                                                              )
                                                            : t(
                                                                  "contactTeam"
                                                              )
                                                    }
                                                >
                                                    <span>
                                                        {isFree
                                                            ? t("startNow")
                                                            : plan.has_price
                                                            ? t(
                                                                  "subscribeNow"
                                                              )
                                                            : t(
                                                                  "contactTeam"
                                                              )}
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

                            {visiblePackages.map((plan) => {

                                const isFree =
                                    plan.is_free === true ||
                                    plan.is_free === 1;

                                const isContactPlan =
                                    !isFree &&
                                    (!plan.has_price ||
                                        plan.final_cost === null);

                                const isFeatured =
                                    !isFree && !isContactPlan;

                                const visibleFeatures = (
                                    plan.features || []
                                )
                                    .filter(
                                        (feature) =>
                                            feature.is_visible !== false
                                    )
                                    .sort(
                                        (a, b) =>
                                            Number(a.placement) -
                                            Number(b.placement)
                                    );

                                return (
                                    <div
                                        className="col-lg-4 mb-30"
                                        key={`yearly-${plan.code}`}
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

                                            <div
                                                className={`price ${
                                                    isFree
                                                        ? "fsz-50 fw-300"
                                                        : "fsz-60 fw-500 color_primary"
                                                } mb-10`}
                                            >
                                                {isFree ? (
                                                    <span className="free-price">
                                                        {t("free")}
                                                    </span>
                                                ) : plan.has_price &&
                                                  plan.final_cost !== null ? (
                                                    <>
                                                        {plan.final_cost}

                                                        <span className="fsz-16 ms-1 fw-400">
                                                            {t("currency")}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="contact-price">
                                                        {t("contactUs")}
                                                    </span>
                                                )}
                                            </div>

                                            {!isFree &&
                                                plan.has_price &&
                                                plan.final_cost !== null && (
                                                    <div className="fsz-15 fw-700 mb-30">
                                                        {t("perUserMonthly")}
                                                    </div>
                                                )}

                                            {isFree && (
                                                <div className="fsz-13 cr-999 mb-30">
                                                    {t("noCreditCard")}
                                                </div>
                                            )}

                                            <Link
                                                href={
                                                    isFree
                                                        ? "/register"
                                                        : plan.has_price
                                                        ? "/register"
                                                        : "/contact"
                                                }
                                                className={`butn ${
                                                    isFeatured
                                                        ? "primary_butn"
                                                        : "white_border_butn"
                                                } py-3 rounded-pill hvr-txt-trans fw-bold w-100 d-block`}
                                            >
                                                <div
                                                    className="txt"
                                                    data-text={
                                                        isFree
                                                            ? t("startNow")
                                                            : plan.has_price
                                                            ? t(
                                                                  "subscribeNow"
                                                              )
                                                            : t(
                                                                  "contactTeam"
                                                              )
                                                    }
                                                >
                                                    <span>
                                                        {isFree
                                                            ? t("startNow")
                                                            : plan.has_price
                                                            ? t(
                                                                  "subscribeNow"
                                                              )
                                                            : t(
                                                                  "contactTeam"
                                                              )}
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

                                            {visibleFeatures.length > 0 && (
                                                <ul className="checks list-unstyled">

                                                    {visibleFeatures.map(
                                                        (feature) => (
                                                            <li
                                                                key={
                                                                    feature.key
                                                                }
                                                                className="d-flex align-items-start mb-15 fsz-15"
                                                            >
                                                                {feature.is_boolean ? (
                                                                    feature.is_enabled ? (
                                                                        <i className="fas fa-check cr-blue me-10"></i>
                                                                    ) : (
                                                                        <i className="fas fa-xmark cr-blue me-10"></i>
                                                                    )
                                                                ) : (
                                                                    <i className="fas fa-check cr-blue me-10"></i>
                                                                )}

                                                                <span>
                                                                    {feature.title}

                                                                    {feature.is_text &&
                                                                        feature.value !==
                                                                            null && (
                                                                            <>
                                                                                {" "}
                                                                                {
                                                                                    feature.value
                                                                                }
                                                                            </>
                                                                        )}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}

                                                </ul>
                                            )}

                                        </div>
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