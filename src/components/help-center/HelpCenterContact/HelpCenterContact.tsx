import { getTranslations } from "next-intl/server";
import "./_HelpCenterContact.scss";
import Reveal from "@/components/animations/Reveal";

const HelpCenterContact = async () => {
    const t = await getTranslations("helpCenter.contact");

    return (
        <section className="help-center-contact">
            <div className="container">

                <Reveal
                    animation="fade-up-blur"
                    duration={1.1}
                >
                    <div className="contact-box text-center col-lg-10 mx-auto">

                        <Reveal
                            animation="zoom-in"
                            duration={0.9}
                        >
                            <div className="contact-icon">
                                <i className="fa-light fa-envelope" />
                            </div>
                        </Reveal>

                        <Reveal
                            animation="fade-down-blur"
                            delay={0.1}
                            duration={1}
                        >
                            <h2 className="title fsz-35 fw-600">
                                {t("title")}
                            </h2>
                        </Reveal>

                        <Reveal
                            animation="fade-up"
                            delay={0.2}
                            duration={1}
                        >
                            <p className="description fsz-20 cr-999">
                                {t("description")}
                            </p>
                        </Reveal>

                        <Reveal
                            animation="fade-up-blur"
                            delay={0.35}
                            duration={0.9}
                        >
                            <a
                                href={`mailto:${t("email")}`}
                                className="contact-email butn primary_butn hvr-txt-trans px-5 mx-auto mt-4 fsz-18"
                            >
                                <div
                                    className="txt px-2"
                                    data-text={t("email")}
                                >
                                    <span>{t("email")}</span>
                                </div>
                            </a>
                        </Reveal>

                    </div>
                </Reveal>

            </div>
        </section>
    );
};

export default HelpCenterContact;