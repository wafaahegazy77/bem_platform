import { getTranslations } from "next-intl/server";
import SubscriptionApplicationForm from "../SubscriptionApplicationForm/SubscriptionApplicationForm";
import EnterpriseApplicationForm from "../EnterpriseApplicationForm/EnterpriseApplicationForm";
import BasicApplicationForm from "../BasicApplicationForm/BasicApplicationForm";
import Reveal from "@/components/animations/Reveal";
import "./_ApplicationLayout.scss";

type PackageFeature = {
    key: string;
    title: string;
    field_type: string;
    value: string | number | null;
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
    features?: PackageFeature[];
};

type ApplicationType =
    | "basic"
    | "professional"
    | "enterprise";

const ApplicationLayout = async ({
    packageData,
    applicationType,
}: {
    packageData: Package;
    applicationType: ApplicationType;
}) => {
    const t = await getTranslations("application");

    const packagePrice =
        packageData.final_cost ??
        packageData.cost ??
        0;

    const isBasic = applicationType === "basic";

    return (
        <div className="application-content">
            <div className="container">
                <Reveal
                    animation="fade-up-blur"
                    duration={1.1}
                >
                    <div className="application-card">
                        <div className="row g-0">
                            <div className="col-lg-8">
                                <Reveal
                                    animation="fade-left-blur"
                                    duration={1.1}
                                >
                                    <div className="application-form-wrapper">
                                        {applicationType === "basic" ? (
                                            <BasicApplicationForm />
                                        ) : applicationType === "professional" ? (
                                            <SubscriptionApplicationForm />
                                        ) : (
                                            <EnterpriseApplicationForm />
                                        )}
                                    </div>
                                </Reveal>
                            </div>

                            <div className="col-lg-4">
                                <aside className="application-sidebar">
                                    <Reveal
                                        animation="fade-right-blur"
                                        delay={0.15}
                                        duration={1.1}
                                    >
                                            <div className="application-sidebar-content">
                                            {isBasic && (
                                                <div className="application-order-summary">
                                                    <h2 className="application-sidebar-main-title">
                                                        {t("orderSummary")}
                                                    </h2>

                                                    <h3 className="application-invoice-title">
                                                        {t("invoiceDetails")}
                                                    </h3>

                                                    <div className="application-invoice-row">
                                                        <span>
                                                            {t("package")}
                                                        </span>

                                                        <strong>
                                                            {packageData.title}
                                                        </strong>
                                                    </div>

                                                    <div className="application-invoice-divider" />

                                                    <div className="application-invoice-row">
                                                        <span>
                                                            {t("amount")}
                                                        </span>

                                                        <strong className="application-price">
                                                            <span>
                                                                {Number(
                                                                    packagePrice
                                                                ).toFixed(2)}
                                                            </span>

                                                            <img
                                                                src="/images/sar.png"
                                                                alt="SAR"
                                                            />
                                                        </strong>
                                                    </div>
                                                </div>
                                            )}

                                            {!isBasic && (
                                                <span className="application-sidebar-label">
                                                    {t("productFeatures")}
                                                </span>
                                            )}

                                            {!isBasic && (
                                                <h2 className="application-sidebar-title fsz-24 fw-700">
                                                    {t("organizationNeeds")}
                                                </h2>
                                            )}

                                            {isBasic && (
                                                <h2 className="application-sidebar-title fsz-24 fw-700">
                                                    {t("packageFeatures")}
                                                </h2>
                                            )}

                                            {packageData.description && (
                                                <div
                                                    className="application-features"
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            packageData.description,
                                                    }}
                                                />
                                            )}

                                            <div className="application-data-protection">
                                                <i className="fa-light fa-shield-check" />

                                                <span>
                                                    {t(
                                                        "saudiDataProtection"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </Reveal>
                                </aside>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default ApplicationLayout;