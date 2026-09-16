import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import ApplicationLayout from "@/components/application/ApplicationLayout/ApplicationLayout";

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

const ApplyPage = async ({
    searchParams,
}: {
    searchParams?: Promise<{
        package?: string;
        type?: string;
    }>;
}) => {
    const locale = await getLocale();

    const params = searchParams
        ? await searchParams
        : {};

    const packageCode = params.package;

    if (!packageCode) {
        notFound();
    }

    const applicationType =
        params.type === "enterprise"
            ? "enterprise"
            : params.type === "professional"
              ? "professional"
              : null;

    if (!applicationType) {
        notFound();
    }

    const response = await api.getPackages(locale);

    const packages: Package[] =
        response?.data || [];

    const selectedPackage = packages.find(
        (plan) => plan.code === packageCode
    );

    if (!selectedPackage) {
        notFound();
    }

    return (
        <main className="application-page">
            <Navbar auth />

            <ApplicationLayout
                packageData={selectedPackage}
                applicationType={applicationType}
            />
        </main>
    );
};

export default ApplyPage;