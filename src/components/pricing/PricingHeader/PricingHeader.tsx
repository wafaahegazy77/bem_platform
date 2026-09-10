import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import "./_PricingHeader.scss";

const PricingHeader = async () => {
    const locale = await getLocale();
    const t = await getTranslations("pricing");

    const [pageResponse, servicesResponse] = await Promise.all([
        api.getPage("packages_prices", locale),
        api.getServices(locale),
    ]);

    const page = pageResponse.data;
    const services = servicesResponse.data || [];

    const selectedServices = services
        .filter((service: any) => service.slug)
        .sort((a: any, b: any) => a.sort - b.sort);

    return (
        <section className="pricing-header section-padding">
            <div className="container">

                <div className="text-center">

                    <div className="pricing-label">
                        {t("label")}
                    </div>

                    <h1 className="fsz-45 fw-bold">
                        {page?.title}
                    </h1>

                </div>

                <div className="pricing-services">
                    <p className="services-title text-center mb-4">
                        {t("included")}
                    </p>

                    <div className="services-list-box">
                        <div className="services-list col-lg-10 mx-auto   ">
                            {selectedServices.map((service: any) => (
                                <div
                                    className="service-item"
                                    key={service.code}
                                >
                                    {service.icon && (
                                        <div className="service-icon">
                                            <img
                                                src={service.icon}
                                                alt={service.name}
                                            />
                                        </div>
                                    )}

                                    <span className="fw-500">{service.name}</span>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>

            </div>
        </section>
    );
};

export default PricingHeader;