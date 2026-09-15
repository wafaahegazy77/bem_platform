"use client";

import { useTranslations } from "next-intl";
import "./_OrderSummary.scss";

type Package = {
    title: string;
    cost: number | null;
    discount: number | null;
    discount_type: string | null;
    final_cost: number | null;
};

type BillingCycle = "monthly" | "yearly";

const OrderSummary = ({
    packageData,
    billingCycle,
    usersCount,
}: {
    packageData: Package;
    billingCycle: BillingCycle;
    usersCount: number;
}) => {
    const t = useTranslations("checkout");

    const monthlyPrice =
        packageData.final_cost ??
        packageData.cost ??
        0;

    const price =
        billingCycle === "yearly"
            ? monthlyPrice * 12
            : monthlyPrice;

    const subtotal = price * usersCount;

    const vat = subtotal * 0.15;
    const total = subtotal + vat;

    const yearlySaving =
        billingCycle === "yearly"
            ? (monthlyPrice * 12 * 0.1) * usersCount
            : 0;

    return (
        <div className="order-summary">
            <h2 className="summary-title">
                <i className="fa-light fa-rectangle-list" />
                <span>{t("orderSummary")}</span>
            </h2>

            <div className="summary-row">
                <div className="summary-info">
                    <span className="summary-label">
                        {packageData.title}
                    </span>

                    <small>
                        {billingCycle === "yearly"
                            ? t("yearlySubscription")
                            : t("monthlySubscription")}
                    </small>
                </div>

                <div className="summary-price">
                    <img
                        src="/images/sar.png"
                        alt="SAR"
                        className="th-15"
                    />

                    <strong>
                        {subtotal.toFixed(2)}
                    </strong>
                </div>
            </div>

            <div className="summary-row">
                <div className="summary-info">
                    <span className="summary-label">
                        {t("vat")}
                    </span>

                    <small>15%</small>
                </div>

                <div className="summary-price">
                    <img
                        src="/images/sar.png"
                        alt="SAR"
                        className="th-15"
                    />

                    <strong>
                        {vat.toFixed(2)}
                    </strong>
                </div>
            </div>

            <div className="summary-total">
                <span>{t("total")}</span>

                <div className="summary-price">
                    <img
                        src="/images/sar.png"
                        alt="SAR"
                        className="filter_primary"
                    />

                    <strong>
                        {total.toFixed(2)}
                    </strong>
                </div>
            </div>

            {billingCycle === "yearly" && (
                <div className="summary-discount">
                    {t("discountMessage", {
                        amount: yearlySaving.toFixed(2),
                    })}
                </div>
            )}
        </div>
    );
};

export default OrderSummary;