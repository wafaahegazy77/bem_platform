import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import "./_PricingHeader.scss";
import Reveal from "@/components/animations/Reveal";

type Service = {
    code: string;
    name: string;
    icon: string | null;
    sort: number;
    slug: string;
};

const PricingHeader = async () => {
    const locale = await getLocale();
    const t = await getTranslations("pricing");

    const [pageResponse, servicesResponse] = await Promise.all([
        api.getPage("packages_prices", locale),
        api.getServices(locale),
    ]);

    const page = pageResponse?.data;
    const services: Service[] = servicesResponse?.data || [];

    const selectedServices = services
        .filter((service) => service.slug)
        .sort((a, b) => a.sort - b.sort);

    return (
        <section className="pricing-header section-padding">
            <div className="container">

                <div className="text-center">

                    <Reveal
                        animation="zoom-in"
                    >
                        <div className="pricing-label">
                            {t("label")}
                        </div>
                    </Reveal>

                    <Reveal
                        animation="fade-down-blur"
                        delay={0.1}
                    >
                        <h1 className="fsz-45 fw-bold">
                            {page?.title}
                        </h1>
                    </Reveal>

                </div>

                <div className="pricing-services">

                    <Reveal
                        animation="fade-up"
                        delay={0.2}
                    >
                        <p className="services-title text-center mb-4">
                            {t("included")}
                        </p>
                    </Reveal>

                    <Reveal
                        animation="fade-up-blur"
                        delay={0.3}
                    >
                        <div className="services-list-box">

                            <div className="services-list col-lg-10 mx-auto">

                                {selectedServices.map(
                                    (service, index) => (
                                        <Reveal
                                            key={service.code}
                                            animation={
                                                index % 2 === 0
                                                    ? "fade-left"
                                                    : "fade-right"
                                            }
                                            delay={
                                                0.1 +
                                                index * 0.08
                                            }
                                        >
                                            <div className="service-item">

                                                {service.icon && (
                                                    <div className="service-icon">
                                                        <img
                                                            src={
                                                                service.icon
                                                            }
                                                            alt={
                                                                service.name
                                                            }
                                                        />
                                                    </div>
                                                )}

                                                <span className="fw-500">
                                                    {
                                                        service.name
                                                    }
                                                </span>

                                            </div>
                                        </Reveal>
                                    )
                                )}

                            </div>

                        </div>
                    </Reveal>

                </div>

            </div>
        </section>
    );
};

export default PricingHeader;