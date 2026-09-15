"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import OrderSummary from "../OrderSummary/OrderSummary";
import "./_CheckoutContent.scss";

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

type BillingCycle = "monthly" | "yearly";

const CheckoutContent = ({
    packageData,
    initialBilling,
}: {
    packageData: Package;
    initialBilling: BillingCycle;
}) => {
    const t = useTranslations("checkout");

    const [billingCycle, setBillingCycle] =
        useState<BillingCycle>(initialBilling);

    const [usersCount, setUsersCount] = useState(2);

    const [paymentMethod, setPaymentMethod] =
        useState("card");

    const increaseUsers = () => {
        setUsersCount((current) => current + 1);
    };

    const decreaseUsers = () => {
        setUsersCount((current) => Math.max(1, current - 1));
    };

    return (
        <div className="checkout-card w-100">
            <div className="checkout-header text-center">
                <h1 className="title fsz-40 fw-600 mb-5">
                    {t("upgradeTo")}{" "}
                    <span>{packageData.title}</span>
                </h1>
            </div>

            <div className="checkout-layout">
                <div className="row">
                    <div className="col-lg-8">
                        <CheckoutForm
                            packageData={packageData}
                            billingCycle={billingCycle}
                            usersCount={usersCount}
                            paymentMethod={paymentMethod}
                            setBillingCycle={setBillingCycle}
                            setPaymentMethod={setPaymentMethod}
                            increaseUsers={increaseUsers}
                            decreaseUsers={decreaseUsers}
                        />
                    </div>

                    <div className="col-lg-4">
                        <OrderSummary
                            packageData={packageData}
                            billingCycle={billingCycle}
                            usersCount={usersCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutContent;