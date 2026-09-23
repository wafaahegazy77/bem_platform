import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { api } from "@/lib/api";
import MessagesHero from "@/components/messages/MessagesHero/MessagesHero";
import MessagesFeature from "@/components/messages/MessagesFeature/MessagesFeature";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const messagesVideos = [
    "/videos/2.webm",
    "/videos/3.webm",
    "/videos/4.webm",
    "/videos/5.webm",
    "/videos/6.webm",
    null,
    "/videos/8.webm",
];

const MessagesPage = async () => {
    const locale = await getLocale();

    const servicesResponse =
        await api.getServices(locale);

    const services =
        servicesResponse?.data || [];

    const service = services.find(
        (item: any) =>
            item.slug === "messages"
    );

    if (!service) {
        notFound();
    }

    const serviceResponse =
        await api.getService(
            service.code,
            locale
        );

    const serviceData =
        serviceResponse?.data;

    if (!serviceData) {
        notFound();
    }

    const features =
        serviceData.features
            ?.slice()
            .sort(
                (a: any, b: any) =>
                    a.placement -
                    b.placement
            ) || [];

    return (
        <>
            <Navbar />

            <main>
                <MessagesHero
                    service={serviceData}
                    video="/videos/1.webm"
                />

                {features.map(
                    (
                        feature: any,
                        index: number
                    ) => {
                        const video =
                            messagesVideos[index] ??
                            undefined;

                        return (
                            <MessagesFeature
                                key={feature.id}
                                feature={feature}
                                video={video}
                                themeColor={
                                    serviceData.theme_color
                                }
                                isLast={
                                    index ===
                                    features.length - 1
                                }
                            />
                        );
                    }
                )}
            </main>

            <Footer />
        </>
    );
};

export default MessagesPage;