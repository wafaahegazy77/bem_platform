import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { api } from "@/lib/api";
import ComparisonCategories from "./ComparisonCategories";
import "./_PricingComparison.scss";
import Reveal from "@/components/animations/Reveal";

type PackageFeature = {
    key: string;
    title: string;
    field_type: string;
    value: string | boolean | number | null;
};

type FeatureCategory = {
    id: number;
    name: string;
    features: PackageFeature[];
};

type Package = {
    code: string;
    title: string;
    is_free: number | boolean;
    has_price: boolean;
    final_cost: number | null;
    feature_categories: FeatureCategory[];
};

const PricingComparison = async () => {
    const locale = await getLocale();
    const t = await getTranslations("pricing");

    const response = await api.getPackages(locale);

    const packages: Package[] = response?.data || [];
    const visiblePackages = packages.slice(0, 2);

    const categories = visiblePackages.reduce<FeatureCategory[]>(
        (allCategories, plan) => {
            plan.feature_categories?.forEach((category) => {
                const existingCategory = allCategories.find(
                    (item) => item.id === category.id
                );

                if (!existingCategory) {
                    allCategories.push({
                        ...category,
                        features: [...category.features],
                    });

                    return;
                }

                category.features.forEach((feature) => {
                    if (
                        !existingCategory.features.some(
                            (item) => item.key === feature.key
                        )
                    ) {
                        existingCategory.features.push(feature);
                    }
                });
            });

            return allCategories;
        },
        []
    );

    return (
        <section className="pricing-comparison section-padding">
            <div className="container">
                <div className="comparison-content">
                    <Reveal
                        animation="fade-down-blur"
                    >
                        <h2 className="fsz-45 fw-600 text-center comparison-title mb-5 pb-3">
                            {t("comparisonTitle")}
                        </h2>
                    </Reveal>

                    <div className="comparison-table">
                        <div className="comparison-head">
                            <div className="row align-items-center">
                                <div className="col-lg-5"></div>

                                <div className="col-lg-7">
                                    <div className="row">
                                        {visiblePackages.map(
                                            (plan, index) => {
                                                const isFree =
                                                    plan.is_free ===
                                                        true ||
                                                    plan.is_free === 1;

                                                const isContactPlan =
                                                    !isFree &&
                                                    (!plan.has_price ||
                                                        plan.final_cost ===
                                                            null);

                                                return (
                                                    <div
                                                        className="col-6"
                                                        key={plan.code}
                                                    >
                                                        <Reveal
                                                            animation={
                                                                index === 0
                                                                    ? "fade-left-blur"
                                                                    : "fade-right-blur"
                                                            }
                                                            delay={
                                                                0.15 +
                                                                index * 0.12
                                                            }
                                                            
                                                        >
                                                            <div className="comparison-plan">
                                                                <h3 className="fsz-18 fw-700 mb-15 mb-4">
                                                                    {
                                                                        plan.title
                                                                    }
                                                                </h3>

                                                                <Link
                                                                    href={
                                                                        isContactPlan
                                                                            ? "/contact"
                                                                            : isFree
                                                                            ? "/register"
                                                                            : `/checkout?package=${plan.code}`
                                                                    }
                                                                    className={`butn ${
                                                                        index ===
                                                                        0
                                                                            ? "secondary_border_butn"
                                                                            : "primary_butn"
                                                                    } rounded-pill hvr-txt-trans fw-bold mx-auto`}
                                                                >
                                                                    <div
                                                                        className="txt px-3"
                                                                        data-text={
                                                                            isContactPlan
                                                                                ? t(
                                                                                      "contactTeam"
                                                                                  )
                                                                                : isFree
                                                                                ? t(
                                                                                      "startNow"
                                                                                  )
                                                                                : t(
                                                                                      "subscribeNow"
                                                                                  )
                                                                        }
                                                                    >
                                                                        <span>
                                                                            {isContactPlan
                                                                                ? t(
                                                                                      "contactTeam"
                                                                                  )
                                                                                : isFree
                                                                                ? t(
                                                                                      "startNow"
                                                                                  )
                                                                                : t(
                                                                                      "subscribeNow"
                                                                                  )}
                                                                        </span>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </Reveal>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Reveal
                            animation="fade-up-blur"
                        >
                            <ComparisonCategories
                                categories={categories}
                                packages={visiblePackages}
                            />
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingComparison;