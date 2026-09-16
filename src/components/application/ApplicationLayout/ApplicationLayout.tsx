import { getTranslations } from "next-intl/server";
import SubscriptionApplicationForm from "../SubscriptionApplicationForm/SubscriptionApplicationForm";
import EnterpriseApplicationForm from "../EnterpriseApplicationForm/EnterpriseApplicationForm";
import "./_ApplicationLayout.scss";

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

type ApplicationType =
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

    return (
        <div className="application-content">
            <div className="container">
                <div className="application-card">
                    <div className="row g-0">
                        <div className="col-lg-8">
                            <div className="application-form-wrapper">
                                {applicationType === "professional" ? (
                                    <SubscriptionApplicationForm />
                                ) : (
                                    <EnterpriseApplicationForm />
                                )}
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <aside className="application-sidebar">
                                <div className="application-sidebar-content">
                                    <span className="application-sidebar-label">
                                        {t("productFeatures")}
                                    </span>

                                    <h2 className="application-sidebar-title fsz-24 fw-700">
                                        {t("organizationNeeds")}
                                    </h2>

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
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationLayout;