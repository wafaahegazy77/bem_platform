"use client";

import {
    Dispatch,
    SetStateAction,
} from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import "./_CheckoutForm.scss";

type Package = {
    title: string;
    cost: number | null;
    final_cost: number | null;
};

type BillingCycle = "monthly" | "yearly";

const CheckoutForm = ({
    packageData,
    billingCycle,
    usersCount,
    paymentMethod,
    setBillingCycle,
    setPaymentMethod,
    increaseUsers,
    decreaseUsers,
}: {
    packageData: Package;
    billingCycle: BillingCycle;
    usersCount: number;
    paymentMethod: string;
    setBillingCycle: Dispatch<
        SetStateAction<BillingCycle>
    >;
    setPaymentMethod: Dispatch<SetStateAction<string>>;
    increaseUsers: () => void;
    decreaseUsers: () => void;
}) => {
    const t = useTranslations("checkout");

    const monthlyPrice = packageData.cost ?? 0;
    const yearlyMonthlyPrice =
        packageData.final_cost ?? monthlyPrice;

    const yearlySaving =
        monthlyPrice > yearlyMonthlyPrice
            ? (monthlyPrice - yearlyMonthlyPrice) * 12
            : 0;

    return (
        <form className="checkout-form">
            <div className="form-section">
                <h2 className="section-title fsz-18 fw-600">
                    <i className="fa-light fa-user" />
                    {t("subscriptionInfo")}
                </h2>

                <div className="form-group">
                    <label>{t("billingCycle")}</label>

                    <div className="billing-options col-lg-10">
                        <button
                            type="button"
                            className={`billing-option ${
                                billingCycle === "monthly"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                setBillingCycle("monthly")
                            }
                        >
                            <span className="billing-title">
                                {t("monthly")}
                            </span>

                            <small>
                                {monthlyPrice} {t("currency")}{" "}
                                / {t("user")}{" "}
                                {t("monthly")}
                            </small>
                        </button>

                        <button
                            type="button"
                            className={`billing-option ${
                                billingCycle === "yearly"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                setBillingCycle("yearly")
                            }
                        >
                            <div className="billing-title">
                                <span>
                                    {t("yearly")}
                                </span>

                                {yearlySaving > 0 && (
                                    <small className="saving-badge">
                                        {t("save")}{" "}
                                        {yearlySaving.toFixed(2)}{" "}
                                        {t("currency")}
                                    </small>
                                )}
                            </div>

                            <small className="billing-price">
                                {yearlyMonthlyPrice}{" "}
                                {t("currency")} /{" "}
                                {t("user")}{" "}
                                {t("monthly")}
                            </small>
                        </button>
                    </div>
                </div>

                <div className="form-group users-group mt-4 ">
                    <label>{t("usersCount")}</label>

                    <div className="users-counter">
                        <button
                            type="button"
                            onClick={decreaseUsers}
                            aria-label={t(
                                "decreaseUsers"
                            )}
                        >
                            −
                        </button>

                        <span>{usersCount}</span>

                        <button
                            type="button"
                            onClick={increaseUsers}
                            aria-label={t(
                                "increaseUsers"
                            )}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="form-section payment-section mt-5">
                <h2 className="section-title fsz-18 fw-600 mb-4">
                    <i className="fa-light fa-credit-card" />
                    {t("paymentMethod")}
                </h2>


                <div className="payment-fields">
                    <div className="form-group">
                        <label htmlFor="cardName">
                            {t("cardName")}
                        </label>

                        <input
                            id="cardName"
                            type="text"
                            className="form-control"
                            placeholder={t(
                                "cardNamePlaceholder"
                            )}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cardNumber">
                            {t("cardNumber")}
                        </label>

                        <input
                            id="cardNumber"
                            type="text"
                            className="form-control"
                            placeholder={t(
                                "cardNumberPlaceholder"
                            )}
                        />
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="expiry">
                                    {t("expiry")}
                                </label>

                                <input
                                    id="expiry"
                                    type="text"
                                    className="form-control"
                                    placeholder={t(
                                        "expiryPlaceholder"
                                    )}
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="cvv">
                                    {t("cvv")}
                                </label>

                                <input
                                    id="cvv"
                                    type="text"
                                    className="form-control"
                                    placeholder={t(
                                        "cvvPlaceholder"
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="checkout-terms mb-5">
                <input
                    id="checkoutTerms"
                    type="checkbox"
                />

                <label htmlFor="checkoutTerms">
                    {t("agree")}
                    <Link href="/terms">
                        {t("terms")}
                    </Link>
                    {t("and")}
                    <Link href="/privacy">
                        {t("privacy")}
                    </Link>
                </label>
            </div>

            <div className="checkout-actions">
                <div className="row">
                    <div className="col-lg-8 col-7">
                        <button
                            type="submit"
                            className="butn primary_butn rounded-pill hvr-txt-trans"
                        >
                            <div
                                className="txt px-3"
                                data-text={t("getPackage", {
                                    packageName:
                                        packageData.title,
                                })}
                            >
                                <span>
                                    {t("getPackage", {
                                        packageName:
                                            packageData.title,
                                    })}
                                </span>
                            </div>
                        </button>
                    </div>
                    <div className="col-lg-4 col-5">
                        <Link
                            href="/contact"
                            className="butn secondary_border_butn rounded-pill hvr-txt-trans"
                        >
                            <div
                                className="txt px-3"
                                data-text={t("contact")}
                            >
                                <span>{t("contact")}</span>
                            </div>
                        </Link>
                    </div>
                </div>


            </div>
        </form>
    );
};

export default CheckoutForm;