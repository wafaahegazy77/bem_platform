import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import { Link } from "@/i18n/routing";
import "./_Features.scss";

const Features = async () => {
    const locale = await getLocale();
    const t = await getTranslations("features");

    const response = await api.getServices(locale);
    const services = response.data || [];

    const selectedServices = services
        .filter((service: any) => service.homepage?.image)
        .slice(0, 7);

    const servicesWithDetails = await Promise.all(
        selectedServices.map(async (service: any) => {
            const response = await api.getService(service.code, locale);

            return {
                ...service,
                details: response.data,
            };
        })
    );

    return (
        <section className="features section-padding" id="features">
            <div className="container">

                <div className="title-wrapper text-center col-lg-6 mx-auto">

                    <h2 className="fsz-45 color_primary fw-bold">
                        {t("title_first")} <br />
                        <span className="fw-100 mt-3 d-block cr-000">
                            {t("title_second")}
                        </span>
                    </h2>

                    <Link
                        href="/contact"
                        className="butn primary_butn mx-auto rounded-pill hvr-txt-trans hvr-scale fw-bold mt-5"
                    >
                        <div
                            className="txt mx-3"
                            data-text={t("button")}
                        >
                            <span>{t("button")}</span>
                        </div>
                    </Link>

                </div>

                <div className="content col-lg-10 mx-auto mt-80">

                    <div className="tab-content" id="features-tabContent">

                        {servicesWithDetails.map((service: any, index: number) => {

                            const serviceData = service.details || service;

                            return (
                                <div
                                    key={service.code}
                                    className={`tab-pane fade ${
                                        index === 0 ? "show active" : ""
                                    }`}
                                    id={`feature-${service.code}`}
                                    role="tabpanel"
                                    aria-labelledby={`feature-${service.code}-tab`}
                                >
                                    <div className="feature-box">

                                        <div className="row justify-content-between">

                                            <div className="col-lg-5">
                                                <div className="info h-100 d-flex flex-column">

                                                    <h3 className="fsz-18 fw-800 cr-000">
                                                        {service.name}
                                                    </h3>

                                                    {service.homepage?.first_description && (
                                                        <div
                                                            className="first-description fsz-16 cr-666 mt-20"
                                                            dangerouslySetInnerHTML={{
                                                                __html: service.homepage.first_description,
                                                            }}
                                                        />
                                                    )}

                                                    <ul className="checks mt-30">

                                                        {serviceData.features?.map(
                                                            (feature: any) => (
                                                                <li
                                                                    key={feature.id}
                                                                    className="d-flex align-items-start mb-15 fsz-16 cr-666"
                                                                >
                                                                    <i className="fas fa-check me-10"></i>

                                                                    <span>
                                                                        {feature.title ||
                                                                            feature.description}
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}

                                                    </ul>

                                                    {service.homepage?.second_description && (
                                                        <div
                                                            className="second-description mt-auto"
                                                            dangerouslySetInnerHTML={{
                                                                __html: service.homepage.second_description,
                                                            }}
                                                        />
                                                    )}

                                                </div>
                                            </div>

                                            <div className="col-lg-7">
                                                <div className="img">

                                                    {service.homepage?.image && (
                                                        <img
                                                            src={service.homepage.image}
                                                            alt={service.name}
                                                            className="img-contain"
                                                        />
                                                    )}

                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <ul
                        className="nav nav-pills mx-auto mt-100 flex-nowrap align-items-center justify-content-evenly col-11"
                        id="features-tab"
                        role="tablist"
                    >

                        {servicesWithDetails.map(
                            (service: any, index: number) => (
                                <li
                                    className="nav-item flex-shrink-0"
                                    role="presentation"
                                    key={service.code}
                                >
                                    <button
                                        className={`nav-link ${
                                            index === 0 ? "active" : ""
                                        }`}
                                        id={`feature-${service.code}-tab`}
                                        data-bs-toggle="pill"
                                        data-bs-target={`#feature-${service.code}`}
                                        type="button"
                                        role="tab"
                                        aria-controls={`feature-${service.code}`}
                                        aria-selected={index === 0}
                                        tabIndex={index === 0 ? 0 : -1}
                                    >

                                        <span className="txt fsz-14 fw-700">
                                            {service.name}
                                        </span>

                                        <span className="ico radius-100 dnf-center">

                                            <div className="ico-img">

                                                {service.icon && (
                                                    <img
                                                        src={service.icon}
                                                        alt={service.name}
                                                        className="img img-contain"
                                                    />
                                                )}

                                            </div>

                                        </span>

                                    </button>
                                </li>
                            )
                        )}

                    </ul>

                </div>

            </div>
        </section>
    );
};

export default Features;