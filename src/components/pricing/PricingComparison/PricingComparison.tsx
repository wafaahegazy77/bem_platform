import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { api } from "@/lib/api";
import ComparisonCategories from "./ComparisonCategories";
import "./_PricingComparison.scss";

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

                    <h2 className="fsz-40 fw-600 text-center comparison-title mb-5 pb-3">
                        {t("comparisonTitle")}
                    </h2>

                    <div className="comparison-table">

                        <div className="comparison-head">
                            <div className="row align-items-center">

                                <div className="col-lg-5">
                                </div>

                                <div className="col-lg-7">
                                    <div className="row">

                                        {visiblePackages.map((plan) => {
                                            const isFree =
                                                plan.is_free === true ||
                                                plan.is_free === 1;

                                            const isContactPlan =
                                                !isFree &&
                                                (!plan.has_price ||
                                                    plan.final_cost === null);

                                            return (
                                                <div
                                                    className="col-6"
                                                    key={plan.code}
                                                >
                                                    <div className="comparison-plan">

                                                        <h3 className="fsz-18 fw-700 mb-15 mb-4">
                                                            {plan.title}
                                                        </h3>

                                                        <Link
                                                            href={
                                                                isContactPlan
                                                                    ? "/contact"
                                                                    : "/register"
                                                            }
                                                            className="butn primary_border_butn rounded-pill hvr-txt-trans fw-bold mx-auto"
                                                        >
                                                            <div
                                                                className="txt px-3"
                                                                data-text={
                                                                    isContactPlan
                                                                        ? t("contactTeam")
                                                                        : isFree
                                                                          ? t("startNow")
                                                                          : t("subscribeNow")
                                                                }
                                                            >
                                                                <span>
                                                                    {isContactPlan
                                                                        ? t("contactTeam")
                                                                        : isFree
                                                                          ? t("startNow")
                                                                          : t("subscribeNow")}
                                                                </span>
                                                            </div>
                                                        </Link>

                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </div>
                                </div>

                            </div>
                        </div>

                        <ComparisonCategories
                            categories={categories}
                            packages={visiblePackages}
                        />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingComparison;