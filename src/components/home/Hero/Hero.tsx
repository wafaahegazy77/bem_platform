import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import { Link } from "@/i18n/routing";
import "./_Hero.scss";
import HeroSlider from "./HeroSlider";

const Hero = async () => {
    const locale = await getLocale();
    const t = await getTranslations("hero");

    const [heroResponse, servicesResponse] = await Promise.all([
        api.getPage("hero", locale),
        api.getServices(locale),
    ]);

    const data = heroResponse.data;
    const services = servicesResponse.data;

    return (
        <section className="hero_section">
            <div className="container">

                <div className="txt_box text-center">

                    <h1 className="title fw-bold text-white fsz-55 mb-5 col-lg-5 mx-auto">
                        {data.title}
                    </h1>

                    <div
                        className="description text-white fsz-18 my-4 col-lg-7 mx-auto"
                        dangerouslySetInnerHTML={{
                            __html: data.content || "",
                        }}
                    />

                    <div className="hero_buttons d-flex justify-content-center align-items-center gap-2 mt-4">

                        <Link
                            href="/pricing"
                            className="butn primary_butn hvr-txt-trans px-4"
                        >
                            <div
                                className="txt px-2"
                                data-text={t("pricing")}
                            >
                                <span>{t("pricing")}</span>
                            </div>
                        </Link>

                        <Link
                            href="#features"
                            className="butn secondary_border_butn hvr-txt-trans px-4"
                        >
                            <div
                                className="txt px-2"
                                data-text={t("features")}
                            >
                                <span>{t("features")}</span>
                            </div>
                        </Link>

                    </div>

                    

                </div>

            </div>
            <HeroSlider services={services} />
        </section>
    );
};

export default Hero;