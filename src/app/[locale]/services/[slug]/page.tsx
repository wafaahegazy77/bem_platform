import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { api } from "@/lib/api";
import ServiceHero from "@/components/services/ServicePage/ServiceHero/ServiceHero";
import ServiceFeature from "@/components/services/ServicePage/ServiceFeature/ServiceFeature";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

const ServicePage = async ({ params }: Props) => {
    const locale = await getLocale();
    const { slug } = await params;

    const servicesResponse = await api.getServices(locale);
    const services = servicesResponse.data || [];

    const service = services.find((item: any) => item.slug === slug);

    if (!service) {
        notFound();
    }

    const serviceResponse = await api.getService(service.code, locale);
    const serviceData = serviceResponse.data;

    return (
        <main>
            <ServiceHero service={serviceData} />

            {/* {serviceData.features
                ?.slice()
                .sort((a: any, b: any) => a.placement - b.placement)
                .map((feature: any) => (
                    <ServiceFeature
                        key={feature.id}
                        feature={feature}
                    />
                ))} */}
        </main>
    );
};

export default ServicePage;