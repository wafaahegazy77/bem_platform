import Checkout from "@/components/checkout/Checkout/Checkout";

export default async function CheckoutPage({
    searchParams,
}: {
    searchParams: Promise<{
        package?: string;
        billing?: string;
    }>;
}) {
    const { package: packageCode, billing } = await searchParams;

    return <Checkout packageCode={packageCode} billing={billing} />;
}