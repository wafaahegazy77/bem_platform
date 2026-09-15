import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import CheckoutContent from "../CheckoutContent/CheckoutContent";
import "./_Checkout.scss";

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

const Checkout = async ({
    packageCode,
    billing,
}: {
    packageCode?: string;
    billing?: string;
}) => {
    const locale = await getLocale();
    const t = await getTranslations("checkout");

    const response = await api.getPackages(locale);

    const packages: Package[] = response?.data || [];

    const packageData = packages.find(
        (item) => item.code === packageCode
    );

    if (!packageData) {
        return (
            <section className="checkout">
                <Navbar auth />

                <div className="container">
                    <div className="checkout-error text-center">
                        {t("packageNotFound")}
                    </div>
                </div>
            </section>
        );
    }

    const initialBilling: BillingCycle =
        billing === "monthly" ? "monthly" : "yearly";

    return (
        <section className="checkout">
            <Navbar auth />

            <div className="container">
                <CheckoutContent
                    packageData={packageData}
                    initialBilling={initialBilling}
                />
            </div>
        </section>
    );
};

export default Checkout;