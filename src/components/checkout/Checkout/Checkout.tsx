import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import CheckoutContent from "../CheckoutContent/CheckoutContent";
import Reveal from "@/components/animations/Reveal";
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
                    <Reveal
                        animation="zoom-in"
                    >
                        <div className="checkout-error text-center">
                            {t("packageNotFound")}
                        </div>
                    </Reveal>
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
                <Reveal
                    animation="fade-up-blur"
                >
                    <CheckoutContent
                        packageData={packageData}
                        initialBilling={initialBilling}
                    />
                </Reveal>
            </div>
        </section>
    );
};

export default Checkout;