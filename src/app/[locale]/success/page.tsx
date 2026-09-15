import Success from "@/components/success/Success/Success";

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>;
}) {
    const { type } = await searchParams;

    return <Success type={type} />;
}