import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { api } from "@/lib/api";
import MessagesHero from "@/components/messages/MessagesHero/MessagesHero";
import MessagesFeature from "@/components/messages/MessagesFeature/MessagesFeature";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const messagesVideos = [
    "/videos/vid-2.mp4",
    "/videos/vid-3.mp4",
    "/videos/vid-4.mp4",
    "/videos/vid-5.mp4",
    "/videos/vid-6.mp4",
    null,
    "/videos/vid-8.mp4",
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
                    video="/videos/vid-1.mp4"
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