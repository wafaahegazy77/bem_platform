import { getTranslations } from "next-intl/server";
import "./_HelpCenterContact.scss";

const HelpCenterContact = async () => {
    const t = await getTranslations("helpCenter.contact");

    return (
        <section className="help-center-contact">
            <div className="container">
                <div className="contact-box text-center col-lg-10 mx-auto">
                    <div className="contact-icon">
                        <i className="fa-light fa-envelope" />
                    </div>

                    <h2 className="title fsz-35 fw-600">
                        {t("title")}
                    </h2>

                    <p className="description fsz-20 cr-999">
                        {t("description")}
                    </p>

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
                </div>
            </div>
        </section>
    );
};

export default HelpCenterContact;